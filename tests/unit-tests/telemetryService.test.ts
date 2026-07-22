import { TelemetryService } from '../../src/telemetry/telemetryService';

describe('TelemetryService', () => {
    let service: TelemetryService;
    let mockContext: any;

    beforeEach(() => {
        mockContext = {
            globalState: {
                get: jest.fn().mockReturnValue([]),
                update: jest.fn()
            }
        };
        service = new TelemetryService(mockContext);
    });

    describe('logAICodeDetected', () => {
        it('should log AI code detection event', () => {
            service.logAICodeDetected(100);
            const events = service.getRecentEvents();
            expect(events.length).toBe(1);
            expect(events[0].type).toBe('ai_code_detected');
        });
    });

    describe('logMutationApplied', () => {
        it('should log mutation application event', () => {
            service.logMutationApplied('mutation_123', 'timeout');
            const events = service.getRecentEvents();
            expect(events.length).toBe(1);
            expect(events[0].type).toBe('mutation_applied');
        });
    });

    describe('logDialogueStarted', () => {
        it('should log dialogue start event', () => {
            service.logDialogueStarted('session_123');
            const events = service.getRecentEvents();
            expect(events.length).toBe(1);
            expect(events[0].type).toBe('dialogue_started');
        });
    });

    describe('getMetrics', () => {
        it('should return metrics for user', () => {
            service.logAICodeDetected(100);
            service.logMutationApplied('mutation_123', 'timeout');
            service.logMutationAccepted(100);
            
            const metrics = service.getMetrics();
            expect(metrics).toBeDefined();
            expect(metrics?.autonomyVelocity).toBe(100);
            expect(metrics?.totalMutationsDetected).toBe(1);
            expect(metrics?.totalMutationsFixed).toBe(1);
        });
    });

    describe('getRecentEvents', () => {
        it('should return limited number of events', () => {
            for (let i = 0; i < 10; i++) {
                service.logAICodeDetected(i * 10);
            }
            
            const events = service.getRecentEvents(5);
            expect(events.length).toBe(5);
        });
    });
});
