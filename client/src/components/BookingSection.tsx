/*
 * REDLINE TERMINAL — BookingSection
 * Calendly embed with terminal aesthetic
 */
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect } from 'react';

const TERMINAL_BG = "https://files.manuscdn.com/user_upload_by_module/session_file/86490975/HbspKgysecvTvbuQ.jpg";

export default function BookingSection() {
  const headerRef = useScrollReveal();
  const calRef = useScrollReveal();

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="book"
      style={{
        position: 'relative',
        padding: '8rem 3rem',
        overflow: 'hidden',
        background: '#070707',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${TERMINAL_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(7,7,7,0.9) 0%, rgba(7,7,7,0.7) 50%, rgba(7,7,7,0.9) 100%)',
      }} />

      {/* Red gradient top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, #DC143C, transparent)',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} className="reveal-left" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem', justifyContent: 'center', display: 'flex' }}>
            // INITIATE CONTACT
          </div>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#E8E8E8',
          }}>
            BOOK A SESSION
            <span style={{ color: '#DC143C' }}>.</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.05rem',
            color: '#888',
            marginTop: '1rem',
            maxWidth: 560,
            margin: '1rem auto 0',
            lineHeight: 1.7,
          }}>
            Your first <span style={{ color: '#DC143C', fontWeight: 600 }}>30-minute video call is free</span>.
            We'll assess where you are, where you want to go, and build your roadmap.
            Eastern Time (New Jersey). Flexible scheduling.
          </p>
        </div>

        {/* Info cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
          maxWidth: 900,
          margin: '0 auto 3rem',
        }}>
          {[
            { icon: '◉', label: 'FORMAT', value: 'Video Call (Screen Share)' },
            { icon: '◈', label: 'FIRST SESSION', value: 'FREE — 30 minutes' },
            { icon: '◇', label: 'TIMEZONE', value: 'Eastern Time (EST)' },
            { icon: '◆', label: 'SCHEDULE', value: 'Flexible — We work it out' },
          ].map(item => (
            <div key={item.label} style={{
              background: 'rgba(10,10,10,0.8)',
              border: '1px solid rgba(220,20,60,0.2)',
              borderLeft: '2px solid #DC143C',
              padding: '1.25rem',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#DC143C' }}>{item.icon}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: '#555',
                  letterSpacing: '0.15em',
                }}>
                  {item.label}
                </span>
              </div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.88rem',
                color: '#C0C0C0',
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Calendly embed */}
        <div ref={calRef} className="reveal-up" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(10,10,10,0.9)',
            border: '1px solid rgba(220,20,60,0.25)',
            borderLeft: '3px solid #DC143C',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Terminal header bar */}
            <div style={{
              background: 'rgba(220,20,60,0.08)',
              borderBottom: '1px solid rgba(220,20,60,0.2)',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#DC143C', opacity: 0.8 }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#555' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#555' }} />
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: '#555',
                letterSpacing: '0.1em',
              }}>
                POSSUMXI_SCHEDULER // calendly.com/gaetano-aura-genesis/30min
              </span>
            </div>

            {/* Calendly inline widget */}
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/gaetano-aura-genesis/30min?hide_event_type_details=0&hide_gdpr_banner=1&background_color=050505&text_color=e8e8e8&primary_color=DC143C"
              style={{ minWidth: 320, height: 700 }}
            />
          </div>
        </div>

        {/* Alternative contact */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: '#555',
            letterSpacing: '0.1em',
          }}>
            PREFER EMAIL? &nbsp;
            <a
              href="mailto:Gaetano@aura-genesis.org"
              style={{ color: '#DC143C', textDecoration: 'none' }}
            >
              Gaetano@aura-genesis.org
            </a>
            &nbsp; // DISCORD: PossumXI
          </p>
        </div>
      </div>
    </section>
  );
}
