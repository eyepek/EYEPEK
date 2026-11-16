import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Building2, ShieldCheck, LogIn, UserPlus, LogOut, Loader2, LockKeyhole, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap, note: 'Find tutors and manage your learning.' },
  { id: 'tutor', label: 'Tutor', icon: BookOpen, note: 'Apply to teach and manage learners.' },
  { id: 'institution', label: 'Institution', icon: Building2, note: 'Register your institution.' }
];

const API = '/api/learning';

export default function App() {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('eyepek_learning_token') || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(API + '/me', { headers: { Authorization: 'Bearer ' + token } })
      .then(async r => { const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Session expired'); return data; })
      .then(data => setUser(data.user))
      .catch(() => { localStorage.removeItem('eyepek_learning_token'); setToken(''); setUser(null); });
  }, [token]);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setError(''); setMessage('');
    try {
      const endpoint = mode === 'register' ? '/register' : '/login';
      const payload = mode === 'register'
        ? { fullName, email, password, role, ...(role === 'institution' ? { institutionName } : {}) }
        : { email, password };
      const response = await fetch(API + endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Request failed. Please try again.');
      localStorage.setItem('eyepek_learning_token', data.token);
      setToken(data.token); setUser(data.user);
      setMessage(data.user.status === 'pending' ? 'Your account has been created and is awaiting approval.' : 'You are signed in.');
      setPassword('');
    } catch (err) { setError(err.message || 'Something went wrong.'); }
    finally { setBusy(false); }
  }

  function logout() {
    localStorage.removeItem('eyepek_learning_token');
    setToken(''); setUser(null); setMode('login'); setPassword(''); setMessage('You have been signed out.');
  }

  const selectedRole = roles.find(r => r.id === (user?.role || role)) || roles[0];
  const Icon = selectedRole.icon;

  if (user) return (
    <div className="learning-app shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">E<span>+</span></div><div><b>EYEPEK</b><small>LEARNING</small></div></div>
        <div className="side-caption">YOUR WORKSPACE</div>
        <div className="role-list"><div className="role active"><Icon size={17}/>{selectedRole.label}</div></div>
        <div className="side-caption nav-caption">MENU</div>
        <nav><div className="nav-link selected"><span className="nav-dot">⌂</span>Overview</div></nav>
        <div className="sidebar-bottom"><div className="help-card"><BookOpen size={17}/><b>Learning support</b><p>More learning tools are being connected.</p></div><div className="online"><i/> Secure account session</div></div>
      </aside>
      <main className="main">
        <header className="topbar"><div><div className="crumb">EYEPEK LEARNING <span>/</span> {selectedRole.label.toUpperCase()}</div><h1>{selectedRole.label} dashboard</h1></div><div className="top-actions"><span className="preview-chip"><i/> Account connected</span><button className="book-btn" onClick={logout}><LogOut size={14}/> Sign out</button></div></header>
        <section className="hero"><div className="hero-copy"><span className="hero-kicker"><CheckCircle2 size={13}/> ACCOUNT CONNECTED</span><h2>Welcome, {user.fullName}.</h2><p>{selectedRole.note} Your account is securely connected to EYEPEK Learning.</p></div></section>
        <div className="section-title"><div><span className="eyebrow">ACCOUNT DETAILS</span><h2>Your profile</h2></div></div>
        <section className="module-grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
          <article className="module-card"><div className="module-icon"><User size={20}/></div><h3>{user.fullName}</h3><p>Full name</p></article>
          <article className="module-card"><div className="module-icon"><Mail size={20}/></div><h3>{user.email}</h3><p>Email address</p></article>
          <article className="module-card"><div className="module-icon"><ShieldCheck size={20}/></div><h3>{user.status === 'active' ? 'Active' : 'Pending approval'}</h3><p>Account status</p></article>
        </section>
        <div className="section-title"><div><span className="eyebrow">PLATFORM ROADMAP</span><h2>Learning tools</h2></div></div>
        <section className="module-grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
          {['Tutor discovery & profiles','Session booking & timetable','Live classroom','Assignments & progress','Institution management','Payments & reports'].map((name,i)=><article className="module-card" key={name}><div className="module-icon">{i===2?<LockKeyhole size={20}/>:<BookOpen size={20}/>}</div><h3>{name}</h3><p>Module is not live yet. It will appear here when connected.</p><span className="tutor-tag">In development</span></article>)}
        </section>
        <footer><span>© {new Date().getFullYear()} EYEPEK Learning.</span><span>Secure learning workspace</span></footer>
      </main>
    </div>
  );

  return (
    <div className="learning-app" style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'28px 16px',background:'linear-gradient(135deg,#edf4fc,#f8faff)'}}>
      <div style={{width:'min(100%,980px)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))',background:'#fff',borderRadius:22,overflow:'hidden',boxShadow:'0 24px 70px #12345d18',border:'1px solid #e7edf5'}}>
        <section style={{background:'linear-gradient(145deg,#102e55,#1769d2)',color:'#fff',padding:'clamp(28px,5vw,54px)',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:520}}>
          <div><div className="brand" style={{padding:0,marginBottom:55}}><div className="brand-mark">E<span>+</span></div><div><b style={{color:'#fff'}}>EYEPEK</b><small>LEARNING</small></div></div><span className="hero-kicker"><GraduationCap size={14}/> LEARN • TEACH • GROW</span><h1 style={{fontFamily:'Manrope',fontSize:'clamp(30px,4vw,42px)',lineHeight:1.15,margin:'18px 0'}}>A better way to learn together.</h1><p style={{color:'#d4e5fa',fontSize:14,lineHeight:1.8}}>Connect learners, tutors and institutions in one learning workspace.</p></div>
          <div style={{fontSize:12,color:'#c3d8f0'}}>Secure accounts • Role-based access • Online learning</div>
        </section>
        <section style={{padding:'clamp(25px,5vw,52px)'}}>
          <div style={{display:'flex',gap:8,marginBottom:28}}>
            <button onClick={()=>{setMode('login');setError('');setMessage('')}} style={tabStyle(mode==='login')}> <LogIn size={15}/> Sign in</button>
            <button onClick={()=>{setMode('register');setError('');setMessage('')}} style={tabStyle(mode==='register')}><UserPlus size={15}/> Create account</button>
          </div>
          <h2 style={{fontFamily:'Manrope',fontSize:25,color:'#17365d',margin:'0 0 8px'}}>{mode==='login'?'Welcome back':'Create your account'}</h2>
          <p style={{fontSize:13,color:'#71839b',margin:'0 0 24px'}}>{mode==='login'?'Sign in to continue to your workspace.':'Choose your account type to get started.'}</p>
          <form onSubmit={submit} style={{display:'grid',gap:14}}>
            {mode==='register' && <>
              <label style={labelStyle}>Account type</label>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:7}}>
                {roles.map(r=><button type="button" key={r.id} onClick={()=>setRole(r.id)} style={roleStyle(role===r.id)}><r.icon size={17}/><span>{r.label}</span></button>)}
              </div>
              <label style={labelStyle}>Full name</label>
              <input required minLength={2} maxLength={120} value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Enter your full name" style={inputStyle}/>
              {role==='institution' && <><label style={labelStyle}>Institution name</label><input required value={institutionName} onChange={e=>setInstitutionName(e.target.value)} placeholder="Enter institution name" style={inputStyle}/></>}
            </>}
            <label style={labelStyle}>Email address</label>
            <input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle}/>
            <label style={labelStyle}>Password</label>
            <input required type="password" minLength={mode==='register'?8:1} maxLength={128} autoComplete={mode==='login'?'current-password':'new-password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==='register'?'At least 8 characters':'Enter your password'} style={inputStyle}/>
            {error && <div role="alert" style={{color:'#b42318',background:'#fff2f0',padding:11,borderRadius:8,fontSize:12,display:'flex',gap:8}}><AlertCircle size={16}/>{error}</div>}
            {message && <div style={{color:'#176b48',background:'#effaf4',padding:11,borderRadius:8,fontSize:12}}>{message}</div>}
            <button disabled={busy} type="submit" style={{...submitStyle,opacity:busy?.7:1}}>{busy?<Loader2 size={17} className="spin"/>:mode==='login'?<LogIn size={17}/>:<UserPlus size={17}/>} {busy?'Please wait…':mode==='login'?'Sign in':'Create account'}</button>
            {mode==='register' && <p style={{fontSize:11,color:'#8292a8',lineHeight:1.6,margin:0}}>Tutor and institution accounts require administrator approval before access is activated. Student accounts are activated after registration.</p>}
          </form>
        </section>
      </div>
    </div>
  );
}

const tabStyle = active => ({display:'flex',alignItems:'center',justifyContent:'center',gap:7,flex:1,padding:'11px 8px',borderRadius:9,border:active?'1px solid #1769d2':'1px solid #e7edf5',background:active?'#edf5ff':'#fff',color:active?'#1769d2':'#71839b',fontWeight:700,fontSize:12,cursor:'pointer'});
const labelStyle = {fontSize:11,fontWeight:700,color:'#415875',marginBottom:-8};
const inputStyle = {width:'100%',padding:'12px 13px',border:'1px solid #dce5f0',borderRadius:9,outlineColor:'#1769d2',fontSize:13,color:'#17365d',background:'#fff'};
const roleStyle = active => ({display:'grid',justifyItems:'center',gap:7,padding:'12px 4px',borderRadius:9,border:active?'1px solid #1769d2':'1px solid #e7edf5',background:active?'#edf5ff':'#fff',color:active?'#1769d2':'#71839b',fontSize:10,fontWeight:700,cursor:'pointer'});
const submitStyle = {width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:9,padding:13,border:0,borderRadius:9,background:'#1769d2',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',marginTop:5};
