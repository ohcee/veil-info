import React, { useState, useEffect, useRef } from "react";
import { NONKYC_USDT } from "./config";

const HeaderOne = () => {
  const [veilPrice, setVeilPrice] = useState(null);
  const prevPrice = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(NONKYC_USDT);
        if (!response.ok) throw new Error("failed");
        const data = await response.json();
        const price = parseFloat(data?.lastPrice || 0);
        
        prevPrice.current = price;
        setVeilPrice(data);
      } catch (err) { console.error(err); }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{textAlign:'center', marginBottom:'8px'}}>
      <h3>VEIL / USDT</h3>
      <p style={{
        color: veilPrice?.lastPriceUpDown === 'up' ? '#00ff88' : '#ff4d6d',
        transition: 'color 0.3s',
        fontSize: '1.4rem'
      }}>
        {veilPrice === null ? "—" : `$${parseFloat(veilPrice.lastPrice).toFixed(6)}`}
      </p>
    </div>
  );
};
export default HeaderOne;
