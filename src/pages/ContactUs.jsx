// ContactUsAI.jsx
import React, { useState } from "react";

export default function ContactUsAI() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // AI outputs
  const [aiSummary, setAiSummary] = useState("");
  const [aiTags, setAiTags] = useState([]);
  const [leadScore, setLeadScore] = useState(null);
  const [aiReply, setAiReply] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    // reset analysis if message changed
    if (name === "message") {
      setAnalyzed(false);
      setAiSummary("");
      setAiTags([]);
      setLeadScore(null);
      setAiReply("");
    }
  };

  // Ask the AI backend to analyze the current message
  const analyzeWithAI = async () => {
    if (!formData.message.trim()) {
      setStatus("Please type a message for AI analysis.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "AI analysis failed");

      // expected: { summary, tags, leadScore, autoReply }
      setAiSummary(data.summary || "");
      setAiTags(data.tags || []);
      setLeadScore(data.leadScore ?? null);
      setAiReply(data.autoReply || "");
      setAnalyzed(true);
      setStatus("AI analysis complete — review below.");
    } catch (err) {
      console.error(err);
      setStatus("AI analysis failed. Check server or API key.");
    } finally {
      setLoading(false);
    }
  };

  // Submit the enriched lead to contact endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    // if not analyzed, attempt to analyze automatically (best-effort)
    if (!analyzed) {
      await analyzeWithAI();
    }

    try {
      const payload = {
        ...formData,
        aiSummary,
        aiTags,
        leadScore,
        aiReply,
        source: "website",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("Message sent and enriched by AI. We'll be in touch!");
        setFormData({ name: "", email: "", message: "" });
        setAiSummary("");
        setAiTags([]);
        setLeadScore(null);
        setAiReply("");
        setAnalyzed(false);
      } else {
        const d = await res.json();
        setStatus(d?.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error while sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-start justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Talk to our AI Growth Team</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Get a free AI Growth Plan — AI will summarize & qualify your request automatically.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your project, timeline and budget (optional)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={analyzeWithAI}
              disabled={loading}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-transparent bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              {loading ? "Analyzing…" : "Analyze with AI"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-indigo-600 bg-white text-indigo-600 font-medium hover:bg-indigo-50"
            >
              {loading ? "Sending…" : "Send Message"}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData({ name: "", email: "", message: "" });
                setAiSummary("");
                setAiTags([]);
                setLeadScore(null);
                setAiReply("");
                setAnalyzed(false);
                setStatus("");
              }}
              className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700"
            >
              Reset
            </button>
          </div>
        </form>

        {/* STATUS */}
        {status && <p className="mt-4 text-sm text-center text-gray-700">{status}</p>}

        {/* AI PANEL */}
        <div className="mt-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700">AI Enrichment</h3>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Summary</p>
              <textarea
                value={aiSummary}
                onChange={(e) => setAiSummary(e.target.value)}
                rows={4}
                placeholder="AI will write a short summary of the message"
                className="mt-1 block w-full rounded-md border border-gray-200 p-2 bg-white"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500">Auto-reply (editable)</p>
              <textarea
                value={aiReply}
                onChange={(e) => setAiReply(e.target.value)}
                rows={4}
                placeholder="AI-generated reply draft"
                className="mt-1 block w-full rounded-md border border-gray-200 p-2 bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Tip: edit this before sending. You can also send the reply automatically from your backend.
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div>
              <p className="text-xs text-gray-500">Tags</p>
              <div className="mt-1 flex gap-2">
                {aiTags.length > 0 ? (
                  aiTags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">No tags yet</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Lead Score</p>
              <div className="mt-1">
                {leadScore != null ? (
                  <div className="inline-flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-md bg-green-100 text-green-800">
                      {leadScore}/100
                    </span>
                    <span className="text-xs text-gray-500">
                      {leadScore > 70 ? "High" : leadScore > 40 ? "Medium" : "Low"}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">N/A</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">AI features require a server-side API key — this example assumes you have /api/ai/analyze and /api/contact endpoints.</p>
      </div>
    </div>
  );
}
