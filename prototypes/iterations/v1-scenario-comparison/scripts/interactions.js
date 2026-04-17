/* ============================================================
   Interactions & Dashboard Logic
   Scenario Comparison Dashboard v1 (iterated)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  populateFilters();
  initTabs();
  initSubTabs();
  initTableSort();
  renderOverviewTab();
  renderTrendingTab('mape-trending');
}

/* --- Filter Population --- */
function populateFilters() {
  const scenarioASelect = document.getElementById('filter-scenario-a');
  const scenarioBSelect = document.getElementById('filter-scenario-b');

  SCENARIOS.available.forEach(s => {
    scenarioASelect.add(new Option(s, s, s === SCENARIOS.defaultA, s === SCENARIOS.defaultA));
    scenarioBSelect.add(new Option(s, s, s === SCENARIOS.defaultB, s === SCENARIOS.defaultB));
  });

  populateSelect('filter-lag', ['All Lags', ...FILTERS.lags.map(l => `Lag ${l}`)]);
  populateSelect('filter-version', ['All Versions', ...FILTERS.versions]);
  populateSelect('filter-location', ['All Locations', ...FILTERS.locations]);
  populateSelect('filter-item', ['All Items', ...FILTERS.items]);
  populateSelect('filter-lds-group', ['All LDS Groups', ...FILTERS.ldsGroups]);

  // Listen for scenario changes
  scenarioASelect.addEventListener('change', handleScenarioChange);
  scenarioBSelect.addEventListener('change', handleScenarioChange);

  // Clear filters button
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
}

function populateSelect(id, options) {
  const select = document.getElementById(id);
  options.forEach(o => {
    select.add(new Option(o, o));
  });
}

function getSelectedScenarios() {
  return {
    a: document.getElementById('filter-scenario-a').value,
    b: document.getElementById('filter-scenario-b').value
  };
}

function handleScenarioChange() {
  const { a, b } = getSelectedScenarios();

  // Same-scenario guard
  const warning = document.getElementById('same-scenario-warning');
  if (warning) {
    if (a === b) {
      warning.hidden = false;
    } else {
      warning.hidden = true;
    }
  }

  updateKpis(a, b);
  renderAllCharts(a, b);
  renderDetailTable(a, b);
}

function clearFilters() {
  document.getElementById('filter-scenario-a').value = SCENARIOS.defaultA;
  document.getElementById('filter-scenario-b').value = SCENARIOS.defaultB;
  document.getElementById('filter-lag').selectedIndex = 0;
  document.getElementById('filter-version').selectedIndex = 0;
  document.getElementById('filter-location').selectedIndex = 0;
  document.getElementById('filter-item').selectedIndex = 0;
  document.getElementById('filter-lds-group').selectedIndex = 0;
  handleScenarioChange();
}

/* --- KPI Rendering --- */
function updateKpis(scenarioA, scenarioB) {
  const kpi = getKpiData(scenarioA, scenarioB);

  // MAPE
  setKpi('kpi-mape-a', kpi.mape.a.label, kpi.mape.a.value, '%', 'scenario-a');
  setKpi('kpi-mape-b', kpi.mape.b.label, kpi.mape.b.value, '%', 'scenario-b');
  setKpiDiff('kpi-mape-diff', 'MAPE Δ%', kpi.mape.diff.value, '%');

  // Bias
  setKpi('kpi-bias-a', kpi.bias.a.label, kpi.bias.a.value, '%', 'scenario-a');
  setKpi('kpi-bias-b', kpi.bias.b.label, kpi.bias.b.value, '%', 'scenario-b');
  setKpiDiff('kpi-bias-diff', 'Bias Δ', kpi.bias.diff.value, '%');

  // ExtErr
  setKpi('kpi-ext-under-a', kpi.extErrUnder.a.label, kpi.extErrUnder.a.value, '%', 'scenario-a');
  setKpi('kpi-ext-under-b', kpi.extErrUnder.b.label, kpi.extErrUnder.b.value, '%', 'scenario-b');
  setKpiDiff('kpi-ext-under-diff', 'Ext Under Δ', kpi.extErrUnder.b.value - kpi.extErrUnder.a.value, '%');
  setKpi('kpi-ext-over-a', kpi.extErrOver.a.label, kpi.extErrOver.a.value, '%', 'scenario-a');
  setKpi('kpi-ext-over-b', kpi.extErrOver.b.label, kpi.extErrOver.b.value, '%', 'scenario-b');
  setKpiDiff('kpi-ext-over-diff', 'Ext Over Δ', kpi.extErrOver.b.value - kpi.extErrOver.a.value, '%');
}

function setKpi(id, label, value, suffix, variant) {
  const el = document.getElementById(id);
  if (!el) return;
  el.querySelector('.kpi-card__label').textContent = label;
  const valEl = el.querySelector('.kpi-card__value');
  valEl.textContent = value + suffix;
  valEl.className = 'kpi-card__value';
  if (variant === 'scenario-a') valEl.classList.add('kpi-card__value--scenario-a');
  if (variant === 'scenario-b') valEl.classList.add('kpi-card__value--scenario-b');
}

function setKpiDiff(id, label, value, suffix) {
  const el = document.getElementById(id);
  if (!el) return;
  el.querySelector('.kpi-card__label').textContent = label;
  const valEl = el.querySelector('.kpi-card__value');
  const display = (value > 0 ? '+' : '') + value + suffix;
  valEl.textContent = display;
  valEl.className = 'kpi-card__value';
  if (value < 0) valEl.classList.add('kpi-card__value--positive'); // negative MAPE diff = improvement
  else if (value > 0) valEl.classList.add('kpi-card__value--negative');
  else valEl.classList.add('kpi-card__value--neutral');
}

/* --- Tab Navigation --- */
function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab-nav__item'));
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => activateTab(e.currentTarget));

    // Arrow-key navigation (WAI-ARIA tabs pattern)
    tab.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(e.currentTarget);
      let next;
      if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); next.focus(); activateTab(next); }
    });
  });
}

function activateTab(tab) {
  const target = tab.dataset.tab;

  // Update tab buttons + aria
  document.querySelectorAll('.tab-nav__item').forEach(t => {
    t.classList.remove('tab-nav__item--active');
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  });
  tab.classList.add('tab-nav__item--active');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');

  // Update tab panels
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('tab-panel--active'));
  document.getElementById(`panel-${target}`).classList.add('tab-panel--active');

  // Render content for the tab
  if (target === 'overview') renderOverviewTab();
  if (target === 'trending') {
    const activeSubTab = document.querySelector('.sub-tab--active')?.dataset.subtab || 'mape-trending';
    renderTrendingTab(activeSubTab);
  }
  if (target === 'detail') renderDetailTab();
}

/* --- Sub-Tab Navigation (Trending) --- */
function initSubTabs() {
  document.querySelectorAll('.sub-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = e.currentTarget.dataset.subtab;

      document.querySelectorAll('.sub-tab').forEach(t => {
        t.classList.remove('sub-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      e.currentTarget.classList.add('sub-tab--active');
      e.currentTarget.setAttribute('aria-selected', 'true');

      renderTrendingTab(target);
    });
  });
}

/* --- Overview Tab Render --- */
function renderOverviewTab() {
  const { a, b } = getSelectedScenarios();
  updateKpis(a, b);
  renderScatter('chart-scatter', a, b);
  renderMapeByLag('chart-mape-lag', a, b);
  renderBiasByLag('chart-bias-lag', a, b);
  updateLegend(a, b);

  // Dynamic scatter chart title
  const scatterTitle = document.getElementById('scatter-chart-title');
  if (scatterTitle) scatterTitle.textContent = `${a} vs ${b} MAPE`;
}

/* --- Trending Tab Render --- */
const TRENDING_TITLES = {
  'mape-trending': { title: 'MAPE Trending', subtitle: 'Time-series comparison over calendar months' },
  'bias-trending': { title: 'Bias Trending', subtitle: 'Forecast bias trend over calendar months' },
  'mape-version': { title: 'MAPE by Version', subtitle: 'Accuracy comparison across model versions' },
  'error-dist': { title: 'Error Distribution', subtitle: 'Frequency distribution of forecast errors' }
};

function renderTrendingTab(subtab) {
  const { a, b } = getSelectedScenarios();
  const canvasId = 'chart-trending';

  // Update title and subtitle
  const meta = TRENDING_TITLES[subtab] || TRENDING_TITLES['mape-trending'];
  const titleEl = document.getElementById('trending-chart-title');
  const subtitleEl = titleEl?.parentElement?.querySelector('.chart-card__subtitle');
  if (titleEl) titleEl.textContent = meta.title;
  if (subtitleEl) subtitleEl.textContent = meta.subtitle;

  switch (subtab) {
    case 'mape-trending':
      renderMapeTrending(canvasId, a, b);
      break;
    case 'bias-trending':
      renderBiasTrending(canvasId, a, b);
      break;
    case 'mape-version':
      renderMapeByVersion(canvasId, a, b);
      break;
    case 'error-dist':
      renderErrorDistribution(canvasId, a, b);
      break;
  }
  updateTrendingLegend(a, b);
}

/* --- Detail Tab Render --- */
function renderDetailTab() {
  const { a, b } = getSelectedScenarios();
  renderDetailTable(a, b);
}

function renderDetailTable(scenarioA, scenarioB) {
  const tbody = document.getElementById('detail-table-body');
  const thead = document.getElementById('detail-table-head');
  if (!tbody || !thead) return;

  // Update header with scenario names
  thead.innerHTML = `
    <tr>
      <th class="sortable" scope="col">Location</th>
      <th class="sortable" scope="col">Item</th>
      <th class="sortable cell--scenario-a" scope="col" data-type="number">${escapeHtml(scenarioA)} MAPE</th>
      <th class="sortable cell--scenario-b" scope="col" data-type="number">${escapeHtml(scenarioB)} MAPE</th>
      <th class="sortable" scope="col" data-type="number">MAPE Δ%</th>
      <th class="sortable cell--scenario-a" scope="col" data-type="number">${escapeHtml(scenarioA)} Bias</th>
      <th class="sortable cell--scenario-b" scope="col" data-type="number">${escapeHtml(scenarioB)} Bias</th>
      <th class="sortable" scope="col" data-type="number">Bias Δ</th>
      <th class="sortable" scope="col" data-type="number">Ext Under A</th>
      <th class="sortable" scope="col" data-type="number">Ext Under B</th>
      <th class="sortable" scope="col" data-type="number">Ext Over A</th>
      <th class="sortable" scope="col" data-type="number">Ext Over B</th>
    </tr>
  `;

  const rows = getDetailTableData();
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${escapeHtml(r.location)}</td>
      <td>${escapeHtml(r.item)}</td>
      <td class="cell--scenario-a">${r.mapeA}%</td>
      <td class="cell--scenario-b">${r.mapeB}%</td>
      <td class="${r.mapeDiff < 0 ? 'cell--positive' : r.mapeDiff > 0 ? 'cell--negative' : ''}">${r.mapeDiff > 0 ? '+' : ''}${r.mapeDiff}%</td>
      <td class="cell--scenario-a">${r.biasA}%</td>
      <td class="cell--scenario-b">${r.biasB}%</td>
      <td class="${r.biasDiff > 0 ? 'cell--positive' : r.biasDiff < 0 ? 'cell--negative' : ''}">${r.biasDiff > 0 ? '+' : ''}${r.biasDiff}%</td>
      <td>${r.errUnderA}%</td>
      <td>${r.errUnderB}%</td>
      <td>${r.errOverA}%</td>
      <td>${r.errOverB}%</td>
    </tr>
  `).join('');
}

/* --- Legend Updates --- */
function updateLegend(a, b) {
  document.querySelectorAll('.legend-a-name').forEach(el => el.textContent = a);
  document.querySelectorAll('.legend-b-name').forEach(el => el.textContent = b);
}

function updateTrendingLegend(a, b) {
  const legendA = document.getElementById('trending-legend-a');
  const legendB = document.getElementById('trending-legend-b');
  if (legendA) legendA.textContent = a;
  if (legendB) legendB.textContent = b;
}

/* --- Chart Rendering --- */
function renderAllCharts(a, b) {
  const activeTab = document.querySelector('.tab-nav__item--active')?.dataset.tab;
  if (activeTab === 'overview') renderOverviewTab();
  if (activeTab === 'trending') {
    const activeSubTab = document.querySelector('.sub-tab--active')?.dataset.subtab || 'mape-trending';
    renderTrendingTab(activeSubTab);
  }
  if (activeTab === 'detail') renderDetailTab();
}

/* --- Utility --- */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* --- Table Sort --- */
let sortState = { column: null, direction: 'asc' };

function initTableSort() {
  // Attach click handlers to sortable headers after table renders
  document.addEventListener('click', (e) => {
    const th = e.target.closest('.data-table th.sortable');
    if (!th) return;
    const colIndex = Array.from(th.parentElement.children).indexOf(th);
    const isNumeric = th.dataset.type === 'number';

    if (sortState.column === colIndex) {
      sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sortState.column = colIndex;
      sortState.direction = 'asc';
    }

    // Update header classes
    th.parentElement.querySelectorAll('th').forEach(h => {
      h.classList.remove('sort-asc', 'sort-desc');
    });
    th.classList.add(sortState.direction === 'asc' ? 'sort-asc' : 'sort-desc');

    // Sort rows
    const tbody = document.getElementById('detail-table-body');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
      let aVal = a.children[colIndex]?.textContent.replace('%', '').trim();
      let bVal = b.children[colIndex]?.textContent.replace('%', '').trim();
      if (isNumeric) {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      }
      if (aVal < bVal) return sortState.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
    rows.forEach(row => tbody.appendChild(row));
  });
}
