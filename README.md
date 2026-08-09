<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.3%2B-blue.svg?style=flat"/>
  <img src="https://img.shields.io/badge/VS_Code-1.95%2B-blue.svg?style=flat"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat"/>
  <img src="https://img.shields.io/badge/Hackathon-AI%20Education-green.svg?style=flat"/>
</p>

# 🛡️ PedagogyGuard AI

### The Smart-Guard Infrastructure for Entry-Level Engineers

> **Transform AI coding assistants from cognitive crutches into active learning engines.**
> PedagogyGuard AI intercepts AI-generated code, injects pedagogical guardrails, and forces junior developers to actively analyze, debug, and validate code before deployment.

## Project Snapshot

```
┌──────────────────────────────────────────────────────┐
│ 🛡️ PedagogyGuard AI                                   │
│                                                      │
│ VS Code extension for AI-powered learning            │
│                                                      │
│ UI        Backend      Tech                         │
│ Webview   TypeScript   VS Code API                  │
│           ESLint                                  │
│                                                      │
│ Status: Hackathon  License: MIT                     │
└──────────────────────────────────────────────────────┘
```

## How It Works

```
INPUT
  ↓           Developer copies AI-generated code
  ↓
DETECT        InterceptorManager monitors:
  ↓           - Document changes (heuristic: >20 char insertions)
  ↓           - Clipboard (500ms polling)
  ↓           - Paste events (intercepted via command override)
MUTATE        MutationEngine injects 6 types of bugs:
  ↓           Timeout · Memory Leak · SQL Injection · Race · Null Ref · Inf. Loop
CHALLENGE     SocraticDialogue shows mutation + asks Qs
  ↓            (18+ questions, 3 difficulty levels)
TRACK         TelemetryService logs metrics to dashboard
  ↓
OUTPUT        Progress dashboard in VS Code sidebar
```

---

## 📋 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 The Problem

The widespread integration of AI coding assistants (GitHub Copilot, Claude Code, Cursor) has disrupted the traditional software engineering apprenticeship model.

| Impact Area | Description |
|-------------|-------------|
| **Junior Developers** | Have become passive "code pasters" who bypass manual debugging crucial for developing deep architectural intuition |
| **Enterprises** | Face increased risk of shipping buggy AI-generated code with reduced code review efficiency |
| **Industry** | Experiencing a shortage of qualified mid-level and senior engineers due to degraded skill development |

> 💡 **Key Insight:** AI can auto-generate up to 90% of boilerplate code, but developers who rely on it without understanding lose the ability to debug, architect, and innovate.

---

## 🚀 Our Solution

PedagogyGuard AI acts as an **automated, interactive gatekeeper** that transforms AI from a crutch into a learning engine.

```
┌─────────────────────────────────────────────────────────────────┐
│                    How It Works                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [Developer copies AI code]                                     │
│          │                                                       │
│          ▼                                                       │
│   ┌──────────────┐                                               │
│   │  Intercept   │ ← Detects AI-generated code                   │
│   └──────┬───────┘                                               │
│          │                                                       │
│          ▼                                                       │
│   ┌──────────────┐                                               │
│   │   Mutate     │ ← Injects pedagogical bugs/anti-patterns     │
│   └──────┬───────┘                                               │
│          │                                                       │
│          ▼                                                       │
│   ┌──────────────┐                                               │
│   │  Challenge   │ ← Socratic Q&A to test understanding         │
│   └──────┬───────┘                                               │
│          │                                                       │
│          ▼                                                       │
│   ┌──────────────┐                                               │
│   │   Track      │ ← Measures skill progression                  │
│   └──────────────┘                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### ✨ What Makes Us Different

| Feature | PedagogyGuard AI | Traditional Tools |
|---------|------------------|-------------------|
| **Approach** | Works WITH AI, not against it | Blocks or restricts AI usage |
| **Privacy** | 100% local processing | Often require cloud APIs |
| **Learning** | Active skill development | Passive code generation |
| **Metrics** | Concrete progression tracking | No skill measurement |
| **Non-Intrusive** | Optional intervention points | Disruptive workflow |

---

## 🔑 Key Features

### 1. 🤖 AI Code Detection Engine
- Real-time clipboard monitoring (500ms polling)
- Heuristic-based AI code identification
- Multi-language support (JavaScript, TypeScript, Python, Java, C#, C++, Go, Rust)

### 2. 🧬 Code Mutation Engine
Introduces **6 types** of pedagogical bugs to create learning opportunities:

| Mutation | Description | Learning Outcome |
|----------|-------------|------------------|
| ⏱️ **Timeout** | Increases timeout values | Performance monitoring |
| 💧 **Memory Leak** | Adds event listeners without cleanup | Memory management |
| 🔒 **SQL Injection** | Introduces template literals in queries | Security awareness |
| ⚡ **Race Condition** | Adds async operations without sync | Concurrent programming |
| ❌ **Null Reference** | Removes null checks | Defensive programming |
| 🔄 **Infinite Loop** | Adds loops without break conditions | Loop control |

### 3. 🎓 Socratic Dialogue System
- **18+ contextual questions** across 6 categories
- **3 difficulty levels** (Beginner → Intermediate → Advanced)
- Interactive webview panel with progress tracking
- Semantic response evaluation

### 4. 📊 Progress Dashboard
- **Autonomy Velocity** — Code manually refactored after pasting
- **Flaw Detection Rate** — Success rate fixing injected mutations
- **Active Recall Score** — Socratic dialogue performance
- **Session Count** — Total dialogue sessions completed

### 5. 🔒 Privacy-First Design
- ✅ 100% local processing
- ✅ No external API calls
- ✅ No data sent to cloud
- ✅ User-controlled data persistence

---

## 🏗️ Architecture

```
pedagogyguard-ai/
├── src/
│   ├── extension.ts              # Main entry point
│   ├── designTokens.ts           # UI design tokens
│   ├── interceptors/
│   │   └── interceptorManager.ts # AI code detection
│   ├── mutations/
│   │   └── mutationEngine.ts     # Code mutation logic
│   ├── socratic/
│   │   └── socraticDialogue.ts   # Interactive Q&A
│   ├── telemetry/
│   │   └── telemetryService.ts   # Metrics tracking
│   └── dashboard/
│       └── dashboardProvider.ts  # Progress visualization
├── tests/
│   ├── unit-tests/               # Component tests
│   └── integration-tests/        # Integration tests
├── docs/                         # Comprehensive documentation
└── package.json                  # VS Code extension manifest
```

### Design Patterns Used

| Pattern | Application |
|---------|-------------|
| **Observer** | Event monitoring (clipboard, document changes) |
| **Strategy** | Mutation selection based on code analysis |
| **Factory** | Creating mutation instances |
| **Command** | VS Code command registration |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | VS Code Extension API | Editor integration |
| **UI** | Webview API | Interactive panels |
| **Language** | TypeScript | Type-safe development |
| **Runtime** | Node.js | Local execution |
| **Build** | TypeScript Compiler | Compilation |
| **Linting** | ESLint | Code quality |
| **Testing** | Jest (planned) | Unit testing |

---

## 🧠 Engineering Decisions

### Why VS Code Webview API for the dashboard?
The WebviewViewProvider gives a rich HTML/JS canvas inside the VS Code sidebar — enough for scorecards and progress charts without spinning up a separate browser tab.

### Why heuristic-based AI detection?
Rather than calling an external LLM to classify each paste (slow, costs tokens, breaches privacy), PedagogyGuard uses lightweight heuristics: large insertions without clipboard match, code-specific patterns (function/class/import), and line-count density. This keeps 100% processing local while catching the vast majority of AI-pasted code.

### Why 6 specific mutation types?
Each mutation targets a different class of bug that junior developers most commonly miss:
- **Timeout** → performance awareness
- **Memory leak** → lifecycle management
- **SQL injection** → security hygiene
- **Race condition** → async correctness
- **Null reference** → defensive programming
- **Infinite loop** → loop control fundamentals

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [VS Code](https://code.visualstudio.com/) (v1.85 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YogendraChukka01/pedagogyguard-ai.git
   cd pedagogyguard-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile TypeScript**
   ```bash
   npm run compile
   ```

4. **Launch in VS Code**
   - Open the project in VS Code
   - Press F5 to start the Extension Development Host

### Quick Start

1. Press Ctrl+Shift+P (or Cmd+Shift+P on macOS)
2. Type **"PedagogyGuard: Enable"**
3. Copy any AI-generated code
4. Paste into VS Code
5. Choose **"Analyze & Debug"**
6. Complete the Socratic dialogue
7. View your progress in the dashboard

---

## 📖 Usage

### Commands

| Command | Description |
|---------|-------------|
| PedagogyGuard: Enable | Enable AI code interception |
| PedagogyGuard: Disable | Disable AI code interception |
| PedagogyGuard: Show Progress Dashboard | Open the metrics dashboard |

### Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| pedagogyguard.enabled | boolean | true | Enable/disable the extension |
| pedagogyguard.mutationIntensity | enum | "medium" | Mutation intensity (low/medium/high) |
| pedagogyguard.socraticMode | enum | "interactive" | Dialogue mode (interactive/passive/disabled) |

### Example Workflow

```javascript
// 1. AI generates this code (GitHub Copilot, Cursor, etc.)
const fetchData = async (userId) => {
  const response = await fetch('/api/users/');
  return response.json();
};

// 2. PedagogyGuard detects and mutates it
const fetchData = async (userId) => {
  const response = await fetch('/api/users/');
  return response.json();
  // ⚠️ No error handling for failed requests!
};

// 3. You answer Socratic questions about the issue
// "What happens if the fetch request fails?"

// 4. You fix the code
const fetchData = async (userId) => {
  try {
    const response = await fetch('/api/users/');
    if (!response.ok) throw new Error(HTTP );
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};
```

---

## 📚 Documentation

| Document | Description | Lines |
|----------|-------------|-------|
| [PROJECT_REPORT.md](PROJECT_REPORT.md) | Comprehensive project report | 996 |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design & components | 400+ |
| [docs/API.md](docs/API.md) | Complete API reference | 400+ |
| [docs/USER_GUIDE.md](docs/USER_GUIDE.md) | How to use the extension | 300+ |
| [docs/PITCH.md](docs/PITCH.md) | Hackathon pitch document | 200+ |

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Lines of Code** | 3,500+ |
| **Source Files** | 7 |
| **Test Files** | 3 |
| **Documentation Files** | 6 |
| **Documentation Lines** | 2,200+ |
| **Mutation Types** | 6 |
| **Socratic Questions** | 18+ |
| **Supported Languages** | 8 |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (git checkout -b feature/amazing-feature)
3. **Commit** your changes (git commit -m 'Add amazing feature')
4. **Push** to the branch (git push origin feature/amazing-feature)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow existing code style

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript](https://www.typescriptlang.org/)
- [Open Source Community](https://opensource.org/)

---

## 📧 Contact

| Channel | Link |
|---------|------|
| **GitHub** | [@YogendraChukka01](https://github.com/YogendraChukka01) |
| **Repository** | [pedagogyguard-ai](https://github.com/YogendraChukka01/pedagogyguard-ai) |

---

<h3 align="center">

```
Built by Yogi

  Build.  Learn.  Ship.  Iterate.
```

</h3>

<p align="center">
  <img src="https://img.shields.io/badge/—%20AI%20×%20Software%20×%20Product%20×%20Open%20Source-0d1117?style=for-the-badge&labelColor=0d1117&color=7c3aed"/>
</p>
