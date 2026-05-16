import React, { useState, useEffect } from "react";

// Probit delisted VEIL — replaced with NonKYC VEIL/USDT
const HeaderOne = () => {
  const [veilPrice, setVeilPrice] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nonkyc.io/api/v2/market/getbysymbol/VEIL_USDT"
        );
        if (!response.ok) throw new Error("NonKYC API failed");
        const data = await response.json();
        const price = parseFloat(data?.lastPrice || data?.last || 0);
        setVeilPrice(price);
        setError(false);
      } catch (err) {
        console.error("HeaderOne fetch error:", err);
        setError(true);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h3>
      VEIL USDT NonKYC Price{" "}
      <p>
        {error
          ? "Unavailable"
          : veilPrice === null
          ? "Loading..."
          : `$${veilPrice.toFixed(6)} USDT`}
      </p>
    </h3>
  );
};

export default HeaderOne;
