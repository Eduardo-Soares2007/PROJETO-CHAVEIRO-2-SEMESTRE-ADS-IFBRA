import React from 'react';

const Cart = ({ isOpen, onClose, cartItems, onRemoveFromCart, onCheckout }) => {
  if (!isOpen) return null;

  const formatPrice = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`modal cart-modal ${isOpen ? 'active' : ''}`} id="cartModal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>×</span>
        <h3 className="cart-title">Meu Carrinho</h3>
        
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <ul className="cart-items-list">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <button 
                    className="cart-item-remove"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <h4 className="cart-total">Total: {formatPrice(total)}</h4>
            <button className="btn btn-primary" onClick={onCheckout}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;