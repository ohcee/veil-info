import React, { useState, useEffect } from 'react';
import axios from "axios";

function BlockchainInfo() {
  const [getblockchaininfo, setgetblockchaininfo] = useState(null);
  const [error, setError] = useState(null);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          'http://localhost:3001/api/GetBlockchainInfo',
        );
        console.log(response);
        const sizeOnDiskGb = formatBytes(response.data.size_on_disk, 2);
        setgetblockchaininfo({
          difficulty_randomx: response.data.difficulty_randomx,
          difficulty_progpow: response.data.difficulty_progpow,
          difficulty_sha256d: response.data.difficulty_sha256d,
          difficulty_pos: response.data.difficulty_pos,
          size_on_disk: response.data.size_on_disk,
          size_on_disk_gb: sizeOnDiskGb
        });
        setError(null); // Reset error state if successful
      } catch (error) {
        console.error(error);
        setError(error); // Set error state if there's an error
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!getblockchaininfo) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h4>Difficulty Data</h4>  
        <table>
          <tbody>
            <tr className='table-row'>
              <td className='table-cell' style={{ color: '#3890c8' }}>(Proof-of-Stake) Difficulty</td>
              <td className='table-cell'>{getblockchaininfo.difficulty_pos}</td>
            </tr>
            <tr className='table-row'>
              <td className='table-cell' style={{ color: '#105aef' }}>(ProgPow) Difficulty</td>
              <td className='table-cell'>{getblockchaininfo.difficulty_progpow}</td>
            </tr>
            <tr className='table-row'>
              <td className='table-cell' style={{ color: '#4273b9' }}>(RandomX) Difficulty</td>
              <td className='table-cell'>{getblockchaininfo.difficulty_randomx}</td>
            </tr>
            <tr className='table-row'>
              <td className='table-cell' style={{ color: '#80fcfd' }}>(Sha256D) Difficulty</td>
              <td className='table-cell'>{getblockchaininfo.difficulty_sha256d}</td>
            </tr> 
          </tbody>
        </table>
        <div className='border-bottom'></div>
         <h4>Mining Software</h4>
         <ul>
           <li><h3><a href="https://github.com/trexminer/T-Rex" target='_blank' rel="noopener noreferrer">T-Rex Miner (Nvidia)</a></h3></li>
           <li><h3><a href="https://github.com/andru-kun/wildrig-multi" target='_blank' rel="noopener noreferrer">Wildrig-Miner (AMD & Nvida)</a></h3></li>
           <li><h3><a href="https://github.com/TrailingStop/TT-Miner-release" target='_blank' rel="noopener noreferrer">TT-Miner (Nvidia)</a></h3></li>
           <li><h3><a href="https://github.com/us77ipis/xmrig-veil" target='_blank' rel="noopener noreferrer">XMRIG (CPU)</a></h3></li>
           <li><h3><a href="https://github.com/us77ipis/veil-node-stratum-proxy" target='_blank' rel="noopener noreferrer">Solo Mining Proxy</a></h3></li>
         </ul>
         <h4>Pools</h4>
         <ul>
           <li><h3><a href="https://fastpool.xyz/veil-rx/" target='_blank' rel="noopener noreferrer">Fastpool (RandomX)</a></h3></li>
         </ul>
       </div>
      
    ); 
  }
}

export default BlockchainInfo;

              

