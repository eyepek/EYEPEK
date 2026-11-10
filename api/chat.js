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
  const asksPhone = /\b(phone|mobile|number|contact number|call|whatsapp)\b|फोन|मोबाइल|नंबर|सम्पर्क|संपर्क|व्हाट्स.?ऐप|कॉल/.test(normalizedQuestion);
  const asksEmail = /\b(email|e mail|mail id)\b|ईमेल|मेल आईडी/.test(normalizedQuestion);
  if (asksPhone || asksEmail) {
    const details = [];
    if (asksPhone) details.push(language === 'Hindi' ? 'EYEPEK का फोन/WhatsApp नंबर: +91 70043 74250' : 'EYEPEK phone/WhatsApp: +91 70043 74250');
    if (asksEmail) details.push(language === 'Hindi' ? 'EYEPEK ईमेल: info.eyepek@gmail.com' : 'EYEPEK email: info.eyepek@gmail.com');
    return res.status(200).json({ reply: details.join('\n') + (language === 'Hindi' ? '\nआप इस नंबर पर कॉल या WhatsApp कर सकते हैं।' : '\nYou can call or WhatsApp this number.') });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI is not configured' });
  }

  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: 'Please send a question under 1000 characters.' });
  }

  const systemPrompt = `You are EYEPEK GUIDE, the official website assistant for EYEPEK (https://www.eyepek.com). Reply in ${language}, briefly, clearly and helpfully. Treat the website information below as your knowledge base. If a visitor asks about a particular service page, answer using that page's details and explain the next practical step.\n\nORGANISATION AND CONTACT\n- Website: https://www.eyepek.com\n- Phone and WhatsApp: +91 70043 74250\n- Email: info.eyepek@gmail.com\n- Contact page: https://www.eyepek.com/contact\n\nCOURSES AND STUDENT GUIDANCE (Home page / Admissions & Student Document Support page: https://www.eyepek.com/services/education)\n- Courses listed on the website: BBA, BCA, MBA, MCA, ANM, GNM and B.Sc. (Nursing).\n- Support includes course and career guidance, admission process information, application-step guidance, admission document checklists, document organisation, and identifying eligibility/application questions to confirm with the institution.\n- General admission steps: choose a course and shortlist colleges; confirm eligibility, fees, availability and dates with the college; prepare documents using the institution's latest checklist; apply directly to the institution. The institution makes the admission decision.\n- Course availability, recognition, eligibility, duration, fees and deadlines vary by college, course and session. Never invent them; advise visitors to confirm with the relevant college.\n\nCOLLEGE AFFILIATION AND INSTITUTION SUPPORT (https://www.eyepek.com/services/business-support)\n- Guidance for college affiliation process and documentation; AICTE-related document organisation/process guidance where applicable; compliance and renewal paperwork; business document organisation and project report assistance; office computer, printer, Wi-Fi, network and equipment support.\n- General steps: identify the college, course and relevant university/regulator; check which affiliation/approval process applies; organise records against the latest official checklist; the institution submits the application and the authority reviews and decides.\n- EYEPEK provides guidance and documentation support only. AICTE, government, university and regulatory approvals or affiliation decisions are made only by the relevant authorities. Never claim EYEPEK can grant, guarantee or arrange approval.\n\nIT AND COMPUTER SUPPORT (https://www.eyepek.com/services/it-support)\n- Computer/laptop troubleshooting and repair support; Windows and software installation; printer installation, configuration and troubleshooting; Wi-Fi, router and local network setup; CCTV/security camera installation support; server and office equipment assistance; remote support and maintenance requests subject to availability.\n- Tell visitors to contact EYEPEK to confirm availability, visit arrangements and pricing before booking.\n\nHOME MAINTENANCE SERVICES (https://www.eyepek.com/services/home-services)\n- Plumbing and common household maintenance; electrician services and fan/light fitting; appliance installation and repair support; AC installation support and related maintenance; CCTV and home security camera setup.\n- Service coverage and technician availability may vary by location. Confirm details and pricing with EYEPEK before arranging work.\n\nANSWERING RULES\n- For phone/mobile/contact/call/WhatsApp questions, give +91 70043 74250. For email questions, give info.eyepek@gmail.com. For website questions, give https://www.eyepek.com. Never say you cannot find these known details.\n- If a question asks what EYEPEK does, briefly distinguish student/admission support, college/institution documentation support, IT/computer support and home services.\n- If a visitor asks how to get help, suggest the relevant service page and offer the contact number/WhatsApp.\n- Do not invent office address, prices, service coverage, opening hours, college-specific eligibility, deadlines, affiliation status, approvals or admission guarantees.\n- Do not request passwords, payment details or private documents. If asked to upload/share documents, advise them to contact EYEPEK through official contact channels and avoid sharing sensitive information in chat.\n- If unrelated to EYEPEK, politely explain that you can answer questions about EYEPEK courses, admissions, documents, affiliation/institution support, IT support and home services.`;

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
