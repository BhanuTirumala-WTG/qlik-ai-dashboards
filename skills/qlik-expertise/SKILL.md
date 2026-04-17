# Qlik Expertise Skill

This skill provides deep knowledge of Qlik Sense capabilities, limitations, and best practices. Use this skill when validating whether a dashboard design is feasible to implement in Qlik Sense, or when advising on Qlik-native patterns.

## Core Competencies
- Qlik Sense platform capabilities and constraints
- Visualization type specifications and limits
- Expression language capabilities
- Data model design patterns
- Extension ecosystem knowledge
- Qlik Cloud vs Qlik Sense Enterprise differences
- Performance optimization
- Layout and styling constraints

## When to Use This Skill

### Feasibility Validation
When reviewing a dashboard design, check:
1. Can each visualization be built with standard Qlik objects?
2. If not, is there a known extension that provides the capability?
3. Are the layout requirements achievable within Qlik's grid system?
4. Can the interactivity requirements be met with Qlik's associative model?
5. Are there expression or data model requirements that exceed Qlik limits?

### Design Translation
When translating an HTML prototype to Qlik:
1. Map HTML charts ↔ Qlik chart types
2. Identify layout constraints (no overlap, grid snap, responsive behavior)
3. Suggest Qlik-native alternatives for unsupported patterns
4. Recommend expression approaches for calculated metrics

### Limitation Flagging
Flag these common issues:
- **Pixel-perfect layouts**: Not possible in Qlik (grid-based)
- **Custom animations/transitions**: Not supported
- **Overlapping elements**: Not possible in standard layout
- **Custom fonts**: Limited in Qlik Sense, configurable via theme in Cloud
- **Complex conditional layouts**: Limited; use containers/show conditions
- **Nested drilling**: Not natively supported in all chart types
- **Custom tooltips with charts**: Not in standard objects
- **Modal dialogs**: Not supported natively

## Knowledge Base References
- `knowledge-base/qlik/limitations.md` - Comprehensive limitations reference
- `knowledge-base/qlik/best-practices.md` - Design and development best practices
- `knowledge-base/qlik/visualization-types.md` - All available chart types, specs, and **official Qlik Help links per chart**
- `knowledge-base/qlik/creating-apps.md` - **App structure, sheets, expressions, and visualization creation workflow** — includes sheet grid/sizing options, CSS styling limitations, PDF export constraints, bookmarks, stories, and a feasibility review checklist table
- `knowledge-base/qlik/dashboard-examples.md` - Example dashboard patterns and templates

## External Resources (for fetching via web)
- **Qlik Visualization Types (Official)**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/visualizations.htm
- **Best Practices for Choosing Visualizations**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/when-to-use-visualizations.htm
- **Visualization Bundle**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/VisualizationBundle/visualization-bundle.htm
- **Dashboard Bundle**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/DashboardBundle/dashboard-bundle.htm
- **Creating Apps & Visualizations**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/create-apps-visualizations.htm
- **Structuring App Using Sheets**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Sheets/create-sheets-for-structure.htm
- **Expressions in Visualizations**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/ChartFunctions/use-expressions-in-visualizations.htm
- Qlik Help Home: https://help.qlik.com/en-US/cloud-services/Content/Sense_Helpsites/Home.htm
- Qlik Community: https://community.qlik.com/
- Qlik Branch (Extensions): https://branch.qlik.com
- Qlik API Reference: https://qlik.dev/
- Qlik Playground: https://qlik.dev/playground

> **Important**: `knowledge-base/qlik/visualization-types.md` contains direct links to the official Qlik Help page for every chart type. When validating chart feasibility during review rounds, **fetch the specific chart's Help page** to check the latest capabilities, dimension/measure limits, and display limitations.

## Qlik Design Guidelines 25.2 (Figma Reference)
**Source**: Figma `fileKey: g7t2YJG6gPTm0nuKgMXksC`, `nodeId: 27:661`
**URL**: https://www.figma.com/design/g7t2YJG6gPTm0nuKgMXksC/Qlik-Guidelines-25.2?node-id=27-661

Use these official Qlik design guidelines when validating dashboard feasibility and design compliance.

### Dashboard Types — Qlik Implementation Mapping
| Type | Qlik Pattern | Filter Strategy |
|------|-------------|----------------|
| **Strategic / Executive** | Single sheet, KPI objects at top, 1-2 large charts, minimal filters. Use Container for alternate views. | Horizontal bar (≤6 filters) or no user filters (pre-set via bookmarks/variables) |
| **Analytical** | Multi-sheet or tabbed Container, many chart types, extensive expressions. Alternate States for comparison. | Vertical filter pane (left sidebar, ~250-300px) with many list boxes, OR horizontal bar + drill-down dimensions |
| **Operational** | Alert-oriented, Straight Table with conditional formatting, KPI objects with set analysis warnings. | Vertical sidebar (common) OR horizontal bar — often >6 filters for operational drill-down |

### Filter Placement — Qlik Feasibility
**Both horizontal and vertical filter placements are fully supported in Qlik.**

| Placement | Qlik Implementation | Notes |
|-----------|---------------------|---------|
| **Horizontal (top bar)** | List boxes inside a horizontal Container or Grid layout row. Filter pane set to "always collapsed" with custom trigger button. | Best for ≤6 filters. Use current selections bar below for active state. |
| **Vertical (left sidebar)** | Qlik native Filter Pane (left-aligned). Stacked list boxes. Collapsible via sheet properties. | Best for analytical/operational dashboards with many dimensions. ~250-300px width. |
| **Vertical (right sidebar)** | Custom Container on right edge with list boxes inside. | Less common but feasible. Good for contextual/secondary filters. |
| **Hybrid (top + sidebar)** | Scenario variables in horizontal row (via Variable Input extension or custom buttons) + vertical filter pane for drill-downs. | Recommended for scenario comparison dashboards — prominently place scenario selectors at top. |

Key Qlik filter rules:
- Always include a **Clear Selections** button (native or custom)
- Use **Current Selections** bar or object to show active filter state
- Filter pane supports search, select all, select excluded
- Bookmark-based filter presets are good for executive/strategic dashboards
- Master dimensions ensure filter consistency across sheets

### Content Hierarchy — Qlik Constraints
- **Magic Number 7 ± 2**: Limit objects per sheet to stay within working memory capacity (~50 max for performance, but 7-9 visual groups for usability)
- **Grid system**: Qlik uses a 24-column responsive grid. Objects snap to grid — pixel-perfect positioning is not possible.
- **Location**: Top-left content is perceived as most important. Place top KPIs in the first grid row.
- **Alignment**: Use Qlik's snap-to-grid to ensure visual alignment. Misaligned objects are a common Qlik implementation issue.
- **Proximity**: Group related objects. Use Container objects to bundle related charts. Use sheet whitespace (empty grid cells) as separators.

### Layout Patterns by Dashboard Type — Qlik Implementation

#### Pattern 1: Strategic / Executive
```
┌──────────────────────────────────────────────┐
│  Header (Text & Image object)                │
├──────────────────────────────────────────────┤
│  KPI  │  KPI  │  KPI  │  [Optional Filters]  │
├──────────────────────────────────────────────┤
│  Large Chart (Bar/Line/Combo, 18-20 rows)    │
├──────────────────────────────────────────────┤
│  Detail Table (Straight Table, full width)   │
└──────────────────────────────────────────────┘
```
Qlik: Single sheet, minimal navigation. Use Bookmarks for different views.

#### Pattern 2: Analytical
```
┌──────────────────────────────────────────────┐
│  Horizontal Filter Bar / Scenario Selectors  │
├──────────────────────────────────────────────┤
│  KPI  │  KPI  │  KPI  │  KPI  │  KPI  │  KPI│
├──────────────┬───────────────────────────────┤
│  Chart 1     │  Chart 2                      │
├──────────────┼───────────────────────────────┤
│  Chart 3     │  Chart 4 / Insights           │
├──────────────┴───────────────────────────────┤
│  Detail Table (full width, sortable)         │
└──────────────────────────────────────────────┘
```
Qlik: Use Container object for sub-tabs. Alternate States for dual-scenario comparison.

#### Pattern 3: Operational (Vertical Filters)
```
┌────────┬─────────────────────────────────────┐
│        │  KPI  │  KPI  │  KPI  │  KPI        │
│ Filter ├─────────────────────────────────────┤
│ Pane   │  Chart 1       │  Chart 2           │
│ (left) ├─────────────────────────────────────┤
│        │  Detail Table (full width)          │
└────────┴─────────────────────────────────────┘
```
Qlik: Filter Pane on left. Use conditional show/hide for alert states. Near real-time reload schedule.

### Do / Don't — Qlik Validation Checklist
- **DO** validate that the dashboard type matches the layout pattern (strategic ≠ operational layout)
- **DO** confirm filter placement is appropriate for the dashboard type and filter count
- **DO** check that KPIs are in the top row with conditional RAG coloring
- **DO** ensure chart sizes match importance (largest = most important insight)
- **DON'T** flag horizontal filters as an issue — both horizontal and vertical are valid Qlik patterns
- **DON'T** require pixel-perfect alignment — validate grid-snap alignment instead
- **DON'T** allow more than 7-9 visual groups per sheet without justification
