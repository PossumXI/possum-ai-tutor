/*
 * REDLINE TERMINAL — ProjectsSection
 * Showcases key projects with terminal card aesthetic
 */
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useRef, useEffect } from 'react';

const PROJECTS = [
  {
    codename: 'ASGARD',
    fullName: 'Autonomous Space Guardian & Robotic Defense',
    status: 'ACTIVE',
    classification: 'TOP SECRET',
    description: 'Planetary-scale autonomous systems architecture for orbital sensing, humanoid robotics, precision guidance, and cybersecurity. A monorepo spanning satellite constellation management to AI-powered defense systems.',
    tech: ['Python', 'Rust', 'TypeScript', 'Kubernetes', 'PostgreSQL', 'WebRTC', 'TensorFlow', 'DTN Protocol'],
    subsystems: ['Silenus (Satellite)', 'Hunoid (Robotics)', 'Giru (Security)', 'Pricilla (Guidance)', 'Sat_Net (DTN)'],
    link: 'https://github.com/PossumXI/Asgard_Arobi',
  },
  {
    codename: 'AI_UI',
    fullName: 'The AI Shell We Need',
    status: 'ACTIVE',
    classification: 'PUBLIC',
    description: 'A GPU-accelerated, AI-native desktop shell built in Rust. Reimagines how we interact with computers in the age of AI. Features an AI Command Bar (Ctrl+Space), fuzzy app launcher, system taskbar, and full MCP integration.',
    tech: ['Rust', 'iced', 'wgpu', 'Claude API', 'Ollama', 'MCP Protocol', 'nucleo-matcher'],
    subsystems: ['AI Command Bar', 'App Launcher', 'System Taskbar', 'Claude + Ollama', 'MCP Tool Use'],
    link: 'https://github.com/PossumXI/AI_UI',
  },
  {
    codename: 'AROBI',
    fullName: 'AI Employee System — OpenClaw Network',
    status: 'OPERATIONAL',
    classification: 'INTERNAL',
    description: '45-agent AI employee fleet running on OpenClaw + Claude. Departments span Executive Council, ICF Security, Technology, Research, Marketing, Intelligence, and Division 00. Agents run on heartbeat schedules from every 15 minutes to 12 hours.',
    tech: ['OpenClaw', 'Claude', 'Python', 'GitHub Actions', 'Supabase', 'Groq', 'Kimi', 'Discord'],
    subsystems: ['ARIA (Executive)', 'SENTINEL (Security)', 'FORGE (Tech)', 'SIGNAL (Marketing)', 'EYE (Intel)'],
    link: 'https://aura-genesis.org',
  },
];

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
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
    <div ref={ref} className="reveal-left">
      <div className="project-card" style={{ padding: '2rem' }}>
        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.4rem' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#DC143C',
                textShadow: '0 0 15px rgba(220,20,60,0.4)',
              }}>
                {project.codename}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                padding: '0.2rem 0.6rem',
                background: project.classification === 'PUBLIC' ? 'rgba(0,200,100,0.1)' : 'rgba(220,20,60,0.1)',
                border: `1px solid ${project.classification === 'PUBLIC' ? 'rgba(0,200,100,0.3)' : 'rgba(220,20,60,0.3)'}`,
                color: project.classification === 'PUBLIC' ? '#00C864' : '#DC143C',
                letterSpacing: '0.1em',
              }}>
                {project.classification}
              </span>
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.85rem',
              color: '#666',
            }}>
              {project.fullName}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#DC143C',
              boxShadow: '0 0 8px rgba(220,20,60,0.8)',
              animation: 'blink 2s ease infinite',
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: '#DC143C',
              letterSpacing: '0.1em',
            }}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.95rem',
          color: '#A0A0A0',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          maxWidth: 800,
        }}>
          {project.description}
        </p>

        {/* Subsystems */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            color: '#555',
            letterSpacing: '0.15em',
            display: 'block',
            marginBottom: '0.5rem',
          }}>
            SUBSYSTEMS
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.subsystems.map(sub => (
              <span key={sub} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                padding: '0.2rem 0.6rem',
                background: 'rgba(220,20,60,0.08)',
                border: '1px solid rgba(220,20,60,0.2)',
                color: '#888',
              }}>
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            color: '#555',
            letterSpacing: '0.15em',
            display: 'block',
            marginBottom: '0.5rem',
          }}>
            TECH STACK
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tech.map(t => (
              <span key={t} className="skill-tag" style={{ fontSize: '0.65rem' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-red"
          style={{
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '0.72rem',
            padding: '0.5rem 1.2rem',
          }}
        >
          VIEW REPO →
        </a>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const headerRef = useScrollReveal();

  return (
    <section
      id="projects"
      style={{
        background: '#070707',
        padding: '8rem 3rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div ref={headerRef} className="reveal-left" style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>
            // ACTIVE OPERATIONS
          </div>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#E8E8E8',
          }}>
            PROJECTS
            <span style={{ color: '#DC143C' }}>.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.codename} project={project} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
