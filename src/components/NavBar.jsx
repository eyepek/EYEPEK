import React, { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { FaFacebookF, FaYoutube, FaChevronDown, FaGraduationCap, FaUserTie, FaBookOpen, FaLaptopCode, FaClipboardCheck, FaRoute, FaBullseye, FaRegCalendarCheck, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InstallAppButton from './InstallAppButton';
import { useLanguage } from '../LanguageContext';

const serviceLinks = [
  { label: 'Education Services', labelHi: 'शिक्षा सेवाएँ', to: '/services/education' },
  { label: 'IT & Computer Support', labelHi: 'आईटी और कंप्यूटर सहायता', to: '/services/it-support' },
  { label: 'Home Services', labelHi: 'घरेलू सेवाएँ', to: '/services/home-services' },
  { label: 'Business & Institution Support', labelHi: 'कॉलेज और संस्थान सहायता', to: '/services/business-support' },
];

const guidanceLinks = [
  { label: 'Student Guidance', labelHi: 'छात्र मार्गदर्शन', detail: 'Plan your next education step', detailHi: 'पढ़ाई का अगला कदम तय करें', href: '/#learning', icon: FaGraduationCap },
  { label: 'Career & Job Support', labelHi: 'करियर और नौकरी सहायता', detail: 'Explore skills and career options', detailHi: 'कौशल और करियर विकल्प जानें', href: '/#student-support', icon: FaUserTie },
  { label: 'Courses & Learning', labelHi: 'कोर्स और सीखना', detail: 'Build knowledge and practical skills', detailHi: 'ज्ञान और व्यावहारिक कौशल बढ़ाएँ', href: '/#campus', icon: FaBookOpen },
  { label: 'Computer Learning', labelHi: 'कंप्यूटर सीखना', detail: 'Get support with digital skills', detailHi: 'डिजिटल कौशल सीखने में मदद पाएँ', href: '/#student-support', icon: FaLaptopCode },
  { label: 'Admission & Documentation', labelHi: 'प्रवेश और दस्तावेज़', detail: 'Get help understanding the process', detailHi: 'प्रक्रिया को समझने में सहायता पाएँ', href: '/#admissions', icon: FaClipboardCheck },
];

const journeyLinks = [
  { label: 'Explore Your Options', labelHi: 'अपने विकल्प जानें', detail: 'Discover learning and support pathways', detailHi: 'पढ़ाई और सहायता के रास्ते देखें', href: '/#learning', icon: FaRoute },
  { label: 'Career', labelHi: 'करियर', detail: 'Explore career paths, skills and job guidance', detailHi: 'करियर, कौशल और नौकरी मार्गदर्शन देखें', href: '/#student-support', icon: FaBriefcase },
  { label: 'Set Your Goals', labelHi: 'अपने लक्ष्य तय करें', detail: 'Choose a practical next step for your future', detailHi: 'अपने भविष्य का अगला कदम चुनें', href: '/#about', icon: FaBullseye },
  { label: 'Course & Admission Guidance', labelHi: 'कोर्स और प्रवेश मार्गदर्शन', detail: 'Ask about courses, admission steps and documents', detailHi: 'कोर्स, प्रवेश प्रक्रिया और दस्तावेज़ों के बारे में पूछें', href: '/#admissions', icon: FaRegCalendarCheck },
  { label: 'Admissions, Affiliation & Documents Guide', labelHi: 'प्रवेश, संबद्धता और दस्तावेज़ मार्गदर्शन', detail: 'Understand each process in plain language', detailHi: 'हर प्रक्रिया को आसान भाषा में समझें', href: '/#support-guide', icon: FaClipboardCheck },
  { label: 'Free Admission Checklist', labelHi: 'निःशुल्क प्रवेश चेकलिस्ट', detail: 'Build and print your document checklist', detailHi: 'दस्तावेज़ सूची बनाएँ और प्रिंट करें', href: '/admission-checklist', icon: FaClipboardCheck },
  { label: 'Course & Career Finder', labelHi: 'कोर्स और करियर खोजें', detail: 'Explore courses that fit your interests', detailHi: 'अपनी रुचि के कोर्स जानें', href: '/course-finder', icon: FaGraduationCap },
];

const NavBar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [guidanceOpen, setGuidanceOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setGuidanceOpen(false);
    setJourneyOpen(false);
  };

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm'>
      <div className='border-b border-blue-900 bg-blue-950 px-4 text-blue-50 sm:px-6 md:px-10'>
        <div className='mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-3'>
          <p className='hidden text-[11px] font-semibold tracking-wide text-blue-100 sm:block'>{t('Guidance for students & institutions', 'छात्रों और संस्थानों के लिए मार्गदर्शन')}</p>
          <div className='ml-auto flex items-center gap-2.5 sm:gap-4'>
            <div className='inline-flex items-center rounded-full border border-white/20 bg-white/5 p-0.5' aria-label={t('Choose language', 'भाषा चुनें')}>
              <button type='button' onClick={() => setLanguage('en')} aria-pressed={language === 'en'} className={`rounded-full px-2 py-1 text-[10px] font-bold transition ${language === 'en' ? 'bg-white text-blue-950' : 'text-blue-100 hover:text-white'}`}>EN</button>
              <button type='button' onClick={() => setLanguage('hi')} aria-pressed={language === 'hi'} className={`rounded-full px-2 py-1 text-[10px] font-bold transition ${language === 'hi' ? 'bg-white text-blue-950' : 'text-blue-100 hover:text-white'}`}>हिंदी</button>
            </div>
            <a href='https://www.youtube.com/@eyepek' target='_blank' rel='noreferrer' aria-label='Visit EYEPEK on YouTube (opens in a new tab)' className='inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-100 transition hover:text-orange-300'>
              <FaYoutube aria-hidden='true' className='h-4 w-4' /><span className='hidden sm:inline'>{t('YouTube', 'यूट्यूब')}</span>
            </a>
            <a href='https://www.facebook.com/share/1E6U716f8p/' target='_blank' rel='noreferrer' aria-label='Visit EYEPEK on Facebook (opens in a new tab)' className='inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-100 transition hover:text-orange-300'>
              <FaFacebookF aria-hidden='true' className='h-3.5 w-3.5' /><span className='hidden sm:inline'>{t('Facebook', 'फेसबुक')}</span>
            </a>
            <a href='tel:7004374250' className='text-[11px] font-bold text-orange-300 transition hover:text-white'>{t('Call: 7004374250', 'कॉल: 7004374250')}</a>
          </div>
        </div>
      </div>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:px-10 md:py-4 lg:gap-5'>
        <Link to='/' onClick={closeMenu} aria-label='EYEPEK home' className='shrink-0'>
          <img src='/images/eyepek-logo.svg' alt='EYEPEK' className='block h-auto w-[150px] sm:w-[185px] md:w-[220px]' />
        </Link>
        <button type='button' aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-controls='primary-navigation' aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className='inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-950 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 lg:hidden'>
          <IoMdMenu className='h-7 w-7' />
        </button>
        <nav id='primary-navigation' className={`${isOpen ? 'flex' : 'hidden'} absolute left-0 top-full max-h-[calc(100dvh-105px)] w-full flex-col gap-1 overflow-y-auto border-t border-slate-100 bg-white px-4 py-4 font-semibold text-blue-950 shadow-xl sm:px-6 lg:max-h-none lg:overflow-visible lg:static lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-1 lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-slate-50 lg:px-2 lg:py-1.5 lg:shadow-sm`}>
          <Link to='/' onClick={closeMenu} className='rounded-xl px-4 py-3 text-sm font-bold transition duration-200 hover:bg-blue-100 hover:text-orange-700 lg:px-2.5 lg:py-2'>{t('Home', 'होम')}</Link>
          <a href='/#about' onClick={closeMenu} className='rounded-xl px-4 py-3 text-sm font-bold transition duration-200 hover:bg-blue-100 hover:text-orange-700 lg:px-3.5 lg:py-2.5'>{t('About', 'हमारे बारे में')}</a>
          <div className='relative w-full lg:w-auto'>
            <button type='button' onClick={() => { setGuidanceOpen(!guidanceOpen); setServicesOpen(false); setJourneyOpen(false); }} aria-expanded={guidanceOpen} aria-controls='guidance-dropdown' className='inline-flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold transition duration-200 hover:bg-blue-100 hover:text-orange-700 lg:w-auto lg:px-3.5 lg:py-2.5'>
              {t('Admission Help', 'प्रवेश सहायता')} <FaChevronDown aria-hidden='true' className={`h-3 w-3 transition-transform ${guidanceOpen ? 'rotate-180' : ''}`} />
            </button>
            <div id='guidance-dropdown' className={`${guidanceOpen ? 'block' : 'hidden'} mt-2 max-h-[55vh] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg lg:mt-4 lg:max-h-none lg:overflow-hidden lg:absolute lg:left-0 lg:top-full lg:mt-4 lg:w-80 lg:shadow-2xl`}>
              <div className='bg-blue-950 px-5 py-4 text-white'>
                <p className='text-xs font-semibold uppercase tracking-widest text-orange-300'>{t('EYEPEK Support', 'EYEPEK सहायता')}</p>
                <p className='mt-1 text-base font-bold'>{t('Guidance for your next step', 'आपके अगले कदम के लिए मार्गदर्शन')}</p>
                <p className='mt-1 text-xs font-normal leading-relaxed text-blue-100'>{t('Explore learning, career and admission support.', 'पढ़ाई, करियर और प्रवेश संबंधी सहायता देखें।')}</p>
              </div>
              <div className='p-2'>
                {guidanceLinks.map((item) => {
                  const Icon = item.icon;
                  return <a key={item.label} href={item.href} onClick={closeMenu} className='group flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-orange-50'><span className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900 transition group-hover:bg-orange-100 group-hover:text-orange-700'><Icon aria-hidden='true' className='h-4 w-4' /></span><span className='min-w-0'><span className='block text-sm font-semibold text-blue-950 group-hover:text-red-600'>{t(item.label, item.labelHi)}</span><span className='mt-0.5 block text-xs font-normal leading-relaxed text-slate-500'>{t(item.detail, item.detailHi)}</span></span></a>;
                })}
              </div>
              <a href='/#learning' onClick={closeMenu} className='flex items-center justify-between border-t border-slate-100 px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50'>{t('Explore all guidance', 'सभी मार्गदर्शन देखें')} <span aria-hidden='true'>→</span></a>
            </div>
          </div>
          <div className='relative w-full lg:w-auto'>
            <button type='button' onClick={() => { setServicesOpen(!servicesOpen); setGuidanceOpen(false); setJourneyOpen(false); }} aria-expanded={servicesOpen} aria-controls='services-dropdown' className='inline-flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold transition duration-200 hover:bg-blue-100 hover:text-orange-700 lg:w-auto lg:px-3.5 lg:py-2.5'>
              {t('Services', 'सेवाएँ')} <FaChevronDown aria-hidden='true' className={`h-3 w-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div id='services-dropdown' className={`${servicesOpen ? 'block' : 'hidden'} mt-2 max-h-56 min-w-64 overflow-y-auto rounded-xl border border-slate-100 bg-white py-2 shadow-lg lg:mt-3 lg:max-h-none lg:overflow-hidden lg:absolute lg:left-0 lg:top-full lg:mt-3 lg:w-72 lg:shadow-2xl`}>
              {serviceLinks.map((service) => <Link key={service.to} to={service.to} onClick={closeMenu} className='block px-4 py-3 text-sm font-medium text-blue-950 transition hover:bg-orange-50 hover:text-red-600'>{t(service.label, service.labelHi)}</Link>)}
              <a href='/#student-support' onClick={closeMenu} className='block border-t border-slate-100 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50'>{t('All services on homepage', 'होमपेज पर सभी सेवाएँ')}</a>
            </div>
          </div>
          <div className='relative w-full lg:w-auto'>
            <button type='button' onClick={() => { setJourneyOpen(!journeyOpen); setGuidanceOpen(false); setServicesOpen(false); }} aria-expanded={journeyOpen} aria-controls='journey-dropdown' className='inline-flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold transition duration-200 hover:bg-blue-100 hover:text-orange-700 lg:w-auto lg:px-3.5 lg:py-2.5'>
              {t('Resources', 'संसाधन')} <FaChevronDown aria-hidden='true' className={`h-3 w-3 transition-transform ${journeyOpen ? 'rotate-180' : ''}`} />
            </button>
            <div id='journey-dropdown' className={`${journeyOpen ? 'block' : 'hidden'} mt-2 max-h-[55vh] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg lg:mt-4 lg:max-h-none lg:overflow-hidden lg:absolute lg:right-0 lg:top-full lg:mt-4 lg:w-80`}>
              <div className='bg-blue-950 px-5 py-4 text-white'>
                <p className='text-xs font-semibold uppercase tracking-widest text-orange-300'>{t('Your future starts here', 'आपका भविष्य यहाँ से शुरू होता है')}</p>
                <p className='mt-1 text-base font-bold'>{t('Resources for students', 'छात्रों के लिए संसाधन')}</p>
                <p className='mt-1 text-xs font-normal leading-relaxed text-blue-100'>{t('Find your next step with EYEPEK.', 'EYEPEK के साथ अपना अगला कदम जानें।')}</p>
              </div>
              <div className='p-2'>
                {journeyLinks.map((item) => {
                  const Icon = item.icon;
                  return <a key={item.label} href={item.href} onClick={closeMenu} className='group flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-orange-50'><span className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900 transition group-hover:bg-orange-100 group-hover:text-orange-700'><Icon aria-hidden='true' className='h-4 w-4' /></span><span className='min-w-0'><span className='block text-sm font-semibold text-blue-950 group-hover:text-red-600'>{item.label}</span><span className='mt-0.5 block text-xs font-normal leading-relaxed text-slate-500'>{item.detail}</span></span></a>;
                })}
              </div>
              <a href='/#admissions' onClick={closeMenu} className='flex items-center justify-between border-t border-slate-100 px-5 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-50'>{t('Contact EYEPEK', 'EYEPEK से संपर्क करें')} <span aria-hidden='true'>→</span></a>
            </div>
          </div>
          <a href='/contact' onClick={closeMenu} className='mt-2 w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 transition duration-200 hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 lg:mt-0 lg:ml-2 lg:w-auto lg:px-5 lg:py-2.5'>{t('Admission Help', 'प्रवेश सहायता')}</a>
          <div className='pt-2 lg:hidden xl:block [&_a]:w-full [&_a]:justify-center'><InstallAppButton /></div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
