import React, { useState, useEffect } from 'react';

function HeaderOne() {
  const [veilPrice, setVeilPrice] = useState(NaN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/probit/ticker?market_ids=VEIL-USDT&random=${Math.random()}`, {
          method: 'GET',
          headers: { accept: 'application/json' },
        });


        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        const usdtPrice = Number(data.data[0].last);
        setVeilPrice(usdtPrice);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 120000); // 2 minutes

    return () => clearInterval(intervalId);
  }, []);

return (
  <h4>VEIL USDT Probit Price <p>${isNaN(veilPrice) ? 'Loading...' : veilPrice.toFixed(4)} USDT</p></h4>
);

}
export default HeaderOne;

