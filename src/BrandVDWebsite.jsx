import React, { useState, useEffect, useRef } from 'react';
import logoX from "../src/assets/logo.png";
const BrandVDWebsite = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  // Responsive style helpers
  const getResponsiveStyle = (desktop, tablet, mobile) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getGridColumns = (desktop, tablet, mobile) => {
    return getResponsiveStyle(
      `repeat(${desktop}, 1fr)`,
      `repeat(${tablet}, 1fr)`,
      `repeat(${mobile}, 1fr)`
    );
  };

  const getSectionPadding = () => {
    return getResponsiveStyle('8rem 10%', '5rem 6%', '3rem 5%');
  };

  const getGap = (large, medium, small) => {
    return getResponsiveStyle(large, medium, small);
  };

  // Data arrays - brands for marquee (text only)
  const brands = [
    'Housing.com', 'Havells', 'Reebok', 'Aurelia', 'Ola', 'NSDC', 
    'HDFC Bank', 'Apollo Hospitals', 'Jaypee Hospital', 'Delhi Dynamos FC',
    'Samsung', 'DLF', 'Godrej', 'Mahindra', 'PNB MetLife', 'CBRE'
  ];

  // More vibrant colors (5% brighter)
  const serviceColors = [
    '#4F8EFF', '#15D690', '#9D6FFF',
    '#FFB020', '#FF5757', '#18C7E8'
  ];

  const services = [
    {
      title: 'Corporate Communications',
      items: [
        'Corporate Brand Building',
        'Thought Leadership Positioning',
        'Personal Branding for Founders & CXOs',
        'Crisis Communication',
        'Investor Relations'
      ]
    },
    {
      title: 'Digital & Content',
      items: [
        'Digital Brand Building',
        'Social Media Management',
        'Podcast Concept & Production',
        'Ad Films & Corporate Films',
        'Influencer & Creator Marketing'
      ]
    },
    {
      title: 'Strategic Services',
      items: [
        'Employer Branding',
        'Government & Industry Relations',
        'Brand Campaign Implementation',
        'Event Management',
        'Publishing & Printing'
      ]
    },
    {
      title: 'Publishing & Media',
      items: [
        'Book Writing Support',
        'Publishing & Promotion',
        'Video Production',
        'Content Distribution'
      ]
    },
    {
      title: 'Brand Strategy',
      items: [
        'Brand Positioning',
        'Market Research',
        'Competitive Analysis',
        'Brand Architecture'
      ]
    },
    {
      title: 'Campaign Management',
      items: [
        'Integrated Campaigns',
        'Launch Strategies',
        'Performance Tracking',
        'ROI Measurement'
      ]
    }
  ];

  const edgePoints = [
    {
      title: 'CXO-Level Trust & Industry Relationships',
      description: 'We operate on credibility - built through long-standing relationships with top journalists, industry bodies, and ecosystem leaders, enabling access, trust, and high-quality visibility.'
    },
    {
      title: 'Traditional PR Meets Digital-First Thinking',
      description: 'We blend newsroom intuition with platform-native digital execution - from media relations and authored articles to reels, leadership content, and real-time storytelling.'
    },
    {
      title: 'Integrated Communications with Purpose',
      description: 'Every narrative we build aligns brand purpose with business ambition - combining PR, Marketing, digital, social, content, and influencer strategy into one cohesive, consistent voice.'
    },
    {
      title: 'Authentic, Strategic Storytelling',
      description: 'Our approach goes beyond coverage. We craft stories rooted in truth, insight, and brand value — ensuring communications that are impactful, credible, and audience-relevant.'
    }
  ];

  const clients = [
    'SIS Limited',
    'SRED – Retail & Entertainment Advisor',
    'IEX - India Energy Exchange',
    'CIEU – Centre For International Economic Understanding',
    'Metro Hospitals',
    'Square Yards'
  ];

  const cities = [
    'Delhi', 'Mumbai', 'Bengaluru', 'Chandigarh', 'Kolkata', 'Indore',
    'Lucknow', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Jaipur', 'Patna'
  ];

  // Styles object
  const styles = {
    container: {
      fontFamily: "'Work Sans', sans-serif",
      color: '#2D3436',
      background: '#FFFFFF'
    },
    nav: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      padding: '1.5rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    },
    navScrolled: {
      padding: '1rem 5%',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    logoImage: {
      height: isMobile ? '35px' : '45px',
      width: 'auto',
      transition: 'all 0.3s ease'
    },
    mobileMenuButton: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      zIndex: 1001
    },
    hamburger: {
      width: '28px',
      height: '20px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    hamburgerLine: {
      width: '100%',
      height: '3px',
      background: '#0D2F55',
      borderRadius: '3px',
      transition: 'all 0.3s ease'
    },
    navLinks: {
      display: isMobile ? (mobileMenuOpen ? 'flex' : 'none') : 'flex',
      gap: '2.5rem',
      listStyle: 'none',
      alignItems: 'center',
      flexDirection: isMobile ? 'column' : 'row',
      ...(isMobile && mobileMenuOpen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '5rem 2rem 2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        height: '100vh'
      } : {})
    },
    navLinkItem: {
      listStyle: 'none'
    },
    navLink: {
      color: '#0D2F55',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: isMobile ? '1.2rem' : '0.95rem',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    },
    hero: {
      height: '100vh',
      background: 'linear-gradient(135deg, #0D2F55 0%, #234366 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 1rem'
    },
    heroBrandWatermark: {
      position: 'absolute',
      top: '15%',
      right: isMobile ? '-10%' : '5%',
      fontSize: isMobile ? '8rem' : '12rem',
      fontFamily: "'Playfair Display', serif",
      fontWeight: 900,
      color: 'rgba(255, 255, 255, 0.03)',
      transform: 'rotate(-10deg)',
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 0
    },
    heroContent: {
      textAlign: 'center',
      color: 'white',
      zIndex: 1,
      maxWidth: '900px',
      padding: '0 2rem',
      animation: 'fadeInUp 1s ease-out'
    },
    heroTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveStyle('4.5rem', '3.5rem', '2.2rem'),
      fontWeight: 900,
      lineHeight: 1.2,
      marginBottom: '1.5rem',
      letterSpacing: '-1px',
      color: 'white'
    },
    heroTagline: {
      fontSize: getResponsiveStyle('1.3rem', '1.1rem', '0.9rem'),
      fontWeight: 300,
      letterSpacing: getResponsiveStyle('3px', '2px', '2px'),
      marginBottom: '3rem',
      opacity: 0.9,
      color: '#E5F0FF'
    },
    ctaButton: {
      display: 'inline-block',
      padding: getResponsiveStyle('1.2rem 3rem', '1.1rem 2.5rem', '1rem 2rem'),
      background: '#4F8EFF',
      color: 'white',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: getResponsiveStyle('1rem', '0.95rem', '0.9rem'),
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 14px rgba(79, 142, 255, 0.4)',
      cursor: 'pointer',
      border: 'none'
    },
    section: {
      padding: getSectionPadding(),
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.8s ease'
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveStyle('3.5rem', '2.8rem', '2rem'),
      fontWeight: 900,
      marginBottom: '1rem',
      color: '#0D2F55'
    },
    sectionSubtitle: {
      fontSize: getResponsiveStyle('1.2rem', '1.1rem', '1rem'),
      color: '#6B7280',
      marginBottom: '4rem',
      fontWeight: 300
    },
    about: {
      background: 'white'
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(2, 1, 1),
      gap: getGap('5rem', '3rem', '2rem'),
      alignItems: 'center'
    },
    aboutText: {},
    aboutHeading: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveStyle('2rem', '1.7rem', '1.5rem'),
      marginBottom: '1.5rem',
      color: '#0D2F55'
    },
    aboutParagraph: {
      lineHeight: 1.8,
      fontSize: '1.1rem',
      marginBottom: '1.5rem',
      color: '#4B5563'
    },
    aboutHighlight: {
      background: 'linear-gradient(135deg, #0D2F55 0%, #234366 100%)',
      color: 'white',
      padding: getResponsiveStyle('3rem', '2.5rem', '2rem'),
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(13, 47, 85, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    highlightTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.8rem',
      marginBottom: '1rem',
      color: 'white'
    },
    highlightText: {
      lineHeight: 1.8,
      marginBottom: '1rem',
      color: 'white',
      opacity: 0.95
    },
    philosophy: {
      background: '#F9FAFB',
      color: '#0D2F55',
      textAlign: 'center',
      borderTop: '1px solid #E5E7EB',
      borderBottom: '1px solid #E5E7EB'
    },
    philosophyContent: {
      maxWidth: '800px',
      margin: '0 auto',
      fontSize: getResponsiveStyle('1.4rem', '1.2rem', '1.1rem'),
      lineHeight: 1.8,
      fontWeight: 300,
      color: '#4B5563'
    },
    visionMission: {
      background: 'white'
    },
    vmGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(2, 1, 1),
      gap: getGap('4rem', '3rem', '2rem'),
      marginTop: '3rem'
    },
    vmCard: {
      background: 'white',
      padding: getResponsiveStyle('4rem 3rem', '3rem 2rem', '2rem 1.5rem'),
      borderRadius: '12px',
      borderLeft: '4px solid',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      cursor: 'pointer'
    },
    vmTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveStyle('2.5rem', '2rem', '1.8rem'),
      marginBottom: '2rem',
      color: '#0D2F55'
    },
    vmText: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
      color: '#616161'
    },
    services: {
      background: '#F9FAFB'
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(3, 2, 1),
      gap: getGap('2.5rem', '2rem', '1.5rem'),
      marginTop: '3rem'
    },
    serviceCard: {
      background: 'white',
      padding: '2.5rem 2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      borderTop: '3px solid',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    serviceTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveStyle('1.4rem', '1.3rem', '1.2rem'),
      marginBottom: '1rem',
      color: '#0D2F55',
      fontWeight: 700
    },
    serviceList: {
      listStyle: 'none',
      padding: 0
    },
    serviceItem: {
      padding: '0.5rem 0',
      color: '#6B7280',
      fontSize: '0.95rem',
      paddingLeft: '1.5rem',
      position: 'relative'
    },
    edge: {
      background: 'linear-gradient(135deg, #0D2F55 0%, #234366 100%)',
      color: 'white'
    },
    edgeGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(2, 1, 1),
      gap: getGap('3rem', '2rem', '1.5rem'),
      marginTop: '3rem'
    },
    edgeCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px)',
      padding: getResponsiveStyle('3rem', '2.5rem', '2rem'),
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer'
    },
    edgeTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveStyle('1.8rem', '1.5rem', '1.3rem'),
      marginBottom: '1rem',
      color: 'white'
    },
    edgeText: {
      lineHeight: 1.8,
      fontSize: '1rem',
      color: 'white',
      opacity: 0.9
    },
    industries: {
      background: 'white'
    },
    industriesContent: {
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto 4rem'
    },
    industriesText: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
      color: '#4B5563',
      marginBottom: '2rem'
    },
    brandsMarquee: {
      background: 'linear-gradient(135deg, #0D2F55 0%, #234366 100%)',
      padding: '2.5rem 0',
      overflow: 'hidden',
      marginTop: '3rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    brandsScroll: {
      display: 'flex',
      animation: 'scroll 40s linear infinite',
      gap: '3rem',
      alignItems: 'center'
    },
    brandItem: {
      color: 'white',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      fontSize: '1.1rem',
      opacity: 0.9
    },
    clients: {
      background: '#F9FAFB'
    },
    clientsGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(3, 2, 1),
      gap: getGap('2rem', '1.5rem', '1rem'),
      marginTop: '3rem'
    },
    clientCard: {
      background: 'white',
      padding: '2.5rem',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '2px solid',
      borderColor: 'transparent',
      cursor: 'pointer'
    },
    clientName: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.3rem',
      color: '#0D2F55',
      fontWeight: 600
    },
    presence: {
      background: 'white',
      color: '#0D2F55',
      textAlign: 'center'
    },
    presenceGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(6, 3, 2),
      gap: getGap('2rem', '1.5rem', '1rem'),
      marginTop: '3rem'
    },
    presenceItem: {
      background: '#F9FAFB',
      padding: '2rem 1rem',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: 600,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '2px solid #E5E7EB',
      color: '#0D2F55',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
      cursor: 'pointer'
    },
    contact: {
      background: '#F9FAFB',
      textAlign: 'center'
    },
    contactContent: {
      maxWidth: '700px',
      margin: '0 auto'
    },
    contactText: {
      fontSize: '1.3rem',
      lineHeight: 1.8,
      color: '#4B5563',
      marginBottom: '3rem'
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginTop: '3rem'
    },
    contactItem: {
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      fontSize: '1.2rem',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      borderLeft: '4px solid #4F8EFF',
      cursor: 'pointer'
    },
    contactLink: {
      color: '#4F8EFF',
      textDecoration: 'none',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    footer: {
      background: 'linear-gradient(135deg, #0D2F55 0%, #234366 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '3rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Work+Sans:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Work Sans', sans-serif;
          overflow-x: hidden;
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

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .section-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        nav a:hover {
          color: #4F8EFF !important;
        }

        nav a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #4F8EFF;
          transition: width 0.3s ease;
        }

        nav a:hover::after {
          width: 100%;
        }

        nav img:hover {
          transform: scale(1.05);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 142, 255, 0.5) !important;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
        }

        .vm-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
        }

        .edge-card:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        .client-card:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
        }

        .presence-item:hover {
          transform: translateY(-5px);
          border-color: #4F8EFF !important;
          box-shadow: 0 8px 25px rgba(79, 142, 255, 0.15) !important;
        }

        .contact-item:hover {
          transform: translateX(5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
        }

        section {
          will-change: opacity, transform;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        nav.scrolled .logo-container {
          animation: logoFloat 3s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav style={{...styles.nav, ...(scrolled ? styles.navScrolled : {})}}>
        <div style={styles.logoContainer} className="logo-container">
          <img 
            src={logoX} 
            alt="Brand VD Communications" 
            style={styles.logoImage}
          />
        </div>
        
        <button 
          style={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div style={styles.hamburger}>
            <span style={styles.hamburgerLine}></span>
            <span style={styles.hamburgerLine}></span>
            <span style={styles.hamburgerLine}></span>
          </div>
        </button>

        <ul style={styles.navLinks}>
          <li style={styles.navLinkItem}><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} style={styles.navLink}>About</a></li>
          <li style={styles.navLinkItem}><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} style={styles.navLink}>Services</a></li>
          <li style={styles.navLinkItem}><a href="#edge" onClick={(e) => { e.preventDefault(); scrollToSection('edge'); }} style={styles.navLink}>Our Edge</a></li>
          <li style={styles.navLinkItem}><a href="#clients" onClick={(e) => { e.preventDefault(); scrollToSection('clients'); }} style={styles.navLink}>Clients</a></li>
          <li style={styles.navLinkItem}><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} style={styles.navLink}>Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBrandWatermark}>BrandVD</div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Building Brand Value With<br/>Dynamic Storytelling
          </h1>
          <p style={styles.heroTagline}>STRATEGIC COMMUNICATIONS • AUTHENTIC NARRATIVES</p>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            style={styles.ctaButton}
            className="cta-button"
          >
            Let's Build Together
          </a>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={el => sectionsRef.current[0] = el}
        style={{...styles.section, ...styles.about, ...(visibleSections.has('about') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Who We Are</h2>
        <p style={styles.sectionSubtitle}>Strategic Brand Communications Consultancy</p>
        <div style={styles.aboutGrid}>
          <div style={styles.aboutText}>
            <h3 style={styles.aboutHeading}>Building Influence, Credibility, and Long-Term Brand Value</h3>
            <p style={styles.aboutParagraph}>
              We are a strategic brand communications consultancy focused on building influence, credibility, 
              and long-term brand value. Founded on the belief that authenticity builds trust — and trust builds 
              brands — we partner with organisations and leaders to shape reputation with purpose and precision.
            </p>
            <p style={styles.aboutParagraph}>
              With over four decades of combined leadership across Marketing, PR, Digital, and Corporate 
              Communications, our team brings CXO-level counsel and integrated execution.
            </p>
          </div>
          <div style={styles.aboutHighlight}>
            <h4 style={styles.highlightTitle}>Our Approach</h4>
            <p style={styles.highlightText}>
              From corporate reputation and thought leadership to ad campaigns, brand films, digital content, 
              podcasts, reels, and social-first storytelling, we help brands stay relevant to today's audiences.
            </p>
            <p style={{...styles.highlightText, fontWeight: '600'}}>
              Blending strategy with storytelling, we don't chase attention — we build relevance and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        id="philosophy"
        ref={el => sectionsRef.current[1] = el}
        style={{...styles.section, ...styles.philosophy, ...(visibleSections.has('philosophy') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Our Philosophy</h2>
        <div style={styles.philosophyContent}>
          <p>We believe authenticity is the foundation of trust — and trust is the foundation of brand value.</p>
          <p style={{marginTop: '1.5rem'}}>
            Our approach blends clarity, purpose, and partnership to create narratives that build credibility 
            and deliver lasting impact.
          </p>
        </div>
      </section>

      {/* Vision Mission Section */}
      <section 
        id="vision-mission"
        ref={el => sectionsRef.current[2] = el}
        style={{...styles.section, ...styles.visionMission, ...(visibleSections.has('vision-mission') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Vision & Mission</h2>
        <div style={styles.vmGrid}>
          <div style={{...styles.vmCard, borderLeftColor: '#4F8EFF'}} className="vm-card">
            <h3 style={styles.vmTitle}>Vision</h3>
            <p style={styles.vmText}>
              To become the most trusted communications partner for brands and leaders, shaping reputations 
              that influence industries, inspire communities, and create long-term impact.
            </p>
          </div>
          <div style={{...styles.vmCard, borderLeftColor: '#15D690'}} className="vm-card">
            <h3 style={styles.vmTitle}>Mission</h3>
            <p style={styles.vmText}>
              To craft integrated communication that combines strategic insight, authentic storytelling, and 
              trusted relationships - delivering measurable value for brands, leaders, and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services"
        ref={el => sectionsRef.current[3] = el}
        style={{...styles.section, ...styles.services, ...(visibleSections.has('services') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <p style={styles.sectionSubtitle}>Comprehensive Brand Building Solutions</p>
        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} style={{...styles.serviceCard, borderTopColor: serviceColors[index]}} className="service-card">
              <h4 style={styles.serviceTitle}>{service.title}</h4>
              <ul style={styles.serviceList}>
                {service.items.map((item, idx) => (
                  <li key={idx} style={styles.serviceItem}>▸ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Edge Section */}
      <section 
        id="edge"
        ref={el => sectionsRef.current[4] = el}
        style={{...styles.section, ...styles.edge, ...(visibleSections.has('edge') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={{...styles.sectionTitle, color: 'white'}}>Our Edge</h2>
        <p style={{...styles.sectionSubtitle, color: 'white', opacity: 0.9}}>Why Choose Us</p>
        <div style={styles.edgeGrid}>
          {edgePoints.map((point, index) => (
            <div key={index} style={styles.edgeCard} className="edge-card">
              <h3 style={styles.edgeTitle}>{point.title}</h3>
              <p style={styles.edgeText}>{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries Section */}
      <section 
        id="industries"
        ref={el => sectionsRef.current[5] = el}
        style={{...styles.section, ...styles.industries, ...(visibleSections.has('industries') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Industries We Serve</h2>
        <div style={styles.industriesContent}>
          <p style={styles.industriesText}>
            Experience across FMCG, Retail, Tech, Real Estate, B2B, PropTech, GCC, Pharma & Healthcare, 
            Government Institutions, Startups, BFSI, Fintech, Power, Sports & Lifestyle.
          </p>
        </div>
        <div style={styles.brandsMarquee}>
          <div style={styles.brandsScroll}>
            {[...brands, ...brands].map((brand, index) => (
              <span key={index} style={styles.brandItem}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section 
        id="clients"
        ref={el => sectionsRef.current[6] = el}
        style={{...styles.section, ...styles.clients, ...(visibleSections.has('clients') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Current Clients</h2>
        <p style={styles.sectionSubtitle}>Trusted Partnerships</p>
        <div style={styles.clientsGrid}>
          {clients.map((client, index) => (
            <div key={index} style={{...styles.clientCard, borderColor: serviceColors[index % serviceColors.length]}} className="client-card">
              <h4 style={styles.clientName}>{client}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Presence Section */}
      <section 
        id="presence"
        ref={el => sectionsRef.current[7] = el}
        style={{...styles.section, ...styles.presence, ...(visibleSections.has('presence') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Our Presence</h2>
        <p style={styles.sectionSubtitle}>Pan-India Footprint</p>
        <div style={styles.presenceGrid}>
          {cities.map((city, index) => (
            <div key={index} style={styles.presenceItem} className="presence-item">{city}</div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        ref={el => sectionsRef.current[8] = el}
        style={{...styles.section, ...styles.contact, ...(visibleSections.has('contact') ? {opacity: 1, transform: 'translateY(0)'} : {})}}
      >
        <h2 style={styles.sectionTitle}>Let's Build Your Brand Story</h2>
        <div style={styles.contactContent}>
          <p style={styles.contactText}>
            Together, we'll shape stories that connect deeply, build trust, and leave a meaningful impact.
          </p>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem} className="contact-item">
              <strong>Email:</strong> <a href="mailto:amit.arora@brandvdgroup.com" style={styles.contactLink}>amit.arora@brandvdgroup.com</a>
            </div>
            <div style={styles.contactItem} className="contact-item">
              <strong>Contact:</strong> <a href="tel:9971665656" style={styles.contactLink}>+91 9971665656</a>
            </div>
            <div style={styles.contactItem} className="contact-item">
              <strong>Website:</strong> <a href="https://brandvdgroup.com" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>brandvdgroup.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p>&copy; 2026 BRANDVD. All rights reserved. Building Brand Value With Dynamic Storytelling.</p>
        </div>
      </footer>
    </div>
  );
};

export default BrandVDWebsite;
