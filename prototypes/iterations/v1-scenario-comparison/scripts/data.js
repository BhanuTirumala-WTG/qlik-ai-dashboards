/* ============================================================
   Mock Data for Scenario Comparison Dashboard
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

// KPI summary data
function getKpiData(scenarioA, scenarioB) {
  return {
    mape: {
      a: { label: `${scenarioA} MAPE`, value: 22 },
      b: { label: `${scenarioB} MAPE`, value: 20 },
      diff: { label: 'MAPE Improvement', value: -8 }
    },
    bias: {
      a: { label: `${scenarioA} Bias`, value: -4 },
      b: { label: `${scenarioB} Bias`, value: -4 },
      diff: { label: 'Bias Difference', value: 0 }
    },
    extErrUnder: {
      a: { label: `${scenarioA} Ext Err Under`, value: 1 },
      b: { label: `${scenarioB} Ext Err Under`, value: 1 }
    },
    extErrOver: {
      a: { label: `${scenarioA} Ext Err Over`, value: 0 },
      b: { label: `${scenarioB} Ext Err Over`, value: 0 }
    }
  };
}

// MAPE by Lag data
function getMapeByLagData() {
  return {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    scenarioA: [14, 13, 15, 18, 20, 21, 20, 21, 22, 20, 22, 22, 24],
    scenarioB: [12, 11, 13, 16, 18, 19, 18, 19, 20, 19, 20, 20, 22]
  };
}

// Bias by Lag data
function getBiasByLagData() {
  return {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    scenarioA: [-1.0, -1.2, -1.5, -2.0, -2.5, -3.0, -3.5, -3.8, -4.0, -4.5, -5.0, -5.5, -6.0],
    scenarioB: [-0.8, -1.0, -1.2, -1.8, -2.2, -2.5, -3.0, -3.2, -3.5, -4.0, -4.5, -5.0, -5.5]
  };
}

// Scatter plot data (Scenario A MAPE vs Scenario B MAPE per item/location)
function getScatterData() {
  const points = [];
  const categories = ['DSU', 'Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  for (let i = 0; i < 80; i++) {
    const base = 5 + Math.random() * 40;
    points.push({
      x: base + (Math.random() - 0.5) * 10,
      y: base + (Math.random() - 0.5) * 12,
      category: categories[Math.floor(Math.random() * categories.length)]
    });
  }
  return points;
}

// MAPE Trending data (monthly)
function getMapeTrendingData() {
  return {
    labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
             'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'],
    scenarioA: [20, 22, 25, 28, 24, 22, 21, 20, 22, 21, 19, 18],
    scenarioB: [18, 20, 23, 26, 22, 20, 19, 18, 20, 19, 17, 16]
  };
}

// Bias Trending data
function getBiasTrendingData() {
  return {
    labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
             'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'],
    scenarioA: [-2.0, -2.5, -3.0, -4.5, -3.5, -3.0, -2.8, -2.5, -3.5, -3.0, -2.5, -2.0],
    scenarioB: [-1.5, -2.0, -2.5, -3.8, -3.0, -2.5, -2.2, -2.0, -3.0, -2.5, -2.0, -1.5]
  };
}

// MAPE by Version data
function getMapeByVersionData() {
  return {
    labels: ['v2024.01', 'v2024.02', 'v2024.03', 'v2024.04', 'v2024.05', 'v2024.06'],
    scenarioA: [25, 24, 22, 21, 20, 18],
    scenarioB: [23, 22, 20, 19, 18, 16]
  };
}

// Error Distribution data
function getErrorDistributionData() {
  return {
    labels: ['-20%', '-15%', '-10%', '-5%', '0%', '5%', '10%', '15%', '20%'],
    scenarioA: [2, 5, 12, 25, 30, 18, 10, 4, 2],
    scenarioB: [1, 4, 10, 22, 35, 20, 8, 3, 1]
  };
}

// Detail table data
function getDetailTableData() {
  const locations = FILTERS.locations;
  const items = FILTERS.items;
  const rows = [];
  locations.forEach(loc => {
    items.forEach(item => {
      const mapeA = +(10 + Math.random() * 25).toFixed(1);
      const mapeB = +(mapeA - 1 - Math.random() * 4).toFixed(1);
      const biasA = +(-1 - Math.random() * 6).toFixed(1);
      const biasB = +(biasA + Math.random() * 2).toFixed(1);
      const errUnderA = +(Math.random() * 3).toFixed(1);
      const errUnderB = +(Math.random() * 3).toFixed(1);
      const errOverA = +(Math.random() * 2).toFixed(1);
      const errOverB = +(Math.random() * 2).toFixed(1);
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
