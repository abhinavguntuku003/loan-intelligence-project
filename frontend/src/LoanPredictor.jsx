import { useState } from "react";

const API_BASE = "https://loan-intelligence-project.onrender.com"; // FastAPI backend
// const API_BASE = import.meta.env.VITE_API_BASE;

const fields = [
  {
    key: "age",
    label: "Age",
    placeholder: "e.g. 30",
    prefix: null,
    type: "number"
  },
  {
    key: "income",
    label: "Monthly Income",
    placeholder: "e.g. 60000",
    prefix: "₹",
    type: "number"
  },
  {
    key: "credit_score",
    label: "Credit Score",
    placeholder: "e.g. 720",
    prefix: null,
    type: "number"
  },
  {
    key: "loan_amount",
    label: "Loan Amount",
    placeholder: "e.g. 500000",
    prefix: "₹",
    type: "number"
  },
  {
    key: "existing_loans",
    label: "Existing Loan Amount",
    placeholder: "e.g. 100000",
    prefix: "₹",
    type: "number"
  },
  {
    key: "spending_ratio",
    label: "Spending Ratio (0 - 1)",
    placeholder: "e.g. 0.35",
    prefix: null,
    type: "number",
    hasInfo: true
  },
  {
  key: "employment_type",
  label: "Employment Type",
  type: "select",
  options: [
      { value: "", label: "Select..." },
      { value: 1, label: "Salaried" },
      { value: 2, label: "Self-Employed" }
    ]
  }
];

function GaugeArc({ value, color }) {
  const pct = Math.min(Math.max(value, 0), 100);
  const r = 70;
  const cx = 90, cy = 90;
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;
  const totalArc = endAngle - startAngle;
  const fillAngle = startAngle + (pct / 100) * totalArc;

  const toXY = (angle) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  const start = toXY(startAngle);
  const end = toXY(endAngle);
  const fill = toXY(fillAngle);
  // const largeArc = pct > 50 ? 1 : 0;
  const fillLargeArc = (fillAngle - startAngle) > Math.PI ? 1 : 0;

  return (
    <svg width="180" height="110" viewBox="0 0 180 110">
      {/* Track */}
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`}
        fill="none"
        stroke="#1e293b"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Fill */}
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${fillLargeArc} 1 ${fill.x} ${fill.y}`}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
      <text x="90" y="88" textAnchor="middle" fill={color} fontSize="22" fontWeight="800" fontFamily="'DM Mono', monospace">
        {pct}%
      </text>
    </svg>
  );
}

function RiskBar({ score }) {
  const zones = [
    { label: "LOW", color: "#10b981", max: 33 },
    { label: "MED", color: "#f59e0b", max: 66 },
    { label: "HIGH", color: "#ef4444", max: 100 },
  ];
  const zone = score <= 33 ? zones[0] : score <= 66 ? zones[1] : zones[2];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, letterSpacing: 2, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>
        <span>LOW</span><span>MEDIUM</span><span>HIGH</span>
      </div>
      <div style={{ background: "#0f172a", borderRadius: 8, height: 12, overflow: "hidden", border: "1px solid #1e293b" }}>
        <div style={{
          width: `${score}%`,
          height: "100%",
          background: `linear-gradient(90deg, #10b981, ${zone.color})`,
          borderRadius: 8,
          boxShadow: `0 0 12px ${zone.color}88`,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)"
        }} />
      </div>
      <div style={{ marginTop: 8, textAlign: "right", fontSize: 13, color: zone.color, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>
        RISK: {score}/100 — {zone.label}
      </div>
    </div>
  );
}

export default function LoanPredictor() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

const handleSubmit = async () => {
  setLoading(true);
  setResult(null);

  try {
    const payload = {
      age: Number(form.age),
      income: Number(form.income),
      credit_score: Number(form.credit_score),
      loan_amount: Number(form.loan_amount),
      existing_loans: Number(form.existing_loans),
      spending_ratio: Number(form.spending_ratio),
      employment_type: Number(form.employment_type),
    };

    const res = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();
    setResult(data);
    setSubmitted(true);

  } catch (e) {
    console.error("Backend error:", e);
  }

  setLoading(false);
};
  const approved = result?.prediction === "Approved";
  // const accentColor = result ? (approved ? "#10b981" : "#ef4444") : "#38bdf8";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #020b18;
          min-height: 100vh;
          font-family: 'Instrument Sans', sans-serif;
          color: #e2e8f0;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .scanline {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
          z-index: 1;
          opacity: 0.3;
        }

        .glow-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        .wrap {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        .header {
          text-align: center;
          margin-bottom: 48px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.25);
          color: #38bdf8;
          padding: 4px 14px;
          border-radius: 999px;
          font-size: 11px;
          letter-spacing: 3px;
          font-family: 'DM Mono', monospace;
          margin-bottom: 20px;
        }

        .badge::before {
          content: '';
          width: 6px; height: 6px;
          background: #38bdf8;
          border-radius: 50%;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -2px;
          background: linear-gradient(135deg, #f8fafc 30%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          margin-top: 12px;
          color: #475569;
          font-size: 15px;
          letter-spacing: 0.5px;
        }

        .card {
          background: rgba(15,23,42,0.8);
          border: 1px solid #1e293b;
          border-radius: 20px;
          backdrop-filter: blur(20px);
          padding: 40px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent);
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: #38bdf8;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(56,189,248,0.3), transparent);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-size: 11px;
          letter-spacing: 2px;
          color: #64748b;
          font-family: 'DM Mono', monospace;
          text-transform: uppercase;
        }
        .info-icon {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: #00e0ff;
          color: #000;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          border-radius: 50%;
          cursor: pointer;
        }

        .tooltip {
          visibility: hidden;
          width: 230px;
          background-color: #111827;
          color: #fff;
          text-align: left;
          border-radius: 6px;
          padding: 8px;
          position: absolute;
          z-index: 10;
          top: 125%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .info-icon:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }

        .input-wrap {
          position: relative;
        }

        .prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #38bdf8;
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          pointer-events: none;
        }

        input, select {
          width: 100%;
          background: #0a1628;
          border: 1px solid #1e293b;
          color: #e2e8f0;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Mono', monospace;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }

        input:focus, select:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.1), inset 0 0 20px rgba(56,189,248,0.03);
        }

        input.has-prefix { padding-left: 30px; }

        select option { background: #0a1628; }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          border: none;
          border-radius: 14px;
          color: #020b18;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          box-shadow: 0 0 40px rgba(56,189,248,0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(56,189,248,0.5);
        }

        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .submit-btn .spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(2,11,24,0.3);
          border-top-color: #020b18;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 10px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Result card */
        .result-card {
          animation: slideUp 0.6s cubic-bezier(0.4,0,0.2,1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .verdict {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 36px;
        }

        .verdict-icon {
          width: 72px; height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          flex-shrink: 0;
          animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .verdict-text h2 {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .verdict-text p {
          font-size: 13px;
          color: #64748b;
          margin-top: 4px;
          font-family: 'DM Mono', monospace;
        }

        .metrics-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .metric-box {
          background: #060f1e;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .metric-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: #475569;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .explanation-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .explanation-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #060f1e;
          border: 1px solid #1e293b;
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.5;
        }

        .explanation-list li::before {
          content: '›';
          color: #38bdf8;
          font-size: 18px;
          line-height: 1;
          flex-shrink: 0;
        }

        .reset-btn {
          background: transparent;
          border: 1px solid #1e293b;
          color: #64748b;
          padding: 12px 28px;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 2px;
          transition: all 0.2s;
          margin-top: 24px;
        }

        .reset-btn:hover {
          border-color: #38bdf8;
          color: #38bdf8;
        }

        .demo-note {
          background: rgba(245,158,11,0.05);
          border: 1px solid rgba(245,158,11,0.15);
          color: #92400e;
          border-radius: 10px;
          padding: 12px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          color: #d97706;
          text-align: center;
          margin-top: 16px;
        }

        @media (max-width: 600px) {
          .metrics-row { grid-template-columns: 1fr; }
          .card { padding: 24px; }
        }
      `}</style>

      <div className="bg-grid" />
      <div className="scanline" />
      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(56,189,248,0.06)", top: -100, left: -100 }} />
      <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(139,92,246,0.05)", bottom: 0, right: -50 }} />

      <div className="wrap">
        {/* Header */}
        <div className="header">
          <div className="badge">ML MODEL v2.1 · ACTIVE</div>
          <h1>LOAN INTELLIGENCE</h1>
          <p className="subtitle">AI-powered credit risk assessment · Instant decisions</p>
        </div>

        {!submitted ? (
          /* ── FORM ── */
          <div className="card">
            <div className="section-label">01 / APPLICANT PROFILE</div>
            <div className="form-grid">
              {fields.map(f => (
                <div className="field" key={f.key}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {f.label}

                  {f.hasInfo && (
                    <span className="info-icon">
                      i
                      <span className="tooltip">
                          Spending Ratio = Monthly expenses ÷ Monthly income.
                          Example: If you earn ₹50,000 and spend ₹20,000,
                          your ratio is 0.4. Lower is better.
                      </span>
                    </span>
                    )}
                  </label>
                  <div className="input-wrap">
                    {f.prefix && <span className="prefix">{f.prefix}</span>}
                    {f.type === "select" ? (
                      <select value={form[f.key] ?? ""} onChange={e => handleChange(f.key, e.target.value)}>
                        {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    ) : (
                      <input
                        type={f.type}
                        className={f.prefix ? "has-prefix" : ""}
                        placeholder={f.placeholder}
                        value={form[f.key] ?? ""}
                        onChange={e => handleChange(f.key, e.target.value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? <><span className="spinner" />ANALYZING...</> : "ANALYZE APPLICATION →"}
              </button>
              {/* <div className="demo-note">⚡ If backend unavailable, demo mode activates automatically</div> */}
            </div>
          </div>
        ) : (
          /* ── RESULT ── */
          <div className="card result-card">
            <div className="section-label">02 / DECISION OUTPUT</div>

            {/* Verdict */}
            <div className="verdict">
              <div className="verdict-icon" style={{
                background: approved ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                border: `1px solid ${approved ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                boxShadow: `0 0 30px ${approved ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)"}`,
              }}>
                {approved ? "✅" : "❌"}
              </div>
              <div className="verdict-text">
                <h2 style={{ color: approved ? "#10b981" : "#ef4444" }}>
                  LOAN {result?.prediction?.toUpperCase()}
                </h2>
                <p>Application processed · {new Date().toLocaleString()}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="metrics-row">
              <div className="metric-box">
                <div className="metric-label">Approval Probability</div>
                <GaugeArc value={result?.probability} color={approved ? "#10b981" : "#ef4444"} />
              </div>
              <div className="metric-box">
                <div className="metric-label">Risk Assessment</div>
                <div style={{ width: "100%", paddingTop: 16 }}>
                  <RiskBar score={result?.risk_score} />
                </div>
              </div>
            </div>

            {/* Explanation */}
            {result?.explanation?.length > 0 && (
              <>
                <div className="section-label" style={{ marginBottom: 16 }}>03 / FACTOR ANALYSIS</div>
                <ul className="explanation-list">
                  {result.explanation.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </>
            )}

            <div style={{ textAlign: "center" }}>
              <button className="reset-btn" onClick={() => { setResult(null); setSubmitted(false); setForm({}); }}>
                ← NEW APPLICATION
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
