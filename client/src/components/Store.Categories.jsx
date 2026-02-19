import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory, fetchCategories, deleteCategory, getAllcategories } from '../redux/Categories/categoriesActions';
import { ImSpinner2 } from "react-icons/im";
import { motion } from 'framer-motion'
import { Input } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import TableLoader from './TableLoader';


export default function StoreCategories() {
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.categories.isFetching);
    const allCategories = useSelector(state => state.categories.allCategories);
    const isAdding = useSelector(state => state.categories.isAdding);
    const isEditing = useSelector(state => state.categories.isEditing);
    const isAdded = useSelector(state => state.categories.isAdded);
    const isDeleted = useSelector(state => state.categories.isDeleted);
    const isDeleting = useSelector(state => state.categories.isDeleting);
    const isEdited = useSelector(state => state.categories.isEdited);
    const categories = useSelector(state => state.categories.categories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [slug, setSlug] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [category, setCategory] = useState({})
    const [confModal, setConfModal] = useState(false)
    const [filterModal, setFilterModal] = useState(false)

    useEffect(() => {
        dispatch(fetchCategories(name));
        dispatch(getAllcategories())
    }, []);


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
                name,
                slug,
                image: category.image,
                owner: category.owner
            }
            dispatch(editCategory({ id: category._id, payload }))
            setEditModal(false)
            setIsModalOpen(false);
        } else {
            dispatch(addCategory({ name, image }));
            setEditModal(false)
        }
    };

    useEffect(() => {
        if (!isAdding && isAdded) {
            setIsModalOpen(false);
            setName('');
            setImage(null);
            dispatch(fetchCategories(""));
        }
        if (!isEditing && isEdited) {
            setIsModalOpen(false);
            setName('');
            setImage(null);
            dispatch(fetchCategories(""));
        }
        if (!isDeleting && isDeleted) {
            setConfModal(false);
            dispatch(fetchCategories(""));
        }

    }, [isAdding, isAdded, isEditing, isEdited, isDeleted, isDeleted, isDeleting]);

    const editCat = (cat) => {
        setCategory(cat);
        setEditModal(true)
        setIsModalOpen(true);
        setName(cat.name)
        setSlug(cat.slug)
    }

    const delCat = () => {
        dispatch(deleteCategory(category._id))
    }

    return (
        <>
            <div className='p-5'>
                <div className='flex gap-3 mt-3'>
                    <button className='bg-[#00AAC3] text-white px-3' onClick={handleAddButtonClick}>Add</button>
                    <button className='bg-[#00AAC3] text-white px-3' onClick={() => setFilterModal(true)}>Filter</button>
                    <button className='bg-[#00AAC3] text-white px-3' onClick={() => dispatch(fetchCategories(''))}>Refresh</button>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <motion.div
                            whileInView={{ scale: 1.1 }}
                            className="bg-white p-6 lg:w-[40%] md:w-[50%] w-[70%]">
                            <h2 className="text-xl font-semibold mb-2">{editModal ? 'Edit' : 'Add'} Category</h2>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <Input required value={name} color='cyan' variant="standard" label="Category name" placeholder="Enter category name" onChange={(e) => setName(e.target.value)} />
                                </div>
                                {
                                    editModal &&
                                    <div className="mb-4">
                                        <Input required value={slug} color='cyan' variant="standard" label="Enter slug" placeholder="Enter slug" onChange={(e) => setSlug(e.target.value)} />
                                    </div>
                                }
                                {
                                    !editModal &&

                                    <div className="mb-4">
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
                            <motion.div
                                whileInView={{ scale: 1.1 }}
                                className='bg-white p-9 lg:w-[40%] md:w-[50%] w-[70%]' >
                                <p>Are you sure you want to delete the category ?</p>
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
                        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ' >
                            <motion.div
                                whileInView={{ scale: 1.1 }}
                                className='bg-white p-9 lg:w-[40%] md:w-[50%] w-[70%]' >
                                <h2 className='text-xl font-bold' >Filter</h2>
                                <Select color="cyan" onChange={(val) => setName(val)} variant="standard" label="Filter category by name ">
                                    {
                                        allCategories?.map((ele) =>
                                            <Option key={ele._id} value={ele.name}>{ele.name && ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}
                                            </Option>)
                                    }
                                </Select>
                                <br />
                                <div className="flex justify-center gap-4">
                                    <button className="mr-2 px-4 py-1 bg-[#00AAC3] text-white rounded " onClick={() => setFilterModal(false)}>Cancel</button>
                                    <button className="px-4 py-1 bg-green-500 text-white rounded flex justify-center items-center h-10 " onClick={() => {
                                        dispatch(fetchCategories(name));
                                        setName('')
                                        setFilterModal(false)
                                    }} >
                                        <span>Apply</span>
                                    </button>
                                </div>
                            </motion.div>

                        </div>
                    )
                }

                <div>
                    <table className='m-auto w-full mt-3'>
                        <thead className='border-2  text-white bg-[#00AAC3]'>
                            <tr  >
                                <th className='border-2  py-2 '  >Image</th>
                                <th className='border-2 '  >Name</th>
                                <th className='border-2 '  >Slug</th>
                                <th className='border-2 '  >Edit</th>
                                <th className='border-2 '  >Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isFetching &&
                                categories && categories.map(category => (
                                    <tr className='border-b-2 '
                                        key={category._id}>
                                        <td
                                            className='border '
                                        ><img className='w-16 h-16 m-auto rounded border-cyan-100 border-2 p-1' src={category.image} alt={category.name} /></td>
                                        <td className='border-2 '
                                        >{category.name}</td>
                                        <td className='border-2 ' >{category.slug}</td>
                                        <td className='border-2 ' >
                                            <button onClick={() => editCat(category)}
                                            >Edit</button></td>
                                        <td className='border-2 ' >
                                            <button
                                                onClick={() => {
                                                    setConfModal(true)
                                                    setCategory(category)
                                                }}
                                            >Delete</button></td>
                                    </tr>
                                ))

                            }
                        </tbody>

                    </table>
                    {
                        isFetching && <TableLoader />
                    }

                </div>
            </div>
        </>

    );
}
