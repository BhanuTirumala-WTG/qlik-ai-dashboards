name: Qlik Dashboard Development
description: Expertise in developing interactive HTML dashboard prototypes that represent Qlik-style dashboards using the Modern Harmony design system. Use this skill when building, modifying, or debugging HTML dashboard prototypes.

# Qlik Dashboard Development Skill

This skill provides expertise in developing interactive HTML dashboard prototypes that represent Qlik-style dashboards using the Modern Harmony design system. Use this skill when building, modifying, or debugging HTML dashboard prototypes.

## Core Competencies
- HTML5, CSS3, JavaScript development
- Chart.js / ApexCharts for data visualization
- CSS Grid and Flexbox for dashboard layouts
- CSS Custom Properties for design tokens
- Responsive design implementation
- Interactive prototype development
- Accessibility implementation (ARIA, keyboard nav)
- Modern Harmony component implementation in HTML/CSS

## Technology Stack

### Required
- **HTML5**: Semantic markup, accessibility attributes
- **CSS3**: Grid, Flexbox, Custom Properties, Media Queries
- **JavaScript (ES6+)**: Interactivity, chart rendering, data handling
- **Chart.js**: Primary charting library (lightweight, well-documented)

### Optional/As Needed
- **ApexCharts**: For more complex visualization types
- **D3.js**: For custom/advanced data visualizations
- **Leaflet.js**: For map visualizations

### Development Setup
- Local file serving via Python HTTP server or Live Server
- All prototypes in `/prototypes/iterations/` directory
- Each iteration as a separate versioned HTML file

## Development Patterns

### File Structure for a Prototype
```
prototypes/iterations/
├── v1-dashboard-name/
│   ├── index.html          # Main dashboard
│   ├── styles/
│   │   ├── tokens.css      # Design tokens from Modern Harmony
│   │   ├── components.css  # Component styles
│   │   └── layout.css      # Dashboard layout
│   ├── scripts/
│   │   ├── charts.js       # Chart configurations
│   │   ├── data.js         # Sample/mock data
│   │   └── interactions.js # Filter interactions
│   └── assets/
│       └── icons/          # SVG icons
```

### CSS Token Implementation
```css
:root {
  /* Map Modern Harmony tokens to CSS Custom Properties */
  /* Typography */
  --font-family-primary: 'Inter', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Colors - to be populated from Figma tokens */
  --color-primary: #...;
  --color-secondary: #...;
  --color-background: #...;
  --color-surface: #...;
  --color-text-primary: #...;
  --color-text-secondary: #...;
  --color-border: #...;
  --color-success: #...;
  --color-warning: #...;
  --color-error: #...;
  
  /* Data visualization colors */
  --chart-color-1: #...;
  --chart-color-2: #...;
  --chart-color-3: #...;
  --chart-color-4: #...;
  --chart-color-5: #...;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### Dashboard Grid Layout
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: var(--space-md);
  padding: var(--space-lg);
}

.card { /* Dashboard card container */
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-md);
  border: 1px solid var(--color-border);
}

.card--full { grid-column: span 12; }
.card--half { grid-column: span 6; }
.card--third { grid-column: span 4; }
.card--quarter { grid-column: span 3; }

@media (max-width: 768px) {
  .card--half, .card--third, .card--quarter {
    grid-column: span 12;
  }
}
```

### Chart.js Configuration Template
```javascript
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { family: 'var(--font-family-primary)', size: 12 },
        usePointStyle: true,
        padding: 16
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      cornerRadius: 8,
      padding: 12,
      titleFont: { size: 14, weight: '600' },
      bodyFont: { size: 13 }
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { font: { size: 12 } }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { font: { size: 12 } }
    }
  }
};
```

## Implementation Checklist
- [ ] Design tokens mapped from Modern Harmony Figma files
- [ ] Responsive grid layout implemented
- [ ] All chart types rendered with Chart.js/ApexCharts
- [ ] Interactive filters functional (click-to-filter simulation)
- [ ] KPI cards with values, trends, and conditional colors
- [ ] Accessibility: keyboard navigation, ARIA labels, contrast
- [ ] Loading states and empty states handled
- [ ] Tooltips on hover for chart data points
- [ ] Consistent typography using token scale
- [ ] Consistent spacing using token scale

## Knowledge Base References
- `knowledge-base/modern-harmony/design-system-overview.md` - Design token sources
- `knowledge-base/qlik/visualization-types.md` - Qlik chart types to emulate
- `knowledge-base/qlik/dashboard-examples.md` - Layout templates
- `knowledge-base/design-principles/dashboard-design-patterns.md` - Interaction patterns
