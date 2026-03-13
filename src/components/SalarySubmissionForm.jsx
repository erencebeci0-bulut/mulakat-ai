import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function SalarySubmissionForm({ defaultCompany = '' }) {
    const [formData, setFormData] = useState({
        company: defaultCompany,
        role: '',
        city: '',
        experience: 'junior',
        salaryType: 'net',
        amount: '',
        comment: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, send to database.
        // For Phase 3 MVP, we just show a success state.
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ company: defaultCompany, role: '', city: '', experience: 'junior', salaryType: 'net', amount: '', comment: '' });
            setSubmitted(false);
        }, 4000);
    };

    if (submitted) {
        return (
            <div style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }} className="animate-in">
                <CheckCircle size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Teşekkürler!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Maaş veriniz başarıyla anonim olarak kaydedildi. Katkınızla piyasayı daha şeffaf hale getiriyoruz.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div>
                <label className="input-label">Şirket Adı</label>
                <input required className="input" placeholder="Örn: Google" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                    <label className="input-label">Pozisyon</label>
                    <input required className="input" placeholder="Örn: Frontend Developer" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                </div>
                <div>
                    <label className="input-label">Şehir</label>
                    <input required className="input" placeholder="Örn: İstanbul" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                    <label className="input-label">Deneyim Seviyesi</label>
                    <select className="input" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} style={{ appearance: 'none' }}>
                        <option value="junior">0-2 Yıl (Junior)</option>
                        <option value="mid">3-5 Yıl (Mid-Level)</option>
                        <option value="senior">5+ Yıl (Senior)</option>
                        <option value="lead">Lead / Manager</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">Aylık Maaş (TL)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select className="input" value={formData.salaryType} onChange={e => setFormData({ ...formData, salaryType: e.target.value })} style={{ flex: '1', appearance: 'none', padding: '10px' }}>
                            <option value="net">Net</option>
                            <option value="gross">Brüt</option>
                        </select>
                        <input required type="number" className="input" style={{ flex: '2' }} placeholder="Örn: 45000" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                    </div>
                </div>
            </div>

            <div>
                <label className="input-label">Eklemek İstedikleriniz (Opsiyonel)</label>
                <textarea className="textarea" placeholder="Yan haklar, hisse senedi veya çalışma şartları hakkında bilgi verebilirsiniz..." value={formData.comment} onChange={e => setFormData({ ...formData, comment: e.target.value })} style={{ minHeight: '80px' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Send size={16} /> Anonim Olarak Paylaş
            </button>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>
                Verileriniz tamamen anonim olarak işlenir ve kimlik bilgileriniz hiçbir şekilde saklanmaz.
            </p>
        </form>
    );
}
