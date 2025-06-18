import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='w-full'>
  
      <div className='relative w-full h-screen'>
        <img
          className='w-full h-full object-cover absolute inset-0 z-0'
          src="https://media.istockphoto.com/id/2156307955/photo/african-american-woman-closely-examining-cadastral-map-on-laptop-screen-in-office-executive.jpg?s=612x612&w=0&k=20&c=NAQUri-DC7c0SFA71-hXYBWNYHZ9wgNB_FYVd7e172o="
          alt="African American woman examining map"
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10'></div>

        <div className='relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white'>
          <h1 className='text-5xl md:text-6xl font-extrabold mb-4'>
            Welcome to <span className='text-yellow-400'>Eye</span><span className='text-blue-500'>Pek</span>
          </h1>
          <p className='text-xl md:text-2xl mb-6'>
            IT & Educational Services — <span className="text-yellow-300">7004374250</span>
          </p>
          <p className='text-lg max-w-2xl mb-8'>
            Empowering data with clarity and vision. We bridge the gap between technology and education to deliver impactful solutions for a brighter future.
          </p>
          <Link to='/service'>
          <button  className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300'>
            Get Started
          </button>
          </Link>
          
        </div>
      </div>

      <div className='py-16 px-4 bg-gray-100'>
        <h2 className='text-3xl font-bold text-center mb-12 text-gray-800'>Our Services</h2>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
         
          <div className='bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300'>
            <h3 className='text-xl font-bold mb-2 text-blue-600'>IT Services</h3>
            <p className='text-gray-600 mb-4'>From software development to IT consulting, we provide comprehensive IT solutions tailored to your needs.</p>
            <button className='text-blue-600 font-semibold hover:underline'>Learn More</button>
          </div>

         
          <div className='bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300'>
            <h3 className='text-xl font-bold mb-2 text-yellow-600'>Educational Training</h3>
            <p className='text-gray-600 mb-4'>We offer hands-on training in programming, digital literacy, and academic support for students of all levels.</p>
            <button className='text-yellow-600 font-semibold hover:underline'>Explore Courses</button>
          </div>

          
          <div className='bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300'>
            <h3 className='text-xl font-bold mb-2 text-green-600'>24/7 Support</h3>
            <p className='text-gray-600 mb-4'>Need help? Our expert support team is always available to assist you anytime, anywhere.</p>
            <button className='text-green-600 font-semibold hover:underline'>Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
