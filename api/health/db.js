import { getDb } from '../_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(503).json({ ok: false, database: 'not_configured' });
  }

  try {
    const [rows] = await getDb().query('SELECT 1 AS connected');
    return res.status(200).json({ ok: true, database: rows?.[0]?.connected === 1 ? 'connected' : 'unknown' });
  } catch (error) {
    console.error('Database health check failed:', error?.code || error?.message || 'unknown');
    return res.status(503).json({ ok: false, database: 'unavailable' });
  }
}
