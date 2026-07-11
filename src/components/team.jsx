import React, { useState, useEffect, useRef } from 'react';

// Arrow icon component
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

// Helper function to highlight key achievements in bio text
const highlightKeyInfo = (text) => {
  if (!text) return null;
  
  let highlighted = text;
  
  // Replace "BIOHUB" with "Biohub" and format as separate paragraph
  highlighted = highlighted.replace(/BIOHUB/gi, "Biohub");
  
  // Split into paragraphs and format Biohub section as separate paragraph
  const paragraphs = highlighted.split(/\n\n/);
  if (paragraphs.length > 1) {
    const bioText = paragraphs[0];
    const biohubText = paragraphs.slice(1).join(' ');
    if (biohubText.includes('Biohub')) {
      return (
        <span>
          <span dangerouslySetInnerHTML={{ __html: bioText }} />
          <br /><br />
          <span style={{ display: 'block', marginTop: '8px' }}>
            <span dangerouslySetInnerHTML={{ __html: biohubText }} />
          </span>
        </span>
      );
    }
  }
  
  // Highlight "Ferrari Red" with #FF2800 color
  highlighted = highlighted.replace(/Ferrari Red/gi, (match) => {
    return `<span style="color: #FF2800; font-weight: 700; padding: 0 4px; border-radius: 4px;">${match}</span>`;
  });
  
  // Highlight numbers that indicate scale/impact
  highlighted = highlighted.replace(/\b(\d+(?:,\d+)?)\s*(?:percent|%|patents|people|million|billion)\b/gi, (match) => {
    return `<span style="font-weight: 700;">${match}</span>`;
  });
  
  // Highlight key roles and positions
  const rolePatterns = [
    /Head of R&D/gi,
    /Principal Scientist/gi,
    /Professor and Head/gi,
    /Director of Applied Bioengineering/gi,
    /Program Director/gi,
    /Founding Scientist/gi,
    /Scientific Advisor/gi,
    /CEO/gi,
    /CTO/gi,
    /COO/gi,
    /Managing Director/gi,
    /Executive Director/gi
  ];
  
  rolePatterns.forEach(pattern => {
    highlighted = highlighted.replace(pattern, (match) => {
      return `<span style="font-weight: 600; color: #1B2A3F;">${match}</span>`;
    });
  });
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

// Member Details Component (Inline)
const MemberDetailsInline = ({ member, onClose }) => {
  useEffect(() => {
    const detailsElement = document.getElementById('member-details');
    if (detailsElement) {
      detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [member]);

  return (
    <div 
      id="member-details"
      style={{
        marginTop: 48,
        marginBottom: 48,
        background: 'var(--bone)',
        borderRadius: 32,
        overflow: 'hidden',
        animation: 'fadeInUp 0.5s ease'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 0,
        minHeight: 500
      }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40
        }}>
          <div style={{
            width: '100%',
            maxWidth: 280,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '3px solid white'
          }}>
            <img
              src={member.img}
              alt={member.name}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x500/1F6E7A/FFFFFF?text=${member.name.charAt(0)}`;
              }}
            />
          </div>
        </div>

        <div style={{ padding: 40, overflowY: 'auto', maxHeight: 600 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{
                fontSize: 12,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 600,
                marginBottom: 8,
                whiteSpace: 'pre-line',
                lineHeight: 1.3
              }}>
                {member.title}
              </div>
              <h2 style={{
                fontSize: 32,
                fontWeight: 700,
                color: 'var(--ink)',
                marginBottom: 12,
                letterSpacing: '-0.02em'
              }}>
                {member.name}
              </h2>
              <div style={{
                width: 50,
                height: 3,
                background: 'var(--accent)',
                marginBottom: 24
              }} />
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--paper)',
                border: '1px solid var(--rule)',
                cursor: 'pointer',
                fontSize: 18,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-soft)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--paper)'}
            >
              ✕
            </button>
          </div>

          {/* Key Achievements Section - Highlighted */}
          {member.achievement && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span style={{ fontSize: 20 }}>🏆</span> Key Achievement
              </h3>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,40,0,0.05) 0%, rgba(31,110,122,0.05) 100%)',
                padding: 14,
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 500,
                color: '#1F6E7A',
                lineHeight: 1.5,
                borderLeft: `3px solid #FF2800`
              }}>
                {member.achievement}
              </div>
            </div>
          )}

          {/* Detailed Bio Section with highlighted key info */}
          {member.detailedBio && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span style={{ fontSize: 20 }}>📋</span> Biography
              </h3>
              <div style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--ink-2)',
                textAlign: 'justify'
              }}>
                {highlightKeyInfo(member.detailedBio)}
              </div>
            </div>
          )}

          {/* Education Section */}
          {member.education && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span style={{ fontSize: 20 }}>🎓</span> Education
              </h3>
              <div style={{
                background: 'var(--paper)',
                padding: 14,
                borderRadius: 14,
                fontSize: 13,
                color: 'var(--ink-2)',
                lineHeight: 1.5,
                textAlign: 'justify'
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

function Team({ palette, onOpen }) {
  const ref = useReveal();
  const [selectedMember, setSelectedMember] = useState(null);
  
  let teamData = {};
  try {
    const dataElement = document.getElementById('aquanimity-data');
    if (dataElement && dataElement.textContent) {
      const data = JSON.parse(dataElement.textContent);
      teamData = data.team || {};
    }
  } catch (error) {
    console.error("Failed to load team data:", error);
  }

  if (Object.keys(teamData).length === 0) {
    teamData = {
      "Founding Scientists": [
        {
          "name": "Syed Hossainy, PhD",
          "title": "Founding Scientist and Chair,\nScience Advisory Board\n\n Director of Applied Bioengineering, UC Berkeley", 
          "img": "images/sayed.png",
          "linkedin": "https://linkedin.com",
          "bio": "Prolific inventor with <strong>286 issued patents</strong> and <strong>390 patents pending</strong>",
          "detailedBio": "Syed Hossainy is an <strong> Adjunct Professor and Director of Applied Bioengineering at UC Berkeley</strong> and <strong>Advisor to the BUET Applied Bioengineering Research Incubator</strong>. He previously led<strong> Abbott Vascular's innovation incubator</strong>, delivering 10 feasibility programs, including bio absorbable vascular scaffolds. With <strong>286 issued patents and nearly 390 pending</strong>, he is widely recognized as the co-inventor of the first Drug Eluting Stents.\n\nAt the Biohub, he sets the scientific direction, guides all translational R&D, and mentors teams on research innovation, biomaterials, bioengineering design, and regulatory strategy.",
          "achievement": "Co-inventor of the first Drug Eluting Stents | Holder of 286 issued patents and nearly 390 pending patents",
          "education": "Ph.D. | University of California"
        },
        {
          "name": "Abul Iqbal, PhD",
          "title": "Founding Scientist and\nSenior Advisor, Chemistry",
          "img": "images/abul.png",
          "linkedin": "https://linkedin.com",
          "bio": "Former head of R&D at Ciba-Geigy and Inventor of <span style='color:#FF2800;font-weight:700'>Ferrari Red</span> signature",
          "detailedBio": "Abul Iqbal is a world-renowned chemist and recipient of the<strong> Society of Dyers and Colourists' Perkin Medal (1993)</strong> for pioneering the chemistry behind diketopyrrolopyrrole (DPP) pigments, the core of the signature <span style='color:#FF2800;font-weight:700'>Ferrari Red</span>. A former<strong> Head of R&D at Ciba-Geigy</strong>, he has authored <strong>over 100 patents</strong> in pigments and functional materials.\n\nAt the Biohub, he advises on high-performance pigments, polymers, and sustainable materials. He guides development of jute/RPET composites, colour-stable biomaterials, and supports teams with chemical synthesis, formulation strategy, and industrial scale-up.",
          "achievement": "World-renowned chemist | Perkin Medal recipient  | Author of 100+ patents",
          "education": "Ph.D. | University of St Andrews"
        }
      ],
      "Scientific Advisory Board": [
        {
          "name": "Abed Chaudhury, PhD",
          "title": "Senior Scientific Advisor\n\nPreviously the Hoffman-LaRoche Fellow of Molecular Biology at MIT and Principal Scientist at Syngenta Australia",
          "img": "images/abed1.png",
          "linkedin": "https://linkedin.com",
          "bio": "Leading geneticist with more than 3 decades of experience, having discovered <strong>Panchabrihi (five-harvest rice)</strong>",
          "detailedBio": "Abed Chaudhury is a leading geneticist with more than three decades of experience in genetics, molecular biology, microbiomics, and crop science. He is known internationally for<strong>discovering Panchabrihi (five-harvest rice)</strong> . His career includes serving as<strong>  a Hoffman-LaRoche Fellow of Molecular Biology at MIT, Principal Scientist at Syngenta Australia</strong> , and <strong> Head of Research Innovation at Loam Bio</strong> , where he applied next-generation sequencing and metagenomics to harness soil microbiomes for carbon sequestration. He also discovered a fungus capable of reducing cattle methane emissions by up to 90 percent.\n\nAt the Biohub, he directs programs in plant genetics, soil and marine microbiomes, and CRISPR-enabled crop innovation. He oversees biodiversity initiatives and leads next-generation crop platforms including SuperStaples and Panchabrihi rice.",
          "achievement": "Discovered Panchabrihi rice | Discovered methane-reducing fungus (90% reduction) | Hoffman-LaRoche Fellow at MIT",
          "education": "Ph.D. | MIT"
        },
        {
          "name": "Shoeb Ahmed, PhD",
          "title": "Senior Scientific Advisor and Chair, Institute of Applied Bioengineering and Material Science \n\n Chair and Professor, Dept. of Chemical Engineering, BUET",
          "img": "images/shoeb.png",
          "linkedin": "https://linkedin.com",
          "bio": "Research focus includes <strong>industrial processes, intracellular signalling, and advanced microscopy methods</strong>",
          "detailedBio": "Shoeb Ahmed is a <strong> Professor and Chair of the Department Chemical Engineering at BUET</strong>  and the <strong> Project Director of the Applied Bioengineering Research Incubator (ABRI)</strong> . He holds a PhD from North Carolina State University. His work applies engineering to environmental and clinical challenges, with research focused on intracellular signaling during cell adhesion and migration using advanced microscopy methods.\n\nAt the Biohub, he leads process development, scale-up, and regulatory engineering. He oversees manufacturing of thermoresponsive polymersome vaccines, alternative bioPET packaging, and other bio-engineered products, ensuring that innovations advance toward safe and scalable deployment.",
          "achievement": "Leading intracellular signaling researcher | Former Project Director of ABRI | PhD from NC State",
          "education": "Ph.D. | North Carolina State University"
        },
        {
          "name": "Nafisa Islam, PhD",
          "title": "Senior Scientific Advisor\n\n Professor, Dept. of Chemical Engineering, BUET",
          "img": "images/nafisa.png",
          "linkedin": "https://linkedin.com",
          "bio": "Specialist in <strong>biocompatible materials</strong> and <strong>biosensor development</strong>",
          "detailedBio": "Nafisa Islam is a<strong>  chemical engineer specializing in biocompatible materials, biosensing, and environmental chemistry</strong> . She holds a PhD in Chemical Engineering from North Carolina State University and is a member of the<strong>  BUET faculty</strong> .\n\nAt the Biohub, she leads development of biosensor-based sanitary pads and women's health diagnostics. She also advises on biocompatible materials and packaging innovations across the Biohub, guiding programs that intersect women's health, materials science, and translational engineering.",
          "achievement": "Leading biosensor development for women's health | PhD in Chemical Engineering from NC State",
          "education": "Ph.D. | North Carolina State University"
        },
        {
          "name": "Ayesha Banu, PhD",
          "title": "Senior Advisor\n\nProfessor, Dept. of Women and Gender Studies, Dhaka University",
          "img": "images/aysha.png",
          "linkedin": "https://linkedin.com",
          "bio": "Expert in <strong>gender studies</strong> with her research focus including equity and inclusion",
          "detailedBio": "Ayesha Banu is a <strong> Professor in the Department of Women and Gender Studies at the University of Dhaka</strong> , where she has served since 2001. She holds a<strong>  PhD on the Bangladesh women's movement and master's degrees in sociology and gender and development</strong> . Her research covers women's movements, poverty, religion, body and sexuality, and gender and development.\n\nAt the Biohub, she provides expertise on gender, socio-cultural context, and community outreach. She guides ethical frameworks for women-centric innovations and ensures that research incorporates gender equity and societal impact considerations",
          "achievement": "Professor at University of Dhaka since 2001 | Expert in gender and development research",
          "education": "Ph.D. | University of Dhaka"
        }
      ],
      "Researchers & Consultants": [
        {
          "name": "Samir Hossainy, PhD",
          "title": "Program Director, Novel Delivery Technologies\n\nPostdoctoral Associate, NYU Tandon",
          "img": "images/samir.png",
          "linkedin": "https://linkedin.com",
          "bio": "Co-developer of <strong>thermoreversible polymersomes</strong>",
          "detailedBio": "Samir Hossainy is a <strong> researcher at the University of Chicago</strong>  and<strong>  co-developer of thermoreversible polymersomes</strong>  that self-assemble in water, enabling high-efficiency loading of proteins and siRNA for drug and vaccine delivery. He is currently a<strong>  Postdoctoral Associate at NYU Tandon</strong>  and holds a PhD in<strong>  Molecular Engineering  from the University of Chicago</strong>, along with<strong> MS and BS degrees in Materials Science and Bioengineering from UC Berkeley</strong>.\n\nAt the Biohub, he leads the thermoreversible polymersome platform, advancing applications in vaccines, cancer immunotherapy, and tolerogenic therapies. He guides scale-up and translational engineering in close collaboration with Shoeb Ahmed, PhD, ensuring the platform moves toward clinically relevant deployment.",
          "achievement": "Co-developer of thermoreversible polymersomes | PhD from University of Chicago | Postdoc at NYU Tandon",
          "education": "Ph.D. | University of Chicago"
        },
        {
          "name": "Rifa Punnota",
          "title": "Program Director, Computational Neuroscience\n\nPhD Researcher, University of Oxford",
          "img": "images/rifa.png",
          "linkedin": "https://linkedin.com",
          "bio": "Expertise in <strong>developing computational models for neurodegenerative disease prediction</strong>",
          "detailedBio": "Rifa Punnota is pursuing a PhD in Computational Neuroscience at the University of Oxford, with expertise spanning neurophysiology, neurobiology, neuropharmacology, and neurodegeneration. She holds an MSc in Translational Neuroscience from Imperial College London and a BSc in Pharmacology from University College London.\n\nAt the Biohub, she leads translational neuro-psychiatric research, focusing on computational models of depression and mental health. She collaborates closely with Systems Medicine and AI and Data Science institutes to develop precision mental-health therapeutics",
          "achievement": "PhD candidate at University of Oxford | MSc from Imperial College London | Leading neuro-psychiatric research",
          "education": "Ph.D. | University of Oxford"
        },
        {
          "name": "Tasnim Mostafa",
          "title": "Program Director, Women's Health Innovation\n\nDirector of Meghna Group of Industries (MGI)",
          "img": "images/tasnim.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "Founder of <strong>Anonna</strong>, one of the leading sanitary napkin products in Bangladesh",
          "detailedBio": "Tasnim Mostafa is a Director of Meghna Group of Industries (MGI), one of Bangladesh's largest conglomerates employing more than 60,000 people, and the founder of the leading sanitary napkin brand Anonna. She is deeply engaged in women's health and corporate social responsibility, and has championed inclusive employment and supportive social environments for people with Down syndrome.\n\nAt the Biohub, she drives partnerships with industry and civil society for women's health products, including biosensor sanitary pads and reproductive health interventions. She ensures market access, policy advocacy, and corporate engagement across the Women's Health Innovation program.",
          "achievement": "Founder of Anonna | Director at MGI (60,000+ employees) | Women's health advocate",
          "education": "MSc Management | Imperial College London and LLB | Queen Mary University of London"
        },
        {
          "name": "Oyishee Ahmad",
          "title": "Program Director, Regenerative and Stem Cell Biology\n\nPhD Researcher, Sanquin Research and the University of Amsterdam",
          "img": "images/Oyshi.png",
          "linkedin": "https://linkedin.com",
          "bio": "Expertise in <strong>developing iPSC models for blood cell generation and regenerative medicine applications</strong>",
          "detailedBio": "Oyishee Ahmad is a PhD researcher in the TRACER consortium at Sanquin Research and the University of Amsterdam, where she works on directing stem cells into fully functioning adult blood cells. She uses donor blood to generate induced pluripotent stem cells (iPSCs) and studies developmental processes to scale up lab-made blood production.\n\nAt the Biohub, she bridges the Applied Bioengineering and Genomics/Microbiomics Institutes. She develops iPSC-derived blood cells, organoids, and regenerative platforms, and collaborates closely with computational teams on development and modelling.",
          "achievement": "PhD researcher at University of Amsterdam | iPSC and stem cell differentiation expert",
          "education": "Ph.D. | University of Amsterdam"
        }
      ],
      "Founding Management Team": [
               {
          "name": "Rafez Alam Chowdhury",
          "title": "Chairman\n\nChairman, Convince Group\nFormer President, BGAPMEA\nFormer President, Gulshan Youth Club",
          "img": "images/rafez.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "<strong>25+ years extensive industrial experience</strong> in the sector of ready-made garments (RMG) industry",
          "detailedBio": "Rafez Alam Chowdhury has<strong> over 25 years of experience in the ready-made garments (RMG) industry</strong> alongside promoting and administering diverse business ventures and social initiatives. He now provides <strong>strategic direction, governance oversight, and long-term growth leadership</strong> of Aquanimity Bangldesh Limited alongside the Managing Director.",
          "achievement": "25+ years industrial leadership | Chairman, Convnce Group | Former President, BGAPMEA | Former President, Gulshan Youth Club",
          "education": "MBA | Harvard Business School"
        },
        {
          "name": "Rashik Alam Chowdhury",
          "title": "Managing Director\n\nExecutive Director, Convince Group\nAssociate Director, Tamishna Group\nDirector, Gunee Bangladesh Ltd.",
          "img": "images/rashik.png",
          "linkedin": "https://linkedin.com",
          "bio": "Oversees all stages of the company<strong> development </strong>and makes all<strong> key decisions</strong>. ",
          "detailedBio": "Rashik Alam Chowdhury is the Managing Director of Biohub, bringing responsible for <strong>overseeking every stage of the company development</strong> and one of the <strong>key decision maker </strong>in every real world situation.",
          "achievement": "Exectuive Director, Convince Group | Associate Director, Tamishna Group",
          "education": "BSc Economics | City University of London"
        },
        {
          "name": "Arif Jawad Siam",
          "title": "Executive Director (Operations)\n\nDirector, Gunee Bangladesh Ltd.",
          "img": "images/arif.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "Oversees the <strong>operational coordination</strong> across all divisions in close partnership with the Managing Director",
          "detailedBio": "Arif Jawad Siam is the Executive Director (Operations) at Biohub.He oversees <strong>operational coordination </strong>across all divisions in <strong>close partnership with the Managing Director</strong>, ensuring <strong>scientific programs, infrastructure development, and cross institute initiatives</strong> advance in a unified and execution- focused manner.",
          "achievement": "15+ patents in drug delivery | PhD from Stanford | AI-driven drug discovery expert",
          "education": "Msc in Medicinal Chemistry, University College London | PGCE, University of Buckingham"
        },
        {
          "name": "Farzhad Ahmed",
          "title": "Executive Director (HR, Admin, Sales)\n\nExecutive Director, Convince Zipper and Accessories",
          "img": "images/farzhad.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "Leading <strong>administration and revenue-generating</strong> functions with<strong> HR and talent development</strong>.",
          "detailedBio": "Farzhad Ahmed is the Executive Director (HR, Admin, Sales) at Biohub, with the responsible for<strong> leading organizational administration, and revenue-generating functions</strong>, ensuring <strong>talent development, and operational efficiency</strong>.",
          "achievement": "Executive Director| Wharton MBA | Former McKinsey consultant",
          "education": "Bsc Economics | University of Texas at Austin"
        },
        {
          "name": "Faizus Saquib Chowdhury",
          "title": "Chief Marketing Officer\n\nCredit Risk Analyst at citibank NA\nFormerly at The City Bank ",
          "img": "images/faizus.png",
          "linkedin": "https://linkedin.com",
          "bio": "Drives bold, purpose-led growth by building <strong>brand trust, and scaling customer engagement</strong>",
          "detailedBio": "Faizus Saquib Chowdhury is the Chief Marketing Officer at Biohub, with highly<strong> skilled analytics and data</strong>. He is critical in offering Aquanimity Group Inc. with the information required for <strong>major decision making and product innovation</strong>, previously particularly helping towards the ideation of</strong> Aqualite</strong>.",
          "achievement": "25+ years pharma marketing | Launched 8 blockbuster drugs | Former Pfizer VP | PhD from Cambridge",
          "education": "Msc Economics, University of Warwick | Bsc Economics, University of London"
        }, 
        {
          "name": "Saif Haque",
          "title": "Chief Financial Officer\n\n Equity Research, Accounting, and Compliance at B&B Enterprise (a stock brpkerage house)",
          "img": "images/saif.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "Previously at <strong>DSE and Nestle</strong>. Leading <strong>budget allocation, product costing, and all other financial matters </strong>of the company",
          "detailedBio": "Saif Haque is the Chief Financial Officer at Biohub.Vital in managing <strong>the financial health</strong> of Aquanimity Group Inc. and has been key towards product costing and developing <strong>budget allocation strategic</strong>",
          "achievement": "Managed $500M+ portfolios | Former Goldman Sachs VP | MBA from London Business School",
          "education": "BBA in Finance and Accounting | North South University"
        },
        {
          "name": "Samman Haque",
          "title": "Manager, Marketing\n\nEquity Research, Accounting, and Compliance at B&B Enterprise (a stock brpkerage house)",
          "img": "images/samman.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "Works alongside the CMO regarding <strong>brand development and product marketing </strong>",
          "detailedBio": "Samman Haque is the Vice President of Key Accounts at Biohub, applying his experience of<strong>finding a startup</strong> . Samman is mainly involved in <strong> product development and marketing</strong>.",
          "achievement": "Built 30+ strategic alliances | PhD from Oxford | MBA from INSEAD | Global partnership expert",
          "education": "BBA in  Accounting | North South University"
        }
      ],
      "Others": [
        {
          "name": "Fatin Noor",
          "title": "Biochemist\n Executive Operations and Supply Chain",
          "img": "images/fatin.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Samir Hossainy is a <strong> researcher at the University of Chicago</strong>  and<strong>  co-developer of thermoreversible polymersomes</strong>  that self-assemble in water, enabling high-efficiency loading of proteins and siRNA for drug and vaccine delivery. He is currently a<strong>  Postdoctoral Associate at NYU Tandon</strong>  and holds a PhD in<strong>  Molecular Engineering  from the University of Chicago</strong>, along with<strong> MS and BS degrees in Materials Science and Bioengineering from UC Berkeley</strong>.\n\nAt the Biohub, he leads the thermoreversible polymersome platform, advancing applications in vaccines, cancer immunotherapy, and tolerogenic therapies. He guides scale-up and translational engineering in close collaboration with Shoeb Ahmed, PhD, ensuring the platform moves toward clinically relevant deployment.",
          "achievement": "Co-developer of thermoreversible polymersomes | PhD from University of Chicago | Postdoc at NYU Tandon",
          "education": "Ph.D. | University of Chicago"
        },
        {
          "name": "Mehadi Hasan Pritom",
          "title": "Senior Microbiologist",
          "img": "images/rif.png",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Rifa Punnota is pursuing a PhD in Computational Neuroscience at the University of Oxford, with expertise spanning neurophysiology, neurobiology, neuropharmacology, and neurodegeneration. She holds an MSc in Translational Neuroscience from Imperial College London and a BSc in Pharmacology from University College London.\n\nAt the Biohub, she leads translational neuro-psychiatric research, focusing on computational models of depression and mental health. She collaborates closely with Systems Medicine and AI and Data Science institutes to develop precision mental-health therapeutics",
          "achievement": "PhD candidate at University of Oxford | MSc from Imperial College London | Leading neuro-psychiatric research",
          "education": "Ph.D. | University of Oxford"
        },
        {
          "name": "Mayad Mashnoon",
          "title": "AI/ML Engineer",
          "img": "images/mashnoon.png",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Tasnim Mostafa is a Director of Meghna Group of Industries (MGI), one of Bangladesh's largest conglomerates employing more than 60,000 people, and the founder of the leading sanitary napkin brand Anonna. She is deeply engaged in women's health and corporate social responsibility, and has championed inclusive employment and supportive social environments for people with Down syndrome.\n\nAt the Biohub, she drives partnerships with industry and civil society for women's health products, including biosensor sanitary pads and reproductive health interventions. She ensures market access, policy advocacy, and corporate engagement across the Women's Health Innovation program.",
          "achievement": "Founder of Anonna | Director at MGI (60,000+ employees) | Women's health advocate",
          "education": "MSc Management | Imperial College London and LLB | Queen Mary University of London"
        },
        {
          "name": "Rahul Baroi ",
          "title": "Research Associate-Nutraceuticals and Vaccine",
          "img": "images/vaskor.jpeg",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Oyishee Ahmad is a PhD researcher in the TRACER consortium at Sanquin Research and the University of Amsterdam, where she works on directing stem cells into fully functioning adult blood cells. She uses donor blood to generate induced pluripotent stem cells (iPSCs) and studies developmental processes to scale up lab-made blood production.\n\nAt the Biohub, she bridges the Applied Bioengineering and Genomics/Microbiomics Institutes. She develops iPSC-derived blood cells, organoids, and regenerative platforms, and collaborates closely with computational teams on development and modelling.",
          "achievement": "PhD researcher at University of Amsterdam | iPSC and stem cell differentiation expert",
          "education": "Ph.D. | University of Amsterdam"
        },{
          "name": "Borno Das",
          "title": "Research Associate-Nutraceuticals and Vaccine",
          "img": "images/fatin.jpg",
          "linkedin": "https://linkedin.com",
          "bio": " ",
          "detailedBio": "Samir Hossainy is a <strong> researcher at the University of Chicago</strong>  and<strong>  co-developer of thermoreversible polymersomes</strong>  that self-assemble in water, enabling high-efficiency loading of proteins and siRNA for drug and vaccine delivery. He is currently a<strong>  Postdoctoral Associate at NYU Tandon</strong>  and holds a PhD in<strong>  Molecular Engineering  from the University of Chicago</strong>, along with<strong> MS and BS degrees in Materials Science and Bioengineering from UC Berkeley</strong>.\n\nAt the Biohub, he leads the thermoreversible polymersome platform, advancing applications in vaccines, cancer immunotherapy, and tolerogenic therapies. He guides scale-up and translational engineering in close collaboration with Shoeb Ahmed, PhD, ensuring the platform moves toward clinically relevant deployment.",
          "achievement": "Co-developer of thermoreversible polymersomes | PhD from University of Chicago | Postdoc at NYU Tandon",
          "education": "Ph.D. | University of Chicago"
        }

      ]
    };
  }

  // Reorder categories - Founding Management comes AFTER Researchers & Consultants
  const orderedCategories = [];
  if (teamData["Founding Scientists"]) orderedCategories.push("Founding Scientists");
  if (teamData["Scientific Advisory Board"]) orderedCategories.push("Scientific Advisory Board");
  if (teamData["Researchers & Consultants"]) orderedCategories.push("Researchers & Consultants");
  if (teamData["Founding Management Team"]) orderedCategories.push("Founding Management Team");
  
  // If there are other categories not in the list, add them too
  Object.keys(teamData).forEach(key => {
    if (!orderedCategories.includes(key)) {
      orderedCategories.push(key);
    }
  });

  const allMembers = Object.values(teamData).flat();
  const categories = orderedCategories;
  
  const [activeCategory, setActiveCategory] = useState(null);
  const members = activeCategory ? teamData[activeCategory] || [] : allMembers;
  const isAllMembers = activeCategory === null;
  
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  
  useEffect(() => {
    if (!isAllMembers) return;
    if (!marqueeRef.current) return;
    
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes marqueeScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    if (marqueeRef.current) {
      const duration = Math.max(20, members.length * 3);
      marqueeRef.current.style.animation = `marqueeScroll ${duration}s linear infinite`;
      marqueeRef.current.style.animationPlayState = isPaused ? 'paused' : 'running';
    }
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [members, isPaused, isAllMembers]);

  const duplicatedMembers = [...members, ...members];

  const handleMemberClick = (member) => {
    if (selectedMember === member) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  const renderBio = (bio) => {
    if (!bio) return null;
    // Return bio with HTML formatting (strong tags and Ferrari Red color will work)
    return <span dangerouslySetInnerHTML={{ __html: bio }} />;
  };

  const MemberCard = ({ member, idx }) => (
    <div
      key={idx}
      onClick={() => handleMemberClick(member)}
      style={{
        flex: isAllMembers ? '0 0 auto' : '1',
        width: isAllMembers ? 260 : 'auto',
        minWidth: isAllMembers ? 'auto' : 260,
        marginRight: isAllMembers ? 24 : 0,
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ 
        width: '100%', 
        height: 290,
        borderRadius: 16,
        overflow: 'hidden', 
        background: '#f0f0f0',
        marginBottom: 16
      }}>
        <img 
          src={member.img} 
          alt={member.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/260x290/1F6E7A/FFFFFF?text=${member.name.charAt(0)}`;
          }}
        />
      </div>
      
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: 'var(--ink)' }}>
          {member.name}
        </div>
        <div style={{ 
          fontSize: 13, 
          color: 'var(--accent)', 
          fontWeight: 600, 
          marginBottom: 12,
          whiteSpace: 'pre-line',
          lineHeight: 1.3
        }}>
          {member.title}
        </div>
        
        {member.bio && (
          <div style={{ 
            fontSize: 12, 
            color: 'var(--muted)', 
            marginBottom: 6, 
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {renderBio(member.bio)}
          </div>
        )}
      </div>
    </div>
  );

  if (!members.length) {
    return (
      <section style={{ padding: 140, textAlign: 'center' }}>
        <p>Loading team data...</p>
      </section>
    );
  }

  return (
    <section 
      ref={ref} 
      id="team" 
      style={{ 
        paddingTop: 140, 
        paddingBottom: 120, 
        background: "var(--paper)"
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'end', marginBottom: 56 }}>
          <div>
            <div className="label" style={{ marginBottom: 18, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>
              § 03 — Our Team
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.025em', fontWeight: 900, color: "var(--ink)", margin: 0 }}>
              Built by world class<br/>
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>
                scientists & researchers.
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
            <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 460, lineHeight: 1.55 }}>
              An interdisciplinary cohort of 40+ founders, scientists, and operators —
              spanning Bangladesh, US, UK, Switzerland and Netherlands.
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); if (onOpen) onOpen('team-list'); }} 
              style={{ 
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                color: 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: 0
              }}
            >
              Meet the full team <Arrow />
            </button>
          </div>
        </div>

        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
          <button 
            onClick={() => {
              setActiveCategory(null);
              setSelectedMember(null);
            }}
            style={{
              padding: '10px 24px', 
              borderRadius: 40,
              border: 'none',
              background: activeCategory === null ? 'var(--ink)' : 'transparent',
              color: activeCategory === null ? 'var(--paper)' : 'var(--ink)',
              fontSize: 14, 
              fontWeight: activeCategory === null ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              border: activeCategory === null ? 'none' : '1px solid var(--rule)'
            }}
          >
            All Members
          </button>
          {categories.map(c => (
            <button 
              key={c} 
              onClick={() => {
                setActiveCategory(c);
                setSelectedMember(null);
              }}
              style={{
                padding: '10px 24px', 
                borderRadius: 40,
                border: 'none',
                background: activeCategory === c ? 'var(--ink)' : 'transparent',
                color: activeCategory === c ? 'var(--paper)' : 'var(--ink)',
                fontSize: 14, 
                fontWeight: activeCategory === c ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                border: activeCategory === c ? 'none' : '1px solid var(--rule)'
              }}
            >{c}</button>
          ))}
        </div>
      </div>

      {isAllMembers ? (
        <div 
          className="reveal"
          style={{ 
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            marginTop: 20
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={marqueeRef}
            style={{
              display: 'flex',
              width: 'max-content',
              willChange: 'transform'
            }}
          >
            {duplicatedMembers.map((member, idx) => (
              <MemberCard key={`${member.name}-${idx}`} member={member} idx={idx} />
            ))}
          </div>
          
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: 80, 
            height: '100%', 
            background: 'linear-gradient(to right, var(--paper), transparent)',
            pointerEvents: 'none',
            zIndex: 2
          }} />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: 80, 
            height: '100%', 
            background: 'linear-gradient(to left, var(--paper), transparent)',
            pointerEvents: 'none',
            zIndex: 2
          }} />
        </div>
      ) : (
        <div 
          className="reveal"
          style={{ 
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 32px",
            marginTop: 20
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 40,
            justifyContent: 'center'
          }}>
            {members.map((member, idx) => (
              <div key={idx} style={{ maxWidth: 280, margin: '0 auto', width: '100%' }}>
                <MemberCard member={member} idx={idx} />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMember && (
        <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <MemberDetailsInline member={selectedMember} onClose={() => setSelectedMember(null)} />
        </div>
      )}
    </section>
  );
}

export default Team;