import React from 'react';

const Contact = () => {

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.8973167151053!2d-46.67914068502058!3d-23.6441618846422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce455a29777e5d%3A0x28f6e2e5c54e0a29!2sChaveiro%20Gama!5e0!3m2!1spt-BR!2sbr!4v1678888888888!5m2!1spt-BR!2sbr";

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-title-container">
          <h2 className="section-title fade-in">Contato</h2>
          <p className="section-subtitle fade-in">Entre em contato conosco através de nossas redes sociais ou diretamente pelo telefone.</p>
        </div>
        
        <div className="contact-grid md:grid-cols-2 grid-cols-1"> 
          <div className="contact-info fade-in">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h4>Endereço</h4>
                <p>Av. Interlagos, 2501 - lj C7 - Campo Grande, São Paulo - SP, 04612-000</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="contact-text">
                <h4>Telefone</h4>
                <p>
                  <a href="tel:+5511937551523">(11) 93755-1523</a><br/>
                  Telefone Fixo: (11) 5565-4877<br/>
                  Serviços 24 Horas: (11) 98603-9930
                </p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope text-blue-600"></i>
              </div>
              <div className="contact-text">
                <h4>E-mail:</h4>
                <p>Chaveirogama1@gmail.com</p>
              </div>
            </div>
            
            <h4>Redes Sociais:</h4>
            <div className="social-media">
              <div className="social-icons" style={{ display: 'flex', gap: '1rem' }}>
                <p>
                  <a href="https://www.facebook.com/chaveirogama" className="social-icon" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </p>
                <p>
                  <a href="https://www.instagram.com/chaveiro_gama/" className="social-icon" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </p>
                <p>
                  <a href="https://wa.me/5511937551523" className="social-icon" aria-label="WhatsApp">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="contact-map fade-in">
            <iframe 
              src={mapEmbedUrl} 
              width="100%" 
              height="450" 
              style={{ border: 0, borderRadius: 'var(--border-radius-md)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Chaveiro Gama"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;