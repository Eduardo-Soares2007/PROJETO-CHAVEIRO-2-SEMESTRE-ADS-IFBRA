import React from 'react';
import ShowcaseItem from './ShowcaseItem.jsx';


const productData = [
  {
    id: 1,
    name: 'Carregador Turbo KDPAN',
    price: 65.00,
    image: 'img/produto_carregador_kdpan.jpg',
    description: 'Carregador rápido KDPAN (KN-669CC) com cabo Tipo-C.'
  },
  {
    id: 2,
    name: 'Power Bank Magnético KAIDI',
    price: 150.00,
    image: 'img/produto_powerbank_kaidi.jpg',
    description: 'Power bank 10000mAh (KD-998) com carregamento magnético.'
  },
  {
    id: 3,
    name: 'Cabo HDMI B-MAX 3M',
    price: 30.00, 
    image: 'img/produto_cabo_hdmi.jpg',
    description: 'Cabo HDMI 1.4 de 3 metros, Full HD 1080p (BM8673).'
  },
  {
    id: 4,
    name: 'Controle Remoto Lelong',
    price: 25.00, 
    image: 'img/produto_controle_lelong.jpg',
    description: 'Controle remoto Lelong para Smart TVs (LE-7270).'
  },
  {
    id: 5,
    name: 'Chave Canivete Automotiva',
    price: 120.00, 
    image: 'img/produto_chave_ford.jpg',
    description: 'Cópia e programação de chaves canivete para diversos modelos.'
  }
];

const Showcase = ({ onAddToCart }) => {
  return (
    <section id="showcase" className="section showcase">
      <div className="container">
        <div className="section-title-container">
          <h2 className="section-title fade-in">Vitrine de Produtos</h2>
          <p className="section-subtitle fade-in">Confira alguns dos produtos que você encontra em nossa loja.</p>
        </div>
        
        <div className="showcase-grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {productData.map((product) => (
            <ShowcaseItem 
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;