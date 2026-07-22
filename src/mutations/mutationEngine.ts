import * as vscode from 'vscode';

export interface Mutation {
    id: string;
    type: 'timeout' | 'memory_leak' | 'sql_injection' | 'race_condition' | 'null_reference' | 'infinite_loop';
    description: string;
    originalCode: string;
    mutatedCode: string;
    severity: 'low' | 'medium' | 'high';
    pedagogicalValue: string;
}

export class MutationEngine {
    private mutations: Map<string, Mutation> = new Map();
    private mutationPatterns: Map<string, (code: string) => Mutation> = new Map();

    constructor() {
        this.initializeMutationPatterns();
    }

    private initializeMutationPatterns(): void {
        // Timeout mutation
        this.mutationPatterns.set('timeout', (code: string) => {
            const timeoutPattern = /(\.setTimeout\s*\(\s*[^,]+,\s*)(\d+)(\s*\))/;
            const match = code.match(timeoutPattern);
            
            if (match) {
                const originalTimeout = parseInt(match[2]);
                const mutatedCode = code.replace(timeoutPattern, $1);
                
                return {
                    id: this.generateId(),
                    type: 'timeout',
                    description: 'Timeout value increased by 10x - potential performance issue',
                    originalCode: code,
                    mutatedCode: mutatedCode,
                    severity: 'medium',
                    pedagogicalValue: 'Understanding timeout implications and performance monitoring'
                };
            }
            
            // Default timeout mutation
            return {
                id: this.generateId(),
                type: 'timeout',
                description: 'Added excessive timeout value',
                originalCode: code,
                mutatedCode: code.replace(')', ', 300000)'),
                severity: 'medium',
                pedagogicalValue: 'Learning about appropriate timeout configurations'
            };
        });

        // Memory leak mutation
        this.mutationPatterns.set('memory_leak', (code: string) => {
            const eventPattern = /(\.addEventListener\s*\(\s*['"])(\w+)(['"])/;
            const match = code.match(eventPattern);
            
            if (match) {
                const mutatedCode = code + '\n// TODO: Remove event listener when component unmounts';
                
                return {
                    id: this.generateId(),
                    type: 'memory_leak',
                    description: 'Event listener added without cleanup - potential memory leak',
                    originalCode: code,
                    mutatedCode: mutatedCode,
                    severity: 'high',
                    pedagogicalValue: 'Understanding event listener lifecycle and memory management'
                };
            }
            
            return {
                id: this.generateId(),
                type: 'memory_leak',
                description: 'Added event listener without cleanup',
                originalCode: code,
                mutatedCode: code + '\nwindow.addEventListener("resize", handler);',
                severity: 'high',
                pedagogicalValue: 'Learning about proper event listener cleanup'
            };
        });

        // SQL injection mutation
        this.mutationPatterns.set('sql_injection', (code: string) => {
            const queryPattern = /(['"])(.*?)(\$\{.*?\})(.*?)\1/g;
            const hasTemplateLiteral = queryPattern.test(code);
            
            if (hasTemplateLiteral) {
                return {
                    id: this.generateId(),
                    type: 'sql_injection',
                    description: 'Template literal in SQL query - potential SQL injection',
                    originalCode: code,
                    mutatedCode: code,
                    severity: 'high',
                    pedagogicalValue: 'Understanding SQL injection vulnerabilities and parameterized queries'
                };
            }
            
            return {
                id: this.generateId(),
                type: 'sql_injection',
                description: 'Added string concatenation in SQL query',
                originalCode: code,
                mutatedCode: code.replace(/(['"])(.*?)\1/, "" + userInput),
                severity: 'high',
                pedagogicalValue: 'Learning about secure query construction'
            };
        });

        // Race condition mutation
        this.mutationPatterns.set('race_condition', (code: string) => {
            const asyncPattern = /async\s+function|await\s+/;
            const hasAsync = asyncPattern.test(code);
            
            if (hasAsync) {
                return {
                    id: this.generateId(),
                    type: 'race_condition',
                    description: 'Async operation without proper error handling',
                    originalCode: code,
                    mutatedCode: code.replace(/await\s+/, 'await '),
                    severity: 'medium',
                    pedagogicalValue: 'Understanding concurrent programming and race conditions'
                };
            }
            
            return {
                id: this.generateId(),
                type: 'race_condition',
                description: 'Added concurrent operation without synchronization',
                originalCode: code,
                mutatedCode: Promise.all([, ]),
                severity: 'medium',
                pedagogicalValue: 'Learning about parallel execution and data races'
            };
        });

        // Null reference mutation
        this.mutationPatterns.set('null_reference', (code: string) => {
            const propertyPattern = /\.(\w+)/;
            const match = code.match(propertyPattern);
            
            if (match) {
                return {
                    id: this.generateId(),
                    type: 'null_reference',
                    description: 'Property access without null check',
                    originalCode: code,
                    mutatedCode: code.replace(propertyPattern, '?.'),
                    severity: 'medium',
                    pedagogicalValue: 'Understanding null safety and optional chaining'
                };
            }
            
            return {
                id: this.generateId(),
                type: 'null_reference',
                description: 'Added potential null reference',
                originalCode: code,
                mutatedCode: const data = null;\n,
                severity: 'medium',
                pedagogicalValue: 'Learning about defensive programming'
            };
        });

        // Infinite loop mutation
        this.mutationPatterns.set('infinite_loop', (code: string) => {
            const loopPattern = /for\s*\(\s*.*?;\s*.*?;\s*.*?\)/;
            const hasLoop = loopPattern.test(code);
            
            if (hasLoop) {
                return {
                    id: this.generateId(),
                    type: 'infinite_loop',
                    description: 'Loop condition may cause infinite iteration',
                    originalCode: code,
                    mutatedCode: code.replace(/;\s*.*?\)/, '; true)'),
                    severity: 'high',
                    pedagogicalValue: 'Understanding loop termination conditions'
                };
            }
            
            return {
                id: this.generateId(),
                type: 'infinite_loop',
                description: 'Added while loop without break',
                originalCode: code,
                mutatedCode: while (true) {\n  \n},
                severity: 'high',
                pedagogicalValue: 'Learning about loop control and termination'
            };
        });
    }

    async applyMutation(code: string): Promise<string> {
        // Select appropriate mutation based on code content
        const mutationType = this.selectMutationType(code);
        const mutationFactory = this.mutationPatterns.get(mutationType);
        
        if (mutationFactory) {
            const mutation = mutationFactory(code);
            this.mutations.set(mutation.id, mutation);
            return mutation.mutatedCode;
        }
        
        return code;
    }

    private selectMutationType(code: string): string {
        // Analyze code to select most relevant mutation
        if (code.includes('setTimeout') || code.includes('setInterval')) {
            return 'timeout';
        }
        if (code.includes('addEventListener') || code.includes('removeEventListener')) {
            return 'memory_leak';
        }
        if (code.includes('query') || code.includes('SELECT') || code.includes('INSERT')) {
            return 'sql_injection';
        }
        if (code.includes('async') || code.includes('await') || code.includes('Promise')) {
            return 'race_condition';
        }
        if (code.includes('.') && !code.includes('?.')) {
            return 'null_reference';
        }
        if (code.includes('for') || code.includes('while')) {
            return 'infinite_loop';
        }
        
        // Default to null reference mutation
        return 'null_reference';
    }

    getMutation(id: string): Mutation | undefined {
        return this.mutations.get(id);
    }

    getAllMutations(): Mutation[] {
        return Array.from(this.mutations.values());
    }

    private generateId(): string {
        return mutation__;
    }
}
