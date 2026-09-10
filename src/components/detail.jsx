import React, { useState, useEffect, useRef } from 'react';
import Contact from './contact';

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
      focusAreas: ["Functional Beverages", "Metabolic Health", "Nutraceuticals","Consumer Biotech"],
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
      focusAreas: ["Drug Delivery", "Vaccine Delivery", "Polymersomes", "Biomaterials", "Medical Materials", "Biosensors", "Sustainable Packaging", "Cancer Therapy"],
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
      focusAreas: ["Genomics", "Microbial Biotechnology", "Enzyme Engineering", "Marine Biology", "Biofertilizers", "Metagenomics"],
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
      focusAreas: ["AI Drug Discovery", "Protein Modeling", "Bioinformatics", "ADME Prediction", "Enzyme Engineering", "Biological Data Platforms"],
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
    { 
      name: "ABRI", 
      short: "ABRI",
      kind: "Research Partner", 
      blurb: "Leading international health research institution focused on infectious diseases and public health.",
      loc: "Dhaka, BD", 
      since: "2024", 
      logo: "/images/ibr.jpeg",
      website: "https://abri.org.bd",
      fullDescription: "ABRI is a premier research institution dedicated to advancing health research in Bangladesh and the region. With state-of-the-art laboratories and a team of world-class researchers, ABRI conducts cutting-edge research on infectious diseases, vaccine development, and public health interventions.",
      focusAreas: ["Infectious Diseases", "Vaccine Research", "Public Health", "Epidemiology", "Clinical Trials"]
    },
    { 
      name: "IQC", 
      short: "IQC",
      kind: "Implementation Partner", 
      blurb: "Global development organization based in Bangladesh focused on quality healthcare delivery.",
      loc: "Dhaka, BD", 
      since: "2024", 
      logo: "/images/iqc.jpeg",
      website: "https://iqc.org.bd",
      fullDescription: "IQC is a leading implementation partner committed to improving healthcare quality and access across Bangladesh. With a network of healthcare facilities and community health workers, IQC works to bridge the gap between research and real-world impact.",
      focusAreas: ["Healthcare Delivery", "Community Health", "Quality Improvement", "Health Systems Strengthening"]
    },
    { 
      name: "Heart Foundation Bangladesh", 
      short: "Heart Foundation Bangladesh",
      kind: "Academic Partner", 
      blurb: "Leading cardiovascular research and healthcare institution in Bangladesh.",
      loc: "Dhaka, BD", 
      since: "2024", 
      logo: "/images/heart.jpeg",
      website: "https://heartfoundationbd.com",
      fullDescription: "The Heart Foundation Bangladesh is a premier institution dedicated to cardiovascular health research, clinical care, and health education. With a network of specialized cardiac centers, the foundation works to reduce the burden of heart disease in Bangladesh.",
      focusAreas: ["Cardiovascular Health", "Preventive Cardiology", "Clinical Research", "Health Education"]
    },
    { 
      name: "Diabetics Association of Bangladesh", 
      short: "Diabetics Association of Bangladesh",
      kind: "Academic Partner", 
      blurb: "Leading institution for diabetes research and care in Bangladesh.",
      loc: "Dhaka, BD", 
      since: "2024", 
      logo: "/images/dia.jpeg",
      website: "https://diabetesbd.org",
      fullDescription: "The Diabetics Association of Bangladesh is a pioneering institution dedicated to diabetes research, patient care, and health education. Through its network of diabetes centers and research facilities, the association works to improve diabetes management and prevention across Bangladesh.",
      focusAreas: ["Diabetes Research", "Metabolic Health", "Patient Care", "Health Education"]
    },
    { 
      name: "Centre for Global Health Research", 
      short: "Centre for Global Health Research",
      kind: "Academic Partner", 
      blurb: "Leading research institution in bioengineering and global health.",
      loc: "California, USA", 
      since: "2024", 
      logo: "/images/cghr.jpeg",
      website: "https://cghr.org",
      fullDescription: "The Centre for Global Health Research is a world-class research institution focused on bioengineering innovations for global health challenges. With a multidisciplinary team of scientists and engineers, the centre develops cutting-edge solutions for healthcare delivery in resource-limited settings.",
      focusAreas: ["Bioengineering", "Global Health", "Medical Devices", "Health Technology"]
    },
    { 
      name: "BioEngineering", 
      short: "DU",
      kind: "Academic Partner", 
      blurb: "Premier public university in Bangladesh with strong bioengineering programs.",
      loc: "Dhaka, BD", 
      since: "2024", 
      logo: "/images/bio.jpeg",
      website: "https://du.ac.bd",
      fullDescription: "The Department of BioEngineering at the University of Dhaka is a leading academic program dedicated to advancing bioengineering education and research in Bangladesh. With a focus on biotechnology, biomedical engineering, and materials science, the department trains the next generation of bioengineers.",
      focusAreas: ["Bioengineering", "Biotechnology", "Biomedical Engineering", "Materials Science"]
    }
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

// Footer Component
// Footer Component - Updated to match FooterCTA design
function Footer() {
  const handleLinkClick = (e, item) => {
    e.preventDefault();
    const sectionMap = {
      'Institutes': 'institutes',
      'Ventures': 'ventures',
      'Team': 'team',
      'News': 'contact',
      'Contact': 'contact',
      'Press kit': 'contact',
      'LinkedIn': 'contact',
      'X / Twitter': 'contact'
    };
    const sectionId = sectionMap[item] || item.toLowerCase();
    window.dispatchEvent(new CustomEvent('aq-route', { detail: 'home' }));
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@aquanimitygroup.com', '_blank');
  };

  return (
    <footer style={{ 
      marginTop: 80, 
      paddingTop: 48, 
      paddingBottom: 40, 
      borderTop: '1px solid white', 
      background: '#181A43',
      fontFamily: "'Red Hat Display', sans-serif"
    }}>
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32 }} className="ftr-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img 
                src={process.env.PUBLIC_URL + '/images/logo1.png'} 
                alt="AQUANIMITY BIOHUBS™" 
                style={{ 
                  height: '40px', 
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x40?text=AQUANIMITY';
                }}
              />
            </div>
            <p style={{ fontSize: 14, color: 'white', maxWidth: 320, lineHeight: 1.55, fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400, textAlign: 'justify' }}>
              Discovering, translating and commercializing biosciences for Bangladesh and beyond.
            </p>
          </div>
          
          <div>
            <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 900 }}>
              COMPANY
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {['Institutes', 'Ventures', 'Team'].map((item, i) => (
                <li key={i}>
                  <button 
                    onClick={(e) => handleLinkClick(e, item)}
                    style={{ 
                      fontSize: 14, 
                      color: 'white',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontWeight: 400,
                      transition: 'color 0.2s ease'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 900 }}>
              CONNECT
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              <li>
                <button 
                  onClick={(e) => handleLinkClick(e, 'Contact')}
                  style={{ 
                    fontSize: 14, 
                    color: 'White',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400,
                    transition: 'color 0.2s ease'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  Contact
                </button>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/aquanimitygroup/about/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: 14, 
                    color: 'White',
                    textDecoration: 'none',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400,
                    transition: 'color 0.2s ease',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'White'}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/aquanimitygroup?stkn=emdma2xpam5pdmdw&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: 14, 
                    color: 'White',
                    textDecoration: 'none',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400,
                    transition: 'color 0.2s ease',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'White'}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 900 }}>
              CONTACT
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              <li>
                <span style={{ fontSize: 14, color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
                  Plot 68-71, Block K, Road 4<br /> Rupnagar Rd, Dhaka 1216
                </span>
              </li>
              <li>
                <span style={{ fontSize: 14, color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
                  +8801310346592
                </span>
              </li>
              <li>
                <a 
                  href="#"
                  onClick={handleEmailClick}
                  style={{ 
                    fontSize: 14, 
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400,
                    transition: 'color 0.2s ease',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  contact@aquanimitygroup.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ 
          marginTop: 64, 
          paddingTop: 24, 
          borderTop: '1px solid white', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 16, 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
            © {new Date().getFullYear()} AQUANIMITY BANGLADESH LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'white', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
            DHAKA, BANGLADESH
          </div>
        </div>
      </div>
    </footer>
  );
}

// Back Button Component
// Back Button Component
const BackButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="detail-back" style={{
      position: 'relative',
      zIndex: 10,
      background: 'white',
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
            gap: isHovered ? '10px' : '6px',
            background: '#181A43',
            border: '1px solid var(--rule)',
            borderRadius: 40,
            padding: '5px 8px',
            color: 'white',
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

// SlideIn Component
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

function Row({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--rule)' }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)' }}>{k.toUpperCase()}</div>
      <div style={{ fontSize: 15, color: '#0E1136' }}>{v}</div>
    </div>
  );
}

// ===== INSTITUTES ZIGZAG VIEW =====
function InstitutesZigzagView({ institutes, palette }) {
  const handleInstituteClick = (href) => {
    window.dispatchEvent(new CustomEvent('aq-route', { detail: href }));
  };

  const zigzagIntro = `Aquanimity BioHubs™ is built around four interdisciplinary institutes, each designed to transform frontier science into real-world bioinnovations. Together, they connect Bangladesh's biodiversity, clinical needs, engineering talent, and AI-native discovery systems into a platform for health, climate, and biological transformation.

Each institute is not merely a research division. It is a venture-building engine — bringing together scientists, technologists, clinicians, universities, and strategic partners to discover, validate, engineer, and commercialize breakthrough solutions from Bangladesh for the world.`;

  return (
    <div className="wrap zigzag-section" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <SlideIn from="left">
        <div className="label" style={{ marginBottom: 18, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)' }}>OUR INSTITUTES</div>
      </SlideIn>
      <SlideIn from="left" delay={0.08}>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 1, letterSpacing: '-0.025em',color:'#0E1136', fontWeight: 800, fontFamily: "'Red Hat Display', sans-serif", marginBottom: 32 }}>
          Four specialized institutes. <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>One mission</span> — transform biology.
        </h1>
      </SlideIn>
      
      <SlideIn from="left" delay={0.16}>
        <div className="zigzag-intro-box" style={{ 
          background: 'linear-gradient(135deg, var(--accent-soft) 0%, transparent 100%)',
          padding: '40px 48px',
          borderRadius: 24,
          marginBottom: 80,
          border: '1px solid var(--rule)'
        }}>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: '#0E1136', marginBottom: 20, fontStyle: 'italic', textAlign: 'justify' }}>
            {zigzagIntro.split('\n\n')[0]}
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: '#0E1136', textAlign: 'justify' }}>
            {zigzagIntro.split('\n\n')[1]}
          </p>
        </div>
      </SlideIn>

      {institutes.map((institute, idx) => (
        <SlideIn key={idx} from={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.1}>
          <div 
            className="zigzag-grid-item"
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
            <div className="zigzag-image-wrap" style={{ 
              order: idx % 2 === 0 ? 1 : 2,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              height: 360
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
                color: '#0E1136'
              }}>
                {institute.title}
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: '#0E1136', marginBottom: 24, textAlign: 'justify' }}>
                {institute.blurb}
              </p>
              
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
                width: 'fit-content',
                fontFamily:'Red Hat Display'
              }}>
                Explore Institute <Arrow size={14} />
              </button>
            </div>
          </div>
        </SlideIn>
      ))}

<SlideIn from="bottom">
  <div className="zigzag-cta" style={{
    textAlign: 'center',
    marginTop: 40,
    padding: 60,
    background: 'linear-gradient(135deg, #0E1136 0%, #0E1136 100%)',
    borderRadius: 32,
    color: 'white'
  }}>
    <h3 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 700, marginBottom: 16, fontFamily: "'Red Hat Display', sans-serif", color:"white" }}>
      One BioHub. <span className="serif" style={{ 
        fontStyle: 'italic', 
        fontWeight: 400,
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: '#5FAFBE'
      }}>Four Engines.</span>
    </h3>
    <p style={{ fontSize: 17, maxWidth: 700, margin: '0 auto 24px', opacity: 0.9, color:"white" }}>
      Together, the four institutes form Aquanimity's BioHub operating system — turning biodiversity into biology, biology into engineering, engineering into products, and products into global impact.
    </p>
    <button 
      onClick={() => {
        // Navigate to contact page
        window.dispatchEvent(new CustomEvent('aq-route', { detail: 'contact' }));
      }}
      style={{
        padding: '12px 32px',
        background: 'white',
        color: '#0E1136',
        border: 'none',
        borderRadius: 40,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: "'Red Hat Display', sans-serif",
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgb(95, 175, 190)';
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'white';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      Join With Us →
    </button>
  </div>
</SlideIn>

    </div>
  );
}

// ===== INSTITUTE DETAIL - FIXED VERSION =====
// ===== INSTITUTE DETAIL - FIXED VERSION =====
function InstituteDetail({ it, data, palette }) {
  const descriptionParagraphs = it.fullDescription ? it.fullDescription.split('\n\n').filter(p => p.trim().length > 0) : [it.blurb];
  const areas = it.focusAreas || ["Advanced biomedical research", "Cutting-edge molecular technologies", "Interdisciplinary scientific collaboration"];
  const [selectedMember, setSelectedMember] = useState(null);

  // Researchers data
  const researchers = {
    "01": [
      { 
        name: "Syed Hossainy, PhD", 
        title: "Founding Scientist and Chair,\nScience Advisory Board\n\n Director of Applied Bioengineering, UC Berkeley", 
        img: "/images/hossainy.png",
        bio: "Prolific inventor with 286 issued patents and 390 patents pending",
        detailedBio: "Syed Hossainy is an Adjunct Professor and Director of Applied Bioengineering at UC Berkeley and Advisor to the BUET Applied Bioengineering Research Incubator. He previously led Abbott Vascular's innovation incubator, delivering 10 feasibility programs, including bio absorbable vascular scaffolds. With 286 issued patents and nearly 390 pending, he is widely recognized as the co-inventor of the first Drug Eluting Stents.\n\nAt the Biohub, he sets the scientific direction, guides all translational R&D, and mentors teams on research innovation, biomaterials, bioengineering design, and regulatory strategy.",
        achievement: "Co-inventor of the first Drug Eluting Stents | Holder of 286 issued patents and nearly 390 pending patents",
        education: "PhD in Chemical Engineering | The University of Texas at Austin; BS in Chemical Engineering | BUET"
      },
      { 
        name: "Abul Iqbal, PhD", 
        title: "Founding Scientist and\nSenior Advisor, Chemistry", 
        img: "/images/abul.png",
        bio: "Former head of R&D at Ciba-Geigy and inventor of the industrial process of the Ferrari Red",
        detailedBio: "Abul Iqbal is a world-renowned chemist and recipient of the Society of Dyers and Colourists' Perkin Medal (1993) for pioneering the chemistry behind diketopyrrolopyrrole (DPP) pigments, the core of the signature Ferrari Red. A former Head of R&D at Ciba-Geigy, he has authored over 100 patents in pigments and functional materials.\n\nAt the Biohub, he advises on high-performance pigments, polymers, and sustainable materials. He guides development of jute/RPET composites, colour-stable biomaterials, and supports teams with chemical synthesis, formulation strategy, and industrial scale-up.",
        achievement: "World-renowned chemist | Perkin Medal recipient | Author of 100+ patents",
        education: "PhD | University of St Andrews"
      },
      { 
        name: "Shoeb Ahmed, PhD", 
        title: "Senior Scientific Advisor and Chair, Institute of Applied Bioengineering and Material Science \n\n Chair and Professor, Dept. of Chemical Engineering, BUET", 
        img: "/images/shoeb.png",
        bio: "Research focus includes industrial processes, intracellular signalling, and advanced microscopy methods",
        detailedBio: "Shoeb Ahmed is a Professor and Chair of the Department Chemical Engineering at BUET and the Project Director of the Applied Bioengineering Research Incubator (ABRI). He holds a PhD from North Carolina State University. His work applies engineering to environmental and clinical challenges, with research focused on intracellular signaling during cell adhesion and migration using advanced microscopy methods.\n\nAt the Biohub, he leads process development, scale-up, and regulatory engineering. He oversees manufacturing of thermoresponsive polymersome vaccines, alternative bioPET packaging, and other bio-engineered products, ensuring that innovations advance toward safe and scalable deployment.",
        education: "PhD in Chemical and Biomolecular Engineering | North Carolina State University; MSc in Chemical and Biomolecular Engineering | North Carolina State University"
      },
      { 
        name: "Professor Dr. Bishwajit Bhowmick, PhD", 
        title: "Research Director", 
        img: "/images/bishwjit1.png",
        bio: "Expert in biomaterials and tissue engineering with over 20 years of research experience",
        detailedBio: "Professor Dr. Bishwajit Bhowmick is a distinguished researcher in biomaterials and tissue engineering. He has over 20 years of experience in developing advanced biomaterials for medical applications. His research focuses on biodegradable polymers, drug delivery systems, and tissue regeneration.\n\nAt the Biohub, he provides strategic guidance on biomaterials development and tissue engineering applications. He oversees the development of novel biomaterials for medical devices, drug delivery systems, and regenerative medicine applications.",
        education: "PhD | University of Tokyo"
      },
      { 
        name: "Tasnima Siddique, PhD", 
        title: "Research Director", 
        img: "/images/tasnima1.png",
        bio: "Expert in laboratory management and quality assurance in biomedical research",
        detailedBio: "Tasnima Siddique is a seasoned professional with extensive experience in laboratory management and quality assurance in biomedical research. She holds a PhD in Biochemistry and has worked in leading research institutions in Bangladesh and abroad.\n\nAt the Biohub, she oversees laboratory operations, ensures quality assurance compliance, and manages research infrastructure. She also provides training and mentorship to junior researchers and lab technicians.",
        education: "PhD | University of Dhaka"
      }
    ],
    "01_associates": [
      { 
        name: "Fatin Noor", 
        title: "Executive-Operations and Supply Chain\nInstitute of Health Sciences", 
        img: "/images/fatin.jpg",
        bio: "",
        detailedBio: "Fatin pursued Biochemistry and Biotechnology at North South University, gaining a comprehensive foundation in industrial and biomedical sciences through both theory and wet-lab work. His undergraduate research investigated antimicrobial resistance and ESBL-producing Enterobacteriaceae in Dhaka's poultry market, using phenotypic and genotypic methods. He developed competencies in bacterial isolation, antibiotic susceptibility testing, DNA extraction, PCR, gel electrophoresis, and gene identification, later expanding these skills to secondary metabolite screening at NGRI and Invent laboratories.\n\nAt the Aquanimity Biohubs, Fatin is establishing Quality Assurance SOPs aligned with FDA, EFSA, BSTI, BFSA, and related standards. His work spans formulation refinement, microbial safety in production environments, and biochemical data interpretation from clinical trials.",
        education: "BSc in Biochemistry and Biotechnology | North South University"
      },
      { 
        name: "Mehedi Hasan Pritom", 
        title: "Senior Microbiologist\nInstitute of Omics & Molecular Microbiology", 
        img: "/images/pritom1.png",
        bio: "",
        detailedBio: "Mehedi Hasan Pritom is a biotechnologist trained across biochemical engineering and microbiology, with academic foundations at BUET (MSc in Biochemical Technology) and Khulna University (BSc in Biotechnology and Genetic Engineering). He has built research and teaching experience as a Graduate Research Assistant and Graduate Teaching Assistant, alongside earlier industrial and academic roles. His technical profile spans microbial isolation and biochemical assays, antimicrobial screening, plant-extract processing, nanocomposite fabrication, and in vivo models, complemented by computational drug-discovery tools and operation of advanced analytical platforms including HPLC, qPCR, FTIR, and SEM.\n\nAt the Biohubs, he is a key member of the Blue Microbiome Initiative, where he works on environmental microbe identification for remediation and the genetic engineering of selected strains, integrating classical microbiology with molecular and bioengineering workflows.",
        education: "BSc in Biotechnology and Genetic Engineering | Khulna University | MSc in Biochemical Technology | BUET"
      },
      { 
        name: "Rahul Baroi", 
        title: "Junior Research Associate- Nutraceuticals and Vaccine Engineering\nInstitute of Applied Bioengineering & Material Science", 
        img: "/images/rahul.png",
        bio: "",
        detailedBio: "Rahul Baroi is a Chemical Engineering graduate from Bangladesh University of Engineering and Technology (BUET), specializing in Biochemical Engineering, with research interests in biotechnology, bioprocessing, and sustainable chemical processes. He currently works as a Junior Research Assistant at Aquanimity Bangladesh Limited, where his research focuses on bioactive compound extraction, purification, HPLC quantification, formulation support, and preclinical evaluation. His work includes optimizing microwave-assisted extraction of vasicine from Adhatoda vasica using Response Surface Methodology (RSM) to enhance extraction efficiency and product quality. He is also involved in purification research and experimental planning for bioactive formulations. In preclinical research, Rahul contributes to in vivo mouse studies, oral glucose tolerance testing (OGTT), GLP-1 assay planning, and sandwich ELISA-based biochemical evaluation. Additionally, he supports vaccine engineering and drug delivery research involving formulation development, process optimization, and analytical evaluation.",
        education: "BSc in Chemical Engineering | BUET"
      },
      { 
        name: "Borno Das", 
        title: "Junior Research Associate- Nutraceuticals and Vaccine Engineering\nInstitute of Applied Bioengineering & Material Science", 
        img: "/images/borno.png",
        bio: "",
        detailedBio: "Borno Das holds a BSc in Chemical Engineering from Bangladesh University of Engineering and Technology (BUET) and completed higher secondary studies at Ananda Mohan College. Specializing in biochemical engineering and bioprocessing, he works as a Junior Research Assistant on a nutraceuticals project at Aquanimity Bangladesh Limited. His research focuses on bioactive compound extraction, purification, characterization, and formulation development. His technical expertise spans HPLC, FTIR, UV-Vis spectroscopy, and microwave-assisted extraction, which formed the basis of his thesis on vasicine optimization. Borno also contributes to drug delivery research, vaccine engineering, oral glucose tolerance testing, and sandwich ELISA-based biochemical evaluation.",
        education: "BSc in Chemical Engineering | BUET"
      }
    ],
    "02": [
      { 
        name: "Shoeb Ahmed, PhD", 
        title: "Senior Scientific Advisor and Chair, Institute of Applied Bioengineering and Material Science \n\n Chair and Professor, Dept. of Chemical Engineering, BUET", 
        img: "/images/shoeb.png",
        bio: "Research focus includes industrial processes, intracellular signalling, and advanced microscopy methods",
        detailedBio: "Shoeb Ahmed is a Professor and Chair of the Department Chemical Engineering at BUET and the Project Director of the Applied Bioengineering Research Incubator (ABRI). He holds a PhD from North Carolina State University. His work applies engineering to environmental and clinical challenges, with research focused on intracellular signaling during cell adhesion and migration using advanced microscopy methods.\n\nAt the Biohub, he leads process development, scale-up, and regulatory engineering. He oversees manufacturing of thermoresponsive polymersome vaccines, alternative bioPET packaging, and other bio-engineered products, ensuring that innovations advance toward safe and scalable deployment.",
        education: "PhD in Chemical and Biomolecular Engineering | North Carolina State University; MSc in Chemical and Biomolecular Engineering | North Carolina State University"
      },
      { 
        name: "Samir Hossainy, PhD", 
        title: "Program Director, Novel Delivery Technologies\n\nPostdoctoral Associate, NYU Tandon", 
        img: "/images/samir.png",
        bio: "Co-developer of thermoreversible polymersomes",
        detailedBio: "Samir Hossainy is a researcher at the University of Chicago and co-developer of thermoreversible polymersomes that self-assemble in water, enabling high-efficiency loading of proteins and siRNA for drug and vaccine delivery. He is currently a Postdoctoral Associate at NYU Tandon and holds a PhD in Molecular Engineering from the University of Chicago, along with MS and BS degrees in Materials Science and Bioengineering from UC Berkeley.\n\nAt the Biohub, he leads the thermoreversible polymersome platform, advancing applications in vaccines, cancer immunotherapy, and tolerogenic therapies.",
        achievement: "Co-developer of thermoreversible polymersomes | PhD from University of Chicago | Postdoc at NYU Tandon",
        education: "PhD in Molecular Engineering | University of Chicago; MSc Materials Science and Engineering | UC Berkeley; BS in Bioengineering | UC Berkeley"
      },
      { 
        name: "Nafisa Islam, PhD", 
        title: "Senior Scientific Advisor\n\n Professor, Dept. of Chemical Engineering, BUET", 
        img: "/images/nafisa.png",
        bio: "Specialist in biocompatible materials and biosensor development",
        detailedBio: "Nafisa Islam is a chemical engineer specializing in biocompatible materials, biosensing, and environmental chemistry. She holds a PhD in Chemical Engineering from North Carolina State University and is a member of the BUET faculty.\n\nAt the Biohub, she leads development of biosensor-based sanitary pads and women's health diagnostics. She also advises on biocompatible materials and packaging innovations across the Biohub.",
        education: "PhD in Chemical and Biomolecular Engineering | North Carolina State University; MSc in Chemical and Biomolecular Engineering | North Carolina State University ; BSc in Chemical Engineering | BUET"
      }
    ],
    "02_associates": [
      { 
        name: "Mehedi Hasan Pritom", 
        title: "Senior Microbiologist\nInstitute of Omics & Molecular Microbiology", 
        img: "/images/pritom1.png",
        bio: "",
        detailedBio: "Mehedi Hasan Pritom is a biotechnologist trained across biochemical engineering and microbiology, with academic foundations at BUET (MSc in Biochemical Technology) and Khulna University (BSc in Biotechnology and Genetic Engineering). He has built research and teaching experience as a Graduate Research Assistant and Graduate Teaching Assistant, alongside earlier industrial and academic roles. His technical profile spans microbial isolation and biochemical assays, antimicrobial screening, plant-extract processing, nanocomposite fabrication, and in vivo models, complemented by computational drug-discovery tools and operation of advanced analytical platforms including HPLC, qPCR, FTIR, and SEM.\n\nAt the Biohubs, he is a key member of the Blue Microbiome Initiative, where he works on environmental microbe identification for remediation and the genetic engineering of selected strains, integrating classical microbiology with molecular and bioengineering workflows.",
        education: "BSc in Biotechnology and Genetic Engineering | Khulna University | MSc in Biochemical Technology | BUET"
      },
      { 
        name: "Rahul Baroi", 
        title: "Junior Research Associate- Nutraceuticals and Vaccine Engineering\nInstitute of Applied Bioengineering & Material Science", 
        img: "/images/rahul.png",
        bio: "",
        detailedBio: "Rahul Baroi is a Chemical Engineering graduate from Bangladesh University of Engineering and Technology (BUET), specializing in Biochemical Engineering, with research interests in biotechnology, bioprocessing, and sustainable chemical processes. He currently works as a Junior Research Assistant at Aquanimity Bangladesh Limited, where his research focuses on bioactive compound extraction, purification, HPLC quantification, formulation support, and preclinical evaluation. His work includes optimizing microwave-assisted extraction of vasicine from Adhatoda vasica using Response Surface Methodology (RSM) to enhance extraction efficiency and product quality. He is also involved in purification research and experimental planning for bioactive formulations. In preclinical research, Rahul contributes to in vivo mouse studies, oral glucose tolerance testing (OGTT), GLP-1 assay planning, and sandwich ELISA-based biochemical evaluation. Additionally, he supports vaccine engineering and drug delivery research involving formulation development, process optimization, and analytical evaluation.",
        education: "BSc in Chemical Engineering | BUET"
      },
      { 
        name: "Borno Das", 
        title: "Junior Research Associate- Nutraceuticals and Vaccine Engineering\nInstitute of Applied Bioengineering & Material Science", 
        img: "/images/borno.png",
        bio: "",
        detailedBio: "Borno Das holds a BSc in Chemical Engineering from Bangladesh University of Engineering and Technology (BUET) and completed higher secondary studies at Ananda Mohan College. Specializing in biochemical engineering and bioprocessing, he works as a Junior Research Assistant on a nutraceuticals project at Aquanimity Bangladesh Limited. His research focuses on bioactive compound extraction, purification, characterization, and formulation development. His technical expertise spans HPLC, FTIR, UV-Vis spectroscopy, and microwave-assisted extraction, which formed the basis of his thesis on vasicine optimization. Borno also contributes to drug delivery research, vaccine engineering, oral glucose tolerance testing, and sandwich ELISA-based biochemical evaluation.",
        education: "BSc in Chemical Engineering | BUET"
      }
    ],
    "03": [
      { 
        name: "Abed Chawdhury, PhD", 
        title: "Senior Scientific Advisor\n\nPreviously the Hoffman-LaRoche Fellow of Molecular Biology at MIT and Principal Scientist at Syngenta Australia", 
        img: "/images/abed1.png",
        bio: "Leading geneticist with more than 3 decades of experience, having discovered Panchabrihi (five-harvest rice)",
        detailedBio: "Abed Chaudhury is a leading geneticist with more than three decades of experience in genetics, molecular biology, microbiomics, and crop science. He is known internationally for discovering Panchabrihi (five-harvest rice). His career includes serving as a Hoffman-LaRoche Fellow of Molecular Biology at MIT, Principal Scientist at Syngenta Australia, and Head of Research Innovation at Loam Bio, where he applied next-generation sequencing and metagenomics to harness soil microbiomes for carbon sequestration. He also discovered a fungus capable of reducing cattle methane emissions by up to 90 percent.\n\nAt the Biohub, he directs programs in plant genetics, soil and marine microbiomes, and CRISPR-enabled crop innovation.",
        achievement: "Discovered Panchabrihi rice | Discovered methane-reducing fungus (90% reduction) | Hoffman-LaRoche Fellow at MIT",
        education: "PhD in Molecular Biology | University of Oregon"
      }
    ],
    "03_associates": [
      { 
        name: "Mehedi Hasan Pritom", 
        title: "Senior Microbiologist\nInstitute of Omics & Molecular Microbiology", 
        img: "/images/pritom1.png",
        bio: "",
        detailedBio: "Mehedi Hasan Pritom is a biotechnologist trained across biochemical engineering and microbiology, with academic foundations at BUET (MSc in Biochemical Technology) and Khulna University (BSc in Biotechnology and Genetic Engineering). He has built research and teaching experience as a Graduate Research Assistant and Graduate Teaching Assistant, alongside earlier industrial and academic roles. His technical profile spans microbial isolation and biochemical assays, antimicrobial screening, plant-extract processing, nanocomposite fabrication, and in vivo models, complemented by computational drug-discovery tools and operation of advanced analytical platforms including HPLC, qPCR, FTIR, and SEM.\n\nAt the Biohubs, he is a key member of the Blue Microbiome Initiative, where he works on environmental microbe identification for remediation and the genetic engineering of selected strains, integrating classical microbiology with molecular and bioengineering workflows.",
        education: "BSc in Biotechnology and Genetic Engineering | Khulna University | MSc in Biochemical Technology | BUET"
      }
    ],
    "04": [],
    "04_associates": [
      { 
        name: "Mashnoon Mayad", 
        title: "AI/ML Engineer\nInstitute of Computational Biology & AI", 
        img: "/images/mashnoon.png",
        bio: "",
        detailedBio: "Mashnoon Mayad began his journey in Computer Science at BRAC University, where he specialized in Artificial Intelligence through his thesis project AresNN, an attention-based CNN Transformer hybrid with Grad-CAM for explainable skin cancer detection. He complemented this work with independent research on dental disease classification. These projects built his foundation in deep learning, model design, and applied research. He later joined BRAC's Central Data Team, contributing to large-scale analysis across CRMFT, MF, UPG, UDP, and BracNet datasets. During this time, he also developed practical ML and NLP solutions such as the SAINT-based aid-eligibility model for BRAC UPG.\n\nAt the Aquanimity Biohubs, he is working as an AI/ML Lead to develop the Aquanimity Bioplatform, aiding computational biodiscovery research workflows among other in-silico biology, including antibody design",
        education: "BSc in Computer Science | BRAC University"
      },
    ]
  };

  const instituteResearchers = researchers[it.n] || [];
  const instituteAssociates = researchers[it.n + "_associates"] || [];

  // Render researcher card - UPDATED for associates to be clickable
// Render researcher card - UPDATED for associates to be clickable
const renderResearcherCard = (researcher, idx, isAssociate = false) => {
  const hasDetails = researcher.detailedBio || researcher.education || researcher.achievement;
  const isClickable = !isAssociate || (isAssociate && hasDetails);
  
  return (
    <div 
      key={idx}
      onClick={() => {
        if (isClickable && hasDetails) {
          setSelectedMember(researcher);
        }
      }}
      style={{ 
        textAlign: 'center',
        padding: isAssociate ? '16px 12px' : '16px 12px',
        background: '#181A43',
        borderRadius: 16,
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: isClickable && hasDetails ? 'pointer' : 'default',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
      onMouseEnter={(e) => {
        if (isClickable && hasDetails) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = '#1F6E7A';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ 
        width: isAssociate ? 80 : 90,
        height: isAssociate ? 80 : 90,
        borderRadius: '50%', 
        overflow: 'hidden', 
        margin: '0 auto 10px',
        border: '3px solid #1F6E7A',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        flexShrink: 0,
        position: 'relative',
        backgroundColor: '#f0f0f0'
      }}>
        <img 
          src={researcher.img} 
          alt={researcher.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100x100?text=' + researcher.name.charAt(0);
            e.target.style.objectFit = 'contain';
          }}
        />
      </div>
      <div style={{ 
        fontWeight: 600, 
        fontSize: isAssociate ? 14 : 15, 
        color: 'white',
        lineHeight: 1.3,
        marginTop: 4
      }}>
        {researcher.name}
      </div>
      <div style={{ 
        fontSize: isAssociate ? 11 : 12, 
        color: 'rgba(255,255,255,0.8)', 
        marginTop: 2, 
        fontWeight: 500,
        lineHeight: 1.4,
        padding: '0 4px',
        whiteSpace: 'pre-line'
      }}>
        {researcher.title}
      </div>
      {isAssociate && hasDetails && (
        <div style={{ 
          fontSize: 10, 
          color: 'rgba(255,255,255,0.5)', 
          marginTop: 6,
          fontStyle: 'italic'
        }}>
          Click for details
        </div>
      )}
    </div>
  );
};

const renderPlaceholder = (type) => (
  <div style={{ 
    textAlign: 'center',
    padding: '30px 20px',
    background: '#181A43',
    borderRadius: 16,
    border: '2px dashed rgba(255,255,255,0.2)',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }}>
    <div style={{ 
      fontSize: 32, 
      color: 'rgba(255,255,255,0.3)',
      marginBottom: 12
    }}>
      {type === 'researcher' ? '🔬' : '🧪'}
    </div>
    <div style={{ 
      fontSize: 16, 
      fontWeight: 600, 
      color: 'white',
      marginBottom: 6
    }}>
      {type === 'researcher' ? 'Researchers Coming Soon' : 'Research Associates Coming Soon'}
    </div>
    <div style={{ 
      fontSize: 13, 
      color: 'rgba(255,255,255,0.6)',
      maxWidth: 350
    }}>
      We're currently building our team. Check back for updates.
    </div>
  </div>
);

  // Member Details Inline Component - UPDATED for better mobile responsiveness
// Member Details Inline Component - UPDATED with white background and dark text
// Member Details Component (Inline) - Updated to match Institute design
const MemberDetailsInline = ({ member, onClose }) => {
  const detailsRef = useRef(null);

  useEffect(() => {
    if (detailsRef.current) {
      const yOffset = -80;
      const element = detailsRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [member]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      const filters = document.querySelector('.team-filters');
      if (filters) {
        const y = filters.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
      const teamSection = document.getElementById('team');
      if (teamSection) {
        const y = teamSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div 
      ref={detailsRef}
      id="member-details"
      className="member-details-wrapper"
      style={{
        marginTop: '48px',
        marginBottom: '48px',
        background: 'white',
        borderRadius: '32px',
        overflow: 'hidden',
        animation: 'fadeInUp 0.5s ease',
        fontFamily: "'Red Hat Display', sans-serif",
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}
    >
      <div className="mdi-grid" style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 0,
        minHeight: '500px'
      }}>
        <div className="mdi-photo" style={{
          background: '#181A43',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '280px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '3px solid white',
            backgroundColor: '#f0f0f0'
          }}>
            <img
              src={member.img}
              alt={member.name}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/280x280/181A43/FFFFFF?text=Team';
              }}
            />
          </div>
        </div>

        <div className="mdi-content" style={{ 
          padding: '40px', 
          overflowY: 'auto', 
          maxHeight: '600px',
          background: 'white'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            marginBottom: '20px'
          }}>
            <div>
              <div style={{
                fontSize: '12px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#1F6E7A',
                fontWeight: 600,
                marginBottom: '8px',
                whiteSpace: 'pre-line',
                lineHeight: 1.3,
                fontFamily: "'Red Hat Display', sans-serif"
              }}>
                {member.title}
              </div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#181A43',
                marginBottom: '12px',
                letterSpacing: '-0.02em',
                fontFamily: "'Red Hat Display', sans-serif"
              }}>
                {member.name}
              </h2>
              <div style={{
                width: '50px',
                height: '3px',
                background: '#181A43',
                marginBottom: '24px'
              }} />
            </div>
            <button
              onClick={handleClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#F2EDE3',
                border: '1px solid #D8D0BE',
                cursor: 'pointer',
                fontSize: '18px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#181A43',
                fontFamily: "'Red Hat Display', sans-serif",
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#E8E0D0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#F2EDE3'}
            >
              ✕
            </button>
          </div>

          {member.achievement && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#181A43',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Red Hat Display', sans-serif"
              }}>
                <span style={{ fontSize: '20px' }}>🏆</span> Key Achievement
              </h3>
              <div style={{
                background: 'linear-gradient(135deg, rgba(24,26,67,0.05) 0%, rgba(31,110,122,0.05) 100%)',
                padding: '14px',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#181A43',
                lineHeight: 1.5,
                borderLeft: '3px solid #1F6E7A',
                fontFamily: "'Red Hat Display', sans-serif"
              }}>
                {member.achievement}
              </div>
            </div>
          )}

          {member.detailedBio && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#181A43',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Red Hat Display', sans-serif"
              }}>
                <span style={{ fontSize: '20px' }}>📋</span> Biography
              </h3>
              <div style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#181A43',
                textAlign: 'justify',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400
              }}>
                {member.detailedBio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} style={{ 
                    marginBottom: '12px',
                    color: '#181A43'
                  }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {member.education && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#181A43',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Red Hat Display', sans-serif"
              }}>
                <span style={{ fontSize: '20px' }}>🎓</span> Education
              </h3>
              <div style={{
                background: '#181A43',
                padding: '14px',
                borderRadius: '14px',
                fontSize: '13px',
                color: 'white',
                lineHeight: 1.5,
                textAlign: 'justify',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400
              }}>
                {member.education}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="institute-detail-wrapper">
      {/* Hero Section */}
      <div className="id-hero" style={{
        width: '100%',
        height: 'min(55vh, 480px)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 0
      }}>
        <div className="id-hero-image" style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}>
          <img 
            src={it.img} 
            alt={it.title} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} 
          />
          <div className="id-hero-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(14,27,44,0.3), rgba(14,27,44,0.85))'
          }} />
          <div className="id-hero-content" style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 32px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div className="id-hero-label" style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '16px',
              fontWeight: 600,
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              INSTITUTE {it.n} · {it.tag}
            </div>
            <h1 className="id-hero-title" style={{
              fontSize: 'clamp(32px, 5.5vw, 72px)',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#FAF7F0',
              margin: 0,
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              {it.title}
            </h1>
            <p className="id-hero-blurb" style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,0.9)',
              marginTop: '18px',
              maxWidth: '600px',
              lineHeight: 1.45,
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              {it.blurb}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="id-body" style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '48px 32px 70px'
      }}>
        {/* Focus Areas & Description */}
        <div className="id-focus-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '56px',
          marginBottom: '70px'
        }}>
          <div className="id-focus-section">
            <h2 className="id-section-title" style={{
              fontSize: 'clamp(22px, 3.2vw, 38px)',
              fontWeight: 500,
              lineHeight: 1.15,
              marginBottom: '24px',
              color: '#0E1136',
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              <span className="serif" style={{
                fontStyle: 'italic',
                color: '#1F6E7A',
                fontWeight: 400,
                fontFamily: "Georgia, 'Times New Roman', serif"
              }}>Focus</span> Areas
            </h2>
            <div className="id-focus-list" style={{
              display: 'grid',
              gap: '14px'
            }}>
              {areas.slice(0, 8).map((area, idx) => (
                <div key={idx} className="id-focus-item" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.08)'
                }}>
                  <span className="id-focus-dot" style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#1F6E7A',
                    flexShrink: 0
                  }} />
                  <span className="id-focus-text" style={{
                    fontSize: 'clamp(13px, 1.2vw, 14.5px)',
                    color: '#0E1136',
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}>{area}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="id-description-section">
            <h2 className="id-section-title" style={{
              fontSize: 'clamp(22px, 3.2vw, 38px)',
              fontWeight: 500,
              lineHeight: 1.15,
              marginBottom: '24px',
              color: '#0E1136',
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              About the <span className="serif" style={{
                fontStyle: 'italic',
                color: '#1F6E7A',
                fontWeight: 400,
                fontFamily: "Georgia, 'Times New Roman', serif"
              }}>Institute</span>
            </h2>
            {descriptionParagraphs.map((paragraph, idx) => (
              <p key={idx} className="id-description-text" style={{
                fontSize: 'clamp(14px, 1.2vw, 15.5px)',
                lineHeight: 1.7,
                color: '#0E1136',
                marginBottom: '18px',
                textAlign: 'justify',
                fontFamily: "'Red Hat Display', sans-serif"
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Researchers Section */}
        <div className="id-researchers-section" style={{
          marginTop: '40px'
        }}>
          <div className="id-researchers-header" style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h3 className="id-researchers-title" style={{
              fontSize: 'clamp(24px, 2.8vw, 32px)',
              fontWeight: 500,
              marginBottom: '12px',
              color: '#1F6E7A',
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              <span className="serif" style={{
                fontStyle: 'italic',
                color: '#1F6E7A',
                fontWeight: 400,
                fontFamily: "Georgia, 'Times New Roman', serif"
              }}>Researchers</span>
            </h3>
            <div className="id-researchers-line" style={{
              width: '50px',
              height: '2px',
              background: '#1F6E7A',
              margin: '0 auto'
            }} />
          </div>

          {/* Principal Researchers */}
          <div className="id-principal-section" style={{
            marginBottom: '48px'
          }}>
            <h4 className="id-principal-title" style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '20px',
              color: '#0E1136',
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              Principal Investigators & Lead Scientists
            </h4>
            <div className="id-researchers-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'stretch'
            }}>
              {instituteResearchers.length === 0 ? (
                renderPlaceholder('researcher')
              ) : (
                instituteResearchers.map((researcher, idx) => renderResearcherCard(researcher, idx, false))
              )}
            </div>
          </div>

          {/* Research Associates - NOW WITH SAME DESIGN AS PRINCIPAL INVESTIGATORS */}
          <div className="id-associates-section" style={{
            marginBottom: '32px'
          }}>
            <h4 className="id-associates-title" style={{
              fontSize: 'clamp(16px, 1.2vw, 18px)',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '20px',
              color: '#0E1136',
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              Research Associates
            </h4>
            <div className="id-associates-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'stretch'
            }}>
              {instituteAssociates.length === 0 ? (
                renderPlaceholder('associate')
              ) : (
                instituteAssociates.map((associate, idx) => renderResearcherCard(associate, idx, true))
              )}
            </div>
          </div>
        </div>

        {/* Member Details Modal */}
        {selectedMember && (
          <MemberDetailsInline member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}

        {/* CTA Section */}
        <div className="id-collab-cta" style={{
          marginTop: '70px',
          background: '#181a43',
          borderRadius: '20px',
          padding: 'clamp(32px, 4vw, 40px)',
          textAlign: 'center'
        }}>
          <h4 className="id-cta-title" style={{
            fontSize: 'clamp(20px, 1.8vw, 24px)',
            fontWeight: 500,
            marginBottom: '14px',
            color: 'white',
            fontFamily: "'Red Hat Display', sans-serif"
          }}>
            Interested in <span className="serif" style={{
              fontStyle: 'italic',
              color: '#1F6E7A',
              fontWeight: 500,
              fontFamily: "Georgia, 'Times New Roman', serif"
            }}>collaborating</span>?
          </h4>
          <p className="id-cta-text" style={{
            fontSize: 'clamp(13px, 1.2vw, 14.5px)',
            color: 'white',
            marginBottom: '22px',
            maxWidth: '450px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: "'Red Hat Display', sans-serif"
          }}>
            We're always open to research partnerships and visiting positions.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('aq-route', { detail: 'contact' }))}
            className="id-cta-button" style={{
              padding: '11px 30px',
              background: 'white',
              color: '#181a43',
              border: 'none',
              borderRadius: '999px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Red Hat Display', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1F6E7A';
               e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#181a43';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Get in touch →
          </button>
        </div>
      </div>

      <style>{`
        /* Institute Detail Mobile Fixes - PROPER IMAGE SIZING */
        .institute-detail-wrapper {
          font-family: 'Red Hat Display', sans-serif;
        }

        /* Hero Section */
        .id-hero {
          width: 100%;
          height: min(55vh, 480px);
          position: relative;
          overflow: hidden;
        }

        .id-hero-image {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .id-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .id-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(14,27,44,0.3), rgba(14,27,44,0.85));
        }

        .id-hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 32px;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Researchers Grid */
        .id-researchers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          justify-content: center;
          align-items: stretch;
        }

        .id-associates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          justify-content: center;
          align-items: stretch;
        }

        /* Mobile Fixes */
        @media (max-width: 768px) {
          .id-hero {
            height: min(35vh, 260px) !important;
          }
          .id-hero-title {
            font-size: 28px !important;
          }
          .id-hero-blurb {
            font-size: 14px !important;
            margin-top: 10px !important;
          }
          
          .id-focus-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          .id-body {
            padding: 24px 16px 48px !important;
          }

          .id-researchers-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
            gap: 12px !important;
          }

          .id-associates-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
            gap: 12px !important;
          }

          .id-collab-cta {
            padding: 28px 20px !important;
            border-radius: 16px !important;
            margin-top: 40px !important;
          }
        }

        @media (max-width: 480px) {
          .id-hero {
            height: min(30vh, 220px) !important;
          }
          .id-hero-title {
            font-size: 24px !important;
          }
          
          .id-researchers-grid {
            gap: 10px !important;
          }

          .id-associates-grid {
            gap: 10px !important;
          }

          .id-researchers-grid > div > div:first-child {
            font-size: 13px !important;
          }
          .id-researchers-grid > div > div:nth-child(2) {
            font-size: 10px !important;
          }
          
          .id-associates-grid > div > div:first-child {
            font-size: 12px !important;
          }
          .id-associates-grid > div > div:nth-child(2) {
            font-size: 9px !important;
          }
        }

        @media (max-width: 360px) {
          .id-researchers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .id-associates-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .id-researchers-grid > div > div:first-child {
            font-size: 11px !important;
          }
          .id-researchers-grid > div > div:nth-child(2) {
            font-size: 8px !important;
          }
          
          .id-associates-grid > div > div:first-child {
            font-size: 10px !important;
          }
          .id-associates-grid > div > div:nth-child(2) {
            font-size: 7px !important;
          }
        }

        /* Member Details Modal */
        .member-details-wrapper {
          margin-top: 48px;
          margin-bottom: 48px;
        }

        @media (max-width: 800px) {
          .member-details-wrapper .mdi-grid {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }
          .member-details-wrapper .mdi-photo {
            padding: 24px !important;
          }
          .member-details-wrapper .mdi-photo > div {
            max-width: 180px !important;
          }
          .member-details-wrapper .mdi-content {
            max-height: none !important;
            padding: 24px !important;
          }
          .member-details-wrapper .mdi-content h2 {
            font-size: 24px !important;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        
      `}</style>
    </div>
  );
}
// ===== VENTURE DETAIL =====
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
        <div className="wrap" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
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
        <div className="vd-brief-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, marginBottom: 80 }}>
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
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#0E1136' }}>
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
          
          <div className="vd-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
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
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: '#0E1136' }}>Cutting-edge biotech solutions developed at Aquanimity's labs.</p>
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
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: '#0E1136' }}>Transforming lives across Bangladesh and beyond.</p>
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
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: '#0E1136' }}>Leading scientists and engineers from around the world.</p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>

        <div style={{ marginTop: 80, background: 'var(--accent-soft)', borderRadius: 20, padding: 48 }}>
          <SlideIn from="bottom">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h3 style={{ fontSize: 28, fontWeight: 500, marginBottom: 12, color: '#0E1136' }}>
                Key <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>Milestones</span>
              </h3>
              <div style={{ width: 50, height: 2, background: 'var(--accent)', margin: '0 auto' }} />
            </div>
            <div className="vd-milestones-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
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

// ===== DETAIL PAGE =====
// ===== DETAIL PAGE =====
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
  } else if (route.startsWith('partner:')) {
    const short = route.split(':')[1];
    const partner = data.partners?.find(x => x.short === short);
    if (partner) {
      view = <PartnerDetail partner={partner} palette={palette} />;
    } else {
      view = <div style={{ padding: 80, textAlign: 'center' }}>Partner not found.</div>;
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
  } else if (route === 'contact') {
    view = <Contact palette={palette} />;
  } else {
    view = <div style={{ padding: 80, textAlign: 'center' }}>Page not found.</div>;
  }

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: 'white' }}>
      <BackButton onClick={onClose} />
      <div style={{ background: 'white' }}>
        {view}
      </div>
      <Footer />
      
      <style>{`
        :root {
          --accent: #1F6E7A;
          --accent-soft: rgba(31,110,122,0.1);
          --rule: rgba(0,0,0,0.08);
          --muted: rgba(0,0,0,0.5);
          --paper: #FAF7F0;
          --bone: #F2EDE3;
        }

        .serif {
          font-style: italic;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Global Mobile Fixes */
        @media (max-width: 768px) {
          .wrap {
            padding: 0 16px !important;
          }
          .detail-back {
            padding-top: 72px !important;
          }
          .detail-back .wrap {
            padding: 16px !important;
          }
        }

        /* Zigzag Mobile Fixes */
        @media (max-width: 980px) {
          .zigzag-grid-item {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 48px !important;
          }
          .zigzag-grid-item > div {
            order: unset !important;
          }
          .zigzag-image-wrap {
            height: 280px !important;
            border-radius: 20px !important;
          }
        }

        @media (max-width: 768px) {
          .zigzag-section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .zigzag-section h1 {
            font-size: 26px !important;
            margin-bottom: 20px !important;
          }
          .zigzag-intro-box {
            padding: 24px 20px !important;
            margin-bottom: 40px !important;
            border-radius: 16px !important;
          }
          .zigzag-intro-box p {
            font-size: 14px !important;
            line-height: 1.55 !important;
          }
          .zigzag-grid-item {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-bottom: 36px !important;
          }
          .zigzag-image-wrap {
            height: 200px !important;
            border-radius: 16px !important;
          }
          .zigzag-grid-item h2 {
            font-size: 22px !important;
            margin-bottom: 12px !important;
          }
          .zigzag-grid-item p {
            font-size: 14px !important;
          }
          .zigzag-cta {
            padding: 32px 20px !important;
            border-radius: 20px !important;
            margin-top: 20px !important;
          }
          .zigzag-cta h3 {
            font-size: 22px !important;
          }
          .zigzag-cta p {
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .zigzag-section {
            padding-top: 28px !important;
            padding-bottom: 28px !important;
          }
          .zigzag-section h1 {
            font-size: 22px !important;
          }
          .zigzag-intro-box {
            padding: 18px 14px !important;
            margin-bottom: 28px !important;
          }
          .zigzag-image-wrap {
            height: 180px !important;
            border-radius: 14px !important;
          }
          .zigzag-grid-item {
            margin-bottom: 28px !important;
            gap: 12px !important;
          }
          .zigzag-grid-item h2 {
            font-size: 20px !important;
          }
          .zigzag-cta {
            padding: 24px 16px !important;
            border-radius: 16px !important;
          }
          .zigzag-cta h3 {
            font-size: 20px !important;
          }
        }

        /* Venture Mobile Fixes */
        @media (max-width: 768px) {
          .vd-brief-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .vd-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .vd-milestones-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .vd-milestones-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Footer Mobile Fixes */
        @media (max-width: 768px) {
          .ftr-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
          footer {
            margin-top: 48px !important;
            padding-top: 28px !important;
          }
          footer p, footer span, footer a, footer button {
            font-size: 12px !important;
          }
        }

        @media (max-width: 550px) {
          .ftr-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ===== MISSING COMPONENTS =====
function PartnerDetail({ partner, palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 800 }}>{partner.name}</h1>
      <p style={{ fontSize: 18, lineHeight: 1.6 }}>{partner.fullDescription || partner.blurb}</p>
    </div>
  );
}

function ListView({ title, subtitle, items, kind, palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 800 }}>{title}</h1>
      <p style={{ fontSize: 20, color: '#0E1136', maxWidth: 700, marginTop: 18 }}>{subtitle}</p>
      {items?.map((item, idx) => (
        <div key={idx} style={{ padding: '20px 0', borderBottom: '1px solid var(--rule)' }}>
          <h3 style={{ fontSize: 24, fontWeight: 600 }}>{item.title}</h3>
          <p style={{ fontSize: 15, color: '#0E1136' }}>{item.blurb}</p>
        </div>
      ))}
    </div>
  );
}

function TeamFull({ data, palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 800 }}>Our Team</h1>
      {Object.entries(data.team || {}).map(([cat, members]) => (
        <div key={cat} style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600 }}>{cat}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 24 }}>
            {members.map((m, j) => (
              <div key={j}>
                <div style={{ aspectRatio: '4/5', borderRadius: 20, overflow: 'hidden', background: '#f0f0f0' }}>
                  <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{m.title}</div>
                </div>
              </div>
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
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 800 }}>Our Partners</h1>
      {(data.partners || []).map((p, i) => (
        <div key={i} style={{ padding: '30px 0', borderBottom: '1px solid var(--rule)' }}>
          <h3 style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 600 }}>{p.name}</h3>
          <p style={{ fontSize: 15, color: '#0E1136' }}>{p.blurb}</p>
        </div>
      ))}
    </div>
  );
}

function CareersView({ palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 800 }}>Careers</h1>
      <p style={{ fontSize: 20, color: '#0E1136' }}>Help build the bioeconomy.</p>
    </div>
  );
}

function PlatformDetail({ data, palette }) {
  return (
    <div className="wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', paddingTop: 80, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 800 }}>BioPlatform</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 40 }}>
        {(data.phases || []).map((p, i) => (
          <div key={i} style={{ padding: 24, background: 'var(--bone)', borderRadius: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)' }}>PHASE {p.n}</div>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>{p.title}</div>
            <p style={{ fontSize: 14, color: '#0E1136', marginTop: 8 }}>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailPage;