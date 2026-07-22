# PedagogyGuard AI

## The Smart-Guard Infrastructure for Entry-Level Engineers

**Hackathon Theme:** AI-Driven Education, Corporate Upskilling, and Future of Work

---

## Overview

PedagogyGuard AI is a VS Code extension that transforms AI coding assistants from cognitive crutches into active learning engines. It intercepts AI-generated code, injects pedagogical guardrails, and forces junior developers to actively analyze, debug, and validate code before deployment.

## The Problem

- AI coding assistants generate up to 90% of boilerplate code
- Tech firms have reduced junior developer hiring
- Entry-level engineers have become passive "code pasters"
- They bypass manual debugging crucial for developing deep architectural intuition

## The Solution

PedagogyGuard AI acts as an automated, interactive gatekeeper:

1. **Intercept Engine** - Monitors clipboard events or inline AI text streams
2. **Code Mutation (The Trap)** - Introduces intentional architectural flaws
3. **Socratic Challenge** - Blocks saving/committing until developer fixes issues
4. **Telemetry Sync** - Tracks developer competency progression

## Core Features

### 1. AI Inoculator (Code Mutation)
Introduces subtle, non-breaking bugs or anti-patterns that junior developers must spot and fix.

### 2. Contextual Socratic Dialogues
Interactive side-panel with guiding questions that evaluate understanding.

### 3. Architecture Progress Dashboard
Management dashboard tracking structural growth metrics:
- Autonomy Velocity
- Flaw Detection Rate
- Active Recall Score

## Tech Stack

| Layer | Component | Technology |
|-------|-----------|------------|
| Frontend | Editor Plugin | VS Code Extension API (TypeScript) |
| Local Logic | Text Processing | Node.js / Tree-sitter |
| AI Assessment | Local Evaluation | Ollama (Llama-3-8B-Instruct) / Gemini API |
| Backend | Analytics API | Python (FastAPI) + PostgreSQL |

## Project Structure

`
cop-past/
├── src/                    # Source code
│   ├── extension.ts        # Main entry point
│   ├── designTokens.ts     # UI design tokens
│   ├── interceptors/       # AI code detection
│   ├── mutations/          # Code mutation engine
│   ├── socratic/           # Interactive Q&A
│   ├── telemetry/          # Metrics tracking
│   └── dashboard/          # Progress visualization
├── tests/                  # Test files
├── docs/                   # Documentation
├── package.json            # VS Code extension manifest
├── tsconfig.json           # TypeScript configuration
└── LICENSE                 # MIT License
`

## Getting Started

### Installation

1. Open VS Code
2. Open the cop-past folder
3. Run 
pm install to install dependencies
4. Press **F5** to launch Extension Development Host

### Usage

1. Enable PedagogyGuard AI via Command Palette
2. Write or paste code in VS Code
3. When AI code is detected, choose to analyze and debug
4. Complete Socratic dialogue sessions
5. Track your progress in the dashboard

## Development

### Prerequisites

- Node.js (v18 or higher)
- VS Code (v1.85 or higher)
- TypeScript (v5.3 or higher)

### Commands

`ash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run tests
npm test

# Lint code
npm run lint
`

### VS Code Extension Commands

- PedagogyGuard: Enable - Enable the extension
- PedagogyGuard: Disable - Disable the extension
- PedagogyGuard: Show Progress Dashboard - Show the dashboard

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and components
- [API](docs/API.md) - Complete API reference
- [User Guide](docs/USER_GUIDE.md) - How to use the extension
- [Pitch](docs/PITCH.md) - Hackathon pitch document

## Testing

`ash
# Run all tests
npm test

# Run specific test
npm test -- --grep "MutationEngine"
`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details

## Acknowledgments

- VS Code Extension API
- TypeScript Community
- Open Source Contributors

## Contact

- Email: team@pedagogyguard.ai
- GitHub: github.com/pedagogyguard-ai
- Website: pedagogyguard.ai
