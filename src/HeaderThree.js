import React, { useState, useEffect, useRef } from "react";
import { NONKYC_BTC } from "./config";

const HeaderThree = () => {
  const [veilPrice, setVeilPrice] = useState(null);
  const [flash, setFlash] = useState(false);
  const prevPrice = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(NONKYC_BTC);
        if (!response.ok) throw new Error("failed");
        const data = await response.json();
        const price = parseFloat(data?.lastPrice || 0);
        if (prevPrice.current !== null && prevPrice.current !== price) {
          setFlash(true);
          setTimeout(() => setFlash(false), 800);
        }
        prevPrice.current = price;
        setVeilPrice(price);
      } catch (err) { console.error(err); }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{textAlign:'center', marginBottom:'8px'}}>
      <h3>VEIL / BTC</h3>
      <p style={{
        color: flash ? '#00ff88' : undefined,
        transition: 'color 0.3s',
        fontSize: '1.1rem'
      }}>
        {veilPrice === null ? "—" : `${veilPrice.toFixed(8)} BTC`}
      </p>
    </div>
  );
};
export default HeaderThree;
