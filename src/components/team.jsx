import React, { useState, useEffect, useRef, useMemo } from 'react';

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
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
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
  
  highlighted = highlighted.replace(/BIOHUB/gi, "Biohub");
  
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
  
  highlighted = highlighted.replace(/Ferrari Red/gi, (match) => {
    return `<span style="color: #FF2800; font-weight: 700; padding: 0 4px; border-radius: 4px;">${match}</span>`;
  });
  
  highlighted = highlighted.replace(/\b(\d+(?:,\d+)?)\s*(?:percent|%|patents|people|million|billion)\b/gi, (match) => {
    return `<span style="font-weight: 700;">${match}</span>`;
  });
  
  const rolePatterns = [
    /Head of R&D/gi, /Principal Scientist/gi, /Professor and Head/gi,
    /Director of Applied Bioengineering/gi, /Program Director/gi,
    /Founding Scientist/gi, /Scientific Advisor/gi, /CEO/gi, /CTO/gi, /COO/gi,
    /Managing Director/gi, /Executive Director/gi
  ];
  
  rolePatterns.forEach(pattern => {
    highlighted = highlighted.replace(pattern, (match) => {
      return `<span style="font-weight: 600; color: #0E1136;">${match}</span>`;
    });
  });
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

// Member Details Component (Inline)
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
    >
      <div className="mdi-grid">
        <div className="mdi-photo">
          <div className="mdi-photo-frame">
            <img
              src={member.img}
              alt={member.name}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/280x280/1F6E7A/FFFFFF?text=Team';
              }}
            />
          </div>
        </div>

        <div className="mdi-content">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            marginBottom: '20px'
          }}>
            <div>
              <div className="mdi-title-label">
                {member.title}
              </div>
              <h2 className="mdi-name">
                {member.name}
              </h2>
              <div style={{ width: '50px', height: '3px', background: 'var(--accent)', marginBottom: '24px' }} />
            </div>
            <button
              onClick={handleClose}
              className="mdi-close-btn"
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-soft)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--paper)'}
            >
              ✕
            </button>
          </div>

          {member.achievement && (
            <div style={{ marginBottom: '24px' }}>
              <h3 className="mdi-section-heading">
                <span style={{ fontSize: '20px' }}>🏆</span> Key Achievement
              </h3>
              <div className="mdi-achievement-box">
                {member.achievement}
              </div>
            </div>
          )}

          {member.detailedBio && (
            <div style={{ marginBottom: '24px' }}>
              <h3 className="mdi-section-heading">
                <span style={{ fontSize: '20px' }}>📋</span> Biography
              </h3>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#0E1136', textAlign: 'justify' }}>
                {highlightKeyInfo(member.detailedBio)}
              </div>
            </div>
          )}

          {member.education && (
            <div style={{ marginBottom: '24px' }}>
              <h3 className="mdi-section-heading">
                <span style={{ fontSize: '20px' }}>🎓</span> Education
              </h3>
              <div style={{
                background: '#181a43',
                padding: '14px',
                borderRadius: '14px',
                fontSize: '13px',
                color: 'white',
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
  const ref = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);
  
  // Re-observe reveals whenever category changes
  const [activeCategory, setActiveCategory] = useState(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    // Observe immediately + with a small delay for dynamically rendered elements
    const observeReveals = () => {
      if (ref.current) {
        const reveals = ref.current.querySelectorAll(".reveal:not(.in)");
        reveals.forEach((el) => observer.observe(el));
      }
    };

    observeReveals();
    const timer = setTimeout(observeReveals, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeCategory]);
  
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
          "img": "images/hossainy.png",
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
          "bio": "Former head of R&D at Ciba-Geigy and inventor of the industrial process of the <span style='color:#FF2800;font-weight:700'>Ferrari Red</span>",
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
          "education": "Ph.D. | North Carolina State University"
        },
        {
          "name": "Nafisa Islam, PhD",
          "title": "Senior Scientific Advisor\n\n Professor, Dept. of Chemical Engineering, BUET",
          "img": "images/nafisa.png",
          "linkedin": "https://linkedin.com",
          "bio": "Specialist in <strong>biocompatible materials</strong> and <strong>biosensor development</strong>",
          "detailedBio": "Nafisa Islam is a<strong>  chemical engineer specializing in biocompatible materials, biosensing, and environmental chemistry</strong> . She holds a PhD in Chemical Engineering from North Carolina State University and is a member of the<strong>  BUET faculty</strong> .\n\nAt the Biohub, she leads development of biosensor-based sanitary pads and women's health diagnostics. She also advises on biocompatible materials and packaging innovations across the Biohub, guiding programs that intersect women's health, materials science, and translational engineering.",
          "education": "Ph.D. | North Carolina State University"
        },
        {
          "name": "Ayesha Banu, PhD",
          "title": "Senior Advisor\n\nProfessor, Dept. of Women and Gender Studies, Dhaka University",
          "img": "images/aysha.png",
          "linkedin": "https://linkedin.com",
          "bio": "Expert in <strong>gender studies</strong> with her research focus including equity and inclusion",
          "detailedBio": "Ayesha Banu is a <strong> Professor in the Department of Women and Gender Studies at the University of Dhaka</strong> , where she has served since 2001. She holds a<strong>  PhD on the Bangladesh women's movement and master's degrees in sociology and gender and development</strong> . Her research covers women's movements, poverty, religion, body and sexuality, and gender and development.\n\nAt the Biohub, she provides expertise on gender, socio-cultural context, and community outreach. She guides ethical frameworks for women-centric innovations and ensures that research incorporates gender equity and societal impact considerations",
          "education": "Ph.D. | University of Dhaka"
        }
      ],
      "Consultants": [
        {
          "name": "Samir Hossainy, PhD",
          "title": "Program Director, Novel Delivery Technologies\n\nPostdoctoral Associate, NYU Tandon",
          "img": "images/samir.png",
          "linkedin": "https://linkedin.com",
          "bio": "Co-developer of <strong>thermoreversible polymersomes</strong>",
          "detailedBio": "Samir Hossainy is a <strong> researcher at the University of Chicago</strong>  and<strong>  co-developer of thermoreversible polymersomes</strong>  that self-assemble in water, enabling high-efficiency loading of proteins and siRNA for drug and vaccine delivery. He is currently a<strong>  Postdoctoral Associate at NYU Tandon</strong>  and holds a PhD in<strong>  Molecular Engineering  from the University of Chicago</strong>, along with<strong> MS and BS degrees in Materials Science and Bioengineering from UC Berkeley</strong>.\n\nAt the Biohub, he leads the thermoreversible polymersome platform, advancing applications in vaccines, cancer immunotherapy, and tolerogenic therapies. He guides scale-up and translational engineering in close collaboration with Shoeb Ahmed, PhD, ensuring the platform moves toward clinically relevant deployment.",
          "achievement": "Co-developer of thermoreversible polymersomes | PhD from University of Chicago | Postdoc at NYU Tandon",
          "education": "Ph.D. | University of Chicago; MSc Materials Science | UC Berkeley; BSc Bioengineering | UC Berkeley"
        },
        {
          "name": "Rifa Punnota",
          "title": "Program Director, Computational Neuroscience\n\nPhD Researcher, University of Oxford",
          "img": "images/rifa.png",
          "linkedin": "https://linkedin.com",
          "bio": "Expertise in <strong>developing computational models for neurodegenerative disease prediction</strong>",
          "detailedBio": "Rifa Punnota is pursuing a <strong>PhD in Computational Neuroscience at the University of Oxford</strong>, with expertise spanning neurophysiology, neurobiology, neuropharmacology, and neurodegeneration. She holds an <strong>MSc in Translational Neuroscience from Imperial College London</strong> and a <strong>BSc in Pharmacology from University College London</strong>.\n\nAt the Biohub, she leads translational neuro-psychiatric research, focusing on computational models of depression and mental health. She collaborates closely with Systems Medicine and AI and Data Science institutes to develop precision mental-health therapeutics",
          "education": "Ph.D. | University of Oxford; MSc Translational Neuroscience | Imperial College London; BSc Pharmacology | University College London"
        },
        {
          "name": "Tasnim Mostafa",
          "title": "Program Director, Women's Health Innovation\n\nDirector of Meghna Group of Industries (MGI)",
          "img": "images/tasnim.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "Founder of <strong>Anonna</strong>, one of the leading sanitary napkin products in Bangladesh",
          "detailedBio": "Tasnim Mostafa is a Director of Meghna Group of Industries (MGI), one of Bangladesh's largest conglomerates employing more than 60,000 people, and the founder of the leading sanitary napkin brand Anonna. She is deeply engaged in women's health and corporate social responsibility, and has championed inclusive employment and supportive social environments for people with Down syndrome.\n\nAt the Biohub, she drives partnerships with industry and civil society for women's health products, including biosensor sanitary pads and reproductive health interventions. She ensures market access, policy advocacy, and corporate engagement across the Women's Health Innovation program.",
          "education": "MSc Management | Imperial College London; LLB | Queen Mary University of London"
        },
        {
          "name": "Oyishee Ahmad",
          "title": "Program Director, Regenerative and Stem Cell Biology\n\nPhD Researcher, Sanquin Research and the University of Amsterdam",
          "img": "images/oyshii.png",
          "linkedin": "https://linkedin.com",
          "bio": "Expertise in <strong>developing iPSC models for blood cell generation and regenerative medicine applications</strong>",
          "detailedBio": "Oyishee Ahmad is a PhD researcher in the TRACER consortium at Sanquin Research and the University of Amsterdam, where she works on directing stem cells into fully functioning adult blood cells. She uses donor blood to generate induced pluripotent stem cells (iPSCs) and studies developmental processes to scale up lab-made blood production.\n\nAt the Biohub, she bridges the Applied Bioengineering and Genomics/Microbiomics Institutes. She develops iPSC-derived blood cells, organoids, and regenerative platforms, and collaborates closely with computational teams on development and modelling.",
          "education": "Ph.D. | University of Amsterdam"
        }
      ],
      "Founding Management Team": [
        {
          "name": "Rafez Alam Chowdhury",
          "title": "Chairman\n\nChairman, Convince Group\nFormer President, BGAPMEA\nFormer President, Gulshan Youth Club",
          "img": "images/rafez.png",
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
          "education": "BSc Economics | City University of London"
        },
        {
          "name": "Arif Jawad Siam",
          "title": "Executive Director (Operations)\n\nDirector, Gunee Bangladesh Ltd.",
          "img": "images/arif.png",
          "linkedin": "https://linkedin.com",
          "bio": "Oversees the <strong>operational coordination</strong> across all divisions in close partnership with the Managing Director",
          "detailedBio": "Arif Jawad Siam is the Executive Director (Operations) at Biohub.He oversees <strong>operational coordination </strong>across all divisions in <strong>close partnership with the Managing Director</strong>, ensuring <strong>scientific programs, infrastructure development, and cross institute initiatives</strong> advance in a unified and execution- focused manner.",
          "education": "MSc in Medicinal Chemistry | University College London"
        },
        {
          "name": "Farzhad Ahmed",
          "title": "Executive Director (HR, Admin, Sales)\n\nExecutive Director, Convince Zipper and Accessories",
          "img": "images/farzhad.png",
          "linkedin": "https://linkedin.com",
          "bio": "Leading <strong>administration and revenue-generating</strong> functions with<strong> HR and talent development</strong>.",
          "detailedBio": "Farzhad Ahmed is the Executive Director (HR, Admin, Sales) at Biohub, with the responsible for<strong> leading organizational administration, and revenue-generating functions</strong>, ensuring <strong>talent development, and operational efficiency</strong>.",
          "education": "Bsc Economics | University of Texas at Austin"
        },
        {
          "name": "Faizus Saquib Chowdhury",
          "title": "Chief Marketing Officer\n\nCredit Risk Analyst at citibank NA\nFormerly at The City Bank ",
          "img": "images/faizus.png",
          "linkedin": "https://linkedin.com",
          "bio": "Drives bold, purpose-led growth by building <strong>brand trust, and scaling customer engagement</strong>",
          "detailedBio": "Bringing expertise in marketing strategy, business analytics, and data-driven decision-making. He plays a key role in shaping Aquanimity's commercial strategy, product development, and market positioning, and was instrumental in the early ideation and development of Aqualite.",
          "education": "Msc Economics, University of Warwick | Bsc Economics, University of London"
        }, 
        {
          "name": "Saif Haque",
          "title": "Chief Financial Officer\n\n Equity Research, Accounting, and Compliance at B&B Enterprise (a stock brpkerage house)",
          "img": "images/saif.png",
          "linkedin": "https://linkedin.com",
          "bio": "Previously at <strong>DSE and Nestle</strong>. Leading <strong>budget allocation, product costing, and all other financial matters </strong>of the company",
          "detailedBio": "Saif Haque is the Chief Financial Officer at Biohub.Vital in managing <strong>the financial health</strong> of Aquanimity Group Inc. and has been key towards product costing and developing <strong>budget allocation strategic</strong>",
          "education": "BBA in Finance and Accounting | North South University"
        },
        {
          "name": "Samman Haque",
          "title": "Manager, Marketing\n\nEquity Research, Accounting, and Compliance at B&B Enterprise (a stock brokerage house)",
          "img": "images/samman.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "Works alongside the CMO regarding <strong>brand development and product marketing </strong>",
          "detailedBio": "Samman Haque is the Vice President of Key Accounts at Biohub, applying his experience of <strong>founding a startup</strong> . Samman is mainly involved in <strong> product development and marketing</strong>.",
          "education": "BBA in  Accounting | North South University"
        }
      ],
      "Research Associates": [
        {
          "name": "Fatin Noor",
          "title": " Executive-Operations and Supply Chain\n Institute of Health Sciences ",
          "img": "images/fatin.jpg",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Fatin pursued Biochemistry and Biotechnology at North South University, gaining a comprehensive foundation in industrial and biomedical sciences through both theory and wet-lab work. His undergraduate research investigated antimicrobial resistance and ESBL-producing Enterobacteriaceae in Dhaka's poultry market, using phenotypic and genotypic methods. He developed competencies in bacterial isolation, antibiotic susceptibility testing, DNA extraction, PCR, gel electrophoresis, and gene identification, later expanding these skills to secondary metabolite screening at NGRI and Invent laboratories.\n\n At the Aquanimity Biohubs, Fatin is establishing Quality Assurance SOPs aligned with FDA, EFSA, BSTI, BFSA, and related standards. His work spans formulation refinement, microbial safety in production environments, and biochemical data interpretation from clinical trials.",
          "education": "BSc in Biotechnology | North South University"
        },
        {
          "name": "Mehedi Hasan Pritom",
          "title": "Senior Microbiologist\n Institute of Omics & Molecular Microbiology",
          "img": "images/pritom1.png",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Mehedi Hasan Pritom is a biotechnologist trained across biochemical engineering and microbiology, with academic foundations at BUET (MSc in Biochemical Technology) and Khulna University (BSc in Biotechnology and Genetic Engineering). He has built research and teaching experience as a Graduate Research Assistant and Graduate Teaching Assistant, alongside earlier industrial and academic roles. His technical profile spans microbial isolation and biochemical assays, antimicrobial screening, plant-extract processing, nanocomposite fabrication, and in vivo models, complemented by computational drug-discovery tools and operation of advanced analytical platforms including HPLC, qPCR, FTIR, and SEM. \n\n At the Biohubs, he is a key member of the Blue Microbiome Initiative, where he works on environmental microbe identification for remediation and the genetic engineering of selected strains, integrating classical microbiology with molecular and bioengineering workflows.",
          "education": "BSc in Biotechnology and Genetic Engineering | Khulna University | MSc in Biochemical Technology | BUET"
        },
        {
          "name": "Mashnoon Mayad",
          "title": "AI/ML Engineer\nInstitute of Computational Biology & AI",
          "img": "images/mashnoon.png",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Mashnoon Mayad began his journey in Computer Science at BRAC University, where he specialized in Artificial Intelligence through his thesis project AresNN, an attention-based CNN Transformer hybrid with Grad-CAM for explainable skin cancer detection. He complemented this work with independent research on dental disease classification. These projects built his foundation in deep learning, model design, and applied research. He later joined BRAC's Central Data Team, contributing to large-scale analysis. across CRMFT, MF, UPG, UDP, and BracNet datasets. During this time, he also developed practical ML and NLP solutions such as the SAINT-based aid-eligibility model for BRAC UPG.\n\n At the Aquanimity Biohubs, he is working as an Al/ML Lead to develop the Aquanimity Bioplatform, aiding computational biodiscovery research workflows among other in-silico biology, including antibody design",
          "education": "BSc in Computer Science | BRAC University"
        },
        {
          "name": "Rahul Baroi ",
          "title": "Junior Research Associate-Nutraceuticals and Vaccine Engineering\nInstitute of Applied Bioengineering & Material Science",
          "img": "images/rahul.png",
          "linkedin": "https://linkedin.com",
          "bio": "",
          "detailedBio": "Rahul Baroi is a Chemical Engineering graduate from Bangladesh University of Engineering and Technology (BUET), specializing in Biochemical Engineering, with research interests in biotechnology, bioprocessing, and sustainable chemical processes. He currently works as a Research Assistant at Aquanimity Bangladesh Limited, where his research focuses on bioactive compound extraction, purification, HPLC quantification, formulation support, and preclinical evaluation. His work includes optimizing microwave-assisted extraction of vasicine from Adhatoda vasica using Response Surface Methodology (RSM) to enhance extraction efficiency and product quality. He is also involved in purification research and experimental planning for bioactive formulations. In preclinical research, Rahul contributes to in vivo mouse studies, oral glucose tolerance testing (OGTT), GLP-1 assay planning, and sandwich ELISA-based biochemical evaluation. Additionally, he supports vaccine engineering and drug delivery research involving formulation development, process optimization, and analytical evaluation.",
          "education": "BSc in Chemical Engineering | BUET"
        },
        {
          "name": "Borno Das",
          "title": "Junior Research Associate-Nutraceuticals and Vaccine Engineering\n Institute of Applied Bioengineering & Material Science",
          "img": "images/borno.png",
          "linkedin": "https://linkedin.com",
          "bio": " ",
          "detailedBio": "Borno Das holds a BSc in Chemical Engineering from Bangladesh University of Engineering and Technology (BUET) and completed higher secondary studies at Ananda Mohan College. Specializing in biochemical engineering and bioprocessing, he works as a Research Assistant on a nutraceuticals project at Aquanimity Bangladesh Limited. His research focuses on bioactive compound extraction, purification, characterization, and formulation development. His technical expertise spans HPLC, FTIR, UV-Vis spectroscopy, and microwave-assisted extraction, which formed the basis of his thesis on vasicine optimization. Borno also contributes to drug delivery research, vaccine engineering, oral glucose tolerance testing, and sandwich ELISA-based biochemical evaluation.",
          "achievement": "Co-developer of thermoreversible polymersomes | PhD from University of Chicago | Postdoc at NYU Tandon",
          "education": "BSc in Chemical Engineering | BUET"
        }
      ]
    };
  }

  const orderedCategories = [];
  if (teamData["Founding Scientists"]) orderedCategories.push("Founding Scientists");
  if (teamData["Scientific Advisory Board"]) orderedCategories.push("Scientific Advisory Board");
  if (teamData["Researchers & Consultants"]) orderedCategories.push("Researchers & Consultants");
  if (teamData["Consultants"]) orderedCategories.push("Consultants");
  if (teamData["Founding Management Team"]) orderedCategories.push("Founding Management Team");

  Object.keys(teamData).forEach(key => {
    if (!orderedCategories.includes(key)) {
      orderedCategories.push(key);
    }
  });

  const allMembers = Object.values(teamData).flat();
  const categories = orderedCategories;
  
  const members = activeCategory ? teamData[activeCategory] || [] : allMembers;
  const isAllMembers = activeCategory === null;
  
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  
  // Mobile: single-card navigation
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMemberIndex, setMobileMemberIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // On mobile, start with first category (not "All Members")
  useEffect(() => {
    if (isMobile && activeCategory === null && categories.length > 0) {
      setActiveCategory(categories[0]);
      setMobileMemberIndex(0);
    }
  }, [isMobile, categories.length]);

  // Reset mobile index when category changes
  useEffect(() => {
    setMobileMemberIndex(0);
  }, [activeCategory]);

  // Build flat list of all members with their category for mobile navigation
  const allMembersWithCategory = useMemo(() => {
    const result = [];
    categories.forEach(cat => {
      (teamData[cat] || []).forEach(member => {
        result.push({ ...member, _category: cat });
      });
    });
    return result;
  }, [categories, teamData]);

  // Mobile: current member from active category's members
  const currentMobileMembers = activeCategory ? teamData[activeCategory] || [] : [];
  const currentMobileMember = currentMobileMembers[mobileMemberIndex];

  const handleMobileNext = () => {
    if (mobileMemberIndex < currentMobileMembers.length - 1) {
      setMobileMemberIndex(mobileMemberIndex + 1);
    } else {
      // Move to next category
      const catIdx = categories.indexOf(activeCategory);
      if (catIdx < categories.length - 1) {
        setActiveCategory(categories[catIdx + 1]);
        // mobileMemberIndex resets to 0 via useEffect
      }
    }
  };

  const handleMobilePrev = () => {
    if (mobileMemberIndex > 0) {
      setMobileMemberIndex(mobileMemberIndex - 1);
    } else {
      // Move to previous category's last member
      const catIdx = categories.indexOf(activeCategory);
      if (catIdx > 0) {
        const prevCat = categories[catIdx - 1];
        const prevMembers = teamData[prevCat] || [];
        setActiveCategory(prevCat);
        // Need to set index after category changes — use timeout
        setTimeout(() => setMobileMemberIndex(prevMembers.length - 1), 10);
      }
    }
  };

  // Check if at the very start or very end across all categories
  const isAtVeryStart = categories.indexOf(activeCategory) === 0 && mobileMemberIndex === 0;
  const isAtVeryEnd = categories.indexOf(activeCategory) === categories.length - 1 
    && mobileMemberIndex === currentMobileMembers.length - 1;
  
  useEffect(() => {
    if (!document.getElementById('marquee-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'marquee-styles';
      styleSheet.textContent = `
        @keyframes marqueeScroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .team-marquee-track {
          display: flex;
          animation: marqueeScroll var(--marquee-speed, 60s) linear infinite;
          will-change: transform;
        }
        .team-marquee-container:hover .team-marquee-track {
          animation-play-state: paused;
        }
        .team-marquee-track.marquee-paused {
          animation-play-state: paused !important;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const duplicatedMembers = useMemo(() => [...members, ...members], [members]);

  const handleMemberClick = (member) => {
    if (selectedMember === member) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
      setTimeout(() => {
        const detailsElement = document.getElementById('member-details');
        if (detailsElement) {
          const yOffset = -80;
          const y = detailsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const renderBio = (bio) => {
    if (!bio) return null;
    return <span dangerouslySetInnerHTML={{ __html: bio }} />;
  };

  const MemberCard = ({ member, idx }) => (
    <div
      key={idx}
      onClick={() => handleMemberClick(member)}
      className={isAllMembers ? 'team-member-card marquee-card' : 'team-member-card grid-card'}
      style={{
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
      <div className="team-member-photo">
        <img 
          src={member.img} 
          alt={member.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/280x280/1F6E7A/FFFFFF?text=Team';
          }}
        />
      </div>
      
      <div>
        <div className="team-member-name">
          {member.name}
        </div>
        <div className="team-member-title">
          {member.title}
        </div>
        
        {member.bio && (
          <div className="team-member-bio">
            {renderBio(member.bio)}
          </div>
        )}
      </div>
    </div>
  );

  if (!members.length) {
    return (
      <section style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
        <p>Loading team data...</p>
      </section>
    );
  }

  return (
    <section 
      ref={ref} 
      id="team" 
      className="team-section"
    >
      <div className="team-wrap">
        <div className="reveal team-intro-grid">
          <div>
            <div className="team-label">
              § 03 — Our Team
            </div>
            <h2 className="team-heading">
              Built by world class<br/>
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>
                scientists & researchers.
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '18px' }}>
            <p className="team-subtitle">
              An interdisciplinary cohort of 40+ founders, scientists, and operators —
              spanning Bangladesh, US, UK, Switzerland and Netherlands.
            </p>
          </div>
        </div>

        <div className="reveal team-filters">
          {/* "All Members" only on desktop */}
          <button 
            type="button"
            className={`team-filter-btn team-filter-all-btn ${activeCategory === null ? 'active' : ''}`}
            onClick={(event) => {
              event.currentTarget.blur();
              setActiveCategory(null);
              setSelectedMember(null);
            }}
          >
            All Members
          </button>
          {categories.map(c => (
            <button 
              key={c} 
              type="button"
              className={`team-filter-btn ${activeCategory === c ? 'active' : ''}`}
              onClick={(event) => {
                event.currentTarget.blur();
                setActiveCategory(c);
                setSelectedMember(null);
                setMobileMemberIndex(0);
              }}
            >{c}</button>
          ))}
          
          {/* Mobile arrow buttons next to filters */}
          <div className="mobile-nav-arrows">
            <button 
              className="mobile-arrow-btn" 
              onClick={handleMobilePrev}
              disabled={isAtVeryStart}
              style={{ opacity: isAtVeryStart ? 0.3 : 1 }}
            >
              ←
            </button>
            <span className="mobile-counter">
              {mobileMemberIndex + 1}/{currentMobileMembers.length}
            </span>
            <button 
              className="mobile-arrow-btn" 
              onClick={handleMobileNext}
              disabled={isAtVeryEnd}
              style={{ opacity: isAtVeryEnd ? 0.3 : 1 }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP: marquee or grid */}
      <div className="desktop-members-view">
        {isAllMembers ? (
          <div 
            className="reveal team-marquee-container"
            style={{ overflow: 'hidden', position: 'relative', width: '100%', marginTop: '20px' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={marqueeRef}
              className={`team-marquee-track ${isPaused ? 'marquee-paused' : ''}`}
              style={{
                display: 'flex',
                width: 'max-content',
                '--marquee-speed': `${Math.max(20, members.length * 3)}s`
              }}
            >
              {duplicatedMembers.map((member, idx) => (
                <MemberCard key={`${member.name}-${idx}`} member={member} idx={idx} />
              ))}
            </div>
            
            <div style={{ position: 'absolute', top: 0, left: 0, width: '80px', height: '100%', background: 'linear-gradient(to right, var(--paper), transparent)', pointerEvents: 'none', zIndex: 2 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '100%', background: 'linear-gradient(to left, var(--paper), transparent)', pointerEvents: 'none', zIndex: 2 }} />
          </div>
        ) : (
          <div 
            className="reveal team-grid-wrap"
          >
            <div className="team-grid">
              {members.map((member, idx) => (
                <MemberCard key={idx} member={member} idx={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE: single card view */}
      <div className="mobile-members-view">
        {currentMobileMember && (
          <div className="mobile-single-card-wrap">
            <div className="mobile-single-card">
              <div className="mobile-card-photo">
                <img 
                  src={currentMobileMember.img} 
                  alt={currentMobileMember.name}
                  style={{ width: '100%', height: '100%' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/280x280/1F6E7A/FFFFFF?text=Team'; }}
                />
              </div>
              <div className="mobile-card-info" onClick={() => handleMemberClick(currentMobileMember)}>
                <div className="mobile-card-name">{currentMobileMember.name}</div>
                <div className="mobile-card-title">{currentMobileMember.title}</div>
                {currentMobileMember.bio && (
                  <div className="mobile-card-bio">
                    {renderBio(currentMobileMember.bio)}
                  </div>
                )}
                <div className="mobile-card-tap">Tap for details</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedMember && (
        <div className="team-details-wrap">
          <MemberDetailsInline member={selectedMember} onClose={() => setSelectedMember(null)} />
        </div>
      )}

      <style>{`
        /* ===== DESKTOP ===== */
        .team-section {
          padding: 36px 0 36px;
          background: white;
        }

        .team-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .team-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: end;
          margin-bottom: 40px;
        }

        .team-label {
          font-family: 'Red Hat Display', sans-serif;
          margin-bottom: 14px;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
        }

        .team-heading {
          font-size:38.7px;
          line-height: 1.02;
          letter-spacing: -0.025em;
          font-weight: 900;
          color: #0E1136;
          margin: 0;
        }

        .team-subtitle {
          font-size: 17px;
          color: #0E1136;
          max-width: 460px;
          line-height: 1.55;
          margin: 0;
        }

        .team-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 36px;
        }

        .team-filter-btn {
          padding: 10px 24px;
          border-radius: 40px;
          background: transparent;
          color: #0E1136;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1px solid var(--rule);
          font-family: 'Red Hat Display', sans-serif;
        }

        .team-filter-btn.active {
          background: #0E1136;
          color: var(--paper);
          border-color: #0E1136;
          font-weight: 600;
        }

        /* Marquee container */
        .team-marquee-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          margin-top: 20px;
        }

        /* Marquee cards - fixed width for horizontal scroll */
        .marquee-card {
          flex: 0 0 auto;
          width: 260px;
          margin-right: 24px;
        }

        /* Grid cards - fill their grid cell */
        .grid-card {
          width: 100%;
        }

        .team-member-photo {
          width: 100%;
          height: 290px;
          border-radius: 16px;
          overflow: hidden;
          background: #f0f0f0;
          margin-bottom: 16px;
        }

        .team-member-name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
          color: #0E1136;
        }

        .team-member-title {
          font-size: 13px;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 12px;
          white-space: pre-line;
          line-height: 1.3;
        }

        .team-member-bio {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 6px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .team-grid-wrap {
          max-width: 1400px;
          margin: 20px auto 0;
          padding: 0 32px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 32px;
        }

        .team-details-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* Member Details Inline */
        .member-details-wrapper {
          margin-top: 48px;
          margin-bottom: 48px;
          background: var(--bone);
          border-radius: 32px;
          overflow: hidden;
          animation: fadeInUp 0.5s ease;
        }

        .mdi-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 0;
          min-height: 500px;
        }

        .mdi-photo {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .mdi-photo-frame {
          width: 100%;
          max-width: 280px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          border: 3px solid white;
        }

        .mdi-content {
          padding: 40px;
          overflow-y: auto;
          max-height: 600px;
        }

        .mdi-title-label {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 8px;
          white-space: pre-line;
          line-height: 1.3;
        }

        .mdi-name {
          font-size: 32px;
          font-weight: 700;
          color: #0E1136;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .mdi-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 1px solid var(--rule);
          cursor: pointer;
          font-size: 18px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mdi-section-heading {
          font-size: 16px;
          font-weight: 600;
          color: #0E1136;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mdi-achievement-box {
          background: linear-gradient(135deg, rgba(255,40,0,0.05) 0%, rgba(31,110,122,0.05) 100%);
          padding: 14px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 500;
          color: #1F6E7A;
          line-height: 1.5;
          border-left: 3px solid #FF2800;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .7s ease, transform .7s ease;
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== TABLET (≤980px) ===== */
        @media (max-width: 980px) {
          .team-section {
            padding: 56px 0 56px !important;
          }

          .team-wrap {
            padding: 0 20px !important;
          }

          .team-intro-grid {
            gap: 32px !important;
            margin-bottom: 32px !important;
          }
        }

        /* Desktop/Mobile visibility */
        .mobile-nav-arrows { display: none; }
        .mobile-members-view { display: none; }
        .desktop-members-view { display: block; width: 100%; }
        .team-filter-all-btn { display: inline-block; }

        /* ===== MOBILE (≤768px) ===== */
        @media (max-width: 768px) {
          .team-section {
            padding: 36px 0 40px !important;
          }

          .team-wrap {
            padding: 0 16px !important;
          }

          .team-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            align-items: start !important;
            margin-bottom: 24px !important;
          }

          .team-label {
            margin-bottom: 10px !important;
            font-size: 10px !important;
          }

          .team-heading {
            font-size: 38.7px !important;
          }

          .team-subtitle {
            font-size: 14px !important;
            max-width: 100% !important;
          }

          /* Hide "All Members" on mobile */
          .team-filter-all-btn { display: none !important; }

          /* Hide desktop view, show mobile view */
          .desktop-members-view { display: none !important; }
          .mobile-members-view { display: block !important; }

          .team-filters {
            gap: 6px !important;
            margin-bottom: 16px !important;
            align-items: center !important;
            position: relative;
          }

          .team-filter-btn {
            padding: 6px 12px !important;
            font-size: 10px !important;
          }

          /* Mobile arrow buttons */
          .mobile-nav-arrows {
            display: flex !important;
            align-items: center;
            gap: 8px;
            margin-left: auto;
            flex-shrink: 0;
          }

          .mobile-arrow-btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1.5px solid var(--rule);
            background: transparent;
            color: #0E1136;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-weight: 600;
          }

          .mobile-arrow-btn:active:not(:disabled) {
            background: #0E1136;
            color: white;
            border-color: #0E1136;
          }

          .mobile-counter {
            font-size: 11px;
            color: var(--muted);
            font-weight: 600;
            min-width: 32px;
            text-align: center;
            font-family: 'Red Hat Display', sans-serif;
          }

          /* Mobile single card */
          .mobile-single-card-wrap {
            padding: 0 16px;
          }

          .mobile-single-card {
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            border: 1px solid rgba(0,0,0,0.06);
          }

          .mobile-card-photo {
            width: 100%;
            height: 40%;
           
            overflow: hidden;
            background: linear-gradient(135deg, #f0ece4, #e8e4dc);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-card-info {
            padding: 16px 18px;
            cursor: pointer;
          }

          .mobile-card-name {
            font-size: 18px;
            font-weight: 700;
            color: #0E1136;
            margin-bottom: 4px;
          }

          .mobile-card-title {
            font-size: 12px;
            color: var(--accent);
            font-weight: 600;
            margin-bottom: 10px;
            white-space: pre-line;
            line-height: 1.3;
          }

          .mobile-card-bio {
            font-size: 13px;
            color: var(--muted);
            line-height: 1.5;
            margin-bottom: 8px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .mobile-card-tap {
            font-size: 11px;
            color: var(--accent);
            font-weight: 500;
            font-style: italic;
            opacity: 0.7;
          }

          .team-member-photo {
            height: 220px !important;
            border-radius: 12px !important;
            margin-bottom: 12px !important;
          }

          .team-member-name {
            font-size: 15px !important;
          }

          .team-member-title {
            font-size: 11px !important;
            margin-bottom: 8px !important;
          }

          .team-member-bio {
            font-size: 11px !important;
          }

          .team-grid-wrap {
            padding: 0 16px !important;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }

          .team-details-wrap {
            padding: 0 16px !important;
          }

          .member-details-wrapper {
            margin-top: 24px !important;
            margin-bottom: 24px !important;
            border-radius: 20px !important;
          }

          .mdi-grid {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
          }

          .mdi-photo {
            padding: 24px !important;
          }

          .mdi-photo-frame {
            max-width: 200px !important;
          }

          .mdi-content {
            max-height: none !important;
            padding: 24px !important;
          }

          .mdi-name {
            font-size: 24px !important;
          }

          .mdi-title-label {
            font-size: 10px !important;
          }
        }

        /* ===== SMALL MOBILE (≤480px) ===== */
        @media (max-width: 480px) {
          .team-section {
            padding: 28px 0 32px !important;
          }

          .team-intro-grid {
            gap: 12px !important;
            margin-bottom: 20px !important;
          }

          .team-heading {
            font-size: 38.7px !important;
          }

          .team-subtitle {
            font-size: 13px !important;
          }

          .team-filters {
            gap: 5px !important;
            margin-bottom: 18px !important;
          }

          .team-filter-btn {
            padding: 6px 12px !important;
            font-size: 10.5px !important;
          }

          .marquee-card {
            width: 180px !important;
            margin-right: 14px !important;
          }

          .grid-card {
            width: 100% !important;
          }

          .team-member-photo {
            height: 200px !important;
          }

          .team-member-name {
            font-size: 14px !important;
          }

          .team-member-title {
            font-size: 10.5px !important;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }

          .member-details-wrapper {
            margin-top: 20px !important;
            margin-bottom: 20px !important;
            border-radius: 16px !important;
          }

          .mdi-photo {
            padding: 20px !important;
          }

          .mdi-content {
            padding: 20px !important;
          }

          .mdi-name {
            font-size: 20px !important;
          }

          .mdi-section-heading {
            font-size: 14px !important;
          }

          .mdi-achievement-box {
            font-size: 12.5px !important;
            padding: 12px !important;
          }
        }

        /* ===== EXTRA SMALL (≤360px) ===== */
        @media (max-width: 360px) {
          .team-section {
            padding: 24px 0 28px !important;
          }

          .team-heading {
            font-size: 20px !important;
          }

          .marquee-card {
            width: 160px !important;
            margin-right: 12px !important;
          }

          .grid-card {
            width: 100% !important;
          }

          .team-member-photo {
            height: 180px !important;
          }

          .team-filter-btn {
            padding: 5px 10px !important;
            font-size: 10px !important;
          }
        }

        /* Touch devices */
        @media (hover: none) {
          .team-member-card:active {
            transform: scale(0.97) !important;
          }

          .team-filter-btn:active {
            transform: scale(0.96);
          }
        }

        /* Member Details Inline - Updated to match Institute design */
.member-details-wrapper {
  margin-top: 48px;
  margin-bottom: 48px;
  background: white;
  border-radius: 32px;
  overflow: hidden;
  animation: fadeInUp 0.5s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.mdi-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 0;
  min-height: 500px;
}

.mdi-photo {
  background: linear-gradient(135deg, #181A43 0%, #2A2D5E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.mdi-photo-frame {
  width: 100%;
  max-width: 280px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border: 3px solid white;
}

.mdi-content {
  padding: 40px;
  overflow-y: auto;
  max-height: 600px;
  background: white;
}

.mdi-title-label {
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #1F6E7A;
  font-weight: 600;
  margin-bottom: 8px;
  white-space: pre-line;
  line-height: 1.3;
}

.mdi-name {
  font-size: 32px;
  font-weight: 700;
  color: #181A43;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.mdi-close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background:white;
  border: 1px solid white;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #181A43;
}

.mdi-close-btn:hover {
  background: #E8E0D0;
}

.mdi-section-heading {
  font-size: 16px;
  font-weight: 600;
  color: #181A43;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mdi-achievement-box {
  background: linear-gradient(135deg, rgba(24,26,67,0.05) 0%, rgba(31,110,122,0.05) 100%);
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #181A43;
  line-height: 1.5;
  border-left: 3px solid #1F6E7A;
}
      `}</style>
    </section>
  );
}

export default Team;