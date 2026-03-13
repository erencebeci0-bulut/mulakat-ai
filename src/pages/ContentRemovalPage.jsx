import { useState } from 'react';
import { ShieldAlert, Send, CheckCircle } from 'lucide-react';
import NavBar from '../components/NavBar';
import { validateContentSafety, checkRateLimit } from '../utils/security';

export default function ContentRemovalPage() {
    const [formData, setFormData] = useState({ url: '', reason: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Rate Limit Check
        if (!checkRateLimit('content_removal_request', 60000)) {
            setErrorMsg('Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyip tekrar deneyin.');
            setStatus('error');
            return;
        }

        // 2. Anti-Spam Check (Profanity in reason)
        const safetyCheck = validateContentSafety(formData.reason);
        if (!safetyCheck.isValid) {
            setErrorMsg('Talebiniz otomatik spam/küfür filtresine takıldı. Lütfen uygun bir dille tekrar yazın.');
            setStatus('error');
            return;
        }

        setStatus('submitting');

        // Simulate backend submission to Moderation Queue
        setTimeout(() => {
            console.log('[Mock Moderation Queue] New Removal Request:', formData);
            setStatus('success');
            setFormData({ url: '', reason: '' });
        }, 1200);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />
            <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert size={24} color="var(--danger)" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>İçerik Kaldırma Talebi</h1>
                </div>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
                    Mülakat.com topluluk odaklı bir veri platformudur. Kişisel verilerinizi ihlal ettiğini
                    veya şirketiniz hakkında uygunsuz içerik barındırdığını düşündüğünüz sayfaları veya yorumları
                    kontrol ekibimize bildirebilirsiniz. Talepleriniz 48 saat içinde incelenir.<br /><br />
                    Ayrıca bize doğrudan <strong>hello@mulakatim.com</strong> adresinden e-posta yoluyla da ulaşabilirsiniz.
                </p>

                {status === 'success' ? (
                    <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                        <CheckCircle size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Talebiniz Alındı</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            İlgili bağlantıyı inceleyip en kısa sürede moderasyon işlemini gerçekleştireceğiz.
                            Desteğiniz için teşekkür ederiz.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label className="input-label">Şikayet Edilen Sayfa URL'si (Zorunlu)</label>
                            <input
                                type="url"
                                required
                                className="input"
                                placeholder="https://mülakat.com/..."
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="input-label">Kaldırma Talebi Nedeni (Zorunlu)</label>
                            <textarea
                                required
                                className="textarea"
                                placeholder="Lütfen ilgili içeriğin neden kaldırılması gerektiğini detaylıca belirtin..."
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                style={{ minHeight: '120px' }}
                            />
                        </div>

                        {status === 'error' && (
                            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', fontSize: '14px', fontWeight: 600 }}>
                                {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === 'submitting'}
                            style={{ alignSelf: 'flex-start', background: 'var(--danger)', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2)' }}
                        >
                            <Send size={18} /> {status === 'submitting' ? 'Gönderiliyor...' : 'Talebi Gönder'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
