import React, { useEffect, useMemo, useState } from 'react';
import { FaArrowRight, FaCheck, FaDownload, FaImage, FaMagic, FaShieldAlt, FaUserTie } from 'react-icons/fa';

const styles = [
  { id: 'corporate', name: 'Corporate', detail: 'Classic business profile' },
  { id: 'formal', name: 'Formal', detail: 'Clean and timeless' },
  { id: 'creative', name: 'Creative', detail: 'Smart-casual portrait' },
  { id: 'executive', name: 'Executive', detail: 'Premium leadership look' },
];
const backgrounds = [
  { id: 'studio', name: 'Studio', detail: 'Soft neutral' },
  { id: 'white', name: 'White', detail: 'Bright and minimal' },
  { id: 'office', name: 'Office', detail: 'Modern workspace' },
];

export default function AIHeadshotPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [style, setStyle] = useState('corporate');
  const [background, setBackground] = useState('studio');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    document.title = 'AI Headshot Studio | EYEPEK';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', 'Create a professional AI headshot with EYEPEK. Upload a photo, choose a professional style and download your portrait.');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.eyepek.com/ai-headshot';
    return () => { canonical.href = 'https://www.eyepek.com/'; };
  }, []);

  const fileSize = useMemo(() => file ? (file.size / (1024 * 1024)).toFixed(1) : '', [file]);

  const chooseFile = (nextFile) => {
    setError('');
    setResult('');
    if (!nextFile) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(nextFile.type)) {
      setError('Please choose a JPG, PNG or WEBP photo.');
      return;
    }
    if (nextFile.size > 4 * 1024 * 1024) {
      setError('Please choose a photo smaller than 4 MB.');
      return;
    }
    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
  };

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const generate = async (event) => {
    event.preventDefault();
    setError('');
    setResult('');
    if (!file) return setError('Please upload your photo first.');
    if (!consent) return setError('Please confirm that you have permission to use this photo.');
    setBusy(true);
    try {
      const body = new FormData();
      body.append('photo', file);
      body.append('style', style);
      body.append('background', background);
      const response = await fetch('/api/headshot', { method: 'POST', body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not generate your headshot. Please try again.');
      setResult(data.image_data_url);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f8fd] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#101b3d] via-[#17366f] to-[#2457e6] text-white">
        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-cyan-100"><FaMagic /> EYEPEK AI STUDIO</span>
            <h1 className="mt-7 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">Your next opportunity deserves a <span className="text-cyan-200">great first impression.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">Turn a clear everyday photo into a polished professional headshot for your CV, LinkedIn profile and professional portfolio.</p>
            <a href="#create-headshot" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-950 shadow-lg transition hover:-translate-y-0.5">Create your headshot <FaArrowRight /></a>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-blue-100"><span className="flex items-center gap-2"><FaCheck className="text-cyan-200" /> Multiple styles</span><span className="flex items-center gap-2"><FaCheck className="text-cyan-200" /> Natural appearance</span><span className="flex items-center gap-2"><FaCheck className="text-cyan-200" /> Download ready</span></div>
          </div>
          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between text-xs font-bold tracking-widest text-blue-100"><span>THE EYEPEK STANDARD</span><span className="rounded-full bg-cyan-200/15 px-3 py-1 text-cyan-100">AI PORTRAIT</span></div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="flex aspect-[4/5] items-end rounded-2xl bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 p-3"><span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-slate-700">YOUR PHOTO</span></div>
              <div className="flex aspect-[4/5] items-end rounded-2xl bg-gradient-to-br from-cyan-100 via-blue-300 to-blue-800 p-3"><span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-blue-800">PRO LOOK</span></div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/10 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/15 text-cyan-100"><FaUserTie /></span><div><p className="font-bold">A confident first impression.</p><p className="mt-1 text-xs text-blue-100">Your face. Your identity. A sharper profile.</p></div></div>
          </div>
        </div>
      </section>

      <section id="create-headshot" className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
        <div className="mb-9 text-center"><p className="text-xs font-extrabold tracking-[0.2em] text-blue-700">CREATE YOUR PORTRAIT</p><h2 className="mt-3 text-3xl font-black text-[#101b3d] sm:text-4xl">Three steps to a stronger profile.</h2><p className="mt-3 text-slate-600">Upload a clear photo, select your look and create your headshot.</p></div>
        <form onSubmit={generate} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/5 sm:p-9">
          <div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 font-black text-blue-700">01</span><div><h3 className="font-extrabold text-[#101b3d]">Upload your photo</h3><p className="mt-1 text-sm text-slate-500">Choose a front-facing photo with your face clearly visible.</p></div></div>
          <label className="mt-5 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-5 text-center transition hover:border-blue-500 hover:bg-blue-50">
            <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => chooseFile(e.target.files?.[0])} />
            {preview ? <img src={preview} alt="Selected photo preview" className="mb-3 max-h-52 max-w-full rounded-xl object-contain" /> : <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl text-blue-700 shadow-sm"><FaImage /></span>}
            <span className="font-bold text-[#101b3d]">{file ? file.name : 'Tap to choose your photo'}</span><span className="mt-1 text-xs text-slate-500">{file ? `${fileSize} MB selected` : 'JPG, PNG or WEBP · Maximum 4 MB'}</span>
          </label>

          <div className="mt-9 flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 font-black text-blue-700">02</span><div><h3 className="font-extrabold text-[#101b3d]">Choose your style</h3><p className="mt-1 text-sm text-slate-500">Pick a look that fits the opportunity ahead.</p></div></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">{styles.map((item) => <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${style === item.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}><input type="radio" name="style" value={item.id} checked={style === item.id} onChange={() => setStyle(item.id)} className="accent-blue-700" /><span><b className="block text-sm text-[#101b3d]">{item.name}</b><small className="mt-1 block text-xs text-slate-500">{item.detail}</small></span>{style === item.id && <FaCheck className="ml-auto text-blue-700" />}</label>)}</div>

          <div className="mt-9 flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 font-black text-blue-700">03</span><div><h3 className="font-extrabold text-[#101b3d]">Select a background</h3><p className="mt-1 text-sm text-slate-500">Choose a clean setting for your portrait.</p></div></div>
          <div className="mt-4 flex flex-wrap gap-3">{backgrounds.map((item) => <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${background === item.id ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}><input type="radio" name="background" value={item.id} checked={background === item.id} onChange={() => setBackground(item.id)} className="accent-blue-700" />{item.name}<span className="text-xs font-normal text-slate-400">{item.detail}</span></label>)}</div>

          <label className="mt-8 flex items-start gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-blue-700" /><span>I confirm I have permission to use this photo and agree to its processing to create my headshot.</span></label>
          {error && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          <button type="submit" disabled={busy} className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 font-extrabold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{busy ? 'Creating your professional headshot…' : 'Generate my AI headshot'} <FaMagic /></button>
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"><FaShieldAlt /> Your photo is sent to OpenAI to create the portrait and is not stored on EYEPEK's website.</p>
        </form>

        {result && <section className="mt-8 rounded-3xl border border-blue-100 bg-white p-5 shadow-xl sm:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-extrabold tracking-[0.18em] text-blue-700">YOUR NEW PORTRAIT</p><h3 className="mt-2 text-2xl font-black text-[#101b3d]">Your headshot is ready.</h3></div><span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">✓ Ready</span></div><img src={result} alt="Generated professional headshot" className="mx-auto mt-5 max-h-[680px] w-full rounded-2xl bg-slate-50 object-contain" /><a href={result} download="eyepek-professional-headshot.png" className="mt-5 flex items-center justify-center gap-3 rounded-xl bg-blue-700 px-6 py-4 font-bold text-white hover:bg-blue-800"><FaDownload /> Download your headshot</a></section>}
      </section>
    </main>
  );
}
