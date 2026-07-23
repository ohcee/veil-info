import React, { useState, useEffect, useRef, useContext } from "react";
import DataContext from "./DataContext";

// ─── DAG Constants ───────────────────────────────────────
const DAG_INIT_BYTES = 2147483648; // 2^31 = 2 GB
const DAG_GROWTH_BYTES = 12582912; // 2^23 | 2^22 ≈ 12 MB per epoch
const EPOCH_LENGTH_POST = 8175;
const DAG_REDUCTION_HEIGHT = 2100000;
const BLOCKS_PER_YEAR = 525600;

// Reference for date estimation
const REF_BLOCK = 3867000;
const REF_DATE = new Date("2026-06-13");

function calcEpoch(block) {
  if (block < DAG_REDUCTION_HEIGHT) return Math.floor(block / 5525);
  return Math.floor((block - DAG_REDUCTION_HEIGHT) / EPOCH_LENGTH_POST);
}

function calcDAGBytes(epoch) {
  return DAG_INIT_BYTES + epoch * DAG_GROWTH_BYTES;
}

function formatGB(bytes) {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

function epochForVRAM(vramGB) {
  const vramBytes = vramGB * 1024 * 1024 * 1024;
  return Math.floor((vramBytes - DAG_INIT_BYTES) / DAG_GROWTH_BYTES);
}

function blockForEpoch(epoch) {
  return DAG_REDUCTION_HEIGHT + epoch * EPOCH_LENGTH_POST;
}

function estimateDate(targetBlock) {
  const diff = targetBlock - REF_BLOCK;
  const date = new Date(REF_DATE.getTime() + diff * 60 * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const GPU_TIERS = [
  { label: "4 GB", vram: 4 },
  { label: "6 GB", vram: 6 },
  { label: "8 GB", vram: 8 },
  { label: "12 GB", vram: 12 },
];

// ─── Arrow Component ─────────────────────────────────────
const Arrow = ({ current, prev }) => {
  if (prev === null || current === prev) return <span style={{color:'#8b949e'}}> —</span>;
  if (current > prev) return <span style={{color:'#00ff88'}}> ▲</span>;
  return <span style={{color:'#ff4d6d'}}> ▼</span>;
};

// ─── Main Component ──────────────────────────────────────
function BlockchainInfo() {
  const { chain: info, chainError: error } = useContext(DataContext);
  const [showDAG, setShowDAG] = useState(false);

  // Previous snapshot for the ▲▼ difficulty arrows. The ref holds the last
  // committed reading; on the render where `info` changes, prevRef still points
  // at the prior value, so the arrows compare new-vs-old before the effect
  // advances the ref.
  const prevRef = useRef(null);
  useEffect(() => { prevRef.current = info; }, [info]);
  const prevInfo = prevRef.current;

  if (error && !info) return <div>Error loading blockchain info</div>;
  if (!info) return <div>Loading...</div>;

  // DAG calculations
  const blockHeight = info.blocks;
  const epoch = calcEpoch(blockHeight);
  const dagBytes = calcDAGBytes(epoch);
  const dagGB = formatGB(dagBytes);
  const nextEpochBlock = blockForEpoch(epoch + 1);
  const blocksUntilNext = nextEpochBlock - blockHeight;
  const growthPerYear = ((BLOCKS_PER_YEAR / EPOCH_LENGTH_POST) * DAG_GROWTH_BYTES) / (1024 * 1024);

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <h3>Difficulty</h3>
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#38bdf8"}}>PoS</td>
            <td style={{color:"#38bdf8"}}>
              {Number(info.difficulty_pos).toLocaleString(undefined,{maximumFractionDigits:0})}
              <Arrow current={info.difficulty_pos} prev={prevInfo?.difficulty_pos ?? null} />
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#c084fc"}}>ProgPow</td>
            <td style={{color:"#c084fc"}}>
              {Number(info.difficulty_progpow).toLocaleString(undefined,{maximumFractionDigits:2})}
              <Arrow current={info.difficulty_progpow} prev={prevInfo?.difficulty_progpow ?? null} />
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#00ff88"}}>RandomX</td>
            <td style={{color:"#00ff88"}}>
              {Number(info.difficulty_randomx).toLocaleString(undefined,{maximumFractionDigits:4})}
              <Arrow current={info.difficulty_randomx} prev={prevInfo?.difficulty_randomx ?? null} />
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#fb923c"}}>SHA256d</td>
            <td style={{color:"#fb923c"}}>
              {Number(info.difficulty_sha256d).toLocaleString(undefined,{maximumFractionDigits:0})}
              <Arrow current={info.difficulty_sha256d} prev={prevInfo?.difficulty_sha256d ?? null} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* DAG Size Section */}
      <div className="border-bottom" />
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '4px' }}>ProgPow DAG</h3>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1.3rem',
          fontWeight: '800',
          color: '#c084fc',
          margin: '4px 0',
        }}>
          {dagGB} GB
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          color: '#8b949e',
        }}>
          Epoch {epoch} · ~{growthPerYear.toFixed(0)} MB/yr · next in {blocksUntilNext.toLocaleString()} blocks
        </div>

        <button
          onClick={() => setShowDAG(!showDAG)}
          style={{
            marginTop: '8px',
            padding: '4px 12px',
            fontSize: '0.8rem',
            background: 'none',
            border: '1px solid #444',
            color: '#8b949e',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {showDAG ? 'Hide' : 'GPU Compatibility ▼'}
        </button>

        {showDAG && (
          <table style={{ width: '100%', marginTop: '8px', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
            <tbody>
              {GPU_TIERS.map(gpu => {
                const maxEpoch = epochForVRAM(gpu.vram);
                const maxBlock = blockForEpoch(maxEpoch);
                const canMine = dagBytes < gpu.vram * 1024 * 1024 * 1024;
                const estDate = estimateDate(maxBlock);

                return (
                  <tr key={gpu.label} className="table-row">
                    <td className="table-cell" style={{ fontWeight: '600' }}>{gpu.label} VRAM</td>
                    <td style={{
                      color: canMine ? '#00ff88' : '#ff4d6d',
                      fontWeight: '700',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {canMine ? `✓ until ~${estDate}` : `✗ exceeded`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div style={{
          fontSize: '0.65rem',
          color: '#666',
          marginTop: '6px',
          fontStyle: 'italic',
        }}>
          DAG size approximate · dates estimated at 60s block time
        </div>
      </div>

      <div className="border-bottom" />
      <h3>Mining Software</h3>
      <ul>
        <li><h2><a href="https://github.com/trexminer/T-Rex" target="_blank" rel="noopener noreferrer">T-Rex Miner (Nvidia · ProgPow)</a></h2></li>
        <li><h2><a href="https://github.com/andru-kun/wildrig-multi/releases/tag/0.40.6" target="_blank" rel="noopener noreferrer">Wildrig 0.40.6 (AMD & Nvidia · ProgPow)</a></h2></li>
        <li><h2><a href="https://github.com/TrailingStop/TT-Miner-release" target="_blank" rel="noopener noreferrer">TT-Miner (Nvidia · ProgPow)</a></h2></li>
        <li><h2><a href="https://github.com/ohcee/xmrig-veil" target="_blank" rel="noopener noreferrer">XMRig — ohcee fork (CPU · RandomX)</a></h2></li>
        <li><h2><a href="https://github.com/Rakni1988/cpuminer-opt-veil" target="_blank" rel="noopener noreferrer">cpuminer-opt-veil (CPU · SHA256d)</a></h2></li>
        <li><h2><a href="https://github.com/us77ipis/veil-node-stratum-proxy" target="_blank" rel="noopener noreferrer">Solo Mining Proxy</a></h2></li>
      </ul>

      <div className="border-bottom" />
      <h3>Pools</h3>
      <ul>
        <li><h2><a href="https://fastpool.xyz/veil-rx/" target="_blank" rel="noopener noreferrer">Fastpool (RandomX)</a></h2></li>
        <li><h2><a href="https://veil.yadaminers.pl/" target="_blank" rel="noopener noreferrer">Yada Miners (ProgPow · RandomX · SHA256d)</a></h2></li>
      </ul>
    </div>
  );
}

export default BlockchainInfo;