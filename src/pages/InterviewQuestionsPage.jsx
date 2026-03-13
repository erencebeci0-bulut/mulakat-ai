import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import InterviewExperienceForm from '../components/InterviewExperienceForm';
import { Briefcase, Code, MapPin, Search } from 'lucide-react';

export default function InterviewQuestionsPage() {
    const { category } = useParams();

    // Map common readable names out of slugs
    const formatCategory = (slug) => {
        if (!slug) return 'Mülakat Soruları';
        return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    const title = formatCategory(category);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <SEOHead
                title={`${title} Mülakat Soruları ve Cevapları`}
                description={`Adaylar tarafından girilmiş %100 gerçek ${title} mülakat soruları, teknik değerlendirmeler ve mülakat tüyoları. Tamamen ücretsiz mülakat.com arşivi.`}
                url={`https://mülakat.com/interview-questions/${category}`}
            />

            <NavBar />

            <header style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '24px 24px 64px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Breadcrumbs items={[
                        { label: 'Mülakat Soruları', to: '/interview-questions' },
                        { label: title, to: `/interview-questions/${category}` }
                    ]} />

                    <div style={{ textAlign: 'center', marginTop: '48px' }}>
                        <h1 className="section-title">{title} Mülakat Soruları</h1>
                        <p className="section-sub">Adaylar tarafından gönderilen gerçek mülakat deneyimleri ve çıkmış soru havuzu.</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                            <span className="badge badge-accent"><Search size={14} style={{ marginRight: '6px' }} /> Frontend Developer</span>
                            <span className="badge badge-accent"><Search size={14} style={{ marginRight: '6px' }} /> Trendyol</span>
                            <span className="badge badge-accent"><Search size={14} style={{ marginRight: '6px' }} /> Google</span>
                        </div>
                    </div>
                </div>
            </header>

            <article style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px', alignItems: 'start' }}>

                {/* Questions Feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Mock Experience Cards */}
                    {[
                        {
                            company: 'Trendyol', role: 'Frontend Developer', diff: 'Zor (4/5)', date: '3 gün önce',
                            process: '1 hafta süren pair-programming case mülakatı yapıldı. Sonrasında teknik ekiple 1 saat kod okuması.',
                            questions: '1. React render performansı nasıl optimize edilir?\n2. Mikro-ön yüz (micro-frontend) mimarisine nasıl geçiş yaparız?\n3. JavaScript Event Loop detaylı anlatımı.'
                        },
                        {
                            company: 'Google', role: 'Software Engineer', diff: 'Çok Zor (5/5)', date: '1 ay önce',
                            process: 'Yüksek hacimli bir biletleme sistemini nasıl tasarlayacağımı sordular. Veritabanı seçimi çok önemli.',
                            questions: '1. System Design: Online Bilet Satış Sistemi Tasarımı\n2. İkili arama ağacında (BST) verilen iki düğümün en düşük ortak atasını (LCA) bulma algoritması.'
                        }
                    ].map((exp, i) => (
                        <div key={i} className="card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
                                        <Link to={`/company/${exp.company.toLowerCase()}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                                            {exp.company}
                                        </Link>
                                    </h3>
                                    <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Code size={14} /> {exp.role}</span>
                                        <span>•</span>
                                        <span>Zorluk: {exp.diff}</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{exp.date}</span>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Süreç ve Aşamalar</div>
                                <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{exp.process}</p>
                            </div>

                            <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px', textTransform: 'uppercase' }}>Sorulan Sorular</div>
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                                    {exp.questions}
                                </pre>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Right Column Context */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <section className="card" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.05), transparent)', border: '1px solid rgba(108,99,255,0.2)' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                            Senin Deneyimin Nasıl Geçti?
                        </h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                            Başkalarına mülakat süreçlerini anlatarak yardımcı ol. Anonim olarak deneyimlerini havuza ekle.
                        </p>

                        <InterviewExperienceForm defaultCompany={title !== 'Mülakat Soruları' ? title : ''} />
                    </section>

                </aside>
            </article>
        </main>
    );
}
