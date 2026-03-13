export const ROLES = [
    { id: 'frontend', label: 'Frontend Developer', icon: 'Code', description: 'React, Vue, JS' },
    { id: 'backend', label: 'Backend Developer', icon: 'Code', description: 'Node.js, Java, Python' },
    { id: 'fullstack', label: 'Full Stack Developer', icon: 'Code', description: 'Uçtan uca geliştirme' },
    { id: 'veri', label: 'Veri Analisti', icon: 'BarChart', description: 'Veri analizi, iş zekası' },
    { id: 'urun', label: 'Ürün Yöneticisi', icon: 'Box', description: 'Ürün yönetimi, PM' },
    { id: 'satis', label: 'Satış Temsilcisi', icon: 'Handshake', description: 'Satış, B2B' },
    { id: 'cagri', label: 'Çağrı Merkezi', icon: 'Megaphone', description: 'Müşteri hizmetleri' },
    { id: 'ik', label: 'İK Uzmanı', icon: 'Target', description: 'İşe alım, kültür' },
    { id: 'banka', label: 'Bankacılık', icon: 'BarChart', description: 'Finans, gişe' },
    { id: 'mezun', label: 'Yeni Mezun', icon: 'Target', description: 'Giriş seviyesi' },
    { id: 'genel', label: 'Genel Mülakat', icon: 'Target', description: 'Genel pozisyonlar' }
];

export const QUESTIONS = {
    frontend: [
        { id: 1, type: 'intro', text: 'Frontend geliştirme dünyasına nasıl adım attınız? Kısaca bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Takım içinde teknik bir karar konusunda anlaşmazlık yaşadığınız bir durumu ve nasıl aştığınızı anlatın.' },
        { id: 3, type: 'role', text: 'React veya kullandığınız JS frameworkünde state yönetimini nasıl kurguluyorsunuz? Örnek verin.' },
        { id: 4, type: 'role', text: 'Web performansını artırmak için uyguladığınız temel optimizasyon teknikleri nelerdir?' },
        { id: 5, type: 'problem', text: 'Önemli bir lansman sabahı canlı ortamda beyaz ekran hatası (blank screen) aldınız. İlk ne yaparsınız?' },
        { id: 6, type: 'closing', text: 'Önümüzdeki yıllarda frontend alanında hangi teknolojilere odaklanmayı planlıyorsunuz?' }
    ],
    backend: [
        { id: 1, type: 'intro', text: 'Backend geliştirme konusundaki deneyiminizden ve en güçlü olduğunuz teknolojilerden bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Teslim tarihi çok yakın olan ama teknik borcu yüksek bir projeyi nasıl yönettiniz?' },
        { id: 3, type: 'role', text: 'Sistem mimarisi tasarlarken mikroservis mi yoksa monolitik mi tercih edersiniz? Neden?' },
        { id: 4, type: 'role', text: 'Veritabanı optimizasyonu ve sorgu performansı konusunda deneyimlerinizi paylaşır mısınız?' },
        { id: 5, type: 'problem', text: 'Servisiniz aniden 10 katı trafik almaya başladı ve yanıt süreleri uzadı. Soruna nasıl müdahale edersiniz?' },
        { id: 6, type: 'closing', text: 'Bu pozisyonda ekibe en büyük teknik katkınızın ne olacağını düşünüyorsunuz?' }
    ],
    fullstack: [
        { id: 1, type: 'intro', text: 'Hem backend hem frontend süreçlerinde çalışmak size nasıl bir avantaj sağlıyor?' },
        { id: 2, type: 'behavioral', text: 'Baştan sona tek başınıza veya küçük bir ekiple canlıya aldığınız en zorlu projeyi anlatın.' },
        { id: 3, type: 'role', text: 'Frontend ile backend arasındaki API iletişimini kurgularken güvenlik ve performans için nelere dikkat edersiniz?' },
        { id: 4, type: 'role', text: 'Kimlik doğrulama (auth) süreçlerinde tercih ettiğiniz yöntemler ve nedenleri nelerdir?' },
        { id: 5, type: 'problem', text: 'Kullanıcılar uygulamadaki bir işlemin çok yavaş olduğunu söylüyor fakat loglarda hata yok. Nereden başlarsınız?' },
        { id: 6, type: 'closing', text: 'Kariyerinizde daha çok hangi yöne (frontend/backend/mimari) ağırlık vermek istiyorsunuz?' }
    ],
    veri: [
        { id: 1, type: 'intro', text: 'Veri analizi kariyerinizi ve şu ana kadar üzerinde çalıştığınız en ilgi çekici veri projesini anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Analizinizin yanlış olduğunu sonradan fark ettiğinizde nasıl davrandınız? Süreci anlatın.' },
        { id: 3, type: 'role', text: 'Bir e-ticaret firması için dönüşüm oranını artırmak istiyorsunuz. Hangi metriklere bakarsınız ve nasıl analiz kurarsınız?' },
        { id: 4, type: 'role', text: 'Karmaşık bir veri setini teknik olmayan yöneticilere nasıl sunarsınız?' },
        { id: 5, type: 'problem', text: 'Bir dashboardda kritik bir metrik aniden düştü. Veri hatası mı yoksa gerçek düşüş mü olduğunu nasıl anlarsınız?' },
        { id: 6, type: 'closing', text: 'Veri alanında önümüzdeki dönemde öne çıkacağına inandığınız teknoloji veya yaklaşım nedir?' }
    ],
    urun: [
        { id: 1, type: 'intro', text: 'Kariyerinizi kısaca anlatır mısınız? Ürün yönetimine nasıl adım attınız?' },
        { id: 2, type: 'behavioral', text: 'Geliştirme ekibi ve iş birimleri arasında kalan bir ürün kararını nasıl yönettiniz?' },
        { id: 3, type: 'role', text: 'Ürün yol haritasını (roadmap) oluştururken özellikleri nasıl önceliklendirirsiniz?' },
        { id: 4, type: 'role', text: 'Başarılı bir ürünü hangi KPI ve metriklerle takip edersiniz?' },
        { id: 5, type: 'problem', text: 'Piyasaya sürdüğünüz yeni bir özelliğin hiç kullanılmadığını fark ettiniz. Sonraki adımlarınız ne olur?' },
        { id: 6, type: 'closing', text: 'İyi bir şirket ve ürün kültürü sizce nasıl olmalı?' }
    ],
    satis: [
        { id: 1, type: 'intro', text: 'Satış kariyerinizi ve en çok gurur duyduğunuz satış başarınızı anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Kaybetme noktasına geldiğiniz bir müşteriyi nasıl geri kazandınız?' },
        { id: 3, type: 'role', text: 'B2B veya B2C satışta potansiyel müşteri (lead) kalitesini nasıl değerlendirirsiniz?' },
        { id: 4, type: 'role', text: 'Fiyat itirazı yapan bir müşteriye satış kapatma sürecinde nasıl yaklaşırsınız?' },
        { id: 5, type: 'problem', text: 'Aylık kotanızın çok gerisindesiniz ve ayın bitmesine sadece bir hafta var. Aksiyon planınız ne olur?' },
        { id: 6, type: 'closing', text: 'Size göre mükemmel bir satış profesyonelinin en önemli 3 yeteneği nedir?' }
    ],
    cagri: [
        { id: 1, type: 'intro', text: 'Müşteri hizmetleri veya çağrı merkezi deneyiminizden kısaca bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Çok öfkeli veya memnuniyetsiz bir müşteriyle yaptığınız en zorlu görüşmeyi nasıl yönettiniz?' },
        { id: 3, type: 'role', text: 'Gün içinde çok sayıda tekrar eden sorunla karşılaştığınızda motivasyonunuzu nasıl korursunuz?' },
        { id: 4, type: 'role', text: 'Aynı anda hem müşteriyi dinleyip hem de sistemde işlem yapma konusundaki pratiğiniz nasıldır?' },
        { id: 5, type: 'problem', text: 'Sistemin çöktüğü ve işlem yapamadığınız bir anda çağrı aldığınızda nasıl iletişim kurarsınız?' },
        { id: 6, type: 'closing', text: 'Bu rolde başarılı olmak için kendinizde gördüğünüz en güçlü özellik nedir?' }
    ],
    ik: [
        { id: 1, type: 'intro', text: 'İnsan Kaynakları alanındaki geçmişinizden ve odaklandığınız fonksiyonlardan kısaca bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Uzun süre kapanmayan zor bir pozisyonu doldurmak için stratejinizi nasıl değiştirdiniz?' },
        { id: 3, type: 'role', text: 'Aday mülakatlarında adayın kurum kültürüne uygunluğunu hangi sorularla veya yöntemlerle ölçersiniz?' },
        { id: 4, type: 'role', text: 'Çalışan sadakatini ve bağlılığını artırmak için ne tür uygulamalar yaparsınız?' },
        { id: 5, type: 'problem', text: 'Bir yönetici, ekibindeki bir çalışanın performansından şikayetçi ancak geri bildirim süreci işletilmemiş. Nasıl yönlendirirsiniz?' },
        { id: 6, type: 'closing', text: 'Sizce modern bir şirkette İnsan Kaynakları departmanının en önemli misyonu nedir?' }
    ],
    banka: [
        { id: 1, type: 'intro', text: 'Bankacılık veya finans sektöründeki tecrübelerinizden bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Müşteriye kurum politikaları gereği "hayır" demek zorunda kaldığınız bir durumu nasıl yönettiniz?' },
        { id: 3, type: 'role', text: 'Finansal ürün satışı (kredi, sigorta vb.) yaparken müşteri ihtiyacını nasıl tespit edersiniz?' },
        { id: 4, type: 'role', text: 'Operasyonel hata riskini en aza indirmek için günlük çalışma rutininizde nelere dikkat edersiniz?' },
        { id: 5, type: 'problem', text: 'Gişede veya şubede müşteri kuyruğu çok uzadı ve sistem aniden yavaşladı. Bu kriz anını nasıl yönetirsiniz?' },
        { id: 6, type: 'closing', text: 'Bankacılık sektöründeki kariyer hedefleriniz nelerdir?' }
    ],
    mezun: [
        { id: 1, type: 'intro', text: 'Eğitim hayatınızı ve varsa staj/proje deneyimlerinizi kısaca anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Üniversitede grup projelerinde karşılaştığınız bir zorluğu ve sorumluluğu nasıl aldığınızı anlatın.' },
        { id: 3, type: 'role', text: 'Pratik iş deneyiminizin az olmasını hangi kişisel veya teknik yetkinliklerinizle telafi ediyorsunuz?' },
        { id: 4, type: 'role', text: 'Öğrenmeye en açık olduğunuz alan nedir? Kendinizi geliştirmek için son 6 ayda neler yaptınız?' },
        { id: 5, type: 'problem', text: 'Size verilen bir görevi nasıl yapacağınızı hiç bilmiyorsunuz. İlk olarak kimden veya nereden yardım alırsınız?' },
        { id: 6, type: 'closing', text: 'İlk iş deneyiminizden ve şirketinizden temel beklentileriniz nelerdir?' }
    ],
    genel: [
        { id: 1, type: 'intro', text: 'Kendinizi kısaca tanıtın. Bu pozisyona başvurmanızın temel sebebi nedir?' },
        { id: 2, type: 'behavioral', text: 'Kariyerinizde aldığınız en zor kararlardan birini anlatın. Bu kararı nasıl verdiniz?' },
        { id: 3, type: 'role', text: 'En güçlü mesleki yönünüzü ve bunu kanıtlayan somut bir örneği anlatın.' },
        { id: 4, type: 'role', text: 'En büyük mesleki zayıflığınız nedir ve bu konuda ne yapıyorsunuz?' },
        { id: 5, type: 'problem', text: 'Çok az bilgiyle hızlı karar vermeniz gereken bir durumu anlatın. Nasıl ilerledi?' },
        { id: 6, type: 'closing', text: '5 yıl sonra kendinizi nerede görüyorsunuz? Bu pozisyon bu hedefe nasıl katkı sağlar?' }
    ]
};

export const BENCHMARK = {
    turkiyeOrtalamasi: 6.2,
    enIyi20: 8.5,
    katilimci: '12.847',
};
