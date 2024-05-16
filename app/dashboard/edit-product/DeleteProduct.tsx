// DeleteProduct.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md'; // Import add circle icon
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './DeleteProduct.css'; // Import styles if needed
import DeleteProductPopup from './DeleteProductPopup';

const DeleteProduct: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>(''); // State for description
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const addedNode = mutation.addedNodes[0];
          // Check if the added node is a text node
          if (addedNode.nodeType === Node.TEXT_NODE) {
            console.log('Text node inserted:', addedNode.textContent);
            // Perform any necessary actions here
          }
        }
      });
    });

    const quillNode = quillRef.current?.editor?.root;
    if (quillNode) {
      observer.observe(quillNode, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      if (images.length + fileList.length > 3) {
        window.alert('Too many images!');
        return;
      }
      const urls = Array.from(fileList).map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...urls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="del-prod-app">
      <div className="del-prod-content">

        {/* Container for product ID */}
        <div className="del-prod-input-container">
          {/* Text "Drop the price:" */}
          <p className="del-prod-id">Product ID:</p>
          {/* Grey colored peso sign */}
          <span className="del-prod-number-sign">#</span>
          {/* Input field for entering the price */}
          <input type="text" className="del-prod-number-input" />
        </div>

        {/* Container for label and input */}
        <div className="del-prod-input-container">
          {/* Text "Name of Product:" */}
          <p className="del-prod-label">Name of Product:</p>
          {/* Input field for entering the name of the product */}
          <p className="del-prod-name"></p>
        </div>
        {/* Container for price label and input */}
        <div className="del-prod-input-container">
          {/* Text "Drop the price:" */}
          <p className="del-prod-price-label">Price:</p>
          {/* Grey colored peso sign */}
          <span className="del-prod-price-sign">&#8369;</span>
          {/* Input field for entering the price */}
          <p className="del-prod-price"></p>
        </div>
        {/* Text "Upload Photos:" */}
        <p className="del-prod-upload-label">Photos:</p>
        {/* Text "Select photo(s) from your device" */}
        <div className="dashed-container">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className="del-photo-button">
            <MdOutlineAddAPhoto style={{ color: 'black', fontSize: '100px' }} />
          </label>
          {images.map((imageUrl, index) => (
            <div className="img-container" key={index}>
              <div className="image-wrapper">
                <img src={imageUrl} alt={`Product ${index}`} className="uploaded-img" />
                <button className="remove-img-button" onClick={() => handleRemoveImage(index)}>
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Category selection */}
        <p className="del-prod-category-label">Select Category:</p>
        <p className="category">Brownie</p>

        {/* Text "Fill in Description:" */}
        <p className="del-prod-description-label">Description:</p>
        {/* Rich Text Editor using React Quill */}
        <ReactQuill
          ref={quillRef}
          value={description}
          onChange={setDescription}
          theme="snow" // Choose the theme for the editor
          style={{ width: '800px'}} // Set width inline
        />
        <DeleteProductPopup />
      </div>
    </div>
  );
};

export default DeleteProduct;
