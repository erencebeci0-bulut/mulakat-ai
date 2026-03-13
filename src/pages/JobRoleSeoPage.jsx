import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { ROLES } from '../data/roles';
import { SalaryChartIllustration } from '../components/ImagePlaceholders';
import { Wallet, Briefcase, Mic, FileText, CheckCircle, Search, Star, MessageSquare, TrendingUp, AlertTriangle } from 'lucide-react';

export default function JobRoleSeoPage() {
    const location = useLocation();
    const pathSlug = location.pathname.replace(/^\//, ''); // e.g. "yazilim-muhendisi-maasi"

    // Normalize slug (removes -maasi, -maas, or maas/ prefixes for matching)
    let normalizedSlug = pathSlug.toLowerCase();
    if (normalizedSlug.startsWith('maas/')) normalizedSlug = normalizedSlug.replace('maas/', '');
    if (normalizedSlug.endsWith('-maasi')) normalizedSlug = normalizedSlug.replace('-maasi', '');
    if (normalizedSlug.endsWith('-maas')) normalizedSlug = normalizedSlug.replace('-maas', '');

    const roleData = ROLES[normalizedSlug];

    if (!roleData) {
        // Fallback for URLs not in our statically mocked ROLES list, but keep SEO structure dynamic
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
                <NavBar />
                <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center', padding: '0 24px' }}>
                    <Search size={48} color="var(--text-muted)" style={{ margin: '0 auto 24px' }} />
                    <h1 className="section-title">Pozisyon Verisi Aranıyor</h1>
                    <p className="section-sub">Şu anda bu pozisyon için yeterli maaş ve mülakat verisi toplanıyor.</p>
                    <Link to="/maas" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>Tüm Analizleri Göster</Link>
                </div>
            </div>
        );
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <SEOHead
                title={`${roleData.title} Maaşları ve Mülakat Soruları 2026`}
                description={`${roleData.title} pozisyonu için güncel maaş aralıkları, mülakat süreçleri, çıkmış sorular ve kariyer tavsiyeleri.`}
                url={`https://mülakat.com/${pathSlug}`}
            />

            <NavBar />

            {/* Header Content */}
            <header style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '24px 24px 64px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Breadcrumbs items={[
                        { label: 'Meslekler', to: '/maas' },
                        { label: `${roleData.title} Maaşları`, to: `/${pathSlug}` }
                    ]} />

                    <div style={{ marginTop: '32px' }}>
                        <div className="badge badge-accent" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <TrendingUp size={14} /> Pazar Talebi: {roleData.marketDemand}
                        </div>

                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
                            {roleData.title} <span className="gradient-text">Maaşları ve Mülakatları</span>
                        </h1>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '800px' }}>
                            {roleData.description}
                        </p>
                    </div>
                </div>
            </header>

            <article style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '40px', alignItems: 'start' }}>

                {/* Left Column: Data & Deep Dive */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                    {/* Salary Insight Section */}
                    <section>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Wallet color="var(--success)" /> Güncel Maaş Aralıkları (2026)
                        </h2>

                        <div style={{ marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                            <SalaryChartIllustration style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>

                        <div className="card" style={{ padding: '32px', border: '1px solid var(--success)', background: 'linear-gradient(135deg, rgba(16,185,129,0.05), transparent)' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Ortalama Net Maaş Bandı</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--success)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                                    {roleData.salaryBand}
                                </div>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                                    Rakamlar sektör ortalamasını ifade eder. Kurumsal firmalar veya startup dinamiklerine, şehir ve tecrübe yılına göre +/-%30 farklılık gösterebilir.
                                </p>

                                {/* Experience & Location Breakdown */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'left' }}>
                                    <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Tecrübe Seviyeleri</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <li><strong style={{ color: 'var(--success)' }}>Junior:</strong> {roleData.salaryBand.split(' - ')[0]}</li>
                                            <li><strong style={{ color: 'var(--success)' }}>Mid:</strong> Ortalama</li>
                                            <li><strong style={{ color: 'var(--success)' }}>Senior:</strong> {roleData.salaryBand.split(' - ')[1]}</li>
                                        </ul>
                                    </div>
                                    <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Lokasyon Bazlı Faktörler</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <li><strong>İstanbul:</strong> +%15-20</li>
                                            <li><strong>Ankara/İzmir:</strong> Standart</li>
                                            <li><strong>Remote (Global):</strong> +%40-60</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <Link to="/maas-hesaplama" className="btn btn-secondary" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                Kesin Kesintilerle Kendi Net Maaşını Hesapla
                            </Link>
                        </div>
                    </section>

                    {/* Interview Tips Section */}
                    <section>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Star color="var(--warning)" /> Sektörel Mülakat Tüyoları
                        </h2>

                        <div className="card" style={{ padding: '32px', background: 'var(--bg-secondary)' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {roleData.interviewTips.map((tip, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-primary)' }}>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ padding: '16px', marginTop: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                                <strong>Tavsiye:</strong> Genellikle adaylar teknik yeteneklere çok odaklanırken, zayıf iletişim (soft skills) yüzünden elenmektedir. Mülakatlarda pozitif bir enerji yaymak teknik donanım kadar kritiktir.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Right Column: CTA Tools */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '24px' }}>

                    {/* Tool 1 */}
                    <section className="card glass-card hover-lift" style={{ padding: '24px', border: '1px solid rgba(139,92,246,0.3)', background: 'linear-gradient(135deg, rgba(139,92,246,0.05), transparent)' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <Mic size={24} color="#8b5cf6" />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px' }}>
                            {roleData.title} Simülasyonu
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
                            Gerçek bir mülakatın stresini hissetmek ve ne cevaplayacağını pratik etmek ister misin? Yapay zeka ile hemen birebir deneme yap.
                        </p>
                        <Link to="/ai-interview" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            AI Mülakatı Ücretsiz Başlat
                        </Link>
                    </section>

                    {/* Tool 2 */}
                    <section className="card hover-lift" style={{ padding: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <MessageSquare size={20} color="var(--accent)" />
                            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Çıkmış Sorular</h3>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                            Şirketlerde daha önce bu rol için mülakata giren adayların veritabanımıza anonim eklediği sorulara çalış.
                        </p>
                        <Link to={roleData.relatedQuestionsLink} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                            Soru Havuzunu Gör
                        </Link>
                    </section>

                    {/* Tool 3 */}
                    <section className="card hover-lift" style={{ padding: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <FileText size={20} color="var(--success)" />
                            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>ATS Uyumlu CV</h3>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                            {roleData.title} ilanlarının filtreleme sistemlerinden %100 geçen profesyonel özgeçmişini hemen yazdır.
                        </p>
                        <Link to="/cv-hazirla" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', border: '1px solid var(--border)' }}>
                            CV Şablonları
                        </Link>
                    </section>

                </aside>
            </article>
        </main>
    );
}
