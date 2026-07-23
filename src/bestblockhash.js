import { useState, useEffect, useRef, useContext } from "react";
import DataContext from "./DataContext";

const BestBlockHash = () => {
  const { chain } = useContext(DataContext);
  const [flash, setFlash] = useState(false);
  const prev = useRef(null);

  useEffect(() => {
    const hash = chain?.bestblockhash;
    if (hash === undefined || hash === null) return;
    if (prev.current !== null && prev.current !== hash) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 1000);
      prev.current = hash;
      return () => clearTimeout(t);
    }
    prev.current = hash;
  }, [chain?.bestblockhash]);

  const data = chain ? { hash: chain.bestblockhash, blocks: chain.blocks } : null;

  return (
    <div className={`BestBlockHash ${flash ? 'flash-blue' : ''}`}>
      <div style={{textAlign:'center', marginBottom:'8px'}}>
        <div className="bbh-label">CURRENT BLOCK</div>
        <div className="bbh-block">{data ? data.blocks.toLocaleString() : "—"}</div>
      </div>
      <div style={{borderTop:'1px solid rgba(56,189,248,0.15)', margin:'8px 0'}} />
      <div style={{textAlign:'center'}}>
        <div className="bbh-label">BEST BLOCK HASH</div>
        <div className="bbh-value">{data ? data.hash : "loading..."}</div>
      </div>
    </div>
  );
};

export default BestBlockHash;
