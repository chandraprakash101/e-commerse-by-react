import React, { useContext, useState } from 'react';
import { Search, Heart, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import Searchbar from './Searchbar';
import NavIcons from './NavIcons';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Store/ThemeProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  // Clean Configuration Variables
  const lightTheme = "bg-[#F7F7F7] text-[#181818] border-gray-200";
  const darkTheme = "bg-[#181818] text-[#F7F7F7] border-neutral-800";

  return (
    <nav className={`${theme === 'light' ? lightTheme : darkTheme} shadow-md fixed w-full h-14 top-0 left-0 z-50 border-b transition-colors duration-300`}>
      <div className='w-full flex sm:px-1 justify-between items-center mx-auto h-full'>
       <Link to={'/'}>
        <div className='mx-5'>
          <Logo />
        </div>
       </Link>

        <div className='hidden lg:flex h-[75%] w-xl items-center'>
          <Searchbar />
        </div>

        <NavIcons />

        {/* Mobile Hamburger Trigger */}
        <div className='mx-5 lg:hidden'>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide Window */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};
export default Navbar;

// === MOBILE MENU COMPONENT (UPGRADED) ===
const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { theme } = useContext(ThemeContext);
  
  if (!isOpen) return null;

  return (
    <div className={`absolute top-full left-0 w-full shadow-xl border-b transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-[#F7F7F7] border-gray-200 text-gray-800' 
        : 'bg-[#1e1e1e] border-neutral-800 text-neutral-200'
    }`}>
      
      <div className='flex flex-col gap-1 w-full p-4 max-h-[85vh] overflow-y-auto'>
        
        {/* Mobile Searchbar Wrapper */}
        <div className='w-full mb-3 h-10'>
          <Searchbar />
        </div>

        {/* Navigation Links */}
        <Link to='/' onClick={() => setIsOpen(false)} className='px-3 py-2 rounded-xl font-medium hover:bg-gray-200/50 dark:hover:bg-neutral-800/50 transition-colors'>
          Home
        </Link>
        <Link to='/shop' onClick={() => setIsOpen(false)} className='px-3 py-2 rounded-xl font-medium hover:bg-gray-200/50 dark:hover:bg-neutral-800/50 transition-colors'>
          Shop
        </Link>
        <Link to='/categories' onClick={() => setIsOpen(false)} className='px-3 py-2 rounded-xl font-medium hover:bg-gray-200/50 dark:hover:bg-neutral-800/50 transition-colors'>
          Category
        </Link>
        <Link to='/details' onClick={() => setIsOpen(false)} className='px-3 py-2 rounded-xl font-medium hover:bg-gray-200/50 dark:hover:bg-neutral-800/50 transition-colors'>
          Details
        </Link>

        {/* Divider Line */}
        <div className='my-2 border-t border-gray-200 dark:border-neutral-800' />

        {/* Bottom Shortcut Actions */}
        <div className='flex justify-around items-center py-2 bg-gray-100/50 dark:bg-neutral-900/50 rounded-2xl border border-gray-200/30 dark:border-neutral-800/30'>
          <div className='flex items-center gap-2 cursor-pointer font-medium hover:text-blue-500 transition-colors'>
            <Heart size={18} /> <span>Wishlist</span>
          </div>
          <div className='flex items-center gap-2 cursor-pointer font-medium hover:text-blue-500 transition-colors'>
            <User size={18} /> <span>Profile</span>
          </div>
        </div>

      </div>
    </div>
  );
};