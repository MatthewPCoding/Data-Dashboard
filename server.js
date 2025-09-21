/**
 * Crypto Dashboard Backend
 * -------------------------
 * A simple Express server that proxies requests to the CoinGecko API.
 * This avoids CORS issues in the browser and provides a clean endpoint
 * for the frontend to fetch cryptocurrency market data.
 */

const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // npm install node-fetch
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

// Simple in-memory cache object
const cache = {};
const CACHE_WINDOW = 12 * 60 * 60 * 1000; // 12 hours

// Allow cross-origin requests from the frontend
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// API route: fetch 7-day market data (price & volume) for a given coin
app.get("/api/:coin", async (req, res)=> {
    const coin = req.params.coin;
    const now = Date.now();

     //Serve cached data if it's less than 1 minute old
  if (cache[coin] && now - cache[coin].timestamp < CACHE_WINDOW) {
    return res.json(cache[coin].data);
  }


    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
        );
        const data = await response.json();

          if (data.status?.error_code) {
      return res.status(429).json({
        error: "CoinGecko rate limit reached. Please try again later."
      });
    }

        // Store fresh data and timestamp
    cache[coin] = { data, timestamp: now };

        res.json(data);
    } catch (err) {
         console.error(err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// ----- Serve static front-end files -----
app.use(express.static(__dirname));

// Start the Express server
app.listen(PORT, () =>
console.log(`✅ Server running on http://localhost:${PORT}`)
);