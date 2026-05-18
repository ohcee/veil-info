import { useState, useEffect } from "react";
import { EXPLORER_API } from "./config";

const Chainsize = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${EXPLORER_API}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setBlockchainInfo({ size_on_disk: data.size_on_disk });
        setError(null);
      } catch (err) { setError(err); }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 36000000);
    return () => clearInterval(intervalId);
  }, []);

  const sizeInGB = blockchainInfo ? blockchainInfo.size_on_disk / (1024 * 1024 * 1024) : 0;
  if (error) return <div>Error loading chain size</div>;

  return (
    <div style={{textAlign:'center', display:'flex', flexDirection:'column', height:'100%'}}>
      <h3>Chain Size</h3>
      <div style={{
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:'1.5rem',
        fontWeight:'800',
        color:'#00ff88',
        margin:'8px 0',
      }}>
        {blockchainInfo ? `${sizeInGB.toFixed(2)} GB` : "—"}
      </div>
      <h4>of free storage needed</h4>
      <h4>to download the blockchain</h4>
      <h4 style={{marginTop:'12px'}}>and participate in</h4>
      <div style={{
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:'1rem',
        fontWeight:'700',
        color:'#c084fc',
        marginTop:'8px',
        letterSpacing:'0.1em',
      }}>STAKING</div>
      <h4>with the core wallet</h4>
      <h6 style={{marginTop:'auto', paddingTop:'16px'}}>
        <a href="https://veil.freshdesk.com/support/solutions/articles/43000468343-staking-faq" target="_blank" rel="noopener noreferrer">Staking FAQ</a>
      </h6>
    </div>
  );
};

export default Chainsize;
