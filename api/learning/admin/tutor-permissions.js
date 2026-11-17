import { getDb } from '../../_lib/db.js';
import { requireUser } from '../../_lib/auth.js';

const PERMISSIONS = [
  'profile_management', 'course_management', 'course_publish',
  'student_management', 'live_classes', 'booking_management',
  'assignments', 'attendance', 'earnings', 'payout_request'
];
const DEFAULTS = {
  profile_management: true, course_management: true, course_publish: false,
  student_management: true, live_classes: true, booking_management: true,
  assignments: true, attendance: true, earnings: true, payout_request: true
};
const json = (res, status, body) => res.status(status).json(body);

async function requireAdmin(req, res) {
  const auth = requireUser(req, res);
  if (!auth) return null;
  const [rows] = await getDb().execute(
    "SELECT id FROM learning_users WHERE id=? AND role='admin' AND status='active' LIMIT 1",
    [auth.id]
  );
  if (!rows.length) { json(res, 403, { error: 'Administrator access required' }); return null; }
  return auth;
}

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;
  try {
    const db = getDb();
    if (req.method === 'GET') {
      const [rows] = await db.execute(
        `SELECT u.id, u.full_name AS fullName, u.email, u.status,
                tp.approval_status AS approvalStatus,
                COALESCE(p.profile_management,1) AS profile_management,
                COALESCE(p.course_management,1) AS course_management,
                COALESCE(p.course_publish,0) AS course_publish,
                COALESCE(p.student_management,1) AS student_management,
                COALESCE(p.live_classes,1) AS live_classes,
                COALESCE(p.booking_management,1) AS booking_management,
                COALESCE(p.assignments,1) AS assignments,
                COALESCE(p.attendance,1) AS attendance,
                COALESCE(p.earnings,1) AS earnings,
                COALESCE(p.payout_request,1) AS payout_request
         FROM learning_users u
         JOIN learning_tutor_profiles tp ON tp.user_id=u.id
         LEFT JOIN learning_tutor_permissions p ON p.tutor_id=u.id
         WHERE u.role='tutor'
         ORDER BY u.created_at DESC LIMIT 500`
      );
      const tutors = rows.map(row => {
        const permissions = {};
        for (const key of PERMISSIONS) permissions[key] = Boolean(row[key]);
        return { id: row.id, fullName: row.fullName, email: row.email, status: row.status, approvalStatus: row.approvalStatus, permissions };
      });
      return json(res, 200, { ok: true, tutors, defaults: DEFAULTS });
    }
    if (req.method === 'PATCH') {
      const tutorId = Number(req.body?.tutorId);
      const incoming = req.body?.permissions;
      if (!Number.isSafeInteger(tutorId) || tutorId < 1 || !incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
        return json(res, 400, { error: 'A valid tutor and permission object are required' });
      }
      if (incoming.payout_request !== false) return json(res, 400, { error: 'Tutor payout requests are disabled. Payouts are controlled only by EYEPEK Admin.' });
      for (const key of PERMISSIONS) {
        if (typeof incoming[key] !== 'boolean') return json(res, 400, { error: 'Every tutor permission must be true or false' });
      }
      const [targets] = await db.execute(
        "SELECT id FROM learning_users WHERE id=? AND role='tutor' LIMIT 1",
        [tutorId]
      );
      if (!targets.length) return json(res, 404, { error: 'Tutor account not found' });
      const values = PERMISSIONS.map(key => incoming[key] ? 1 : 0);
      await db.execute(
        `INSERT INTO learning_tutor_permissions (tutor_id, ${PERMISSIONS.join(',')}, updated_by)
         VALUES (?, ${PERMISSIONS.map(() => '?').join(',')}, ?)
         ON DUPLICATE KEY UPDATE ${PERMISSIONS.map(key => `${key}=VALUES(${key})`).join(',')}, updated_by=VALUES(updated_by)`,
        [tutorId, ...values, admin.id]
      );
      return json(res, 200, { ok: true, tutorId, permissions: incoming });
    }
    res.setHeader('Allow', 'GET, PATCH');
    return json(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('Tutor permission management failed:', error?.code || 'unknown');
    if (error?.code === 'ER_NO_SUCH_TABLE') return json(res, 503, { error: 'Tutor permission table is not installed. Run tutor-permissions-migration.sql.' });
    return json(res, 500, { error: 'Tutor permissions could not be processed' });
  }
}
