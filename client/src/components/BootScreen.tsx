/*
 * REDLINE TERMINAL — BootScreen
 * Terminal boot sequence on page load
 */
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  '> INITIALIZING POSSUM_AI_TUTOR v2.0.26...',
  '> LOADING NEURAL INTERFACE...',
  '> CONNECTING TO ASGARD NETWORK...',
  '> AUTHENTICATING: POSSUMXI [CLEARANCE: LEGEND]',
  '> AI TRAINING MODULES: ONLINE',
  '> VIBE CODE ENGINE: ACTIVE',
  '> SYSTEM READY.',
  '',
  '// ACCESS GRANTED',
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i];
        i++;
        setLines(prev => [...prev, line]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 400);
        }, 300);
      }
    }, 160);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        zIndex: 99998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '3rem',
        fontFamily: "'JetBrains Mono', monospace",
        transition: 'opacity 0.4s ease',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <div style={{ 
          color: '#DC143C', 
          fontSize: '1.2rem', 
          fontWeight: 800, 
          marginBottom: '1.5rem',
          letterSpacing: '0.1em',
          textShadow: '0 0 20px rgba(220,20,60,0.8)'
        }}>
          POSSUMXI_TERMINAL
        </div>
        {lines.map((line, idx) => {
          const text = line ?? '';
          const isComment = text.startsWith('//');
          return (
            <div
              key={idx}
              style={{
                color: isComment ? '#DC143C' : '#888',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                letterSpacing: '0.05em',
                ...(isComment ? {
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(220,20,60,0.6)'
                } : {}),
              }}
            >
              {text || '\u00A0'}
            </div>
          );
        })}
        {!done && (
          <span style={{ 
            color: '#DC143C', 
            fontSize: '0.85rem',
            animation: 'blink 1s step-end infinite'
          }}>█</span>
        )}
      </div>
    </div>
  );
}
