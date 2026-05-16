import { useState, useEffect } from "react";

const API_BASE = "https://explorer-api.veil-project.com";

const BestBlockHash = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setBlockchainInfo({ bestblockhash: data.bestblockhash });
        setError(null);
      } catch (err) {
        console.error("BestBlockHash fetch error:", err);
        setError(err);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Error loading block hash</div>;

  return (
    <div className="BestBlockHash">
      {blockchainInfo && (
        <h3>
          Best Block Hash: <br />
          {blockchainInfo.bestblockhash}
        </h3>
      )}
    </div>
  );
};

export default BestBlockHash;
