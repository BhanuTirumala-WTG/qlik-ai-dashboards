# Dashboard Accessibility Guidelines

## WCAG 2.1 AA Compliance for Dashboards

### Perceivable

#### 1.1 Text Alternatives
- All charts must have accessible data tables as alternatives
- Decorative images must have empty alt attributes
- Icons conveying meaning must have text labels or aria-labels
- Complex visualizations should have summary descriptions

#### 1.3 Adaptable
- Use semantic HTML: headings, lists, tables, landmarks
- Reading order must match visual order
- Don't rely solely on sensory characteristics (shape, color, position)
- Responsive design: content adapts to viewport, orientation, zoom

#### 1.4 Distinguishable
- **Text contrast**: ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt+/14pt bold+)
- **UI component contrast**: ≥ 3:1 against adjacent colors
- **Chart element contrast**: ≥ 3:1 for adjacent data segments
- **Non-color indicators**: Use patterns, shapes, or labels alongside color
- Text resizing: up to 200% without loss of content
- Reflow: content works at 320px width (no horizontal scroll)
- Text spacing: adjustable line height, letter/word spacing

### Operable

#### 2.1 Keyboard Accessible
- All interactive elements reachable via Tab key
- Clear focus indicators (outline/ring) on focused elements
- No keyboard traps (user can always Tab out)
- Custom widgets follow WAI-ARIA keyboard patterns
- Shortcut keys documented and don't conflict with OS/browser shortcuts

#### 2.2 Enough Time
- Auto-refresh: provide option to pause/stop
- Time-limited interactions: provide warnings and extension options
- No content that flashes more than 3 times per second

#### 2.4 Navigable
- Page titles are descriptive ("Sales Dashboard - Q1 2024")
- Headings and labels are descriptive
- Focus order is logical and intuitive
- Link/button text is descriptive (not "click here")
- Skip navigation links for screen reader users
- Breadcrumbs for multi-sheet navigation

### Understandable

#### 3.1 Readable
- Page language declared (lang attribute)
- Abbreviations explained on first use or in glossary
- Reading level appropriate for target audience (PMs, developers, designers)
- Jargon defined via tooltips or help text

#### 3.2 Predictable
- Navigation consistent across all sheets
- Consistent identification: same function = same label everywhere
- No unexpected context changes on input/focus

#### 3.3 Input Assistance
- Required fields clearly marked
- Error messages specific and helpful
- Suggestions for fixing input errors
- Confirmation before destructive actions

### Robust

#### 4.1 Compatible
- Valid HTML
- Unique IDs
- ARIA attributes used correctly
- Tested with assistive technologies

## Dashboard-Specific Accessibility

### Chart Accessibility
- **Data tables**: Provide hidden or toggle-able data tables for all charts
- **Chart descriptions**: aria-label on chart containers describing the trend/insight
- **Color + shape**: Use different marker shapes (circle, square, triangle) for different series
- **Pattern fills**: For bar/pie charts, offer pattern fills alongside colors
- **Annotations**: Label key data points directly on charts
- **Axis labels**: Always visible and descriptive

### KPI Card Accessibility
- Screen reader announcement: "Revenue: $2.4M, up 12% from last quarter"
- Role="status" for live-updating KPIs
- Trend indicators: use text ("up", "down", "stable") alongside arrows
- Color-coded status: also include text label ("On Track", "At Risk", "Behind")

### Filter/Selection Accessibility
- Filter state announced to screen readers
- Clear labels for all filter controls
- Indicate selected count ("Region: 3 selected")
- "Clear selections" button always accessible

### Table Accessibility
- Use `<th>` for header cells with scope attribute
- Caption or aria-label describing table purpose
- Sortable columns indicated in header (`aria-sort`)
- Row selection state communicated
- Pagination controls labeled

### Interactive Element Accessibility
- Buttons: clear labels, disabled state communicated
- Dropdowns: follow listbox pattern (ARIA)
- Tooltips: trigger on focus as well as hover
- Modals/dialogs: focus trap, accessible close, return focus on close
- Drag/drop: provide keyboard alternative

## Color Accessibility

### Color Palette Requirements
- All foreground/background combinations meet contrast ratios
- Data visualization colors distinguishable in deuteranopia, protanopia, tritanopia
- Use the accessible palette from Modern Harmony design system
- Test with Sim Daltonism, Color Oracle, or similar tools

### Safe Color Combinations for Data
- Blue + Orange (safe for most colorblind types)
- Purple + Green-Yellow (distinguishable)
- Avoid pure Red + Green adjacency
- Use value (lightness) variation as primary differentiator

## Testing Checklist
- [ ] Keyboard navigation: all elements reachable and operable
- [ ] Screen reader: meaningful announcements (test with VoiceOver/NVDA)
- [ ] Zoom 200%: no content loss or overlap
- [ ] Color contrast: meets 4.5:1 / 3:1 ratios
- [ ] Color blind simulation: information still conveyed
- [ ] Focus indicators: clearly visible on all interactive elements
- [ ] Data tables: available as chart alternatives
- [ ] Motion: can be paused/stopped (prefers-reduced-motion)
- [ ] Text alternatives: all non-text content has text equivalent
