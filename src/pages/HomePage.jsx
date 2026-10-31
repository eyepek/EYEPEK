import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaClipboardCheck, FaFileAlt, FaGraduationCap, FaTools, FaUniversity } from 'react-icons/fa';
import { courses } from '../courses';

const primaryServices = [
  {
    eyebrow: 'For institutions',
    title: 'College affiliation support',
    description: 'Organise affiliation files, document lists, and clearer next steps for your institution.',
    points: ['Process-readiness checklists', 'Document organisation', 'Questions for the relevant authority'],
    icon: FaUniversity,
    to: '/services/college-affiliation',
  },
  {
    eyebrow: 'For students & families',
    title: 'Admissions & course guidance',
    description: 'Understand course options, eligibility, admission documents, and what to confirm before applying.',
    points: ['Course selection support', 'Eligibility & document checklists', 'Admission enquiry preparation'],
    icon: FaGraduationCap,
    to: '/services/admission-support',
  },
  {
    eyebrow: 'For colleges',
    title: 'AICTE & compliance support',
    description: 'Prepare document-readiness checklists and organise compliance records with clear professional boundaries.',
    points: ['AICTE-related document checklists', 'Compliance record organisation', 'Renewal-readiness support'],
    icon: FaClipboardCheck,
    to: '/services/aicte-support',
  },
];

const allServices = [
  { title: 'College Affiliation & Documentation', description: 'Affiliation guidance, compliance files, renewal paperwork, and institutional document checklists.', icon: FaUniversity, to: '/services/college-affiliation', label: 'Priority service' },
  { title: 'Admissions & Course Guidance', description: 'Course information, eligibility questions, application steps, and admission document support.', icon: FaGraduationCap, to: '/services/admission-support', label: 'Priority service' },
  { title: 'AICTE & Compliance Support', description: 'AICTE-related documentation readiness, compliance checklists, and internal file organisation.', icon: FaClipboardCheck, to: '/services/aicte-support', label: 'Priority service' },
  { title: 'Education & Student Support', description: 'Career direction, course planning, and practical student support for the next step.', icon: FaFileAlt, to: '/services/education', label: 'Education' },
  { title: 'IT & Computer Support', description: 'Computers, printers, networking, CCTV, software setup, and maintenance support.', icon: FaTools, to: '/services/it-support', label: 'Technology' },
  { title: 'Home Services', description: 'Plumbing, electrician work, appliance installation, AC support, and CCTV setup.', icon: FaTools, to: '/services/home-services', label: 'Home support' },
  { title: 'Business & Institution Support', description: 'Office IT setup, network support, document organisation, and project-report assistance.', icon: FaFileAlt, to: '/services/business-support', label: 'Business support' },
];

const steps = [
  ['01', 'Understand the requirement', 'We start with your goal, current stage, and the information already available.'],
  ['02', 'Prepare the right documents', 'Use clear checklists to organise information, supporting records, and outstanding questions.'],
  ['03', 'Take the next official step', 'Confirm requirements directly with the relevant college, university, AICTE, or authority.'],
];

const faqs = [
  ['Can EYEPEK guarantee college affiliation or AICTE approval?', 'No. EYEPEK provides information, document organisation, and process guidance. All affiliation, approval, accreditation, and regulatory decisions are made by the relevant authority.'],
  ['What can I ask about admissions?', 'You can ask about course options, eligibility, document checklists, application steps, fees, and questions to confirm with the institution.'],
  ['What should a college share for documentation support?', 'A short overview of the requirement, current status, relevant documents, and the authority or process involved is a helpful starting point.'],
  ['Can I use EYEPEK for IT or home services too?', 'Yes. EYEPEK also provides IT, computer, networking, CCTV, home, and business support services.'],
];

const HomePage = () => (
  <main className='bg-white text-slate-900'>
    <section className='relative isolate overflow-hidden bg-blue-950 text-white'>
      <img className='absolute inset-0 -z-20 h-full w-full object-cover' src='/images/students-campus.jpg' alt='Students studying together outdoors in a campus setting (illustrative photo)' />
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/90 to-blue-950/60' />
      <div className='mx-auto grid min-h-[640px] max-w-7xl gap-12 px-6 py-16 md:min-h-[680px] md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:py-20'>
        <div className='max-w-3xl'>
          <p className='inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-200 backdrop-blur-sm sm:text-sm'>
            <span className='h-2 w-2 rounded-full bg-orange-400' /> EYEPEK · Patna, Bihar
          </p>
          <h1 className='mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-7xl'>
            College Affiliation.<br />
            <span className='text-orange-300'>Admissions.</span><br />
            Documentation &amp; AICTE Support.
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl'>
            Professional process guidance for colleges, students, and families—built around clear documents, better questions, and practical next steps.
          </p>
          <div className='mt-9 flex flex-wrap gap-4'>
            <Link to='/services/college-affiliation' className='rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-400'>Explore college support <span aria-hidden='true'>→</span></Link>
            <Link to='/contact' className='rounded-xl border border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950'>Send an enquiry</Link>
            <a href='tel:7004374250' className='rounded-xl px-3 py-3.5 font-bold text-white underline decoration-white/50 underline-offset-4 transition hover:text-orange-200'>Call 7004374250</a>
          </div>
          <div className='mt-10 flex flex-wrap gap-2 border-t border-white/25 pt-5 text-sm font-semibold text-blue-50'>
            {['Affiliation guidance', 'Admission support', 'Documentation checklists', 'AICTE readiness'].map((item) => <span key={item} className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>{item}</span>)}
          </div>
        </div>
        <aside className='hidden md:block'>
          <div className='rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl shadow-blue-950/30 backdrop-blur-md lg:p-8'>
            <p className='text-xs font-extrabold uppercase tracking-[0.2em] text-orange-200'>Professional, people-first support</p>
            <h2 className='mt-3 text-2xl font-extrabold leading-snug text-white lg:text-3xl'>Get your next step clear before you begin.</h2>
            <div className='mt-7 space-y-3'>
              {['Understand the process', 'Organise the right documents', 'Confirm the official requirements'].map((item, index) => (
                <div key={item} className='flex items-center gap-4 rounded-2xl border border-white/15 bg-blue-950/35 p-4'>
                  <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 font-black text-white'>0{index + 1}</span>
                  <p className='font-bold text-white'>{item}</p>
                </div>
              ))}
            </div>
            <p className='mt-6 text-sm leading-6 text-blue-100'>EYEPEK provides guidance and documentation support. Official approvals remain the relevant authority’s decision.</p>
          </div>
        </aside>
      </div>
    </section>

    <section id='primary-support' className='bg-slate-50'>
      <div className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <div className='max-w-3xl'>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-700'>Our primary focus</p>
          <h2 className='mt-4 text-3xl font-black leading-tight text-blue-950 md:text-5xl'>Support that keeps your college or admission journey moving.</h2>
          <p className='mt-5 text-lg leading-8 text-slate-600'>Three focused services for the work that needs the most care: affiliation, admissions, and AICTE or compliance documentation.</p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-3'>
          {primaryServices.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className='flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-600'><Icon aria-hidden='true' /></div>
                <p className='mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-orange-700'>{item.eyebrow}</p>
                <h3 className='mt-2 text-2xl font-extrabold text-blue-950'>{item.title}</h3>
                <p className='mt-3 flex-1 leading-7 text-slate-600'>{item.description}</p>
                <ul className='mt-6 space-y-3'>
                  {item.points.map((point) => <li key={point} className='flex gap-2 text-sm leading-6 text-slate-700'><FaCheckCircle className='mt-1 shrink-0 text-orange-500' aria-hidden='true' />{point}</li>)}
                </ul>
                <Link to={item.to} className='mt-7 inline-flex items-center gap-2 font-bold text-blue-900 transition hover:text-orange-600'>View support details <FaArrowRight aria-hidden='true' /></Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section id='learning' className='bg-white'>
      <div className='mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-end md:px-10 md:py-24'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>A clearer way forward</p>
          <h2 className='mt-4 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>Guidance built around the real work.</h2>
        </div>
        <p className='max-w-2xl text-lg leading-8 text-slate-600'>From a student choosing a course to an institution preparing compliance records, EYEPEK helps turn a complex process into smaller, understandable steps.</p>
      </div>
      <div className='mx-auto grid max-w-7xl gap-5 px-6 pb-20 md:grid-cols-3 md:px-10 md:pb-24'>
        {steps.map(([number, title, description]) => (
          <article key={number} className='rounded-2xl border border-blue-100 bg-blue-50/60 p-7'>
            <span className='text-sm font-black tracking-[0.18em] text-orange-600'>{number}</span>
            <h3 className='mt-6 text-xl font-extrabold text-blue-950'>{title}</h3>
            <p className='mt-3 leading-7 text-slate-600'>{description}</p>
          </article>
        ))}
      </div>
    </section>

    <section id='student-support' className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/60'>
      <div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl' aria-hidden='true' />
      <div className='relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-3xl'>
            <p className='inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700'><span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' />One team · many solutions</p>
            <h2 className='mt-5 text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl'>All EYEPEK <span className='text-orange-500'>Services</span></h2>
            <p className='mt-3 max-w-2xl text-lg leading-8 text-slate-600'>Our professional college and student support comes first, with technology, home, and business services also available when you need them.</p>
          </div>
          <Link to='/contact' className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600'>Request support <FaArrowRight aria-hidden='true' /></Link>
        </div>
        <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {allServices.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className='group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/95 p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-800 transition group-hover:bg-orange-50 group-hover:text-orange-600'><Icon aria-hidden='true' /></div>
                  <span className='rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700'>{item.label}</span>
                </div>
                <h3 className='mt-6 text-xl font-extrabold leading-snug text-blue-950'>{item.title}</h3>
                <p className='mt-3 flex-1 leading-7 text-slate-600'>{item.description}</p>
                <Link to={item.to} className='mt-6 inline-flex items-center gap-2 font-bold text-blue-900 transition group-hover:text-orange-700'>View service details <FaArrowRight aria-hidden='true' /></Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section id='about' className='relative isolate overflow-hidden bg-white'>
      <div className='pointer-events-none absolute -right-24 -top-16 -z-10 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl' aria-hidden='true' />
      <div className='mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center md:px-10 md:py-28'>
        <div className='relative overflow-hidden rounded-[1.75rem] bg-blue-950 shadow-2xl shadow-blue-950/20'>
          <img className='h-[360px] w-full object-cover sm:h-[480px]' src='/images/students-classroom.jpg' alt='Students learning and working together' loading='lazy' />
          <div className='absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/15 to-transparent' />
          <div className='absolute inset-x-0 bottom-0 p-7 sm:p-9'>
            <span className='inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-200 backdrop-blur'><span className='h-2 w-2 rounded-full bg-orange-400' aria-hidden='true' />Life begins here</span>
            <p className='mt-4 max-w-md text-2xl font-black leading-tight text-white sm:text-4xl'>Every big journey starts with the right support.</p>
          </div>
        </div>
        <div>
          <p className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-800'><span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' />About EYEPEK</p>
          <h2 className='mt-5 text-3xl font-black leading-tight text-blue-950 sm:text-4xl md:text-5xl'>Good guidance. <span className='text-orange-500'>Practical solutions.</span> A better way forward.</h2>
          <p className='mt-6 text-base leading-8 text-slate-600 sm:text-lg'>EYEPEK Educational and Technology Services is a Patna, Bihar-based education, student guidance, and technical support organisation. Our priority is helping colleges and students understand affiliation, admission, document, and compliance processes clearly.</p>
          <p className='mt-4 text-base leading-8 text-slate-600 sm:text-lg'>We also provide IT, computer, networking, CCTV, home maintenance, office IT, and business documentation support—always with clear communication and practical next steps.</p>
          <div className='mt-7 grid gap-3 sm:grid-cols-2'>
            <div className='rounded-2xl border border-blue-100 bg-blue-50/70 p-4'><h3 className='font-extrabold text-blue-950'>Clear boundaries</h3><p className='mt-1 text-sm leading-6 text-slate-600'>Guidance and documentation support—not a guarantee of an official decision.</p></div>
            <div className='rounded-2xl border border-orange-100 bg-orange-50/70 p-4'><h3 className='font-extrabold text-blue-950'>Practical next steps</h3><p className='mt-1 text-sm leading-6 text-slate-600'>Organised questions, documents, and a clearer path ahead.</p></div>
          </div>
          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <Link to='/contact' className='inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-600'>Talk to our team <FaArrowRight aria-hidden='true' /></Link>
            <a href='tel:7004374250' className='font-bold text-blue-950 transition hover:text-orange-600'>Call 7004374250</a>
          </div>
        </div>
      </div>
    </section>

    <section id='faq' className='bg-slate-50'>
      <div className='mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24'>
        <p className='text-sm font-bold uppercase tracking-[0.2em] text-red-600'>Quick answers</p>
        <h2 className='mt-3 text-3xl font-extrabold text-blue-950 md:text-5xl'>Frequently asked questions</h2>
        <div className='mt-9 grid gap-4 md:grid-cols-2'>
          {faqs.map(([question, answer]) => (
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
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-orange-300'>Ready when you are</p>
          <h2 className='mt-3 text-3xl font-extrabold md:text-5xl'>Let’s talk about your next step.</h2>
          <p className='mt-4 max-w-2xl text-blue-100'>Tell us whether you need admission guidance, affiliation or documentation support, AICTE-related checklists, or another EYEPEK service.</p>
          <div className='mt-6'>
            <p className='text-sm font-bold text-orange-200'>Courses you can enquire about</p>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {courses.map((course) => <li key={course} className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold'>{course}</li>)}
              <li className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold'>And more</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Link to='/contact' className='shrink-0 rounded-xl border border-white/60 px-6 py-4 text-center font-bold text-white transition hover:bg-white hover:text-blue-950'>Send an enquiry</Link>
          <a href='tel:7004374250' className='shrink-0 rounded-xl bg-orange-500 px-8 py-4 text-center font-bold text-white transition hover:bg-orange-400'>Call 7004374250</a>
        </div>
      </div>
    </section>
  </main>
);

export default HomePage;
