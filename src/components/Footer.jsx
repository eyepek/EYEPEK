import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='bg-slate-950 text-white'>
    <div className='mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_0.8fr_1fr] md:px-10'>
      <div>
        <h2 className='text-2xl font-black'>EYEPEK <span className='text-orange-400'>COLLEGE</span></h2>
        <p className='mt-4 max-w-md leading-7 text-slate-300'>A student-focused college community for learning, personal growth, and new possibilities.</p>
      </div>
      <div>
        <h3 className='font-bold text-white'>Explore</h3>
        <ul className='mt-4 space-y-3 text-slate-300'>
          <li><a href='/#about' className='hover:text-orange-300'>About EYEPEK</a></li>
          <li><a href='/#learning' className='hover:text-orange-300'>Learning</a></li>
          <li><a href='/#campus' className='hover:text-orange-300'>Campus Life</a></li>
          <li><a href='/#admissions' className='hover:text-orange-300'>Admissions</a></li>
        </ul>
      </div>
      <div>
        <h3 className='font-bold text-white'>Contact</h3>
        <p className='mt-4 text-slate-300'>Admissions &amp; enquiries</p>
        <a href='tel:7004374250' className='mt-2 inline-block font-bold text-orange-300 hover:text-white'>7004374250</a>
        <p className='mt-5'><Link to='/contact' className='font-semibold text-slate-300 hover:text-orange-300'>Send us a message →</Link></p>
      </div>
    </div>
    <div className='border-t border-white/10 px-6 py-5 text-center text-sm text-slate-400'>
      © {new Date().getFullYear()} EYEPEK COLLEGE. All rights reserved.
    </div>
  </footer>
);

export default Footer;
