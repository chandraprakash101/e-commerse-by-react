import React, { useState } from 'react';
import { Search, Heart, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import Searchbar from './Searchbar';
import NavIcons from './NavIcons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full h-12 top-0 left-0 z-50 ">
      <div className=' w-full flex sm:px-1 justify-between items-center mx-auto h-full'>
        <div className='mx-5'>
          <Logo />
        </div>

        <div className=' hidden lg:flex h-[80%] w-xl'>
          <Searchbar />
        </div>

        <NavIcons />

         <div className='mx-5 md:hidden'>
        <button onClick={() => { setIsOpen(!isOpen) }}>
          {
            isOpen ? <X /> : <Menu />
          }
        </button>
      </div>
      </div>

     

      <div className=''>
        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default Navbar;




const MobileMenu = ({ isOpen, setIsOpen }) => {
  if(!isOpen) return 

  return (
    <div className='m-2 '>
      
      {
        isOpen && (
          <div className='bg-gray-50  flex flex-col gap-2 w-full h-50 p-1.5 '>
            <div className=' w-full p-2 h-12'>
              <Searchbar />
            </div>
           <Link to='/' onClick={()=>{setIsOpen(false)}}> <div>Home</div> </ Link>
           <Link onClick={()=>{setIsOpen(false)}}><div>Shop</div></Link>
           <Link onClick={()=>{setIsOpen(false)}}><div>Category</div></Link>
           <Link onClick={()=>{setIsOpen(false)}}><div>Details</div></Link>

           <div className='flex justify-between items-center'>
            <div className='flex'><Heart/> span</div>
            <div className='flex'><User/> Profile</div>
           </div>
          </div>
        )
      }
    </div>
  );
};

