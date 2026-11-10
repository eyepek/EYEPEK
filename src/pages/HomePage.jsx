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
    title: 'Admissions & Documents Support', titleHi: 'प्रवेश और दस्तावेज़ सहायता',
    slug: 'education',
    label: 'For students', labelHi: 'छात्रों के लिए',
    description: 'Guidance from course selection and admission steps to getting documents ready.', descriptionHi: 'कोर्स चुनने, प्रवेश प्रक्रिया समझने और दस्तावेज़ तैयार करने में मार्गदर्शन।',
    includes: ['Admission steps and document checklists', 'Course and career guidance', 'BBA, BCA, MBA, MCA and nursing options'], includesHi: ['प्रवेश के चरण और दस्तावेज़ चेकलिस्ट', 'कोर्स और करियर मार्गदर्शन', 'BBA, BCA, MBA, MCA और नर्सिंग विकल्प'],
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
    title: 'IT & Computer Support', titleHi: 'आईटी और कंप्यूटर सहायता',
    slug: 'it-support',
    label: 'Technology and repairs', labelHi: 'तकनीक और मरम्मत',
    description: 'Practical technical help for students, home users, offices, and small businesses.', descriptionHi: 'छात्रों, घरों, दफ्तरों और छोटे व्यवसायों के लिए व्यावहारिक तकनीकी सहायता।',
    includes: ['Computer and laptop troubleshooting', 'Software, printer and setup support', 'Wi-Fi, networking and CCTV assistance'], includesHi: ['कंप्यूटर और लैपटॉप समस्या सहायता', 'सॉफ्टवेयर, प्रिंटर और सेटअप सहायता', 'वाई-फाई, नेटवर्क और CCTV सहायता'],
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
  <main className='bg-[#f4f7fb] text-slate-900'>
    <section className='relative overflow-hidden bg-gradient-to-br from-white via-[#f5f9ff] to-[#eaf2ff]'>
      <div className='pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#dceaff] blur-3xl' aria-hidden='true' />
      <div className='mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-20'>
        <div className='relative z-10 max-w-2xl'>
          <p className='mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#2864d7] shadow-sm sm:text-sm'>
            <span className='h-2 w-2 rounded-full bg-[#f5a623]' /> {t('Education • College Support • Technology', 'शिक्षा • कॉलेज सहायता • तकनीक')}
          </p>
          <h1 className='max-w-[680px] text-[2.55rem] font-black leading-[1.08] tracking-tight text-[#183f78] sm:text-5xl lg:text-[3.55rem]'>
            {hi ? <>छात्रों को सही दिशा।<br /><span className='text-[#2864d7]'>कॉलेजों को भरोसेमंद</span> सहयोग।</> : <>Empowering <span className='text-[#2864d7]'>Students.</span><br />Supporting Colleges.</>}
          </h1>
          <p className='mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8'>
            {t('Your support partner for course and admission guidance, college affiliation documentation and practical IT services. Get clear information and move forward with confidence.', 'कोर्स और प्रवेश मार्गदर्शन, कॉलेज संबद्धता के दस्तावेज़ और IT सेवाओं के लिए आपका सहयोगी। सही जानकारी पाएँ और आत्मविश्वास से आगे बढ़ें।')}
          </p>
          <div className='mt-7 flex flex-wrap gap-3'>
            <a href='/services/education' className='inline-flex items-center gap-2 rounded-xl bg-[#2864d7] px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-[#1e4fae]'>{t('Explore Education Services', 'शिक्षा सेवाएँ देखें')} <FaArrowRight aria-hidden='true' /></a>
            <a href='/contact' className='inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3.5 font-bold text-[#2454b8] transition hover:border-[#2864d7] hover:bg-blue-50'>{t('Send an enquiry', 'पूछताछ करें')}</a>
          </div>
          <div className='mt-8 flex flex-wrap gap-2 border-t border-blue-100 pt-5 text-xs font-semibold text-slate-600 sm:text-sm'>
            {[t('Admission Guidance', 'प्रवेश मार्गदर्शन'), t('College Affiliation', 'कॉलेज संबद्धता'), t('AICTE Documentation', 'AICTE दस्तावेज़')].map(item => <span key={item} className='rounded-full border border-blue-100 bg-white px-3 py-2'>{item}</span>)}
          </div>
        </div>
        <div className='relative mx-auto w-full max-w-xl'>
          <div className='absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#dceaff] to-[#fff0d2]' aria-hidden='true' />
          <div className='relative overflow-hidden rounded-[1.7rem] border border-white bg-white p-2 shadow-2xl shadow-blue-900/10'>
            <img src='/images/students-campus.jpg' alt={t('Students learning together on a campus', 'कैंपस में साथ पढ़ते विद्यार्थी')} className='h-[300px] w-full rounded-[1.25rem] object-cover sm:h-[390px]' />
            <div className='absolute inset-x-2 bottom-2 rounded-b-[1.2rem] bg-gradient-to-t from-[#102a43]/90 via-[#102a43]/55 to-transparent px-6 pb-6 pt-16 text-white'>
              <p className='text-xs font-extrabold uppercase tracking-[0.18em] text-[#ffd078]'>{t('Learn • Connect • Grow', 'सीखें • जुड़ें • आगे बढ़ें')}</p>
              <p className='mt-2 text-xl font-black sm:text-2xl'>{t('Move forward with EYEPEK.', 'EYEPEK के साथ आगे बढ़ें।')}</p>
            </div>
          </div>
          <div className='relative mx-auto mt-4 grid max-w-lg grid-cols-3 gap-2 sm:absolute sm:-bottom-7 sm:-left-8 sm:mt-0 sm:w-[calc(100%+2rem)]'>
            {[['01',t('Students','विद्यार्थी')],['02',t('Colleges','कॉलेज')],['03',t('Technology','तकनीक')]].map(([n,label]) => <div key={n} className='rounded-xl border border-blue-100 bg-white px-3 py-3 text-center shadow-lg shadow-blue-900/5'><span className='block text-xs font-extrabold text-[#f5a623]'>{n}</span><span className='mt-1 block text-xs font-bold text-[#183f78] sm:text-sm'>{label}</span></div>)}
          </div>
        </div>
      </div>
    </section>

    <section id="national-services" className="bg-white px-5 py-16 sm:px-8 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
            <span className="h-2 w-2 rounded-full bg-[#f5a623]" /> {t("One platform. Two specialist divisions.", "एक प्लेटफॉर्म। दो विशेषज्ञ विभाग।")}
          </p>
          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#183f78] sm:text-4xl md:text-5xl">
            {t("Education & Technology. One Trusted Partner.", "शिक्षा और तकनीक के लिए आपका भरोसेमंद साथी।")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            {t("From student guidance and college documentation to practical IT solutions, get the support you need in one place.", "विद्यार्थी मार्गदर्शन और कॉलेज दस्तावेज़ों से लेकर IT सेवाओं तक, अपनी ज़रूरत की सहायता एक ही जगह पाएँ।")}
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <article className="group overflow-hidden rounded-3xl border border-blue-100 bg-[#f7faff] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85" alt={t("Students learning together on campus", "कैंपस में साथ पढ़ते विद्यार्थी")} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102a43]/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#2454b8]">{t("Division 01 · Education", "विभाग 01 · शिक्षा")}</span>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-black text-[#183f78] sm:text-3xl">{t("EYEPEK Education Services", "EYEPEK Education Services")}</h3>
              <p className="mt-3 leading-7 text-slate-600">{t("Practical guidance and organised documentation support for students, colleges and educational institutions.", "छात्रों, कॉलेजों और शैक्षणिक संस्थानों के लिए व्यावहारिक मार्गदर्शन और व्यवस्थित दस्तावेज़ सहायता।")}</p>
              <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                {[t("Course & admission guidance", "कोर्स और प्रवेश मार्गदर्शन"), t("College affiliation documentation", "कॉलेज संबद्धता दस्तावेज़"), t("Compliance & renewal support", "अनुपालन और नवीनीकरण सहायता"), t("Institutional documentation", "संस्थान के दस्तावेज़")].map(item => <li key={item} className="flex items-start gap-2"><span className="mt-0.5 font-black text-[#df8914]">✓</span>{item}</li>)}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/services/education" className="inline-flex items-center gap-2 rounded-xl bg-[#2864d7] px-5 py-3 font-bold text-white transition hover:bg-[#1e4fae]">{t("Student Guidance", "छात्र मार्गदर्शन")} <FaArrowRight aria-hidden="true" /></a>
                <a href="/services/business-support" className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 font-bold text-[#2454b8] transition hover:bg-blue-50">{t("Institution Support", "संस्थान सहायता")} <FaArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-3xl border border-blue-100 bg-[#f7faff] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85" alt={t("Computer hardware and technology close-up", "कंप्यूटर हार्डवेयर और तकनीक")} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102a43]/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#2454b8]">{t("Division 02 · Technology", "विभाग 02 · तकनीक")}</span>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-black text-[#183f78] sm:text-3xl">{t("EYEPEK IT & Technical Services", "EYEPEK IT और तकनीकी सेवाएँ")}</h3>
              <p className="mt-3 leading-7 text-slate-600">{t("Reliable technical assistance for homes, students, offices and growing businesses.", "घरों, विद्यार्थियों, कार्यालयों और व्यवसायों के लिए भरोसेमंद तकनीकी सहायता।")}</p>
              <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                {[t("Computer & laptop support", "कंप्यूटर और लैपटॉप सहायता"), t("Software & printer setup", "सॉफ्टवेयर और प्रिंटर सेटअप"), t("Networking & CCTV", "नेटवर्किंग और CCTV"), t("Remote & on-site assistance", "रिमोट और ऑन-साइट सहायता")].map(item => <li key={item} className="flex items-start gap-2"><span className="mt-0.5 font-black text-[#df8914]">✓</span>{item}</li>)}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/services/it-support" className="inline-flex items-center gap-2 rounded-xl bg-[#2864d7] px-5 py-3 font-bold text-white transition hover:bg-[#1e4fae]">{t("Explore IT Services", "IT सेवाएँ देखें")} <FaArrowRight aria-hidden="true" /></a>
                <a href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 font-bold text-[#2454b8] transition hover:bg-blue-50">{t("Contact Us", "संपर्क करें")} <FaArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id='learning' className='overflow-hidden bg-gradient-to-br from-[#e5edf5] via-[#f4f7fb] to-[#ffedda]'>
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
            <article key={item.number} className={`group relative overflow-hidden rounded-2xl border border-white/80 border-t-4 ${item.color} bg-[#f4f7fb] p-5 shadow-md shadow-blue-950/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10`}>
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
        <div className='mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-[#f4f7fb] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <h3 className='font-bold text-blue-950'>{t("Not sure which course may suit you?","कौन-सा कोर्स आपके लिए सही है, समझ नहीं आ रहा?")}</h3>
            <p className='mt-1 text-sm leading-6 text-slate-600'>{t("Answer a few quick questions to explore course options, then read our practical student guides.","कोर्स विकल्प जानने के लिए कुछ सवालों के जवाब दें, फिर छात्र मार्गदर्शिकाएँ देखें।")}</p>
          </div>
          <div className='flex shrink-0 flex-wrap gap-3'>
            <a href='/course-finder' className='inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600'>{t('Find a course', 'कोर्स खोजें')} <FaArrowRight aria-hidden='true' /></a>
            <a href='/guides' className='inline-flex items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-bold text-blue-900 transition hover:bg-[#e7eff7]'>{t("Read student guides","छात्र मार्गदर्शिकाएँ पढ़ें")}</a>
          </div>
        </div>
      </div>
    </section>

    <section id='student-support' className='relative overflow-hidden bg-gradient-to-br from-[#e5edf5] via-[#f4f7fb] to-[#ffedda]'>
      <div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl' aria-hidden='true' />
      <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl' aria-hidden='true' />
      <div className='relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='inline-flex items-center gap-2 rounded-full border border-orange-200 bg-[#fff0df] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700'>
              <span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' />
              One team · many solutions
            </p>
            <h2 className='mt-3 text-3xl font-extrabold leading-tight text-blue-950 md:text-4xl'>{t('Our', 'हमारी')} <span className='text-orange-500'>{t('Services', 'सेवाएँ')}</span></h2>
            <p className='mt-2 max-w-2xl text-base leading-7 text-slate-600'>{t('Start with admission and college affiliation support. Explore our IT, computer, business, and home services after that.', 'पहले प्रवेश और कॉलेज संबद्धता सहायता देखें। इसके बाद IT, कंप्यूटर, व्यवसाय और घरेलू सेवाओं के बारे में जानें।')}</p>
          </div>
          <a href='/contact' className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>
            {t('Request a service', 'सेवा के लिए पूछें')} <FaArrowRight aria-hidden='true' />
          </a>
        </div>
        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          {serviceCategories.map((item) => (
            <article key={item.slug} className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 border-t-4 ${item.color} bg-[#f4f7fb]/95 shadow-sm shadow-blue-950/5 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-blue-950/10`}>
              <div className='relative h-48 overflow-hidden bg-[#e7eff7] sm:h-56'>
                <img src={item.image} alt={item.imageAlt} loading='lazy' className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-gradient-to-t from-blue-950/55 via-transparent to-transparent' />
                <span className='absolute bottom-3 left-4 rounded-full border border-white/70 bg-[#f4f7fb]/95 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-blue-950 shadow-sm'>{item.number}</span>
              </div>
              <div className='flex flex-1 flex-col p-6'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7eff7] text-xl text-blue-800 ring-1 ring-blue-100 transition group-hover:bg-[#fff0df] group-hover:text-orange-600'>
                    {item.slug === 'education' ? <FaGraduationCap aria-hidden='true' /> : item.slug === 'business-support' ? <FaUniversity aria-hidden='true' /> : item.slug === 'it-support' ? <FaTools aria-hidden='true' /> : <FaFileAlt aria-hidden='true' />}
                  </div>
                  <span className='rounded-full border border-orange-100 bg-[#fff0df] px-3 py-1 text-xs font-bold text-orange-700'>{t(item.label, item.labelHi)}</span>
                </div>
                <h3 className='mt-5 text-xl font-extrabold leading-snug text-blue-950 transition group-hover:text-blue-700'>{t(item.title, item.titleHi)}</h3>
                <p className='mt-2 text-[0.95rem] leading-7 text-slate-600'>{t(item.description, item.descriptionHi)}</p>
                <ul className='mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2'>
                  {item.includes.map((service, index) => <li key={service} className='flex items-start gap-2'><span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500' aria-hidden='true' />{t(service, item.includesHi[index])}</li>)}
                </ul>
                <a href={`/services/${item.slug}`} className='mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-[#e7eff7] px-4 py-3 font-bold text-blue-900 transition hover:border-orange-200 hover:bg-[#fff0df] group-hover:text-orange-700'>
                  {t('View service details', 'सेवा की जानकारी देखें')} <FaArrowRight className='transition-transform group-hover:translate-x-1' aria-hidden='true' />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className='mt-8 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-[#f4f7fb]/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <p className='font-bold text-blue-950'>{t("Let’s find the right support for you.","आपके लिए सही सहायता ढूँढ़ते हैं।")}</p>
            <p className='mt-1 text-sm leading-6 text-slate-600'>{t('Whether you’re a student or an institution, our team is here to understand your needs and help you take the next step with confidence.', 'चाहे आप छात्र हों या संस्थान, हमारी टीम आपकी ज़रूरत समझकर अगले कदम में मदद करेगी।')}</p>
          </div>
          <a href='tel:7004374250' className='inline-flex shrink-0 items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-bold text-blue-900 transition hover:border-orange-300 hover:bg-[#fff0df]'>
            {t('Call 7004374250', '7004374250 पर कॉल करें')}
          </a>
        </div>
        <p className='mt-6 text-sm leading-6 text-slate-500'>{t('EYEPEK provides guidance and documentation assistance for affiliation and compliance processes. All approvals and affiliation decisions are made independently by the concerned university or regulatory authority.', 'EYEPEK संबद्धता और अनुपालन की प्रक्रिया व दस्तावेज़ों में मार्गदर्शन देता है। मंज़ूरी का निर्णय संबंधित विश्वविद्यालय या नियामक प्राधिकरण करता है।')}</p>
      </div>
    </section>


    <section id='support-guide' className='bg-[#f4f7fb]'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <p className='text-sm font-extrabold uppercase tracking-[0.18em] text-orange-700'>{t('A simple guide', 'आसान भाषा में समझें')}</p>
        <h2 className='mt-3 max-w-4xl text-3xl font-extrabold text-blue-950 md:text-4xl'>{t('What do admission, affiliation and document support mean?', 'प्रवेश, संबद्धता और दस्तावेज़ सहायता का क्या मतलब है?')}</h2>
        <p className='mt-3 max-w-3xl leading-7 text-slate-600'>{t('See what EYEPEK can help you understand—and what the college or authority decides.', 'जानें कि EYEPEK आपको क्या समझने में मदद कर सकता है और कॉलेज या प्राधिकरण का निर्णय क्या होता है।')}</p>
        <div className='mt-8 grid gap-5 lg:grid-cols-3'>
          <article className='rounded-2xl border border-orange-100 bg-[#fff0df] p-6'>
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
          <article className='rounded-2xl border border-blue-100 bg-[#e7eff7] p-6'>
            <span className='text-xs font-black uppercase tracking-widest text-blue-700'>{t('For colleges', 'कॉलेजों के लिए')}</span>
            <h3 className='mt-2 text-xl font-extrabold text-blue-950'>{t('Affiliation & AICTE', 'संबद्धता और AICTE')}</h3>
            <p className='mt-3 leading-7 text-slate-700'>{t('University affiliation is a formal relationship that lets a college offer specified courses under that university’s rules. AICTE approval is a separate requirement where regulations apply; one does not automatically replace the other.', 'विश्वविद्यालय संबद्धता एक औपचारिक संबंध है, जिसके तहत कॉलेज उस विश्वविद्यालय के नियमों के अनुसार तय कोर्स चलाता है। जहाँ नियम लागू हों, AICTE की मंज़ूरी अलग आवश्यकता है; एक प्रक्रिया दूसरी की जगह अपने-आप नहीं लेती।')}</p>
            <p className='mt-3 leading-7 text-slate-700'>{t('EYEPEK can help institutions understand the process, organise records and prepare questions for the university or regulator. The relevant authority reviews applications and makes all approval decisions.', 'EYEPEK संस्थानों को प्रक्रिया समझने, रिकॉर्ड व्यवस्थित करने और विश्वविद्यालय या नियामक से पूछे जाने वाले सवाल तैयार करने में मदद कर सकता है। आवेदन की जाँच और मंज़ूरी का निर्णय संबंधित प्राधिकरण करता है।')}</p>
          </article>
          <article className='rounded-2xl border border-slate-200 bg-[#e8eef5] p-6'>
            <span className='text-xs font-black uppercase tracking-widest text-slate-600'>{t('For every application', 'हर आवेदन के लिए')}</span>
            <h3 className='mt-2 text-xl font-extrabold text-blue-950'>{t('Document support', 'दस्तावेज़ सहायता')}</h3>
            <p className='mt-3 leading-7 text-slate-700'>{t('A checklist helps you prepare; it does not mean every item is required everywhere. Student applications may ask for identity proof, photos, marksheets or certificates. College applications may need institutional records. Requirements vary by course, college, university and year.', 'चेकलिस्ट तैयारी में मदद करती है; इसका मतलब यह नहीं कि हर दस्तावेज़ हर जगह ज़रूरी होगा। छात्र आवेदन में पहचान-पत्र, फोटो, अंकपत्र या प्रमाणपत्र माँगे जा सकते हैं। कॉलेज आवेदन में संस्थान के रिकॉर्ड लग सकते हैं। ज़रूरतें कोर्स, कॉलेज, विश्वविद्यालय और वर्ष के अनुसार बदलती हैं।')}</p>
            <p className='mt-3 font-semibold leading-7 text-blue-950'>{t('Always check the latest list from the institution or authority before submitting documents.', 'दस्तावेज़ जमा करने से पहले संस्थान या प्राधिकरण की नवीनतम सूची ज़रूर देखें।')}</p>
          </article>
        </div>
      </div>
    </section>

    <section id='about' className='relative isolate overflow-hidden bg-gradient-to-br from-white via-[#e5edf5] to-[#ffedda]'>
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
                <span className='inline-flex rounded-full border border-white/25 bg-[#f4f7fb]/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-200 backdrop-blur'>{t("About EYEPEK","EYEPEK के बारे में")}</span>
                <p className='mt-3 max-w-md text-2xl font-black leading-tight sm:text-3xl'>{t("Admissions. Affiliation. Document support.","प्रवेश। संबद्धता। दस्तावेज़ सहायता।")}</p>
              </figcaption>
            </div>
          </figure>

          <div>
            <p className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#f4f7fb] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-800 shadow-sm'>
              <span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' /> Our main support
            </p>
            <h2 className='mt-5 text-3xl font-black leading-tight tracking-tight text-blue-950 sm:text-4xl md:text-5xl'>
              {t('Admission and', 'प्रवेश और')} <span className='text-orange-500'>{t('college affiliation', 'कॉलेज संबद्धता')}</span> {t('guidance.', 'मार्गदर्शन।')}
            </h2>
            <p className='mt-4 text-base leading-7 text-slate-600 sm:text-lg'>
              {t('EYEPEK helps students understand course admissions and prepare documents. We also guide colleges through affiliation processes and AICTE-related documentation. IT, computer, business, and home services are available too.', 'EYEPEK छात्रों को प्रवेश प्रक्रिया और दस्तावेज़ समझने में मदद करता है। कॉलेजों को संबद्धता और AICTE से जुड़े दस्तावेज़ों में मार्गदर्शन मिलता है। IT, कंप्यूटर, व्यवसाय और घरेलू सेवाएँ भी उपलब्ध हैं।')}
            </p>

            <div className='mt-7 space-y-3'>
              <article className='flex gap-4 rounded-2xl border border-orange-200 bg-[#f4f7fb] p-4 shadow-md shadow-orange-950/5'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0df] text-xl text-orange-700'><FaGraduationCap aria-hidden='true' /></span>
                <div>
                  <h3 className='font-extrabold text-blue-950'>{t('Admission & Documents Support', 'प्रवेश और दस्तावेज़ सहायता')}</h3>
                  <p className='mt-1 text-sm leading-6 text-slate-600'>{t('Course guidance, application steps, eligibility questions, and admission document checklists.', 'कोर्स, आवेदन के चरण, पात्रता संबंधी सवाल और प्रवेश दस्तावेज़ चेकलिस्ट में मदद।')}</p>
                </div>
              </article>
              <article className='flex gap-4 rounded-2xl border border-blue-200 bg-[#f4f7fb] p-4 shadow-md shadow-blue-950/5'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e7eff7] text-xl text-blue-800'><FaUniversity aria-hidden='true' /></span>
                <div>
                  <h3 className='font-extrabold text-blue-950'>{t('College Affiliation & AICTE Documentation', 'कॉलेज संबद्धता और AICTE दस्तावेज़ सहायता')}</h3>
                  <p className='mt-1 text-sm leading-6 text-slate-600'>{t('Process guidance, document organisation, compliance paperwork, and renewal support for colleges.', 'कॉलेजों के लिए प्रक्रिया समझना, रिकॉर्ड व्यवस्थित करना, अनुपालन के कागज़ात और नवीनीकरण सहायता।')}</p>
                </div>
              </article>
            </div>
            <div className='mt-5 rounded-xl border border-slate-200 bg-[#f4f7fb]/80 p-4'>
              <p className='text-sm font-bold text-blue-950'>{t("Also available","अन्य उपलब्ध सेवाएँ")}</p>
              <p className='mt-1 text-sm leading-6 text-slate-600'>{t("IT and computer support, business documentation, and home services.","आईटी और कंप्यूटर सहायता, व्यवसाय दस्तावेज़ और घरेलू सेवाएँ।")}</p>
              <a href='#student-support' className='mt-2 inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-orange-600'>{t('See all services', 'सभी सेवाएँ देखें')} <FaArrowRight aria-hidden='true' /></a>
            </div>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <a href='#admissions' className='inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>{t('Admission support', 'प्रवेश सहायता')} <FaArrowRight aria-hidden='true' /></a>
              <a href='/services/business-support' className='inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-[#f4f7fb] px-6 py-3.5 font-bold text-blue-900 transition hover:bg-[#e7eff7]'>{t('College support', 'कॉलेज सहायता')} <FaArrowRight aria-hidden='true' /></a>
            </div>
            <p className='mt-5 text-xs leading-5 text-slate-500'>{t('EYEPEK provides process and documentation guidance. Admissions, affiliation, AICTE decisions, and approvals are made by the relevant institution or authority.', 'EYEPEK प्रक्रिया और दस्तावेज़ों में मार्गदर्शन देता है। प्रवेश, संबद्धता, AICTE और मंज़ूरी के निर्णय संबंधित संस्थान या प्राधिकरण लेते हैं।')}</p>
          </div>
        </div>
      </div>
    </section>

    <section id='campus' className='overflow-hidden bg-[#e8eef5]'>
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
                <li key={title} className='flex gap-3 rounded-xl border border-slate-200 bg-[#f4f7fb] p-4 shadow-sm'>
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

    <section id='explore-eyepek' className='bg-[#f4f7fb]'>
      <div className='mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20'>
        <div className='flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='text-sm font-extrabold uppercase tracking-[0.18em] text-orange-600'>{t('Explore what EYEPEK can do for you', 'जानें EYEPEK आपकी कैसे मदद कर सकता है')}</p>
            <h2 className='mt-3 text-3xl font-black leading-tight text-blue-950 md:text-5xl'>{t('Practical services. Clear guidance. Your next step starts here.', 'उपयोगी सेवाएँ। स्पष्ट मार्गदर्शन। आपका अगला कदम यहीं से।')}</h2>
            <p className='mt-4 max-w-2xl text-base leading-8 text-slate-600'>{t('Whether you are a student, college representative or business owner, explore the support you need and contact our team for a clear discussion about your requirements.', 'आप विद्यार्थी हों, कॉलेज प्रतिनिधि हों या व्यवसाय से जुड़े हों—अपनी ज़रूरत के अनुसार सेवा चुनें और हमारी टीम से बात करें।')}</p>
          </div>
          <a href='/contact' className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-950 px-6 py-3.5 font-bold text-white transition hover:bg-blue-800'>{t('Discuss your requirement', 'अपनी ज़रूरत बताएँ')} <FaArrowRight aria-hidden='true' /></a>
        </div>
        <div className='mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          <a href='/services/business-support' className='group rounded-2xl border border-blue-100 bg-gradient-to-br from-[#e5edf5] to-[#f4f7fb] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'>
            <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950 text-xl text-white'><FaUniversity aria-hidden='true' /></span>
            <p className='mt-5 text-xs font-extrabold uppercase tracking-widest text-orange-600'>{t('For institutions', 'संस्थानों के लिए')}</p>
            <h3 className='mt-2 text-xl font-black text-blue-950'>{t('College Affiliation', 'कॉलेज संबद्धता')}</h3>
            <p className='mt-3 text-sm leading-6 text-slate-600'>{t('Affiliation process guidance, university documentation, compliance records and renewal support.', 'संबद्धता प्रक्रिया, विश्वविद्यालय के दस्तावेज़, अनुपालन रिकॉर्ड और नवीनीकरण में मार्गदर्शन।')}</p>
            <span className='mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-900 group-hover:text-orange-600'>{t('Explore institution support', 'संस्थान सहायता देखें')} <FaArrowRight aria-hidden='true' /></span>
          </a>
          <a href='/services/education' className='group rounded-2xl border border-orange-100 bg-gradient-to-br from-[#fff0df] to-[#f4f7fb] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'>
            <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl text-white'><FaGraduationCap aria-hidden='true' /></span>
            <p className='mt-5 text-xs font-extrabold uppercase tracking-widest text-orange-600'>{t('For students', 'विद्यार्थियों के लिए')}</p>
            <h3 className='mt-2 text-xl font-black text-blue-950'>{t('Student Counselling', 'विद्यार्थी काउंसलिंग')}</h3>
            <p className='mt-3 text-sm leading-6 text-slate-600'>{t('Course selection, college options, eligibility questions, admission steps and document checklists.', 'कोर्स चयन, कॉलेज विकल्प, पात्रता संबंधी सवाल, प्रवेश प्रक्रिया और दस्तावेज़ चेकलिस्ट।')}</p>
            <span className='mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-900 group-hover:text-orange-600'>{t('Explore student guidance', 'छात्र मार्गदर्शन देखें')} <FaArrowRight aria-hidden='true' /></span>
          </a>
          <a href='/services/business-support' className='group rounded-2xl border border-blue-100 bg-gradient-to-br from-[#e8eef5] to-[#f4f7fb] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'>
            <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-800 text-xl text-white'><FaFileAlt aria-hidden='true' /></span>
            <p className='mt-5 text-xs font-extrabold uppercase tracking-widest text-orange-600'>{t('For colleges', 'कॉलेजों के लिए')}</p>
            <h3 className='mt-2 text-xl font-black text-blue-950'>{t('AICTE Documentation', 'AICTE दस्तावेज़ सहायता')}</h3>
            <p className='mt-3 text-sm leading-6 text-slate-600'>{t('Support organising applicable AICTE-related documents, records and compliance information. Approval decisions remain with the authority.', 'जहाँ लागू हो AICTE से जुड़े दस्तावेज़, रिकॉर्ड और अनुपालन जानकारी व्यवस्थित करने में सहायता। मंज़ूरी का निर्णय प्राधिकरण करता है।')}</p>
            <span className='mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-900 group-hover:text-orange-600'>{t('Explore documentation support', 'दस्तावेज़ सहायता देखें')} <FaArrowRight aria-hidden='true' /></span>
          </a>
          <a href='/services/it-support' className='group rounded-2xl border border-orange-100 bg-gradient-to-br from-[#fff0df] to-[#f4f7fb] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'>
            <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-xl text-white'><FaTools aria-hidden='true' /></span>
            <p className='mt-5 text-xs font-extrabold uppercase tracking-widest text-orange-600'>{t('For homes & offices', 'घर और कार्यालयों के लिए')}</p>
            <h3 className='mt-2 text-xl font-black text-blue-950'>{t('IT & Technical Services', 'IT और तकनीकी सेवाएँ')}</h3>
            <p className='mt-3 text-sm leading-6 text-slate-600'>{t('Computer troubleshooting, software installation, printer support, networking, CCTV and remote assistance.', 'कंप्यूटर समस्या समाधान, सॉफ्टवेयर इंस्टॉलेशन, प्रिंटर, नेटवर्किंग, CCTV और रिमोट सहायता।')}</p>
            <span className='mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-900 group-hover:text-orange-600'>{t('Explore IT services', 'IT सेवाएँ देखें')} <FaArrowRight aria-hidden='true' /></span>
          </a>
        </div>
        <div className='mt-8 rounded-2xl border border-blue-100 bg-[#e7eff7] p-6 md:flex md:items-center md:justify-between md:gap-8'>
          <div>
            <p className='text-xs font-extrabold uppercase tracking-widest text-orange-600'>{t('Free information resources', 'मुफ़्त जानकारी')}</p>
            <h3 className='mt-2 text-xl font-black text-blue-950'>{t('Prepare before you apply or enquire.', 'आवेदन या पूछताछ से पहले तैयारी करें।')}</h3>
            <p className='mt-2 text-sm leading-6 text-slate-600'>{t('Browse practical guides, use the admission checklist and explore course options.', 'उपयोगी गाइड पढ़ें, प्रवेश चेकलिस्ट देखें और कोर्स विकल्प जानें।')}</p>
          </div>
          <div className='mt-5 flex flex-wrap gap-3 md:mt-0'>
            <a href='/guides' className='rounded-lg border border-blue-200 bg-[#f4f7fb] px-4 py-2.5 text-sm font-bold text-blue-950 hover:bg-blue-100'>{t('Read guides', 'गाइड पढ़ें')}</a>
            <a href='/admission-checklist' className='rounded-lg border border-blue-200 bg-[#f4f7fb] px-4 py-2.5 text-sm font-bold text-blue-950 hover:bg-blue-100'>{t('Admission checklist', 'प्रवेश चेकलिस्ट')}</a>
            <a href='/course-finder' className='rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600'>{t('Find a course', 'कोर्स खोजें')}</a>
          </div>
        </div>
      </div>
    </section>

    <section id='faq' className='bg-[#e8eef5]'>
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
            <details key={question} className='group rounded-xl border border-slate-200 bg-[#f4f7fb] p-6 open:border-blue-200 open:shadow-sm'>
              <summary className='cursor-pointer list-none pr-8 font-bold text-blue-950 marker:hidden'>{question}<span className='float-right text-xl text-orange-600 transition group-open:rotate-45' aria-hidden='true'>+</span></summary>
              <p className='mt-4 leading-7 text-slate-600'>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section id='admissions' className='bg-gradient-to-br from-[#eaf1f8] via-[#f4f6f8] to-[#e8edf4] text-slate-800'>
      <div className='mx-auto max-w-7xl px-5 py-10 sm:px-8 md:px-10 md:py-12'>
        <div className='mb-6 flex flex-col gap-4 border-b border-slate-300/70 pb-5 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-3xl'>
            <p className='text-xs font-extrabold uppercase tracking-[0.2em] text-orange-600'>{t('EYEPEK · EDUCATION GUIDANCE','EYEPEK · शिक्षा मार्गदर्शन')}</p>
            <h2 className='mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#142b4a] sm:text-3xl md:text-4xl'>{t('Choose a course. Plan your future.','कोर्स चुनें। अपना भविष्य बनाएँ।')}</h2>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-600'>{t('Explore popular programmes and get guidance on eligibility, admission steps and documents.','लोकप्रिय कोर्स देखें और पात्रता, प्रवेश प्रक्रिया तथा दस्तावेज़ों की जानकारी पाएँ।')}</p>
          </div>
          <div className='flex shrink-0 flex-wrap gap-2'>
            <a href='/contact' className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#173f70] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#102f56]'>{t('Course guidance','कोर्स मार्गदर्शन')} <FaArrowRight aria-hidden='true' /></a>
            <a href='https://wa.me/917004374250?text=Namaste%20EYEPEK%2C%20mujhe%20course%20aur%20admission%20ki%20jaankari%20chahiye.' target='_blank' rel='noreferrer' className='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/70 px-4 py-2.5 text-sm font-bold text-[#173f70] transition hover:border-[#173f70] hover:bg-white'>{t('WhatsApp','WhatsApp')}</a>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {courses.map((course, index) => {
            const palettes = ['bg-[#dce9f6] border-[#c5d8ec]', 'bg-[#fbe8d8] border-[#f2d2b7]', 'bg-[#e4e5f5] border-[#d0d2eb]', 'bg-[#dcefe9] border-[#c5e2d8]'];
            const palette = palettes[index % palettes.length];
            return <a key={course} href={`/contact?course=${encodeURIComponent(course)}`} aria-label={t(`Enquire about ${course}`, `${course} के बारे में पूछें`)} className={`group relative flex min-h-[190px] flex-col rounded-xl border p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:p-5 ${palette}`}>
              <div className='flex items-center justify-between'>
                <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/75 text-[#173f70]'><FaGraduationCap size={18} aria-hidden='true' /></span>
                <span className='text-xs font-bold tracking-widest text-slate-500'>0{index + 1}</span>
              </div>
              <h3 className='mt-3 text-2xl font-extrabold tracking-tight text-[#142b4a]'>{course}</h3>
              <p className='mt-1 flex-1 text-xs leading-5 text-slate-700'>{t(courseDescriptions[course]?.[0] || 'Course details vary by institution.', courseDescriptions[course]?.[1] || 'कोर्स का विवरण संस्थान के अनुसार अलग हो सकता है।')}</p>
              <div className='mt-3 flex items-center justify-between border-t border-slate-500/15 pt-2.5'>
                <span className='text-[11px] font-semibold text-slate-600'>{t('Course information','कोर्स की जानकारी')}</span>
                <span className='inline-flex items-center gap-1 text-xs font-extrabold text-[#bd5b08] transition group-hover:gap-2'>{t('Enquire','पूछें')} <FaArrowRight aria-hidden='true' /></span>
              </div>
            </a>;
          })}
          <a href='/contact?course=Other' className='flex min-h-[190px] flex-col items-center justify-center rounded-xl border border-dashed border-[#c5a77d] bg-gradient-to-br from-[#fff0d9] to-[#f4dfc5] p-4 text-center transition hover:from-[#ffe7c5] hover:to-[#f3d6b3] sm:p-5'>
            <span className='flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-xl font-medium text-[#173f70]'>+</span>
            <p className='mt-3 text-lg font-extrabold text-[#142b4a]'>{t('And more courses','और भी कोर्स')}</p>
            <p className='mt-1 text-xs leading-5 text-slate-700'>{t('Tell us what you are looking for.','हमें बताएँ कि आप क्या खोज रहे हैं।')}</p>
            <span className='mt-2 text-xs font-extrabold text-[#bd5b08]'>{t('Ask our team','हमारी टीम से पूछें')} →</span>
          </a>
        </div>
        <div className='mt-5 flex flex-col gap-2 rounded-xl border border-[#cbd6e2] bg-[#dfe8f1] px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xs leading-5 text-slate-600'>{t('Course availability, fees and admission requirements should be confirmed with the relevant institution.','कोर्स की उपलब्धता, फीस और प्रवेश की शर्तें संबंधित संस्थान से जाँचें।')}</p>
          <a href='tel:7004374250' className='shrink-0 text-xs font-extrabold text-[#173f70] hover:text-orange-600'>{t('Call 7004374250','7004374250 पर कॉल करें')}</a>
        </div>
      </div>
    </section>
  </main>
  );
};

export default HomePage;
