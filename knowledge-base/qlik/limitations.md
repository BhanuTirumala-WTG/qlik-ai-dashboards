# Qlik Sense Limitations & Constraints

## Platform Limitations

### Visualization Limits
- **Max objects per sheet**: ~50 objects recommended; performance degrades beyond this
- **Max sheets per app**: No hard limit, but 30+ sheets cause navigation/performance issues
- **Max dimensions per chart**: 2 dimensions for most charts; pivot tables support more
- **Max measures per chart**: Varies by chart type (bar chart: 1-2 recommended, combo chart: up to 15)
- **Max data points per visualization**: ~10,000 visible data points; beyond this, Qlik aggregates or collapses
- **Max rows in tables**: Renders up to ~100,000 rows; use pagination for larger datasets
- **Max hypercube cells**: 10,000 cells per initial data fetch (configurable in mashups)

### Data Model Limits
- **Max fields per table**: No hard limit; 100+ fields may cause performance issues
- **Max tables in data model**: No hard limit; circular references (loops) must be resolved
- **Max rows per table**: ~billions supported; depends on RAM allocation
- **Max app size (RAM)**: Limited by server RAM; recommended <5GB in-memory for responsive UX
- **Section Access**: Row-level security can significantly impact performance

### Expression Limits
- **Max expression length**: 64,000 characters
- **Max nested IF depth**: ~50 levels (but avoid deep nesting for performance)
- **No server-side scripting in visualizations**: All expressions must use Qlik expression language
- **No custom JavaScript in standard objects**: Only available via Extensions or Mashups

## Chart-Specific Limitations

### Bar Charts
- Max 2 dimensions, up to ~15 measures
- Stacked bars: avoid more than 5-7 segments (readability)
- No native waterfall in standard bar charts (use waterfall chart type)

### Line Charts
- Max 2 dimensions (1 continuous, 1 categorical for multi-line)
- Max ~15 measures as separate lines
- Limited control over line styling (dashes, markers) in standard objects
- Trend lines: limited to linear, exponential, logarithmic, polynomial, power

### Pie/Donut Charts
- Max 1 dimension, 1 measure
- Not recommended for >7 slices
- No nested donut (use treemap or extension)

### Scatter Plots
- Max 2 dimensions, 2-3 measures (x, y, and optional bubble size)
- Coloring by dimension limited to first dimension
- Regression lines: limited types available

### KPI Objects
- Max 2 measures (primary + secondary/conditional)
- Limited formatting options (no spark lines in standard KPI)
- Conditional colors: up to ~100 conditions

### Tables & Pivot Tables
- Straight tables: unlimited columns but performance degrades >20 columns
- Pivot tables: max ~20 dimensions (practical limit)
- No cell merging in native tables
- Limited cell-level formatting (mini charts require extensions)

### Maps
- Supports point, area, line, density, and chart layers
- Max 5 layers per map
- Coordinate system: WGS 84 only
- Custom base maps: limited to TMS/WMS services
- No 3D maps natively

### Treemaps
- Max 3 dimensions
- Limited color customization
- No labels on smaller segments

### Combo Charts
- Mix bars and lines: up to 15 measures
- Only 2 y-axes (left and right)
- Cannot mix different chart types beyond bars/lines/areas

### Waterfall Charts
- Single dimension, single measure
- Subtotals must be manually configured
- Limited color customization

### Gauge Charts
- Single measure
- Limited to radial or linear gauge
- Max 10 range limits

### Histogram
- Single measure (auto-binned)
- No manual bin control in standard object (use expressions for custom bins)
- Limited overlay options

## Layout & Styling Limitations

### Viewport / No-Scroll Constraint
- **Qlik Sense sheets do NOT scroll** — all content must fit within the device/browser viewport height
- Designers MUST fit every object (KPIs, charts, tables, filters) within a single screen
- This is the single most important layout constraint; violating it means content is invisible to users
- Strategies to comply: reduce chart count per sheet, use container/tab objects to toggle views, split content across multiple sheets, collapse filters into selection bars
- **Prototype implication**: HTML prototypes must use `height: 100vh; overflow: hidden` on the sheet container to simulate this constraint accurately

### Grid Layout
- All Qlik Sense sheets use a responsive grid layout
- Objects snap to grid; pixel-perfect positioning is NOT possible
- Grid is 24 columns wide (standard) or variable (responsive mode)
- Minimum object size: 2×2 grid cells
- Objects cannot overlap (no layering/z-index in standard layout)
- No absolute positioning of elements within objects

### Responsive Design
- Sheets resize to browser width
- Objects scale proportionally but may reflow
- Mobile view: objects stack vertically; layout differs from desktop
- Custom breakpoints: NOT supported natively
- No media queries or conditional layouts

### Typography
- Limited font choices in standard Qlik Sense (system fonts)
- Qlik Cloud: supports Google Fonts via theme
- Font size control: limited to predefined ranges per object type
- No text wrapping control in chart labels
- Rich text: basic HTML in text/image objects only

### Colors & Theming
- Custom themes: JSON-based; apply globally or per app
- Max colors in custom palette: unlimited in theme definition
- Conditional coloring: by expression, dimension, or measure
- No gradient fills on chart elements (only background)
- **Important**: Theme colors cascade; individual object overrides are limited

### Spacing & Padding
- No control over internal padding in standard objects
- Object margins are grid-defined
- Cannot adjust spacing between chart bars, lines, or points natively
- Whitespace management: limited to object arrangement on grid

### Headers & Titles
- Each object has a title and subtitle
- Footnotes: available in most chart types
- Title expressions: supported (dynamic titles)
- No custom title styling per object (follows theme)

## Interactivity Limitations

### Filters & Selections
- Qlik uses associative model (green/white/gray states)
- Filter panes: unlimited fields per pane
- **No cascading/dependent dropdowns natively** (all selections are associative)
- Selection toolbar: always present; cannot be hidden in standard apps
- Bookmark features: supported but with limitations on sharing

### Actions & Navigation
- Button objects: navigate to sheets, apps, URLs, or set bookmarks
- **No in-object drill-through** (use master items and navigation)
- Sheet-to-sheet navigation: supported via buttons or sheet menu
- **No modal dialogs** natively
- No tabbed containers in standard objects (use container object or alternate states)

### Containers
- Container objects allow toggling between multiple visualizations
- Max objects per container: no hard limit; ~10 recommended
- Accordion containers: show/hide objects (Qlik Cloud)
- **No drag-and-drop reordering** by end users

### Tooltips
- Custom tooltips: supported on most chart types
- Tooltip measures: up to 3 additional measures
- No HTML formatting in tooltips (standard objects)
- No chart-in-tooltip natively

## Extension & Customization Limitations

### Extensions (Qlik Sense)
- Written in JavaScript with Qlik Extension API
- Max size: no hard limit; recommended <2MB bundled
- **Cannot modify the Qlik Sense shell/chrome**
- Limited access to Qlik engine from within extensions
- Extensions run sandboxed; no direct DOM manipulation of other objects
- Qlik Cloud: only allowlisted extensions permitted (Content Security Policy restrictions)
- Extension approval process required for Qlik Cloud deployments

### Mashups
- Full Qlik capability API access
- Can embed Qlik objects in external web applications
- Requires separate web server for hosting mashup
- Session management: tied to Qlik Sense virtual proxy
- Max concurrent sessions per user: configurable (default ~5)

### Themes
- JSON-based theme files
- Can customize: colors, fonts, object styling, chart properties
- **Cannot**: change layout behavior, add new chart types, modify selection model
- Applied at app level (not per-sheet)
- Limited CSS injection in Qlik Cloud (CSP restrictions)

## Performance Considerations

### Best Practices for Performance
- Keep master items organized (<100 master measures/dimensions per app)
- Avoid set analysis within set analysis (nested set expressions)
- Use variables for repeated expressions
- Limit use of Aggr() function (creates virtual tables)
- Synthetic keys: resolve or understand their impact
- QVD optimization: use optimized load where possible

### Rendering Performance
- Chrome/Edge: best browser support
- Large expressions may cause rendering timeout (default: 300 seconds)
- Parallel calculation: limited by available engine threads
- Print/PDF: layout may differ from on-screen rendering

## Qlik Cloud-Specific Limitations
- File uploads: max 500MB per file (varies by tier)
- Apps: max size varies by capacity tier
- Extensions: must be on allowlist; custom extensions require admin approval
- Data connectivity: some connectors require Qlik Data Gateway
- Reload scheduling: limited concurrent reloads per tier
- Spaces: apps organized in personal, shared, and managed spaces
- API rate limits: apply to automation and REST calls

## Common Design Patterns in Qlik

### Dashboard Structure
1. **Overview sheet**: KPIs + high-level charts
2. **Analysis sheets**: detailed drill-down charts
3. **Detail sheets**: tables for data exploration
4. **Filter panels**: typically left-side or top filter objects

### Navigation Patterns
- Sheet navigation bar (built-in)
- Button-based navigation (custom flows)
- Bookmark-based views
- Container-based tab simulation

### Mobile Considerations
- Test at 320px minimum width
- KPI objects and vertical lists work best on mobile
- Avoid wide tables (horizontal scroll is poor UX on mobile)
- Use responsive layout mode for better mobile support
