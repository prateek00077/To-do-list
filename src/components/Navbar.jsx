import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl'>
                iTask
            </span>
        </div>
        <ul className='flex gap-8 mx-9 my-7'>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
