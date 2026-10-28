import React from 'react';
import { courses } from '../courses';

const highlights = [
  {
    number: '01',
    title: 'Explore your options',
    description: 'Compare course paths and understand which direction fits your interests and goals.',
    color: 'border-orange-500',
    accent: 'bg-orange-500',
  },
  {
    number: '02',
    title: 'Get the details right',
    description: 'Get clear on eligibility, applications, and the documents you may need.',
    color: 'border-red-600',
    accent: 'bg-red-600',
  },
  {
    number: '03',
    title: 'Take your next step',
    description: 'Move ahead with practical admission guidance and a plan for what comes next.',
    color: 'border-blue-700',
    accent: 'bg-blue-700',
  },
];

const studentSupport = [
  {
    number: '01',
    title: 'College Affiliation Support',
    description: 'Guidance on State University affiliation processes and AICTE-related work, including application and compliance documentation.',
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
  {
    number: '04',
    title: 'Home & IT Services',
    description: 'Find help for everyday home and technical needs, including plumbing, electrical work, computer and IT support, Wi-Fi and networking, printer setup, CCTV, and general troubleshooting.',
    color: 'border-orange-500',
    label: 'Practical help at home and work',
  },
];

const HomePage = () => (
  <main className='bg-white text-slate-900'>
    <section className='relative isolate min-h-[610px] overflow-hidden bg-blue-950 text-white md:min-h-[680px]'>
      <img
        className='absolute inset-0 -z-20 h-full w-full object-cover'
        src='/images/students-campus.jpg'
        alt='Students studying together outdoors in a campus setting (illustrative photo)'
      />
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/95 via-blue-950/80 to-red-950/45' />
      <div className='mx-auto flex min-h-[610px] max-w-7xl items-center px-6 py-20 md:min-h-[680px] md:px-10'>
        <div className='max-w-3xl'>
          <p className='mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-200 backdrop-blur-sm sm:text-sm'>
            <span className='h-2 w-2 rounded-full bg-orange-400' /> EYEPEK COLLEGE
          </p>
          <h1 className='text-4xl font-black leading-tight sm:text-5xl md:text-7xl'>
            Learn with confidence.<br />
            <span className='text-orange-300'>Build what’s next.</span>
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl'>
            Explore your next step with course information, admission consultancy, and practical guidance for your college journey.
          </p>
          <div className='mt-9 flex flex-wrap gap-4'>
            <a href='#admissions' className='rounded-md bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-400'>Explore Courses</a>
            <a href='/contact' className='rounded-md border border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950'>Send an enquiry</a>
            <a href='tel:7004374250' className='rounded-md px-3 py-3.5 font-bold text-white underline decoration-white/50 underline-offset-4 transition hover:text-orange-200'>Call 7004374250</a>
          </div>
          <div className='mt-10 flex flex-wrap gap-2 border-t border-white/25 pt-5 text-sm font-semibold text-blue-50'>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>Course information</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>Admission consultancy</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>College support</span>
          </div>
        </div>
      </div>
    </section>

    <section id='learning' className='overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60'>
      <div className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <div className='grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>Your next step, made clearer</p>
            <h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>A clearer path from course choice to admission.</h2>
          </div>
          <p className='max-w-2xl text-lg leading-8 text-slate-600'>
            Choosing what to study can feel like a big decision. Get straightforward information and practical guidance at each step of your college journey.
          </p>
        </div>
        <div className='mt-12 grid gap-5 md:grid-cols-3'>
          {highlights.map((item) => (
            <article key={item.number} className={`group relative overflow-hidden rounded-2xl border border-white/80 border-t-4 ${item.color} bg-white p-7 shadow-md shadow-blue-950/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10`}>
              <div className='flex items-center justify-between'>
                <span className={`h-1.5 w-12 rounded-full ${item.accent}`} aria-hidden='true' />
                <p className='text-sm font-black tracking-[0.18em] text-slate-400'>{item.number}</p>
              </div>
              <h3 className='mt-8 text-xl font-bold text-blue-950'>{item.title}</h3>
              <p className='mt-3 min-h-14 leading-7 text-slate-600'>{item.description}</p>
              <a href='#admissions' className='mt-6 inline-flex items-center gap-2 font-bold text-blue-900 transition group-hover:text-orange-600'>Explore courses <span aria-hidden='true'>→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id='student-support' className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <div className='max-w-3xl'>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>Here to help you move forward</p>
          <h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>Services for students, homes, and businesses.</h2>
          <p className='mt-5 text-lg leading-8 text-slate-600'>From education and college documentation to home maintenance and IT support, explore practical services for your everyday needs.</p>
        </div>
        <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
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
          <img className='absolute inset-0 h-full w-full object-cover' src='/images/students-classroom.jpg' alt='College students studying together in a classroom (illustrative photo)' loading='lazy' />
          <div className='absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent' />
          <p className='absolute bottom-6 left-6 text-sm font-bold uppercase tracking-[0.18em] text-white'>Students learning together</p>
        </div>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>About EYEPEK</p>
          <h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>Practical guidance for students and colleges.</h2>
          <p className='mt-6 leading-8 text-slate-600'>
            EYEPEK College helps people take clearer next steps in education. Students can get guidance on course choices—including BBA, BCA, MBA, MCA, ANM, GNM, and B.Sc. (Nursing)—as well as eligibility, applications, admission documents, and career planning.
          </p>
          <p className='mt-4 leading-8 text-slate-600'>
            We also guide colleges through State University affiliation processes and AICTE-related documentation and compliance work. Our role is to explain processes and help organise next steps; course availability and all affiliation or approval decisions must be confirmed with the relevant institution or authority.
          </p>
          <div className='mt-7 grid gap-3 sm:grid-cols-2'>
            <div className='rounded-lg border border-blue-100 bg-white p-4'>
              <h3 className='font-bold text-blue-950'>For students</h3>
              <p className='mt-1 text-sm leading-6 text-slate-600'>Course, admission, document, and career guidance.</p>
            </div>
            <div className='rounded-lg border border-blue-100 bg-white p-4'>
              <h3 className='font-bold text-blue-950'>For colleges</h3>
              <p className='mt-1 text-sm leading-6 text-slate-600'>Affiliation process and AICTE-related support.</p>
            </div>
          </div>
          <a href='tel:7004374250' className='mt-7 inline-flex items-center gap-3 font-bold text-blue-900 hover:text-red-600'>Talk to our team: 7004374250 <span aria-hidden='true'>→</span></a>
        </div>
      </div>
    </section>

    <section id='campus' className='bg-blue-950 text-white'>
      <div className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <div className='grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center'>
          <div className='py-2'>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Your journey · your future</p>
            <h2 className='mt-4 text-3xl font-extrabold leading-tight md:text-5xl'>Explore your options. Move forward with confidence.</h2>
            <p className='mt-5 max-w-xl text-lg leading-8 text-blue-100'>College is shaped by the questions you ask, the people you meet, and the ideas you share along the way.</p>
            <a href='#admissions' className='mt-8 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-400'>Explore courses <span aria-hidden='true'>→</span></a>
          </div>
          <figure className='group relative overflow-hidden rounded-3xl bg-blue-900 shadow-2xl shadow-black/20'>
            <img className='block aspect-[4/3] max-h-[34rem] w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]' src='/images/students-library.jpg' alt='Students sharing ideas and studying together (representative photo)' loading='lazy' />
            <div className='absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent' aria-hidden='true' />
            <figcaption className='absolute inset-x-0 bottom-0 px-6 py-6 text-sm font-semibold text-white sm:px-8 sm:py-8'>Good conversations can open new possibilities.</figcaption>
          </figure>
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
            ['What does admission consultancy cover?', 'Get guidance on course and college options, eligibility, application steps, and required documents. Final admission decisions are made by the institution.'],
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
          <p className='mt-4 text-blue-100'>Ask the admissions team about course availability, eligibility, and fees.</p>
          <div className='mt-6'>
            <p className='text-sm font-bold text-orange-200'>Courses to enquire about</p>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {courses.map((course) => <li key={course} className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold'>{course}</li>)}
              <li className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold'>And more</li>
            </ul>
            <p className='mt-3 text-sm text-blue-200'>Confirm current availability and admission details with the college team.</p>
          </div>
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
