import React, { useEffect, useRef, useState } from 'react';

// Arrow icon component (built-in)
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

// Custom hook for reveal animation (built-in)
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

// Typewriter effect hook (built-in)
const useTypewriter = (phrases, options = {}) => {
  const {
    typeSpeed = 45,
    eraseSpeed = 24,
    hold = 1400,
    gap = 260
  } = options;

  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === "") {
          setIsDeleting(false);
          setPhraseIndex(prev => prev + 1);
        }
      }, eraseSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          timer = setTimeout(() => setIsDeleting(true), hold);
        }
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typeSpeed, eraseSpeed, hold]);

  return displayText;
};

// Slow Title Typewriter hook for "Engineering\nlife. For humanity."
const useSlowTitleTypewriter = () => {
  const fullText = "Engineering\nlife. For humanity.";
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    let timer;
    
    const typeNextChar = () => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
        timer = setTimeout(typeNextChar, 85);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setShowCursor(false);
        }, 1500);
      }
    };
    
    const startTimer = setTimeout(() => {
      typeNextChar();
    }, 300);
    
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  return { displayText, isTyping, showCursor };
};

function Hero({ palette, onGoto }) {
  const ref = useReveal();
  const videoRef = useRef(null);

  const phrases = [
    "Health",
    "Climate Biotech",
    "Microbiome Science",
    "Novel Drug Delivery Systems",
    "Frontier AI in Biology",
    "Biomaterials"
  ];

  const typed = useTypewriter(phrases, {
    typeSpeed: 45,
    eraseSpeed: 24,
    hold: 1400,
    gap: 260
  });

  const { displayText, showCursor } = useSlowTitleTypewriter();

  const handlePlatformClick = (e) => {
    e.preventDefault();
    onGoto('platform');
  };

  const handlePartnerClick = (e) => {
    e.preventDefault();
    onGoto('contact');
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay failed:", e));
    }
  }, []);

  // Split the display text into lines and format
  const renderTitle = () => {
    const lines = displayText.split('\n');
    
    return (
      <>
        {lines.map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {lineIndex === 0 && <span className="engineering-life">{line}</span>}
            {lineIndex === 1 && (
              <>
                <br />
                {line.includes('life.') ? (
                  <>
                    <span className="engineering-life">{line.split('life.')[0]}</span>
                    <span className="engineering-life">life.</span>
                    <span className="hero-for">
                      {line.split('life.')[1] || ''}
                    </span>
                  </>
                ) : (
                  <span className="engineering-life">{line}</span>
                )}
              </>
            )}
            {lineIndex > 1 && <><br /><span className="engineering-life">{line}</span></>}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section ref={ref} id="home" className="hero-section">

      {/* VIDEO BACKGROUND */}
      <div className="hero-video-background">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600"
        >
          <source 
            src="https://www.pexels.com/download/video/8863360/" 
            type="video/mp4" 
          />
          <img 
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600" 
            alt="Laboratory background"
          />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-container">

        {/* LEFT */}
        <div className="hero-left">

          <div className="hero-top reveal">
            <span className="hero-line"></span>
            <span className="hero-mini">
              An Integrated Bioinnovation Enterprise
            </span>
          </div>

          {/* SLOW TYPEWRITER TITLE */}
          <h1 className="hero-title reveal">
            {renderTitle()}
            {showCursor && <span className="cursor-title"></span>}
          </h1>

          <div className="hero-build reveal">
            <span className="hero-build-label">We are advancing Bioinnovations in →</span>
            <span className="hero-build-text">
              {typed}
              <span className="cursor"></span>
            </span>
          </div>

          <p className="hero-desc reveal">
            <span className="highlight">Aquanimity</span> is building the BioHub for Bangladesh and beyond — <span className="normal-text">uniting institutes, scientists, academia, and strategic partners to bring breakthrough bioinnovations to market.</span>.
          </p>

          <div className="hero-buttons reveal">
            <button className="btn-dark" onClick={handlePlatformClick}>
              Explore Our SuperWater
              <Arrow size={13} />
            </button>
            <button className="btn-light" onClick={handlePartnerClick}>
              Partner with us
              <Arrow size={13} />
            </button>
          </div>

          <div className="metrics reveal">
            <div className="metric">
              <h3 className="metric-number">4</h3>
              <p>INSTITUTES</p>
            </div>
            <div className="metric">
              <h3 className="metric-number">3</h3>
              <p>VENTURES</p>
            </div>
            <div className="metric">
              <h3 className="metric-number">170M</h3>
              <p>IMPACT</p>
            </div>
          </div>

        </div>

        {/* RIGHT - Circle/Bubble removed */}
        <div className="hero-right reveal">
          {/* Empty area - circle removed */}
        </div>

      </div>

      <style>{`

        :root {
          --bg: #ece8df;
          --text: #07152b;
          --muted: #7a8496;
          --line: rgba(7,21,43,0.08);
          --accent: #0d1d33;
          --cyan: #2d90a1;
        }

        * {
          font-family: 'Red Hat Display', 'Red Hat Display Variable', sans-serif;
        }

        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          align-items: center;
          overflow-x: hidden;
        }

        /* VIDEO BACKGROUND */
        .hero-video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .hero-video-background video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          filter: brightness(1.05) contrast(1.02) saturate(1.1);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(236, 232, 223, 0.75);
          z-index: 1;
        }

        /* MAIN CONTENT */
        .hero-container {
          position: relative;
          z-index: 2;
          width: min(1280px, 90%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 0.5fr;
          align-items: center;
          gap: 50px;
          padding: 100px 0;
        }

        /* LEFT */
        .hero-left {
          max-width: 620px;
        }

        .hero-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .hero-line {
          width: 24px;
          height: 1px;
          background: var(--text);
        }

        .hero-mini {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--muted);
          font-weight: 600;
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 0;
          font-weight: 600;
          min-height: 160px;
          position: relative;
          white-space: pre-wrap;
        }

        /* Engineering life - Red Hat Display Bold Black */
        .engineering-life {
          font-family: 'Red Hat Display', sans-serif;
          font-weight: 900;
          color: #000000;
        }

        .hero-for {
          font-family: Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: var(--cyan);
          margin: 0 0 0 8px;
        }

        /* Normal text style */
        .normal-text {
          font-family: 'Red Hat Display', sans-serif;
          font-style: normal;
          font-weight: 400;
        }

        /* Metric numbers - Red Hat Display Black */
        .metric-number {
          font-family: 'Red Hat Display', sans-serif;
          font-weight: 900;
          color: #000000;
          font-size: clamp(28px, 3vw, 36px);
          margin: 0;
          line-height: 1;
        }

        /* Title cursor animation */
        .cursor-title {
          display: inline-block;
          width: 3px;
          height: 0.9em;
          background: var(--text);
          margin-left: 4px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        .hero-build {
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .hero-build-label {
          font-size: 12px;
          letter-spacing: 0.25em;
          color: var(--muted);
          font-weight: 600;
        }

        .hero-build-text {
          font-size: 16px;
          color: var(--text);
          font-weight: 500;
          min-height: 32px;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--text);
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        .hero-desc {
          margin-top: 20px;
          font-size: 15px;
          line-height: 1.5;
          color: #4a5568;
          max-width: 520px;
        }

        .highlight {
          font-weight: 700;
          color: var(--text);
        }

        .hero-buttons {
          margin-top: 32px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-dark {
          border: none;
          background: #09182d;
          color: white;
          padding: 12px 24px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-dark:hover {
          transform: translateY(-2px);
          background: #0d2442;
        }

        .btn-light {
          border: 1px solid rgba(7,21,43,0.2);
          background: transparent;
          color: var(--text);
          padding: 12px 24px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-light:hover {
          background: rgba(7,21,43,0.04);
          border-color: rgba(7,21,43,0.4);
        }

        .metrics {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .metric p {
          margin: 8px 0 0;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: var(--muted);
          font-weight: 600;
        }

        /* RIGHT - Empty area */
        .hero-right {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* ANIMATIONS */
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* RESPONSIVE */
        @media (max-width: 980px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 50px;
            padding: 80px 0;
          }

          .hero-left {
            max-width: 100%;
          }

          .hero-title {
            font-size: clamp(44px, 8vw, 64px);
            min-height: 140px;
          }

          .hero-desc {
            font-size: 14px;
          }

          .metrics {
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
          }
          
          .hero-right {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-container {
            padding: 60px 0;
          }

          .hero-title {
            font-size: 36px;
            line-height: 1.2;
            min-height: 100px;
          }

          .hero-build-text {
            font-size: 14px;
          }

          .btn-dark, .btn-light {
            padding: 10px 20px;
            font-size: 12px;
          }

          .metrics {
            gap: 15px;
          }
          
          .cursor-title {
            height: 0.7em;
          }
        }

      `}</style>

    </section>
  );
}

export default Hero;