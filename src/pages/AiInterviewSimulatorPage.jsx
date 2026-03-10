import { useState, useEffect, useRef } from 'react';
import { Mic, Briefcase, Star, Clock, AlertCircle, Play, Square, CheckCircle, Award, Target, ChevronRight, TrendingUp } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';

// Mock Questions Database
const MOCK_QUESTIONS = {
    'Frontend Developer': [
        "Bize biraz kendinden ve en gurur duyduğun Frontend projenden bahseder misin?",
        "React'te state yönetimi için hangi yaklaşımları tercih ediyorsun? Redux, Context API veya Zustand arasında nasıl seçim yaparsın?",
        "Eğer çok yavaş yüklenen bir sayfayı optimize etmen istenseydi, hangi adımları izlerdin?"
    ],
    'Backend Developer': [
        "Kariyerinden kısaca bahsedip odaklandığın dilleri anlatır mısın?",
        "Bir yüksek trafikli e-ticaret sitesi için veritabanı seçerken nelere dikkat edersin? SQL ve NoSQL kararı nasıl alınır?",
        "Mikroservis mimarisinde servisler arası iletişimi güvenli ve hızlı şekilde nasıl kurgularsın?"
    ],
    'Genel (İK)': [
        "Bize kendinden ve son iş deneyiminden bahseder misin?",
        "Neden mülakat yaptığımız bu pozisyona ve şirketimize başvurdun?",
        "Zorlandığın bir durumu ve bununla nasıl başa çıktığını anlatır mısın?"
    ]
};

export default function AiInterviewSimulatorPage() {
    const [step, setStep] = useState('setup'); // setup | instruction | interviewing | results
    const [config, setConfig] = useState({ role: '', experience: 'Mid-Level', type: 'Teknik' });
    const [questions, setQuestions] = useState([]);
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [evaluation, setEvaluation] = useState(null);

    const timerRef = useRef(null);

    // Setup Mock Options
    const roles = ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Data Scientist', 'Genel (İK)', 'Ürün Yöneticisi'];
    const levels = ['Junior', 'Mid-Level', 'Senior'];
    const types = ['Teknik', 'İnsan Kaynakları', 'Vaka (Case Study)'];

    const startInterview = () => {
        let q = MOCK_QUESTIONS[config.role] || MOCK_QUESTIONS['Genel (İK)'];
        setQuestions(q);
        setStep('instruction');
    };

    const beginQuestions = () => {
        setStep('interviewing');
        setCurrentQIdx(0);
        setAnswers([]);
    };

    const toggleRecording = () => {
        if (isRecording) {
            // Stop
            clearInterval(timerRef.current);
            setIsRecording(false);
            setAnswers([...answers, { question: questions[currentQIdx], time: recordingTime }]);
            setRecordingTime(0);

            if (currentQIdx < questions.length - 1) {
                setCurrentQIdx(currentQIdx + 1);
            } else {
                finishInterview();
            }
        } else {
            // Start
            setIsRecording(true);
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
    };

    const finishInterview = () => {
        setStep('evaluating');
        // Simulate Evaluation delay
        setTimeout(() => {
            setEvaluation({
                score: 82,
                clarity: 85,
                structure: 75,
                confidence: 90,
                technical: 80,
                feedback: [
                    "Kendinizi ifade ederken oldukça net ve özgüvenliydiniz.",
                    "Teknik sorularda genel yaklaşımlarınız doğru ancak daha derin örneklere yer verebilirsiniz.",
                    "Cevaplarınızı STAR metodolojisine göre biraz daha yapılandırmanız faydalı olacaktır."
                ]
            });
            setStep('results');
        }, 2000);
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />
            <Breadcrumbs items={[{ label: 'AI Mülakat Simülasyonu', to: '/ai-interview' }]} />

            <div style={{ maxWidth: step === 'setup' || step === 'results' ? '1000px' : '800px', margin: '60px auto', padding: '0 24px' }}>

                {/* STEP 1: SETUP */}
                {step === 'setup' && (
                    <div className="animate-in">
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                                <Mic size={14} style={{ marginRight: '6px' }} /> Simulator
                            </div>
                            <h1 className="section-title">Yeni Mülakat Oluştur</h1>
                            <p className="section-sub">Profilinize ve hedefinize uygun özel AI mülakat oturumunuzu başlatın.</p>
                        </div>

                        <div className="card glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                            <div>
                                <label className="input-label">Mülakat Pozisyonu</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                                    {roles.map(r => (
                                        <button key={r} onClick={() => setConfig({ ...config, role: r })}
                                            style={{
                                                padding: '16px', borderRadius: '12px', border: `2px solid ${config.role === r ? 'var(--accent)' : 'var(--border)'}`,
                                                background: config.role === r ? 'var(--accent-glow)' : 'var(--bg-secondary)', color: 'var(--text-primary)',
                                                fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px'
                                            }}>
                                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid', borderColor: config.role === r ? 'var(--accent)' : 'var(--text-muted)', background: config.role === r ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {config.role === r && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                                            </div>
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <div>
                                    <label className="input-label">Tecrübe Seviyesi</label>
                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        {levels.map(l => (
                                            <button key={l} onClick={() => setConfig({ ...config, experience: l })} className={config.experience === l ? 'btn btn-primary' : 'btn btn-secondary'}>
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="input-label">Mülakat Türü</label>
                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        {types.map(t => (
                                            <button key={t} onClick={() => setConfig({ ...config, type: t })} className={config.type === t ? 'btn btn-primary' : 'btn btn-secondary'}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginTop: 'auto', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <AlertCircle size={18} color="var(--accent)" /> Simülasyon Detayları
                                    </h4>
                                    <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <li>Mülakat ses veya yazılı olarak gerçekleştirilebilir (Geçici MVP metot).</li>
                                        <li>Süreç yaklaşık 5-10 dakika sürecektir.</li>
                                        <li>Sessiz bir ortamda bulunmanız tavsiye edilir.</li>
                                    </ul>
                                </div>
                                <button className="btn btn-primary" style={{ padding: '16px', fontSize: '16px' }} onClick={startInterview} disabled={!config.role}>
                                    Hazırım, Başla <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: INSTRUCTION */}
                {step === 'instruction' && (
                    <div className="animate-in" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-glow)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mic size={36} color="var(--accent)" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Mülakat Başlıyor</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
                            Sisteme {config.role} - {config.experience} rolü için bağlandınız. Size sırasıyla {questions.length} adet soru yönelteceğiz.
                            Mikrofon izni verdikten sonra ilk soruyu yanıtlamaya başlayabilirsiniz.
                        </p>
                        <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }} onClick={beginQuestions}>
                            Anladım, Sıradaki Soru <Play size={18} fill="currentColor" />
                        </button>
                    </div>
                )}

                {/* STEP 3: INTERVIEWING */}
                {step === 'interviewing' && (
                    <div className="animate-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="badge badge-accent">Soru {currentQIdx + 1}/{questions.length}</div>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{config.role} Mülakatı</span>
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: isRecording ? 'var(--danger)' : 'var(--text-primary)' }}>
                                {formatTime(recordingTime)}
                            </div>
                        </div>

                        <div className="card glass-card" style={{ padding: '48px', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '48px', maxWidth: '80%' }}>
                                "{questions[currentQIdx]}"
                            </h2>

                            {isRecording && (
                                <div className="loading-pulse" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', marginBottom: '24px', fontWeight: 600 }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} /> Size Dinleniyorsunuz...
                                </div>
                            )}

                            <button
                                className="btn"
                                onClick={toggleRecording}
                                style={{
                                    padding: '20px 40px',
                                    borderRadius: '99px',
                                    fontSize: '18px',
                                    backgroundColor: isRecording ? 'var(--danger)' : 'var(--accent)',
                                    color: 'white',
                                    gap: '12px',
                                    boxShadow: isRecording ? '0 10px 30px rgba(239, 68, 68, 0.4)' : '0 10px 30px var(--accent-glow)'
                                }}
                            >
                                {isRecording ? (
                                    <><Square size={20} fill="currentColor" /> Kaydı Durdur ve Gönder</>
                                ) : (
                                    <><Mic size={20} /> Kayda Başla ve Cevapla</>
                                )}
                            </button>
                            <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                {isRecording ? "Cevabınızı bitirdiğinizde durdur butonuna basınız." : "Gerçekçi bir deneyim için mikrofonunuzu açın ve sesli yanıt verin."}
                            </p>
                        </div>
                    </div>
                )}

                {/* STEP 4: EVALUATING LOADING */}
                {step === 'evaluating' && (
                    <div className="animate-in" style={{ textAlign: 'center', paddingTop: '100px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid var(--border)', borderTopColor: 'var(--accent)', animation: 'spin 1s linear infinite', margin: '0 auto 32px' }} />
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Yapay Zeka Yanıtlarınızı Analiz Ediyor...</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Ses tonunuz, yapısal bütünlüğünüz ve sektörel yetkinliğiniz değerlendiriliyor.</p>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {/* STEP 5: RESULTS */}
                {step === 'results' && evaluation && (
                    <div className="animate-in">
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <div className="badge badge-success" style={{ marginBottom: '16px', background: 'var(--success)', color: '#000' }}>
                                <CheckCircle size={14} style={{ marginRight: '6px' }} /> Değerlendirme Tamamlandı
                            </div>
                            <h1 className="section-title">Mülakat Sonuç Raporunuz</h1>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                            {/* Score Card */}
                            <div className="card glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(180deg, var(--bg-card) 0%, rgba(109, 93, 252, 0.05) 100%)' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '24px' }}>Genel AI Skoru</h3>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '160px', height: '160px', marginBottom: '24px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border)" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray={`${evaluation.score}, 100`} />
                                    </svg>
                                    <div style={{ position: 'absolute', fontSize: '48px', fontWeight: 800, color: 'var(--text-primary)' }}>{evaluation.score}</div>
                                </div>
                                <div className="badge badge-accent"><Award size={14} /> Lider Aday</div>
                            </div>

                            {/* Details Matrix */}
                            <div className="card glass-card">
                                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Target size={20} color="var(--accent)" /> Performans Kırılımları
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {[
                                        { label: 'İletişim ve Netlik', score: evaluation.clarity, color: '#3b82f6' },
                                        { label: 'STAR Metodu ve Yapı', score: evaluation.structure, color: '#f59e0b' },
                                        { label: 'Özgüven ve Tonlama', score: evaluation.confidence, color: '#10b981' },
                                        { label: 'Teknik Doğruluk', score: evaluation.technical, color: '#8b5cf6' }
                                    ].map(metric => (
                                        <div key={metric.label}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                                                <span>{metric.label}</span>
                                                <span>{metric.score}/100</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${metric.score}%`, background: metric.color }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Feedback */}
                            <div className="card glass-card" style={{ gridColumn: '1 / -1' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TrendingUp size={20} color="var(--success)" /> Gelişim Alanları ve Geri Bildirim
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {evaluation.feedback.map((item, idx) => (
                                        <div key={idx} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start', borderLeft: '4px solid var(--accent)' }}>
                                            <Star size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                                    <button className="btn btn-primary" onClick={() => setStep('setup')}>
                                        Yeni Mülakat Başlat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
