import { MutationEngine } from '../../src/mutations/mutationEngine';

describe('MutationEngine', () => {
    let engine: MutationEngine;

    beforeEach(() => {
        engine = new MutationEngine();
    });

    describe('applyMutation', () => {
        it('should apply timeout mutation to code with setTimeout', async () => {
            const code = 'setTimeout(() => { console.log("hello"); }, 1000);';
            const result = await engine.applyMutation(code);
            expect(result).toContain('300000');
        });

        it('should apply memory leak mutation to code with addEventListener', async () => {
            const code = 'window.addEventListener("resize", handler);';
            const result = await engine.applyMutation(code);
            expect(result).toContain('Remove event listener');
        });

        it('should apply SQL injection mutation to query code', async () => {
            const code = 'const query = SELECT * FROM users WHERE id = ;';
            const result = await engine.applyMutation(code);
            expect(result).toBeDefined();
        });

        it('should apply null reference mutation to property access', async () => {
            const code = 'const name = user.name;';
            const result = await engine.applyMutation(code);
            expect(result).toContain('?.');
        });

        it('should apply infinite loop mutation to loop code', async () => {
            const code = 'for (let i = 0; i < 10; i++) { console.log(i); }';
            const result = await engine.applyMutation(code);
            expect(result).toContain('while (true)');
        });
    });

    describe('getMutation', () => {
        it('should return mutation by ID', async () => {
            const code = 'setTimeout(() => {}, 1000);';
            await engine.applyMutation(code);
            const mutations = engine.getAllMutations();
            expect(mutations.length).toBeGreaterThan(0);
            
            const mutation = engine.getMutation(mutations[0].id);
            expect(mutation).toBeDefined();
            expect(mutation?.id).toBe(mutations[0].id);
        });
    });

    describe('getAllMutations', () => {
        it('should return all applied mutations', async () => {
            await engine.applyMutation('setTimeout(() => {}, 1000);');
            await engine.applyMutation('window.addEventListener("resize", handler);');
            
            const mutations = engine.getAllMutations();
            expect(mutations.length).toBe(2);
        });
    });
});
