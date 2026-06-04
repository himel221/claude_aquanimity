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

  // Single venture - Super Water
  const venture = {
    id: "superwater",
    n: "01",
    name: "Super Water",
    stage: "Scale",
    founded: "2024",
    location: "Dhaka, BD",
    tag: "Clean water technology",
    blurb: "Revolutionizing water purification with bio-inspired filtration membranes for arsenic and microplastic removal. Our technology provides clean, safe drinking water to communities across South Asia.",
    video: "/images/aquanimity_video.mp4" // Path to your video in images folder
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (onOpen) {
      onOpen('venture:' + venture.id);
    }
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (onOpen) {
      onOpen('ventures-list');
    }
  };

  return (
    <section
      ref={ref}
      id="ventures"
      style={{
        paddingTop: 120,
        paddingBottom: 140,
        background: 'var(--ink)',
        color: 'var(--paper)',
        fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif"
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 56
          }}
        >
          <div>
            <div
              className="label"
              style={{
                marginBottom: 18,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: 'rgba(255,255,255,0.55)',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 600
              }}
            >
              § 02 — Our Ventures
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: 'var(--paper)',
                maxWidth: 760,
                fontWeight: 900,
                fontFamily: "'Red Hat Display', sans-serif",
                margin: 0
              }}
            >
              <span style={{ fontWeight: 900, color: 'var(--paper)' }}>Building</span>{' '}
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
          <button
            onClick={handleViewAllClick}
            className="ulink"
            style={{
              fontWeight: 600,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontFamily: "'Red Hat Display', sans-serif",
              color: 'var(--paper)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: 0
            }}
          >
            View all ventures <Arrow />
          </button>
        </div>

        {/* Single Venture Layout: Video + Content */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: 56,
            alignItems: 'center'
          }}
        >
          {/* Left side - Video */}
          <div
            className="img-frame"
            style={{
              aspectRatio: '16 / 9',
              background: '#000',
              borderRadius: 24,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                animation: 'fadein .6s ease both'
              }}
            >
              <source src={venture.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(14,27,44,0.2) 0%, rgba(14,27,44,0.4) 100%)'
              }}
            />
            
            {/* Badges */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                left: 24,
                display: 'flex',
                gap: 10
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  padding: '6px 12px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: 999,
                  color: 'white',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500
                }}
              >
                {venture.n}
              </span>
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 999,
                  color: 'white',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500
                }}
              >
                {venture.stage.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            {/* Tag */}
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent-2)',
                marginBottom: 20,
                fontWeight: 600,
                fontFamily: "'Red Hat Display', sans-serif"
              }}
            >
              {venture.tag}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--paper)',
                margin: 0,
                marginBottom: 20,
                lineHeight: 1.1,
                fontFamily: "'Red Hat Display', sans-serif"
              }}
            >
              {venture.name}
            </h3>

            {/* Description - 1-2 lines */}
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: 28,
                maxWidth: '90%',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400
              }}
            >
              {venture.blurb}
            </p>

            {/* Explore More Button */}
            <button
              onClick={handleExploreClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'transparent',
                border: '1.5px solid var(--accent-2)',
                borderRadius: 999,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--paper)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: "'Red Hat Display', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-2)';
                e.currentTarget.style.gap = '14px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.gap = '10px';
              }}
            >
              Explore more <Arrow size={14} />
            </button>

            {/* Meta Info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                marginTop: 40,
                paddingTop: 32,
                borderTop: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 6,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 500
                  }}
                >
                  STAGE
                </div>
                <div style={{ fontSize: 14, color: 'var(--paper)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>{venture.stage}</div>
              </div>
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 6,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 500
                  }}
                >
                  FOUNDED
                </div>
                <div style={{ fontSize: 14, color: 'var(--paper)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>{venture.founded}</div>
              </div>
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 6,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 500
                  }}
                >
                  HQ
                </div>
                <div style={{ fontSize: 14, color: 'var(--paper)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>{venture.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadein {
          from { 
            opacity: 0; 
            transform: scale(1.02); 
          }
          to { 
            opacity: 1; 
            transform: none; 
          }
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
        
        @media (max-width: 980px) {
          #ventures [style*="grid-template-columns: 1.3fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          #ventures .wrap {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Ventures;