import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-blue-950 text-white py-10 px-4'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div>
          <h2 className='text-2xl font-bold text-orange-400 mb-4'>EYEPEK COLLEGE</h2>
          <p className='text-gray-400'>
            EYEPEK College supports learners through student-focused learning and personal growth.
          </p>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2 text-gray-300'>
            <li><a href='/' className='hover:text-red-300'>Home</a></li>
            <li><a href='/services' className='hover:text-red-300'>Services</a></li>
            <li><a href='/contact' className='hover:text-red-300'>Contact Us</a></li>
            <li><a href='/profile' className='hover:text-red-300'>Profile</a></li>
          </ul>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
          <div className='flex space-x-4'>
            <a href='#' className='text-blue-300 hover:text-white'><FaFacebookF /></a>
            <a href='#' className='text-blue-300 hover:text-white'><FaTwitter /></a>
            <a href='#' className='text-orange-300 hover:text-white'><FaInstagram /></a>
            <a href='#' className='text-red-300 hover:text-white'><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className='mt-10 text-center text-gray-500 text-sm'>
        &copy; {new Date().getFullYear()} EYEPEK COLLEGE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
