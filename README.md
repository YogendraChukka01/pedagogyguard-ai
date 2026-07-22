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
├── docs/                   # Documentation
├── tests/                  # Test files
├── README.md               # This file
└── package.json            # VS Code extension manifest
`

## Getting Started

_TBD during implementation_

## License

TBD
