import React, { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { addingCartCount } from '../redux/Products/productsActions';
import { motion } from 'framer-motion';
import { LuChevronsLeft } from "react-icons/lu";
import empty_cart from '../assets/empty_cart.jpg'


export default function Cart() {
  const productsFromLS = JSON.parse(localStorage.getItem('cart')) || []
  const [products, setProducts] = useState(productsFromLS)
  const dispatch = useDispatch();

  const decreaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.findIndex(item => item._id === id);
    if (cartItems[index]?.qty == 1) {
      cartItems.splice(index, 1)
      dispatch(addingCartCount(cartItems.length));
      localStorage.setItem('cart', JSON.stringify(cartItems))
    } else if (cartItems[index].qty > 1) {
      cartItems[index].qty -= 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    setProducts(cartItems)
  };

  const increaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.findIndex(item => item._id === id);
    cartItems[index].qty = cartItems[index].qty + 1
    setProducts(cartItems)
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  return (
    <div>
      <Navbar />
      <div className='grid lg:grid-cols-4  md:grid-cols-3 grid-cols-1 gap-20 p-10 ' >
        {
          products && products.map((ele) =>
            <div key={ele._id} className='h-[300px]' >
              <img className='w-full h-[70%] border-cyan-100 border-2 p-2' src={ele.image} alt="" />
              <div className='border w-[85%] m-auto bg-white shadow-lg p-2 relative bottom-20 z-10 text-left' >
                <strong>{ele.title}</strong>
                <p className='h-14' > {ele.description.length > 50 ? `${ele.description.slice(0, 50)}...` : ele.description}</p>
                <p className='text-[#00AAC3]' >Rs. {ele.price}</p>
                <motion.div
                  whileTap={{ scale: 1.1 }}>
                  <button className='bg-[#00AAC3] text-white w-full py-1 mt-1 flex items-center justify-evenly' >
                    <span className='px-3 py-1' onClick={() => decreaseQty(ele._id)}  ><FaMinus /></span>
                    {ele.qty}
                    <span className='px-3 py-1' onClick={() => increaseQty(ele._id)} ><FaPlus /></span> </button>
                </motion.div>
              </div>
            </div>
          )
        }

      </div>
      <div>
        {
          products == null || products.length == 0 ? <div>
            <img className='m-auto -mt-16' src={empty_cart} alt="" />
            <p className='text-[#00AAC3] text-center font-semibold mb-4'>Empty Cart </p>
            <Link to="/all-products" className='bg-[#00AAC3] text-white py-1 px-3 rounded flex items-center w-40 m-auto justify-center gap-2' > <LuChevronsLeft/> Add Product</Link>
          </div> : ''
        }
      </div>
    </div>
  )
}
