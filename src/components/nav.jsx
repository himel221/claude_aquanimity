import React, { useState, useEffect } from 'react';
import { Mark, Arrow } from './primitives';

function Nav({ onNavigate, route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'superwater', label: 'SuperWater' },
    { id: 'institutes', label: 'Institutes' },
    { id: 'ventures', label: 'Ventures' },
    { id: 'team', label: 'Team' },
    { id: 'partners', label: 'Partners' },

  ];

  const go = (id) => {
    setOpen(false);

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
    onNavigate('home');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">

          {/* LOGO with fixed size */}
          <a href="#hero" onClick={handleHomeClick} className="logo-wrap">
            <div className="logo-icon">
              <img 
                src="/images/logo1.png" 
                alt="Aquanimity Logo"
                className="logo-img"
              />
            </div>
          </a>
          
          {/* DESKTOP MENU */}
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

          {/* MOBILE BUTTON */}
          <button
            className="mobile-btn"
            onClick={() => setOpen(!open)}
          >
            MENU
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="mobile-menu">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        :root {
          --bg: #e8e3d9;
          --text: #0f172a;
          --muted: #667085;
          --line: rgba(15, 23, 42, 0.08);
          --dark: #0d1b2a;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: transparent;
          transition: all 0.35s ease;
        }

        .nav.scrolled {
          backdrop-filter: blur(10px);
          background: rgba(232, 227, 217, 0.92);
          border-bottom: 1px solid var(--line);
        }

        .nav-container {
          max-width: 1440px;
          margin: auto;
          height: 92px;
          padding: 0 42px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* LOGO - FIXED SIZE */
        .logo-wrap {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-img {
          width: 240px;
          object-fit: contain;
          display: block;
        }

        /* DESKTOP MENU */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 42px;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: var(--text);
          font-size: 17px;
          transition: 0.25s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 1px;
          background: var(--text);
          transition: 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .partner-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          padding: 16px 28px;
          border-radius: 999px;

          background: var(--dark);
          color: white;
          text-decoration: none;

          font-size: 16px;
          font-weight: 600;

          transition: all 0.3s ease;
        }

        .partner-btn:hover {
          transform: translateY(-2px);
          opacity: 0.95;
        }

        /* MOBILE */
        .mobile-btn {
          display: none;
          border: none;
          background: var(--dark);
          color: white;
          padding: 12px 18px;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 600;
        }

        .mobile-menu {
          display: none;
        }

        /* RESPONSIVE */
        @media (max-width: 980px) {
          .nav-container {
            padding: 0 20px;
            height: 82px;
          }

          .nav-desktop {
            display: none;
          }

          .mobile-btn {
            display: inline-flex;
          }

          .mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 20px;

            padding: 30px 20px;

            background: var(--bg);
            border-top: 1px solid var(--line);
          }

          .mobile-menu a {
            text-decoration: none;
            color: var(--text);
            font-size: 22px;
            font-weight: 600;
          }

          /* Adjust logo size for mobile */
          .logo-img {
            width: 40px;
            height: 40px;
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          .logo-img {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}

export default Nav;