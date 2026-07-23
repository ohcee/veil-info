import React, { useState, useEffect, useRef, useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import DataContext from "./DataContext";

const COLORS = {
  pos:     "#38bdf8",
  progpow: "#c084fc",
  randomx: "#00ff88",
  sha256d: "#fb923c",
};

function ChainalgoStats() {
  const { algoStats: stats, algoError: error } = useContext(DataContext);
  const [flash, setFlash] = useState(false);
  const prev = useRef(null);

  useEffect(() => {
    if (!stats) return;
    if (prev.current !== null && prev.current !== stats.pos) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 800);
      prev.current = stats.pos;
      return () => clearTimeout(t);
    }
    prev.current = stats.pos;
  }, [stats?.pos, stats]);

  if (error && !stats) return <div>Error loading block split</div>;
  if (!stats) return <div>Loading...</div>;

  const total = stats.pos + stats.progpow + stats.randomx + stats.sha256d;
  const pct = (n) => (total > 0 ? (n / total) * 100 : 0);

  const chartData = [
    { title: "PoS",     value: pct(stats.pos),     color: COLORS.pos },
    { title: "ProgPow", value: pct(stats.progpow), color: COLORS.progpow },
    { title: "RandomX", value: pct(stats.randomx), color: COLORS.randomx },
    { title: "SHA256d", value: pct(stats.sha256d), color: COLORS.sha256d },
  ];

  return (
    <div className={flash ? "flash-green" : ""} style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <h3>Block Split · Last 24h</h3>

      <table style={{marginBottom:'8px'}}>
        <tbody>
          {[
            {label:"Proof-of-Stake", key:"pos",     target:720, pct:"50%"},
            {label:"ProgPow",        key:"progpow", target:504, pct:"35%"},
            {label:"RandomX",        key:"randomx", target:144, pct:"10%"},
            {label:"SHA256d",        key:"sha256d", target:72,  pct:"5%"},
          ].map(({label, key, target, pct}) => (
            <tr key={key} className="table-row">
              <td className="table-cell" style={{color:COLORS[key]}}>{label}</td>
              <td style={{color:COLORS[key]}}>{pct} · {stats[key]} / {target}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '10px',
        border: '1px solid rgba(48,54,61,1)',
        padding: '20px',
        marginTop: '12px',
        minHeight: '280px',
      }}>
        {/* NO labels on pie — legend below handles it */}
        <div style={{width:'100%', maxWidth:'260px', aspectRatio:'1'}}>
          <PieChart
            data={chartData}
            lineWidth={45}
            paddingAngle={3}
          />
        </div>

        {/* LEGEND — 2x2 grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'12px 24px',
          marginTop:'20px',
          width:'100%',
          maxWidth:'280px',
        }}>
          {chartData.map(d => (
            <div key={d.title} style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{
                width:'16px',
                height:'16px',
                borderRadius:'4px',
                background:d.color,
                flexShrink:0,
              }} />
              <div>
                <div style={{
                  fontFamily:"'JetBrains Mono',monospace",
                  fontSize:'0.85rem',
                  color: d.color,
                  fontWeight:'700',
                  lineHeight:1.2,
                }}>
                  {d.value.toFixed(1)}%
                </div>
                <div style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize:'0.78rem',
                  color:'#8b949e',
                  fontWeight:'500',
                }}>
                  {d.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChainalgoStats;
