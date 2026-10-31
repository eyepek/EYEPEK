import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const guides = {
  'bca-admission-guide': {
    category: 'Course & Admission',
    title: 'BCA Admission Guide: Eligibility, Documents and What to Check',
    description: 'A practical checklist for students comparing BCA programmes, checking eligibility, preparing admission documents and confirming fees and course details.',
    intro: 'Before applying for a Bachelor of Computer Applications (BCA) programme, take time to check the course details and admission requirements directly with the institution.',
    sections: [
      ['1. Check eligibility', 'Ask the institution about its current academic eligibility rules, required subjects, minimum marks and any entrance or selection process. Requirements can differ between institutions and admission sessions.'],
      ['2. Compare the programme', 'Review the course duration, subjects, practical computer-lab learning, faculty information, examination process and the university or awarding body. Do not rely only on a course name or advertisement.'],
      ['3. Prepare your documents', 'Commonly requested documents may include Class 10 and 12 marksheets, certificates, identity and address proof, photographs and category or migration documents where applicable. Confirm the exact list with the institution.'],
      ['4. Confirm fees and dates', 'Ask for the current fee structure, payment schedule, refund policy, application deadline and expected start date in writing before paying.'],
      ['5. Keep your application record', 'Save copies of your application, payment receipt, submitted documents and communication from the institution. Never submit false or altered documents.'],
    ],
    note: 'EYEPEK can help students understand course options, admission steps and document checklists. Eligibility, fees, seat availability and admission decisions must be confirmed with the relevant institution.',
    related: '/services/education',
  },
  'college-affiliation-documentation': {
    category: 'College Affiliation',
    title: 'College Affiliation Documentation: A Practical Preparation Checklist',
    description: 'Understand how to organise college affiliation paperwork, institutional records and supporting documents before submitting them to the relevant authority.',
    intro: 'Preparing an affiliation file is an organised process. Requirements vary by university, regulator, programme and academic session, so always start with the latest official notification and checklist.',
    sections: [
      ['1. Identify the applicable authority and rules', 'Confirm the university or regulatory authority, programme, application category, academic session, deadlines and the latest prescribed format. Do not rely on an old checklist.'],
      ['2. Organise institution records', 'Create a document index and organise the institution’s legal, governance, land or building, infrastructure and other records as applicable to the current official requirements.'],
      ['3. Check faculty and staff records', 'Where required, organise appointment letters, qualification records, experience documents, workload details and supporting staff information. Check consistency across every record.'],
      ['4. Review facilities and evidence', 'Prepare relevant room, laboratory, library, equipment, safety and facility records only as required by the applicable authority. Keep evidence current and verifiable.'],
      ['5. Verify before submission', 'Check signatures, dates, page numbering, annexures, certificates, translations and file naming. Keep a complete copy of the submitted application and acknowledgement.'],
    ],
    note: 'EYEPEK provides process guidance and documentation organisation support. EYEPEK does not grant affiliation, guarantee approval or replace the official requirements and decisions of a university or regulator.',
    related: '/services/business-support',
  },
  'college-renewal-compliance-checklist': {
    category: 'College Documentation',
    title: 'College Renewal and Compliance: Records to Review Before a Deadline',
    description: 'A practical way for educational institutions to organise renewal records, compliance evidence, faculty files and submission deadlines.',
    intro: 'Renewal and compliance work is easier when records are maintained throughout the year rather than collected at the last moment. The exact requirements depend on the authority and programme.',
    sections: [
      ['1. Start with the latest official notice', 'Record the applicable session, deadline, portal instructions, prescribed forms, fee details and document list. Requirements may change from one cycle to another.'],
      ['2. Maintain a compliance calendar', 'Track each requirement, responsible person, evidence needed, review date and submission status. Add reminders well before the official deadline.'],
      ['3. Keep institutional records updated', 'Review governance records, staff and faculty files, student records, infrastructure details, equipment inventories and other records that the authority specifically requires.'],
      ['4. Check validity and consistency', 'Verify certificate validity, names, dates, signatures, addresses and figures across documents. Resolve discrepancies before uploading or submitting.'],
      ['5. Preserve submission evidence', 'Keep the final file set, payment receipts, acknowledgement, correspondence and any subsequent clarification or inspection records in an organised archive.'],
    ],
    note: 'This guide is general information, not a substitute for an official checklist or legal advice. EYEPEK can assist with document organisation and process guidance; compliance findings and approvals remain with the relevant authority.',
    related: '/services/business-support',
  },
  'computer-laptop-troubleshooting-first-checks': {
    category: 'IT & Computer Support',
    title: 'Computer and Laptop Troubleshooting: Safe First Checks',
    description: 'Simple and safe first checks for common computer and laptop problems, including slow performance, Wi-Fi issues, printer problems and software errors.',
    intro: 'A few basic checks can help identify common computer problems. Protect your files first and avoid opening equipment or changing settings you do not understand.',
    sections: [
      ['1. If the computer is slow', 'Save your work, restart the device, close unused applications and check available storage. Avoid installing unknown “PC cleaner” tools or downloading software from unofficial websites.'],
      ['2. If Wi-Fi is not working', 'Check whether other devices can connect, confirm Wi-Fi is enabled, restart the router if safe to do so and check for an internet service outage. Keep your router password private.'],
      ['3. If the printer is not printing', 'Check power, paper, ink or toner, cable or Wi-Fi connection and the selected printer. Review the print queue for paused or stuck jobs.'],
      ['4. If software shows an error', 'Note the exact error message, when it appears and what changed recently. Use official vendor updates and installers; do not share passwords or verification codes with anyone.'],
      ['5. Protect your data', 'Keep a current backup of important files. If you hear unusual noises, smell burning, see liquid damage or suspect a failing drive, turn the device off and seek qualified help rather than repeatedly restarting it.'],
    ],
    note: 'EYEPEK offers computer and laptop troubleshooting, software installation, printer and networking support. Contact the team to confirm service availability and arrangements.',
    related: '/services/it-support',
  },,

  'wifi-not-working-home-office-checklist': {
    category: 'Wi-Fi & Networking',
    title: 'Wi-Fi Not Working? A Safe Home and Office Troubleshooting Checklist',
    description: 'Learn how to check a slow or disconnected Wi-Fi network, router lights, device settings and internet outages before requesting technical support.',
    intro: 'When Wi-Fi stops working, first identify whether the issue affects one device or the whole network. These safe checks can help narrow down the cause without changing advanced router settings.',
    sections: [
      ['1. Check whether one device or every device is affected', 'Try connecting a second phone or computer to the same Wi-Fi. If only one device has a problem, check its Wi-Fi setting, airplane mode and saved network connection. If every device is offline, continue with the router and internet connection checks.'],
      ['2. Read the router lights', 'Check the power, internet/WAN and Wi-Fi indicators against the router manufacturer’s manual. A red or unusual internet light may indicate a line or service issue. Light meanings differ by model, so do not guess or press reset.'],
      ['3. Restart safely', 'If there is no sign of electrical damage, switch the router off using its power button, wait around 30 seconds and turn it back on. Allow a few minutes for it to reconnect. Do not use the factory reset button as a routine restart.'],
      ['4. Check placement and interference', 'Keep the router in an open, central location, away from thick obstructions and enclosed cabinets. Distance, walls and interference from nearby devices can reduce signal strength.'],
      ['5. Contact your internet provider or a technician', 'If all devices remain offline, note the router light pattern and any outage message, then contact your internet provider. Never share your router administrator password or one-time codes with an unknown caller.'],
    ],
    note: 'EYEPEK provides Wi-Fi, networking and technical support for home and office setups. Share the problem and device/router model when contacting the team so the right support can be discussed.',
    related: '/services/it-support',
  },
  'printer-not-printing-checklist': {
    category: 'Printer Support',
    title: 'Printer Not Printing? Checks to Try Before Calling for Help',
    description: 'A practical printer troubleshooting checklist covering power, paper, ink, connections, print queues, drivers and safe maintenance.',
    intro: 'A printer that will not print may have a simple paper, connection or queue issue. Work through these checks in order and avoid forcing parts or opening electrical components.',
    sections: [
      ['1. Check power and printer status', 'Confirm the printer is switched on and has no error light or display message. If it is unresponsive, check the power cable and wall socket. Do not continue if you notice burning smells, liquid or damaged wiring.'],
      ['2. Check paper, ink and toner', 'Load the correct paper size, make sure the tray guides are positioned properly and check ink or toner levels. Remove a paper jam only using the manufacturer’s instructions; do not pull hard against rollers.'],
      ['3. Check the connection', 'For USB printers, confirm the cable is firmly connected. For Wi-Fi printers, check that the printer and computer are on the intended network. A guest network may prevent devices from finding one another.'],
      ['4. Review the print queue', 'On your computer, open the printer queue and check whether printing is paused or old jobs are stuck. Confirm that the correct printer is selected and set as default if appropriate.'],
      ['5. Check the official driver and test page', 'If the printer is detected but still fails, check the manufacturer’s official support site for the correct driver for your operating system. Print a test page after installation and keep the exact error message if the issue continues.'],
    ],
    note: 'EYEPEK offers printer setup, troubleshooting and related computer support. Keep the printer model and any displayed error code ready when you contact the team.',
    related: '/services/it-support',
  },
};

const GuidePage = () => {
  const { guideSlug } = useParams();
  const guide = guides[guideSlug];

  useEffect(() => {
    if (!guide) return;
    document.title = guide.title + ' | EYEPEK Guides';
    const setMeta = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('description')) element.setAttribute('name', 'description');
        else element.setAttribute('property', 'og:description');
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', 'content', guide.description);
    setMeta('meta[property="og:description"]', 'content', guide.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.eyepek.com/guides/' + guideSlug;
    let schema = document.querySelector('#eyepek-guide-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'eyepek-guide-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      author: { '@type': 'Organization', name: 'EYEPEK', url: 'https://www.eyepek.com/' },
      publisher: { '@type': 'Organization', name: 'EYEPEK', url: 'https://www.eyepek.com/' },
      mainEntityOfPage: 'https://www.eyepek.com/guides/' + guideSlug,
    });
    return () => document.querySelector('#eyepek-guide-schema')?.remove();
  }, [guide, guideSlug]);

  if (!guide) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-black text-blue-950">EYEPEK Guides</h1>
        <p className="mt-3 text-slate-600">Practical information for students, colleges, home users and businesses.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Object.entries(guides).map(([slug, item]) => (
            <Link key={slug} to={'/guides/' + slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-700">{item.category}</p>
              <h2 className="mt-2 text-xl font-bold text-blue-950">{item.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              <span className="mt-4 inline-block font-bold text-blue-800">Read guide →</span>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-blue-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">{guide.category} · EYEPEK Guides</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">{guide.title}</h1>
          <p className="mt-5 text-lg leading-8 text-blue-100">{guide.intro}</p>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="space-y-8">
          {guide.sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="text-xl font-extrabold text-blue-950 md:text-2xl">{heading}</h2>
              <p className="mt-3 text-base leading-8 text-slate-700">{body}</p>
            </section>
          ))}
        </div>
        <aside className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-extrabold text-blue-950">How EYEPEK can help</h2>
          <p className="mt-2 leading-7 text-slate-700">{guide.note}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to={guide.related} className="rounded-xl bg-blue-900 px-5 py-3 font-bold text-white">Explore related service</Link>
            <Link to="/contact" className="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white">Contact EYEPEK</Link>
          </div>
        </aside>
        <p className="mt-8 text-sm text-slate-500">This guide provides general information. Always verify current requirements with the relevant institution, manufacturer or authority.</p>
        <Link to="/guides" className="mt-6 inline-block font-bold text-blue-800">← All EYEPEK guides</Link>
      </article>
    </main>
  );
};

export default GuidePage;
