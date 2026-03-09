import { useState } from 'react';
import { FileSignature, Copy, Check, Download, Info } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function IstifaPage() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        manager: '',
        lastDay: '',
        reason: 'standard'
    });
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = generateLetter();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateLetter = () => {
        const today = new Date().toLocaleDateString('tr-TR');
        const REASONS = {
            standard: 'Kariyerimde yeni bir yol çizmek ve farklı fırsatları değerlendirmek amacıyla görevimden ayrılma kararı aldım.',
            better_offer: 'Aldığım yeni bir iş teklifini değerlendirmek ve kariyerime farklı bir kurumda devam etmek üzere görevimden ayrılıyorum.',
            education: 'Eğitim hayatıma devam etme kararı almam nedeniyle görevimden ayrılmam gerekmektedir.',
            relocation: 'Şehir/ülke değişikliği yapacak olmam nedeniyle mevcut görevimi sürdüremeyeceğim.'
        };

        return `Sayın ${formData.manager || '[Yönetici Adı]'},

${formData.company || '[Şirket Adı]'} bünyesinde sürdürmekte olduğum görevimden, ${formData.lastDay ? new Date(formData.lastDay).toLocaleDateString('tr-TR') : '[Son Gün]'} tarihi itibarıyla istifa ettiğimi bildirmek isterim.

${REASONS[formData.reason]}

Burada çalıştığım süre boyunca edindiğim deneyimler ve bana sağlanan fırsatlar için teşekkür ederim. Ayrılış sürecimde görevlerimin devri ve işlerin aksamaması için üzerime düşen her türlü desteği vermeye hazırım.

Gereğinin yapılmasını arz ederim.

Saygılarımla,

${formData.name || '[Adınız Soyadınız]'}
Tarih: ${today}`;
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <FileSignature size={14} style={{ marginRight: '6px' }} /> Araçlar
                    </div>
                    <h1 className="section-title">İstifa Dilekçesi Oluşturucu</h1>
                    <p className="section-sub">Profesyonel ve resmi istifa dilekçenizi saniyeler içinde hazırlayın.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                    {/* Form Section */}
                    <div className="card animate-in">
                        <h3 style={{ marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700 }}>Bilgilerinizi Girin</h3>

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
                                    placeholder="Örn: ABC Teknoloji"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="input-label">Yönetici Adı (Veya İK Yetkilisi)</label>
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
                                <select
                                    className="input"
                                    value={formData.reason}
                                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                    style={{ appearance: 'none' }}
                                >
                                    <option value="standard">Yeni bir kariyer fırsatı</option>
                                    <option value="better_offer">Daha iyi bir teklif</option>
                                    <option value="education">Eğitim/Akademik nedenler</option>
                                    <option value="relocation">Şehir/Ülke değişikliği</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '32px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', gap: '12px' }}>
                            <Info size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                İstifa dilekçenizi sunduktan sonra İK biriminden imzalı bir kopyasını almayı unutmayın.
                            </p>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="card animate-in" style={{ flex: 1, position: 'relative', minHeight: '400px', backgroundColor: '#fff', color: '#1a1a1a' }}>
                            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                        background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                        fontSize: '13px', fontWeight: 600, color: '#475569'
                                    }}
                                >
                                    {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                                    {copied ? 'Kopyalandı' : 'Kopyala'}
                                </button>
                            </div>

                            <pre style={{
                                whiteSpace: 'pre-wrap', fontFamily: 'serif', fontSize: '14px', lineHeight: 1.6,
                                padding: '24px', color: '#1a1a1a', margin: 0
                            }}>
                                {generateLetter()}
                            </pre>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCopy}>
                            <Copy size={18} /> Dilekçeyi Kopyala
                        </button>
                    </div>
                </div>
            </div>

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — İstifa Dilekçesi Aracı</p>
            </footer>
        </div>
    );
}
