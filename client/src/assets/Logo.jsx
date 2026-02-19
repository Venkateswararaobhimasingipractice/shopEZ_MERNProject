import React from 'react'
import { motion } from 'framer-motion'

export default function Logo() {
    return (
        <motion.div
            whileInView={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 3 }} className='border-cyan-200  p-0.5 border rounded-full' >
            <motion.div
                whileInView={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ duration: 1 }}
                className='border h-[35px] w-[35px] bg-[#00AAC3] rounded-full ' >
            </motion.div>
        </motion.div>
    )
}
