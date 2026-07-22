import * as vscode from 'vscode';
import { TelemetryService, DeveloperMetrics } from '../telemetry/telemetryService';

export class DashboardProvider implements vscode.TreeDataProvider<DashboardItem>, vscode.Disposable {
    private _onDidChangeTreeData = new vscode.EventEmitter<DashboardItem | undefined>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;
    private telemetryService: TelemetryService;
    private panel: vscode.WebviewPanel | undefined;

    constructor(telemetryService: TelemetryService) {
        this.telemetryService = telemetryService;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: DashboardItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: DashboardItem): Thenable<DashboardItem[]> {
        if (!element) {
            return Promise.resolve(this.getRootItems());
        }
        return Promise.resolve([]);
    }

    private getRootItems(): DashboardItem[] {
        const metrics = this.telemetryService.getMetrics();
        
        if (!metrics) {
            return [
                new DashboardItem(
                    'No Data Available',
                    vscode.TreeItemCollapsibleState.None,
                    {
                        command: 'pedagogyguard.showDashboard',
                        title: 'Show Dashboard'
                    }
                )
            ];
        }

        const items: DashboardItem[] = [];

        // Autonomy Velocity
        items.push(new DashboardItem(
            Autonomy Velocity: ,
            vscode.TreeItemCollapsibleState.None,
            {
                command: 'pedagogyguard.showDashboard',
                title: 'Show Dashboard'
            },
            'autonomy-velocity'
        ));

        // Flaw Detection Rate
        const flawRate = Math.round(metrics.flawDetectionRate * 100);
        items.push(new DashboardItem(
            Flaw Detection Rate: %,
            vscode.TreeItemCollapsibleState.None,
            {
                command: 'pedagogyguard.showDashboard',
                title: 'Show Dashboard'
            },
            'flaw-detection-rate'
        ));

        // Active Recall Score
        items.push(new DashboardItem(
            Active Recall Score: ,
            vscode.TreeItemCollapsibleState.None,
            {
                command: 'pedagogyguard.showDashboard',
                title: 'Show Dashboard'
            },
            'active-recall-score'
        ));

        // Session Count
        items.push(new DashboardItem(
            Sessions: ,
            vscode.TreeItemCollapsibleState.None,
            {
                command: 'pedagogyguard.showDashboard',
                title: 'Show Dashboard'
            },
            'session-count'
        ));

        // Last Activity
        const lastActivity = metrics.lastActivity.toLocaleDateString();
        items.push(new DashboardItem(
            Last Activity: ,
            vscode.TreeItemCollapsibleState.None,
            {
                command: 'pedagogyguard.showDashboard',
                title: 'Show Dashboard'
            },
            'last-activity'
        ));

        return items;
    }

    show(): void {
        if (this.panel) {
            this.panel.reveal(vscode.ViewColumn.Beside);
            return;
        }

        this.panel = vscode.window.createWebviewPanel(
            'pedagogyguardDashboard',
            'PedagogyGuard AI Dashboard',
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        this.panel.webview.html = this.getWebviewContent();
        
        this.panel.onDidDispose(
            () => {
                this.panel = undefined;
            },
            null,
            []
        );

        this.panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.command) {
                    case 'refresh':
                        this.refresh();
                        this.panel!.webview.html = this.getWebviewContent();
                        break;
                }
            },
            undefined,
            []
        );
    }

    private getWebviewContent(): string {
        const metrics = this.telemetryService.getMetrics();
        const recentEvents = this.telemetryService.getRecentEvents(10);
        
        let metricsHtml = '';
        if (metrics) {
            metricsHtml = 
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value"></div>
                    <div class="metric-label">Autonomy Velocity</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: %"></div>
                    </div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value">%</div>
                    <div class="metric-label">Flaw Detection Rate</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: %"></div>
                    </div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value"></div>
                    <div class="metric-label">Active Recall Score</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: %"></div>
                    </div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-value"></div>
                    <div class="metric-label">Total Sessions</div>
                </div>
            </div>
            ;
        } else {
            metricsHtml = '<div class="no-data">No metrics available yet. Start using PedagogyGuard AI to see your progress!</div>';
        }

        let eventsHtml = '';
        if (recentEvents.length > 0) {
            const eventRows = recentEvents.map(event => 
                <tr>
                    <td>
                        <span class="event-type event-type-">
                            
                        </span>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            ).join('');
            
            eventsHtml = 
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Event Type</th>
                        <th>Timestamp</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            ;
        } else {
            eventsHtml = '<div class="no-data">No recent activity recorded yet.</div>';
        }

        return 
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>PedagogyGuard AI Dashboard</title>
                <style>
                    body {
                        font-family: var(--vscode-font-family);
                        padding: 20px;
                        color: var(--vscode-foreground);
                        background-color: var(--vscode-editor-background);
                        margin: 0;
                    }
                    .dashboard-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid var(--vscode-border);
                    }
                    .dashboard-title {
                        font-size: 24px;
                        font-weight: 600;
                        color: var(--vscode-textLinkForeground);
                    }
                    .refresh-btn {
                        padding: 8px 16px;
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                    }
                    .refresh-btn:hover {
                        background-color: var(--vscode-button-hoverBackground);
                    }
                    .metrics-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin-bottom: 30px;
                    }
                    .metric-card {
                        background-color: var(--vscode-editor-background);
                        border: 1px solid var(--vscode-border);
                        border-radius: 8px;
                        padding: 20px;
                        text-align: center;
                    }
                    .metric-value {
                        font-size: 32px;
                        font-weight: 700;
                        color: var(--vscode-textLinkForeground);
                        margin-bottom: 8px;
                    }
                    .metric-label {
                        font-size: 14px;
                        color: var(--vscode-descriptionForeground);
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .section-title {
                        font-size: 18px;
                        font-weight: 600;
                        margin-bottom: 15px;
                        color: var(--vscode-textLinkForeground);
                    }
                    .events-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 30px;
                    }
                    .events-table th,
                    .events-table td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid var(--vscode-border);
                    }
                    .events-table th {
                        background-color: var(--vscode-editor-background);
                        font-weight: 600;
                        color: var(--vscode-textLinkForeground);
                    }
                    .events-table tr:hover {
                        background-color: var(--vscode-editor-hoverBackground);
                    }
                    .event-type {
                        display: inline-block;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 500;
                    }
                    .event-type-ai_code_detected {
                        background-color: var(--vscode-terminal-ansiBlue);
                        color: var(--vscode-editor-background);
                    }
                    .event-type-mutation_applied {
                        background-color: var(--vscode-terminal-ansiYellow);
                        color: var(--vscode-editor-background);
                    }
                    .event-type-dialogue_completed {
                        background-color: var(--vscode-terminal-ansiGreen);
                        color: var(--vscode-editor-background);
                    }
                    .no-data {
                        text-align: center;
                        padding: 40px;
                        color: var(--vscode-descriptionForeground);
                        font-style: italic;
                    }
                    .progress-bar {
                        width: 100%;
                        height: 8px;
                        background-color: var(--vscode-progressBar-background);
                        border-radius: 4px;
                        overflow: hidden;
                        margin-top: 10px;
                    }
                    .progress-fill {
                        height: 100%;
                        background-color: var(--vscode-progressBar-foreground);
                        transition: width 0.3s ease;
                    }
                </style>
            </head>
            <body>
                <div class="dashboard-header">
                    <div class="dashboard-title">PedagogyGuard AI Dashboard</div>
                    <button class="refresh-btn" onclick="refreshDashboard()">Refresh</button>
                </div>
                
                
                
                <div class="section-title">Recent Activity</div>
                

                <script>
                    const vscode = acquireVsCodeApi();
                    
                    function refreshDashboard() {
                        vscode.postMessage({
                            command: 'refresh'
                        });
                    }
                </script>
            </body>
            </html>
        ;
    }

    private formatEventData(data: any): string {
        if (typeof data === 'object') {
            return Object.entries(data)
                .map(([key, value]) => ${key}: )
                .join(', ');
        }
        return String(data);
    }

    dispose(): void {
        if (this.panel) {
            this.panel.dispose();
        }
    }
}

class DashboardItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command,
        public readonly contextValue?: string
    ) {
        super(label, collapsibleState);
        this.contextValue = contextValue;
    }
}
