import { useState, useEffect, useRef } from "react";
import { EXPLORER_API } from "./config";

const BestBlockHash = () => {
  const [hash, setHash] = useState(null);
  const [flash, setFlash] = useState(false);
  const prev = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${EXPLORER_API}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        if (prev.current !== null && prev.current !== data.bestblockhash) {
          setFlash(true);
          setTimeout(() => setFlash(false), 1000);
        }
        prev.current = data.bestblockhash;
        setHash(data.bestblockhash);
      } catch (err) { console.error(err); }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`BestBlockHash ${flash ? 'flash-blue' : ''}`}>
      <div className="bbh-label">BEST BLOCK HASH</div>
      <div className="bbh-value">{hash ?? "loading..."}</div>
      <div className="bbh-hint">Use this hash to verify your node is synced with the network</div>
    </div>
  );
};

export default BestBlockHash;
