import { useState, useEffect } from "react";

const API_BASE = "https://explorer-api.veil-project.com";

const Currentblock = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setBlockchainInfo({ blocks: data.blocks });
        setError(null);
      } catch (err) {
        console.error("Currentblock fetch error:", err);
        setError(err);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Error loading block data: {error.message}</div>;

  return (
    <div>
      {blockchainInfo && (
        <h3>
          The current Block number is <p>{blockchainInfo.blocks}</p>
          VEIL has a <p>1 minute block time</p>
          and is a <p>50/50 PoS/PoW Hybrid</p>
        </h3>
      )}
      <h6>
        <a href="https://veil-project.com/faqs/" target="_blank" rel="noopener noreferrer">
          FAQ
        </a>
      </h6>
    </div>
  );
};

export default Currentblock;
