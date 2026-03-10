import { useNavigate, useParams } from 'react-router-dom';
import { HelpCircle, ChevronRight, MessageSquare, Target, Lightbulb, Wallet, FileText, ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';

const ROLE_DATA = {
    'yazilimci': {
        title: 'Yazılım Uzmanı Mülakat Soruları',
        desc: 'Yazılım uzmanı pozisyonları için teknik ve davranışsal en kritik mülakat soruları.',
        salary: '₺45.000 - ₺120.000',
        questions: [
            { text: 'Bize karşılaştığın en zor teknik problemi ve nasıl çözdüğünü anlatır mısın?', focus: 'Problem Çözme', tip: 'STAR metodunu kullanarak spesifik bir hata veya mimari sorunu anlat.' },
            { text: 'REST API mimarisi tasarlarken nelere dikkat edersin?', focus: 'Teknik Bilgi', tip: 'Güvenlik, ölçeklenebilirlik, isimlendirme standartları ve HTTP metodlarından bahset.' },
            { text: 'Microservices ile Monolithic mimari arasındaki temel farklar nelerdir?', focus: 'Sistem Tasarımı', tip: 'Hangi durumda hangisini tercih edeceğini örneklerle açıkla.' },
            { text: 'Projenin deadline\'ına yetişemeyeceğini anladığında ne yaparsın?', focus: 'Kriz Yönetimi', tip: 'İletişim becerilerine ve önceliklendirme stratejilerine odaklan.' },
            { text: 'Bir veritabanı sorgusunu optimize etmek için hangi adımları izlersin?', focus: 'Performans Optimizasyonu', tip: 'Index kullanımı, execution plan analizi ve n+1 probleminden bahset.' },
        ]
    },
    'ik': {
        title: 'İnsan Kaynakları (İK) Mülakat Soruları',
        desc: 'İK uzmanı ve yönetici pozisyonları için en yaygın mülakat soruları.',
        salary: '₺30.000 - ₺75.000',
        questions: [
            { text: 'Zor bir çalışanı veya yöneticiyi nasıl idare edersin?', focus: 'Çatışma Yönetimi', tip: 'Empati ve profesyonel sınırlar çerçevesinde bir örnek ver.' },
            { text: 'İşe alım sürecinde yanlış karar verdiğin bir anı anlat.', focus: 'Öz Farkındalık', tip: 'Hatayı nasıl fark ettiğini ve süreci nasıl düzelttiğini vurgula.' },
            { text: 'Şirket kültürünü iyileştirmek için daha önce ne gibi çalışmalar yaptın?', focus: 'Organizasyonel Gelişim', tip: 'Veri ve çalışan geri bildirimlerine dayalı aksiyonlarını anlat.' },
        ]
    },
    'satis-temsilcisi': {
        title: 'Satış Temsilcisi Mülakat Soruları',
        desc: 'Satış hunisi yönetimi, ikna kabiliyeti ve itiraz karşılama konularında sorular.',
        salary: '₺25.000 - ₺80.000 + Prim',
        questions: [
            { text: 'Bana bu kalemi / ürünü satar mısın?', focus: 'İkna ve İhtiyaç Analizi', tip: 'Özellikle müşterinin ihtiyacını anlamaya yönelik sorular sorarak başla.' },
            { text: 'Bir müşteriden "Şu an bütçemiz yok" itirazını aldığında nasıl yaklaşırsın?', focus: 'İtiraz Yönetimi', tip: 'Değer önermesini nasıl vurguladığını ve itirazı nasıl fırsata çevirdiğini anlat.' },
            { text: 'Satış hedefini tutturamadığın bir dönemi nasıl yönettin?', focus: 'Dayanıklılık', tip: 'Durumu nasıl analiz ettiğini ve stratejini nasıl değiştirdiğini belirterek cevapla.' },
        ]
    },
    'banka': {
        title: 'Banka Gişe Görevlisi Mülakat Soruları',
        desc: 'Müşteri iletişimi ve dikkat gerektiren banka operasyonları için sorular.',
        salary: '₺28.000 - ₺45.000',
        questions: [
            { text: 'Öfkeli bir müşteriyle nasıl başa çıkarsın?', focus: 'Kriz İletişimi', tip: 'Sakin kalma ve çözüm odaklı yaklaşım sergilediğini hissettir.' },
            { text: 'Neden bankacılık sektöründe kariyer yapmak istiyorsun?', focus: 'Motivasyon', tip: 'Finans sektörüne olan ilgini ve insan ilişkilerindeki gücünü ilişkilendir.' },
            { text: 'Yoğun stres altında dikkatini nasıl toplarsın?', focus: 'Stres Yönetimi', tip: 'Rutinlerini ve hata yapmamak için kullandığın kişisel yöntemlerini anlat.' },
        ]
    },
    'cagri-merkezi': {
        title: 'Çağrı Merkezi Mülakat Soruları',
        desc: 'Müşteri hizmetleri ve iletişim becerilerini ölçen çağrı merkezi soruları.',
        salary: '₺21.000 - ₺35.000',
        questions: [
            { text: 'Telefonda çözülemeyen bir sorunu nasıl tırmandırırsın?', focus: 'Süreç Yönetimi', tip: 'Şirket prosedürlerine bağlılığını ve müşteri beklentisini yönetme şeklini anlat.' },
            { text: 'Sürekli tekrar eden çağrılarda motivasyonunu nasıl korursun?', focus: 'Dayanıklılık', tip: 'Kişisel hedeflerine ve işin müşteriye sağladığı değere odaklandığını belirt.' },
        ]
    },
    'staj': {
        title: 'Stajyer Mülakat Soruları',
        desc: 'Okul projeleri, öğrenme isteği ve takım çalışmasına odaklı stajyer soruları.',
        salary: '₺5.000 - ₺17.000',
        questions: [
            { text: 'Üniversitede içinde bulunduğun bir grup projesinde karşılaştığınız en büyük zorluk neydi?', focus: 'Takım Çalışması', tip: 'Sorumluluk alma ve iletişim becerilerini ön plana çıkar.' },
            { text: 'Bu staj programından beklentilerin neler?', focus: 'Öğrenme İsteği', tip: 'Neler öğrenmek istediğini ve şirkete nasıl katkı sağlayabileceğini net ifade et.' },
            { text: 'Bilmediğin bir konuyla veya teknolojiyle karşılaştığında nasıl öğrenirsin?', focus: 'Araştırma Becerisi', tip: 'Kullandığın kaynakları ve kendi kendine öğrenme prensiplerini anlat.' },
        ]
    },
    'default': {
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
    const { role } = useParams();
    const navigate = useNavigate();

    const data = ROLE_DATA[role] || ROLE_DATA.default;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
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
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '800px' }}>
                        {data.desc}
                    </p>
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
