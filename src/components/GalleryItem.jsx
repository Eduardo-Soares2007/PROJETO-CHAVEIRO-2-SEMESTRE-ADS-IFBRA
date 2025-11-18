import React from 'react';

const GalleryItem = ({ src, alt, caption, onImageClick }) => {
  return (
    <div className="gallery-item fade-in" onClick={() => onImageClick(src, caption)}>
      <div className="gallery-image-container">
        <img src={src} alt={alt} className="gallery-image" />
        <div className="gallery-overlay">
          <div className="gallery-zoom">
            <i className="fas fa-search-plus"></i>
          </div>
        </div>
      </div>
      <div className="gallery-caption">
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
