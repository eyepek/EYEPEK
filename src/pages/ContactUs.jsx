import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { courses } from '../courses';

const enquiryTypes = [
  'College affiliation & documentation',
  'Admissions & course guidance',
  'AICTE & compliance documentation',
  'Education & student support',
  'IT & computer support',
  'Home or business services',
  'Other enquiry',
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', phone: '', enquiryType: '', institution: '', course: '', message: '' });
  const [status, setStatus] = useState('');
  const [emailUrl, setEmailUrl] = useState('');

  useEffect(() => {
    document.title = 'Contact EYEPEK | Affiliation, Admission & Support Enquiries';

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', 'Contact EYEPEK for college affiliation guidance, admissions, documentation, AICTE-related compliance support, and other professional services in Patna, Bihar.');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.eyepek.com/contact');
  }, []);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const enquiry = [
      'EYEPEK support enquiry',
      'Support needed: ' + form.enquiryType,
      'Name: ' + form.name,
      'Phone: ' + form.phone,
      'Institution or college: ' + (form.institution || 'Not specified'),
      'Course of interest: ' + (form.course || 'Not specified'),
      'Message: ' + (form.message || 'None'),
    ].join('\n');
    const subject = 'EYEPEK ' + form.enquiryType + ' enquiry';
    const url = 'mailto:info.eyepek@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(enquiry);
    setEmailUrl(url);
    setStatus('Your enquiry is ready in your email app. Press Send there to email info.eyepek@gmail.com.');
    window.location.href = url;
  };

  return (
    <main className='min-h-[70vh] bg-slate-50 px-6 py-16 md:px-10 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <section className='relative overflow-hidden rounded-3xl bg-blue-950 px-8 py-10 text-white shadow-xl md:px-12 md:py-14'>
          <div className='absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl' aria-hidden='true' />
          <div className='relative max-w-3xl'>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Talk to EYEPEK</p>
            <h1 className='mt-4 text-3xl font-black leading-tight md:text-5xl'>Clear support starts with one conversation.</h1>
            <p className='mt-5 max-w-2xl text-lg leading-8 text-blue-100'>Ask about college affiliation, admissions, documentation, AICTE-related compliance support, or any other EYEPEK service.</p>
            <p className='mt-5 text-sm leading-6 text-blue-200'>We provide process guidance and document support. Official admissions, approvals, affiliations, and regulatory decisions remain with the relevant institution or authority.</p>
          </div>
        </section>

        <section className='mt-8 grid gap-5 md:grid-cols-3'>
          <a href='tel:+917004374250' className='rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
            <FaPhoneAlt className='text-xl text-orange-500' aria-hidden='true' />
            <p className='mt-4 text-sm font-bold uppercase tracking-wide text-slate-500'>Call</p>
            <p className='mt-1 font-extrabold text-blue-950'>+91 70043 74250</p>
          </a>
          <a href='https://wa.me/917004374250' className='rounded-2xl border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
            <FaWhatsapp className='text-2xl text-green-600' aria-hidden='true' />
            <p className='mt-4 text-sm font-bold uppercase tracking-wide text-slate-500'>WhatsApp</p>
            <p className='mt-1 font-extrabold text-blue-950'>Message EYEPEK</p>
          </a>
          <a href='mailto:info.eyepek@gmail.com' className='rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
            <FaEnvelope className='text-xl text-orange-500' aria-hidden='true' />
            <p className='mt-4 text-sm font-bold uppercase tracking-wide text-slate-500'>Email</p>
            <p className='mt-1 break-all font-extrabold text-blue-950'>info.eyepek@gmail.com</p>
          </a>
        </section>

        <section className='mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]'>
          <aside className='rounded-3xl border border-blue-100 bg-blue-50/70 p-8'>
            <p className='text-sm font-bold uppercase tracking-[0.18em] text-orange-700'>Before you enquire</p>
            <h2 className='mt-3 text-2xl font-extrabold text-blue-950'>A few details help us guide you better.</h2>
            <ul className='mt-6 space-y-4 text-sm leading-6 text-slate-700'>
              <li className='flex gap-3'><span className='font-black text-orange-500'>01</span><span>Tell us whether your enquiry is about admissions, affiliation, documentation, AICTE support, or another service.</span></li>
              <li className='flex gap-3'><span className='font-black text-orange-500'>02</span><span>Share your college or institution name when the enquiry is for institutional support.</span></li>
              <li className='flex gap-3'><span className='font-black text-orange-500'>03</span><span>Keep official requirements and application status ready to confirm directly with the relevant authority.</span></li>
            </ul>
          </aside>

          <section className='rounded-3xl bg-white p-8 shadow-sm md:p-10'>
            <h2 className='text-2xl font-bold text-blue-950'>Send an enquiry</h2>
            <p className='mt-2 text-slate-600'>Fill this in to prepare an email to the EYEPEK team.</p>
            <form className='mt-7 space-y-5' onSubmit={handleSubmit}>
              <label className='block text-sm font-semibold text-slate-700'>What support do you need?
                <select required value={form.enquiryType} onChange={(event) => updateField('enquiryType', event.target.value)} className='mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100'>
                  <option value=''>Select support type</option>
                  {enquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <div className='grid gap-5 sm:grid-cols-2'>
                <label className='block text-sm font-semibold text-slate-700'>Your name
                  <input required autoComplete='name' value={form.name} onChange={(event) => updateField('name', event.target.value)} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='Full name' />
                </label>
                <label className='block text-sm font-semibold text-slate-700'>Your phone number
                  <input required type='tel' autoComplete='tel' value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='Phone number' />
                </label>
              </div>
              <div className='grid gap-5 sm:grid-cols-2'>
                <label className='block text-sm font-semibold text-slate-700'>Institution or college (optional)
                  <input value={form.institution} onChange={(event) => updateField('institution', event.target.value)} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='College or organisation name' />
                </label>
                <label className='block text-sm font-semibold text-slate-700'>Course (optional)
                  <input list='course-options' value={form.course} onChange={(event) => updateField('course', event.target.value)} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='Choose or type a course' />
                  <datalist id='course-options'>{courses.map((course) => <option key={course} value={course} />)}</datalist>
                </label>
              </div>
              <label className='block text-sm font-semibold text-slate-700'>Your question (optional)
                <textarea rows={5} value={form.message} onChange={(event) => updateField('message', event.target.value)} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder='Tell us what you would like to know.' />
              </label>
              <button type='submit' className='rounded-md bg-blue-800 px-6 py-3 font-bold text-white transition hover:bg-blue-900'>Prepare email enquiry</button>
              {status && <p role='status' className='rounded-md bg-blue-50 p-4 text-sm leading-6 text-blue-950'>{status} <a href={emailUrl} className='ml-1 font-bold underline'>Open email</a></p>}
            </form>
            <p className='mt-5 text-xs leading-5 text-slate-500'>Your enquiry will be addressed to info.eyepek@gmail.com and is sent only after you press Send in your email app.</p>
          </section>
        </section>
      </div>
    </main>
  );
}
