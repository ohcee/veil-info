import { useState, useEffect } from "react";
import axios from "axios";

const BestBlockHash = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3001/api/GetBlockchainInfo/',
      );
      console.log(result.data)
      setBlockchainInfo({ bestblockhash: result.data.bestblockhash });
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  return (
    <div className="BestBlockHash">
      {blockchainInfo && (
        <h3> 
          Best Block Hash: <br></br>{blockchainInfo.bestblockhash}
        </h3>
      )}
    </div>
  );
}; 

export default BestBlockHash;

