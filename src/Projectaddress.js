import { useState, useEffect } from "react";
import axios from "axios";

const AddressBalance = ({ label, address }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3001/api/GetAddressBalance/${address}`,
          {
            headers: {
              'accept': 'application/json',
            }
          }
        );
        console.log(`${label} Data received:`, result.data);

        // Check if the received data is a number
        if (typeof result.data === 'number') {
          setBalance(result.data);
        } else {
          console.error(`Invalid data structure for ${label}:`, result.data);
        }
      } catch (error) {
        console.error(`Error fetching data for ${label}:`, error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 86400000); // Fetch once a day?

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, [address, label]);

  return (
    <div className="AddressBalance">
      {balance !== null ? (
        <div>
          <h3>
            {label} Budget:{" "}
          </h3> 
          <h4>
            <span style={{ color: "lightslategrey" }}>{balance} VEIL</span>
          </h4>
        </div>
      ) : (
        <h5>Loading {label} Budget...</h5>
      )}
    </div>
  );
};

export default AddressBalance;
