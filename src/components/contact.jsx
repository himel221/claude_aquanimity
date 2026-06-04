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

function Contact({ palette, onOpen }) {
  const ref = useReveal();
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: ''
  });

  const roles = ['Founder', 'Scientist', 'Investor', 'Operator', 'Government', 'Press'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onOpen) {
      onOpen('contact-submit', { ...formData, role: selectedRole });
    }
    console.log('Form submitted:', { ...formData, role: selectedRole });
    // Reset form
    setFormData({ name: '', email: '', organisation: '', message: '' });
    setSelectedRole('');
  };

  const handleGetInTouch = (e) => {
    e.preventDefault();
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenRoles = (e) => {
    e.preventDefault();
    if (onOpen) onOpen('careers');
  };

  return (
    <section 
      ref={ref} 
      id="contact" 
      style={{ 
        paddingTop: 120, 
        paddingBottom: 0,
        marginBottom: 0,
        background: '#FAF7F0',
        overflow: 'hidden'
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 64,
          alignItems: 'start'
        }}>
          {/* Left Side - Content */}
          <div style={{ paddingTop: 32 }}>
            <div className="label" style={{ 
              marginBottom: 24, 
              fontSize: 11, 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              color: "#1F6E7A" 
            }}>
              § 06 — Partner with Aquanimity
            </div>
            <h2 style={{ 
              fontSize: 'clamp(48px, 5.5vw, 88px)', 
              lineHeight: 1.05, 
              letterSpacing: '-0.02em', 
              fontWeight: 400, 
              color: '#0f1a2a',
              marginBottom: 32
            }}>
              Let's <span className="serif" style={{ fontStyle: 'italic', color: '#2a7a7a', fontWeight: 400 }}>engineer</span>
              <br />
              what's next.
            </h2>
            <p style={{ 
              fontSize: 18, 
              lineHeight: 1.55, 
              color: '#3a3a3a', 
              maxWidth: 460,
              marginBottom: 40
            }}>
              Founders, scientists, capital, governments. If you're building the bioeconomy of the Global South, we want to hear from you.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <button 
                onClick={handleGetInTouch}
                style={{
                  background: '#0f1a2a',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2a3a'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0f1a2a'}
              >
                Get in touch
                <span style={{ fontSize: 16 }}>→</span>
              </button>
              <button 
                onClick={handleOpenRoles}
                style={{
                  background: 'transparent',
                  border: '1px solid #0f1a2a',
                  color: '#0f1a2a',
                  padding: '16px 32px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f1a2a';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#0f1a2a';
                }}
              >
                See open roles
                <span style={{ fontSize: 16 }}>→</span>
              </button>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div style={{
            background: '#f5f2ea',
            borderRadius: 16,
            padding: '40px 48px',
            border: '1px solid #d8d5cc',
            marginBottom: 0
          }}>
            <div className="label" style={{ 
              marginBottom: 32, 
              fontSize: 11, 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              color: "#5a5a5a" 
            }}>
              Brief · 60 Seconds
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Name */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8
                }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Mahmuda Ahmed"
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#3a3a3a',
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@org.com"
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#3a3a3a',
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Organisation */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8
                }}>
                  Organisation
                </label>
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleInputChange}
                  placeholder="ICDDR,B / BRAC / Independent"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#3a3a3a',
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 12
                }}>
                  I Am
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 500,
                        border: selectedRole === role ? '1px solid #0f1a2a' : '1px solid #c8c5bc',
                        background: selectedRole === role ? '#0f1a2a' : 'transparent',
                        color: selectedRole === role ? 'white' : '#3a3a3a',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedRole !== role) {
                          e.currentTarget.style.borderColor = '#0f1a2a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedRole !== role) {
                          e.currentTarget.style.borderColor = '#c8c5bc';
                        }
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8
                }}>
                  What's on your mind
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="A line or two — we'll reply within 48h."
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#3a3a3a',
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#0f1a2a',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 8,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2a3a'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0f1a2a'}
              >
                Send brief
                <span style={{ fontSize: 16 }}>→</span>
              </button>
            </form>
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
        
        @media (max-width: 1000px) {
          #contact .wrap > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        
        @media (max-width: 600px) {
          #contact .wrap {
            padding: 0 20px !important;
          }
          #contact [style*="padding: 40px 48px"] {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;