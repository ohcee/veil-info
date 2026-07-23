import { useState, useEffect, useCallback } from "react";
import DataContext from "./DataContext";
import {
  EXPLORER_API,
  NONKYC_USDT,
  NONKYC_BTC,
  NONKYC_XMR,
  NONKYC_USDC,
} from "./config";

const POLL_MS = 60000;

// Fetch JSON, but only when the response is OK. Returns null on any failure so
// one dead endpoint (e.g. a NonKYC pair whose worker route isn't live yet)
// never blanks out the whole dashboard.
async function fetchOk(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Every panel used to poll on its own — GetBlockchainInfo was requested four
// times over, and the NonKYC pairs overlapped between Market and the headers.
// DataProvider polls each upstream exactly once per interval and shares the
// result, so the panels can never disagree and the worker sees far less traffic.
const DataProvider = ({ children }) => {
  const [chain, setChain] = useState(null);
  const [chainError, setChainError] = useState(null);
  const [algoStats, setAlgoStats] = useState(null);
  const [algoError, setAlgoError] = useState(null);
  const [market, setMarket] = useState({
    usdt: null,
    btc: null,
    xmr: null,
    usdc: null,
  });

  const poll = useCallback(async () => {
    // Blockchain info — powers Current Block, Best Block Hash, Difficulty,
    // Chain Size and the Superblock countdown from a single request.
    fetchOk(`${EXPLORER_API}/api/GetBlockchainInfo`)
      .then((data) => { setChain(data); setChainError(null); })
      .catch((err) => setChainError(err));

    // 24h block split.
    fetchOk(`${EXPLORER_API}/api/GetChainalgoStats`)
      .then((data) => { setAlgoStats(data); setAlgoError(null); })
      .catch((err) => setAlgoError(err));

    // Market pairs — each settled independently so a missing pair (USDC until
    // its worker route ships) simply stays null rather than failing the batch.
    const pairs = await Promise.allSettled([
      fetchOk(NONKYC_USDT),
      fetchOk(NONKYC_BTC),
      fetchOk(NONKYC_XMR),
      fetchOk(NONKYC_USDC),
    ]);
    const [usdt, btc, xmr, usdc] = pairs.map((p) =>
      p.status === "fulfilled" ? p.value : null
    );
    setMarket((prev) => ({
      usdt: usdt ?? prev.usdt,
      btc: btc ?? prev.btc,
      xmr: xmr ?? prev.xmr,
      usdc: usdc ?? prev.usdc,
    }));
  }, []);

  useEffect(() => {
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, [poll]);

  return (
    <DataContext.Provider value={{ chain, chainError, algoStats, algoError, market }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
