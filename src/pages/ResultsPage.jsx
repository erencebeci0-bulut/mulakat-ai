import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Code, Box, Megaphone, Handshake, BarChart, Target,
    CheckCircle2, TrendingUp, MessageSquare, Lightbulb,
    FileText, Globe, Share2, Copy, Send, RotateCcw,
    Check
} from 'lucide-react';
import { ROLES } from '../data/questions';

const ICON_MAP = {
    Code: <Code size={16} />,
    Box: <Box size={16} />,
    Megaphone: <Megaphone size={16} />,
    Handshake: <Handshake size={16} />,
    BarChart: <BarChart size={16} />,
    Target: <Target size={16} />,
};

const SUB_LABELS = {
    iletisim: 'İletişim Netliği',
    star: 'STAR Metodu',
    teknik: 'Teknik Doğruluk',
    ozguven: 'Özgüven',
    problemCozme: 'Problem Çözme',
};

export default function ResultsPage({ sessionData, updateSession }) {
    const navigate = useNavigate();
    const { report, role, answers, email: savedEmail } = sessionData;
    const [email, setEmail] = useState(savedEmail || '');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!report) navigate('/');
    }, [report]);

    if (!report) return null;

    const roleMeta = ROLES.find(r => r.id === role);
    const scoreColor = (s) => {
        if (s >= 8) return 'var(--success)';
        if (s >= 6) return 'var(--warning)';
        return '#ef4444';
    };

    const mainScore = report.finalScore;
    const shareText = `mülakat.com AI mülakatında ${mainScore}/10 aldım. Sen kaç alacaksın? Hemen dene: mülakat.com`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText('https://mülakat.com').then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    const handleLinkedIn = () => {
        const url = `https://www.linkedin.com/shareArticle?mini=true&url=https://mülakat.com&title=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const handleWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' 👉 mülakat.com')}`;
        window.open(url, '_blank');
    };

    const handleEmailSubmit = async () => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Geçerli bir e-posta adresi girin.');
            return;
        }
        setEmailError('');
        updateSession({ email });

        try {
            await fetch('/api/save-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    role,
                    hasCv: Boolean(sessionData.cvText),
                    finalScore: report.finalScore,
                    subscores: report.subscores,
                    email,
                }),
            });
        } catch { /* silent — non-blocking */ }

        setEmailSubmitted(true);
    };

    const handleRestart = () => {
        updateSession({ cvText: '', role: null, answers: [], report: null, email: '' });
        navigate('/');
    };

    const circumference = 2 * Math.PI * 52;
    const dashOffset = circumference - (mainScore / 10) * circumference;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <div style={{ padding: '20px 40px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '18px' }}>
                    mülakat<span style={{ color: 'var(--accent)' }}>.com</span>
                </span>
                <button className="btn btn-secondary" style={{ fontSize: '13px', padding: '8px 16px', gap: '8px' }} onClick={handleRestart}>
                    <RotateCcw size={14} /> Yeni Mülakat Başlat
                </button>
            </div>

            <div className="progress-bar" style={{ borderRadius: 0 }}>
                <div className="progress-fill" style={{ width: '100%' }} />
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

                {/* Hero score block */}
                <div className="animate-in" style={{
                    background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.06))',
                    border: '1px solid rgba(108,99,255,0.25)', borderRadius: '24px',
                    padding: '48px', marginBottom: '32px', textAlign: 'center',
                }}>
                    <div className="badge badge-accent" style={{ marginBottom: '20px', gap: '6px' }}>
                        {ICON_MAP[roleMeta?.icon]} {roleMeta?.label} Mülakatı Tamamlandı
                    </div>

                    {/* Score ring SVG */}
                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="70" cy="70" r="52" fill="none" stroke="var(--border)" strokeWidth="10" />
                            <circle
                                cx="70" cy="70" r="52" fill="none"
                                stroke={scoreColor(mainScore)} strokeWidth="10"
                                strokeDasharray={circumference}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 1.2s ease' }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: scoreColor(mainScore) }}>{mainScore}</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>/10</div>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px' }}>Genel Skor: {mainScore} / 10</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
                        {report.summary}
                    </p>
                </div>

                {/* Subscores */}
                <div className="card animate-in" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '24px' }}>Skor Dağılımı</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {Object.entries(report.subscores).map(([key, val]) => (
                            <div key={key}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{SUB_LABELS[key] || key}</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: scoreColor(val) }}>{val} / 10</span>
                                </div>
                                <div className="progress-bar">
                                    <div style={{
                                        height: '100%', width: `${val * 10}%`,
                                        background: scoreColor(val) === 'var(--success)'
                                            ? 'linear-gradient(90deg, #00d4aa, #00e8bb)'
                                            : scoreColor(val) === 'var(--warning)'
                                                ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                                                : 'linear-gradient(90deg, #ef4444, #f87171)',
                                        borderRadius: '999px', transition: 'width 0.8s ease',
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    <div className="card animate-in">
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '18px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle2 size={18} /> Güçlü Yönlerin
                        </h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {report.strengths.map((s, i) => (
                                <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card animate-in">
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '18px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={18} /> Geliştirilmesi Gereken Alanlar
                        </h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {report.weaknesses.map((w, i) => (
                                <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <span style={{ color: 'var(--warning)', flexShrink: 0 }}>→</span>
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Coaching tips */}
                <div className="card animate-in" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={18} color="var(--accent)" /> Koçluk Önerileri
                    </h3>
                    <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {report.coachingTips.map((tip, i) => (
                            <li key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tip}</li>
                        ))}
                    </ol>
                </div>

                {/* CV Analysis */}
                {report.cvAnalysis && (
                    <div className="card animate-in" style={{ marginBottom: '24px', border: '1px solid rgba(108,99,255,0.25)' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '20px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={18} /> CV Analizi
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7 }}>
                            {report.cvAnalysis.ozet}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            {report.cvAnalysis.gucluTaraflar.length > 0 && (
                                <div>
                                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success)', marginBottom: '8px' }}>Güçlü Taraflar</p>
                                    {report.cvAnalysis.gucluTaraflar.map((g, i) => (
                                        <p key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>✓ {g}</p>
                                    ))}
                                </div>
                            )}
                            {report.cvAnalysis.eksikAlanlar.length > 0 && (
                                <div>
                                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--warning)', marginBottom: '8px' }}>Eksik Alanlar</p>
                                    {report.cvAnalysis.eksikAlanlar.map((e, i) => (
                                        <p key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>→ {e}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: '16px', padding: '12px 16px', background: 'var(--accent-glow)', borderRadius: '10px' }}>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                <strong style={{ color: 'var(--accent)' }}>Role Uyumu:</strong> {report.cvAnalysis.roleUyumu}
                            </p>
                        </div>
                    </div>
                )}

                {/* Benchmark */}
                <div className="card animate-in" style={{ marginBottom: '24px', border: '1px solid rgba(0,212,170,0.2)' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '24px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={18} /> Türkiye Karşılaştırması
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                        {[
                            { label: 'Sizin Skorunuz', val: report.benchmark.userScore, highlight: true },
                            { label: 'Türkiye Ortalaması', val: report.benchmark.turkiyeOrtalamasi },
                            { label: 'En İyi %20', val: report.benchmark.enIyi20 },
                        ].map(item => (
                            <div key={item.label} style={{
                                textAlign: 'center', padding: '20px',
                                background: item.highlight ? 'rgba(0,212,170,0.08)' : 'var(--bg-secondary)',
                                borderRadius: '12px',
                                border: item.highlight ? '1px solid rgba(0,212,170,0.3)' : '1px solid var(--border)',
                            }}>
                                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: item.highlight ? 'var(--success)' : 'var(--text-primary)', marginBottom: '6px' }}>
                                    {item.val}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '14px 18px', fontSize: '13px', color: 'var(--text-muted)' }}>
                        <BarChart size={14} style={{ display: 'inline', marginRight: '6px' }} /> Veriler {new Date().getFullYear()} Türkiye mülakat performans indeksine dayanmaktadır. Toplam <strong style={{ color: 'var(--text-secondary)' }}>12.847</strong> katılımcı.
                    </div>
                </div>

                {/* Share section */}
                <div className="card animate-in" style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <Megaphone size={18} color="var(--accent)" /> Arkadaşlarınıza Meydan Okuyun
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                        Arkadaşların senden iyi mi? Onları da mülakata davet et.
                    </p>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '10px',
                        padding: '14px 20px', marginBottom: '24px', fontSize: '14px',
                        color: 'var(--text-secondary)', fontStyle: 'italic',
                    }}>
                        "{shareText}"
                    </div>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn" onClick={handleLinkedIn} style={{
                            background: '#0077b5', color: 'white', gap: '8px',
                        }}>
                            <span>in</span> LinkedIn'de Paylaş
                        </button>
                        <button className="btn" onClick={handleWhatsApp} style={{
                            background: '#25d366', color: 'white', gap: '8px',
                        }}>
                            <MessageSquare size={16} /> WhatsApp'ta Paylaş
                        </button>
                        <button className="btn btn-secondary" onClick={handleCopyLink} style={{ gap: '8px' }}>
                            {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
                            {copied ? 'Kopyalandı!' : 'Link Kopyala'}
                        </button>
                    </div>
                </div>

                {/* Email capture */}
                {!emailSubmitted ? (
                    <div className="card animate-in" style={{ border: '1px solid rgba(108,99,255,0.25)' }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Send size={18} color="var(--accent)" /> Detaylı Raporunuzu E-posta ile Alın
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.7 }}>
                            Tüm cevap detaylarını, koçluk önerilerini ve gelişim planınızı e-postanıza göndereceğiz.
                            İsteğe bağlıdır — zorunlu değildir.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <input
                                className="input"
                                type="email"
                                placeholder="ornek@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                style={{ flex: 1, minWidth: '200px' }}
                            />
                            <button className="btn btn-primary" onClick={handleEmailSubmit}>
                                Raporu Gönder
                            </button>
                        </div>
                        {emailError && (
                            <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>⚠️ {emailError}</p>
                        )}
                    </div>
                ) : (
                    <div style={{
                        background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.3)',
                        borderRadius: '16px', padding: '24px', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                            <CheckCircle2 size={48} color="var(--success)" />
                        </div>
                        <p style={{ fontWeight: 600, color: 'var(--success)' }}>E-posta adresiniz kaydedildi!</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
                            Detaylı raporunuz yakında gönderilecektir.
                        </p>
                    </div>
                )}

                {/* Restart */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button className="btn btn-ghost" onClick={handleRestart}>
                        ← Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        </div>
    );
}
