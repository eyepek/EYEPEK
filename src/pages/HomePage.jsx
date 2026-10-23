import React from 'react';

const highlights = [
  {
    number: '01',
    title: 'Learn with purpose',
    description: 'Build a strong foundation through focused learning and practical curiosity.',
    color: 'border-orange-500',
  },
  {
    number: '02',
    title: 'Grow with guidance',
    description: 'Get support as you develop confidence, ideas, and the skills to move forward.',
    color: 'border-red-600',
  },
  {
    number: '03',
    title: 'Prepare for what’s next',
    description: 'Connect your education with your ambitions and the opportunities ahead.',
    color: 'border-blue-700',
  },
];

const studentSupport = [
  {
    number: '01',
    title: 'College Affiliation Support',
    description: 'Guidance on affiliation-related requirements, processes, and where to find the right information for your institution.',
    color: 'border-blue-700',
    label: 'Institutional guidance',
  },
  {
    number: '02',
    title: 'Document Support',
    description: 'Help understanding common admission documents, preparing a checklist, and organising your paperwork.',
    color: 'border-orange-500',
    label: 'Paperwork made clearer',
  },
  {
    number: '03',
    title: 'Admission & Career Support',
    description: 'Personal guidance to help you explore admission next steps and think through your education and career goals.',
    color: 'border-red-600',
    label: 'Guidance for your next step',
  },
];

const HomePage = () => (
  <main className='bg-white text-slate-900'>
    <section className='relative isolate min-h-[610px] overflow-hidden bg-blue-950 text-white md:min-h-[680px]'>
      <img
        className='absolute inset-0 -z-20 h-full w-full object-cover'
        src='/images/golghar-patna.jpg'
        alt='Golghar, a historic landmark in Patna, Bihar'
      />
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/95 via-blue-950/80 to-red-950/45' />
      <div className='mx-auto flex min-h-[610px] max-w-7xl items-center px-6 py-20 md:min-h-[680px] md:px-10'>
        <div className='max-w-3xl'>
          <p className='mb-5 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>
            <span className='h-1 w-10 bg-orange-400' /> EYEPEK COLLEGE · PATNA, BIHAR
          </p>
          <h1 className='text-4xl font-black leading-tight sm:text-5xl md:text-7xl'>
            Learn with confidence.<br />
            <span className='text-orange-300'>Build what’s next.</span>
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl'>
            A student-focused college experience shaped around learning, personal growth, and your future ambitions.
          </p>
          <div className='mt-9 flex flex-wrap gap-4'>
            <a href='tel:7004374250' className='rounded-md bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-400'>Call Admissions</a>
            <a href='#learning' className='rounded-md border border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950'>Explore EYEPEK</a>
          </div>
          <div className='mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/25 pt-5 text-sm font-semibold text-blue-100'>
            <span>Student-first learning</span><span className='text-orange-300'>◆</span>
            <span>Academic guidance</span><span className='text-red-300'>◆</span>
            <span>Room to grow</span>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 right-0 hidden h-36 w-1/3 bg-orange-500/90 md:block' />
    </section>

    <section id='learning' className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
      <div className='grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>The EYEPEK experience</p>
          <h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>A college experience built around you.</h2>
        </div>
        <p className='max-w-2xl text-lg leading-8 text-slate-600'>
          Great learning is more than a classroom. It’s the encouragement to ask questions, the guidance to find your strengths, and the confidence to take your next step.
        </p>
      </div>
      <div className='mt-12 grid gap-5 md:grid-cols-3'>
        {highlights.map((item) => (
          <article key={item.number} className={`rounded-xl border border-slate-200 border-t-4 ${item.color} bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
            <p className='text-sm font-black tracking-widest text-orange-600'>{item.number}</p>
            <h3 className='mt-5 text-xl font-bold text-blue-950'>{item.title}</h3>
            <p className='mt-3 leading-7 text-slate-600'>{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section id='student-support' className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <div className='max-w-3xl'>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>Here to help you move forward</p>
          <h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>Support for your college journey.</h2>
          <p className='mt-5 text-lg leading-8 text-slate-600'>Get practical guidance with college affiliation processes, important documents, admissions, and career planning.</p>
        </div>
        <div className='mt-10 grid gap-5 md:grid-cols-3'>
          {studentSupport.map((item) => (
            <article key={item.number} className={`rounded-xl border border-slate-200 border-t-4 ${item.color} bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
              <p className='text-xs font-black uppercase tracking-[0.16em] text-orange-700'>{item.label}</p>
              <h3 className='mt-4 text-xl font-bold text-blue-950'>{item.title}</h3>
              <p className='mt-3 leading-7 text-slate-600'>{item.description}</p>
              <a href='/contact' className='mt-6 inline-flex items-center gap-2 font-bold text-blue-900 hover:text-red-600'>Ask us about this <span aria-hidden='true'>→</span></a>
            </article>
          ))}
        </div>
        <p className='mt-6 text-sm leading-6 text-slate-500'>Affiliation support means process guidance and information. It does not represent or guarantee approval, accreditation, or affiliation by any authority.</p>
      </div>
    </section>

    <section id='about' className='bg-blue-50'>
      <div className='mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:px-10 md:py-24'>
        <div className='relative min-h-[340px] overflow-hidden rounded-2xl bg-blue-900'>
          <img className='absolute inset-0 h-full w-full object-cover' src='/images/ganga-patna.jpg' alt='The Ganges, Gandhi Setu, and Patna skyline' loading='lazy' />
          <div className='absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent' />
          <p className='absolute bottom-6 left-6 text-sm font-bold uppercase tracking-[0.18em] text-white'>Patna, Bihar</p>
        </div>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>About EYEPEK</p>
          <h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>Knowledge that moves you forward.</h2>
          <p className='mt-6 leading-8 text-slate-600'>
            EYEPEK College is committed to helping students learn, discover their potential, and prepare for the opportunities ahead. We believe every student deserves a supportive place to grow.
          </p>
          <a href='tel:7004374250' className='mt-8 inline-flex items-center gap-3 font-bold text-blue-900 hover:text-red-600'>Talk to our team <span aria-hidden='true'>→</span></a>
        </div>
      </div>
    </section>

    <section id='campus' className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
      <div className='flex flex-col justify-between gap-5 md:flex-row md:items-end'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-600'>Our home city</p>
          <h2 className='mt-3 text-3xl font-extrabold text-blue-950 md:text-5xl'>Rooted in Patna, Bihar.</h2>
        </div>
        <p className='max-w-xl leading-7 text-slate-600'>EYEPEK College is based in Patna. Here are a couple of familiar landmarks from the city we call home.</p>
      </div>
      <div className='mt-10 grid gap-5 sm:grid-cols-2'>
        <div className='group relative min-h-[300px] overflow-hidden rounded-xl bg-blue-900'>
          <img className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105' src='/images/golghar-patna.jpg' alt='Golghar and its gardens in Patna' loading='lazy' />
          <div className='absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/10 to-transparent' />
          <h3 className='absolute bottom-6 left-6 text-2xl font-bold text-white'>Golghar, Patna</h3>
        </div>
        <div className='group relative min-h-[300px] overflow-hidden rounded-xl bg-red-900'>
          <img className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105' src='/images/ganga-patna.jpg' alt='The Ganges and Gandhi Setu beside Patna city' loading='lazy' />
          <div className='absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/10 to-transparent' />
          <h3 className='absolute bottom-6 left-6 text-2xl font-bold text-white'>Ganga &amp; Gandhi Setu</h3>
        </div>
      </div>
    </section>

    <section id='faq' className='bg-slate-50'>
      <div className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>Quick answers</p>
        <h2 className='mt-3 text-3xl font-extrabold text-blue-950 md:text-5xl'>Frequently asked questions</h2>
        <div className='mt-9 grid gap-4 md:grid-cols-2'>
          {[
            ['How can I get course and fee details?', 'Call EYEPEK College on 7004374250 to confirm current course availability and fees.'],
            ['How do I ask about admission?', 'Call the admissions team or send an enquiry through the admissions page.'],
            ['Can I ask about a course not listed here?', 'Yes. Add the course you are interested in to the enquiry form, and ask the team for guidance.'],
            ['What should I share when I enquire?', 'Your name, phone number, course of interest, and any questions you have are a good start.'],
          ].map(([question, answer]) => (
            <details key={question} className='group rounded-xl border border-slate-200 bg-white p-6 open:border-blue-200 open:shadow-sm'>
              <summary className='cursor-pointer list-none pr-8 font-bold text-blue-950 marker:hidden'>{question}<span className='float-right text-xl text-orange-600 transition group-open:rotate-45' aria-hidden='true'>+</span></summary>
              <p className='mt-4 leading-7 text-slate-600'>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section id='admissions' className='bg-blue-950 text-white'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-20'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Take your next step</p>
          <h2 className='mt-3 text-3xl font-extrabold md:text-5xl'>Let’s talk about your future.</h2>
          <p className='mt-4 text-blue-100'>Call EYEPEK College for admissions and course information.</p>
        </div>
        <div className='flex flex-wrap gap-3'>
          <a href='/contact' className='shrink-0 rounded-md border border-white/60 px-6 py-4 text-center font-bold text-white transition hover:bg-white hover:text-blue-950'>Send an enquiry</a>
          <a href='tel:7004374250' className='shrink-0 rounded-md bg-orange-500 px-8 py-4 text-center font-bold text-white transition hover:bg-orange-400'>Call 7004374250</a>
        </div>
      </div>
    </section>
  </main>
);

export default HomePage;
