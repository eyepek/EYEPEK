import React, { useState } from 'react';
import { courses } from '../courses';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const enquiry = [
      'EYEPEK College admission enquiry',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Course of interest: ${form.course || 'Not specified'}`,
      `Message: ${form.message || 'None'}`,
    ].join('\n');
    const url = `https://wa.me/917004374250?text=${encodeURIComponent(enquiry)}`;
    setWhatsappUrl(url);
    setStatus('Your enquiry is ready in WhatsApp. Press Send there to share it with +91 7004374250.');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className='min-h-[70vh] bg-slate-50 px-6 py-16 md:px-10 md:py-20'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]'>
        <section className='rounded-2xl bg-blue-950 p-8 text-white md:p-10'>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Admissions &amp; enquiries</p>
          <h1 className='mt-4 text-3xl font-extrabold md:text-4xl'>Take the next step with EYEPEK College.</h1>
          <p className='mt-5 leading-7 text-blue-100'>Tell us what you are looking for. Our team can guide you on course availability and admission details.</p>
          <a className='mt-8 inline-flex rounded-md bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-400' href='tel:7004374250'>Call 7004374250</a>
          <p className='mt-6 text-sm text-blue-100'>Course and fee details are available from the college admissions team.</p>
        </section>

        <section className='rounded-2xl bg-white p-8 shadow-sm md:p-10'>
          <h2 className='text-2xl font-bold text-blue-950'>Send an enquiry</h2>
          <p className='mt-2 text-slate-600'>Fill this in, then continue to WhatsApp to share your enquiry.</p>
          <form className='mt-7 space-y-5' onSubmit={handleSubmit}>
            <div className='grid gap-5 sm:grid-cols-2'>
              <label className='block text-sm font-semibold text-slate-700'>Your name
                <input required autoComplete='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='Full name' />
              </label>
              <label className='block text-sm font-semibold text-slate-700'>Your phone number
                <input required type='tel' autoComplete='tel' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='Phone number' />
              </label>
            </div>
            <label className='block text-sm font-semibold text-slate-700'>Course you are interested in
              <input list='course-options' value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='Choose or type a course' />
              <datalist id='course-options'>
                {courses.map((course) => <option key={course} value={course} />)}
              </datalist>
            </label>
            <label className='block text-sm font-semibold text-slate-700'>Your question (optional)
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='What would you like to know?' />
            </label>
            <button type='submit' className='rounded-md bg-blue-800 px-6 py-3 font-bold text-white transition hover:bg-blue-900'>Continue to WhatsApp</button>
            {status && <p role='status' className='rounded-md bg-blue-50 p-4 text-sm leading-6 text-blue-950'>{status} <a href={whatsappUrl} target='_blank' rel='noreferrer' className='ml-1 font-bold underline'>Open WhatsApp</a></p>}
          </form>
          <p className='mt-5 text-xs leading-5 text-slate-500'>Your enquiry is prepared as a WhatsApp message to +91 7004374250. It is shared only when you press Send in WhatsApp.</p>
        </section>
      </div>
    </main>
  );
}
