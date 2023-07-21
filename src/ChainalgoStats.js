import React, { useState, useEffect } from 'react';
import axios from "axios";
import { PieChart } from 'react-minimal-pie-chart';

function ChainalgoStats() {
  const [chainalgoStats, setChainalgoStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          'http://localhost:3001/api/GetChainalgoStats',
        );
        setChainalgoStats(response.data);
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
  } else if (!chainalgoStats) {
    return <div>Loading...</div>;
  } else {
    const total = chainalgoStats.pos + chainalgoStats.progpow + chainalgoStats.randomx + chainalgoStats.sha256d;
    const data = [
      { title: 'PoS', value: chainalgoStats.pos/total*100, color: '#3890c8' },
      { title: 'ProgPow', value: chainalgoStats.progpow/total*100, color: '#105aef' },
      { title: 'RandomX', value: chainalgoStats.randomx/total*100, color: '#4273b9' },
      { title: 'SHA256d', value: chainalgoStats.sha256d/total*100, color: '#80fcfd' },
    ];
  
    return (
      <div>
        <h4>Block Split</h4>
        <table>
          <tbody>
            <tr className='table-row'>
              <td className='table-cell' style={{ color: '#3890c8' }}>(Proof-of-Stake)</td>
              <td>50% daily blocks</td>
              <td className='table-cell'>{chainalgoStats.pos} / 720</td>
            </tr>
            <tr className='table-row'>  
              <td className='table-cell' style={{ color: '#105aef' }}>(ProgPow)</td>
              <td>35% daily blocks</td>
              <td className='table-cell'>{chainalgoStats.progpow} / 504</td>
            </tr>
            <tr className='table-row'>
              <td className='table-cell' style={{ color: '#4273b9' }}>(RandomX)</td>
              <td>10% daily blocks</td>
              <td className='table-cell'>{chainalgoStats.randomx} / 144</td>
            </tr>
            <tr className='table-row'>  
              <td className='table-cell' style={{ color: '#80fcfd' }}>(SHA256d)</td>
              <td>5% daily blocks</td>
              <td className='table-cell'>{chainalgoStats.sha256d}<span> / 72</span></td>
            </tr>
            </tbody>
        </table>          
        <div className='bottom-border'>
        <div style={{width: '255px', height: '255px', margin: '1px', padding: '12%'}}>
        <PieChart
          data={data}
          lineWidth={100}
          label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value.toFixed(2)}%`}
          labelStyle={{
            fontSize: '5px',
            fontWeight: 'bolder',
            fontColor: 'white',
          }}
        />
        </div>
        </div> 
        <h4><p>Last 24 Hour Block Split</p></h4>
      </div>
      
    );
  }
}

export default ChainalgoStats;
