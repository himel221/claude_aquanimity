import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import all components
import Nav from './components/nav';
import Hero from './components/hero';

import Institutes from './components/institutes';
import Ventures from './components/ventures';
import Team from './components/team';
import Partners from './components/partners';
import FooterCTA from './components/footer';
import DetailPage from './components/detail';
import Platform from './components/platform';
import Contact from './components/contact';

// Import primitives (hooks and shared components)
import { useReveal, useTypewriter, Arrow, Plus, Mark, HeroBubble } from './components/primitives';

// Root app
const PALETTES = {
  marine: {
    bone: '#F2EDE3', bone2: '#ECE5D6', paper: '#FAF7F0',
    ink: '#0E1B2C', ink2: '#1B2A3F', muted: '#5C6677',
    rule: '#D8D0BE', accent: '#1F6E7A', accent2: '#4FA0AC', accentSoft: '#BFD4D5',
    bubbleHi: '#A8D0D6', bubbleMid: '#5FA0AC', bubbleLo: '#1F6E7A', bubbleHalo: '#BFD4D5', ringText: '#5C6677'
  },
  ink: {
    bone: '#F4F1EB', bone2: '#E8E2D3', paper: '#FBF8F1',
    ink: '#181A43', ink2: '#262A60', muted: '#5C6080',
    rule: '#D6CFBC', accent: '#2A6FDB', accent2: '#6798E0', accentSoft: '#C5D5EE',
    bubbleHi: '#B8C8E8', bubbleMid: '#5A78B4', bubbleLo: '#181A43', bubbleHalo: '#C5D5EE', ringText: '#5C6080'
  },
  mineral: {
    bone: '#EFEAE0', bone2: '#E5DDCC', paper: '#FAF6EF',
    ink: '#1A2A1F', ink2: '#2A3F30', muted: '#566355',
    rule: '#D2CAB6', accent: '#5A7F4D', accent2: '#88A578', accentSoft: '#CADCBE',
    bubbleHi: '#BBCFAB', bubbleMid: '#7A9669', bubbleLo: '#3A5A2C', bubbleHalo: '#CADCBE', ringText: '#566355'
  }
};

const TWEAK_DEFAULTS = {
  "palette": "marine",
  "italics": true,
  "heroAnimation": "typewriter"
};

// Custom hook to replace window.useTweaks
const useTweaks = (defaults) => {
  const [tweaks, setTweaks] = useState(defaults);
  const setTweak = (key, value) => {
    setTweaks(prev => ({ ...prev, [key]: value }));
  };
  return [tweaks, setTweak];
};

function applyPalette(p) {
  const r = document.documentElement;
  r.style.setProperty('--bone', p.bone);
  r.style.setProperty('--bone-2', p.bone2);
  r.style.setProperty('--paper', p.paper);
  r.style.setProperty('--ink', p.ink);
  r.style.setProperty('--ink-2', p.ink2);
  r.style.setProperty('--muted', p.muted);
  r.style.setProperty('--rule', p.rule);
  r.style.setProperty('--accent', p.accent);
  r.style.setProperty('--accent-2', p.accent2);
  r.style.setProperty('--accent-soft', p.accentSoft);
}

// Global Styles Component with AOS support
const GlobalStyles = () => (
  <style>{`
    /* ===== RESET & BASE STYLES ===== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--paper);
      color: var(--ink);
      line-height: 1.5;
      overflow-x: hidden;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* ===== SCROLL PROGRESS BAR ===== */
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      z-index: 10000;
      transition: width 0.1s ease-out;
    }

    /* ===== AOS CUSTOM OVERRIDES ===== */
    [data-aos] {
      pointer-events: none;
    }
    
    [data-aos].aos-animate {
      pointer-events: auto;
    }
    
    /* Custom animation durations */
    [data-aos="fade-up"] {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    [data-aos="zoom-in"] {
      transition-timing-function: cubic-bezier(0.34, 1.2, 0.64, 1);
    }

    /* ===== SECTIONS STYLES ===== */
    .institutes-section,
    .ventures-section,
    .team-section,
    .partners-section,
    .platform-section,
    .footer-cta-section {
      position: relative;
      z-index: 1;
    }

    /* Card hover effects */
    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }

    .card:hover {
      transform: translateY(-8px) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    /* Grid item hover */
    .grid-item {
      transition: transform 0.3s ease;
    }

    .grid-item:hover {
      transform: translateY(-5px);
    }

    /* Target highlight effect */
    .target-highlight {
      animation: highlightPulse 0.8s ease-in-out;
    }

    @keyframes highlightPulse {
      0%, 100% {
        background-color: transparent;
      }
      50% {
        background-color: rgba(31, 110, 122, 0.15);
        box-shadow: 0 0 0 4px rgba(31, 110, 122, 0.2);
      }
    }

    /* Smooth scroll behavior */
    html {
      scroll-behavior: smooth;
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 1024px) {
      .card:hover {
        transform: translateY(-4px) !important;
      }
    }

    @media (max-width: 768px) {
      .card, .grid-item, .list-item, .team-card, .partner-item {
        transition: none !important;
      }
      
      [data-aos] {
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-aos] {
        transition: none !important;
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
      
      html { scroll-behavior: auto; }
      .card:hover { transform: none !important; }
    }
  `}</style>
);

// AOS Animation Wrapper Component
const AOSWrapper = ({ children }) => {
  useEffect(() => {
    // Initialize AOS with professional settings
    AOS.init({
      duration: 800,
      offset: 100,
      delay: 0,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      disable: function() {
        // Disable on mobile for better performance
        return window.innerWidth < 768;
      }
    });

    // Refresh AOS on window resize
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      AOS.refresh();
    };
  }, []);

  return children;
};

function App() {
  const [route, setRoute] = useState('home');
  const [scrollTarget, setScrollTarget] = useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [isLoaderRemoved, setIsLoaderRemoved] = useState(false);
  
  const palette = useMemo(() => {
    const base = PALETTES[t.palette] || PALETTES.marine;
    return {
      ...base,
      ringText: base.muted,
    };
  }, [t.palette]);

  useEffect(() => { applyPalette(palette); }, [palette]);

  // scroll progress bar
  useEffect(() => {
    const updateScrollProgress = () => {
      const el = document.getElementById('scrollBar');
      if (el) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        el.style.width = pct + '%';
      }
    };
    
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // navigation handlers
  const navigate = useCallback((to, target) => {
    setRoute(to);
    if (target) {
      setScrollTarget(target);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const open = useCallback((r) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setRoute(r);
  }, []);

  // listen for sub-link routes from list views
  useEffect(() => {
    const h = (e) => { 
      window.scrollTo({ top: 0 }); 
      setRoute(e.detail); 
    };
    window.addEventListener('aq-route', h);
    return () => window.removeEventListener('aq-route', h);
  }, []);

  // when returning home, scroll to target with smooth animation
  useEffect(() => {
    if (route === 'home' && scrollTarget) {
      requestAnimationFrame(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('target-highlight');
          setTimeout(() => {
            if (el) el.classList.remove('target-highlight');
          }, 1000);
        }
        setScrollTarget(null);
      });
    }
  }, [route, scrollTarget]);

  // remove loader - safe version
  useEffect(() => {
    const removeLoader = () => {
      const el = document.getElementById('loader');
      if (el && el.parentNode && !isLoaderRemoved) {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
            setIsLoaderRemoved(true);
          }
        }, 600);
      }
    };
    
    const timer = setTimeout(removeLoader, 200);
    return () => clearTimeout(timer);
  }, [isLoaderRemoved]);

  return (
    <AOSWrapper>
      <GlobalStyles />
      <div id="scrollBar" className="scroll-progress"></div>
      <Nav onNavigate={navigate} route={route} palette={palette} />
      {route === 'home' ? (
        <main>
          <Hero palette={palette} onGoto={(id) => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />
          
          {/* Institutes Section with AOS */}
          <div className="institutes-section" data-aos="fade-up" data-aos-duration="900" data-aos-offset="50">
            <Institutes palette={palette} onOpen={open} />
          </div>
          
          {/* Ventures Section with AOS */}
          <div className="ventures-section" data-aos="fade-up" data-aos-duration="900" data-aos-delay="100" data-aos-offset="50">
            <Ventures palette={palette} onOpen={open} />
          </div>
          
          {/* Team Section with AOS */}
          <div className="team-section" data-aos="fade-up" data-aos-duration="900" data-aos-delay="200" data-aos-offset="50">
            <Team palette={palette} onOpen={open} />
          </div>
          
          {/* Partners Section with AOS */}
          <div className="partners-section" data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="50">
            <Partners palette={palette} onOpen={open} />
          </div>
          
          {/* Platform Section with AOS */}
          <div className="platform-section" data-aos="fade-up" data-aos-duration="900" data-aos-delay="400" data-aos-offset="50">
            <Platform palette={palette} onOpen={open} />
          </div>
          
          {/* Footer CTA Section with AOS */}
          <div className="footer-cta-section" data-aos="fade-up" data-aos-duration="900" data-aos-delay="500" data-aos-offset="50">
            <FooterCTA palette={palette} onOpen={open} />
          </div>
        </main>
      ) : (
        <main>
          <DetailPage route={route} onClose={() => navigate('home')} palette={palette} />
        </main>
      )}

      {!t.italics && (
        <style>{`.serif { font-style: normal !important; font-family: 'Red Hat Display', sans-serif !important; color: var(--ink) !important; }`}</style>
      )}
    </AOSWrapper>
  );
}

// Export AOS hook for use in other components
export { AOS };

// IMPORTANT: Make sure to export the App component
export default App;