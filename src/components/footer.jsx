import React, { useState, useEffect, useRef } from 'react';

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

function FooterCTA({ palette, onOpen }) {
  const ref = useReveal();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    organisation: '', 
    message: '' 
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const tags = ['Founder', 'Scientist', 'Investor', 'Operator', 'Government', 'Press'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\+\d\s\-\(\)]{8,20}$/.test(formData.phone.trim())) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.organisation.trim()) newErrors.organisation = 'Organisation is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => (
    formData.name.trim() !== '' && 
    formData.email.trim() !== '' &&
    /\S+@\S+\.\S+/.test(formData.email) && 
    formData.phone.trim() !== '' &&
    /^[\+\d\s\-\(\)]{8,20}$/.test(formData.phone.trim()) &&
    formData.organisation.trim() !== '' && 
    formData.message.trim() !== ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, organisation: true, message: true });
    if (!validateForm()) return;
    const subject = encodeURIComponent('Message from ' + formData.name);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Organisation: ${formData.organisation}\n` +
      `I am: ${selectedTags.join(', ') || 'Not specified'}\n\n` +
      `Message:\n${formData.message}`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=contact@aquanimitygroup.com&su=${subject}&body=${body}`, '_blank');
    setFormData({ name: '', email: '', phone: '', organisation: '', message: '' });
    setSelectedTags([]);
    setErrors({});
    setTouched({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'email' && formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      setErrors({ ...errors, email: 'Please enter a valid email' });
    if (field === 'phone' && formData.phone && !/^[\+\d\s\-\(\)]{8,20}$/.test(formData.phone.trim()))
      setErrors({ ...errors, phone: 'Please enter a valid phone number' });
  };

  return (
    <section ref={ref} id="contact" className="contact-section">
      <div className="contact-wrap">
        <div className="reveal contact-grid">
          <div className="contact-left">
            <div className="contact-label">§ 06 — Partner with Us</div>
            <h2 className="contact-heading">
              Let's{' '}
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                engineer
              </span>
              <br />what's next.
            </h2>
            <p className="contact-desc">
              Founders, scientists, capital, governments. If you're building the bioeconomy of the Global South, we want to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 20, fontWeight: 600 }}>BRIEF · 100 Words</div>
            
            <Field 
              label="Your name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              onBlur={() => handleBlur('name')} 
              placeholder="Mahmuda Ahmed" 
              error={touched.name && errors.name} 
              required 
            />
            
            <Field 
              label="Email" 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              onBlur={() => handleBlur('email')} 
              placeholder="you@org.com" 
              error={touched.email && errors.email} 
              required 
            />
            
            <Field 
              label="Phone Number" 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              onBlur={() => handleBlur('phone')} 
              placeholder="+880 1234 567890" 
              error={touched.phone && errors.phone} 
              required 
            />
            
            <Field 
              label="Organisation" 
              name="organisation" 
              value={formData.organisation} 
              onChange={handleInputChange} 
              onBlur={() => handleBlur('organisation')} 
              placeholder="ICDDR,B / BRAC / Independent" 
              error={touched.organisation && errors.organisation} 
              required 
            />
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', fontWeight: 500 }}>I am (optional)</label>
              <div className="tags-wrap">
                {tags.map(tag => (
                  <button 
                    key={tag} 
                    type="button" 
                    onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                    className={`tag-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <Field 
              label="What's on your mind" 
              type="textarea" 
              name="message" 
              value={formData.message} 
              onChange={handleInputChange} 
              onBlur={() => handleBlur('message')} 
              placeholder="A line or two — we'll reply within 48h." 
              error={touched.message && errors.message} 
              required 
            />
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={!isFormValid()} 
              style={{ 
                opacity: isFormValid() ? 1 : 0.7, 
                cursor: isFormValid() ? 'pointer' : 'not-allowed' 
              }}
            >
              Send brief <Arrow />
            </button>
          </form>
        </div>
        <Footer />
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }

        .contact-section { padding: 72px 0 0; background: #181A43; font-family: 'Red Hat Display', sans-serif; }
        .contact-wrap { max-width: 1400px; margin: 0 auto; padding: 0 32px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .contact-label { margin-bottom: 14px; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: white; font-weight: 600; }
        .contact-heading { font-size: clamp(30px, 3vw, 58px); line-height: 0.98; letter-spacing: -0.03em; font-weight: 900; color:white; margin: 0; }
        .contact-desc { margin-top: 24px; font-size: 17px; color: white; line-height: 1.55; max-width: 480px; font-weight: 400; }
        .contact-form { background: white; padding: 32px; border: 1px solid var(--rule); border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
        .tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag-chip { padding: 7px 16px; border-radius: 40px; border: 1px solid var(--rule); background: transparent; color: #0E1136; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; font-family: 'Red Hat Display', sans-serif; }
        .tag-chip.active { border-color: #181a43; background: #181A43; color: white; }
        .submit-btn { width: 100%; justify-content: center; margin-top: 12px; padding: 13px 24px; background: #0E1136; color: white; border: none; border-radius: 40px; display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; transition: all 0.3s ease; font-family: 'Red Hat Display', sans-serif; }
        .submit-btn:hover:not(:disabled) { background: #1a1f4a; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }

        @media (max-width: 1000px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }

        @media (max-width: 980px) {
          .contact-section { padding: 56px 0 0 !important; }
          .contact-wrap { padding: 0 20px !important; }
        }

        @media (max-width: 768px) {
          .contact-section { padding: 36px 0 0 !important; }
          .contact-wrap { padding: 0 16px !important; }
          .contact-heading { font-size: clamp(28px, 8vw, 42px) !important; line-height: 1.04 !important; }
          .contact-desc { font-size: 14px !important; margin-top: 16px !important; max-width: 100% !important; }
          .contact-label { font-size: 10px !important; margin-bottom: 10px !important; }
          .contact-form { padding: 24px 18px !important; border-radius: 20px !important; }
          .tag-chip { padding: 6px 12px !important; font-size: 11px !important; }
          .tags-wrap { gap: 6px !important; }
          .submit-btn { font-size: 13px !important; padding: 12px 20px !important; }
        }

        @media (max-width: 480px) {
          .contact-section { padding: 28px 0 0 !important; }
          .contact-heading { font-size: clamp(24px, 9vw, 36px) !important; line-height: 1.06 !important; }
          .contact-desc { font-size: 13px !important; }
          .contact-form { padding: 20px 14px !important; border-radius: 18px !important; }
          .tag-chip { padding: 5px 10px !important; font-size: 10px !important; }
          .submit-btn { font-size: 12px !important; padding: 11px 18px !important; }
        }

        @media (max-width: 360px) {
          .contact-section { padding: 24px 0 0 !important; }
          .contact-heading { font-size: clamp(20px, 7vw, 28px) !important; line-height: 1.08 !important; }
          .contact-form { padding: 16px 12px !important; border-radius: 16px !important; }
        }

        :root {
          --accent: #1F6E7A;
          --accent-soft: rgba(31, 110, 122, 0.1);
          --rule: rgba(0, 0, 0, 0.08);
          --muted: rgba(0, 0, 0, 0.5);
          --paper: #FAF7F0;
          --bone: #F2EDE3;
        }
      `}</style>
    </section>
  );
}

function Field({ label, type = 'text', placeholder, name, value, onChange, onBlur, error, required }) {
  const [focus, setFocus] = useState(false);
  const style = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: '2px solid ' + (error ? '#e74c3c' : (focus ? 'var(--accent)' : 'var(--rule)')),
    padding: '10px 0 6px 0', fontFamily: "'Red Hat Display', sans-serif", fontSize: 14,
    color: '#0E1136', outline: 'none', transition: 'border-color 0.25s ease', resize: 'vertical'
  };
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', marginBottom: 5, fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', fontWeight: 500 }}>
        {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => { setFocus(false); if (onBlur) onBlur(); }} rows={3} placeholder={placeholder} style={style} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => { setFocus(false); if (onBlur) onBlur(); }} placeholder={placeholder} style={style} />
      )}
      {error && <div style={{ fontSize: 11, color: '#e74c3c', marginTop: 3 }}>{error}</div>}
    </div>
  );
}

function Footer() {
  const handleFooterClick = (e, item) => {
    e.preventDefault();
    const map = { 'Institutes': 'institutes', 'Ventures': 'ventures', 'Team': 'team', 'News': 'news', 'Contact': 'contact' };
    const el = document.getElementById(map[item] || item.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@aquanimitygroup.com', '_blank');
  };

  return (
   
   <footer className="site-footer">
      <div className="ftr-grid">
        <div>
          <div style={{ marginBottom: 16 }}>
            <img src={process.env.PUBLIC_URL + '/images/logo1.png'} alt="AQUANIMITY BIOHUBS™" className="footer-logo"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150x40?text=AQUANIMITY'; }} />
          </div>
          <p className="footer-desc">Discovering, translating and commercializing biosciences for Bangladesh and beyond.</p>
        </div>
        <FooterCol title="Company" items={['Institutes','Ventures','Team','News']} onClick={handleFooterClick} />
        <div>
          <div className="ftr-col-title">Connect</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="https://www.linkedin.com/company/aquanimitygroup/about/" target="_blank" rel="noopener noreferrer" className="ftr-link">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/aquanimitygroup?stkn=emdma2xpam5pdmdw&utm_source=qr" target="_blank" rel="noopener noreferrer" className="ftr-link">Instagram</a></li>
          </ul>
        </div>
        <div>
          <div className="ftr-col-title">Contact</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            <li className="ftr-text">Plot 68-71, Block K, Road 4 Rupnagar Rd, Dhaka 1216</li>
            <li className="ftr-text">+8801310346592</li>
            <li><a href="#" onClick={handleEmailClick} className="ftr-link">contact@aquanimitygroup.com</a></li>
          </ul>
        </div>
      </div>
      <div className="ftr-bottom">
        <div className="ftr-copy">© {new Date().getFullYear()} AQUANIMITY BANGLADESH LTD. ALL RIGHTS RESERVED.</div>
        <div className="ftr-copy">DHAKA, BANGLADESH</div>
      </div>

      <style>{`
        .site-footer { 
          margin-top: 72px; 
          padding-top: 40px; 
          padding-bottom: 32px; 
          border-top: 1px solid rgba(255,255,255,0.1); 
          font-family: 'Red Hat Display', sans-serif;
          background: #181A43; 
        }
        .ftr-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; }
        .footer-logo { height: 36px; width: auto; object-fit: contain; filter: brightness(0) invert(1); }
        .footer-desc { font-size: 13px; color: white; max-width: 320px; line-height: 1.55; font-weight: 400; text-align: justify; }
        .ftr-col-title { margin-bottom: 12px; font-size: 11px; letter-spacing: 0.2em; color: white; font-weight: 900; }
        .ftr-link { font-size: 13px; color: white; text-decoration: none; font-weight: 400; transition: color 0.2s ease; cursor: pointer; display: inline-block; }
        .ftr-link:hover { color: var(--accent); }
        .ftr-text { font-size: 13px; color: white; font-weight: 400; }
        .ftr-bottom { margin-top: 48px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center; }
        .ftr-copy { font-size: 10px; letter-spacing: 0.18em; color: white; font-weight: 500; }

        @media (max-width: 900px) {
          .ftr-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }

        @media (max-width: 768px) {
          .site-footer { margin-top: 48px !important; padding-top: 28px !important; padding-bottom: 24px !important; }
          .footer-logo { height: 28px !important; }
          .footer-desc { font-size: 12px !important; }
          .ftr-link, .ftr-text { font-size: 12px !important; }
          .ftr-col-title { font-size: 10px !important; margin-bottom: 10px !important; }
          .ftr-bottom { margin-top: 32px !important; padding-top: 16px !important; }
          .ftr-copy { font-size: 9px !important; }
        }

        @media (max-width: 550px) {
          .ftr-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }

        @media (max-width: 480px) {
          .site-footer { margin-top: 36px !important; }
        }
      `}</style>
    </footer>

  );
}

function FooterCol({ title, items, onClick }) {
  return (
    <div>
      <div className="ftr-col-title">{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
        {items.map((i, x) => (
          <li key={x}>
            <button onClick={(e) => onClick(e, i)} className="ftr-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>{i}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCTA;