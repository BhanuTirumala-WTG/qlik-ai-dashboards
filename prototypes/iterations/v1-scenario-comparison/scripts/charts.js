/* ============================================================
   Chart Configurations
   Scenario Comparison Dashboard v1
   ============================================================ */

const CHART_COLORS = {
  scenarioA: '#7B2D8E',
  scenarioALight: 'rgba(123, 45, 142, 0.15)',
  scenarioB: '#00B4D8',
  scenarioBLight: 'rgba(0, 180, 216, 0.15)',
};

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(26, 26, 46, 0.92)',
      cornerRadius: 8,
      padding: 12,
      titleFont: { family: "'Inter', sans-serif", size: 13, weight: '600' },
      bodyFont: { family: "'Inter', sans-serif", size: 12 },
      bodySpacing: 6,
      boxPadding: 4,
      usePointStyle: true
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
      ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: '#6B7280' },
      border: { display: false }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
      ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: '#6B7280' },
      border: { display: false }
    }
  }
};

// Store all chart instances for cleanup
const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

/* --- MAPE by Lag (Grouped Bar) --- */
function renderMapeByLag(canvasId, scenarioAName, scenarioBName) {
  destroyChart(canvasId);
  const data = getMapeByLagData();
  const ctx = document.getElementById(canvasId).getContext('2d');
  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioAName,
          data: data.scenarioA,
          backgroundColor: CHART_COLORS.scenarioA,
          borderRadius: 3,
          barPercentage: 0.8,
          categoryPercentage: 0.7
        },
        {
          label: scenarioBName,
          data: data.scenarioB,
          backgroundColor: CHART_COLORS.scenarioB,
          borderRadius: 3,
          barPercentage: 0.8,
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
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        ...CHART_DEFAULTS.scales,
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Lag', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          beginAtZero: true,
          title: { display: true, text: 'MAPE %', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* --- Bias by Lag (Grouped Bar) --- */
function renderBiasByLag(canvasId, scenarioAName, scenarioBName) {
  destroyChart(canvasId);
  const data = getBiasByLagData();
  const ctx = document.getElementById(canvasId).getContext('2d');
  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioAName,
          data: data.scenarioA,
          backgroundColor: CHART_COLORS.scenarioA,
          borderRadius: 3,
          barPercentage: 0.8,
          categoryPercentage: 0.7
        },
        {
          label: scenarioBName,
          data: data.scenarioB,
          backgroundColor: CHART_COLORS.scenarioB,
          borderRadius: 3,
          barPercentage: 0.8,
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
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        ...CHART_DEFAULTS.scales,
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Lag', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
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

/* --- Scatter Plot --- */
function renderScatter(canvasId, scenarioAName, scenarioBName) {
  destroyChart(canvasId);
  const points = getScatterData();
  const ctx = document.getElementById(canvasId).getContext('2d');

  // Calculate axis range for reference line
  const allVals = points.flatMap(p => [p.x, p.y]);
  const minVal = Math.floor(Math.min(...allVals));
  const maxVal = Math.ceil(Math.max(...allVals));

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Reference (y=x)',
          data: [{x: minVal, y: minVal}, {x: maxVal, y: maxVal}],
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
                `${scenarioAName} MAPE: ${p.x.toFixed(1)}%`,
                `${scenarioBName} MAPE: ${p.y.toFixed(1)}%`,
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
          title: { display: true, text: `${scenarioAName} MAPE`, font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.x.ticks, callback: v => v + '%' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          min: minVal,
          max: maxVal,
          title: { display: true, text: `${scenarioBName} MAPE`, font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* --- MAPE Trending (Line) --- */
function renderMapeTrending(canvasId, scenarioAName, scenarioBName) {
  destroyChart(canvasId);
  const data = getMapeTrendingData();
  const ctx = document.getElementById(canvasId).getContext('2d');
  chartInstances[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioAName,
          data: data.scenarioA,
          borderColor: CHART_COLORS.scenarioA,
          backgroundColor: CHART_COLORS.scenarioALight,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5
        },
        {
          label: scenarioBName,
          data: data.scenarioB,
          borderColor: CHART_COLORS.scenarioB,
          backgroundColor: CHART_COLORS.scenarioBLight,
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
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      interaction: { mode: 'index', intersect: false },
      scales: {
        ...CHART_DEFAULTS.scales,
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Calendar Month', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
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

/* --- Bias Trending (Line) --- */
function renderBiasTrending(canvasId, scenarioAName, scenarioBName) {
  destroyChart(canvasId);
  const data = getBiasTrendingData();
  const ctx = document.getElementById(canvasId).getContext('2d');
  chartInstances[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioAName,
          data: data.scenarioA,
          borderColor: CHART_COLORS.scenarioA,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2.5
        },
        {
          label: scenarioBName,
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
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      interaction: { mode: 'index', intersect: false },
      scales: {
        ...CHART_DEFAULTS.scales,
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Calendar Month', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
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

/* --- MAPE by Version (Bar) --- */
function renderMapeByVersion(canvasId, scenarioAName, scenarioBName) {
  destroyChart(canvasId);
  const data = getMapeByVersionData();
  const ctx = document.getElementById(canvasId).getContext('2d');
  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioAName,
          data: data.scenarioA,
          backgroundColor: CHART_COLORS.scenarioA,
          borderRadius: 3,
          barPercentage: 0.7,
          categoryPercentage: 0.6
        },
        {
          label: scenarioBName,
          data: data.scenarioB,
          backgroundColor: CHART_COLORS.scenarioB,
          borderRadius: 3,
          barPercentage: 0.7,
          categoryPercentage: 0.6
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        ...CHART_DEFAULTS.scales,
        x: {
          ...CHART_DEFAULTS.scales.x,
          title: { display: true, text: 'Version', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' }
        },
        y: {
          ...CHART_DEFAULTS.scales.y,
          beginAtZero: true,
          title: { display: true, text: 'MAPE %', font: { size: 11, family: "'Inter', sans-serif" }, color: '#9CA3AF' },
          ticks: { ...CHART_DEFAULTS.scales.y.ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* --- Error Distribution (Bar/Histogram) --- */
function renderErrorDistribution(canvasId, scenarioAName, scenarioBName) {
  destroyChart(canvasId);
  const data = getErrorDistributionData();
  const ctx = document.getElementById(canvasId).getContext('2d');
  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: scenarioAName,
          data: data.scenarioA,
          backgroundColor: 'rgba(123, 45, 142, 0.6)',
          borderColor: CHART_COLORS.scenarioA,
          borderWidth: 1,
          borderRadius: 2,
          barPercentage: 1.0,
          categoryPercentage: 0.85
        },
        {
          label: scenarioBName,
          data: data.scenarioB,
          backgroundColor: 'rgba(0, 180, 216, 0.6)',
          borderColor: CHART_COLORS.scenarioB,
          borderWidth: 1,
          borderRadius: 2,
          barPercentage: 1.0,
          categoryPercentage: 0.85
        }
      ]
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        tooltip: {
          ...CHART_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} items`
          }
        }
      },
      scales: {
        ...CHART_DEFAULTS.scales,
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
