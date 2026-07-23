import { useContext } from "react";
import DataContext from "./DataContext";

const SuperBlock = () => {
  const { chain } = useContext(DataContext);
  const info = chain
    ? { next_super_block: chain.next_super_block, current_block: chain.blocks }
    : null;

  const getTimeRemaining = () => {
    if (!info?.next_super_block || !info?.current_block) return null;
    const blocksRemaining = info.next_super_block - info.current_block;
    const hours = Math.floor(blocksRemaining / 60);
    return {
      days: Math.floor(hours / 24),
      hours: hours % 24,
      minutes: blocksRemaining % 60,
      blocks: blocksRemaining,
    };
  };

  const t = getTimeRemaining();

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',textAlign:'center'}}>
      <h3>Next Superblock</h3>

      <div style={{
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:'1.5rem',
        fontWeight:'800',
        color:'#fbbf24',
        margin:'8px 0',
      }}>
        {info ? `#${info.next_super_block?.toLocaleString()}` : "—"}
      </div>

      {t && (
        <>
          <div style={{display:'flex',justifyContent:'space-around',gap:'8px',flexWrap:'wrap',margin:'10px 0'}}>
            {[{label:'Days',value:t.days},{label:'Hours',value:t.hours},{label:'Mins',value:t.minutes}].map(({label,value}) => (
              <div key={label} style={{
                flex:'1',minWidth:'60px',
                background:'rgba(0,0,0,0.3)',
                borderRadius:'8px',
                border:'1px solid rgba(251,191,36,0.2)',
                padding:'10px 8px',
              }}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'1.8rem',fontWeight:'800',color:'#00ff88',lineHeight:1}}>{value}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'0.6rem',color:'#8b949e',letterSpacing:'0.12em',textTransform:'uppercase',marginTop:'5px'}}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'0.75rem',color:'#8b949e',marginBottom:'16px'}}>
            {t.blocks?.toLocaleString()} blocks remaining
          </div>
        </>
      )}

      {/* SUPERBLOCK INFO */}
      <div style={{
        flex:1,
        textAlign:'left',
        padding:'14px',
        background:'rgba(251,191,36,0.05)',
        borderRadius:'8px',
        border:'1px solid rgba(251,191,36,0.15)',
      }}>
        <div style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize:'0.65rem',
          color:'#fbbf24',
          letterSpacing:'0.15em',
          textTransform:'uppercase',
          fontWeight:'600',
          marginBottom:'8px',
        }}>What is a Superblock?</div>
        <div style={{
          fontFamily:"'Inter',sans-serif",
          fontSize:'0.88rem',
          color:'#c9d1d9',
          lineHeight:1.7,
        }}>
          The Monthly Superblock is Veil's funding mechanism that pays for network operations, project management, and developer support once per month.
        </div>
      </div>
    </div>
  );
};

export default SuperBlock;
