import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="card fade-in">
      <div className="card-icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
