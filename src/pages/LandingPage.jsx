import { useNavigate, Link } from 'react-router-dom';
import {
    Mic, FileText, DollarSign, Calculator, Briefcase,
    ShieldCheck, ArrowRight, Building, Star, Users,
    Search, LayoutList, MessageSquare, BookOpen, Quote, Zap, ArrowUpRight,
    ChevronRight
} from 'lucide-react';
import NavBar from '../components/NavBar';
import SEOHead from '../components/SEOHead';

const POPULAR_TOOLS = [
    { icon: DollarSign, title: 'Maaş Hesaplama', desc: 'Sektör ve tecrübeye göre net maaşını hesapla.', href: '/maas-hesaplama', color: '#10b981', bg: 'rgba(16,185,129,0.1)', badge: null },
    { icon: Calculator, title: 'Asgari Ücret Hesaplama', desc: 'Güncel asgari ücret net ve brüt oranlarını gör.', href: '/asgari-ucret', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', badge: null },
    { icon: Briefcase, title: 'Kıdem Tazminatı', desc: 'İşten ayrılma durumunda alacağın tazminatı anında hesapla.', href: '/kidem-tazminati', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', badge: null },
    { icon: ShieldCheck, title: 'İhbar Tazminatı', desc: 'İhbar sürelerine göre tazminat ve haklarını hemen öğren.', href: '/ihbar-tazminati', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', badge: null },
    { icon: FileText, title: 'CV Oluşturucu', desc: "Profesyonel, ATS uyumlu CV'ni dakikalar içinde hazırla.", href: '/cv-hazirla', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', badge: null },
    { icon: Mic, title: 'AI Mülakat Simülatörü', desc: 'Yapay zeka asistanıyla gerçekçi mülakat deneyimi yaşa.', href: '/ai-interview', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', badge: 'En Çok Tercih Edilen' },
];

const INTERVIEW_QUESTIONS = [
    { title: 'Yazılım Uzmanı', count: '45 Soru', href: '/interview-questions/yazilim-muhendisi' },
    { title: 'İK Uzmanı', count: '32 Soru', href: '/interview-questions/ik' },
    { title: 'Satış Temsilcisi', count: '28 Soru', href: '/interview-questions/satis-temsilcisi' },
    { title: 'Banka Gişe Görevlisi', count: '50+ Soru', href: '/interview-questions/banka' },
    { title: 'Çağrı Merkezi', count: '25 Soru', href: '/interview-questions/cagri-merkezi' },
    { title: 'Stajyer', count: '18 Soru', href: '/interview-questions/staj' },
];

const SALARIES = [
    { title: 'Yazılım Mühendisi', range: '₺45.000 - ₺120.000', href: '/yazilim-muhendisi-maasi' },
    { title: 'Frontend Developer', range: '₺40.000 - ₺100.000', href: '/frontend-developer-maasi' },
    { title: 'Backend Developer', range: '₺45.000 - ₺120.000', href: '/backend-developer-maasi' },
    { title: 'Veri Analisti', range: '₺35.000 - ₺85.000', href: '/veri-analisti-maasi' },
    { title: 'Ürün Yöneticisi', range: '₺50.000 - ₺130.000', href: '/urun-yoneticisi-maasi' },
    { title: 'Çağrı Merkezi', range: '₺18.500 - ₺32.000', href: '/cagri-merkezi-maasi' },
];

const COMPANIES = ['Trendyol', 'Hepsiburada', 'Amazon', 'Garanti BBVA', 'Migros', 'Aselsan', 'Türk Hava Yolları', 'Koç Holding'];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <SEOHead
                title="mülakat.com — Türkiye'nin Ücretsiz Kariyer Veri Platformu"
                description="mülakat.com ile alanınıza özel mülakat sorularını öğrenin, maaşınızı hesaplayın, profesyonel CV oluşturun ve mülakat simülasyonları yapın."
                url="https://mülakat.com"
            />
            <NavBar />

            {/* 1. HERO SECTION */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px 80px', position: 'relative' }}>
                {/* Ambient Background Glow */}
                <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(circle, rgba(109, 93, 252, 0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 1 }}>

                    {/* Hero Text */}
                    <div style={{ zIndex: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '13px', border: '1px solid rgba(109, 93, 252, 0.3)' }}>
                                <Zap size={14} color="var(--accent)" /> Türkiye'nin Lider Kariyer & AI Platformu
                            </span>
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 900,
                            lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-primary)',
                            letterSpacing: '-0.03em'
                        }}>
                            Kariyerini <span className="gradient-text" style={{ textShadow: '0 0 40px rgba(109, 93, 252, 0.3)' }}>Verilerle</span> Yönet.
                        </h1>
                        <p style={{
                            fontSize: '1.25rem', color: 'var(--text-secondary)',
                            marginBottom: '40px', lineHeight: 1.6, maxWidth: '540px'
                        }}>
                            Mülakat sorularını öğren, maaşını hesapla, CV'ni oluştur ve
                            iş hayatı verilerine tamamen <strong>ücretsiz</strong>, reklamsız ulaş.
                        </p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button className="btn btn-primary" onClick={() => navigate('/ai-interview')} style={{ fontSize: '16px', padding: '16px 32px', borderRadius: '12px' }}>
                                <Mic size={20} /> AI Mülakata Başla
                            </button>
                            <button className="btn btn-secondary" onClick={() => navigate('/maas-hesaplama')} style={{ fontSize: '16px', padding: '16px 32px', borderRadius: '12px', background: 'var(--bg-card)' }}>
                                <DollarSign size={20} /> Maaş Hesapla
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '36px', fontSize: '14px', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ display: 'flex', gap: '-10px' }}>
                                    {['E', 'A', 'M', 'S', 'K'].map((initial, i) => (
                                        <div key={i} style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i], border: '2px solid var(--bg-primary)',
                                            zIndex: 5 - i, marginLeft: i === 0 ? 0 : '-12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#ffffff', fontSize: '13px', fontWeight: 700
                                        }}>
                                            {initial}
                                        </div>
                                    ))}
                                </div>
                                <span><strong style={{ color: 'var(--text-primary)' }}>10.000+</strong> kullanıcı kariyer araçlarını kullandı</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}></div>
                                    <span><strong>500+</strong> mülakat sorusu analiz edildi</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }}></div>
                                    <span><strong>100+</strong> şirket mülakat deneyimi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Illustration (Abstract Visual System) */}
                    <div style={{ position: 'relative', width: '100%', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{
                            position: 'absolute', width: '340px', height: '340px',
                            background: 'linear-gradient(135deg, rgba(108,99,255,0.4), rgba(0,212,170,0.4))',
                            borderRadius: '50%', filter: 'blur(70px)', zIndex: 0
                        }} />

                        <div className="glass-card" style={{
                            position: 'relative', zIndex: 1, padding: '28px', borderRadius: '24px',
                            boxShadow: '0 24px 50px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px',
                            border: '1px solid rgba(255,255,255,0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Mic size={24} color="var(--accent)" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '15px', fontWeight: 700 }}>Yazılım Mülakatı</div>
                                        <div style={{ fontSize: '13px', color: 'var(--success)' }}>Bağlantı Kuruldu</div>
                                    </div>
                                </div>
                                <div className="loading-pulse" style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} />
                            </div>

                            <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '20px', marginBottom: '20px', border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.6 }}>"Bize karşılaştığın en zor teknik problemi ve nasıl çözdüğünü anlatır mısın?"</div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <div style={{ height: '4px', width: '30%', background: 'var(--accent)', borderRadius: '2px' }} />
                                    <div style={{ height: '4px', width: '70%', background: 'var(--border)', borderRadius: '2px' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>8.5/10</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mülakat Skoru</div>
                                </div>
                                <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--success)' }}>%92</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>İşle Eşleşme</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. SPONSORS / FEATURED COMPANIES (Moved up for trust building) */}
            <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '48px 24px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '400px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.5 }} />
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '32px' }}>
                        Platformumuzda mülakat deneyimi paylaşılan şirketler
                    </p>
                    <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap', opacity: 0.6, filter: 'grayscale(100%)', marginBottom: '24px' }}>
                        {COMPANIES.slice(0, 6).map(c => (
                            <span key={c} style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{c}</span>
                        ))}
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', opacity: 0.7, maxWidth: '800px', margin: '0 auto' }}>
                        Burada yer alan şirket isimleri ilgili markaların ticari mülküdür. Mülakat.com bu şirketlerle resmi bir iş birliği içinde değildir. Şirket isimleri yalnızca kullanıcıların paylaştığı mülakat deneyimleri bağlamında gösterilmektedir.
                    </p>
                </div>
            </section>

            {/* 2. POPULAR TOOLS SECTION */}
            <section id="araclar" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px', border: '1px solid rgba(109, 93, 252, 0.3)' }}>1. Kariyer Araçları</div>
                    <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800 }}>Mülakat ve İş Başvuru Araçları</h2>
                    <p className="section-sub" style={{ fontSize: '1.15rem' }}>Mülakatlara hazırlanın, profesyonel CV'nizi oluşturun ve haklarınızı anında hesaplayın.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {POPULAR_TOOLS.map(tool => {
                        const Icon = tool.icon;
                        return (
                            <Link key={tool.title} to={tool.href} className="tool-card" style={{ padding: '32px', position: 'relative' }}>
                                {tool.badge && (
                                    <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                                        <span className="badge badge-accent" style={{ background: tool.bg, color: tool.color, border: 'none' }}>{tool.badge}</span>
                                    </div>
                                )}
                                <div className="tool-icon-wrap" style={{ background: tool.bg, marginBottom: '24px', width: '56px', height: '56px' }}>
                                    <Icon size={28} color={tool.color} />
                                </div>
                                <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
                                    {tool.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                                    {tool.desc}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: tool.color, fontSize: '14px', fontWeight: 600 }}>
                                    Aracı Kullan <ArrowRight size={14} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* 2.5 PLATFORM CARD */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px' }}>
                <div className="card glass-card hover-lift" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between', padding: '40px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div className="badge badge-accent" style={{ background: 'var(--accent)', color: '#fff', border: 'none', marginBottom: '16px' }}>Öne Çıkan</div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Kariyerinde Bir Adım Öne Geç</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                            Gerçek mülakat deneyimlerine eriş, AI ile sınırlarını zorla ve şirket mülakatlarından çekinmeden hayalindeki işi kap.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('/ai-interview')} style={{ display: 'inline-flex', padding: '14px 28px', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                            Platformu Keşfet <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </div>
                    <div style={{ width: '100%', maxWidth: '300px', height: '200px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>mülakat<span style={{ color: 'var(--accent)' }}>.com</span></div>
                            <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>Kariyer Pusulanız</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 & 4. DUAL COLUMN: QUESTIONS & SALARIES */}
            <section style={{ background: 'var(--bg-secondary)', padding: '100px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px', background: 'rgba(0,212,170,0.1)', color: 'var(--success)', border: '1px solid rgba(0,212,170,0.3)' }}>2. Kariyer Veri Platformu</div>
                    <h2 className="section-title" style={{ maxWidth: '600px', margin: '0 auto 16px', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800 }}>Piyasa Maaşları ve Soru Havuzu</h2>
                    <p className="section-sub" style={{ fontSize: '1.15rem' }}>Adaylar tarafından eklenen binlerce gerçek mülakat sorusuna ve 2026 güncel maaş verisine ücretsiz ulaşın.</p>
                </div>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '48px' }}>

                    {/* 3. MOST SEARCHED INTERVIEW QUESTIONS */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MessageSquare size={20} color="#3b82f6" />
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Mülakat Soruları</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                            Farklı pozisyonlar için gerçek adayların karşılaştığı mülakat sorularına göz at.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {INTERVIEW_QUESTIONS.map(q => (
                                <Link key={q.title} to={q.href} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '16px 20px', background: 'var(--bg-card)', borderRadius: '12px',
                                    border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.2s',
                                }} className="hover-lift">
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.title}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{q.count}</span>
                                        <ChevronRight size={16} color="var(--text-muted)" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <button className="btn btn-ghost" style={{ width: '100%', marginTop: '16px' }} onClick={() => navigate('/mulakat-sorulari')}>
                            Tümünü Gör <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* 4. MOST SEARCHED SALARIES */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <DollarSign size={20} color="#10b981" />
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Meslek Maaşları</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                            2026 yılı güncel piyasa araştırmalarına göre pozisyonların ortalama maaş bantları.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {SALARIES.map(s => (
                                <Link key={s.title} to={s.href} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '16px 20px', background: 'var(--bg-card)', borderRadius: '12px',
                                    border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.2s',
                                }} className="hover-lift">
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--success)' }}>{s.range}</span>
                                        <ChevronRight size={16} color="var(--text-muted)" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <button className="btn btn-ghost" style={{ width: '100%', marginTop: '16px' }} onClick={() => navigate('/maas')}>
                            Tüm Maaşları Gör <ArrowRight size={16} />
                        </button>
                    </div>

                </div>
            </section>

            {/* 4.5 HOW IT WORKS SECTION */}
            <section style={{ padding: '80px 24px', background: 'var(--bg-primary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>Nasıl Çalışır?</div>
                    <h2 className="section-title">Kariyeriniz İçin 3 Adım</h2>
                    <p className="section-sub" style={{ marginBottom: '56px' }}>Hedefinize ulaşmak hiç bu kadar kolay olmamıştı.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                        {[
                            { step: '1', title: 'Pratik Yap', desc: 'AI Simülatörü ile gerçek mülakat sorularını yanıtla. Eksiklerini anında gör ve koçluk al.', icon: <Mic size={24} color="var(--accent)" /> },
                            { step: '2', title: 'CV\'ni Tasarla', desc: 'Sektörüne ve uzmanlığına özel, ATS sistemlerinden 100 üzerinden geçen mükemmel bir özgeçmiş oluştur.', icon: <FileText size={24} color="var(--success)" /> },
                            { step: '3', title: 'Özgüvenle Başvur', desc: 'Piyasa maaşlarını öğren, ne isteyeceğini bil. Rakiplerinden bir adım öne geçerek hayalindeki işi kap.', icon: <ShieldCheck size={24} color="var(--warning)" /> }
                        ].map((s, idx) => (
                            <div key={idx} className="card hover-lift" style={{ position: 'relative', overflow: 'visible', paddingTop: '48px', textAlign: 'center' }}>
                                <div style={{
                                    position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)',
                                    width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-card)',
                                    border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                }}>
                                    {s.step}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {s.icon}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>{s.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. COMPANY INTERVIEW EXPERIENCES */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>Şirketler</div>
                    <h2 className="section-title">Şirket Mülakat Deneyimleri</h2>
                    <p className="section-sub">Türkiye'nin en büyük şirketlerindeki mülakat süreçlerini adayların ağzından oku.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {[
                        { n: 'Trendyol', r: '4.8', res: '85 Yorum', href: '/company/trendyol' },
                        { n: 'Hepsiburada', r: '4.5', res: '64 Yorum', href: '/company/hepsiburada' },
                        { n: 'Amazon', r: '4.9', res: '112 Yorum', href: '/company/amazon' },
                        { n: 'Garanti BBVA', r: '4.4', res: '45 Yorum', href: '/company/garanti' },
                        { n: 'Migros', r: '4.2', res: '92 Yorum', href: '/company/migros' },
                        { n: 'Türk Hava Yolları', r: '4.7', res: '150 Yorum', href: '/company/thy' },
                    ].map(c => (
                        <Link key={c.n} to={c.href} className="card hover-lift" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Building size={24} color="var(--text-secondary)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{c.n}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 600 }}>
                                        <Star size={12} fill="#f59e0b" /> {c.r}
                                    </span>
                                    <span>•</span>
                                    <span>{c.res}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/sirketler')}>Tüm Şirketleri Gör</button>
                </div>
            </section>

            {/* 6. SHARE YOUR EXPERIENCE */}
            <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(0,212,170,0.08) 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <Quote size={40} color="var(--accent)" style={{ opacity: 0.5, marginBottom: '24px' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Topluluğa Katkıda Bulun</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
                        Deneyimlerini paylaşarak binlerce kişinin kariyer yolculuğuna ışık tut.
                        Paylaşımların tamamen anonim kalır.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/katki/mulakat')}>
                            <MessageSquare size={18} /> Mülakat Deneyimini Paylaş
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/katki/maas')}>
                            <DollarSign size={18} /> Maaşını Anonim Paylaş
                        </button>
                    </div>
                </div>
            </section>

            {/* 6.5 TRUST ELEMENTS */}
            <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '40px' }}>Neden Mülakat.com'a Güveniyorlar?</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
                        {[
                            { title: 'Gerçek Aday Soruları', icon: <MessageSquare size={20} /> },
                            { title: 'Sektör Ortalaması Maaş Verisi', icon: <DollarSign size={20} /> },
                            { title: 'AI Destekli Akıllı Özgeçmiş', icon: <FileText size={20} /> },
                            { title: '%100 Ücretsiz Kariyer Araçları', icon: <Star size={20} /> }
                        ].map((t, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: '99px', border: '1px solid var(--border)' }}>
                                <div style={{ color: 'var(--success)' }}>{t.icon}</div>
                                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{t.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. AI INTERVIEW TEST */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '320px' }}>
                        <div className="badge badge-accent" style={{ marginBottom: '16px' }}>Yapay Zeka</div>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
                            Sanal Mülakat ile Gerçek Deneyim
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '32px' }}>
                            Türkiye'nin ilk rol bazlı AI Mülakat Simülatörü ile tanışın.
                            Pozisyonunuzu seçin, CV'nizi yükleyin ve sistemimizin sorduğu
                            gerçek mülakat sorularını yanıtlayın. Anında puan ve koçluk geri bildirimi alın.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                            {['Özelleştirilmiş teknik sorular', 'Davranışsal analiz (STAR metodu)', 'Anında detaylı performans raporu'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,212,170,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Star size={14} color="var(--success)" />
                                    </div>
                                    <span style={{ fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate('/ai-interview')}>
                            <Mic size={18} /> Şimdi Ücretsiz Dene
                        </button>
                    </div>

                    <div style={{ flex: 1, minWidth: '320px' }}>
                        <div style={{ background: 'var(--bg-secondary)', borderRadius: '24px', padding: '40px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--accent-glow)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.5 }}></div>

                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', position: 'relative', zIndex: 1 }}>Rütbeler</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                {[
                                    { score: '0-3', label: 'Çaylak', color: '#64748b' },
                                    { score: '3-5', label: 'Aday', color: '#3b82f6' },
                                    { score: '5-7', label: 'Usta', color: '#8b5cf6' },
                                    { score: '7-8.5', label: 'Lider', color: '#10b981' },
                                    { score: '8.5-10', label: 'Şampiyon', color: '#f59e0b' },
                                ].map((r) => (
                                    <div key={r.label} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                                        borderRadius: '12px', padding: '16px 20px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: r.color }}></div>
                                            <span style={{ fontWeight: 600, fontSize: '15px' }}>{r.label}</span>
                                        </div>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{r.score} Puan</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. CAREER GUIDE */}
            <section style={{ background: 'var(--bg-secondary)', padding: '100px 24px', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
                        <div>
                            <div className="badge badge-accent" style={{ marginBottom: '16px' }}>İçerik</div>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0' }}>Kariyer Rehberi</h2>
                        </div>
                        <button className="btn btn-ghost" onClick={() => navigate('/rehber')}>Tüm Rehber Yazıları <ArrowRight size={16} /></button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                        {[
                            { t: 'Etkili CV Nasıl Hazırlanır?', type: 'Makale', d: 'ATS uyumlu ve İK uzmanlarının dikkatini çeken CV yazım rehberi.', href: '/rehber/cv-nasil-hazirlanir' },
                            { t: 'Mülakatta Kendini Nasıl Tanıtırsın?', type: 'Taktik', d: 'En kritik soruya verilecek en iyi örnek yanıtlar.', href: '/rehber/mulakat-nasil-gecilir' },
                            { t: 'Örnek İstifa Dilekçesi Şablonları', type: 'Belge', d: 'Profesyonel bir ayrılış için kullanabileceğin yasal şablonlar.', href: '/rehber/istifa-dilekcesi' },
                            { t: 'Sorulması Gereken Mülakat Soruları', type: 'Makale', d: 'Mülakat sonunda sen ne sormalısın? İK\'yı etkileyecek sorular.', href: '/rehber/mulakatta-sorulacak-sorular' }
                        ].map(g => (
                            <Link key={g.t} to={g.href} style={{
                                background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)',
                                textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%',
                            }} className="hover-lift">
                                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)', marginBottom: '12px' }}>{g.type}</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.4 }}>{g.t}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{g.d}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500, marginTop: '24px' }}>
                                    Oku <ArrowUpRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. STRONG FOOTER */}
            <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '60px 24px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '60px' }}>

                    {/* Brand */}
                    <div style={{ gridColumn: '1 / -1', maxWidth: '300px' }}>
                        <div style={{ fontWeight: 800, fontSize: '24px', marginBottom: '16px' }}>
                            mülakat<span style={{ color: 'var(--accent)' }}>.com</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
                            Türkiye'nin ücretsiz kariyer veri ve araç platformu.
                            Mülakat simülasyonları, maaş araştırmaları ve iş hayatı rehberi.
                        </p>
                    </div>

                    {/* Columns */}
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>Araçlar</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/ai-interview" className="footer-link">AI Mülakat</Link>
                            <Link to="/cv-hazirla" className="footer-link">CV Oluşturucu</Link>
                            <Link to="/maas-hesaplama" className="footer-link">Maaş Hesaplama</Link>
                            <Link to="/asgari-ucret" className="footer-link">Asgari Ücret</Link>
                            <Link to="/kidem-tazminati" className="footer-link">Kıdem Tazminatı</Link>
                            <Link to="/ihbar-tazminati" className="footer-link">İhbar Tazminatı</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>Kategoriler</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/genel-mulakat-sorulari" className="footer-link">Mülakat Soruları</Link>
                            <Link to="/yazilim-muhendisi-maasi" className="footer-link">Meslek Maaşları</Link>
                            <Link to="/company/google" className="footer-link">Şirket Sayfaları</Link>
                            <Link to="/cv-hazirla" className="footer-link">CV Örnekleri</Link>
                            <Link to="/" className="footer-link">Kariyer Rehberi</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>Kurumsal</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/hakkimizda" className="footer-link">Hakkımızda</Link>
                            <Link to="/iletisim" className="footer-link">İletişim</Link>
                            <Link to="/privacy" className="footer-link">Gizlilik Politikası</Link>
                            <Link to="/kvkk" className="footer-link">KVKK ve Aydınlatma</Link>
                            <Link to="/cerez-politikasi" className="footer-link">Çerez Politikası</Link>
                            <Link to="/icerik-kaldirma" className="footer-link">İçerik Kaldırma Talebi</Link>
                            <Link to="/disclaimer" className="footer-link">Yasal Uyarı (Disclaimer)</Link>
                            <Link to="/terms" className="footer-link">Kullanım Koşulları</Link>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ padding: '24px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px', marginBottom: '32px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <strong>Yasal Uyarı:</strong> Mülakat.com bağımsız bir kariyer bilgi platformudur. Platformda yer alan maaş verileri ve mülakat deneyimleri kullanıcı katkılarına ve tahmini analizlere dayanabilir. Şirket isimleri yalnızca bilgilendirme amacıyla kullanılmaktadır ve ilgili markalarla resmi bir bağlantı bulunmamaktadır.
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Tüm hakları saklıdır.</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <ShieldCheck size={14} color="var(--success)" /> Verileriniz %100 Anonimdir
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
