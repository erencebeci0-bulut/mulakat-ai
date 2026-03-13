import { useState } from 'react';
import { FileSignature, Copy, Check, Info, FileText, Send, Lock } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import AuthModal from '../components/AuthModal';

export default function IstifaPage() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        manager: '',
        lastDay: '',
        reason: 'standard'
    });
    const [customReason, setCustomReason] = useState('');
    const [copied, setCopied] = useState(false);

    // Auth Gating States
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleCopy = () => {
        const text = generateLetter();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGatedAction = (actionFn) => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
            return;
        }
        actionFn();
    };

    const downloadAsText = () => {
        const text = generateLetter();
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Istifa_Dilekcesi_${formData.name ? formData.name.replace(/\s+/g, '_') : 'Taslak'}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openEmailClient = () => {
        const subject = encodeURIComponent(`${formData.name || 'Ad Soyad'} - İstifa Bildirimi`);
        const body = encodeURIComponent(generateLetter());
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const generateLetter = () => {
        const today = new Date().toLocaleDateString('tr-TR');
        const REASONS = {
            standard: 'Kariyerimde yeni bir yol çizmek ve farklı fırsatları değerlendirmek amacıyla görevimden ayrılma kararı aldım.',
            better_offer: 'Kariyer gelişimim doğrultusunda aldığım yeni bir teklifi değerlendirmek üzere görevimden ayrılıyorum.',
            education: 'Eğitim hayatıma devam etme kararım ve akademik hedeflerim doğrultusunda görevimden ayrılmam gerekmektedir.',
            relocation: 'Mecburi olarak gerçekleştireceğim şehir/ülke değişikliği sebebiyle mevcut görevimi sürdüremeyeceğim.',
            manual: customReason || '[Geçerli Bir Ayrılma Sebebi Belirtmediniz]'
        };

        return `${formData.company ? `Sayın İlgili Makama,\n\n${formData.company}` : '[Şirket Adı]'} İnsan Kaynakları Departmanı'na,

${formData.company || '[Şirket Adı]'} bünyesinde sürdürmekte olduğum görevimden, ${formData.lastDay ? new Date(formData.lastDay).toLocaleDateString('tr-TR') : '[Son Gün]'} tarihi itibarıyla istifa ettiğimi tarafınıza resmi olarak bildiririm.

${REASONS[formData.reason]}

Şirketinizde çalıştığım süre zarfında edindiğim mesleki tecrübeler ve kurumunuzun bana sağladığı değerli katkılar için şükranlarımı sunarım. Ayrılış sürecimde görev ve sorumluluklarımın devrini eksiksiz yapacağımı ve yürütülen faaliyetlerin aksamaması adına son çalışma günüme kadar üzerime düşen desteği sağlayacağımı bildirmek isterim.

İşbu istifa dilekçemin kabulünü ve çıkış işlemlerimin yasal mevzuata uygun olarak başlatılmasını arz ederim.

Saygılarımla,

Ad Soyad: ${formData.name || '[Adınız Soyadınız]'}
Tarih: ${today}
İmza:


`;
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <NavBar />
            <Breadcrumbs items={[{ label: 'İstifa Dilekçesi', to: '/istifa-dilekcesi' }]} />

            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 24px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <FileSignature size={14} style={{ marginRight: '6px' }} /> Profesyonel Araçlar
                    </div>
                    <h1 className="section-title">İstifa Dilekçesi Oluşturucu</h1>
                    <p className="section-sub">Resmi, İK uyumlu ve profesyonel istifa dilekçenizi saniyeler içinde hazırlayın.</p>
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 500px', gap: '40px', alignItems: 'start' }}>

                    {/* Form Section */}
                    <div className="card animate-in" style={{ padding: '32px' }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800 }}>Kişisel ve Şirket Bilgileri</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label className="input-label">Adınız Soyadınız</label>
                                <input
                                    className="input"
                                    placeholder="Örn: Ahmet Yılmaz"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="input-label">Şirket Adı</label>
                                <input
                                    className="input"
                                    placeholder="Örn: ABC Teknoloji Eğitimi A.Ş."
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="input-label">Yönetici veya İK Yetkilisi (Opsiyonel)</label>
                                <input
                                    className="input"
                                    placeholder="Örn: Canan Demir"
                                    value={formData.manager}
                                    onChange={e => setFormData({ ...formData, manager: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="input-label">Son Çalışma Günü</label>
                                <input
                                    type="date"
                                    className="input"
                                    value={formData.lastDay}
                                    onChange={e => setFormData({ ...formData, lastDay: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="input-label">Ayrılma Nedeni</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        className="input"
                                        value={formData.reason}
                                        onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                        style={{ appearance: 'none' }}
                                    >
                                        <option value="standard">Kariyerimde yeni bir fırsat</option>
                                        <option value="better_offer">Daha iyi bir teklif değerlendirme</option>
                                        <option value="education">Eğitim & Akademik nedenler</option>
                                        <option value="relocation">Şehir/Ülke değişikliği</option>
                                        <option value="manual">Kendi Nedenimi Yazacağım</option>
                                    </select>
                                </div>
                            </div>

                            {formData.reason === 'manual' && (
                                <div className="animate-in">
                                    <label className="input-label">Özel Ayrılma Nedeniniz</label>
                                    <textarea
                                        className="textarea"
                                        placeholder="Kendi cümlelerinizle ayrılma nedeninizi buraya yazın..."
                                        value={customReason}
                                        onChange={e => setCustomReason(e.target.value)}
                                        style={{ minHeight: '100px' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '32px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', gap: '12px' }}>
                            <Info size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                İstifa dilekçenizi yasal sürelere (ihbar süresi) uygun olarak teslim ettiğinizden emin olun ve İK biriminden imzalı bir kopyasını almayı unutmayın.
                            </p>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <div className="card animate-in" style={{ backgroundColor: '#fff', color: '#1a1a1a', padding: '0', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                            <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>CANLI ÖNİZLEME</div>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1',
                                        background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                        fontSize: '12px', fontWeight: 600, color: '#334155'
                                    }}
                                >
                                    {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                                    {copied ? 'Kopyalandı' : 'Kopyala'}
                                </button>
                            </div>

                            <pre id="istifa-preview" style={{
                                whiteSpace: 'pre-wrap', fontFamily: "'Merriweather', 'Georgia', serif", fontSize: '13px',
                                lineHeight: 1.7, padding: '40px 32px', color: '#0f172a', margin: 0,
                                minHeight: '400px'
                            }}>
                                {generateLetter()}
                            </pre>
                        </div>

                        {/* Export & Send Actions */}
                        <div className="card" style={{ marginTop: '24px', padding: '24px', border: '1px solid rgba(139,92,246,0.2)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>

                                <button className="btn btn-primary" style={{ padding: '14px', fontSize: '14px', display: 'flex', gap: '8px', justifyContent: 'center' }} onClick={() => handleGatedAction(downloadAsText)}>
                                    {!isLoggedIn && <Lock size={16} style={{ opacity: 0.7 }} />}
                                    <FileText size={18} /> Belgeyi İndir (TXT)
                                </button>

                                <button className="btn btn-secondary" style={{ padding: '14px', fontSize: '14px', display: 'flex', gap: '8px', justifyContent: 'center', background: '#fff', color: '#1a1a1a' }} onClick={() => handleGatedAction(openEmailClient)}>
                                    {!isLoggedIn && <Lock size={16} style={{ opacity: 0.5 }} />}
                                    <Send size={18} color="#2563eb" /> E-posta Olarak Gönder
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                title="İşleme Devam Etmek İçin Giriş Yapın"
                subtitle="Dilekçenizi cihazınıza indirmek veya doğrudan e-posta ile göndermek için ücretsiz hesabınızla giriş yapın."
                onLogin={(provider) => {
                    setIsLoggedIn(true);
                }}
            />

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center', marginTop: '64px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Profesyonel İstifa Dilekçesi Aracı</p>
            </footer>
        </div>
    );
}
