import React, { useCallback, useEffect, useState } from 'react';
import {
  LayoutDashboard, Users, UserCheck, BookOpen, GraduationCap, CalendarDays,
  Video, ClipboardList, FileText, CreditCard, Settings, LogOut, RefreshCw,
  Check, X, Search, Plus, ShieldCheck, AlertTriangle, Save, ExternalLink,
  Building2, Activity, Menu, ChevronRight, Bell, Headphones, Tag, Star, ClipboardCheck, Award, Wallet, ScrollText, BarChart3
} from 'lucide-react';

const ROOT = '/api/learning/admin';
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { id: 'approvals', label: 'Approval requests', icon: UserCheck, group: 'Workspace' },
  { id: 'users', label: 'User management', icon: Users, group: 'Management' },
  { id: 'subjects', label: 'Subjects', icon: BookOpen, group: 'Management' },
  { id: 'courses', label: 'Courses', icon: GraduationCap, group: 'Management' },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays, group: 'Operations' },
  { id: 'sessions', label: 'Live sessions', icon: Video, group: 'Operations' },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList, group: 'Academic' },
  { id: 'submissions', label: 'Submissions', icon: FileText, group: 'Academic' },
  { id: 'payments', label: 'Payments', icon: CreditCard, group: 'Finance' },
  { id: 'payouts', label: 'Tutor payouts', icon: Wallet, group: 'Finance' },
  { id: 'coupons', label: 'Coupons', icon: Tag, group: 'Finance' },
  { id: 'analytics', label: 'Advanced analytics', icon: BarChart3, group: 'Workspace' },
  { id: 'support', label: 'Support tickets', icon: Headphones, group: 'Operations' },
  { id: 'announcements', label: 'Announcements', icon: Bell, group: 'Operations' },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck, group: 'Academic' },
  { id: 'certificates', label: 'Certificates', icon: Award, group: 'Academic' },
  { id: 'reviews', label: 'Reviews', icon: Star, group: 'Management' },
  { id: 'audit', label: 'Activity logs', icon: ScrollText, group: 'System' },
  { id: 'settings', label: 'Platform settings', icon: Settings, group: 'System' }
];
const defaults = {
  platform_name: 'EYEPEK Learning', support_email: 'info.eyepek@gmail.com',
  default_currency: 'INR', platform_fee_percent: '10', maintenance_mode: 'false',
  student_registration_enabled: 'true', tutor_registration_enabled: 'true',
  institution_registration_enabled: 'true'
};
const titleFor = id => navItems.find(x => x.id === id)?.label || 'Admin';
const money = (paise, currency = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format((Number(paise) || 0) / 100);
const date = value => value ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
const statusClass = value => 'admin-status ' + String(value || 'unknown').toLowerCase().replace(/[^a-z0-9_-]/g, '-');

export default function AdminDashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [overview, setOverview] = useState(null);
  const [rows, setRows] = useState([]);
  const [settings, setSettings] = useState(defaults);
  const [newSubject, setNewSubject] = useState('');
  const [announcement,setAnnouncement]=useState({title:'',message:'',audience:'all',status:'draft'});
  const [coupon,setCoupon]=useState({code:'',discountType:'percent',discountValue:'10',maxUses:''});
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sessionLinks, setSessionLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const api = useCallback(async (resource, method = 'GET', body) => {
    const response = await fetch(ROOT + '/data?resource=' + encodeURIComponent(resource), {
      method,
      headers: { Authorization: 'Bearer ' + token, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Admin request failed');
    return data;
  }, [token]);

  const loadOverview = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await api('overview');
      setOverview(data.stats);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [api]);

  const loadResource = useCallback(async (tab = activeTab) => {
    setLoading(true); setError('');
    try {
      if (tab === 'approvals') {
        const response = await fetch(ROOT + '/users', { headers: { Authorization: 'Bearer ' + token } });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load approval requests');
        setRows(data.users || []);
      } else if (tab === 'settings') {
        const data = await api('settings');
        setSettings({ ...defaults, ...(data.settings || {}) });
      } else {
        const data = await api(tab);
        setRows(data.rows || []);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [activeTab, api, token]);

  useEffect(() => {
    if (activeTab === 'dashboard') loadOverview();
    else loadResource(activeTab);
  }, [activeTab, loadOverview, loadResource]);

  async function refresh() {
    setNotice('');
    if (activeTab === 'dashboard') await loadOverview();
    else await loadResource(activeTab);
  }

  async function act(label, task) {
    setSaving(true); setError(''); setNotice('');
    try { await task(); setNotice(label); await refresh(); }
    catch (err) { setError(err.message || 'Action could not be completed'); }
    finally { setSaving(false); }
  }

  const filtered = rows.filter(row => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()) && (activeTab !== 'payments' || paymentFilter === 'all' || row.status === paymentFilter));
  const paymentTotals = rows.reduce((acc, row) => { acc.count += 1; acc[row.status] = (acc[row.status] || 0) + 1; if (row.status === 'paid') acc.paidAmount += Number(row.amountPaise) || 0; return acc; }, { count: 0, paid: 0, created: 0, failed: 0, refunded: 0, paidAmount: 0 });
  const sessionTotals = rows.reduce((acc, row) => { acc[row.status] = (acc[row.status] || 0) + 1; acc.total += 1; return acc; }, { total: 0, live: 0, scheduled: 0, finished: 0, cancelled: 0 });

  async function approveUser(userId, action) {
    await act(action === 'approve' ? 'Account approved successfully.' : 'Account rejected and suspended.', async () => {
      const response = await fetch(ROOT + '/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ userId, action })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not review account');
    });
  }

  async function addSubject(e) {
    e.preventDefault();
    const name = newSubject.trim();
    if (!name) return;
    await act('Subject added.', async () => { await api('subjects', 'POST', { name }); setNewSubject(''); });
  }

  async function changeStatus(resource, id, status) {
    await act('Changes saved.', () => api(resource, 'PATCH', { id, status }));
  }

  async function saveSessionLink(id) {
    await act('Classroom link saved.', () => api('sessions', 'PATCH', { id, classroomUrl: sessionLinks[id] || '' }));
  }

  async function saveSettings(e) {
    e.preventDefault();
    await act('Platform settings saved.', () => api('settings', 'PUT', { settings }));
  }

  function renderTable() {
    if (loading) return <div className="admin-empty"><RefreshCw className="admin-spin" size={20}/> Loading records…</div>;
    if (error && !rows.length) return <div className="admin-empty admin-error"><AlertTriangle size={20}/>{error}</div>;
    if (!filtered.length) return <div className="admin-empty">No records found.</div>;

    if (activeTab === 'approvals') return <div className="admin-records">{filtered.map(row => <article className="admin-record" key={row.id}>
      <div className="admin-record-main"><div className="admin-avatar">{String(row.fullName || 'U').slice(0,1).toUpperCase()}</div><div><span className="admin-role">{row.role}</span><h3>{row.fullName}</h3><p>{row.email}</p><p>{row.role === 'tutor' ? (row.headline || 'Tutor profile awaiting review') : (row.institutionName || 'Institution profile awaiting review')}</p><small>Registered {date(row.createdAt)}</small></div></div>
      <div className="admin-actions"><button className="admin-btn primary" disabled={saving} onClick={() => approveUser(row.id, 'approve')}><Check size={14}/> Approve</button><button className="admin-btn danger" disabled={saving} onClick={() => approveUser(row.id, 'reject')}><X size={14}/> Reject</button></div>
    </article>)}</div>;

    if (activeTab === 'users') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Action</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><b>{row.fullName}</b><small>{row.email}</small></td><td>{row.role}</td><td><span className={statusClass(row.status)}>{row.status}</span></td><td>{date(row.createdAt)}</td><td>{row.role === 'admin' ? <span className="admin-muted">Protected</span> : <button className="admin-btn subtle" disabled={saving} onClick={() => act('User status updated.', () => api('users','PATCH',{id:row.id,status:row.status === 'active' ? 'suspended' : 'active'}))}>{row.status === 'active' ? 'Suspend' : 'Activate'}</button>}</td></tr>)}</tbody></table></div>;

    if (activeTab === 'subjects') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Subject</th><th>Slug</th><th>Status</th><th>Action</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><b>{row.name}</b></td><td>{row.slug}</td><td><span className={statusClass(row.isActive ? 'active':'inactive')}>{row.isActive ? 'Active':'Inactive'}</span></td><td><button className="admin-btn subtle" disabled={saving} onClick={() => act('Subject updated.', () => api('subjects','PATCH',{id:row.id,isActive:!row.isActive}))}>{row.isActive ? 'Deactivate' : 'Activate'}</button></td></tr>)}</tbody></table></div>;

    if (activeTab === 'courses') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Course</th><th>Tutor</th><th>Subject</th><th>Price</th><th>Status</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><b>{row.title}</b><small>{row.description || '—'}</small></td><td>{row.tutorName}</td><td>{row.subjectName || '—'}</td><td>{money(row.pricePaise)}</td><td><select className="admin-select" value={row.status} disabled={saving} onChange={e => changeStatus('courses',row.id,e.target.value)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></td></tr>)}</tbody></table></div>;

    if (activeTab === 'bookings') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Booking</th><th>Student / Tutor</th><th>Schedule</th><th>Amount</th><th>Status / Action</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td>#{row.id}<small>{row.courseTitle || 'Session booking'}</small></td><td>{row.studentName}<small>with {row.tutorName}</small></td><td>{date(row.scheduledStart)}</td><td>{money(row.amountPaise,row.currency || 'INR')}</td><td><span className={statusClass(row.status)}>{row.status}</span><div className="admin-inline-actions">{!['cancelled','completed'].includes(row.status) && <><button className="admin-link-btn" disabled={saving} onClick={() => changeStatus('bookings',row.id,'cancelled')}>Cancel</button>{row.status === 'confirmed' && <button className="admin-link-btn" disabled={saving} onClick={() => changeStatus('bookings',row.id,'completed')}>Complete</button>}</>}</div></td></tr>)}</tbody></table></div>;

    if (activeTab === 'sessions') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Session</th><th>Participants</th><th>Schedule</th><th>Classroom URL</th><th>Status / Action</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td>#{row.id}<small>Booking #{row.bookingId}</small></td><td>{row.studentName}<small>with {row.tutorName}</small></td><td><b>{date(row.scheduledStart)}</b><small>Started: {date(row.startedAt)}</small><small>Ended: {date(row.endedAt)}</small></td><td><div className="admin-link-edit"><input value={sessionLinks[row.id] ?? row.classroomUrl ?? ''} onChange={e=>setSessionLinks(p=>({...p,[row.id]:e.target.value}))} placeholder="https://classroom-link…"/><button className="admin-icon-btn" title="Save classroom link" onClick={()=>saveSessionLink(row.id)} disabled={saving}><Save size={14}/></button>{row.classroomUrl && <a href={row.classroomUrl} target="_blank" rel="noreferrer" aria-label="Open classroom"><ExternalLink size={14}/></a>}</div></td><td><span className={statusClass(row.status)}>{row.status}</span><div className="admin-inline-actions">{row.status === 'scheduled' && <button className="admin-link-btn" disabled={saving} onClick={()=>changeStatus('sessions',row.id,'live')}>Start session</button>}{row.status === 'live' && <button className="admin-link-btn" disabled={saving} onClick={()=>changeStatus('sessions',row.id,'finished')}>Finish session</button>}{!['finished','cancelled'].includes(row.status) && <button className="admin-link-btn" disabled={saving} onClick={()=>changeStatus('sessions',row.id,'cancelled')}>Cancel</button>}{row.classroomUrl && <a className="admin-link-btn" href={row.classroomUrl} target="_blank" rel="noreferrer">Join class</a>}</div></td></tr>)}</tbody></table></div>;

    if (activeTab === 'assignments') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Assignment</th><th>Tutor</th><th>Course</th><th>Due date</th><th>Submissions</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td><b>{row.title}</b><small>{row.instructions || '—'}</small></td><td>{row.tutorName}</td><td>{row.courseTitle || '—'}</td><td>{date(row.dueAt)}</td><td>{row.submissionsCount}</td></tr>)}</tbody></table></div>;

    if (activeTab === 'submissions') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Student</th><th>Assignment</th><th>Submitted</th><th>Score</th><th>Feedback</th><th>File</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td>{row.studentName}</td><td>{row.assignmentTitle}</td><td>{date(row.submittedAt)}</td><td>{row.score ?? 'Not graded'}</td><td>{row.feedback || '—'}</td><td>{row.fileUrl ? <a href={row.fileUrl} target="_blank" rel="noreferrer">Open <ExternalLink size={12}/></a> : '—'}</td></tr>)}</tbody></table></div>;

    if (activeTab === 'payments') return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Payment</th><th>Student</th><th>Provider</th><th>Amount</th><th>Status</th><th>Created</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}><td>#{row.id}<small>Booking #{row.bookingId}</small><small>Order: {row.orderId || '—'}</small><small>Payment: {row.paymentId || 'Pending gateway reference'}</small></td><td>{row.studentName}</td><td>{row.provider}</td><td><b>{money(row.amountPaise,row.currency || 'INR')}</b></td><td><span className={statusClass(row.status)}>{row.status}</span></td><td>{date(row.createdAt)}</td></tr>)}</tbody></table><p className="admin-footnote">Payment records are view-only here. Capture and refunds are processed only after verification in the payment gateway.</p></div>;
    const genericColumns = {
      support:[['Ticket','id'],['User','userName'],['Email','email'],['Subject','subject'],['Category','category'],['Status','status'],['Created','createdAt']],
      announcements:[['Title','title'],['Audience','audience'],['Status','status'],['Published','publishedAt'],['Created by','createdBy']],
      coupons:[['Code','code'],['Discount','discountValue'],['Type','discountType'],['Uses','usedCount'],['Max uses','maxUses'],['Active','isActive']],
      reviews:[['Student','studentName'],['Tutor','tutorName'],['Rating','rating'],['Review','reviewText'],['Status','status']],
      attendance:[['Session','sessionId'],['Participant','userName'],['Role','role'],['Joined','joinedAt'],['Left','leftAt'],['Attendance','attendanceStatus']],
      certificates:[['Certificate','certificateCode'],['Student','studentName'],['Course','courseTitle'],['Issued','issuedAt'],['Status','status']],
      payouts:[['Tutor','tutorName'],['Email','email'],['Amount','amountPaise'],['Currency','currency'],['Status','status'],['Requested','createdAt']],
      audit:[['Admin','adminName'],['Action','action'],['Module','resource'],['Record ID','resourceId'],['IP','ipAddress'],['Time','createdAt']]
    };
    if(genericColumns[activeTab]) return <div className="admin-table-wrap"><table className="admin-table"><thead><tr>{genericColumns[activeTab].map(([label])=><th key={label}>{label}</th>)}<th>Action</th></tr></thead><tbody>{filtered.map(row=><tr key={row.id}>{genericColumns[activeTab].map(([label,key])=><td key={key}>{key==='amountPaise'?money(row[key],row.currency||'INR'):key==='isActive'?(row[key]?'Yes':'No'):key.toLowerCase().includes('at')?date(row[key]):String(row[key]??'—')}</td>)}<td>
      {activeTab==='support' && <select className="admin-select" value={row.status} disabled={saving} onChange={e=>act('Ticket updated.',()=>api('support','PATCH',{id:row.id,status:e.target.value,adminReply:row.adminReply||''}))}><option value="open">Open</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="closed">Closed</option></select>}
      {activeTab==='announcements' && <select className="admin-select" value={row.status} disabled={saving} onChange={e=>changeStatus('announcements',row.id,e.target.value)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select>}
      {activeTab==='coupons' && <button className="admin-btn subtle" disabled={saving} onClick={()=>act('Coupon updated.',()=>api('coupons','PATCH',{id:row.id,isActive:!row.isActive}))}>{row.isActive?'Disable':'Enable'}</button>}
      {activeTab==='reviews' && <select className="admin-select" value={row.status} disabled={saving} onChange={e=>changeStatus('reviews',row.id,e.target.value)}><option value="pending">Pending</option><option value="published">Published</option><option value="hidden">Hidden</option></select>}
      {activeTab==='certificates' && row.status==='issued' && <button className="admin-btn danger" disabled={saving} onClick={()=>act('Certificate revoked.',()=>api('certificates','PATCH',{id:row.id,status:'revoked'}))}>Revoke</button>}
      {activeTab==='payouts' && row.status==='requested' && <><button className="admin-btn subtle" disabled={saving} onClick={()=>changeStatus('payouts',row.id,'approved')}>Approve</button> <button className="admin-btn danger" disabled={saving} onClick={()=>changeStatus('payouts',row.id,'rejected')}>Reject</button></>}
    </td></tr>)}</tbody></table></div>;
    return null;
  }

  return <div className="learning-app admin-app">
    {mobileMenu && <button className="admin-scrim" onClick={()=>setMobileMenu(false)} aria-label="Close navigation"/>}
    <aside className={'admin-sidebar '+(mobileMenu?'open':'')}>
      <div className="admin-brand"><div className="admin-brand-mark">E<span>+</span></div><div><b>EYEPEK</b><small>LEARNING ADMIN</small></div></div>
      <div className="admin-side-heading">ADMIN WORKSPACE</div>
      {['Workspace','Management','Operations','Academic','Finance','System'].map(group => <section className="admin-nav-group" key={group}><small>{group}</small>{navItems.filter(item=>item.group===group).map(item=><button key={item.id} className={'admin-nav-link '+(activeTab===item.id?'active':'')} onClick={()=>{setActiveTab(item.id);setMobileMenu(false);setSearch('');setNotice('');setError('');}}><item.icon size={17}/>{item.label}{activeTab===item.id&&<ChevronRight size={14} className="admin-nav-arrow"/>}</button>)}</section>)}
      <div className="admin-sidebar-bottom"><div className="admin-secure"><ShieldCheck size={16}/><span><b>Secure admin access</b><small>Protected workspace</small></span></div><button className="admin-logout" onClick={onLogout}><LogOut size={16}/> Sign out</button></div>
    </aside>
    <main className="admin-main">
      <header className="admin-topbar"><div className="admin-head-left"><button className="admin-mobile-menu" onClick={()=>setMobileMenu(true)}><Menu size={20}/></button><div><div className="admin-crumb">EYEPEK LEARNING / ADMIN</div><h1>{titleFor(activeTab)}</h1></div></div><div className="admin-top-right"><span className="admin-live"><i/> System online</span><div className="admin-user-chip"><div className="admin-avatar small">A</div><span><b>{user.fullName || 'Administrator'}</b><small>{user.email}</small></span></div><button className="admin-icon-btn" onClick={refresh} disabled={loading} title="Refresh"><RefreshCw size={16}/></button></div></header>
      {error && <div className="admin-alert error"><AlertTriangle size={16}/>{error}</div>}
      {notice && <div className="admin-alert success"><Check size={16}/>{notice}</div>}
      {activeTab === 'dashboard' ? <div className="admin-content">
        <section className="admin-welcome"><div><span>ADMIN CONTROL CENTER</span><h2>Welcome back, {user.fullName || 'Administrator'}.</h2><p>Manage the EYEPEK Learning platform from one secure workspace.</p></div><div className="admin-welcome-icon"><ShieldCheck size={35}/></div></section>
        <div className="admin-section-head"><div><span>PLATFORM OVERVIEW</span><h2>Live statistics</h2></div><button className="admin-btn subtle" onClick={refresh} disabled={loading}><RefreshCw size={14}/> Refresh data</button></div>
        {loading && !overview ? <div className="admin-empty">Loading dashboard…</div> : <div className="admin-stat-grid">
          <Stat icon={Users} label="Total users" value={overview?.users?.total ?? '—'} detail={(overview?.users?.active ?? 0)+' active'} tone="blue"/>
          <Stat icon={UserCheck} label="Pending tutors" value={overview?.tutors?.pending ?? '—'} detail="Awaiting review" tone="orange" onClick={()=>setActiveTab('approvals')}/>
          <Stat icon={Building2} label="Institutions" value={overview?.institutions?.total ?? '—'} detail={(overview?.institutions?.pending ?? 0)+' pending'} tone="violet"/>
          <Stat icon={GraduationCap} label="Published courses" value={overview?.courses?.published ?? '—'} detail={(overview?.courses?.total ?? 0)+' total'} tone="green"/>
          <Stat icon={CalendarDays} label="Bookings" value={overview?.bookings?.total ?? '—'} detail={(overview?.bookings?.confirmed ?? 0)+' confirmed'} tone="blue"/>
          <Stat icon={Video} label="Live sessions" value={overview?.sessions?.live ?? '—'} detail={(overview?.sessions?.total ?? 0)+' total'} tone="orange"/>
          <Stat icon={ClipboardList} label="Assignments" value={overview?.assignments?.total ?? '—'} detail="Created by tutors" tone="violet"/>
          <Stat icon={CreditCard} label="Paid payments" value={overview?.payments?.paid_count ?? '—'} detail={money(overview?.payments?.paid_amount)} tone="green"/>
        </div>}
        <div className="admin-section-head"><div><span>QUICK ACCESS</span><h2>Administration modules</h2></div></div>
        <div className="admin-quick-grid">{navItems.filter(item=>!['dashboard'].includes(item.id)).map(item=><button key={item.id} className="admin-quick-card" onClick={()=>setActiveTab(item.id)}><span><item.icon size={19}/></span><b>{item.label}</b><ChevronRight size={15}/></button>)}</div>
        <div className="admin-notice-card"><Activity size={18}/><div><b>Admin safety notice</b><p>Admin accounts are protected from user-management actions. Payment records are read-only; payment capture and refunds must be handled through the payment provider.</p></div></div>
      </div> : <div className="admin-content">
        <div className="admin-toolbar"><div><span>{activeTab.toUpperCase()} MANAGEMENT</span><p>Manage and review EYEPEK Learning records.</p></div><div className="admin-toolbar-actions">{activeTab === 'payments' && <select className="admin-select" value={paymentFilter} onChange={e=>setPaymentFilter(e.target.value)}><option value="all">All payment statuses</option><option value="paid">Paid</option><option value="created">Created / Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select>}<div className="admin-search"><Search size={15}/><input placeholder="Search records…" value={search} onChange={e=>setSearch(e.target.value)}/></div></div></div>
        {activeTab === 'payments' && <div className="admin-module-summary"><div><span>Total payments</span><b>{paymentTotals.count}</b></div><div><span>Successful</span><b>{paymentTotals.paid}</b></div><div><span>Collected amount</span><b>{money(paymentTotals.paidAmount)}</b></div><div><span>Failed / Refunded</span><b>{paymentTotals.failed + paymentTotals.refunded}</b></div></div>}
        {activeTab === 'sessions' && <div className="admin-module-summary"><div><span>Total sessions</span><b>{sessionTotals.total}</b></div><div><span>Live now</span><b>{sessionTotals.live}</b></div><div><span>Scheduled</span><b>{sessionTotals.scheduled}</b></div><div><span>Finished</span><b>{sessionTotals.finished}</b></div></div>}
        {activeTab === 'announcements' && <form className="admin-add-form" onSubmit={async e=>{e.preventDefault();await act('Announcement created.',async()=>{await api('announcements','POST',announcement);setAnnouncement({title:'',message:'',audience:'all',status:'draft'});});}}><input placeholder="Announcement title" value={announcement.title} onChange={e=>setAnnouncement(p=>({...p,title:e.target.value}))}/><textarea placeholder="Write announcement..." value={announcement.message} onChange={e=>setAnnouncement(p=>({...p,message:e.target.value}))}/><select className="admin-select" value={announcement.audience} onChange={e=>setAnnouncement(p=>({...p,audience:e.target.value}))}><option value="all">All users</option><option value="student">Students</option><option value="tutor">Tutors</option><option value="institution">Institutions</option></select><select className="admin-select" value={announcement.status} onChange={e=>setAnnouncement(p=>({...p,status:e.target.value}))}><option value="draft">Save draft</option><option value="published">Publish now</option></select><button className="admin-btn primary" disabled={saving||announcement.title.trim().length<3||announcement.message.trim().length<3}><Plus size={15}/> Create announcement</button></form>}
        {activeTab === 'coupons' && <form className="admin-add-form" onSubmit={async e=>{e.preventDefault();await act('Coupon created.',async()=>{await api('coupons','POST',coupon);setCoupon({code:'',discountType:'percent',discountValue:'10',maxUses:''});});}}><input placeholder="Coupon code" value={coupon.code} onChange={e=>setCoupon(p=>({...p,code:e.target.value.toUpperCase()}))}/><select className="admin-select" value={coupon.discountType} onChange={e=>setCoupon(p=>({...p,discountType:e.target.value}))}><option value="percent">Percentage</option><option value="fixed">Fixed amount (paise)</option></select><input type="number" min="1" placeholder="Discount value" value={coupon.discountValue} onChange={e=>setCoupon(p=>({...p,discountValue:e.target.value}))}/><input type="number" min="1" placeholder="Max uses (optional)" value={coupon.maxUses} onChange={e=>setCoupon(p=>({...p,maxUses:e.target.value}))}/><button className="admin-btn primary" disabled={saving||!coupon.code.trim()}><Plus size={15}/> Create coupon</button></form>}
        {activeTab === 'subjects' && <form className="admin-add-form" onSubmit={addSubject}><input value={newSubject} onChange={e=>setNewSubject(e.target.value)} maxLength={120} placeholder="Enter a new subject name"/><button className="admin-btn primary" disabled={saving || newSubject.trim().length<2}><Plus size={15}/> Add subject</button></form>}
        {activeTab === 'settings' ? <form className="admin-settings-grid" onSubmit={saveSettings}>
          <div className="admin-settings-card"><span>GENERAL</span><h3>Platform identity</h3><label>Platform name<input value={settings.platform_name} onChange={e=>setSettings(p=>({...p,platform_name:e.target.value}))}/></label><label>Support email<input type="email" value={settings.support_email} onChange={e=>setSettings(p=>({...p,support_email:e.target.value}))}/></label><label>Default currency<select value={settings.default_currency} onChange={e=>setSettings(p=>({...p,default_currency:e.target.value}))}><option value="INR">INR — Indian Rupee</option><option value="USD">USD — US Dollar</option><option value="EUR">EUR — Euro</option><option value="AED">AED — UAE Dirham</option></select></label></div>
          <div className="admin-settings-card"><span>BUSINESS</span><h3>Platform fees</h3><label>Platform fee (%)<input type="number" min="0" max="50" step="0.5" value={settings.platform_fee_percent} onChange={e=>setSettings(p=>({...p,platform_fee_percent:e.target.value}))}/><small>Fee configuration for future checkout integration.</small></label></div>
          <div className="admin-settings-card"><span>ACCESS CONTROL</span><h3>Registration & maintenance</h3>{[['maintenance_mode','Maintenance mode'],['student_registration_enabled','Allow student registration'],['tutor_registration_enabled','Allow tutor registration'],['institution_registration_enabled','Allow institution registration']].map(([key,label])=><label className="admin-toggle" key={key}><span>{label}</span><input type="checkbox" checked={settings[key]==='true'} onChange={e=>setSettings(p=>({...p,[key]:String(e.target.checked)}))}/></label>)}</div>
          <div className="admin-settings-actions"><p>Settings are stored in the platform database. Registration switches and fees are saved as configuration; connecting them to public flows/checkout is a separate integration step.</p><button className="admin-btn primary" disabled={saving}><Save size={15}/> {saving?'Saving…':'Save settings'}</button></div>
        </form> : renderTable()}
        {activeTab === 'payments' && <div className="admin-warning"><AlertTriangle size={16}/> Payment capture and refunds are not enabled from this dashboard; verify and process them in the Razorpay account.</div>}
      </div>}
      <footer className="admin-footer"><span>© {new Date().getFullYear()} EYEPEK Learning</span><span>Administrator workspace • Authorized access only</span></footer>
    </main>
  </div>;
}

function Stat({ icon: Icon, label, value, detail, tone, onClick }) {
  return <button className={'admin-stat-card '+tone} onClick={onClick} disabled={!onClick}><span className="admin-stat-icon"><Icon size={19}/></span><span className="admin-stat-label">{label}</span><b>{value}</b><small>{detail}</small></button>;
}
