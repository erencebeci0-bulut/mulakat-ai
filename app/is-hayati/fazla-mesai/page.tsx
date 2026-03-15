import React from 'react';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: "Fazla Mesai 2026 | Mülakat.com",
    description: "Fazla mesai hakkında en güncel veriler, profesyonel rehberler, ortalama fiyat aralıkları ve süreçler.",
    alternates: {
      canonical: "https://xn--mlakat-3ya.com/is-hayati/fazla-mesai"
    }
  };
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl text-gray-800">
      <nav className="text-sm mb-6 text-gray-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link> &gt; <Link href="/is-hayati" className="hover:text-blue-600">Is-hayati</Link> &gt; <span className="text-gray-800">Fazla Mesai 2026</span>
      </nav>

      
      <h1 className="text-3xl font-bold mb-6">Fazla Mesai Hakkında Tüm Detaylar</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Genel Bakış ve Mevzuat</h2>
        <p className="mb-4 text-gray-700">Çalışma hayatı içerisinde sıklıkla karşılaşılan <strong>fazla mesai</strong>, 4857 sayılı İş Kanunu başta olmak üzere çeşitli sosyal güvenlik yönetmelikleri ile çerçevelenmiş kritik haklardan biridir.</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Önemli Kriterler ve İstisnalar</h2>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
          <li>Yasal başvuru veya bekleme sürelerinin ne zaman dolduğu</li>
          <li>Sözleşmenin feshine sebep olan haklı ve geçerli haller</li>
          <li>İlgili maddi hesaplamalara nelerin (yol, yemek vb.) dahil edilip edilmediği</li>
        </ul>
      </section>

      
      <section className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
         <h3 className="text-xl font-bold mb-4 text-gray-800">İlgili Diğer Rehberler</h3>
         <ul className="list-disc pl-5 space-y-2">
           <li><Link href="/is-hayati/asgari-ucret" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Asgari ücret</Link></li>
           <li><Link href="/is-hayati/kidem-tazminati" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Kıdem tazminatı</Link></li>
           <li><Link href="/is-hayati/ihbar-tazminati" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Ihbar tazminatı</Link></li>
         </ul>
      </section>
    </main>
  );
}
