import React, { useEffect, useState } from 'react'
import TermsAndCondition from '../components/TermsAndCondition'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addingCartCount } from '../redux/Products/productsActions';
import { Link } from 'react-router-dom'
import HomeCarousel from '../components/HomeCarousel';
import { FaMinus, FaPlus } from "react-icons/fa";
import Navbar from '../components/Navbar';
import ProductLoader from '../components/ProductLoader';
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LuChevronsRight } from "react-icons/lu";


export default function Home() {
  const products = useSelector(state => state.products.products.slice(0, 8));

  const dispatch = useDispatch();
  const [count, setCount] = useState(1)
  const isFetching = useSelector(state => state.products.isFetching);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const AddtoCart = (ele) => {
    const existingProductIndex = cart.findIndex(item => item._id == ele._id);
    if (existingProductIndex == -1) {
      const newEle = { ...ele, qty: 1 };
      let newArray = [...cart, newEle]
      localStorage.setItem('cart', JSON.stringify(newArray))
      dispatch(addingCartCount(newArray.length));
      toast.success('Product has been added')
    } else {
      let currentQty = cart[existingProductIndex];
      setCount(currentQty.qty)
    }
  }

  const decreaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.findIndex(item => item._id === id);
    if (index !== -1) {
      if (cartItems[index].qty == 1) {
        cartItems.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        dispatch(addingCartCount(cartItems.length));
        // dispatch(fetchProducts());
      } else if (cartItems[index].qty > 1) {
        cartItems[index].qty -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setCount(count - 1)
    }
  };

  const increaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.findIndex(item => item._id === id);
    if (index !== -1) {
      cartItems[index].qty += 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setCount(count + 1)
    }
  };

  const GetQty = (id) => {
    let checkCart = cart?.filter((ele) => {
      return ele._id == id
    })
    if (checkCart?.length > 0) {
      return checkCart[0].qty;
    } else {
      return false;
    }
  }

  return (
    <div>
      <ToastContainer />
      <TermsAndCondition />
      <Navbar />
      <HomeCarousel />
      <div className='grid lg:grid-cols-4  md:grid-cols-3 grid-cols-1 gap-20 p-10 ' >
        {
          !isFetching && products && products.map((ele) =>
            <div key={ele._id} className='h-[300px] ' >
              <img className='w-full h-[70%] border-cyan-100 border-2 p-2' src={ele.image} alt="" />
              <div className='border w-[85%] m-auto bg-white shadow-lg p-2 relative bottom-20 z-10 text-left ' >
                <strong>{ele.title}</strong>
                <p className='h-14' > {ele.description.length > 50 ? `${ele.description.slice(0, 50)}...` : ele.description}</p>
                <p className='text-[#00AAC3]' >Rs. {ele.price}</p>
                <motion.div
                  whileTap={{ scale: 1.1 }}
                >
                  {(!GetQty(ele._id)) ?
                    <button
                      onClick={() => AddtoCart(ele)}
                      className='bg-[#00AAC3] text-white w-full py-1 mt-1' >Add to cart
                    </button> :
                    <button className='bg-[#00AAC3] text-white w-full py-1 mt-1 flex items-center justify-evenly' >
                      <span onClick={() => decreaseQty(ele._id)} className='px-3 py-1' ><FaMinus /></span>
                      <strong >{GetQty(ele._id)}</strong>
                      <span
                        onClick={() => increaseQty(ele._id)}
                        className=' px-3 py-1'
                      ><FaPlus /></span>
                    </button>}
                </motion.div>
              </div>
            </div>
          )
        }
      </div>
      <div>
        {
          isFetching && <ProductLoader />
        }
      </div>


      <div
        className=' flex justify-end p-10' >
        <button className='bg-[#00AAC3] text-white px-5 py-2 font-semibold' >
          <Link to="/all-products" className='flex gap-2 items-center' > All Products  <LuChevronsRight /> </Link>
        </button>
      </div>
    </div>
  )
}
