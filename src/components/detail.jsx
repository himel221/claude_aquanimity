import React, { useState, useEffect, useRef } from 'react';

// Data for the application
const appData = {
  ventures: [
    { id: "superwater", n: "01", name: "SuperWater", blurb: "Bio-inspired water filtration for arsenic-free drinking water.", tag: "Bio-inspired water purification", stage: "seed", founded: "2024", location: "Dhaka, BD", img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop" },
    { id: "thermorevax", n: "02", name: "ThermoReVax", blurb: "Thermostable vaccine platform for last-mile delivery.", tag: "Thermostable vaccine platform", stage: "pre-seed", founded: "2024", location: "Dhaka, BD", img: "https://images.unsplash.com/photo-1582719505981-e2f3d5a6b0b4?w=800&h=600&fit=crop" },
    { id: "bluemicrobiome", n: "03", name: "Blue Microbiome", blurb: "Probiotic solutions for sustainable aquaculture.", tag: "Aquaculture biotech", stage: "lab", founded: "2024", location: "Khulna, BD", img: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop" }
  ],
  institutes: [
    { 
      n: "01", 
      title: "Institute of Health Sciences", 
      blurb: "Translating biology into daily health solutions for metabolic health, preventive nutrition, and functional beverages.", 
      tag: "Health Sciences",
      fullDescription: `The Institute of Health Sciences develops evidence-backed health products for metabolic health, preventive nutrition, functional beverages, and phytopharmaceutical innovation. Its mission is to translate biology into daily health solutions that people can use, trust, and afford. From functional water to plant-based metabolic formulations, the institute focuses on products that address some of Bangladesh's most urgent health challenges — including diabetes, hypertension, obesity, dyslipidemia, gut health, and healthy aging.

The institute combines clinical research, formulation science, indigenous medicinal plant knowledge, nutritional biochemistry, and consumer health strategy to create products that are scientifically grounded and commercially scalable.

Flagship programs include SuperWater, Aquanimity's clinically studied functional water platform; Nutraceutical formulations inspired by Bangladesh's indigenous biodiversity; and future products across digestion, cognitive health, cardiovascular wellness, and precision nutrition.`,
      focusAreas: ["Functional beverages", "Metabolic health", "Nutraceuticals", "Phytopharmaceuticals", "Clinical nutrition", "Gut health", "Healthy aging", "Consumer biotech"],
      img: "images/health3.jpg"
    },
    { 
      n: "02", 
      title: "Institute of Applied Bioengineering & Materials Science", 
      blurb: "Engineering advanced biological materials, delivery systems, and next-generation healthcare technologies.", 
      tag: "Bioengineering",
      fullDescription: `The Institute of Applied Bioengineering & Materials Science engineers advanced biological materials, delivery systems, biomaterials, and next-generation healthcare technologies. Its mission is to solve difficult problems at the intersection of biology, materials science, medicine, and manufacturing. The institute works on technologies that can improve how vaccines, proteins, peptides, biologics, diagnostics, and biomaterials are designed, delivered, stabilized, and scaled.

A core focus of the institute is Aquanimity's next-generation vaccine and biologics delivery platform. By exploring advanced nanoparticle-based delivery systems, the institute aims to improve antigen loading, immune presentation, thermostability, and accessibility for vaccines and biologics — especially in low- and middle-income health systems.

Beyond drug delivery, the institute also explores Bangladesh-relevant biomaterials such as indigenous material medical materials, sustainable packaging systems, biosensor-enabled health products, and advanced materials for diagnostics and healthcare infrastructure.`,
      focusAreas: ["Drug delivery", "Vaccine delivery", "Polymersomes", "Biomaterials", "Medical materials", "Biosensors", "Sustainable packaging", "Protein formulation", "Lyophilization", "Advanced healthcare engineering"],
      img: "images/bio.jpg"
    },
    { 
      n: "03", 
      title: "Institute of Omics & Molecular Microbiology", 
      blurb: "Discovering useful biology from Bangladesh's living systems — from mangroves to microbes.", 
      tag: "Molecular Microbiology",
      fullDescription: `The Institute of Omics & Molecular Microbiology discovers useful biology from Bangladesh's living systems — from marine ecosystems and mangroves to soils, plants, microbes, and the human microbiome. Its mission is to explore Bangladesh's under-studied biodiversity using genomics, microbiology, metabolomics, and molecular biology, then convert those discoveries into products and platforms for health, agriculture, climate resilience, and industrial biotechnology.

The institute's flagship initiative investigates microbes from Bangladesh's unique ecological niches. These organisms may contain enzymes, metabolites, and pathways relevant to plastic degradation, bioremediation, biofertilizers, climate adaptation, and industrial biotechnology.

The institute also supports human health programs by studying the microbiome's role in metabolism, inflammation, gut health, immunity, and disease risk. This creates a natural bridge between microbial discovery and Aquanimity's health science programs.

Through this institute, Aquanimity treats Bangladesh's biodiversity not only as a natural heritage, but as a scientific and economic asset — a source of new enzymes, microbes, metabolites, diagnostics, and biological products.`,
      focusAreas: ["Genomics", "Microbiology", "Microbiome science", "Microbial biotechnology", "Enzyme discovery", "Marine biology", "Climate biotech", "Biofertilizers", "Metabolomics", "Environmental biotechnology", "Metagenomics"],
      img: "images/omics.jpg"
    },
    { 
      n: "04", 
      title: "Institute of Computational Biology & AI", 
      blurb: "The intelligence layer of Aquanimity — using AI to accelerate discovery across all institutes.", 
      tag: "Computational Biology",
      fullDescription: `The Institute of Computational Biology & AI is the intelligence layer of Aquanimity BioHubs™. Its mission is to use artificial intelligence, bioinformatics, protein modeling, molecular simulation, and biological data systems to accelerate discovery across all Aquanimity institutes. It connects biodiversity, omics, clinical research, formulation science, and engineering into a unified AI-native discovery platform.

The institute's flagship platform is The Aquanimity Bioplatform — an integrated computational biology engine designed to organize biological data, identify promising compounds and proteins, predict molecular interactions, prioritize experiments, and help transform raw scientific information into commercializable innovation.

For health sciences, the institute can rank plant bioactives against targets involved in glucose metabolism, inflammation, cardiovascular health, and aging. For molecular microbiology, it can analyze microbial genomes to identify enzymes and metabolites with industrial or therapeutic potential. For bioengineering, it can support protein structure analysis, antigen selection, formulation design, and delivery-system optimization.`,
      focusAreas: ["Computational biology", "AI drug discovery", "Protein modeling", "Bioinformatics", "Knowledge graphs", "Molecular docking", "ADME prediction", "Enzyme discovery", "Biological data platforms", "AI-native R&D systems"],
      img: "images/com.jpg"
    }
  ],
  team: {
    "Leadership": [
      { name: "Dr. Sarah Ahmed", title: "CEO & Founder", img: "https://randomuser.me/api/portraits/women/68.jpg" },
      { name: "Dr. Michael Chen", title: "Chief Scientific Officer", img: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Prof. David Williams", title: "Chair, Scientific Board", img: "https://randomuser.me/api/portraits/men/45.jpg" }
    ],
    "Research": [
      { name: "Dr. Fatema Begum", title: "Lead, Health Sciences", img: "https://randomuser.me/api/portraits/women/23.jpg" },
      { name: "Dr. Rajiv Kumar", title: "Lead, Bioengineering", img: "https://randomuser.me/api/portraits/men/67.jpg" },
      { name: "Dr. Lisa Wong", title: "Lead, Computational Biology", img: "https://randomuser.me/api/portraits/women/56.jpg" }
    ]
  },
  partners: [
    { name: "University of Dhaka", kind: "Academic Partner", blurb: "Leading research collaboration on indigenous biodiversity and clinical studies.", loc: "Dhaka, BD", since: "2024", logo: "https://via.placeholder.com/120x80?text=DU" },
    { name: "BRAC", kind: "Implementation Partner", blurb: "Field deployment and community health integration across Bangladesh.", loc: "Dhaka, BD", since: "2024", logo: "https://via.placeholder.com/120x80?text=BRAC" }
  ],
  phases: [
    { n: "01", title: "Discover", body: "Genomics, microbiology, and biodiversity exploration to identify novel biological assets." },
    { n: "02", title: "Design", body: "AI-powered protein design, formulation science, and engineering biology." },
    { n: "03", title: "Build", body: "Prototyping, clinical validation, and manufacturing scale-up." },
    { n: "04", title: "Launch", body: "Venture creation, market entry, and global distribution." }
  ]
};

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

// Footer Component - Exact match to your design
function Footer() {
  const handleLinkClick = (e, item) => {
    e.preventDefault();
    const sectionMap = {
      'Institutes': 'institutes',
      'Ventures': 'ventures',
      'Team': 'team',
      'Careers': 'careers',
      'News': 'contact',
      'Contact': 'contact',
      'Press kit': 'contact',
      'LinkedIn': 'contact',
      'X / Twitter': 'contact'
    };
    const sectionId = sectionMap[item] || item.toLowerCase();
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <footer style={{ 
      marginTop: 80, 
      paddingTop: 48, 
      paddingBottom: 40, 
      borderTop: '1px solid var(--rule)', 
      background: '#FAF7F0',
      fontFamily: "'Red Hat Display', sans-serif"
    }}>
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32 }} className="ftr-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img 
                src={process.env.PUBLIC_URL + '/images/logo1.png'} 
                alt="AQUANIMITY BIOHUBS™" 
                style={{ 
                  height: '40px', 
                  width: 'auto',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 320, lineHeight: 1.55, fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
              Engineering life. For humanity.
            </p>
          </div>
          
          <div>
            <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
              COMPANY
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {['Institutes', 'Ventures', 'Team', 'Careers', 'News'].map((item, i) => (
                <li key={i}>
                  <button 
                    onClick={(e) => handleLinkClick(e, item)}
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
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
              CONNECT
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {['Contact', 'Press kit', 'LinkedIn', 'X / Twitter'].map((item, i) => (
                <li key={i}>
                  <button 
                    onClick={(e) => handleLinkClick(e, item)}
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
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
              CONTACT
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              <li>
                <span style={{ fontSize: 14, color: 'var(--ink-2)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
                  Address: Mirpur, Dhaka-1210
                </span>
              </li>
              <li>
                <span style={{ fontSize: 14, color: 'var(--ink-2)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
                  Phone: 0177777789
                </span>
              </li>
              <li>
                <span style={{ fontSize: 14, color: 'var(--ink-2)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
                  Email: aquanimity@gmail.com
                </span>
              </li>
            </ul>
          </div>
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
          Back
        </button>
      </div>
    </div>
  );
};

// Detail page used for venture / institute / list views
function DetailPage({ route, onClose, palette }) {
  const data = appData;
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
      n: v.n, title: v.name, blurb: v.blurb, img: v.img, tag: v.stage, href: 'venture:' + v.id
    })) || []} kind="venture" palette={palette} />;
  } else if (route === 'institutes-list') {
    view = <InstitutesZigzagView institutes={data.institutes} palette={palette} />;
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
      <Footer />
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

// Professional Zigzag Institutes View
function InstitutesZigzagView({ institutes, palette }) {
  const handleInstituteClick = (href) => {
    window.dispatchEvent(new CustomEvent('aq-route', { detail: href }));
  };

  const zigzagIntro = `Aquanimity BioHubs™ is built around four interdisciplinary institutes, each designed to transform frontier science into real-world bioinnovations. Together, they connect Bangladesh's biodiversity, clinical needs, engineering talent, and AI-native discovery systems into a platform for health, climate, and biological transformation.

Each institute is not merely a research division. It is a venture-building engine — bringing together scientists, technologists, clinicians, universities, and strategic partners to discover, validate, engineer, and commercialize breakthrough solutions from Bangladesh for the world.`;

  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      {/* Hero Section with Intro */}
      <SlideIn from="left">
        <div className="label" style={{ marginBottom: 18, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>OUR INSTITUTES</div>
      </SlideIn>
      <SlideIn from="left" delay={0.08}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif", marginBottom: 32 }}>
          Four specialized institutes. <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>One mission</span> — transform biology.
        </h1>
      </SlideIn>
      
      <SlideIn from="left" delay={0.16}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--accent-soft) 0%, transparent 100%)',
          padding: '40px 48px',
          borderRadius: 24,
          marginBottom: 80,
          border: '1px solid var(--rule)'
        }}>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 20, fontStyle: 'italic' }}>
            {zigzagIntro.split('\n\n')[0]}
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            {zigzagIntro.split('\n\n')[1]}
          </p>
        </div>
      </SlideIn>

      {/* Zigzag Layout for Institutes */}
      {institutes.map((institute, idx) => (
        <SlideIn key={idx} from={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.1}>
          <div 
            onClick={() => handleInstituteClick('institute:' + institute.n)}
            style={{
              display: 'grid',
              gridTemplateColumns: idx % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
              gap: 48,
              marginBottom: 80,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Image Section */}
            <div style={{ 
              order: idx % 2 === 0 ? 1 : 2,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              height: 400
            }}>
              <img 
                src={institute.img} 
                alt={institute.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            {/* Content Section */}
            <div style={{ 
              order: idx % 2 === 0 ? 2 : 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 16 }}>
                INSTITUTE {institute.n} · {institute.tag.toUpperCase()}
              </div>
              <h2 style={{ 
                fontSize: 'clamp(28px, 3.5vw, 42px)', 
                fontWeight: 800, 
                fontFamily: "'Red Hat Display', sans-serif",
                letterSpacing: '-0.02em',
                marginBottom: 20,
                color: 'var(--ink)'
              }}>
                {institute.title}
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', marginBottom: 24 }}>
                {institute.blurb}
              </p>
              
              {/* Focus Areas Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                {institute.focusAreas.slice(0, 4).map((area, i) => (
                  <span key={i} style={{
                    background: 'var(--accent-soft)',
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--accent)'
                  }}>
                    {area}
                  </span>
                ))}
                {institute.focusAreas.length > 4 && (
                  <span style={{
                    background: 'var(--bone)',
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--muted)'
                  }}>
                    +{institute.focusAreas.length - 4} more
                  </span>
                )}
              </div>

              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                padding: 0,
                width: 'fit-content'
              }}>
                Explore Institute <Arrow size={14} />
              </button>
            </div>
          </div>
        </SlideIn>
      ))}

      {/* Bottom CTA */}
      <SlideIn from="bottom">
        <div style={{
          textAlign: 'center',
          marginTop: 40,
          padding: 60,
          background: 'linear-gradient(135deg, var(--accent) 0%, #1a5a66 100%)',
          borderRadius: 32,
          color: 'white'
        }}>
          <h3 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, marginBottom: 16, fontFamily: "'Red Hat Display', sans-serif" }}>
            One BioHub. Four Engines.
          </h3>
          <p style={{ fontSize: 17, maxWidth: 700, margin: '0 auto 24px', opacity: 0.9 }}>
            Together, the four institutes form Aquanimity's BioHub operating system — turning biodiversity into biology, biology into engineering, engineering into products, and products into global impact.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('aq-route', { detail: 'platform-detail' }))}
            style={{
              padding: '12px 32px',
              background: 'white',
              color: 'var(--accent)',
              border: 'none',
              borderRadius: 40,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Discover the BioPlatform →
          </button>
        </div>
      </SlideIn>
    </div>
  );
}

function VentureDetail({ v, data, palette }) {
  const ventureCards = {
    "SuperWater": {
      mainImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop",
      techImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
      teamImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    },
    "ThermoReVax": {
      mainImage: "https://images.unsplash.com/photo-1582719505981-e2f3d5a6b0b4?w=800&h=600&fit=crop",
      techImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=600&fit=crop",
      teamImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
    },
    "Blue Microbiome": {
      mainImage: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop",
      techImage: "https://images.unsplash.com/photo-1535591273668-578e3112cbf8?w=800&h=600&fit=crop",
      teamImage: "https://images.unsplash.com/photo-1577557159867-31facc1beea5?w=800&h=600&fit=crop",
    }
  };

  const cardImages = ventureCards[v.name] || {
    mainImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    techImage: "https://images.unsplash.com/photo-1576081149789-84f3c7efcbee?w=800&h=600&fit=crop",
    teamImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
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
            <h1 style={{ color: 'var(--paper)', fontSize: 'clamp(56px, 9vw, 130px)', lineHeight: 0.92, fontWeight: 800, letterSpacing: '-0.025em', fontFamily: "'Red Hat Display', sans-serif" }}>
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

      <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
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
                  <img src={cardImages.techImage} alt={`${v.name} Technology`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hoveredCard === 'tech' ? 'scale(1.05)' : 'scale(1)' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <div className="label" style={{ marginBottom: 12, color: 'var(--accent)' }}>TECHNOLOGY</div>
                  <h4 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>Advanced Platform</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>Cutting-edge biotech solutions developed at Aquanimity's labs.</p>
                </div>
              </div>
            </SlideIn>

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
                  <img src={cardImages.mainImage} alt={`${v.name} Impact`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hoveredCard === 'impact' ? 'scale(1.05)' : 'scale(1)' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <div className="label" style={{ marginBottom: 12, color: 'var(--accent)' }}>IMPACT</div>
                  <h4 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>Measurable Change</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>Transforming lives across Bangladesh and beyond.</p>
                </div>
              </div>
            </SlideIn>

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
                  <img src={cardImages.teamImage} alt={`${v.name} Team`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hoveredCard === 'team' ? 'scale(1.05)' : 'scale(1)' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <div className="label" style={{ marginBottom: 12, color: 'var(--accent)' }}>TEAM</div>
                  <h4 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>World-Class Talent</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>Leading scientists and engineers from around the world.</p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>

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
  const descriptionParagraphs = it.fullDescription ? it.fullDescription.split('\n\n').filter(p => p.trim().length > 0) : [it.blurb];
  const areas = it.focusAreas || ["Advanced biomedical research", "Cutting-edge molecular technologies", "Interdisciplinary scientific collaboration"];

  const stats = [
    { label: "RESEARCHERS", value: "45+" },
    { label: "ACTIVE PROJECTS", value: "28" },
    { label: "PUBLICATIONS", value: "156" },
    { label: "PARTNERS", value: "32" }
  ];

  return (
    <div>
      <div className="img-frame" style={{ height: 'min(55vh, 480px)', background: '#000', position: 'relative' }}>
        <img src={it.img} alt={it.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(14,27,44,0.3), rgba(14,27,44,0.85))' }} />
        <div className="wrap" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 50, maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <SlideIn from="left">
            <div className="mono" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, letterSpacing: '0.22em', marginBottom: 16 }}>
              INSTITUTE {it.n} · {it.tag}
            </div>
          </SlideIn>
          <SlideIn from="left" delay={0.1}>
            <h1 style={{ color: 'var(--paper)', fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.025em', maxWidth: 900, fontFamily: "'Red Hat Display', sans-serif" }}>
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

      <div style={{ background: 'var(--accent)', padding: '36px 0' }}>
        <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {stats.map((stat, idx) => (
              <SlideIn key={idx} from="bottom" delay={idx * 0.1}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontStyle: 'italic' }}>{stat.value}</div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>{stat.label}</div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 70, paddingBottom: 70 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, marginBottom: 70 }}>
          <SlideIn from="left">
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 500, lineHeight: 1.15, marginBottom: 24 }}>
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Focus</span> Areas
            </h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {areas.slice(0, 8).map((area, idx) => (
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
            {descriptionParagraphs.map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 18 }}>
                {paragraph}
              </p>
            ))}
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
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif" }}>
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
            ) : null}
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
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif" }}>
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
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif" }}>
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
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif" }}>
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
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif" }}>
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