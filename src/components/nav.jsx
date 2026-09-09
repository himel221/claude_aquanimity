import React, { useState, useEffect } from 'react';

function Nav({ onNavigate, route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const items = [
    { 
      id: 'institutes', 
      label: 'Institutes',
      description: 'Centers of excellence driving research and innovation'
    },
    { 
      id: 'ventures', 
      label: 'Ventures',
      description: 'Strategic investments shaping tomorrow\'s industries'
    },
    { 
      id: 'team', 
      label: 'Team',
      description: 'Passionate experts committed to making a difference'
    },
    { 
      id: 'partners', 
      label: 'Partners',
      description: 'Trusted collaborations that amplify our impact'
    },
  ];

  const go = (id) => {
    setOpen(false);
    document.body.style.overflow = 'unset';

    if (route !== 'home') {
      onNavigate('home', id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = 'unset';
    onNavigate('home');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
        <div className="nav-container">
          <a href="#hero" onClick={handleHomeClick} className="logo-wrap">
            <div className="logo-icon">
              <img 
                src="/images/logo1.png" 
                alt="Aquanimity Logo"
                className="logo-img"
              />
            </div>
          </a>
          
          <div className="nav-desktop">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ===== PROFESSIONAL HAMBURGER / CLOSE BUTTON ===== */}
          <button 
            className={`menu-btn ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            <span className="menu-btn__icon">
              <svg className="menu-icon hamburger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
              <svg className="menu-icon close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </button>
        </div>

        <div className={`mobile-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)}></div>

        <div className={`mobile-menu ${open ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-subtitle" style={{ 
  display: 'flex', 
  alignItems: 'center', 
  gap: '8px'
}}>
  <span style={{ 
    fontFamily: "'Red Hat Display', sans-serif", 
    fontWeight: 800 
  }}>
    Explore
  </span>
  <img 
    src={process.env.PUBLIC_URL + '/images/logo1.png'} 
    alt="AQUANIMITY BIOHUBS™" 
    style={{ 
      height: '20px', 
      width: 'auto',
      objectFit: 'contain'
    }}
    onError={(e) => {
      e.target.style.display = 'none';
    }}
  />
</span>
          </div>
          
          <div className="mobile-menu-inner">
            {items.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="mobile-nav-link"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                <div className="mobile-nav-content">
                  <div className="mobile-nav-header">
                    <span className="mobile-nav-number">0{index + 1}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                    <svg className="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <span className="mobile-nav-description">{item.description}</span>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mobile-menu-footer">
            <div className="mobile-menu-social">
                           <a 
                href="https://www.linkedin.com/company/aquanimitygroup/about/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: 14, 
                  color: '#0E1136',
                  textDecoration: 'none',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 400,
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  display: 'inline-block'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#0E1136'}
              >
                LinkedIn
              </a>
            </div>
            <div className="mobile-menu-copyright">
              <span>&copy; 2026 Aquanimity. All rights reserved.</span>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        :root {
          --bg: #e8e3d9;
          --text: #0f172a;
          --muted: #667085;
          --line: rgba(15, 23, 42, 0.08);
          --dark: #0d1b2a;
          --primary: #1a3a4a;
          --card-bg: rgba(255, 255, 255, 0.3);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          background: transparent;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: visible;
        }

        .nav.scrolled {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background:white;
          border-bottom: 1px solid var(--line);
        }

        .nav.menu-open {
          background: var(--bg);
        }

        .nav-container {
          max-width: 1440px;
          margin: 0 auto;
          height: 80px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          width: 100%;
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: all 0.3s ease;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: #0E1136;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.3px;
          padding: 4px 0;
          transition: 0.25s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background: var(--dark);
          transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* ===== PROFESSIONAL MENU BUTTON ===== */
        .menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.06);
          cursor: pointer;
          padding: 10px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          z-index: 1001;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          margin-left: -16px;
        }

        .menu-btn:hover {
          background: rgba(15, 23, 42, 0.08);
          border-color: rgba(15, 23, 42, 0.12);
          transform: scale(1.02);
        }

        .menu-btn:active {
          transform: scale(0.95);
        }

        .menu-btn.active {
          background: rgba(15, 23, 42, 0.08);
          border-color: rgba(15, 23, 42, 0.12);
        }

        .menu-btn__icon {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-icon {
          position: absolute;
          width: 24px;
          height: 24px;
          color: var(--text);
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .hamburger {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        .close-icon {
          opacity: 0;
          transform: rotate(-90deg) scale(0.8);
        }

        .menu-btn.active .hamburger {
          opacity: 0;
          transform: rotate(90deg) scale(0.8);
        }

        .menu-btn.active .close-icon {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        /* ===== MOBILE OVERLAY ===== */
        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: none;
          z-index: 998;
        }

        .mobile-overlay.open {
          display: block;
          opacity: 1;
          pointer-events: auto;
        }

        /* ===== MOBILE MENU ===== */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 480px;
          height: 100vh;
          background: white;
          padding: 80px 32px 32px;
          transition: right 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 999;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: -30px 0 80px rgba(0, 0, 0, 0.15);
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu-header {
          margin-bottom: 36px;
          padding-bottom: 24px;
          border-bottom: 2px solid var(--line);
        }

        .mobile-menu-title {
          display: block;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: var(--muted);
          margin-bottom: 6px;
        }

        .mobile-menu-subtitle {
          display: block;
          font-size: 32px;
          font-weight: 700;
          color: #0E1136;
          letter-spacing: -0.5px;
        }

        .mobile-menu-inner {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          padding: 4px 0;
        }

        .mobile-nav-link {
          display: block;
          padding: 14px 18px;
          text-decoration: none;
          color: #0E1136;
          border-radius: 14px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
          transform: translateX(30px) scale(0.96);
          animation: slideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          border: 1px solid transparent;
          position: relative;
          background: transparent;
        }

        .mobile-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, 0.08));
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 14px;
        }

        .mobile-nav-link:hover::before,
        .mobile-nav-link:active::before {
          opacity: 1;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link:active {
          transform: translateX(6px) scale(1.01);
          border-color: var(--line);
          background: rgba(15, 23, 42, 0.02);
        }

        .mobile-nav-content {
          position: relative;
          z-index: 1;
        }

        .mobile-nav-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 4px;
        }

        .mobile-nav-number {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          min-width: 30px;
          font-feature-settings: "tnum";
          letter-spacing: 0.5px;
        }

        .mobile-nav-label {
          flex: 1;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.3px;
          color: var(--text);
        }

        .mobile-nav-arrow {
          width: 20px;
          height: 20px;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          color: var(--muted);
          flex-shrink: 0;
        }

        .mobile-nav-link:hover .mobile-nav-arrow,
        .mobile-nav-link:active .mobile-nav-arrow {
          opacity: 1;
          transform: translateX(4px);
          color: var(--text);
        }

        .mobile-nav-description {
          display: block;
          font-size: 13px;
          font-weight: 400;
          color: var(--muted);
          padding-left: 46px;
          line-height: 1.5;
          letter-spacing: 0.2px;
          transition: color 0.3s ease;
        }

        .mobile-nav-link:hover .mobile-nav-description,
        .mobile-nav-link:active .mobile-nav-description {
          color: var(--text);
        }

        .mobile-menu-footer {
          margin-top: auto;
          padding-top: 28px;
          border-top: 2px solid var(--line);
        }

        .mobile-menu-social {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;
        }

        .social-link {
          text-decoration: none;
          color: var(--muted);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          padding: 4px 0;
          position: relative;
        }

        .social-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: var(--text);
          transition: width 0.3s ease;
        }

        .social-link:hover {
          color: var(--text);
        }

        .social-link:hover::after {
          width: 100%;
        }

        .mobile-menu-copyright {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.3px;
          opacity: 0.6;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* Custom scrollbar for mobile menu */
        .mobile-menu::-webkit-scrollbar {
          width: 3px;
        }

        .mobile-menu::-webkit-scrollbar-track {
          background: transparent;
        }

        .mobile-menu::-webkit-scrollbar-thumb {
          background: var(--line);
          border-radius: 10px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .nav-desktop {
            gap: 28px;
          }
          
          .nav-link {
            font-size: 15px;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            height: 72px;
            padding: 0 20px;
          }

          .nav-desktop {
            display: none;
          }

          .menu-btn {
            display: flex;
            padding: 8px;
            width: 44px;
            height: 44px;
            margin-left: 0;
            margin-right: -4px;
          }

          .logo-img {
            height: 40px;
          }

          .nav.scrolled {
            background: white;
          }

          .mobile-menu {
            padding: 76px 24px 28px;
            width: 88%;
            max-width: 400px;
          }

          .mobile-menu-subtitle {
            font-size: 26px;
          }

          .mobile-nav-label {
            font-size: 18px;
          }

          .mobile-nav-description {
            font-size: 12px;
            padding-left: 42px;
          }

          .mobile-nav-number {
            font-size: 11px;
            min-width: 26px;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            height: 64px;
            padding: 0 16px;
          }

          .logo-img {
            height: 34px;
          }

          .menu-btn {
            padding: 6px;
            width: 40px;
            height: 40px;
            margin-left: 0;
            border-radius: 10px;
          }

          .menu-btn__icon {
            width: 20px;
            height: 20px;
          }

          .menu-icon {
            width: 20px;
            height: 20px;
          }

          .mobile-menu {
            padding: 68px 18px 24px;
            width: 92%;
            max-width: 360px;
          }

          .mobile-menu-title {
            font-size: 11px;
            letter-spacing: 2px;
          }

          .mobile-menu-subtitle {
            font-size: 22px;
          }

          .mobile-nav-link {
            padding: 12px 14px;
          }

          .mobile-nav-label {
            font-size: 16px;
          }

          .mobile-nav-description {
            font-size: 11px;
            padding-left: 38px;
          }

          .mobile-nav-number {
            font-size: 10px;
            min-width: 22px;
          }

          .mobile-menu-social {
            gap: 16px;
          }

          .social-link {
            font-size: 12px;
          }

          .mobile-menu-copyright {
            font-size: 10px;
          }
        }

        @media (max-width: 380px) {
          .nav-container {
            height: 58px;
            padding: 0 12px;
          }

          .logo-img {
            height: 28px;
          }

          .menu-btn {
            padding: 4px;
            width: 36px;
            height: 36px;
            margin-right: 30px;
            border-radius: 8px;
          }

          .menu-btn__icon {
            width: 18px;
            height: 18px;
          }

          .menu-icon {
            width: 18px;
            height: 18px;
          }

          .mobile-menu {
            padding: 60px 14px 20px;
            width: 95%;
            max-width: 320px;
          }

          .mobile-menu-subtitle {
            font-size: 20px;
          }

          .mobile-nav-link {
            padding: 10px 12px;
          }

          .mobile-nav-label {
            font-size: 15px;
          }

          .mobile-nav-description {
            font-size: 10px;
            padding-left: 34px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) {
          .mobile-nav-link:hover {
            transform: none;
            border-color: transparent;
            background: transparent;
          }
          
          .mobile-nav-link:hover::before {
            opacity: 0;
          }
          
          .mobile-nav-link:active {
            transform: translateX(4px);
            border-color: var(--line);
            background: rgba(15, 23, 42, 0.02);
          }
          
          .mobile-nav-link:active::before {
            opacity: 1;
          }
          
          .mobile-nav-link:hover .mobile-nav-arrow {
            opacity: 0;
            transform: none;
          }
          
          .mobile-nav-link:active .mobile-nav-arrow {
            opacity: 1;
            transform: translateX(4px);
          }
          
          .mobile-nav-link:hover .mobile-nav-description {
            color: var(--muted);
          }
          
          .mobile-nav-link:active .mobile-nav-description {
            color: var(--text);
          }
        }
      `}</style>
    </>
  );
}

export default Nav;