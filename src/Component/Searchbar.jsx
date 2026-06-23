import React from 'react'
import {Search} from 'lucide-react'

const Searchbar = () => {
  return (
    <div className='w-full h-full flex relative  items-center'>
      <input className='w-full h-full border-none outline-none  px-2 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500' 
      type="text" 
      placeholder='Enter Your Items '/>
      <Search className='absolute right-2' />
    </div>
  )
}

export default Searchbar
