import NavBar from '../components/NavBar';

export default function DisclaimerPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', lineHeight: 1.8 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>Yasal Uyarı (Disclaimer)</h1>

                <div className="card" style={{ marginBottom: '32px' }}>
                    <p style={{ marginBottom: '16px' }}>
                        <strong>1. Tahmini Veriler:</strong> Mülakat.com üzerinde sunulan maaş verileri, mülakat soruları ve diğer kariyer istatistikleri, topluluk tarafından sağlanan anonim geri bildirimlere, piyasa araştırmalarına ve açık kaynaklı verilere dayanır. Bu veriler %100 kesinlik taşımaz ve sadece rehberlik amaçlıdır.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        <strong>2. Topluluk Kaynaklı İçerik:</strong> Mülakat soruları ve şirket deneyimleri tamamen kullanıcıların anonim katkıları ile oluşturulmaktadır. Mülakat.com bu içeriklerin doğruluğunu veya güncelliğini garanti etmez.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        <strong>3. İşe Alım Kararları:</strong> Mülakat.com yalnızca mülakat simülasyonları ve kariyer araçları sunar. İşe alım, terfi veya işten çıkarma kararları tamamen ilgili kurumların inisiyatifindedir. Platformumuz, kariyeriniz üzerindeki kararlardan kaynaklanabilecek hiçbir sonuçtan yasal olarak sorumlu tutulamaz.
                    </p>
                    <p>
                        <strong>4. Tavsiye Niteliği:</strong> Sağladığımız AI destekli değerlendirme raporları ve CV geri bildirimleri, bir kariyer danışmanının yerini alamaz. Sadece kendinizi geliştirmeniz için bir yol haritası niteliğindedir.
                    </p>
                </div>
            </div>
        </div>
    );
}
