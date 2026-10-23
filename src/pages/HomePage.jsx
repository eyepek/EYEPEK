import React from 'react';

const highlights = [
  { number: '01', title: 'Learn with purpose', description: 'Build a strong foundation through focused learning and practical curiosity.', color: 'border-orange-500' },
  { number: '02', title: 'Grow with guidance', description: 'Get support as you develop confidence, ideas, and the skills to move forward.', color: 'border-red-600' },
  { number: '03', title: 'Prepare for what’s next', description: 'Connect your education with your ambitions and the opportunities ahead.', color: 'border-blue-700' },
];

const HomePage = () => (
  <main className='bg-white text-slate-900'>
    <section className='relative isolate min-h-[610px] overflow-hidden bg-blue-950 text-white md:min-h-[680px]'>
      <img className='absolute inset-0 -z-20 h-full w-full object-cover' src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=85&w=2000&auto=format&fit=crop&crop=faces' alt='Students learning and collaborating on campus' />
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/95 via-blue-950/80 to-red-950/45' />
      <div className='mx-auto flex min-h-[610px] max-w-7xl items-center px-6 py-20 md:min-h-[680px] md:px-10'>
        <div className='max-w-3xl'>
          <p className='mb-5 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300'><span className='h-1 w-10 bg-orange-400' /> EYEPEK COLLEGE</p>
          <h1 className='text-4xl font-black leading-tight sm:text-5xl md:text-7xl'>Learn with confidence.<br /><span className='text-orange-300'>Build what’s next.</span></h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl'>A student-focused college experience shaped around learning, personal growth, and your future ambitions.</p>
          <div className='mt-9 flex flex-wrap gap-4'><a href='tel:7004374250' className='rounded-md bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-400'>Call Admissions</a><a href='#learning' className='rounded-md border border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950'>Explore EYEPEK</a></div>
          <div className='mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/25 pt-5 text-sm font-semibold text-blue-100'><span>Student-first learning</span><span className='text-orange-300'>◆</span><span>Academic guidance</span><span className='text-red-300'>◆</span><span>Room to grow</span></div>
        </div>
      </div>
      <div className='absolute bottom-0 right-0 hidden h-36 w-1/3 bg-orange-500/90 md:block' />
    </section>

    <section id='learning' className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
      <div className='grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>The EYEPEK experience</p><h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>A college experience built around you.</h2></div><p className='max-w-2xl text-lg leading-8 text-slate-600'>Great learning is more than a classroom. It’s the encouragement to ask questions, the guidance to find your strengths, and the confidence to take your next step.</p></div>
      <div className='mt-12 grid gap-5 md:grid-cols-3'>{highlights.map((item) => <article key={item.number} className={`rounded-xl border border-slate-200 border-t-4 ${item.color} bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}><p className='text-sm font-black tracking-widest text-orange-600'>{item.number}</p><h3 className='mt-5 text-xl font-bold text-blue-950'>{item.title}</h3><p className='mt-3 leading-7 text-slate-600'>{item.description}</p></article>)}</div>
    </section>

    <section id='about' className='bg-blue-50'><div className='mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:px-10 md:py-24'><div className='relative min-h-[340px] overflow-hidden rounded-2xl bg-blue-900'><img className='absolute inset-0 h-full w-full object-cover' src='https://images.unsplash.com/photo-1562774053-701939374585?q=85&w=1200&auto=format&fit=crop' alt='University campus building' loading='lazy' /><div className='absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent' /><p className='absolute bottom-6 left-6 text-sm font-bold uppercase tracking-[0.18em] text-white'>Your next chapter starts here</p></div><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>About EYEPEK</p><h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>Knowledge that moves you forward.</h2><p className='mt-6 leading-8 text-slate-600'>EYEPEK College is committed to helping students learn, discover their potential, and prepare for the opportunities ahead. We believe every student deserves a supportive place to grow.</p><a href='tel:7004374250' className='mt-8 inline-flex items-center gap-3 font-bold text-blue-900 hover:text-red-600'>Talk to our team <span aria-hidden='true'>→</span></a></div></div></section>

    <section id='campus' className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'><div className='flex flex-col justify-between gap-5 md:flex-row md:items-end'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Learning beyond the lecture</p><h2 className='mt-3 text-3xl font-extrabold text-blue-950 md:text-5xl'>Find your place to thrive.</h2></div><p className='max-w-xl leading-7 text-slate-600'>A welcoming college community gives students space to learn together, build confidence, and explore new ideas.</p></div><div className='mt-10 grid gap-5 sm:grid-cols-2'><div className='group relative min-h-[300px] overflow-hidden rounded-xl bg-blue-900'><img className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105' src='https://images.unsplash.com/photo-1529390079861-591de354faf5?q=85&w=1200&auto=format&fit=crop' alt='Students taking part in a campus activity' loading='lazy' /><div className='absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/10 to-transparent' /><h3 className='absolute bottom-6 left-6 text-2xl font-bold text-white'>Learn together</h3></div><div className='group relative min-h-[300px] overflow-hidden rounded-xl bg-red-900'><img className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105' src='https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=85&w=1200&auto=format&fit=crop' alt='Students collaborating on a project' loading='lazy' /><div className='absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/10 to-transparent' /><h3 className='absolute bottom-6 left-6 text-2xl font-bold text-white'>Create what’s next</h3></div></div></section>

    <section id='admissions' className='bg-blue-950 text-white'><div className='mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20'><div><p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Take your next step</p><h2 className='mt-3 text-3xl font-extrabold md:text-5xl'>Let’s talk about your future.</h2><p className='mt-4 text-blue-100'>Call EYEPEK College for admissions and course information.</p></div><a href='tel:7004374250' className='shrink-0 rounded-md bg-orange-500 px-8 py-4 text-center font-bold text-white transition hover:bg-orange-400'>Call 7004374250</a></div></section>
  </main>
);

export default HomePage;
