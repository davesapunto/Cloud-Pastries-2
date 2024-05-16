import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './MoreDetailsButton.css';
import { db } from "@/app/config/firebase";

interface Product {
  product: string;
  price: number;
  quantity: number;
}

interface DocumentData {
  firstName: string;
  lastName: string;
  contact: string;
  address: string;
  products: Product[];
}

interface MoreDetailsButtonProps {
  docId: string;
  imageUrls: { productName: string, imageUrl: string }[];
}

const MoreDetailsButton: React.FC<MoreDetailsButtonProps> = ({ docId, imageUrls }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [docData, setDocData] = useState<DocumentData | null>(null);

  const fetchDocumentData = async (id: string) => {
    const docRef = doc(db, "admin", "user_checkout", "pending", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDocData(docSnap.data() as DocumentData);
    } else {
      console.error("No such document!");
    }
  };

  useEffect(() => {
    if (showDetails) {
      fetchDocumentData(docId);
    }
  }, [showDetails, docId]);

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleCloseClick = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <button className="more-details-button" onClick={handleDetailsClick}>
        MORE DETAILS
      </button>
      {showDetails && docData && (
        <div className="confirmation-overlay">
          <div className="details-box">
            <div className="delivery-header">
              <FaMapMarkerAlt className="location-icon" />
              <span>Delivery Address</span>
            </div>
            <p>{docData.firstName} {docData.lastName} | {docData.contact}</p>
            <p>{docData.address}</p>
            <hr className="divider" />
            <h2>{docData.firstName} {docData.lastName}</h2>
            <div className="photos-container">
              {imageUrls.map((image, index) => (
                <img key={index} src={image.imageUrl} alt={image.productName} />
              ))}
            </div>
            <div className="product-details">
              {docData.products.map((product, index) => (
                <div key={index}>
                  <h3>{product.product}</h3>
                  <p>₱{product.price}</p>
                  <p><span className="grey-text">X{product.quantity}</span></p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={handleCloseClick}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreDetailsButton;
