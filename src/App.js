import HeaderOne from "./HeaderOne";
import HeaderThree from "./HeaderThree";
import "./App.css";
import "./responsive.css";
import Market from "./Market";
import BlockchainInfo from "./BlockchainInfo";
import Currentblock from "./Currentblock";
import BestBlockHash from "./bestblockhash";
import Veil_mark_circle_250px from './Veil_mark_circle_250px.png';
import Chainsize from "./chainsize";
import ChainalgoStats from "./ChainalgoStats";
import SuperBlock from "./SuperBlock";
import AnnouncementBoard from "./AnnouncementBoard";
import HeaderTwo from "./HeaderTwo";

function App() {

  return (
    <div className="App">
      <header className="header">
        <a href="https://github.com/Veil-Project" target="_blank" rel="noopener noreferrer"><img src={Veil_mark_circle_250px} alt="White Veil logo" /></a><h2>Veil Info</h2> 
          <BestBlockHash />
        <nav>
         <div className="nav-links-container">
          <div className="nav-links">
           <div> 
            <h5><a href="https://veil-project.com" target="_blank" rel="noopener noreferrer">Veil Project</a></h5>  
           </div>
           <div>  
            <h5><a href="https://github.com/Veil-Project/veil/releases" target="_blank" rel="noopener noreferrer">Wallet</a></h5>
           </div>
           <div>  
            <h5><a href="https://veil.tools/" target="_blank" rel="noopener noreferrer">Veil Tools</a></h5>
           </div>
           <div>
            <h5><a href="https://explorer.veil-project.com" target="_blank" rel="noopener noreferrer">Explorer</a></h5>
           </div>
           <div> 
            <h5><a href="https://github.com/steel97/veil_wallet/releases" target="_blank" rel="noopener noreferrer">Light Wallet</a></h5>
           </div>
           <div>
            <h5><a href="https://discord.veil-project.com" target="_blank" rel="noopener noreferrer">Discord</a></h5>
           </div>
           <div>
            <h5><a href="https://t.me/VEILProject" target="_blank" rel="noopener noreferrer ">Telegram</a></h5>
           </div>
           <div>
            <h5><a href="https://veil.freshdesk.com/support/home" target="_blank" rel="noopener noreferrer">Help Desk</a></h5>
           </div>
          </div>
         </div> 
        </nav>
      </header>
        <div className="row">
          <div className="column">
            <div>
              <HeaderThree />
            </div>
            <div>
            <HeaderOne />
            </div>
            <div>
            <HeaderTwo />
            </div> 
          </div>
          <div className="column">
            <div className="row">
              <Chainsize />
            </div>
          </div>
          <div className="column">
            <div className="row">
              <Currentblock />
            </div>
          </div>  
          <div className="column">
            <div className="row">
               <h4>The current Block Reward is <p>10 VEIL</p>Until a max supply of <p>300,000,000 VEIL</p>around the year<p>2037</p></h4>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <SuperBlock />
            </div>
          </div>
        </div>
      <div className="box">
        <div className="row">
          <div className="column">
            <Market />
          </div>
            <div className="column">
              <ChainalgoStats />
            </div>
          <div className="column">
            <BlockchainInfo />
          </div>
          <div className="column">
          <AnnouncementBoard />
        </div>
        </div> 
        <div className="box">
          <footer>
            <div className="footer">
              <h5><b><i>DONATION ADDRESS:</i></b> <a href="https://explorer.veil-project.com/address/sv1qqpsvpq4kf0tmafn7rnvd0u4sgqm4h8ruv2c39h4vlvjp4dkk940p0qpqf98hhfj6w7667r0aeyedvrdsgzm4tjxxm4uaztgzd33h93v79w7wqqqusdz60" target="_blank" rel="noopener noreferrer">sv1qqpsvpq4kf0tmafn7rnvd0u4sgqm4h8ruv2c39h4vlvjp4dkk940p0qpqf98hhfj6w7667r0aeyedvrdsgzm4tjxxm4uaztgzd33h93v79w7wqqqusdz60</a><br></br>
                Made with love and probably mistakes by <a href="https://twitter.com/veilminer007" target="__blank" rel="noopener noreferrer">@VEILMINER</a>{' '}
                {new Date().getFullYear()}</h5> 
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
