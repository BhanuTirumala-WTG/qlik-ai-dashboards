# Qlik Dashboard Design Workflow — Master Instructions

## Overview
This workspace implements a multi-agent collaborative workflow for designing planning application dashboards in Qlik. The workflow produces high-fidelity HTML prototypes that are validated for Qlik feasibility and aligned with the Modern Harmony design system.

## Target Users
- **Project Managers** — provide business requirements and KPI definitions
- **Developers** — provide technical context and Qlik app specifications
- **Designers** — provide design direction and UX requirements

## Agent Roles & Responsibilities

### 🎯 Orchestrator (`agents/qlik-orchestrator.agent.md`)
**Entry point for all design requests.**
- Receives design briefs from users
- Coordinates the workflow between all agents
- Manages communication and iteration cycles
- Tracks progress and provides status updates
- Ensures all agents are aligned before final approval

### 🎨 Qlik Designer (`agents/qlik-designer.agent.md`)
**Design authority — owns design quality and UX.**
- Conducts design discovery (asks clarifying questions)
- Creates design specifications
- Reviews developed prototypes against:
  - Nielsen's usability heuristics
  - Tufte's data visualization principles
  - Shneiderman's Visual Information Seeking Mantra
  - Modern Harmony design system (via Figma MCP)
  - WCAG 2.1 AA accessibility guidelines
- Iterates designs with the Developer based on feedback
- Final design sign-off authority

### 💻 Qlik Developer (`agents/qlik-developer.agent.md`)
**Builder — creates interactive HTML prototypes.**
- Translates design specs into HTML/CSS/JS
- Uses Chart.js for data visualizations
- Implements Modern Harmony design tokens
- Creates responsive, accessible prototypes
- Outputs to `prototypes/iterations/` folder
- Iterates based on Designer and Expert feedback

### 🔧 Qlik Expert (`agents/qlik-expert.agent.md`)
**Qlik platform authority — validates feasibility.**
- Reviews every prototype element against Qlik capabilities
- Flags infeasible designs with Qlik-native alternatives
- References comprehensive Qlik limitations knowledge base
- Compares designs against Qlik dashboard patterns
- Final feasibility sign-off authority

## Workflow Diagram

```
User → Orchestrator → Designer (Discovery)
                   ↓
                   Designer → User (Questions)
                   ↓
                   User → Designer (Answers)
                   ↓
                   Designer → Developer (Design Spec)
                   ↓
                   Developer → prototypes/iterations/v1-*/
                   ↓
              ┌────┴────┐
              ↓         ↓
          Designer   Qlik Expert
          (Review)   (Feasibility)
              ↓         ↓
              └────┬────┘
                   ↓
              Orchestrator (Merge Feedback)
                   ↓
              User (Review & Approve)
                   ↓
        [If changes needed] → Developer (Iterate → v2-*/)
                   ↓
        [If approved] → Final Delivery ✅
```

## Iteration Loop
Each iteration cycle produces a new version:
- `prototypes/iterations/v1-[name]/` — Initial prototype
- `prototypes/iterations/v2-[name]/` — After design + feasibility review
- `prototypes/iterations/v3-[name]/` — Further refinements
- Continue until all three gates pass:
  1. ✅ Designer approves design quality
  2. ✅ Qlik Expert confirms feasibility
  3. ✅ User confirms alignment with brief

## Folder Structure

```
Qlik dashboard/
├── agents/                          # Agent definitions
│   ├── qlik-orchestrator.agent.md   # Orchestrator (entry point)
│   ├── qlik-designer.agent.md       # Designer
│   ├── qlik-developer.agent.md      # Developer
│   └── qlik-expert.agent.md         # Qlik Expert
│
├── skills/                          # Skill definitions
│   ├── modern-harmony-design-system/ # Design system skill
│   │   └── SKILL.md
│   ├── dashboard-design/            # Dashboard design skill
│   │   └── SKILL.md
│   ├── qlik-expertise/              # Qlik platform skill
│   │   └── SKILL.md
│   └── qlik-development/            # Development skill
│       └── SKILL.md
│
├── knowledge-base/                  # Reference materials
│   ├── modern-harmony/              # Design system docs
│   │   └── design-system-overview.md
│   ├── qlik/                        # Qlik platform docs
│   │   ├── limitations.md
│   │   ├── best-practices.md
│   │   ├── visualization-types.md
│   │   └── dashboard-examples.md
│   └── design-principles/           # UX/design docs
│       ├── heuristics.md
│       ├── accessibility.md
│       └── dashboard-design-patterns.md
│
├── prototypes/                      # Developed prototypes
│   └── iterations/                  # Versioned iterations
│       └── (v1-*, v2-*, etc.)
│
├── .github/
│   └── copilot-instructions.md      # Global Copilot instructions
│
└── workflow-instructions.md          # This file
```

## Design System References

### Modern Harmony (via Figma MCP)
- Components: https://www.figma.com/design/OimYjkrOf4hzQRzNqH03EN/Modern-Components?node-id=1557-29431
- Typography: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=1-1950
- Colors: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=1838-1271
- Sizes: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=4261-377
- Dashboard Components: https://www.figma.com/design/JG8McdhvIOAM97YvWAUrE0/Data-visualization?node-id=179-1123
- Data Viz Patterns: https://www.figma.com/design/JG8McdhvIOAM97YvWAUrE0/Data-visualization?node-id=4-125

### Qlik Dashboard Inspiration
- Supply Chain: https://explore.qlik.com/
- Sales: https://www.qlik.com/us/dashboard-examples/sales-dashboards
- Marketing: https://www.qlik.com/us/dashboard-examples/marketing-dashboards

## Getting Started
1. Open VS Code in this workspace
2. Use the **Qlik Orchestrator** agent (`@qlik-orchestrator`) to start a new design request
3. Describe your dashboard need — the Orchestrator will guide you through the process
4. Preview prototypes at `http://localhost:8080` when the server is running
