'use client'
import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import { db, initFirebase } from '@/app/config/firebase';
import Link from 'next/link';

initFirebase();

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const colRef = collection(db, 'admin', 'product', 'user_products');
        const querySnapshot = await getDocs(colRef);
        const fetchedProducts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const urls = {};
      for (const product of products) {
        const productName = product.name;
        let imageUrl = '';
        try {
          const imageRef = ref(storage, `products/${productName}.jpg`);
          imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
          try {
            const pngRef = ref(storage, `products/${productName}.png`);
            imageUrl = await getDownloadURL(pngRef);
          } catch (err) {
            console.error('Error fetching image for', productName, ':', err);
            imageUrl = '/placeholder.png'; // Use a placeholder image if not found
          }
        }
        urls[product.id] = imageUrl;
      }
      setImageUrls(urls);
    };
    if (products.length > 0) {
      fetchImages();
    }
  }, [products]);

  const filteredProducts = selectedCategories.length > 0
    ? products.filter((product) => selectedCategories.includes(product.category))
    : products;

  return (
    <div className="w-screen h-[475vh] md:h-[250vh] xl:h-[150vh] grid grid-cols-1 justify-items-center">
      <h1 className="text-3xl my-4">Products</h1>
      <div className="w-5/6 h-[400vh] md:h-[200vh] xl:w-5/6 xl:h-[100vh] border-0 border-black border-t-2 grid grid-cols-1 justify-items-center xl:flex xl:justify-center">
        <div className="w-[14rem] h-[14rem] mt-0 xl:mr-32 py-8 grid grid-cols-1 border-0 border-b-2 border-black">
          <h1 className="ml-4 text-2xl">Search Filter</h1>
          <h1 className="ml-4 text-sm py-4 font-bold">By Category</h1>
          {Array.from(new Set(products.map((product) => product.category))).map((category) => (
            <label key={category} className="ml-4">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="checkmark"></span> {category}
            </label>
          ))}
        </div>
        <div className="xl:my-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2rem] md:gap-[8rem] xl:gap-[8rem] opacity-0 animate-fadeInAnimation animate-delay-100">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="hover:bg-[#dfdcd8] active:bg-[#c6c4c0] content-start shadow-2xl h-[24rem] w-[16rem] bg-[#F8F5F0]"
            >
              <img
                className="w-[16rem] h-[16rem]"
                src={imageUrls[product.id] || '/placeholder.png'}
                alt={product.name}
              />
              <h1 className="text-bottom text-center py-4">{product.name}</h1>
              <h1 className="ml-4 mt-2 text-sm">₱{product.price.toFixed(2)}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;