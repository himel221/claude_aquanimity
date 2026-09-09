import React, { useState, useEffect, useRef } from 'react';

// Arrow icon component
const Arrow = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Custom hook for reveal animation
const useReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
            }
          });
        },
        { threshold: 0.1 }
      );

      const reveals = ref.current.querySelectorAll(".reveal");
      reveals.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  return ref;
};

function Ventures({ palette, onOpen }) {
  const ref = useReveal();
  const [activeVenture, setActiveVenture] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});

  const ventures = [
    {
      id: "superwater",
      name: "SuperWater",
      tag: "Enhanced Water",
      blurb: "Patented and clinically validated. Following successful 150-participant human trials confirming benefits for hydration, post-meal glucose control, and heart health, our functional water has proven its efficacy. We are now preparing full-scale production to bring smarter daily wellness to everyone.",
      video: "#",
      bgImage: "/images/v2.png"
    },
    {
      id: "bluemicrobiome",
      name: "The Blue Microbiome Initiative",
      tag: "Environmental Remediation",
      blurb: "Engineering biology for a cleaner planet. By isolating and mutagenizing coastal bacteria that break down persistent PVC, PET, and polyurethane, we are decoding key genetic pathways to commercially produce powerful plastic-degrading enzymes for a waste-free future.",
      video: "#",
      bgImage: "/images/biom.png"
    },
    {
      id: "omnibio",
      name: "OmniBio",
      tag: "Computational Biology",
      blurb: "OmniBio is Aquanimity's computational biology platform unifying tools for drug discovery and protein engineering - including MolProfiler (a Docking and ADMET analysis tool), a mutation analysis engine, and an enzyme discovery platform. Core modules are functional, with integration underway toward a unified research workflow.",
      video: "#",
      bgImage: "/images/omics.png"
    },
    {
      id: "thermorevax",
      name: "ThermoReVaQ",
      tag: "Vaccine Engineering",
      blurb: "Reinventing vaccine delivery without the cold chain. Our breakthrough polymer replaces traditional LNPs, eliminating refrigeration requirements while enhancing bioavailability. We are developing next-generation mRNA, siRNA, and chimeric vaccines to make life-saving therapeutics accessible worldwide.",
      video: "#",
      bgImage: "/images/vaccinpng.png"
    }
  ];

  const currentVenture = ventures[activeVenture];

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (onOpen) {
      onOpen('venture:' + currentVenture.id);
    }
  };

  const handleVentureChange = (index) => {
    setActiveVenture(index);
    const img = new Image();
    img.src = ventures[index].bgImage;
    img.onload = () => {
      setImageLoaded(prev => ({ ...prev, [index]: true }));
    };
  };

  useEffect(() => {
    const img = new Image();
    img.src = ventures[0].bgImage;
    img.onload = () => {
      setImageLoaded(prev => ({ ...prev, [0]: true }));
    };
  }, []);

  return (
    <section
      ref={ref}
      id="ventures"
      className="ventures-section"
    >
      <div className="ventures-wrap">
        {/* Header */}
        <div className="reveal ventures-header">
          <div>
            <div className="ventures-label" style={{ color:'white' }}>
              § 02 — Our Ventures
            </div>
            <h2 className="ventures-heading">
              <span style={{ fontWeight: 900, color: 'white' }}>Building</span>{' '}
              <span
                className="serif"
                style={{
                  fontStyle: 'italic',
                  color: 'var(--accent-2)',
                  fontWeight: 400,
                  fontFamily: "'Times New Roman', Georgia, serif"
                }}
              >
                category-defining
              </span>
              <br />
              <span style={{ fontWeight: 900, color: 'var(--paper)' }}>ventures.</span>
            </h2>
          </div>
        </div>

        {/* Venture Navigation */}
        <div className="reveal ventures-nav">
          {ventures.map((venture, index) => (
            <button
              key={venture.id}
              onClick={() => handleVentureChange(index)}
              className={`venture-tab ${index === activeVenture ? 'active' : ''}`}
              onMouseEnter={(e) => {
                if (index !== activeVenture) {
                  e.currentTarget.style.borderColor = 'rgb(250, 247, 240)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== activeVenture) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }
              }}
            >
               {venture.name}
            </button>
          ))}
        </div>

        {/* Active Venture Content */}
        <div className="reveal venture-card">
          {/* Background Image */}
          <div
            className="venture-bg"
            style={{
              backgroundImage: `url(${currentVenture.bgImage})`,
              opacity: imageLoaded[activeVenture] ? 1 : 0,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="venture-gradient" />
          
          {/* Subtle Border */}
          <div className="venture-border" />

          {/* Content */}
          <div className="venture-content">
            <div className="venture-tag">
              {currentVenture.tag}
            </div>

            <h3 className="venture-title">
              {currentVenture.name}
            </h3>

            <p className="venture-blurb">
              {currentVenture.blurb}
            </p>
          </div>

          {/* Decorative Number */}
          <div className="venture-deco-number">
            {currentVenture.n}
          </div>

          {/* Accent Line */}
          <div className="venture-accent-line" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== DESKTOP — compact spacing ===== */
        .ventures-section {
          padding: 36px 0 36px;
          background: #181A43;
          color: var(--paper);
          font-family: 'Red Hat Display', 'Red Hat Display Variable', sans-serif;
          overflow: visible;
        }

        .ventures-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .ventures-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .ventures-label {
          margin-bottom: 10px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--paper);
          font-family: 'Red Hat Display', sans-serif;
          font-weight: 600;
        }

        .ventures-heading {
          font-size: clamp(30px, 3vw, 58px);
          line-height: 0.98;
          letter-spacing: -0.03em;
          color: var(--paper);
          max-width: 760px;
          font-weight: 900;
          font-family: 'Red Hat Display', sans-serif;
          margin: 0;
        }

        .ventures-nav {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .venture-tab {
          padding: 10px 24px;
          border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: transparent;
          color: var(--paper);
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          font-family: 'Red Hat Display', sans-serif;
        }

        .venture-tab.active {
          border-color: rgb(250, 247, 240);
          background: rgb(250, 247, 240);
          color: var(--ink);
        }

        .venture-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 400px;
          display: flex;
          align-items: center;
          padding: 36px 40px;
          background: linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.7) 100%);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        .venture-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: opacity 0.8s ease;
          transform: scale(1.05);
          filter: brightness(0.7) saturate(1.1);
        }

        .venture-gradient {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.6) 100%);
          z-index: 1;
        }

        .venture-border {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          z-index: 3;
          pointer-events: none;
        }

        .venture-content {
          position: relative;
          z-index: 2;
          max-width: 60%;
          animation: fadeInUp 0.6s ease;
        }

        .venture-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-2);
          margin-bottom: 12px;
          font-weight: 600;
          font-family: 'Red Hat Display', sans-serif;
          background: rgba(0,0,0,0.3);
          padding: 6px 16px;
          border-radius: 999px;
          backdrop-filter: blur(10px);
        }

        .venture-title {
          font-size: clamp(36px, 4.5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--paper);
          margin: 0 0 12px 0;
          line-height: 1.08;
          font-family: 'Red Hat Display', sans-serif;
          text-shadow: 0 2px 30px rgba(0,0,0,0.3);
        }

        .venture-blurb {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          margin: 0;
          max-width: 90%;
          font-family: 'Red Hat Display', sans-serif;
          font-weight: 400;
          text-shadow: 0 1px 20px rgba(0,0,0,0.2);
          text-align: justify;
          text-justify: inter-word;
        }

        .venture-deco-number {
          position: absolute;
          right: 40px;
          bottom: 28px;
          font-size: 72px;
          font-weight: 900;
          color: rgba(255,255,255,0.04);
          font-family: 'Red Hat Display', sans-serif;
          letter-spacing: -0.05em;
          z-index: 1;
          user-select: none;
          text-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }

        .venture-accent-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--accent-2), transparent);
          z-index: 2;
          opacity: 0.5;
        }

        /* ===== TABLET (≤980px) ===== */
        @media (max-width: 980px) {
          .ventures-section {
            padding: 60px 0 64px !important;
          }

          .ventures-wrap {
            padding: 0 20px !important;
          }

          .ventures-header {
            margin-bottom: 28px !important;
          }

          .venture-card {
            padding: 36px !important;
            min-height: 360px !important;
            border-radius: 20px !important;
          }

          .venture-content {
            max-width: 80% !important;
          }

          .venture-blurb {
            max-width: 100% !important;
            font-size: 15px !important;
          }

          .venture-deco-number {
            font-size: 56px !important;
            right: 24px !important;
            bottom: 24px !important;
          }
        }

        /* ===== MOBILE (≤768px) ===== */
        @media (max-width: 768px) {
          .ventures-section {
            padding: 40px 0 44px !important;
          }

          .ventures-wrap {
            padding: 0 16px !important;
          }

          .ventures-header {
            margin-bottom: 20px !important;
          }

          .ventures-label {
            margin-bottom: 10px !important;
            font-size: 10px !important;
          }

          .ventures-nav {
            gap: 6px !important;
            margin-bottom: 20px !important;
          }

          .venture-tab {
            padding: 8px 16px !important;
            font-size: 12px !important;
          }

          .venture-card {
            padding: 22px !important;
            min-height: auto !important;
            border-radius: 18px !important;
            align-items: flex-start !important;
          }

          .venture-content {
            max-width: 100% !important;
          }

          .venture-tag {
            font-size: 9px !important;
            padding: 5px 12px !important;
            margin-bottom: 10px !important;
          }

          .venture-title {
            font-size: 24px !important;
            margin-bottom: 10px !important;
          }

          .venture-blurb {
            font-size: 13.5px !important;
            line-height: 1.6 !important;
            max-width: 100% !important;
          }

          .venture-deco-number {
            font-size: 36px !important;
            right: 14px !important;
            bottom: 14px !important;
          }

          .ventures-heading {
            font-size: clamp(28px, 8vw, 42px) !important;
            line-height: 1.04 !important;
          }
        }

        /* ===== SMALL MOBILE (≤480px) ===== */
        @media (max-width: 480px) {
          .ventures-section {
            padding: 32px 0 36px !important;
          }

          .ventures-header {
            margin-bottom: 16px !important;
          }

          .ventures-nav {
            gap: 5px !important;
            margin-bottom: 16px !important;
          }

          .venture-tab {
            padding: 7px 13px !important;
            font-size: 11px !important;
          }

          .venture-card {
            padding: 18px 16px !important;
            border-radius: 16px !important;
          }

          .venture-tag {
            font-size: 8.5px !important;
            padding: 4px 10px !important;
            margin-bottom: 8px !important;
          }

          .venture-title {
            font-size: 24px !important;
            margin-bottom: 8px !important;
          }

          .venture-blurb {
            font-size: 13px !important;
            line-height: 1.55 !important;
          }

          .venture-deco-number {
            font-size: 28px !important;
            right: 12px !important;
            bottom: 10px !important;
          }

          .ventures-heading {
            font-size: clamp(24px, 9vw, 36px) !important;
            line-height: 1.06 !important;
          }
        }

        /* ===== EXTRA SMALL (≤360px) ===== */
        @media (max-width: 360px) {
          .ventures-section {
            padding: 28px 0 32px !important;
          }

          .venture-card {
            padding: 16px 14px !important;
          }

          .venture-title {
            font-size: 20px !important;
          }

          .venture-blurb {
            font-size: 12.5px !important;
          }

          .ventures-heading {
            font-size: clamp(20px, 7vw, 28px) !important;
            line-height: 1.08 !important;
          }

          .venture-tab {
            padding: 6px 11px !important;
            font-size: 10.5px !important;
          }
        }

        /* Touch devices */
        @media (hover: none) {
          .venture-tab:active {
            transform: scale(0.96);
          }
        }
      `}</style>
    </section>
  );
}

export default Ventures;