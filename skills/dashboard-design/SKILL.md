# Dashboard Design Skill

This skill provides expertise in dashboard UX design, information architecture, and visual design for data-heavy applications. Use this skill when reviewing design briefs, creating design specifications, or evaluating dashboard effectiveness.

## Core Competencies
- Information architecture for dashboards
- UX heuristics evaluation (Nielsen, Shneiderman, Tufte)
- Data visualization best practices
- Accessibility (WCAG 2.1 AA) compliance
- Responsive dashboard design
- User research synthesis for dashboard design
- Design brief analysis and question formulation

## Design Review Framework

### Step 1: Brief Analysis
When receiving a design request, extract and clarify:
1. **Target Users**: Who will use this dashboard? What is their role and data literacy?
2. **Business Problem**: What specific question or problem does this solve?
3. **Key Metrics**: What are the primary KPIs/measures to display?
4. **Data Sources**: What data is available? Frequency of updates?
5. **Context of Use**: When and where will users access this? (Desktop, mobile, meetings)
6. **Decision Support**: What actions should users take based on this data?
7. **Existing Tools**: What do users currently use? Pain points?

### Step 2: Design Evaluation Criteria
Evaluate all dashboard designs against:
1. **Clarity**: Can users understand the data within 5 seconds?
2. **Hierarchy**: Is the most important information visually prominent?
3. **Consistency**: Are similar data types shown with similar visuals?
4. **Actionability**: Does the dashboard lead to decisions or actions?
5. **Efficiency**: Can users find what they need quickly?
6. **Accessibility**: Is it usable by people with disabilities?
7. **Aesthetics**: Is it visually clean and professional?

### Step 3: Heuristic Review
Apply Nielsen's heuristics, Tufte's principles, and Shneiderman's mantra.
Reference: `knowledge-base/design-principles/heuristics.md`

### Step 4: Accessibility Review
Verify WCAG 2.1 AA compliance.
Reference: `knowledge-base/design-principles/accessibility.md`

### Step 5: UI Dashboard Design Standards & Best Practices Review
**This step is critical.** Evaluate whether the dashboard meets industry-standard UI design standards and best practices for data dashboards. Check every item below:

#### Layout & Visual Hierarchy
- **F-pattern reading order**: Most important KPIs/data positioned top-left
- **Progressive disclosure**: Overview → Analysis → Detail (Shneiderman's mantra)
- **Above the fold**: Primary content visible without scrolling at 1080p
- **White space**: Objects have breathing room; sheet is not overcrowded
- **Grid alignment**: All elements snap to a consistent grid; nothing looks misaligned
- **Visual hierarchy**: Size, weight, and position clearly indicate importance

#### KPI Card Standards
- KPIs placed at top of the dashboard
- Each KPI shows: value, label, trend indicator, and context (unit, time period)
- Limit 4-6 primary KPIs per view
- Conditional coloring: green (good), yellow (warning), red (critical)
- Delta/difference KPIs clearly show direction and magnitude

#### Chart Best Practices
- Correct chart type for the data question (bar for comparison, line for trend, scatter for correlation, etc.)
- All axes labeled with units
- Legends present and understandable
- Gridlines subtle (light grey, not black)
- Data-ink ratio maximized — no 3D effects, unnecessary borders, or chart junk
- Tooltips present on all data points
- Consistent color encoding across all charts (Scenario A = same color everywhere)
- No more than 5-7 colors per chart

#### Filter & Interaction Standards
- Filters are clearly labeled and logically grouped
- Current selections are visible and persistent
- Clear All / Reset button available
- Scenario or comparison selectors are prominently placed (not buried)
- Filter changes immediately update all visualizations

#### Color Strategy
- Consistent palette tied to design system tokens (no arbitrary hex values)
- Sequential colors for ordered data, diverging for midpoint data
- Red/green never used as the sole differentiator (colorblind-safe)
- Background/surface colors are neutral; data colors carry meaning
- Text on colored backgrounds meets 4.5:1 contrast (AA)

#### Typography & Readability
- Font hierarchy: distinct sizes/weights for titles, subtitles, labels, body, captions
- Minimum font size 11px for data labels, 13px for body text
- Line height ≥ 1.4 for multi-line text
- No more than 2 font families
- Numbers in data tables/KPIs use tabular (monospaced) figures if available

#### Responsive & Resilient Design
- Works at 1440px, 1024px, 768px widths
- No horizontal scroll at common breakpoints
- Charts resize gracefully without losing labels
- Empty/zero/no-data states are handled (not blank)

#### Table Best Practices (if applicable)
- Sortable columns with clear sort indicators
- Sticky header row for scrollable tables
- Conditional formatting on delta/diff columns
- Zebra striping or hover highlight for row readability
- Columns ordered logically (identifiers → primary metrics → secondary metrics → deltas)

Reference files:
- `knowledge-base/design-principles/dashboard-design-patterns.md`
- `knowledge-base/qlik/best-practices.md`
- `knowledge-base/design-principles/heuristics.md`
- `knowledge-base/qlik/creating-apps.md` — Qlik app structure, sheet properties, expressions, and visualization creation workflow (includes sheet sizing, grid options, CSS limitations, PDF export constraints)
- `knowledge-base/qlik/visualization-types.md` — All chart types with Qlik Help links for per-chart feasibility checks

## Questions to Ask Before Designing

### About Users
- Who are the primary users? (PMs, developers, designers, executives)
- What is the users' data literacy level?
- What devices will they primarily use?
- How often will they access this dashboard?
- What decisions do they make based on this data?

### About Data
- What KPIs/metrics are most critical?
- What is the data refresh frequency?
- What time periods need to be covered?
- What drill-down dimensions are needed?
- Are there targets/benchmarks to compare against?

### About Design
- Are there existing brand/design guidelines to follow?
- What is the preferred dashboard layout style?
- Are there example dashboards users like or dislike?
- What level of interactivity is expected?
- Are there specific Qlik constraints to consider?

## Knowledge Base References
- `knowledge-base/design-principles/heuristics.md` - Design heuristics
- `knowledge-base/design-principles/accessibility.md` - Accessibility guidelines
- `knowledge-base/design-principles/dashboard-design-patterns.md` - Layout and patterns
- `knowledge-base/modern-harmony/design-system-overview.md` - Design system reference
- `knowledge-base/qlik/dashboard-examples.md` - Qlik dashboard examples for inspiration

## Qlik Design Guidelines 25.2 (Figma Reference)
**Source**: Figma `fileKey: g7t2YJG6gPTm0nuKgMXksC`, `nodeId: 27:661`
**URL**: https://www.figma.com/design/g7t2YJG6gPTm0nuKgMXksC/Qlik-Guidelines-25.2?node-id=27-661

These are the official Qlik design guidelines. **Every dashboard review must check compliance with these guidelines.**

### Dashboard Heuristics (Qlik 4 Principles)
1. **Make the complex simple**: Data changes very frequently and users have different analytical needs. Make all this complexity simple.
2. **Tell a clear story**: Connect data to the context of the customer's business and answer the user's questions. The layout must organize information to reduce cognitive load.
3. **Reveal the reality of the data**: Chosen visualizations need to correctly represent the truth found in the data and quickly communicate that truth.
4. **Disclose information as needed**: Users should have access to exactly the right amount of data and level of detail — no less and no more. Each dashboard should be optimized for the level of detail that user (persona) needs.

### Dashboard Types
| Type | Purpose | Characteristics |
|------|---------|----------------|
| **Strategic / Executive** | High-level overview of the state of the business | Focus on KPIs and immediate insights. Typically static, no need to filter/drill. Highlight opportunities, not just problems. |
| **Analytical** | Problem solving and discovery | Wide range of filters and connected visualizations. Drill-downs to assist the user in exploring and connecting data with key insights. |
| **Operational** | Monitor critical systems and enable immediate action | Focus on exceptions, monitoring, and providing quick drill-through into remedial workflows. Often require near real-time or real-time data refreshing. |

### Content Hierarchy and Structure
- **Cognitive load**: Minimize the mental effort a user must expend. Good dashboard design should reduce the effort to understand the layout, find information, and draw conclusions about the data.
- **Magic Number 7 ± 2 (Miller's Law)**: Limit the number of items (KPIs, chart groups, filter groups) to 5-9 per view to stay within working memory capacity.
- **"Aha moments"**: The positive experience a user has when they make connections between data and insight. Characterized by: 1) suddenness, 2) the experience is surprising and instantaneous, 3) easy processing with low difficulty, 4) gratifying — user is convinced the insight is correct.
- **Scent of information**: Help users find specific information based on a predicted goal. Follow the scent — don't force users to exclude irrelevant details manually.
- **Content hierarchy**: Visual characteristics and cues applied to content to assist users in making sense of a design. Use 8 perceivable elements: **Size, Color, Contrast, Alignment, Repetition, Proximity, Whitespace, Texture/Style**.
- **RAG status**: Red, Amber, Green colored status markers. Red = critical/urgent. Amber = potential issue or moderate urgency. Green = positive/stable/on-target.

### Layout Patterns by Dashboard Type

#### Pattern 1: Strategic / Executive
KPIs at the top, primary visualization in the center, secondary content below.
- **Filters**: Horizontal filter bar at top (preferred) OR minimal/no filters (strategic dashboards are typically pre-filtered)
- **Layout**: Full-width KPI row → Large chart → Supporting detail OR table
- Options:
  - 3 KPIs + 1 large chart + 1 full-width table
  - 3 KPIs + 2 medium charts side-by-side + 1 full-width detail
  - 3 KPIs + 1 full-width chart + 1 extra-large detail table

#### Pattern 2: Analytical
Multi-chart layout with extensive filtering capability.
- **Filters**: Horizontal filter bar at top OR vertical filter sidebar on left/right
- **Layout**: KPI row → Multiple chart rows (2-3 charts per row) → Detail table
- Key: Provide many drill-down paths, connected visualizations
- Options:
  - Horizontal filters + 2-column chart grid
  - Vertical sidebar filters + main content area with charts and details
  - Tabbed sub-views within an analytical dashboard

#### Pattern 3: Operational
Compact monitoring layout with action-oriented content.
- **Filters**: Vertical sidebar (common) OR horizontal bar — operational dashboards often use more filters
- **Layout**: KPI alerts at top → Exception charts → Detail drill-through table
- Key: Highlight exceptions, maintain context, enable quick action
- Options:
  - Vertical filter sidebar + 2 KPI rows + chart grid + table
  - Horizontal filters + alert KPIs + dual-chart row + sortable table
  - Map visualization + sidebar metrics + detail table below

### Filter Placement Guidelines
**Filters can be horizontal OR vertical — both are valid patterns:**

| Placement | When to Use | Qlik Implementation |
|-----------|-------------|---------------------|
| **Horizontal (top bar)** | ≤6 filters, strategic/executive dashboards, when vertical space is prioritized | Filter pane collapsed/top, list boxes in a horizontal container |
| **Vertical (left sidebar)** | >6 filters, analytical/operational dashboards, when many drill-down dimensions exist | Filter pane expanded/left, stacked list boxes (~250-300px width) |
| **Vertical (right sidebar)** | Secondary/contextual filters, when main content flows left-to-right | Right-aligned filter panel, often collapsible |
| **Hybrid (top + sidebar)** | Scenario/comparison selectors on top, drill-down filters in sidebar | Horizontal container for primary selectors + vertical pane for drill-downs |

Key rules:
- Filters are always **above or beside** the content they affect — never below
- Scenario selectors (e.g., Scenario A / B) should be **prominently placed at the top**, visually distinct from drill-down filters
- Include a **Clear All** button always
- Show **current selections** persistently so users know what filters are active
- Keep filter order consistent across all sheets/tabs

### Color and Contrast
- Use 2 contrasting colors for dual-scenario comparison only — do not overload with many colors
- Limit overall palette to 5-7 colors per chart
- For Qlik: define colors in the theme JSON so they're consistent across all objects
- RAG status colors: Red (#EF4444 / similar), Amber (#F59E0B / similar), Green (#10B981 / similar)
- Grey for context/background data; brand colors as accents

### Location, Alignment, and Proximity
- **Location**: The location of content communicates entity — top/left content is perceived as most important. Title placement should be outside the margins (header area), not inside charts.
- **Alignment**: All objects should be visually aligned. Use Qlik's grid snap. Misaligned elements break trust.
- **Proximity**: Related content (e.g., a KPI and its supporting chart) should be close together. Unrelated items should have clear separation (whitespace or dividers).

### Do / Don't Best Practices (from Qlik Guidelines)
- **DO** use a large chart only when there's a strong reason for it on the dashboard
- **DO** reconsider the importance of top charts — the most important visualization should be top/first
- **DO** use metric squares/KPIs to pull attention where user action is needed
- **DO** recount common narratives across connected dashboards to reduce cognitive load
- **DON'T** feel bound to follow guidelines rigidly — if telling the data story requires a different layout, do it; always check with UX fundamentals
