import React from 'react';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: "Akbank 2026 | Mülakat.com",
    description: "Akbank hakkında en güncel veriler, profesyonel rehberler, ortalama fiyat aralıkları ve süreçler.",
    alternates: {
      canonical: "https://xn--mlakat-3ya.com/sirket/akbank"
    }
  };
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl text-gray-800">
      <nav className="text-sm mb-6 text-gray-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link> &gt; <Link href="/sirketler" className="hover:text-blue-600">Sirketler</Link> &gt; <span className="text-gray-800">Akbank 2026</span>
      </nav>

      
      <h1 className="text-3xl font-bold mb-6">Akbank Çalışma Kültürü ve Mülakat Süreci</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Şirkete Genel Bakış</h2>
        <p className="mb-4 text-gray-700">Akbank, faaliyet gösterdiği sektörde belirleyici kurumlardan biridir. Hızlı büyüyen ekipleri, yoğun operasyon süreçleri ve teknoloji odaklı yatırımlarıyla bilinir. Büyük bir çalışan ağına sahip olup yetenek çekme konusunda öncü şirketlerdendir.</p>
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

      
      <section className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
         <h3 className="text-xl font-bold mb-4 text-gray-800">İlgili Diğer Rehberler</h3>
         <ul className="list-disc pl-5 space-y-2">
           <li><Link href="/sirket/trendyol" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Trendyol</Link></li>
           <li><Link href="/sirket/amazon-turkiye" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Amazon türkiye</Link></li>
           <li><Link href="/sirket/garanti-bbva" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Garanti bbva</Link></li>
         </ul>
      </section>
    </main>
  );
}
