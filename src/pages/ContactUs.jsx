import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-backend-endpoint.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Something went wrong.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-20 px-4 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl'>
        <h2 className='text-3xl font-bold text-center text-blue-600 mb-6'>Contact Us</h2>
        
        <form onSubmit={handleSubmit} className='space-y-6'>

          <div>
            <label htmlFor='name' className='block mb-2 text-sm font-semibold text-gray-700'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

   
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-semibold text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label htmlFor='message' className='block mb-2 text-sm font-semibold text-gray-700'>Message</label>
            <textarea
              id='message'
              name='message'
              rows='5'
              value={formData.message}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            ></textarea>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300'
          >
            Send Message
          </button>

         
          {status && (
            <p className='text-center mt-4 text-sm font-semibold text-green-600'>{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
