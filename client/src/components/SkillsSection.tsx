/*
 * REDLINE TERMINAL — SkillsSection
 * Terminal-style skill matrix with categories
 */
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useRef } from 'react';
import { useEffect } from 'react';

const SKILL_CATEGORIES = [
  {
    category: 'AI & LLM',
    icon: '⬡',
    skills: ['Claude / Anthropic', 'OpenAI GPT', 'Ollama / Local LLMs', 'LM Studio', 'BitNet', 'OpenRouter', 'Groq', 'Gemini', 'MCP Protocol', 'AI Agents', 'RAG Systems', 'Prompt Engineering'],
  },
  {
    category: 'VIBE CODING',
    icon: '◈',
    skills: ['Cursor IDE', 'AI-Assisted Dev', 'Vibe Code Workflow', 'GitHub Copilot', 'Agentic Engineering', 'AI Shell (AI_UI)', 'Rust + AI', 'OpenClaw', 'Multi-Agent Systems', 'Agent Orchestration'],
  },
  {
    category: 'SECURITY & OPS',
    icon: '◉',
    skills: ['GitGuard', 'Security Agents', 'Redis', 'NATS', 'Port Scanning', 'Red/Blue Team', 'IDS/IPS', 'Docker Security', 'Threat Detection', 'Incident Response'],
  },
  {
    category: 'INFRASTRUCTURE',
    icon: '◇',
    skills: ['Python', 'Rust', 'TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'GitHub Actions', 'PostgreSQL', 'Supabase', 'Virtual Environments', 'WSL2', 'Linux'],
  },
  {
    category: 'PLATFORMS',
    icon: '◆',
    skills: ['Discord Bots', 'Telegram Bots', 'WhatsApp API', 'Slack Bots', 'OpenClaw Gateway', 'WebRTC', 'Webhooks', 'REST APIs', 'WebSockets', 'Notion API'],
  },
  {
    category: 'SPACE & ROBOTICS',
    icon: '◎',
    skills: ['ASGARD Platform', 'Satellite Systems', 'DTN Networking', 'Humanoid Robotics', 'VLA Models', 'Orbital Tracking', 'Precision Guidance', 'Autonomous Systems'],
  },
];

function SkillCard({ category, icon, skills, delay }: { category: string; icon: string; skills: string[]; delay: number }) {
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
    <div ref={ref} className="reveal-up project-card">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.25rem',
      }}>
        <span style={{ color: '#DC143C', fontSize: '1.2rem' }}>{icon}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          color: '#DC143C',
          letterSpacing: '0.15em',
          fontWeight: 700,
        }}>
          {category}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {skills.map(skill => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const headerRef = useScrollReveal();

  return (
    <section
      id="skills"
      style={{
        background: '#050505',
        padding: '8rem 3rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div ref={headerRef} className="reveal-left" style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>
            // CAPABILITY MATRIX
          </div>
          <h2 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#E8E8E8',
          }}>
            SKILL SET
            <span style={{ color: '#DC143C' }}>.</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem',
            color: '#666',
            marginTop: '1rem',
            maxWidth: 500,
          }}>
            12+ years of hands-on AI development across the full stack — from local LLMs to planetary-scale autonomous systems.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <SkillCard
              key={cat.category}
              category={cat.category}
              icon={cat.icon}
              skills={cat.skills}
              delay={idx * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
