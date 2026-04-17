# Qlik Sense Visualization Types Reference

**Official Documentation**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/visualizations.htm
**Best Practices for Choosing Visualizations**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/when-to-use-visualizations.htm

## Standard Chart Types

### Bar Chart
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Bar-Chart/bar-chart.htm
- **Use for**: Comparing categorical data
- **Dimensions**: 1-2
- **Measures**: 1-15
- **Variants**: Vertical, Horizontal, Stacked, Grouped, Butterfly
- **Qlik Properties**: Orientation, grouping/stacking, data labels, reference lines, trend lines, shapes (points & lines)
- **Limitations**: No rounded corners, limited bar width control, no custom spacing. Max ~5000 stacked bars without grey areas. Max 2000 data points on continuous scale. Max 100 colors in legend.

### Line Chart
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/LineChart/line-chart.htm
- **Use for**: Trends over time, continuous data
- **Dimensions**: 1-2 (1 for continuous axis)
- **Measures**: 1-15
- **Variants**: Line, Area, Stacked Area
- **Properties**: Line type (solid), markers, trend lines, reference lines
- **Limitations**: No dashed lines in standard, limited marker customization

### Combo Chart
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Combo-Chart/combo-chart.htm
- **Use for**: Multiple measures with different scales
- **Dimensions**: 1
- **Measures**: 1-15
- **Variants**: Bar+Line, Bar+Area, Bar+Marker
- **Properties**: Dual axis (left/right), individual measure styling
- **Limitations**: Only 2 y-axes, bars always go first in legend

### Pie Chart
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/PieChart/pie-chart.htm
- **Use for**: Part-to-whole relationships (≤7 categories)
- **Dimensions**: 1
- **Measures**: 1
- **Variants**: Pie, Donut
- **Properties**: Label positioning, inner radius (donut)
- **Limitations**: No nested donut, max 1 dimension, not recommended for >7 slices

### Scatter Plot
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Scatter/scatter.htm
- **Use for**: Correlation between two measures
- **Dimensions**: 1-2
- **Measures**: 2-3 (x, y, bubble size)
- **Properties**: Bubble size, color by dimension/expression, regression lines
- **Limitations**: Hard to read with many data points, limited regression types

### Table (Straight Table)
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Table/table.htm
- **Use for**: Detailed data exploration
- **Dimensions**: Unlimited (practical: ≤15)
- **Measures**: Unlimited (practical: ≤20)
- **Properties**: Sorting, totals, conditional formatting (expressions), column width
- **Limitations**: No cell merging, no mini charts natively, limited styling

### Pivot Table
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/PivotTable/pivot-table.htm
- **Use for**: Multi-dimensional analysis, drill-down
- **Dimensions**: Up to ~20 (practical: ≤5 in rows, ≤3 in columns)
- **Measures**: Unlimited
- **Properties**: Expand/collapse, totals/subtotals, sorting
- **Limitations**: Some styling limits, no custom cell rendering, heavy on memory

### KPI
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/KPI/kpi.htm
- **Use for**: Key metric display
- **Dimensions**: 0
- **Measures**: 1-2 (primary + secondary/comparison)
- **Properties**: Conditional colors, icon, trend, linked sheet
- **Limitations**: Limited formatting, no sparklines natively, max 2 measures

### Gauge
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/GaugeChart/gauge-chart.htm
- **Use for**: Single metric against a target/range
- **Dimensions**: 0
- **Measures**: 1
- **Variants**: Radial, Linear (bar)
- **Properties**: Range limits, segments (up to 10), colors
- **Limitations**: Single measure only, limited styling

### Treemap
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/TreeMap/tree-map.htm
- **Use for**: Hierarchical part-to-whole
- **Dimensions**: 1-3 (hierarchical)
- **Measures**: 1-2 (size + optional color)
- **Properties**: Color by expression, header text
- **Limitations**: Labels hidden on small segments, max 3 dimensions

### Waterfall Chart
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/WaterfallChart/waterfall-chart.htm
- **Use for**: Showing cumulative effect of values
- **Dimensions**: 1
- **Measures**: 1
- **Properties**: Subtotals, conditional colors
- **Limitations**: Single measure, limited customization, manual subtotal setup

### Box Plot
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/BoxPlot/box-plot.htm
- **Use for**: Distribution analysis
- **Dimensions**: 1-2
- **Measures**: 1 (or 5 manual: min, Q1, median, Q3, max)
- **Properties**: Whiskers, outlier points
- **Limitations**: Limited styling, not widely understood by business users

### Distribution Plot
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/DistributionPlot/distribution-plot.htm
- **Use for**: Showing data distribution
- **Dimensions**: 1-2
- **Measures**: 1
- **Properties**: Frequency, jitter
- **Limitations**: Less common, limited customization

### Map
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Map/map.htm
- **Use for**: Geographical data
- **Layer types**: Point, Area, Line, Density, Chart
- **Properties**: Multiple layers (up to 5), custom colors, tooltips, zoom
- **Data**: Geo point (lat/long), area names (auto-resolve), GeoJSON
- **Limitations**: WGS84 only, max 5 layers, no 3D, limited base map options

### Filter Pane
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/FilterPane/filter-pane.htm
- **Use for**: User selections/filtering
- **Fields**: Unlimited per pane
- **Properties**: List box, dropdown, search
- **Limitations**: Takes space, no checkbox mode in standard (use extension)

### Text & Image
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Text-Image/text-image.htm
- **Use for**: Static content, instructions, branding
- **Properties**: Rich text (basic HTML), image embedding, expressions in text
- **Limitations**: Limited HTML support, no custom CSS, basic formatting

### Button
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Button/button.htm
- **Use for**: Navigation, actions
- **Actions**: Navigate to sheet/URL/app, set bookmark, apply selection, clear selections
- **Properties**: Icon, label, conditional show/enable
- **Limitations**: Basic styling, no complex interaction flows

### Container
**Qlik Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/Container/container.htm
- **Use for**: Grouping visualizations, tab-like behavior
- **Properties**: Show conditions per item, tab/accordion style
- **Limitations**: Slight performance overhead, no drag-and-drop by users

## Dashboard Object (Qlik Cloud)
- **Use for**: Showing Qlik Analytics apps within a larger app
- **Properties**: Linked content, responsive sizing

## Extension Objects (Community & Custom)
**Visualization Bundle Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/VisualizationBundle/visualization-bundle.htm
**Dashboard Bundle Docs**: https://help.qlik.com/en-US/sense/November2025/Subsystems/Hub/Content/Sense_Hub/Visualizations/DashboardBundle/dashboard-bundle.htm

Common extensions that extend standard capabilities:
- **Variable Input**: Sliders, dropdowns for variable control
- **SPC Charts**: Statistical process control
- **Gantt Charts**: Project timeline visualization
- **Sankey Diagrams**: Flow visualization
- **Word Clouds**: Text frequency visualization
- **Calendar Heatmaps**: Date-based heat visualization
- **Custom Tables**: Enhanced table with mini charts, icons, formatting

> **Note**: Extensions must be approved/allowlisted for Qlik Cloud deployment

### Visualization Bundle Charts
- **Funnel Chart**: Visual representation of connected stages in a linear process
- **Grid Chart**: Comparative data with values represented as colors
- **Multi KPI**: KPI for multiple dimension values — quick performance tracking
- **Org Chart**: Organization chart with tree structure
- **P&L Pivot**: Styled pivot table for profit and loss reporting
- **Sankey Chart**: Flow chart emphasizing major transfers/flows within a system
- **Trellis Container**: Creates a trellis chart from a master visualization
- **Variance Waterfall**: Variance between two measures over dimension values
- **Word Cloud**: Word sizes based on measure value

### Dashboard Bundle Controls
- **Animator**: Animate visualization changes over a time period
- **Container** (Dashboard bundle): Group visualizations in a space-saving container
- **Date Picker**: Select single date or date range from calendar
- **Layout Container**: Arrange visualizations in a positionable container
- **Line**: Add vertical/horizontal divider lines to sheets
- **Variable Input**: Set variable values via slider, dropdown, or input
- **Video Player**: Embed video in sheets
