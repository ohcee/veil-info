import React from "react";

const AnnouncementBoard = () => {
  return (
    <div>
      <h3>Links</h3>
      <ul>
        <li><h2><a href="https://veil-project.com" target="_blank" rel="noopener noreferrer">Veil Project</a></h2></li>
        <li><h2><a href="https://veil-project.com/blog/" target="_blank" rel="noopener noreferrer">Blog</a></h2></li>
        <li><h2><a href="https://github.com/Veil-Project/veil/releases" target="_blank" rel="noopener noreferrer">Core Wallet</a></h2></li>
        <li><h2><a href="https://veilproject.org" target="_blank" rel="noopener noreferrer">Light Wallet</a></h2></li>
        <li><h2><a href="https://explorer.veil-project.com" target="_blank" rel="noopener noreferrer">Explorer</a></h2></li>
        <li><h2><a href="https://veil.tools/" target="_blank" rel="noopener noreferrer">Veil Tools</a></h2></li>
        <li><h2><a href="https://nonkyc.io/market/VEIL_USDT" target="_blank" rel="noopener noreferrer">NonKYC Exchange</a></h2></li>
        <li><h2><a href="https://discord.veil-project.com" target="_blank" rel="noopener noreferrer">Discord</a></h2></li>
        <li><h2><a href="https://t.me/VEILProject" target="_blank" rel="noopener noreferrer">Telegram</a></h2></li>
        <li><h2><a href="https://veil-project.com/faqs/" target="_blank" rel="noopener noreferrer">FAQ</a></h2></li>
        <li><h2><a href="https://veil.freshdesk.com/support/home" target="_blank" rel="noopener noreferrer">Help Desk</a></h2></li>
        <li><h2><a href="https://github.com/ohcee/veil-info" target="_blank" rel="noopener noreferrer">Veil-Info Source Code</a></h2></li>
      </ul>
      <br />
      {/* Budget addresses temporarily commented out pending governance/multisig fix
      <AddressBalance label="Project" address="38J8RGLetRUNEXycBMPg8oZqLt4bB9hCbt" />
      <AddressBalance label="Foundation" address="35uS99ZnfaYB293sJ8ptUEXkUTQXH8WnDe" />
      */}
    </div>
  );
};
export default AnnouncementBoard;
