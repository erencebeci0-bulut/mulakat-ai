// Structured rule-based scoring engine — works without any paid AI API.
// Can be replaced or enhanced with real AI scoring later.

const STOP_WORDS = new Set(['bir', 've', 'ile', 'bu', 'de', 'da', 'için', 'ama', 'ben', 'biz', 'o', 'çok', 'daha', 'en', 'mi', 'mı', 'mu', 'mü']);

function wordCount(text) {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function meaningfulWordCount(text) {
    return text.trim().split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w.toLowerCase())).length;
}

function hasSentenceStructure(text) {
    return text.includes('.') || text.includes(',') || text.length > 100;
}

function hasConcreteExample(text) {
    const markers = ['örneğin', 'örnek', 'mesela', 'bir zamanlar', 'geçen', 'projemizde', 'firmasında', 'şirkette', 'ekibimizde', 'sonuç', 'başardım', 'yaptım', 'çözdüm'];
    const lower = text.toLowerCase();
    return markers.some(m => lower.includes(m));
}

function hasQuantification(text) {
    return /\d+/.test(text); // Contains numbers — usually a good sign
}

function hasStructureWords(text) {
    const words = ['önce', 'sonra', 'ardından', 'ilk', 'ikinci', 'üçüncü', 'bir', 'ayrıca', 'öte yandan', 'bunun yanında', 'sonuç olarak', 'özetle', 'birinci', 'adım'];
    const lower = text.toLowerCase();
    return words.filter(w => lower.includes(w)).length;
}

function hasRoleKeywords(text, role) {
    const roleKeywords = {
        yazilim: ['kod', 'sistem', 'mimari', 'api', 'debug', 'test', 'performans', 'proje', 'geliştirme', 'yazılım', 'servis', 'veri tabanı', 'algoritma', 'refactor'],
        urun: ['kullanıcı', 'özellik', 'roadmap', 'metrik', 'paydaş', 'öncelik', 'ürün', 'müşteri', 'kpi', 'strateji', 'sprint', 'feedback', 'hipotez'],
        pazarlama: ['kampanya', 'kanal', 'içerik', 'dönüşüm', 'seo', 'sosyal medya', 'bütçe', 'marka', 'hedef kitle', 'analytics', 'growth', 'funnel'],
        satis: ['müşteri', 'satış', 'anlaşma', 'teklife', 'itiraz', 'kapama', 'ikna', 'ilişki', 'pipeline', 'hedef', 'gelir'],
        veri: ['veri', 'analiz', 'metrik', 'model', 'grafik', 'dashboard', 'sql', 'istatistik', 'insight', 'korelasyon', 'tahmin'],
        genel: ['takım', 'iletişim', 'hedef', 'başarı', 'öğrendim', 'deneyim', 'proakif', 'çözüm', 'sorumluluk'],
    };
    const keywords = roleKeywords[role] || roleKeywords.genel;
    const lower = text.toLowerCase();
    return keywords.filter(k => lower.includes(k)).length;
}

export function scoreAnswer(answer, role, questionType) {
    if (!answer || answer.trim().length < 10) {
        return {
            score: 1,
            feedback: 'Cevabınız çok kısa veya boş gibi görünüyor. Daha detaylı bir yanıt vermenizi öneririz.',
            suggestion: 'STAR yöntemi (Durum, Görev, Aksiyon, Sonuç) kullanarak cevabınızı genişletin.',
            breakdown: { clarity: 1, structure: 1, relevance: 1, example: 1, persuasion: 1 },
        };
    }

    const wc = wordCount(answer);
    const mwc = meaningfulWordCount(answer);
    const hasExample = hasConcreteExample(answer);
    const hasNumbers = hasQuantification(answer);
    const structureScore = hasStructureWords(answer);
    const roleKw = hasRoleKeywords(answer, role);
    const sentenceStructure = hasSentenceStructure(answer);

    // Clarity: Word count + meaningful words
    let clarity = 3;
    if (wc >= 50) clarity += 1;
    if (wc >= 100) clarity += 1;
    if (mwc >= 30) clarity += 1;
    if (sentenceStructure) clarity += 1;
    clarity = Math.min(clarity, 10);

    // Structure: Logical connectors + sentence organization
    let structure = 3;
    if (structureScore >= 1) structure += 1;
    if (structureScore >= 2) structure += 1;
    if (wc >= 80) structure += 1;
    if (hasNumbers) structure += 1;
    structure = Math.min(structure, 10);

    // Relevance: Role-specific keywords
    let relevance = 3;
    if (roleKw >= 1) relevance += 1;
    if (roleKw >= 2) relevance += 1;
    if (roleKw >= 3) relevance += 1;
    if (questionType === 'role' && roleKw >= 2) relevance += 1;
    relevance = Math.min(relevance, 10);

    // Example: Concrete evidence
    let example = 3;
    if (hasExample) example += 3;
    if (hasNumbers) example += 2;
    if (wc >= 100 && hasExample) example += 1;
    example = Math.min(example, 10);

    // Persuasion: Combination
    let persuasion = Math.round((clarity + structure + relevance + example) / 4);

    const rawScore = (clarity * 0.2 + structure * 0.2 + relevance * 0.25 + example * 0.25 + persuasion * 0.1);

    // Normalize to 1-10 with slight variation
    const score = Math.max(1, Math.min(10, Math.round(rawScore * 10) / 10));

    const { feedback, suggestion } = generateFeedback(score, { clarity, structure, relevance, example }, role, questionType);

    return {
        score,
        feedback,
        suggestion,
        breakdown: { clarity, structure, relevance, example, persuasion },
    };
}

function generateFeedback(score, dims, role, qType) {
    const feedbacks = {
        high: [
            'Cevabınız oldukça güçlü. Somut örnekler ve yapılandırılmış bir anlatım kullandınız.',
            'Etkileyici bir yanıt. Deneyimlerinizi net ve ikna edici biçimde aktardınız.',
            'Cevabınız profesyonel ve role uygun. Güçlü bir adayın izlenimini yaratıyor.',
        ],
        mid: [
            'Cevabınız iyi bir temele sahip, ancak somut örnek eklemek yanıtı güçlendirecektir.',
            'Düşüncelerinizi iyi ifade ettiniz. Biraz daha yapısal kurgu ve sayısal destek ekleyebilirsiniz.',
            'Mantıklı bir yanıt. İçeriği biraz daha derinleştirirseniz çok daha güçlü olur.',
        ],
        low: [
            'Cevabınız başlangıç noktası olarak iyi, ancak daha fazla detay ve örnek gerekiyor.',
            'Temel fikri yakaladınız, ama yanıtı somutlaştırmak için deneyimlerinizden örnekler ekleyin.',
            'Doğru yönde bir başlangıç. Cevabın yapısını ve içeriğini zenginleştirmeniz önerilir.',
        ],
    };

    const suggestions = {
        high: [
            'Rakamsal verilerle desteklenmiş örnekler eklenirse cevap daha da güçlü olur.',
            'Öğrendiklerinizi vurgulayarak refleksif düşünceyi öne çıkarabilirsiniz.',
        ],
        mid: [
            'STAR yöntemi (Durum, Görev, Aksiyon, Sonuç) ile anlatımı yapılandırmayı deneyin.',
            'Ölçülebilir bir etki veya sonuç ekleyerek cevabı güçlendirin.',
            'Daha spesifik örnekler verin — genel ifadeler yerine somut durumlar kullanın.',
        ],
        low: [
            'En az bir gerçek iş deneyimini örnek olarak anlatın.',
            'Yanıtı en az 3-4 cümleyle genişletin ve role özel terimler kullanın.',
            'STAR yöntemi: Durumu, görevinizi, aksiyonlarınızı ve sonucu açıklayın.',
        ],
    };

    const level = score >= 7.5 ? 'high' : score >= 5 ? 'mid' : 'low';
    const fbList = feedbacks[level];
    const sgList = suggestions[level];

    const feedback = fbList[Math.floor(Math.random() * fbList.length)];
    const suggestion = sgList[Math.floor(Math.random() * sgList.length)];

    return { feedback, suggestion };
}

export function generateFinalReport(answers, role, cvText) {
    const scores = answers.map(a => a.score);
    const avg = scores.reduce((s, n) => s + n, 0) / scores.length;
    const finalScore = Math.round(avg * 10) / 10;

    // Subscores
    const avgBreakdown = answers.reduce((acc, a) => {
        Object.keys(a.breakdown).forEach(k => {
            acc[k] = (acc[k] || 0) + a.breakdown[k];
        });
        return acc;
    }, {});
    Object.keys(avgBreakdown).forEach(k => {
        avgBreakdown[k] = Math.round((avgBreakdown[k] / answers.length) * 10) / 10;
    });

    const subscores = {
        iletisim: avgBreakdown.clarity,
        problemCozme: avgBreakdown.relevance,
        yapiVeNetlik: avgBreakdown.structure,
        motivasyon: avgBreakdown.persuasion,
        roleUygunlugu: avgBreakdown.example,
    };

    const strengths = [];
    const weaknesses = [];

    if (subscores.iletisim >= 7) strengths.push('Kendinizi net ve anlaşılır biçimde ifade ediyorsunuz.');
    else weaknesses.push('İletişim netliğinizi ve cevap uzunluğunuzu artırmanız önerilir.');

    if (subscores.problemCozme >= 7) strengths.push('Role özgü bilgi ve terminoloji kullanımınız güçlü.');
    else weaknesses.push('Role özgü bilgi ve terminoloji kullanımınızı geliştirmeniz gerekiyor.');

    if (subscores.yapiVeNetlik >= 7) strengths.push('Cevaplarınız mantıklı bir yapı ve akış içeriyor.');
    else weaknesses.push('Cevaplarınızı daha yapısal (başlangıç, gelişme, sonuç) sunmaya çalışın.');

    if (subscores.motivasyon >= 7) strengths.push('İkna edici ve motivasyonlu bir tutum sergiliyorsunuz.');
    else weaknesses.push('Daha somut örnekler ve somut sonuçlarla motivasyonunuzu kanıtlayın.');

    if (subscores.roleUygunlugu >= 7) strengths.push('Gerçek deneyimlerden somut örnekler veriyorsunuz.');
    else weaknesses.push('Yanıtlarınızı somut iş deneyimleri ve örneklerle zenginleştirin.');

    if (strengths.length === 0) strengths.push('Temel soruları yanıtlayabildiniz ve süreci tamamladınız.');
    if (weaknesses.length === 0) weaknesses.push('Genel olarak güçlü bir performans — ufak tefek detayları rafine etmeyi sürdürün.');

    const summaries = {
        high: `Mülakatı güçlü bir performansla tamamladınız. Cevaplarınız genellikle yapılandırılmış, ikna edici ve role uygundu. İşe alım süreçlerinde rekabetçi bir aday olduğunuzu gösterdiniz.`,
        mid: `Mülakatta genel olarak tatmin edici bir performans sergilendi. Bazı cevaplarınız oldukça güçlüyken, bir kısmı daha fazla derinlik ve somut örnek gerektiriyor. Hazırlık düzeyinizi artırarak bu skorun üstüne çıkabilirsiniz.`,
        low: `Mülakata hazırlık sürecinizin başındaysınız. Temel soruları yanıtlayabildiniz ancak cevaplarınız daha fazla somutluk, yapı ve role özgü bilgi gerektiriyor. Bu platformu tekrar kullanarak ilerlemenizi takip edebilirsiniz.`,
    };

    const coachingTips = [
        'Her cevabı STAR yöntemiyle yapılandırın: Durum → Görev → Aksiyon → Sonuç.',
        'Mümkün olduğunca sayısal veriler ve ölçülebilir sonuçlar ekleyin.',
        'Role özgü terimler ve sektör dili kullanmaya özen gösterin.',
        'Her cevabı 100-200 kelime arasında tutmayı hedefleyin: Çok kısa veya çok uzun olmadan.',
        'Yanıtlarınıza "Bu deneyimden şunu öğrendim" gibi refleksif kapanışlar ekleyin.',
    ];

    // CV analysis if available
    let cvAnalysis = null;
    if (cvText && cvText.trim().length > 50) {
        cvAnalysis = generateCvAnalysis(cvText, role);
    }

    return {
        finalScore,
        subscores,
        summary: summaries[finalScore >= 7.5 ? 'high' : finalScore >= 5.5 ? 'mid' : 'low'],
        strengths,
        weaknesses,
        coachingTips,
        cvAnalysis,
        benchmark: {
            userScore: finalScore,
            turkiyeOrtalamasi: 6.2,
            enIyi20: 8.5,
        },
    };
}

function generateCvAnalysis(cvText, role) {
    const wc = wordCount(cvText);
    const hasEducation = /üniversite|okul|lisans|yüksek lisans|mezun|bölüm/i.test(cvText);
    const hasExperience = /yıl|deneyim|çalıştım|staj|pozisyon|görev/i.test(cvText);
    const hasSkills = /beceri|yetenek|teknoloji|araç|program|dil/i.test(cvText);

    return {
        ozet: wc > 100 ? 'CV\'niz yeterli içerik barındırıyor ve temel bölümleri kapsıyor.' : 'CV\'niz oldukça kısa görünüyor. İçeriki zenginleştirmeniz önerilir.',
        gucluTaraflar: [
            hasEducation ? 'Eğitim bilgileri mevcut.' : null,
            hasExperience ? 'İş deneyimi bölümü var.' : null,
            hasSkills ? 'Beceri listesi içeriyor.' : null,
        ].filter(Boolean),
        eksikAlanlar: [
            !hasEducation ? 'Eğitim bilgisi bulunamadı.' : null,
            !hasExperience ? 'İş deneyimi bilgisi eksik görünüyor.' : null,
            !hasSkills ? 'Teknik/kişisel beceriler bölümü ekleyin.' : null,
            'Başarı odaklı maddeler ekleyin (örn: %X büyüme sağladım).',
        ].filter(Boolean),
        roleUyumu: `CV içeriği ${role === 'genel' ? 'genel pozisyonlara' : 'seçtiğiniz role'} kısmen uygun görünüyor. Daha fazla role özgü anahtar kelime kullanmanız önerilir.`,
        cvOneriler: [
            'Her iş deneyimine ölçülebilir başarı maddeleri ekleyin.',
            'CV\'nizi hedef role özel anahtar kelimelerle optimize edin.',
            'ATS (Aday Takip Sistemi) uyumlu sade bir format tercih edin.',
        ],
    };
}
