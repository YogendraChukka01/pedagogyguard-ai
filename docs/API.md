# PedagogyGuard AI - API Documentation

## Overview

This document describes the public API for PedagogyGuard AI VS Code extension. The API enables integration with other extensions and custom workflows.

## Commands

### pedagogyguard.enable

**Description:** Enable PedagogyGuard AI monitoring and interception.

**Usage:**
`	ypescript
vscode.commands.executeCommand('pedagogyguard.enable');
`

**Parameters:** None

**Returns:** void

**Example:**
`	ypescript
// Enable PedagogyGuard AI
await vscode.commands.executeCommand('pedagogyguard.enable');
vscode.window.showInformationMessage('PedagogyGuard AI enabled');
`

---

### pedagogyguard.disable

**Description:** Disable PedagogyGuard AI monitoring and interception.

**Usage:**
`	ypescript
vscode.commands.executeCommand('pedagogyguard.disable');
`

**Parameters:** None

**Returns:** void

**Example:**
`	ypescript
// Disable PedagogyGuard AI
await vscode.commands.executeCommand('pedagogyguard.disable');
vscode.window.showInformationMessage('PedagogyGuard AI disabled');
`

---

### pedagogyguard.showDashboard

**Description:** Show the Progress Dashboard in a webview panel.

**Usage:**
`	ypescript
vscode.commands.executeCommand('pedagogyguard.showDashboard');
`

**Parameters:** None

**Returns:** void

**Example:**
`	ypescript
// Show the dashboard
await vscode.commands.executeCommand('pedagogyguard.showDashboard');
`

## Configuration Settings

### pedagogyguard.enabled

**Type:** boolean  
**Default:** true  
**Description:** Enable or disable PedagogyGuard AI.

**Access:**
`	ypescript
const config = vscode.workspace.getConfiguration('pedagogyguard');
const isEnabled = config.get<boolean>('enabled');
`

---

### pedagogyguard.mutationIntensity

**Type:** string  
**Enum:** "low" | "medium" | "high"  
**Default:** "medium"  
**Description:** Intensity level of code mutations.

**Access:**
`	ypescript
const config = vscode.workspace.getConfiguration('pedagogyguard');
const intensity = config.get<string>('mutationIntensity');
`

---

### pedagogyguard.socraticMode

**Type:** string  
**Enum:** "interactive" | "passive" | "disabled"  
**Default:** "interactive"  
**Description:** Socratic dialogue mode.

**Access:**
`	ypescript
const config = vscode.workspace.getConfiguration('pedagogyguard');
const mode = config.get<string>('socraticMode');
`

## Classes

### InterceptorManager

**Purpose:** Monitors clipboard events and AI text streams.

**Constructor:**
`	ypescript
constructor(
    mutationEngine: MutationEngine,
    socraticDialogue: SocraticDialogue,
    telemetryService: TelemetryService
)
`

**Methods:**

#### enable()
`	ypescript
enable(): void
`
Enables the interceptor to monitor code changes.

#### disable()
`	ypescript
disable(): void
`
Disables the interceptor.

#### dispose()
`	ypescript
dispose(): void
`
Cleans up resources.

---

### MutationEngine

**Purpose:** Applies pedagogical mutations to code.

**Constructor:**
`	ypescript
constructor()
`

**Methods:**

#### applyMutation(code: string)
`	ypescript
async applyMutation(code: string): Promise<string>
`
Applies a mutation to the provided code.

**Parameters:**
- code: string - The code to mutate

**Returns:** Promise resolving to the mutated code

#### getMutation(id: string)
`	ypescript
getMutation(id: string): Mutation | undefined
`
Retrieves a mutation by ID.

**Parameters:**
- id: string - The mutation ID

**Returns:** Mutation object or undefined

#### getAllMutations()
`	ypescript
getAllMutations(): Mutation[]
`
Returns all applied mutations.

**Returns:** Array of Mutation objects

---

### SocraticDialogue

**Purpose:** Manages interactive Q&A sessions.

**Constructor:**
`	ypescript
constructor(telemetryService: TelemetryService)
`

**Methods:**

#### showMutationDialog(originalCode: string, mutatedCode: string)
`	ypescript
async showMutationDialog(
    originalCode: string,
    mutatedCode: string,
    document?: vscode.TextDocument,
    range?: vscode.Range
): Promise<'fix' | 'accept' | 'cancel'>
`
Shows a dialog asking user how to handle the mutation.

**Parameters:**
- originalCode: string - The original code
- mutatedCode: string - The mutated code
- document?: vscode.TextDocument - Optional document reference
- ange?: vscode.Range - Optional range in document

**Returns:** Promise resolving to user's choice

#### startDialogue(originalCode: string, mutatedCode: string)
`	ypescript
async startDialogue(originalCode: string, mutatedCode: string): Promise<void>
`
Starts a Socratic dialogue session.

**Parameters:**
- originalCode: string - The original code
- mutatedCode: string - The mutated code

**Returns:** Promise that resolves when dialogue completes

---

### TelemetryService

**Purpose:** Tracks developer metrics and events.

**Constructor:**
`	ypescript
constructor(context: vscode.ExtensionContext)
`

**Methods:**

#### logAICodeDetected(codeLength: number)
`	ypescript
logAICodeDetected(codeLength: number): void
`
Logs when AI-generated code is detected.

**Parameters:**
- codeLength: number - Length of detected code

#### logMutationApplied(mutationId: string, mutationType: string)
`	ypescript
logMutationApplied(mutationId: string, mutationType: string): void
`
Logs when a mutation is applied.

**Parameters:**
- mutationId: string - The mutation ID
- mutationType: string - The type of mutation

#### logMutationAccepted(codeLength: number)
`	ypescript
logMutationAccepted(codeLength: number): void
`
Logs when a mutation is accepted by the user.

**Parameters:**
- codeLength: number - Length of accepted code

#### logDialogueStarted(sessionId: string)
`	ypescript
logDialogueStarted(sessionId: string): void
`
Logs when a dialogue session starts.

**Parameters:**
- sessionId: string - The session ID

#### logDialogueResponse(dialogueSessionId: string, questionId: string, response: string, isCorrect: boolean)
`	ypescript
logDialogueResponse(
    dialogueSessionId: string,
    questionId: string,
    response: string,
    isCorrect: boolean
): void
`
Logs a dialogue response.

**Parameters:**
- dialogueSessionId: string - The dialogue session ID
- questionId: string - The question ID
- esponse: string - User's response
- isCorrect: boolean - Whether response was correct

#### logDialogueCompleted(dialogueSessionId: string, score: number, totalQuestions: number, duration: number)
`	ypescript
logDialogueCompleted(
    dialogueSessionId: string,
    score: number,
    totalQuestions: number,
    duration: number
): void
`
Logs when a dialogue session completes.

**Parameters:**
- dialogueSessionId: string - The dialogue session ID
- score: number - User's score
- 	otalQuestions: number - Total questions asked
- duration: number - Session duration in milliseconds

#### getMetrics(userId?: string)
`	ypescript
getMetrics(userId?: string): DeveloperMetrics | undefined
`
Retrieves metrics for a user.

**Parameters:**
- userId?: string - Optional user ID (defaults to current user)

**Returns:** DeveloperMetrics object or undefined

#### getAllMetrics()
`	ypescript
getAllMetrics(): Map<string, DeveloperMetrics>
`
Retrieves metrics for all users.

**Returns:** Map of user IDs to DeveloperMetrics

#### getRecentEvents(limit?: number)
`	ypescript
getRecentEvents(limit?: number): TelemetryEvent[]
`
Retreives recent telemetry events.

**Parameters:**
- limit?: number - Optional limit (defaults to 50)

**Returns:** Array of TelemetryEvent objects

#### getEventsByType(type: string)
`	ypescript
getEventsByType(type: string): TelemetryEvent[]
`
Retrieves events filtered by type.

**Parameters:**
- 	ype: string - Event type to filter by

**Returns:** Array of TelemetryEvent objects

---

### DashboardProvider

**Purpose:** Visualizes developer progress and metrics.

**Constructor:**
`	ypescript
constructor(telemetryService: TelemetryService)
`

**Methods:**

#### refresh()
`	ypescript
refresh(): void
`
Refreshes the dashboard display.

#### show()
`	ypescript
show(): void
`
Shows the dashboard in a webview panel.

#### dispose()
`	ypescript
dispose(): void
`
Cleans up resources.

## Interfaces

### Mutation
`	ypescript
interface Mutation {
    id: string;
    type: 'timeout' | 'memory_leak' | 'sql_injection' | 'race_condition' | 'null_reference' | 'infinite_loop';
    description: string;
    originalCode: string;
    mutatedCode: string;
    severity: 'low' | 'medium' | 'high';
    pedagogicalValue: string;
}
`

### SocraticQuestion
`	ypescript
interface SocraticQuestion {
    id: string;
    question: string;
    context: string;
    expectedConcepts: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}
`

### DialogueSession
`	ypescript
interface DialogueSession {
    id: string;
    questions: SocraticQuestion[];
    currentQuestionIndex: number;
    responses: string[];
    startTime: Date;
    endTime?: Date;
    score: number;
}
`

### TelemetryEvent
`	ypescript
interface TelemetryEvent {
    id: string;
    type: string;
    timestamp: Date;
    data: any;
    userId?: string;
    sessionId?: string;
}
`

### DeveloperMetrics
`	ypescript
interface DeveloperMetrics {
    autonomyVelocity: number;
    flawDetectionRate: number;
    activeRecallScore: number;
    totalMutationsDetected: number;
    totalMutationsFixed: number;
    averageFixTime: number;
    sessionCount: number;
    lastActivity: Date;
}
`

## Events

### onDidChangeTreeData
`	ypescript
readonly onDidChangeTreeData: vscode.Event<DashboardItem | undefined>;
`
Fires when the dashboard tree data changes.

## Usage Examples

### Basic Integration
`	ypescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Enable PedagogyGuard AI
    vscode.commands.executeCommand('pedagogyguard.enable');
    
    // Show dashboard
    vscode.commands.executeCommand('pedagogyguard.showDashboard');
}
`

### Custom Mutation Handling
`	ypescript
import { MutationEngine } from './mutations/mutationEngine';

const engine = new MutationEngine();
const mutatedCode = await engine.applyMutation(originalCode);
`

### Telemetry Integration
`	ypescript
import { TelemetryService } from './telemetry/telemetryService';

const telemetry = new TelemetryService(context);
telemetry.logAICodeDetected(codeLength);
const metrics = telemetry.getMetrics();
`

### Dashboard Integration
`	ypescript
import { DashboardProvider } from './dashboard/dashboardProvider';

const dashboard = new DashboardProvider(telemetryService);
dashboard.show();
`

## Error Handling

### Common Errors

#### Clipboard Access Denied
`	ypescript
try {
    const clipboard = await vscode.env.clipboard.readText();
} catch (error) {
    console.error('Clipboard access denied:', error);
    vscode.window.showErrorMessage('Unable to access clipboard');
}
`

#### Mutation Application Failed
`	ypescript
try {
    const mutatedCode = await engine.applyMutation(code);
} catch (error) {
    console.error('Mutation failed:', error);
    // Fallback to original code
    return code;
}
`

#### Dialogue Session Error
`	ypescript
try {
    await dialogue.startDialogue(originalCode, mutatedCode);
} catch (error) {
    console.error('Dialogue failed:', error);
    vscode.window.showErrorMessage('Dialogue session failed');
}
`

## Best Practices

### 1. Extension Activation
- Activate on relevant language events
- Register all commands in activate()
- Clean up resources in deactivate()

### 2. Error Handling
- Always wrap async operations in try-catch
- Provide fallback behaviors
- Log errors for debugging

### 3. Performance
- Use async operations for I/O
- Minimize UI blocking operations
- Cache expensive computations

### 4. Testing
- Mock external dependencies
- Test edge cases
- Use integration tests for complex flows

### 5. Documentation
- Document all public APIs
- Provide usage examples
- Include error handling guidance
