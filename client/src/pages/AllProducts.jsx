import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addingCartCount } from '../redux/Products/productsActions';
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { getAllcategories } from '../redux/Categories/categoriesActions';
import Navbar from '../components/Navbar';
import ProductLoader from '../components/ProductLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'

export default function AllProducts() {
  const products = useSelector(state => state.products.products);

  const isFetching = useSelector(state => state.products.isFetching);
  const allCategories = useSelector(state => state.categories.allCategories);

  const dispatch = useDispatch();
  const [product, setProduct] = useState({})
  const [count, setCount] = useState(1)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [short, setShort] = useState('')
  const [order, setOrder] = useState('')


  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getAllcategories())
  }, [dispatch]);


  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const AddtoCart = (ele) => {
    setProduct(ele)
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
      return 0;
    }
  }

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <div className='fixed top-6 border-b-2 border-[#00AAC3] z-50 lg:flex md:flex hidden w-[60%] justify-start h-10 md:left-[200px] lg:left-[300px]' >
        <button
          className='bg-[#00AAC3] text-white py-1 px-3 '
          onClick={() => {
            setFilter('')
            setShort('')
            setOrder('')
            setSearch('')
            dispatch(fetchProducts())
          }
          } >Clear</button>
        <div>
          <select
            value={short}
            className=' w-full cursor-pointer p-2 pb-1.6 outline-none'
            onChange={(e) => {
              setShort(e.target.value)
              let priceShortOrder = "";
              let isShort = "";
              if (e.target.value == 'ltoh') {
                setOrder(1)
                priceShortOrder = 1
                isShort = 'price'
              } else if (e.target.value == 'htol') {
                setOrder(-1)
                priceShortOrder = -1
                isShort = 'price'
              }

              if (isShort) {
                dispatch(fetchProducts("", filter, isShort, priceShortOrder))
              } else {
                dispatch(fetchProducts("", filter, isShort, priceShortOrder))
              }

            }

            }

          >
            <option value="">Sort</option>
            <option value="ltoh">Price Low to High</option>
            <option value="htol">Price High to Low</option>
          </select>
        </div>
        <div className='lg:w-[200px]' >
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value)
              dispatch(fetchProducts(search, e.target.value, short, order))
            }}
            className=' w-full cursor-pointer p-2 px-4 outline-none'
          >
            <option value="">Category</option>
            {
              allCategories?.map((ele) => <option key={ele._id} value={ele._id}>{ele.name && ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}</option>)
            }
          </select>
        </div>

        <div className='flex w-[50%]'>
          <input
            className='w-full px-2 outline-none pl-5'
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} placeholder='Search by name...' />
          <button
            className=' font-semibold bg-[#00AAC3] text-white px-4 '
            onClick={() => {
              dispatch(fetchProducts(search, "", "", ""))
            }}
          ><CiSearch />
          </button>
        </div>
      </div>
      <div className='grid lg:grid-cols-4  md:grid-cols-3 grid-cols-1 gap-20 p-10 ' >
        {!isFetching &&
          products && products.map((ele) =>
            <div key={ele._id} className='h-[300px] ' >
              <img className='w-full h-[70%] border-cyan-100 border-2 p-2' src={ele.image} alt="" />
              <div className='border w-[85%] m-auto bg-white shadow-lg p-2 relative bottom-20 z-10 text-left' >
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
    </div>
  )
}
