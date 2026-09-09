import React, { useState, useEffect, useRef } from "react";

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("in"); }),
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );
      ref.current.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);
  return ref;
};

const useTypingAnimation = (text, speed = 100, triggerRef = null) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!triggerRef?.current || hasStarted) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting && !hasStarted) { setHasStarted(true); setIsTyping(true); observer.disconnect(); } }),
      { threshold: 0.3 }
    );
    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [triggerRef, hasStarted]);

  useEffect(() => {
    if (!isTyping) return;
    if (currentIndex < text.length) {
      const timer = setTimeout(() => { setDisplayText(prev => prev + text[currentIndex]); setCurrentIndex(prev => prev + 1); }, speed);
      return () => clearTimeout(timer);
    } else { setIsTyping(false); }
  }, [currentIndex, text, speed, isTyping]);

  return { displayText, isTyping, hasStarted };
};

function Platform({ palette, onOpen }) {
  const ref = useReveal();
  const typingRef = useRef(null);
  const typingText = "Four Phases, One Platform";
  const { displayText, isTyping } = useTypingAnimation(typingText, 80, typingRef);

  let phases = [];
  try {
    const dataElement = document.getElementById("aquanimity-data");
    if (dataElement && dataElement.textContent) {
      const data = JSON.parse(dataElement.textContent.trim().replace(/^\uFEFF/, ''));
      phases = Array.isArray(data.phases) ? data.phases : [];
    }
  } catch (error) { console.error("Failed to load platform data:", error); }

  if (phases.length === 0) {
    phases = [
      {  title: "Discover", body: "Frontier research at the intersection of biology, computation, and climate science. We identify high-potential breakthroughs from global ecosystems." },
      {  title: "Build", body: "Prototyping and validation in our GMP-ready labs and field sites. From benchtop to bioreactor, we compress iteration cycles." },
      {  title: "Test", body: "Rigorous piloting across South Asia's diverse environments. Real-world data de-risks technical and market adoption." },
      {  title: "Launch", body: "Spin out as independent ventures backed by global capital. We provide bridge financing and executive placement." }
    ];
  }

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (phases.length === 0) return;
    const t = setInterval(() => setActive((a) => (a + 1) % phases.length), 3800);
    return () => clearInterval(t);
  }, [phases.length]);

  if (phases.length === 0) return null;

  return (
    <section ref={ref} id="platform" className="platform-section">
      <div className="platform-wrap">
        <div className="reveal" style={{ marginBottom: 28 }}>
          <div className="platform-label">§ 05 — Our BioPlatform</div>
          <div className="platform-grid">
            <div>
              <h2 className="platform-heading">
                A full-stack{" "}
                <span className="serif" style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                  bioeconomy
                </span>
                <br />engine.
              </h2>
              <div ref={typingRef} style={{ marginTop: 16, display: "flex", alignItems: "center", minHeight: "28px" }}>
                <span className="platform-typing" style={{ borderRight: isTyping ? "2px solid #1F6E7A" : "none", paddingRight: isTyping ? 4 : 0, opacity: displayText ? 1 : 0.6 }}>
                  {displayText || (isTyping ? "" : "Four Phases, One Platform — AQUANIMITY")}
                </span>
              </div>
            </div>

            <div className="phases-grid">
              {phases.map((p, i) => {
                const isActive = active === i;
                return (
                  <div key={p.n || i} onMouseEnter={() => setActive(i)} className="phase-card" style={{
                    border: isActive ? "1.5px solid #5FAFBE" : "1px solid rgba(255,255,255,0.1)",
                    background: "#0E1136",
                    boxShadow: isActive ? "0 6px 16px rgba(95,175,190,0.15)" : "0 1px 4px rgba(0,0,0,0.3)"
                  }}>
                    <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                        <PhaseGlyph index={i} active={isActive} accent="#5FAFBE" />
                      </div>
                      <h3 className="phase-title" style={{ color: isActive ? "#5FAFBE" : "#ffffff" }}>{p.title}</h3>
                      <p className="phase-body" style={{ 
                        color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                        background: isActive ? "rgba(95,175,190,0.08)" : "transparent",
                        padding: isActive ? "4px 6px" : "0",
                        borderRadius: isActive ? 8 : 0,
                        margin: isActive ? "-4px -6px" : "0"
                      }}>{p.body}</p>
                      {isActive && <div style={{ marginTop: 6, width: 24, height: 2, background: "#5FAFBE", borderRadius: 2 }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }

        .platform-section { padding: 28px 0 28px; background: white; font-family: 'Red Hat Display', sans-serif; }
        .platform-wrap { max-width: 1400px; margin: 0 auto; padding: 0 32px; }
        .platform-label { margin-bottom: 10px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); font-weight: 600; }
        .platform-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; align-items: center; }
        .platform-heading { font-size: clamp(30px, 3vw, 58px); line-height: 0.98; letter-spacing: -0.03em; font-weight: 900; color: #0E1136; margin: 0; }
        .platform-typing { font-size: 13px; letter-spacing: 0.08em; color: var(--accent); font-weight: 500; }
        .phases-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .phase-card {
          position: relative; border-radius: 16px; padding: 16px 12px; min-height: 180px;
          display: flex; flex-direction: column; overflow: hidden; cursor: default;
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .phase-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(95,175,190,0.1) !important; }
        .phase-number { font-size: 10px; font-weight: 600; padding: 2px 10px; border-radius: 20px; letter-spacing: 0.08em; }
        .phase-title { font-size: 16px; font-weight: 700; margin: 0; letter-spacing: -0.02em; line-height: 1.3; }
        .phase-body { font-size: 11px; line-height: 1.45; margin: 0; font-weight: 400; }

        @media (max-width: 1200px) {
          .platform-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .phases-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 980px) {
          .platform-section { padding: 40px 0 !important; }
          .platform-wrap { padding: 0 20px !important; }
        }

        @media (max-width: 768px) {
          .platform-section { padding: 28px 0 32px !important; }
          .platform-wrap { padding: 0 16px !important; }
          .platform-heading { font-size: clamp(28px, 8vw, 42px) !important; line-height: 1.04 !important; }
          .platform-typing { font-size: 11px !important; }
          .phases-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .phase-card { min-height: 150px !important; padding: 14px 10px !important; border-radius: 14px !important; }
          .phase-title { font-size: 14px !important; }
          .phase-body { font-size: 10px !important; line-height: 1.4 !important; }
          .phase-number { font-size: 9px !important; padding: 2px 8px !important; }
        }

        @media (max-width: 480px) {
          .platform-section { padding: 24px 0 24px !important; }
          .platform-heading { font-size: clamp(24px, 9vw, 36px) !important; line-height: 1.06 !important; }
          .phases-grid { gap: 8px !important; }
          .phase-card { min-height: 130px !important; padding: 12px 10px !important; border-radius: 12px !important; }
          .phase-title { font-size: 13px !important; }
          .phase-body { font-size: 9.5px !important; }
        }

        @media (max-width: 360px) {
          .platform-section { padding: 20px 0 20px !important; }
          .platform-heading { font-size: clamp(20px, 7vw, 28px) !important; line-height: 1.08 !important; }
          .phase-card { min-height: 120px !important; padding: 10px 8px !important; }
          .phase-title { font-size: 12px !important; }
          .phase-body { font-size: 9px !important; }
        }
      `}</style>
    </section>
  );
}

function PhaseGlyph({ index, active, accent }) {
  const c = active ? accent : "rgba(255,255,255,0.3)";
  const s = 1.2;
  if (index === 0) return (<svg width="22" height="22" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke={c} strokeWidth={s}/><circle cx="20" cy="20" r="3" fill={c}/><circle cx="20" cy="20" r="9" stroke={c} strokeWidth={s} strokeDasharray="2 3"/></svg>);
  if (index === 1) return (<svg width="22" height="22" viewBox="0 0 40 40" fill="none"><path d="M20 5 L33 12 L33 28 L20 35 L7 28 L7 12 Z" stroke={c} strokeWidth={s}/><path d="M20 5 L20 35 M7 12 L33 28 M33 12 L7 28" stroke={c} strokeWidth={s*0.6} opacity="0.5"/></svg>);
  if (index === 2) return (<svg width="22" height="22" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke={c} strokeWidth={s} strokeDasharray="3 3"/><path d="M14 20 L18 24 L26 16" stroke={c} strokeWidth={s*1.3} fill="none" strokeLinecap="round"/></svg>);
  return (<svg width="22" height="22" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" stroke={c} strokeWidth={s} rx="3"/><path d="M14 26 L26 14 M19 14 L26 14 L26 21" stroke={c} strokeWidth={s*1.2} fill="none" strokeLinecap="round"/></svg>);
}

export default Platform;