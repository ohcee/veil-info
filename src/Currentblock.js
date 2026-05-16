import { useState, useEffect, useRef } from "react";
import { EXPLORER_API } from "./config";

const Currentblock = () => {
  const [data, setData] = useState(null);
  const [flash, setFlash] = useState(false);
  const prev = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${EXPLORER_API}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const result = await response.json();
        if (prev.current !== null && prev.current !== result.blocks) {
          setFlash(true);
          setTimeout(() => setFlash(false), 1200);
        }
        prev.current = result.blocks;
        setData(result);
      } catch (err) { console.error(err); }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={flash ? "flash-blue" : ""} style={{
      display:'flex',
      flexDirection:'column',
      height:'100%',
      justifyContent:'space-between',
      textAlign:'center',
    }}>
      <h3>Current Block</h3>

      {/* BIG BLOCK NUMBER */}
      <div style={{
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:'3rem',
        fontWeight:'800',
        color: flash ? '#38bdf8' : '#f0f6fc',
        transition:'color 0.5s',
        letterSpacing:'-0.02em',
        lineHeight:1,
        margin:'16px 0',
      }}>
        {data?.blocks?.toLocaleString() ?? "—"}
      </div>

      {/* STAT PILLS */}
      <div style={{
        display:'flex',
        justifyContent:'space-around',
        gap:'8px',
        flexWrap:'wrap',
        marginTop:'auto',
      }}>
        {[
          {label:'Block Time', value:'60 sec',   color:'#00ff88'},
          {label:'Consensus',  value:'PoS + PoW',color:'#c084fc'},
          {label:'Split',      value:'50 / 50',  color:'#38bdf8'},
        ].map(({label, value, color}) => (
          <div key={label} style={{
            flex:'1',
            minWidth:'70px',
            background:'rgba(0,0,0,0.3)',
            borderRadius:'8px',
            border:`1px solid ${color}33`,
            padding:'12px 8px',
          }}>
            <div style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:'0.62rem',
              color:'#8b949e',
              letterSpacing:'0.12em',
              textTransform:'uppercase',
              marginBottom:'6px',
            }}>{label}</div>
            <div style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:'1rem',
              color,
              fontWeight:'700',
            }}>{value}</div>
          </div>
        ))}
      </div>

      <h6 style={{marginTop:'14px'}}>
        <a href="https://veil-project.com/faqs/" target="_blank" rel="noopener noreferrer">FAQ</a>
      </h6>
    </div>
  );
};

export default Currentblock;
