import { useState } from 'react';
import { FileText, Plus, Trash2, Download, Eye, Briefcase, GraduationCap, User, Sparkles, CheckCircle, ChevronRight, ChevronLeft, Github, Linkedin, Globe, MapPin, Code, MessageCircle, Camera, File, FileCode, AlignLeft } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import TagInput from '../components/TagInput';
import { exportToPDF, exportToDOCX, exportToTXT, exportToMarkdown, exportToJSON } from '../utils/exportCv';

// Mock AI Service for generation
const mockGenerateContent = async (type, data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (type === 'summary') {
                resolve(`Başarılı geçmişi ve liderlik vasıflarıyla öne çıkan, yenilikçi çözümler üretmeye odaklı profesyonel. ${data?.title || 'Kariyerinde'} edindiği tecrübelerle süreçleri optimize eden ve takım çalışmasına inanan, analitik düşünebilen bir yetenek.`);
            } else if (type === 'bullets') {
                resolve("• Operasyonel verimliliği %30 artıracak yeni stratejiler geliştirildi ve başarıyla uygulandı.\n• Çapraz fonksiyonel ekiplerle çalışarak kritik projelerin zamanında teslim edilmesi sağlandı.\n• Müşteri memnuniyetini %45 artıran süreç iyileştirmeleri projelendirildi.");
            }
        }, 1200);
    });
};

export default function CvBuilderPage() {
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);

    const [cvData, setCvData] = useState({
        personal: { name: '', title: '', email: '', phone: '', location: '', linkedin: '', portfolio: '', photo: null },
        education: [{ id: 1, school: '', degree: '', year: '' }],
        experience: [{ id: 1, company: '', position: '', dates: '', desc: '' }],
        skills: { technical: [], soft: [], languages: [] },
        summary: ''
    });

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePersonal('photo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Helpers
    const updatePersonal = (field, value) => setCvData({ ...cvData, personal: { ...cvData.personal, [field]: value } });
    const updateSkills = (field, value) => setCvData({ ...cvData, skills: { ...cvData.skills, [field]: value } });

    const addEdu = () => setCvData({ ...cvData, education: [...cvData.education, { id: Date.now(), school: '', degree: '', year: '' }] });
    const updateEdu = (id, field, value) => {
        setCvData({ ...cvData, education: cvData.education.map(e => e.id === id ? { ...e, [field]: value } : e) });
    };
    const removeEdu = (id) => setCvData({ ...cvData, education: cvData.education.filter(e => e.id !== id) });

    const addExp = () => setCvData({ ...cvData, experience: [...cvData.experience, { id: Date.now(), company: '', position: '', dates: '', desc: '' }] });
    const updateExp = (id, field, value) => {
        setCvData({ ...cvData, experience: cvData.experience.map(e => e.id === id ? { ...e, [field]: value } : e) });
    };
    const removeExp = (id) => setCvData({ ...cvData, experience: cvData.experience.filter(e => e.id !== id) });

    const handleAIGenerateSummary = async () => {
        setIsGenerating(true);
        const res = await mockGenerateContent('summary', cvData.personal);
        setCvData({ ...cvData, summary: res });
        setIsGenerating(false);
    };

    const handleAIOptimizeExperience = async (id) => {
        setIsGenerating(true);
        const res = await mockGenerateContent('bullets');
        updateExp(id, 'desc', res);
        setIsGenerating(false);
    };

    // Step Rendering
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="card animate-in">
                        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <User size={20} color="var(--accent)" /> 1. Kişisel Bilgiler
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ gridColumn: '1 / -1', marginBottom: '8px' }}>
                                <label className="input-label">Profil Fotoğrafı</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        {cvData.personal.photo ? (
                                            <img src={cvData.personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Camera size={24} color="var(--text-muted)" />
                                        )}
                                    </div>
                                    <div>
                                        <label className="btn btn-secondary" style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '14px' }}>
                                            Fotoğraf Yükle
                                            <input type="file" accept="image/jpeg, image/png, image/webp" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                                        </label>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Desteklenen: JPG, PNG, WEBP</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="input-label">Ad Soyad</label>
                                <input className="input" placeholder="Örn: Ahmet Yılmaz" value={cvData.personal.name} onChange={e => updatePersonal('name', e.target.value)} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="input-label">Mesleki Unvan</label>
                                <input className="input" placeholder="Örn: Senior Software Engineer" value={cvData.personal.title} onChange={e => updatePersonal('title', e.target.value)} />
                            </div>
                            <div>
                                <label className="input-label">E-posta</label>
                                <input className="input" placeholder="ahmet@example.com" value={cvData.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
                            </div>
                            <div>
                                <label className="input-label">Telefon</label>
                                <input className="input" placeholder="+90 5XX XXX XX XX" value={cvData.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="input-label">Konum / Şehir</label>
                                <input className="input" placeholder="İzmir, Türkiye" value={cvData.personal.location} onChange={e => updatePersonal('location', e.target.value)} />
                            </div>
                            <div>
                                <label className="input-label">LinkedIn (Opsiyonel)</label>
                                <input className="input" placeholder="linkedin.com/in/ahmet" value={cvData.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
                            </div>
                            <div>
                                <label className="input-label">Portföy / GitHub (Opsiyonel)</label>
                                <input className="input" placeholder="github.com/ahmet" value={cvData.personal.portfolio} onChange={e => updatePersonal('portfolio', e.target.value)} />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="card animate-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <GraduationCap size={20} color="var(--accent)" /> 2. Eğitim Bilgileri
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {cvData.education.map((edu, idx) => (
                                <div key={edu.id} style={{ position: 'relative', padding: '24px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    {idx > 0 && (
                                        <button onClick={() => removeEdu(edu.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                        <div>
                                            <label className="input-label">Okul / Üniversite Adı</label>
                                            <input className="input" placeholder="Örn: Boğaziçi Üniversitesi" value={edu.school} onChange={e => updateEdu(edu.id, 'school', e.target.value)} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                                            <div>
                                                <label className="input-label">Bölüm / Derece</label>
                                                <input className="input" placeholder="Bilgisayar Mühendisliği (Lisans)" value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="input-label">Mezuniyet Yılı</label>
                                                <input className="input" placeholder="2022" value={edu.year} onChange={e => updateEdu(edu.id, 'year', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-secondary" onClick={addEdu} style={{ width: '100%', borderStyle: 'dashed' }}>
                                <Plus size={16} /> Başka bir eğitim ekle
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="card animate-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Briefcase size={20} color="var(--accent)" /> 3. İş Deneyimi
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {cvData.experience.map((exp, idx) => (
                                <div key={exp.id} style={{ position: 'relative', padding: '24px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    {idx > 0 && (
                                        <button onClick={() => removeExp(exp.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                        <div>
                                            <label className="input-label">Şirket Adı</label>
                                            <input className="input" placeholder="Örn: Trendyol" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="input-label">Pozisyon</label>
                                            <input className="input" placeholder="Backend Developer" value={exp.position} onChange={e => updateExp(exp.id, 'position', e.target.value)} />
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label className="input-label">Çalışma Tarihleri</label>
                                            <input className="input" placeholder="Eyl 2021 - Günümüz" value={exp.dates} onChange={e => updateExp(exp.id, 'dates', e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                            <label className="input-label" style={{ marginBottom: 0 }}>Sorumluluklar ve Başarılar</label>
                                            <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: '12px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleAIOptimizeExperience(exp.id)} disabled={isGenerating}>
                                                <Sparkles size={14} /> AI ile İyileştir
                                            </button>
                                        </div>
                                        <textarea className="textarea" placeholder="Neler yaptınız? Maddeler halinde (•) yazmanız tavsiye edilir." value={exp.desc} onChange={e => updateExp(exp.id, 'desc', e.target.value)} style={{ minHeight: '120px' }} />
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-secondary" onClick={addExp} style={{ width: '100%', borderStyle: 'dashed' }}>
                                <Plus size={16} /> Başka bir deneyim ekle
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="card animate-in">
                        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Code size={20} color="var(--accent)" /> 4. Yetenekler
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label className="input-label">Teknik Yetenekler</label>
                                <TagInput tags={cvData.skills.technical} onTagsChange={(t) => updateSkills('technical', t)} placeholder="Örn: React, Node.js, Python (Enter'a basın)" />
                            </div>
                            <div>
                                <label className="input-label">Yumuşak Yetenekler (Soft Skills)</label>
                                <TagInput tags={cvData.skills.soft} onTagsChange={(t) => updateSkills('soft', t)} placeholder="Örn: Takım çalışması, Problem çözme" />
                            </div>
                            <div>
                                <label className="input-label">Yabancı Diller</label>
                                <TagInput tags={cvData.skills.languages} onTagsChange={(t) => updateSkills('languages', t)} placeholder="Örn: İngilizce (B2), Almanca" />
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="card animate-in">
                        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Sparkles size={20} color="var(--accent)" /> 5. Profesyonel Özet
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px' }}>
                            İşe alım uzmanlarının CV'nizde okuyacağı ilk bölüm. AI asistanımız bugüne kadar girdiğiniz tüm verileri kullanarak size mükemmel bir özet yazabilir.
                        </p>
                        <div style={{ marginBottom: '20px' }}>
                            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '16px', padding: '16px' }} onClick={handleAIGenerateSummary} disabled={isGenerating}>
                                {isGenerating ? <span className="loading-pulse">Yapay Zeka Yazıyor...</span> : <><Sparkles size={18} /> AI ile Profesyonel Özet Üret</>}
                            </button>
                            <label className="input-label">Veya Kendiniz Yazın</label>
                            <textarea className="textarea" placeholder="Kariyer hedeflerinizi ve öne çıkan yönlerinizi buraya yazın..." value={cvData.summary} onChange={e => setCvData({ ...cvData, summary: e.target.value })} style={{ minHeight: '160px' }} />
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <NavBar />
            <Breadcrumbs items={[{ label: 'CV Oluştur', to: '/cv-builder' }]} />

            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <Sparkles size={14} style={{ marginRight: '6px' }} /> AI Destekli
                    </div>
                    <h1 className="section-title">Mülakat.com CV Oluşturucu</h1>
                    <p className="section-sub">ATS (Aday Takip Sistemi) uyumlu, profesyonel özgeçmişinizi 5 adımda oluşturun.</p>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>

                {/* Left Side: Wizard Editor */}
                <div>
                    {/* Stepper Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', padding: '0 12px' }}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: step === i ? 'var(--accent)' : step > i ? 'var(--success)' : 'var(--bg-secondary)',
                                    color: step === i || step > i ? 'white' : 'var(--text-muted)',
                                    border: `2px solid ${step === i ? 'var(--accent)' : step > i ? 'var(--success)' : 'var(--border)'}`,
                                    fontWeight: 700, fontSize: '14px', transition: 'all 0.3s'
                                }}>
                                    {step > i ? <CheckCircle size={16} /> : i}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step Content Form */}
                    <div style={{ minHeight: '500px' }}>
                        {renderStepContent()}
                    </div>

                    {/* Navigation Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                        <button className="btn btn-secondary" disabled={step === 1} onClick={() => setStep(step - 1)}>
                            <ChevronLeft size={18} /> Geri
                        </button>
                        {step < 5 ? (
                            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                                İleri <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button className="btn btn-success" style={{ background: 'var(--success)', color: '#000', border: 'none' }}>
                                <CheckCircle size={18} /> CV Taslağını Bitir
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Side: Live ATS Preview */}
                <div style={{ position: 'sticky', top: '100px' }}>
                    <div id="cv-preview-container" className="card glass-card" style={{ padding: '0', overflow: 'hidden', backgroundColor: '#fff', color: '#1a1a1a', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                        <div style={{ height: '8px', background: 'var(--accent)' }} />
                        <div style={{ padding: '32px 32px 40px', fontSize: '12px', lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>
                            {/* Header */}
                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                {cvData.personal.photo && (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                        <img src={cvData.personal.photo} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                    </div>
                                )}
                                <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px', color: '#0f172a', letterSpacing: '-0.5px' }}>{cvData.personal.name || 'Ad Soyad'}</h1>
                                <p style={{ color: '#475569', fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>{cvData.personal.title || 'Mesleki Unvan'}</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', color: '#64748b', fontSize: '11px' }}>
                                    {cvData.personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={12} /> {cvData.personal.email}</span>}
                                    {cvData.personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>• {cvData.personal.phone}</span>}
                                    {cvData.personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {cvData.personal.location}</span>}
                                </div>
                                {(cvData.personal.linkedin || cvData.personal.portfolio) && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', color: '#64748b', fontSize: '11px', marginTop: '6px' }}>
                                        {cvData.personal.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={12} /> {cvData.personal.linkedin.replace('https://', '')}</span>}
                                        {cvData.personal.portfolio && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {cvData.personal.portfolio.replace('https://', '')}</span>}
                                    </div>
                                )}
                            </div>

                            {/* Summary */}
                            {cvData.summary && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#334155', marginBottom: '8px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', letterSpacing: '0.5px' }}>Profil Özeti</h4>
                                    <p style={{ color: '#334155', textAlign: 'justify' }}>{cvData.summary}</p>
                                </div>
                            )}

                            {/* Experience */}
                            {cvData.experience.length > 0 && cvData.experience[0].company && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#334155', marginBottom: '12px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', letterSpacing: '0.5px' }}>İş Deneyimi</h4>
                                    {cvData.experience.map((exp) => exp.company && (
                                        <div key={exp.id} style={{ marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                                <p style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{exp.position}</p>
                                                <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{exp.dates}</p>
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>{exp.company}</p>
                                            <p style={{ color: '#334155', whiteSpace: 'pre-line' }}>{exp.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Education */}
                            {cvData.education.length > 0 && cvData.education[0].school && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#334155', marginBottom: '12px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', letterSpacing: '0.5px' }}>Eğitim Bilgileri</h4>
                                    {cvData.education.map((edu) => edu.school && (
                                        <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                                            <div>
                                                <p style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{edu.school}</p>
                                                <p style={{ fontSize: '12px', color: '#475569' }}>{edu.degree}</p>
                                            </div>
                                            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{edu.year}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Skills */}
                            {(cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0 || cvData.skills.languages.length > 0) && (
                                <div>
                                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#334155', marginBottom: '8px', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', letterSpacing: '0.5px' }}>Yetenekler</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {cvData.skills.technical.length > 0 && <p><span style={{ fontWeight: 700, color: '#0f172a' }}>Teknik:</span> <span style={{ color: '#334155' }}>{cvData.skills.technical.join(', ')}</span></p>}
                                        {cvData.skills.soft.length > 0 && <p><span style={{ fontWeight: 700, color: '#0f172a' }}>Sosyal:</span> <span style={{ color: '#334155' }}>{cvData.skills.soft.join(', ')}</span></p>}
                                        {cvData.skills.languages.length > 0 && <p><span style={{ fontWeight: 700, color: '#0f172a' }}>Diller:</span> <span style={{ color: '#334155' }}>{cvData.skills.languages.join(', ')}</span></p>}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>DIŞA AKTAR</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <button className="btn btn-primary glass-panel" style={{ padding: '10px', fontSize: '13px', display: 'flex', gap: '6px' }} onClick={() => exportToPDF('cv-preview-container', `${cvData.personal.name || 'CV'}.pdf`)}>
                                <Download size={14} /> PDF
                            </button>
                            <button className="btn btn-secondary glass-panel" style={{ padding: '10px', fontSize: '13px', display: 'flex', gap: '6px' }} onClick={() => exportToDOCX(cvData, `${cvData.personal.name || 'CV'}.docx`)}>
                                <FileText size={14} /> DOCX
                            </button>
                            <button className="btn btn-ghost glass-panel" style={{ padding: '10px', fontSize: '13px', display: 'flex', gap: '6px', border: '1px solid var(--border)' }} onClick={() => exportToTXT(cvData, `${cvData.personal.name || 'CV'}.txt`)}>
                                <AlignLeft size={14} /> TXT
                            </button>
                            <button className="btn btn-ghost glass-panel" style={{ padding: '10px', fontSize: '13px', display: 'flex', gap: '6px', border: '1px solid var(--border)' }} onClick={() => exportToMarkdown(cvData, `${cvData.personal.name || 'CV'}.md`)}>
                                <File size={14} /> MD
                            </button>
                            <button className="btn btn-ghost glass-panel" style={{ padding: '10px', fontSize: '13px', display: 'flex', gap: '6px', border: '1px solid var(--border)', gridColumn: '1 / -1' }} onClick={() => exportToJSON(cvData, `${cvData.personal.name || 'CV'}.json`)}>
                                <FileCode size={14} /> JSON (Geliştirici)
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
