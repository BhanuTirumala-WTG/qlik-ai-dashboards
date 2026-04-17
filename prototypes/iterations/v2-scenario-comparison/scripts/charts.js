/* ============================================================
   Chart Configurations
   Scenario Comparison Dashboard v2 — Side-by-Side Battle Card
   ============================================================ */

const CHART_COLORS = {
  scenarioA: '#7B2D8E',
  scenarioALight: 'rgba(123, 45, 142, 0.15)',
  scenarioAMedium: 'rgba(123, 45, 142, 0.35)',
  scenarioB: '#00B4D8',
  scenarioBLight: 'rgba(0, 180, 216, 0.15)',
  scenarioBMedium: 'rgba(0, 180, 216, 0.35)',
};

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(26, 26, 46, 0.92)',
      cornerRadius: 8,
      padding: 10,
      titleFont: { family: "'Inter', sans-serif", size: 12, weight: '600' },
      bodyFont: { family: "'Inter', sans-serif", size: 11 },
      bodySpacing: 4,
      boxPadding: 3,
      usePointStyle: true
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
      ticks: { font: { family: "'Inter', sans-serif", size: 10 }, color: '#6B7280' },
      border: { display: false }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
      ticks: { font: { family: "'Inter', sans-serif", size: 10 }, color: '#6B7280' },
      border: { display: false }
    }
  }
};

const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

/* --- Single Scenario MAPE by Lag (Bar) --- */
function renderSingleMapeByLag(canvasId, scenario, color) {
  destroyChart(canvasId);
  const data = getMapeByLagData(scenario);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  chartInstances[canvasId] = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: scenario,
        data: data.values,
        backgroundColor: color,
        borderRadius: 3,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: { label: (ctx) => ` MAPE: ${ctx.parsed.y}%` }
        }
      },
      scales: {
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Lag', font: { size: 10, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          beginAtZero: true,
          max: 30,
          title: { display: true, text: 'MAPE %', font: { size: 10, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* --- Single Scenario Bias by Lag (Bar) --- */
function renderSingleBiasByLag(canvasId, scenario, color) {
  destroyChart(canvasId);
  const data = getBiasByLagData(scenario);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  chartInstances[canvasId] = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: scenario,
        data: data.values,
        backgroundColor: color,
        borderRadius: 3,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: { label: (ctx) => ` Bias: ${ctx.parsed.y}%` }
        }
      },
      scales: {
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Lag', font: { size: 10, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          min: -8,
          max: 0,
          title: { display: true, text: 'Bias %', font: { size: 10, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* --- Overlaid MAPE Trending (Line) --- */
function renderMapeTrending(canvasId, scenarioA, scenarioB) {
  destroyChart(canvasId);
  const data = getMapeTrendingData(scenarioA, scenarioB);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  chartInstances[canvasId] = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioA,
          data: data.scenarioA,
          borderColor: CHART_COLORS.scenarioA,
          backgroundColor: CHART_COLORS.scenarioALight,
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5
        },
        {
          label: scenarioB,
          data: data.scenarioB,
          borderColor: CHART_COLORS.scenarioB,
          backgroundColor: CHART_COLORS.scenarioBLight,
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          mode: 'index',
          intersect: false,
          callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` }
        }
      },
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Month', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          title: { display: true, text: 'MAPE %', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* --- Overlaid Bias Trending (Line) --- */
function renderBiasTrending(canvasId, scenarioA, scenarioB) {
  destroyChart(canvasId);
  const data = getBiasTrendingData(scenarioA, scenarioB);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  chartInstances[canvasId] = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioA,
          data: data.scenarioA,
          borderColor: CHART_COLORS.scenarioA,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5
        },
        {
          label: scenarioB,
          data: data.scenarioB,
          borderColor: CHART_COLORS.scenarioB,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          mode: 'index',
          intersect: false,
          callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` }
        }
      },
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Month', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          title: { display: true, text: 'Bias %', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* --- Error Distribution (overlaid bars) --- */
function renderErrorDistribution(canvasId, scenarioA, scenarioB) {
  destroyChart(canvasId);
  const data = getErrorDistributionData();
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  chartInstances[canvasId] = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioA,
          data: data.scenarioA,
          backgroundColor: CHART_COLORS.scenarioAMedium,
          borderColor: CHART_COLORS.scenarioA,
          borderWidth: 1,
          borderRadius: 2,
          barPercentage: 0.85,
          categoryPercentage: 0.7
        },
        {
          label: scenarioB,
          data: data.scenarioB,
          backgroundColor: CHART_COLORS.scenarioBMedium,
          borderColor: CHART_COLORS.scenarioB,
          borderWidth: 1,
          borderRadius: 2,
          barPercentage: 0.85,
          categoryPercentage: 0.7
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          mode: 'index',
          intersect: false,
          callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} items` }
        }
      },
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Error Bucket', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          beginAtZero: true,
          title: { display: true, text: 'Frequency', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        }
      }
    }
  });
}

/* --- Scatter Plot (A vs B MAPE) --- */
function renderScatter(canvasId, scenarioA, scenarioB) {
  destroyChart(canvasId);
  const points = getScatterData();
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const allVals = points.flatMap(p => [p.x, p.y]);
  const minVal = Math.floor(Math.min(...allVals));
  const maxVal = Math.ceil(Math.max(...allVals));

  chartInstances[canvasId] = new Chart(ctx.getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Reference (y=x)',
          data: [{ x: minVal, y: minVal }, { x: maxVal, y: maxVal }],
          type: 'line',
          borderColor: 'rgba(0,0,0,0.15)',
          borderWidth: 1.5,
          borderDash: [6, 4],
          pointRadius: 0,
          fill: false,
          order: 1
        },
        {
          label: 'Data Points',
          data: points,
          backgroundColor: (ctx) => {
            const val = ctx.raw;
            if (!val) return CHART_COLORS.scenarioA;
            return val.y < val.x ? CHART_COLORS.scenarioB : CHART_COLORS.scenarioA;
          },
          pointStyle: (ctx) => {
            const val = ctx.raw;
            if (!val) return 'circle';
            return val.y < val.x ? 'triangle' : 'circle';
          },
          pointRadius: 5,
          pointHoverRadius: 7,
          order: 0
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          filter: (tooltipItem) => tooltipItem.datasetIndex !== 0,
          callbacks: {
            label: (ctx) => {
              const p = ctx.raw;
              return [
                `${scenarioA} MAPE: ${p.x}%`,
                `${scenarioB} MAPE: ${p.y}%`,
                `Category: ${p.category}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          ...CHART_DEFAULTS.scales.x,
          min: minVal,
          max: maxVal,
          title: { display: true, text: `${scenarioA} MAPE`, font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.x.ticks, callback: v => v + '%' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          min: minVal,
          max: maxVal,
          title: { display: true, text: `${scenarioB} MAPE`, font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}
