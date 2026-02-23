/*
 * REDLINE TERMINAL — HeroSection
 * Full-viewport hero with possum neon bg, typewriter headline, scanlines
 */
import { useTypewriter } from '@/hooks/useTypewriter';
import { useEffect, useRef } from 'react';

const HERO_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/86490975/gvZJaYvwYiEKcvuE.jpg";

export default function HeroSection() {
  const typeText = useTypewriter([
    'AI VIBE CODE TUTOR',
    'VIBECODING LEGEND',
    'AI SYSTEMS ARCHITECT',
    'YOUR MENTOR IN THE MACHINE',
  ], 70, 2200);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops: number[] = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';

    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,5,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(220,20,60,0.6)';
      ctx.font = '12px JetBrains Mono, monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  const scrollToBook = () => {
    document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#050505',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.55,
        }}
      />

      {/* Dark gradient overlay — left side readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.8) 40%, rgba(5,5,5,0.25) 70%, rgba(5,5,5,0.05) 100%)',
        }}
      />

      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="matrix-rain"
        style={{ opacity: 0.06 }}
      />

      {/* Scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '0 3rem',
          maxWidth: 800,
          paddingTop: '6rem',
        }}
      >
        {/* Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#DC143C',
            boxShadow: '0 0 10px rgba(220,20,60,0.8)',
            animation: 'blink 2s ease infinite',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: '#DC143C',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            SYSTEM ONLINE // ACCEPTING CLIENTS
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '0.5rem',
            color: '#E8E8E8',
          }}
        >
          POSSUM
          <span
            style={{
              color: '#DC143C',
              textShadow: '0 0 30px rgba(220,20,60,0.8), 0 0 60px rgba(220,20,60,0.4)',
            }}
            className="glitch-name"
          >
            XI
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#DC143C',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em',
            minHeight: '2rem',
          }}
        >
          <span style={{ color: '#555' }}>// </span>
          {typeText}
          <span className="cursor-blink" style={{ color: '#DC143C' }}>_</span>
        </div>

        {/* Real name */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8rem',
          color: '#666',
          marginBottom: '2rem',
          letterSpacing: '0.15em',
        }}>
          GAETANO COMPARCOLA &nbsp;·&nbsp; EST. 1991 &nbsp;·&nbsp; AI SINCE 2013
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.05rem',
            color: '#B0B0B0',
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: '2.5rem',
          }}
        >
          CEO of Aura Genesis Foundation. Architect of ASGARD — a planetary-scale autonomous defense system.
          Member of the <span style={{ color: '#DC143C' }}>Friends of Crustacean</span> &amp; OpenClaw community.
          I give back by teaching the next generation to vibe code with AI.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-red" onClick={scrollToBook}>
            BOOK FREE SESSION
          </button>
          <button className="btn-outline-red" onClick={scrollToAbout}>
            VIEW DOSSIER
          </button>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          marginTop: '3.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(220,20,60,0.15)',
        }}>
          {[
            { value: '12+', label: 'YEARS WITH AI' },
            { value: '2013', label: 'STARTED' },
            { value: '∞', label: 'VIBE LEVEL' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="stat-value" style={{ fontSize: '2rem' }}>{stat.value}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                color: '#555',
                letterSpacing: '0.2em',
                marginTop: '0.25rem',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: '#555',
          letterSpacing: '0.2em',
        }}>SCROLL</span>
        <div style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(to bottom, #DC143C, transparent)',
          animation: 'pulse 2s ease infinite',
        }} />
      </div>
    </section>
  );
}
