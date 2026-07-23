import { useContext } from "react";
import DataContext from "./DataContext";

const HeaderThree = () => {
  const { market } = useContext(DataContext);
  const veilPrice = market?.btc ?? null;

  return (
    <div style={{textAlign:'center', marginBottom:'8px'}}>
      <h3>VEIL / BTC</h3>
      <p style={{
        color: veilPrice?.lastPriceUpDown === 'up' ? '#00ff88' : '#ff4d6d',
        transition: 'color 0.3s',
        fontSize: '1.4rem'
      }}>
        {veilPrice === null ? "—" : `${parseFloat(veilPrice.lastPrice).toFixed(8)} BTC`}
      </p>
    </div>
  );
};
export default HeaderThree;
