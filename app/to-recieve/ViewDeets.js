/* ToRecieveViewDeets.jsx */
'use client'
import React, { useState } from 'react';
import './ToRecieveViewDeets.css';
import { FaExclamationCircle, FaArrowLeft, FaStar } from 'react-icons/fa';

const ViewDeets = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [productRating, setProductRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [hoverProductRating, setHoverProductRating] = useState(0);
  const [hoverDeliveryRating, setHoverDeliveryRating] = useState(0);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleRatePopup = () => {
    setShowRatePopup(!showRatePopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowRatePopup(false);
  };

  const handleBackButton = () => {
    setShowRatePopup(false);
  };

  const handleProductStarClick = (value) => {
    setProductRating(value);
  };

  const handleDeliveryStarClick = (value) => {
    setDeliveryRating(value);
  };

  const handleProductStarHover = (value) => {
    setHoverProductRating(value);
  };

  const handleDeliveryStarHover = (value) => {
    setHoverDeliveryRating(value);
  };

  const getProductRatingText = () => {
    switch (productRating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Bad';
      case 3:
        return 'Ok';
      case 4:
        return 'Good';
      case 5:
        return 'Amazing';
      default:
        return '';
    }
  };

  const getDeliveryRatingText = () => {
    switch (deliveryRating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Bad';
      case 3:
        return 'Ok';
      case 4:
        return 'Good';
      case 5:
        return 'Amazing';
      default:
        return '';
    }
  };

  return (
    <div>
      <button className="order-received-button" onClick={togglePopup}>
        Order Received
      </button>
      {showPopup && !showRatePopup && (
        <div className="recieved-popup-background" onClick={handleClosePopup}>
          <div className="recieved-popup-container" onClick={(e) => e.stopPropagation()}>
            <FaExclamationCircle className="recieved-exclamation-icon" />
            <p className="recieved-popup-text">
              Are you absolutely sure that you have received your order?
            </p>
            <div className="recieved-button-container">
              <button className="recieved-cancel-button" onClick={handleClosePopup}>Cancel</button>
              <button className="recieved-order-received-popup-button" onClick={toggleRatePopup}>Order Received</button>
            </div>
          </div>
        </div>
      )}
      {showRatePopup && (
        <div className="recieved-popup-background">
          <div className="recieved-popup-container-rate">
            <button className="recieved-back-rate-container" onClick={handleBackButton}>
                <FaArrowLeft className="recieved-back-icon" />
                <p className="recieved-rate-product-text">Rate Product</p>
            </button>
            <div className="recieved-product-container">
              <div className="recieved-square-container"></div>
              <div className="recieved-product-details">
                <div className="recieved-product">
                  <p className="recieved-product-name">Product</p>
                  <p className="recieved-product-quantity">x1</p>
                </div>
              </div>
            </div>
            <div className="recieved-product-quality">
              <p className="recieved-product-quality-text">Product Quality</p>
              <div className="recieved-stars">
                {[1, 2, 3, 4, 5].map((index) => (
                  <FaStar
                    key={index}
                    className="recieved-star"
                    onClick={() => handleProductStarClick(index)}
                    onMouseEnter={() => handleProductStarHover(index)}
                    onMouseLeave={() => handleProductStarHover(0)}
                    color={(hoverProductRating >= index || productRating >= index) ? 'hsl(44, 63%, 50%)' : 'black'}
                  />
                ))}
                {(productRating > 0 || hoverProductRating > 0) && (
                  <p className="recieved-rating-text" style={{ color: 'hsl(44, 63%, 50%)' }}>
                    {getProductRatingText()}
                  </p>
                )}
              </div>
            </div>
            <div className="recieved-product-quality">
              <p className="recieved-product-quality-text">Delivery Service</p>
              <div className="recieved-stars">
                {[1, 2, 3, 4, 5].map((index) => (
                  <FaStar
                    key={index}
                    className="recieved-star"
                    onClick={() => handleDeliveryStarClick(index)}
                    onMouseEnter={() => handleDeliveryStarHover(index)}
                    onMouseLeave={() => handleDeliveryStarHover(0)}
                    color={(hoverDeliveryRating >= index || deliveryRating >= index) ? 'hsl(44, 63%, 50%)' : 'black'}
                  />
                ))}
                {(deliveryRating > 0 || hoverDeliveryRating > 0) && (
                  <p className="recieved-rating-text" style={{ color: 'hsl(44, 63%, 50%)' }}>
                    {getDeliveryRatingText()}
                  </p>
                )}
              </div>
            </div>
            <div className="recieved-button-container-right">
              <button className="recieved-cancel-button" onClick={handleClosePopup}>Cancel</button>
              <button className="recieved-submit-button" onClick={handleClosePopup}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDeets;