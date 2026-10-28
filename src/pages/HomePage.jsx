import React from 'react';
import { FaUniversity, FaFileAlt, FaGraduationCap, FaTools, FaArrowRight } from 'react-icons/fa';
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
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Students studying together',
    title: 'Education Services',
    description: 'Course information, admission guidance, document checklists, and career support for students exploring BBA, BCA, MBA, MCA, and other courses. Confirm availability and eligibility with the relevant institution.',
    color: 'border-blue-700',
    label: 'Courses & admissions',
  },
  {
    number: '02',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'IT technician working with computer equipment',
    title: 'IT Support Services',
    description: 'Computer and laptop troubleshooting, software installation, operating system setup, printer support, Wi-Fi and networking help, data recovery guidance, remote support, and annual maintenance contracts.',
    color: 'border-orange-500',
    label: 'Technology & repairs',
  },
  {
    number: '03',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Electrician working on a home electrical installation',
    title: 'Home Services',
    description: 'Home plumbing, electrician services, fan and light fitting, appliance installation and repair, AC installation support, CCTV installation, and everyday home maintenance requests.',
    color: 'border-red-600',
    label: 'Help around the home',
  },
  {
    number: '04',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Business documents arranged on a desk',
    title: 'Business & Institution Support',
    description: 'Office IT setup, printer and network support, document organisation, project report assistance, and guidance with college affiliation and compliance paperwork. Official approvals remain the authority’s decision.',
    color: 'border-blue-700',
    label: 'Business & college support',
  },
  {
    number: '05',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Professionals discussing plans together',
    title: 'Guidance & Support',
    description: 'Education and career guidance, course selection support, application steps, skill development direction, and help understanding which service is suitable for your needs.',
    color: 'border-orange-500',
    label: 'Practical next steps',
  },
  {
    number: '06',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Computer equipment and technology accessories',
    title: 'CCTV, Printer & Other Services',
    description: 'CCTV and security camera setup, printer installation, server and office equipment support, Wi-Fi setup, routine maintenance, and tailored service requests for homes and small businesses.',
    color: 'border-red-600',
    label: 'More everyday solutions',
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
            <span className='h-2 w-2 rounded-full bg-orange-400' /> EYEPEK
          </p>
          <h1 className='text-4xl font-black leading-tight sm:text-5xl md:text-7xl'>
            Learn with confidence.<br />
            <span className='text-orange-300'>Build what’s next.</span>
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl'>
            Education guidance, IT support, home services, and business support—helpful solutions for students, families, and organisations from one place.
          </p>
          <div className='mt-9 flex flex-wrap gap-4'>
            <a href='#admissions' className='rounded-md bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-400'>Explore Services</a>
            <a href='/contact' className='rounded-md border border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950'>Send an enquiry</a>
            <a href='tel:7004374250' className='rounded-md px-3 py-3.5 font-bold text-white underline decoration-white/50 underline-offset-4 transition hover:text-orange-200'>Call 7004374250</a>
          </div>
          <div className='mt-10 flex flex-wrap gap-2 border-t border-white/25 pt-5 text-sm font-semibold text-blue-50'>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>Education</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>IT &amp; Computer Support</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>Home &amp; Business Services</span>
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

    <section id='student-support' className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60'>
      <div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl' aria-hidden='true' />
      <div className='pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl' aria-hidden='true' />
      <div className='relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700'>
              <span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' />
              One team · many solutions
            </p>
            <h2 className='mt-5 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>Education, IT, home and business services.</h2>
            <p className='mt-5 max-w-2xl text-lg leading-8 text-slate-600'>From college guidance and documentation to home maintenance and technical support, find practical help for the things that matter every day.</p>
          </div>
          <a href='/contact' className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>
            Request a service <FaArrowRight aria-hidden='true' />
          </a>
        </div>
        <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {studentSupport.map((item) => (
            <article key={item.number} className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 border-t-4 ${item.color} bg-white/95 shadow-sm shadow-blue-950/5 transition duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-xl hover:shadow-blue-950/10`}>
              <div className='relative h-44 overflow-hidden bg-blue-50 sm:h-48'>
                <img src={item.image} alt={item.imageAlt} loading='lazy' className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-gradient-to-t from-blue-950/35 via-transparent to-transparent' />
                <span className='absolute bottom-3 left-4 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-blue-950 shadow-sm'>{item.number}</span>
              </div>
              <div className='flex flex-1 flex-col p-6 sm:p-7'>
              <div className='flex items-start justify-between gap-3'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-800 ring-1 ring-blue-100 transition group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:ring-orange-100'>
                  {item.number === '01' ? <FaUniversity aria-hidden='true' /> : item.number === '02' ? <FaFileAlt aria-hidden='true' /> : item.number === '03' ? <FaGraduationCap aria-hidden='true' /> : <FaTools aria-hidden='true' />}
                </div>
                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-slate-500'>{item.number}</span>
              </div>
              <p className='mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-orange-700'>{item.label}</p>
              <h3 className='mt-3 text-xl font-bold leading-snug text-blue-950'>{item.title}</h3>
              <p className='mt-3 flex-1 leading-7 text-slate-600'>{item.description}</p>
              <a href='/contact' className='mt-6 inline-flex items-center gap-2 border-t border-slate-100 pt-5 font-bold text-blue-900 transition group-hover:text-orange-600'>
                Ask about this service <FaArrowRight className='transition-transform group-hover:translate-x-1' aria-hidden='true' />
              </a>
              </div>
            </article>
          ))}
        </div>
        <div className='mt-8 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <p className='font-bold text-blue-950'>Not sure which service you need?</p>
            <p className='mt-1 text-sm leading-6 text-slate-600'>Tell us what you need and our team will guide you to the right next step.</p>
          </div>
          <a href='tel:7004374250' className='inline-flex shrink-0 items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-bold text-blue-900 transition hover:border-orange-300 hover:bg-orange-50'>
            Call 7004374250
          </a>
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
