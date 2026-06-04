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

function Team({ palette, onOpen }) {
  const ref = useReveal();
  
  // Safe data loading
  let team = {};
  try {
    const dataElement = document.getElementById('aquanimity-data');
    if (dataElement && dataElement.textContent) {
      const data = JSON.parse(dataElement.textContent);
      team = data.team || {};
    }
  } catch (error) {
    console.error("Failed to load team data:", error);
  }

  // Enhanced fallback team data with more info
  if (Object.keys(team).length === 0) {
    team = {
      "Founding Scientists": [
        {
          name: "Dr. Rafia Ahmed",
          title: "CEO & Founder",
          img: "https://randomuser.me/api/portraits/women/68.jpg",
          linkedin: "https://linkedin.com",
          education: "Ph.D. MIT | Harvard Medical School",
          expertise: "Synthetic Biology, Drug Discovery",
          location: "Boston, MA"
        },
        {
          name: "Dr. Shahidul Islam",
          title: "Chief Scientific Officer",
          img: "https://randomuser.me/api/portraits/men/32.jpg",
          linkedin: "https://linkedin.com",
          education: "Ph.D. Stanford | Postdoc, Cambridge",
          expertise: "Bioengineering, CRISPR Technologies",
          location: "Singapore"
        },
        {
          name: "Sarah Khan",
          title: "Chief Operating Officer",
          img: "https://randomuser.me/api/portraits/women/45.jpg",
          linkedin: "https://linkedin.com",
          education: "MBA, Harvard Business School",
          expertise: "Biotech Operations, Scale-up",
          location: "London, UK"
        }
      ],
      "Science": [
        {
          name: "Dr. Tania Rahman",
          title: "Lead, Synthetic Biology",
          img: "https://randomuser.me/api/portraits/women/52.jpg",
          linkedin: "https://linkedin.com",
          education: "Ph.D. Oxford | Research Fellow, MIT",
          expertise: "Gene Circuits, Metabolic Engineering",
          location: "Boston, MA"
        },
        {
          name: "Dr. Michael Chen",
          title: "Lead, AI & Bioinformatics",
          img: "https://randomuser.me/api/portraits/men/75.jpg",
          linkedin: "https://linkedin.com",
          education: "Ph.D. Carnegie Mellon",
          expertise: "Machine Learning, Protein Design",
          location: "San Francisco, CA"
        }
      ],
      "Operations": [
        {
          name: "Farhan Ahmed",
          title: "Head of Operations",
          img: "https://randomuser.me/api/portraits/men/41.jpg",
          linkedin: "https://linkedin.com",
          education: "MSc. Supply Chain, MIT",
          expertise: "Logistics, Quality Assurance",
          location: "Dhaka, Bangladesh"
        }
      ]
    };
  }

  const categories = Object.keys(team);
  const [cat, setCat] = useState(categories[0] || "Leadership");
  const members = team[cat] || [];

  // Marquee animation with seamless loop
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const speed = 0.8; // pixels per frame

  useEffect(() => {
    if (!members.length || !trackRef.current) return;

    // Calculate total width of original set
    let totalWidth = 0;
    const children = trackRef.current.children;
    
    // Get width of one set of members
    for (let i = 0; i < members.length; i++) {
      if (children[i]) {
        totalWidth += children[i].offsetWidth + 24; // 24px gap
      }
    }

    // Duplicate content for seamless loop
    const cloneContent = () => {
      if (!trackRef.current) return;
      
      // Clear existing clones except original
      const originalChildren = Array.from(trackRef.current.children);
      if (originalChildren.length > members.length) {
        for (let i = originalChildren.length - 1; i >= members.length; i--) {
          trackRef.current.removeChild(originalChildren[i]);
        }
      }
      
      // Add clones until we have enough width for smooth scrolling
      const clonesNeeded = Math.ceil(window.innerWidth / totalWidth) + 2;
      for (let i = 0; i < clonesNeeded; i++) {
        for (let j = 0; j < members.length; j++) {
          const clone = originalChildren[j].cloneNode(true);
          trackRef.current.appendChild(clone);
        }
      }
    };

    cloneContent();

    const animate = () => {
      if (!paused && trackRef.current) {
        positionRef.current -= speed;
        
        // Get width of one set
        let singleSetWidth = 0;
        const firstChildren = Array.from(trackRef.current.children).slice(0, members.length);
        firstChildren.forEach(child => {
          singleSetWidth += child.offsetWidth + 24;
        });
        
        // Reset position when we've scrolled past one set
        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current += singleSetWidth;
        }
        
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      cloneContent();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [members, paused]);

  if (!members.length) {
    return null;
  }

  return (
    <section 
      ref={ref} 
      id="team" 
      style={{ 
        paddingTop: 140, 
        paddingBottom: 120, 
        background: "var(--paper)", 
        fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif"
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'end', marginBottom: 56 }}>
          <div>
            <div className="label" style={{ marginBottom: 18, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
              § 03 — Our Team
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.025em', fontWeight: 900, color: "var(--ink)", fontFamily: "'Red Hat Display', sans-serif", margin: 0 }}>
              Built by world class<br/>
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                scientists & researchers.
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
            <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 460, lineHeight: 1.55, fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
              An interdisciplinary cohort of 40+ founders, scientists, and operators —
              spanning Dhaka, Singapore, Boston and London.
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); if (onOpen) onOpen('team-list'); }} 
              className="ulink" 
              style={{ 
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                fontFamily: "'Red Hat Display', sans-serif",
                color: 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: 0
              }}
            >
              Meet the full team <Arrow />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
          {categories.map(c => (
            <button 
              key={c} 
              onClick={() => setCat(c)}
              style={{
                padding: '10px 18px', 
                borderRadius: 999,
                border: '1px solid ' + (c === cat ? 'var(--ink)' : 'var(--rule)'),
                background: c === cat ? 'var(--ink)' : 'transparent',
                color: c === cat ? 'var(--paper)' : 'var(--ink)',
                fontSize: 13.5, 
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all .25s ease',
                fontFamily: "'Red Hat Display', sans-serif"
              }}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div 
        className="reveal" 
        ref={containerRef}
        onMouseEnter={() => setPaused(true)} 
        onMouseLeave={() => setPaused(false)}
        style={{ overflow: 'hidden', position: 'relative', width: '100%' }}
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
          {members.map((m, i) => (
            <a 
              key={`original-${i}`} 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (m.linkedin) {
                  window.open(m.linkedin, '_blank');
                }
              }}
              style={{
                flex: '0 0 auto',
                width: 260,
                display: 'block',
                color: 'var(--ink)',
                textDecoration: 'none',
                fontFamily: "'Red Hat Display', sans-serif"
              }}
            >
              {/* Smaller image frame */}
              <div className="img-frame" style={{ 
                width: 260, 
                height: 290,
                borderRadius: 16,
                overflow: 'hidden', 
                background: '#f0f0f0',
                position: 'relative'
              }}>
                <img 
                  src={m.img} 
                  alt={m.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/260x290/1F6E7A/FFFFFF?text=' + m.name.charAt(0);
                  }}
                />
              </div>
              
              {/* Additional info section */}
              <div style={{ marginTop: 16 }}>
                {/* Name and Title */}
                <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4, fontFamily: "'Red Hat Display', sans-serif", color: 'var(--ink)' }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 10, fontFamily: "'Red Hat Display', sans-serif" }}>
                  {m.title}
                </div>
                
                {/* Education */}
                {m.education && (
                  <div style={{ 
                    fontSize: 11, 
                    color: 'var(--muted)', 
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    lineHeight: 1.4,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}>
                    <span style={{ fontSize: 10 }}>🎓</span>
                    <span>{m.education}</span>
                  </div>
                )}
                
                {/* Expertise */}
                {m.expertise && (
                  <div style={{ 
                    fontSize: 11, 
                    color: 'var(--muted)', 
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    lineHeight: 1.4,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}>
                    <span style={{ fontSize: 10 }}>🔬</span>
                    <span>{m.expertise}</span>
                  </div>
                )}
                
                {/* Location */}
                {m.location && (
                  <div style={{ 
                    fontSize: 11, 
                    color: 'var(--muted)', 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    lineHeight: 1.4,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}>
                    <span style={{ fontSize: 10 }}>📍</span>
                    <span>{m.location}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
        
        {/* Edge fades for smooth visual effect */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: 100, 
          height: '100%', 
          background: 'linear-gradient(90deg, var(--paper), transparent)', 
          pointerEvents: 'none' 
        }} />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          width: 100, 
          height: '100%', 
          background: 'linear-gradient(270deg, var(--paper), transparent)', 
          pointerEvents: 'none' 
        }} />
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
          #team > .wrap > div:first-child { 
            grid-template-columns: 1fr !important; 
            gap: 24px !important; 
          }
          
          #team .wrap {
            padding: 0 20px !important;
          }
        }
        
        .img-frame {
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .img-frame:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
      `}</style>
    </section>
  );
}

export default Team;