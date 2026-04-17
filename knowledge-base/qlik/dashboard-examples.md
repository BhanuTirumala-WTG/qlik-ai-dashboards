# Qlik Dashboard Examples & Patterns

## Sales Dashboard Patterns

### Executive Sales Dashboard
- **Purpose**: Quick assessment of core sales KPIs
- **Key Elements**:
  - Closed revenue KPI with trend
  - Opportunity status breakdown (pie/bar)
  - Performance vs quota trends (line/bar combo)
  - Top closed and open opportunities (table)
- **Layout**: KPIs top row → trend charts middle → detail table bottom
- **Demo**: https://sense-demo.qlik.com/sso/sense/app/755a4f28-384f-494c-bdc0-a43436f5de33/sheet/NaPAVgA/state/analysis

### Sales Budget KPIs Dashboard
- **Purpose**: Track revenue, expenses, and account receivables
- **Key Elements**:
  - Expenses vs target gauge/KPI
  - Revenue breakdown by segment (bar chart)
  - Account receivable overview (pie/donut)
  - Exploration by year, segment, region, rep, product group
- **Layout**: Multi-source data integration; filter panel at top/left
- **Demo**: https://sense-demo.qlik.com/sso/sense/app/075506ed-73ee-4f1a-b9a0-1955df0bb3e0/sheet/PfKsJK/state/analysis

### Sales vs Margin Dashboard
- **Purpose**: Profitability analysis by salesperson
- **Key Elements**:
  - Sales vs margin scatter/bubble chart
  - Per-rep performance drill-down
  - Margin trend lines
- **Layout**: Central visualization with drill-down capability

### Sales Performance & Productivity Dashboard
- **Purpose**: Complete picture from macro to individual level
- **Key Elements**:
  - Pipeline by region (bar)
  - Closed revenue by region (horizontal bar)
  - Quota by region (comparison bar)
  - Top reps closed revenue vs deal value (scatter)
  - Reps closed revenue vs quota (table/bar)
- **Layout**: Multi-panel grid layout with filters for region/industry/function/rep

## Supply Chain Dashboard Patterns

### Demand Planning Dashboard
- **Key KPIs**: MAPE, WMAPE, Forecast Bias, Forecast Accuracy %
- **Charts**: Forecast vs Actual line overlay, variance waterfall, SKU-level table
- **Filters**: Time period, product family, SKU, region, customer segment

### Inventory Dashboard
- **Key KPIs**: Inventory Turns, Days of Supply, Fill Rate, Excess/Obsolete $
- **Charts**: Inventory aging bar chart, ABC classification treemap, stock trend lines
- **Filters**: Warehouse, product category, date range

### Supply Planning Dashboard
- **Key KPIs**: Capacity Utilization %, OEE, Production Attainment
- **Charts**: Capacity vs demand bar, production schedule Gantt, resource heatmap
- **Filters**: Plant, line, product, week

### S&OP Dashboard
- **Key KPIs**: Revenue Plan Attainment, Demand-Supply Gap, Service Level
- **Charts**: Plan vs actual waterfall, cross-functional scorecard, gap analysis
- **Filters**: Business unit, product family, planning period

## Common Layout Templates

### Template 1: KPI Header + Charts
```
┌──────────────────────────────────────────────┐
│  KPI 1  │  KPI 2  │  KPI 3  │  KPI 4        │
├──────────────────────────────────────────────┤
│  Chart 1 (large)     │  Chart 2 (medium)     │
├──────────────────────────────────────────────┤
│  Chart 3 (medium)    │  Table (medium)        │
└──────────────────────────────────────────────┘
```

### Template 2: Left Filter + Content
```
┌────────┬─────────────────────────────────────┐
│        │  KPI 1  │  KPI 2  │  KPI 3          │
│ Filter ├─────────────────────────────────────┤
│  Pane  │  Main Chart (large)                 │
│        ├─────────────────────────────────────┤
│        │  Detail Table                        │
└────────┴─────────────────────────────────────┘
```

### Template 3: Executive Overview
```
┌──────────────────────────────────────────────┐
│  Title / Context Bar                          │
├──────────────────────────────────────────────┤
│ KPI 1 │ KPI 2 │ KPI 3 │ KPI 4 │ KPI 5 │ KPI 6│
├──────────────────────────────────────────────┤
│  Trend Chart (wide)                           │
├────────────────────┬─────────────────────────┤
│  Breakdown 1       │  Breakdown 2             │
└────────────────────┴─────────────────────────┘
```

### Template 4: Comparison View
```
┌──────────────────────────────────────────────┐
│  Filter Bar                                   │
├──────────────────────┬───────────────────────┤
│  View A              │  View B                │
│  (Current Period)    │  (Previous Period)     │
├──────────────────────┴───────────────────────┤
│  Variance / Gap Analysis                      │
└──────────────────────────────────────────────┘
```

## Dashboard Inspiration Resources
- Qlik Demo Hub: https://demos.qlik.com
- Qlik Gallery: https://community.qlik.com/t5/Qlik-Gallery/bg-p/qlik-gallery
- Qlik Branch (extensions): https://branch.qlik.com
- Sales Dashboards: https://www.qlik.com/us/dashboard-examples/sales-dashboards
- Marketing Dashboards: https://www.qlik.com/us/dashboard-examples/marketing-dashboards
- Supply Chain: https://explore.qlik.com/
