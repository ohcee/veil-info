import React, { useState, useEffect } from "react";

const HeaderTwo = () => {
  const [veilPrice, setVeilPrice] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nonkyc.io/api/v2/market/getbysymbol/VEIL_XMR"
        );
        if (!response.ok) throw new Error("NonKYC API failed");
        const data = await response.json();
        const formattedPrice = parseFloat(data.lastPrice).toFixed(8);
        setVeilPrice(formattedPrice);
        setError(false);
      } catch (err) {
        console.error("HeaderTwo fetch error:", err);
        setError(true);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>
        Veil XMR NonKYC Price{" "}
        {error ? (
          <p>Unavailable</p>
        ) : veilPrice !== null ? (
          <p>{veilPrice} XMR</p>
        ) : (
          "Loading..."
        )}
      </h3>
    </div>
  );
};

export default HeaderTwo;
