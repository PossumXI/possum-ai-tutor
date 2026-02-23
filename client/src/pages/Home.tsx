/*
 * REDLINE TERMINAL — Home Page
 * Assembles all sections for PossumXI AI Tutor website
 * Design: Den of Thieves × Snowden × GraySwan Red Team
 */
import { useState } from 'react';
import BootScreen from '@/components/BootScreen';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import CommunitySection from '@/components/CommunitySection';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {/* Custom cursor — always on top */}
      <CustomCursor />

      {/* Boot sequence */}
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      {/* Main site */}
      <div style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ServicesSection />
        <CommunitySection />
        <BookingSection />
        <Footer />
      </div>
    </>
  );
}
