import React from 'react';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: "Seo Uzmanı 2026 | Mülakat.com",
    description: "Seo uzmanı hakkında en güncel veriler, profesyonel rehberler, ortalama fiyat aralıkları ve süreçler.",
    alternates: {
      canonical: "https://xn--mlakat-3ya.com/meslek/seo-uzmani"
    }
  };
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl text-gray-800">
      <nav className="text-sm mb-6 text-gray-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link> &gt; <Link href="/meslekler" className="hover:text-blue-600">Meslekler</Link> &gt; <span className="text-gray-800">Seo Uzmanı 2026</span>
      </nav>

      
      <h1 className="text-3xl font-bold mb-6">Seo Uzmanı Nedir ve Nasıl Olunur?</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Meslek Tanımı ve Sorumluluklar</h2>
        <p className="mb-4 text-gray-700">Seo Uzmanı, işletmelerin veya ürünlerin hedeflerine ulaşmasında oldukça stratejik görevler alır. İş akışlarını yönetmek, problemleri belirleyip çözüm üretmek ve çıktılardan sorumlu olmak temel görevlerindendir.</p>
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

      
      <section className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
         <h3 className="text-xl font-bold mb-4 text-gray-800">İlgili Diğer Rehberler</h3>
         <ul className="list-disc pl-5 space-y-2">
           <li><Link href="/meslek/yazilim-muhendisi" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Yazılım mühendisi</Link></li>
           <li><Link href="/meslek/veri-analisti" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Veri analisti</Link></li>
           <li><Link href="/meslek/insan-kaynaklari-uzmani" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Insan kaynakları uzmanı</Link></li>
         </ul>
      </section>
    </main>
  );
}
