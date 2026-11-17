import { getDb } from '../../_lib/db.js';
import { requireUser } from '../../_lib/auth.js';

const TUTOR_PERMISSIONS = [
  'profile_management', 'course_management', 'course_publish',
  'student_management', 'live_classes', 'booking_management',
  'assignments', 'attendance', 'earnings', 'payout_request'
];

// Reusable server-side guard for every Tutor API.
// Import this function in a Tutor endpoint and pass its required permission key.
export async function requireTutorPermission(req, res, permission) {
  if (!TUTOR_PERMISSIONS.includes(permission)) {
    res.status(500).json({ error: 'Invalid tutor permission configuration' });
    return null;
  }

  const auth = requireUser(req, res);
  if (!auth) return null;
  if (auth.role !== 'tutor') {
    res.status(403).json({ error: 'Tutor account required' });
    return null;
  }

  const [rows] = await getDb().execute(
    `SELECT u.status, tp.approval_status,
            COALESCE(p.${permission}, ${permission === 'course_publish' ? 0 : 1}) AS permission_enabled
     FROM learning_users u
     JOIN learning_tutor_profiles tp ON tp.user_id=u.id
     LEFT JOIN learning_tutor_permissions p ON p.tutor_id=u.id
     WHERE u.id=? AND u.role='tutor' LIMIT 1`,
    [auth.id]
  );

  const access = rows[0];
  if (!access || access.status !== 'active' || access.approval_status !== 'approved') {
    res.status(403).json({ error: 'An approved and active tutor account is required' });
    return null;
  }
  if (!Boolean(access.permission_enabled)) {
    res.status(403).json({
      error: 'This feature permission is disabled. Contact the EYEPEK administrator.',
      permission
    });
    return null;
  }
  return auth;
}

export default async function handler(req, res) {
  try {
    const auth = await requireTutorPermission(req, res, 'profile_management');
    if (!auth) return;

    if (req.method === 'GET') {
      const [rows] = await getDb().execute(
        'SELECT headline, bio, hourly_rate_paise, approval_status FROM learning_tutor_profiles WHERE user_id=? LIMIT 1',
        [auth.id]
      );
      if (!rows.length) return res.status(404).json({ error: 'Tutor profile not found' });
      const p = rows[0];
      return res.status(200).json({
        ok: true,
        profile: {
          headline: p.headline || '',
          bio: p.bio || '',
          hourlyRate: Number(p.hourly_rate_paise || 0) / 100,
          approvalStatus: p.approval_status
        }
      });
    }

    if (req.method === 'PUT') {
      const headline = String(req.body?.headline || '').trim();
      const bio = String(req.body?.bio || '').trim();
      const hourlyRate = Number(req.body?.hourlyRate || 0);
      if (headline.length > 180) return res.status(400).json({ error: 'Headline must be 180 characters or less' });
      if (bio.length > 5000) return res.status(400).json({ error: 'Bio must be 5000 characters or less' });
      if (!Number.isFinite(hourlyRate) || hourlyRate < 0 || hourlyRate > 100000) {
        return res.status(400).json({ error: 'Enter a valid hourly rate' });
      }
      await getDb().execute(
        'UPDATE learning_tutor_profiles SET headline=?, bio=?, hourly_rate_paise=? WHERE user_id=?',
        [headline || null, bio || null, Math.round(hourlyRate * 100), auth.id]
      );
      return res.status(200).json({ ok: true, message: 'Tutor profile saved' });
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Tutor profile API failed:', error?.code || 'unknown');
    return res.status(500).json({ error: 'Could not process tutor profile' });
  }
}
