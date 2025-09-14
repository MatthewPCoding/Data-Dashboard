# Data-Dashboard

A full-stack JavaScript application that fetches cryptocurrency data from the [CoinGecko API](https://www.coingecko.com/en/api/documentation) and visualizes it with interactive charts.

## 🚀 Features
- **Dropdown Selection**: Choose between Bitcoin, Ethereum, and Dogecoin (easy to extend).
- **Interactive Charts**: Line chart for price data and bar chart for trading volume over the past 7 days.
- **Backend Proxy**: Node.js + Express backend handles API requests and CORS.
- **Responsive UI**: Clean and simple layout that works across devices.

## 🛠 Tech Stack
**Frontend**
- HTML5, CSS3
- JavaScript (ES6+)
- Chart.js for data visualization

**Backend**
- Node.js
- Express.js
- Native Fetch API

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/crypto-dashboard.git
cd crypto-dashboard
2. Install Dependencies
npm install

3. Start the Backend Server
node server.js
Server runs on:

http://localhost:3000
4. Open the Frontend
Simply open index.html in your browser.

🌐 API Source
Data is provided by the free CoinGecko API.
Note that CoinGecko enforces rate limits; heavy usage may require caching or throttling.