import { useNavigate, Link } from 'react-router-dom';
import { Mic, FileText, DollarSign, FileSignature, Trophy, Users, Star, TrendingUp, ChevronRight, ArrowRight, Languages, Zap, Target, Crown } from 'lucide-react';
import NavBar from '../components/NavBar';

// Editable social proof
const SOCIAL_PROOF = {
    users: '10.000+',
    interviews: '47.382',
    avgScore: '6.4',
};

const TOOLS = [
    {
        icon: Mic, color: '#6D5DFC', bg: 'rgba(109,93,252,0.12)',
        title: 'AI Mülakat Provası',
        desc: 'Rol bazlı sorularla gerçek mülakat deneyimi yaşayın. Anlık puan ve koçluk geri bildirimi alın.',
        cta: 'Mülakata Başla', href: '/cv',
        badge: 'En Popüler',
    },
    {
        icon: FileText, color: '#00d4aa', bg: 'rgba(0,212,170,0.1)',
        title: 'AI CV Oluşturucu',
        desc: 'Profesyonel, ATS\'e uygun CV\'nizi dakikalar içinde oluşturun. PDF olarak indirin.',
        cta: 'CV Oluştur', href: '/cv-hazirla',
        badge: null,
    },
    {
        icon: DollarSign, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',
        title: 'Maaş Hesaplama',
        desc: 'Brüt maaşınızı net\'e çevirin, vergilerinizi hesaplayın, sektör karşılaştırması yapın.',
        cta: 'Hesapla', href: '/maas-hesaplama',
        badge: null,
    },
    {
        icon: FileSignature, color: '#ec4899', bg: 'rgba(236,72,153,0.1)',
        title: 'İstifa Dilekçesi',
        desc: 'Birkaç bilgiyle resmi ve profesyonel istifa dilekçenizi hazırlayın. Anında indirin.',
        cta: 'Dilekçe Oluştur', href: '/istifa-dilekcesi',
        badge: null,
    },
];

const RANKS_PREVIEW = [
    { score: '0-3', label: 'Mülakat Çaylağı', icon: <Star size={18} /> },
    { score: '3-5', label: 'Mülakat Adayı', icon: <Zap size={18} /> },
    { score: '5-7', label: 'Mülakat Ustası', icon: <Target size={18} /> },
    { score: '7-8.5', label: 'Mülakat Lideri', icon: <Trophy size={18} /> },
    { score: '8.5-10', label: 'Mülakat Şampiyonu', icon: <Crown size={18} /> },
];

const FAQS = [
    { q: 'Ücretsiz mi?', a: 'Evet, tüm temel özellikler tamamen ücretsizdir. CV oluşturucu, mülakat simülasyonu, maaş hesaplama ve istifa dilekçesi herhangi bir ücret veya kayıt gerektirmez.' },
    { q: 'Kaç soru var?', a: '6 soru: 1 giriş, 1 davranışsal, 2 role özgü, 1 problem çözme ve 1 kapanış sorusu. Her soru Türkçe ve role göre özelleştirilmiştir.' },
    { q: 'CV yüklemek zorunlu mu?', a: 'Hayır. CV adımını atlayabilir, doğrudan mülakata geçebilirsiniz. CV yüklerseniz rapor kişiselleştirilir.' },
    { q: 'Verilerim güvende mi?', a: 'Verileriniz anonim tutulmaktadır. Kişisel bilgi toplamıyoruz. E-posta adresinizi isteğe bağlı olarak yalnızca raporu almak için kullanıyoruz.' },
];

const SEO_LINKS = [
    { to: '/mulakat-sorulari', label: 'Genel Mülakat Soruları' },
    { to: '/yazilim-mulakat-sorulari', label: 'Yazılım Mülakat Soruları' },
    { to: '/satis-mulakat-sorulari', label: 'Satış Mülakat Soruları' },
    { to: '/pazarlama-mulakat-sorulari', label: 'Pazarlama Mülakat Soruları' },
    { to: '/urun-yonetimi-mulakat-sorulari', label: 'Ürün Yönetimi Soruları' },
    { to: '/veri-analisti-mulakat-sorulari', label: 'Veri Analisti Soruları' },
    { to: '/staj-mulakat-sorulari', label: 'Staj Mülakat Soruları' },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavBar />

            {/* HERO */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '96px 24px 80px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                    <span className="badge badge-accent" style={{ gap: '6px' }}>
                        <Languages size={14} /> Türkiye'nin #1 Kariyer Platformu
                    </span>
                    <span className="badge badge-success" style={{ gap: '6px' }}>
                        <Users size={12} /> {SOCIAL_PROOF.users} kullanıcı mülakat provası yaptı
                    </span>
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800,
                    lineHeight: 1.12, marginBottom: '24px', color: 'var(--text-primary)',
                }}>
                    AI Mülakat Koçu ile{' '}
                    <span className="gradient-text">Mülakat Provası</span> Yap
                </h1>

                <p style={{
                    fontSize: '1.15rem', color: 'var(--text-secondary)',
                    maxWidth: '600px', margin: '0 auto 44px', lineHeight: 1.8,
                }}>
                    CV analizi, rol bazlı sorular, anlık puanlama ve kişisel koçluk raporu.
                    Tamamen ücretsiz, Türkçe, kayıt gerektirmez.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/cv')} style={{ fontSize: '16px', padding: '15px 36px' }}>
                        <Mic size={18} /> Mülakata Başla
                    </button>
                    <a href="#araclar" className="btn btn-secondary" style={{ fontSize: '15px' }}>
                        Tüm araçları gör <ChevronRight size={16} />
                    </a>
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { icon: <Users size={16} />, val: SOCIAL_PROOF.users, label: 'Kullanıcı' },
                        { icon: <Mic size={16} />, val: SOCIAL_PROOF.interviews, label: 'Mülakat Yapıldı' },
                        { icon: <Star size={16} />, val: SOCIAL_PROOF.avgScore + '/10', label: 'Ortalama Puan' },
                    ].map(s => (
                        <div key={s.label} style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 800, fontSize: '1.6rem', color: 'var(--text-primary)' }}>{s.val}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                                <span style={{ color: 'var(--accent)' }}>{s.icon}</span> {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TOOL CARDS */}
            <section id="araclar" style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px 24px 80px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 className="section-title">Kariyer araçlarınız hepsi bir arada</h2>
                    <p className="section-sub">Mülakat provanızdan CV oluşturucuya, maaş hesaplamasından istifa dilekçesine.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {TOOLS.map(tool => {
                        const Icon = tool.icon;
                        return (
                            <Link key={tool.title} to={tool.href} className="tool-card">
                                {tool.badge && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <span className="badge badge-accent">{tool.badge}</span>
                                    </div>
                                )}
                                <div className="tool-icon-wrap" style={{ background: tool.bg }}>
                                    <Icon size={26} color={tool.color} />
                                </div>
                                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                                    {tool.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                                    {tool.desc}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: tool.color, fontSize: '14px', fontWeight: 600 }}>
                                    {tool.cta} <ArrowRight size={14} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 24px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '56px' }}>Nasıl çalışır?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>
                        {[
                            { n: '01', icon: <FileText size={24} color="#6D5DFC" />, t: 'CV\'ni Yükle', d: 'Metin yapıştır, PDF veya görsel olarak yükle.' },
                            { n: '02', icon: <Trophy size={24} color="#00d4aa" />, t: 'Pozisyonu Seç', d: '6 farklı rol arasından birini seç.' },
                            { n: '03', icon: <Mic size={24} color="#f59e0b" />, t: 'Soruları Yanıtla', d: '6 gerçekçi Türkçe soruyu yanıtla.' },
                            { n: '04', icon: <TrendingUp size={24} color="#ec4899" />, t: 'Raporu Al', d: 'Puan, rütbe ve gelişim önerileri.' },
                        ].map(s => (
                            <div key={s.n} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 800, letterSpacing: '2px', marginBottom: '16px' }}>{s.n}</div>
                                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    {s.icon}
                                </div>
                                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{s.t}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>{s.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GAMIFICATION */}
            <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 className="section-title">Rütbenizi kazanın</h2>
                    <p className="section-sub">Performansınıza göre bir rütbe alırsınız. Şampiyonluğa giden yolda ne kadar ilerliyorsunuz?</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {RANKS_PREVIEW.map((r, i) => (
                        <div key={r.label} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: '12px', padding: '16px 20px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <span style={{ color: 'var(--accent)', display: 'flex' }}>{r.icon}</span>
                                <span style={{ fontWeight: 600, fontSize: '15px' }}>{r.label}</span>
                            </div>
                            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{r.score} puan</span>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/cv')}>
                        <Mic size={16} /> Hemen Test Et
                    </button>
                </div>
            </section>

            {/* SEO LINKS */}
            <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 className="section-title" style={{ marginBottom: '32px' }}>Mülakat Soruları Rehberi</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {SEO_LINKS.map(l => (
                            <Link key={l.to} to={l.to} style={{
                                padding: '9px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 500,
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                color: 'var(--text-secondary)', textDecoration: 'none',
                                transition: 'all 0.2s',
                                display: 'inline-block',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                            >{l.label}</Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>Sık sorulan sorular</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {FAQS.map(f => (
                        <div key={f.q} className="card">
                            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>{f.q}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* BIG CTA */}
            <section style={{ maxWidth: '700px', margin: '0 auto 80px', padding: '0 24px' }}>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(109,93,252,0.15), rgba(0,212,170,0.08))',
                    border: '1px solid rgba(109,93,252,0.3)', borderRadius: '22px',
                    padding: '60px 40px', textAlign: 'center',
                }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '14px' }}>
                        Rütbeni öğren. Farkı hisset.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>
                        Türkiye genelinde neredesin? Şampiyonluğa ne kadar uzaksın?
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/cv')} style={{ fontSize: '16px', padding: '15px 40px' }}>
                        <Mic size={18} /> Ücretsiz Başla
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>
                            mülakat<span style={{ color: 'var(--accent)' }}>.com</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', maxWidth: '260px', lineHeight: 1.6 }}>
                            Türkiye'nin Interview Intelligence Platformu. Ücretsiz, Türkçe, güvenilir.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Araçlar</p>
                            {[['Mülakat Provası', '/cv'], ['CV Oluşturucu', '/cv-hazirla'], ['Maaş Hesaplama', '/maas-hesaplama'], ['İstifa Dilekçesi', '/istifa-dilekcesi']].map(([l, h]) => (
                                <Link key={l} to={h} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', textDecoration: 'none' }}>{l}</Link>
                            ))}
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Topluluk</p>
                            {[['Liderlik Tablosu', '/liderlik-tablosu'], ['Mülakat Soruları', '/mulakat-sorulari']].map(([l, h]) => (
                                <Link key={l} to={h} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', textDecoration: 'none' }}>{l}</Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ maxWidth: '1100px', margin: '32px auto 0', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Tüm hakları saklıdır.</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>🔒 Verileriniz anonim tutulur — Gizliliğinize saygı duyuyoruz.</p>
                </div>
            </footer>
        </div>
    );
}
