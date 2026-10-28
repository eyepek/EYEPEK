import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';

const servicePages = {
  education: {
    title: 'Education & Admission Guidance',
    metaTitle: 'Education & Admission Guidance | EYEPEK',
    description: 'Explore course options, admission steps, eligibility questions, career guidance, and college documentation support with EYEPEK.',
    intro: 'Make your next education decision with clearer information and practical guidance.',
    services: [
      'Course and career guidance for BBA, BCA, MBA, MCA, and other courses',
      'Admission process information and application-step guidance',
      'Admission document checklists and document organisation',
      'Guidance for college affiliation and compliance documentation processes',
      'Help identifying questions to confirm with the relevant institution',
    ],
    note: 'Course availability, eligibility, fees, admissions, affiliation, and approvals must be confirmed with the relevant institution or authority. EYEPEK does not guarantee admission or official approval.',
  },
  'it-support': {
    title: 'IT & Computer Support Services',
    metaTitle: 'IT & Computer Support Services | EYEPEK',
    description: 'EYEPEK IT support includes computer troubleshooting, software and operating system installation, printer support, Wi-Fi, networking, CCTV, and maintenance assistance.',
    intro: 'Practical technical support for home users, students, offices, and small businesses.',
    services: [
      'Computer and laptop troubleshooting and repair support',
      'Windows and software installation support',
      'Printer installation, configuration, and troubleshooting',
      'Wi-Fi, router, and local network setup support',
      'CCTV and security camera installation support',
      'Server and office equipment assistance',
      'Remote support and maintenance requests, subject to availability',
    ],
    note: 'Please contact EYEPEK to confirm service availability, visit arrangements, and pricing before booking.',
  },
  'home-services': {
    title: 'Home Maintenance Services',
    metaTitle: 'Home Maintenance Services | EYEPEK',
    description: 'Ask EYEPEK about home maintenance support, plumbing, electrician work, fan and light fitting, appliance installation, AC support, and CCTV setup.',
    intro: 'Get help coordinating everyday home maintenance and installation needs.',
    services: [
      'Plumbing and common household maintenance requests',
      'Electrician services and fan or light fitting',
      'Appliance installation and repair support',
      'AC installation support and related maintenance requests',
      'CCTV and home security camera setup',
    ],
    note: 'Service coverage and technician availability may vary by location. Confirm details and pricing with EYEPEK before arranging work.',
  },
  'business-support': {
    title: 'Business & Institution Support',
    metaTitle: 'Business & Institution Support | EYEPEK',
    description: 'EYEPEK helps businesses and institutions with office IT setup, printer and network support, document organisation, project report assistance, and college compliance process guidance.',
    intro: 'Support for smoother day-to-day operations, technical needs, and documentation workflows.',
    services: [
      'Office computer, printer, Wi-Fi, and network setup support',
      'Server and office equipment support',
      'Business document organisation and project report assistance',
      'College affiliation process and compliance documentation guidance',
      'Help understanding documentation steps and preparing checklists',
    ],
    note: 'EYEPEK provides process guidance and documentation support only. Government, university, and regulatory approvals are decided solely by the relevant authorities.',
  },
};

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const service = servicePages[serviceSlug];

  useEffect(() => {
    if (!service) return;
    document.title = service.metaTitle;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', service.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.eyepek.com/services/${serviceSlug}`);

    let structuredData = document.querySelector('#eyepek-service-schema');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'eyepek-service-schema';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      url: `https://www.eyepek.com/services/${serviceSlug}`,
      provider: {
        '@type': 'Organization',
        name: 'EYEPEK',
        url: 'https://www.eyepek.com/',
        telephone: '+91-7004374250',
        email: 'Info.eyepek@gmail.com',
      },
      areaServed: { '@type': 'Country', name: 'India' },
    });

    return () => {
      document.querySelector('#eyepek-service-schema')?.remove();
    };
  }, [service, serviceSlug]);

  if (!service) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-blue-950">Service page not found</h1>
        <p className="mt-4 text-slate-600">Please browse our services or contact EYEPEK for guidance.</p>
        <Link to="/#student-support" className="mt-7 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white">Browse services</Link>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-blue-50 via-white to-orange-50/60 text-slate-900">
      <section className="relative overflow-hidden bg-blue-950 text-white">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">EYEPEK · Services</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">{service.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-400">Enquire now <FaArrowRight aria-hidden="true" /></Link>
            <a href="tel:+917004374250" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white hover:text-blue-950"><FaPhoneAlt aria-hidden="true" /> Call 7004374250</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_0.7fr] md:px-10 md:py-20">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-orange-700">How we can help</p>
          <h2 className="mt-3 text-3xl font-extrabold text-blue-950">Services and support</h2>
          <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
          <ul className="mt-7 space-y-4">
            {service.services.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <FaCheckCircle className="mt-1 shrink-0 text-orange-500" aria-hidden="true" />
                <span className="leading-7 text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-slate-700">{service.note}</p>
        </div>

        <aside className="h-fit rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-950/5 md:sticky md:top-24">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">Need help?</p>
          <h2 className="mt-3 text-2xl font-extrabold text-blue-950">Talk to EYEPEK</h2>
          <p className="mt-3 leading-7 text-slate-600">Tell us what you need. Our team can help you understand the next step and confirm availability.</p>
          <a href="tel:+917004374250" className="mt-6 block rounded-xl bg-blue-950 px-5 py-3.5 text-center font-bold text-white transition hover:bg-blue-800">Call +91 70043 74250</a>
          <a href="https://wa.me/917004374250" className="mt-3 block rounded-xl border border-green-200 bg-green-50 px-5 py-3.5 text-center font-bold text-green-800 transition hover:bg-green-100">WhatsApp EYEPEK</a>
          <a href="mailto:Info.eyepek@gmail.com" className="mt-3 block break-words rounded-xl border border-slate-200 px-5 py-3.5 text-center font-bold text-blue-900 transition hover:bg-blue-50">Info.eyepek@gmail.com</a>
          <Link to="/#student-support" className="mt-6 inline-flex items-center gap-2 font-bold text-blue-900 hover:text-orange-600">View all services <FaArrowRight aria-hidden="true" /></Link>
        </aside>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
