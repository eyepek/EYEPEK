import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='bg-slate-950 text-white'>
    <div className='mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_0.8fr_1fr] md:px-10'>
      <div>
        <h2 className='text-2xl font-black'>EYEPEK <span className='text-orange-400'>COLLEGE</span></h2>
        <p className='mt-4 max-w-md leading-7 text-slate-300'>A student-focused college community for learning, personal growth, and new possibilities.</p>
        <div className='mt-5 flex flex-wrap gap-3'>
          <a
            href='https://www.youtube.com/@eyepek'
            target='_blank'
            rel='noreferrer'
            aria-label='Visit EYEPEK on YouTube (opens in a new tab)'
            className='inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-red-500 hover:bg-red-600 hover:text-white'
          >
            <svg aria-hidden='true' viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
              <path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z' />
            </svg>
            YouTube
          </a>
          <a
            href='https://www.facebook.com/share/1E6U716f8p/'
            target='_blank'
            rel='noreferrer'
            aria-label='Visit EYEPEK on Facebook (opens in a new tab)'
            className='inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white'
          >
            <svg aria-hidden='true' viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
              <path d='M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.93v-8.43H7.08v-3.5h3.05V9.4c0-3.03 1.8-4.7 4.55-4.7 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.97.94-1.97 1.9v2.25h3.35l-.54 3.5h-2.81V24C19.61 23.07 24 18.1 24 12.07Z' />
            </svg>
            Facebook
          </a>
        </div>
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
      <p className='mx-auto mt-2 max-w-4xl text-xs leading-5 text-slate-500'>
        Illustrative student photos: <a href='https://www.pexels.com/photo/indian-students-doing-homework-in-campus-meadow-4622108/' className='underline hover:text-slate-300'>Kiran Pokuri Photography</a>, <a href='https://www.pexels.com/photo/students-studying-in-classroom-8197511/' className='underline hover:text-slate-300'>Yan Krukau</a>, and <a href='https://www.pexels.com/photo/a-group-of-students-sitting-in-a-library-and-studying-16420473/' className='underline hover:text-slate-300'>Ludovic Delot</a> via <a href='https://www.pexels.com/license/' className='underline hover:text-slate-300'>Pexels</a>.
      </p>
    </div>
  </footer>
);

export default Footer;
