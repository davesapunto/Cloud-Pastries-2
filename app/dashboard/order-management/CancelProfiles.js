import { addDoc, getDocs, updateDoc, deleteDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { FaAngleDown } from 'react-icons/fa';
import './CancelProfile.css';
import MoreDetailsButton from './MoreDetailsButtons';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initFirebase, db } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";

const CancelProfile = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, userLoading] = useAuthState(auth);
  const [cancelledDocuments, setCancelledDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCancelledDocuments = async () => {
    if (!user) return;

    const cancelledDocRef = collection(db, "admin", "user_checkout", "cancelled");

    try {
      const querySnapshot = await getDocs(cancelledDocRef);
      const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCancelledDocuments(fetchedDocs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cancelled orders:", error);
    }
  };

  const fetchImageUrls = async () => {
    if (cancelledDocuments.length === 0) return;

    const storage = getStorage(initFirebase());
    const urls = {};

    for (const doc of cancelledDocuments) {
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
    if (user) fetchCancelledDocuments();
  }, [user]);

  useEffect(() => {
    fetchImageUrls();
  }, [cancelledDocuments]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cancelledDocuments.map((doc) => (
            <div key={doc.id} className="cancel-orders-container">
              <p className="cancel-orders-name">{doc.firstName} {doc.lastName}</p>
              <div className="cancel-content-container">
                {doc.products.map((product, index) => (
                  <div key={index} className="cancel-picture-container w-20 h-20">
                    {imageUrls[doc.id] && imageUrls[doc.id][index]?.imageUrl && (
                      <img src={imageUrls[doc.id][index].imageUrl} alt={product.product} />
                    )}
                    <div className="cancel-text-container">
                      <div className="cancel-text-content">
                        <p className="cancel-product-name">{product.product}</p>
                        <p className="cancel-product-info">#{index + 1}</p>
                        <p className="pending-product-price">₱{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <MoreDetailsButton docId={doc.id} imageUrls={imageUrls[doc.id] || []} />
              <div className="cancel-cancel-container">
                <p className="cancel-cancel">CANCELLED</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CancelProfile;