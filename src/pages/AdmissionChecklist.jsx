import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const coreDocuments = [
  'Recent passport-size photographs',
  'Aadhaar card or another valid photo ID',
  'Class 10 marksheet and certificate',
  'Class 12 marksheet and certificate (if applicable)',
  'Graduation marksheets and degree certificate (for postgraduate courses)',
  'Transfer certificate or school/college leaving certificate',
  'Migration certificate (if applicable)',
  'Category, income or domicile certificate (if applicable)',
];

const courseOptions = [
  'BBA', 'BCA', 'MBA', 'MCA', 'ANM', 'GNM', 'B.Sc. Nursing', 'Other course',
];

const coreDocumentsHi = [
  'हाल की पासपोर्ट आकार की तस्वीरें',
  'आधार कार्ड या अन्य वैध फोटो पहचान-पत्र',
  'कक्षा 10 की अंकतालिका और प्रमाणपत्र',
  'कक्षा 12 की अंकतालिका और प्रमाणपत्र (यदि लागू हो)',
  'स्नातक की अंकतालिकाएँ और डिग्री प्रमाणपत्र (स्नातकोत्तर कोर्स के लिए)',
  'स्थानांतरण प्रमाणपत्र या स्कूल/कॉलेज छोड़ने का प्रमाणपत्र',
  'माइग्रेशन प्रमाणपत्र (यदि लागू हो)',
  'श्रेणी, आय या निवास प्रमाणपत्र (यदि लागू हो)',
];

const nursingDocumentsHi = [
  'मेडिकल फिटनेस प्रमाणपत्र, यदि संस्थान माँगे',
  'नर्सिंग काउंसिल या प्रवेश परीक्षा के दस्तावेज़, यदि लागू हों',
];

const nursingDocuments = [
  'Medical fitness certificate, if required by the institution',
  'Nursing council or entrance exam documents, if applicable',
];

function AdmissionChecklist() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const t = (english, hindi) => hi ? hindi : english;
  const [course, setCourse] = useState(courseOptions[0]);
  const documents = useMemo(() => {
    const nursing = course.includes('Nursing') || course === 'ANM' || course === 'GNM';
    return hi
      ? (nursing ? [...coreDocumentsHi, ...nursingDocumentsHi] : coreDocumentsHi)
      : (nursing ? [...coreDocuments, ...nursingDocuments] : coreDocuments);
  }, [course, hi]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    document.title = hi ? 'प्रवेश दस्तावेज़ चेकलिस्ट | EYEPEK' : 'Free Admission Document Checklist | EYEPEK';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = hi ? 'BBA, BCA, MBA, MCA, नर्सिंग और अन्य कोर्सों के लिए प्रवेश दस्तावेज़ सूची बनाएँ और प्रिंट करें।' : 'Create a free college admission document checklist for BBA, BCA, MBA, MCA, nursing and other courses. Tick documents and print your list.';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.eyepek.com/admission-checklist';
  }, [hi]);

  const completedCount = documents.filter((_, index) => checked[index]).length;
  const toggle = (index) => setChecked((current) => ({ ...current, [index]: !current[index] }));

  return (
    <main className='min-h-[65vh] bg-slate-50 px-5 py-12 sm:px-8 lg:py-16'>
      <div className='mx-auto max-w-4xl'>
        <p className='text-sm font-bold uppercase tracking-[0.18em] text-orange-600'>{t("Free student tool","छात्रों के लिए निःशुल्क टूल")}</p>
        <div className='mt-3 grid gap-8 md:grid-cols-[1fr_auto] md:items-end'>
          <div>
            <h1 className='text-3xl font-extrabold leading-tight text-blue-950 sm:text-4xl'>{t("College Admission Document Checklist","कॉलेज प्रवेश दस्तावेज़ चेकलिस्ट")}</h1>
            <p className='mt-4 max-w-2xl text-base leading-7 text-slate-600'>{t("Get organised before you apply. Choose your course, tick the documents you have, and print a simple checklist to take along.","आवेदन से पहले तैयारी करें। अपना कोर्स चुनें, जो दस्तावेज़ आपके पास हैं उन्हें टिक करें और सूची प्रिंट करें।")}</p>
          </div>
          <button type='button' onClick={() => window.print()} className='rounded-lg bg-orange-500 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-orange-600 print:hidden'>{t("Print checklist","चेकलिस्ट प्रिंट करें")}</button>
        </div>

        <section className='mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8' aria-labelledby='checklist-heading'>
          <div className='flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between'>
            <label className='block w-full max-w-sm text-sm font-bold text-blue-950'>Choose your course
              <select value={course} onChange={(event) => { setCourse(event.target.value); setChecked({}); }} className='mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100'>
                {courseOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <p className='text-sm font-semibold text-slate-500' aria-live='polite'>{completedCount} {t('of', 'में से')} {documents.length} {t('documents ready', 'दस्तावेज़ तैयार')}</p>
          </div>

          <div className='mt-6 flex items-center justify-between gap-4'>
            <h2 id='checklist-heading' className='text-xl font-bold text-blue-950'>{t("Documents to prepare","तैयार करने वाले दस्तावेज़")}</h2>
            <button type='button' onClick={() => setChecked({})} className='text-sm font-semibold text-orange-700 underline decoration-orange-300 underline-offset-4 hover:text-orange-900 print:hidden'>{t("Reset","रीसेट करें")}</button>
          </div>
          <ul className='mt-4 divide-y divide-slate-100'>
            {documents.map((document, index) => (
              <li key={document}>
                <label className='flex cursor-pointer items-start gap-3 py-4 text-slate-700'>
                  <input type='checkbox' checked={Boolean(checked[index])} onChange={() => toggle(index)} className='mt-1 h-5 w-5 shrink-0 accent-orange-500 print:hidden' />
                  <span className={checked[index] ? 'text-slate-400 line-through' : ''}>{document}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className='mt-5 rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-900'>{t("This is a general preparation list. Required documents, formats and deadlines vary by college, course and admission year. Confirm the final requirements with your chosen institution.","यह सामान्य तैयारी सूची है। ज़रूरी दस्तावेज़, उनका प्रारूप और आखिरी तारीख कॉलेज, कोर्स और प्रवेश वर्ष के अनुसार बदलते हैं। अंतिम सूची अपने संस्थान से पक्की करें।")}</p>
        </section>

        <section className='mt-8 rounded-2xl bg-blue-950 p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8 print:hidden'>
          <div>
            <h2 className='text-xl font-bold'>{t("Need help with admission guidance?","प्रवेश मार्गदर्शन चाहिए?")}</h2>
            <p className='mt-2 text-sm leading-6 text-blue-100'>{t("Tell EYEPEK which course you are exploring and ask about the next steps.","EYEPEK को बताएँ कि आप कौन-सा कोर्स देख रहे हैं और अगले कदम पूछें।")}</p>
          </div>
          <Link to={`/contact?course=${encodeURIComponent(course)}`} className='mt-5 inline-flex shrink-0 items-center rounded-lg bg-white px-5 py-3 font-bold text-blue-950 transition hover:bg-orange-100 sm:mt-0'>Contact EYEPEK <span className='ml-2' aria-hidden='true'>→</span></Link>
        </section>
        <p className='mt-6 text-sm text-slate-500 print:hidden'><Link to='/guides' className='font-semibold text-blue-900 underline underline-offset-4'>Read more student guides</Link></p>
      </div>
      <style>{`@media print { body { background: #fff; } main { padding: 0 !important; background: #fff !important; } main > div { max-width: none !important; } section { box-shadow: none !important; break-inside: avoid; } }`}</style>
    </main>
  );
}

export default AdmissionChecklist;
