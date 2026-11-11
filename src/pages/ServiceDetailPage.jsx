import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const servicePages = {
  education: {
    title: 'Admissions & Student Document Support',
    processTitle: 'How admission guidance works',
    process: ['Choose a course and shortlist colleges.', 'Confirm eligibility, fees, availability and dates with the college.', 'Prepare the documents on the institution’s latest checklist.', 'Apply directly to the institution; it makes the admission decision.'],
    metaTitle: 'Admission Guidance & Documents Support | EYEPEK',
    description: 'Get guidance on course options, college admission steps, eligibility questions, application documents, and career pathways with EYEPEK.',
    intro: 'Understand your course options, admission steps, and the documents to prepare.',
    services: [
      'Course and career guidance for BBA, BCA, MBA, MCA, and other courses',
      'Admission process information and application-step guidance',
      'Admission document checklists and document organisation',
      'Help identifying eligibility and application questions to confirm with the relevant institution',
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
    title: 'College Affiliation, AICTE & Institution Support',
    processTitle: 'How institution support works',
    process: ['Identify the college, course and relevant university or regulator.', 'Check which affiliation or approval process applies to that course.', 'Organise records against the latest official checklist.', 'The institution submits the application; the authority reviews and decides.'],
    metaTitle: 'College Affiliation & AICTE Documentation Support | EYEPEK',
    description: 'EYEPEK provides process and documentation guidance for college affiliation, AICTE-related paperwork, compliance and renewals, plus institution and business support.',
    intro: 'Organised process and documentation guidance for colleges, institutions, and businesses.',
    services: [
      'College affiliation process and documentation guidance',
      'AICTE-related document organisation and process guidance',
      'Compliance and renewal paperwork support',
      'Business document organisation and project report assistance',
      'Office computer, printer, Wi-Fi, network, and equipment support',
    ],
    note: 'EYEPEK provides process guidance and documentation support only. AICTE, government, university, and regulatory approvals or affiliation decisions are made solely by the relevant authorities.',
  },
};

const serviceHindi = {
 education: {
  title:'प्रवेश और छात्र दस्तावेज़ सहायता', metaTitle:'प्रवेश मार्गदर्शन और दस्तावेज़ सहायता | EYEPEK',
  description:'EYEPEK कोर्स विकल्प समझने, कॉलेज में प्रवेश के चरण जानने, पात्रता संबंधी सवाल तैयार करने और दस्तावेज़ व्यवस्थित करने में मदद करता है।',
  intro:'कोर्स विकल्प, प्रवेश प्रक्रिया और तैयार करने वाले दस्तावेज़ आसान भाषा में समझें।',
  processTitle:'प्रवेश मार्गदर्शन कैसे काम करता है',
  process:['कोर्स चुनें और संभावित कॉलेजों की सूची बनाएँ।','पात्रता, फीस, उपलब्धता और तारीखें कॉलेज से पक्की करें।','संस्थान की नवीनतम सूची के अनुसार दस्तावेज़ तैयार करें।','संस्थान में सीधे आवेदन करें; प्रवेश का निर्णय वही करता है।'],
  services:['BBA, BCA, MBA, MCA और अन्य कोर्सों के बारे में मार्गदर्शन','प्रवेश प्रक्रिया और आवेदन के चरणों की जानकारी','प्रवेश दस्तावेज़ों की चेकलिस्ट और रिकॉर्ड व्यवस्थित करने में सहायता','पात्रता और आवेदन से जुड़े सवाल संबंधित संस्थान से पूछने में मदद'],
  note:'कोर्स की उपलब्धता, पात्रता, फीस और प्रवेश नियम संबंधित संस्थान से पक्के करें। EYEPEK प्रवेश की गारंटी नहीं देता; अंतिम निर्णय कॉलेज का होता है।',
 },
 'business-support': {
  title:'कॉलेज संबद्धता, AICTE और संस्थान सहायता', metaTitle:'कॉलेज संबद्धता और AICTE दस्तावेज़ सहायता | EYEPEK',
  description:'कॉलेज संबद्धता प्रक्रिया, जहाँ लागू हो AICTE से जुड़े कागज़ात, अनुपालन और नवीनीकरण के लिए प्रक्रिया व दस्तावेज़ मार्गदर्शन।',
  intro:'कॉलेजों और संस्थानों के लिए व्यवस्थित प्रक्रिया और दस्तावेज़ सहायता।',
  processTitle:'संस्थान सहायता कैसे काम करती है',
  process:['कॉलेज, कोर्स और संबंधित विश्वविद्यालय या नियामक की पहचान करें।','जाँचें कि उस कोर्स के लिए कौन-सी संबद्धता या मंज़ूरी प्रक्रिया लागू है।','नवीनतम आधिकारिक सूची के अनुसार रिकॉर्ड व्यवस्थित करें।','संस्थान आवेदन जमा करता है; संबंधित प्राधिकरण उसकी जाँच और निर्णय करता है।'],
  services:['कॉलेज संबद्धता प्रक्रिया और दस्तावेज़ों की जानकारी','AICTE से जुड़े कागज़ात व्यवस्थित करने और प्रक्रिया समझने में मदद','अनुपालन और नवीनीकरण के दस्तावेज़ तैयार करने में सहायता','व्यवसाय दस्तावेज़ और परियोजना रिपोर्ट व्यवस्थित करने में मदद','दफ्तर के कंप्यूटर, प्रिंटर, वाई-फाई और नेटवर्क सहायता'],
  note:'संबद्धता और AICTE प्रक्रिया अलग हो सकती हैं; नियम कोर्स और संस्था के अनुसार जाँचें। EYEPEK प्रक्रिया व दस्तावेज़ों में सहायता करता है, मंज़ूरी का निर्णय विश्वविद्यालय या नियामक प्राधिकरण का होता है।',
 },
 'it-support': {
  title:'आईटी और कंप्यूटर सहायता सेवाएँ', metaTitle:'आईटी और कंप्यूटर सहायता सेवाएँ | EYEPEK',
  description:'कंप्यूटर, सॉफ्टवेयर, प्रिंटर, वाई-फाई, नेटवर्क, CCTV और रखरखाव से जुड़ी व्यावहारिक सहायता।',
  intro:'घर, पढ़ाई, दफ्तर और छोटे व्यवसायों के लिए तकनीकी मदद।',
  services:['कंप्यूटर और लैपटॉप की समस्या व मरम्मत सहायता','Windows और सॉफ्टवेयर इंस्टॉल करने में मदद','प्रिंटर सेटअप और समस्या समाधान','वाई-फाई, राउटर और लोकल नेटवर्क सेटअप','CCTV और सुरक्षा कैमरा इंस्टॉलेशन','सर्वर और दफ्तर के उपकरणों में सहायता','उपलब्धता के अनुसार रिमोट सहायता और रखरखाव'],
  note:'बुकिंग से पहले EYEPEK से उपलब्धता, विज़िट और कीमत की पुष्टि करें।',
 },
 'home-services': {
  title:'घरेलू रखरखाव सेवाएँ', metaTitle:'घरेलू रखरखाव सेवाएँ | EYEPEK',
  description:'प्लंबिंग, इलेक्ट्रीशियन, पंखा और लाइट फिटिंग, उपकरण इंस्टॉलेशन, AC और CCTV संबंधी घरेलू सहायता।',
  intro:'घर के रोज़मर्रा के रखरखाव और फिटिंग के कामों में मदद पाएँ।',
  services:['प्लंबिंग और सामान्य घरेलू रखरखाव','इलेक्ट्रीशियन, पंखा और लाइट फिटिंग','घरेलू उपकरण लगाना और मरम्मत सहायता','AC इंस्टॉलेशन और संबंधित रखरखाव','CCTV और घर के सुरक्षा कैमरे सेटअप'],
  note:'सेवा और तकनीशियन की उपलब्धता स्थान के अनुसार बदल सकती है। काम तय करने से पहले जानकारी और कीमत पक्की करें।',
 },
};

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const { language } = useLanguage();
  const t = (english, hindi) => language === 'hi' ? hindi : english;
  const service = servicePages[serviceSlug];
  const content = language === 'hi' ? (serviceHindi[serviceSlug] || service) : service;

  useEffect(() => {
    if (!content) return;
    document.title = content.metaTitle;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', content.description);

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
      name: content.title,
      description: content.description,
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
  }, [content, serviceSlug]);

  if (!service) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-blue-950">{t("Service page not found","सेवा पेज नहीं मिला")}</h1>
        <p className="mt-4 text-slate-600">{t("Please browse our services or contact EYEPEK for guidance.","हमारी सेवाएँ देखें या मार्गदर्शन के लिए EYEPEK से संपर्क करें।")}</p>
        <Link to="/#student-support" className="mt-7 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white">{t("Browse services","सेवाएँ देखें")}</Link>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-blue-50 via-white to-orange-50/60 text-slate-900">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#102b4e] via-[#17457f] to-[#2864a8] text-white">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-10 md:py-16">
          <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">{t("EYEPEK · Services","EYEPEK · सेवाएँ")}</p>
          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl md:text-5xl">{content.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">{content.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#f5a623] px-6 py-3 font-bold text-[#102b4e] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#ffb84d]">Enquire now <FaArrowRight aria-hidden="true" /></Link>
            <a href="tel:+917004374250" className="inline-flex items-center gap-2 rounded-xl border border-white/45 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-blue-950"><FaPhoneAlt aria-hidden="true" /> Call 7004374250</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_0.7fr] md:px-10 md:py-20">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-orange-700">{t("How we can help","हम कैसे मदद कर सकते हैं")}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-blue-950">{t("Services and support","सेवाएँ और सहायता")}</h2>
          <p className="mt-4 leading-7 text-slate-600">{content.description}</p>
          {content.process?.length > 0 && (
            <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-6">
              <h2 className="text-xl font-extrabold text-blue-950">{content.processTitle}</h2>
              <ol className="mt-4 space-y-3">
                {content.process.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-900">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <ul className="mt-7 space-y-4">
            {content.services.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <FaCheckCircle className="mt-1 shrink-0 text-orange-500" aria-hidden="true" />
                <span className="leading-7 text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm leading-6 text-slate-700">{content.note}</p>
        </div>

        <aside className="h-fit rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-950/5 md:sticky md:top-24">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">{t("Need help?","मदद चाहिए?")}</p>
          <h2 className="mt-3 text-2xl font-extrabold text-blue-950">{t("Talk to EYEPEK","EYEPEK से बात करें")}</h2>
          <p className="mt-3 leading-7 text-slate-600">{t("Tell us what you need. Our team can help you understand the next step and confirm availability.","अपनी ज़रूरत बताएँ। हमारी टीम अगला कदम समझने और उपलब्धता की पुष्टि करने में मदद करेगी।")}</p>
          <a href="tel:+917004374250" className="mt-6 block rounded-xl bg-blue-950 px-5 py-3.5 text-center font-bold text-white transition hover:bg-blue-800">{t("Call +91 70043 74250","+91 70043 74250 पर कॉल करें")}</a>
          <a href="https://wa.me/917004374250" className="mt-3 block rounded-xl border border-green-200 bg-green-50 px-5 py-3.5 text-center font-bold text-green-800 transition hover:bg-green-100">{t("WhatsApp EYEPEK","EYEPEK को WhatsApp करें")}</a>
          <a href="mailto:Info.eyepek@gmail.com" className="mt-3 block break-words rounded-xl border border-slate-200 px-5 py-3.5 text-center font-bold text-blue-900 transition hover:bg-blue-50">Info.eyepek@gmail.com</a>
          <Link to="/#student-support" className="mt-6 inline-flex items-center gap-2 font-bold text-blue-900 hover:text-orange-600">View all services <FaArrowRight aria-hidden="true" /></Link>
        </aside>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
