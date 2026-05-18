import React, { useState } from 'react';
import HeaderOne from "./HeaderOne";
import HeaderThree from "./HeaderThree";
import "./App.css";
import Market from "./Market";
import BlockchainInfo from "./BlockchainInfo";
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
        {/* Prices */}
        <div className="column">
          <HeaderThree />
          <HeaderOne />
          <HeaderTwo />
        </div>

        {/* Chain Size */}
        <div className="column">
          <Chainsize />
        </div>

        {/* Block Reward + consensus info */}
        <div className="column">
          <h3>Block Reward</h3>
          <p>10 VEIL</p>
          <h4>per block until max supply of</h4>
          <p style={{fontSize:'1.3rem'}}>300,000,000</p>
          <h4>VEIL</h4>

          <div style={{marginTop:'auto', paddingTop:'20px', display:'flex', flexDirection:'column', gap:'10px'}}>
            {[
              {label:'Block Time', value:'60 sec',    color:'#00ff88'},
              {label:'Consensus',  value:'PoS + PoW', color:'#c084fc'},
              {label:'Split',      value:'50 / 50',   color:'#38bdf8'},
            ].map(({label, value, color}) => (
              <div key={label} style={{
                background:'rgba(0,0,0,0.25)',
                borderRadius:'8px',
                border:`1px solid ${color}33`,
                padding:'10px 14px',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
              }}>
                <div style={{
                  fontFamily:"'JetBrains Mono',monospace",
                  fontSize:'0.65rem',
                  color:'#8b949e',
                  letterSpacing:'0.12em',
                  textTransform:'uppercase',
                }}>{label}</div>
                <div style={{
                  fontFamily:"'JetBrains Mono',monospace",
                  fontSize:'1rem',
                  color,
                  fontWeight:'700',
                }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Superblock */}
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
          - Made with love by ohcee -
          {new Date().getFullYear()}
        </h5>
      </footer>
    </div>
  );
}

export default App;
