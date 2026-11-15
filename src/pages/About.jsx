import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUniversity, FaFileAlt, FaLaptop, FaTools, FaNetworkWired, FaPrint, FaVideo, FaClipboardCheck, FaArrowRight } from 'react-icons/fa';

const serviceGroups = [
  {
    icon: FaGraduationCap,
    title: 'Course Selection & Admission Guidance',
    intro: 'Guidance for students and families who want to understand course options, eligibility questions, application steps and required documents.',
    items: ['BBA – Bachelor of Business Administration', 'BCA – Bachelor of Computer Applications', 'MBA – Master of Business Administration', 'MCA – Master of Computer Applications', 'ANM and GNM nursing programmes', 'B.Sc. Nursing and other course enquiries', 'College and course comparison, admission timelines and document checklists'],
  },
  {
    icon: FaUniversity,
    title: 'College Affiliation & Institutional Support',
    intro: 'Process guidance and documentation organisation for colleges and educational institutions preparing affiliation or institutional submissions.',
    items: ['University affiliation process guidance', 'New college and programme documentation preparation', 'Institutional records and supporting document organisation', 'Faculty and staff file documentation support', 'Infrastructure, library, laboratory and facility record checklists', 'Coordination checklists for inspections and official submissions'],
  },
  {
    icon: FaFileAlt,
    title: 'AICTE, Compliance, Renewal & Document Support',
    intro: 'Assistance in understanding applicable requirements and organising institutional paperwork. The current official notification and authority checklist always take precedence.',
    items: ['AICTE-related paperwork and documentation guidance, where applicable', 'Approval and extension-of-approval document organisation', 'Compliance records and evidence checklists', 'Affiliation and approval renewal paperwork support', 'Faculty appointment, qualification and experience record organisation', 'Institutional declarations, reports, registers and supporting files'],
  },
  {
    icon: FaLaptop,
    title: 'Computer, Laptop & Software Support',
    intro: 'Practical technical support for individuals, students, homes, offices and small businesses.',
    items: ['Desktop and laptop troubleshooting', 'Hardware diagnosis and repair coordination', 'Windows installation and configuration', 'Software installation, updates and troubleshooting', 'System setup, performance checks and basic maintenance', 'Data backup guidance and safe device-use support'],
  },
  {
    icon: FaNetworkWired,
    title: 'Printer, Wi-Fi, Networking & Server Support',
    intro: 'Setup, troubleshooting and maintenance assistance for common office and home technology needs.',
    items: ['Printer installation, configuration and troubleshooting', 'Wi-Fi router setup and connectivity support', 'LAN and office networking assistance', 'CCTV camera setup and support', 'Server and office IT equipment support', 'Remote technical assistance and AMC/maintenance enquiries'],
  },
  {
    icon: FaTools,
    title: 'Home, Office & Business Support',
    intro: 'Enquiry coordination for practical home and workplace requirements, subject to service area and technician availability.',
    items: ['Home electrical, plumbing and installation enquiries', 'Fan, light and appliance installation support', 'AC and home maintenance enquiries', 'Office IT setup and maintenance', 'Business documentation and project report assistance', 'Service coordination for homes, offices and small businesses'],
  },
];

const About = () => (
  <main className='min-h-screen bg-white text-slate-800'>
    <section className='bg-[#102b4e] px-5 py-16 text-white sm:px-8 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <p className='text-xs font-extrabold uppercase tracking-[0.2em] text-[#ffbd59]'>About EYEPEK</p>
        <h1 className='mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl'>Education guidance, institutional documentation and practical technology support.</h1>
        <p className='mt-6 max-w-4xl text-base leading-8 text-blue-100 sm:text-lg'>EYEPEK is an Education & Technology Services platform that helps students, educational institutions, households and businesses understand their requirements and take practical next steps. We bring course and admission guidance, college affiliation and compliance documentation support, and IT services together in one place.</p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Link to='/contact' className='rounded-xl bg-[#f5a623] px-6 py-3.5 font-extrabold text-[#102b4e]'>Contact EYEPEK</Link>
          <Link to='/services/education' className='rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white hover:bg-white/10'>Explore services</Link>
        </div>
      </div>
    </section>
    <section className='mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16'>
      <div className='grid gap-6 md:grid-cols-2'>
        <article className='rounded-2xl border border-blue-100 bg-blue-50/60 p-6'>
          <h2 className='text-xl font-extrabold text-[#183f78]'>Our purpose</h2>
          <p className='mt-3 leading-7 text-slate-700'>To make complicated education, institutional paperwork and everyday technology requirements easier to understand by providing clear information, organised checklists and practical support pathways.</p>
        </article>
        <article className='rounded-2xl border border-orange-100 bg-orange-50/60 p-6'>
          <h2 className='text-xl font-extrabold text-[#183f78]'>How we work</h2>
          <p className='mt-3 leading-7 text-slate-700'>We first understand the requirement, explain the relevant steps and documents, clarify the scope of support and help identify what should be confirmed with the responsible institution, authority or service professional.</p>
        </article>
      </div>
      <div className='mt-14'>
        <p className='text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600'>What we do</p>
        <h2 className='mt-2 text-2xl font-black text-[#183f78] sm:text-3xl'>EYEPEK Services & Support Areas</h2>
        <p className='mt-3 max-w-3xl leading-7 text-slate-600'>Our key services are grouped below so students, colleges and customers can quickly find the support they need.</p>
        <div className='mt-7 grid gap-5 md:grid-cols-2'>
          {serviceGroups.map((group) => {
            const Icon = group.icon;
            return <article key={group.title} className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
              <div className='flex items-center gap-3'><span className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-800'><Icon /></span><h3 className='text-lg font-extrabold text-[#183f78]'>{group.title}</h3></div>
              <p className='mt-4 text-sm leading-7 text-slate-600'>{group.intro}</p>
              <ul className='mt-4 space-y-2'>{group.items.map(item => <li key={item} className='flex gap-2 text-sm leading-6 text-slate-700'><FaArrowRight className='mt-1 shrink-0 text-orange-500' />{item}</li>)}</ul>
            </article>;
          })}
        </div>
      </div>
      <section className='mt-14 rounded-2xl bg-[#f3f7fc] p-6 sm:p-8'>
        <h2 className='text-xl font-extrabold text-[#183f78]'>Important information</h2>
        <p className='mt-3 leading-7 text-slate-700'>EYEPEK is a guidance, documentation and support service. EYEPEK is not a university, college, AICTE or government regulator. Admission, affiliation, recognition, approval, inspection and licensing decisions are made only by the relevant institution or competent authority. Requirements can change, so customers should verify the latest official rules, eligibility, fees and deadlines before making payments or submitting applications. Service coverage, availability and charges are confirmed individually.</p>
      </section>
      <section className='mt-10 flex flex-col gap-5 rounded-2xl bg-[#102b4e] p-7 text-white sm:flex-row sm:items-center sm:justify-between'>
        <div><h2 className='text-2xl font-black'>Need help with a course, college file or IT issue?</h2><p className='mt-2 text-sm leading-7 text-blue-100'>Talk to EYEPEK and tell us what you need help with.</p></div>
        <Link to='/contact' className='shrink-0 rounded-xl bg-[#f5a623] px-6 py-3.5 text-center font-extrabold text-[#102b4e]'>Send an enquiry</Link>
      </section>
    </section>
  </main>
);

export default About;
