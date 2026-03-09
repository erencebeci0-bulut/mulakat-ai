import { useState } from 'react';
import { FileText, Plus, Trash2, Download, Eye, Briefcase, GraduationCap, User } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function CvBuilderPage() {
    const [cvData, setCvData] = useState({
        personal: { name: '', email: '', phone: '', location: '', title: '' },
        experience: [{ id: 1, company: '', position: '', dates: '', desc: '' }],
        education: [{ id: 1, school: '', degree: '', year: '' }],
        skills: ''
    });

    const addExp = () => setCvData({ ...cvData, experience: [...cvData.experience, { id: Date.now(), company: '', position: '', dates: '', desc: '' }] });
    const removeExp = (id) => setCvData({ ...cvData, experience: cvData.experience.filter(e => e.id !== id) });

    const addEdu = () => setCvData({ ...cvData, education: [...cvData.education, { id: Date.now(), school: '', degree: '', year: '' }] });
    const removeEdu = (id) => setCvData({ ...cvData, education: cvData.education.filter(e => e.id !== id) });

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <FileText size={14} style={{ marginRight: '6px' }} /> Araçlar
                    </div>
                    <h1 className="section-title">AI CV Düzenleyici</h1>
                    <p className="section-sub">Profesyonel, ATS uyumlu CV'nizi dakikalar içinde hazırlayın.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                    {/* Editor Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Personal Info */}
                        <div className="card">
                            <h3 style={{ marginBottom: '20px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <User size={18} color="var(--accent)" /> Kişisel Bilgiler
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label className="input-label">Ad Soyad</label>
                                    <input className="input" placeholder="Ahmet Yılmaz" />
                                </div>
                                <div>
                                    <label className="input-label">Unvan</label>
                                    <input className="input" placeholder="Frontend Developer" />
                                </div>
                                <div>
                                    <label className="input-label">E-posta</label>
                                    <input className="input" placeholder="ahmet@email.com" />
                                </div>
                                <div>
                                    <label className="input-label">Telefon</label>
                                    <input className="input" placeholder="0500..." />
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Briefcase size={18} color="var(--accent)" /> Deneyim
                                </h3>
                                <button className="btn btn-ghost" onClick={addExp} style={{ color: 'var(--accent)', gap: '4px' }}>
                                    <Plus size={16} /> Ekle
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {cvData.experience.map((exp, idx) => (
                                    <div key={exp.id} style={{ position: 'relative', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
                                        {idx > 0 && (
                                            <button onClick={() => removeExp(exp.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                            <input className="input" placeholder="Şirket" />
                                            <input className="input" placeholder="Pozisyon" />
                                        </div>
                                        <input className="input" placeholder="Tarih Aralığı (Örn: 2021 - Günümüz)" style={{ marginBottom: '12px' }} />
                                        <textarea className="textarea" placeholder="Neler yaptınız?" style={{ minHeight: '80px' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <GraduationCap size={18} color="var(--accent)" /> Eğitim
                                </h3>
                                <button className="btn btn-ghost" onClick={addEdu} style={{ color: 'var(--accent)', gap: '4px' }}>
                                    <Plus size={16} /> Ekle
                                </button>
                            </div>
                            {cvData.education.map((edu, idx) => (
                                <div key={edu.id} style={{ position: 'relative', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.6fr', gap: '12px' }}>
                                        <input className="input" placeholder="Okul" />
                                        <input className="input" placeholder="Bölüm" />
                                        <input className="input" placeholder="Yıl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Section (Simplified Layout) */}
                    <div style={{ position: 'sticky', top: '96px', height: 'fit-content' }}>
                        <div className="card" style={{ padding: '0', overflow: 'hidden', backgroundColor: '#fff', color: '#1a1a1a', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <div style={{ height: '8px', background: 'var(--accent)' }} />
                            <div style={{ padding: '40px' }}>
                                <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>Ad Soyad</h1>
                                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Frontend Developer • İstanbul</p>

                                <div style={{ marginBottom: '24px' }}>
                                    <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Deneyim</h4>
                                    <div style={{ marginBottom: '16px' }}>
                                        <p style={{ fontWeight: 700, fontSize: '14px' }}>Frontend Developer</p>
                                        <p style={{ fontSize: '13px', color: '#64748b' }}>ABC Teknoloji • 2021 - Günümüz</p>
                                        <p style={{ fontSize: '13px', marginTop: '4px', color: '#334155' }}>• React ve Next.js kullanarak modern web uygulamaları geliştirildi.</p>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>Eğitim</h4>
                                    <p style={{ fontWeight: 700, fontSize: '14px' }}>Bilgisayar Mühendisliği</p>
                                    <p style={{ fontSize: '13px', color: '#64748b' }}>XYZ Üniversitesi • 2020 Mezunu</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                            <button className="btn btn-primary" style={{ flex: 1 }}>
                                <Download size={18} /> PDF İndir
                            </button>
                            <button className="btn btn-secondary">
                                <Eye size={18} /> Önizleme
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — CV Oluşturucu Aracı</p>
            </footer>
        </div>
    );
}
