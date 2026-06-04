import React, { useState, useEffect, useRef } from "react";

/* =========================
   REVEAL HOOK
========================= */

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

/* =========================
   TYPING ANIMATION HOOK - Starts when element is visible
========================= */

const useTypingAnimation = (text, speed = 100, triggerRef = null) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!triggerRef?.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            setIsTyping(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [triggerRef, hasStarted]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, text, speed, isTyping]);

  return { displayText, isTyping, hasStarted };
};

/* =========================
   MAIN PLATFORM
========================= */

function Platform({ palette, onOpen }) {
  const ref = useReveal();
  const typingRef = useRef(null);
  
  const typingText = "Four Phases, One Platform — AQUANIMITY";
  const { displayText, isTyping } = useTypingAnimation(typingText, 80, typingRef);

  let phases = [];
  try {
    const dataElement = document.getElementById("aquanimity-data");
    if (dataElement && dataElement.textContent) {
      const data = JSON.parse(dataElement.textContent);
      phases = data.phases || [];
    }
  } catch (error) {
    console.error("Failed to load platform data:", error);
  }

  // Fallback phase data with local images
  if (phases.length === 0) {
    phases = [
      { 
        n: "01", 
        title: "Discover", 
        body: "Frontier research at the intersection of biology, computation, and climate science. We identify high-potential breakthroughs from global ecosystems.",
        image: "/images/discover.jpg"
      },
      { 
        n: "02", 
        title: "Build", 
        body: "Prototyping and validation in our GMP-ready labs and field sites. From benchtop to bioreactor, we compress iteration cycles.",
        image: "/images/build.jpg"
      },
      { 
        n: "03", 
        title: "Test", 
        body: "Rigorous piloting across South Asia's diverse environments. Real-world data de-risks technical and market adoption.",
        image: "/images/test.jpg"
      },
      { 
        n: "04", 
        title: "Launch", 
        body: "Spin out as independent ventures backed by global capital. We provide bridge financing and executive placement.",
        image: "/images/launch.png"
      }
    ];
  }

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((a) => (a + 1) % phases.length),
      3800
    );

    return () => clearInterval(t);
  }, [phases.length]);

  const getImageUrl = (phase) => {
    if (phase.image) return phase.image;
    if (phase.bgImage) return phase.bgImage;
    return null;
  };

  return (
    <section
      ref={ref}
      id="platform"
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        background: "var(--paper)",
        fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif"
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
            § 05 — Our BioPlatform
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left side - heading with typing animation */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(34px, 4vw, 56px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  fontWeight: 900,
                  color: "var(--ink)",
                  fontFamily: "'Red Hat Display', sans-serif",
                  margin: 0
                }}
              >
                A full-stack{" "}
                <span
                  className="serif"
                  style={{
                    fontStyle: "italic",
                    color: "var(--accent)",
                    fontWeight: 400,
                    fontFamily: "'Times New Roman', Georgia, serif"
                  }}
                >
                  bioeconomy
                </span>
                <br />
                engine.
              </h2>
              
              {/* Typing animation text - triggers when scrolled into view */}
              <div
                ref={typingRef}
                style={{
                  marginTop: 24,
                  display: "flex",
                  alignItems: "center",
                  minHeight: "32px",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    color: "var(--accent)",
                    fontWeight: 500,
                    borderRight: isTyping ? `2px solid ${palette?.accent || "#1F6E7A"}` : "none",
                    paddingRight: isTyping ? 4 : 0,
                    opacity: displayText ? 1 : 0.6,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {displayText || (isTyping ? "" : "Four Phases, One Platform — AQUANIMITY")}
                </span>
              </div>
            </div>

            {/* Right side - 4 cards professional design */}
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 20,
                }}
              >
                {phases.map((p, i) => {
                  const imageUrl = getImageUrl(p);
                  const isActive = active === i;
                  
                  return (
                    <div
                      key={p.n || i}
                      onMouseEnter={() => setActive(i)}
                      className="platform-card"
                      style={{
                        position: "relative",
                        borderRadius: 18,
                        padding: "18px 14px",
                        transition: "all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                        cursor: "default",
                        overflow: "hidden",
                        height: "auto",
                        minHeight: "200px",
                        display: "flex",
                        flexDirection: "column",
                        border: isActive ? `1.5px solid ${palette?.accent || "#1F6E7A"}` : "1px solid var(--rule)",
                        background: isActive ? "rgba(31,110,122,0.02)" : "var(--bone)",
                        boxShadow: isActive 
                          ? `0 6px 16px rgba(31,110,122,0.1)` 
                          : "0 1px 4px rgba(0,0,0,0.04)",
                        fontFamily: "'Red Hat Display', sans-serif"
                      }}
                    >
                      {/* Background Image - only for active */}
                      {isActive && imageUrl && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(0px)",
                            opacity: 0.60,
                            transform: "scale(1.05)",
                          }}
                        />
                      )}
                      
                      {/* Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: isActive 
                            ? "rgba(31,110,122,0.02)" 
                            : "rgba(245,240,232,0.96)",
                        }}
                      />

                      {/* Content */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          height: "100%",
                        }}
                      >
                        {/* Header */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            className="mono"
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: isActive ? "var(--accent)" : "var(--muted)",
                              background: isActive ? "rgba(31,110,122,0.1)" : "rgba(31,110,122,0.05)",
                              padding: "2px 10px",
                              borderRadius: 20,
                              letterSpacing: "0.08em",
                              fontFamily: "'Red Hat Display', sans-serif"
                            }}
                          >
                            {p.n}
                          </span>

                          <PhaseGlyph
                            index={i}
                            active={isActive}
                            accent={palette?.accent || "#1F6E7A"}
                          />
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            margin: 0,
                            letterSpacing: "-0.02em",
                            color: isActive ? "var(--accent)" : "var(--ink)",
                            lineHeight: 1.3,
                            fontFamily: "'Red Hat Display', sans-serif"
                          }}
                        >
                          {p.title}
                        </h3>

                        {/* Body */}
                        <p
                          style={{
                            fontSize: 11,
                            color: "var(--ink-2)",
                            lineHeight: 1.45,
                            margin: 0,
                            opacity: 0.85,
                            fontFamily: "'Red Hat Display', sans-serif",
                            fontWeight: 400,
                            ...(isActive && {
                              background: "rgba(255,255,255,0.12)",
                              padding: "5px 8px",
                              borderRadius: 10,
                              backdropFilter: "blur(2px)",
                              margin: "-5px -8px",
                              opacity: 1,
                            })
                          }}
                        >
                          {p.body}
                        </p>

                        {/* Active indicator */}
                        {isActive && (
                          <div
                            style={{
                              marginTop: 8,
                              width: 28,
                              height: 2,
                              background: "var(--accent)",
                              borderRadius: 2,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1), transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1);
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .platform-card {
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .platform-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06) !important;
        }
        
        /* Blinking cursor animation */
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @media (max-width: 1200px) {
          #platform [style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          #platform [style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        
        @media (max-width: 700px) {
          #platform [style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          #platform .wrap {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   PHASE GLYPH - Professional design
========================= */

function PhaseGlyph({ index, active, accent }) {
  const c = active ? accent : "var(--muted)";
  const stroke = 1.2;

  if (index === 0)
    return (
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke={c} strokeWidth={stroke} />
        <circle cx="20" cy="20" r="3" fill={c} />
        <circle cx="20" cy="20" r="9" stroke={c} strokeWidth={stroke} strokeDasharray="2 3" />
      </svg>
    );

  if (index === 1)
    return (
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
        <path d="M20 5 L33 12 L33 28 L20 35 L7 28 L7 12 Z" stroke={c} strokeWidth={stroke} />
        <path d="M20 5 L20 35 M7 12 L33 28 M33 12 L7 28" stroke={c} strokeWidth={stroke * 0.6} opacity="0.5" />
      </svg>
    );

  if (index === 2)
    return (
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke={c} strokeWidth={stroke} strokeDasharray="3 3" />
        <path d="M14 20 L18 24 L26 16" stroke={c} strokeWidth={stroke * 1.3} fill="none" strokeLinecap="round" />
      </svg>
    );

  return (
    <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="6" width="28" height="28" stroke={c} strokeWidth={stroke} rx="3" />
      <path d="M14 26 L26 14 M19 14 L26 14 L26 21" stroke={c} strokeWidth={stroke * 1.2} fill="none" strokeLinecap="round" />
    </svg>
  );
}

window.Platform = Platform;

export default Platform;