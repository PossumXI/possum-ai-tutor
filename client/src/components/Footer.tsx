/*
 * REDLINE TERMINAL — Footer
 */

export default function Footer() {
  return (
    <footer style={{
      background: '#030303',
      borderTop: '1px solid rgba(220,20,60,0.15)',
      padding: '3rem',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#DC143C',
              textShadow: '0 0 15px rgba(220,20,60,0.4)',
              marginBottom: '0.5rem',
            }}>
              POSSUM<span style={{ color: '#E8E8E8' }}>XI</span>
              <span style={{ color: '#DC143C', animation: 'blink 1s step-end infinite' }}>_</span>
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: '#444',
              letterSpacing: '0.1em',
            }}>
              GAETANO COMPARCOLA // AI TUTOR
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                color: '#555',
                letterSpacing: '0.2em',
                marginBottom: '0.75rem',
              }}>
                LINKS
              </div>
              {[
                { label: 'GitHub', href: 'https://github.com/PossumXI' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gaetano-comparcola-4017041b6' },
                { label: 'Aura Genesis', href: 'https://aura-genesis.org' },
                { label: 'OpenClaw', href: 'https://openclaw.org' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.85rem',
                    color: '#666',
                    textDecoration: 'none',
                    marginBottom: '0.4rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#DC143C')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                color: '#555',
                letterSpacing: '0.2em',
                marginBottom: '0.75rem',
              }}>
                CONTACT
              </div>
              <a
                href="mailto:Gaetano@aura-genesis.org"
                style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.85rem',
                  color: '#666',
                  textDecoration: 'none',
                  marginBottom: '0.4rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#DC143C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666')}
              >
                Gaetano@aura-genesis.org
              </a>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '0.4rem',
              }}>
                Discord: PossumXI
              </div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.85rem',
                color: '#666',
              }}>
                EST — New Jersey, USA
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: '#333',
            letterSpacing: '0.1em',
          }}>
            © 2026 GAETANO COMPARCOLA // AURA GENESIS FOUNDATION // ALL RIGHTS RESERVED
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: '#333',
            letterSpacing: '0.1em',
          }}>
            PROTECTING AT HOME AND REACHING THE STARS
          </div>
        </div>
      </div>
    </footer>
  );
}
