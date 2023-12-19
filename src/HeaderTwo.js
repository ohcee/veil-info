import React, { useState, useEffect } from "react";
import axios from "axios";

function HeaderTwo() {
  const [veilPrice, setVeilPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/nonkyc-veil-xmr", {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.1 Safari/537.36'
          }
        });
        const lastPrice = response.data.lastPrice;
        // Format the price to show one more decimal point
        const formattedPrice = parseFloat(lastPrice).toFixed(8);
        setVeilPrice(formattedPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., setVeilPrice(null) or show an error message)
      }
    };
    

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 120000); // Fetch data every 2 minutes

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h4>
        Veil XMR NOKYC price {veilPrice !== null ? <p>{veilPrice} XMR</p> : "Loading..."}
      </h4>
    </div>
  );
}

export default HeaderTwo;
