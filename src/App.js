import React, { useState } from 'react';
import HeaderOne from "./HeaderOne";
import HeaderThree from "./HeaderThree";
import "./App.css";
import Market from "./Market";
import BlockchainInfo from "./BlockchainInfo";
import Currentblock from "./Currentblock";
import BestBlockHash from "./bestblockhash";
import Veil_Black from "./Veil_black.png";
import Chainsize from "./chainsize";
import ChainalgoStats from "./ChainalgoStats";
import SuperBlock from "./SuperBlock";
import AnnouncementBoard from "./AnnouncementBoard";
import HeaderTwo from "./HeaderTwo";
import ThemeSlider from './ThemeSlider';
import BackToTopButton from './BackToTopButton';

function App() {
  const [themeMode, setThemeMode] = useState('dark');
  const toggleTheme = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  return (
    <div className={`App ${themeMode}`}>
      <header className="header">
        <div className="header-top">
          <a href="https://veil-project.com" target="_blank" rel="noopener noreferrer">
            <img src={Veil_Black} alt="Veil logo" />
          </a>
          <h1>VEIL-INFO</h1>
          <ThemeSlider themeMode={themeMode} toggleTheme={toggleTheme} />
        </div>
        <BestBlockHash />
      </header>

      <div className="row">
        <div className="column">
          <HeaderThree />
          <HeaderOne />
          <HeaderTwo />
        </div>
        <div className="column">
          <Chainsize />
        </div>
        <div className="column">
          <Currentblock />
        </div>
        <div className="column">
          <h3>Block Reward</h3>
          <p>10 VEIL</p>
          <h4>per block until</h4>
          <h4>max supply of</h4>
          <p style={{fontSize:'1.3rem'}}>300,000,000</p>
          <h4>VEIL · est. 2037</h4>
        </div>
        <div className="column">
          <SuperBlock />
        </div>
      </div>

      <div className="box">
        <div className="row">
          <div className="column"><Market /></div>
          <div className="column"><ChainalgoStats /></div>
          <div className="column"><BlockchainInfo /></div>
          <div className="column"><AnnouncementBoard /></div>
        </div>
        <BackToTopButton />
      </div>

      <footer>
        <h5>
          Made with love by{' '}
          <a href="https://twitter.com/veilminer007" target="_blank" rel="noopener noreferrer">
            @VEILMINER
          </a>{' '}
          {new Date().getFullYear()}
        </h5>
      </footer>
    </div>
  );
}

export default App;
