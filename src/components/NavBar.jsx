import React, { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { FaFacebookF, FaYoutube, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InstallAppButton from './InstallAppButton';

const serviceLinks = [
  { label: 'Education Services', to: '/services/education' },
  { label: 'IT & Computer Support', to: '/services/it-support' },
  { label: 'Home Services', to: '/services/home-services' },
  { label: 'Business & Institution Support', to: '/services/business-support' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm'>
      <div className='bg-blue-950 px-6 py-2 text-xs font-semibold text-blue-50 md:px-10 md:text-sm'>
        <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2'>
          <span>Admissions &amp; enquiries</span>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
            <InstallAppButton />
            <a href='https://www.youtube.com/@eyepek' target='_blank' rel='noreferrer' aria-label='Visit EYEPEK on YouTube (opens in a new tab)' className='inline-flex items-center gap-1.5 text-blue-50 transition hover:text-orange-300'>
              <FaYoutube aria-hidden='true' className='h-4 w-4' /> YouTube
            </a>
            <a href='https://www.facebook.com/share/1E6U716f8p/' target='_blank' rel='noreferrer' aria-label='Visit EYEPEK on Facebook (opens in a new tab)' className='inline-flex items-center gap-1.5 text-blue-50 transition hover:text-orange-300'>
              <FaFacebookF aria-hidden='true' className='h-3.5 w-3.5' /> Facebook
            </a>
            <a href='tel:7004374250' className='text-orange-300 transition hover:text-white'>Call us: 7004374250</a>
          </div>
        </div>
      </div>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10'>
        <Link to='/' onClick={closeMenu} aria-label='EYEPEK College home' className='shrink-0'>
          <img src='/images/eyepek-college-logo.svg' alt='EYEPEK College' className='block h-auto w-[210px] sm:w-[240px]' />
        </Link>
        <button type='button' aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-controls='primary-navigation' aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className='rounded-md p-2 text-blue-950 lg:hidden'>
          <IoMdMenu className='h-8 w-8' />
        </button>
        <nav id='primary-navigation' className={`${isOpen ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-5 border-t border-slate-100 bg-white px-6 py-5 font-semibold text-blue-950 shadow-lg lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          <Link to='/' onClick={closeMenu} className='hover:text-red-600'>Home</Link>
          <a href='/#about' onClick={closeMenu} className='hover:text-red-600'>About</a>
          <a href='/#learning' onClick={closeMenu} className='hover:text-red-600'>Guidance &amp; Support</a>
          <div className='relative'>
            <button
              type='button'
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              aria-controls='services-dropdown'
              className='inline-flex items-center gap-2 text-left transition hover:text-red-600'
            >
              Services <FaChevronDown aria-hidden='true' className={`h-3 w-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              id='services-dropdown'
              className={`${servicesOpen ? 'block' : 'hidden'} mt-3 min-w-64 overflow-hidden rounded-lg border border-slate-100 bg-white py-2 shadow-lg lg:absolute lg:left-0 lg:top-full lg:mt-3 lg:w-72`}
            >
              {serviceLinks.map((service) => (
                <Link
                  key={service.to}
                  to={service.to}
                  onClick={closeMenu}
                  className='block px-4 py-3 text-sm font-medium text-blue-950 transition hover:bg-orange-50 hover:text-red-600'
                >
                  {service.label}
                </Link>
              ))}
              <a href='/#student-support' onClick={closeMenu} className='block border-t border-slate-100 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50'>
                All services on homepage
              </a>
            </div>
          </div>
          <a href='/#campus' onClick={closeMenu} className='hover:text-red-600'>Student Journey</a>
          <a href='/#admissions' onClick={closeMenu} className='rounded-md bg-orange-500 px-5 py-2.5 text-center text-white transition hover:bg-orange-600'>Admissions</a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
