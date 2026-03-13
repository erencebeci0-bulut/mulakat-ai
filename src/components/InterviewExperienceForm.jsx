import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function InterviewExperienceForm({ defaultCompany = '' }) {
    const [formData, setFormData] = useState({
        company: defaultCompany,
        role: '',
        difficulty: 'medium',
        process: '',
        questions: '',
        tips: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock DB submission
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ company: defaultCompany, role: '', difficulty: 'medium', process: '', questions: '', tips: '' });
            setSubmitted(false);
        }, 4000);
    };

    if (submitted) {
        return (
            <div style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }} className="animate-in">
                <CheckCircle size={48} color="#2563eb" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>İnanılmazsınız!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Mülakat deneyiminiz başarıyla topluluğa katıldı. Gerçek veriler kariyer yolculuğunu aydınlatır.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                    <label className="input-label">Şirket Adı</label>
                    <input required className="input" placeholder="Örn: Trendyol" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <div>
                    <label className="input-label">Başvurulan Pozisyon</label>
                    <input required className="input" placeholder="Örn: Product Manager" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                </div>
            </div>

            <div>
                <label className="input-label">Mülakat Zorluğu</label>
                <select className="input" value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} style={{ appearance: 'none' }}>
                    <option value="easy">Kolay (1-2/5)</option>
                    <option value="medium">Orta (3/5)</option>
                    <option value="hard">Zor (4/5)</option>
                    <option value="expert">Çok Zor (5/5)</option>
                </select>
            </div>

            <div>
                <label className="input-label">Süreç Nasıl İlerledi?</label>
                <textarea required className="textarea" placeholder="Kaç aşama sürdü? İK, teknik, take-home vb. detayları bahsedin..." value={formData.process} onChange={e => setFormData({ ...formData, process: e.target.value })} style={{ minHeight: '80px' }} />
            </div>

            <div>
                <label className="input-label">Ne Tür Sorular Soruldu?</label>
                <textarea required className="textarea" placeholder="Hatırladığınız mülakat veya vaka sorularını listeleyin..." value={formData.questions} onChange={e => setFormData({ ...formData, questions: e.target.value })} style={{ minHeight: '100px' }} />
            </div>

            <div>
                <label className="input-label">Adaylara Tavsiyeleriniz (Opsiyonel)</label>
                <textarea className="textarea" placeholder="Örn: Sistem tasarımı kısmına çok çalışın." value={formData.tips} onChange={e => setFormData({ ...formData, tips: e.target.value })} style={{ minHeight: '60px' }} />
            </div>

            <button type="submit" className="btn btn-secondary" style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Send size={16} /> Mülakat Deneyimini Gönder
            </button>
        </form>
    );
}
