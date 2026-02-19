import React, { useState } from 'react';
import StoreProducts from '../components/Store.Products';
import StoreCategories from '../components/Store.Categories';
import Navbar from '../components/Navbar';

export default function MyStore() {
  const [showProduct, setShowProduct] = useState(false);

  return (
    <div>
      <Navbar />
      <div className=" grid grid-cols-2 p-5">
        <button
          className={`py-2 text-white ${showProduct ? 'bg-gray-400' : 'bg-[#00AAC3]'}`}
          onClick={() => setShowProduct(false)}
        >
          Categories
        </button>
        <button
          className={`py-2 text-white ${showProduct ? 'bg-[#00AAC3]' : 'bg-gray-400'}`}
          onClick={() => setShowProduct(true)}
        >
          Products
        </button>
      </div>
      {
        showProduct ? <StoreProducts /> : <StoreCategories />
      }
    </div>
  );
}
