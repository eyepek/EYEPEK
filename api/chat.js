const MAX_QUESTION_LENGTH = 1000;
const MODEL = 'gemini-3.5-flash-lite';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  const language = req.body?.language === 'hi' ? 'Hindi' : 'English';

  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: 'Please send a question under 1000 characters.' });
  }

  // Answer exact EYEPEK contact questions directly from verified website details.
  const normalizedQuestion = question.toLowerCase().normalize('NFKC');
  const asksPhone = /\\b(phone|mobile|number|contact number|call|whatsapp)\\b|फोन|मोबाइल|नंबर|सम्पर्क|संपर्क|व्हाट्स.?ऐप|कॉल/.test(normalizedQuestion);
  const asksEmail = /\\b(email|e mail|mail id)\\b|ईमेल|मेल आईडी/.test(normalizedQuestion);
  if (asksPhone || asksEmail) {
    const details = [];
    if (asksPhone) details.push(language === 'Hindi' ? 'EYEPEK का फोन/WhatsApp नंबर: +91 70043 74250' : 'EYEPEK phone/WhatsApp: +91 70043 74250');
    if (asksEmail) details.push(language === 'Hindi' ? 'EYEPEK ईमेल: info.eyepek@gmail.com' : 'EYEPEK email: info.eyepek@gmail.com');
    return res.status(200).json({ reply: details.join('\\n') + (language === 'Hindi' ? '\\nआप इस नंबर पर कॉल या WhatsApp कर सकते हैं।' : '\\nYou can call or WhatsApp this number.') });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI is not configured' });
  }

  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: 'Please send a question under 1000 characters.' });
  }

  const systemPrompt = `You are the website assistant for EYEPEK (https://www.eyepek.com). Reply in ${language}, briefly and helpfully. IMPORTANT: Use the following verified information from the EYEPEK website as your source of truth. EYEPEK contact phone and WhatsApp: +91 70043 74250. Contact email: info.eyepek@gmail.com. Website: https://www.eyepek.com. Website-listed courses: BBA, BCA, MBA, MCA, ANM, GNM, and B.Sc. (Nursing). Website services include student course and admission guidance; college affiliation and institutional documentation support; AICTE-related process/documentation guidance where applicable; compliance and renewal paperwork guidance; IT/computer support such as computer troubleshooting, software installation, printer support, networking, CCTV and remote assistance; and home services. If asked for EYEPEK's phone, mobile, contact, call or WhatsApp number, give +91 70043 74250. If asked for email, give info.eyepek@gmail.com. If asked for the website, give https://www.eyepek.com. Never say you cannot find these known details. Do not invent address, fees, timings, college-specific eligibility, deadlines, affiliation status, approvals, or admission guarantees. Availability, fees, rules and requirements can change and must be confirmed with the relevant college or authority. EYEPEK provides guidance and documentation support; it does not grant approvals or decide admissions. Do not request passwords, payment details, or private documents. If a question is unrelated to EYEPEK, politely explain the topics you can help with.`;

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
