import { InterceptorManager } from '../../src/interceptors/interceptorManager';
import { MutationEngine } from '../../src/mutations/mutationEngine';
import { SocraticDialogue } from '../../src/socratic/socraticDialogue';
import { TelemetryService } from '../../src/telemetry/telemetryService';

describe('InterceptorManager Integration', () => {
    let interceptor: InterceptorManager;
    let mutationEngine: MutationEngine;
    let socraticDialogue: SocraticDialogue;
    let telemetryService: TelemetryService;
    let mockContext: any;

    beforeEach(() => {
        mockContext = {
            globalState: {
                get: jest.fn().mockReturnValue([]),
                update: jest.fn()
            }
        };
        
        telemetryService = new TelemetryService(mockContext);
        mutationEngine = new MutationEngine();
        socraticDialogue = new SocraticDialogue(telemetryService);
        interceptor = new InterceptorManager(mutationEngine, socraticDialogue, telemetryService);
    });

    describe('enable/disable', () => {
        it('should enable interceptor', () => {
            interceptor.enable();
            expect((interceptor as any).enabled).toBe(true);
        });

        it('should disable interceptor', () => {
            interceptor.enable();
            interceptor.disable();
            expect((interceptor as any).enabled).toBe(false);
        });
    });

    describe('code detection', () => {
        it('should detect AI-generated code patterns', () => {
            const largeCodeBlock = 
                function complexAlgorithm(data) {
                    const result = data.map(item => {
                        return item.value * 2;
                    }).filter(item => item > 10);
                    return result;
                }
            ;
            
            const isAI = (interceptor as any).isLikelyAICode(largeCodeBlock);
            expect(isAI).toBe(true);
        });

        it('should not detect short text as AI code', () => {
            const shortText = 'const x = 5;';
            const isAI = (interceptor as any).isLikelyAICode(shortText);
            expect(isAI).toBe(false);
        });
    });

    describe('mutation processing', () => {
        it('should process potential AI code', async () => {
            const code = 'setTimeout(() => {}, 1000);';
            await (interceptor as any).processPotentialAICode(code);
            
            const events = telemetryService.getRecentEvents();
            expect(events.some(e => e.type === 'ai_code_detected')).toBe(true);
        });
    });
});
