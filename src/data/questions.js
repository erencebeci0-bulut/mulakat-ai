export const ROLES = [
    { id: 'yazilim', label: 'Yazılım Mülakatı', icon: 'Code', description: 'Geliştirici, mühendis, tester' },
    { id: 'satis', label: 'Satış Mülakatı', icon: 'Handshake', description: 'Satış uzmanı, B2B, hesap yöneticisi' },
    { id: 'pazarlama', label: 'Pazarlama Mülakatı', icon: 'Megaphone', description: 'Dijital, içerik, performans pazarlama' },
    { id: 'ik', label: 'İnsan Kaynakları', icon: 'Target', description: 'İşe alım, kültür, yetenek yönetimi' },
    { id: 'finans', label: 'Finans Mülakatı', icon: 'BarChart', description: 'Analist, muhasebe, finans' },
    { id: 'musteri', label: 'Müşteri Hizmetleri', icon: 'MessageSquare', description: 'Çağrı merkezi, destek' },
    { id: 'mezun', label: 'Yeni Mezun', icon: 'Target', description: 'Giriş seviyesi, stajyer' },
    { id: 'genel', label: 'Genel Mülakat', icon: 'Box', description: 'Tüm sektörler ve pozisyonlar' }
];

export const STATIC_SUGGESTIONS = [
    "Cevabınızda somut bir iş/okul deneyiminizi örnek vererek detaylandırabilirsiniz.",
    "Sonuç kısmını daha net ve ölçülebilir rakamlarla açıklayabilirsiniz.",
    "Bireysel katkınızın yanında takım çalışması deneyiminizi de vurgulayabilirsiniz.",
    "Kısa bir cevap oldu. Olayın bağlamını (neden bu kararı aldığınızı) eklemek iyi olabilir.",
    "Sektörünüze özel teknik/mesleki terimleri kullanarak cevabınızı daha profesyonel hale getirebilirsiniz."
];

export const QUESTIONS = {
    yazilim: [
        { id: 1, type: 'intro', text: 'Yazılım geliştirme alanına nasıl adım attınız? Kariyerinizden kısaca bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Takım içinde teknik bir karar konusunda anlaşmazlık yaşadığınız bir durumu ve nasıl aştığınızı anlatın.' },
        { id: 3, type: 'role', text: 'Temiz kod (clean code) yazmak size göre ne anlama geliyor? Hangi prensipleri benimsiyorsunuz?' },
        { id: 4, type: 'role', text: 'Kullandığınız teknolojilerde performansı artırmak için uyguladığınız temel düzeydeki optimizasyon teknikleri nelerdir?' },
        { id: 5, type: 'problem', text: 'Canlı ortamda kritik bir hata oluştu ve müşteriler sorun yaşıyor. İlk müdahaleniz ve adımlarınız ne olur?' },
        { id: 6, type: 'closing', text: 'Gelecekte yazılım alanında kendinizi hangi yönde geliştirmeyi planlıyorsunuz?' }
    ],
    satis: [
        { id: 1, type: 'intro', text: 'Satış alanındaki kariyerinizi ve elde ettiğiniz en gurur verici başarıyı anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Kaybetme noktasına geldiğiniz zorlu bir müşteriyi nasıl geri kazandınız?' },
        { id: 3, type: 'role', text: 'Bir satış döngüsünde potansiyel müşteri (lead) kalitesini nasıl değerlendirirsiniz?' },
        { id: 4, type: 'role', text: 'Fiyatın çok yüksek olduğunu söyleyip itiraz eden bir müşteriye satış kapama sürecinde nasıl yaklaşırsınız?' },
        { id: 5, type: 'problem', text: 'Aylık kotanızın çok gerisindesiniz ve ayın bitmesine sadece bir hafta var. Aksiyon planınız ne olur?' },
        { id: 6, type: 'closing', text: 'Size göre başarılı bir satış profesyonelinin sahip olması gereken en önemli üç yetenek nedir?' }
    ],
    pazarlama: [
        { id: 1, type: 'intro', text: 'Pazarlama dünyasına giriş hikayenizi ve bugüne kadar yönettiğiniz en başarılı kampanyayı anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Yüksek bütçeli bir kampanyanızın beklenen dönüşümü getirmediğini gördünüz. Nasıl bir aksiyon aldınız?' },
        { id: 3, type: 'role', text: 'Bir markanın hedef kitlesini belirlerken ve konumlandırmasını yaparken hangi verileri kullanırsınız?' },
        { id: 4, type: 'role', text: 'Dijital pazarlama kanallarının ROI (yatırım getirisi) ölçümünü nasıl hesaplar ve raporlarsınız?' },
        { id: 5, type: 'problem', text: 'Sosyal medyada markanızla ilgili ani bir kriz/linç başladı. İletişim stratejinizi nasıl kurgularsınız?' },
        { id: 6, type: 'closing', text: 'Pazarlama alanında önümüzdeki dönemde hangi trendlerin öne çıkacağını düşünüyorsunuz?' }
    ],
    ik: [
        { id: 1, type: 'intro', text: 'İnsan Kaynakları alanındaki geçmişinizden ve daha çok odaklandığınız süreçlerden kısaca bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Uzun süre doldurulamayan zor bir pozisyonu kapatmak için işe alım stratejinizi nasıl değiştirdiniz?' },
        { id: 3, type: 'role', text: 'Aday mülakatlarında adayın kurum kültürüne uygunluğunu ölçmek için hangi teknikleri/soruları kullanırsınız?' },
        { id: 4, type: 'role', text: 'Çalışan sadakatini ve bağlılığını (employee engagement) artırmak için bugüne kadar ne tür uygulamalar denediniz?' },
        { id: 5, type: 'problem', text: 'Bir yönetici, ekibindeki çalışanın performansından şikayetçi ancak geri bildirim mekanizması işletilmemiş. Sürece nasıl dahil olursunuz?' },
        { id: 6, type: 'closing', text: 'Sizce modern bir şirkette İnsan Kaynakları departmanının en önemli misyonu nedir?' }
    ],
    finans: [
        { id: 1, type: 'intro', text: 'Finans alanındaki tecrübelerinizden ve bugüne kadar üstlendiğiniz temel sorumluluklardan bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Önemli bir finansal raporda hata yaptığınızı sonradan fark ettiğiniz bir durumu ve süreci nasıl yönettiğinizi anlatın.' },
        { id: 3, type: 'role', text: 'Bir şirketin finansal sağlığını değerlendirirken en çok hangi oranlara (rasyolara) ve tablolara odaklanırsınız?' },
        { id: 4, type: 'role', text: 'Bütçeleme ve finansal tahminleme (forecasting) yaparken kullandığınız sistemler/yaklaşımlar nelerdir?' },
        { id: 5, type: 'problem', text: 'Şirketin nakit akışında beklenmedik bir daralma öngördünüz. Yönetime sunacağınız ilk 3 önlem ne olurdu?' },
        { id: 6, type: 'closing', text: 'Finans sektöründeki değişen teknoloji (ör: yapay zeka) sizce bu rolü önümüzdeki 5 yılda nasıl etkileyecek?' }
    ],
    musteri: [
        { id: 1, type: 'intro', text: 'Müşteri hizmetleri deneyiminizden ve insanlarla iletişim kurma konusundaki yaklaşımınızdan kısaca bahseder misiniz?' },
        { id: 2, type: 'behavioral', text: 'Çok öfkeli veya mağduriyet yaşamış bir müşteriyle yaptığınız en zorlu görüşmeyi nasıl çözüme kavuşturduğunuzu anlatın.' },
        { id: 3, type: 'role', text: 'Gün içinde art arda gergin müşterilerle görüşmenize rağmen motivasyonunuzu ve enerjinizi nasıl korursunuz?' },
        { id: 4, type: 'role', text: 'Müşteriye kurum politikaları gereği "haklısınız ama işlemi yapamıyorum" demek zorunda kaldığınız bir durumu nasıl yönetirsiniz?' },
        { id: 5, type: 'problem', text: 'Kullandığınız sistem çöktü, işlemi yapamıyorsunuz ama telefonda bekleyen bir müşteri var. İletişimi o sırada nasıl sürdürürsünüz?' },
        { id: 6, type: 'closing', text: 'Bu rolde başarılı olmak ve müşteri memnuniyeti yaratmak için kendinizde gördüğünüz en güçlü özellik nedir?' }
    ],
    mezun: [
        { id: 1, type: 'intro', text: 'Eğitim hayatınızı ve varsa kulüp, staj, proje veya gönüllülük deneyimlerinizi kısaca anlatır mısınız?' },
        { id: 2, type: 'behavioral', text: 'Üniversitede grup projelerinde karşılaştığınız bir zorluğu ve o zorluk karşısında nasıl sorumluluk aldığınızı anlatın.' },
        { id: 3, type: 'role', text: 'Pratik iş / sektör deneyiminizin az olmasını hangi kişisel veya teknik yetkinliklerinizle telafi edebileceğinize inanıyorsunuz?' },
        { id: 4, type: 'role', text: 'Öğrenmeye en açık olduğunuz alan nedir? Kendinizi geliştirmek için son 1 yılda proaktif olarak neler yaptınız?' },
        { id: 5, type: 'problem', text: 'Size verilen bir görevi iş hayatında nasıl yapacağınızı hiç bilmiyorsunuz. İlk olarak nasıl bir aksiyon alırsınız?' },
        { id: 6, type: 'closing', text: 'İlk profesyonel iş deneyiminizden ve katılacağınız şirketten temel beklentileriniz nelerdir?' }
    ],
    genel: [
        { id: 1, type: 'intro', text: 'Kendinizi kısaca tanıtın. Sizi bu pozisyona ve sektörümüzde çalışmaya başvurmaya iten temel sebep nedir?' },
        { id: 2, type: 'behavioral', text: 'Kariyeriniz veya eğitim hayatınızda aldığınız en zor kararlardan birini anlatın. Bu kararı alırken nasıl bir süreç izlediniz?' },
        { id: 3, type: 'role', text: 'En güçlü mesleki (veya kişisel) yetkinliğinizi ve bunu kanıtlayan somut bir deneyiminizi bizimle paylaşır mısınız?' },
        { id: 4, type: 'role', text: 'Öz eleştiri yaptığınızda en büyük gelişim alanınızın ne olduğunu düşünüyorsunuz ve bu konuda ne yapıyorsunuz?' },
        { id: 5, type: 'problem', text: 'Elinizde çok az bilgi var ancak hızlı bir karar vermeniz gereken kritik bir durumun içindesiniz. Süreç nasıl işlerdi?' },
        { id: 6, type: 'closing', text: '5 yıl sonra kendinizi nerede, nasıl bir rol üstlenmiş olarak görüyorsunuz? Bu pozisyon bu büyük resme nasıl katkı sağlar?' }
    ]
};

export const BENCHMARK = {
    turkiyeOrtalamasi: 6.2,
    enIyi20: 8.5,
    katilimci: '12.847',
};
