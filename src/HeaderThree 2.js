import React, { useState, useEffect } from "react";

// TradeOgre closed — replaced with NonKYC VEIL/BTC
const HeaderThree = () => {
  const [veilPrice, setVeilPrice] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nonkyc.io/api/v2/market/getbysymbol/VEIL_BTC"
        );
        if (!response.ok) throw new Error("NonKYC API failed");
        const data = await response.json();
        const price = parseFloat(data?.lastPrice || data?.last || 0);
        setVeilPrice(price);
        setError(false);
      } catch (err) {
        console.error("HeaderThree fetch error:", err);
        setError(true);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 120000); // 2 minutes
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h3>
      VEIL BTC NonKYC Price{" "}
      <p>
        {error
          ? "Unavailable"
          : veilPrice === null
          ? "Loading..."
          : `${veilPrice.toFixed(8)} BTC`}
      </p>
    </h3>
  );
};

export default HeaderThree;
