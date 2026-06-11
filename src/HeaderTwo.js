import React, { useState, useEffect, useRef } from "react";
import { NONKYC_XMR } from "./config";

const HeaderTwo = () => {
  const [veilPrice, setVeilPrice] = useState(null);
  const [flash, setFlash] = useState(false);
  const prevPrice = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(NONKYC_XMR);
        if (!response.ok) throw new Error("failed");
        const data = await response.json();
        const price = parseFloat(data?.lastPrice || 0);
        if (prevPrice.current !== null && prevPrice.current !== price) {
          setFlash(true);
          setTimeout(() => setFlash(false), 800);
        }
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
      <h3>VEIL / XMR</h3>
      <p style={{
        color: veilPrice?.lastPriceUpDown === 'up' ? '#00ff88' : '#ff4d6d',
        transition: 'color 0.3s',
        fontSize: '1.4rem'
      }}>
        {veilPrice === null ? "—" : `${parseFloat(veilPrice.lastPrice).toFixed(8)} XMR`}
      </p>
    </div>
  );
};
export default HeaderTwo;
