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
  'bba-admission-guide': {
    category: 'Course & Admission',
    title: 'BBA Admission Guide: Eligibility, Documents and How to Compare Colleges',
    description: 'A practical guide to checking BBA eligibility, programme structure, fees, documents and admission steps.',
    intro: 'Before applying for a Bachelor of Business Administration (BBA), compare the programme carefully and confirm current admission rules with the institution.',
    sections: [
      ['1. Confirm eligibility', 'Ask the institution about the accepted Class 12 streams, minimum marks, subject requirements and whether admission is merit-based or includes an entrance or interview process.'],
      ['2. Review the programme', 'Compare subjects such as management, accounting, marketing, economics and business communication, along with internships, projects and practical learning opportunities.'],
      ['3. Prepare documents', 'Keep Class 10 and 12 marksheets, certificates, identity proof, photographs and any migration, transfer or category documents that the institution requests.'],
      ['4. Check fees and deadlines', 'Request the latest fee structure, payment schedule, refund rules, application deadline and academic calendar in writing.'],
      ['5. Verify before paying', 'Confirm the awarding university, programme details and admission status directly with the institution. Save your application and payment receipts.'],
    ],
    note: 'EYEPEK helps students understand course options and admission checklists. Eligibility, fees, recognition and admission decisions must be confirmed with the institution.',
    related: '/services/education',
  },
  'mba-admission-guide': {
    category: 'Course & Admission',
    title: 'MBA Admission Guide: Eligibility, Entrance Tests and Documents',
    description: 'Understand the key questions to ask about MBA eligibility, entrance tests, specialisations, fees and admission documents.',
    intro: 'An MBA is a postgraduate management programme. Admission criteria differ across universities and institutions, so confirm the current rules for the specific programme and intake.',
    sections: [
      ['1. Check the academic requirement', 'Ask whether a recognised bachelor’s degree in any discipline is accepted, what minimum marks are required and whether final-year applicants may apply.'],
      ['2. Ask about entrance and selection', 'Confirm whether the institution accepts national or state entrance scores, conducts its own test, or uses interviews, group discussions or other selection stages.'],
      ['3. Compare specialisations', 'Review available areas such as finance, marketing, human resources, operations, business analytics or international business, along with faculty and practical exposure.'],
      ['4. Prepare the application file', 'Common documents may include graduation marksheets and degree/provisional certificate, Class 10 and 12 records, entrance scorecard, identity proof, photographs and work-experience evidence if applicable.'],
      ['5. Confirm total cost and outcomes', 'Ask for tuition and other charges, refund policy, programme mode, duration, internship support and placement information. Verify claims directly with the institution.'],
    ],
    note: 'EYEPEK provides course and admission process guidance. Entrance requirements, programme recognition, fees and selection decisions must be verified with the institution.',
    related: '/services/education',
  },
  'mca-admission-guide': {
    category: 'Course & Admission',
    title: 'MCA Admission Guide: Eligibility, Mathematics Requirements and Documents',
    description: 'A practical checklist for comparing MCA programmes and confirming academic eligibility, subject requirements and admission steps.',
    intro: 'The Master of Computer Applications (MCA) is a postgraduate computing programme. Eligibility and subject requirements can vary, so check the latest rules for each university and admission session.',
    sections: [
      ['1. Confirm degree and subject eligibility', 'Ask whether your bachelor’s degree is accepted and whether Mathematics is required at Class 12 or graduation level. Check any minimum marks and equivalence rules.'],
      ['2. Check the selection process', 'Confirm whether admission uses an entrance examination, merit list, counselling, interview or a combination of methods. Note the application and counselling dates.'],
      ['3. Review the curriculum', 'Compare programming, algorithms, databases, software engineering, networks, cloud or other electives, practical labs, projects and internship opportunities.'],
      ['4. Prepare documents', 'Keep graduation marksheets and certificate, Class 10 and 12 records, identity proof, photographs, entrance scorecard and migration or category documents where applicable.'],
      ['5. Verify programme details', 'Confirm the university or awarding body, programme mode, duration, current fee structure, refund policy and any applicable regulatory requirements before paying.'],
    ],
    note: 'EYEPEK can help organise MCA admission questions and document checklists. Final eligibility and admission decisions rest with the relevant institution.',
    related: '/services/education',
  },
  'anm-admission-guide': {
    category: 'Nursing Course & Admission',
    title: 'ANM Admission Guide: Eligibility, Recognition and Documents to Check',
    description: 'Questions to ask before applying for Auxiliary Nurse Midwifery (ANM), including eligibility, approved intake, clinical training and documents.',
    intro: 'ANM is a nursing and community-health programme. Requirements and recognition must be checked against current official nursing authority and institution information for the relevant state and session.',
    sections: [
      ['1. Verify current eligibility', 'Ask the institution for the current age, educational qualification, subject and minimum-mark requirements, including any state-specific admission rules.'],
      ['2. Check recognition and approval', 'Verify the institution and programme status with the appropriate state nursing council and competent authorities. Do not rely only on advertisements.'],
      ['3. Review training arrangements', 'Ask about programme duration, clinical placements, practical training facilities, attendance and examination arrangements.'],
      ['4. Prepare documents', 'The institution may ask for Class 10 and 12 records, identity and age proof, photographs, medical or fitness documents and category or domicile certificates where applicable. Confirm its exact list.'],
      ['5. Confirm fees and admission dates', 'Get the current fee structure, refund policy, application schedule and written confirmation of the course and approved intake before making payment.'],
    ],
    note: 'EYEPEK offers general course and document guidance only. Confirm ANM eligibility, recognition and admission directly with the institution and relevant nursing authorities.',
    related: '/services/education',
  },
  'gnm-admission-guide': {
    category: 'Nursing Course & Admission',
    title: 'GNM Admission Guide: Eligibility, Training and College Verification',
    description: 'A practical guide to checking GNM eligibility, nursing college recognition, clinical training, fees and admission documents.',
    intro: 'General Nursing and Midwifery (GNM) is a nursing programme. Admission criteria and recognition requirements can change, so check the current official rules for your state and session.',
    sections: [
      ['1. Confirm eligibility for the current session', 'Ask the institution about accepted qualifications, required subjects, minimum marks, age criteria and any applicable entrance or merit process.'],
      ['2. Verify the nursing institution', 'Check the college and programme status with the relevant state nursing council and competent authorities. Confirm the approved intake and current session details.'],
      ['3. Understand the training', 'Ask about clinical practice, hospital tie-ups, laboratories, faculty, attendance, examinations and the practical training schedule.'],
      ['4. Arrange your documents', 'Commonly requested records may include Class 10 and 12 marksheets, certificates, identity and age proof, photographs, medical fitness evidence and applicable category or domicile documents.'],
      ['5. Check costs and written terms', 'Request the complete fee breakdown, hostel charges if any, refund policy, admission deadline and written receipt for every payment.'],
    ],
    note: 'EYEPEK can help students prepare questions and document checklists. GNM recognition, eligibility and admission decisions must be verified with the relevant institution and nursing authority.',
    related: '/services/education',
  },
  'bsc-nursing-admission-guide': {
    category: 'Nursing Course & Admission',
    title: 'B.Sc. Nursing Admission Guide: Eligibility, Entrance and College Checks',
    description: 'Learn what to verify about B.Sc. Nursing eligibility, science subjects, entrance tests, clinical facilities and admission documents.',
    intro: 'B.Sc. Nursing is an undergraduate nursing programme. Subject, age, marks and entrance requirements are governed by current rules and may vary by admission route and institution.',
    sections: [
      ['1. Check subject and academic requirements', 'Ask whether Physics, Chemistry and Biology with English are required, what minimum marks apply and how the institution treats equivalent qualifications. Confirm current age criteria too.'],
      ['2. Confirm the admission route', 'Check whether admission is through a state or national entrance process, university test, counselling or another officially notified method. Record the relevant dates.'],
      ['3. Verify the college and facilities', 'Check the current recognition and approved intake with the appropriate nursing authorities. Ask about laboratories, clinical placements, faculty and hospital training arrangements.'],
      ['4. Prepare documents', 'Keep Class 10 and 12 marksheets and certificates, identity and age proof, photographs, entrance scorecard and any category, domicile or medical documents requested.'],
      ['5. Review fees and conditions', 'Confirm tuition, hostel and other charges, refund terms, programme duration and the exact admission conditions in writing before paying.'],
    ],
    note: 'EYEPEK provides general admission guidance and document organisation support. Verify B.Sc. Nursing eligibility, recognition and admission with the institution and relevant nursing authorities.',
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
  },

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
  },,

  'bihar-college-admission-checklist': {
    category: 'Bihar Admissions',
    title: 'College Admission in Bihar: A Student Document and Verification Checklist',
    description: 'A practical Bihar-focused checklist for students comparing BBA, BCA, MBA and MCA colleges, preparing admission documents and verifying course details before paying fees.',
    intro: 'Students applying to colleges in Bihar should compare the course, institution and admission conditions carefully. The exact eligibility, dates and document list depend on the university, institution, programme and admission session.',
    sections: [
      ['1. Shortlist the right course and institution', 'Compare the programme you want to study, the awarding university, course mode, duration, subjects, facilities and location. For BBA, BCA, MBA and MCA, read the current programme information rather than relying only on advertisements.'],
      ['2. Verify affiliation and course status', 'Check the institution and the specific programme through the relevant university and official regulator or council, wherever applicable. Confirm the current academic session and approved intake directly with the competent authority.'],
      ['3. Prepare your admission documents', 'Keep your Class 10 and 12 marksheets and certificates, graduation records for postgraduate courses, identity proof, photographs and any migration, transfer, category or domicile documents requested by the institution. Carry originals only when officially required and keep copies securely.'],
      ['4. Confirm fees and admission dates in writing', 'Ask for the complete fee structure, payment schedule, refund policy, application deadline, counselling steps and expected class start date. Pay only through an authorised channel and collect an official receipt.'],
      ['5. Check the application and acknowledgement', 'Review names, dates, marks and uploaded documents before submitting. Save the application number, payment receipt, submitted form and official communication. Never use false or altered documents.'],
      ['6. Ask questions before making a decision', 'Confirm who awards the degree, how examinations are conducted, what facilities are available and whom to contact for student support. If anything is unclear, request written clarification from the institution.'],
    ],
    note: 'EYEPEK can help students understand course options, admission steps and document checklists for BBA, BCA, MBA and MCA. This is general guidance, not an official admission notice. Current eligibility, recognition, fees, dates and admission decisions must be confirmed with the relevant institution and authority.',
    related: '/services/education',
  },
  'bihar-college-affiliation-document-preparation': {
    category: 'Bihar College Documentation',
    title: 'College Affiliation in Bihar: How to Prepare an Organised Document File',
    description: 'A practical guide for educational institutions in Bihar to organise affiliation, governance, faculty, infrastructure and compliance records before checking the latest official requirements.',
    intro: 'Affiliation documentation should begin with the latest official notice from the relevant university or authority. Requirements vary by institution type, programme, location and academic session, so a generic checklist cannot replace the prescribed one.',
    sections: [
      ['1. Identify the correct university and application route', 'Confirm the affiliating university, programme, application category, academic session, applicable regulations, portal and submission deadline. Use the current official notification and formats.'],
      ['2. Create a master document index', 'Prepare a tracker with each required document, responsible person, source, validity date, review status and file location. Keep separate folders for governance, legal records, land and building, finance, faculty, infrastructure and programme-specific evidence where relevant.'],
      ['3. Review governance and institutional records', 'Organise the institution’s governing body records, resolutions, registration or constitution documents and other legal or administrative evidence only as required by the current official checklist. Ensure names and dates match across records.'],
      ['4. Check faculty, staff and infrastructure evidence', 'Where applicable, organise faculty qualifications, appointment and experience records, staff details, classroom and laboratory information, library resources, equipment inventories and safety certificates. Keep all evidence genuine, current and verifiable.'],
      ['5. Track compliance and certificate validity', 'Record expiry dates and renewal responsibilities for certificates and statutory documents that apply to the institution. Do not assume a certificate or approval is universally required; follow the relevant authority’s current instructions.'],
      ['6. Complete a pre-submission quality check', 'Check prescribed formats, signatures, stamps where required, page numbering, annexures, translations, file sizes and portal instructions. Preserve the final submitted file set, receipts and acknowledgement.'],
    ],
    note: 'EYEPEK provides process guidance and documentation organisation support for institutions. EYEPEK is not a university, AICTE or government authority and cannot grant affiliation or guarantee approval. Final requirements and decisions rest with the competent authority.',
    related: '/services/business-support',
  },
  'bihar-computer-printer-wifi-support-checklist': {
    category: 'IT Support in Bihar',
    title: 'Computer, Printer and Wi-Fi Problems: A Safe First-Check Guide',
    description: 'A simple checklist for students, homes and offices in Bihar to narrow down common laptop, desktop, printer and Wi-Fi issues before arranging technical support.',
    intro: 'When a computer, printer or Wi-Fi connection stops working, a few safe checks can help identify the issue. Protect important files and avoid opening electrical equipment or changing advanced settings if you are unsure.',
    sections: [
      ['1. Identify what is affected', 'Check whether the issue affects one device or several devices. Note when it started, any recent update or change, and the exact error message. This information helps narrow down the cause.'],
      ['2. For a slow computer or laptop', 'Save your work, restart the device, close unused applications and check available storage. Keep important files backed up and use only official software installers and updates.'],
      ['3. For a printer that will not print', 'Check power, paper, ink or toner, the selected printer, cable or Wi-Fi connection and the print queue. Follow the manufacturer’s instructions for paper jams and driver downloads.'],
      ['4. For Wi-Fi or internet problems', 'Check whether another device can connect, review the router indicators using its manual and restart the router only if there is no sign of electrical damage. Do not press factory reset for a routine connection issue.'],
      ['5. Keep passwords and data safe', 'Do not share passwords, OTPs or remote-access codes with unknown callers. Back up important data before service and ask what work will be performed before authorising it.'],
    ],
    note: 'EYEPEK offers computer and laptop troubleshooting, software installation, printer setup, Wi-Fi and networking support. Contact the team to confirm service coverage, availability and arrangements for your location.',
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
