import React, { useState } from 'react'
import { Heart, User, ShoppingCart, Package, LogOut } from 'lucide-react'
import TheamToggle from '../DaisyUIComponents/TheamToggle'

export default function NavIcons() {
  // const [isDroupDownOpen, setIsDroupDownOpen] = useState(false);
  return (
    <div className='flex w-[20%]  justify-around items-center md:mx-5'>
      <div className='flex  w-full md:w-[50%] justify-between items-center md:gap-5 md:mr-5'>
        <div className='hidden lg:flex '>
          <Heart />
        </div>
        <div>
          <ShoppingCart />
        </div>
      </div>
      <div className='cursor-pointer  relative group'
      // onMouseEnter={()=>{setIsDroupDownOpen(true)}}
      // onMouseLeave={()=>setIsDroupDownOpen(false)}
      >
        <User />
        {/* {isDroupDownOpen && ( */}
        <div className=" absolute right-0 top-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-4 group-hover:translate-y-2 bg-white text-gray-800 border border-gray-100 min-w-[220px] shadow-xl rounded-xl p-1.5 z-50 before:absolute before:top-[-16px] before:left-0 before:w-full before:h-[16px] before:content-[''] backdrop-blur-sm">

          {/* Header Section (Dropdown ko premium look dene ke liye) */}
          <div className="px-3 py-2.5 mb-1 bg-gray-50/80 rounded-lg border-b border-gray-100">
            <h1 className="text-gray-900 font-semibold text-sm font-sans tracking-wide uppercase">Your Account</h1>
            <p className="text-xs text-gray-400 mt-0.5 font-normal">Manage profile & orders</p>
          </div>

          {/* Options Wrapper */}
          <div className="space-y-0.5">

            {/* My Profile Option */}
            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all duration-150">
              <User className="w-4 h-4 opacity-75" />
              <span>My Profile</span>
            </div>

            {/* Orders Option */}
            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all duration-150">
              <Package className="w-4 h-4 opacity-75" />
              <span>Orders</span>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all duration-150">
              <TheamToggle className=" w-8 h-8 opacity-75 text-gray-600 group-hover:text-blue-600"/>
              <span>Theme</span>
            </div>

            {/* Divider Line */}
            <div className="my-1 border-t border-gray-100" />

            {/* Log Out Option (Dangeous action ke liye soft red color) */}
            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-150">
              <LogOut className="w-4 h-4 opacity-75" />
              <span>Log Out</span>
            </div>

          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  )
}
