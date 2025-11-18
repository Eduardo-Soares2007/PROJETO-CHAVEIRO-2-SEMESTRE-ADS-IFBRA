import React from 'react';

const ProductCard = ({ icon, title, description, features }) => {
  return (
    <div className="card fade-in">
      <div className="card-icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        <p>{description}</p>
        <ul className="product-features">
          {features.map((feature, index) => (
            <li key={index}>
              <i className="fas fa-check"></i> {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <a href="#contact" className="btn btn-primary btn-small">Conferir Produtos</a>
      </div>
    </div>
  );
};

export default ProductCard;
