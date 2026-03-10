import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = ['Metin Yapıştır', 'PDF Yükle', 'Görsel Yükle'];

export default function CVUploadPage({ sessionData, updateSession }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [pastedText, setPastedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filename, setFilename] = useState('');
    const fileRef = useRef();
    const imageRef = useRef();

    const handleSkip = () => {
        updateSession({ cvText: '' });
        navigate('/rol');
    };

    const handleTextContinue = () => {
        updateSession({ cvText: pastedText });
        navigate('/rol');
    };

    const handleFileUpload = async (file, type) => {
        if (!file) return;
        setLoading(true);
        setError('');
        setFilename(file.name);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        try {
            const res = await fetch('/api/extract-cv', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success && data.text) {
                updateSession({ cvText: data.text });
                navigate('/rol');
            } else {
                setError('CV tam olarak okunamadı. Dilerseniz CV olmadan devam edebilirsiniz.');
            }
        } catch {
            setError('Dosya yüklenirken bir sorun oluştu. Dilerseniz manuel devam edebilirsiniz.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '20px 40px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '18px' }}>
                    mülakat<span style={{ color: 'var(--accent)' }}>.com</span>
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['CV', 'Rol', 'Mülakat', 'Sonuç'].map((s, i) => (
                        <div key={s} style={{
                            padding: '4px 14px', borderRadius: '999px', fontSize: '13px',
                            background: i === 0 ? 'var(--accent-glow)' : 'transparent',
                            color: i === 0 ? 'var(--accent)' : 'var(--text-muted)',
                            border: i === 0 ? '1px solid rgba(108,99,255,0.3)' : 'none',
                        }}>{s}</div>
                    ))}
                </div>
            </div>

            {/* Progress */}
            <div className="progress-bar" style={{ borderRadius: 0 }}>
                <div className="progress-fill" style={{ width: '25%' }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                    <div style={{ marginBottom: '36px' }}>
                        <div className="badge badge-accent" style={{ marginBottom: '16px' }}>Adım 1 / 4</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>CV'nizi yükleyin</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}>
                            CV'nizi yüklerseniz mülakat ve rapor kişiselleştirilir. İsterseniz bu adımı atlayabilirsiniz.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '4px' }}>
                        {TABS.map((tab, i) => (
                            <button key={tab} className={`tab-btn${activeTab === i ? ' active' : ''}`} onClick={() => { setActiveTab(i); setError(''); setFilename(''); }}
                                style={{ flex: 1, fontSize: '13px' }}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab: Text */}
                    {activeTab === 0 && (
                        <div className="animate-in">
                            <textarea
                                className="textarea"
                                placeholder="CV metninizi buraya yapıştırın..."
                                value={pastedText}
                                onChange={e => setPastedText(e.target.value)}
                                style={{ minHeight: '260px', marginBottom: '16px' }}
                            />
                            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}
                                onClick={handleTextContinue} disabled={!pastedText.trim()}>
                                Devam Et →
                            </button>
                        </div>
                    )}

                    {/* Tab: PDF */}
                    {activeTab === 1 && (
                        <div className="animate-in">
                            <div
                                onClick={() => fileRef.current?.click()}
                                style={{
                                    border: '2px dashed var(--border)', borderRadius: '12px', padding: '60px 24px',
                                    textAlign: 'center', cursor: 'pointer', marginBottom: '16px',
                                    transition: 'all 0.2s ease',
                                    background: filename ? 'rgba(108,99,255,0.05)' : 'transparent',
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                                {filename ? (
                                    <p style={{ color: 'var(--success)', fontWeight: 600 }}>✓ {filename}</p>
                                ) : (
                                    <>
                                        <p style={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '8px' }}>PDF dosyanızı buraya tıklayarak seçin</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Desteklenen: .pdf</p>
                                    </>
                                )}
                            </div>
                            <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }}
                                onChange={e => e.target.files[0] && handleFileUpload(e.target.files[0], 'pdf')} />
                            {loading && <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '12px' }} className="loading-pulse">CV okunuyor...</div>}
                        </div>
                    )}

                    {/* Tab: Image */}
                    {activeTab === 2 && (
                        <div className="animate-in">
                            <div
                                onClick={() => imageRef.current?.click()}
                                style={{
                                    border: '2px dashed var(--border)', borderRadius: '12px', padding: '60px 24px',
                                    textAlign: 'center', cursor: 'pointer', marginBottom: '16px',
                                    transition: 'all 0.2s ease',
                                    background: filename ? 'rgba(108,99,255,0.05)' : 'transparent',
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖼️</div>
                                {filename ? (
                                    <p style={{ color: 'var(--success)', fontWeight: 600 }}>✓ {filename}</p>
                                ) : (
                                    <>
                                        <p style={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '8px' }}>CV görselini buraya tıklayarak seçin</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Desteklenen: jpg, jpeg, png</p>
                                    </>
                                )}
                            </div>
                            <input ref={imageRef} type="file" accept=".jpg,.jpeg,.png,image/*" style={{ display: 'none' }}
                                onChange={e => e.target.files[0] && handleFileUpload(e.target.files[0], 'image')} />
                            {loading && <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '12px' }} className="loading-pulse">Görsel işleniyor...</div>}
                        </div>
                    )}

                    {error && (
                        <div style={{
                            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                            borderRadius: '10px', padding: '14px 18px', marginBottom: '16px',
                            color: '#f59e0b', fontSize: '14px',
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <button className={error ? "btn btn-secondary" : "btn btn-ghost"} style={{ width: '100%', marginTop: '8px' }} onClick={handleSkip}>
                        {error ? 'CV Olmadan Devam Et →' : 'Şimdilik geç →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
