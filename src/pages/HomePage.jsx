import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='w-full'>
  
      <div className='relative w-full h-screen'>
        <img
          className='w-full h-full object-cover absolute inset-0 z-0'
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop&crop=faces"
          alt="Students learning together"
        />
        <div className='absolute inset-0 bg-gradient-to-br from-blue-950/80 via-red-900/55 to-orange-600/40 z-10'></div>

        <div className='relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white'>
          <h1 className='text-4xl md:text-6xl font-extrabold mb-4'>
            Welcome to <span className='text-orange-300'>EYEPEK</span> <span className='text-red-300'>College</span>
            <span className='block mt-2 text-3xl md:text-4xl text-green-300'>for Higher Education</span>
          </h1>
          <p className='text-xl md:text-2xl mb-6'>
            Contact: <span className="text-green-300">7004374250</span>
          </p>
          <p className='text-lg max-w-2xl mb-8'>
            Supporting learners through student-focused higher education, knowledge, and personal growth.
          </p>
          <Link to='/service'>
          <button  className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300'>
            Get Started
          </button>
          </Link>
          
        </div>
      </div>

      <div className='py-16 px-4 bg-blue-50'>
        <h2 className='text-3xl font-bold text-center mb-12 text-blue-950'>Learning at EYEPEK College</h2>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
         
          <div className='bg-white border-t-4 border-blue-600 shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300'>
            <h3 className='text-xl font-bold mb-2 text-blue-600'>Academic Learning</h3>
            <p className='text-gray-600 mb-4'>Build knowledge and skills in a learning environment focused on students and their next steps.</p>
            <button className='text-blue-600 font-semibold hover:underline'>Learn More</button>
          </div>

         
          <div className='bg-white border-t-4 border-orange-500 shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300'>
            <h3 className='text-xl font-bold mb-2 text-orange-600'>Student Development</h3>
            <p className='text-gray-600 mb-4'>Encouraging curiosity, confidence, and personal growth throughout the higher education journey.</p>
            <button className='text-red-600 font-semibold hover:underline'>Explore Courses</button>
          </div>

          
          <div className='bg-white border-t-4 border-green-600 shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300'>
            <h3 className='text-xl font-bold mb-2 text-green-600'>Student Support</h3>
            <p className='text-gray-600 mb-4'>Contact our team for guidance about learning and student services.</p>
            <button className='text-green-600 font-semibold hover:underline'>Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
