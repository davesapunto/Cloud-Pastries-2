/* ToRecieveProfile.jsx */
'use client'
import React, { useState, useEffect } from 'react';
import { FaMotorcycle } from "react-icons/fa";
import './ToRecieveProfile.css';
import ToRecieveCancel from './ToRecieveCancel';
import ViewDeets from './ViewDeets'
import { addDoc, getDocs, updateDoc, deleteDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initFirebase, db } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";

const ToRecieveProfile = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, userLoading] = useAuthState(auth);
  const [documents, setDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    if (!user) return;

    const userDocRef = collection(db, "admin", "user_checkout", "pending");

    try {
      const querySnapshot = await getDocs(userDocRef);
      const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDocuments(fetchedDocs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending orders:", error);
    }
  };

  const fetchImageUrls = async () => {
    if (documents.length === 0) return;

    const storage = getStorage(initFirebase());
    const urls = {};

    for (const doc of documents) {
      const productImages = doc.products.map(product => ({
        productName: product.product,
        imageUrl: ''
      }));

      for (const productImage of productImages) {
        const imageRef = ref(storage, `products/${productImage.productName}.jpg`);

        try {
          const url = await getDownloadURL(imageRef);
          productImage.imageUrl = url;
        } catch (error) {
          const pngRef = ref(storage, `products/${productImage.productName}.png`);
          try {
            const url = await getDownloadURL(pngRef);
            productImage.imageUrl = url;
          } catch (error) {
            productImage.imageUrl = '';
          }
        }
      }

      urls[doc.id] = productImages;
    }

    setImageUrls(urls);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  useEffect(() => {
    fetchImageUrls();
  }, [documents]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {documents.map((doc) => (
            <div key={doc.id} className="recieve-orders-container">
              <div className="recieve-orders-status">
                <FaMotorcycle className="delivery-icon" /> Product not delivered
              </div>
              <div className="recieve-container">
                <div className="recieve-content-container">
                  {doc.products.map((product, index) => (
                    <div key={index} className="recieve-picture-container">
                      {imageUrls[doc.id] && imageUrls[doc.id][index]?.imageUrl && (
                        <img src={imageUrls[doc.id][index].imageUrl} alt={product.product} />
                      )}
                      <div className="recieve-text-container">
                        <div className="recieve-text-content">
                          <p className="recieve-product-name">{product.product}</p>
                          <p className="recieve-product-info">#00</p>
                          <p className="recieve-product-price">x{product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="additional-container">
                  ₱{doc.totalAmount}
                </div>
              </div>
              <div className="divider-line"></div>
              <div className="cancel-order-container">
                <ToRecieveCancel />
                <div className="total-payment-container">
                  <div className="total-payment-text">
                    Total Payment (PHP): <span className="total-payment-amount">₱<strong>{doc.totalAmount}</strong></span>
                  </div>
                  <div className="buttons-container">
                    <ViewDeets />
                    <button className="view-product-button">View Product</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ToRecieveProfile;