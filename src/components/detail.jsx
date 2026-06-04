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

// Footer Component
const DetailFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      marginTop: 80, 
      paddingTop: 48, 
      paddingBottom: 40, 
      borderTop: '1px solid var(--rule)',
      background: '#FAF7F0'
    }}>
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32 }} className="ftr-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: 'rgba(31,110,122,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14.4" stroke="var(--accent)" strokeWidth="1.4" />
                  <path d="M3.6 18.5 C 8 22, 13 22, 16 19 C 19 16, 24 16, 28.4 19" stroke="var(--accent)" strokeWidth="1.4" fill="none" />
                  <circle cx="16" cy="11" r="1.6" fill="var(--accent)" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, letterSpacing: '0.02em', fontSize: 18, color: 'var(--ink)' }}>AQUANIMITY</div>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--accent)', marginTop: 2 }}>BIOHUBS™</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 320, lineHeight: 1.55 }}>
              Engineering life. For humanity. The bioeconomy of the Bay of Bengal — designed, built, and shipped from Dhaka.
            </p>
          </div>
          <FooterCol title="Platform" items={['Discover','Build','Test','Launch']} />
          <FooterCol title="Company" items={['Institutes','Ventures','Team','Careers']} />
          <FooterCol title="Connect" items={['Contact','LinkedIn','Twitter']} />
          <FooterCol title="Studios" items={['Dhaka HQ','Singapore','Boston','London']} />
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
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)' }}>
            © {currentYear} AQUANIMITY. ALL RIGHTS RESERVED.
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)' }}>
            23.78°N · 90.36°E · DHAKA, BD
          </div>
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
};

const FooterCol = ({ title, items }) => {
  return (
    <div>
      <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
        {items.map((i, x) => (
          <li key={x}>
            <span style={{ fontSize: 14, color: 'var(--ink-2)', transition: 'color 0.2s ease' }}>
              {i}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Back Button Component
const BackButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      background: '#FAF7F0',
      borderBottom: '1px solid var(--rule)',
      paddingTop: '92px'
    }}>
      <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: isHovered ? '14px' : '10px',
            background: '#ECE5D6',
            border: '1px solid var(--rule)',
            borderRadius: 40,
            padding: '12px 28px',
            color: 'var(--ink)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Detail page used for venture / institute / list views
function DetailPage({ route, onClose, palette }) {
  const data = JSON.parse(document.getElementById('aquanimity-data').textContent);
  const ref = useReveal();

  let view;
  
  if (route.startsWith('venture:')) {
    const id = route.split(':')[1];
    const v = data.ventures?.find(x => x.id === id);
    if (v) {
      view = <VentureDetail v={v} data={data} palette={palette} />;
    }
  } else if (route.startsWith('institute:')) {
    const n = route.split(':')[1];
    const it = data.institutes?.find(x => x.n === n);
    if (it) {
      view = <InstituteDetail it={it} data={data} palette={palette} />;
    }
  } else if (route === 'ventures-list') {
    view = <ListView title="Our Ventures" subtitle="Building category-defining ventures." items={data.ventures?.map(v => ({
      n: v.n, title: v.name, blurb: v.blurb, img: v.img || "/images/Super_wat.png", tag: v.stage, href: 'venture:' + v.id
    })) || []} kind="venture" palette={palette} />;
  } else if (route === 'institutes-list') {
    view = <ListView title="Our Institutes" subtitle="Four specialized institutes. One mission — transform healthcare." items={data.institutes?.map(it => ({
      n: it.n, title: it.title, blurb: it.blurb, tag: it.tag, href: 'institute:' + it.n
    })) || []} kind="institute" palette={palette} />;
  } else if (route === 'team-list') {
    view = <TeamFull data={data} palette={palette} />;
  } else if (route === 'partners-list') {
    view = <PartnersFull data={data} palette={palette} />;
  } else if (route === 'careers') {
    view = <CareersView palette={palette} />;
  } else if (route === 'platform-detail') {
    view = <PlatformDetail data={data} palette={palette} />;
  } else {
    view = <div style={{ padding: 80, textAlign: 'center' }}>Page not found.</div>;
  }

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: '#FAF7F0' }}>
      <BackButton onClick={onClose} />
      <div style={{ background: '#ECE5D6' }}>
        {view}
      </div>
      <DetailFooter />
    </div>
  );
}

function SlideIn({ from = 'left', delay = 0, children, style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach(e => {
      if (e.isIntersecting) { setSeen(true); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? 'none' : (from === 'left' ? 'translateX(-40px)' : from === 'right' ? 'translateX(40px)' : 'translateY(30px)'),
      transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.7,0,.2,1) ${delay}s`,
      ...style
    }}>{children}</div>
  );
}

function VentureDetail({ v, data, palette }) {
  // Venture-specific images for the card section
  const ventureCards = {
    "SuperWater": {
      mainImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop",
      techImage: "https://amplifiedperspectives.burnsmcd.com/hubfs/CORP_AmplifiedPerspectives/assets/Infrastructure/using-technology-to-manage-our-vital-water-resources-Patrick-Clifford-amplified-perspectives-burns-mcdonnell.jpg",
      teamImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      description: "Advanced bio-inspired filtration membranes removing arsenic and microplastics from water sources across Bangladesh."
    },
    "ThermoReVax": {
      mainImage: "https://images.unsplash.com/photo-1582719505981-e2f3d5a6b0b4?w=800&h=600&fit=crop",
      techImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=600&fit=crop",
      teamImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
      description: "Thermostable vaccine technology eliminating cold chain requirements for last-mile delivery in tropical climates."
    },
    "Blue Microbiome": {
      mainImage: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop",
      techImage: "https://images.unsplash.com/photo-1535591273668-578e3112cbf8?w=800&h=600&fit=crop",
      teamImage: "https://images.unsplash.com/photo-1577557159867-31facc1beea5?w=800&h=600&fit=crop",
      description: "Probiotic solutions for sustainable shrimp farming, reducing disease outbreaks and improving yields."
    }
  };

  const cardImages = ventureCards[v.name] || {
    mainImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    techImage: "https://images.unsplash.com/photo-1576081149789-84f3c7efcbee?w=800&h=600&fit=crop",
    teamImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    description: "Innovative biotechnology solutions for global health and environmental challenges."
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
      {/* Hero Section */}
      <div className="img-frame" style={{ height: 'min(70vh, 700px)', background: '#000', position: 'relative' }}>
        <img src={v.img || cardImages.mainImage} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,27,44,0.2), rgba(14,27,44,0.85))' }} />
        <div className="wrap" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 60, maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <SlideIn from="left">
            <div className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, letterSpacing: '0.22em', marginBottom: 16 }}>
              VENTURE {v.n} · {v.stage.toUpperCase()}
            </div>
          </SlideIn>
          <SlideIn from="left" delay={0.1}>
            <h1 style={{ color: 'var(--paper)', fontSize: 'clamp(56px, 9vw, 130px)', lineHeight: 0.92, fontWeight: 500, letterSpacing: '-0.025em' }}>
              {v.name}
            </h1>
          </SlideIn>
          <SlideIn from="left" delay={0.2}>
            <div style={{ color: 'var(--paper)', fontSize: 22, marginTop: 18, maxWidth: 640, opacity: 0.92 }}>
              {v.tag}
            </div>
          </SlideIn>
        </div>
      </div>

      {/* Main Content with Cards */}
      <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
        {/* Venture Brief and Description */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, marginBottom: 80 }}>
          <SlideIn from="left">
            <div className="label" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>VENTURE BRIEF</div>
            <div style={{ marginTop: 24, display: 'grid', gap: 18 }}>
              <Row k="Stage" v={v.stage} />
              <Row k="Founded" v={v.founded} />
              <Row k="HQ" v={v.location} />
              <Row k="Status" v="Active · Scaling" />
            </div>
          </SlideIn>
          <SlideIn from="right">
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 28 }}>
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>The vision.</span> {v.blurb}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)' }}>
              {v.name} is a wholly-owned operating venture of Aquanimity BioHubs. We use the BioPlatform to compress
              the timeline from frontier science to real impact — co-developing technology, capital,
              and go-to-market with founders who choose to build from Bangladesh.
            </p>
          </SlideIn>
        </div>

        {/* Cards Section - 3 Professional Cards */}
        <div style={{ marginTop: 40 }}>
          <SlideIn from="left">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h3 style={{ fontSize: 32, fontWeight: 500, marginBottom: 12 }}>
                <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Inside</span> {v.name}
              </h3>
              <div style={{ width: 60, height: 2, background: 'var(--accent)', margin: '0 auto' }} />
            </div>
          </SlideIn>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {/* Card 1 - Technology */}
            <SlideIn from="bottom" delay={0.1}>
              <div 
                onMouseEnter={() => setHoveredCard('tech')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'var(--bone)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  transform: hoveredCard === 'tech' ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === 'tech' ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <div className="img-frame" style={{ height: 220, overflow: 'hidden' }}>
                  <img 
                    src={cardImages.techImage} 
                    alt={`${v.name} Technology`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      transform: hoveredCard === 'tech' ? 'scale(1.05)' : 'scale(1)'
                    }} 
                  />
                </div>
                <div style={{ padding: 24 }}>
                  <div className="label" style={{ marginBottom: 12, color: 'var(--accent)' }}>TECHNOLOGY</div>
                  <h4 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>
                    Advanced Platform
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                    {v.name === 'SuperWater' ? 'Bio-inspired filtration membranes using aquaporin proteins for molecular-level water purification.' :
                     v.name === 'ThermoReVax' ? 'Lipid nanoparticle formulation with proprietary thermostabilization technology.' :
                     'Next-generation probiotic formulations with targeted delivery for aquaculture applications.'}
                  </p>
                </div>
              </div>
            </SlideIn>

            {/* Card 2 - Impact */}
            <SlideIn from="bottom" delay={0.2}>
              <div 
                onMouseEnter={() => setHoveredCard('impact')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'var(--bone)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  transform: hoveredCard === 'impact' ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === 'impact' ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <div className="img-frame" style={{ height: 220, overflow: 'hidden' }}>
                  <img 
                    src={cardImages.mainImage} 
                    alt={`${v.name} Impact`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      transform: hoveredCard === 'impact' ? 'scale(1.05)' : 'scale(1)'
                    }} 
                  />
                </div>
                <div style={{ padding: 24 }}>
                  <div className="label" style={{ marginBottom: 12, color: 'var(--accent)' }}>IMPACT</div>
                  <h4 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>
                    Measurable Change
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                    {v.name === 'SuperWater' ? '150K+ people with clean water access. 50+ community filtration systems installed.' :
                     v.name === 'ThermoReVax' ? 'Reaching 2M+ underserved patients. Eliminating cold chain in 12 districts.' :
                     '40% disease reduction in pilot farms. 500+ farmers trained in sustainable practices.'}
                  </p>
                </div>
              </div>
            </SlideIn>

            {/* Card 3 - Team */}
            <SlideIn from="bottom" delay={0.3}>
              <div 
                onMouseEnter={() => setHoveredCard('team')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'var(--bone)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  transform: hoveredCard === 'team' ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === 'team' ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <div className="img-frame" style={{ height: 220, overflow: 'hidden' }}>
                  <img 
                    src={cardImages.teamImage} 
                    alt={`${v.name} Team`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      transform: hoveredCard === 'team' ? 'scale(1.05)' : 'scale(1)'
                    }} 
                  />
                </div>
                <div style={{ padding: 24 }}>
                  <div className="label" style={{ marginBottom: 12, color: 'var(--accent)' }}>TEAM</div>
                  <h4 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>
                    World-Class Talent
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                    12+ researchers and engineers. PhDs from MIT, Stanford, and Dhaka University. 
                    Industry veterans with 50+ years combined experience.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Milestones Section */}
        <div style={{ marginTop: 80, background: 'var(--accent-soft)', borderRadius: 20, padding: 48 }}>
          <SlideIn from="bottom">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h3 style={{ fontSize: 28, fontWeight: 500, marginBottom: 12, color: 'var(--ink)' }}>
                Key <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Milestones</span>
              </h3>
              <div style={{ width: 50, height: 2, background: 'var(--accent)', margin: '0 auto' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
              {[
                { quarter: "Q1 2024", milestone: "Seed Funding Closed" },
                { quarter: "Q3 2024", milestone: "Prototype Complete" },
                { quarter: "Q1 2025", milestone: "Pilot Launch" },
                { quarter: "Q4 2025", milestone: "Market Entry" }
              ].map((m, idx) => (
                <div key={idx} style={{ padding: '20px 16px', background: 'var(--paper)', borderRadius: 12 }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 8 }}>{m.quarter}</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{m.milestone}</div>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}

function InstituteDetail({ it, data, palette }) {
  // Updated institute images for the 4 new institutes
  const instituteImages = {
    "Institute of Health Science": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
    "Institute of Applied Bioengineering & Material Science": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=600&fit=crop",
    "Institute of Computational Biology & Data Science": "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=600&fit=crop",
    "Institute of Molecular Biology & Omics": "https://images.unsplash.com/photo-1582719505981-e2f3d5a6b0b4?w=1200&h=600&fit=crop"
  };

  const instituteIcon = instituteImages[it.title] || "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=600&fit=crop";

  // Research areas based on the new institutes
  const researchAreas = {
    "Institute of Health Science": [
      "Clinical Research & Translational Medicine",
      "Drug Discovery & Development",
      "Personalized Medicine & Genomics",
      "Global Health Initiatives",
      "Infectious Disease Research"
    ],
    "Institute of Applied Bioengineering & Material Science": [
      "Tissue Engineering & Regenerative Medicine",
      "Smart Biomaterials Development",
      "3D Bioprinting Technologies",
      "Bio-manufacturing Processes",
      "Implantable Medical Devices"
    ],
    "Institute of Computational Biology & Data Science": [
      "AI & Machine Learning in Biology",
      "Genomic Data Analysis",
      "Protein Structure Prediction",
      "Systems Biology Modeling",
      "Bioinformatics Pipeline Development"
    ],
    "Institute of Molecular Biology & Omics": [
      "Genomics & Epigenomics",
      "Proteomics & Metabolomics",
      "Single Cell Analysis Technologies",
      "Molecular Diagnostics",
      "Multi-omics Integration"
    ]
  };

  const areas = researchAreas[it.title] || [
    "Advanced biomedical research",
    "Cutting-edge molecular technologies",
    "Interdisciplinary scientific collaboration",
    "Translational research programs",
    "Innovative therapeutic solutions"
  ];

  const stats = [
    { label: "RESEARCHERS", value: "45+" },
    { label: "ACTIVE PROJECTS", value: "28" },
    { label: "PUBLICATIONS", value: "156" },
    { label: "PARTNERS", value: "32" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="img-frame" style={{ height: 'min(55vh, 480px)', background: '#000', position: 'relative' }}>
        <img src={instituteIcon} alt={it.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(14,27,44,0.3), rgba(14,27,44,0.85))' }} />
        <div className="wrap" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 50, maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <SlideIn from="left">
            <div className="mono" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, letterSpacing: '0.22em', marginBottom: 16 }}>
              INSTITUTE {it.n} · {it.tag}
            </div>
          </SlideIn>
          <SlideIn from="left" delay={0.1}>
            <h1 style={{ color: 'var(--paper)', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.025em', maxWidth: 900 }}>
              {it.title}
            </h1>
          </SlideIn>
          <SlideIn from="left" delay={0.2}>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 17, marginTop: 18, maxWidth: 600, lineHeight: 1.45 }}>
              {it.blurb}
            </p>
          </SlideIn>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: 'var(--accent)', padding: '36px 0' }}>
        <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {stats.map((stat, idx) => (
              <SlideIn key={idx} from="bottom" delay={idx * 0.1}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: 'white', fontFamily: 'serif', fontStyle: 'italic' }}>{stat.value}</div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>{stat.label}</div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 70, paddingBottom: 70 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, marginBottom: 70 }}>
          <SlideIn from="left">
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 500, lineHeight: 1.15, marginBottom: 24 }}>
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Research</span> Areas
            </h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {areas.slice(0, 5).map((area, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--rule)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                  <span style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>{area}</span>
                </div>
              ))}
            </div>
          </SlideIn>
          
          <SlideIn from="right">
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 500, lineHeight: 1.15, marginBottom: 24 }}>
              About the <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Institute</span>
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 18 }}>
              The {it.title} is one of four interconnected institutes that make up the Aquanimity BioPlatform. 
              Each institute is led by an independent scientific board with world-class researchers from leading 
              institutions across the globe.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 18 }}>
              Our researchers share infrastructure, capital, and talent across the network — compressing the time 
              from a question in the lab to a product in the field.
            </p>
            <div style={{ background: 'var(--bone)', padding: 22, borderRadius: 16, marginTop: 20 }}>
              <div className="label" style={{ marginBottom: 12, color: 'var(--accent)' }}>KEY INITIATIVES</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--rule)', fontSize: 13.5 }}>✓ Annual Research Symposium</li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--rule)', fontSize: 13.5 }}>✓ Visiting Scientist Program</li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--rule)', fontSize: 13.5 }}>✓ Open Innovation Challenges</li>
                <li style={{ padding: '8px 0', fontSize: 13.5 }}>✓ Industry Fellowship Program</li>
              </ul>
            </div>
          </SlideIn>
        </div>

        {/* Featured Researchers */}
        <div style={{ marginTop: 40 }}>
          <SlideIn from="left">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h3 style={{ fontSize: 26, fontWeight: 500, marginBottom: 10 }}>
                Featured <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Researchers</span>
              </h3>
              <div style={{ width: 50, height: 2, background: 'var(--accent)', margin: '0 auto' }} />
            </div>
          </SlideIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { name: "Dr. Amina Rahman", title: "Principal Investigator", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Prof. James Wilson", title: "Visiting Scholar", img: "https://randomuser.me/api/portraits/men/52.jpg" },
              { name: "Dr. Farhana Akhter", title: "Research Lead", img: "https://randomuser.me/api/portraits/women/89.jpg" }
            ].map((researcher, idx) => (
              <SlideIn key={idx} from="bottom" delay={idx * 0.1}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 14px', border: '2px solid var(--accent)' }}>
                    <img src={researcher.img} alt={researcher.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{researcher.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 4 }}>{researcher.title}</div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ marginTop: 70, background: 'var(--bone)', borderRadius: 20, padding: 40, textAlign: 'center' }}>
          <SlideIn from="bottom">
            <h4 style={{ fontSize: 24, fontWeight: 500, marginBottom: 14 }}>
              Interested in <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)' }}>collaborating</span>?
            </h4>
            <p style={{ fontSize: 14.5, color: 'var(--ink-2)', marginBottom: 22, maxWidth: 450, margin: '0 auto 22px' }}>
              We're always open to research partnerships and visiting positions.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('aq-route', { detail: 'contact' }))}
              style={{
                padding: '11px 30px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
            >
              Get in touch →
            </button>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}

function ListView({ title, subtitle, items, kind, palette }) {
  const handleItemClick = (e, href) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('aq-route', { detail: href }));
  };

  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <SlideIn from="left">
        <div className="label" style={{ marginBottom: 18, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>ALL {title.toUpperCase()}</div>
      </SlideIn>
      <SlideIn from="left" delay={0.08}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 600 }}>
          {title}
        </h1>
      </SlideIn>
      <SlideIn from="left" delay={0.16}>
        <p style={{ fontSize: 20, color: 'var(--ink-2)', maxWidth: 700, marginTop: 18, lineHeight: 1.4 }}>{subtitle}</p>
      </SlideIn>

      <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: kind === 'venture' ? '1fr 1fr' : '1fr', gap: kind === 'venture' ? 24 : 0 }}>
        {items?.map((i, idx) => (
          <SlideIn key={idx} from={idx % 2 ? 'right' : 'left'} delay={idx * 0.06}>
            {kind === 'venture' ? (
              <button onClick={(e) => handleItemClick(e, i.href)} style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div className="img-frame" style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', borderRadius: 24 }}>
                  <img src={i.img} alt={i.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,27,44,0.05), rgba(14,27,44,0.85))' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 28 }}>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', opacity: 0.8, color: 'white' }}>{i.n} · {i.tag.toUpperCase()}</div>
                    <div className="serif" style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 500, marginTop: 10, lineHeight: 1, color: 'white' }}>{i.title}</div>
                    <div style={{ fontSize: 15, marginTop: 10, opacity: 0.85, maxWidth: 460, color: 'white' }}>{i.blurb}</div>
                  </div>
                </div>
              </button>
            ) : (
              <button onClick={(e) => handleItemClick(e, i.href)} style={{
                display: 'grid', gridTemplateColumns: '64px 200px 1fr 40px',
                alignItems: 'center', gap: 24, padding: '32px 0', borderBottom: '1px solid var(--rule)',
                width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'
              }}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: '0.22em', color: 'var(--muted)' }}>{i.n}</span>
                <span className="label" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>{i.tag}</span>
                <div>
                  <div style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 500, letterSpacing: '-0.015em' }}>{i.title}</div>
                  <div style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 8, maxWidth: 720 }}>{i.blurb}</div>
                </div>
                <Arrow />
              </button>
            )}
          </SlideIn>
        ))}
      </div>
    </div>
  );
}

function TeamFull({ data, palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <SlideIn from="left">
        <div className="label" style={{ marginBottom: 18, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>THE FULL TEAM</div>
      </SlideIn>
      <SlideIn from="left" delay={0.08}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 600 }}>
          Builders. Scientists. <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Dreamers.</span> Doers.
        </h1>
      </SlideIn>

      {Object.entries(data.team || {}).map(([cat, members], i) => (
        <div key={cat} style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--rule)' }}>
          <SlideIn from="left">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--muted)' }}>0{i+1}</span>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, letterSpacing: '-0.015em' }}>{cat}</h2>
            </div>
          </SlideIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {members.map((m, j) => (
              <SlideIn key={j} from="bottom" delay={j * 0.05}>
                <div className="img-frame" style={{ aspectRatio: '4/5', borderRadius: 20, overflow: 'hidden' }}>
                  <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--ink)' }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{m.title}</div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PartnersFull({ data, palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <SlideIn from="left"><div className="label" style={{ marginBottom: 18, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>ALL PARTNERS</div></SlideIn>
      <SlideIn from="left" delay={0.08}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 600 }}>
          Backed by the institutions <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>building</span> the future.
        </h1>
      </SlideIn>

      <div style={{ marginTop: 64, borderTop: '1px solid var(--rule)' }}>
        {(data.partners || []).map((p, i) => (
          <SlideIn key={i} from={i%2?'right':'left'} delay={i*0.05}>
            <div style={{
              display: 'grid', gridTemplateColumns: '220px 1fr 200px 60px',
              alignItems: 'center', gap: 32, padding: '36px 0', borderBottom: '1px solid var(--rule)'
            }}>
              <div style={{ height: 96, display: 'grid', placeItems: 'center', background: 'var(--bone)', border: '1px solid var(--rule)', borderRadius: 12, padding: 14 }}>
                <img src={p.logo} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div className="label" style={{ marginBottom: 8, color: 'var(--accent)' }}>{p.kind}</div>
                <div style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 600, lineHeight: 1.15, marginBottom: 10 }}>{p.name}</div>
                <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 640 }}>{p.blurb}</p>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)' }}>
                <div>{p.loc}</div>
                <div style={{ marginTop: 6 }}>SINCE {p.since}</div>
              </div>
              <Arrow />
            </div>
          </SlideIn>
        ))}
      </div>
    </div>
  );
}

function CareersView({ palette }) {
  const roles = [
    { team: 'SuperWater', title: 'Senior Water Engineer', loc: 'Dhaka', type: 'Full-time' },
    { team: 'ThermoReVax', title: 'Vaccine Formulation Lead', loc: 'Dhaka', type: 'Full-time' },
    { team: 'Blue Microbiome', title: 'Aquaculture Scientist', loc: 'Khulna', type: 'Full-time' },
    { team: 'BioPlatform', title: 'Foundation Model Engineer', loc: 'Remote', type: 'Full-time' },
    { team: 'Operations', title: 'Head of People', loc: 'Dhaka', type: 'Full-time' }
  ];

  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <SlideIn from="left"><div className="label" style={{ marginBottom: 18, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>OPEN ROLES</div></SlideIn>
      <SlideIn from="left" delay={0.08}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 600 }}>
          Help build the <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>bioeconomy.</span>
        </h1>
      </SlideIn>
      <div style={{ marginTop: 56, borderTop: '1px solid var(--rule)' }}>
        {roles.map((r, i) => (
          <SlideIn key={i} from={i%2?'right':'left'} delay={i*0.05}>
            <div style={{
              display: 'grid', gridTemplateColumns: '160px 1fr 160px 140px 40px',
              alignItems: 'center', gap: 24, padding: '28px 0', borderBottom: '1px solid var(--rule)'
            }}>
              <span className="label" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>{r.team}</span>
              <div style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 500 }}>{r.title}</div>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{r.loc}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{r.type}</span>
              <Arrow />
            </div>
          </SlideIn>
        ))}
      </div>
    </div>
  );
}

function PlatformDetail({ data, palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <SlideIn from="left"><div className="label" style={{ marginBottom: 18, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>THE BIOPLATFORM</div></SlideIn>
      <SlideIn from="left" delay={0.08}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 600 }}>
          A full-stack <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>bioeconomy</span> engine.
        </h1>
      </SlideIn>
      <SlideIn from="left" delay={0.16}>
        <p style={{ fontSize: 20, marginTop: 20, color: 'var(--ink-2)', maxWidth: 760, lineHeight: 1.4 }}>
          Four phases. One platform. From frontier discovery to launched ventures.
        </p>
      </SlideIn>

      <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--rule)', borderRadius: 24, overflow: 'hidden' }}>
        {(data.phases || []).map((p, i) => (
          <SlideIn key={i} from="bottom" delay={i*0.08}>
            <div style={{ padding: 32, borderRight: i < 3 ? '1px solid var(--rule)' : 'none', background: i % 2 === 0 ? 'var(--bone)' : 'transparent' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 16 }}>PHASE {p.n}</div>
              <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.02em' }}>{p.title}</div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55 }}>{p.body}</p>
            </div>
          </SlideIn>
        ))}
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--rule)' }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)' }}>{k.toUpperCase()}</div>
      <div style={{ fontSize: 15, color: 'var(--ink)' }}>{v}</div>
    </div>
  );
}

export default DetailPage;