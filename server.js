//server.js
const express = require("express");
const app = express();
const PORT = 3000;

//Allow frontend to request
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

//API route for any coin
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

app.listen(PORT, () =>
console.log(`✅ Server running on http://localhost:${PORT}`)
);