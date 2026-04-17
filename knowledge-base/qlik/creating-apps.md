# Qlik Sense — Creating Apps & Visualization Reference

**Official Documentation**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/create-apps-visualizations.htm

> Qlik Sense apps contain data and use visualizations to explore that data. The foundation of an app is the data model and load script. Measures and dimensions are reusable data items used to build charts. Sheets and stories display and organize your visualizations.

---

## Foundations

### Data Manager & Data Load Editor
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/LoadData/managing-data.htm
**Data Load Editor**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/LoadData/use-data-load-editor.htm
- Data Manager: quick add & transform data, associate data tables
- Data Load Editor: script-based data connection and retrieval

### Dimensions
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Dimensions/dimensions.htm
**Fields**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/DataSource/fields.htm
- Fields used in visualizations to determine how data is grouped
- Example: total sales per country, products per supplier

### Measures
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Measures/measures.htm
- Calculations used in visualizations (aggregation functions + fields)
- Example: `Sum(Sales)`, `Avg(Margin)`

### Expressions
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/ChartFunctions/use-expressions-in-visualizations.htm
**Expression Editor**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Expressions/work-with-expression-editor.htm
- Combination of functions, fields, and operators to process data
- Can be used in: measures, dimensions, titles, subtitles, footnotes, conditional show/hide, colors
- Dynamic titles: expression result changes based on user selections
- Script expressions vs. chart expressions have some syntax differences

---

## Structure & Visuals

### Sheets
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Sheets/create-sheets-for-structure.htm
**Sheet Actions**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Sheets/setting-sheet-actions.htm
- Sheets contain charts and tables; each sheet should have a single purpose/idea
- Selections made in one sheet affect visualizations across all sheets
- **Grid spacing**: Wide (default), Medium, Narrow, Custom (slider)
- **Sheet size**: Responsive (default, adapts to screen) or Custom (300–4000px width/height)
- **Extended sheets**: Toggle to add 50% more vertical space per extension
- **Show conditions**: Conditionally show/hide sheets based on expressions (`if()` function)
- **Small screen layout**: List view (default) or Grid view (small preview of visualizations)
- **Background**: Solid color, color by expression, or image from media library
- **Dynamic titles**: Titles can be expression-based
- **Sheet actions**: Trigger actions (e.g., clear selections) when users navigate to a sheet
- **CSS styling**: Custom CSS can supplement themes (limited support — no pseudo-selectors, no `@media`, max font-size 18px, no `display:none` except on custom elements)
- **PDF export sizing**:
  - Responsive landscape: 1680 × 1120 px
  - Responsive portrait: 1120 × 1680 px
  - Custom: keeps custom pixel values
- **Duplicate sheets**: Creates standalone copy with same visualizations linked to same master items

### Bookmarks
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Bookmarks/keep-track-of-important-data.htm
- Shortcuts to save a specific selection state + chart expansions
- Useful for quick navigation to common analysis states

### Stories (Data Storytelling)
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/StoryTelling/use-data-storytelling.htm
- Present data by combining snapshots of visualizations at specific times/selection states
- Guided narrative through data insights

---

## Visualizations

### Overview
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/creating-visualization.htm
**Best Practices for Choosing Types**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/when-to-use-visualizations.htm
**All Visualization Types**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/visualizations.htm

> For detailed per-chart specifications, dimensions/measures limits, and individual Help links, see `knowledge-base/qlik/visualization-types.md`

### Built-in Visualization Categories
1. **Charts**: Bar, Box Plot, Bullet, Combo, Distribution Plot, Gauge, Histogram, Line/Area, Map, Mekko, Pie/Donut, Scatter, Treemap, Waterfall
2. **Text-based**: Filter Pane, KPI, NL Insights, Pivot Table, Straight Table, Table (legacy), Text & Image
3. **Dashboard Objects**: Button, Tab Container, Navigation Menu

### Custom Objects
- **Visualization Bundle**: Funnel, Grid Chart, Multi KPI, Org Chart, P&L Pivot, Pivot Table (styled), Sankey, Trellis Container, Variance Waterfall, Word Cloud
- **Dashboard Bundle**: Animator, Container, Date Picker, Layout Container, Line, Variable Input, Video Player

### Creating Visualizations
**Creating & Editing**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/create-visualizations-overview.htm
**Chart Suggestions**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/creating-visualization-assistance.htm
**Insight Advisor**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Insights/insight-advisor-create-visualizations.htm
- Drag fields onto sheet → Qlik suggests chart type
- Insight Advisor analyzes data and generates visualizations from searches/selections
- Chart suggestions toggle for automatic type recommendation

### Data Assets in Visualizations
**Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/data-in-your-visualization.htm
- Master items (reusable dimensions & measures)
- Fields and expressions

---

## Feasibility Review Checklist

When reviewing a dashboard design for Qlik feasibility, consult these pages:

| Review Area | Reference |
|---|---|
| Is this chart type available? | `visualization-types.md` or `creating-visualization.htm` |
| Dimension/measure limits for a chart | Individual chart Help page (links in `visualization-types.md`) |
| Sheet layout & grid options | `create-sheets-for-structure.htm` |
| Conditional visibility | Sheet show conditions, Container show conditions |
| Expression capabilities | `use-expressions-in-visualizations.htm` |
| Custom CSS limitations | Sheet CSS section (no pseudo-selectors, max 18px font, no @media) |
| PDF export constraints | Sheet size section (responsive vs custom pixel values) |
| Extension availability | Viz Bundle + Dashboard Bundle pages |
| Navigation & actions | Button actions, Sheet actions, Navigation menu |
