import React, { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className='relative z-50 bg-white shadow-sm'>
      <div className='bg-blue-950 px-6 py-2 text-xs font-semibold text-blue-50 md:px-10 md:text-sm'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-4'>
          <span>Admissions &amp; enquiries</span>
          <a href='tel:7004374250' className='text-orange-300 transition hover:text-white'>Call us: 7004374250</a>
        </div>
      </div>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10'>
        <Link to='/' onClick={closeMenu} className='text-xl font-black tracking-tight text-blue-950 md:text-2xl'>EYEPEK <span className='text-orange-500'>COLLEGE</span></Link>
        <button type='button' aria-label='Toggle navigation' aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className='rounded-md p-2 text-blue-950 md:hidden'><IoMdMenu className='h-8 w-8' /></button>
        <nav className={`${isOpen ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-5 border-t border-slate-100 bg-white px-6 py-5 font-semibold text-blue-950 shadow-lg md:static md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          <Link to='/' onClick={closeMenu} className='hover:text-red-600'>Home</Link>
          <a href='/#about' onClick={closeMenu} className='hover:text-red-600'>About</a>
          <a href='/#learning' onClick={closeMenu} className='hover:text-red-600'>Learning</a>
          <a href='/#campus' onClick={closeMenu} className='hover:text-red-600'>Campus Life</a>
          <a href='/#admissions' onClick={closeMenu} className='rounded-md bg-orange-500 px-5 py-2.5 text-center text-white transition hover:bg-orange-600'>Admissions</a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
