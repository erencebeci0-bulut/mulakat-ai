import { useNavigate, useParams } from 'react-router-dom';
import { HelpCircle, ChevronRight, MessageSquare, Target, Lightbulb } from 'lucide-react';
import NavBar from '../components/NavBar';
import { QUESTIONS } from '../data/questions';

const CATEGORY_DATA = {
    genel: { title: 'Genel Mülakat Soruları', desc: 'Her türlü iş mülakatında karşınıza çıkabilecek en yaygın davranışsal sorular ve cevap ipuçları.' },
    yazilim: { title: 'Yazılım Mülakat Soruları', desc: 'Junior\'dan Senior\'a, frontend\'den backend\'e yazılım geliştirme dünyasının en kritik mülakat soruları.' },
    satis: { title: 'Satış Mülakat Soruları', desc: 'B2B, B2C ve hesap yönetimi pozisyonları için ikna kabiliyetinizi ölçecek zorlayıcı sorular.' },
    pazarlama: { title: 'Pazarlama Mülakat Soruları', desc: 'Growth, SEO, sosyal medya ve marka yönetimi mülakatlarında sorulan stratejik sorular.' },
    ik: { title: 'İnsan Kaynakları Soruları', desc: 'İK pozisyonları için işe alım ve organizasyonel gelişim odaklı profesyonel mülakat soruları.' },
    urun: { title: 'Ürün Yönetimi Soruları', desc: 'Ürün yöneticisi (PM) ve ürün sahibi (PO) mülakatları için vaka ve metrik odaklı sorular.' },
    veri: { title: 'Veri Analisti Soruları', desc: 'Analitik düşünme, SQL, istatistik ve veri görselleştirme mülakatlarına özel sorular.' },
    staj: { title: 'Staj Mülakat Soruları', desc: 'Kariyerine yeni başlayanlar için okul projeleri ve potansiyelini gösterebileceğin sorular.' },
};

export default function SeoPage({ category = 'genel' }) {
    const navigate = useNavigate();
    const data = CATEGORY_DATA[category] || CATEGORY_DATA.genel;
    const questions = QUESTIONS[category] || QUESTIONS.genel;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ marginBottom: '56px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>Mülakat Rehberi</div>
                    <h1 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '18px' }}>{data.title}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '700px' }}>{data.desc}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {questions.map((q, idx) => (
                        <div key={idx} className="card animate-in" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-glow)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    color: 'var(--accent)', fontWeight: 800, fontSize: '14px'
                                }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                                        {q.text}
                                    </h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px' }}>
                                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                                                <Target size={14} /> Ne ölülüyor?
                                            </div>
                                            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                Bu soruyla adayın geçmiş deneyimleri üzerinden problem çözme ve sonuç odaklılık yeteneği ölçülmektedir.
                                            </p>
                                        </div>
                                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-secondary)', borderLeft: '3px solid var(--success)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', fontWeight: 800, color: 'var(--success)', textTransform: 'uppercase' }}>
                                                <Lightbulb size={14} /> İpucu
                                            </div>
                                            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                STAR yöntemini (Durum, Görev, Aksiyon, Sonuç) kullanarak cevap vermeniz çok daha etkili olacaktır.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{
                    marginTop: '64px', padding: '48px', textAlign: 'center',
                    background: 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))',
                    borderRadius: '24px', border: '1px solid var(--border)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>Bu soruları canlı prova etmek ister misin?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>AI mülakat koçumuz seni bu sorularla test etsin ve anlık puan versin.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/cv')}>Mülakatta Kendini Dene</button>
                </div>
            </div>

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Ücretsiz Mülakat Soru Bankası</p>
            </footer>
        </div>
    );
}
