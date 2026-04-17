# Qlik Dashboard Best Practices

## Data Model Best Practices

### Star Schema Design
- Use a star schema or snowflake schema for best performance
- Fact tables in the center, dimension tables radiating out
- Avoid circular references (loops) - use QUALIFY or concatenation
- Keep synthetic keys to a minimum; resolve with composite keys

### Data Reduction
- Only load required fields (avoid SELECT *)
- Aggregate data where detail isn't needed
- Use QVD files for incremental loads
- Apply WHERE clauses in load script to filter unnecessary data

### Expression Best Practices
- Use master measures and dimensions for consistency
- Store complex expressions in variables for reuse
- Use Set Analysis instead of IF() for better performance
- Avoid nested Aggr() - creates virtual tables in memory
- Use Dual() for custom sort orders

## Dashboard Design Best Practices

### Layout Principles
1. **F-Pattern Reading**: Most important KPIs top-left
2. **Progressive Disclosure**: Overview → Analysis → Detail
3. **Visual Hierarchy**: Size and position indicate importance
4. **Consistency**: Use same chart types for same data types across sheets
5. **White Space**: Don't overcrowd sheets; give objects breathing room

### KPI Design
- Place KPIs at the top of the dashboard
- Show: current value, trend indicator, comparison (vs target/previous period)
- Use conditional colors: green (good), yellow (warning), red (critical)
- Limit to 4-6 primary KPIs per sheet
- Include context (time period, units, etc.) in subtitle or footnote

### Chart Selection Guide
| Data Question | Recommended Chart | Avoid |
|---|---|---|
| Part-to-whole | Pie (≤5 items), Treemap (>5 items) | Pie with many slices |
| Trend over time | Line chart, Area chart | Pie chart |
| Comparison | Bar chart (horizontal for long labels) | 3D charts |
| Distribution | Histogram, Box plot | Pie chart |
| Correlation | Scatter plot | Line chart |
| Geographic | Map | Bar chart with geography |
| Ranking | Horizontal bar | Vertical bar with many categories |
| KPI/Score | KPI object, Gauge | Complex charts |

### Color Strategy
- Use a consistent, accessible color palette
- Limit to 5-7 colors per chart
- Use sequential colors for ordered data (light→dark)
- Use diverging colors for data with a meaningful midpoint
- Reserve red/green for status indicators (and provide alternative cues for colorblind users)
- Use grey for context/background data
- Use brand colors sparingly (accent, not dominant)

### Filter Design
- Filter panes: place consistently (left side or top)
- Show current selections clearly
- Default selections: set sensible defaults (current year, user's region, etc.)
- Use alternative states for comparative analysis
- Consider filter button rows for frequently used filters

### Interactivity
- Use bookmarks for predefined views
- Add navigation buttons for guided analysis flows
- Leverage Qlik's native selections (click-to-filter)
- Use tooltip charts for additional context without clutter
- Container objects for tab-like behavior

## Planning Dashboard Specifics

### Supply Chain Planning Dashboards
- **Demand Planning**: Forecast vs Actual charts, MAPE/Bias KPIs, SKU-level drill-down
- **Supply Planning**: Capacity utilization, production schedules, resource allocation
- **Inventory Planning**: Stock levels, turnover rates, aging analysis, ABC classification
- **S&OP Dashboards**: Cross-functional KPIs, scenario comparison, gap analysis

### Common Planning KPIs
- Forecast Accuracy (MAPE, WMAPE, Bias)
- Fill Rate / Service Level
- Inventory Turns
- Days of Supply
- Production Efficiency (OEE)
- On-Time Delivery (OTD)
- Plan Attainment
- Revenue vs Plan

### Planning Dashboard Patterns
1. **Executive Summary**: High-level KPIs with red/amber/green status
2. **Trend Analysis**: Time-series charts with plan vs actual overlays
3. **Variance Views**: Waterfall charts showing plan-to-actual variance
4. **Detail Grids**: Pivot tables for SKU/region/customer drill-down
5. **Scenario Comparison**: Side-by-side or overlay views using alternate states

## Accessibility Best Practices
- Maintain color contrast ratio ≥ 4.5:1 for text
- Don't rely solely on color to convey meaning
- Provide text alternatives for chart data (accessible tables)
- Use descriptive titles and subtitles
- Test with screen readers where possible
- Keyboard navigation: Qlik supports TAB navigation between objects

## Performance Tips
- Limit objects per sheet: ≤15 for optimal performance
- Use calculated dimensions sparingly
- Set analysis over if() conditions
- Pre-calculate in load script when possible
- Use data reduction (WHERE clause, incremental load)
- Monitor app size in Qlik Management Console
