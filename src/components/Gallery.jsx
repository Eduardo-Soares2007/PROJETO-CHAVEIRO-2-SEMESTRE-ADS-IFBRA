import React, { useState } from 'react';
import GalleryItem from './GalleryItem';
import Modal from './Modal';

const galleryData = [
  { src: 'img/cabos.jpg', alt: 'Nossos eletrônicos', caption: 'Nossos eletrônicos' },
  { src: 'img/impressoras.jpg', alt: 'Área de atendimento', caption: 'Área de atendimento ao cliente' },
  { src: 'img/eletronicos.jpg', alt: 'Vitrine de produtos', caption: 'Vitrine com nossos produtos diversos' },
  { src: 'img/maquina de chaves.jpg', alt: 'Equipamentos profissionais', caption: 'Nossos equipamentos profissionais' },
  { src: 'img/cahves e carimbos.jpg', alt: 'Área de trabalho', caption: 'Nossos carimbos personalizados' },
  { src: 'img/chaveiros e cadeados.jpg', alt: 'Produtos diversos', caption: 'Nossos produtos diversos em exposição' },
];

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: '', caption: '' });

  const handleImageClick = (src, caption) => {
    setCurrentImage({ src, caption });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section-title-container">
          <h2 className="section-title fade-in">Nosso Espaço</h2>
        </div>
        
        <div className="gallery-grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {galleryData.map((item, index) => (
            <GalleryItem 
              key={index}
              src={item.src}
              alt={item.alt}
              caption={item.caption}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 fade-in">
          <p className="text-light mb-6">Venha nos visitar e conhecer nosso espaço completo e organizado para melhor atendê-lo!</p>
          <a href="#contact" className="btn btn-primary">
            <i className="fas fa-map-marker-alt btn-icon"></i> Como chegar
          </a>
        </div>
      </div>
      <Modal 
        isOpen={modalOpen}
        onClose={handleCloseModal}
        imageSrc={currentImage.src}
        caption={currentImage.caption}
      />
    </section>
  );
};

export default Gallery;
