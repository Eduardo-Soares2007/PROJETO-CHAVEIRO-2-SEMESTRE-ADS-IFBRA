import React, { useState, useEffect } from 'react';
import ThemeSwitch from './ThemeSwitch';

const Header = ({ onCartClick, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#services", text: "Serviços" },
    { href: "#products", text: "Outros Serviços" },
    { href: "#showcase", text: "Vitrine" }, 
    { href: "#gallery", text: "Nosso Espaço" },
    { href: "#about", text: "Sobre" },
    { href: "#contact", text: "Contato" },
  ];

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <a href="#" className="logo">
            <i className="fas fa-key logo-icon"></i>
            <span className="logo-text">CHAVEIRO <span>GAMA</span></span>
          </a>
          
          <nav className="nav-desktop">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.text}
              </a>
            ))}
           
            <button onClick={onCartClick} className="nav-link cart-button">
              <i className="fas fa-shopping-cart"></i> 
              <span className="cart-button-text">Carrinho</span>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>
          </nav>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            aria-label="Menu" 
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="mobile-nav-link" onClick={closeMenu}>
              {link.text}
            </a>
          ))}
          
          <a href="#" className="mobile-nav-link cart-button-mobile" onClick={(e) => {
            e.preventDefault();
            onCartClick();
            closeMenu();
          }}>
            <i className="fas fa-shopping-cart"></i> Carrinho
            {cartItemCount > 0 && (
              <span className="cart-count-mobile">{cartItemCount}</span>
            )}
          </a>
        </nav>
      </div>
      
      <ThemeSwitch />
    </>
  );
};

export default Header;