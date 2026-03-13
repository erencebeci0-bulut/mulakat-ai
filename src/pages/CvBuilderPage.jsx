import { useState } from 'react';
import { FileText, Plus, Trash2, Download, Eye, Briefcase, GraduationCap, User, Sparkles, CheckCircle, ChevronRight, ChevronLeft, Github, Linkedin, Globe, MapPin, Code, MessageCircle, Camera, File, FileCode, AlignLeft, Layout } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import TagInput from '../components/TagInput';
import AuthModal from '../components/AuthModal';
import { exportToPDF, exportToDOCX, exportToTXT, exportToMarkdown, exportToJSON } from '../utils/exportCv';
import SEOHead from '../components/SEOHead';

// Mock AI Service for generation
const mockGenerateContent = async (type, data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (type === 'summary') {
                resolve(`Sektörel gelişimlere hızla adapte olan, çözüm odaklı ve yenilikçi bir profesyonel. ${data?.title || 'Kariyeri'} boyunca edindiği tecrübeler sayesinde operasyonel süreçleri optimize etme ve takım içi iletişimi güçlendirme konularında kanıtlanmış bir başarı siciline sahip. Stratejik hedeflere ulaşmak için analitik yaklaşımlar geliştirir ve uygular.`);
            } else if (type === 'bullets') {
                resolve("• Yeni stratejiler geliştirerek operasyonel verimlilikte %35'lik bir artış sağlandı.\n• Kritik projeleri yönetirken paydaşlarla etkin iletişim kurarak teslimat süreleri %20 hızlandırıldı.\n• Süreç iyileştirmelerine liderlik edilerek müşteri memnuniyet puanı 8.5'ten 9.4'e çıkarıldı.");
            }
        }, 1200);
    });
};

export default function CvBuilderPage() {
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

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
                        <h3 style={{ marginBottom: '28px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <User size={20} color="var(--accent)" /> 1. Kişisel Bilgiler
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ gridColumn: '1 / -1', marginBottom: '8px' }}>
                                <label className="input-label">Profil Fotoğrafı</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        {cvData.personal.photo ? (
                                            <img src={cvData.personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Camera size={24} color="var(--text-muted)" />
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label className="btn btn-secondary" style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '13px' }}>
                                            Kameradan Yükle
                                            <input type="file" accept="image/jpeg, image/png, image/webp" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                                        </label>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Maksimum boyut: 2MB</p>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
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
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                        <div>
                                            <label className="input-label">Okul / Üniversite Adı</label>
                                            <input className="input" placeholder="Örn: Boğaziçi Üniversitesi" value={edu.school} onChange={e => updateEdu(edu.id, 'school', e.target.value)} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Briefcase size={20} color="var(--accent)" /> 3. İş Deneyimi
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {cvData.experience.map((exp, idx) => (
                                <div key={exp.id} style={{ position: 'relative', padding: '28px 24px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    {idx > 0 && (
                                        <button onClick={() => removeExp(exp.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
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
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                                            <label className="input-label" style={{ marginBottom: 0 }}>Sorumluluklar ve Başarılar</label>
                                            <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: '12px', color: 'var(--accent)', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(108,99,255,0.2)' }} onClick={() => handleAIOptimizeExperience(exp.id)} disabled={isGenerating}>
                                                <Sparkles size={14} /> Yapay Zeka ile Profesyonelleştir
                                            </button>
                                        </div>
                                        <textarea className="textarea" placeholder="Neler yaptınız? Başarılarınızı sayılarla destekleyin." value={exp.desc} onChange={e => updateExp(exp.id, 'desc', e.target.value)} style={{ minHeight: '140px' }} />
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-secondary" onClick={addExp} style={{ width: '100%', borderStyle: 'dashed' }}>
                                <Plus size={16} /> Yeni İş Deneyimi Ekle
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="card animate-in">
                        <h3 style={{ marginBottom: '28px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Code size={20} color="var(--accent)" /> 4. Yetenekler
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div>
                                <label className="input-label">Teknik Yetenekler</label>
                                <TagInput tags={cvData.skills.technical} onTagsChange={(t) => updateSkills('technical', t)} placeholder="Örn: React, Node.js (Enter'a basın)" />
                            </div>
                            <div>
                                <label className="input-label">Yumuşak Yetenekler (Soft Skills)</label>
                                <TagInput tags={cvData.skills.soft} onTagsChange={(t) => updateSkills('soft', t)} placeholder="Örn: Takım çalışması, Problem çözme" />
                            </div>
                            <div>
                                <label className="input-label">Yabancı Diller</label>
                                <TagInput tags={cvData.skills.languages} onTagsChange={(t) => updateSkills('languages', t)} placeholder="Örn: İngilizce (B2)" />
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
                            İşe alım uzmanlarının CV'nizde ilk okuyacağı bölüm. AI asistanımız bugüne kadar girdiğiniz tüm verileri kullanarak size mükemmel bir özet oluşturabilir.
                        </p>
                        <div style={{ marginBottom: '20px' }}>
                            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '20px', padding: '16px' }} onClick={handleAIGenerateSummary} disabled={isGenerating}>
                                {isGenerating ? <span className="loading-pulse">Yapay Zeka Yazıyor...</span> : <><Sparkles size={18} /> Tüm CV Verilerimle Etkili Bir Özet Üret</>}
                            </button>
                            <label className="input-label">Veya Kendiniz Yazın / Düzenleyin</label>
                            <textarea className="textarea" placeholder="Kariyer hedeflerinizi ve öne çıkan yönlerinizi buraya yazın..." value={cvData.summary} onChange={e => setCvData({ ...cvData, summary: e.target.value })} style={{ minHeight: '160px' }} />
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    const getTemplateContainerStyle = (template) => {
        const base = { padding: '0', overflow: 'hidden', backgroundColor: '#fff', color: '#1a1a1a', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', minHeight: '800px' };
        if (template === 'corporate') return { ...base, fontFamily: "'Merriweather', 'Georgia', serif" };
        if (template === 'minimal') return { ...base, fontFamily: "system-ui, -apple-system, sans-serif" };
        if (template === 'ats') return { ...base, fontFamily: "'Arial', 'Helvetica', sans-serif", border: '1px solid #d1d5db', borderRadius: '0', boxShadow: 'none' };
        return { ...base, fontFamily: "'Inter', sans-serif" }; // modern
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <SEOHead
                title="Ücretsiz CV Oluşturucu | Profesyonel CV Hazırla"
                description="ATS uyumlu, şık ve profesyonel özgeçmişinizi dakikalar içinde ücretsiz oluşturun."
                url="https://xn--mlakat-3ya.com/cv-hazirla"
            />
            <NavBar />
            <Breadcrumbs items={[{ label: 'CV Oluştur', to: '/cv-builder' }]} />

            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <Sparkles size={14} style={{ marginRight: '6px' }} /> AI Destekli
                    </div>
                    <h1 className="section-title">Mülakat.com CV Oluşturucu</h1>
                    <p className="section-sub">ATS uyumlu, tasarımıyla öne çıkan profesyonel özgeçmişinizi 5 adımda tasarlayın.</p>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 450px', gap: '40px', alignItems: 'start' }}>

                {/* Left Side: Wizard Editor */}
                <div>
                    {/* Stepper Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', padding: '0 16px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '16px', left: '32px', right: '32px', height: '2px', background: 'var(--border)', zIndex: 0 }} />
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1 }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: step === i ? 'var(--accent)' : step > i ? 'var(--success)' : 'var(--bg-primary)',
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
                    <div style={{ minHeight: '520px' }}>
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

                {/* Right Side: Live Template Preview & Export */}
                <div style={{ position: 'sticky', top: '100px' }}>

                    {/* Template Selection */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Layout size={14} /> ŞABLON:
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {[
                                { id: 'modern', label: 'Modern' },
                                { id: 'corporate', label: 'Kurumsal' },
                                { id: 'minimal', label: 'Minimal' },
                                { id: 'ats', label: 'ATS' }
                            ].map(t => (
                                <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                                    style={{
                                        padding: '6px 12px', fontSize: '12px', fontWeight: 600, borderRadius: '20px', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                        backgroundColor: selectedTemplate === t.id ? 'var(--accent)' : 'transparent',
                                        color: selectedTemplate === t.id ? '#fff' : 'var(--text-secondary)'
                                    }}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Live Preview Container */}
                    <div id="cv-preview-container" style={getTemplateContainerStyle(selectedTemplate)}>
                        {selectedTemplate === 'modern' && <ModernTemplate data={cvData} />}
                        {selectedTemplate === 'corporate' && <CorporateTemplate data={cvData} />}
                        {selectedTemplate === 'minimal' && <MinimalTemplate data={cvData} />}
                        {selectedTemplate === 'ats' && <AtsTemplate data={cvData} />}
                    </div>

                    {/* Export Section */}
                    <div className="card" style={{ marginTop: '20px', padding: '24px', border: '1px solid rgba(108,99,255,0.25)', background: 'linear-gradient(135deg, rgba(108,99,255,0.05), transparent)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <Download size={18} color="var(--accent)" />
                            <h4 style={{ fontWeight: 700, fontSize: '14px' }}>CV'yi İndir</h4>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <button className="btn btn-primary" style={{ padding: '12px', fontSize: '13px', display: 'flex', gap: '8px', justifyContent: 'center' }} onClick={() => isLoggedIn ? exportToPDF('cv-preview-container', `${cvData.personal.name || 'CV'}.pdf`) : setShowAuthModal(true)}>
                                <FileText size={16} /> PDF Olarak İndir
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '12px', fontSize: '13px', display: 'flex', gap: '8px', justifyContent: 'center', background: '#fff', color: '#1a1a1a' }} onClick={() => isLoggedIn ? exportToDOCX(cvData, `${cvData.personal.name || 'CV'}.docx`) : setShowAuthModal(true)}>
                                <FileText size={16} color="#2563eb" /> DOCX (Word)
                            </button>
                            <button className="btn btn-ghost" style={{ padding: '10px', fontSize: '12px', display: 'flex', gap: '6px', justifyContent: 'center', border: '1px solid var(--border)' }} onClick={() => isLoggedIn ? exportToTXT(cvData, `${cvData.personal.name || 'CV'}.txt`) : setShowAuthModal(true)}>
                                <AlignLeft size={14} /> Düz Metin (TXT)
                            </button>
                            <button className="btn btn-ghost" style={{ padding: '10px', fontSize: '12px', display: 'flex', gap: '6px', justifyContent: 'center', border: '1px solid var(--border)' }} onClick={() => isLoggedIn ? exportToJSON(cvData, `${cvData.personal.name || 'CV'}.json`) : setShowAuthModal(true)}>
                                <FileCode size={14} /> JSON Verisi
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* ---------------- TEMPLATES ---------------- */

const ModernTemplate = ({ data }) => (
    <>
        <div style={{ height: '8px', background: 'var(--accent)' }} />
        <div style={{ padding: '32px 32px 40px', fontSize: '12px', lineHeight: 1.5 }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                {data.personal.photo && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <img src={data.personal.photo} alt="Profile" style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </div>
                )}
                <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px', color: '#0f172a', letterSpacing: '-0.5px' }}>{data.personal.name || 'Ad Soyad'}</h1>
                <p style={{ color: '#475569', fontSize: '15px', fontWeight: 500, marginBottom: '16px' }}>{data.personal.title || 'Mesleki Unvan'}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', color: '#64748b', fontSize: '11px' }}>
                    {data.personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageCircle size={12} /> {data.personal.email}</span>}
                    {data.personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>• {data.personal.phone}</span>}
                    {data.personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} /> {data.personal.location}</span>}
                </div>
                {(data.personal.linkedin || data.personal.portfolio) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', color: '#64748b', fontSize: '11px', marginTop: '10px' }}>
                        {data.personal.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Linkedin size={12} /> {data.personal.linkedin.replace('https://', '')}</span>}
                        {data.personal.portfolio && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={12} /> {data.personal.portfolio.replace('https://', '')}</span>}
                    </div>
                )}
            </div>

            {data.summary && (
                <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6c63ff', marginBottom: '10px', paddingBottom: '4px', letterSpacing: '1px' }}>Profil Özeti</h4>
                    <p style={{ color: '#334155', textAlign: 'justify' }}>{data.summary}</p>
                </div>
            )}

            {data.experience.length > 0 && data.experience[0].company && (
                <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6c63ff', marginBottom: '14px', paddingBottom: '4px', letterSpacing: '1px' }}>İş Deneyimi</h4>
                    {data.experience.map((exp) => exp.company && (
                        <div key={exp.id} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{exp.position}</p>
                                <p style={{ fontSize: '12px', color: '#6c63ff', fontWeight: 600 }}>{exp.dates}</p>
                            </div>
                            <p style={{ fontSize: '13px', color: '#475569', fontWeight: 500, marginBottom: '8px' }}>{exp.company}</p>
                            <p style={{ color: '#334155', whiteSpace: 'pre-line', fontSize: '12px' }}>{exp.desc}</p>
                        </div>
                    ))}
                </div>
            )}

            {data.education.length > 0 && data.education[0].school && (
                <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6c63ff', marginBottom: '14px', paddingBottom: '4px', letterSpacing: '1px' }}>Eğitim Bilgileri</h4>
                    {data.education.map((edu) => edu.school && (
                        <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                            <div>
                                <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{edu.school}</p>
                                <p style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{edu.degree}</p>
                            </div>
                            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{edu.year}</p>
                        </div>
                    ))}
                </div>
            )}

            {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
                <div>
                    <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6c63ff', marginBottom: '12px', paddingBottom: '4px', letterSpacing: '1px' }}>Yetenekler</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                        {data.skills.technical.length > 0 && <p><span style={{ fontWeight: 700, color: '#0f172a', marginRight: '6px' }}>Teknik:</span> <span style={{ color: '#334155' }}>{data.skills.technical.join(' • ')}</span></p>}
                        {data.skills.soft.length > 0 && <p><span style={{ fontWeight: 700, color: '#0f172a', marginRight: '6px' }}>Sosyal:</span> <span style={{ color: '#334155' }}>{data.skills.soft.join(' • ')}</span></p>}
                        {data.skills.languages.length > 0 && <p><span style={{ fontWeight: 700, color: '#0f172a', marginRight: '6px' }}>Diller:</span> <span style={{ color: '#334155' }}>{data.skills.languages.join(' • ')}</span></p>}
                    </div>
                </div>
            )}
        </div>
    </>
);

const CorporateTemplate = ({ data }) => (
    <div style={{ padding: '40px', fontSize: '12px', lineHeight: 1.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', borderBottom: '2px solid #0f172a', paddingBottom: '24px' }}>
            {data.personal.photo && (
                <img src={data.personal.photo} alt="Profile" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
            )}
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>{data.personal.name || 'Ad Soyad'}</h1>
                <p style={{ color: '#334155', fontSize: '16px', margin: '0 0 12px 0' }}>{data.personal.title || 'Mesleki Unvan'}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#475569', fontSize: '11px' }}>
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>| {data.personal.phone}</span>}
                    {data.personal.location && <span>| {data.personal.location}</span>}
                </div>
                {(data.personal.linkedin || data.personal.portfolio) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#475569', fontSize: '11px', marginTop: '6px' }}>
                        {data.personal.linkedin && <span>LinkedIn: {data.personal.linkedin.replace('https://', '')}</span>}
                        {data.personal.portfolio && <span>| Web: {data.personal.portfolio.replace('https://', '')}</span>}
                    </div>
                )}
            </div>
        </div>

        {data.summary && (
            <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase' }}>Profesyonel Özet</h4>
                <p style={{ color: '#1e293b', textAlign: 'justify' }}>{data.summary}</p>
            </div>
        )}

        {data.experience.length > 0 && data.experience[0].company && (
            <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase' }}>İş Deneyimi</h4>
                {data.experience.map((exp) => exp.company && (
                    <div key={exp.id} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                            <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{exp.position}</p>
                            <p style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>{exp.dates}</p>
                        </div>
                        <p style={{ fontSize: '13px', color: '#334155', fontStyle: 'italic', marginBottom: '8px' }}>{exp.company}</p>
                        <p style={{ color: '#1e293b', whiteSpace: 'pre-line', fontSize: '12px' }}>{exp.desc}</p>
                    </div>
                ))}
            </div>
        )}

        {data.education.length > 0 && data.education[0].school && (
            <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase' }}>Eğitim Bilgileri</h4>
                {data.education.map((edu) => edu.school && (
                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{edu.school}</p>
                            <p style={{ fontSize: '13px', color: '#334155', marginTop: '2px' }}>{edu.degree}</p>
                        </div>
                        <p style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>{edu.year}</p>
                    </div>
                ))}
            </div>
        )}

        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
            <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase' }}>Yetenekler</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                    {data.skills.technical.length > 0 && <p><strong style={{ color: '#0f172a' }}>Teknik:</strong> {data.skills.technical.join(', ')}</p>}
                    {data.skills.soft.length > 0 && <p><strong style={{ color: '#0f172a' }}>Sosyal:</strong> {data.skills.soft.join(', ')}</p>}
                    {data.skills.languages.length > 0 && <p><strong style={{ color: '#0f172a' }}>Diller:</strong> {data.skills.languages.join(', ')}</p>}
                </div>
            </div>
        )}
    </div>
);

const MinimalTemplate = ({ data }) => (
    <div style={{ padding: '48px 40px', fontSize: '12px', lineHeight: 1.6, color: '#111827' }}>
        <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 300, color: '#111827', margin: '0 0 12px 0', letterSpacing: '-1px' }}>{data.personal.name || 'Ad Soyad'}</h1>
            <p style={{ fontSize: '18px', fontWeight: 400, color: '#6b7280', margin: '0 0 24px 0' }}>{data.personal.title || 'Mesleki Unvan'}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: '#4b5563', fontSize: '11px', fontWeight: 500 }}>
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.phone && <span>{data.personal.phone}</span>}
                {data.personal.location && <span>{data.personal.location}</span>}
                {data.personal.linkedin && <span>{data.personal.linkedin.replace('https://', '')}</span>}
            </div>
        </div>

        {data.summary && (
            <div style={{ marginBottom: '32px' }}>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.8 }}>{data.summary}</p>
            </div>
        )}

        {data.experience.length > 0 && data.experience[0].company && (
            <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Deneyim</h4>
                {data.experience.map((exp) => exp.company && (
                    <div key={exp.id} style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500, paddingTop: '2px' }}>{exp.dates}</div>
                            <div>
                                <h5 style={{ fontWeight: 600, fontSize: '15px', color: '#111827', margin: '0 0 4px 0' }}>{exp.position}</h5>
                                <p style={{ fontSize: '13px', color: '#4b5563', margin: '0 0 12px 0' }}>{exp.company}</p>
                                <p style={{ color: '#374151', whiteSpace: 'pre-line', fontSize: '13px', lineHeight: 1.6 }}>{exp.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {data.education.length > 0 && data.education[0].school && (
            <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Eğitim</h4>
                {data.education.map((edu) => edu.school && (
                    <div key={edu.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500, paddingTop: '2px' }}>{edu.year}</div>
                        <div>
                            <h5 style={{ fontWeight: 600, fontSize: '14px', color: '#111827', margin: '0 0 4px 0' }}>{edu.school}</h5>
                            <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>{edu.degree}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
            <div>
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Yetenekler</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                    <div />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#374151' }}>
                        {data.skills.technical.length > 0 && <p>{data.skills.technical.join(', ')}</p>}
                        {data.skills.soft.length > 0 && <p>{data.skills.soft.join(', ')}</p>}
                        {data.skills.languages.length > 0 && <p>{data.skills.languages.join(', ')}</p>}
                    </div>
                </div>
            </div>
        )}
    </div>
);

const AtsTemplate = ({ data }) => (
    <div style={{ padding: '40px', fontSize: '11pt', lineHeight: 1.4, color: '#000' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>{data.personal.name || 'Ad Soyad'}</h1>
            <p style={{ fontSize: '11pt', margin: '0 0 8px 0' }}>
                {data.personal.location && <span>{data.personal.location} | </span>}
                {data.personal.phone && <span>{data.personal.phone} | </span>}
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.linkedin && <span> | {data.personal.linkedin.replace('https://', '')}</span>}
            </p>
        </div>

        {data.summary && (
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '8px', textTransform: 'uppercase' }}>Professional Summary</h2>
                <p style={{ textAlign: 'justify', margin: 0 }}>{data.summary}</p>
            </div>
        )}

        {data.experience.length > 0 && data.experience[0].company && (
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '8px', textTransform: 'uppercase' }}>Professional Experience</h2>
                {data.experience.map((exp) => exp.company && (
                    <div key={exp.id} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>{exp.company}</span>
                            <span>{exp.dates}</span>
                        </div>
                        <div style={{ fontStyle: 'italic', marginBottom: '4px' }}>{exp.position}</div>
                        <p style={{ margin: 0, paddingLeft: '16px', whiteSpace: 'pre-line' }}>{exp.desc}</p>
                    </div>
                ))}
            </div>
        )}

        {data.education.length > 0 && data.education[0].school && (
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '8px', textTransform: 'uppercase' }}>Education</h2>
                {data.education.map((edu) => edu.school && (
                    <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>{edu.school}</span>, {edu.degree}
                        </div>
                        <span>{edu.year}</span>
                    </div>
                ))}
            </div>
        )}

        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
            <div>
                <h2 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #000', marginBottom: '8px', textTransform: 'uppercase' }}>Skills</h2>
                {data.skills.technical.length > 0 && <div style={{ marginBottom: '4px' }}><span style={{ fontWeight: 'bold' }}>Technical Skills:</span> {data.skills.technical.join(', ')}</div>}
                {data.skills.soft.length > 0 && <div style={{ marginBottom: '4px' }}><span style={{ fontWeight: 'bold' }}>Soft Skills:</span> {data.skills.soft.join(', ')}</div>}
                {data.skills.languages.length > 0 && <div style={{ marginBottom: '4px' }}><span style={{ fontWeight: 'bold' }}>Languages:</span> {data.skills.languages.join(', ')}</div>}
            </div>
        )}
    </div>
);
