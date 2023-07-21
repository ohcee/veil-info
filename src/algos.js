import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

function BlockchainInfo() {
  const [blockchainInfo, setBlockchainInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        'https://localhost:3001/api/GetBlockchainInfo',
      );
      const data = await response.json();
      const algorithmStats = data.algorithm_stats;
      const statsRequests = algorithmStats.map(async (stats) => {
        const response = await fetch(stats.url);
        return response.json();
      });
      const algorithmData = await Promise.all(statsRequests);
      setBlockchainInfo({ ...data, algorithms: algorithmData });
    };
    fetchData();
  }, []);

  if (!blockchainInfo) {
    return <div>Loading...</div>;
  }

  const { 
    algorithm, 
    network_hashrate, 
    reward_unit, 
    reward_block, 
    algorithm_stats, 
    algorithms 
  } = blockchainInfo;

  return (
    <div className="header">
      <h4>Blockchain Info:</h4>
      <div className="border-top"></div>  
      <table>
        <tbody>
          <tr className='table-row'>
            <td className='table-cell'>Algorithm:</td>
            <td className='table-cell'>{algorithm}</td>
          </tr>
          <tr className='table-row'>
            <td className='table-cell'>Network Hashrate:</td>
            <td className='table-cell'>{network_hashrate}</td>
          </tr>
          {algorithm_stats.map((stats, index) => (
            <React.Fragment key={index}>
              <tr className='table-row'>
                <td className='table-cell'>{`${stats.algorithm} Difficulty:`}</td>
                <td className='table-cell'>{algorithms[index].difficulty}</td>
              </tr>
              <tr className='table-row'>
                <td className='table-cell'>{`${stats.algorithm} Staking:`}</td>
                <td className='table-cell'>{algorithms[index].staking}</td>
              </tr>
            </React.Fragment>
          ))}
          <tr className='table-row'>
            <td className='table-cell'>Reward Unit:</td>
            <td className='table-cell'>{reward_unit}</td>
          </tr>
          <tr className='table-row'>
            <td className='table-cell'>Reward Block:</td>
            <td className='table-cell'>{reward_block}</td>
          </tr>
        </tbody>
      </table>
      <div className='border-bottom'></div>
    </div>
  );
}

export default BlockchainInfo;
