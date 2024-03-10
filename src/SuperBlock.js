import { useState, useEffect } from "react";
import axios from "axios";

const SuperBlock = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3001/api/GetBlockchainInfo/',
      );
      console.log(result.data)
      setBlockchainInfo({ next_super_block: result.data.next_super_block, current_block: result.data.blocks });
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  const calculateTimeRemaining = () => {
    if (blockchainInfo && blockchainInfo.next_super_block && blockchainInfo.current_block) {
      const blocksRemaining = blockchainInfo.next_super_block - blockchainInfo.current_block;
      const minutesRemaining = blocksRemaining;
      const hoursRemaining = Math.floor(minutesRemaining / 60);
      const daysRemaining = Math.floor(hoursRemaining / 24);

      const remainingTime = {
        days: daysRemaining,
        hours: hoursRemaining % 24,
        minutes: minutesRemaining % 60,
      };

      return remainingTime;
    }
    return null;
  };

  const remainingTime = calculateTimeRemaining();

  return (
    <div>
      {blockchainInfo && remainingTime && (
        <h3>Block number <p>{blockchainInfo.next_super_block}</p>is the next <p>SuperBlock</p>It's in approximately <p>{remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes</p></h3>
      )} 
      <h6>Learn about the <a href="https://veil-project.com/uploads/Superblocks.202402.pdf" target="_blank" rel="noopener noreferrer">Superblock Data</a></h6>
    </div>
  );
};

export default SuperBlock;
