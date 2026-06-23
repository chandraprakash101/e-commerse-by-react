import React from 'react'
import { Heart, User, ShoppingCart } from 'lucide-react'

export default function NavIcons() {
  return (
    <div className=' flex w-[20%]  justify-between items-center  mx-5'>
        <div className='hidden lg:flex'>
            <Heart/>
        </div>
      <div>
        <ShoppingCart />
      </div>
      <div>
        <User />
      </div>
    </div>
  )
}
