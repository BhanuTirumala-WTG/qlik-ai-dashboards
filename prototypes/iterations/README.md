# Qlik Dashboard Prototypes — Iterations

This folder contains versioned iterations of dashboard prototypes developed by the Qlik Developer agent.

## Naming Convention
```
v[version]-[dashboard-name]/
├── index.html
├── styles/
├── scripts/
└── assets/
```

## Version History
Versions are created as part of the design workflow:
- **v1**: Initial prototype from design specification
- **v2+**: Iterations based on Designer review + Qlik Expert feasibility feedback

## Previewing
To preview a prototype, run:
```bash
cd prototypes/iterations/v[N]-[dashboard-name]
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.
