'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ICONS, SERVICES, QS, DEADLINE, BUDGET } from '@/lib/quoteConfig';
import { siteConfig } from '../../utils/siteConfig';
import './quote.css';

const Icon = ({ name, style = {} }: { name: string, style?: any }) => {
    const raw = ICONS[name];
    if (!raw) return null;
    return <svg className="quote-i" viewBox="0 0 24 24" aria-hidden="true" style={style} dangerouslySetInnerHTML={{ __html: raw }} />;
};

export default function QuoteClient() {
    const searchParams = useSearchParams();
    
    const [step, setStep] = useState(1);
    const [service, setService] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [files, setFiles] = useState<Record<string, File | null>>({});
    const [fileNames, setFileNames] = useState<Record<string, string>>({});
    const [deadline, setDeadline] = useState('');
    const [budget, setBudget] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
    const [errors, setErrors] = useState<{ name?: string; email?: string; submit?: string }>({});

    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const s = searchParams.get('service');
        if (s && SERVICES.find(x => x.id === s)) {
            setService(s);
            setStep(2);
        }
    }, [searchParams]);

    const focusTitle = () => {
        setTimeout(() => {
            if (titleRef.current) titleRef.current.focus({ preventScroll: true });
            if (formRef.current) {
                const r = formRef.current.getBoundingClientRect();
                if (r.top < 0) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 10);
    };

    const go = (n: number) => {
        setStep(n);
        focusTitle();
    };

    const selectService = (id: string) => {
        if (service !== id) {
            setService(id);
            setAnswers({});
            setFiles({});
            setFileNames({});
        }
        setTimeout(() => go(2), 180);
    };

    const toggleMulti = (key: string, val: string) => {
        const arr = answers[key] || [];
        const ix = arr.indexOf(val);
        if (ix > -1) {
            setAnswers({ ...answers, [key]: arr.filter((x: string) => x !== val) });
        } else {
            setAnswers({ ...answers, [key]: [...arr, val] });
        }
    };

    const setSingle = (key: string, val: string) => {
        setAnswers({ ...answers, [key]: answers[key] === val ? '' : val });
    };

    const handleFile = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert('File is too large (max 10MB)');
                return;
            }
            setFiles({ ...files, [key]: file });
            setFileNames({ ...fileNames, [key]: file.name });
        } else {
            const newFiles = { ...files }; delete newFiles[key];
            const newNames = { ...fileNames }; delete newNames[key];
            setFiles(newFiles); setFileNames(newNames);
        }
    };

    const validateAndSend = async () => {
        const errs: any = {};
        if (!name.trim()) errs.name = 'Enter your name so we know who to reply to.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Enter a valid email, like you@company.com.';
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setStatus('sending');

        try {
            // 1. Upload files first
            const attachmentUrls: string[] = [];
            for (const key of Object.keys(files)) {
                if (files[key]) {
                    const fd = new FormData();
                    fd.append('image', files[key] as File);
                    // Use the existing ImgBB route for file uploads
                    const upRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/upload-imgbb`, {
                        method: 'POST',
                        body: fd
                    });
                    if (upRes.ok) {
                        const upData = await upRes.json();
                        if (upData.imageUrl) {
                            attachmentUrls.push(upData.imageUrl);
                            // Store the URL in answers so it's part of the summary if needed
                            answers[key + '_file'] = upData.imageUrl;
                        }
                    }
                }
            }

            // 2. Submit Quote
            const payload = {
                service,
                answers,
                deadline,
                budget,
                name,
                email,
                whatsapp,
                attachments: attachmentUrls,
                sourcePage: window.location.href,
                honeypot: '' // Spam protection
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/quotes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to submit quote');

            setStatus('done');
            focusTitle();

            // Analytics event
            if ((window as any).dataLayer) {
                (window as any).dataLayer.push({ event: 'quote_submitted', service });
            }

        } catch (e) {
            console.error(e);
            setErrors({ submit: 'Something went wrong. Please try again or use WhatsApp.' });
            setStatus('idle');
        }
    };

    const resetForm = () => {
        setStep(1);
        setService(null);
        setAnswers({});
        setFiles({});
        setFileNames({});
        setDeadline('');
        setBudget('');
        setName('');
        setEmail('');
        setWhatsapp('');
        setStatus('idle');
        setErrors({});
        focusTitle();
    };

    const activeSvc = service ? SERVICES.find(s => s.id === service) : null;
    const questions = activeSvc ? QS[activeSvc.id] : [];

    const briefRows = () => {
        const rows: string[][] = [];
        if (!activeSvc) return rows;
        rows.push(['Service', activeSvc.name]);
        questions.forEach(q => {
            if (q.key === 'notes') return;
            let val = answers[q.key];
            if (q.type === 'multi' && val?.length) val = val.join(', ');
            if (q.attach && fileNames[q.key]) val = (val ? val + ' + ' : '') + fileNames[q.key];
            if (val) rows.push([q.label.replace(/\?$/, ''), val]);
        });
        if (answers.notes) rows.push(['Notes', answers.notes]);
        if (deadline) rows.push(['Deadline', deadline]);
        if (budget) rows.push(['Budget', budget]);
        return rows;
    };

    return (
        <div className="quote-page">
            

            

            <div className="quote-wrap">
                <div className="quote-main">
                    <div className="quote-card quote-form" aria-labelledby="formTitle" ref={formRef}>
                        <div className="quote-form-inner">
                        
                        {status !== 'done' && (
                            <div className="quote-stepper">
                                <ol>
                                    <li className={step === 1 ? 'on' : 'done'}><span>{step > 1 ? <Icon name="check" style={{width:'14px',height:'14px',strokeWidth:3}}/> : '1'}</span><b>Service</b></li>
                                    <li className={step === 2 ? 'on' : step > 2 ? 'done' : ''}><span>{step > 2 ? <Icon name="check" style={{width:'14px',height:'14px',strokeWidth:3}}/> : '2'}</span><b>Project details</b></li>
                                    <li className={step === 3 ? 'on' : ''}><span>3</span><b>Timeline and contact</b></li>
                                </ol>
                                <div className="quote-bar" role="progressbar" aria-label="Form progress" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
                                    <i style={{ width: `${Math.round(step / 3 * 100)}%` }}></i>
                                </div>
                            </div>
                        )}

                        {status === 'done' ? (
                            <div className="quote-step quote-done">
                                <div className="big"><Icon name="check" style={{width:'28px',height:'28px',strokeWidth:2.6}}/></div>
                                <h2 id="formTitle" tabIndex={-1} ref={titleRef}>Thanks, {name.split(' ')[0]}. Your request is in.</h2>
                                <p>We will reply to {email} within 2 to 4 hours, and you will get a clear price and timeline within 24 hours. A copy of your request is on its way to your inbox.</p>
                                <div className="rec">
                                    <dl>
                                        {briefRows().map((r, i) => (
                                            <div key={i}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>
                                        ))}
                                    </dl>
                                </div>
                                <div className="row">
                                    <a className="quote-btn-wa" href={`https://wa.me/${siteConfig.founder.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                        <Icon name="send" />Message us on WhatsApp
                                    </a>
                                    <button type="button" className="quote-btn quote-btn-ghost" onClick={resetForm}>Send another request</button>
                                </div>
                            </div>
                        ) : step === 1 ? (
                            <div className="quote-step">
                                <h2 id="formTitle" tabIndex={-1} ref={titleRef}>What do you need help with?</h2>
                                <p className="sub">Pick one. You can mention others in the details.</p>
                                {Array.from(new Set(SERVICES.map(s => s.group))).map(g => (
                                    <React.Fragment key={g}>
                                        <h3 className="quote-group">{g}</h3>
                                        <div className="quote-cards">
                                            {SERVICES.filter(s => s.group === g).map(s => (
                                                <button key={s.id} type="button" className="quote-svc" aria-pressed={service === s.id} onClick={() => selectService(s.id)}>
                                                    <span className="ic"><Icon name={s.icon} /></span>
                                                    <span className="txt"><strong>{s.name}</strong><small>{s.desc}</small></span>
                                                    <span className="tick"><Icon name="tick" style={{width:'12px',height:'12px',strokeWidth:3}}/></span>
                                                </button>
                                            ))}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : step === 2 ? (
                            <div className="quote-step">
                                <h2 id="formTitle" tabIndex={-1} ref={titleRef}>Tell us about your {activeSvc?.name.toLowerCase()} project</h2>
                                <p className="sub">Skip anything you are not sure about. We will ask later.</p>
                                
                                {questions.map(q => (
                                    <div className="quote-q" key={q.key}>
                                        {q.type === 'single' || q.type === 'multi' ? (
                                            <>
                                                <span className="quote-ql" id={`l_${q.key}`}>{q.label} <em>(optional)</em></span>
                                                <div className="quote-chips" role="group" aria-labelledby={`l_${q.key}`}>
                                                    {q.opts.map((o: string) => {
                                                        const on = q.type === 'multi' ? (answers[q.key] || []).includes(o) : answers[q.key] === o;
                                                        return (
                                                            <button key={o} type="button" className="quote-chip" aria-pressed={on} 
                                                                onClick={() => q.type === 'multi' ? toggleMulti(q.key, o) : setSingle(q.key, o)}>
                                                                {o}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        ) : q.type === 'link' ? (
                                            <>
                                                <label className="quote-ql" htmlFor={`f_${q.key}`}>{q.label} <em>(optional)</em></label>
                                                <input className="quote-field" id={`f_${q.key}`} type="text" placeholder={q.ph} value={answers[q.key] || ''} onChange={e => setAnswers({...answers, [q.key]: e.target.value})} />
                                                {q.attach && (
                                                    <label className="quote-attach">
                                                        <Icon name="clip" />
                                                        <span>{fileNames[q.key] || 'Or attach a file'}</span>
                                                        <input type="file" onChange={(e) => handleFile(q.key, e)} accept=".pdf,.png,.jpg,.jpeg,.zip,.fig,.psd" />
                                                    </label>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <label className="quote-ql" htmlFor={`f_${q.key}`}>{q.label} <em>(optional)</em></label>
                                                <textarea className="quote-field" id={`f_${q.key}`} placeholder={q.ph} value={answers[q.key] || ''} onChange={e => setAnswers({...answers, [q.key]: e.target.value})}></textarea>
                                            </>
                                        )}
                                    </div>
                                ))}

                                <div className="quote-nav">
                                    <button type="button" className="quote-btn quote-btn-ghost" onClick={() => go(1)}>Back</button>
                                    <button type="button" className="quote-btn quote-btn-primary" onClick={() => go(3)}>Continue</button>
                                </div>
                            </div>
                        ) : (
                            <div className="quote-step">
                                <h2 id="formTitle" tabIndex={-1} ref={titleRef}>When do you need it, and where do we reply?</h2>
                                <p className="sub">Rough answers are fine. The quote will confirm everything.</p>
                                
                                <div className="quote-q">
                                    <span className="quote-ql" id="l_deadline">Deadline <em>(optional)</em></span>
                                    <div className="quote-chips" role="group" aria-labelledby="l_deadline">
                                        {DEADLINE.map(o => (
                                            <button key={o} type="button" className="quote-chip" aria-pressed={deadline === o} onClick={() => setDeadline(deadline === o ? '' : o)}>{o}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="quote-q">
                                    <span className="quote-ql" id="l_budget">Budget range <em>(optional)</em></span>
                                    <div className="quote-chips" role="group" aria-labelledby="l_budget">
                                        {BUDGET.map(o => (
                                            <button key={o} type="button" className="quote-chip" aria-pressed={budget === o} onClick={() => setBudget(budget === o ? '' : o)}>{o}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="quote-two">
                                    <div className="quote-q">
                                        <label className="quote-ql" htmlFor="c_name">Your name</label>
                                        <input className={`quote-field ${errors.name ? 'bad' : ''}`} id="c_name" type="text" autoComplete="name" placeholder="Your name" value={name} onChange={e => {setName(e.target.value); setErrors({...errors, name: ''})}} />
                                        {errors.name && <span className="quote-err">{errors.name}</span>}
                                    </div>
                                    <div className="quote-q">
                                        <label className="quote-ql" htmlFor="c_email">Email</label>
                                        <input className={`quote-field ${errors.email ? 'bad' : ''}`} id="c_email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={e => {setEmail(e.target.value); setErrors({...errors, email: ''})}} />
                                        {errors.email && <span className="quote-err">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="quote-q">
                                    <label className="quote-ql" htmlFor="c_wa">WhatsApp number <em>(optional, for faster replies)</em></label>
                                    <input className="quote-field" id="c_wa" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                                </div>

                                {errors.submit && <div className="quote-err" style={{marginBottom: '1rem'}}>{errors.submit}</div>}

                                <div className="quote-nav">
                                    <button type="button" className="quote-btn quote-btn-ghost" onClick={() => go(2)} disabled={status === 'sending'}>Back</button>
                                    <button type="button" className="quote-btn quote-btn-primary" onClick={validateAndSend} disabled={status === 'sending'}>
                                        {status === 'sending' ? 'Sending...' : 'Send my request'}
                                    </button>
                                </div>
                                <p className="quote-fine">We only use your details to reply to this request. You will also get a copy by email.</p>
                            </div>
                        )}

                        </div>
                    </div>

                    <aside className="quote-side" aria-label="Quote details">
                        <div className="quote-panel">
                            <h3>What happens next</h3>
                            <ul>
                                <li><Icon name="check" /><span>Rashedul replies personally within 2 to 4 hours.</span></li>
                                <li><Icon name="check" /><span>You get a clear price and timeline within 24 hours.</span></li>
                                <li><Icon name="check" /><span>No obligation. Say no and nothing happens.</span></li>
                            </ul>
                            <div className="price"><strong>Custom HTML emails from $40</strong>Hand-coded and tested in 50+ email clients.</div>
                            <div className="rate"><span className="quote-stars" aria-hidden="true">★★★★★</span><span>4.8/5 from 152 reviews on Upwork</span></div>
                        </div>
                        <div className="quote-brief" aria-live="polite">
                            <h3>Your request so far</h3>
                            {briefRows().length === 0 ? (
                                <p className="empty">Your answers appear here as you go, so you can see exactly what we will receive.</p>
                            ) : (
                                <dl>
                                    {briefRows().map((r, i) => (
                                        <div key={i}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>
                                    ))}
                                </dl>
                            )}
                        </div>
                    </aside>
                </div>

            </div>

            

            
        </div>
    );
}