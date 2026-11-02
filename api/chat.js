const MAX_QUESTION_LENGTH = 1000;
const MODEL = 'gemini-3.5-flash-lite';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI is not configured' });
  }

  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  const language = req.body?.language === 'hi' ? 'Hindi' : 'English';

  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: 'Please send a question under 1000 characters.' });
  }

  const systemPrompt = `You are EYEPEK's helpful student guidance assistant. Reply in ${language}. Answer clearly and briefly, in a warm and professional tone. Help only with courses, admissions, college affiliation, AICTE or other approvals, and documentation support. Do not invent college-specific eligibility, fees, deadlines, affiliation, approvals, or admission guarantees. Explain that details can vary by college, course, and academic session and should be verified with the institution or relevant authority. EYEPEK provides guidance and documentation support; it does not grant approvals or decide admissions. Do not request passwords, payment details, or private documents. If a question is unrelated, politely say you can help with EYEPEK's student guidance topics.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: question }] }],
        generationConfig: { temperature: 0.35, maxOutputTokens: 400 },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Gemini could not answer right now.' });
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    if (!answer) {
      return res.status(502).json({ error: 'Gemini returned an empty answer.' });
    }

    return res.status(200).json({ reply: answer });
  } catch {
    return res.status(502).json({ error: 'Gemini could not answer right now.' });
  } finally {
    clearTimeout(timeout);
  }
}
