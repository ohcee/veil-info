import { useState, useEffect } from "react";

const API_BASE = "https://explorer-api.veil-project.com";

const SuperBlock = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setBlockchainInfo({
          next_super_block: data.next_super_block,
          current_block: data.blocks,
        });
        setError(null);
      } catch (err) {
        console.error("SuperBlock fetch error:", err);
        setError(err);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const calculateTimeRemaining = () => {
    if (
      blockchainInfo?.next_super_block &&
      blockchainInfo?.current_block
    ) {
      const blocksRemaining =
        blockchainInfo.next_super_block - blockchainInfo.current_block;
      const minutesRemaining = blocksRemaining;
      const hoursRemaining = Math.floor(minutesRemaining / 60);
      const daysRemaining = Math.floor(hoursRemaining / 24);
      return {
        days: daysRemaining,
        hours: hoursRemaining % 24,
        minutes: minutesRemaining % 60,
      };
    }
    return null;
  };

  const remainingTime = calculateTimeRemaining();

  if (error) return <div>Error loading superblock data</div>;

  return (
    <div>
      {blockchainInfo && remainingTime && (
        <h3>
          Block number <p>{blockchainInfo.next_super_block}</p> is the next{" "}
          <p>SuperBlock</p> It's in approximately{" "}
          <p>
            {remainingTime.days} days, {remainingTime.hours} hours,{" "}
            {remainingTime.minutes} minutes
          </p>
        </h3>
      )}
      <h6>
        Learn about the{" "}
        <a
          href="https://veil-project.com/uploads/Superblocks.202402.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Superblock Data
        </a>
      </h6>
    </div>
  );
};

export default SuperBlock;
