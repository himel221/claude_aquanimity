import React, { useState, useEffect, useRef, useMemo, useLayoutEffect, useCallback } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    el.querySelectorAll('.reveal').forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

function useTypewriter(words, opts = {}) {
  const { typeSpeed = 55, eraseSpeed = 30, hold = 1400, gap = 320 } = opts;
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | hold | erasing | gap
  useEffect(() => {
    let t;
    const cur = words[i % words.length];
    if (phase === 'typing') {
      if (text.length < cur.length) {
        t = setTimeout(() => setText(cur.slice(0, text.length + 1)), typeSpeed);
      } else {
        t = setTimeout(() => setPhase('hold'), 0);
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('erasing'), hold);
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), eraseSpeed);
      } else {
        t = setTimeout(() => setPhase('gap'), 0);
      }
    } else if (phase === 'gap') {
      t = setTimeout(() => { setI(v => v + 1); setPhase('typing'); }, gap);
    }
    return () => clearTimeout(t);
  }, [text, phase, i, words, typeSpeed, eraseSpeed, hold, gap]);
  return text;
}

function Arrow({ size = 14, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={style}>
      <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
    </svg>
  );
}

function Plus({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Mark({ size = 28, color = 'currentColor' }) {
  // Aquanimity wordmark glyph: a refined circular drop with a horizon
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14.4" stroke={color} strokeWidth="1.4" />
      <path d="M3.6 18.5 C 8 22, 13 22, 16 19 C 19 16, 24 16, 28.4 19" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="11" r="1.6" fill={color} />
    </svg>
  );
}

// Cell-water visual: animated layered bubble (replaces hero photograph fallback)
function HeroBubble({ palette }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 620, margin: '0 auto' }}>
      <svg viewBox="0 0 600 600" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <radialGradient id="bub" cx="38%" cy="34%" r="68%">
            <stop offset="0%" stopColor={palette.bubbleHi} stopOpacity="1" />
            <stop offset="55%" stopColor={palette.bubbleMid} stopOpacity="0.92" />
            <stop offset="100%" stopColor={palette.bubbleLo} stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id="bubInner" cx="62%" cy="62%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="grain" x="0" y="0">
            <feTurbulence baseFrequency="0.9" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>

        {/* outer halo bubbles */}
        <g opacity="0.55">
          <circle cx="120" cy="110" r="22" fill={palette.bubbleHalo} />
          <circle cx="500" cy="180" r="14" fill={palette.bubbleHalo} />
          <circle cx="540" cy="430" r="28" fill={palette.bubbleHalo} />
          <circle cx="80" cy="420" r="11" fill={palette.bubbleHalo} />
          <circle cx="180" cy="520" r="17" fill={palette.bubbleHalo} />
        </g>

        {/* main bubble */}
        <g style={{ animation: 'drift 14s ease-in-out infinite', transformOrigin: 'center' }}>
          <circle cx="300" cy="300" r="240" fill="url(#bub)" />
          <circle cx="300" cy="300" r="240" fill="url(#bubInner)" />
          <circle cx="300" cy="300" r="240" fill="url(#bub)" filter="url(#grain)" opacity="0.4" />
          {/* highlight */}
          <ellipse cx="220" cy="200" rx="80" ry="50" fill="#ffffff" opacity="0.42" />
          <ellipse cx="200" cy="190" rx="38" ry="22" fill="#ffffff" opacity="0.7" />
          {/* inner cell */}
          <circle cx="370" cy="360" r="78" fill={palette.bubbleHi} opacity="0.85" />
          <circle cx="370" cy="360" r="78" fill="url(#bubInner)" />
          <circle cx="370" cy="360" r="22" fill="#ffffff" opacity="0.7" />
          {/* nucleolus speck */}
          <circle cx="364" cy="356" r="7" fill={palette.bubbleLo} opacity="0.9" />
        </g>

        {/* tiny floaters */}
        <g opacity="0.85">
          <circle cx="430" cy="140" r="6" fill={palette.bubbleHi} />
          <circle cx="160" cy="280" r="4" fill={palette.bubbleHi} />
          <circle cx="470" cy="500" r="5" fill={palette.bubbleHi} />
        </g>
      </svg>

      {/* circular caption ring */}
      <svg viewBox="0 0 600 600" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'spin 36s linear infinite' }}>
        <defs>
          <path id="ring" d="M 300, 300 m -270, 0 a 270,270 0 1,1 540,0 a 270,270 0 1,1 -540,0" />
        </defs>
        <text fill={palette.ringText} style={{ font: '500 13px JetBrains Mono, monospace', letterSpacing: '0.3em' }}>
          <textPath href="#ring">ENGINEER · DISCOVER · BUILD · TEST · LAUNCH · ENGINEER · DISCOVER · BUILD · TEST · LAUNCH ·</textPath>
        </text>
      </svg>

      <style>{`
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes drift { 
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(8px, -6px) rotate(2deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

// Export all components and hooks
export { 
  useReveal, 
  useTypewriter, 
  Arrow, 
  Plus, 
  Mark, 
  HeroBubble 
};