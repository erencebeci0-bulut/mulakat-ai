import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageSquare, AlertCircle, Target, CheckCircle, Lock, Play, Zap, ShieldAlert, Cpu } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { ROLES, QUESTIONS, STATIC_SUGGESTIONS } from '../data/questions';
import { scoreAnswer } from '../services/scoringService';

export default function AiInterviewSimulatorPage() {
    const navigate = useNavigate();

    // Core State
    const [step, setStep] = useState('setup'); // setup | interviewing | results
    const [selectedRole, setSelectedRole] = useState('');
    const [questionsList, setQuestionsList] = useState([]);
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [answer, setAnswer] = useState('');

    // Bot / Spam Protection State
    const [submitting, setSubmitting] = useState(false);
    const [lastSubmitTime, setLastSubmitTime] = useState(0);
    const [cooldown, setCooldown] = useState(0);
    const [spamWarning, setSpamWarning] = useState('');
    const honeypotRef = useRef(null);
    const [previousAnswers, setPreviousAnswers] = useState(new Set());

    // AI Control State
    const [aiCallCount, setAiCallCount] = useState(0);
    const MAX_AI_CALLS = 3;
    const [currentSuggestion, setCurrentSuggestion] = useState(null);
    const [answersPayload, setAnswersPayload] = useState([]);

    // Cooldown Timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const startInterview = () => {
        if (!selectedRole) return;
        const qList = QUESTIONS[selectedRole] || QUESTIONS.genel;
        // Shuffle and pick 5 questions for a session
        const shuffled = [...qList].sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestionsList(shuffled);
        setStep('interviewing');
        setCurrentQIdx(0);
        setAiCallCount(0);
        setAnswersPayload([]);
        setPreviousAnswers(new Set());
    };

    const handleAnswerSubmit = async () => {
        if (submitting) return;
        setSpamWarning('');

        // 1. Honeypot check (Bot protection)
        if (honeypotRef.current && honeypotRef.current.value !== '') {
            setSpamWarning('Güvenlik ihlali tespit edildi.');
            return;
        }

        // 2. Cooldown check
        const now = Date.now();
        if (now - lastSubmitTime < 5000) { // 5 second cooldown
            setCooldown(Math.ceil((5000 - (now - lastSubmitTime)) / 1000));
            setSpamWarning('Çok hızlı işlem yapıyorsunuz. Lütfen bekleyin.');
            return;
        }

        // 3. Validation checks
        const trimmed = answer.trim();
        if (trimmed.length < 15) {
            setSpamWarning('Cevabınız analiz için çok kısa. Lütfen detaylandırın.');
            return;
        }

        // 4. Duplicate spam check
        const normalizedAnswer = trimmed.toLowerCase();
        if (previousAnswers.has(normalizedAnswer)) {
            setSpamWarning('Bu cevabı zaten gönderdiniz. Lütfen farklı bir cevap yazın.');
            return;
        }

        setSubmitting(true);
        setLastSubmitTime(now);
        setPreviousAnswers(new Set(previousAnswers).add(normalizedAnswer));

        // Simulate network/latency for AI
        await new Promise(r => setTimeout(r, 1200));

        let suggestionText = '';
        let suggestionType = 'ai';

        // Cost Control: Limit AI Calls
        if (aiCallCount < MAX_AI_CALLS) {
            // Fake AI Call using local rule-based engine to keep cost 0
            const result = scoreAnswer(trimmed, selectedRole, questionsList[currentQIdx].type);
            suggestionText = result.suggestion || "Cevabınızı daha detaylı ve duruma özel bir örnekle destekleyebilirsiniz.";
            setAiCallCount(prev => prev + 1);
        } else {
            // Rate limit reached -> Fallback to Static
            suggestionType = 'static';
            suggestionText = STATIC_SUGGESTIONS[Math.floor(Math.random() * STATIC_SUGGESTIONS.length)];
        }

        const answerRecord = {
            questionId: questionsList[currentQIdx].id,
            questionText: questionsList[currentQIdx].text,
            answer: trimmed,
            aiSuggestion: suggestionText,
            suggestionType
        };

        setAnswersPayload([...answersPayload, answerRecord]);
        setCurrentSuggestion(suggestionText);
        setSubmitting(false);
    };

    const handleNextQuestion = () => {
        if (currentQIdx + 1 >= questionsList.length) {
            finishInterview();
        } else {
            setCurrentQIdx(i => i + 1);
            setAnswer('');
            setCurrentSuggestion(null);
        }
    };

    const finishInterview = () => {
        setStep('results');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <SEOHead
                title="Yapay Zeka Mülakat Simülatörü"
                description="Türkiye'nin ücretsiz yapay zeka mülakat motoru. Sektörüne uygun mülakat sorularıyla yeteneklerini test et."
                url="https://mülakat.com/ai-interview"
            />
            <NavBar />

            {step === 'setup' && (
                <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px' }}>
                    <div className="animate-in" style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                            <Zap size={14} style={{ marginRight: '6px' }} /> Text Simulator Engine
                        </div>
                        <h1 className="section-title">AI Mülakat Simülasyonu</h1>
                        <p className="section-sub">Ücretsiz mülakat pratiği yapın. Ağır AI analizleri yerine hızlı ve etkili geri bildirimlerle mülakat kaslarınızı güçlendirin.</p>
                    </div>

                    <div className="card glass-card animate-in">
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px' }}>Mülakat Kategorisi Seçin</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            {ROLES.map(r => (
                                <button key={r.id} onClick={() => setSelectedRole(r.id)}
                                    style={{
                                        padding: '16px', borderRadius: '12px', border: `2px solid ${selectedRole === r.id ? 'var(--accent)' : 'var(--border)'}`,
                                        background: selectedRole === r.id ? 'var(--accent-glow)' : 'var(--bg-secondary)', color: 'var(--text-primary)',
                                        fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px'
                                    }}>
                                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid', borderColor: selectedRole === r.id ? 'var(--accent)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {selectedRole === r.id && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '15px' }}>{r.label}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400, marginTop: '4px' }}>{r.description}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px' }}>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <ShieldAlert size={14} /> Spam koruması aktiftir
                            </div>
                            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }} disabled={!selectedRole} onClick={startInterview}>
                                Mülakata Başla <Play size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 'interviewing' && questionsList.length > 0 && (
                <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                                Soru {currentQIdx + 1} / {questionsList.length}
                            </span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Cpu size={14} /> AI Yardım Hakkı: <strong style={{ color: 'var(--text-primary)' }}>{MAX_AI_CALLS - aiCallCount} kaldı</strong>
                        </div>
                    </div>

                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${((currentQIdx) / questionsList.length) * 100}%` }} />
                    </div>

                    <div className="card glass-card animate-in" style={{ marginTop: '32px', padding: '40px' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '32px' }}>
                            {questionsList[currentQIdx].text}
                        </h3>

                        {/* Hidden Honeypot for Bot Protection */}
                        <div style={{ display: 'none' }} aria-hidden="true">
                            <input type="text" ref={honeypotRef} tabIndex="-1" autoComplete="off" />
                        </div>

                        {!currentSuggestion ? (
                            <div>
                                <textarea
                                    className="textarea"
                                    placeholder="Cevabınızı detaylı olarak buraya yazın..."
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}
                                    style={{ minHeight: '180px', marginBottom: '16px', fontSize: '15px' }}
                                    disabled={submitting || cooldown > 0}
                                />

                                {spamWarning && (
                                    <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <AlertCircle size={16} /> {spamWarning}
                                    </div>
                                )}

                                <button className="btn btn-primary" onClick={handleAnswerSubmit} disabled={!answer.trim() || submitting || cooldown > 0} style={{ width: '100%', padding: '16px' }}>
                                    {submitting ? 'Değerlendiriliyor...' : cooldown > 0 ? `Lütfen Bekleyin (${cooldown}s)` : 'Cevabı Gönder'}
                                </button>
                            </div>
                        ) : (
                            <div className="animate-in">
                                <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px' }}>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Sizin Cevabınız:</div>
                                    <div style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6 }}>{answer}</div>
                                </div>

                                <div style={{ background: 'var(--accent-glow)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(108,99,255,0.3)', marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--accent)', marginBottom: '12px' }}>
                                        <MessageSquare size={16} /> İyileştirme Önerisi
                                    </div>
                                    <div style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                        {currentSuggestion}
                                    </div>
                                </div>

                                <button className="btn btn-primary" onClick={handleNextQuestion} style={{ width: '100%', padding: '16px' }}>
                                    {currentQIdx + 1 >= questionsList.length ? 'Analizi Tamamla 🏁' : 'Sonraki Soruya Geç →'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {step === 'results' && (
                <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px' }}>
                    <div className="card glass-card animate-in" style={{ textAlign: 'center', padding: '60px 40px' }}>
                        <div style={{ display: 'inline-flex', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,212,170,0.2), rgba(0,212,170,0))', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                            <CheckCircle size={40} color="var(--success)" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Mülakat Pratiği Tamamlandı</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6, marginBottom: '40px' }}>
                            Harika bir iş çıkardın! Mülakat sorularına yanıt vererek çok önemli bir pratik yaptın.
                        </p>

                        {/* SaaS Up-Sell Call to Action */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(108,99,255,0.02))', border: '1px solid rgba(108,99,255,0.3)', borderRadius: '24px', padding: '40px', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Daha Detaylı AI Mülakat Analizi İster misiniz?</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                Özel mülakat koçunuzla derinlemesine geri bildirim, skorlama, yüz ifadeleri analizi ve tam simülasyon deneyimini yaşayın.
                            </p>
                            <button className="btn btn-primary" onClick={() => window.location.href = 'https://mulakatim.com'} style={{ fontSize: '16px', padding: '16px 32px' }}>
                                AI Mülakat Koçunu Dene →
                            </button>
                        </div>

                        <button className="btn btn-secondary" onClick={() => setStep('setup')} style={{ border: 'none', background: 'transparent' }}>
                            Yeni Bir Pratik Başlat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
