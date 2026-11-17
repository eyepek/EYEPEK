import { getDb } from '../../_lib/db.js';
import { requireUser } from '../../_lib/auth.js';

const json = (res, status, body) => res.status(status).json(body);

export default async function handler(req, res) {
  const auth = requireUser(req, res);
  if (!auth) return;
  try {
    const db = getDb();
    const [admins] = await db.execute(
      "SELECT id FROM learning_users WHERE id=? AND role='admin' AND status='active' LIMIT 1",
      [auth.id]
    );
    if (!admins.length) return json(res, 403, { error: 'Administrator access required' });

    if (req.method === 'GET') {
      const [rows] = await db.execute(
        `SELECT u.id, u.full_name AS fullName, u.email, u.role, u.status, u.created_at AS createdAt,
                tp.headline, tp.bio, tp.hourly_rate_paise AS hourlyRatePaise,
                tp.approval_status AS approvalStatus, ip.institution_name AS institutionName,
                td.tutor_code AS tutorId, td.qualification, td.experience_years AS experienceYears,
                td.subjects, td.languages, td.teaching_mode AS teachingMode,
                idt.contact_person AS contactPerson, idt.phone AS institutionPhone, idt.city AS institutionCity, idt.website AS institutionWebsite, idt.institution_type AS institutionType,
                ip.approval_status AS institutionApprovalStatus
         FROM learning_users u
         LEFT JOIN learning_tutor_profiles tp ON tp.user_id=u.id
         LEFT JOIN learning_institution_profiles ip ON ip.user_id=u.id
         LEFT JOIN learning_tutor_details td ON td.user_id=u.id
         LEFT JOIN learning_institution_details idt ON idt.user_id=u.id
         WHERE u.role IN ('tutor','institution') AND u.status='pending'
         ORDER BY u.created_at ASC`
      );
      return json(res, 200, { ok: true, users: rows });
    }

    if (req.method === 'PATCH') {
      const userId = Number(req.body?.userId);
      const action = String(req.body?.action || '');
      if (!Number.isSafeInteger(userId) || userId < 1 || !['approve','reject'].includes(action)) {
        return json(res, 400, { error: 'A valid userId and approve/reject action are required' });
      }
      const [targets] = await db.execute(
        "SELECT id, role, status FROM learning_users WHERE id=? AND role IN ('tutor','institution') LIMIT 1",
        [userId]
      );
      if (!targets.length) return json(res, 404, { error: 'Tutor or institution account not found' });
      const target = targets[0];
      if (target.status === 'suspended') return json(res, 409, { error: 'Suspended accounts cannot be approved here' });
      const nextStatus = action === 'approve' ? 'active' : 'suspended';
      const nextApproval = action === 'approve' ? 'approved' : 'rejected';
      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();
        await connection.execute('UPDATE learning_users SET status=? WHERE id=?', [nextStatus, userId]);
        if (target.role === 'tutor') {
          await connection.execute('UPDATE learning_tutor_profiles SET approval_status=? WHERE user_id=?', [nextApproval, userId]);
          if (action === 'approve') {
            await connection.execute(
              `INSERT INTO learning_tutor_permissions
                (tutor_id,profile_management,course_management,course_publish,student_management,live_classes,booking_management,assignments,attendance,earnings,payout_request,updated_by)
               VALUES (?,TRUE,TRUE,FALSE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,FALSE,?)
               ON DUPLICATE KEY UPDATE tutor_id=VALUES(tutor_id)`,
              [userId, auth.id]
            );
          }
        } else {
          await connection.execute('UPDATE learning_institution_profiles SET approval_status=? WHERE user_id=?', [nextApproval, userId]);
        }
        await connection.commit();
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
      return json(res, 200, { ok: true, userId, status: nextStatus, approvalStatus: nextApproval });
    }

    res.setHeader('Allow', 'GET, PATCH');
    return json(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('Learning admin users failed:', error?.code || 'unknown');
    if (error?.code === 'ER_NO_SUCH_TABLE') return json(res, 503, { error: 'Database tables are not installed yet' });
    return json(res, 500, { error: 'Admin request could not be completed' });
  }
}
