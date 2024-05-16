'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md'; // Import add circle icon
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './AddProduct.css'; // Import styles if needed
import AddProductPopup from './AddProductPopup';

const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState(['Brownie', 'Cookie']);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const quillRef = useRef(null);

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

        if (quillRef.current) {
            observer.observe(quillRef.current.editor.root, { childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleImageUpload = () => {
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

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleAddCategory = () => {
        if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
            setCategories(prevCategories => [...prevCategories, newCategory]);
            setNewCategory('');
        }
    };

    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    return (
        <div className="add-prod-app">
            <div className="add-prod-content">
                {/* Container for label and input */}
                <div className="add-prod-input-container">
                    {/* Text "Name of Product:" */}
                    <p className="add-prod-label">Name of Product:</p>
                    {/* Input field for entering the name of the product */}
                    <input type="text" className="add-prod-input" value={name} onChange={handleNameChange} />
                </div>
                {/* Container for price label and input */}
                <div className="add-prod-input-container">
                    {/* Text "Drop the price:" */}
                    <p className="add-prod-price-label">Drop the price:</p>
                    {/* Grey colored peso sign */}
                    <span className="add-prod-price-sign">&#8369;</span>
                    {/* Input field for entering the price */}
                    <input type="text" className="add-prod-price-input" value={price} onChange={handlePriceChange} />
                </div>
                {/* Text "Upload Photos:" */}
                <p className="add-prod-upload-label">Upload Photos:</p>
                {/* Text "Select photo(s) from your device" */}
                <p className="add-prod-small-text">Select photo(s) from your device</p>
                <div className="dashed-container">
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload" className="add-photo-button">
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
                <p className="add-prod-category-label">Select Category:</p>
                {categories.map((category, index) => (
                    <div key={index} className="category-option">
                        <input
                            type="radio"
                            id={`category-${index}`}
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor={`category-${index}`}>{category}</label>
                    </div>
                ))}
                {/* Add new category */}
                <div className="add-category">
                    <button className="add-category-button" onClick={handleAddCategory}>
                        <span className="add-category-icon">+</span>
                    </button>
                    <span className="add-category-text">Add a Category</span>
                    <input
                        type="text"
                        className="add-category-input"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        placeholder="Type category name"
                    />
                </div>
                {/* Text "Fill in Description:" */}
                <p className="add-prod-description-label">Fill in Description:</p>
                {/* Rich Text Editor using React Quill */}
                <ReactQuill
                    ref={quillRef}
                    value={description}
                    onChange={setDescription}
                    theme="snow" // Choose the theme for the editor
                    style={{ width: '800px' }} // Set width inline
                />
                <AddProductPopup
                    images={images}
                    name={name}
                    price={price}
                    category={selectedCategory}
                    description={description}
                />
            </div>
        </div>
    );
};

export default AddProduct;