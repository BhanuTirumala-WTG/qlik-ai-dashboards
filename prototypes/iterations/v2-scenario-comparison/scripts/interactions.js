/* ============================================================
   Interactions & Dashboard Logic
   Scenario Comparison Dashboard v2 — Side-by-Side Battle Card
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  populateFilters();
  initTableSort();
  renderAll();
}

/* --- Filter Population --- */
function populateFilters() {
  const scenarioASelect = document.getElementById('scenario-a');
  const scenarioBSelect = document.getElementById('scenario-b');

  SCENARIOS.available.forEach(s => {
    scenarioASelect.add(new Option(s, s, s === SCENARIOS.defaultA, s === SCENARIOS.defaultA));
    scenarioBSelect.add(new Option(s, s, s === SCENARIOS.defaultB, s === SCENARIOS.defaultB));
  });

  populateSelect('filter-lag', ['All Lags', ...FILTERS.lags.map(l => `Lag ${l}`)]);
  populateSelect('filter-version', ['All Versions', ...FILTERS.versions]);
  populateSelect('filter-location', ['All Locations', ...FILTERS.locations]);
  populateSelect('filter-item', ['All Items', ...FILTERS.items]);
  populateSelect('filter-lds-group', ['All LDS Groups', ...FILTERS.ldsGroups]);

  scenarioASelect.addEventListener('change', handleChange);
  scenarioBSelect.addEventListener('change', handleChange);
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
}

function populateSelect(id, options) {
  const select = document.getElementById(id);
  options.forEach(o => select.add(new Option(o, o)));
}

function getScenarios() {
  return {
    a: document.getElementById('scenario-a').value,
    b: document.getElementById('scenario-b').value
  };
}

function handleChange() {
  const { a, b } = getScenarios();
  const warning = document.getElementById('same-scenario-warning');
  if (warning) warning.hidden = a !== b;
  renderAll();
}

function clearFilters() {
  document.getElementById('scenario-a').value = SCENARIOS.defaultA;
  document.getElementById('scenario-b').value = SCENARIOS.defaultB;
  document.getElementById('filter-lag').selectedIndex = 0;
  document.getElementById('filter-version').selectedIndex = 0;
  document.getElementById('filter-location').selectedIndex = 0;
  document.getElementById('filter-item').selectedIndex = 0;
  document.getElementById('filter-lds-group').selectedIndex = 0;
  handleChange();
}

/* --- Full Render --- */
function renderAll() {
  const { a, b } = getScenarios();
  renderPanelHeaders(a, b);
  renderKpis(a, b);
  renderDeltaBadges(a, b);
  renderWinnerRow(a, b);
  renderPanelCharts(a, b);
  renderSharedCharts(a, b);
  renderInsights(a, b);
  renderDetailTable(a, b);
  updateSharedLegends(a, b);
}

/* --- Panel Headers --- */
function renderPanelHeaders(a, b) {
  const nameA = document.getElementById('panel-a-name');
  const nameB = document.getElementById('panel-b-name');
  const badgeA = document.getElementById('panel-a-badge');
  const badgeB = document.getElementById('panel-b-badge');
  if (nameA) nameA.textContent = a;
  if (nameB) nameB.textContent = b;
  if (badgeA) badgeA.textContent = 'Scenario A';
  if (badgeB) badgeB.textContent = 'Scenario B';
}

/* --- KPIs --- */
function renderKpis(a, b) {
  const kpi = getKpiData(a, b);

  setKpi('kpi-a-mape', 'MAPE', kpi.mape.a.value, '%');
  setKpi('kpi-a-bias', 'Bias', kpi.bias.a.value, '%');
  setKpi('kpi-a-ext-under', 'Ext Err Under', kpi.extErrUnder.a.value, '%');
  setKpi('kpi-a-ext-over', 'Ext Err Over', kpi.extErrOver.a.value, '%');

  setKpi('kpi-b-mape', 'MAPE', kpi.mape.b.value, '%');
  setKpi('kpi-b-bias', 'Bias', kpi.bias.b.value, '%');
  setKpi('kpi-b-ext-under', 'Ext Err Under', kpi.extErrUnder.b.value, '%');
  setKpi('kpi-b-ext-over', 'Ext Err Over', kpi.extErrOver.b.value, '%');

  // Conditional KPI styling
  applyKpiConditional('kpi-a-mape', 'kpi-b-mape', kpi.mape.a.value, kpi.mape.b.value, 'lower');
  applyKpiConditional('kpi-a-bias', 'kpi-b-bias', Math.abs(kpi.bias.a.value), Math.abs(kpi.bias.b.value), 'lower');
  applyKpiConditional('kpi-a-ext-under', 'kpi-b-ext-under', kpi.extErrUnder.a.value, kpi.extErrUnder.b.value, 'lower');
  applyKpiConditional('kpi-a-ext-over', 'kpi-b-ext-over', kpi.extErrOver.a.value, kpi.extErrOver.b.value, 'lower');
}

function applyKpiConditional(idA, idB, valA, valB, mode) {
  const elA = document.getElementById(idA);
  const elB = document.getElementById(idB);
  if (!elA || !elB) return;
  elA.classList.remove('kpi-card--winning', 'kpi-card--losing');
  elB.classList.remove('kpi-card--winning', 'kpi-card--losing');

  if (mode === 'lower') {
    if (valA < valB) {
      elA.classList.add('kpi-card--winning');
      elB.classList.add('kpi-card--losing');
      elA.setAttribute('aria-label', elA.querySelector('.kpi-card__label').textContent + ': ' + elA.querySelector('.kpi-card__value').textContent + ' (Better)');
      elB.setAttribute('aria-label', elB.querySelector('.kpi-card__label').textContent + ': ' + elB.querySelector('.kpi-card__value').textContent + ' (Worse)');
    } else if (valB < valA) {
      elB.classList.add('kpi-card--winning');
      elA.classList.add('kpi-card--losing');
      elB.setAttribute('aria-label', elB.querySelector('.kpi-card__label').textContent + ': ' + elB.querySelector('.kpi-card__value').textContent + ' (Better)');
      elA.setAttribute('aria-label', elA.querySelector('.kpi-card__label').textContent + ': ' + elA.querySelector('.kpi-card__value').textContent + ' (Worse)');
    } else {
      elA.setAttribute('aria-label', elA.querySelector('.kpi-card__label').textContent + ': ' + elA.querySelector('.kpi-card__value').textContent + ' (Tied)');
      elB.setAttribute('aria-label', elB.querySelector('.kpi-card__label').textContent + ': ' + elB.querySelector('.kpi-card__value').textContent + ' (Tied)');
    }
  }
}

function setKpi(id, label, value, suffix) {
  const el = document.getElementById(id);
  if (!el) return;
  const labelEl = el.querySelector('.kpi-card__label');
  const valueEl = el.querySelector('.kpi-card__value');
  if (labelEl) labelEl.textContent = label;
  if (valueEl) valueEl.textContent = value + suffix;
}

/* --- Delta Badges --- */
function renderDeltaBadges(a, b) {
  const kpi = getKpiData(a, b);

  setDelta('delta-mape', 'MAPE Δ', kpi.mape.diff.value, '%', 'lower', a, b, kpi.mape.a.value, kpi.mape.b.value);
  setDelta('delta-bias', 'Bias Δ', kpi.bias.diff.value, '%', 'closer-to-zero', a, b, kpi.bias.a.value, kpi.bias.b.value);

  const extUnderDiff = kpi.extErrUnder.b.value - kpi.extErrUnder.a.value;
  setDelta('delta-ext-under', 'Under Δ', extUnderDiff, '%', 'lower', a, b, kpi.extErrUnder.a.value, kpi.extErrUnder.b.value);

  const extOverDiff = kpi.extErrOver.b.value - kpi.extErrOver.a.value;
  setDelta('delta-ext-over', 'Over Δ', extOverDiff, '%', 'lower', a, b, kpi.extErrOver.a.value, kpi.extErrOver.b.value);
}

function setDelta(id, label, value, suffix, mode, nameA, nameB, valA, valB) {
  const el = document.getElementById(id);
  if (!el) return;

  const labelEl = el.querySelector('.delta-badge__label');
  const valueEl = el.querySelector('.delta-badge__value');
  const winnerEl = el.querySelector('.delta-badge__winner');

  if (labelEl) labelEl.textContent = label;

  const display = (value > 0 ? '+' : '') + value + suffix;
  if (valueEl) {
    valueEl.textContent = display;
    valueEl.className = 'delta-badge__value';
    if (mode === 'lower') {
      if (value < 0) valueEl.classList.add('delta-badge__value--positive');
      else if (value > 0) valueEl.classList.add('delta-badge__value--negative');
      else valueEl.classList.add('delta-badge__value--neutral');
    } else if (mode === 'closer-to-zero') {
      const absA = Math.abs(valA);
      const absB = Math.abs(valB);
      if (absB < absA) valueEl.classList.add('delta-badge__value--positive');
      else if (absB > absA) valueEl.classList.add('delta-badge__value--negative');
      else valueEl.classList.add('delta-badge__value--neutral');
    }
  }

  if (winnerEl) {
    winnerEl.className = 'delta-badge__winner';
    if (mode === 'lower') {
      if (valB < valA) { winnerEl.textContent = 'B wins'; winnerEl.classList.add('delta-badge__winner--b'); }
      else if (valA < valB) { winnerEl.textContent = 'A wins'; winnerEl.classList.add('delta-badge__winner--a'); }
      else { winnerEl.textContent = 'Tie'; winnerEl.classList.add('delta-badge__winner--tie'); }
    } else if (mode === 'closer-to-zero') {
      const absA = Math.abs(valA);
      const absB = Math.abs(valB);
      if (absB < absA) { winnerEl.textContent = 'B wins'; winnerEl.classList.add('delta-badge__winner--b'); }
      else if (absA < absB) { winnerEl.textContent = 'A wins'; winnerEl.classList.add('delta-badge__winner--a'); }
      else { winnerEl.textContent = 'Tie'; winnerEl.classList.add('delta-badge__winner--tie'); }
    }
  }
}

/* --- Winner Row --- */
function renderWinnerRow(a, b) {
  const kpi = getKpiData(a, b);
  let aWins = 0, bWins = 0;

  // MAPE: lower is better
  if (kpi.mape.a.value < kpi.mape.b.value) aWins++;
  else if (kpi.mape.b.value < kpi.mape.a.value) bWins++;

  // Bias: closer to zero is better
  if (Math.abs(kpi.bias.a.value) < Math.abs(kpi.bias.b.value)) aWins++;
  else if (Math.abs(kpi.bias.b.value) < Math.abs(kpi.bias.a.value)) bWins++;

  // Ext Err Under: lower is better
  if (kpi.extErrUnder.a.value < kpi.extErrUnder.b.value) aWins++;
  else if (kpi.extErrUnder.b.value < kpi.extErrUnder.a.value) bWins++;

  // Ext Err Over: lower is better
  if (kpi.extErrOver.a.value < kpi.extErrOver.b.value) aWins++;
  else if (kpi.extErrOver.b.value < kpi.extErrOver.a.value) bWins++;

  const icon = document.getElementById('winner-icon');
  const text = document.getElementById('winner-text');
  const detail = document.getElementById('winner-detail');

  if (text) {
    text.className = 'winner-row__text';
    if (bWins > aWins) {
      if (icon) icon.textContent = '🏆';
      text.textContent = `${b} leads overall`;
      text.classList.add('winner-row__text--b');
    } else if (aWins > bWins) {
      if (icon) icon.textContent = '🏆';
      text.textContent = `${a} leads overall`;
      text.classList.add('winner-row__text--a');
    } else {
      if (icon) icon.textContent = '🤝';
      text.textContent = 'Scenarios are tied';
      text.classList.add('winner-row__text--tie');
    }
  }

  if (detail) {
    detail.textContent = `Wins: ${a} ${aWins} — ${b} ${bWins} (across 4 KPI metrics)`;
  }
}

/* --- Panel Charts --- */
function renderPanelCharts(a, b) {
  renderSingleMapeByLag('chart-mape-lag-a', a, CHART_COLORS.scenarioA);
  renderSingleMapeByLag('chart-mape-lag-b', b, CHART_COLORS.scenarioB);
  renderSingleBiasByLag('chart-bias-lag-a', a, CHART_COLORS.scenarioA);
  renderSingleBiasByLag('chart-bias-lag-b', b, CHART_COLORS.scenarioB);
}

/* --- Shared Charts --- */
function renderSharedCharts(a, b) {
  renderMapeTrending('chart-mape-trending', a, b);
  renderErrorDistribution('chart-error-dist', a, b);
  renderScatter('chart-scatter', a, b);
}

/* --- Insights --- */
function renderInsights(a, b) {
  const kpi = getKpiData(a, b);
  const list = document.getElementById('insights-list');
  if (!list) return;

  const insights = [];

  // MAPE comparison
  if (kpi.mape.b.value < kpi.mape.a.value) {
    const pct = Math.abs(kpi.mape.diff.value);
    insights.push({ type: 'positive', text: `<strong>MAPE:</strong> ${b} shows <strong>${pct}% lower MAPE</strong> — better forecast accuracy.` });
  } else if (kpi.mape.a.value < kpi.mape.b.value) {
    insights.push({ type: 'negative', text: `<strong>MAPE:</strong> ${a} has lower MAPE — ${b} underperforms on accuracy.` });
  } else {
    insights.push({ type: 'neutral', text: `<strong>MAPE:</strong> Both scenarios show identical MAPE at <strong>${kpi.mape.a.value}%</strong>.` });
  }

  // Bias comparison
  const absA = Math.abs(kpi.bias.a.value);
  const absB = Math.abs(kpi.bias.b.value);
  if (absA === absB) {
    insights.push({ type: 'neutral', text: `<strong>Bias:</strong> Both scenarios show identical bias at <strong>${kpi.bias.a.value}%</strong>.` });
  } else if (absB < absA) {
    insights.push({ type: 'positive', text: `<strong>Bias:</strong> ${b} is closer to zero — less systematic forecast error.` });
  } else {
    insights.push({ type: 'warning', text: `<strong>Bias:</strong> ${a} is closer to zero — ${b} has more systematic error.` });
  }

  // Lag insights
  insights.push({ type: 'positive', text: `<strong>Short-term Lags (0-3):</strong> ${b} consistently outperforms ${a} by 2-3% MAPE.` });
  insights.push({ type: 'warning', text: `<strong>Long-term Lags (9-12):</strong> Performance gap narrows — both converge at higher error rates.` });
  insights.push({ type: 'neutral', text: `<strong>External Error:</strong> Minimal difference — both scenarios at similar under/over error levels.` });

  list.innerHTML = insights.map(i =>
    `<li class="insights-list__item insights-list__item--${i.type}">${i.text}</li>`
  ).join('');
}

/* --- Detail Table --- */
function renderDetailTable(a, b) {
  const thead = document.getElementById('detail-thead');
  const tbody = document.getElementById('detail-tbody');
  if (!thead || !tbody) return;

  thead.innerHTML = `
    <tr>
      <th class="sortable" scope="col" aria-sort="none">Location</th>
      <th class="sortable" scope="col" aria-sort="none">Item</th>
      <th class="sortable cell--scenario-a" scope="col" data-type="number" aria-sort="none">${escapeHtml(a)} MAPE</th>
      <th class="sortable cell--scenario-b" scope="col" data-type="number" aria-sort="none">${escapeHtml(b)} MAPE</th>
      <th class="sortable" scope="col" data-type="number" aria-sort="none">MAPE Δ%</th>
      <th class="sortable cell--scenario-a" scope="col" data-type="number" aria-sort="none">${escapeHtml(a)} Bias</th>
      <th class="sortable cell--scenario-b" scope="col" data-type="number" aria-sort="none">${escapeHtml(b)} Bias</th>
      <th class="sortable" scope="col" data-type="number" aria-sort="none">Bias Δ</th>
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
    </tr>
  `).join('');
}

/* --- Table Sort --- */
let sortState = { column: null, direction: 'asc' };

function initTableSort() {
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

    th.parentElement.querySelectorAll('th').forEach(h => {
      h.classList.remove('sort-asc', 'sort-desc');
      h.setAttribute('aria-sort', 'none');
    });
    th.classList.add(sortState.direction === 'asc' ? 'sort-asc' : 'sort-desc');
    th.setAttribute('aria-sort', sortState.direction === 'asc' ? 'ascending' : 'descending');

    const tbody = document.getElementById('detail-tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
      let aVal = a.children[colIndex]?.textContent.replace('%', '').trim();
      let bVal = b.children[colIndex]?.textContent.replace('%', '').trim();
      if (isNumeric) { aVal = parseFloat(aVal) || 0; bVal = parseFloat(bVal) || 0; }
      if (aVal < bVal) return sortState.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
    rows.forEach(row => tbody.appendChild(row));
  });
}

/* --- Utility --- */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* --- Shared Legend Updates --- */
function updateSharedLegends(a, b) {
  const ids = [
    ['legend-trending-a', 'legend-trending-b'],
    ['legend-dist-a', 'legend-dist-b']
  ];
  ids.forEach(([idA, idB]) => {
    const elA = document.getElementById(idA);
    const elB = document.getElementById(idB);
    if (elA) elA.textContent = a;
    if (elB) elB.textContent = b;
  });

  const scatterTitle = document.getElementById('scatter-title');
  if (scatterTitle) scatterTitle.textContent = `${a} vs ${b} MAPE`;
}
