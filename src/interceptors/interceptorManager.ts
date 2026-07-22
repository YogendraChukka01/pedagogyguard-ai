import * as vscode from 'vscode';
import { MutationEngine } from '../mutations/mutationEngine';
import { SocraticDialogue } from '../socratic/socraticDialogue';
import { TelemetryService } from '../telemetry/telemetryService';

export class InterceptorManager implements vscode.Disposable {
    private disposables: vscode.Disposable[] = [];
    private enabled: boolean = false;
    private lastClipboardContent: string = '';
    private mutationEngine: MutationEngine;
    private socraticDialogue: SocraticDialogue;
    private telemetryService: TelemetryService;

    constructor(
        mutationEngine: MutationEngine,
        socraticDialogue: SocraticDialogue,
        telemetryService: TelemetryService
    ) {
        this.mutationEngine = mutationEngine;
        this.socraticDialogue = socraticDialogue;
        this.telemetryService = telemetryService;
    }

    enable(): void {
        if (this.enabled) {
            return;
        }

        this.enabled = true;

        // Monitor document changes (AI code generation)
        this.disposables.push(
            vscode.workspace.onDidChangeTextDocument((event) => {
                this.handleDocumentChange(event);
            })
        );

        // Monitor clipboard changes
        this.disposables.push(
            vscode.env.clipboard.readText().then((text) => {
                this.lastClipboardContent = text;
            })
        );

        // Set up clipboard polling
        const clipboardInterval = setInterval(async () => {
            try {
                const currentClipboard = await vscode.env.clipboard.readText();
                if (currentClipboard !== this.lastClipboardContent) {
                    this.handleClipboardChange(currentClipboard);
                    this.lastClipboardContent = currentClipboard;
                }
            } catch (error) {
                console.error('Error reading clipboard:', error);
            }
        }, 500);

        this.disposables.push({
            dispose: () => clearInterval(clipboardInterval)
        });

        // Monitor paste events
        this.disposables.push(
            vscode.commands.registerCommand('editor.action.clipboardPasteAction', async () => {
                await this.handlePasteEvent();
            })
        );

        console.log('PedagogyGuard AI: Interceptor enabled');
    }

    disable(): void {
        this.enabled = false;
        this.disposables.forEach(disposable => disposable.dispose());
        this.disposables = [];
        console.log('PedagogyGuard AI: Interceptor disabled');
    }

    private async handleDocumentChange(event: vscode.TextDocumentChangeEvent): Promise<void> {
        if (!this.enabled) {
            return;
        }

        // Check if this looks like AI-generated code
        const changes = event.contentChanges;
        if (changes.length === 0) {
            return;
        }

        // Heuristic: Large insertions (>20 chars) without clipboard match suggest AI
        for (const change of changes) {
            const insertedText = change.text;
            if (insertedText.length > 20 && !this.isClipboardContent(insertedText)) {
                // Likely AI-generated code
                await this.processPotentialAICode(insertedText, event.document, change.range);
            }
        }
    }

    private async handleClipboardChange(newContent: string): Promise<void> {
        if (!this.enabled) {
            return;
        }

        // Store for later comparison
        this.lastClipboardContent = newContent;
    }

    private async handlePasteEvent(): Promise<void> {
        if (!this.enabled) {
            // Just paste normally
            await vscode.commands.executeCommand('paste');
            return;
        }

        const clipboardContent = await vscode.env.clipboard.readText();
        
        // Check if this looks like AI-generated code
        if (this.isLikelyAICode(clipboardContent)) {
            const shouldProcess = await this.promptUserForProcessing(clipboardContent);
            if (shouldProcess) {
                await this.processPotentialAICode(clipboardContent);
            } else {
                // Paste without processing
                await vscode.commands.executeCommand('paste');
            }
        } else {
            // Regular paste
            await vscode.commands.executeCommand('paste');
        }
    }

    private isClipboardContent(text: string): boolean {
        return text === this.lastClipboardContent;
    }

    private isLikelyAICode(text: string): boolean {
        // Heuristics to detect AI-generated code
        const indicators = [
            text.length > 50, // Large block of code
            text.includes('function') || text.includes('class') || text.includes('const'), // Code patterns
            !text.includes(' ') || text.split('\n').length > 5, // Multi-line or dense code
            /[A-Z][a-zA-Z]+\(.*\)/.test(text), // Function calls
            /import\s+.*from\s+/.test(text), // Import statements
        ];

        return indicators.filter(Boolean).length >= 2;
    }

    private async promptUserForProcessing(code: string): Promise<boolean> {
        const result = await vscode.window.showInformationMessage(
            'PedagogyGuard AI detected potential AI-generated code. Would you like to analyze and debug it?',
            'Analyze & Debug',
            'Paste Without Analysis'
        );

        return result === 'Analyze & Debug';
    }

    private async processPotentialAICode(
        code: string,
        document?: vscode.TextDocument,
        range?: vscode.Range
    ): Promise<void> {
        // Log telemetry
        this.telemetryService.logAICodeDetected(code.length);

        // Apply mutation
        const mutatedCode = await this.mutationEngine.applyMutation(code);

        if (mutatedCode !== code) {
            // Show mutation dialog
            const response = await this.socraticDialogue.showMutationDialog(
                code,
                mutatedCode,
                document,
                range
            );

            if (response === 'fix') {
                // Show Socratic dialogue
                await this.socraticDialogue.startDialogue(code, mutatedCode);
            } else if (response === 'accept') {
                // Accept the mutation as-is (will be tracked)
                this.telemetryService.logMutationAccepted(code.length);
            }
        }
    }

    dispose(): void {
        this.disable();
    }
}
