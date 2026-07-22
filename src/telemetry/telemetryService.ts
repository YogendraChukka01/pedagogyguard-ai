import * as vscode from 'vscode';

export interface TelemetryEvent {
    id: string;
    type: string;
    timestamp: Date;
    data: any;
    userId?: string;
    sessionId?: string;
}

export interface DeveloperMetrics {
    autonomyVelocity: number;
    flawDetectionRate: number;
    activeRecallScore: number;
    totalMutationsDetected: number;
    totalMutationsFixed: number;
    averageFixTime: number;
    sessionCount: number;
    lastActivity: Date;
}

export class TelemetryService implements vscode.Disposable {
    private context: vscode.ExtensionContext;
    private events: TelemetryEvent[] = [];
    private metrics: Map<string, DeveloperMetrics> = new Map();
    private currentSessionId: string;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.currentSessionId = this.generateSessionId();
        this.loadPersistedData();
    }

    private loadPersistedData(): void {
        // Load persisted telemetry data from extension storage
        const persistedEvents = this.context.globalState.get<TelemetryEvent[]>('pedagogyguard.events', []);
        this.events = persistedEvents;
        
        const persistedMetrics = this.context.globalState.get<Map<string, DeveloperMetrics>>('pedagogyguard.metrics', new Map());
        this.metrics = persistedMetrics;
    }

    private async persistData(): Promise<void> {
        // Persist telemetry data to extension storage
        await this.context.globalState.update('pedagogyguard.events', this.events);
        await this.context.globalState.update('pedagogyguard.metrics', this.metrics);
    }

    logAICodeDetected(codeLength: number): void {
        const event: TelemetryEvent = {
            id: this.generateEventId(),
            type: 'ai_code_detected',
            timestamp: new Date(),
            data: {
                codeLength,
                sessionId: this.currentSessionId
            }
        };
        
        this.events.push(event);
        this.updateMetrics('aiCodeDetected', codeLength);
        this.persistData();
    }

    logMutationApplied(mutationId: string, mutationType: string): void {
        const event: TelemetryEvent = {
            id: this.generateEventId(),
            type: 'mutation_applied',
            timestamp: new Date(),
            data: {
                mutationId,
                mutationType,
                sessionId: this.currentSessionId
            }
        };
        
        this.events.push(event);
        this.updateMetrics('mutationsDetected', 1);
        this.persistData();
    }

    logMutationAccepted(codeLength: number): void {
        const event: TelemetryEvent = {
            id: this.generateEventId(),
            type: 'mutation_accepted',
            timestamp: new Date(),
            data: {
                codeLength,
                sessionId: this.currentSessionId
            }
        };
        
        this.events.push(event);
        this.updateMetrics('mutationsAccepted', 1);
        this.persistData();
    }

    logDialogueStarted(sessionId: string): void {
        const event: TelemetryEvent = {
            id: this.generateEventId(),
            type: 'dialogue_started',
            timestamp: new Date(),
            data: {
                dialogueSessionId: sessionId,
                sessionId: this.currentSessionId
            }
        };
        
        this.events.push(event);
        this.updateMetrics('dialogueSessions', 1);
        this.persistData();
    }

    logDialogueResponse(
        dialogueSessionId: string,
        questionId: string,
        response: string,
        isCorrect: boolean
    ): void {
        const event: TelemetryEvent = {
            id: this.generateEventId(),
            type: 'dialogue_response',
            timestamp: new Date(),
            data: {
                dialogueSessionId,
                questionId,
                responseLength: response.length,
                isCorrect,
                sessionId: this.currentSessionId
            }
        };
        
        this.events.push(event);
        
        if (isCorrect) {
            this.updateMetrics('correctResponses', 1);
        } else {
            this.updateMetrics('incorrectResponses', 1);
        }
        
        this.persistData();
    }

    logDialogueCompleted(
        dialogueSessionId: string,
        score: number,
        totalQuestions: number,
        duration: number
    ): void {
        const event: TelemetryEvent = {
            id: this.generateEventId(),
            type: 'dialogue_completed',
            timestamp: new Date(),
            data: {
                dialogueSessionId,
                score,
                totalQuestions,
                duration,
                sessionId: this.currentSessionId
            }
        };
        
        this.events.push(event);
        this.updateMetrics('totalDialogueTime', duration);
        this.persistData();
    }

    private updateMetrics(metricType: string, value: number): void {
        const userId = this.getCurrentUserId();
        let userMetrics = this.metrics.get(userId);
        
        if (!userMetrics) {
            userMetrics = {
                autonomyVelocity: 0,
                flawDetectionRate: 0,
                activeRecallScore: 0,
                totalMutationsDetected: 0,
                totalMutationsFixed: 0,
                averageFixTime: 0,
                sessionCount: 0,
                lastActivity: new Date()
            };
            this.metrics.set(userId, userMetrics);
        }

        switch (metricType) {
            case 'aiCodeDetected':
                userMetrics.autonomyVelocity += value;
                break;
            case 'mutationsDetected':
                userMetrics.totalMutationsDetected += value;
                break;
            case 'mutationsAccepted':
                userMetrics.totalMutationsFixed += value;
                userMetrics.flawDetectionRate = userMetrics.totalMutationsFixed / userMetrics.totalMutationsDetected;
                break;
            case 'correctResponses':
                userMetrics.activeRecallScore += value;
                break;
            case 'dialogueSessions':
                userMetrics.sessionCount += value;
                break;
            case 'totalDialogueTime':
                const totalResponses = userMetrics.activeRecallScore;
                if (totalResponses > 0) {
                    userMetrics.averageFixTime = (userMetrics.averageFixTime * (totalResponses - 1) + value) / totalResponses;
                }
                break;
        }
        
        userMetrics.lastActivity = new Date();
    }

    getMetrics(userId?: string): DeveloperMetrics | undefined {
        const targetUserId = userId || this.getCurrentUserId();
        return this.metrics.get(targetUserId);
    }

    getAllMetrics(): Map<string, DeveloperMetrics> {
        return this.metrics;
    }

    getRecentEvents(limit: number = 50): TelemetryEvent[] {
        return this.events
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit);
    }

    getEventsByType(type: string): TelemetryEvent[] {
        return this.events.filter(event => event.type === type);
    }

    private getCurrentUserId(): string {
        // In a real implementation, this would be a unique user identifier
        return 'default_user';
    }

    private generateEventId(): string {
        return event__;
    }

    private generateSessionId(): string {
        return session__;
    }

    dispose(): void {
        this.persistData();
    }
}
