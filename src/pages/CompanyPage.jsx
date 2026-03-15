import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { COMPANIES } from '../data/companies';
import PracticeCta from '../components/PracticeCta';
import { Building2, MapPin, Users, Globe, ExternalLink, Briefcase, GraduationCap, ArrowRight, MessageCircle } from 'lucide-react';

export default function CompanyPage() {
    const { companyId } = useParams();
    const company = COMPANIES[companyId?.toLowerCase()];

    if (!company) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
                <NavBar />
                <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
                    <h1 className="section-title">Şirket Bulunamadı</h1>
                    <p className="section-sub">Aradığınız şirket veri tabanımızda yer almıyor olabilir.</p>
                    <Link to="/" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>Ana Sayfaya Dön</Link>
                </div>
            </div>
        );
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <SEOHead
                title={`${company.name} Mülakat Soruları, Maaşları ve İş Süreçleri`}
                description={`${company.name} şirketinde çalışanların güncel maaş bilgileri, mülakat süreçleri, değerlendirmeleri ve çıkmış mülakat soruları mülakat.com'da.`}
                url={`https://mülakat.com/company/${company.id}`}
            />

            <NavBar />

            {/* Header Content */}
            <header style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '24px 24px 64px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Breadcrumbs items={[
                        { label: 'Şirketler', to: '/company' },
                        { label: company.name, to: `/company/${company.id}` }
                    ]} />

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginTop: '32px' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '16px', backgroundColor: '#fff',
                            border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '32px', fontWeight: 800, color: 'var(--accent)', flexShrink: 0
                        }}>
                            {company.name.charAt(0)}
                        </div>

                        <div>
                            <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>{company.name}</h1>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Building2 size={16} /> {company.industry}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> {company.employeeCount}</span>
                                <a href={company.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', textDecoration: 'none' }}>
                                    <Globe size={16} /> Kariyer Sayfası <ExternalLink size={12} />
                                </a>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                                {company.description}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <article style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px', alignItems: 'start' }}>

                {/* Left Column: Interview & Process */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    <section className="card">
                        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageCircle size={20} color="var(--accent)" /> Mülakat Süreci ve Deneyimler
                        </h2>
                        <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Zorluk Derecesi</span>
                                <span className="badge badge-accent">{company.insights.interviewDifficulty}</span>
                            </div>
                            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                                {company.insights.interviewProcess}
                            </p>
                        </div>

                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Sıkça Sorulan Mülakat Soruları</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {company.sampleQuestions.map((q, idx) => (
                                <li key={idx} style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '15px', lineHeight: 1.5 }}>
                                    {q}
                                </li>
                            ))}
                        </ul>

                        <Link to={`/interview-questions/${company.id}`} className="btn btn-secondary" style={{ width: '100%', marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            Tüm {company.name} Sorularını Gör <ArrowRight size={16} />
                        </Link>
                    </section>
                </div>

                {/* Right Column: Salary & CTAs */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <PracticeCta
                        company={company.name}
                    />

                    <section className="card" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.05), transparent)', border: '1px solid rgba(108,99,255,0.2)' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Briefcase size={18} color="var(--accent)" /> Maaş İstatistikleri
                        </h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            {company.insights.salaryCount} çalışanın anonim bildirimine dayanmaktadır.
                        </p>

                        <div style={{ padding: '20px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>ORTALAMA NET MAAŞ</div>
                            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>{company.insights.averageSalary}</div>
                        </div>

                        <Link to="/maas-hesaplama" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            Benim Maaşım Ne Kadar Olmalı?
                        </Link>
                    </section>

                    <section className="card">
                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Deneyimini Paylaş</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                            {company.name} şirketinde mülakata girdiniz mi veya çalışıyor musunuz? Verileri şeffaflaştırmamıza yardımcı olun.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Maaş Bildir (Anonim)</button>
                            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', border: '1px solid var(--border)' }}>Mülakat Sorusu Ekle</button>
                        </div>
                    </section>

                </aside>
            </article>
        </main>
    );
}
