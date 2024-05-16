// DeleteProductPopup.tsx
'use client'
import React, { useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import './DeleteProductPopup.css';

const DeleteProductPopup: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  
  return (
    <div><button className="delete-product-button" onClick={handleOpenPopup}>
      DELETE PRODUCT</button>
      {isPopupOpen && (
        <div className="delete-product-popup-container">
          <div className="delete-product-popup-content">
            <div className="delete-popup-header">
              <MdOutlineArrowBack className="delete-back-icon" onClick={handleClosePopup} />
              </div>
                <h2 className="delete-popup-title">DELETE PRODUCT?</h2>
                <div className="delete-product-info-container">
                  <div className="delete-photo-container"></div>
                  <div className="delete-product-info">
                    <h3 className="delete-product-title">Product</h3>
                    <p className="delete-product-info-text">#00</p>
                    <p className="delete-product-price">₱0.00</p>
                  </div>
                </div>
            <button className="delete-proceed-button">DELETE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProductPopup;
