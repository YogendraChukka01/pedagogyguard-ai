import * as vscode from 'vscode';
import { InterceptorManager } from './interceptors/interceptorManager';
import { MutationEngine } from './mutations/mutationEngine';
import { SocraticDialogue } from './socratic/socraticDialogue';
import { TelemetryService } from './telemetry/telemetryService';
import { DashboardProvider } from './dashboard/dashboardProvider';

let interceptorManager: InterceptorManager;
let mutationEngine: MutationEngine;
let socraticDialogue: SocraticDialogue;
let telemetryService: TelemetryService;
let dashboardProvider: DashboardProvider;

export function activate(context: vscode.ExtensionContext) {
    console.log('PedagogyGuard AI is now active!');

    // Initialize services
    telemetryService = new TelemetryService(context);
    mutationEngine = new MutationEngine();
    socraticDialogue = new SocraticDialogue(telemetryService);
    interceptorManager = new InterceptorManager(mutationEngine, socraticDialogue, telemetryService);
    dashboardProvider = new DashboardProvider(telemetryService);

    // Register commands
    let enableCommand = vscode.commands.registerCommand('pedagogyguard.enable', () => {
        interceptorManager.enable();
        vscode.window.showInformationMessage('PedagogyGuard AI enabled');
    });

    let disableCommand = vscode.commands.registerCommand('pedagogyguard.disable', () => {
        interceptorManager.disable();
        vscode.window.showInformationMessage('PedagogyGuard AI disabled');
    });

    let showDashboardCommand = vscode.commands.registerCommand('pedagogyguard.showDashboard', () => {
        dashboardProvider.show();
    });

    // Register tree data provider for dashboard
    vscode.window.registerTreeDataProvider('pedagogyguardDashboard', dashboardProvider);

    // Start intercepting if enabled
    const config = vscode.workspace.getConfiguration('pedagogyguard');
    if (config.get<boolean>('enabled')) {
        interceptorManager.enable();
    }

    context.subscriptions.push(
        enableCommand,
        disableCommand,
        showDashboardCommand,
        interceptorManager,
        dashboardProvider
    );
}

export function deactivate() {
    if (interceptorManager) {
        interceptorManager.dispose();
    }
    if (telemetryService) {
        telemetryService.dispose();
    }
}
