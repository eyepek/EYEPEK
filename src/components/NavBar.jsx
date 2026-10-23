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
    <div className='py-4 px-6 flex items-center justify-between bg-blue-900 relative z-50'>
      <h1 className='text-orange-300 text-xl md:text-2xl font-bold leading-tight'>
        EYEPEK
        <span className='block text-xs md:text-sm font-normal text-green-200'>College for Higher Education</span>
      </h1>

      <IoMdMenu
        onClick={toggleMenu}
        className='md:hidden w-9 h-9 text-white cursor-pointer'
      />

      {/* Desktop Menu */}
      <div className='hidden md:flex space-x-6 text-white font-bold'>
        <Link to='/' className='hover:text-red-300'>Home</Link>
        <Link to='/services' className='hover:text-red-300'>Services</Link>
        <Link to='/contact' className='hover:text-red-300'>Contact Us</Link>
        <Link to='/profile' className='hover:text-red-300'>Profile</Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute top-full left-0 w-full bg-blue-900 flex flex-col items-start p-4 space-y-3 text-white md:hidden z-40'>
          <Link to='/' onClick={handleLinkClick} className='hover:text-red-300'>Home</Link>
          <Link to='/services' onClick={handleLinkClick} className='hover:text-red-300'>Services</Link>
          <Link to='/contact' onClick={handleLinkClick} className='hover:text-red-300'>Contact Us</Link>
          <Link to='/profile' onClick={handleLinkClick} className='hover:text-red-300'>Profile</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
