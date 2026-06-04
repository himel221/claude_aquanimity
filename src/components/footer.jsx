import React, { useState, useEffect, useRef } from 'react';

// Arrow icon component
const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Mark/Logo component
const Mark = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="1.5" fill="none"/>
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

function FooterCTA({ palette, onOpen }) {
  const ref = useReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: ''
  });
  const [selectedTags, setSelectedTags] = useState([]);
  
  const tags = ['Founder', 'Scientist', 'Investor', 'Operator', 'Government', 'Press'];
  
  const handleGetInTouch = (e) => {
    e.preventDefault();
    window.location.href = "mailto:hello@aquanimity.bd";
  };
  
  const handleSeeRoles = (e) => {
    e.preventDefault();
    if (onOpen) onOpen('careers');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks — we\'ll be in touch within 48 hours.');
    setFormData({ name: '', email: '', organisation: '', message: '' });
    setSelectedTags([]);
  };
  
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <section ref={ref} id="contact" style={{ paddingTop: 120, paddingBottom: 0, background: '#F2EDE3', fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif" }}>
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          {/* Left side - Text Content */}
          <div>
            <div className="label" style={{ marginBottom: 18, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
              § 06 — Partner with Aquanimity
            </div>
            <h2 style={{ 
              fontSize: 'clamp(40px, 6vw, 88px)', 
              lineHeight: 1, 
              letterSpacing: '-0.03em', 
              fontWeight: 900,
              color: 'var(--ink)',
              fontFamily: "'Red Hat Display', sans-serif",
              margin: 0
            }}>
              Let's{' '}
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                engineer
              </span>
              <br />
              what's next.
            </h2>
            <p style={{ 
              marginTop: 28, 
              fontSize: 18, 
              color: 'var(--ink-2)', 
              lineHeight: 1.55, 
              maxWidth: 480,
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 400
            }}>
              Founders, scientists, capital, governments. If you're building the bioeconomy of the Global South, we want to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
              <button 
                onClick={handleGetInTouch}
                style={{
                  padding: '14px 28px',
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 40,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  fontFamily: "'Red Hat Display', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.gap = '14px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.gap = '10px';
                }}
              >
                Get in touch <Arrow />
              </button>
              <button 
                onClick={handleSeeRoles}
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  color: 'var(--ink)',
                  border: '1px solid var(--rule)',
                  borderRadius: 40,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  fontFamily: "'Red Hat Display', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                  e.currentTarget.style.gap = '14px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--rule)';
                  e.currentTarget.style.color = 'var(--ink)';
                  e.currentTarget.style.gap = '10px';
                }}
              >
                See open roles <Arrow />
              </button>
            </div>
          </div>

          {/* Right side - Form */}
          <form onSubmit={handleSubmit} style={{ 
            background: '#FAF7F0', 
            padding: 36, 
            border: '1px solid var(--rule)', 
            borderRadius: 24,
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            fontFamily: "'Red Hat Display', sans-serif"
          }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 24, fontWeight: 600, fontFamily: "'Red Hat Display', sans-serif" }}>
              BRIEF · 60 SECONDS
            </div>
            
            <Field 
              label="Your name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Mahmuda Ahmed" 
            />
            
            <Field 
              label="Email" 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@org.com" 
            />
            
            <Field 
              label="Organisation" 
              name="organisation"
              value={formData.organisation}
              onChange={handleInputChange}
              placeholder="ICDDR,B / BRAC / Independent" 
            />
            
            <div style={{ marginBottom: 24 }}>
              <label className="label" style={{ display: 'block', marginBottom: 10, fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
                I am
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {tags.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    isActive={selectedTags.includes(tag)}
                    onClick={() => handleTagToggle(tag)}
                  />
                ))}
              </div>
            </div>
            
            <Field 
              label="What's on your mind" 
              type="textarea" 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="A line or two — we'll reply within 48h." 
            />
            
            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                marginTop: 16,
                padding: '14px 24px',
                background: 'var(--ink)',
                color: 'white',
                border: 'none',
                borderRadius: 40,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.3s ease',
                fontFamily: "'Red Hat Display', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.gap = '14px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ink)';
                e.currentTarget.style.gap = '10px';
              }}
            >
              Send brief <Arrow />
            </button>
          </form>
        </div>

        {/* Footer */}
        <Footer />
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
        
        @media (max-width: 1000px) {
          #contact .reveal[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        
        @media (max-width: 600px) {
          #contact .wrap {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

function Field({ label, type = 'text', placeholder, name, value, onChange }) {
  const [focus, setFocus] = useState(false);
  
  const fieldStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid ' + (focus ? 'var(--accent)' : 'var(--rule)'),
    padding: '12px 0 8px 0',
    fontFamily: "'Red Hat Display', sans-serif",
    fontSize: 15,
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.25s ease',
    resize: 'vertical'
  };
  
  return (
    <div style={{ marginBottom: 22 }}>
      <label className="label" style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea 
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)} 
          onBlur={() => setFocus(false)}
          rows={3} 
          placeholder={placeholder}
          style={fieldStyle}
        />
      ) : (
        <input 
          type={type} 
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)} 
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          style={fieldStyle}
        />
      )}
    </div>
  );
}

function Chip({ label, isActive, onClick }) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      style={{
        padding: '8px 18px', 
        borderRadius: 40,
        border: '1px solid ' + (isActive ? 'var(--accent)' : 'var(--rule)'),
        background: isActive ? 'var(--accent)' : 'transparent',
        color: isActive ? 'white' : 'var(--ink)',
        fontSize: 13, 
        fontWeight: 500,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        fontFamily: "'Red Hat Display', sans-serif"
      }}
    >
      {label}
    </button>
  );
}

function Footer() {
  const handleLinkClick = (e, section) => {
    e.preventDefault();
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  // Map section names to IDs
  const sectionMap = {
    'Discover': 'platform',
    'Build': 'platform',
    'Test': 'platform',
    'Launch': 'platform',
    'Institutes': 'institutes',
    'Ventures': 'ventures',
    'Team': 'team',
    'Careers': 'contact',
    'News': 'contact',
    'Contact': 'contact'
  };
  
  const handleFooterClick = (e, item) => {
    e.preventDefault();
    const sectionId = sectionMap[item] || item.toLowerCase();
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <footer style={{ marginTop: 100, paddingTop: 48, paddingBottom: 40, borderTop: '1px solid var(--rule)', fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32 }} className="ftr-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div>
              <div className="logo-image-container">
                <img 
                  src={process.env.PUBLIC_URL + '/images/logo1.png'} 
                  alt="AQUANIMITY BIOHUBS™" 
                  className="nav-logo-image"
                  style={{ 
                    height: '40px', 
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x40?text=AQUANIMITY';
                  }}
                />
              </div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 320, lineHeight: 1.55, fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
            Engineering life. For humanity. 
          </p>
        </div>
        
        <FooterCol title="Company" items={['Institutes','Ventures','Team','Careers','News']} onClick={handleFooterClick} />
        <FooterCol title="Connect" items={['Contact','Press kit','LinkedIn','X / Twitter']} onClick={handleFooterClick} />
        <FooterCol title="Contact" items={['Address: Mirpur, Dhaka-1210','Phone: 0177777789','Email: aquanimity@gmail.com']} onClick={handleFooterClick} />
      </div>

      <div style={{ 
        marginTop: 64, 
        paddingTop: 24, 
        borderTop: '1px solid var(--rule)', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 16, 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
          © {new Date().getFullYear()} AQUANIMITY. ALL RIGHTS RESERVED.
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
          Mirpur, Rupnagar · DHAKA, BD
        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .ftr-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 550px) {
          .ftr-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, items, onClick }) {
  return (
    <div>
      <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
        {items.map((i, x) => (
          <li key={x}>
            <button 
              onClick={(e) => onClick(e, i)}
              style={{ 
                fontSize: 14, 
                color: 'var(--ink-2)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400,
                transition: 'color 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-2)'}
            >
              {i}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCTA;