import { useState, useEffect } from "react";
import { PROXY } from "./config";

const AddressBalance = ({ label, address }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${PROXY}/address/${address}`, {
          headers: { accept: "application/json" },
        });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        if (typeof data === "number") {
          setBalance(data);
        } else {
          console.error(`Invalid data for ${label}:`, data);
        }
      } catch (err) {
        console.error(`Error fetching balance for ${label}:`, err);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 86400000); // once a day
    return () => clearInterval(intervalId);
  }, [address, label]);

  return (
    <div className="AddressBalance">
      {balance !== null ? (
        <div>
          <h3>{label} Budget:</h3>
          <h4><span style={{ color: "lightslategrey" }}>{balance} VEIL</span></h4>
        </div>
      ) : (
        <h5>Loading {label} Budget...</h5>
      )}
    </div>
  );
};
export default AddressBalance;
