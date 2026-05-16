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
    <div className="csheader">
      {blockchainInfo && (
        <h3>Currently you need <p>{sizeInGB.toFixed(2)} GB</p> of free storage to download <p>the blockchain</p> to participate in <p><b>STAKING</b> with the core wallet</p></h3>
      )}
      <h6><a href="https://veil.freshdesk.com/support/solutions/articles/43000468343-staking-faq" target="_blank" rel="noopener noreferrer">Staking</a> FAQ</h6>
    </div>
  );
};
export default Chainsize;
