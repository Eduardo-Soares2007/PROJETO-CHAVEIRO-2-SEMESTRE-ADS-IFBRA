import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Showcase from './components/Showcase'; // NOVO
import Gallery from './components/Gallery';
import About from './components/About';
import DistanceCalculator from './components/DistanceCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import FloatingButtons from './components/FloatingButtons';
import ScrollProgress from './components/ScrollProgress';
import Cart from './components/Cart'; // NOVO

function App() {
  const [loading, setLoading] = useState(true);
  
  // --- LÓGICA DO CARRINHO ---
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Abre o carrinho ao adicionar
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    alert('Compra concluída com sucesso! (Isso é apenas uma simulação)');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  // --- FIM DA LÓGICA DO CARRINHO ---

  useEffect(() => {
    // Simula o carregamento de recursos
    const timer = setTimeout(() => {
      setLoading(false);
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500); // Tempo da transição no CSS
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Adiciona a classe 'active' para as animações fade-in
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez ao carregar
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]); // Roda o efeito quando o loading termina

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <ScrollProgress />
      {/* Passa as props do carrinho para o Header */}
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
      />
      
      <main>
        <Hero />
        <Services />
        <Products />
        <Showcase onAddToCart={addToCart} /> {/* NOVO COMPONENTE */}
        <Gallery />
        <About />
        <DistanceCalculator />
        <Contact />
      </main>
      
      <Footer />
      <FloatingButtons />

      {/* NOVO COMPONENTE DO CARRINHO */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </>
  );
}

export default App;