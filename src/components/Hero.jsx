import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Soluções em Chaveiro</h1>
          <p className="hero-subtitle">Serviços rápidos, profissionais e com garantia para resolver seus problemas com chaves e fechaduras.</p>
          <div className="hero-buttons">
            <a href="https://wa.me/5511937551523" className="btn btn-primary">
              <i className="fas fa-phone btn-icon"></i> (11) 93755-1523
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-envelope btn-icon"></i> Fale Conosco
            </a>
          </div>
        </div>
        <div className="hero-image fade-in">
          <img src="/img/chaveiro gama 1 sem fundo.png" alt="Chaveiro Gama" className="floating" />
        </div>
      </div>
      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L1440,32L1440,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
