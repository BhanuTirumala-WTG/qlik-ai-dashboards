# Qlik Dashboard Design Workspace — Copilot Instructions

## Workspace Purpose
This workspace is a multi-agent collaborative system for designing planning application dashboards to be implemented in Qlik Sense/Cloud. Designs follow the **Modern Harmony design system** and are validated for **Qlik feasibility**.

## Available Agents

### @qlik-orchestrator (Start Here)
The primary entry point for all dashboard design requests. It coordinates the Designer, Developer, and Expert agents through the full design lifecycle.

### @qlik-designer
UX/UI design authority. Reviews briefs, creates design specs, evaluates prototypes against heuristics, Modern Harmony, and accessibility guidelines.

### @qlik-expert
Qlik platform expert. Validates designs against Qlik Sense capabilities and limitations. Suggests Qlik-native alternatives for infeasible elements.

### @qlik-developer
Front-end developer. Builds interactive HTML/CSS/JS prototypes using Chart.js and Modern Harmony design tokens. Outputs to `prototypes/iterations/`.

### @github-manager
GitHub repository manager. Handles git init, commits, branching, pushing, pull requests, releases, and GitHub Pages deployment.

## Key Directories
- `agents/` — Agent definitions (.agent.md files)
- `skills/` — Agent skill files with domain expertise
- `knowledge-base/` — Reference materials (Qlik limits, design principles, Modern Harmony docs)
- `prototypes/iterations/` — All developed dashboard prototypes (versioned)

## How to Use
1. Start with `@qlik-orchestrator` and describe your dashboard need
2. The Orchestrator guides you through discovery, development, and review
3. Preview prototypes at `http://localhost:8080`
4. Iterate until the design meets quality, feasibility, and brief requirements

## Connected Services
- **Figma MCP**: Connected — used to reference Modern Harmony design system components, tokens, and patterns
- **Web Fetch**: Available — used to reference Qlik documentation and examples

## Target Users
Project managers, developers, and designers working on planning application dashboards.
