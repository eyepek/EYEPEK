import { getDb } from '../../_lib/db.js';
import { requireTutorPermission } from './profile.js';

const json = (res, status, body) => res.status(status).json(body);
const resources = {
  courses: 'course_management',
  students: 'student_management',
  sessions: 'live_classes',
  bookings: 'booking_management',
  assignments: 'assignments',
  attendance: 'attendance',
  earnings: 'earnings'
};

export default async function handler(req, res) {
  const resource = String(req.query?.resource || '');
  const permission = resources[resource];
  if (!permission) return json(res, 400, { error: 'Unknown tutor resource' });

  try {
    const tutor = await requireTutorPermission(req, res, permission);
    if (!tutor) return;
    const db = getDb();

    if (req.method === 'GET') {
      if (resource === 'courses') {
        const [rows] = await db.execute(
          'SELECT id,title,description,price_paise AS pricePaise,status,subject_id AS subjectId,created_at AS createdAt FROM learning_courses WHERE tutor_id=? ORDER BY created_at DESC',
          [tutor.id]
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'students') {
        const [rows] = await db.execute(
          `SELECT DISTINCT u.id,u.full_name AS fullName,u.email
           FROM learning_bookings b JOIN learning_users u ON u.id=b.student_id
           WHERE b.tutor_id=? ORDER BY u.full_name`,
          [tutor.id]
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'bookings') {
        const [rows] = await db.execute(
          `SELECT b.id,b.student_id AS studentId,u.full_name AS studentName,
                  b.course_id AS courseId,c.title AS courseTitle,b.scheduled_start AS scheduledStart,
                  b.scheduled_end AS scheduledEnd,b.amount_paise AS amountPaise,b.currency,b.status,b.created_at AS createdAt
           FROM learning_bookings b JOIN learning_users u ON u.id=b.student_id
           LEFT JOIN learning_courses c ON c.id=b.course_id
           WHERE b.tutor_id=? ORDER BY b.created_at DESC LIMIT 300`,
          [tutor.id]
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'sessions') {
        const [rows] = await db.execute(
          `SELECT s.id,s.booking_id AS bookingId,s.classroom_url AS classroomUrl,
                  s.started_at AS startedAt,s.ended_at AS endedAt,s.status,
                  b.student_id AS studentId,u.full_name AS studentName,
                  b.scheduled_start AS scheduledStart,b.scheduled_end AS scheduledEnd
           FROM learning_sessions s JOIN learning_bookings b ON b.id=s.booking_id
           JOIN learning_users u ON u.id=b.student_id
           WHERE b.tutor_id=? ORDER BY b.scheduled_start DESC LIMIT 300`,
          [tutor.id]
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'assignments') {
        const [rows] = await db.execute(
          `SELECT a.id,a.course_id AS courseId,c.title AS courseTitle,a.title,a.instructions,
                  a.due_at AS dueAt,a.created_at AS createdAt,
                  (SELECT COUNT(*) FROM learning_submissions x WHERE x.assignment_id=a.id) AS submissionsCount
           FROM learning_assignments a LEFT JOIN learning_courses c ON c.id=a.course_id
           WHERE a.tutor_id=? ORDER BY a.created_at DESC`,
          [tutor.id]
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'attendance') {
        const [rows] = await db.execute(
          `SELECT a.id,a.session_id AS sessionId,a.user_id AS studentId,u.full_name AS studentName,
                  a.joined_at AS joinedAt,a.left_at AS leftAt,a.attendance_status AS attendanceStatus
           FROM learning_attendance a JOIN learning_sessions s ON s.id=a.session_id
           JOIN learning_bookings b ON b.id=s.booking_id JOIN learning_users u ON u.id=a.user_id
           WHERE b.tutor_id=? ORDER BY a.created_at DESC LIMIT 500`,
          [tutor.id]
        );
        return json(res, 200, { ok: true, rows });
      }
      if (resource === 'earnings') {
        return json(res, 200, { ok: true, earnings: { status: 'admin_review', message: 'Tutor compensation is calculated by EYEPEK Admin after verified sessions and approved assignment work. Student payments are collected by EYEPEK; tutors cannot request withdrawals.' } });
      }
    }

    if (req.method === 'POST') {
      if (resource === 'courses') {
        const title = String(req.body?.title || '').trim();
        const description = String(req.body?.description || '').trim();
        const price = Number(req.body?.price || 0);
        const subjectId = req.body?.subjectId ? Number(req.body.subjectId) : null;
        if (title.length < 3 || title.length > 180 || description.length > 10000 || !Number.isFinite(price) || price < 0 || price > 1000000) {
          return json(res, 400, { error: 'Enter a valid course title, description and price' });
        }
        if (subjectId !== null && (!Number.isSafeInteger(subjectId) || subjectId < 1)) return json(res, 400, { error: 'Invalid subject' });
        const [result] = await db.execute(
          "INSERT INTO learning_courses (tutor_id,subject_id,title,description,price_paise,status) VALUES (?,?,?,?,?,'draft')",
          [tutor.id, subjectId, title, description || null, Math.round(price * 100)]
        );
        return json(res, 201, { ok: true, id: result.insertId, message: 'Course saved as draft. Admin approval is required before publishing.' });
      }
      if (resource === 'assignments') {
        const title = String(req.body?.title || '').trim();
        const instructions = String(req.body?.instructions || '').trim();
        const courseId = req.body?.courseId ? Number(req.body.courseId) : null;
        const dueAt = req.body?.dueAt || null;
        if (title.length < 3 || title.length > 180 || instructions.length > 10000) return json(res, 400, { error: 'Enter a valid assignment title and instructions' });
        if (courseId !== null) {
          const [course] = await db.execute('SELECT id FROM learning_courses WHERE id=? AND tutor_id=? LIMIT 1',[courseId,tutor.id]);
          if (!course.length) return json(res, 404, { error: 'Course not found for this tutor' });
        }
        const [result] = await db.execute(
          'INSERT INTO learning_assignments (tutor_id,course_id,title,instructions,due_at) VALUES (?,?,?,?,?)',
          [tutor.id,courseId,title,instructions || null,dueAt]
        );
        return json(res, 201, { ok: true, id: result.insertId });
      }
      if (resource === 'attendance') {
        const sessionId = Number(req.body?.sessionId);
        const studentId = Number(req.body?.studentId);
        const status = String(req.body?.status || 'present');
        if (!Number.isSafeInteger(sessionId) || !Number.isSafeInteger(studentId) || !['present','late','absent'].includes(status)) return json(res, 400, { error: 'Invalid attendance details' });
        const [owned] = await db.execute(
          'SELECT s.id FROM learning_sessions s JOIN learning_bookings b ON b.id=s.booking_id WHERE s.id=? AND b.tutor_id=? AND b.student_id=? LIMIT 1',
          [sessionId,tutor.id,studentId]
        );
        if (!owned.length) return json(res, 404, { error: 'Session or student not found for this tutor' });
        await db.execute(
          `INSERT INTO learning_attendance (session_id,user_id,attendance_status,joined_at)
           VALUES (?,?,?,IF(?='present',CURRENT_TIMESTAMP,NULL))
           ON DUPLICATE KEY UPDATE attendance_status=VALUES(attendance_status),joined_at=IF(VALUES(attendance_status)='present',COALESCE(joined_at,CURRENT_TIMESTAMP),joined_at)`,
          [sessionId,studentId,status,status]
        );
        return json(res, 200, { ok: true });
      }
    }

    if (req.method === 'PATCH') {
      const id = Number(req.body?.id);
      if (!Number.isSafeInteger(id) || id < 1) return json(res, 400, { error: 'A valid record ID is required' });
      if (resource === 'courses') {
        const status = String(req.body?.status || '');
        if (!['draft','published','archived'].includes(status)) return json(res, 400, { error: 'Invalid course status' });
        if (status === 'published') {
          const publishAuth = await requireTutorPermission(req, res, 'course_publish');
          if (!publishAuth) return;
          return json(res, 403, { error: 'Course publishing is disabled for tutors. Submit the draft for administrator review.' });
        }
        const [result] = await db.execute('UPDATE learning_courses SET status=? WHERE id=? AND tutor_id=?',[status,id,tutor.id]);
        if (!result.affectedRows) return json(res, 404, { error: 'Course not found' });
        return json(res, 200, { ok: true });
      }
      if (resource === 'sessions') {
        const classroomUrl = req.body?.classroomUrl;
        const status = req.body?.status;
        if (classroomUrl !== undefined) {
          const url = String(classroomUrl).trim();
          if (url && (!/^https:\/\//i.test(url) || url.length > 500)) return json(res, 400, { error: 'Enter a valid HTTPS classroom URL' });
          const [result] = await db.execute(
            'UPDATE learning_sessions s JOIN learning_bookings b ON b.id=s.booking_id SET s.classroom_url=? WHERE s.id=? AND b.tutor_id=?',
            [url || null,id,tutor.id]
          );
          if (!result.affectedRows) return json(res, 404, { error: 'Session not found' });
          return json(res, 200, { ok: true });
        }
        if (status && ['live','finished','cancelled'].includes(status)) {
          const [result] = await db.execute(
            'UPDATE learning_sessions s JOIN learning_bookings b ON b.id=s.booking_id SET s.status=?,s.started_at=IF(?=\'live\',COALESCE(s.started_at,CURRENT_TIMESTAMP),s.started_at),s.ended_at=IF(?=\'finished\',CURRENT_TIMESTAMP,s.ended_at) WHERE s.id=? AND b.tutor_id=?',
            [status,status,status,id,tutor.id]
          );
          if (!result.affectedRows) return json(res, 404, { error: 'Session not found' });
          return json(res, 200, { ok: true });
        }
        return json(res, 400, { error: 'Provide a classroom URL or valid session status' });
      }
      if (resource === 'bookings') {
        const status = String(req.body?.status || '');
        if (!['cancelled','completed'].includes(status)) return json(res, 400, { error: 'Invalid booking action' });
        const [result] = await db.execute(
          'UPDATE learning_bookings SET status=? WHERE id=? AND tutor_id=? AND status IN (\'confirmed\',\'pending_payment\')',
          [status,id,tutor.id]
        );
        if (!result.affectedRows) return json(res, 404, { error: 'Booking not found or cannot be changed' });
        return json(res, 200, { ok: true });
      }
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return json(res, 405, { error: 'Method not allowed for this resource' });
  } catch (error) {
    console.error('Tutor workspace API failed:', error?.code || 'unknown');
    return json(res, 500, { error: 'Could not process tutor workspace request' });
  }
}
