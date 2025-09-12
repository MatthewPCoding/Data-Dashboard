
let priceChart, volumeChart;

async function fetchData(coin = "bitcoin") {
    const res = await fetch(`http://localhost:3000/api/${coin}`);
    const data = await res.json();

    //If API returned valid structure
    if (!data.prices || !data.total_volumes) {
    console.error("API error:", data);
    alert("Failed to load data. Check backend or API.");
    return;
  }

    // Extracts the timestamps and prices
    const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString());
    const prices = data.prices.map(p => p[1]);
    const volumes = data.total_volumes.map(v => v[1]);

    renderCharts(labels, prices, volumes, coin);
}

function renderCharts(labels, prices, volumes, coin) {
    //Destroy old charts before making new ones
    if(priceChart) priceChart.destroy();
    if(volumeChart) priceChart.destroy();

    const priceCtx = document.getElementById("priceChart").getContext("2d");
    priceChart = new Chart(priceCtx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `${coin.toUpperCase()} Price (USD)`,
                data: prices,
                borderColor: "purple",
                fill: true
            }
        ]
        }
    });

    const volumeCtx = document.getElementById("volumeChart").getContext("2d");
  volumeChart = new Chart(volumeCtx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: `${coin.toUpperCase()} Volume`,
          data: volumes,
          backgroundColor: "orange"
        }
      ]
    }
  });
}

// Dropdown event listener
document.getElementById("coinSelect").addEventListener("change", (e) => {
    fetchData(e.target.value);
});

// Initial load
fetchData();