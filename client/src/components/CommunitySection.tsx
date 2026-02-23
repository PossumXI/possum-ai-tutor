/*
 * REDLINE TERMINAL — CommunitySection
 * OpenClaw / Friends of Crustacean community section
 */
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CommunitySection() {
  const ref = useScrollReveal();

  return (
    <section
      style={{
        background: '#050505',
        padding: '6rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle red gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(220,20,60,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          ref={ref}
          className="reveal-up"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left — Community info */}
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              // COMMUNITY AFFILIATION
            </div>
            <h2 style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 800,
              color: '#E8E8E8',
              marginBottom: '1.5rem',
            }}>
              FRIENDS OF CRUSTACEAN
              <span style={{ color: '#DC143C' }}>.</span>
            </h2>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              color: '#A0A0A0',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              I'm a proud member of the <span style={{ color: '#DC143C' }}>Friends of Crustacean</span> — the Discord community
              built around the <a href="https://openclaw.org" target="_blank" rel="noopener noreferrer"
              style={{ color: '#DC143C', textDecoration: 'none' }}>OpenClaw</a> personal AI assistant ecosystem.
            </p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              color: '#888',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              OpenClaw is a local-first personal AI assistant you run on your own devices — connecting to WhatsApp, Telegram,
              Discord, Signal, and more. I use it as the backbone of my Arobi AI Employee System with 45 agents running 24/7.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://openclaw.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red"
                style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.6rem 1.4rem' }}
              >
                OPENCLAW.ORG
              </a>
              <a
                href="https://github.com/openclaw/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-red"
                style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.6rem 1.4rem' }}
              >
                GITHUB REPO
              </a>
            </div>
          </div>

          {/* Right — OpenClaw features */}
          <div style={{
            background: '#0a0a0a',
            border: '1px solid rgba(220,20,60,0.2)',
            borderLeft: '3px solid #DC143C',
            padding: '2rem',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: '#DC143C',
              letterSpacing: '0.15em',
              marginBottom: '1.25rem',
            }}>
              // OPENCLAW CAPABILITIES
            </div>
            {[
              'Multi-channel: WhatsApp, Telegram, Discord, Signal, iMessage',
              'Local-first Gateway — your data stays yours',
              'Multi-agent routing with isolated workspaces',
              'Voice Wake + Talk Mode (macOS/iOS/Android)',
              'Live Canvas — agent-driven visual workspace',
              'MCP Protocol — extensible tool use',
              'Skills system — install from Clawdis registry',
              'Companion apps — macOS, iOS, Android',
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.5rem 0',
                borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{ color: '#DC143C', fontSize: '0.7rem', marginTop: '0.15rem', flexShrink: 0 }}>▸</span>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.85rem',
                  color: '#888',
                  lineHeight: 1.5,
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #community-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
