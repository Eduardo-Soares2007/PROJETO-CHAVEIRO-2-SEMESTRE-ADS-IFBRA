import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: "#services", text: "Serviços" },
    { href: "#products", text: "Outros Serviços" },
    { href: "#gallery", text: "Nosso Espaço" },
    { href: "#about", text: "Sobre" },
    { href: "#contact", text: "Contato" },
  ];

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <i className="fas fa-key logo-icon"></i>
          <span className="logo-text">CHAVEIRO <span>GAMA</span></span>
        </div>
        
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className="footer-link">
              {link.text}
            </a>
          ))}
        </div>
        
        <div className="footer-social">
          <a href="https://www.facebook.com/chaveirogama" className="footer-social-icon" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/chaveiro_gama/" className="footer-social-icon" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/5511937551523" className="footer-social-icon" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        
        <div className="footer-copyright">
          &copy; {currentYear} Chaveiro Gama. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
