# Dashboard Design Heuristics

## Nielsen's 10 Usability Heuristics (Applied to Dashboards)

### 1. Visibility of System Status
- Show loading states when data is being fetched
- Display last refresh timestamp clearly
- Indicate filter selections and active state
- Show data freshness indicators
- Provide selection counts (e.g., "3 of 12 regions selected")

### 2. Match Between System and Real World
- Use business terminology users are familiar with
- Display dates in user's expected format
- Use industry-standard KPI names and abbreviations
- Units should be clearly labeled (%, $, units, etc.)
- Color coding should match business conventions (red=bad, green=good in finance)

### 3. User Control and Freedom
- Allow easy clearing of all selections
- Provide "undo" for filter changes via selection history
- Allow bookmark/save of preferred views
- Support back navigation between sheets
- Provide export options for data

### 4. Consistency and Standards
- Same data = same visualization type across sheets
- Consistent color meaning throughout the dashboard
- Standardized KPI card layout
- Consistent filter placement and behavior
- Uniform date range selectors

### 5. Error Prevention
- Validate filter combinations that produce no data
- Show "no data" states clearly (not blank charts)
- Prevent selection combinations that cause calculation errors
- Guide users with default selections

### 6. Recognition Rather than Recall
- Label all axes, legends, and data points
- Show current filter selections persistently
- Use descriptive sheet/page names
- Include contextual help for complex metrics
- Use familiar chart types

### 7. Flexibility and Efficiency of Use
- Provide both guided and exploratory paths
- Support keyboard shortcuts for selections
- Allow drill-down/drill-up
- Offer bookmarks for frequent analyses
- Support direct data search

### 8. Aesthetic and Minimalist Design
- Remove non-essential decorative elements
- Use gridlines sparingly (light, subtle)
- Limit chart junk (excessive labels, borders, shadows)
- Maximize data-ink ratio
- White space is valuable - don't fill every pixel

### 9. Help Users Recognize, Diagnose, and Recover from Errors
- Clear "no results" messaging with suggestions
- Indicate when filters are too restrictive
- Show "0" differently from "no data"
- Provide fallback views when data is missing

### 10. Help and Documentation
- Include sheet descriptions
- Add tooltip help on complex KPIs
- Provide a glossary for business terms
- Include data source credits
- Add calculation methodology notes where needed

## Shneiderman's Visual Information Seeking Mantra
**Overview first, zoom and filter, then details on demand.**

### Applied to Dashboard Design:
1. **Overview**: Landing sheet with high-level KPIs and summary charts
2. **Zoom & Filter**: Interactive filtering, drill-down capabilities
3. **Details on Demand**: Tooltips, linked detail sheets, data tables

## Tufte's Principles of Graphical Excellence

### Data-Ink Ratio
- Maximize data-ink ratio: ink devoted to data / total ink
- Remove chart borders, backgrounds, gridlines where not needed
- Avoid 3D effects, gradients, shadows on data elements
- Use thin, subtle axis lines

### Small Multiples
- Use consistent small charts for comparison across categories
- Same scale, same axis, same size
- Powerful for showing patterns across dimensions

### Sparklines
- Small, inline trend indicators
- Great for tables and KPI cards
- Show trends without taking dashboard real estate

## Dashboard-Specific Heuristics

### The 5-Second Rule
A user should understand the dashboard's purpose and key message within 5 seconds of viewing it.

### The "So What?" Test
Every chart and KPI should answer a clear business question. If it doesn't lead to an action or insight, consider removing it.

### Progressive Disclosure
- Layer 1: What happened? (KPIs)
- Layer 2: Why did it happen? (Analysis charts)
- Layer 3: What specifically? (Detail tables)
- Layer 4: What should we do? (Recommendations/actions)

### Information Density Guidelines
- **Low density** (executive view): 4-6 elements per sheet
- **Medium density** (manager view): 6-10 elements per sheet
- **High density** (analyst view): 10-15 elements per sheet
- Never exceed 15 elements per sheet

### Gestalt Principles for Layout
- **Proximity**: Related items close together
- **Similarity**: Same data types use same visual encoding
- **Enclosure**: Use cards/borders to group related content
- **Connection**: Use lines/arrows to show relationships
- **Continuity**: Align elements to create visual flow

### Color Usage Heuristics
- Max 5-7 colors per chart
- Use only 1-2 accent colors to draw attention
- Grey for context, color for focus
- Ensure colorblind-safe palette
- Test with greyscale filter
