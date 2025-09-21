/**
 * Crypto Dashboard Backend
 * -------------------------
 * A simple Express server that proxies requests to the CoinGecko API.
 * This avoids CORS issues in the browser and provides a clean endpoint
 * for the frontend to fetch cryptocurrency market data.
 */

const express = require("express");
const app = express();
const PORT = 3000;

// Allow cross-origin requests from the frontend
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// API route: fetch 7-day market data (price & volume) for a given coin
app.get("/api/:coin", async (req, res)=> {
    const coin = req.params.coin;
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// ----- Serve static front-end files -----
app.use(express.static(path.join(__dirname, "public")));

// Fallback for all non-API routes (serves index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the Express server
app.listen(PORT, () =>
console.log(`✅ Server running on http://localhost:${PORT}`)
);