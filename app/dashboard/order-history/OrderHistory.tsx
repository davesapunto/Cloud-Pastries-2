// OrderHistory.tsx

import React from 'react';
import './OrderHistory.css'; // Import styles if needed
import OrderHistoryProfile from './OrderHistoryProfile';

const OrderHistory: React.FC = () => {

  return (
    <div className="order-history-orders-app">
      <div className="order-history-orders-content">

        <div className="ord-hist-input-container">

            <p className="ord-hist-prod-id">Product ID:</p>

            <span className="ord-hist-number-sign">#</span>

            <input type="text" className="ord-hist-number-input" />
            
            <p className="ord-hist-name">Customer Name:</p>

            <input type="text" className="ord-hist-name-input" />

        </div>

        <div className="order-history-custom-box">
            <OrderHistoryProfile />
            <OrderHistoryProfile />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;