import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, fetchProducts, deleteProduct } from '../redux/Products/productsActions';
import { ImSpinner2 } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import TableLoader from './TableLoader';
import { motion } from 'framer-motion'
import { Input } from "@material-tailwind/react";
import { Select, Option, Checkbox } from "@material-tailwind/react";


export default function StoreProducts() {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.products.isFetching);
    const isAdding = useSelector(state => state.products.isAdding);
    const isEditing = useSelector(state => state.products.isEditing);
    const isAdded = useSelector(state => state.products.isAdded);
    const isDeleted = useSelector(state => state.products.isDeleted);
    const isDeleting = useSelector(state => state.products.isDeleting);
    const isEdited = useSelector(state => state.products.isEdited);
    const products = useSelector(state => state.products.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [slug, setSlug] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [product, setProduct] = useState({})
    const [confModal, setConfModal] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filterModal, setFilterModal] = useState(false)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [short, setShort] = useState('')
    const allCategories = useSelector(state => state.categories.allCategories);

    const handleCheckboxChange = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')

    const categoryList = useSelector(state => state.categories.categories);
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddButtonClick = () => {
        setEditModal(false)
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editModal) {
            let payload = {
                title,
                description,
                category,
                price: Number(price),
                slug,
                image: product.image,
                owner: product.owner
            }
            dispatch(editProduct({ id: product._id, payload }))
            // setEditModal(false)
        } else {
            dispatch(addProduct({ title, description, price: Number(price), category, image }));
            setEditModal(false)
        }
    };

    useEffect(() => {
        if (!isAdding && isAdded) {
            console.log('loading');
            setIsModalOpen(false);
            setTitle('');
            setImage(null);
            setDescription('');
            setPrice('')
            dispatch(fetchProducts());
        }
        if (!isEditing && isEdited) {
            setIsModalOpen(false);
            setImage(null);
            dispatch(fetchProducts());
        }
        if (!isDeleting && isDeleted) {
            setConfModal(false);
            dispatch(fetchProducts());
        }
    }, [isAdding, isAdded, isEditing, isEdited, isDeleted, isDeleted, isDeleting]);

    const editProd = (ele) => {
        setProduct(ele);
        setEditModal(true)
        setIsModalOpen(true);
        setTitle(ele.title)
        setSlug(ele.slug)
        setCategory(ele.category)
        setPrice(ele.price)
        setDescription(ele.description)
    }

    const delCat = () => {
        dispatch(deleteProduct(selectedProducts))
        setSelectedProducts([])
    }

    return (
        <div className='p-5'>
            <div className='flex gap-3 mt-3'>
                <button className='bg-[#00AAC3] text-white px-3' onClick={handleAddButtonClick}>Add</button>
                <button className='bg-[#00AAC3] text-white px-3' onClick={() => setFilterModal(true)} >Filter</button>
                <button className='bg-[#00AAC3] text-white px-3' onClick={() => dispatch(fetchProducts())}>Refresh</button>
                {selectedProducts.length > 0 && (
                    <motion.button whileInView={{ scale: 1.1 }} className="text-sm bg-red-500 text-white px-3 py-1  absolute right-6 mb-3" onClick={() => setConfModal(true)}>Delete Selected</motion.button>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <motion.div
                        whileInView={{ scale: 1.1 }}
                        className="bg-white p-6 lg:w-[40%] md:w-[50%] w-[70%]">
                        <h2 className="text-xl font-semibold mb-2">{editModal ? 'Edit' : 'Add'} Product</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <Input required value={title} color='cyan' variant="standard" label="Product title" placeholder="Enter product title" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <Input required value={description} color='cyan' variant="standard" label="Product description" placeholder="Enter product description" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <Input type='number' required value={price} color='cyan' variant="standard" label="Product price" placeholder="0.00" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div>
                                <Select required value={category} color="cyan" onChange={(val) => setCategory(val)} variant="standard" label="Select Category">
                                    {
                                        categoryList?.map((ele) =>
                                            <Option key={ele._id} value={ele._id}>{ele.name && ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}</Option>
                                        )
                                    }
                                </Select>

                            </div>
                            {
                                editModal &&
                                <div className="my-4">
                                    <Input type='text' value={slug} color='cyan' variant="standard" label="Product slug" placeholder="Enter productslug" onChange={(e) => setSlug(e.target.value)} />
                                </div>
                            }
                            {
                                !editModal &&

                                <div className="my-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full border rounded px-3 py-2"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                            }
                            <div className="flex justify-center gap-4">
                                <button type="button" className="mr-2 px-4 py-1 bg-[#00AAC3] text-white rounded " onClick={handleModalClose}>Cancel</button>
                                <button type="submit" className="px-4 py-1 bg-[#00AAC3] text-white rounded flex justify-center items-center h-10 " disabled={isAdding}>
                                    {isAdding || isEditing ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>{editModal ? 'Update' : 'Add'}</span>}

                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {
                confModal && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50' >
                        <motion.div whileInView={{ scale: 1.1 }} className='bg-white p-9 lg:w-[40%] md:w-[50%] w-[70%]'  >
                            <p>Are you sure you want to delete checked product ?</p>
                            <br />
                            <div className="flex justify-center gap-4">
                                <button className="mr-2 px-4 py-1 bg-[#00AAC3] text-white rounded " onClick={() => setConfModal(false)}>Cancel</button>
                                <button className="px-4 py-1 bg-red-500 text-white rounded flex justify-center items-center h-10 " onClick={delCat} >
                                    {isDeleting ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Delete</span>}
                                </button>
                            </div>
                        </motion.div>


                    </div>
                )
            }

            {
                filterModal && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50 ' >
                        <motion.div whileInView={{ scale: 1.1 }} className='bg-white p-9 lg:w-[40%] md:w-[50%] w-[70%]' >
                            <h2 className='text-xl font-bold' > Search/ Filter / Sort</h2>
                            <div className='flex'>
                                <Input value={search} color='cyan' variant="standard" label="Search by name" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                                <button
                                    className=' font-semibold bg-[#00AAC3] text-white px-4 py-2  '
                                    onClick={() => {
                                        setFilterModal(false)
                                        dispatch(fetchProducts(search, "", "", ""))
                                        setFilterModal(false)
                                    }}
                                ><CiSearch />
                                </button>
                            </div>
                            <div className='my-4' >
                                <Select value={filter} color="cyan" onChange={(val) => setFilter(val)} variant="standard" label="Filter by category">
                                    {
                                        allCategories?.map((ele) =>
                                            <Option key={ele._id} value={ele._id}>{ele.name && ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}</Option>
                                        )
                                    }
                                </Select>

                            </div>
                            <Select value={filter} color="cyan" onChange={(val) => setShort(val)} variant="standard" label="Sort by price">
                                <Option value="ltoh">Price Low to High</Option>
                                <Option value="htol">Price High to Low</Option>
                            </Select>

                            <br />
                            <div className="flex justify-center gap-4 mt-6">
                                <button className="mr-2 px-4 py-1 bg-[#00AAC3] text-white rounded " onClick={() => setFilterModal(false)}>Cancel</button>
                                <button
                                    className="mr-2 px-4 py-1 bg-green-500 text-white rounded "
                                    onClick={() => {
                                        let priceShortOrder = "";
                                        let isShort = "";
                                        if (short == 'ltoh') {
                                            priceShortOrder = 1
                                            isShort = 'price'
                                        } else if (short == 'htol') {
                                            priceShortOrder = -1
                                            isShort = 'price'
                                        }

                                        if (isShort) {
                                            setFilterModal(false)
                                            dispatch(fetchProducts(search, filter, isShort, priceShortOrder))
                                        } else {
                                            setFilterModal(false)
                                            dispatch(fetchProducts(search, filter, isShort, priceShortOrder))
                                        }

                                        setFilterModal(false)

                                    }}

                                >Apply</button>
                            </div>
                        </motion.div>
                    </div>
                )
            }

            <div>
                <table className='m-auto w-full mt-3'>
                    <thead className='border-2   text-white bg-[#00AAC3]'>
                        <tr >
                            <th className='border-2   py-2 '  >Image</th>
                            <th className='border-2  '  >Name</th>
                            <th className='border-2  '  >Slug</th>
                            <th className='border-2  '  >Edit</th>
                            <th className='border-2  '  >Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isFetching &&
                            products && products.map(ele => (
                                <tr
                                    className='border-b-2  '
                                    key={ele._id}>
                                    <td
                                        className='border  '
                                    ><img className='w-16 h-16 m-auto rounded border-cyan-100 border-2 p-1' src={ele.image} alt={ele.name} /></td>
                                    <td
                                        className='border-2  '
                                    >{ele.title}</td>
                                    <td className='border-2  ' >{ele.slug}</td>
                                    <td className='border-2  ' >
                                        <button
                                            onClick={() => editProd(ele)}
                                        >Edit</button></td>
                                    <td className='border-2  '>
                                        <Checkbox color='red' value={product._id} checked={selectedProducts.includes(ele._id)} onChange={() => handleCheckboxChange(ele._id)} ripple={true} />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {
                    isFetching && <TableLoader />
                }
            </div>
        </div >
    );
}
