import React from 'react'

export default function ProductLoader() {
    return (
        <div className='grid lg:grid-cols-4  md:grid-cols-3 grid-cols-1 gap-20 px-10 mt-[-50px] ' >
            {
                [1, 2, 3, 4, 5, 6, 7, 8].map((ele) =>
                    <div key={ele} className='h-[300px]  ' >
                        <div className='w-full h-[70%] bg-gray-200 animate-pulse ' src={ele} alt="" />
                        <div className='w-[85%] m-auto bg-white shadow-lg p-2 relative bottom-20 z-10 text-left' >
                            <strong></strong>
                            <p className='h-7  bg-gray-200 animate-pulse' > </p>
                            <p className='h-7 my-2 bg-gray-200 animate-pulse' > </p>
                            <p className='h-7 w-[50%] bg-gray-200 animate-pulse' ></p>
                            <button className='h-7 mt-2 w-full py-1 bg-gray-200 animate-pulse' ></button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
