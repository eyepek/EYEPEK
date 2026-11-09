import React from 'react';
import { FaUniversity, FaFileAlt, FaGraduationCap, FaTools, FaArrowRight } from 'react-icons/fa';
import { courses } from '../courses';
import { useLanguage } from '../LanguageContext';

const highlights = [
  {
    number: '01',
    title: 'Tell us what you need', titleHi: 'अपनी ज़रूरत बताएँ',
    description: 'Whether it is education guidance, college documentation, IT help, or a business requirement, start by sharing what you are looking for.', descriptionHi: 'शिक्षा, कॉलेज के दस्तावेज़, आईटी या व्यवसाय—बताएँ कि आपको किस मदद की ज़रूरत है।',
    color: 'border-orange-500',
    accent: 'bg-orange-500',
    href: '#student-support',
    linkLabel: 'Explore our services', linkLabelHi: 'हमारी सेवाएँ देखें',
  },
  {
    number: '02',
    title: 'Get clear, practical guidance', titleHi: 'स्पष्ट और उपयोगी मार्गदर्शन पाएँ',
    description: 'Understand the available options, important requirements, documents, and the next steps before you move ahead.', descriptionHi: 'आगे बढ़ने से पहले विकल्प, ज़रूरी शर्तें, दस्तावेज़ और अगले कदम समझें।',
    color: 'border-red-600',
    accent: 'bg-red-600',
    href: '/contact',
    linkLabel: 'Talk to our team', linkLabelHi: 'हमारी टीम से बात करें',
  },
  {
    number: '03',
    title: 'Move forward with confidence', titleHi: 'आत्मविश्वास से आगे बढ़ें',
    description: 'Get support shaped around your needs, with clear communication and a practical way forward.', descriptionHi: 'अपनी ज़रूरत के मुताबिक सहायता और आगे बढ़ने का व्यावहारिक रास्ता पाएँ।',
    color: 'border-blue-700',
    accent: 'bg-blue-700',
    href: '/contact',
    linkLabel: 'Get in touch', linkLabelHi: 'संपर्क करें',
  },
];

const serviceCategories = [
  {
    number: '01',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Students studying together on campus',
    title: 'Education, Online Tutoring & Student Support', titleHi: 'शिक्षा, ऑनलाइन ट्यूटरिंग और छात्र सहायता',
    slug: 'education',
    label: 'For students', labelHi: 'छात्रों के लिए',
    description: 'Course and career guidance, admission assistance, online tutoring, homework help, and learning support for school, college, and competitive-exam students.', descriptionHi: 'स्कूल, कॉलेज और प्रतियोगी परीक्षाओं के विद्यार्थियों के लिए कोर्स व करियर मार्गदर्शन, प्रवेश सहायता, ऑनलाइन ट्यूशन, होमवर्क और पढ़ाई में मदद।',
    includes: ['Online one-to-one and group tutoring', 'School, college and exam learning support', 'Course, career and admission guidance', 'Study plans, assignments and doubt-solving'], includesHi: ['वन-टू-वन और ग्रुप ऑनलाइन ट्यूशन', 'स्कूल, कॉलेज और परीक्षा की पढ़ाई में मदद', 'कोर्स, करियर और प्रवेश मार्गदर्शन', 'स्टडी प्लान, असाइनमेंट और डाउट सॉल्विंग'],
    color: 'border-blue-700',
  },
  {
    number: '02',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Business documents arranged on a desk',
    title: 'College Affiliation & AICTE Support', titleHi: 'कॉलेज संबद्धता और AICTE सहायता',
    slug: 'business-support',
    label: 'For colleges and institutions', labelHi: 'कॉलेजों और संस्थानों के लिए',
    description: 'Process and documentation guidance for affiliation, AICTE-related paperwork, compliance, and renewals.', descriptionHi: 'कॉलेज संबद्धता, जहाँ लागू हो AICTE प्रक्रिया, अनुपालन और नवीनीकरण के लिए मार्गदर्शन।',
    includes: ['College affiliation process guidance', 'AICTE-related documentation support', 'Compliance, renewal and institution paperwork'], includesHi: ['कॉलेज संबद्धता प्रक्रिया का मार्गदर्शन', 'AICTE से जुड़े दस्तावेज़ों में सहायता', 'अनुपालन, नवीनीकरण और संस्थान के कागज़ात'],
    color: 'border-orange-500',
  },
  {
    number: '03',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'IT technician working with computer equipment',
    title: 'IT, Website Development & Data Support', titleHi: 'आईटी, वेबसाइट डेवलपमेंट और डेटा सहायता',
    slug: 'it-support',
    label: 'Technology and repairs', labelHi: 'तकनीक और मरम्मत',
    description: 'Technology services including computer support, professional website design and development, business data handling, and digital solutions.', descriptionHi: 'कंप्यूटर सहायता, प्रोफेशनल वेबसाइट डिजाइन व डेवलपमेंट, बिजनेस डेटा मैनेजमेंट और डिजिटल समाधान।',
    includes: ['Website design, development and maintenance', 'Excel, data entry and data organisation', 'Computer, laptop and software support', 'Networking, printer, CCTV and remote IT help'], includesHi: ['वेबसाइट डिजाइन, डेवलपमेंट और मेंटेनेंस', 'Excel, डेटा एंट्री और डेटा व्यवस्थित करना', 'कंप्यूटर, लैपटॉप और सॉफ्टवेयर सहायता', 'नेटवर्किंग, प्रिंटर, CCTV और रिमोट IT मदद'],
    color: 'border-red-600',
  },
  {
    number: '04',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Electrician working on a home installation',
    title: 'Home Services', titleHi: 'घरेलू सेवाएँ',
    slug: 'home-services',
    label: 'Help around the home', labelHi: 'घर के कामों में सहायता',
    description: 'Get help coordinating everyday home maintenance, installation, and repair requests.', descriptionHi: 'घर के रखरखाव, फिटिंग और मरम्मत के कामों के लिए सहायता पाएँ।',
    includes: ['Plumbing and electrician services', 'Fan, light and appliance installation', 'AC support and home maintenance'], includesHi: ['प्लंबिंग और इलेक्ट्रीशियन सेवाएँ', 'पंखा, लाइट और उपकरण लगाना', 'AC सहायता और घर का रखरखाव'],
    color: 'border-blue-700',
  },
];

const courseDescriptions = {
  BBA: ['Business foundations: management, marketing, finance and how organisations work.', 'व्यवसाय की बुनियाद: प्रबंधन, मार्केटिंग, वित्त और संस्थान कैसे काम करते हैं।'],
  BCA: ['Computing foundations: programming, software concepts and digital systems.', 'कंप्यूटिंग की बुनियाद: प्रोग्रामिंग, सॉफ्टवेयर की समझ और डिजिटल सिस्टम।'],
  MBA: ['Advanced business study for learners interested in management and leadership.', 'प्रबंधन और नेतृत्व में रुचि रखने वालों के लिए उन्नत व्यवसाय अध्ययन।'],
  MCA: ['Advanced study in computing, software development and technology applications.', 'कंप्यूटिंग, सॉफ्टवेयर विकास और तकनीकी अनुप्रयोगों का उन्नत अध्ययन।'],
  ANM: ['Nursing and community health study. Check course recognition and eligibility with the institution.', 'नर्सिंग और सामुदायिक स्वास्थ्य का अध्ययन। कोर्स की मान्यता और पात्रता संस्थान से जाँचें।'],
  GNM: ['General nursing study and patient-care foundations. Confirm current requirements with the institution.', 'सामान्य नर्सिंग और रोगी-देखभाल की बुनियाद। वर्तमान आवश्यकताएँ संस्थान से पक्की करें।'],
  'B.Sc. (Nursing)': ['Undergraduate nursing study combining health sciences and clinical learning.', 'स्वास्थ्य विज्ञान और क्लिनिकल सीख को जोड़ने वाला स्नातक नर्सिंग कोर्स।'],
};
const HomePage = () => {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const t = (english, hindi) => hi ? hindi : english;
  return (
  <main className='bg-white text-slate-900'>
    <section className='relative isolate min-h-[520px] overflow-hidden bg-blue-950 text-white md:min-h-[560px]'>
      <img
        className='absolute inset-0 -z-20 h-full w-full object-cover'
        src='/images/students-campus.jpg'
        alt='Students studying together outdoors in a campus setting (illustrative photo)'
      />
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/95 via-blue-950/80 to-red-950/45' />
      <div className='mx-auto grid min-h-[520px] max-w-7xl items-center gap-8 px-6 py-10 md:min-h-[560px] md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-12'>
        <div className='max-w-3xl'>
          <p className='mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-200 backdrop-blur-sm sm:text-sm'>
            <span className='h-2 w-2 rounded-full bg-orange-400' /> EYEPEK
          </p>
          <h1 className='text-4xl font-black leading-tight sm:text-5xl md:text-7xl'>
            {hi ? <>छात्रों को आगे बढ़ाएँ।<br />कॉलेजों को सहयोग दें।<br />हर कदम आसान बनाएँ।</> : <>Empowering <span className='text-orange-300'>Students.</span><br />Supporting Colleges.<br />Simplifying Every Step.</>}
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl'>
            {t('Your trusted support partner for course and admission guidance, college affiliation documentation, and practical technology and business services. Explore your options, understand the process, and get clear support at every step.', 'कोर्स और प्रवेश मार्गदर्शन, कॉलेज संबद्धता के दस्तावेज़ तथा तकनीकी और व्यवसाय सेवाओं के लिए EYEPEK आपका सहयोगी है। विकल्प समझें और हर कदम पर साफ़ सहायता पाएँ।')}
          </p>
          <div className='mt-9 flex flex-wrap gap-4'>
            <a href='#admissions' className='rounded-md bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-400'>{t('Explore Education Services', 'शिक्षा सेवाएँ देखें')} <span aria-hidden='true'>→</span></a>
            <a href='/contact' className='rounded-md border border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950'>{t("Send an enquiry","सवाल पूछें")}</a>
            <a href='tel:7004374250' className='rounded-md px-3 py-3.5 font-bold text-white underline decoration-white/50 underline-offset-4 transition hover:text-orange-200'>{t("Speak with our team","हमारी टीम से बात करें")}</a>
          </div>
          <div className='mt-10 flex flex-wrap gap-2 border-t border-white/25 pt-5 text-sm font-semibold text-blue-50'>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>{t("Admissions & Documents","प्रवेश और दस्तावेज़")}</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>{t("College Affiliation","कॉलेज संबद्धता")}</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>{t("AICTE-Related Guidance","AICTE प्रक्रिया मार्गदर्शन")}</span>
          </div>
        </div>
        <aside className='hidden md:block'>
          <div className='relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl shadow-blue-950/30 backdrop-blur-md lg:p-8'>
            <div className='absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-400/20 blur-2xl' aria-hidden='true' />
            <p className='relative text-xs font-extrabold uppercase tracking-[0.2em] text-orange-200'>{t("How EYEPEK helps","EYEPEK कैसे मदद करता है")}</p>
            <h2 className='relative mt-3 text-2xl font-extrabold leading-snug text-white lg:text-3xl'>{t("The right guidance for your next step","आपके अगले कदम के लिए सही मार्गदर्शन")}</h2>
            <div className='relative mt-7 space-y-3'>
              {[
                ['01', t('For students', 'छात्रों के लिए'), t('Course selection, eligibility, admission steps and career guidance', 'कोर्स चयन, पात्रता, प्रवेश प्रक्रिया और करियर मार्गदर्शन')],
                ['02', t('For institutions', 'संस्थानों के लिए'), t('Affiliation process guidance and organised documentation support', 'संबद्धता प्रक्रिया और ऑनलाइन ट्यूशन और पढ़ाई में मदद')],
                ['03', t('For organisations', 'संगठनों के लिए'), t('Compliance paperwork, renewals and practical technology support', 'अनुपालन कागज़ात, नवीनीकरण और तकनीकी सहायता')],
              ].map(([number, title, description]) => (
                <div key={number} className='flex gap-4 rounded-2xl border border-white/15 bg-blue-950/35 p-4'>
                  <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 font-black text-white'>{number}</span>
                  <div>
                    <h3 className='font-bold text-white'>{title}</h3>
                    <p className='mt-1 text-sm leading-6 text-blue-100'>{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href='#student-support' className='relative mt-6 inline-flex items-center gap-2 font-bold text-orange-200 transition hover:text-white'>{t('Browse all services', 'सभी सेवाएँ देखें')} <FaArrowRight aria-hidden='true' /></a>
          </div>
        </aside>
      </div>
    </section>


    <section id="national-services" className="bg-white px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-orange-600">{t("One platform. Complete support solutions.", "एक प्लेटफॉर्म। हर जरूरत के लिए सहायता।")}</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-blue-950 md:text-5xl">{t("Education, learning and technology services—all in one place.", "शिक्षा, सीखने और तकनीक की सेवाएँ—एक ही जगह।")}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{t("Choose the EYEPEK division that matches your requirement. Share an enquiry online and our team will confirm the scope, availability, service location and quotation before work begins.", "अपनी जरूरत के अनुसार EYEPEK का विभाग चुनें। ऑनलाइन पूछताछ भेजें; काम शुरू होने से पहले हमारी टीम सेवा, उपलब्धता, स्थान और शुल्क की पुष्टि करेगी।")}</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="group overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-lg shadow-blue-950/5">
            <div className="relative h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85" alt={t("Students collaborating on a campus", "कैंपस में साथ पढ़ते विद्यार्थी")} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 to-transparent" />
              <p className="absolute bottom-5 left-6 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">{t("Division 01", "विभाग 01")}</p>
            </div>
            <div className="p-7 md:p-9">
              <h3 className="text-2xl font-black text-blue-950 md:text-3xl">{t("EYEPEK Education Services", "EYEPEK Education Services")}</h3>
              <p className="mt-3 leading-7 text-slate-600">{t("Student guidance, online tutoring and organised academic support for learners at every stage.", "हर स्तर के विद्यार्थियों के लिए मार्गदर्शन, ऑनलाइन ट्यूशन और व्यवस्थित शैक्षणिक सहायता।")}</p>
              <ul className="mt-6 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                {[t("Course & admission guidance", "कोर्स और प्रवेश मार्गदर्शन"), t("Online tutoring & doubt-solving", "कॉलेज संबद्धता दस्तावेज़"), t("School, college & exam support", "अनुपालन और नवीनीकरण सहायता"), t("Study plans & assignment guidance", "संस्थान की वेबसाइट सहायता")].map(item => <li key={item} className="flex gap-2"><span className="text-orange-600">✓</span>{item}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/services/education" className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-3 font-bold text-white transition hover:bg-blue-800">{t("Student Guidance", "छात्र मार्गदर्शन")} <FaArrowRight aria-hidden="true" /></a>
                <a href="/services/business-support" className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 font-bold text-blue-950 transition hover:bg-blue-50">{t("Institution Support", "संस्थान सहायता")} <FaArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </article>
          <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-lg shadow-blue-950/5">
            <div className="relative h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=85" alt={t("IT technician working with computer equipment", "कंप्यूटर उपकरणों पर काम करते IT तकनीशियन")} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 to-transparent" />
              <p className="absolute bottom-5 left-6 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">{t("Division 02", "विभाग 02")}</p>
            </div>
            <div className="p-7 md:p-9">
              <h3 className="text-2xl font-black text-blue-950 md:text-3xl">{t("EYEPEK IT Solutions", "EYEPEK IT Solutions")}</h3>
              <p className="mt-3 leading-7 text-slate-600">{t("Digital and technical solutions for individuals, students, offices and businesses—from computer support to websites and data services.", "व्यक्तियों, विद्यार्थियों, कार्यालयों और व्यवसायों के लिए कंप्यूटर, वेबसाइट और डेटा से जुड़े डिजिटल समाधान।")}</p>
              <ul className="mt-6 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                {[t("Website design & development", "कंप्यूटर और लैपटॉप सहायता"), t("Data entry & Excel support", "सॉफ्टवेयर और Windows सेटअप"), t("Computer & software support", "नेटवर्किंग, प्रिंटर और CCTV"), t("Networking, printer & remote IT", "वेबसाइट, रिमोट सहायता और AMC")].map(item => <li key={item} className="flex gap-2"><span className="text-orange-600">✓</span>{item}</li>)}
              </ul>
              <a href="/services/it-support" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400">{t("Explore IT Solutions", "IT सेवाएँ देखें")} <FaArrowRight aria-hidden="true" /></a>
            </div>
          </article>
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-blue-950 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-300">{t("Support for students, institutions and businesses", "छात्रों, संस्थानों और व्यवसायों के लिए सहायता")}</p>
            <h3 className="mt-2 text-xl font-bold md:text-2xl">{t("Tell us what you need. We will help you plan the next step.", "अपनी जरूरत बताएँ। हम अगला कदम तय करने में मदद करेंगे।")}</h3>
            <p className="mt-2 text-sm leading-6 text-blue-100">{t("Service availability depends on the type of work and location. We confirm this before accepting a booking.", "सेवा की उपलब्धता काम और स्थान पर निर्भर करेगी। बुकिंग स्वीकार करने से पहले इसकी पुष्टि की जाएगी।")}</p>
          </div>
          <a href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-950 transition hover:bg-orange-100">{t("Send an enquiry", "पूछताछ भेजें")} <FaArrowRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section id='learning' className='overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <div className='grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>{t("Guidance that moves education forward","शिक्षा में आगे बढ़ने का मार्गदर्शन")}</p>
            <h2 className='mt-3 text-3xl font-extrabold leading-tight text-blue-950 md:text-4xl'>{t("Supporting students. Strengthening institutions.","छात्रों को सहयोग, संस्थानों को मज़बूती।")}</h2>
          </div>
          <p className='max-w-2xl text-lg leading-8 text-slate-600'>
            {t('From choosing the right course to navigating college affiliation and compliance documentation, EYEPEK provides clear information, practical guidance, and organised support at every step. We help students move forward with confidence and assist institutions with affiliation, approval-process documentation, compliance, and renewal requirements. Final decisions and approvals rest with the relevant university or regulatory authority.', 'सही कोर्स चुनने से लेकर कॉलेज संबद्धता और अनुपालन के दस्तावेज़ समझने तक, EYEPEK स्पष्ट जानकारी और व्यवस्थित मार्गदर्शन देता है। अंतिम निर्णय और मंज़ूरी संबंधित विश्वविद्यालय या नियामक प्राधिकरण के होते हैं।')}
          </p>
        </div>
        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {highlights.map((item) => (
            <article key={item.number} className={`group relative overflow-hidden rounded-2xl border border-white/80 border-t-4 ${item.color} bg-white p-5 shadow-md shadow-blue-950/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10`}>
              <div className='flex items-center justify-between'>
                <span className={`h-1.5 w-12 rounded-full ${item.accent}`} aria-hidden='true' />
                <p className='text-sm font-black tracking-[0.18em] text-slate-400'>{item.number}</p>
              </div>
              <h3 className='mt-5 text-xl font-bold text-blue-950'>{t(item.title, item.titleHi)}</h3>
              <p className='mt-3 min-h-14 leading-7 text-slate-600'>{t(item.description, item.descriptionHi)}</p>
              <a href={item.href} className='mt-6 inline-flex items-center gap-2 font-bold text-blue-900 transition group-hover:text-orange-600'>{t(item.linkLabel, item.linkLabelHi)} <span aria-hidden='true'>→</span></a>
            </article>
          ))}
        </div>
        <div className='mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <h3 className='font-bold text-blue-950'>{t("Not sure which course may suit you?","कौन-सा कोर्स आपके लिए सही है, समझ नहीं आ रहा?")}</h3>
            <p className='mt-1 text-sm leading-6 text-slate-600'>{t("Answer a few quick questions to explore course options, then read our practical student guides.","कोर्स विकल्प जानने के लिए कुछ सवालों के जवाब दें, फिर छात्र मार्गदर्शिकाएँ देखें।")}</p>
          </div>
          <div className='flex shrink-0 flex-wrap gap-3'>
            <a href='/course-finder' className='inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600'>{t('Find a course', 'कोर्स खोजें')} <FaArrowRight aria-hidden='true' /></a>
            <a href='/guides' className='inline-flex items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-bold text-blue-900 transition hover:bg-blue-50'>{t("Read student guides","छात्र मार्गदर्शिकाएँ पढ़ें")}</a>
          </div>
        </div>
      </div>
    </section>

    <section id='student-support' className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60'>
      <div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl' aria-hidden='true' />
      <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl' aria-hidden='true' />
      <div className='relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700'>
              <span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' />
              One team · many solutions
            </p>
            <h2 className='mt-3 text-3xl font-extrabold leading-tight text-blue-950 md:text-4xl'>{t('Our', 'हमारी')} <span className='text-orange-500'>{t('Services', 'सेवाएँ')}</span></h2>
            <p className='mt-2 max-w-2xl text-base leading-7 text-slate-600'>{t('Explore education, online tutoring, institution support, website development, data services, IT support, and other practical solutions.', 'शिक्षा, ऑनलाइन ट्यूशन, संस्थान सहायता, वेबसाइट डेवलपमेंट, डेटा सेवाएँ, IT सहायता और अन्य समाधान देखें।')}</p>
          </div>
          <a href='/contact' className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>
            {t('Request a service', 'सेवा के लिए पूछें')} <FaArrowRight aria-hidden='true' />
          </a>
        </div>
        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          {serviceCategories.map((item) => (
            <article key={item.slug} className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 border-t-4 ${item.color} bg-white/95 shadow-sm shadow-blue-950/5 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-blue-950/10`}>
              <div className='relative h-48 overflow-hidden bg-blue-50 sm:h-56'>
                <img src={item.image} alt={item.imageAlt} loading='lazy' className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-gradient-to-t from-blue-950/55 via-transparent to-transparent' />
                <span className='absolute bottom-3 left-4 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-blue-950 shadow-sm'>{item.number}</span>
              </div>
              <div className='flex flex-1 flex-col p-6'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-800 ring-1 ring-blue-100 transition group-hover:bg-orange-50 group-hover:text-orange-600'>
                    {item.slug === 'education' ? <FaGraduationCap aria-hidden='true' /> : item.slug === 'business-support' ? <FaUniversity aria-hidden='true' /> : item.slug === 'it-support' ? <FaTools aria-hidden='true' /> : <FaFileAlt aria-hidden='true' />}
                  </div>
                  <span className='rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700'>{t(item.label, item.labelHi)}</span>
                </div>
                <h3 className='mt-5 text-xl font-extrabold leading-snug text-blue-950 transition group-hover:text-blue-700'>{t(item.title, item.titleHi)}</h3>
                <p className='mt-2 text-[0.95rem] leading-7 text-slate-600'>{t(item.description, item.descriptionHi)}</p>
                <ul className='mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2'>
                  {item.includes.map((service, index) => <li key={service} className='flex items-start gap-2'><span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500' aria-hidden='true' />{t(service, item.includesHi[index])}</li>)}
                </ul>
                <a href={`/services/${item.slug}`} className='mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 font-bold text-blue-900 transition hover:border-orange-200 hover:bg-orange-50 group-hover:text-orange-700'>
                  {t('View service details', 'सेवा की जानकारी देखें')} <FaArrowRight className='transition-transform group-hover:translate-x-1' aria-hidden='true' />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className='mt-8 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <p className='font-bold text-blue-950'>{t("Let’s find the right support for you.","आपके लिए सही सहायता ढूँढ़ते हैं।")}</p>
            <p className='mt-1 text-sm leading-6 text-slate-600'>{t('Whether you’re a student or an institution, our team is here to understand your needs and help you take the next step with confidence.', 'चाहे आप छात्र हों या संस्थान, हमारी टीम आपकी ज़रूरत समझकर अगले कदम में मदद करेगी।')}</p>
          </div>
          <a href='tel:7004374250' className='inline-flex shrink-0 items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-bold text-blue-900 transition hover:border-orange-300 hover:bg-orange-50'>
            {t('Call 7004374250', '7004374250 पर कॉल करें')}
          </a>
        </div>
        <p className='mt-6 text-sm leading-6 text-slate-500'>{t('EYEPEK provides guidance and documentation assistance for affiliation and compliance processes. All approvals and affiliation decisions are made independently by the concerned university or regulatory authority.', 'EYEPEK संबद्धता और अनुपालन की प्रक्रिया व दस्तावेज़ों में मार्गदर्शन देता है। मंज़ूरी का निर्णय संबंधित विश्वविद्यालय या नियामक प्राधिकरण करता है।')}</p>
      </div>
    </section>


    <section id='support-guide' className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <p className='text-sm font-extrabold uppercase tracking-[0.18em] text-orange-700'>{t('A simple guide', 'आसान भाषा में समझें')}</p>
        <h2 className='mt-3 max-w-4xl text-3xl font-extrabold text-blue-950 md:text-4xl'>{t('What do admission, affiliation and document support mean?', 'प्रवेश, संबद्धता और दस्तावेज़ सहायता का क्या मतलब है?')}</h2>
        <p className='mt-3 max-w-3xl leading-7 text-slate-600'>{t('See what EYEPEK can help you understand—and what the college or authority decides.', 'जानें कि EYEPEK आपको क्या समझने में मदद कर सकता है और कॉलेज या प्राधिकरण का निर्णय क्या होता है।')}</p>
        <div className='mt-8 grid gap-5 lg:grid-cols-3'>
          <article className='rounded-2xl border border-orange-100 bg-orange-50/50 p-6'>
            <span className='text-xs font-black uppercase tracking-widest text-orange-700'>{t('For students', 'छात्रों के लिए')}</span>
            <h3 className='mt-2 text-xl font-extrabold text-blue-950'>{t('Admission guidance', 'प्रवेश मार्गदर्शन')}</h3>
            <p className='mt-3 leading-7 text-slate-700'>{t('Admission means applying to a course at a college. We can help you compare course options, understand what to ask about eligibility, fees and dates, and prepare a document checklist. The college confirms availability and makes the admission decision.', 'प्रवेश का मतलब कॉलेज के किसी कोर्स में आवेदन करना है। हम कोर्स विकल्प समझने, पात्रता, फीस और तारीखों के बारे में पूछने वाले सवाल तैयार करने और दस्तावेज़ों की सूची बनाने में मदद कर सकते हैं। कोर्स की उपलब्धता और प्रवेश का निर्णय कॉलेज तय करता है।')}</p>
            <ol className='mt-4 space-y-2 text-sm leading-6 text-slate-700'>
              <li>{t('1. Choose a course and shortlist colleges.', '1. कोर्स चुनें और कॉलेजों की सूची बनाएँ।')}</li>
              <li>{t('2. Confirm eligibility, fees and deadlines with the college.', '2. पात्रता, फीस और आखिरी तारीख कॉलेज से पक्की करें।')}</li>
              <li>{t('3. Prepare documents using the college checklist.', '3. कॉलेज की सूची के अनुसार दस्तावेज़ तैयार करें।')}</li>
              <li>{t('4. Apply to the institution and follow its instructions.', '4. संस्थान में आवेदन करें और उसके निर्देशों का पालन करें।')}</li>
            </ol>
          </article>
          <article className='rounded-2xl border border-blue-100 bg-blue-50/50 p-6'>
            <span className='text-xs font-black uppercase tracking-widest text-blue-700'>{t('For colleges', 'कॉलेजों के लिए')}</span>
            <h3 className='mt-2 text-xl font-extrabold text-blue-950'>{t('Affiliation & AICTE', 'संबद्धता और AICTE')}</h3>
            <p className='mt-3 leading-7 text-slate-700'>{t('University affiliation is a formal relationship that lets a college offer specified courses under that university’s rules. AICTE approval is a separate requirement where regulations apply; one does not automatically replace the other.', 'विश्वविद्यालय संबद्धता एक औपचारिक संबंध है, जिसके तहत कॉलेज उस विश्वविद्यालय के नियमों के अनुसार तय कोर्स चलाता है। जहाँ नियम लागू हों, AICTE की मंज़ूरी अलग आवश्यकता है; एक प्रक्रिया दूसरी की जगह अपने-आप नहीं लेती।')}</p>
            <p className='mt-3 leading-7 text-slate-700'>{t('EYEPEK can help institutions understand the process, organise records and prepare questions for the university or regulator. The relevant authority reviews applications and makes all approval decisions.', 'EYEPEK संस्थानों को प्रक्रिया समझने, रिकॉर्ड व्यवस्थित करने और विश्वविद्यालय या नियामक से पूछे जाने वाले सवाल तैयार करने में मदद कर सकता है। आवेदन की जाँच और मंज़ूरी का निर्णय संबंधित प्राधिकरण करता है।')}</p>
          </article>
          <article className='rounded-2xl border border-slate-200 bg-slate-50 p-6'>
            <span className='text-xs font-black uppercase tracking-widest text-slate-600'>{t('For every application', 'हर आवेदन के लिए')}</span>
            <h3 className='mt-2 text-xl font-extrabold text-blue-950'>{t('Document support', 'दस्तावेज़ सहायता')}</h3>
            <p className='mt-3 leading-7 text-slate-700'>{t('A checklist helps you prepare; it does not mean every item is required everywhere. Student applications may ask for identity proof, photos, marksheets or certificates. College applications may need institutional records. Requirements vary by course, college, university and year.', 'चेकलिस्ट तैयारी में मदद करती है; इसका मतलब यह नहीं कि हर दस्तावेज़ हर जगह ज़रूरी होगा। छात्र आवेदन में पहचान-पत्र, फोटो, अंकपत्र या प्रमाणपत्र माँगे जा सकते हैं। कॉलेज आवेदन में संस्थान के रिकॉर्ड लग सकते हैं। ज़रूरतें कोर्स, कॉलेज, विश्वविद्यालय और वर्ष के अनुसार बदलती हैं।')}</p>
            <p className='mt-3 font-semibold leading-7 text-blue-950'>{t('Always check the latest list from the institution or authority before submitting documents.', 'दस्तावेज़ जमा करने से पहले संस्थान या प्राधिकरण की नवीनतम सूची ज़रूर देखें।')}</p>
          </article>
        </div>
      </div>
    </section>

    <section id='about' className='relative isolate overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-orange-50/70'>
      <div className='pointer-events-none absolute -right-24 -top-16 -z-10 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl' aria-hidden='true' />
      <div className='pointer-events-none absolute -bottom-24 -left-20 -z-10 h-80 w-80 rounded-full bg-blue-100/80 blur-3xl' aria-hidden='true' />
      <div className='mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20'>
        <div className='grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16'>
          <figure className='group relative'>
            <div className='absolute -inset-3 rounded-[2rem] border border-orange-200/80 rotate-2' aria-hidden='true' />
            <div className='relative overflow-hidden rounded-[1.75rem] bg-blue-950 shadow-2xl shadow-blue-950/20'>
              <img className='block aspect-[4/3] max-h-[34rem] w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]' src='/images/eyepek-about-guidance.png' alt='Representative photo of an adviser discussing study plans with two Indian students' loading='lazy' />
              <div className='absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/5 to-transparent' aria-hidden='true' />
              <figcaption className='absolute inset-x-0 bottom-0 px-6 py-6 text-white sm:px-8 sm:py-8'>
                <span className='inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-200 backdrop-blur'>{t("About EYEPEK","EYEPEK के बारे में")}</span>
                <p className='mt-3 max-w-md text-2xl font-black leading-tight sm:text-3xl'>{t("Admissions. Affiliation. Document support.","प्रवेश। संबद्धता। दस्तावेज़ सहायता।")}</p>
              </figcaption>
            </div>
          </figure>

          <div>
            <p className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-800 shadow-sm'>
              <span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' /> Our main support
            </p>
            <h2 className='mt-5 text-3xl font-black leading-tight tracking-tight text-blue-950 sm:text-4xl md:text-5xl'>
              {t('Admission and', 'प्रवेश और')} <span className='text-orange-500'>{t('college affiliation', 'कॉलेज संबद्धता')}</span> {t('guidance.', 'मार्गदर्शन।')}
            </h2>
            <p className='mt-4 text-base leading-7 text-slate-600 sm:text-lg'>
              {t('EYEPEK helps students understand course admissions and prepare documents. We also guide colleges through affiliation processes and AICTE-related documentation. IT, computer, business, and home services are available too.', 'EYEPEK छात्रों को प्रवेश प्रक्रिया और दस्तावेज़ समझने में मदद करता है। कॉलेजों को संबद्धता और AICTE से जुड़े दस्तावेज़ों में मार्गदर्शन मिलता है। IT, कंप्यूटर, व्यवसाय और घरेलू सेवाएँ भी उपलब्ध हैं।')}
            </p>

            <div className='mt-7 space-y-3'>
              <article className='flex gap-4 rounded-2xl border border-orange-200 bg-white p-4 shadow-md shadow-orange-950/5'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-700'><FaGraduationCap aria-hidden='true' /></span>
                <div>
                  <h3 className='font-extrabold text-blue-950'>{t('Admission & Documents Support', 'प्रवेश और दस्तावेज़ सहायता')}</h3>
                  <p className='mt-1 text-sm leading-6 text-slate-600'>{t('Course guidance, application steps, eligibility questions, and admission document checklists.', 'कोर्स, आवेदन के चरण, पात्रता संबंधी सवाल और प्रवेश दस्तावेज़ चेकलिस्ट में मदद।')}</p>
                </div>
              </article>
              <article className='flex gap-4 rounded-2xl border border-blue-200 bg-white p-4 shadow-md shadow-blue-950/5'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-800'><FaUniversity aria-hidden='true' /></span>
                <div>
                  <h3 className='font-extrabold text-blue-950'>{t('College Affiliation & AICTE Documentation', 'कॉलेज संबद्धता और AICTE दस्तावेज़ सहायता')}</h3>
                  <p className='mt-1 text-sm leading-6 text-slate-600'>{t('Process guidance, document organisation, compliance paperwork, and renewal support for colleges.', 'कॉलेजों के लिए प्रक्रिया समझना, रिकॉर्ड व्यवस्थित करना, अनुपालन के कागज़ात और नवीनीकरण सहायता।')}</p>
                </div>
              </article>
            </div>
            <div className='mt-5 rounded-xl border border-slate-200 bg-white/80 p-4'>
              <p className='text-sm font-bold text-blue-950'>{t("Also available","अन्य उपलब्ध सेवाएँ")}</p>
              <p className='mt-1 text-sm leading-6 text-slate-600'>{t("IT and computer support, business documentation, and home services.","आईटी और कंप्यूटर सहायता, व्यवसाय दस्तावेज़ और घरेलू सेवाएँ।")}</p>
              <a href='#student-support' className='mt-2 inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-orange-600'>{t('See all services', 'सभी सेवाएँ देखें')} <FaArrowRight aria-hidden='true' /></a>
            </div>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <a href='#admissions' className='inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>{t('Admission support', 'प्रवेश सहायता')} <FaArrowRight aria-hidden='true' /></a>
              <a href='/services/business-support' className='inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3.5 font-bold text-blue-900 transition hover:bg-blue-50'>{t('College support', 'कॉलेज सहायता')} <FaArrowRight aria-hidden='true' /></a>
            </div>
            <p className='mt-5 text-xs leading-5 text-slate-500'>{t('EYEPEK provides process and documentation guidance. Admissions, affiliation, AICTE decisions, and approvals are made by the relevant institution or authority.', 'EYEPEK प्रक्रिया और दस्तावेज़ों में मार्गदर्शन देता है। प्रवेश, संबद्धता, AICTE और मंज़ूरी के निर्णय संबंधित संस्थान या प्राधिकरण लेते हैं।')}</p>
          </div>
        </div>
      </div>
    </section>

    <section id='campus' className='overflow-hidden bg-slate-50'>
      <div className='mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20'>
        <div className='grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14'>
          <div>
            <p className='inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-800'>
              <FaGraduationCap aria-hidden='true' /> {t("Build your future with EYEPEK","EYEPEK के साथ भविष्य बनाएँ")}
            </p>
            <h2 className='mt-5 text-3xl font-extrabold leading-tight text-blue-950 sm:text-4xl md:text-5xl'>{t("From course choice to admission, know your next step.","कोर्स चुनने से प्रवेश तक—अपना अगला कदम समझें।")}</h2>
            <p className='mt-5 max-w-xl text-lg leading-8 text-slate-600'>{t("Explore course options, check what to ask the college, and get your documents ready. We make the process easier to understand, one step at a time.","कोर्स के विकल्प जानें, कॉलेज से पूछने वाली बातें समझें और दस्तावेज़ तैयार करें। हम पूरी प्रक्रिया को आसान चरणों में समझने में मदद करते हैं।")}</p>
            <ol className='mt-7 grid gap-3 sm:grid-cols-2'>
              {[
                [t("Choose a course","कोर्स चुनें"), t("Explore options that match your interests.","अपनी रुचि के अनुसार विकल्प देखें।")],
                [t("Check with the college","कॉलेज से पुष्टि करें"), t("Ask about eligibility, fees and dates.","पात्रता, फीस और तारीखें पूछें।")],
                [t("Prepare your documents","दस्तावेज़ तैयार करें"), t("Use the latest checklist from the college.","कॉलेज की नई चेकलिस्ट देखें।")],
                [t("Apply with confidence","आत्मविश्वास से आवेदन करें"), t("Follow the institution’s application steps.","संस्थान के आवेदन चरणों का पालन करें।")],
              ].map(([title, description], index) => (
                <li key={title} className='flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-extrabold text-blue-900'>{index + 1}</span>
                  <span><strong className='block text-sm text-blue-950'>{title}</strong><span className='mt-1 block text-xs leading-5 text-slate-600'>{description}</span></span>
                </li>
              ))}
            </ol>
            <a href='#admissions' className='mt-8 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-orange-600'>{t('Explore courses & admission help', 'कोर्स और प्रवेश सहायता देखें')} <span aria-hidden='true'>→</span></a>
            <p className='mt-3 text-xs leading-5 text-slate-500'>{t("Eligibility, fees and admission decisions are confirmed by each college.","पात्रता, फीस और प्रवेश का निर्णय संबंधित कॉलेज तय करता है।")}</p>
          </div>
          <figure className='group relative overflow-hidden rounded-3xl bg-blue-100 shadow-xl'>
            <img className='block aspect-[4/3] w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]' src='/images/course-admission-guidance-ai.png' alt={t("Two students reviewing a course guide and admission checklist with a college adviser.","दो छात्र कॉलेज सलाहकार के साथ कोर्स गाइड और प्रवेश दस्तावेज़ सूची देख रहे हैं।")} loading='lazy' />
            <div className='absolute inset-0 bg-gradient-to-t from-blue-950/75 via-transparent to-transparent' aria-hidden='true' />
            <figcaption className='absolute inset-x-0 bottom-0 px-5 py-5 text-white sm:px-7 sm:py-7'>
              <span className='mt-3 block text-lg font-bold sm:text-xl'>{t("Good guidance makes the next step clearer.","सही मार्गदर्शन अगला कदम आसान बनाता है।")}</span>
              <span className='mt-1 block text-sm leading-6 text-blue-100'>{t("Courses · Admission · Documents","कोर्स · प्रवेश · दस्तावेज़")}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id='faq' className='bg-slate-50'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>{t("Quick answers","आम सवालों के जवाब")}</p>
        <h2 className='mt-3 text-3xl font-extrabold text-blue-950 md:text-5xl'>{t("Frequently asked questions","अक्सर पूछे जाने वाले सवाल")}</h2>
        <div className='mt-6 grid gap-3 md:grid-cols-2'>
          {[
            [t('How can I get course and fee details?', 'कोर्स और फीस की जानकारी कैसे मिलेगी?'), t('Call EYEPEK College on 7004374250 to confirm current course availability and fees.', 'मौजूदा कोर्स और फीस की पुष्टि के लिए EYEPEK College को 7004374250 पर कॉल करें।')],
            [t('How do I ask about admission?', 'प्रवेश के बारे में कैसे पूछूँ?'), t('Call the admissions team or send an enquiry through the contact page.', 'प्रवेश टीम को कॉल करें या संपर्क पेज से सवाल भेजें।')],
            [t('What does admission guidance cover?', 'प्रवेश मार्गदर्शन में क्या शामिल है?'), t('Get guidance on course and college options, eligibility questions, application steps and documents. The institution makes the final admission decision.', 'कोर्स और कॉलेज विकल्प, पात्रता, आवेदन के चरण और दस्तावेज़ों पर मार्गदर्शन पाएँ। प्रवेश का अंतिम निर्णय संस्थान करता है।')],
            [t('Can I ask about a course not listed here?', 'क्या सूची में न होने वाले कोर्स के बारे में पूछ सकता हूँ?'), t('Yes. Add the course you are interested in to the enquiry form and ask our team.', 'हाँ। पूछताछ फ़ॉर्म में अपने कोर्स का नाम लिखें और हमारी टीम से पूछें।')],
            [t('What should I share when I enquire?', 'पूछताछ करते समय क्या जानकारी दें?'), t('Your name, phone number, course of interest and questions are a good start.', 'अपना नाम, फ़ोन नंबर, रुचि का कोर्स और सवाल साझा करें।')],
          ].map(([question, answer]) => (
            <details key={question} className='group rounded-xl border border-slate-200 bg-white p-6 open:border-blue-200 open:shadow-sm'>
              <summary className='cursor-pointer list-none pr-8 font-bold text-blue-950 marker:hidden'>{question}<span className='float-right text-xl text-orange-600 transition group-open:rotate-45' aria-hidden='true'>+</span></summary>
              <p className='mt-4 leading-7 text-slate-600'>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section id='admissions' className='bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>{t("Explore your study options","पढ़ाई के विकल्प जानें")}</p>
            <h2 className='mt-3 text-3xl font-extrabold md:text-5xl'>{t("Find the course that moves you forward.","आगे बढ़ाने वाला कोर्स खोजें।")}</h2>
            <p className='mt-3 max-w-2xl text-base leading-7 text-blue-100'>{t('Explore popular programmes and contact our team for guidance on course fit, eligibility questions, admission steps and required documents.', 'लोकप्रिय कोर्स देखें और उपयुक्तता, पात्रता संबंधी सवाल, प्रवेश प्रक्रिया व दस्तावेज़ों के लिए हमारी टीम से मार्गदर्शन लें।')}</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <a href='/contact' className='inline-flex shrink-0 items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400'>{t('Get course guidance', 'कोर्स मार्गदर्शन पाएँ')} <span className='ml-2' aria-hidden='true'>→</span></a>
            <a href='https://wa.me/917004374250?text=Namaste%20EYEPEK%2C%20mujhe%20course%20aur%20admission%20ki%20jaankari%20chahiye.' target='_blank' rel='noreferrer' className='inline-flex shrink-0 items-center justify-center rounded-lg border border-white/40 px-5 py-3 font-bold text-white transition hover:bg-white/10'>{t('Ask on WhatsApp', 'WhatsApp पर पूछें')}</a>
          </div>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
          {courses.map((course, index) => <a key={course} href={`/contact?course=${encodeURIComponent(course)}`} aria-label={t(`Enquire about ${course}`, `${course} के बारे में पूछें`)} className='group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-5 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-orange-300 hover:bg-white/[0.15] hover:shadow-orange-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:p-6'>
            <span className='absolute right-3 top-2 text-xs font-bold tracking-widest text-blue-300/70'>0{index + 1}</span>
            <div className='mb-3 h-1 w-10 rounded-full bg-orange-400 transition-all group-hover:w-16' />
            <h3 className='text-2xl font-black tracking-wide text-white sm:text-3xl'>{course}</h3>
            <p className='mt-2 min-h-12 text-sm leading-6 text-blue-100'>{t(courseDescriptions[course]?.[0] || 'Course details vary by institution.', courseDescriptions[course]?.[1] || 'कोर्स का विवरण संस्थान के अनुसार अलग हो सकता है।')}</p>
            <p className='mt-3 border-t border-white/15 pt-3 text-xs leading-5 text-blue-200'>{t('Check current eligibility, duration, fees and document list with the college.', 'मौजूदा पात्रता, अवधि, फीस और दस्तावेज़ सूची कॉलेज से पूछें।')}</p>
            <p className='mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-orange-200'>{t('Ask for course details', 'कोर्स की जानकारी लें')} <span aria-hidden='true'>↗</span></p>
          </a>)}
          <a href='/contact?course=Other' className='flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-orange-300/60 bg-orange-400/10 p-5 text-center transition hover:bg-orange-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300'>
            <div><p className='text-xl font-extrabold text-orange-200'>{t("And more","और भी")}</p><p className='mt-1 text-xs text-blue-100'>{t("Ask our team ↗","हमारी टीम से पूछें ↗")}</p></div>
          </a>
        </div>
        <div className='mt-8 rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:p-6'>
          <h3 className='text-lg font-extrabold text-white'>{t('Clear information. Honest guidance.','स्पष्ट जानकारी। ईमानदार मार्गदर्शन।')}</h3>
          <div className='mt-4 grid gap-4 sm:grid-cols-3'>
            <div><p className='font-bold text-orange-200'>{t('English & Hindi','अंग्रेज़ी और हिंदी')}</p><p className='mt-1 text-sm leading-6 text-blue-100'>{t('Choose the language that works for you.','अपनी सुविधा की भाषा चुनें।')}</p></div>
            <div><p className='font-bold text-orange-200'>{t('Clear next steps','अगले कदम साफ़')}</p><p className='mt-1 text-sm leading-6 text-blue-100'>{t('Know what to ask and which documents to check.','जानें कि क्या पूछना है और कौन-से दस्तावेज़ जाँचने हैं।')}</p></div>
            <div><p className='font-bold text-orange-200'>{t('Honest guidance','ईमानदार मार्गदर्शन')}</p><p className='mt-1 text-sm leading-6 text-blue-100'>{t('The college and relevant authority decide admissions and approvals.','प्रवेश और मंज़ूरी का निर्णय कॉलेज और संबंधित प्राधिकरण लेते हैं।')}</p></div>
          </div>
        </div>
        <div className='mt-5 flex flex-col gap-2 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-blue-200'>{t("Course availability and admission details should be confirmed with the relevant institution.","कोर्स की उपलब्धता और प्रवेश की जानकारी संबंधित संस्थान से ज़रूर जाँचें।")}</p>
          <a href='tel:7004374250' className='font-bold text-orange-300 transition hover:text-white'>{t("Call 7004374250","7004374250 पर कॉल करें")}</a>
        </div>
      </div>
    </section>
  </main>
  );
};

export default HomePage;
