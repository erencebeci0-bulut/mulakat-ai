const fs = require('fs');
const path = require('path');

const keywords = [];

const trToEng = (str) => {
    return str.toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/ /g, '-');
};

// 1. maaslar (20 items)
const maaslar = [
    { k: "yazılım mühendisi maaşı", p: "salary_page", s: "/maas/yazilim-muhendisi", i: "transactional/data" },
    { k: "veri analisti maaşı", p: "salary_page", s: "/maas/veri-analisti", i: "transactional/data" },
    { k: "ürün yöneticisi maaşı", p: "salary_page", s: "/maas/urun-yoneticisi", i: "transactional/data" },
    { k: "insan kaynakları uzmanı maaşı", p: "salary_page", s: "/maas/insan-kaynaklari-uzmani", i: "transactional/data" },
    { k: "doktor maaşları", p: "salary_page", s: "/maas/doktor", i: "transactional/data" },
    { k: "hemşire maaşları", p: "salary_page", s: "/maas/hemsire", i: "transactional/data" },
    { k: "avukat maaşları", p: "salary_page", s: "/maas/avukat", i: "transactional/data" },
    { k: "polis maaşı", p: "salary_page", s: "/maas/polis", i: "transactional/data" },
    { k: "öğretmen maaşları", p: "salary_page", s: "/maas/ogretmen", i: "transactional/data" },
    { k: "pilot maaşları", p: "salary_page", s: "/maas/pilot", i: "transactional/data" },
    { k: "astsubay maaşları", p: "salary_page", s: "/maas/astsubay", i: "transactional/data" },
    { k: "bekçi maaşları", p: "salary_page", s: "/maas/bekci", i: "transactional/data" },
    { k: "trendyol yazılımcı maaşı", p: "company_salary_page", s: "/sirket/trendyol-yazilimci-maasi", i: "transactional/data" },
    { k: "getir kurye maaşı", p: "company_salary_page", s: "/sirket/getir-kurye-maasi", i: "transactional/data" },
    { k: "thy kabin memuru maaşı", p: "company_salary_page", s: "/sirket/thy-kabin-memuru-maasi", i: "transactional/data" },
    { k: "bim kasiyer maaşı", p: "company_salary_page", s: "/sirket/bim-kasiyer-maasi", i: "transactional/data" },
    { k: "garanti bankası gişe memuru maaşı", p: "company_salary_page", s: "/sirket/garanti-bankasi-gise-memuru-maasi", i: "transactional/data" },
    { k: "aselsan mühendis maaşları", p: "company_salary_page", s: "/sirket/aselsan-muhendis-maasi", i: "transactional/data" },
    { k: "amazon data analyst maaşı", p: "company_salary_page", s: "/sirket/amazon-data-analyst-maasi", i: "transactional/data" },
    { k: "lc waikiki mağaza müdürü maaşı", p: "company_salary_page", s: "/sirket/lc-waikiki-magaza-muduru-maasi", i: "transactional/data" }
];

maaslar.forEach(item => {
    keywords.push({
        keyword: item.k,
        category: "maaslar",
        url_slug: item.s,
        search_intent: item.i,
        page_type: item.p,
        required_data_nodes: ["ortalama_maas", "maas_araligi", "deneyim_yili_tablosu", "yan_haklar"]
    });
});

// 2. meslekler (20 items)
const meslekler = [
    "yazılım mühendisi", "veri analisti", "insan kaynakları uzmanı", "ürün yöneticisi", "dijital pazarlama uzmanı",
    "siber güvenlik uzmanı", "iş analisti", "proje yöneticisi", "grafik tasarımcı", "ui ux tasarımcı",
    "seo uzmanı", "sosyal medya uzmanı", "satış temsilcisi", "makine mühendisi", "elektrik elektronik mühendisi",
    "endüstri mühendisi", "inşaat mühendisi", "muhasebe uzmanı", "finansal analist", "avukat"
];

meslekler.forEach(m => {
    keywords.push({
        keyword: m,
        category: "meslekler",
        url_slug: "/meslek/" + trToEng(m),
        search_intent: "informational/data",
        page_type: "profession_page",
        required_data_nodes: ["gorev_tanimi", "gerekli_yetenekler", "kariyer_yolu", "maas_ozeti"]
    });
});

// 3. mulakat-sorulari (20 items)
const mulakat = [
    "frontend developer mülakat soruları", "backend developer mülakat soruları", "satış temsilcisi mülakat soruları",
    "insan kaynakları uzmanı mülakat soruları", "yeni mezun mülakat soruları", "çağrı merkezi mülakat soruları",
    "banka gişe yetkilisi mülakat soruları", "kabin memuru mülakat soruları", "proje yöneticisi mülakat soruları",
    "veri bilimci mülakat soruları", "ürün yöneticisi mülakat soruları", "iş analisti mülakat soruları",
    "yazılım mühendisi mülakat soruları", "dijital pazarlama uzmanı mülakat soruları", "müşteri temsilcisi mülakat soruları",
    "muhasebe uzmanı mülakat soruları", "finansal analist mülakat soruları", "qa tester mülakat soruları",
    "devops mühendisi mülakat soruları", "stajyer mülakat soruları"
];

mulakat.forEach(m => {
    keywords.push({
        keyword: m,
        category: "mulakat-sorulari",
        url_slug: "/mulakat/" + trToEng(m),
        search_intent: "informational/practice",
        page_type: "interview_category_page",
        required_data_nodes: ["teknik_sorular", "davranissal_sorular", "cevap_ipuclari", "ai_simulator_module"]
    });
});

// 4. sirketler (20 items)
const sirketler = [
    "trendyol", "amazon türkiye", "garanti bbva", "aselsan", "thy", "getir", "koç holding", "sabancı holding",
    "iş bankası", "akbank", "yapı kredi", "turkcell", "türk telekom", "vodafone türkiye", "ford otosan",
    "arçelik", "şişecam", "lc waikiki", "bim", "migros"
];

sirketler.forEach(m => {
    keywords.push({
        keyword: m,
        category: "sirketler",
        url_slug: "/sirket/" + trToEng(m),
        search_intent: "hub/navigation",
        page_type: "company_page",
        required_data_nodes: ["sektor", "calisan_sayisi", "ise_alim_sureci", "yorum_ozetleri"]
    });
});

// 5. is-hayati (20 items)
const is_hayati = [
    "asgari ücret", "kıdem tazminatı", "ihbar tazminatı", "işsizlik maaşı", "yıllık izin süresi", "mazeret izni",
    "doğum izni", "babalık izni", "ölüm izni", "deneme süresi", "haftalık çalışma saati", "fazla mesai",
    "hafta tatili", "resmi tatil çalışması", "agi durumu", "mobbing", "ücretsiz izin", "iş kazası",
    "rapor parası", "istifa tazminatı"
];

is_hayati.forEach(m => {
    keywords.push({
        keyword: m,
        category: "is-hayati",
        url_slug: "/is-hayati/" + trToEng(m),
        search_intent: "informational/data",
        page_type: "worklife_page",
        required_data_nodes: ["kanun_maddesi", "guncel_degerler", "ornek_hesaplama", "sikca_sorulan_sorular"]
    });
});

// 6. hesaplama-araclari (20 items)
const hesaplama_araclari = [
    "net maaş hesaplama", "kıdem tazminatı hesaplama", "fazla mesai hesaplama", "yıllık izin hesaplama",
    "ihbar tazminatı hesaplama", "işsizlik maaşı hesaplama", "agi hesaplama", "asgari ücret hesaplama",
    "emekli maaşı hesaplama", "vergi dilimi hesaplama", "gelir vergisi hesaplama", "bes kesintisi hesaplama",
    "sgk primi hesaplama", "damga vergisi hesaplama", "işverene maliyet hesaplama", "netten brüte maaş hesaplama",
    "brütten nete maaş hesaplama", "günlük yevmiye hesaplama", "part time maaş hesaplama", "işgöremezlik ödeneği hesaplama"
];

hesaplama_araclari.forEach(m => {
    keywords.push({
        keyword: m,
        category: "hesaplama-araclari",
        url_slug: "/hesaplama/" + trToEng(m),
        search_intent: "tool",
        page_type: "calculator_page",
        required_data_nodes: ["hesaplama_formulu", "form_input_fields", "yasal_oranlar"]
    });
});

const outDir = path.join(__dirname, 'docs', 'data');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, 'keyword_database_v1.json');
fs.writeFileSync(outFile, JSON.stringify(keywords, null, 2));

console.log(`Generated ${keywords.length} keywords.`);
