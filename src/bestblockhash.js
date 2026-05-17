import { useState, useEffect, useRef } from "react";
import { EXPLORER_API } from "./config";

const BestBlockHash = () => {
  const [data, setData] = useState(null);
  const [flash, setFlash] = useState(false);
  const prev = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${EXPLORER_API}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const result = await response.json();
        if (prev.current !== null && prev.current !== result.bestblockhash) {
          setFlash(true);
          setTimeout(() => setFlash(false), 1000);
        }
        prev.current = result.bestblockhash;
        setData({ hash: result.bestblockhash, blocks: result.blocks });
      } catch (err) { console.error(err); }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`BestBlockHash ${flash ? 'flash-blue' : ''}`}>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'40px', flexWrap:'wrap'}}>
        <div style={{textAlign:'center'}}>
          <div className="bbh-label">CURRENT BLOCK</div>
          <div className="bbh-block">{data?.blocks?.toLocaleString() ?? "—"}</div>
        </div>
        <div style={{textAlign:'center', flex:1, minWidth:0}}>
          <div className="bbh-label">BEST BLOCK HASH</div>
          <div className="bbh-value">{data?.hash ?? "loading..."}</div>
          <div className="bbh-hint">Use this hash to verify your node is synced with the network</div>
        </div>
      </div>
    </div>
  );
};

export default BestBlockHash;
