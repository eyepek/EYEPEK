import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-black text-white py-10 px-4'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>

        {/* Brand / About */}
        <div>
          <h2 className='text-2xl font-bold text-yellow-500 mb-4'>EYEPEK College</h2>
          <p className='text-gray-400'>
            EYEPEK College for Higher Education supports learners through student-focused higher education and personal growth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-xl font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2 text-gray-300'>
            <li><a href="/" className='hover:text-yellow-400'>Home</a></li>
            <li><a href="/services" className='hover:text-yellow-400'>Services</a></li>
            <li><a href="/contact" className='hover:text-yellow-400'>Contact Us</a></li>
            <li><a href="/profile" className='hover:text-yellow-400'>Profile</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
          <div className='flex space-x-4'>
            <a href="#" className='text-gray-300 hover:text-blue-500'><FaFacebookF /></a>
            <a href="#" className='text-gray-300 hover:text-sky-400'><FaTwitter /></a>
            <a href="#" className='text-gray-300 hover:text-pink-500'><FaInstagram /></a>
            <a href="#" className='text-gray-300 hover:text-blue-700'><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className='mt-10 text-center text-gray-500 text-sm'>
        &copy; {new Date().getFullYear()} EYEPEK College for Higher Education. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
