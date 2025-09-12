
async function fetchData() {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7")
    const data = await res.json();

    // Extracts the timestamps and prices
    const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
    const prices = data.prices.map(price => price[1]);

    renderChart(labels, prices);
}

function renderChart(labels, prices) {
    const ctx = document.getElementById("priceChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Bitcoin Price (USD)",
                data: prices,
                borderColor: "purple",
                fill: true
            }]
        }
    });
}

fetchData();