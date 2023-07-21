import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HeaderThree() {
  const [veilPrice, setVeilPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tradeogre/ticker/VEIL-BTC');
    
        if (!response.data.success) {
          throw new Error('API request failed');
        }
    
        const veilPriceString = response.data.price;
        
        if (veilPriceString) {
          const veilPriceNumber = JSON.parse(veilPriceString);
          setVeilPrice(veilPriceNumber);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 120000); // 2 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h4>VEIL BTC Tradeogre Price <p>{typeof veilPrice === 'number' ? veilPrice.toFixed(8) + ' BTC' : 'Loading...'}</p></h4>
  );
}

export default HeaderThree;
