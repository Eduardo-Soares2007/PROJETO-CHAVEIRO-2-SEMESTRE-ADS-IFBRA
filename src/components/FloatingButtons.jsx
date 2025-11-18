import React, { useState, useEffect } from 'react';

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <a href="https://wa.me/5511937551523" className="whatsapp-float" aria-label="Contato via WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>

      <button 
        className={`back-to-top ${showBackToTop ? 'active' : ''}`} 
        aria-label="Voltar ao topo"
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
};

export default FloatingButtons;
