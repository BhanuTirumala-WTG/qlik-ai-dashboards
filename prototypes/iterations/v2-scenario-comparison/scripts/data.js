/* ============================================================
   Mock Data for Scenario Comparison Dashboard v2
   ============================================================ */

const SCENARIOS = {
  available: [
    'DS Base',
    'DS Base + (MS)',
    'Statistical Forecast',
    'ML Enhanced',
    'Consensus Plan'
  ],
  defaultA: 'DS Base',
  defaultB: 'DS Base + (MS)'
};

const FILTERS = {
  lags: Array.from({ length: 13 }, (_, i) => i),
  versions: ['v2024.01', 'v2024.02', 'v2024.03', 'v2024.04', 'v2024.05', 'v2024.06'],
  locations: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'],
  items: ['Product Family A', 'Product Family B', 'Product Family C', 'Product Family D', 'Product Family E'],
  ldsGroups: ['LDS Group 1', 'LDS Group 2', 'LDS Group 3', 'LDS Group 4']
};

/* --- Seeded random for consistent data --- */
let _seed = 42;
function seededRandom() {
  _seed = (_seed * 16807 + 0) % 2147483647;
  return (_seed - 1) / 2147483646;
}
function resetSeed() { _seed = 42; }

/* --- KPI Summary --- */
function getKpiData(scenarioA, scenarioB) {
  // Vary KPIs slightly based on scenario names
  const hashA = scenarioA.length * 3;
  const hashB = scenarioB.length * 3;
  const mapeA = 18 + (hashA % 8);
  const mapeB = 16 + (hashB % 7);
  const biasA = -(2 + (hashA % 4));
  const biasB = -(2 + (hashB % 4));

  return {
    mape: {
      a: { label: 'MAPE', value: mapeA },
      b: { label: 'MAPE', value: mapeB },
      diff: { label: 'MAPE Δ', value: Math.round(((mapeB - mapeA) / mapeA) * 100) }
    },
    bias: {
      a: { label: 'Bias', value: biasA },
      b: { label: 'Bias', value: biasB },
      diff: { label: 'Bias Δ', value: biasB - biasA }
    },
    extErrUnder: {
      a: { label: 'Ext Err Under', value: 1 + (hashA % 2) },
      b: { label: 'Ext Err Under', value: 1 + (hashB % 2) }
    },
    extErrOver: {
      a: { label: 'Ext Err Over', value: hashA % 2 },
      b: { label: 'Ext Err Over', value: hashB % 2 }
    }
  };
}

/* --- MAPE by Lag (per scenario) --- */
function getMapeByLagData(scenario) {
  const hash = scenario.length * 7;
  const base = [14, 13, 15, 18, 20, 21, 20, 21, 22, 20, 22, 22, 24];
  const offset = (hash % 5) - 2;
  return {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    values: base.map(v => Math.max(5, v + offset))
  };
}

/* --- Bias by Lag (per scenario) --- */
function getBiasByLagData(scenario) {
  const hash = scenario.length * 5;
  const base = [-1.0, -1.2, -1.5, -2.0, -2.5, -3.0, -3.5, -3.8, -4.0, -4.5, -5.0, -5.5, -6.0];
  const offset = ((hash % 4) - 2) * 0.3;
  return {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    values: base.map(v => +(v + offset).toFixed(1))
  };
}

/* --- MAPE Trending (both scenarios overlaid) --- */
function getMapeTrendingData(scenarioA, scenarioB) {
  const hashA = scenarioA.length * 3;
  const hashB = scenarioB.length * 3;
  const baseA = [20, 22, 25, 28, 24, 22, 21, 20, 22, 21, 19, 18];
  const baseB = [18, 20, 23, 26, 22, 20, 19, 18, 20, 19, 17, 16];
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    scenarioA: baseA.map(v => v + (hashA % 3) - 1),
    scenarioB: baseB.map(v => v + (hashB % 3) - 1)
  };
}

/* --- Bias Trending --- */
function getBiasTrendingData(scenarioA, scenarioB) {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    scenarioA: [-2.0, -2.5, -3.0, -4.5, -3.5, -3.0, -2.8, -2.5, -3.5, -3.0, -2.5, -2.0],
    scenarioB: [-1.5, -2.0, -2.5, -3.8, -3.0, -2.5, -2.2, -2.0, -3.0, -2.5, -2.0, -1.5]
  };
}

/* --- Error Distribution --- */
function getErrorDistributionData() {
  return {
    labels: ['-20%', '-15%', '-10%', '-5%', '0%', '5%', '10%', '15%', '20%'],
    scenarioA: [2, 5, 12, 25, 30, 18, 10, 4, 2],
    scenarioB: [1, 4, 10, 22, 35, 20, 8, 3, 1]
  };
}

/* --- Scatter Plot Data --- */
function getScatterData() {
  resetSeed();
  const points = [];
  const categories = ['DSU', 'Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  for (let i = 0; i < 80; i++) {
    const base = 5 + seededRandom() * 40;
    points.push({
      x: +(base + (seededRandom() - 0.5) * 10).toFixed(1),
      y: +(base + (seededRandom() - 0.5) * 12).toFixed(1),
      category: categories[Math.floor(seededRandom() * categories.length)]
    });
  }
  return points;
}

/* --- Detail Table --- */
function getDetailTableData() {
  resetSeed();
  const rows = [];
  FILTERS.locations.forEach(loc => {
    FILTERS.items.forEach(item => {
      const mapeA = +(10 + seededRandom() * 25).toFixed(1);
      const mapeB = +(mapeA - 1 - seededRandom() * 4).toFixed(1);
      const biasA = +(-1 - seededRandom() * 6).toFixed(1);
      const biasB = +(biasA + seededRandom() * 2).toFixed(1);
      const errUnderA = +(seededRandom() * 3).toFixed(1);
      const errUnderB = +(seededRandom() * 3).toFixed(1);
      const errOverA = +(seededRandom() * 2).toFixed(1);
      const errOverB = +(seededRandom() * 2).toFixed(1);
      rows.push({
        location: loc,
        item: item,
        mapeA, mapeB,
        mapeDiff: +(((mapeB - mapeA) / mapeA) * 100).toFixed(1),
        biasA, biasB,
        biasDiff: +(biasB - biasA).toFixed(1),
        errUnderA, errUnderB,
        errOverA, errOverB
      });
    });
  });
  return rows;
}
