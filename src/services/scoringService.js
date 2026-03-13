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
    return /\d+/.test(text) || text.includes('%'); // Contains numbers or percent
}

function hasStructureWords(text) {
    const words = ['önce', 'sonra', 'ardından', 'ilk', 'ikinci', 'üçüncü', 'bir', 'ayrıca', 'öte yandan', 'bunun yanında', 'sonuç olarak', 'özetle', 'birinci', 'adım'];
    const lower = text.toLowerCase();
    return words.filter(w => lower.includes(w)).length;
}

function hasRoleKeywords(text, role) {
    const roleKeywords = {
        frontend: ['react', 'vue', 'js', 'javascript', 'html', 'css', 'dom', 'state', 'component', 'render', 'api', 'tasarım', 'ui', 'ux'],
        backend: ['node', 'java', 'python', 'api', 'veritabanı', 'sql', 'nosql', 'mikroservis', 'sunucu', 'sistem', 'performans', 'güvenlik'],
        fullstack: ['frontend', 'backend', 'full stack', 'api', 'veritabanı', 'react', 'node', 'mimari', 'sistem', 'entegrasyon'],
        veri: ['veri', 'analiz', 'metrik', 'model', 'grafik', 'dashboard', 'sql', 'istatistik', 'insight', 'korelasyon', 'tahmin', 'rapor'],
        urun: ['kullanıcı', 'özellik', 'roadmap', 'metrik', 'paydaş', 'öncelik', 'ürün', 'müşteri', 'kpi', 'strateji', 'sprint', 'feedback'],
        satis: ['müşteri', 'satış', 'anlaşma', 'teklif', 'itiraz', 'kapama', 'ikna', 'ilişki', 'pipeline', 'hedef', 'gelir', 'b2b', 'b2c'],
        cagri: ['müşteri', 'çözüm', 'iletişim', 'şikayet', 'hizmet', 'memnuniyet', 'sürec', 'destek', 'çağrı', 'yardım', 'dinleme'],
        ik: ['işe alım', 'kültür', 'aday', 'performans', 'görüşme', 'bağlılık', 'kariyer', 'çalışan', 'takım', 'motivasyon', 'ik', 'süreç'],
        banka: ['finans', 'kredi', 'müşteri', 'hesap', 'gişe', 'operasyon', 'risk', 'portföy', 'yatırım', 'şube', 'hedef'],
        mezun: ['öğrenme', 'gelişim', 'motivasyon', 'hedef', 'proje', 'üniversite', 'takım', 'kulüp', 'istek', 'çaba'],
        genel: ['takım', 'iletişim', 'hedef', 'başarı', 'öğrendim', 'deneyim', 'proaktif', 'çözüm', 'sorumluluk', 'problem']
    };
    const keywords = roleKeywords[role] || roleKeywords.genel;
    const lower = text.toLowerCase();
    return keywords.filter(k => lower.includes(k)).length;
}

function getConfidenceScore(text) {
    const lower = text.toLowerCase();
    const weakWords = ['sanırım', 'galiba', 'belki', 'gibi', 'emin değilim', 'hatırlamıyorum', 'yaani', 'şimdilik'];
    const weakCount = weakWords.filter(w => lower.includes(w)).length;
    let score = 8;
    score -= weakCount * 2;
    if (meaningfulWordCount(text) > 40) score += 2;
    return Math.max(1, Math.min(10, score));
}

export function scoreAnswer(answer, role, questionType) {
    if (!answer || answer.trim().length < 10) {
        return {
            score: 1,
            feedback: 'Cevabınız çok kısa veya boş gibi görünüyor. Daha detaylı bir yanıt vermenizi öneririz.',
            suggestion: 'STAR yöntemi (Durum, Görev, Aksiyon, Sonuç) kullanarak cevabınızı genişletin.',
            breakdown: { clarity: 1, structure: 1, technical: 1, confidence: 1, problemSolving: 1 },
        };
    }

    const wc = wordCount(answer);
    const mwc = meaningfulWordCount(answer);
    const hasExample = hasConcreteExample(answer);
    const hasNumbers = hasQuantification(answer);
    const structureScore = hasStructureWords(answer);
    const roleKw = hasRoleKeywords(answer, role);
    const sentenceStructure = hasSentenceStructure(answer);

    // 1. Communication Clarity
    let clarity = 3;
    if (wc >= 40) clarity += 2;
    if (wc >= 80) clarity += 2;
    if (mwc >= 30) clarity += 2;
    if (sentenceStructure) clarity += 1;
    clarity = Math.min(clarity, 10);

    // 2. STAR Structure
    let structure = 3;
    if (structureScore >= 1) structure += 2;
    if (structureScore >= 2) structure += 3;
    if (hasExample && structureScore >= 1) structure += 2;
    structure = Math.min(structure, 10);

    // 3. Technical Correctness (Role Relevance)
    let technical = 3;
    if (roleKw >= 1) technical += 2;
    if (roleKw >= 3) technical += 3;
    if (questionType === 'role' && roleKw >= 2) technical += 2;
    technical = Math.min(technical, 10);

    // 4. Confidence
    let confidence = getConfidenceScore(answer);

    // 5. Problem Solving
    let problemSolving = 3;
    if (hasExample) problemSolving += 4;
    if (hasNumbers) problemSolving += 2;
    if (wc >= 60 && hasExample) problemSolving += 1;
    problemSolving = Math.min(problemSolving, 10);

    const rawScore = (clarity * 0.2 + structure * 0.2 + technical * 0.2 + confidence * 0.2 + problemSolving * 0.2);
    const score = Math.max(1, Math.min(10, Math.round(rawScore * 10) / 10));

    const { feedback, suggestion } = generateFeedback(score, { clarity, structure, technical, confidence, problemSolving }, role, questionType);

    return {
        score,
        feedback,
        suggestion,
        breakdown: { clarity, structure, technical, confidence, problemSolving },
    };
}

function generateFeedback(score, dims, role, qType) {
    const feedbacks = {
        high: [
            'Cevabınız oldukça güçlü. Somut örnekler ve yapılandırılmış bir anlatım kullandınız.',
            'Etkileyici bir yanıt. Deneyimlerinizi net ve özgüvenli biçimde aktardınız.',
            'Cevabınız profesyonel ve role uygun. Teknik terminolojiyi yerinde kullandınız.',
        ],
        mid: [
            'Cevabınız iyi bir temele sahip, ancak somut bir örnek eklemek yanıtı güçlendirecektir.',
            'Düşüncelerinizi iyi ifade ettiniz. STAR formatına (Durum, Aksiyon, Sonuç) daha fazla odaklanabilirsiniz.',
            'Mantıklı bir yanıt. Teknik detayları veya role özgü terimleri artırırsanız çok daha güçlü olur.',
        ],
        low: [
            'Cevabınız başlangıç noktası olarak iyi, ancak daha fazla detay ve örnek gerekiyor.',
            'Temel fikri yakaladınız, ama yanıtı somutlaştırmak için deneyimlerinizden örnekler ekleyin.',
            'Doğru yönde bir başlangıç. Lütfen daha net ifadeler ve profesyonel terimler kullanarak yanıtınızı zenginleştirin.',
        ],
    };

    const suggestions = {
        high: [
            'Rakamsal veriler (örn: %30 artış) eklenirse cevap daha da ikna edici olur.',
            'Öğrendiklerinizi vurgulayarak kriz yönetimi yönünüzü öne çıkarabilirsiniz.',
        ],
        mid: [
            'STAR yöntemi (Durum, Görev, Aksiyon, Sonuç) ile anlatımı yapılandırmayı deneyin.',
            'Ölçülebilir bir etki veya sonuç ekleyerek problem çözme yeteneğinizi gösterin.',
            'Genel ifadeler yerine spesifik bir projenizden bahsedin.',
        ],
        low: [
            'En az bir gerçek iş veya okul deneyimini somut örnek olarak anlatın.',
            'Yanıtı biraz daha uzun tutun ve role özel terimler (sektör dili) kullanın.',
            'Durumu, aldığınız aksiyonu ve elde ettiğiniz sonucu (STAR) sırasıyla açıklayın.',
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
    if (!answers || answers.length === 0) {
        return null;
    }

    const scores = answers.map(a => a.score);
    const avg = scores.reduce((s, n) => s + n, 0) / scores.length;
    const finalScore = Math.round(avg * 10) / 10;

    // Subscores
    const avgBreakdown = answers.reduce((acc, a) => {
        if (a.breakdown) {
            Object.keys(a.breakdown).forEach(k => {
                acc[k] = (acc[k] || 0) + a.breakdown[k];
            });
        }
        return acc;
    }, {});

    Object.keys(avgBreakdown).forEach(k => {
        avgBreakdown[k] = Math.round((avgBreakdown[k] / answers.length) * 10) / 10;
    });

    const subscores = {
        iletisim: avgBreakdown.clarity || 0,
        star: avgBreakdown.structure || 0,
        teknik: avgBreakdown.technical || 0,
        ozguven: avgBreakdown.confidence || 0,
        problemCozme: avgBreakdown.problemSolving || 0,
    };

    const strengths = [];
    const weaknesses = [];

    if (subscores.iletisim >= 7) strengths.push('Kendinizi net, anlaşılır ve akıcı biçimde ifade ediyorsunuz.');
    else weaknesses.push('İletişim netliğinizi ve cevap detaylandırmanızı artırmanız önerilir.');

    if (subscores.teknik >= 7) strengths.push('Role özgü teknik bilgi ve sektörel terminoloji kullanımınız çok güçlü.');
    else weaknesses.push('Seçtiğiniz role özgü teknik detaylara ve kavramlara daha fazla yer vermelisiniz.');

    if (subscores.star >= 7) strengths.push('Cevaplarınız STAR metodolojisine uygun, iyi yapılandırılmış bir akış içeriyor.');
    else weaknesses.push('Cevaplarınızı bağlam, aksiyon ve sonuç (STAR) formatında kurgulamaya çalışın.');

    if (subscores.ozguven >= 7) strengths.push('Cevaplarınızda tereddütsüz, ikna edici ve özgüvenli bir tutum sergiliyorsunuz.');
    else weaknesses.push('Tereddüt belirten kelimeleri (sanırım, galiba) azaltarak özgüveninizi yansıtın.');

    if (subscores.problemCozme >= 7) strengths.push('Somut örnekler ve verilerle problem çözme yeteneğinizi başarıyla kanıtlıyorsunuz.');
    else weaknesses.push('Karşılaştığınız problemleri nasıl çözdüğünüzü rakamlar ve somut örneklerle anlatın.');

    if (strengths.length === 0) strengths.push('Temel soruları yanıtlayarak mülakat deneyimi kazandınız.');
    if (weaknesses.length === 0) weaknesses.push('Genel olarak çok güçlü bir performans; ufak iyileştirmelerle mükemmele ulaşabilirsiniz.');

    const summaries = {
        high: `Mülakatı üst düzey bir performansla tamamladınız. Cevaplarınız yapılandırılmış, özgüvenli ve teknik açıdan oldukça tatmin ediciydi. Gerçek mülakatlarda güçlü ve rekabetçi bir adaysınız.`,
        mid: `Mülakatta genel olarak iyi bir izlenim bıraktınız. Sağlam bir temeliniz var ancak yetkinliklerinizi daha net yansıtmak için STAR metodunu kullanarak somut örneklere ağırlık vermelisiniz.`,
        low: `Mülakat becerilerinizi geliştirme sürecindesiniz. Cevaplarınızın etkisini artırmak için daha uzun yanıtlar vermeli, teknik terimleri daha sık kullanmalı ve gerçek deneyimlerinizden örnekler sunmalısınız.`,
    };

    const coachingTips = [
        'Her cevabı STAR yöntemiyle yapılandırın: Durum → Görev → Aksiyon → Sonuç.',
        'Mümkün olduğunca sayısal veriler ve ölçülebilir sonuçlar ekleyin (örn: %20 artış).',
        'Role özgü terimler ve sektör dili kullanmaya özen gösterin.',
        'Her cevabı 100-200 kelime arasında tutmayı hedefleyin: Çok yüzeysel geçmeyin.',
        'Tereddütlü ifadeler ("gibi", "sanırım") yerine net cümleler ("yaptım", "karar verdim") kullanın.',
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
        ozet: wc > 100 ? "CV'niz yeterli içerik barındırıyor ve temel bölümleri kapsıyor." : "CV'niz oldukça kısa görünüyor. İçeriği zenginleştirmeniz önerilir.",
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
            "CV'nizi hedef role özel anahtar kelimelerle optimize edin.",
            'ATS (Aday Takip Sistemi) uyumlu sade bir format tercih edin.',
        ],
    };
}
