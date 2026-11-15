import React, { useState } from 'react';
import { courses } from '../courses';
import { useLanguage } from '../LanguageContext';

export default function ContactUs() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const t = (english, hindi) => hi ? hindi : english;
  const [form, setForm] = useState(() => ({ name: '', phone: '', service: new URLSearchParams(window.location.search).get('service') || '', course: new URLSearchParams(window.location.search).get('course') || '', message: '' }));
  const [status, setStatus] = useState('');
  const [emailUrl, setEmailUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const enquiry = [
      hi ? 'EYEPEK Support से सेवा संबंधी पूछताछ' : 'EYEPEK Support service enquiry',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `${hi ? 'सहायता का प्रकार' : 'Support needed'}: ${form.service || (hi ? 'निर्दिष्ट नहीं' : 'Not specified')}`, 
      `${hi ? 'रुचि का कोर्स' : 'Course of interest'}: ${form.course || (hi ? 'नहीं बताया' : 'Not specified')}`,
      `${hi ? 'संदेश' : 'Message'}: ${form.message || (hi ? 'नहीं है' : 'None')}`,
    ].join('\n');
    const url = `mailto:info.eyepek@gmail.com?subject=${encodeURIComponent(hi ? 'EYEPEK Support से सेवा संबंधी पूछताछ' : 'EYEPEK Support service enquiry')}&body=${encodeURIComponent(enquiry)}`;
    setEmailUrl(url);
    setStatus(hi ? 'आपकी पूछताछ ईमेल ऐप में तैयार है। info.eyepek@gmail.com पर भेजने के लिए वहाँ Send दबाएँ।' : 'Your enquiry is ready in your email app. Press Send there to email info.eyepek@gmail.com.');
    window.location.href = url;
  };

  const handleWhatsApp = () => {
    const message = [
      hi ? 'नमस्ते EYEPEK, मुझे जानकारी चाहिए।' : 'Hello EYEPEK, I would like some information.',
      `${hi ? 'नाम' : 'Name'}: ${form.name || (hi ? 'नहीं दिया' : 'Not provided')}`,
      `${hi ? 'फोन' : 'Phone'}: ${form.phone || (hi ? 'नहीं दिया' : 'Not provided')}`,
      `${hi ? 'सहायता का प्रकार' : 'Support needed'}: ${form.service || (hi ? 'निर्दिष्ट नहीं' : 'Not specified')}`, 
      `${hi ? 'कोर्स' : 'Course'}: ${form.course || (hi ? 'अभी तय नहीं' : 'Not decided yet')}`,
      `${hi ? 'सवाल' : 'Question'}: ${form.message || (hi ? 'कृपया कोर्स, पात्रता, फीस और दस्तावेज़ बताएँ।' : 'Please share course, eligibility, fee and document details.')}`,
    ].join('\n');
    window.open(`https://wa.me/917004374250?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className='min-h-[70vh] bg-slate-50 px-6 py-16 md:px-10 md:py-20'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]'>
        <section className='rounded-2xl bg-blue-950 p-8 text-white md:p-10'>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>{t("Contact & service enquiries","संपर्क और सेवा पूछताछ")}</p>
          <h1 className='mt-4 text-3xl font-extrabold md:text-4xl'>{t("Take the next step with the EYEPEK Team.","EYEPEK Team के साथ अगला कदम बढ़ाएँ।")}</h1>
          <p className='mt-5 leading-7 text-blue-100'>{t("Tell us whether you need student guidance, college documentation, IT support or home services. We will review your enquiry and help clarify the next practical step.","बताएँ कि आपको विद्यार्थी मार्गदर्शन, कॉलेज दस्तावेज़, IT सहायता या घरेलू सेवाओं में मदद चाहिए। हम आपकी पूछताछ देखकर अगला व्यावहारिक कदम स्पष्ट करने में मदद करेंगे।")}</p>
          <a className='mt-8 inline-flex rounded-md bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-400' href='tel:7004374250'>{t("Call 7004374250","7004374250 पर कॉल करें")}</a>
          <p className='mt-6 text-sm text-blue-100'>{t("Our team can help you understand course information and identify what to confirm directly with the relevant institution.","हमारी टीम कोर्स की जानकारी समझने और संबंधित संस्थान से किन बातों की पुष्टि करनी है, यह जानने में मदद कर सकती है।")}</p>
        </section>

        <section className='rounded-2xl bg-white p-8 shadow-sm md:p-10'>
          <h2 className='text-2xl font-bold text-blue-950'>{t("Send an enquiry","पूछताछ भेजें")}</h2>
          <p className='mt-2 text-slate-600'>{t("Choose the service area and share a few details. Your email or WhatsApp app will open with a draft for you to review and send.","सेवा चुनें और कुछ जानकारी दें। आपका ईमेल या WhatsApp ऐप संदेश के ड्राफ़्ट के साथ खुलेगा, जिसे जाँचकर आप भेज सकते हैं।")}</p>
          <form className='mt-7 space-y-5' onSubmit={handleSubmit}>
            <div className='grid gap-5 sm:grid-cols-2'>
              <label className='block text-sm font-semibold text-slate-700'>{t("Your name","आपका नाम")}
                <input required autoComplete='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder={t("Full name","पूरा नाम")} />
              </label>
              <label className='block text-sm font-semibold text-slate-700'>{t("Your phone number","आपका फ़ोन नंबर")}
                <input required type='tel' autoComplete='tel' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100' placeholder={t("Phone number","फ़ोन नंबर")} />
              </label>
            </div>
            <label className='block text-sm font-semibold text-slate-700'>{t("What do you need help with?","आपको किस तरह की सहायता चाहिए?")}
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className='mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100'><option value=''>{t('Select a service','सेवा चुनें')}</option><option value='Education and admission guidance'>{t('Education & admission guidance','शिक्षा और प्रवेश मार्गदर्शन')}</option><option value='College affiliation and documentation'>{t('College affiliation & documentation','कॉलेज संबद्धता और दस्तावेज़')}</option><option value='IT and computer support'>{t('IT & computer support','IT और कंप्यूटर सहायता')}</option><option value='Home services'>{t('Home services','घरेलू सेवाएँ')}</option><option value='Business and office support'>{t('Business and office support','व्यवसाय और ऑफिस सहायता')}</option><option value='Other'>{t('Other','अन्य')}</option></select>
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
