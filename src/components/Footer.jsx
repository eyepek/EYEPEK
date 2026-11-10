import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const exploreLinks = [
    { label: 'About EYEPEK', labelHi: 'EYEPEK के बारे में', href: '/#about' },
    { label: 'Guidance & Support', labelHi: 'मार्गदर्शन और सहायता', href: '/#learning' },
    { label: 'Student & Education Services', labelHi: 'छात्र और शिक्षा सेवाएँ', href: '/services/education' },
    { label: 'College & Institution Support', labelHi: 'कॉलेज और संस्थान सहायता', href: '/services/business-support' },
    { label: 'IT Solutions', labelHi: 'आईटी समाधान', href: '/services/it-support' },
    { label: 'All Services', labelHi: 'सभी सेवाएँ', href: '/#student-support' },
    { label: 'Student Journey', labelHi: 'छात्र यात्रा', href: '/#campus' },
    { label: 'Admission, Affiliation & Documents Guide', labelHi: 'प्रवेश, संबद्धता और दस्तावेज़ मार्गदर्शन', href: '/#support-guide' },
    { label: 'Admissions', labelHi: 'प्रवेश', href: '/#admissions' },
    { label: 'Free Admission Checklist', labelHi: 'निःशुल्क प्रवेश चेकलिस्ट', href: '/admission-checklist' },
    { label: 'Course & Career Finder', labelHi: 'कोर्स और करियर खोजें', href: '/course-finder' },
    { label: 'Helpful Guides', labelHi: 'उपयोगी गाइड', href: '/guides' },
    { label: 'Privacy Policy', labelHi: 'गोपनीयता नीति', href: '/privacy-policy.html' },
  ];

  return (
    <footer className='bg-slate-950 text-white'>
      <div className='mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.25fr_1fr_0.85fr] md:gap-12 md:px-10 md:py-14'>
        <div>
          <Link to='/' aria-label='EYEPEK home' className='inline-flex rounded-lg bg-white p-2'>
            <img src='/images/eyepek-logo.svg' alt='EYEPEK' className='block h-auto w-[190px] sm:w-[210px]' />
          </Link>
          <p className='mt-5 max-w-md text-sm leading-7 text-slate-300'>
            {t(
              'EYEPEK helps students make informed education and career decisions, supports colleges and institutions with affiliation, compliance and documentation guidance, and provides practical IT solutions for everyday needs.',
              'EYEPEK छात्रों को शिक्षा और करियर से जुड़े सही निर्णय लेने में मदद करता है। हम कॉलेजों और संस्थानों को संबद्धता, अनुपालन और दस्तावेज़ीकरण में मार्गदर्शन देते हैं तथा रोज़मर्रा की ज़रूरतों के लिए व्यावहारिक आईटी सहायता भी प्रदान करते हैं।'
            )}
          </p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <a href='https://www.youtube.com/@eyepek' target='_blank' rel='noreferrer' aria-label='Visit EYEPEK on YouTube (opens in a new tab)' className='inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-red-500 hover:bg-red-600 hover:text-white'>
              <svg aria-hidden='true' viewBox='0 0 24 24' className='h-4 w-4 fill-current'><path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z' /></svg>
              YouTube
            </a>
            <a href='https://www.facebook.com/share/1E6U716f8p/' target='_blank' rel='noreferrer' aria-label='Visit EYEPEK on Facebook (opens in a new tab)' className='inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white'>
              <svg aria-hidden='true' viewBox='0 0 24 24' className='h-4 w-4 fill-current'><path d='M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.93v-8.43H7.08v-3.5h3.05V9.4c0-3.03 1.8-4.7 4.55-4.7 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.97.94-1.97 1.9v2.25h3.35l-.54 3.5h-2.81V24C19.61 23.07 24 18.1 24 12.07Z' /></svg>
              Facebook
            </a>
          </div>
        </div>

        <div>
          <h3 className='text-base font-bold tracking-wide text-white'>{t('Explore EYEPEK', 'EYEPEK देखें')}</h3>
          <ul className='mt-5 grid grid-cols-1 gap-x-5 gap-y-3 text-sm text-slate-300 sm:grid-cols-2 md:grid-cols-1'>
            {exploreLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className='transition-colors hover:text-orange-300'>{t(item.label, item.labelHi)}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-base font-bold tracking-wide text-white'>{t('Contact EYEPEK', 'EYEPEK से संपर्क करें')}</h3>
          <p className='mt-5 text-sm leading-6 text-slate-300'>{t('Course, admission, institutional documentation and IT support.', 'कोर्स, प्रवेश, संस्थागत दस्तावेज़ और आईटी सहायता।')}</p>
          <a href='tel:+917004374250' className='mt-4 inline-flex items-center gap-2 text-lg font-bold text-orange-300 transition hover:text-white'>+91 70043 74250</a>
          <a href='mailto:Info.eyepek@gmail.com' className='mt-2 block break-all text-sm text-slate-300 transition hover:text-orange-300'>Info.eyepek@gmail.com</a>
          <a href='https://wa.me/917004374250' target='_blank' rel='noreferrer' className='mt-5 inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-600'>
            {t('Message us on WhatsApp', 'WhatsApp पर संदेश भेजें')} <span aria-hidden='true' className='ml-2'>→</span>
          </a>
          <p className='mt-4'><Link to='/contact' className='text-sm font-semibold text-slate-300 transition hover:text-orange-300'>{t('Contact page', 'संपर्क पेज')} →</Link></p>
        </div>
      </div>
      <div className='border-t border-white/10 px-5 py-5 text-center text-xs text-slate-400 sm:text-sm'>
        © {new Date().getFullYear()} EYEPEK. {t('All rights reserved.', 'सर्वाधिकार सुरक्षित।')}
      </div>
    </footer>
  );
};

export default Footer;
