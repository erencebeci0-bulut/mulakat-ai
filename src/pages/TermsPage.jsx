import React from 'react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import { Scale } from 'lucide-react';

export default function TermsPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />
            <Breadcrumbs items={[{ label: 'Kullanım Koşulları', to: '/terms' }]} />
            <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--bg-secondary)', marginBottom: '24px' }}>
                        <Scale size={32} color="var(--accent)" />
                    </div>
                    <h1 className="section-title">Kullanım Koşulları</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Son Güncelleme: 10 Mart 2026</p>
                </div>

                <div className="card animate-in" style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>1. Kabul Beyanı</h2>
                    <p style={{ marginBottom: '24px' }}>
                        Mülakat.com ("Platform") web sitesini ve sunduğu hizmetleri kullanarak, bu Kullanım Koşulları'nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
                    </p>

                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>2. Platformun Amacı ve Sorumluluk Reddi</h2>
                    <p style={{ marginBottom: '24px' }}>
                        Platform, adaylara mülakat süreçlerine hazırlıkta rehberlik araçları sunmayı amaçlar. Platform üzerindeki maaş verileri, mülakat soruları, AI Simülatörü sonuçları ve CV analizleri tamamen yapay zeka ve topluluk verilerine dayalı tahminlerdir. Gerçek mülakat performansınız veya işe alım kararları üzerinde herhangi bir etkisi veya garantisi yoktur.
                    </p>

                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>3. Kullanıcı Davranışları</h2>
                    <p style={{ marginBottom: '24px' }}>
                        Platformu yasadışı, yanıltıcı veya zararlı bir şekilde kullanmamayı kabul edersiniz. AI sistemlerimize gereksiz yük bindirecek bot, spam veya otomatize edilmiş sistemlerin kullanımı kesinlikle yasaktır.
                    </p>

                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>4. Gizlilik ve Veri Güvenliği</h2>
                    <p style={{ marginBottom: '24px' }}>
                        Kişisel verilerinizin nasıl işlendiği <a href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Gizlilik Politikası</a> sayfasında detaylandırılmıştır. Özgeçmişleriniz ve mülakat ses/metin kayıtlarınız kalıcı olarak veritabanımızda tutulmaz ve üçüncü şahıslara satılmaz.
                    </p>

                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>5. Değişiklik Hakları</h2>
                    <p>
                        Mülakat.com, bu şartlar ve koşulları dilediği zaman, önceden haber vermeksizin güncelleme veya değiştirme hakkını saklı tutar.
                    </p>
                </div>
            </div>
        </div>
    );
}
