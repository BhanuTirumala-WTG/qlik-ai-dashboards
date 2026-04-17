# Dashboard Design Patterns

## Layout Patterns

### 1. Top-Down Flow (Most Common)
```
┌─────────────────────────────────────────────┐
│  Header: Title, Date Range, Global Filters  │
├─────────────────────────────────────────────┤
│  KPI Row (4-6 metric cards)                 │
├─────────────────────────────────────────────┤
│  Primary Charts (1-2 large visualizations)  │
├─────────────────────────────────────────────┤
│  Secondary Charts / Detail Table            │
└─────────────────────────────────────────────┘
```
- **Best for**: Executive dashboards, overview pages
- **Scroll**: Minimal to none (everything above the fold)

### 2. Left Sidebar Filter
```
┌──────────┬──────────────────────────────────┐
│          │  KPI Row                          │
│  Filter  ├──────────────────────────────────┤
│  Panel   │  Main Charts                     │
│  (Fixed) ├──────────────────────────────────┤
│          │  Detail Table                     │
└──────────┴──────────────────────────────────┘
```
- **Best for**: Analytical dashboards with many filter dimensions
- **Filter panel width**: ~250-300px (collapsible preferred)

### 3. Tabbed Multi-View
```
┌─────────────────────────────────────────────┐
│  Header + Global Filters                     │
├─────────────────────────────────────────────┤
│  [Overview] [Revenue] [Pipeline] [By Rep]   │
├─────────────────────────────────────────────┤
│  Tab Content Area                            │
└─────────────────────────────────────────────┘
```
- **Best for**: Multi-perspective analysis
- **Max tabs**: 5-7 visible (use "More" if >7)

### 4. Dashboard Grid (Magazine Layout)
```
┌────────────┬────────────┬────────────┐
│  Card 1    │  Card 2    │  Card 3    │
│  (Chart)   │  (KPI)     │  (Chart)   │
├────────────┼────────────┼────────────┤
│  Card 4    │  Card 5 (wide)          │
│  (Table)   │  (Trend Chart)          │
├────────────┼────────────┬────────────┤
│  Card 6 (wide)          │  Card 7    │
│  (Map)                  │  (List)    │
└─────────────────────────┴────────────┘
```
- **Best for**: Operational dashboards, monitoring
- **Cards**: Use consistent padding, borders, and shadows

### 5. Comparison/Split View
```
┌──────────────────────┬──────────────────────┐
│  Period A / Scenario A│  Period B / Scenario B│
│  ┌──────┐ ┌──────┐  │  ┌──────┐ ┌──────┐  │
│  │KPI   │ │Chart │  │  │KPI   │ │Chart │  │
│  └──────┘ └──────┘  │  └──────┘ └──────┘  │
└──────────────────────┴──────────────────────┘
```
- **Best for**: Before/after, plan vs actual, scenario analysis

## Chart Composition Patterns

### 1. KPI Card Anatomy
```
┌──────────────────────────┐
│  📊 Metric Name          │
│  ─────────────────       │
│  $2.4M     ↑ 12%        │
│  vs $2.1M last quarter   │
│  ▔▔▔▔▁▁▁▔▔▔▔▔▔ (spark)  │
└──────────────────────────┘
```
- **Elements**: Label, value, trend indicator, comparison, optional sparkline
- **States**: Positive (green), Negative (red), Neutral (grey), Warning (amber)

### 2. Chart with Context
```
┌──────────────────────────────────┐
│  Title                   [⋯]    │
│  Subtitle / time range          │
├──────────────────────────────────┤
│                                  │
│  [Chart Visualization Area]      │
│                                  │
├──────────────────────────────────┤
│  Legend: ● Series A  ● Series B  │
│  Source: Data refreshed 2h ago   │
└──────────────────────────────────┘
```

### 3. Mini Dashboard Card
```
┌──────────────────────────┐
│  Title          [Filter] │
│  KPI: $2.4M              │
│  ┌────────────────────┐  │
│  │  Small Chart       │  │
│  └────────────────────┘  │
│  Footer / Comparison     │
└──────────────────────────┘
```

## Interaction Patterns

### 1. Click-to-Filter (Associative)
- Clicking any data point filters the entire dashboard
- Qlik's native behavior; design for it
- Show selection state clearly (green = selected, gray = excluded)

### 2. Drill-Down
- Hierarchy: Year → Quarter → Month → Week → Day
- Geography: Country → State → City
- Category: Department → Team → Individual
- Visual indicator that drill-down is available (▶ icon, underline)

### 3. Master-Detail
- Click on a row/point in master view → detail panel updates
- Master: summary table or chart
- Detail: expanded information, sub-charts, or records

### 4. Guided Navigation
- Step-by-step analysis flow
- Buttons/links guide users through sheets
- "Next Step" and "Back" navigation

### 5. Commentary/Annotation Layer
- Allow managers to add notes to data points
- Show context for outliers or unusual values
- Display data quality warnings

## Responsive Dashboard Patterns

### Breakpoints
- **Desktop**: ≥1280px (full dashboard layout)
- **Tablet landscape**: 1024-1279px (slight compression)
- **Tablet portrait**: 768-1023px (2-column layout)
- **Mobile**: <768px (single column stack)

### Responsive Strategies
- **Reflow**: Charts stack vertically on smaller screens
- **Hide**: Secondary charts hidden on mobile (shown on demand)
- **Simplify**: Replace complex charts with KPI cards on mobile
- **Prioritize**: Most important info first in reading order

## Planning Application Patterns

### Forecast Accuracy View
```
┌─────────────────────────────────────────────┐
│  MAPE: 12.3%  │ Bias: -2.1%  │ FA: 85.7%  │
├─────────────────────────────────────────────┤
│  Forecast vs Actual Line Chart              │
│  (with confidence interval band)            │
├─────────────────────────────────────────────┤
│  Variance by Product / Region Table         │
└─────────────────────────────────────────────┘
```

### Inventory Health View
```
┌─────────────────────────────────────────────┐
│  DOH: 45  │  Turns: 8.1  │  Fill: 97.2%   │
├──────────────────┬──────────────────────────┤
│  Aging Breakdown │  Stock Trend Line        │
│  (Stacked Bar)   │  (with Min/Max bands)    │
├──────────────────┴──────────────────────────┤
│  ABC Classification Treemap                  │
└─────────────────────────────────────────────┘
```

### Supply-Demand Balance View
```
┌─────────────────────────────────────────────┐
│  Gap: -5K units  │  Utilization: 87%       │
├─────────────────────────────────────────────┤
│  Supply vs Demand Stacked Area Chart        │
│  (with surplus/deficit highlight)           │
├──────────────────┬──────────────────────────┤
│  Capacity Gauge  │  Action Items Table       │
└──────────────────┴──────────────────────────┘
```
