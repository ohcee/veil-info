# Veil-Info

A live dashboard for the Veil privacy blockchain displaying real-time block data, market prices, mining stats, and network information.

**Live at:** https://veil-info.org

---

## Features

- Live prices from NonKYC (VEIL/USDT, VEIL/BTC, VEIL/XMR)
- Real-time block data updating every 60 seconds
- Difficulty tracking with trend arrows (▲▼) for all algorithms
- 24-hour block split pie chart (PoS, ProgPow, RandomX, SHA256d)
- Superblock countdown with economics info
- Chain size, current block, block reward info
- Mining software and pool links
- Best block hash for node sync verification
- Dark and light mode

---

## Tech

No proxy server needed. All data fetched directly via a Cloudflare Worker that handles CORS.

- React
- Cloudflare Worker (CORS proxy)
- NonKYC API (market data)
- Veil Explorer API (chain data)

---

## Run Locally

```bash
git clone https://github.com/ohcee/veil-info.git
cd veil-info
git checkout Veil-Info
npm install
npm start
```

Opens at `http://localhost:3000`

---

## Deploy

Deployed via Cloudflare Pages. Any push to `Veil-Info` branch triggers an automatic redeploy.

Build command: `npm run build`
Output directory: `build`

---

## Contributing

PRs welcome.
