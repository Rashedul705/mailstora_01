"use client";

import "./CaseStudyEditor.css";

export type CaseStudy = {
    enabled: boolean;
    headline: string;
    seoTitle: string;
    seoDescription: string;
    summary: string;
    challenge: string;
    solution: string;
    approach: string; // one step per line
    results: string; // one per line: "value | label"
    duration: string;
    testimonialQuote: string;
    testimonialAuthor: string;
    testimonialRole: string;
};

type Props = { value: CaseStudy; onChange: (next: CaseStudy) => void; slug: string; title: string; client: string; cover?: string };
// The story fields of a case study. Publishing is controlled by the page's status, so `enabled` is always true here.

const toRows = (s = "") => s.split("\n").map((l) => l.split("|").map((x) => x.trim())).filter((r) => r[0] || r[1]).map(([value = "", label = ""]) => ({ value, label }));
const fromRows = (rows: { value: string; label: string }[]) => rows.map((r) => `${r.value} | ${r.label}`).join("\n");
const toSteps = (s = "") => s.split("\n").map((l) => l.trim()).filter(Boolean);

export default function CaseStudyEditor({ value: cs, onChange, slug, title, client, cover }: Props) {
    const set = <K extends keyof CaseStudy>(k: K, v: CaseStudy[K]) => onChange({ ...cs, [k]: v });
    const results = toRows(cs.results);
    const steps = toSteps(cs.approach);
    const setResults = (rows: { value: string; label: string }[]) => set("results", fromRows(rows));
    const setSteps = (list: string[]) => set("approach", list.join("\n"));

    // What makes a case study complete, in order of importance
    const checks: [string, boolean][] = [
        ["Headline", !!cs.headline.trim()],
        ["Summary", cs.summary.trim().length >= 60],
        ["Challenge", cs.challenge.trim().length >= 60],
        ["Solution", cs.solution.trim().length >= 60],
        ["At least 2 results", results.filter((r) => r.value && r.label).length >= 2],
        ["3+ process steps", steps.length >= 3],
        ["SEO title", cs.seoTitle.trim().length > 0 && cs.seoTitle.length <= 60],
        ["Client quote", !!cs.testimonialQuote.trim()],
    ];
    const score = Math.round((checks.filter(([, ok]) => ok).length / checks.length) * 100);
    const seoTitle = cs.seoTitle || `${client} Case Study | MailStora`;
    const seoDesc = cs.seoDescription || cs.summary;
    const counter = (n: number, max: number) => <span className={`cse-count ${n > max ? "is-over" : ""}`}>{n}/{max}</span>;

    return (
        <section className="ed-section cse">
            <div className="cse-head">
                <div>
                    <h2>📚 THE STORY</h2>
                    <p>Shown at <code>/case-studies/{slug || "slug"}/</code>. Use real facts and results only.</p>
                </div>
            </div>

            {cs.enabled && (
                <>
                    {/* completeness + live link */}
                    <div className="cse-status">
                        <div className="cse-meter">
                            <div className="cse-meter-top"><strong>Completeness</strong><span>{score}%</span></div>
                            <div className="cse-bar"><span style={{ width: `${score}%`, background: score >= 80 ? "#16a34a" : score >= 50 ? "#f59e0b" : "#ef4444" }} /></div>
                            <ul>{checks.map(([l, ok]) => <li key={l} className={ok ? "ok" : ""}>{ok ? "✓" : "○"} {l}</li>)}</ul>
                        </div>
                        {slug && <a className="cse-view" href={`/case-studies/${slug}/`} target="_blank" rel="noreferrer">View live case study ↗</a>}
                    </div>

                    {/* 1. Story */}
                    <div className="cse-group">
                        <h3><span>1</span> The story</h3>
                        <div className="form-group"><label>Headline <small>The outcome, e.g. &ldquo;How Canadian Choice fixed Outlook rendering&rdquo;</small></label>
                            <input type="text" value={cs.headline} onChange={(e) => set("headline", e.target.value)} placeholder={`How ${client || "the client"} …`} /></div>
                        <div className="form-group"><label>Summary {counter(cs.summary.length, 220)} <small>Two sentences: the problem and the result</small></label>
                            <textarea rows={2} value={cs.summary} onChange={(e) => set("summary", e.target.value)} /></div>
                        <div className="form-grid-2">
                            <div className="form-group"><label>The challenge</label><textarea rows={5} value={cs.challenge} onChange={(e) => set("challenge", e.target.value)} placeholder="What was broken or missing, and why it mattered" /></div>
                            <div className="form-group"><label>The solution</label><textarea rows={5} value={cs.solution} onChange={(e) => set("solution", e.target.value)} placeholder="What MailStora built and how it solved it" /></div>
                        </div>
                    </div>

                    {/* 2. Results */}
                    <div className="cse-group">
                        <h3><span>2</span> Results</h3>
                        <p className="cse-help">Shown as big numbers at the top of the page. First result is the headline number.</p>
                        {results.map((r, i) => (
                            <div className="cse-row" key={i}>
                                <input className="cse-value" value={r.value} placeholder="38%" onChange={(e) => setResults(results.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
                                <input value={r.label} placeholder="Open rate" onChange={(e) => setResults(results.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
                                <button type="button" className="cse-icon" title="Move up" disabled={i === 0} onClick={() => { const n = [...results]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setResults(n); }}>↑</button>
                                <button type="button" className="cse-icon cse-del" title="Remove" onClick={() => setResults(results.filter((_, j) => j !== i))}>✕</button>
                            </div>
                        ))}
                        <button type="button" className="cse-add" onClick={() => setResults([...results, { value: "", label: "" }])}>+ Add result</button>
                        <div className="form-group" style={{ marginTop: 16, maxWidth: 260 }}><label>Project duration</label><input type="text" value={cs.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 3 days" /></div>
                    </div>

                    {/* 3. Process */}
                    <div className="cse-group">
                        <h3><span>3</span> How we did it</h3>
                        {steps.map((st, i) => (
                            <div className="cse-row" key={i}>
                                <span className="cse-step">{i + 1}</span>
                                <input value={st} onChange={(e) => setSteps(steps.map((x, j) => (j === i ? e.target.value : x)))} />
                                <button type="button" className="cse-icon" title="Move up" disabled={i === 0} onClick={() => { const n = [...steps]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setSteps(n); }}>↑</button>
                                <button type="button" className="cse-icon cse-del" title="Remove" onClick={() => setSteps(steps.filter((_, j) => j !== i))}>✕</button>
                            </div>
                        ))}
                        <button type="button" className="cse-add" onClick={() => setSteps([...steps, "New step"])}>+ Add step</button>
                    </div>

                    {/* 4. Quote */}
                    <div className="cse-group">
                        <h3><span>4</span> Client quote <small>optional, with permission</small></h3>
                        <div className="form-group"><textarea rows={3} value={cs.testimonialQuote} onChange={(e) => set("testimonialQuote", e.target.value)} placeholder="What the client said about the project" /></div>
                        <div className="form-grid-2">
                            <div className="form-group"><label>Name</label><input type="text" value={cs.testimonialAuthor} onChange={(e) => set("testimonialAuthor", e.target.value)} /></div>
                            <div className="form-group"><label>Role and company</label><input type="text" value={cs.testimonialRole} onChange={(e) => set("testimonialRole", e.target.value)} /></div>
                        </div>
                    </div>

                    {/* 5. SEO */}
                    <div className="cse-group">
                        <h3><span>5</span> Search appearance</h3>
                        <div className="form-group"><label>SEO title {counter(cs.seoTitle.length, 60)}</label><input type="text" value={cs.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} placeholder={`${client} Case Study: … | MailStora`} /></div>
                        <div className="form-group"><label>SEO description {counter(cs.seoDescription.length, 160)} <small>Blank uses the summary</small></label><textarea rows={2} value={cs.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} /></div>
                        <div className="cse-google">
                            <small>mailstora.com › case-studies › {slug}</small>
                            <strong>{seoTitle.length > 60 ? seoTitle.slice(0, 60) + "…" : seoTitle}</strong>
                            <p>{seoDesc.length > 160 ? seoDesc.slice(0, 160) + "…" : seoDesc || "Add a summary or SEO description."}</p>
                        </div>
                    </div>

                    {/* Card preview */}
                    <div className="cse-group">
                        <h3><span>👁</span> Card preview</h3>
                        <div className="cse-card">
                            {cover ? <img src={cover} alt="" /> : <div className="cse-card-empty">Cover image</div>}
                            <div>
                                <p className="cse-card-client">{client || "Client"}</p>
                                <strong>{cs.headline || title || "Case study headline"}</strong>
                                <div className="cse-card-results">
                                    {results.filter((r) => r.value).slice(0, 3).map((r) => <span key={r.label + r.value}><b>{r.value}</b>{r.label}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
