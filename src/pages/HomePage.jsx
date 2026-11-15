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
  <main className='bg-white text-slate-900'>
    <section className='relative isolate overflow-hidden bg-[#071a33] text-white'>
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.32),transparent_32%),radial-gradient(circle_at_12%_90%,rgba(245,166,35,0.16),transparent_28%),linear-gradient(125deg,#071a33_0%,#102f59_55%,#174b88_100%)]' />
      <div className='absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full border border-white/10' />
      <div className='absolute -right-10 top-24 -z-10 h-52 w-52 rounded-full border border-white/10' />
      <div className='mx-auto grid min-h-[590px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.02fr_0.98fr] md:px-10 md:py-20 lg:gap-16'>
        <div className='relative z-10 max-w-2xl'>
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/25 bg-white/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-100 shadow-lg shadow-black/10 backdrop-blur'>
            <span className='h-2 w-2 rounded-full bg-[#ffb84d] shadow-[0_0_12px_rgba(255,184,77,0.9)]' />
            {t('Education · Institutional Support · Technology', 'शिक्षा · संस्थागत सहयोग · तकनीक')}
          </div>
          <h1 className='max-w-[720px] text-[2.65rem] font-extrabold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.15rem]'>
            {hi ? <>शिक्षा और तकनीक में <span className='text-[#ffb84d]'>आपका भरोसेमंद</span> सहयोगी।</> : <>Clarity for your <span className='text-[#ffb84d]'>next step.</span><br />Support for your bigger goals.</>}
          </h1>
          <p className='mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg'>
            {t('EYEPEK brings student guidance, institutional documentation support and dependable technology services together — with clear communication and practical next steps.', 'EYEPEK विद्यार्थी मार्गदर्शन, संस्थागत दस्तावेज़ सहायता और भरोसेमंद तकनीकी सेवाएँ एक साथ उपलब्ध कराता है—स्पष्ट जानकारी और व्यावहारिक अगले कदमों के साथ।')}
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            <a href='/services/education' className='inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-[#f5a623] px-6 py-4 text-sm font-extrabold text-[#10233e] shadow-xl shadow-orange-950/25 transition hover:-translate-y-0.5 hover:bg-[#ffc15c] sm:text-base'>{t('Explore our services', 'हमारी सेवाएँ देखें')} <FaArrowRight aria-hidden='true' /></a>
            <a href='/contact' className='inline-flex min-h-13 items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/[0.06] px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10 sm:text-base'>{t('Talk to EYEPEK', 'EYEPEK से बात करें')}</a>
          </div>
          <div className='mt-9 grid max-w-xl grid-cols-3 border-t border-white/15 pt-6'>
            {[[t('Students', 'विद्यार्थी'),t('Guidance', 'मार्गदर्शन')],[t('Institutions', 'संस्थान'),t('Documentation', 'दस्तावेज़')],[t('Homes & offices', 'घर और दफ़्तर'),t('IT support', 'IT सहायता')]].map(([top,bottom],i) => <div key={top} className={i===1?'border-x border-white/15 px-3 sm:px-5':'px-1 sm:px-3'}><span className='block text-sm font-extrabold text-white sm:text-base'>{top}</span><span className='mt-1 block text-xs text-blue-200 sm:text-sm'>{bottom}</span></div>)}
          </div>
        </div>
        <div className='relative mx-auto w-full max-w-xl md:pl-3'>
          <div className='absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#f5a623]/70 via-blue-500/60 to-cyan-300/50 opacity-80 blur-xl' aria-hidden='true' />
          <div className='relative rounded-[1.8rem] border border-white/20 bg-white/10 p-2 shadow-2xl shadow-black/30 backdrop-blur-sm'>
            <div className='relative overflow-hidden rounded-[1.35rem]'>
              <img src='/images/students-campus.jpg' alt={t('Students learning together on a campus', 'कैंपस में साथ पढ़ते विद्यार्थी')} className='h-[330px] w-full object-cover sm:h-[440px]' />
              <div className='absolute inset-0 bg-gradient-to-t from-[#071a33]/90 via-[#071a33]/10 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 p-6 sm:p-8'>
                <p className='text-xs font-extrabold uppercase tracking-[0.2em] text-[#ffca76]'>{t('Learn · Connect · Grow', 'सीखें · जुड़ें · आगे बढ़ें')}</p>
                <p className='mt-2 max-w-sm text-2xl font-extrabold leading-tight text-white sm:text-3xl'>{t('One partner for your education and technology needs.', 'शिक्षा और तकनीक की ज़रूरतों के लिए एक भरोसेमंद साथी।')}</p>
              </div>
            </div>
          </div>
          <div className='relative mx-auto mt-4 grid max-w-md grid-cols-2 gap-3 sm:absolute sm:-bottom-7 sm:-left-8 sm:mt-0 sm:w-[calc(100%+1rem)] sm:max-w-none'>
            <div className='rounded-xl border border-white/20 bg-[#102b4e]/95 p-4 shadow-xl backdrop-blur'><span className='block text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#ffbd59]'>{t('Education division', 'शिक्षा विभाग')}</span><span className='mt-1 block text-sm font-bold text-white'>{t('Student & college support', 'विद्यार्थी और कॉलेज सहायता')}</span></div>
            <div className='rounded-xl border border-white/20 bg-[#102b4e]/95 p-4 shadow-xl backdrop-blur'><span className='block text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#ffbd59]'>{t('Technology division', 'तकनीकी विभाग')}</span><span className='mt-1 block text-sm font-bold text-white'>{t('IT & digital solutions', 'IT और डिजिटल समाधान')}</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="national-services" className="relative overflow-hidden bg-[#f3f7fc] px-5 py-12 sm:px-8 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-4 border-b border-blue-100 pb-7 text-left lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-[#f5a623]" /> {t("One platform. Two specialist divisions.", "एक प्लेटफॉर्म। दो विशेषज्ञ विभाग।")}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight text-[#183f78] sm:text-4xl md:text-[2.7rem]">
              {t("Education & Technology. One Trusted Partner.", "शिक्षा और तकनीक के लिए आपका भरोसेमंद साथी।")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:justify-self-end">
            {t("From student guidance and college documentation to practical IT solutions, get the support you need in one place.", "विद्यार्थी मार्गदर्शन और कॉलेज दस्तावेज़ों से लेकर IT सेवाओं तक, अपनी ज़रूरत की सहायता एक ही जगह पाएँ।")}
          </p>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <article className="group overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_12px_40px_rgba(20,55,100,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(20,55,100,0.14)]">
            <div className="relative h-52 overflow-hidden sm:h-60">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85" alt={t("Students learning together on campus", "कैंपस में साथ पढ़ते विद्यार्थी")} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102a43]/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#2454b8]">{t("Division 01 · Education", "विभाग 01 · शिक्षा")}</span>
            </div>
            <div className="p-6 sm:p-8 md:p-9">
              <h3 className="text-2xl font-black text-[#183f78] sm:text-3xl">{t("EYEPEK Education Services", "EYEPEK Education Services")}</h3>
              <p className="mt-3 leading-7 text-slate-600">{t("Practical guidance and organised documentation support for students, colleges and educational institutions.", "छात्रों, कॉलेजों और शैक्षणिक संस्थानों के लिए व्यावहारिक मार्गदर्शन और व्यवस्थित दस्तावेज़ सहायता।")}</p>
              <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                {[
                  t("Course & admission guidance", "कोर्स और प्रवेश मार्गदर्शन"),
                  t("College affiliation documentation", "कॉलेज संबद्धता दस्तावेज़"),
                  t("Compliance & renewal support", "अनुपालन और नवीनीकरण सहायता"),
                  t("Institutional documentation", "संस्थान के दस्तावेज़"),
                  t("AICTE approval & documentation support", "AICTE अनुमोदन और दस्तावेज़ सहायता"),
                  t("State university affiliation & coordination support", "राज्य विश्वविद्यालय संबद्धता और समन्वय सहायता")
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="mt-0.5 font-black text-[#df8914]">✓</span>{item}</li>)}
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
                {[
                  t("Computer & laptop support", "कंप्यूटर और लैपटॉप सहायता"),
                  t("Software & printer setup", "सॉफ्टवेयर और प्रिंटर सेटअप"),
                  t("Networking & CCTV", "नेटवर्किंग और CCTV"),
                  t("Remote & on-site assistance", "रिमोट और ऑन-साइट सहायता"),
                  t("Website design & development", "वेबसाइट डिजाइन और डेवलपमेंट"),
                  t("Mobile app development", "मोबाइल ऐप डेवलपमेंट"),
                  t("Internet service provider (ISP) solutions", "इंटरनेट सेवा प्रदाता (ISP) समाधान"),
                  t("Database design & management", "डेटाबेस डिजाइन और मैनेजमेंट")
                ].map(item => <li key={item} className="flex items-start gap-2"><span className="mt-0.5 font-black text-[#df8914]">✓</span>{item}</li>)}
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

    <section id='admissions' className='bg-white text-slate-800'>
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

    <section id='faq' className='bg-white'>
      <div className='mx-auto max-w-7xl px-5 py-8 sm:px-8 md:px-10 md:py-10'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.16em] text-[#2864d7]'>{t("Quick answers","आम सवालों के जवाब")}</p>
            <h2 className='mt-1 text-2xl font-extrabold tracking-tight text-[#183f78] sm:text-3xl'>{t("Frequently asked questions","अक्सर पूछे जाने वाले सवाल")}</h2>
          </div>
          <a href='/contact' className='text-sm font-bold text-[#2864d7] hover:underline'>{t("Still have questions? Contact us","और सवाल हैं? संपर्क करें")} →</a>
        </div>
        <div className='grid gap-2 md:grid-cols-2'>
          {[
            [t('How can I get course and fee details?', 'कोर्स और फीस की जानकारी कैसे मिलेगी?'), t('Call EYEPEK College on 7004374250 to confirm current course availability and fees.', 'मौजूदा कोर्स और फीस की पुष्टि के लिए EYEPEK College को 7004374250 पर कॉल करें।')],
            [t('How do I ask about admission?', 'प्रवेश के बारे में कैसे पूछूँ?'), t('Call the admissions team or send an enquiry through the contact page.', 'प्रवेश टीम को कॉल करें या संपर्क पेज से सवाल भेजें।')],
            [t('What does admission guidance cover?', 'प्रवेश मार्गदर्शन में क्या शामिल है?'), t('Get guidance on course and college options, eligibility questions, application steps and documents. The institution makes the final admission decision.', 'कोर्स और कॉलेज विकल्प, पात्रता, आवेदन के चरण और दस्तावेज़ों पर मार्गदर्शन पाएँ। प्रवेश का अंतिम निर्णय संस्थान करता है।')],
            [t('Can I ask about a course not listed here?', 'क्या सूची में न होने वाले कोर्स के बारे में पूछ सकता हूँ?'), t('Yes. Add the course you are interested in to the enquiry form and ask our team.', 'हाँ। पूछताछ फ़ॉर्म में अपने कोर्स का नाम लिखें और हमारी टीम से पूछें।')],
            [t('What should I share when I enquire?', 'पूछताछ करते समय क्या जानकारी दें?'), t('Your name, phone number, course of interest and questions are a good start.', 'अपना नाम, फ़ोन नंबर, रुचि का कोर्स और सवाल साझा करें।')],
          ].map(([question, answer]) => (
            <details key={question} className='group rounded-lg border border-blue-100 bg-[#f8fbff] px-4 py-3 transition hover:border-blue-200 open:bg-white'>
              <summary className='cursor-pointer list-none pr-7 text-sm font-semibold leading-6 text-[#183f78] marker:hidden'>{question}<span className='float-right text-lg font-medium text-[#df8914] transition group-open:rotate-45' aria-hidden='true'>+</span></summary>
              <p className='mt-2 border-t border-blue-50 pt-2 text-sm leading-6 text-slate-600'>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  </main>
  );
};

export default HomePage;
