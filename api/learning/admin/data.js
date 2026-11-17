import { getDb } from '../../_lib/db.js';
import { requireUser } from '../../_lib/auth.js';

const json = (res, status, body) => res.status(status).json(body);
const allowedResources = new Set(['overview','users','subjects','courses','bookings','sessions','assignments','submissions','payments','settings']);

async function requireAdmin(req, res) {
  const auth = requireUser(req, res);
  if (!auth) return null;
  const [rows] = await getDb().execute(
    "SELECT id, full_name, email FROM learning_users WHERE id=? AND role='admin' AND status='active' LIMIT 1",
    [auth.id]
  );
  if (!rows.length) { json(res, 403, { error: 'Administrator access required' }); return null; }
  return { ...auth, user: rows[0] };
}

export default async function handler(req, res) {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    const db = getDb();
    const resource = String(req.query?.resource || 'overview');

    if (!allowedResources.has(resource)) return json(res, 400, { error: 'Unknown admin resource' });

    if (req.method === 'GET') {
      if (resource === 'overview') {
        const queries = [
          "SELECT COUNT(*) AS total, SUM(status='active') AS active, SUM(status='pending') AS pending, SUM(status='suspended') AS suspended FROM learning_users WHERE role<>'admin'",
          "SELECT COUNT(*) AS total, SUM(status='pending') AS pending FROM learning_users WHERE role='tutor'",
          "SELECT COUNT(*) AS total, SUM(status='pending') AS pending FROM learning_users WHERE role='institution'",
          "SELECT COUNT(*) AS total, SUM(status='published') AS published FROM learning_courses",
          "SELECT COUNT(*) AS total, SUM(status='confirmed') AS confirmed, SUM(status='completed') AS completed FROM learning_bookings",
          "SELECT COUNT(*) AS total, SUM(status='live') AS live FROM learning_sessions",
          "SELECT COUNT(*) AS total FROM learning_assignments",
          "SELECT COUNT(*) AS total, SUM(status='paid') AS paid_count, COALESCE(SUM(CASE WHEN status='paid' THEN amount_paise ELSE 0 END),0) AS paid_amount FROM learning_payments"
        ];
        const results = await Promise.all(queries.map(sql => db.execute(sql)));
        const val = i => results[i][0][0] || {};
        return json(res, 200, {
          ok: true,
          admin: { id: admin.id, fullName: admin.user.full_name, email: admin.user.email },
          stats: {
            users: val(0), tutors: val(1), institutions: val(2), courses: val(3),
            bookings: val(4), sessions: val(5), assignments: val(6), payments: val(7)
          }
        });
      }

      if (resource === 'users') {
        const [rows] = await db.execute(
          `SELECT u.id,u.full_name AS fullName,u.email,u.role,u.status,u.created_at AS createdAt,
                  tp.headline, tp.approval_status AS approvalStatus, ip.institution_name AS institutionName
           FROM learning_users u
           LEFT JOIN learning_tutor_profiles tp ON tp.user_id=u.id
           LEFT JOIN learning_institution_profiles ip ON ip.user_id=u.id
           ORDER BY u.created_at DESC LIMIT 500`
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'subjects') {
        const [rows] = await db.execute('SELECT id,name,slug,is_active AS isActive FROM learning_subjects ORDER BY name');
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'courses') {
        const [rows] = await db.execute(
          `SELECT c.id,c.title,c.description,c.price_paise AS pricePaise,c.status,c.created_at AS createdAt,
                  u.full_name AS tutorName,s.name AS subjectName
           FROM learning_courses c JOIN learning_users u ON u.id=c.tutor_id
           LEFT JOIN learning_subjects s ON s.id=c.subject_id
           ORDER BY c.created_at DESC LIMIT 500`
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'bookings') {
        const [rows] = await db.execute(
          `SELECT b.id,b.scheduled_start AS scheduledStart,b.scheduled_end AS scheduledEnd,
                  b.amount_paise AS amountPaise,b.currency,b.status,b.created_at AS createdAt,
                  st.full_name AS studentName,tu.full_name AS tutorName,c.title AS courseTitle
           FROM learning_bookings b
           JOIN learning_users st ON st.id=b.student_id
           JOIN learning_users tu ON tu.id=b.tutor_id
           LEFT JOIN learning_courses c ON c.id=b.course_id
           ORDER BY b.created_at DESC LIMIT 500`
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'sessions') {
        const [rows] = await db.execute(
          `SELECT s.id,s.booking_id AS bookingId,s.classroom_url AS classroomUrl,s.started_at AS startedAt,
                  s.ended_at AS endedAt,s.status,s.created_at AS createdAt,
                  b.scheduled_start AS scheduledStart,st.full_name AS studentName,tu.full_name AS tutorName
           FROM learning_sessions s JOIN learning_bookings b ON b.id=s.booking_id
           JOIN learning_users st ON st.id=b.student_id JOIN learning_users tu ON tu.id=b.tutor_id
           ORDER BY s.created_at DESC LIMIT 500`
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'assignments') {
        const [rows] = await db.execute(
          `SELECT a.id,a.title,a.instructions,a.due_at AS dueAt,a.created_at AS createdAt,
                  u.full_name AS tutorName,c.title AS courseTitle,
                  (SELECT COUNT(*) FROM learning_submissions sub WHERE sub.assignment_id=a.id) AS submissionsCount
           FROM learning_assignments a JOIN learning_users u ON u.id=a.tutor_id
           LEFT JOIN learning_courses c ON c.id=a.course_id
           ORDER BY a.created_at DESC LIMIT 500`
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'submissions') {
        const [rows] = await db.execute(
          `SELECT sub.id,sub.assignment_id AS assignmentId,sub.student_id AS studentId,
                  sub.submission_text AS submissionText,sub.file_url AS fileUrl,sub.feedback,sub.score,
                  sub.submitted_at AS submittedAt,a.title AS assignmentTitle,u.full_name AS studentName
           FROM learning_submissions sub JOIN learning_assignments a ON a.id=sub.assignment_id
           JOIN learning_users u ON u.id=sub.student_id
           ORDER BY sub.submitted_at DESC LIMIT 500`
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'payments') {
        const [rows] = await db.execute(
          `SELECT p.id,p.provider,p.provider_order_id AS orderId,p.provider_payment_id AS paymentId,
                  p.amount_paise AS amountPaise,p.currency,p.status,p.created_at AS createdAt,
                  u.full_name AS studentName,p.booking_id AS bookingId
           FROM learning_payments p JOIN learning_users u ON u.id=p.student_id
           ORDER BY p.created_at DESC LIMIT 500`
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'settings') {
        const [rows] = await db.execute('SELECT setting_key AS settingKey,setting_value AS settingValue FROM learning_platform_settings');
        const settings = Object.fromEntries(rows.map(r => [r.settingKey, r.settingValue]));
        return json(res, 200, { ok: true, settings });
      }
    }

    if (req.method === 'POST' && resource === 'subjects') {
      const name = String(req.body?.name || '').trim();
      if (name.length < 2 || name.length > 120) return json(res, 400, { error: 'Subject name must be 2–120 characters' });
      const slug = name.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,140);
      await db.execute('INSERT INTO learning_subjects(name,slug,is_active) VALUES(?,?,TRUE)', [name, slug]);
      return json(res, 201, { ok: true, message: 'Subject added' });
    }

    if (req.method === 'PATCH') {
      const id = Number(req.body?.id);
      if (!Number.isSafeInteger(id) || id < 1) return json(res, 400, { error: 'A valid record id is required' });
      if (resource === 'users') {
        const status = String(req.body?.status || '');
        if (!['active','suspended'].includes(status)) return json(res, 400, { error: 'Status must be active or suspended' });
        const [target] = await db.execute('SELECT id,role FROM learning_users WHERE id=? LIMIT 1', [id]);
        if (!target.length) return json(res, 404, { error: 'User not found' });
        if (target[0].role === 'admin' || id === admin.id) return json(res, 403, { error: 'Admin accounts cannot be changed here' });
        const [current] = await db.execute('SELECT status FROM learning_users WHERE id=? LIMIT 1',[id]);
        const connection = await db.getConnection();
        try {
          await connection.beginTransaction();
          await connection.execute('UPDATE learning_users SET status=? WHERE id=?', [status,id]);
          if (target[0].role === 'tutor') {
            if (status === 'active') await connection.execute("UPDATE learning_tutor_profiles SET approval_status='approved' WHERE user_id=?",[id]);
            else if (current[0]?.status === 'pending') await connection.execute("UPDATE learning_tutor_profiles SET approval_status='rejected' WHERE user_id=?",[id]);
          } else if (target[0].role === 'institution') {
            if (status === 'active') await connection.execute("UPDATE learning_institution_profiles SET approval_status='approved' WHERE user_id=?",[id]);
            else if (current[0]?.status === 'pending') await connection.execute("UPDATE learning_institution_profiles SET approval_status='rejected' WHERE user_id=?",[id]);
          }
          await connection.commit();
        } catch (error) {
          await connection.rollback();
          throw error;
        } finally {
          connection.release();
        }
        return json(res, 200, { ok: true });
      }
      if (resource === 'subjects') {
        const name = req.body?.name == null ? null : String(req.body.name).trim();
        const isActive = req.body?.isActive;
        if (name !== null) {
          if (name.length < 2 || name.length > 120) return json(res, 400, { error: 'Invalid subject name' });
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,140);
          await db.execute('UPDATE learning_subjects SET name=?,slug=? WHERE id=?',[name,slug,id]);
        }
        if (typeof isActive === 'boolean') await db.execute('UPDATE learning_subjects SET is_active=? WHERE id=?',[isActive,id]);
        return json(res, 200, { ok: true });
      }
      if (resource === 'courses') {
        const status = String(req.body?.status || '');
        if (!['draft','published','archived'].includes(status)) return json(res, 400, { error: 'Invalid course status' });
        await db.execute('UPDATE learning_courses SET status=? WHERE id=?',[status,id]);
        return json(res, 200, { ok: true });
      }
      if (resource === 'bookings') {
        const status = String(req.body?.status || '');
        if (!['cancelled','completed'].includes(status)) return json(res, 400, { error: 'Booking status must be cancelled or completed' });
        const [existing] = await db.execute('SELECT status FROM learning_bookings WHERE id=?',[id]);
        if (!existing.length) return json(res, 404, { error: 'Booking not found' });
        if (existing[0].status === 'pending_payment' && status === 'completed') return json(res, 409, { error: 'An unpaid booking cannot be completed' });
        await db.execute('UPDATE learning_bookings SET status=? WHERE id=?',[status,id]);
        return json(res, 200, { ok: true });
      }
      if (resource === 'sessions') {
        const status = req.body?.status;
        const classroomUrl = req.body?.classroomUrl;
        const updates = [];
        const values = [];
        if (status !== undefined) {
          if (!['scheduled','live','finished','cancelled'].includes(status)) return json(res, 400, { error: 'Invalid session status' });
          updates.push('status=?'); values.push(status);
          if (status === 'live') updates.push('started_at=COALESCE(started_at,CURRENT_TIMESTAMP)');
          if (status === 'finished' || status === 'cancelled') updates.push('ended_at=COALESCE(ended_at,CURRENT_TIMESTAMP)');
        }
        if (classroomUrl !== undefined) {
          const url = String(classroomUrl || '').trim();
          if (url && !/^https:\/\//i.test(url)) return json(res, 400, { error: 'Classroom link must start with https://' });
          if (url.length > 500) return json(res, 400, { error: 'Classroom link is too long' });
          updates.push('classroom_url=?'); values.push(url || null);
        }
        if (!updates.length) return json(res, 400, { error: 'No session changes supplied' });
        values.push(id);
        await db.execute('UPDATE learning_sessions SET '+updates.join(',')+' WHERE id=?',values);
        return json(res, 200, { ok: true });
      }
      return json(res, 400, { error: 'This resource is read-only' });
    }

    if (req.method === 'PUT' && resource === 'settings') {
      const allowed = ['platform_name','support_email','default_currency','platform_fee_percent','maintenance_mode','student_registration_enabled','tutor_registration_enabled','institution_registration_enabled'];
      const values = req.body?.settings || {};
      for (const key of Object.keys(values)) {
        if (!allowed.includes(key)) return json(res, 400, { error: 'Unsupported setting: '+key });
        const value = String(values[key]).trim();
        if (key === 'support_email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return json(res, 400, { error: 'Enter a valid support email' });
        if (key === 'platform_fee_percent' && (!Number.isFinite(Number(value)) || Number(value)<0 || Number(value)>50)) return json(res, 400, { error: 'Platform fee must be between 0 and 50' });
        if (['maintenance_mode','student_registration_enabled','tutor_registration_enabled','institution_registration_enabled'].includes(key) && !['true','false'].includes(value)) return json(res, 400, { error: 'Invalid true/false setting' });
        await db.execute(
          'INSERT INTO learning_platform_settings(setting_key,setting_value,updated_by) VALUES(?,?,?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),updated_by=VALUES(updated_by)',
          [key,value,admin.id]
        );
      }
      return json(res, 200, { ok: true, message: 'Platform settings saved' });
    }

    res.setHeader('Allow', 'GET, POST, PATCH, PUT');
    return json(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('Learning admin data failed:', error?.code || 'unknown');
    if (error?.code === 'ER_NO_SUCH_TABLE') return json(res, 503, { error: 'Required database table is missing. Run the admin-settings migration SQL.' });
    if (error?.code === 'ER_DUP_ENTRY') return json(res, 409, { error: 'That record already exists' });
    return json(res, 500, { error: 'Admin request could not be completed' });
  }
}
