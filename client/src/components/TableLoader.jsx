import React from 'react'

export default function TableLoader() {
    return (
        <table className='m-auto w-full mt-3'>
            <tbody>
                {[1, 2, 3, 4, 5].map(category => (
                    <tr className=' h-16 bg-sky-200 w-full' >
                        <div className='border p-7 bg-gray-200 animate-pulse' >
                        </div>
                    </tr>
                ))
                }
            </tbody>

        </table>
    )
}
