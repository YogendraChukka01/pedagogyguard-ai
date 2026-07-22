# PedagogyGuard AI - Architecture Documentation

## Overview

PedagogyGuard AI is a VS Code extension that transforms AI coding assistants from cognitive crutches into active learning engines. It intercepts AI-generated code, injects pedagogical guardrails, and forces junior developers to actively analyze, debug, and validate code before deployment.

## System Architecture

`
┌─────────────────────────────────────────────────────────────────┐
│                    PedagogyGuard AI Architecture                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  VS Code Editor  │    │  Webview Panel   │                   │
│  │  (User Interface)│◄──►│  (Socratic UI)   │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           │                       │                             │
│           ▼                       ▼                             │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  Interceptor     │    │  Dashboard       │                   │
│  │  Manager         │    │  Provider        │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           │                       │                             │
│           ▼                       ▼                             │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  Mutation        │    │  Telemetry       │                   │
│  │  Engine          │    │  Service         │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           │                       │                             │
│           ▼                       ▼                             │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  Code Analysis   │    │  Data Storage    │                   │
│  │  (AST Parsing)   │    │  (VS Code State) │                   │
│  └──────────────────┘    └──────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
`

## Core Components

### 1. Interceptor Manager (interceptorManager.ts)

**Purpose:** Monitors clipboard events and AI text streams to detect potential AI-generated code.

**Key Features:**
- Clipboard polling every 500ms
- Document change monitoring
- Heuristic AI code detection
- User interaction prompts

**Detection Heuristics:**
- Code blocks > 20 characters
- Contains function/class/const keywords
- Multi-line or dense code patterns
- Function calls and import statements

### 2. Mutation Engine (mutationEngine.ts)

**Purpose:** Introduces pedagogical bugs and anti-patterns into AI-generated code.

**Supported Mutations:**

| Mutation Type | Description | Severity | Pedagogical Value |
|---------------|-------------|----------|-------------------|
| Timeout | Increases timeout values | Medium | Performance monitoring |
| Memory Leak | Adds event listeners without cleanup | High | Memory management |
| SQL Injection | Introduces template literals in queries | High | Security awareness |
| Race Condition | Adds async operations without sync | Medium | Concurrent programming |
| Null Reference | Removes null checks | Medium | Defensive programming |
| Infinite Loop | Adds loops without break conditions | High | Loop control |

**Mutation Selection Logic:**
1. Analyzes code content for relevant patterns
2. Selects most appropriate mutation type
3. Applies non-breaking changes
4. Returns mutated code with documentation

### 3. Socratic Dialogue System (socraticDialogue.ts)

**Purpose:** Provides interactive Q&A to assess developer understanding.

**Question Categories:**
- Timeout-related questions
- Memory leak questions
- SQL injection questions
- Race condition questions
- Null reference questions
- Infinite loop questions

**Difficulty Levels:**
- Beginner: Basic concept understanding
- Intermediate: Implementation knowledge
- Advanced: Trade-off analysis

**Evaluation Method:**
- Semantic similarity matching
- Concept detection in responses
- Score calculation based on correct answers

### 4. Telemetry Service (	elemetryService.ts)

**Purpose:** Tracks developer metrics and progression analytics.

**Metrics Tracked:**

| Metric | Description | Calculation |
|--------|-------------|-------------|
| Autonomy Velocity | Code manually refactored after pasting | Sum of AI code lengths |
| Flaw Detection Rate | Speed/success of fixing mutations | Fixed mutations / Total mutations |
| Active Recall Score | Socratic dialogue performance | Correct responses count |
| Session Count | Total dialogue sessions | Session completions |

**Data Storage:**
- VS Code extension global state
- Persisted across sessions
- User-specific metrics

### 5. Dashboard Provider (dashboardProvider.ts)

**Purpose:** Visualizes developer progress and metrics.

**Dashboard Features:**
- Real-time metric cards
- Progress bars for each metric
- Recent activity table
- Event type categorization
- Refresh functionality

**UI Components:**
- Metric cards with values and progress bars
- Event table with timestamps
- Color-coded event types
- Responsive grid layout

## Data Flow

### 1. Code Detection Flow
`
User copies AI code → Interceptor detects change → 
Prompts user for analysis → Applies mutation → 
Shows Socratic dialogue → Tracks telemetry
`

### 2. Mutation Flow
`
Original code → Mutation engine analyzes → 
Selects appropriate mutation → Applies changes → 
Returns mutated code with documentation
`

### 3. Dialogue Flow
`
Mutation detected → Selects relevant questions → 
Presents in webview panel → Evaluates responses → 
Updates metrics → Completes session
`

### 4. Telemetry Flow
`
Event occurs → Logs to telemetry service → 
Updates user metrics → Persists to storage → 
Refreshes dashboard display
`

## File Structure

`
cop-past/
├── src/
│   ├── extension.ts              # Main extension entry point
│   ├── designTokens.ts           # UI design tokens
│   ├── interceptors/
│   │   └── interceptorManager.ts # Clipboard/AI monitoring
│   ├── mutations/
│   │   └── mutationEngine.ts     # Code mutation logic
│   ├── socratic/
│   │   └── socraticDialogue.ts   # Interactive Q&A system
│   ├── telemetry/
│   │   └── telemetryService.ts   # Metrics tracking
│   └── dashboard/
│       └── dashboardProvider.ts  # Progress visualization
├── tests/
│   ├── unit-tests/
│   │   ├── mutationEngine.test.ts
│   │   └── telemetryService.test.ts
│   └── integration-tests/
│       └── interceptor.test.ts
├── docs/
│   ├── ARCHITECTURE.md           # This file
│   ├── API.md                    # API documentation
│   └── USER_GUIDE.md             # User documentation
├── package.json                  # Extension manifest
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project overview
`

## Design Patterns

### 1. Observer Pattern
- Used for event monitoring (clipboard, document changes)
- Enables loose coupling between components
- Supports real-time updates

### 2. Strategy Pattern
- Applied to mutation selection
- Different algorithms for different code types
- Easy to extend with new mutations

### 3. Factory Pattern
- Used for creating mutation instances
- Centralizes object creation logic
- Supports dynamic mutation generation

### 4. Command Pattern
- Implemented for VS Code commands
- Encapsulates user actions
- Enables undo/redo functionality

## Performance Considerations

### 1. Clipboard Polling
- 500ms polling interval balances responsiveness and performance
- Async operations prevent UI blocking
- Error handling for clipboard access failures

### 2. Code Analysis
- Heuristic-based detection minimizes processing overhead
- Early termination for non-code content
- Caching of analysis results

### 3. Mutation Application
- Non-blocking mutations preserve editor responsiveness
- Incremental updates for large code blocks
- Background processing for complex analyses

### 4. Telemetry Storage
- Batched writes reduce I/O operations
- Asynchronous persistence prevents UI freezes
- Compression for historical data

## Security Considerations

### 1. Local Processing
- All code analysis happens locally
- No external API calls for core functionality
- User data never leaves the machine

### 2. Data Privacy
- Telemetry data stored locally
- No personally identifiable information collected
- User controls data persistence

### 3. Mutation Safety
- Non-breaking mutations only
- No destructive code changes
- Easy rollback capabilities

## Extension Points

### 1. Custom Mutations
- Add new mutation types to MutationEngine
- Define severity levels and pedagogical value
- Integrate with existing mutation selection logic

### 2. Question Categories
- Extend question bank in SocraticDialogue
- Add new difficulty levels
- Customize evaluation criteria

### 3. Metrics Tracking
- Add new metric types to TelemetryService
- Define calculation methods
- Extend dashboard visualization

### 4. UI Components
- Create new webview panels
- Add sidebar views
- Implement custom editors

## Testing Strategy

### 1. Unit Tests
- Individual component testing
- Mock external dependencies
- Edge case coverage

### 2. Integration Tests
- Component interaction testing
- End-to-end flow validation
- Performance benchmarking

### 3. Manual Testing
- VS Code extension testing
- User experience validation
- Cross-platform compatibility

## Deployment

### 1. Development
`ash
npm install
npm run compile
# Press F5 in VS Code to launch extension development host
`

### 2. Production
`ash
npm run vscode:prepublish
# Package extension for marketplace
`

### 3. Distribution
- VS Code Marketplace
- Enterprise internal feeds
- Direct installation packages

## Future Enhancements

### 1. AI Integration
- Local LLM for question generation
- Advanced code analysis
- Personalized learning paths

### 2. Analytics Dashboard
- Team metrics aggregation
- Trend analysis
- Predictive analytics

### 3. Collaboration Features
- Team challenges
- Peer code review
- Knowledge sharing

### 4. Gamification
- Achievement system
- Leaderboards
- Reward mechanisms
