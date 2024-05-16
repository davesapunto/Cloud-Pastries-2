'use client'

import React, { useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import './AddProductPopup.css';
import { initFirebase, db } from '@/app/config/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const app = initFirebase();

const AddProductPopup = ({
  images,
  name,
  price,
  category,
  description,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpload = async (e) => {

    try{
      // Upload images to Firebase Storage
      e.preventDefault();

      // Upload images to Firebase Storage
      const storage = getStorage();
      const productImagesRef = ref(storage, 'products');
      const uploadedImages = await Promise.all(
        images.map(async (image, index) => {
          const fileName = image.name || `${name}-${index}.jpg`; // Use original name or construct one
          const imageRef = ref(productImagesRef, fileName);
          const snapshot = await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(snapshot.ref);
          return imageUrl;
        })
      );
  

      // Upload product data to Firestore
      const productData = {
        name,
        price: parseFloat(price),
        category,
        description,
      };
      await addDoc(collection(db, "admin", "product", "user_products"), {productData});
      console.log('Product uploaded successfully!');
    }catch (error){
      console.error('Error', error);
    }
  };

  return (
    <div>
      <button className="add-product-button" onClick={handleOpenPopup}>
        ADD PRODUCT
      </button>
      {isPopupOpen && (
        <div className="add-product-popup-container">
          <div className="add-product-popup-content">
            <div className="popup-header">
              <MdOutlineArrowBack className="back-icon" onClick={handleClosePopup} />
            </div>
            <h2 className="popup-title">ADD PRODUCT?</h2>
            <div className="product-info-container">
              <div className="photo-container">
                {images.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${index}`} className="uploaded-img" />
                ))}
              </div>
              <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <p className="product-info-text">{category}</p>
                <p className="product-price">₱{price}</p>
              </div>
            </div>
            <button className="proceed-button" onClick={handleUpload}>
              ADD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductPopup;