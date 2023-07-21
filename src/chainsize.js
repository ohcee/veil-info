import axios from "axios";
import { useState, useEffect } from "react";

const Chainsize = () => {
    const [blockchainInfo, setblockchainInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3001/api/GetBlockchainInfo/',
            );
            console.log(result.data)
            setblockchainInfo({ size_on_disk: result.data.size_on_disk });
        };
        fetchData(); //Initial fetch
        const intervalId = setInterval(fetchData, 36000000); //Fetch every 10 hours?

        return () => clearInterval(intervalId); //Clean up interval
    }, []);
    const sizeInGB = blockchainInfo ? blockchainInfo.size_on_disk / (1024*1024*1024) : 0;
    return (
        <div className="csheader">
            {blockchainInfo && (
                <h4>Currently you need <p>{sizeInGB.toFixed(2)} GB</p> of free storage to download <p>the blockchain</p>to participate in<p><b>STAKING</b> with the core wallet</p></h4>
            )}
            <h6><a href="https://veil.freshdesk.com/support/solutions/articles/43000468343-staking-faq" target="_blank" rel="noopener noreferrer">Staking </a>FAQ</h6>
        </div>
    );
};

export default Chainsize;
