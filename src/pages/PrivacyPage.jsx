import NavBar from '../components/NavBar';

export default function PrivacyPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', lineHeight: 1.8 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>Gizlilik Politikası</h1>

                <div className="card" style={{ marginBottom: '32px' }}>
                    <p style={{ marginBottom: '16px' }}>
                        <strong>1. Veri Toplama:</strong> Mülakat.com olarak, AI özelliklerini size sunabilmek amacıyla yüklediğiniz CV metinlerini ve mülakat simülatörü yanıtlarınızı geçici olarak işleriz.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        <strong>2. Anonimlik:</strong> Paylaştığınız maaş bilgileri ve mülakat deneyimleri, isim veya iletişim bilgisi olmadan tamamen anonim şekilde platformda genel kullanıma sunulabilir. İstediğiniz zaman bu verilerin silinmesini talep edebilirsiniz.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        <strong>3. Üçüncü Taraf:</strong> Verdiğiniz yanıtlar, yalnızca AI motoru ile değerlendirme yapmak için güvenli API'lar üzerinden iletilir. Kişisel verileriniz hiçbir reklam veya pazarlama şirketine satılmaz.
                    </p>
                    <p>
                        <strong>4. İletişim:</strong> E-posta adresinizi bırakmanız halinde, sadece size detaylı AI raporlarınızı veya önemli platform güncellemelerini iletmek için kullanacağız. Spam içerik göndermeyiz.
                    </p>
                </div>
            </div>
        </div>
    );
}
