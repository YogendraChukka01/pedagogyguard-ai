import * as vscode from 'vscode';
import { TelemetryService } from '../telemetry/telemetryService';

export interface SocraticQuestion {
    id: string;
    question: string;
    context: string;
    expectedConcepts: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface DialogueSession {
    id: string;
    questions: SocraticQuestion[];
    currentQuestionIndex: number;
    responses: string[];
    startTime: Date;
    endTime?: Date;
    score: number;
}

export class SocraticDialogue {
    private telemetryService: TelemetryService;
    private activeSessions: Map<string, DialogueSession> = new Map();
    private questionBank: SocraticQuestion[] = [];

    constructor(telemetryService: TelemetryService) {
        this.telemetryService = telemetryService;
        this.initializeQuestionBank();
    }

    private initializeQuestionBank(): void {
        this.questionBank = [
            // Timeout-related questions
            {
                id: 'timeout_1',
                question: 'What happens to this database pool connection if line 14 times out?',
                context: 'database connection with timeout',
                expectedConcepts: ['connection leak', 'resource management', 'timeout handling'],
                difficulty: 'beginner'
            },
            {
                id: 'timeout_2',
                question: 'How would you implement a circuit breaker pattern for this timeout scenario?',
                context: 'service communication with timeout',
                expectedConcepts: ['circuit breaker', 'fallback mechanism', 'retry logic'],
                difficulty: 'intermediate'
            },
            {
                id: 'timeout_3',
                question: 'What are the trade-offs between increasing timeout vs implementing retry logic?',
                context: 'timeout configuration',
                expectedConcepts: ['performance', 'reliability', 'user experience'],
                difficulty: 'advanced'
            },

            // Memory leak questions
            {
                id: 'memory_1',
                question: 'What happens if this event listener is never removed?',
                context: 'event listener in component',
                expectedConcepts: ['memory leak', 'garbage collection', 'component lifecycle'],
                difficulty: 'beginner'
            },
            {
                id: 'memory_2',
                question: 'How would you implement proper cleanup for this event listener?',
                context: 'React component with event listener',
                expectedConcepts: ['useEffect cleanup', 'componentWillUnmount', 'dispose pattern'],
                difficulty: 'intermediate'
            },
            {
                id: 'memory_3',
                question: 'What are the performance implications of multiple memory leaks in a long-running application?',
                context: 'large application with multiple components',
                expectedConcepts: ['memory pressure', 'garbage collection overhead', 'application stability'],
                difficulty: 'advanced'
            },

            // SQL injection questions
            {
                id: 'sql_1',
                question: 'What security vulnerability exists in this database query?',
                context: 'SQL query with user input',
                expectedConcepts: ['SQL injection', 'input validation', 'parameterized queries'],
                difficulty: 'beginner'
            },
            {
                id: 'sql_2',
                question: 'How would you refactor this query to prevent SQL injection?',
                context: 'dynamic SQL query',
                expectedConcepts: ['prepared statements', 'ORM usage', 'input sanitization'],
                difficulty: 'intermediate'
            },
            {
                id: 'sql_3',
                question: 'What are the implications of using an ORM vs raw SQL queries for security?',
                context: 'database access layer',
                expectedConcepts: ['abstraction layers', 'query building', 'security trade-offs'],
                difficulty: 'advanced'
            },

            // Race condition questions
            {
                id: 'race_1',
                question: 'What problem might occur when multiple async operations run simultaneously?',
                context: 'concurrent async operations',
                expectedConcepts: ['race condition', 'data consistency', 'ordering issues'],
                difficulty: 'beginner'
            },
            {
                id: 'race_2',
                question: 'How would you implement proper synchronization for these operations?',
                context: 'async data processing',
                expectedConcepts: ['locks', 'semaphores', 'async/await patterns'],
                difficulty: 'intermediate'
            },
            {
                id: 'race_3',
                question: 'What are the trade-offs between different synchronization strategies?',
                context: 'high-concurrency system',
                expectedConcepts: ['performance vs safety', 'deadlock prevention', 'scalability'],
                difficulty: 'advanced'
            },

            // Null reference questions
            {
                id: 'null_1',
                question: 'What happens if this variable is null or undefined?',
                context: 'property access without null check',
                expectedConcepts: ['null reference error', 'defensive programming', 'optional chaining'],
                difficulty: 'beginner'
            },
            {
                id: 'null_2',
                question: 'How would you implement proper null safety for this code?',
                context: 'data access layer',
                expectedConcepts: ['null checks', 'default values', 'type guards'],
                difficulty: 'intermediate'
            },
            {
                id: 'null_3',
                question: 'What are the trade-offs between different null safety approaches?',
                context: 'large codebase with null safety requirements',
                expectedConcepts: ['strict null checks', 'runtime vs compile-time', 'backward compatibility'],
                difficulty: 'advanced'
            },

            // Infinite loop questions
            {
                id: 'loop_1',
                question: 'What condition might cause this loop to run indefinitely?',
                context: 'loop with dynamic termination',
                expectedConcepts: ['infinite loop', 'termination condition', 'loop invariant'],
                difficulty: 'beginner'
            },
            {
                id: 'loop_2',
                question: 'How would you add proper termination safeguards to this loop?',
                context: 'loop processing external data',
                expectedConcepts: ['timeout', 'iteration limit', 'break conditions'],
                difficulty: 'intermediate'
            },
            {
                id: 'loop_3',
                question: 'What are the performance implications of different loop termination strategies?',
                context: 'performance-critical loop',
                expectedConcepts: ['early termination', 'loop unrolling', 'compiler optimizations'],
                difficulty: 'advanced'
            }
        ];
    }

    async showMutationDialog(
        originalCode: string,
        mutatedCode: string,
        document?: vscode.TextDocument,
        range?: vscode.Range
    ): Promise<'fix' | 'accept' | 'cancel'> {
        const result = await vscode.window.showWarningMessage(
            'PedagogyGuard AI detected a potential issue in the code:',
            'Fix with Socratic Dialogue',
            'Accept Mutation',
            'Cancel'
        );

        if (result === 'Fix with Socratic Dialogue') {
            return 'fix';
        } else if (result === 'Accept Mutation') {
            return 'accept';
        }
        return 'cancel';
    }

    async startDialogue(originalCode: string, mutatedCode: string): Promise<void> {
        const sessionId = this.generateSessionId();
        const relevantQuestions = this.selectQuestions(originalCode, mutatedCode);
        
        const session: DialogueSession = {
            id: sessionId,
            questions: relevantQuestions,
            currentQuestionIndex: 0,
            responses: [],
            startTime: new Date(),
            score: 0
        };

        this.activeSessions.set(sessionId, session);
        this.telemetryService.logDialogueStarted(sessionId);

        await this.presentQuestion(session);
    }

    private selectQuestions(originalCode: string, mutatedCode: string): SocraticQuestion[] {
        // Select 3-5 questions based on the mutation type
        const selectedQuestions: SocraticQuestion[] = [];
        
        // Analyze the mutation to determine relevant question categories
        if (mutatedCode.includes('timeout') || mutatedCode.includes('setTimeout')) {
            selectedQuestions.push(...this.questionBank.filter(q => q.id.startsWith('timeout_')));
        }
        if (mutatedCode.includes('addEventListener') || mutatedCode.includes('memory')) {
            selectedQuestions.push(...this.questionBank.filter(q => q.id.startsWith('memory_')));
        }
        if (mutatedCode.includes('query') || mutatedCode.includes('SQL')) {
            selectedQuestions.push(...this.questionBank.filter(q => q.id.startsWith('sql_')));
        }
        if (mutatedCode.includes('async') || mutatedCode.includes('await')) {
            selectedQuestions.push(...this.questionBank.filter(q => q.id.startsWith('race_')));
        }
        if (mutatedCode.includes('null') || mutatedCode.includes('?.')) {
            selectedQuestions.push(...this.questionBank.filter(q => q.id.startsWith('null_')));
        }
        if (mutatedCode.includes('while') || mutatedCode.includes('for')) {
            selectedQuestions.push(...this.questionBank.filter(q => q.id.startsWith('loop_')));
        }

        // If no specific questions found, add general questions
        if (selectedQuestions.length === 0) {
            selectedQuestions.push(
                ...this.questionBank.filter(q => q.difficulty === 'beginner').slice(0, 3)
            );
        }

        // Shuffle and limit to 3-5 questions
        return this.shuffleArray(selectedQuestions).slice(0, Math.min(5, selectedQuestions.length));
    }

    private async presentQuestion(session: DialogueSession): Promise<void> {
        if (session.currentQuestionIndex >= session.questions.length) {
            await this.completeDialogue(session);
            return;
        }

        const question = session.questions[session.currentQuestionIndex];
        
        // Show question in webview panel
        const panel = vscode.window.createWebviewPanel(
            'socraticDialogue',
            'Socratic Dialogue - PedagogyGuard AI',
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        panel.webview.html = this.getWebviewContent(question, session);
        
        // Handle messages from webview
        panel.webview.onDidReceiveMessage(
            async (message) => {
                if (message.command === 'submitAnswer') {
                    const answer = message.answer;
                    session.responses.push(answer);
                    
                    // Evaluate answer
                    const isCorrect = this.evaluateAnswer(answer, question);
                    if (isCorrect) {
                        session.score++;
                    }

                    this.telemetryService.logDialogueResponse(
                        session.id,
                        question.id,
                        answer,
                        isCorrect
                    );

                    // Move to next question
                    session.currentQuestionIndex++;
                    await this.presentQuestion(session);
                    
                    panel.dispose();
                } else if (message.command === 'skipQuestion') {
                    session.currentQuestionIndex++;
                    await this.presentQuestion(session);
                    panel.dispose();
                }
            },
            undefined,
            []
        );
    }

    private getWebviewContent(question: SocraticQuestion, session: DialogueSession): string {
        return 
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Socratic Dialogue</title>
                <style>
                    body {
                        font-family: var(--vscode-font-family);
                        padding: 20px;
                        color: var(--vscode-foreground);
                        background-color: var(--vscode-editor-background);
                    }
                    .question-container {
                        margin-bottom: 20px;
                        padding: 15px;
                        border: 1px solid var(--vscode-border);
                        border-radius: 6px;
                        background-color: var(--vscode-editor-background);
                    }
                    .question-header {
                        font-size: 16px;
                        font-weight: 600;
                        margin-bottom: 10px;
                        color: var(--vscode-textLinkForeground);
                    }
                    .question-text {
                        font-size: 14px;
                        line-height: 1.5;
                        margin-bottom: 15px;
                    }
                    .context-info {
                        font-size: 12px;
                        color: var(--vscode-descriptionForeground);
                        margin-bottom: 15px;
                    }
                    .difficulty-badge {
                        display: inline-block;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    .difficulty-beginner {
                        background-color: var(--vscode-terminal-ansiGreen);
                        color: var(--vscode-editor-background);
                    }
                    .difficulty-intermediate {
                        background-color: var(--vscode-terminal-ansiYellow);
                        color: var(--vscode-editor-background);
                    }
                    .difficulty-advanced {
                        background-color: var(--vscode-terminal-ansiRed);
                        color: var(--vscode-editor-background);
                    }
                    .progress-info {
                        font-size: 12px;
                        color: var(--vscode-descriptionForeground);
                        margin-bottom: 15px;
                    }
                    textarea {
                        width: 100%;
                        height: 120px;
                        padding: 10px;
                        border: 1px solid var(--vscode-input-border);
                        border-radius: 4px;
                        background-color: var(--vscode-input-background);
                        color: var(--vscode-input-foreground);
                        font-family: var(--vscode-font-family);
                        resize: vertical;
                        margin-bottom: 15px;
                    }
                    textarea:focus {
                        outline: none;
                        border-color: var(--vscode-focusBorder);
                    }
                    .button-container {
                        display: flex;
                        gap: 10px;
                    }
                    button {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .submit-btn {
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                    }
                    .submit-btn:hover {
                        background-color: var(--vscode-button-hoverBackground);
                    }
                    .skip-btn {
                        background-color: var(--vscode-secondaryButton-background);
                        color: var(--vscode-secondaryButton-foreground);
                    }
                    .skip-btn:hover {
                        background-color: var(--vscode-secondaryButton-hoverBackground);
                    }
                </style>
            </head>
            <body>
                <div class="question-container">
                    <div class="progress-info">
                        Question  of 
                    </div>
                    <span class="difficulty-badge difficulty-">
                        
                    </span>
                    <div class="question-header">Socratic Question</div>
                    <div class="question-text"></div>
                    <div class="context-info">Context: </div>
                </div>
                
                <textarea id="answer" placeholder="Type your answer here..."></textarea>
                
                <div class="button-container">
                    <button class="submit-btn" onclick="submitAnswer()">Submit Answer</button>
                    <button class="skip-btn" onclick="skipQuestion()">Skip Question</button>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    
                    function submitAnswer() {
                        const answer = document.getElementById('answer').value;
                        vscode.postMessage({
                            command: 'submitAnswer',
                            answer: answer
                        });
                    }
                    
                    function skipQuestion() {
                        vscode.postMessage({
                            command: 'skipQuestion'
                        });
                    }
                </script>
            </body>
            </html>
        ;
    }

    private evaluateAnswer(answer: string, question: SocraticQuestion): boolean {
        const answerLower = answer.toLowerCase();
        
        // Check if answer contains expected concepts
        const conceptMatches = question.expectedConcepts.filter(concept => 
            answerLower.includes(concept.toLowerCase())
        );
        
        // If answer contains at least one expected concept, consider it correct
        return conceptMatches.length > 0;
    }

    private async completeDialogue(session: DialogueSession): Promise<void> {
        session.endTime = new Date();
        const duration = session.endTime.getTime() - session.startTime.getTime();
        
        this.telemetryService.logDialogueCompleted(
            session.id,
            session.score,
            session.questions.length,
            duration
        );

        // Show completion dialog
        const percentage = Math.round((session.score / session.questions.length) * 100);
        let message = Dialogue completed!\n\n;
        message += Score: / (%)\n;
        message += Time:  seconds\n\n;
        
        if (percentage >= 80) {
            message += 'Excellent! You demonstrated strong understanding of the concepts.';
        } else if (percentage >= 60) {
            message += 'Good effort! Consider reviewing the concepts for better understanding.';
        } else {
            message += 'Keep practicing! Understanding these concepts will make you a better developer.';
        }

        await vscode.window.showInformationMessage(message, 'OK');
    }

    private generateSessionId(): string {
        return session__;
    }

    private shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}
