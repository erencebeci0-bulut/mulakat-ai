import React from 'react';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: "Net Maaş Hesaplama 2026 | Mülakat.com",
    description: "Net maaş hesaplama hakkında en güncel veriler, profesyonel rehberler, ortalama fiyat aralıkları ve süreçler.",
    alternates: {
      canonical: "https://xn--mlakat-3ya.com/hesaplama/net-maas-hesaplama"
    }
  };
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl text-gray-800">
      <nav className="text-sm mb-6 text-gray-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link> &gt; <Link href="/hesaplama" className="hover:text-blue-600">Hesaplama-araclari</Link> &gt; <span className="text-gray-800">Net Maaş Hesaplama 2026</span>
      </nav>

      
      <h1 className="text-3xl font-bold mb-6">Net Maaş Hesaplama 2026</h1>
      
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

      
      <section className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
         <h3 className="text-xl font-bold mb-4 text-gray-800">İlgili Diğer Rehberler</h3>
         <ul className="list-disc pl-5 space-y-2">
           <li><Link href="/hesaplama/kidem-tazminati-hesaplama" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Kıdem tazminatı hesaplama</Link></li>
           <li><Link href="/hesaplama/fazla-mesai-hesaplama" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Fazla mesai hesaplama</Link></li>
           <li><Link href="/hesaplama/yillik-izin-hesaplama" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Yıllık izin hesaplama</Link></li>
         </ul>
      </section>
    </main>
  );
}
