import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container about-container">
        <div className="about-image fade-in">
          <img src="img/frente sem pessoas 1.jpg" alt="Chaveiro Gama" />
        </div>
        
        <div className="about-content fade-in">
          <h2 className="section-title">Nossa História</h2>
          <p className="about-text">O Chaveiro Gama nasceu da paixão por resolver problemas e ajudar pessoas em situações de emergência. O estabelecimento foi fundado há mais de 35 anos atrás, ainda como um quiosque dentro do Shopping Interlagos.</p>
          <p className="about-text">Ao longo dos anos, crescemos e nos especializamos em diversos serviços de chaveiro, sempre investindo em equipamentos de última geração e treinamento constante de nossa equipe. Hoje, somos referência na região pela qualidade de nossos serviços e atendimento personalizado.</p>
          <p className="about-text">Nossa missão é proporcionar segurança e tranquilidade aos nossos clientes, oferecendo soluções rápidas, eficientes e com garantia de satisfação. Cada chave que copiamos, cada porta que abrimos, é uma oportunidade para construir relacionamentos baseados na confiança e profissionalismo.</p>
          
          <div className="about-badges">
            <div className="about-badge">
              <i className="fas fa-history"></i> 35+ anos de experiência
            </div>
            <div className="about-badge">
              <i className="fas fa-users"></i> Equipe especializada
            </div>
            <div className="about-badge">
              <i className="fas fa-clock"></i> Atendimento 24h
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
