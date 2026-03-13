import { useNavigate, useParams } from 'react-router-dom';
import { HelpCircle, ChevronRight, MessageSquare, Target, Lightbulb, Wallet, FileText, ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import { InterviewIllustration } from '../components/ImagePlaceholders';

const ROLE_DATA = {
    'yazilim': {
        title: 'Yazılım Mülakat Soruları',
        desc: 'Yazılım uzmanı pozisyonları için teknik ve davranışsal en kritik mülakat soruları.',
        salary: '₺45.000 - ₺120.000',
        questions: [
            { text: 'Bize karşılaştığın en zor teknik problemi ve nasıl çözdüğünü anlatır mısın?', focus: 'Problem Çözme', tip: 'STAR metodunu kullanarak spesifik bir hata veya mimari sorunu anlat.' },
            { text: 'Temiz kod (clean code) yazmak size göre ne anlama geliyor?', focus: 'Teknik Bilgi', tip: 'İsimlendirme standartları, SOLID prensipleri ve sadelikten bahset.' },
            { text: 'Canlı ortamda kritik bir hata oluştu. İlk müdahaleniz ne olur?', focus: 'Kriz Yönetimi', tip: 'Hızlı çözüm ile kalıcı çözüm ayrımını vurgulayarak süreci anlat.' },
        ]
    },
    'satis': {
        title: 'Satış Temsilcisi Mülakat Soruları',
        desc: 'Satış hunisi yönetimi, ikna kabiliyeti ve itiraz karşılama konularında sorular.',
        salary: '₺25.000 - ₺80.000 + Prim',
        questions: [
            { text: 'Kaybetme noktasına geldiğiniz zorlu bir müşteriyi nasıl geri kazandınız?', focus: 'İkna ve Problem Çözme', tip: 'Müşterinin asıl ihtiyacını nasıl tespit ettiğini anlat.' },
            { text: 'Fiyatın çok yüksek olduğunu söyleyen bir müşteriye nasıl yaklaşırsın?', focus: 'İtiraz Yönetimi', tip: 'Değer önermesini nasıl vurguladığını ve itirazı fırsata çevirdiğini belirt.' },
        ]
    },
    'pazarlama': {
        title: 'Pazarlama Mülakat Soruları',
        desc: 'Dijital pazarlama, kampanya yönetimi ve veri analizi soruları.',
        salary: '₺30.000 - ₺90.000',
        questions: [
            { text: 'Bugüne kadar yönettiğin en başarılı kampanya hangisiydi?', focus: 'Performans Yönetimi', tip: 'Kampanyanın ROI metriğini ve kullandığın kanalları anlat.' },
            { text: 'Sosyal medyada ani bir kriz başladı. İletişim stratejin nedir?', focus: 'Kriz Yönetimi', tip: 'Şeffaflık, hız ve marka dili uyumuna değin.' },
        ]
    },
    'ik': {
        title: 'İnsan Kaynakları Mülakat Soruları',
        desc: 'İK uzmanı ve yönetici pozisyonları için en yaygın mülakat soruları.',
        salary: '₺30.000 - ₺75.000',
        questions: [
            { text: 'Uzun süre doldurulamayan zor bir pozisyonu nasıl kapatırsınız?', focus: 'Stratejik İşe Alım', tip: 'Alternatif kaynakları ve aktif aday avı stratejilerini anlat.' },
            { text: 'Çalışan sadakatini artırmak için ne tür uygulamalar denediniz?', focus: 'Çalışan Bağlılığı', tip: 'Veri ve çalışan geri bildirimlerine dayalı aksiyonlarını anlat.' },
        ]
    },
    'finans': {
        title: 'Finans Mülakat Soruları',
        desc: 'Bütçeleme, analiz ve finansal raporlama pozisyonları için sorular.',
        salary: '₺ ৩৫.000 - ₺100.000',
        questions: [
            { text: 'Şirketin finansal sağlığını değerlendirirken en çok hangi rasyolara odaklanırsın?', focus: 'Finansal Analiz', tip: 'Sektöre göre değişebilecek karlılık ve likidite oranlarından bahset.' },
            { text: 'Bütçeleme yaparken kullandığınız sistemler nelerdir?', focus: 'Planlama', tip: 'Geleceğe dönük (forecasting) yeteneklerini öne çıkar.' },
        ]
    },
    'musteri': {
        title: 'Müşteri Hizmetleri Mülakat Soruları',
        desc: 'Müşteri ilişkileri ve kriz yönetimi iletişim becerilerini ölçen sorular.',
        salary: '₺21.000 - ₺35.000',
        questions: [
            { text: 'Çok öfkeli veya mağduriyet yaşamış bir müşteriyle nasıl görüşürsünüz?', focus: 'Kriz İletişimi', tip: 'Sakin kalma ve çözüm odaklı empati sergilediğini hissettir.' },
            { text: 'Kurum politikaları gereği "hayır" demek zorunda kaldığınız durumu nasıl yönetirsiniz?', focus: 'İletişim Sınırları', tip: 'Şirket kurallarını korurken müşteriye alternatifler sunduğunu belirt.' },
        ]
    },
    'mezun': {
        title: 'Yeni Mezun Mülakat Soruları',
        desc: 'Okul projeleri, öğrenme isteği ve takım çalışmasına odaklı sorular.',
        salary: '₺20.000 - ₺35.000',
        questions: [
            { text: 'Üniversitede grup projelerinde karşılaştığınız en büyük zorluk neydi?', focus: 'Takım Çalışması', tip: 'Sorumluluk alma ve iletişim becerilerini ön plana çıkar.' },
            { text: 'İlk iş deneyiminizden ve şirketinizden temel beklentileriniz nelerdir?', focus: 'Öğrenme İsteği', tip: 'Kişisel gelişimin ve şirkete değer katma isteğinin altını çiz.' },
        ]
    },
    'genel': {
        title: 'Genel Mülakat Soruları',
        desc: 'Her pozisyon için karşına çıkabilecek en kritik sorular ve cevaplama ipuçları.',
        salary: 'Pozisyona Göre Değişir',
        questions: [
            { text: 'Bize kendinden biraz bahseder misin?', focus: 'İletişim ve Özgeçmiş Özeti', tip: 'Kronolojik olarak çok detaya girmeden, işe uygun deneyimlerini vurgula.' },
            { text: 'En güçlü ve en zayıf yönlerin nelerdir?', focus: 'Öz Farkındalık', tip: 'Zayıf yönünü söylerken onu geliştirmek için neler yaptığını da mutlaka ekle.' },
            { text: '5 yıl sonra kendini nerede görüyorsun?', focus: 'Vizyon ve Hedefler', tip: 'Şirketle paralel olabilecek gerçekçi ve hevesli bir kariyer planı çiz.' },
        ]
    }
};

export default function SeoPage() {
    const { roleSlug } = useParams();
    const navigate = useNavigate();

    // Parse role from /yazilim-mulakat-sorulari shape if present, otherwise fallback to general
    let role = 'genel';
    if (roleSlug && roleSlug.endsWith('-mulakat-sorulari')) {
        role = roleSlug.replace('-mulakat-sorulari', '');
    } else if (roleSlug && ROLE_DATA[roleSlug]) {
        role = roleSlug;
    }

    const data = ROLE_DATA[role] || ROLE_DATA.genel;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <SEOHead
                title={`${data.title} | mülakat.com`}
                description={data.desc}
                url={`https://mülakat.com/mulakat-sorulari/${role || 'genel'}`}
            />
            <NavBar />
            <Breadcrumbs items={[
                { label: 'Mülakat Soruları', to: '/mulakat-sorulari' },
                { label: data.title, to: `/mulakat-sorulari/${role || 'genel'}` }
            ]} />

            <div style={{ maxWidth: '900px', margin: '40px auto 0', padding: '0 24px' }}>

                {/* Header */}
                <div style={{ marginBottom: '40px', textAlign: 'left' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>Rol Bazlı Sorular</div>
                    <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px', textAlign: 'left' }}>
                        {data.title}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '800px', marginBottom: '32px' }}>
                        {data.desc}
                    </p>
                    <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', maxWidth: '800px' }}>
                        <InterviewIllustration style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                </div>

                {/* Info Snippets */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '48px' }}>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Wallet size={24} color="#10b981" />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>Ortalama Maaş</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>{data.salary}</p>
                        </div>
                    </div>
                    <div className="card hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', cursor: 'pointer', border: '1px solid var(--accent)' }} onClick={() => navigate('/cv-builder')}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={24} color="var(--accent)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>Bu Role Özel</p>
                            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>CV Oluştur <ArrowRight size={16} color="var(--accent)" /></p>
                        </div>
                    </div>
                </div>

                {/* Questions List */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>Sıkça Sorulan Mülakat Soruları</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {data.questions.map((q, idx) => (
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
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                                        {q.text}
                                    </h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                                                <Target size={14} /> Ne ölçülüyor?
                                            </div>
                                            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                {q.focus} yetkinliği ve adayın bu konudaki pratik tecrübesi ölçülür.
                                            </p>
                                        </div>
                                        <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-secondary)', borderLeft: '3px solid var(--success)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', fontWeight: 800, color: 'var(--success)', textTransform: 'uppercase' }}>
                                                <Lightbulb size={14} /> İpucu
                                            </div>
                                            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                {q.tip}
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
                    borderRadius: '24px', border: '1px solid var(--accent)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>Gerçek Mülakata Hazır mısın?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>AI mülakat koçumuz seni <b>{data.title.replace(' Mülakat Soruları', '')}</b> rolü için test etsin ve anlık geri bildirim versin.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/ai-interview')}>Mülakata Başla</button>
                </div>
            </div>

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Ücretsiz Mülakat Soru Bankası</p>
            </footer>
        </div>
    );
}
