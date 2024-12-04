import React from 'react';
import './BookPage.css';

function SidePanel({ isOpen, onClose, title, description, image, onBook, children }) {
  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="panel-content">
        <div
          className="panel-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <h2>{title}</h2>
        <p>{description}</p>
        {children || (
          <button className="Book-button" onClick={onBook}>
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}

export default SidePanel;
