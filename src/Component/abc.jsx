<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-indigo-600 tracking-wide cursor-pointer">
              ShopEase
            </span>
          </div>

          {/* Search Bar - Desktop (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-1.5 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <Search className="absolute right-3 top-2 w-4 h-4 text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex space-x-8 font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Shop</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Categories</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Deals</a>
          </div>

          {/* Right Side Icons (Cart, Wishlist, Profile) */}
          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            <button className="hover:text-indigo-600 transition-colors relative">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
            <button className="hover:text-indigo-600 transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="hover:text-indigo-600 transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>

          {/* Hamburger Menu Button - Mobile only */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon on Mobile Menu Bar for quick access */}
            <button className="text-gray-600 relative pt-1">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-3 shadow-lg">
          {/* Mobile Search Bar */}
          <div className="relative w-full my-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>

          {/* Mobile Links */}
          <a href="#" className="block text-gray-600 hover:text-indigo-600 font-medium py-2 border-b border-gray-50">Home</a>
          <a href="#" className="block text-gray-600 hover:text-indigo-600 font-medium py-2 border-b border-gray-50">Shop</a>
          <a href="#" className="block text-gray-600 hover:text-indigo-600 font-medium py-2 border-b border-gray-50">Categories</a>
          <a href="#" className="block text-gray-600 hover:text-indigo-600 font-medium py-2 border-b border-gray-50">Deals</a>

          {/* Mobile Profile/Wishlist Links */}
          <div className="flex justify-between pt-2 text-gray-600">
            <a href="#" className="flex items-center space-x-2 hover:text-indigo-600">
              <Heart className="w-5 h-5" /> <span>Wishlist</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:text-indigo-600">
              <User className="w-5 h-5" /> <span>Profile</span>
            </a>
          </div>
        </div>
      )}




      import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';

// Chote components ko import karein
import Logo from './Logo';
import NavLinks from './NavLinks';
import NavIcons from './NavIcons';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Logo */}
          <Logo />

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-1.5 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <Search className="absolute right-3 top-2 w-4 h-4 text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* 2. Desktop Navigation Links */}
          <NavLinks />

          {/* 3. Desktop Action Icons */}
          <NavIcons />

          {/* Mobile Hamburger & Cart Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-600 relative pt-1">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
            
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-indigo-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 4. Mobile Dropdown Menu Component */}
      <MobileMenu isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;