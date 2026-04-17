# Modern Harmony Design System Overview

## About
Modern Harmony is the design system used for planning applications. It provides a consistent, accessible, and modern UI framework for building dashboard interfaces. All Qlik dashboard designs must align with Modern Harmony patterns, tokens, and components.

## Figma Source Files

### Components Library
- **URL**: https://www.figma.com/design/OimYjkrOf4hzQRzNqH03EN/Modern-Components?node-id=1557-29431
- **Contains**: All reusable UI components (buttons, inputs, cards, navigation, data tables, modals, etc.)
- **Usage**: Reference for all component specifications, states, and variants

### Typography Tokens
- **URL**: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=1-1950
- **Contains**: Font families, sizes, weights, line heights, letter spacing
- **Usage**: All text styling must use these typography tokens

### Color Tokens
- **URL**: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=1838-1271
- **Contains**: Primary, secondary, semantic, neutral, and data visualization color palettes
- **Usage**: All colors in dashboards must reference these tokens

### Size Tokens
- **URL**: https://www.figma.com/design/BY1ai4YKWOme0DiMtDJvHq/Modern-UI-Styles?node-id=4261-377
- **Contains**: Spacing scale, border radius, icon sizes, component sizing
- **Usage**: All spacing and sizing must use these tokens

### Dashboard Components (Data Visualization)
- **URL**: https://www.figma.com/design/JG8McdhvIOAM97YvWAUrE0/Data-visualization?node-id=179-1123
- **Contains**: Chart components, KPI cards, data tables, dashboard layouts
- **Usage**: Primary reference for dashboard-specific visual elements

### Data Visualization Patterns
- **URL**: https://www.figma.com/design/JG8McdhvIOAM97YvWAUrE0/Data-visualization?node-id=4-125
- **Contains**: Chart styles, color usage for data, axis styling, legend patterns
- **Usage**: Reference for how to style all data visualizations

## Design Principles

### 1. Clarity First
- Information should be immediately understandable
- Use clear labels, titles, and descriptions
- Avoid decorative elements that don't convey data

### 2. Consistent Hierarchy
- Use typography tokens to establish clear visual hierarchy
- KPIs and key metrics should be visually prominent
- Supporting information should be visually subordinate

### 3. Accessible by Default
- All designs meet WCAG 2.1 AA standards
- Color contrast ratios ≥ 4.5:1 for text, ≥ 3:1 for UI components
- Color is never the sole means of conveying information
- Interactive elements have clear focus states

### 4. Data-Driven Aesthetics
- Chart colors follow the data visualization palette
- Sequential data uses graduated color scales
- Categorical data uses distinct, high-contrast colors
- Status colors: use semantic tokens (success, warning, error, info)

### 5. Responsive & Adaptive
- Layouts should work across screen sizes
- Components adapt to container dimensions
- Text remains readable at all breakpoints

## Component Categories for Dashboards

### Navigation
- Top navigation bar
- Side navigation (collapsible)
- Breadcrumbs
- Tab bars
- Page/sheet navigation

### Data Display
- KPI cards (single value, comparison, trend)
- Charts (bar, line, combo, pie, scatter, map, treemap, waterfall)
- Data tables (sortable, filterable, paginated)
- Pivot tables
- Status indicators (badges, tags, icons)

### Input & Filters
- Filter panes
- Dropdown selects
- Date pickers
- Search bars
- Buttons & button groups
- Toggle switches
- Sliders

### Layout
- Grid system
- Card containers
- Panels with headers
- Dividers
- Spacers

### Feedback
- Tooltips
- Popovers
- Alerts/notifications
- Loading states
- Empty states
- Error states

## Implementation Notes for HTML Prototypes
When creating HTML prototypes of dashboard designs:
- Use CSS custom properties (variables) for all design tokens
- Use the token values from the Figma files
- Implement responsive layouts with CSS Grid/Flexbox
- Use Chart.js, D3.js, or similar for interactive charts
- Match Figma component specifications exactly in HTML/CSS
- Include hover, active, and focus states for all interactive elements
