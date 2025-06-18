import React, { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close menu on link click (mobile)
  };

  return (
    <div className='py-4 px-6 flex items-center justify-between bg-black relative z-50'>
      <h1 className='text-yellow-600 text-3xl font-bold'>
        Eye<span className='text-blue-700'>Pek</span>
      </h1>

      <IoMdMenu
        onClick={toggleMenu}
        className='md:hidden w-9 h-9 text-white cursor-pointer'
      />

      {/* Desktop Menu */}
      <div className='hidden md:flex space-x-6 text-white font-bold'>
        <Link to='/' className='hover:text-yellow-600'>Home</Link>
        <Link to='/services' className='hover:text-yellow-600'>Services</Link>
        <Link to='/contact' className='hover:text-yellow-600'>Contact Us</Link>
        <Link to='/profile' className='hover:text-yellow-600'>Profile</Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute top-full left-0 w-full bg-black flex flex-col items-start p-4 space-y-3 text-white md:hidden z-40'>
          <Link to='/' onClick={handleLinkClick} className='hover:text-yellow-600'>Home</Link>
          <Link to='/services' onClick={handleLinkClick} className='hover:text-yellow-600'>Services</Link>
          <Link to='/contact' onClick={handleLinkClick} className='hover:text-yellow-600'>Contact Us</Link>
          <Link to='/profile' onClick={handleLinkClick} className='hover:text-yellow-600'>Profile</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
