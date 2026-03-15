const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'docs', 'data', 'keyword_database_v1.json');
const appDir = path.join(__dirname, 'app');

if (!fs.existsSync(dbPath)) {
    console.error("Database not found!");
    process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const getHubs = () => {
    return {
        "maaslar": "/maaslar",
        "meslekler": "/meslekler",
        "mulakat-sorulari": "/mulakat",
        "sirketler": "/sirketler",
        "is-hayati": "/is-hayati",
        "hesaplama-araclari": "/hesaplama"
    };
};

const getRelatedLinks = (item, allItems) => {
    const links = [];
    const add = (i) => {
        if (i && !links.find(l => l.url_slug === i.url_slug) && i.url_slug !== item.url_slug && links.length < 3) {
            links.push(i);
        }
    }

    const firstWord = item.keyword.split(' ')[0].toLowerCase();

    // Cross intent logic
    if (item.category === 'maaslar' || item.category === 'meslekler' || item.category === 'mulakat-sorulari') {
        const relatedCat = allItems.filter(i =>
            (i.category === 'maaslar' || i.category === 'meslekler' || i.category === 'mulakat-sorulari') &&
            i.keyword.includes(firstWord)
        );
        relatedCat.forEach(add);
    }

    if (item.category === 'sirketler') {
        const relatedCat = allItems.filter(i => i.category === 'maaslar' && i.url_slug.includes(item.keyword.toLowerCase().split(' ')[0]));
        relatedCat.forEach(add);
    }

    // fallback fill with same category
    allItems.filter(i => i.category === item.category && i.url_slug !== item.url_slug).forEach(add);

    return links.slice(0, 3);
};

let populatedCount = 0;

db.forEach(item => {
    let slug = item.url_slug;
    if (!slug.startsWith('/')) slug = '/' + slug;

    const pageDir = path.join(appDir, slug);
    if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
    }

    const pagePath = path.join(pageDir, 'page.tsx');

    const title = item.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + " 2026";
    const parentHub = getHubs()[item.category] || '/';
    const parentHubText = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    const relatedLinks = getRelatedLinks(item, db);

    let templateBody = '';

    if (item.page_type === 'salary_page' || item.page_type === 'company_salary_page') {
        templateBody = `
      <h1 className="text-3xl font-bold mb-6">${item.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} (2026 Güncel Veriler)</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Maaş Tablosu</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mb-4 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left"><th className="py-3 px-4 border-b font-semibold">Deneyim</th><th className="py-3 px-4 border-b font-semibold">Ortalama Maaş</th><th className="py-3 px-4 border-b font-semibold">Maaş Aralığı</th></tr>
            </thead>
            <tbody>
              <tr><td className="py-3 px-4 border-b">0-1 yıl</td><td className="py-3 px-4 border-b">35.000 TL</td><td className="py-3 px-4 border-b">30.000 - 40.000 TL</td></tr>
              <tr><td className="py-3 px-4 border-b">1-3 yıl</td><td className="py-3 px-4 border-b">50.000 TL</td><td className="py-3 px-4 border-b">45.000 - 60.000 TL</td></tr>
              <tr><td className="py-3 px-4 border-b">3-5 yıl</td><td className="py-3 px-4 border-b">70.000 TL</td><td className="py-3 px-4 border-b">60.000 - 85.000 TL</td></tr>
              <tr><td className="py-3 px-4 border-b">5+ yıl</td><td className="py-3 px-4 border-b">95.000 TL</td><td className="py-3 px-4 border-b">80.000 - 120.000 TL</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-2">* Yukarıdaki veriler Türkiye pazarına yönelik gerçekçi tahminlerdir. Deneyim, şirket büyüklüğü ve teknoloji yetkinliği baremleri değiştirebilir.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Yan Haklar ve Ek Avantajlar</h2>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
          <li>Ortalama üzeri yemek kartı ve yol ödenekleri</li>
          <li>Kapsamlı özel sağlık sigortası (çoğunlukla aile dahil)</li>
          <li>Hibrit veya tam uzaktan çalışma (Remote) imkanı</li>
          <li>Ekipman desteği ve yıllık eğitim bütçesi</li>
          <li>Yıllık veya çeyreklik performans bonusları</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Sıkça Sorulan Sorular</h2>
        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800">${item.keyword.split(' ')[0].charAt(0).toUpperCase() + item.keyword.split(' ')[0].slice(1)} maaşı ne kadar?</h3>
          <p className="text-gray-700 mt-2">Sektör standartlarında başlangıç seviyesinde 30.000 TL dolaylarındayken, senior uzmanlarda bu tutar yan haklar hariç 90.000 TL üzerine çıkabilmektedir.</p>
        </div>
      </section>
`;
    } else if (item.page_type === 'interview_category_page') {
        templateBody = `
      <h1 className="text-3xl font-bold mb-6">${item.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Teknik Mülakat Soruları</h2>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
          <li><strong>Temel Prensipler:</strong> Kullandığınız çatı teknolojilerin mimarisi nasıl işliyor?</li>
          <li><strong>Zorluklarla Başa Çıkma:</strong> Son projelerinizde karşılaştığınız en büyük teknik tıkanıklığı nasıl çözdünüz?</li>
          <li><strong>Mimari Dizayn:</strong> Yüksek trafikli bir senaryoda performans ve güvenlik optimizasyonunu nasıl sağlarsınız?</li>
        </ul>
        <p className="text-sm text-gray-600 mt-2"><strong>Cevap İpucu:</strong> Teknik detayları anlatırken daima gerçek dünya problemlerine ve kendi yazdığınız sistemlere referans verin.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Davranışsal ve Case Soruları</h2>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
          <li>Takım içinde anlaşmazlık yaşadığınız bir durumu ve bunu profesyonelce nasıl aştığınızı anlatın.</li>
          <li>Sıkışık bir deadline ve çok fazla iş yükü olduğunda önceliklendirmenizi nasıl yaparsınız?</li>
        </ul>
      </section>
      
      <section className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Gerçek Bir Mülakata Hazır Mısınız?</h2>
        <p className="mb-4 text-blue-900">Mülakat.com AI Mülakat Simülatörü ile bu soruları sesli veya yazılı cevaplayarak gerçek zamanlı geri bildirim alabilirsiniz. Nerede eksik kaldığınızı anında görün.</p>
        <a href="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition">Simülatörü Ücretsiz Başlat</a>
      </section>
`;
    } else if (item.page_type === 'company_page') {
        templateBody = `
      <h1 className="text-3xl font-bold mb-6">${item.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Çalışma Kültürü ve Mülakat Süreci</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Şirkete Genel Bakış</h2>
        <p className="mb-4 text-gray-700">${item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1)}, faaliyet gösterdiği sektörde belirleyici kurumlardan biridir. Hızlı büyüyen ekipleri, yoğun operasyon süreçleri ve teknoloji odaklı yatırımlarıyla bilinir. Büyük bir çalışan ağına sahip olup yetenek çekme konusunda öncü şirketlerdendir.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">İşe Alım ve Mülakat Süreci</h2>
        <ol className="list-decimal pl-5 mb-4 space-y-2 text-gray-700">
          <li><strong>İK Mülakatı:</strong> Kurum kültürüne uyum, temel motivasyonlar ve beklenti analizi yapılır.</li>
          <li><strong>Teknik / Vaka Görüşmesi (Case Study):</strong> Role bağlı olarak gönderilen ödev veya teknik testin sunumu yapılır.</li>
          <li><strong>Panel veya Yönetici Görüşmesi:</strong> İlgili direktör veya C-level yöneticiler ile kültürel uyum görüşmesi sağlanır.</li>
          <li><strong>Referans ve Teklif:</strong> Sürecin olumlu sonuçlanması durumunda teklif aşamasına geçilir.</li>
        </ol>
      </section>
`;
    } else if (item.page_type === 'profession_page') {
        templateBody = `
      <h1 className="text-3xl font-bold mb-6">${item.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Nedir ve Nasıl Olunur?</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Meslek Tanımı ve Sorumluluklar</h2>
        <p className="mb-4 text-gray-700">${item.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}, işletmelerin veya ürünlerin hedeflerine ulaşmasında oldukça stratejik görevler alır. İş akışlarını yönetmek, problemleri belirleyip çözüm üretmek ve çıktılardan sorumlu olmak temel görevlerindendir.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Aranan Nitelikler ve Beceriler</h2>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
          <li>Yüksek problem çözme ve analitik düşünme kapasitesi</li>
          <li>Kuvvetli iletişim becerileri ve paydaş yönetimi</li>
          <li>Alanda zorunlu olan spesifik teknik yazılımlara hakimiyet</li>
          <li>Kriz anlarında stres toleransı ve zaman yönetimi becerisi</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Mülakat ve Beklentiler</h2>
        <p className="mb-4 text-gray-700">Bu rolde gerçekleşen değerlendirmelerde geçmiş tecrübelerin yanı sıra potansiyel kriz senaryolarına verilecek tepkiler (case ve davranışsal metodoloji) ölçümlenir.</p>
      </section>
`;
    } else if (item.page_type === 'calculator_page') {
        templateBody = `
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      
      <section className="mb-10 p-10 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
           <span className="text-4xl">🧮</span>
           <p className="text-gray-500 font-bold text-lg">[ Hesaplama Modülü Bileşeni Alanı ]</p>
           <p className="text-gray-400 text-sm">İnteraktif sonuç aracı buraya yüklenecektir.</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Formül ve Hesaplama Mantığı</h2>
        <p className="mb-4 text-gray-700">Mevcut kanuni oranlar, sigorta kesintileri veya yasal hak edişlerin brüt değer üzerinden formülize edilmesiyle bulunur. İlgili yasal tebliğler gereği bu oranlar yıllık olarak değişiklik gösterebilmektedir.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Sıkça Sorulan Sorular</h2>
        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800">Sonuçlar resmi belge yerine geçer mi?</h3>
          <p className="text-gray-700 mt-2">Hayır, hesaplama değerleri referans niteliğinde olup kesin muhasebe evrakı teşkil etmez. Genel bilgilendirme amacıyla güncel mevzuat kullanılarak tahmini sonuç üretir.</p>
        </div>
      </section>
`;
    } else if (item.page_type === 'worklife_page') {
        templateBody = `
      <h1 className="text-3xl font-bold mb-6">${item.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Hakkında Tüm Detaylar</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Genel Bakış ve Mevzuat</h2>
        <p className="mb-4 text-gray-700">Çalışma hayatı içerisinde sıklıkla karşılaşılan <strong>${item.keyword}</strong>, 4857 sayılı İş Kanunu başta olmak üzere çeşitli sosyal güvenlik yönetmelikleri ile çerçevelenmiş kritik haklardan biridir.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Önemli Kriterler ve İstisnalar</h2>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
          <li>Yasal başvuru veya bekleme sürelerinin ne zaman dolduğu</li>
          <li>Sözleşmenin feshine sebep olan haklı ve geçerli haller</li>
          <li>İlgili maddi hesaplamalara nelerin (yol, yemek vb.) dahil edilip edilmediği</li>
        </ul>
      </section>
`;
    } else {
        templateBody = `<h1 className="text-3xl font-bold mb-6">${title}</h1><p>İçerik hazırlanıyor...</p>`;
    }

    const finalJsx = `import React from 'react';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: "${title} | Mülakat.com",
    description: "${item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1)} hakkında en güncel veriler, profesyonel rehberler, ortalama fiyat aralıkları ve süreçler.",
    alternates: {
      canonical: "https://xn--mlakat-3ya.com${slug}"
    }
  };
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl text-gray-800">
      <nav className="text-sm mb-6 text-gray-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link> &gt; <Link href="${parentHub}" className="hover:text-blue-600">${parentHubText}</Link> &gt; <span className="text-gray-800">${title}</span>
      </nav>

      ${templateBody}
      
      <section className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
         <h3 className="text-xl font-bold mb-4 text-gray-800">İlgili Diğer Rehberler</h3>
         <ul className="list-disc pl-5 space-y-2">
           ${relatedLinks.map(l => `<li><Link href="${l.url_slug}" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">${l.keyword.charAt(0).toUpperCase() + l.keyword.slice(1)}</Link></li>`).join('\n           ')}
         </ul>
      </section>
    </main>
  );
}
`;

    fs.writeFileSync(pagePath, finalJsx, 'utf8');
    populatedCount++;
});

console.log(`Successfully populated ${populatedCount} page files inside /app with SEO structures, internal links, and content blocks.`);
