import React, { useState, useEffect } from "react";
import axios from "axios";

function HeaderTwo() {
  const [veilPrice, setVeilPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=veil&vs_currencies=usd"
      );
      setVeilPrice(result.data.veil.usd);
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 120000); // every 2 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h4>Veil USD Coingecko price 
      {veilPrice !== null ? <p>${veilPrice} USD</p> : "Loading..."}
      </h4>
    </div>
  );
}

export default HeaderTwo;
