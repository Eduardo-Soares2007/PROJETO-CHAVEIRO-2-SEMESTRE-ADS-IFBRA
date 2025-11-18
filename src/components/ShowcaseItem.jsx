import React from 'react';

const ShowcaseItem = ({ product, onAddToCart }) => {
  const { name, price, image, description } = product;

  const formatPrice = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="card fade-in showcase-item">
      <div className="showcase-image-container">
        <img src={image} alt={name} className="showcase-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title" style={{ fontSize: 'var(--font-size-lg)' }}>{name}</h3>
        <p className="showcase-description">{description}</p>
        <p className="showcase-price">{formatPrice(price)}</p>
      </div>
      <div className="card-footer">
        <button 
          className="btn btn-primary btn-small"
          onClick={() => onAddToCart(product)}
        >
          <i className="fas fa-cart-plus btn-icon"></i>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ShowcaseItem;