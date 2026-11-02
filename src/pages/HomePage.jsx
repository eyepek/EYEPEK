import React from 'react';
import { FaUniversity, FaFileAlt, FaGraduationCap, FaTools, FaArrowRight } from 'react-icons/fa';
import { courses } from '../courses';

const highlights = [
  {
    number: '01',
    title: 'Tell us what you need',
    description: 'Whether it is education guidance, college documentation, IT help, or a business requirement, start by sharing what you are looking for.',
    color: 'border-orange-500',
    accent: 'bg-orange-500',
    href: '#student-support',
    linkLabel: 'Explore our services',
  },
  {
    number: '02',
    title: 'Get clear, practical guidance',
    description: 'Understand the available options, important requirements, documents, and the next steps before you move ahead.',
    color: 'border-red-600',
    accent: 'bg-red-600',
    href: '/contact',
    linkLabel: 'Talk to our team',
  },
  {
    number: '03',
    title: 'Move forward with confidence',
    description: 'Get support shaped around your needs, with clear communication and a practical way forward.',
    color: 'border-blue-700',
    accent: 'bg-blue-700',
    href: '/contact',
    linkLabel: 'Get in touch',
  },
];

const serviceCategories = [
  {
    number: '01',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Students studying together on campus',
    title: 'Education & Student Guidance',
    slug: 'education',
    label: 'For students',
    description: 'Clear support for choosing a course, understanding admission steps, and planning your next education move.',
    includes: ['Course and career guidance', 'Admission steps and document checklists', 'BBA, BCA, MBA, MCA and nursing options'],
    color: 'border-blue-700',
  },
  {
    number: '02',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Business documents arranged on a desk',
    title: 'College & Business Support',
    slug: 'business-support',
    label: 'For colleges and businesses',
    description: 'Organised documentation and process guidance for institutions and day-to-day business needs.',
    includes: ['Affiliation and compliance documentation', 'Renewal process checklists', 'Business documents and project reports'],
    color: 'border-orange-500',
  },
  {
    number: '03',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'IT technician working with computer equipment',
    title: 'IT & Computer Support',
    slug: 'it-support',
    label: 'Technology and repairs',
    description: 'Practical technical help for students, home users, offices, and small businesses.',
    includes: ['Computer and laptop troubleshooting', 'Software, printer and setup support', 'Wi-Fi, networking and CCTV assistance'],
    color: 'border-red-600',
  },
  {
    number: '04',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Electrician working on a home installation',
    title: 'Home Services',
    slug: 'home-services',
    label: 'Help around the home',
    description: 'Get help coordinating everyday home maintenance, installation, and repair requests.',
    includes: ['Plumbing and electrician services', 'Fan, light and appliance installation', 'AC support and home maintenance'],
    color: 'border-blue-700',
  },
];

const HomePage = () => (
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
            Empowering <span className='text-orange-300'>Students.</span><br />
            Supporting Colleges.<br />Simplifying Every Step.
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl'>
            Your trusted support partner for course and admission guidance, college affiliation documentation, and practical technology and business services. Explore your options, understand the process, and get clear support at every step.
          </p>
          <div className='mt-9 flex flex-wrap gap-4'>
            <a href='#admissions' className='rounded-md bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-400'>Explore Education Services <span aria-hidden='true'>→</span></a>
            <a href='/contact' className='rounded-md border border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950'>Send an enquiry</a>
            <a href='tel:7004374250' className='rounded-md px-3 py-3.5 font-bold text-white underline decoration-white/50 underline-offset-4 transition hover:text-orange-200'>Speak with our team</a>
          </div>
          <div className='mt-10 flex flex-wrap gap-2 border-t border-white/25 pt-5 text-sm font-semibold text-blue-50'>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>Student & Career Guidance</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>College Affiliation Support</span>
            <span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>Compliance Documentation</span>
          </div>
        </div>
        <aside className='hidden md:block'>
          <div className='relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl shadow-blue-950/30 backdrop-blur-md lg:p-8'>
            <div className='absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-400/20 blur-2xl' aria-hidden='true' />
            <p className='relative text-xs font-extrabold uppercase tracking-[0.2em] text-orange-200'>How EYEPEK helps</p>
            <h2 className='relative mt-3 text-2xl font-extrabold leading-snug text-white lg:text-3xl'>The right guidance for your next step</h2>
            <div className='relative mt-7 space-y-3'>
              {[
                ['01', 'For students', 'Course selection, eligibility, admission steps and career guidance'],
                ['02', 'For institutions', 'Affiliation process guidance and organised documentation support'],
                ['03', 'For organisations', 'Compliance paperwork, renewals and practical technology support'],
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
            <a href='#student-support' className='relative mt-6 inline-flex items-center gap-2 font-bold text-orange-200 transition hover:text-white'>Browse all services <FaArrowRight aria-hidden='true' /></a>
          </div>
        </aside>
      </div>
    </section>

    <section id='learning' className='overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <div className='grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>Guidance that moves education forward</p>
            <h2 className='mt-3 text-3xl font-extrabold leading-tight text-blue-950 md:text-4xl'>Supporting students. Strengthening institutions.</h2>
          </div>
          <p className='max-w-2xl text-lg leading-8 text-slate-600'>
            From choosing the right course to navigating college affiliation and compliance documentation, EYEPEK provides clear information, practical guidance, and organised support at every step. We help students move forward with confidence and assist institutions with affiliation, approval-process documentation, compliance, and renewal requirements. Final decisions and approvals rest with the relevant university or regulatory authority.
          </p>
        </div>
        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {highlights.map((item) => (
            <article key={item.number} className={`group relative overflow-hidden rounded-2xl border border-white/80 border-t-4 ${item.color} bg-white p-5 shadow-md shadow-blue-950/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10`}>
              <div className='flex items-center justify-between'>
                <span className={`h-1.5 w-12 rounded-full ${item.accent}`} aria-hidden='true' />
                <p className='text-sm font-black tracking-[0.18em] text-slate-400'>{item.number}</p>
              </div>
              <h3 className='mt-5 text-xl font-bold text-blue-950'>{item.title}</h3>
              <p className='mt-3 min-h-14 leading-7 text-slate-600'>{item.description}</p>
              <a href={item.href} className='mt-6 inline-flex items-center gap-2 font-bold text-blue-900 transition group-hover:text-orange-600'>{item.linkLabel} <span aria-hidden='true'>→</span></a>
            </article>
          ))}
        </div>
        <div className='mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <h3 className='font-bold text-blue-950'>Not sure which course may suit you?</h3>
            <p className='mt-1 text-sm leading-6 text-slate-600'>Answer a few quick questions to explore course options, then read our practical student guides.</p>
          </div>
          <div className='flex shrink-0 flex-wrap gap-3'>
            <a href='/course-finder' className='inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600'>Find a course <FaArrowRight aria-hidden='true' /></a>
            <a href='/guides' className='inline-flex items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-bold text-blue-900 transition hover:bg-blue-50'>Read student guides</a>
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
            <h2 className='mt-3 text-3xl font-extrabold leading-tight text-blue-950 md:text-4xl'>Our <span className='text-orange-500'>Services</span></h2>
            <p className='mt-2 max-w-2xl text-base leading-7 text-slate-600'>Choose the type of support you need. We have grouped our services for students, colleges and businesses, technology, and homes.</p>
          </div>
          <a href='/contact' className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>
            Request a service <FaArrowRight aria-hidden='true' />
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
                  <span className='rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700'>{item.label}</span>
                </div>
                <h3 className='mt-5 text-xl font-extrabold leading-snug text-blue-950 transition group-hover:text-blue-700'>{item.title}</h3>
                <p className='mt-2 text-[0.95rem] leading-7 text-slate-600'>{item.description}</p>
                <ul className='mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2'>
                  {item.includes.map((service) => <li key={service} className='flex items-start gap-2'><span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500' aria-hidden='true' />{service}</li>)}
                </ul>
                <a href={`/services/${item.slug}`} className='mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 font-bold text-blue-900 transition hover:border-orange-200 hover:bg-orange-50 group-hover:text-orange-700'>
                  View service details <FaArrowRight className='transition-transform group-hover:translate-x-1' aria-hidden='true' />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className='mt-8 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <p className='font-bold text-blue-950'>Let’s find the right support for you.</p>
            <p className='mt-1 text-sm leading-6 text-slate-600'>Whether you’re a student or an institution, our team is here to understand your needs and help you take the next step with confidence.</p>
          </div>
          <a href='tel:7004374250' className='inline-flex shrink-0 items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-bold text-blue-900 transition hover:border-orange-300 hover:bg-orange-50'>
            Call 7004374250
          </a>
        </div>
        <p className='mt-6 text-sm leading-6 text-slate-500'>EYEPEK provides guidance and documentation assistance for affiliation and compliance processes. All approvals and affiliation decisions are made independently by the concerned university or regulatory authority.</p>
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
                <span className='inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-200 backdrop-blur'>About EYEPEK</span>
                <p className='mt-3 max-w-md text-2xl font-black leading-tight sm:text-3xl'>Clear guidance for the steps ahead.</p>
              </figcaption>
            </div>
          </figure>

          <div>
            <p className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-800 shadow-sm'>
              <span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' /> Who we help
            </p>
            <h2 className='mt-5 text-3xl font-black leading-tight tracking-tight text-blue-950 sm:text-4xl md:text-5xl'>
              Guidance for your next step. <span className='text-orange-500'>Support for everyday needs.</span>
            </h2>
            <p className='mt-4 text-base leading-7 text-slate-600 sm:text-lg'>
              EYEPEK brings education guidance and practical support together. Students can explore course options, admission steps, and document checklists. Colleges and businesses can get help organising affiliation, compliance, renewal, and project documentation. We also offer IT, computer, networking, and home service support.
            </p>

            <div className='mt-7 space-y-3'>
              <article className='flex gap-4 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-800'><FaGraduationCap aria-hidden='true' /></span>
                <div>
                  <h3 className='font-extrabold text-blue-950'>For students</h3>
                  <p className='mt-1 text-sm leading-6 text-slate-600'>Course and career guidance, admissions steps, and document preparation.</p>
                </div>
              </article>
              <article className='flex gap-4 rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-sm'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-700'><FaUniversity aria-hidden='true' /></span>
                <div>
                  <h3 className='font-extrabold text-blue-950'>For colleges and businesses</h3>
                  <p className='mt-1 text-sm leading-6 text-slate-600'>Affiliation and compliance process guidance, plus organised paperwork support.</p>
                </div>
              </article>
              <article className='flex gap-4 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-800'><FaTools aria-hidden='true' /></span>
                <div>
                  <h3 className='font-extrabold text-blue-950'>For homes and offices</h3>
                  <p className='mt-1 text-sm leading-6 text-slate-600'>Computer, printer, Wi-Fi, networking, and home maintenance support.</p>
                </div>
              </article>
            </div>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <a href='#student-support' className='inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>Explore our services <FaArrowRight aria-hidden='true' /></a>
              <a href='/course-finder' className='inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3.5 font-bold text-blue-900 transition hover:bg-blue-50'>Find a course <FaArrowRight aria-hidden='true' /></a>
            </div>
            <p className='mt-5 text-xs leading-5 text-slate-500'>Course availability, eligibility, admissions, and official approvals are determined by the relevant institution or authority. Service availability may vary by location.</p>
          </div>
        </div>
      </div>
    </section>

    <section id='campus' className='bg-blue-950 text-white'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <div className='grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center'>
          <div className='py-2'>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Build your future with EYEPEK</p>
            <h2 className='mt-4 text-3xl font-extrabold leading-tight md:text-5xl'>Make informed choices. Take confident steps towards your future.</h2>
            <p className='mt-5 max-w-xl text-lg leading-8 text-blue-100'>Choosing a course or planning your career is an important decision. Get clear guidance on course options, admission requirements, essential documents and the next steps—so you can plan ahead with confidence.</p>
            <a href='#admissions' className='mt-8 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-400'>Get admission guidance <span aria-hidden='true'>→</span></a>
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
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>Quick answers</p>
        <h2 className='mt-3 text-3xl font-extrabold text-blue-950 md:text-5xl'>Frequently asked questions</h2>
        <div className='mt-6 grid gap-3 md:grid-cols-2'>
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

    <section id='admissions' className='bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Explore your study options</p>
            <h2 className='mt-3 text-3xl font-extrabold md:text-5xl'>Find the course that moves you forward.</h2>
            <p className='mt-3 max-w-2xl text-base leading-7 text-blue-100'>Explore popular programmes and contact our team for guidance on eligibility, admission steps and required documents.</p>
          </div>
          <a href='/contact' className='inline-flex shrink-0 items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400'>Get course guidance <span className='ml-2' aria-hidden='true'>→</span></a>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
          {courses.map((course, index) => <a key={course} href={`/contact?course=${encodeURIComponent(course)}`} aria-label={`Enquire about ${course}`} className='group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-5 shadow-lg shadow-blue-950/20 transition hover:-translate-y-1 hover:border-orange-300 hover:bg-white/[0.15] hover:shadow-orange-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:p-6'>
            <span className='absolute right-3 top-2 text-xs font-bold tracking-widest text-blue-300/70'>0{index + 1}</span>
            <div className='mb-3 h-1 w-10 rounded-full bg-orange-400 transition-all group-hover:w-16' />
            <h3 className='text-2xl font-black tracking-wide text-white sm:text-3xl'>{course}</h3>
            <p className='mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-orange-200'>Course enquiry <span aria-hidden='true'>↗</span></p>
          </a>)}
          <a href='/contact?course=Other' className='flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-orange-300/60 bg-orange-400/10 p-5 text-center transition hover:bg-orange-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300'>
            <div><p className='text-xl font-extrabold text-orange-200'>And more</p><p className='mt-1 text-xs text-blue-100'>Ask our team ↗</p></div>
          </a>
        </div>
        <div className='mt-5 flex flex-col gap-2 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-blue-200'>Course availability and admission details should be confirmed with the relevant institution.</p>
          <a href='tel:7004374250' className='font-bold text-orange-300 transition hover:text-white'>Call 7004374250</a>
        </div>
      </div>
    </section>
  </main>
);

export default HomePage;
