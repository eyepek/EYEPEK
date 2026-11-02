import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const levels = [
  { value: 'class10', title: 'Completed Class 10', titleHi: 'कक्षा 10 पूरी की है', detail: 'I am planning my next education step', detailHi: 'पढ़ाई का अगला कदम सोच रहा/रही हूँ' },
  { value: 'class12', title: 'Completed Class 12', titleHi: 'कक्षा 12 पूरी की है', detail: 'I am exploring undergraduate courses', detailHi: 'स्नातक कोर्स देख रहा/रही हूँ' },
  { value: 'graduate', title: 'Completed graduation', titleHi: 'स्नातक पूरी की है', detail: 'I am exploring postgraduate options', detailHi: 'स्नातकोत्तर विकल्प देख रहा/रही हूँ' },
];

const interests = [
  { value: 'business', title: 'Business & management', titleHi: 'व्यवसाय और प्रबंधन', detail: 'Business, teams, marketing or entrepreneurship', detailHi: 'व्यवसाय, टीम, मार्केटिंग या उद्यमिता', imagePosition: 'left center', imageAlt: 'Indian college students discussing a business project' },
  { value: 'technology', title: 'Computers & technology', titleHi: 'कंप्यूटर और तकनीक', detail: 'Software, computers or digital tools', detailHi: 'सॉफ्टवेयर, कंप्यूटर या डिजिटल साधन', imagePosition: 'center center', imageAlt: 'Indian student learning programming in a computer lab' },
  { value: 'healthcare', title: 'Healthcare', titleHi: 'स्वास्थ्य सेवा', detail: 'Patient care and health services', detailHi: 'रोगी देखभाल और स्वास्थ्य सेवाएँ', imagePosition: 'right center', imageAlt: 'Nursing student practising in a clinical training lab' },
  { value: 'unsure', title: 'I am still exploring', titleHi: 'अभी विकल्प देख रहा/रही हूँ', detail: 'Help me compare a few broad directions', detailHi: 'कुछ अलग-अलग क्षेत्रों की तुलना करने में मदद करें', imageSrc: '/images/students-campus.jpg', imageAlt: 'Students exploring study options on campus' },
];

const courseInfo = {
  en: {
    BBA: 'Business foundations: management, marketing, finance and how organisations work.',
    BCA: 'Computing foundations: programming, software concepts and digital systems.',
    MBA: 'Advanced business study for learners interested in management and leadership.',
    MCA: 'Advanced study in computing, software development and technology applications.',
    ANM: 'Nursing and community health study. Confirm the course, recognition and current eligibility with the institution.',
    GNM: 'General nursing study and patient-care foundations. Confirm current requirements with the institution.',
    'B.Sc. Nursing': 'Undergraduate nursing study combining health sciences and clinical learning.',
    'Other course': 'Compare subject choices and pathways that match your interests. Entry rules vary, so confirm them with the institution.',
  },
  hi: {
    BBA: 'व्यवसाय की बुनियाद: प्रबंधन, मार्केटिंग, वित्त और संस्थान कैसे काम करते हैं।',
    BCA: 'कंप्यूटिंग की बुनियाद: प्रोग्रामिंग, सॉफ्टवेयर की समझ और डिजिटल सिस्टम।',
    MBA: 'प्रबंधन और नेतृत्व में रुचि रखने वालों के लिए उन्नत व्यवसाय अध्ययन।',
    MCA: 'कंप्यूटिंग, सॉफ्टवेयर विकास और तकनीकी अनुप्रयोगों का उन्नत अध्ययन।',
    ANM: 'नर्सिंग और सामुदायिक स्वास्थ्य का अध्ययन। कोर्स, मान्यता और वर्तमान पात्रता संस्थान से जाँचें।',
    GNM: 'सामान्य नर्सिंग और रोगी-देखभाल की बुनियाद। वर्तमान आवश्यकताएँ संस्थान से पक्की करें।',
    'B.Sc. Nursing': 'स्वास्थ्य विज्ञान और क्लिनिकल सीख को जोड़ने वाला स्नातक नर्सिंग कोर्स।',
    'Other course': 'अपनी रुचि के विषय और आगे के विकल्पों की तुलना करें। प्रवेश नियम संस्थान से जाँचें।',
  },
};

function getRecommendations(level, interest) {
  if (level === 'class10') return interest === 'healthcare' ? ['ANM'] : ['Other course'];
  if (level === 'class12') {
    if (interest === 'business') return ['BBA'];
    if (interest === 'technology') return ['BCA'];
    if (interest === 'healthcare') return ['ANM', 'GNM', 'B.Sc. Nursing'];
    return ['BBA', 'BCA', 'GNM'];
  }
  if (interest === 'business') return ['MBA'];
  if (interest === 'technology') return ['MCA'];
  if (interest === 'healthcare') return ['ANM', 'GNM', 'B.Sc. Nursing'];
  return ['MBA', 'MCA'];
}

function CourseFinder() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const t = (english, hindi) => hi ? hindi : english;
  const [level, setLevel] = useState('');
  const [interest, setInterest] = useState('');
  const [showResults, setShowResults] = useState(false);
  const recommendations = useMemo(() => getRecommendations(level, interest), [level, interest]);

  useEffect(() => {
    document.title = hi ? 'कोर्स और करियर खोजें | EYEPEK' : 'Course & Career Finder | Explore Courses | EYEPEK';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = hi ? 'BBA, BCA, MBA, MCA और नर्सिंग कोर्स विकल्प जानें। EYEPEK के निःशुल्क कोर्स टूल में दो सवालों के जवाब दें।' : 'Explore BBA, BCA, MBA, MCA and nursing course directions with EYEPEK’s free Course & Career Finder. Answer two quick questions to get started.';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.eyepek.com/course-finder';
  }, [hi]);

  const startAgain = () => {
    setShowResults(false);
    setLevel('');
    setInterest('');
  };

  return (
    <main className='min-h-[65vh] bg-gradient-to-b from-blue-50 to-white px-5 py-12 sm:px-8 lg:py-16'>
      <div className='mx-auto max-w-5xl'>
        <p className='text-sm font-bold uppercase tracking-[0.18em] text-orange-600'>Free student tool</p>
        <h1 className='mt-3 text-3xl font-extrabold leading-tight text-blue-950 sm:text-4xl'>{t('Find a course direction that fits you', 'अपने लिए सही कोर्स का रास्ता खोजें')}</h1>
        <p className='mt-4 max-w-3xl text-base leading-7 text-slate-600'>{t('Answer two quick questions about your education and interests. Get a few course options to explore with EYEPEK.', 'अपनी पढ़ाई और रुचि के बारे में दो छोटे सवालों के जवाब दें। EYEPEK के साथ कुछ कोर्स विकल्प देखें।')}</p>

        {!showResults ? (
          <section className='mt-8 grid gap-6 lg:grid-cols-2'>
            <fieldset className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
              <legend className='px-2 text-lg font-bold text-blue-950'>{t('1. What have you completed?', '1. आपने कौन-सी कक्षा/पढ़ाई पूरी की है?')}</legend>
              <div className='mt-2 space-y-3'>
                {levels.map((item) => (
                  <label key={item.value} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${level === item.value ? 'border-orange-400 bg-orange-50' : 'border-slate-200 hover:border-blue-300'}`}>
                    <input type='radio' name='education-level' value={item.value} checked={level === item.value} onChange={() => setLevel(item.value)} className='mt-1 h-4 w-4 accent-orange-500' />
                    <span><span className='block font-bold text-blue-950'>{t(item.title, item.titleHi)}</span><span className='mt-1 block text-sm text-slate-500'>{t(item.detail, item.detailHi)}</span></span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
              <legend className='px-2 text-lg font-bold text-blue-950'>{t('2. What interests you most?', '2. आपकी रुचि किस क्षेत्र में है?')}</legend>
              <div className='mt-2 space-y-3'>
                {interests.map((item) => (
                  <label key={item.value} className={`flex cursor-pointer flex-col rounded-xl border p-4 transition ${interest === item.value ? 'border-orange-400 bg-orange-50' : 'border-slate-200 hover:border-blue-300'}`}>
                    <span className='flex items-center gap-3'>
                      <input type='radio' name='interest' value={item.value} checked={interest === item.value} onChange={() => setInterest(item.value)} className='h-4 w-4 shrink-0 accent-orange-500' />
                      <img src={item.imageSrc || '/images/course-paths-triptych.png'} alt={item.imageAlt} loading='lazy' className='h-24 w-24 shrink-0 rounded-lg object-cover' style={{ objectPosition: item.imagePosition || 'center' }} />
                      <span><span className='block font-bold text-blue-950'>{t(item.title, item.titleHi)}</span><span className='mt-1 block text-sm text-slate-500'>{t(item.detail, item.detailHi)}</span></span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        ) : (
          <section className='mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8' aria-live='polite'>
            <p className='text-sm font-bold uppercase tracking-widest text-orange-600'>{t('Your options to explore', 'देखने के लिए आपके विकल्प')}</p>
            <h2 className='mt-2 text-2xl font-bold text-blue-950'>{t('Based on your answers', 'आपके जवाबों के आधार पर')}</h2>
            <p className='mt-2 text-slate-600'>{t('These are starting points for research, not a formal assessment or admission decision.', 'ये आगे जानकारी जुटाने के शुरुआती सुझाव हैं, औपचारिक मूल्यांकन या प्रवेश का निर्णय नहीं।')}</p>
            <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {recommendations.map((course) => (
                <article key={course} className='rounded-xl border border-slate-200 bg-slate-50 p-5'>
                  <h3 className='text-xl font-extrabold text-blue-950'>{course}</h3>
                  <p className='mt-2 text-sm leading-6 text-slate-600'>{courseInfo[hi ? 'hi' : 'en'][course]}</p>
                  <Link to={`/contact?course=${encodeURIComponent(course)}`} className='mt-4 inline-flex items-center font-bold text-orange-700 hover:text-orange-900'>{t('Ask about ' + course, course + ' के बारे में पूछें')} <span className='ml-2' aria-hidden='true'>→</span></Link>
                </article>
              ))}
            </div>
            <button type='button' onClick={startAgain} className='mt-7 font-semibold text-blue-900 underline decoration-blue-300 underline-offset-4'>{t('Start again', 'फिर से शुरू करें')}</button>
          </section>
        )}

        {!showResults && (
          <div className='mt-6 flex flex-col gap-4 rounded-2xl bg-blue-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6'>
            <p className='text-sm leading-6 text-blue-100'>{t('Your answers stay in this browser page; we do not save them. Recommendations are general—confirm course availability and eligibility with the institution.', 'आपके जवाब इसी ब्राउज़र पेज पर रहते हैं; हम उन्हें सेव नहीं करते। ये सामान्य सुझाव हैं—कोर्स उपलब्धता और पात्रता संस्थान से पक्की करें।')}</p>
            <button type='button' disabled={!level || !interest} onClick={() => setShowResults(true)} className='shrink-0 rounded-lg bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'>{t('See course options', 'कोर्स विकल्प देखें')} <span aria-hidden='true'>→</span></button>
          </div>
        )}

        <p className='mt-6 text-sm text-slate-500'><Link to='/admission-checklist' className='font-semibold text-blue-900 underline underline-offset-4'>{t('Make a free admission document checklist', 'निःशुल्क प्रवेश दस्तावेज़ चेकलिस्ट बनाएँ')}</Link></p>
      </div>
    </main>
  );
}

export default CourseFinder;
