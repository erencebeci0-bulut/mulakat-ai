import React from 'react';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: "Bim Kasiyer Maaşı 2026 | Mülakat.com",
    description: "Bim kasiyer maaşı hakkında en güncel veriler, profesyonel rehberler, ortalama fiyat aralıkları ve süreçler.",
    alternates: {
      canonical: "https://xn--mlakat-3ya.com/sirket/bim-kasiyer-maasi"
    }
  };
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl text-gray-800">
      <nav className="text-sm mb-6 text-gray-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link> &gt; <Link href="/maaslar" className="hover:text-blue-600">Maaslar</Link> &gt; <span className="text-gray-800">Bim Kasiyer Maaşı 2026</span>
      </nav>

      
      <h1 className="text-3xl font-bold mb-6">Bim Kasiyer Maaşı (2026 Güncel Veriler)</h1>
      
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
          <h3 className="text-lg font-bold text-gray-800">Bim maaşı ne kadar?</h3>
          <p className="text-gray-700 mt-2">Sektör standartlarında başlangıç seviyesinde 30.000 TL dolaylarındayken, senior uzmanlarda bu tutar yan haklar hariç 90.000 TL üzerine çıkabilmektedir.</p>
        </div>
      </section>

      
      <section className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
         <h3 className="text-xl font-bold mb-4 text-gray-800">İlgili Diğer Rehberler</h3>
         <ul className="list-disc pl-5 space-y-2">
           <li><Link href="/maas/yazilim-muhendisi" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Yazılım mühendisi maaşı</Link></li>
           <li><Link href="/maas/veri-analisti" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Veri analisti maaşı</Link></li>
           <li><Link href="/maas/urun-yoneticisi" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Ürün yöneticisi maaşı</Link></li>
         </ul>
      </section>
    </main>
  );
}
