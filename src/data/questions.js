export const ROLES = [
    { id: 'yazilim', label: 'Yazılım', icon: 'Code', description: 'Yazılım geliştirici, mühendis' },
    { id: 'urun', label: 'Ürün Yönetimi', icon: 'Box', description: 'Ürün yöneticisi, PM' },
    { id: 'pazarlama', label: 'Pazarlama', icon: 'Megaphone', description: 'Pazarlama, growth, içerik' },
    { id: 'satis', label: 'Satış', icon: 'Handshake', description: 'Satış, hesap yönetimi' },
    { id: 'veri', label: 'Veri Analisti', icon: 'BarChart', description: 'Veri analisti, iş zekası' },
    { id: 'genel', label: 'Genel Mülakat', icon: 'Target', description: 'Genel pozisyonlar için' },
];

export const QUESTIONS = {
    yazilim: [
        { id: 1, type: 'intro', text: 'Kendinizi ve yazılım geliştirme yolculuğunuzu kısaca anlatır mısınız? Hangi alanlarda deneyim kazandınız?' },
        { id: 2, type: 'behavioral', text: 'Teknik bir hata yaptığınız ve bunu nasıl çözdüğünüz bir deneyimi anlatın. Bu süreçten ne öğrendiniz?' },
        { id: 3, type: 'role', text: 'Bir üretim ortamında kritik bir hata tespit ettiğinizde izlediğiniz debugging sürecini adım adım anlatın.' },
        { id: 4, type: 'role', text: 'RESTful API tasarımında en önemli gördüğünüz prensipler nelerdir? Bir örnek üzerinden açıklayın.' },
        { id: 5, type: 'problem', text: 'Bir e-ticaret sitesinin ödeme sayfası her gün saat 18:00\'de yavaşlıyor. Bu problemi nasıl araştırır ve çözersiniz?' },
        { id: 6, type: 'closing', text: 'Yazılım geliştirici olarak kendinizi önümüzdeki 3 yılda nerede görüyorsunuz? Bu pozisyon o hedefe nasıl katkı sağlar?' },
    ],

    urun: [
        { id: 1, type: 'intro', text: 'Kendinizi ve ürün yönetimi kariyerinizi kısaca anlatır mısınız? En çok hangi tür ürünler üzerinde çalışmaktan keyif alıyorsunuz?' },
        { id: 2, type: 'behavioral', text: 'Kullanıcılardan gelen çelişkili geri bildirimleri nasıl değerlendiriyorsunuz? Bir örnek paylaşır mısınız?' },
        { id: 3, type: 'role', text: 'Yeni bir özelliği önceliklendirmek için hangi framework\'leri kullanıyorsunuz? (RICE, ICE vb.) Gerçek bir ürün kararında nasıl uyguladınız?' },
        { id: 4, type: 'role', text: 'Ürün başarısını ölçmek için hangi metrikleri takip edersiniz? "Kuzey Yıldızı" (North Star Metric) kavramını nasıl yorumluyorsunuz?' },
        { id: 5, type: 'problem', text: 'Bir uygulamanın kullanıcı aktivasyonu (onboarding tamamlama oranı) %30\'dan %15\'e düştü. Bu problemi nasıl tanı koyar ve çözersiniz?' },
        { id: 6, type: 'closing', text: 'İdeal ürün kültürünü nasıl tanımlarsınız? Bu pozisyondaki ekitle nasıl bir çalışma ritmi kurmak istersiniz?' },
    ],

    pazarlama: [
        { id: 1, type: 'intro', text: 'Pazarlama kariyerinizi ve şu ana kadar en çok gurur duyduğunuz kampanya veya projeyi kısaca anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Sınırlı bir bütçeyle en iyi sonucu aldığınız bir pazarlama kampanyasını anlatın. Neyi farklı yaptınız?' },
        { id: 3, type: 'role', text: 'Yeni bir SaaS ürününü Türkiye pazarına girişi için bir go-to-market stratejisi tasarlayın. Hangi kanallardan başlarsınız?' },
        { id: 4, type: 'role', text: 'İçerik pazarlamasından organik büyüme sağlamak için nasıl bir SEO + içerik stratejisi kurarsınız?' },
        { id: 5, type: 'problem', text: 'Bir ürünün NPS skoru 6 ay içinde 45\'ten 28\'e düştü. Pazarlama direktörü olarak bu durumu nasıl analiz eder ve ne yaparsınız?' },
        { id: 6, type: 'closing', text: 'Pazarlamanın geleceğini nasıl görüyorsunuz? Bu alanda kendinizi nasıl geliştiriyorsunuz?' },
    ],

    satis: [
        { id: 1, type: 'intro', text: 'Satış kariyerinizi ve şu ana kadar en çok gurur duyduğunuz bir satış başarınızı anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Uzun soluklu bir satış sürecinde müşteriyle güven inşa etmek için ne tür adımlar attınız?' },
        { id: 3, type: 'role', text: 'Bir müşteri "fiyatınız çok yüksek" dediğinde nasıl yanıt verirsiniz? Kullandığınız teknikleri anlatın.' },
        { id: 4, type: 'role', text: 'B2B satışta keşif (discovery) görüşmesini nasıl yapılandırırsınız? Hangi soruları sorarsınız?' },
        { id: 5, type: 'problem', text: 'Rakibiniz müşterinize %20 daha ucuz bir teklife yaklaştı. Müşteri sizden aynı fiyatı istiyor, siz veremezsiniz. Ne yaparsınız?' },
        { id: 6, type: 'closing', text: 'İdeal satış kültürünü nasıl tanımlarsınız? Bu ekipte neden başarılı olacağınıza inanıyorsunuz?' },
    ],

    veri: [
        { id: 1, type: 'intro', text: 'Veri analizi kariyerinizi ve şu ana kadar üzerinde çalıştığınız en ilgi çekici veri projesini anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Analizinizin yanlış olduğunu sonradan fark ettiğinizde nasıl davrandınız? Süreci anlatın.' },
        { id: 3, type: 'role', text: 'Bir e-ticaret firması için dönüşüm oranını artırmak istiyorsunuz. Hangi metriklere bakarsınız ve nasıl analiz kurarsınız?' },
        { id: 4, type: 'role', text: 'A/B testi tasarımında dikkat etmeniz gereken istatisticel kavramları açıklayın. Başarılı bir test nasıl tasarlanır?' },
        { id: 5, type: 'problem', text: 'Bir dashboardda marka bilinirliği metriği 3 ay boyunca sabit kalmış. Bu anomaliyi nasıl araştırırsınız?' },
        { id: 6, type: 'closing', text: 'Veri alanında önümüzdeki dönemde öne çıkacağına inandığınız teknoloji veya yaklaşım nedir? Sizi nasıl hazırlıyorsunuz?' },
    ],

    genel: [
        { id: 1, type: 'intro', text: 'Kendinizi kısaca tanıtın. Bu pozisyona başvurmanızın temel sebebi nedir?' },
        { id: 2, type: 'behavioral', text: 'Kariyerinizde aldığınız en zor kararlardan birini anlatın. Bu kararı nasıl verdiniz?' },
        { id: 3, type: 'role', text: 'En güçlü mesleki yönünüzü ve bunu kanıtlayan somut bir örneği anlatın.' },
        { id: 4, type: 'role', text: 'En büyük mesleki zayıflığınız nedir ve bu konuda ne yapıyorsunuz?' },
        { id: 5, type: 'problem', text: 'Çok az bilgiyle hızlı karar vermeniz gereken bir durumu anlatın. Nasıl ilerledi?' },
        { id: 6, type: 'closing', text: '5 yıl sonra kendinizi nerede görüyorsunuz? Bu pozisyon ve şirket bu hedefe nasıl katkı sağlar?' },
    ],
};

export const BENCHMARK = {
    turkiyeOrtalamasi: 6.2,
    enIyi20: 8.5,
    katilimci: '12.847',
};
