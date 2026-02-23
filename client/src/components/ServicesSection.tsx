/*
 * REDLINE TERMINAL — ServicesSection
 * What I teach / offer as a tutor
 */
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useRef, useEffect } from 'react';

const SERVICES = [
  {
    id: '01',
    title: 'AI ENVIRONMENT SETUP',
    description: 'Get your dev environment fully configured for AI-assisted coding. Cursor IDE, GitGuard security, local LLMs with LM Studio, BitNet, and ONX runtime. We set up your venv, virtual machines, and make sure your workflow is bulletproof.',
    outcomes: ['Cursor IDE configured', 'GitGuard security', 'Local LLM running', 'Secure dev environment'],
  },
  {
    id: '02',
    title: 'VIBE CODE MASTERY',
    description: "Learn the art of vibecoding — using AI as your co-pilot to build faster, smarter, and with more intention. I'll show you how to think in prompts, structure your projects for AI collaboration, and build the muscle memory of an AI-native developer.",
    outcomes: ['AI-first workflow', 'Prompt engineering', 'Project structure', 'Speed + quality'],
  },
  {
    id: '03',
    title: 'AGENT SYSTEMS',
    description: "Build your own AI agent network. From single-agent scripts to multi-agent fleets running on OpenClaw. I'll teach you how to design agent personas, set up heartbeat schedules, and orchestrate agents across Discord, Telegram, and WhatsApp.",
    outcomes: ['OpenClaw setup', 'Agent design', 'Multi-channel bots', 'Automation workflows'],
  },
  {
    id: '04',
    title: 'SECURITY AGENTS',
    description: "Build your own security infrastructure using AI agents. Redis + NATS message queues, port scanning agents, local network monitoring, and automated incident response. The same techniques I use in ASGARD's Giru security system.",
    outcomes: ['Security scanning', 'Redis/NATS setup', 'Threat detection', 'Incident response'],
  },
  {
    id: '05',
    title: 'FULL STACK AI APPS',
    description: "Go from zero to full-stack AI application developer. We'll cover backend APIs, database design, frontend integration, and deploying AI-powered apps. Tailored to your current level — whether you're an accountant or a seasoned dev.",
    outcomes: ['Backend APIs', 'Database design', 'AI integration', 'Deployment'],
  },
  {
    id: '06',
    title: 'CUSTOM ROADMAP',
    description: "Not sure where to start? We'll spend your first session building a personalized learning roadmap based on your current skills, hardware, and goals. I'll take you from where you are to where you want to be — at your pace.",
    outcomes: ['Skills assessment', 'Custom curriculum', 'Milestone planning', 'Flexible schedule'],
  },
];

function ServiceCard({ service, delay }: { service: typeof SERVICES[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay * 1000);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="reveal-up" style={{ height: '100%' }}>
      <div className="project-card" style={{ height: '100%' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          color: '#DC143C',
          letterSpacing: '0.2em',
          marginBottom: '0.75rem',
          opacity: 0.7,
        }}>
          MODULE_{service.id}
        </div>
        <h3 style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1rem',
          fontWeight: 700,
          color: '#E8E8E8',
          marginBottom: '1rem',
          letterSpacing: '0.05em',
        }}>
          {service.title}
        </h3>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.9rem',
          color: '#888',
          lineHeight: 1.7,
          marginBottom: '1.25rem',
        }}>
          {service.description}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {service.outcomes.map(outcome => (
            <div key={outcome} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ color: '#DC143C', fontSize: '0.7rem' }}>▸</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#666',
                letterSpacing: '0.05em',
              }}>
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const headerRef = useScrollReveal();

  return (
    <section
      id="services"
      style={{
        background: '#050505',
        padding: '8rem 3rem',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, #DC143C, transparent)',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div ref={headerRef} className="reveal-left" style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>
            // TRAINING MODULES
          </div>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#E8E8E8',
          }}>
            WHAT I TEACH
            <span style={{ color: '#DC143C' }}>.</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem',
            color: '#666',
            marginTop: '1rem',
            maxWidth: 600,
          }}>
            One-on-one sessions tailored to your level. Screen sharing, live coding, and real projects.
            I teach by doing — you build the muscle memory, I guide the way.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '1.5rem',
        }}>
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} delay={idx * 0.07} />
          ))}
        </div>

        {/* Pricing note */}
        <div style={{
          marginTop: '4rem',
          background: 'rgba(220,20,60,0.05)',
          border: '1px solid rgba(220,20,60,0.2)',
          borderLeft: '3px solid #DC143C',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
              // PRICING PROTOCOL
            </div>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              color: '#C0C0C0',
              lineHeight: 1.6,
              maxWidth: 600,
            }}>
              First <span style={{ color: '#DC143C', fontWeight: 600 }}>30-minute session is free</span> — no commitment, no credit card.
              After that, we talk rates based on your goals and schedule.
              Rates are reasonable, flexible, and locked for returning clients.
            </p>
          </div>
          <button
            className="btn-red"
            onClick={() => document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' })}
          >
            BOOK FREE SESSION
          </button>
        </div>
      </div>
    </section>
  );
}
