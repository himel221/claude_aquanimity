import React, { useState, useEffect, useRef } from 'react';

// Arrow icon component
const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function Partners({ palette, onOpen }) {
  const ref = useReveal();
  const [selectedStat, setSelectedStat] = useState(null);
  
  // Partner data with images from images folder
  const partnerItems = [
    {
      name: "ABRI",
      short: "ABRI",
      kind: "Research Partner",
      blurb: "Leading international health research institution.",
      loc: "Dhaka, BD",
      since: "2024",
      logo: "/images/ibr.jpeg"
    },
    {
      name: "IQC",
      short: "IQC",
      kind: "Implementation Partner",
      blurb: "Global development organization based in Bangladesh.",
      loc: "Dhaka, BD",
      since: "2024",
      logo: "/images/iqc.jpeg"
    },
    {
      name: "Heart Foundation Bangladesh",
      short: "Heart Foundation Bangladesh",
      kind: "Academic Partner",
      blurb: "World-leading research university.",
      loc: "Boston, USA",
      since: "2024",
      logo: "/images/heart.jpeg"
    },
    {
      name: "Diabetics Association of Bangladesh",
      short: "Diabetics Association of Bangladesh",
      kind: "Academic Partner",
      blurb: "Leading Asian university.",
      loc: "Bangladesh",
      since: "2024",
      logo: "/images/dia.jpeg"
    },
    {
      name: "Centre for Global Health Research",
      short: "Centre for Global Health Research",
      kind: "Academic Partner",
      blurb: "Leading research institution in bioengineering.",
      loc: "California, USA",
      since: "2024",
      logo: "/images/cghr.jpeg"
    },
    {
      name: "BioEngineering",
      short: "DU",
      kind: "Academic Partner",
      blurb: "Premier public university in Bangladesh.",
      loc: "Dhaka, BD",
      since: "2024",
      logo: "/images/bio.jpeg"
    }
  ];

  // Stats data with details
  const statsData = [
    {
      label: 'SCIENTIFIC PUBLICATIONS',
      value: '120+',
      details: {
        title: 'Scientific Publications',
        description: 'Our researchers have published over 120 peer-reviewed papers in leading scientific journals including Nature, Cell, Science, and The Lancet. These publications span synthetic biology, drug discovery, bioinformatics, and clinical research.',
        highlights: [
          '35 papers in high-impact journals (IF > 10)',
          '18 collaborative publications with partner institutions',
          '22 conference proceedings and presentations',
          '45 papers in regional and specialized journals',
          '4 patent applications filed'
        ],
        imagePlaceholder: "📚"
      }
    },
    {
      label: 'PARTNER INSTITUTIONS',
      value: '24',
      details: {
        title: 'Partner Institutions',
        description: 'We collaborate with 24 leading academic, research, and implementation partners across 6 countries. Our network includes universities, research hospitals, government agencies, and industry partners.',
        highlights: [
          '8 International Research Universities',
          '6 Healthcare & Hospital Networks',
          '5 Government & Development Agencies',
          '3 Biotech Industry Partners',
          '2 Non-profit Research Organizations'
        ],
        imagePlaceholder: "🤝"
      }
    },
    {
      label: 'COUNTRIES OPERATING',
      value: '6',
      details: {
        title: 'Countries Operating',
        description: 'Our research and operations span across 6 countries, with major hubs in South Asia, Southeast Asia, North America, and Europe. This global presence enables diverse collaborations and impact.',
        highlights: [
          '🇧🇩 Bangladesh - Dhaka (Headquarters)',
          '🇸🇬 Singapore - Regional Hub',
          '🇺🇸 United States - Boston & San Francisco',
          '🇬🇧 United Kingdom - London',
          '🇨🇦 Canada - Toronto',
          '🇦🇺 Australia - Sydney'
        ],
        imagePlaceholder: "🌍"
      }
    }
  ];

  // Create enough copies for seamless infinite scrolling
  const items = [...partnerItems, ...partnerItems, ...partnerItems, ...partnerItems];

  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const speed = 0.5;

  // Start animation when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Continuous infinite animation - seamless loop
  useEffect(() => {
    if (!isVisible || !trackRef.current || partnerItems.length === 0) return;
    
    const track = trackRef.current;
    const cardWidth = 220;
    const gap = 24;
    const singleSetWidth = (cardWidth + gap) * partnerItems.length;
    
    positionRef.current = 0;
    
    const animate = () => {
      if (!paused && track) {
        positionRef.current -= speed;
        
        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current += singleSetWidth;
        }
        
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [paused, isVisible, partnerItems.length]);

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (onOpen) onOpen('partners-list');
  };

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
  };

  const handleCloseModal = () => {
    setSelectedStat(null);
  };

  return (
    <>
      <section 
        ref={ref} 
        id="partners" 
        style={{ 
          paddingTop: 120, 
          paddingBottom: 120, 
          background: '#ece8df', 
          overflow: 'hidden',
          fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif"
        }}
      >
        <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <div className="label" style={{ marginBottom: 18, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0E1B2C", fontWeight: 600, fontFamily: "'Red Hat Display', sans-serif" }}>
                § 04 — Our Partners
              </div>
              <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: 720, fontWeight: 900, color: "#0E1B2C", fontFamily: "'Red Hat Display', sans-serif", margin: 0 }}>
                Partnering with leading{' '}
                <span className="serif" style={{ fontStyle: 'italic', color: "#1F6E7A", fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                  institutions.
                </span>
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
                color: "#0E1B2C",
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: 0
              }}
            >
              View all partners <Arrow />
            </button>
          </div>
        </div>

        {/* Marquee Container - True Seamless Infinite Loop */}
        <div 
          ref={containerRef}
          className="reveal" 
          onMouseEnter={() => setPaused(true)} 
          onMouseLeave={() => setPaused(false)}
          style={{ overflow: 'hidden', position: 'relative', marginTop: 24, width: '100%' }}
        >
          <div 
            ref={trackRef} 
            style={{ 
              display: 'flex', 
              gap: 24, 
              willChange: 'transform',
              width: 'max-content'
            }}
          >
            {items.map((p, i) => (
              <div
                key={i}
                onClick={() => onOpen && onOpen('partner:' + p.short)}
                style={{
                  flex: '0 0 auto',
                  width: 220,
                  height: 140,
                  background: '#ffffff',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                  const overlay = e.currentTarget.querySelector('.hover-overlay');
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                  const overlay = e.currentTarget.querySelector('.hover-overlay');
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                <img 
                  src={p.logo} 
                  alt={p.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    if (parent) {
                      const fallback = parent.querySelector('.fallback-text');
                      if (fallback) fallback.style.display = 'flex';
                    }
                  }}
                />
                <div 
                  className="fallback-text"
                  style={{
                    display: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0E1B2C',
                    textAlign: 'center',
                    padding: 8,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {p.name}
                </div>
                <div 
                  className="hover-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(31,110,122,0.08), rgba(31,110,122,0.04))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    borderRadius: 16
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Edge fades for smooth visual effect */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: 100, 
            height: '100%', 
            background: 'linear-gradient(90deg, #ece8df, transparent)', 
            pointerEvents: 'none',
            zIndex: 2
          }} />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: 100, 
            height: '100%', 
            background: 'linear-gradient(270deg, #ece8df, transparent)', 
            pointerEvents: 'none',
            zIndex: 2
          }} />
        </div>

        {/* Quote and Stats Section - Clickable Stats */}
        <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", marginTop: 64 }}>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <div>
              <div className="serif" style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.01em', color: "#0E1B2C", fontFamily: "'Red Hat Display', sans-serif" }}>
                "A bioeconomy worthy of the Bay of Bengal — engineered with the discipline of a global lab and the urgency of a delta nation."
              </div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: '#0E1B2C', marginTop: 24, fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
                — DR. RAFIA AHMED · CHAIR, NATIONAL BIOECONOMY COUNCIL
              </div>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              {statsData.map((m, i) => (
                <div 
                  key={i} 
                  onClick={() => handleStatClick(m)}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '18px 0', 
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderRadius: 8
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(31,110,122,0.05)';
                    e.currentTarget.style.paddingLeft = '12px';
                    e.currentTarget.style.paddingRight = '12px';
                    const arrow = e.currentTarget.querySelector('.stat-arrow');
                    if (arrow) arrow.style.opacity = '1';
                    const value = e.currentTarget.querySelector('.stat-value');
                    if (value) value.style.color = '#1F6E7A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.paddingLeft = '0';
                    e.currentTarget.style.paddingRight = '0';
                    const arrow = e.currentTarget.querySelector('.stat-arrow');
                    if (arrow) arrow.style.opacity = '0';
                    const value = e.currentTarget.querySelector('.stat-value');
                    if (value) value.style.color = '#0E1B2C';
                  }}
                >
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: '#0E1B2C', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
                    {m.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#0E1B2C", fontFamily: "'Red Hat Display', sans-serif", transition: 'color 0.3s ease' }} className="stat-value">
                      {m.value}
                    </div>
                    <span 
                      className="stat-arrow"
                      style={{ 
                        opacity: 0, 
                        transition: 'opacity 0.3s ease',
                        fontSize: 18,
                        color: '#1F6E7A'
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }
          .reveal.in {
            opacity: 1;
            transform: translateY(0);
          }
          
          @media (max-width: 900px) {
            #partners > .wrap > div:last-child {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
          }
          
          @media (max-width: 600px) {
            #partners .wrap {
              padding: 0 20px !important;
            }
          }
        `}</style>
      </section>

      {/* Stat Details Modal */}
      {selectedStat && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease',
            fontFamily: "'Red Hat Display', sans-serif"
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              maxWidth: 600,
              width: '100%',
              maxHeight: '85vh',
              background: '#FAF7F0',
              borderRadius: 32,
              overflow: 'auto',
              position: 'relative',
              animation: 'slideUp 0.4s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: 20,
                border: 'none',
                background: 'rgba(0,0,0,0.05)',
                cursor: 'pointer',
                fontSize: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10,
                color: '#07152b',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{ padding: '48px 40px' }}>
              {/* Header */}
              <div style={{ marginBottom: 28, textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 48,
                    marginBottom: 16
                  }}
                >
                  {selectedStat.details.imagePlaceholder}
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(28px, 5vw, 36px)',
                    lineHeight: 1.2,
                    marginTop: 16,
                    marginBottom: 16,
                    color: '#07152b',
                    fontWeight: 700,
                    fontFamily: "'Red Hat Display', sans-serif",
                    textAlign: 'center'
                  }}
                >
                  {selectedStat.details.title}
                </h2>
                <div
                  style={{
                    width: 60,
                    height: 3,
                    background: '#1F6E7A',
                    borderRadius: 2,
                    margin: '0 auto'
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: 32 }}>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: '#4a5568',
                    marginBottom: 24,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}
                >
                  {selectedStat.details.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div style={{ marginBottom: 32 }}>
                <h4
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#07152b',
                    marginBottom: 16,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  Key Highlights
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gap: 12
                  }}
                >
                  {selectedStat.details.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 14px',
                        background: 'rgba(31,110,122,0.08)',
                        borderRadius: 12,
                        fontSize: 14,
                        color: '#1F6E7A',
                        fontWeight: 500,
                        fontFamily: "'Red Hat Display', sans-serif"
                      }}
                    >
                      <span style={{ fontSize: 16 }}>✦</span>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCloseModal}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#09182d',
                  color: 'white',
                  border: 'none',
                  borderRadius: 40,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: 8,
                  fontFamily: "'Red Hat Display', sans-serif"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1F6E7A'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#09182d'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default Partners;