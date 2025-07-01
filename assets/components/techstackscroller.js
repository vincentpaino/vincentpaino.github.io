import React from 'react';

// To install react: https://www.freecodecamp.org/news/how-to-install-react-a-step-by-step-guide/

const TechStackScroller = ({ 
  techStack = [], 
  speed = 24, 
  itemWidth = 200, 
  itemHeight = 120, 
  gap = 20,
  title = "My Tech Stack",
  subtitle = "The technologies I work with",
  showTitle = true,
  className = ""
}) => {
  // Default tech stack if none provided
  const defaultTechStack = [
    { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Node.js', icon: '🌐', color: '#339933' },
    { name: 'MongoDB', icon: '🗄️', color: '#47A248' },
    { name: 'Firebase', icon: '🔥', color: '#FFCA28' },
    { name: 'Tailwind', icon: '💨', color: '#06B6D4' },
    { name: 'Flutter', icon: '📱', color: '#02569B' }
  ];

  const displayTechStack = techStack.length > 0 ? techStack : defaultTechStack;
  const totalItemWidth = itemWidth + (gap * 2);
  const totalItems = displayTechStack.length * 2; // Duplicate for seamless loop
  const wrapperWidth = totalItemWidth * totalItems;
  const animationDistance = totalItemWidth * displayTechStack.length;

  const styles = {
    container: {
      margin: 0,
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollerContainer: {
      width: '100%',
      maxWidth: '800px',
      position: 'relative',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '40px 0',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    scrollerWrapper: {
      display: 'flex',
      animation: `scroll ${speed}s linear infinite`,
      width: `${wrapperWidth}px`
    },
    techItem: {
      minWidth: `${itemWidth}px`,
      height: `${itemHeight}px`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: `0 ${gap}px`,
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      backdropFilter: 'blur(5px)',
      cursor: 'pointer'
    },
    techIcon: {
      width: '50px',
      height: '50px',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    techName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      textAlign: 'center'
    },
    fadeLeft: {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '80px',
      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
      zIndex: 10,
      pointerEvents: 'none'
    },
    fadeRight: {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: '80px',
      background: 'linear-gradient(to left, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
      zIndex: 10,
      pointerEvents: 'none'
    },
    title: {
      color: 'white',
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '30px',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.1rem',
      marginBottom: '40px',
      textAlign: 'center'
    }
  };

  const handleItemHover = (e, isEntering) => {
    if (isEntering) {
      const randomY = 5 + Math.random() * 5;
      const randomRotate = Math.random() * 4 - 2;
      e.target.style.transform = `translateY(-${randomY}px) rotate(${randomRotate}deg)`;
    } else {
      e.target.style.transform = 'translateY(0) rotate(0deg)';
    }
  };

  const renderTechItem = (tech, index) => (
    <div
      key={`${tech.name}-${index}`}
      style={styles.techItem}
      onMouseEnter={(e) => handleItemHover(e, true)}
      onMouseLeave={(e) => handleItemHover(e, false)}
    >
      <div 
        style={{
          ...styles.techIcon,
          background: tech.color ? `linear-gradient(45deg, ${tech.color}, ${tech.color}dd)` : styles.techIcon.background
        }}
      >
        {tech.icon}
      </div>
      <div style={styles.techName}>{tech.name}</div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${animationDistance}px);
            }
          }
          
          .tech-scroller-container:hover .tech-scroller-wrapper {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div style={styles.container} className={className}>
        {showTitle && (
          <>
            <h1 style={styles.title}>{title}</h1>
            <p style={styles.subtitle}>{subtitle}</p>
          </>
        )}
        
        <div style={styles.scrollerContainer} className="tech-scroller-container">
          <div style={styles.fadeLeft}></div>
          <div style={styles.fadeRight}></div>
          
          <div style={styles.scrollerWrapper} className="tech-scroller-wrapper">
            {/* First set of items */}
            {displayTechStack.map((tech, index) => renderTechItem(tech, index))}
            {/* Duplicate set for seamless loop */}
            {displayTechStack.map((tech, index) => renderTechItem(tech, index + displayTechStack.length))}
          </div>
        </div>
      </div>
    </>
  );
};

// Example usage component
const TechStackExample = () => {
  const myTechStack = [
    { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'GraphQL', icon: '◇', color: '#E10098' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'Git', icon: '🌿', color: '#F05032' }
  ];

  return (
    <div>
      {/* Default scroller */}
      <TechStackScroller />
      
      {/* Custom scroller with your tech stack */}
      <div style={{ marginTop: '50px' }}>
        <TechStackScroller
          techStack={myTechStack}
          title="My Custom Tech Stack"
          subtitle="Technologies I'm passionate about"
          speed={30}
          itemWidth={180}
          itemHeight={100}
          gap={15}
        />
      </div>
      
      {/* Minimal version without title */}
      <div style={{ marginTop: '50px' }}>
        <TechStackScroller
          techStack={myTechStack}
          showTitle={false}
          speed={20}
        />
      </div>
    </div>
  );
};

export default TechStackExample;

