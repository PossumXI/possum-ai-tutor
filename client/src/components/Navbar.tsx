/*
 * REDLINE TERMINAL — Navbar
 * Fixed top nav with terminal aesthetic
 */
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SERVICES', href: '#services' },
  { label: 'REVIEWS', href: '/reviews', isPage: true },
  { label: 'BOOK', href: '#book' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled
          ? 'rgba(5,5,5,0.95)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(220,20,60,0.2)' : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        padding: '1rem 2rem',
      }}
    >
      <div style={{ 
        maxWidth: 1400, 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#DC143C',
            background: 'none',
            border: 'none',
            letterSpacing: '0.05em',
            textShadow: '0 0 15px rgba(220,20,60,0.6)',
          }}
        >
          POSSUM<span style={{ color: '#E8E8E8' }}>XI</span>
          <span style={{ color: '#DC143C', animation: 'blink 1s step-end infinite' }}>_</span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => navigate(link.href, link.isPage)}
              className="nav-link"
              style={{ background: 'none', border: 'none' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate('#book')}
              className="btn-red"
              style={{ fontSize: '0.75rem', padding: '0.6rem 1.4rem' }}
          >
            FREE SESSION
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid rgba(220,20,60,0.4)',
            padding: '0.4rem 0.6rem',
            color: '#DC143C',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
          }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(5,5,5,0.98)',
          borderTop: '1px solid rgba(220,20,60,0.2)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => navigate(link.href, link.isPage)}
              className="nav-link"
              style={{ background: 'none', border: 'none', textAlign: 'left' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate('#book')}
              className="btn-red"
              style={{ width: 'fit-content' }}
          >
            FREE SESSION
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          nav > div > div:first-of-type + div { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
