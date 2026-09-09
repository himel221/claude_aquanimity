import React, { useEffect, useRef, useState, useCallback } from 'react';

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("in"); }),
        { threshold: 0.1 }
      );
      const reveals = ref.current.querySelectorAll(".reveal");
      reveals.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);
  return ref;
};

const useTypewriter = (phrases, options = {}) => {
  const { typeSpeed = 45, eraseSpeed = 24, hold = 1400 } = options;
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex % phrases.length];
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === "") { setIsDeleting(false); setPhraseIndex(prev => prev + 1); }
      }, eraseSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        if (displayText === currentPhrase) timer = setTimeout(() => setIsDeleting(true), hold);
      }, typeSpeed);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typeSpeed, eraseSpeed, hold]);

  return displayText;
};

const useSlowTitleTypewriter = () => {
  const fullText = "Engineering\nlife. For humanity.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    let timer;
    const typeNextChar = () => {
      if (index <= fullText.length) { setDisplayText(fullText.slice(0, index)); index++; timer = setTimeout(typeNextChar, 85); }
    };
    const startTimer = setTimeout(typeNextChar, 300);
    return () => { clearTimeout(startTimer); clearTimeout(timer); };
  }, []);

  return { displayText };
};

function Hero({ palette, onGoto }) {
  const ref = useReveal();
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const playAttemptCount = useRef(0);
  const hasUnlocked = useRef(false);

  const phrases = ["Health Sciences", "Plastic Remediation", "Novel Delivery Systems", "Frontier AI in Biology", "Biomaterials"];
  const typed = useTypewriter(phrases, { typeSpeed: 45, eraseSpeed: 24, hold: 1400 });
  const { displayText } = useSlowTitleTypewriter();

  // ── Play with fast retry ──
  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || playAttemptCount.current >= 6) return;
    playAttemptCount.current += 1;

    video.muted = true;
    video.setAttribute('muted', '');

    const p = video.play();
    if (p !== undefined) {
      p.then(() => setIsVideoReady(true))
       .catch(() => {
         setTimeout(attemptPlay, 400);
       });
    }
  }, []);

  // ── Video lifecycle ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = '/images/video1.mp4';
    video.load();

    attemptPlay();

    const onCanPlayThrough = () => { attemptPlay(); };
    const onLoadedData = () => { attemptPlay(); };
    const onPlaying = () => { setIsVideoReady(true); };
    const onTimeUpdate = () => {
      if (video.duration && video.duration - video.currentTime < 0.15) {
        video.currentTime = 0;
      }
    };
    const onEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const onStalled = () => {
      setTimeout(() => {
        if (video && video.paused && video.readyState >= 2) video.play().catch(() => {});
      }, 800);
    };
    const onWaiting = () => {
      setTimeout(() => {
        if (video && video.paused && video.readyState >= 2) video.play().catch(() => {});
      }, 1000);
    };

    video.addEventListener('canplaythrough', onCanPlayThrough);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('stalled', onStalled);
    video.addEventListener('waiting', onWaiting);

    return () => {
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('stalled', onStalled);
      video.removeEventListener('waiting', onWaiting);
    };
  }, [attemptPlay]);

  // ── First-gesture unlock (iOS requirement) ──
  useEffect(() => {
    const unlock = () => {
      if (hasUnlocked.current) return;
      hasUnlocked.current = true;

      const video = videoRef.current;
      if (!video) return;

      video.muted = true;

      if (video.readyState < 2) {
        video.load();
      }
      video.play()
        .then(() => setIsVideoReady(true))
        .catch(() => {
          setTimeout(() => {
            video.play().then(() => setIsVideoReady(true)).catch(() => {});
          }, 200);
        });
    };

    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('scroll', unlock, { once: true, passive: true });

    return () => {
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('click', unlock);
      document.removeEventListener('scroll', unlock);
    };
  }, []);

  // ── Visibility change: resume if user switched tabs ──
  useEffect(() => {
    const onVisChange = () => {
      if (!document.hidden) {
        const video = videoRef.current;
        if (video && video.paused) {
          video.muted = true;
          video.play().then(() => setIsVideoReady(true)).catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', onVisChange);
    return () => document.removeEventListener('visibilitychange', onVisChange);
  }, []);

  const handleVentureClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('aq-route', { detail: 'home' }));
    setTimeout(() => {
      const el = document.getElementById('ventures') || document.querySelector('#ventures');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (onGoto) onGoto('ventures-list');
    }, 150);
  };

  const handlePartnerClick = (e) => {
    e.preventDefault();
    if (onGoto) onGoto('contact');
  };

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
                    <span className="hero-for">{line.split('life.')[1] || ''}</span>
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

      <div className="hero-video-background">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline=""
          x5-playsinline=""
          x5-video-player-type="h5"
          preload="auto"
          style={{
            opacity: isVideoReady ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
        <div className="video-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-left">

          <div className="hero-top reveal">
            <span className="hero-line"></span>
            <span className="hero-mini">An Integrated Bioinnovation Enterprise</span>
          </div>

          <h1 className="hero-title reveal">{renderTitle()}</h1>
<div className="hero-build reveal">
  {/* Desktop Layout */}
  <div className="hero-build-desktop">
    <span className="hero-build-label">
      <i style={{ 
        fontFamily: 'Georgia, serif', 
        fontSize: '14px', 
        letterSpacing: '0.07em', 
        color: 'rgb(45, 144, 161)', 
        fontWeight: 600, 
        lineHeight: 1.4, 
        whiteSpace: 'nowrap', 
        fontStyle: 'italic' 
      }}>
        Advancing bioinnovations in
      </i>
    </span>
    <span className="hero-build-arrow">→</span>
    <span className="hero-build-text">{typed}<span className="cursor"></span></span>
  </div>
  
  {/* Mobile Layout */}
  <div className="hero-build-mobile">
    <div className="mobile-label">
      <i style={{ 
        fontFamily: 'Georgia, serif', 
        fontSize: '14px', 
        letterSpacing: '0.07em', 
        color: 'rgb(45, 144, 161)', 
        fontWeight: 600, 
        lineHeight: 1.4, 
        whiteSpace: 'nowrap', 
        fontStyle: 'italic' 
      }}>
        Advancing bioinnovations in
      </i>
    </div>
    <div className="mobile-arrow-text">
      <span className="hero-build-arrow" style={{ fontSize: '20px', color: 'rgb(45, 144, 161)' }}>→</span>
      <span className="hero-build-text">{typed}<span className="cursor"></span></span>
    </div>
  </div>
</div>

          <p className="hero-desc reveal">
            <span className="highlight">Aquanimity</span> is building the BioHub— <span className="normal-text">uniting institutes, scientists, academia, and strategic partners to </span><span className="highlight">discover, translate, and commercialize novel biosciences for Bangladesh and beyond.</span>
          </p>

          <div className="hero-buttons reveal">
            <button className="btn-dark" onClick={handleVentureClick}>Explore Our SuperWater <Arrow size={13} /></button>
            <button className="btn-light" onClick={handlePartnerClick}>Partner with us <Arrow size={13} /></button>
          </div>

          <div className="metrics reveal">
            <div className="metric"><h3 className="metric-number">4</h3><p>INSTITUTES</p></div>
            <div className="metric"><h3 className="metric-number">4</h3><p>VENTURES</p></div>
          </div>

        </div>
        <div className="hero-right reveal"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --bg: #ece8df;
          --text: #07152b;
          --muted: #7a8496;
          --line: rgba(7,21,43,0.08);
          --accent: #0d1d33;
          --cyan: #2d90a1;
        }

        * { font-family: 'Red Hat Display', 'Red Hat Display Variable', sans-serif; }

        .hero-section {
          position: relative; width: 100%; min-height: auto;
          background: var(--bg); display: flex; align-items: center;
          overflow-x: hidden;
        }

        .hero-video-background {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0; overflow: hidden;
          background: var(--bg);
        }

        .hero-video-background video {
          position: absolute; top: 50%; left: 50%;
          min-width: 100%; min-height: 100%;
          width: auto; height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          filter: brightness(1.05) contrast(1.02) saturate(1.1);
        }

        .video-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255, 255, 255, 0.75);
          z-index: 1;
        }

        .hero-container {
          position: relative; z-index: 2;
          width: min(1280px, 90%); margin: 0 auto;
          display: grid; grid-template-columns: 1fr 0.5fr;
          align-items: center; gap: 32px; padding: 140px 0 60px;
        }

        .hero-left { max-width: 620px; }
        .hero-top { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .hero-line { width: 24px; height: 1px; background: var(--text); }
        .hero-mini { font-size: 10px; letter-spacing: 0.06em; color: #0E1136; font-weight: 600; text-transform: uppercase; }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px); line-height: 1.15;
          letter-spacing: -0.03em; color: var(--text); margin: 0;
          font-weight: 600; min-height: auto; white-space: pre-wrap;
        }

        .engineering-life { font-weight: 900; color: #0E1136; }
        .hero-for { font-family: Georgia, serif; font-style: italic; font-weight: 400; color: var(--cyan); margin: 0 0 0 8px; }
        .normal-text { font-style: normal; font-weight: 400; }
        .metric-number { font-weight: 900; color: #0E1136; font-size: clamp(28px, 3vw, 36px); margin: 0; line-height: 1; }

        .hero-build { margin-top: 14px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
        .hero-build-arrow { font-size: 16px; color: var(--text); font-weight: 500; line-height: 1.4; display: inline-flex; align-items: center; }
        .hero-build-text { font-size: 16px; color: #0E1136; font-weight: 500; min-height: 28px; line-height: 1.4; display: inline-flex; align-items: center; }
        .cursor { display: inline-block; width: 2px; height: 1em; background: var(--text); margin-left: 2px; vertical-align: middle; animation: blink 1s step-end infinite; }

        .hero-desc { margin-top: 14px; font-size: 15px; line-height: 1.5; color: #0E1136; max-width: 520px; }
        .highlight { font-weight: 700; color: var(--text); }
        .hero-buttons { margin-top: 22px; display: flex; gap: 14px; flex-wrap: wrap; }

        .btn-dark {
          border: none; background: #0E1136; color: white;
          padding: 12px 24px; border-radius: 40px; font-size: 13px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.3s ease;
        }
        .btn-dark:hover { transform: translateY(-2px); background: #0d2442; }

        .btn-light {
          border: 1px solid rgb(14,17,54); background: transparent; color: #0E1136;
          padding: 12px 24px; border-radius: 40px; font-size: 13px; font-weight: 500;
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.3s ease;
        }
        .btn-light:hover { background: rgba(7,21,43,0.04); border-color: rgba(7,21,43,0.4); }

        .metrics {
          margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--line);
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .metric p { margin: 8px 0 0; font-size: 8px; letter-spacing: 0.3em; color: #0E1136; font-weight: 600; }

        .hero-right { position: relative; display: flex; justify-content: center; align-items: center; min-height: 200px; }

        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* ===== TABLET (≤980px) ===== */
        @media (max-width: 980px) {
          .hero-section { min-height: 100vh; align-items: center; }
          .hero-container { grid-template-columns: 1fr; gap: 0; padding: 80px 0 48px; width: min(1280px, 92%); }
          .hero-left { max-width: 100%; padding: 0 8px; }
          .hero-top { margin-bottom: 20px; }
          .hero-line { width: 28px; }
          .hero-mini { font-size: 11px; letter-spacing: 0.08em; }
          .hero-title { font-size: clamp(40px, 7vw, 56px); line-height: 1.15; min-height: auto; max-width: 90%; }
          .hero-for { margin-left: 6px; }
          .hero-build { margin-top: 20px; gap: 6px; }
          .hero-build-label i { font-size: 13px !important; }
          .hero-build-arrow { font-size: 15px; }
          .hero-build-text { font-size: 15px; min-height: 30px; }
          .hero-desc { margin-top: 18px; font-size: 15px; line-height: 1.6; max-width: 90%; }
          .hero-buttons { margin-top: 28px; gap: 16px; }
          .btn-dark, .btn-light { padding: 14px 28px; font-size: 14px; }
          .btn-dark svg, .btn-light svg { width: 14px; height: 14px; }
          .metrics { margin-top: 40px; padding-top: 24px; gap: 24px; max-width: 80%; }
          .metric-number { font-size: 32px; }
          .metric p { font-size: 9px; letter-spacing: 0.3em; }
          .hero-right { display: none; }
          .hero-video-background video { filter: brightness(1.1) contrast(1.05) saturate(1.05); }
          .video-overlay { background: rgba(255, 255, 255, 0.85); }
        }

        /* ===== TABLET PORTRAIT (≤768px) ===== */
        @media (max-width: 768px) {
          .hero-section { min-height: auto; align-items: flex-start; }
          .hero-container { width: 90%; padding: 60px 0 40px; }
          .hero-left { padding: 0 4px; }
          .hero-top { margin-bottom: 16px; }
          .hero-mini { font-size: 10px; letter-spacing: 0.06em; }
          .hero-title { font-size: clamp(32px, 8vw, 42px); max-width: 100%; }
          .hero-build { margin-top: 16px; }
          .hero-build-label i { font-size: 12px !important; }
          .hero-build-arrow { font-size: 13px; }
          .hero-build-text { font-size: 13px; min-height: 24px; }
          .hero-desc { font-size: 14px; max-width: 100%; }
          .hero-buttons { margin-top: 24px; gap: 12px; }
          .btn-dark, .btn-light { padding: 12px 22px; font-size: 13px; }
          .btn-dark svg, .btn-light svg { width: 13px; height: 13px; }
          .metrics { margin-top: 32px; padding-top: 20px; gap: 16px; max-width: 100%; }
          .metric-number { font-size: 28px; }
          .metric p { font-size: 8px; letter-spacing: 0.25em; }
          .video-overlay { background: rgba(255, 255, 255, 0.88); }
        }

        /* ===== LARGE TABLET / SMALL LAPTOP (769px–1024px) ===== */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-container { padding: 90px 0 56px; gap: 30px; }
          .hero-title { font-size: clamp(48px, 6vw, 64px); }
          .hero-desc { font-size: 16px; max-width: 85%; }
          .metrics { max-width: 70%; }
          .video-overlay { background: rgba(255, 255, 255, 0.78); }
        }

        /* ===== MOBILE (≤640px) ===== */
        @media (max-width: 640px) {
          .hero-section { min-height: auto; align-items: flex-start; }
          .hero-container { width: 88%; padding: 90px 0 48px; gap: 0; }
          .hero-top { margin-bottom: 16px; }
          .hero-title { font-size: clamp(32px, 9vw, 44px); line-height: 1.15; min-height: auto; }
          .hero-for { margin-left: 4px; }
          .hero-build { margin-top: 16px; gap: 4px; }
          .hero-build-label i { font-size: 12px !important; }
          .hero-build-text { font-size: 13px; min-height: 24px; }
          .hero-build-arrow { font-size: 13px; }
          .hero-desc { margin-top: 16px; font-size: 13px; line-height: 1.55; max-width: 100%; }
          .hero-buttons { margin-top: 24px; gap: 10px; }
          .btn-dark, .btn-light { padding: 10px 20px; font-size: 12px; }
          .metrics { margin-top: 32px; padding-top: 20px; grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .metric-number { font-size: 28px; }
          .metric p { font-size: 7px; letter-spacing: 0.25em; }
          .video-overlay { background: rgba(255, 255, 255, 0.9); }
        }

        /* ===== VERY SMALL PHONES (≤380px) ===== */
        @media (max-width: 380px) {
          .hero-container { width: 90%; padding: 80px 0 40px; }
          .hero-title { font-size: 28px; }
          .hero-desc { font-size: 12.5px; }
          .btn-dark, .btn-light { padding: 9px 16px; font-size: 11.5px; }
          .video-overlay { background: rgba(255, 255, 255, 0.92); }
        }

        /* Desktop: Show desktop, hide mobile */
        .hero-build-desktop {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hero-build-mobile {
          display: none;
        }

        /* Mobile: Show mobile, hide desktop */
        @media (max-width: 768px) {
          .hero-build-desktop {
            display: none !important;
          }
          
          .hero-build-mobile {
            display: block;
          }
          
          .hero-build-mobile .mobile-label {
            display: block;
            margin-bottom: 4px;
          }
          
          .hero-build-mobile .mobile-arrow-text {
            display: flex;
            align-items: center;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;