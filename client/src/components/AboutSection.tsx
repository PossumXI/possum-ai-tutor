/*
 * REDLINE TERMINAL — AboutSection
 * Classified dossier layout with avatar and bio
 */
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AVATAR_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/86490975/PuuLgXXMItoqDRkf.jpg";

const DOSSIER_FIELDS = [
  { label: 'DESIGNATION', value: 'PossumXI / Possum' },
  { label: 'LEGAL NAME', value: 'Gaetano Comparcola' },
  { label: 'BORN', value: 'December 29, 1991' },
  { label: 'LOCATION', value: 'New Jersey, USA (EST)' },
  { label: 'AI SINCE', value: '2013 — 12+ years active' },
  { label: 'CLEARANCE', value: 'LEGEND — Vibecoding Community' },
  { label: 'AFFILIATION', value: 'Friends of Crustacean / OpenClaw' },
  { label: 'CURRENT OP', value: 'CEO — Aura Genesis Foundation' },
  { label: 'GITHUB', value: '@PossumXI' },
  { label: 'DISCORD', value: 'PossumXI / Possum' },
];

export default function AboutSection() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <section
      id="about"
      style={{
        background: '#070707',
        padding: '8rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background hex grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DC143C' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>
            // CLASSIFIED DOSSIER
          </div>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#E8E8E8',
          }}>
            SUBJECT FILE
            <span style={{ color: '#DC143C' }}>.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Left — Avatar + dossier card */}
          <div ref={leftRef} className="reveal-left">
            {/* Avatar */}
            <div
              className="terminal-border"
              style={{
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* CLASSIFIED stamp */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 2,
                background: 'rgba(220,20,60,0.9)',
                padding: '0.2rem 0.6rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: '#fff',
              }}>
                CLASSIFIED
              </div>
              <img
                src={AVATAR_IMG}
                alt="PossumXI — AI Tutor"
                style={{
                  width: '100%',
                  display: 'block',
                  filter: 'contrast(1.1) saturate(0.8)',
                }}
              />
            </div>

            {/* Dossier fields */}
            <div style={{
              background: '#0a0a0a',
              border: '1px solid rgba(220,20,60,0.2)',
              borderLeft: '3px solid #DC143C',
              padding: '1.5rem',
            }}>
              {DOSSIER_FIELDS.map((field, i) => (
                <div
                  key={field.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '0.5rem 0',
                    borderBottom: i < DOSSIER_FIELDS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    gap: '1rem',
                  }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    color: '#555',
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                  }}>
                    {field.label}
                  </span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.82rem',
                    color: '#C0C0C0',
                    textAlign: 'right',
                  }}>
                    {field.label === 'GITHUB' ? (
                      <a href="https://github.com/PossumXI" target="_blank" rel="noopener noreferrer"
                        style={{ color: '#DC143C', textDecoration: 'none' }}>
                        {field.value}
                      </a>
                    ) : field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bio */}
          <div ref={rightRef} className="reveal-left" style={{ transitionDelay: '0.15s' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.1rem',
                color: '#C8C8C8',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}>
                I've been working with AI since <span style={{ color: '#DC143C', fontWeight: 600 }}>2013</span> — before most people knew what a neural network was.
                What started as deep curiosity became a decade-long obsession with building intelligent systems that actually work in the real world.
              </p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.05rem',
                color: '#A0A0A0',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}>
                Today I serve as CEO of <span style={{ color: '#DC143C' }}>Aura Genesis Foundation</span> and lead architect of <span style={{ color: '#DC143C' }}>ASGARD</span> —
                a planetary-scale autonomous defense platform spanning satellite constellation management, humanoid robotics, and AI-powered threat detection.
                I also built <span style={{ color: '#DC143C' }}>AI_UI</span>, a GPU-accelerated AI-native desktop shell written in Rust.
              </p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.05rem',
                color: '#A0A0A0',
                lineHeight: 1.8,
              }}>
                I'm a proud member of the <span style={{ color: '#DC143C' }}>Friends of Crustacean</span> Discord community and a contributor to the OpenClaw ecosystem.
                The vibecoding community gave me so much — this tutoring service is how I give back.
              </p>
            </div>

            {/* Mission statement */}
            <div style={{
              background: 'rgba(220,20,60,0.05)',
              border: '1px solid rgba(220,20,60,0.2)',
              borderLeft: '3px solid #DC143C',
              padding: '1.5rem',
              marginBottom: '2.5rem',
            }}>
              <div className="section-label" style={{ marginBottom: '0.75rem' }}>
                // MISSION STATEMENT
              </div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.9rem',
                color: '#E8E8E8',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}>
                "Protecting at home and reaching the stars. I teach you to build with AI so you can protect what matters and build what you dream."
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/PossumXI"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-red"
                style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.6rem 1.2rem' }}
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/gaetano-comparcola-4017041b6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-red"
                style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.6rem 1.2rem' }}
              >
                LINKEDIN
              </a>
              <a
                href="https://openclaw.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-red"
                style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.6rem 1.2rem' }}
              >
                OPENCLAW.ORG
              </a>
              <a
                href="https://aura-genesis.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-red"
                style={{ textDecoration: 'none', fontSize: '0.75rem', padding: '0.6rem 1.2rem' }}
              >
                AURA-GENESIS.ORG
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
