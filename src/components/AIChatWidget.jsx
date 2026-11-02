import React, { useEffect, useRef, useState } from 'react';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const WHATSAPP_URL = 'https://wa.me/917004374250?text=Hello%20EYEPEK%2C%20I%20need%20course%20or%20admission%20guidance.';

const containsAny = (text, words) => words.some((word) => text.includes(word));

function getFaqReply(question, hi) {
  const text = question.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

  if (containsAny(text, ['aicte', 'approval', 'approved', 'recognition', 'मान्यता', 'स्वीकृति'])) {
    return {
      content: hi
        ? 'AICTE या किसी अन्य नियामक की मंज़ूरी कोर्स और संस्थान पर निर्भर करती है; हर कोर्स पर एक ही नियम लागू नहीं होता। जिस कॉलेज और कोर्स में आपकी रुचि है, उसकी मौजूदा मंज़ूरी संबंधित आधिकारिक संस्था और कॉलेज से जाँचें। EYEPEK जानकारी और दस्तावेज़ी सहायता दे सकता है, लेकिन मंज़ूरी संबंधित संस्था ही देती है।'
        : 'Whether AICTE or another regulator’s approval applies depends on the course and institution. Check the current approval for the specific college and course with the relevant official body and the college. EYEPEK can guide you and help with documentation; approvals are decided by the relevant authorities.',
      contact: true,
    };
  }

  if (containsAny(text, ['affiliation', 'affiliated', 'संबद्धता', 'संबद्ध', 'कॉलेज जुड़ा', 'college linked'])) {
    return {
      content: hi
        ? 'कॉलेज संबद्धता का मतलब है कि कोई कॉलेज किसी विश्वविद्यालय या संबंधित संस्था से जुड़कर तय नियमों के अनुसार कोर्स चलाता है। संबद्धता कॉलेज, कोर्स और सत्र के अनुसार अलग हो सकती है—दाखिले से पहले इसकी मौजूदा स्थिति कॉलेज/विश्वविद्यालय से पक्की करें। EYEPEK कॉलेज संबद्धता की जानकारी और दस्तावेज़ी सहायता में मार्गदर्शन करता है; अंतिम निर्णय संबंधित संस्था का होता है।'
        : 'College affiliation means a college is connected with a university or relevant body to offer courses under its rules. It can vary by college, course and academic session, so confirm the current status with the college or university before applying. EYEPEK offers guidance and documentation support; the final decision belongs to the relevant institution.',
      contact: true,
    };
  }

  if (containsAny(text, ['document', 'documents', 'paper', 'papers', 'दस्तावेज', 'कागज', 'काग़ज़', 'प्रमाणपत्र'])) {
    return {
      content: hi
        ? 'आम तौर पर 10वीं/12वीं की मार्कशीट और प्रमाणपत्र, पहचान पत्र, फोटो और कुछ मामलों में ट्रांसफर/माइग्रेशन या अन्य प्रमाणपत्र माँगे जा सकते हैं। सही सूची कोर्स, कॉलेज और आपकी स्थिति पर निर्भर करती है—कॉलेज की आधिकारिक checklist से पुष्टि करें। निजी दस्तावेज़ यहाँ न भेजें।'
        : 'Colleges may ask for 10th/12th marksheets and certificates, ID, photographs, and sometimes transfer/migration or other certificates. The exact list depends on the course, college and your situation, so confirm it with the college’s official checklist. Please don’t send private documents here.',
      contact: true,
    };
  }

  if (containsAny(text, ['admission', 'admissions', 'apply', 'application', 'प्रवेश', 'दाखिला', 'दाख़िला', 'आवेदन'])) {
    return {
      content: hi
        ? 'दाखिले के लिए पहले कोर्स और कॉलेज चुनें, फिर कॉलेज से मौजूदा पात्रता, तारीखें, फीस और दस्तावेज़ों की सूची पक्की करें। आवेदन और चयन का निर्णय कॉलेज/विश्वविद्यालय करता है। EYEPEK कोर्स चुनने, enquiry और दस्तावेज़ी प्रक्रिया समझने में मदद कर सकता है।'
        : 'To apply, first shortlist a course and college, then confirm current eligibility, dates, fees and required documents with the college. The college or university makes admission and selection decisions. EYEPEK can help you understand course options, enquiries and documentation.',
      contact: true,
    };
  }

  if (containsAny(text, ['course', 'courses', 'bba', 'bca', 'mba', 'mca', ' anm', 'anm', 'gnm', 'nursing', 'कोर्स', 'पाठ्यक्रम'])) {
    return {
      content: hi
        ? 'EYEPEK की वेबसाइट पर BBA, BCA, MBA, MCA, ANM, GNM और B.Sc. Nursing जैसे कोर्सों की जानकारी है। उपलब्धता, पात्रता, अवधि और फीस कॉलेज के अनुसार बदलते हैं—किसी खास कोर्स के लिए कॉलेज से पुष्टि करें।'
        : 'EYEPEK’s website lists courses such as BBA, BCA, MBA, MCA, ANM, GNM and B.Sc. Nursing. Availability, eligibility, duration and fees vary by college, so please confirm details for your chosen course with the college.',
      contact: true,
    };
  }

  if (containsAny(text, ['fee', 'fees', 'cost', 'price', 'फीस', 'शुल्क', 'कीमत'])) {
    return {
      content: hi
        ? 'फीस कॉलेज, कोर्स और सत्र के अनुसार बदलती है। सही और मौजूदा फीस सीधे कॉलेज से लिखित रूप में पक्की करें; EYEPEK फीस तय नहीं करता।'
        : 'Fees vary by college, course and academic session. Please confirm the current fee directly with the college, preferably in writing. EYEPEK does not set college fees.',
      contact: true,
    };
  }

  if (containsAny(text, ['contact', 'phone', 'number', 'whatsapp', 'call', 'संपर्क', 'फोन', 'नंबर', 'बात'])) {
    return {
      content: hi
        ? 'EYEPEK से WhatsApp पर बात करें—हम कोर्स, दाखिले, कॉलेज संबद्धता और दस्तावेज़ों के बारे में मार्गदर्शन देंगे।'
        : 'Contact EYEPEK on WhatsApp for guidance about courses, admissions, college affiliation and documents.',
      contact: true,
    };
  }

  return {
    content: hi
      ? 'मैं अभी कोर्स, दाखिले, कॉलेज संबद्धता, AICTE/मंज़ूरी और दस्तावेज़ों से जुड़े तय सवालों में मदद कर सकता हूँ। सही जानकारी के लिए EYEPEK से WhatsApp पर बात करें।'
      : 'I can help with quick questions about courses, admissions, college affiliation, approvals and documents. For details specific to your situation, contact EYEPEK on WhatsApp.',
    contact: true,
  };
}

export default function AIChatWidget() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const t = (en, hindi) => hi ? hindi : en;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, open]);

  const sendMessage = (value = draft) => {
    const question = value.trim();
    if (!question) return;
    const reply = getFaqReply(question, hi);
    setMessages((current) => [
      ...current,
      { role: 'user', content: question },
      { role: 'assistant', ...reply },
    ]);
    setDraft('');
  };

  const suggestions = [
    [t('Courses', 'कोर्स'), t('Which courses can I ask about?', 'किन कोर्सों की जानकारी मिल सकती है?')],
    [t('Admission', 'दाखिला'), t('How does admission work?', 'दाखिले की प्रक्रिया क्या है?')],
    [t('Documents', 'दस्तावेज़'), t('What documents may I need?', 'कौन-से दस्तावेज़ लग सकते हैं?')],
    [t('Affiliation', 'संबद्धता'), t('What is college affiliation?', 'कॉलेज संबद्धता क्या है?')],
  ];

  return (
    <div className='fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6'>
      {open && (
        <section className='flex h-[min(76vh,560px)] w-[min(94vw,390px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-950/30' aria-label={t('EYEPEK guide', 'EYEPEK जानकारी सहायक')}>
          <header className='flex items-center justify-between bg-blue-950 px-4 py-4 text-white'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.16em] text-orange-300'>{t('EYEPEK GUIDE', 'EYEPEK जानकारी')}</p>
              <h2 className='mt-1 text-lg font-extrabold'>{t('How can I help?', 'मैं कैसे मदद करूँ?')}</h2>
              <p className='mt-0.5 text-xs text-blue-100'>{t('Quick answers · No sign-in needed', 'तुरंत जानकारी · लॉगिन की ज़रूरत नहीं')}</p>
            </div>
            <button type='button' onClick={() => setOpen(false)} className='rounded-full p-2 text-blue-100 transition hover:bg-white/10 hover:text-white' aria-label={t('Close chat', 'चैट बंद करें')}><FaTimes aria-hidden='true' /></button>
          </header>
          <div className='flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4' role='log' aria-live='polite'>
            {messages.length === 0 && (
              <div className='rounded-xl border border-blue-100 bg-white p-4 shadow-sm'>
                <p className='font-bold text-blue-950'>{t('Namaste! Choose a topic or type your question.', 'नमस्ते! कोई विषय चुनें या अपना सवाल लिखें।')}</p>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{t('I can share quick information about EYEPEK services. College rules, fees and availability can change, so please confirm current details with the college.', 'मैं EYEPEK की सेवाओं की सामान्य जानकारी दे सकता हूँ। कॉलेज के नियम, फीस और उपलब्धता बदल सकते हैं—मौजूदा जानकारी कॉलेज से पक्की करें।')}</p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {suggestions.map(([label, prompt]) => <button key={label} type='button' onClick={() => sendMessage(prompt)} className='rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-left text-xs font-semibold text-blue-900 transition hover:border-orange-400 hover:bg-orange-50'>{label}</button>)}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-sm bg-blue-800 text-white' : 'rounded-bl-sm border border-slate-200 bg-white text-slate-800 shadow-sm'}`}>
                  <p className='whitespace-pre-wrap'>{message.content}</p>
                  {message.contact && <a href={WHATSAPP_URL} target='_blank' rel='noreferrer' className='mt-3 inline-flex rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-700'>{t('Chat with EYEPEK on WhatsApp', 'WhatsApp पर EYEPEK से बात करें')}</a>}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <p className='border-t border-slate-100 bg-white px-4 pt-2 text-[11px] leading-4 text-slate-500'>{t('Please don’t share passwords, payment details or private documents.', 'पासवर्ड, भुगतान विवरण या निजी दस्तावेज़ साझा न करें।')}</p>
          <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className='flex gap-2 bg-white p-3 pt-2'>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1000} placeholder={t('Type your question…', 'अपना सवाल लिखें…')} aria-label={t('Your question', 'आपका सवाल')} className='min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100' />
            <button type='submit' disabled={!draft.trim()} aria-label={t('Send message', 'संदेश भेजें')} className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'><FaPaperPlane aria-hidden='true' /></button>
          </form>
        </section>
      )}
      <button type='button' onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? t('Close EYEPEK guide', 'EYEPEK जानकारी बंद करें') : t('Open EYEPEK guide', 'EYEPEK जानकारी खोलें')} className='flex items-center gap-3 rounded-full bg-orange-500 py-3 pl-4 pr-5 font-bold text-white shadow-lg shadow-blue-950/25 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>
        {open ? <FaTimes aria-hidden='true' /> : <FaComments aria-hidden='true' />}
        <span>{t('Ask EYEPEK', 'EYEPEK से पूछें')}</span>
      </button>
    </div>
  );
}
