import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Box, Megaphone, Handshake, BarChart, Target, MessageSquare, Lightbulb, Zap, Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { QUESTIONS, ROLES } from '../data/questions';
import { scoreAnswer, generateFinalReport } from '../services/scoringService';

const ICON_MAP = {
    Code: <Code size={16} />,
    Box: <Box size={16} />,
    Megaphone: <Megaphone size={16} />,
    Handshake: <Handshake size={16} />,
    BarChart: <BarChart size={16} />,
    Target: <Target size={16} />,
};

const TYPE_LABELS = {
    intro: 'Giriş Sorusu',
    behavioral: 'Davranışsal Soru',
    role: 'Rol Sorusu',
    problem: 'Problem Çözme',
    closing: 'Kapanış Sorusu',
};

const TYPE_COLORS = {
    intro: '#6c63ff',
    behavioral: '#00d4aa',
    role: '#f59e0b',
    problem: '#ef4444',
    closing: '#8b5cf6',
};

export default function InterviewPage({ sessionData, updateSession }) {
    const navigate = useNavigate();
    const { role, cvText } = sessionData;
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [submittedAnswers, setSubmittedAnswers] = useState([]);
    const [currentFeedback, setCurrentFeedback] = useState(null);
    const [phase, setPhase] = useState('answering'); // 'answering' | 'evaluating' | 'feedback'
    const textareaRef = useRef();

    useEffect(() => {
        if (!role) navigate('/rol');
    }, [role]);

    useEffect(() => {
        if (phase === 'answering' && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [phase, questionIndex]);

    if (!role) return null;

    const questions = QUESTIONS[role] || QUESTIONS.genel;
    const currentQuestion = questions[questionIndex];
    const progress = ((questionIndex) / questions.length) * 100;
    const roleMeta = ROLES.find(r => r.id === role);

    const handleEvaluate = async () => {
        if (!answer.trim()) return;
        setPhase('evaluating');

        // Simulated AI delay for better UX
        await new Promise(r => setTimeout(r, 1200));

        const result = scoreAnswer(answer, role, currentQuestion.type);
        const answerObj = {
            questionId: currentQuestion.id,
            questionText: currentQuestion.text,
            questionType: currentQuestion.type,
            answerText: answer,
            score: result.score,
            feedback: result.feedback,
            suggestion: result.suggestion,
            breakdown: result.breakdown,
        };

        const newAnswers = [...submittedAnswers, answerObj];
        setSubmittedAnswers(newAnswers);
        setCurrentFeedback(result);
        setPhase('feedback');

        // If all questions answered, generate report
        if (newAnswers.length >= questions.length) {
            const report = generateFinalReport(newAnswers, role, cvText);
            updateSession({ answers: newAnswers, report });
        }
    };

    const handleNext = () => {
        if (questionIndex + 1 >= questions.length) {
            navigate('/sonuc');
            return;
        }
        setQuestionIndex(i => i + 1);
        setAnswer('');
        setCurrentFeedback(null);
        setPhase('answering');
    };

    const scoreColor = (s) => {
        if (s >= 8) return 'var(--success)';
        if (s >= 6) return 'var(--warning)';
        return '#ef4444';
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '16px 40px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '18px' }}>
                    mülakat<span style={{ color: 'var(--accent)' }}>.com</span>
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {ICON_MAP[roleMeta?.icon]} {roleMeta?.label}
                    </span>
                    <div style={{
                        background: 'var(--accent-glow)', border: '1px solid rgba(108,99,255,0.3)',
                        borderRadius: '999px', padding: '4px 14px', fontSize: '13px', color: 'var(--accent)', fontWeight: 600,
                    }}>
                        Soru {questionIndex + 1} / {questions.length}
                    </div>
                </div>
            </div>

            <div className="progress-bar" style={{ borderRadius: 0 }}>
                <div className="progress-fill" style={{ width: `${progress + (100 / questions.length)}%` }} />
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '48px 24px' }}>
                <div style={{ width: '100%', maxWidth: '720px' }}>

                    {/* Step dots */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '40px', justifyContent: 'center' }}>
                        {questions.map((_, i) => (
                            <div key={i} className={`step-dot ${i < questionIndex ? 'completed' : i === questionIndex ? 'active' : ''}`} />
                        ))}
                    </div>

                    {/* Question card */}
                    <div className="card animate-in" style={{ marginBottom: '24px', padding: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <span style={{
                                display: 'inline-flex', padding: '4px 12px', borderRadius: '999px',
                                fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px',
                                background: `${TYPE_COLORS[currentQuestion.type]}18`,
                                color: TYPE_COLORS[currentQuestion.type],
                                border: `1px solid ${TYPE_COLORS[currentQuestion.type]}40`,
                            }}>
                                {TYPE_LABELS[currentQuestion.type]}
                            </span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                                Soru {questionIndex + 1} / {questions.length}
                            </span>
                        </div>
                        <p style={{ fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.75, color: 'var(--text-primary)' }}>
                            {currentQuestion.text}
                        </p>
                    </div>

                    {/* Answer / Feedback area */}
                    {phase === 'answering' && (
                        <div className="animate-in">
                            <textarea
                                ref={textareaRef}
                                className="textarea"
                                placeholder="Cevabınızı buraya yazın... (Minimum 2-3 cümle yazmanızı öneririz)"
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                style={{ minHeight: '180px', marginBottom: '16px' }}
                            />
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', fontSize: '15px', padding: '15px', opacity: answer.trim() ? 1 : 0.4 }}
                                onClick={handleEvaluate}
                                disabled={!answer.trim()}
                            >
                                Cevabı Değerlendir →
                            </button>
                        </div>
                    )}

                    {phase === 'evaluating' && (
                        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }} className="loading-pulse">
                            <div style={{ fontSize: '40px', marginBottom: '16px', display: 'flex', justifyContent: 'center', color: 'var(--accent)' }}>
                                <Zap size={48} />
                            </div>
                            <p style={{ fontSize: '16px', fontWeight: 500 }}>Cevabınız değerlendiriliyor...</p>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>Bu birkaç saniye sürebilir</p>
                        </div>
                    )}

                    {phase === 'feedback' && currentFeedback && (
                        <div className="animate-in">
                            {/* Score card */}
                            <div style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px',
                                padding: '28px', marginBottom: '16px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Değerlendirme</h3>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        background: `${scoreColor(currentFeedback.score)}18`,
                                        border: `1px solid ${scoreColor(currentFeedback.score)}40`,
                                        borderRadius: '10px', padding: '8px 16px',
                                    }}>
                                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: scoreColor(currentFeedback.score) }}>
                                            {currentFeedback.score}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>/10</span>
                                    </div>
                                </div>

                                {/* Breakdown mini bars */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                                    {[
                                        { key: 'clarity', label: 'Açıklık' },
                                        { key: 'structure', label: 'Yapı' },
                                        { key: 'relevance', label: 'Alaka' },
                                        { key: 'example', label: 'Örnek' },
                                    ].map(({ key, label }) => (
                                        <div key={key}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</span>
                                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                                    {currentFeedback.breakdown[key]}/10
                                                </span>
                                            </div>
                                            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%', width: `${currentFeedback.breakdown[key] * 10}%`,
                                                    background: scoreColor(currentFeedback.breakdown[key]), borderRadius: '2px',
                                                    transition: 'width 0.6s ease',
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MessageSquare size={14} color="var(--accent)" /> Geri Bildirim
                                    </p>
                                    <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.7 }}>{currentFeedback.feedback}</p>
                                </div>
                                <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '14px' }}>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Lightbulb size={14} /> Gelişim Önerisi
                                    </p>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{currentFeedback.suggestion}</p>
                                </div>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', fontSize: '15px', padding: '15px' }} onClick={handleNext}>
                                {questionIndex + 1 >= questions.length ? '🏁 Sonuçları Gör' : 'Sonraki Soru →'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
