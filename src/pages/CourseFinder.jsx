import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const levels = [
  { value: 'class10', title: 'Completed Class 10', detail: 'I am planning my next education step' },
  { value: 'class12', title: 'Completed Class 12', detail: 'I am exploring undergraduate courses' },
  { value: 'graduate', title: 'Completed graduation', detail: 'I am exploring postgraduate options' },
];

const interests = [
  { value: 'business', title: 'Business & management', detail: 'Business, teams, marketing or entrepreneurship', imagePosition: '0% center', imageAlt: 'Indian college students discussing a business project' },
  { value: 'technology', title: 'Computers & technology', detail: 'Software, computers or digital tools', imagePosition: '50% center', imageAlt: 'Indian student learning programming in a computer lab' },
  { value: 'healthcare', title: 'Healthcare', detail: 'Patient care and health services', imagePosition: '100% center', imageAlt: 'Nursing student practising in a clinical training lab' },
  { value: 'unsure', title: 'I am still exploring', detail: 'Help me compare a few broad directions', imagePosition: '50% center', imageAlt: 'Students exploring different areas of study' },
];

const courseInfo = {
  BBA: 'Explore business, management and entrepreneurship foundations.',
  BCA: 'Explore computing, software and digital technology foundations.',
  MBA: 'Explore advanced business and management study.',
  MCA: 'Explore postgraduate computing and software study.',
  ANM: 'Explore an entry path in nursing and community health; check current eligibility carefully.',
  GNM: 'Explore general nursing study; check current eligibility carefully.',
  'B.Sc. Nursing': 'Explore undergraduate nursing study; check current eligibility carefully.',
  'Other course': 'Compare subject choices and pathways that match your interests. Many college courses require Class 12; confirm entry rules before deciding.',
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
  const [level, setLevel] = useState('');
  const [interest, setInterest] = useState('');
  const [showResults, setShowResults] = useState(false);
  const recommendations = useMemo(() => getRecommendations(level, interest), [level, interest]);

  useEffect(() => {
    document.title = 'Course & Career Finder | Explore Courses | EYEPEK';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = 'Explore BBA, BCA, MBA, MCA and nursing course directions with EYEPEK’s free Course & Career Finder. Answer two quick questions to get started.';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.eyepek.com/course-finder';
  }, []);

  const startAgain = () => {
    setShowResults(false);
    setLevel('');
    setInterest('');
  };

  return (
    <main className='min-h-[65vh] bg-gradient-to-b from-blue-50 to-white px-5 py-12 sm:px-8 lg:py-16'>
      <div className='mx-auto max-w-5xl'>
        <p className='text-sm font-bold uppercase tracking-[0.18em] text-orange-600'>Free student tool</p>
        <h1 className='mt-3 text-3xl font-extrabold leading-tight text-blue-950 sm:text-4xl'>Find a course direction that fits you</h1>
        <p className='mt-4 max-w-3xl text-base leading-7 text-slate-600'>Answer two quick questions about your education and interests. Get a few course options to explore with EYEPEK.</p>

        {!showResults ? (
          <section className='mt-8 grid gap-6 lg:grid-cols-2'>
            <fieldset className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
              <legend className='px-2 text-lg font-bold text-blue-950'>1. What have you completed?</legend>
              <div className='mt-2 space-y-3'>
                {levels.map((item) => (
                  <label key={item.value} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${level === item.value ? 'border-orange-400 bg-orange-50' : 'border-slate-200 hover:border-blue-300'}`}>
                    <input type='radio' name='education-level' value={item.value} checked={level === item.value} onChange={() => setLevel(item.value)} className='mt-1 h-4 w-4 accent-orange-500' />
                    <span><span className='block font-bold text-blue-950'>{item.title}</span><span className='mt-1 block text-sm text-slate-500'>{item.detail}</span></span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
              <legend className='px-2 text-lg font-bold text-blue-950'>2. What interests you most?</legend>
              <div className='mt-2 space-y-3'>
                {interests.map((item) => (
                  <label key={item.value} className={`flex cursor-pointer flex-col rounded-xl border p-4 transition ${interest === item.value ? 'border-orange-400 bg-orange-50' : 'border-slate-200 hover:border-blue-300'}`}>
                    <span className='flex items-start gap-3'>
                      <input type='radio' name='interest' value={item.value} checked={interest === item.value} onChange={() => setInterest(item.value)} className='mt-1 h-4 w-4 accent-orange-500' />
                      <span><span className='block font-bold text-blue-950'>{item.title}</span><span className='mt-1 block text-sm text-slate-500'>{item.detail}</span></span>
                    </span>
                    <img src='/images/course-paths-triptych.png' alt={item.imageAlt} loading='lazy' className='mt-4 h-32 w-full rounded-lg object-cover sm:h-36' style={{ objectPosition: item.imagePosition }} />
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        ) : (
          <section className='mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8' aria-live='polite'>
            <p className='text-sm font-bold uppercase tracking-widest text-orange-600'>Your options to explore</p>
            <h2 className='mt-2 text-2xl font-bold text-blue-950'>Based on your answers</h2>
            <p className='mt-2 text-slate-600'>These are starting points for research, not a formal assessment or admission decision.</p>
            <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {recommendations.map((course) => (
                <article key={course} className='rounded-xl border border-slate-200 bg-slate-50 p-5'>
                  <h3 className='text-xl font-extrabold text-blue-950'>{course}</h3>
                  <p className='mt-2 text-sm leading-6 text-slate-600'>{courseInfo[course]}</p>
                  <Link to={`/contact?course=${encodeURIComponent(course)}`} className='mt-4 inline-flex items-center font-bold text-orange-700 hover:text-orange-900'>Ask about {course} <span className='ml-2' aria-hidden='true'>→</span></Link>
                </article>
              ))}
            </div>
            <button type='button' onClick={startAgain} className='mt-7 font-semibold text-blue-900 underline decoration-blue-300 underline-offset-4'>Start again</button>
          </section>
        )}

        {!showResults && (
          <div className='mt-6 flex flex-col gap-4 rounded-2xl bg-blue-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6'>
            <p className='text-sm leading-6 text-blue-100'>Your answers stay in this browser page; we do not save them. Recommendations are general—confirm course availability and eligibility with the institution.</p>
            <button type='button' disabled={!level || !interest} onClick={() => setShowResults(true)} className='shrink-0 rounded-lg bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'>See course options <span aria-hidden='true'>→</span></button>
          </div>
        )}

        <p className='mt-6 text-sm text-slate-500'><Link to='/admission-checklist' className='font-semibold text-blue-900 underline underline-offset-4'>Make a free admission document checklist</Link></p>
      </div>
    </main>
  );
}

export default CourseFinder;
