import React, { useEffect, useRef, useState } from 'react';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

export default function AIChatWidget() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const t = (en, hindi) => hi ? hindi : en;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, open]);

  const sendMessage = async (value = draft) => {
    const text = value.trim();
    if (!text || loading) return;
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setDraft('');
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-8), language: hi ? 'hi' : 'en' }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'request_failed');
      setMessages([...nextMessages, { role: 'assistant', content: payload.reply }]);
    } catch {
      setError(t('Sorry, the assistant could not reply right now. Please try again or contact us on WhatsApp.', 'माफ़ कीजिए, अभी जवाब नहीं मिल पाया। फिर कोशिश करें या WhatsApp पर संपर्क करें।'));
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    [t('Which courses can I ask about?', 'किन कोर्सों के बारे में पूछ सकता/सकती हूँ?'), t('Tell me about BBA', 'BBA के बारे में बताएँ')],
    [t('What documents may I need?', 'कौन-से दस्तावेज़ लग सकते हैं?'), t('How does admission work?', 'प्रवेश प्रक्रिया कैसे होती है?')],
    [t('What is college affiliation?', 'कॉलेज संबद्धता क्या है?'), t('Can you explain affiliation?', 'संबद्धता समझाएँ')],
  ];

  return (
    <div className='fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6'>
      {open && (
        <section className='flex h-[min(76vh,560px)] w-[min(94vw,390px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-950/30' aria-label={t('EYEPEK AI assistant', 'EYEPEK AI सहायक')}>
          <header className='flex items-center justify-between bg-blue-950 px-4 py-4 text-white'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.16em] text-orange-300'>{t('EYEPEK assistant', 'EYEPEK सहायक')}</p>
              <h2 className='mt-1 text-lg font-extrabold'>{t('How can I help?', 'मैं कैसे मदद करूँ?')}</h2>
              <p className='mt-0.5 text-xs text-blue-100'>{t('Courses · Admission · Documents', 'कोर्स · प्रवेश · दस्तावेज़')}</p>
            </div>
            <button type='button' onClick={() => setOpen(false)} className='rounded-full p-2 text-blue-100 transition hover:bg-white/10 hover:text-white' aria-label={t('Close chat', 'चैट बंद करें')}><FaTimes aria-hidden='true' /></button>
          </header>
          <div className='flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4' role='log' aria-live='polite'>
            {messages.length === 0 && (
              <div className='rounded-xl border border-blue-100 bg-white p-4 shadow-sm'>
                <p className='font-bold text-blue-950'>{t('Namaste! I can help explain EYEPEK courses and support.', 'नमस्ते! मैं EYEPEK के कोर्स और सहायता समझाने में मदद कर सकता हूँ।')}</p>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{t('Ask in English or Hindi. For current eligibility, fees and duration, please confirm with the college.', 'हिंदी या अंग्रेज़ी में पूछें। मौजूदा पात्रता, फीस और अवधि कॉलेज से पक्की करें।')}</p>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {suggestions.map(([label, prompt]) => <button key={label} type='button' onClick={() => sendMessage(prompt)} className='rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-left text-xs font-semibold text-blue-900 transition hover:border-orange-400 hover:bg-orange-50'>{label}</button>)}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-sm bg-blue-800 text-white' : 'rounded-bl-sm border border-slate-200 bg-white text-slate-800 shadow-sm'}`}>{message.content}</p>
              </div>
            ))}
            {loading && <div className='w-fit rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500'>{t('Thinking…', 'जवाब तैयार हो रहा है…')}</div>}
            {error && <p role='alert' className='rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-800'>{error}</p>}
            <div ref={bottomRef} />
          </div>
          <p className='border-t border-slate-100 bg-white px-4 pt-2 text-[11px] leading-4 text-slate-500'>{t('Please don’t share passwords, payment details or private documents.', 'पासवर्ड, भुगतान विवरण या निजी दस्तावेज़ साझा न करें।')}</p>
          <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className='flex gap-2 bg-white p-3 pt-2'>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1000} placeholder={t('Type your question…', 'अपना सवाल लिखें…')} aria-label={t('Your question', 'आपका सवाल')} className='min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100' />
            <button type='submit' disabled={loading || !draft.trim()} aria-label={t('Send message', 'संदेश भेजें')} className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'><FaPaperPlane aria-hidden='true' /></button>
          </form>
        </section>
      )}
      <button type='button' onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? t('Close EYEPEK assistant', 'EYEPEK सहायक बंद करें') : t('Open EYEPEK assistant', 'EYEPEK सहायक खोलें')} className='flex items-center gap-3 rounded-full bg-orange-500 py-3 pl-4 pr-5 font-bold text-white shadow-lg shadow-blue-950/25 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200'>
        {open ? <FaTimes aria-hidden='true' /> : <FaComments aria-hidden='true' />}
        <span>{t('Ask EYEPEK', 'EYEPEK से पूछें')}</span>
      </button>
    </div>
  );
}
