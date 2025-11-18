import React from 'react';

const Modal = ({ isOpen, onClose, imageSrc, caption }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`} id="imageModal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>×</span>
        <img src={imageSrc} alt="Imagem ampliada" className="modal-image" />
        <div className="modal-caption">{caption}</div>
      </div>
    </div>
  );
};

export default Modal;
