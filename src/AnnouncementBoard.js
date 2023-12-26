import React from "react";
import AddressBalance from "./Projectaddress";

const AnnouncementBoard = () => {

  return (
    <div>
      <h3>Announcement Board</h3>
      <ul>
        <li><h2><a href="https://github.com/steel97/veil_wallet" target="_blank" rel="noopener noreferrer">Veil Light Wallets</a></h2></li>
        <li><h2><a href="https://twitter.com/nonkyc_exchange/status/1701205213036655060" target="_blank" rel="noopener noreferrer">NOKYC listing</a></h2></li>
        <li><h2><a href="https://github.com/Veil-Project/veil/releases/tag/v1.4.1.0" target="_blank" rel="noopener noreferrer">1.4.1.0 Wallet Update</a></h2></li>  
        <li><h2><a href="https://www.youtube.com/live/txYpCLQRL1k?feature=share" target="_blank" rel="noopener noreferrer" >MYB Veil Interview 2023</a></h2></li>
        <li><h2><a href="https://veil-project.com/blog/" target="_blank" rel="noopener noreferrer">Veil-project blog</a></h2></li>
      </ul>    
      <h3>Veil-Projects Budget Info</h3>
      <AddressBalance label="Project" address="38J8RGLetRUNEXycBMPg8oZqLt4bB9hCbt" />
      <AddressBalance label="Foundation" address="35uS99ZnfaYB293sJ8ptUEXkUTQXH8WnDe" /> 
    </div>
  );
};

export default AnnouncementBoard;
