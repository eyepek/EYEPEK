const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;

function getRateLimitMap() {
  if (!globalThis.__eyepekChatRateLimits) globalThis.__eyepekChatRateLimits = new Map();
  return globalThis.__eyepekChatRateLimits;
}

function checkRateLimit(ip) {
  const now = Date.now();
  const limits = getRateLimitMap();
  const current = limits.get(ip);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    limits.set(ip, { startedAt: now, count: 1 });
    return true;
  }
  current.count += 1;
  return current.count <= RATE_LIMIT;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Please send a question using the chat form.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'The assistant is temporarily unavailable. Please contact EYEPEK directly.' });
  }

  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0] : '') || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip.trim())) {
    return res.status(429).json({ error: 'Please wait a moment before asking another question.' });
  }

  const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return null; } })() : req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Please enter a question and try again.' });
  }
  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > 10_000) {
    return res.status(413).json({ error: 'That message is too long. Please shorten it and try again.' });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
  const input = messages
    .filter((message) => message && ['user', 'assistant'].includes(message.role) && typeof message.content === 'string')
    .map((message) => ({ role: message.role, content: message.content.trim().slice(0, 1000) }))
    .filter((message) => message.content);

  if (!input.length || input[input.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Please enter a question and try again.' });
  }

  const language = body.language === 'hi' ? 'Hindi' : 'English';
  const instructions = [
    'You are the EYEPEK website assistant. Be warm, professional, concise, and easy to understand.',
    `Answer in ${language}, or follow the language used in the user’s latest message if it is clearly different.`,
    'Help only with EYEPEK services and general course/admission questions. Courses listed on the site include BBA, BCA, MBA, MCA, ANM, GNM, and B.Sc. Nursing.',
    'Explain course subjects at a high level. Do not invent or guess current eligibility criteria, course duration, fees, seats, admission dates, college availability, recognition, affiliation status, or regulatory approvals. Say these vary by institution and ask the visitor to confirm with the college.',
    'EYEPEK provides guidance and documentation support. Colleges, universities, and relevant regulators make admission, affiliation, and approval decisions. Never promise admission, affiliation, or approval.',
    'For an official answer or current details, invite the visitor to contact EYEPEK at 7004374250 or info.eyepek@gmail.com. Keep answers helpful and do not collect passwords, payment information, identity numbers, or private documents.',
    'If you do not know an answer, say so clearly and direct the visitor to EYEPEK or the relevant institution.',
  ].join(' ');

  try {
    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-6-astra',
        instructions,
        input,
        max_output_tokens: 450,
        store: false,
      }),
    });

    const result = await upstream.json();
    if (!upstream.ok) {
      const status = upstream.status === 429 ? 503 : 502;
      return res.status(status).json({ error: 'The assistant is busy right now. Please try again shortly or contact EYEPEK.' });
    }

    const reply = (result.output || [])
      .flatMap((item) => Array.isArray(item.content) ? item.content : [])
      .filter((item) => item.type === 'output_text' && typeof item.text === 'string')
      .map((item) => item.text)
      .join('\n')
      .trim();

    if (!reply) {
      return res.status(502).json({ error: 'The assistant could not prepare a reply. Please try again.' });
    }

    return res.status(200).json({ reply });
  } catch {
    return res.status(502).json({ error: 'The assistant is temporarily unavailable. Please try again or contact EYEPEK.' });
  }
}
