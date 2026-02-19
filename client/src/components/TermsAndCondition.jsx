import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function TermsAndCondition() {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const hasAcceptedTerms = localStorage.getItem('hasAcceptedTerms');
        if (hasAcceptedTerms) {
            setShowDialog(false);
        } else {
            setShowDialog(true)
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('hasAcceptedTerms', 'true');
        setShowDialog(false);
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[100] ${showDialog ? '' : 'hidden'}`}>
            <motion.div
                whileInView={{ y: '0' }}
                initial={{ y: '-300px' }}
                className="bg-white p-8 lg:w-[40%] md:w-[60%] w-[80%] text-left">
                <h2 className="lg:text-2xl md:text-2xl text-lg font-bold mb-4">TERMS & CONDITIONS</h2>
                <p className='lg:text-base md:text-base text-xs lg:font-bold leading-5' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed deleniti sint nulla eligendi libero reprehenderit nihil, placeat eveniet expedita hic tenetur cupiditate, eaque, quaerat explicabo magnam voluptas sit harum praesentium!</p>
                <br />
                <p className='lg:text-base md:text-base text-xs lg:font-bold leading-5' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed deleniti sint nulla eligendi libero reprehenderit nihil, placeat eveniet expedita hic tenetur cupiditate, eaque, quaerat explicabo magnam voluptas sit harum praesentium!</p>
                <br />
                <p className='lg:text-base md:text-base text-xs lg:font-bold leading-5' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed deleniti sint nulla eligendi libero reprehenderit nihil, placeat eveniet expedita hic tenetur cupiditate, eaque, quaerat explicabo magnam voluptas sit harum praesentium!</p>
                <div className="mt-4 flex justify-evenly">
                    <motion.button whileHover={{ scale: 1.1 }} className="mr-4 px-6 py-0.5  bg-[#00AAC3] text-white rounded" onClick={handleAccept}>Accept</motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="px-6 py-0.5 bg-[#00AAC3] text-white rounded" onClick={handleCancel}>Cancel</motion.button>
                </div>
            </motion.div>
        </div>
    )
}
