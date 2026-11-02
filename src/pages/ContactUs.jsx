import React, { useState } from 'react';
import { courses } from '../courses';
import { useLanguage } from '../LanguageContext';

export default function ContactUs() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const t = (english, hindi) => hi ? hindi : english;
  const [form, setForm] = useState(() => ({ name: '', phone: '', course: new URLSearchParams(window.location.search).get('course') || '', message: '' }));
  const [status, setStatus] = useState('');
  const [emailUrl, setEmailUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const enquiry = [
      hi ? 'EYEPEK College प्रवेश पूछताछ' : 'EYEPEK College admission enquiry',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `${hi ? 'रुचि का कोर्स' : 'Course of interest'}: ${form.course || (hi ? 'नहीं बताया' : 'Not specified')}`,
      `${hi ? 'संदेश' : 'Message'}: ${form.message || (hi ? 'नहीं है' : 'None')}`,
    ].join('\n');
    const url = `mailto:info.eyepek@gmail.com?subject=${encodeURIComponent(hi ? 'EYEPEK College प्रवेश पूछताछ' : 'EYEPEK College admission enquiry')}&body=${encodeURIComponent(enquiry)}`;
    setEmailUrl(url);
    setStatus(hi ? 'आपकी पूछताछ ईमेल ऐप में तैयार है। info.eyepek@gmail.com पर भेजने के लिए वहाँ Send दबाएँ।' : 'Your enquiry is ready in your email app. Press Send there to email info.eyepek@gmail.com.');
    window.location.href = url;
  };

  const handleWhatsApp = () => {
    const message = [
      hi ? 'नमस्ते EYEPEK, मुझे जानकारी चाहिए।' : 'Hello EYEPEK, I would like some information.',
      `${hi ? 'नाम' : 'Name'}: ${form.name || (hi ? 'नहीं दिया' : 'Not provided')}`,
      `${hi ? 'फोन' : 'Phone'}: ${form.phone || (hi ? 'नहीं दिया' : 'Not provided')}`,
      `${hi ? 'कोर्स' : 'Course'}: ${form.course || (hi ? 'अभी तय नहीं' : 'Not decided yet')}`,
      `${hi ? 'सवाल' : 'Question'}: ${form.message || (hi ? 'कृपया कोर्स, पात्रता, फीस और दस्तावेज़ बताएँ।' : 'Please share course, eligibility, fee and document details.')}`,
    ].join('\n');
    window.open(`https://wa.me/917004374250?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className='min-h-[70vh] bg-slate-50 px-6 py-16 md:px-10 md:py-20'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]'>
        <section className='rounded-2xl bg-blue-950 p-8 text-white md:p-10'>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>{t("Admissions & enquiries","प्रवेश और पूछताछ")}</p>
          <h1 className='mt-4 text-3xl font-extrabold md:text-4xl'>{t("Take the next step with EYEPEK College.","EYEPEK College के साथ अगला कदम बढ़ाएँ।")}</h1>
          <p className='mt-5 leading-7 text-blue-100'>{t("Tell us what you are looking for. Our team can guide you on course availability and admission details.","अपनी ज़रूरत बताएँ। हमारी टीम कोर्स की उपलब्धता और प्रवेश की जानकारी समझने में मदद करेगी।")}</p>
          <a className='mt-8 inline-flex rounded-md bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-400' href='tel:7004374250'>{t("Call 7004374250","7004374250 पर कॉल करें")}</a>
          <p className='mt-6 text-sm text-blue-100'>{t("Course and fee details are available from the college admissions team.","कोर्स और फीस की जानकारी कॉलेज की प्रवेश टीम से लें।")}</p>
        </section>

        <section className='rounded-2xl bg-white p-8 shadow-sm md:p-10'>
          <h2 className='text-2xl font-bold text-blue-950'>{t("Send an enquiry","पूछताछ भेजें")}</h2>
          <p className='mt-2 text-slate-600'>{t("Fill this in to prepare an email to the EYEPEK College team.","EYEPEK College टीम को ईमेल तैयार करने के लिए यह फ़ॉर्म भरें।")}</p>
          <form className='mt-7 space-y-5' onSubmit={handleSubmit}>
            <div className='grid gap-5 sm:grid-cols-2'>
              <label className='block text-sm font-semibold text-slate-700'>{t("Your name","आपका नाम")}
                <input required autoComplete='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder={t("Full name","पूरा नाम")} />
              </label>
              <label className='block text-sm font-semibold text-slate-700'>{t("Your phone number","आपका फ़ोन नंबर")}
                <input required type='tel' autoComplete='tel' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder={t("Phone number","फ़ोन नंबर")} />
              </label>
            </div>
            <label className='block text-sm font-semibold text-slate-700'>{t("Course you are interested in","आप किस कोर्स में रुचि रखते हैं")}
              <input list='course-options' value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder={t("Choose or type a course","कोर्स चुनें या लिखें")} />
              <datalist id='course-options'>
                {courses.map((course) => <option key={course} value={course} />)}
              </datalist>
            </label>
            <label className='block text-sm font-semibold text-slate-700'>{t("Your question (optional)","आपका सवाल (ज़रूरी नहीं)")}
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder={t("What would you like to know?","आप क्या जानना चाहते हैं?")} />
            </label>
            <div className='flex flex-wrap gap-3'>
              <button type='submit' className='rounded-md bg-blue-800 px-6 py-3 font-bold text-white transition hover:bg-blue-900'>{t("Send enquiry by email","ईमेल से पूछताछ भेजें")}</button>
              <button type='button' onClick={handleWhatsApp} className='rounded-md bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700'>{t("Continue on WhatsApp","WhatsApp पर जारी रखें")}</button>
            </div>
            <p className='text-xs text-slate-500'>{t("WhatsApp opens a draft for you to review and send.","WhatsApp पर संदेश का ड्राफ़्ट खुलेगा; भेजने से पहले उसे जाँच लें।")}</p>
            {status && <p role='status' className='rounded-md bg-blue-50 p-4 text-sm leading-6 text-blue-950'>{status} <a href={emailUrl} className='ml-1 font-bold underline'>Open email</a></p>}
          </form>
          <p className='mt-5 text-xs leading-5 text-slate-500'>Your enquiry will be addressed to info.eyepek@gmail.com. It is sent only after you press Send in your email app.</p>
        </section>
      </div>
    </main>
  );
}
