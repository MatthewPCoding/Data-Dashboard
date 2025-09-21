
/**
 * Crypto Dashboard Frontend Logic
 * --------------------------------
 * Fetches market data from the backend, parses it, and renders
 * interactive price and volume charts using Chart.js.
 */

let priceChart, volumeChart; // Chart.js instances for later updates

/**
 * Fetch price and volume data for the selected coin and update charts.
 * @param {string} coin - Coin ID used by CoinGecko (e.g., "bitcoin").
 */
async function fetchData(coin = "bitcoin") {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
    const data = await res.json();

    // Ensure the API response contains the expected structure
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

/**
 * Render or update the price and volume charts with new data.
 * @param {string[]} labels - Date labels.
 * @param {number[]} prices - Daily price data.
 * @param {number[]} volumes - Daily volume data.
 * @param {string} coin - Coin name for chart titles.
 */
function renderCharts(labels, prices, volumes, coin) {
   // Destroy existing charts to prevent overlap
    if(priceChart) priceChart.destroy();
    if(volumeChart) volumeChart.destroy();  // FIX: ensure correct chart is destroyed

      // Line chart: coin price
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

      // Bar chart: trading volume
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

// Dropdown listener: fetch data when coin selection changes
document.getElementById("coinSelect").addEventListener("change", (e) => {
    fetchData(e.target.value);
});

// Initial load: default to Bitcoin
fetchData();