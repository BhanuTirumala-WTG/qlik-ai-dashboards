# Modern Harmony Design System Skill

This skill provides expertise in the Modern Harmony design system for planning application dashboards. Use this skill when designing, reviewing, or implementing UI components that must follow the Modern Harmony design system.

## Core Competencies
- Component specifications, variants, and usage patterns
- Typography tokens and type scale
- Color tokens (semantic, neutral, data visualization)
- Spacing and sizing tokens
- Dashboard-specific data visualization components
- Accessibility standards within the design system

## Figma Source References

When you need to reference the Modern Harmony design system, use the Figma MCP tools to fetch design context from these source files:

### Components Library
Fetch using: `get_design_context` with `fileKey: OimYjkrOf4hzQRzNqH03EN`, `nodeId: 1557:29431`
- URL: https://www.figma.com/design/OimYjkrOf4hzQRzNqH03EN/Modern-Components?node-id=1557-29431
- Contains: All reusable UI components (buttons, inputs, cards, navigation, data tables, modals, etc.)

### Typography Tokens
Fetch using: `get_design_context` with `fileKey: BY1ai4YKWOme0DiMtDJvHq`, `nodeId: 1:1950`
- URL: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=1-1950

### Color Tokens
Fetch using: `get_design_context` with `fileKey: BY1ai4YKWOme0DiMtDJvHq`, `nodeId: 1838:1271`
- URL: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=1838-1271

### Size Tokens
Fetch using: `get_design_context` with `fileKey: BY1ai4YKWOme0DiMtDJvHq`, `nodeId: 4261:377`
- URL: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=4261-377

### Dashboard Components (Data Visualization)
Fetch using: `get_design_context` with `fileKey: JG8McdhvIOAM97YvWAUrE0`, `nodeId: 179:1123`
- URL: https://www.figma.com/design/JG8McdhvIOAM97YvWAUrE0/Data-visualization?node-id=179-1123

### Data Visualization Patterns
Fetch using: `get_design_context` with `fileKey: JG8McdhvIOAM97YvWAUrE0`, `nodeId: 4:125`
- URL: https://www.figma.com/design/JG8McdhvIOAM97YvWAUrE0/Data-visualization?node-id=4-125

## How to Use This Skill

### For Design Review
1. Fetch the relevant Figma component specifications using `get_design_context` or `get_screenshot`
2. Compare the developed dashboard HTML against the Figma specs
3. Check: colors match tokens, typography matches type scale, spacing matches size tokens
4. Check: component usage follows documented patterns and states
5. Report discrepancies with specific token references

### For Implementation Guidance
1. Identify which Modern Harmony components apply to the design
2. Fetch component specs from Figma
3. Map Figma properties to CSS custom properties/HTML structure
4. Verify accessibility compliance (contrast, focus states, ARIA)

### For Design Decisions
1. When multiple approaches exist, default to Modern Harmony patterns
2. For data visualization, always check the Data Visualization library first
3. For new patterns not in the system, follow the design principles documented in the knowledge base

### Resolving Qlik Feasibility Conflicts
All data visualizations should match the **Modern Harmony Data Visualization** look and feel (color tokens, chart styling, typography, spacing, and component structure). This is the default design target.

When the Qlik Expert flags that a specific Modern Harmony pattern cannot be implemented identically in Qlik Sense (e.g., a chart type, interaction, or layout behavior is unsupported), apply this priority:

1. **Preserve the visual appearance first.** Even when the underlying Qlik object differs from the prototype, ensure colors, typography, spacing, and overall visual treatment still follow Modern Harmony tokens. A Qlik-native alternative that *looks* like Modern Harmony is always preferred over one that abandons the design system.
2. **Accept functional substitutions gracefully.** If a chart type or interaction must change for Qlik feasibility, choose the Qlik-native alternative that is closest in visual appearance to the Modern Harmony spec — not just the closest in data function.
3. **Document the deviation.** Record what changed and why in the review notes so the design lineage is traceable.

## Knowledge Base References
- `knowledge-base/modern-harmony/design-system-overview.md` - Complete overview of the design system
- `knowledge-base/design-principles/heuristics.md` - Design heuristics for dashboard review
- `knowledge-base/design-principles/accessibility.md` - Accessibility guidelines
- `knowledge-base/design-principles/dashboard-design-patterns.md` - Layout and interaction patterns
