# PedagogyGuard AI - User Guide

## Overview

PedagogyGuard AI is a VS Code extension that transforms AI coding assistants from cognitive crutches into active learning engines. It intercepts AI-generated code, injects pedagogical guardrails, and forces junior developers to actively analyze, debug, and validate code before deployment.

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "PedagogyGuard AI"
4. Click "Install"

### From VSIX Package
1. Download the .vsix file
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X)
4. Click "..." menu
5. Select "Install from VSIX..."
6. Choose the downloaded file

## Getting Started

### 1. Enable PedagogyGuard AI

**Via Command Palette:**
1. Press Ctrl+Shift+P
2. Type "PedagogyGuard: Enable"
3. Press Enter

**Via Status Bar:**
1. Click the PedagogyGuard AI icon in the status bar
2. Select "Enable"

### 2. Configure Settings

**Open Settings:**
1. Press Ctrl+,
2. Search for "PedagogyGuard"

**Available Settings:**

| Setting | Default | Description |
|---------|---------|-------------|
| pedagogyguard.enabled | true | Enable/disable the extension |
| pedagogyguard.mutationIntensity | medium | Intensity of code mutations |
| pedagogyguard.socraticMode | interactive | Socratic dialogue mode |

### 3. Start Using

1. Write or paste code in VS Code
2. PedagogyGuard AI will monitor for AI-generated code
3. When detected, it will prompt you to analyze and debug

## Core Features

### 1. AI Code Detection

**How It Works:**
- Monitors clipboard and document changes
- Detects patterns suggesting AI-generated code
- Prompts user for analysis

**Detection Indicators:**
- Large code blocks (>20 characters)
- Function/class/const keywords
- Multi-line or dense code
- Function calls and imports

**User Interaction:**
When AI code is detected:
1. A notification appears
2. Choose "Analyze & Debug" or "Paste Without Analysis"
3. If analyzing, proceed to mutation step

### 2. Code Mutation (The Trap)

**What It Does:**
- Introduces subtle, non-breaking bugs
- Creates pedagogical learning opportunities
- Forces active code analysis

**Supported Mutations:**

| Mutation | Description | Learning Outcome |
|----------|-------------|------------------|
| Timeout | Increases timeout values | Performance monitoring |
| Memory Leak | Adds event listeners without cleanup | Memory management |
| SQL Injection | Introduces template literals in queries | Security awareness |
| Race Condition | Adds async operations without sync | Concurrent programming |
| Null Reference | Removes null checks | Defensive programming |
| Infinite Loop | Adds loops without break conditions | Loop control |

**Mutation Intensity:**
- Low: Subtle changes, easy to miss
- Medium: Moderate changes, requires attention
- High: Obvious changes, forces deep analysis

### 3. Socratic Dialogue

**How It Works:**
- Presents interactive Q&A in a webview panel
- Asks guiding questions about the code
- Evaluates understanding through responses

**Question Types:**
- **Beginner:** Basic concept understanding
- **Intermediate:** Implementation knowledge
- **Advanced:** Trade-off analysis

**Example Questions:**
- "What happens to this database pool connection if line 14 times out?"
- "How would you implement a circuit breaker pattern for this timeout scenario?"
- "What are the trade-offs between increasing timeout vs implementing retry logic?"

**Scoring:**
- Correct answers increase your Active Recall Score
- Performance is tracked for progression analytics
- Feedback provided after each session

### 4. Progress Dashboard

**Access:**
1. Press Ctrl+Shift+P
2. Type "PedagogyGuard: Show Progress Dashboard"
3. Press Enter

**Metrics Tracked:**

| Metric | Description | How to Improve |
|--------|-------------|----------------|
| Autonomy Velocity | Code manually refactored | Write more code yourself |
| Flaw Detection Rate | Success fixing mutations | Analyze code more carefully |
| Active Recall Score | Socratic dialogue performance | Answer questions correctly |
| Session Count | Total dialogue sessions | Participate in more dialogues |

**Dashboard Features:**
- Real-time metric updates
- Progress bars for visual tracking
- Recent activity timeline
- Event type categorization

## Usage Scenarios

### Scenario 1: Junior Developer Learning

**Situation:** You're using GitHub Copilot to generate code.

**Workflow:**
1. Accept AI-generated code suggestion
2. PedagogyGuard detects the code
3. Choose "Analyze & Debug"
4. Mutation is applied to the code
5. Socratic dialogue opens
6. Answer questions about the code
7. Fix the mutation based on understanding
8. Metrics are updated

**Learning Outcome:**
- Better understanding of code patterns
- Improved debugging skills
- Enhanced architectural intuition

### Scenario 2: Code Review Preparation

**Situation:** You want to review AI-generated code before committing.

**Workflow:**
1. Paste code into editor
2. PedagogyGuard intercepts the paste
3. Choose "Analyze & Debug"
4. Review the mutation
5. Answer Socratic questions
6. Fix issues before code review
7. Commit clean, understood code

**Learning Outcome:**
- Higher code quality
- Fewer review comments
- Better team collaboration

### Scenario 3: Skill Assessment

**Situation:** You want to track your progress over time.

**Workflow:**
1. Use PedagogyGuard regularly
2. Check Progress Dashboard weekly
3. Review metrics trends
4. Identify improvement areas
5. Focus on weak areas
6. Track progression

**Learning Outcome:**
- Clear skill progression visibility
- Data-driven learning decisions
- Measurable improvement

## Best Practices

### 1. Regular Usage
- Use PedagogyGuard daily for consistent learning
- Don't disable it when it interrupts workflow
- View interruptions as learning opportunities

### 2. Active Participation
- Take Socratic dialogues seriously
- Provide thoughtful answers
- Don't skip questions

### 3. Code Analysis
- Read mutated code carefully
- Understand the changes made
- Fix mutations based on understanding, not guessing

### 4. Progress Review
- Check dashboard weekly
- Identify patterns in metrics
- Set improvement goals

### 5. Team Integration
- Share progress with team
- Discuss learning outcomes
- Collaborate on code reviews

## Troubleshooting

### Issue: Extension Not Detecting AI Code

**Possible Causes:**
- Extension is disabled
- Code block too small
- Detection sensitivity too low

**Solutions:**
1. Check if extension is enabled
2. Ensure code block is >20 characters
3. Increase detection sensitivity in settings

### Issue: Mutations Not Applying

**Possible Causes:**
- Mutation intensity set to low
- Code doesn't match mutation patterns
- Extension error

**Solutions:**
1. Check mutation intensity setting
2. Try with different code patterns
3. Restart VS Code

### Issue: Socratic Dialogue Not Opening

**Possible Causes:**
- Socratic mode set to disabled
- Webview panel blocked
- Extension error

**Solutions:**
1. Check socratic mode setting
2. Allow webviews in VS Code settings
3. Restart VS Code

### Issue: Dashboard Not Showing Data

**Possible Causes:**
- No telemetry data yet
- Storage corrupted
- Extension error

**Solutions:**
1. Use extension to generate data
2. Clear extension storage
3. Restart VS Code

## Privacy & Security

### Data Collection
- All processing happens locally
- No code sent to external servers
- Telemetry stored in VS Code extension storage

### Data Privacy
- No personally identifiable information collected
- User controls data persistence
- Can clear data anytime

### Security
- No network requests for core functionality
- Local storage only
- User-controlled settings

## Support

### Getting Help
1. Check this user guide
2. Review the README.md
3. Search existing issues
4. Create new issue with details

### Reporting Bugs
Include:
- VS Code version
- Extension version
- Steps to reproduce
- Expected vs actual behavior
- Console logs if available

### Feature Requests
Include:
- Use case description
- Expected behavior
- Benefits for users
- Implementation suggestions

## Changelog

### Version 0.0.1 (Initial Release)
- Core interception engine
- Basic mutation types
- Socratic dialogue system
- Progress dashboard
- Telemetry tracking

## License

MIT License - See LICENSE file for details
