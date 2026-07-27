# Contributing to PedagogyGuard AI

Thank you for your interest in improving AI education tools!

## Getting Started

1. Fork the repository
2. Clone: `git clone https://github.com/YOUR_USERNAME/pedagogyguard-ai.git`
3. Install dependencies: `npm install`
4. Open in VS Code and press `F5` to launch the Extension Development Host

## Development

```bash
npm install          # Install dependencies
npm run compile      # Compile TypeScript
npm run watch        # Watch mode
npm run lint         # Lint code
```

## Adding Mutations

1. Open `src/mutations/mutationEngine.ts`
2. Add a new mutation strategy to the `mutations` Map
3. Follow the existing pattern for mutation functions
4. Add tests in `tests/unit-tests/mutationEngine.test.ts`

## Adding Socratic Questions

1. Open `src/socratic/socraticDialogue.ts`
2. Add questions to the `questionBank` organized by category and difficulty

## Pull Requests

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
