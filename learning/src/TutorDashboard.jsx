import React, { useCallback, useEffect, useState } from 'react';
import { BookOpen, Users, CalendarDays, Video, ClipboardList, ClipboardCheck, LogOut, RefreshCw, Plus, Save, ExternalLink } from 'lucide-react';

const API='/api/learning/tutor/data';
const tabs=[
  ['courses','Courses'],['students','Students'],['bookings','Bookings'],['sessions','Live classes'],
  ['assignments','Assignments'],['attendance','Attendance'],['earnings','Earnings & history']
];
const money=(paise)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format((Number(paise)||0)/100);
const dt=v=>v?new Date(v).toLocaleString('en-IN'):'—';

export default function TutorDashboard({user,token,onLogout}){
  const [tab,setTab]=useState('courses'),[rows,setRows]=useState([]),[earnings,setEarnings]=useState(null);
  const [month,setMonth]=useState(new Date().toISOString().slice(0,7));
  const [loading,setLoading]=useState(false),[saving,setSaving]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
  const [course,setCourse]=useState({title:'',description:'',price:''});
  const [assignment,setAssignment]=useState({title:'',instructions:'',courseId:'',dueAt:''});
  const [attendance,setAttendance]=useState({sessionId:'',studentId:'',status:'present'});
  const [classLinks,setClassLinks]=useState({});

  const request=useCallback(async(resource,method='GET',body)=>{
    const r=await fetch(API+'?resource='+encodeURIComponent(resource),{
      method,headers:{Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},
      ...(body?{body:JSON.stringify(body)}:{})
    });
    const d=await r.json();if(!r.ok)throw new Error(d.error||'Request failed');return d;
  },[token]);

  const load=useCallback(async(target=tab)=>{
    setLoading(true);setError('');
    try{const d=target==='earnings'?await (async()=>{const r=await fetch(API+'?resource=earnings&month='+month,{headers:{Authorization:'Bearer '+token}});const x=await r.json();if(!r.ok)throw new Error(x.error||'Could not load monthly statement');return x;})():await request(target);if(target==='earnings')setEarnings(d);else setRows(d.rows||[]);}
    catch(e){setError(e.message);setRows([]);}
    finally{setLoading(false);}
  },[request,tab,month,token]);
  useEffect(()=>{load(tab);},[tab,load]);

  async function act(message,fn){
    setSaving(true);setError('');setNotice('');
    try{await fn();await load(tab);setNotice(message);}
    catch(e){setError(e.message);}
    finally{setSaving(false);}
  }
  async function addCourse(e){e.preventDefault();await act('Course saved as draft.',async()=>{await request('courses','POST',course);setCourse({title:'',description:'',price:''});});}
  async function addAssignment(e){e.preventDefault();await act('Assignment created.',async()=>{await request('assignments','POST',assignment);setAssignment({title:'',instructions:'',courseId:'',dueAt:''});});}
  async function markAttendance(e){e.preventDefault();await act('Attendance saved.',()=>request('attendance','POST',attendance));}
  async function update(resource,id,body){await act('Changes saved.',()=>request(resource,'PATCH',{id,...body}));}

  return <div className="learning-app shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark">E<span>+</span></div><div><b>EYEPEK</b><small>LEARNING</small></div></div>
      <div className="side-caption">TUTOR WORKSPACE</div><nav>{tabs.map(([id,label])=><button key={id} className={'nav-link '+(tab===id?'selected':'')} onClick={()=>setTab(id)}>{label}</button>)}</nav>
      <div className="sidebar-bottom"><div className="online"><i/> Secure account session</div></div>
    </aside>
    <main className="main"><header className="topbar"><div><div className="crumb">EYEPEK LEARNING <span>/</span> TUTOR</div><h1>{tabs.find(x=>x[0]===tab)?.[1]||'Tutor workspace'}</h1></div><div className="top-actions"><button className="book-btn" onClick={()=>load(tab)} disabled={loading}><RefreshCw size={14}/> Refresh</button><button className="book-btn" onClick={onLogout}><LogOut size={14}/> Sign out</button></div></header>
      <section className="hero"><div className="hero-copy"><span className="hero-kicker">TUTOR WORKSPACE</span><h2>Welcome, {user.fullName}.</h2><p>Manage your teaching activity and learner sessions from one place.</p></div></section>
      {error&&<p role="alert" style={{color:'#b42318',background:'#fff2f0',padding:12,borderRadius:8}}>{error}</p>}
      {notice&&<p role="status" style={{color:'#176b48',background:'#effaf4',padding:12,borderRadius:8}}>{notice}</p>}
      {loading?<p>Loading records…</p>:null}
      {tab==='courses'&&<><form className="module-card" onSubmit={addCourse} style={{display:'grid',gap:10,maxWidth:850,minHeight:0}}><h3>Create course draft</h3><input required minLength="3" maxLength="180" placeholder="Course title" value={course.title} onChange={e=>setCourse({...course,title:e.target.value})}/><textarea placeholder="Course description" value={course.description} onChange={e=>setCourse({...course,description:e.target.value})}/><input type="number" min="0" step="1" placeholder="Price (INR)" value={course.price} onChange={e=>setCourse({...course,price:e.target.value})}/><button className="book-btn" disabled={saving}><Plus size={14}/> Save as draft</button><small>Course publishing is disabled; drafts require administrator review.</small></form><div className="module-grid">{rows.map(r=><article className="module-card" key={r.id}><h3>{r.title}</h3><p>{r.description||'No description'}</p><p>{money(r.pricePaise)} • {r.status}</p></article>)}</div></>}
      {tab==='students'&&<div className="module-grid">{rows.map(r=><article className="module-card" key={r.id}><h3>{r.fullName}</h3><p>{r.email}</p><small>Student ID: {r.id}</small></article>)}</div>}
      {tab==='bookings'&&<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Student</th><th>Course</th><th>Schedule</th><th>Status / Action</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.studentName}</td><td>{r.courseTitle||'Session'}</td><td>{dt(r.scheduledStart)}</td><td>{r.status}{r.status==='confirmed'&&<div><button className="admin-link-btn" disabled={saving} onClick={()=>update('bookings',r.id,{status:'completed'})}>Mark complete</button><button className="admin-link-btn" disabled={saving} onClick={()=>update('bookings',r.id,{status:'cancelled'})}>Cancel</button></div>}</td></tr>)}</tbody></table></div>}
      {tab==='sessions'&&<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Student</th><th>Schedule</th><th>Classroom URL</th><th>Action</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.studentName}</td><td>{dt(r.scheduledStart)}<small>{r.status}</small></td><td><input value={classLinks[r.id]??r.classroomUrl??''} onChange={e=>setClassLinks(p=>({...p,[r.id]:e.target.value}))} placeholder="https://..."/></td><td><button className="admin-btn primary" disabled={saving} onClick={()=>update('sessions',r.id,{classroomUrl:classLinks[r.id]??r.classroomUrl??''})}><Save size={13}/> Save link</button>{r.status==='scheduled'&&<button className="admin-link-btn" onClick={()=>update('sessions',r.id,{status:'live'})}>Start</button>}{r.status==='live'&&<button className="admin-link-btn" onClick={()=>update('sessions',r.id,{status:'finished'})}>Finish</button>}</td></tr>)}</tbody></table></div>}
      {tab==='assignments'&&<><form className="module-card" onSubmit={addAssignment} style={{display:'grid',gap:10,maxWidth:850,minHeight:0}}><h3>Create assignment</h3><input required placeholder="Assignment title" value={assignment.title} onChange={e=>setAssignment({...assignment,title:e.target.value})}/><textarea placeholder="Instructions" value={assignment.instructions} onChange={e=>setAssignment({...assignment,instructions:e.target.value})}/><input type="datetime-local" value={assignment.dueAt} onChange={e=>setAssignment({...assignment,dueAt:e.target.value||null})}/><button className="book-btn" disabled={saving}><Plus size={14}/> Create assignment</button></form><div className="module-grid">{rows.map(r=><article className="module-card" key={r.id}><h3>{r.title}</h3><p>{r.instructions}</p><small>Due: {dt(r.dueAt)} • Submissions: {r.submissionsCount}</small></article>)}</div></>}
      {tab==='attendance'&&<><form className="module-card" onSubmit={markAttendance} style={{display:'grid',gap:10,maxWidth:650,minHeight:0}}><h3>Record attendance</h3><input required type="number" min="1" placeholder="Session ID" value={attendance.sessionId} onChange={e=>setAttendance({...attendance,sessionId:e.target.value})}/><input required type="number" min="1" placeholder="Student ID" value={attendance.studentId} onChange={e=>setAttendance({...attendance,studentId:e.target.value})}/><select value={attendance.status} onChange={e=>setAttendance({...attendance,status:e.target.value})}><option value="present">Present</option><option value="late">Late</option><option value="absent">Absent</option></select><button className="book-btn" disabled={saving}><Save size={14}/> Save attendance</button></form><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Student</th><th>Session</th><th>Attendance</th><th>Joined</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.studentName}</td><td>#{r.sessionId}</td><td>{r.attendanceStatus}</td><td>{dt(r.joinedAt)}</td></tr>)}</tbody></table></div></>}
      {tab==='earnings'&&<><article className="module-card" style={{maxWidth:950}}><h3>Monthly session & assignment statement</h3><label>Choose month <input type="month" value={month} onChange={e=>setMonth(e.target.value)}/></label><p>Session start/end times and duration are recorded. Compensation is added only after EYEPEK Admin verifies the session or approves assignment work.</p>{earnings?.summary&&<div className="module-grid"><article className="module-card"><h3>{money(earnings.summary.totalPaise)}</h3><p>Recorded earning value</p></article><article className="module-card"><h3>{money(earnings.summary.approvedPaise)}</h3><p>Admin approved</p></article><article className="module-card"><h3>{money(earnings.summary.paidPaise)}</h3><p>Paid by EYEPEK</p></article><article className="module-card"><h3>{earnings.summary.sessionCount}</h3><p>Sessions • {earnings.summary.totalSessionMinutes} minutes</p></article><article className="module-card"><h3>{earnings.summary.assignmentCount}</h3><p>Approved/recorded assignment entries</p></article></div>}</article><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Session start</th><th>Session end</th><th>Duration</th><th>Student</th><th>Status</th></tr></thead><tbody>{(earnings?.sessions||[]).map(s=><tr key={s.id}><td>{dt(s.startedAt)}</td><td>{dt(s.endedAt)}</td><td>{s.durationMinutes??'—'} min</td><td>{s.studentName}</td><td>{s.status}</td></tr>)}</tbody></table></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Type</th><th>Record ID</th><th>Amount</th><th>Status</th><th>Admin note</th></tr></thead><tbody>{(earnings?.ledger||[]).map(x=><tr key={x.id}><td>{x.earningType}</td><td>#{x.sourceId}</td><td>{money(x.amountPaise)}</td><td>{x.status}</td><td>{x.adminNote||'—'}</td></tr>)}</tbody></table></div><p>All rates and payout dates are controlled by EYEPEK Admin. Tutors cannot collect student payments or request withdrawals.</p></>}
      <footer><span>© {new Date().getFullYear()} EYEPEK Learning.</span><span>Tutor workspace</span></footer>
    </main>
  </div>;
}
