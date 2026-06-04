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

function Institutes({ palette, onOpen }) {
  const ref = useReveal();
  const [hover, setHover] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);

  // Background images for all institutes
  const healthSciencesBgImage = "images/health3.jpg";
  const bioengineeringBgImage = "images/bio.jpg";
  const computationalBgImage = "images/com.jpg";
  const molecularBgImage = "images/omics.jpg";

  // Fallback images
  const fallbackImage = "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop";

  // 4 institutes
  const items = [
    {
      n: "01",
      tag: "HEALTH SCIENCES",
      title: "Institute of Health Sciences",
      shortBlurb: "Advancing metabolic health, precision nutrition, functional formulations, and clinical validation for better outcomes.",
      blurb: "Advancing human health through cutting-edge biomedical research, clinical innovation, and translational medicine for better patient outcomes.",
      fullDescription: "The Institute of Health Science focuses on revolutionary healthcare solutions, from drug discovery to personalized medicine. Our research spans cardiology, neurology, oncology, and infectious diseases, working closely with hospitals and research centers worldwide to translate scientific breakthroughs into tangible patient benefits.",
      keyHighlights: [
        "Clinical Research & Trials",
        "Drug Discovery & Development",
        "Personalized Medicine",
        "Global Health Initiatives"
      ],
      backgroundImage: healthSciencesBgImage,
      hoverColor: "#0E525C"
    },
    {
      n: "02",
      tag: "BIOENGINEERING",
      title: "Institute of Applied Bioengineering & Materials Science",
      shortBlurb: "Engineering delivery systems, biomaterials, and vaccines for real-world impact and scalable solutions.",
      blurb: "Engineering the future of biomaterials, tissue engineering, and advanced bio-manufacturing for medical and industrial applications.",
      fullDescription: "This institute pioneers the intersection of biology and engineering, developing smart biomaterials, 3D bioprinted tissues, and sustainable bio-based materials. Our work enables breakthroughs in regenerative medicine, implantable devices, and eco-friendly manufacturing processes that transform healthcare and industry.",
      keyHighlights: [
        "Tissue Engineering",
        "Smart Biomaterials",
        "3D Bioprinting",
        "Bio-manufacturing"
      ],
      backgroundImage: bioengineeringBgImage,
      hoverColor: "#3A828E"
    },
    {
      n: "03",
      tag: "OMICS & MICROBIOLOGY",
      title: "Institute of Omics & Molecular Microbiology",
      shortBlurb: "Exploring genomes, microbes, and molecular pathways to discover solutions for health, agriculture, and the environment.",
      blurb: "Harnessing AI, machine learning, and big data to decode biological complexity and accelerate scientific discovery.",
      fullDescription: "Our computational hub combines high-performance computing, AI algorithms, and bioinformatics to solve complex biological problems. From genomic analysis to protein structure prediction, we're transforming raw data into actionable biological insights that drive innovation in drug discovery, personalized medicine, and systems biology.",
      keyHighlights: [
        "AI in Biology",
        "Genomic Data Analysis",
        "Protein Structure Prediction",
        "Systems Biology"
      ],
      backgroundImage: molecularBgImage,
      hoverColor: "#B56E00"
    },
    {
      n: "04",
      tag: "COMPUTATIONAL BIO & AI",
      title: "Institute of Computational Biology & AI",
      shortBlurb: "Harnessing AI, machine learning, and high-performance computing to accelerate biological discovery and innovation.",
      blurb: "Exploring the molecular machinery of life through genomics, proteomics, and cutting-edge omics technologies.",
      fullDescription: "At the forefront of molecular discovery, our institute unravels the fundamental mechanisms governing cellular function. We leverage advanced sequencing technologies, mass spectrometry, and multi-omics integration to understand disease mechanisms, identify novel therapeutic targets, and advance precision medicine initiatives.",
      keyHighlights: [
        "Genomics & Epigenomics",
        "Proteomics & Metabolomics",
        "Single Cell Analysis",
        "Molecular Diagnostics"
      ],
      backgroundImage: computationalBgImage,
      hoverColor: "#5F47E0"
    }
  ];

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (onOpen) {
      onOpen('institutes-list');
    }
  };

  const handleInstituteClick = (e, institute) => {
    e.preventDefault();
    setSelectedInstitute(institute);
    if (onOpen) {
      onOpen('institute:' + institute.n, institute);
    }
  };

  const handleCloseModal = () => {
    setSelectedInstitute(null);
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  // Function to split title into two lines
  const splitTitleIntoTwoLines = (title) => {
    if (title === "Institute of Health Sciences") {
      return ["Institute of", "Health Sciences"];
    }
    if (title === "Institute of Applied Bioengineering & Materials Science") {
      return ["Institute of Applied", "Bioengineering & Materials Science"];
    }
    if (title === "Institute of Omics & Molecular Microbiology") {
      return ["Institute of Omics &", "Molecular Microbiology"];
    }
    if (title === "Institute of Computational Biology & AI") {
      return ["Institute of Computational", "Biology & AI"];
    }
    const words = title.split(' ');
    const midPoint = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, midPoint).join(' ');
    const secondLine = words.slice(midPoint).join(' ');
    return [firstLine, secondLine];
  };

  return (
    <>
      <section
        ref={ref}
        id="institutes"
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          background: "#FAF7F0",
          fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif"
        }}
      >
        <div
          className="wrap"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px"
          }}
        >
          {/* Header */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
              marginBottom: 48
            }}
          >
            <div>
              <div
                className="label"
                style={{
                  marginBottom: 14,
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent, #1F6E7A)",
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 600
                }}
              >
                § 01 — Our Institutes
              </div>

              <h2
                style={{
                  fontSize: 'clamp(32px, 4.5vw, 56px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  maxWidth: 700,
                  fontWeight: 900,
                  margin: 0,
                  color: "#000000",
                  fontFamily: "'Red Hat Display', sans-serif"
                }}
              >
                <span style={{ fontWeight: 900, color: "#000000" }}>Four</span>{" "}
                <span
                  className="serif"
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--accent, #1F6E7A)',
                    fontWeight: 400,
                    fontFamily: "'Times New Roman', Georgia, serif"
                  }}
                >
                  cross-disciplinary
                </span>{" "}
                <span style={{ fontWeight: 900, color: "#000000" }}>institutes.</span>
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
                fontSize: 14,
                fontFamily: "'Red Hat Display', sans-serif",
                color: 'var(--accent, #1F6E7A)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 40,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(31,110,122,0.1)';
                e.currentTarget.style.gap = '12px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.gap = '8px';
              }}
            >
              View all institutes <Arrow />
            </button>
          </div>

          {/* CARD LAYOUT - 4 cards with background images and #5FAFBE overlay */}
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24
            }}
          >
            {items.map((it, i) => {
              const isHover = hover === i;
              const titleLines = splitTitleIntoTwoLines(it.title);

              return (
                <button
                  key={it.n}
                  onClick={(e) => handleInstituteClick(e, it)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    position: "relative",
                    background: "#ece8df",
                    border: "none",
                    borderRadius: 24,
                    padding: "28px 24px 24px",
                    minHeight: 360,
                    textAlign: "left",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transform: isHover ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: isHover
                      ? "0 20px 35px rgba(0,0,0,0.1)"
                      : "0 4px 12px rgba(0,0,0,0.04)",
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={it.backgroundImage}
                    alt=""
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 0,
                    }}
                    onError={handleImageError}
                  />
                  
                  {/* #5FAFBE Color Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "#5FAFBE",
                      opacity: 0.85,
                      zIndex: 1,
                    }}
                  />

                  {/* Hover darker overlay */}
                  {isHover && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.1)",
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Top Section - with higher z-index */}
                  <div style={{ position: "relative", zIndex: 2 }}>
                    {/* Header with Number only (icon removed) */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20
                      }}
                    >
                      <span
                        style={{
                          fontSize: 32,
                          fontWeight: 800,
                          letterSpacing: "-0.03em",
                          color: "#ffffff",
                          opacity: 0.95,
                          fontFamily: "'Red Hat Display', sans-serif",
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {it.n}
                      </span>
                    </div>

                    {/* Tag */}
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#FFE0A3",
                        marginBottom: 12,
                        fontWeight: 700,
                        fontFamily: "'Red Hat Display', sans-serif",
                        textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                      }}
                    >
                      {it.tag}
                    </div>

                    {/* Title - Two Lines */}
                    <div style={{ marginBottom: 12 }}>
                      <h3
                        style={{
                          fontSize: 18,
                          lineHeight: 1.3,
                          letterSpacing: "-0.02em",
                          fontWeight: 700,
                          color: "#ffffff",
                          margin: 0,
                          fontFamily: "'Red Hat Display', sans-serif",
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {titleLines[0]}
                      </h3>
                      <h3
                        style={{
                          fontSize: 18,
                          lineHeight: 1.3,
                          letterSpacing: "-0.02em",
                          fontWeight: 700,
                          color: "#ffffff",
                          margin: 0,
                          fontFamily: "'Red Hat Display', sans-serif",
                          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      >
                        {titleLines[1]}
                      </h3>
                    </div>

                    {/* Short Blurb */}
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "rgba(255,255,255,0.95)",
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: 400,
                        textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                      }}
                    >
                      {it.shortBlurb}
                    </p>
                  </div>

                  {/* Bottom Arrow with Learn more text */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 24,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.9)",
                        fontFamily: "'Red Hat Display', sans-serif",
                        textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                      }}
                    >
                      Learn more
                    </span>
                    <span
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "18px",
                        background: isHover ? "#ffffff" : "rgba(255,255,255,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isHover ? "#5FAFBE" : "#ffffff",
                        transition: "all 0.3s ease",
                        transform: isHover ? "translateX(5px)" : "translateX(0)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <Arrow size={14} />
                    </span>
                  </div>

                  {/* Hover Border Glow */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 24,
                      border: isHover ? "2px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.2)",
                      pointerEvents: "none",
                      transition: "all 0.3s ease",
                      zIndex: 3,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity .7s ease, transform .7s ease;
          }

          .reveal.in {
            opacity: 1;
            transform: translateY(0);
          }

          @media (max-width: 1100px) {
            #institutes .reveal[style*="grid-template-columns: repeat(4, 1fr)"] {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }
          }

          @media (max-width: 640px) {
            #institutes .reveal[style*="grid-template-columns: repeat(4, 1fr)"] {
              grid-template-columns: 1fr !important;
            }

            #institutes .wrap {
              padding: 0 20px !important;
            }
          }
        `}</style>
      </section>

      {/* Institute Details Modal */}
      {selectedInstitute && (
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
              maxWidth: 750,
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
              <div style={{ marginBottom: 28 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#5FAFBE',
                    fontWeight: 700,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {selectedInstitute.tag}
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(28px, 5vw, 40px)',
                    lineHeight: 1.2,
                    marginTop: 16,
                    marginBottom: 16,
                    color: '#07152b',
                    fontWeight: 700,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {selectedInstitute.title}
                </h2>
                <div
                  style={{
                    width: 60,
                    height: 3,
                    background: '#5FAFBE',
                    borderRadius: 2
                  }}
                />
              </div>

              {/* Full Description */}
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
                  {selectedInstitute.fullDescription}
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
                  Key Focus Areas
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 12
                  }}
                >
                  {selectedInstitute.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 14px',
                        background: '#5FAFBE15',
                        borderRadius: 12,
                        fontSize: 14,
                        color: '#5FAFBE',
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
                onClick={() => {
                  handleCloseModal();
                  if (onOpen) onOpen('contact');
                }}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#5FAFBE',
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
                onMouseEnter={(e) => e.currentTarget.style.background = '#4A8F9E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#5FAFBE'}
              >
                Learn more about this institute →
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

export default Institutes;