const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'docs', 'data', 'keyword_database_v1.json');
const appDir = path.join(__dirname, 'app');

if (!fs.existsSync(dbPath)) {
    console.error("Database not found!");
    process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.forEach(item => {
    const keyword = item.keyword;

    // ensure leading slash
    let slug = item.url_slug;
    if (!slug.startsWith('/')) {
        slug = '/' + slug;
    }

    const pageDir = path.join(appDir, slug);
    fs.mkdirSync(pageDir, { recursive: true });

    const pagePath = path.join(pageDir, 'page.tsx');

    // Capitalize title
    const title = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + " 2026";

    const pageContent = `import React from 'react';

export async function generateMetadata() {
  return {
    title: "${title}",
    description: "${keyword} hakkında güncel veriler, detaylı analizler ve rehber içerikler.",
    alternates: {
      canonical: "https://xn--mlakat-3ya.com${slug}"
    }
  };
}

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Genel Bakış</h2>
        <div className="bg-gray-100 p-6 rounded-lg text-center border-dashed border-2 border-gray-300">
          [DataSection Placeholder]
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Grafik ve İstatistikler</h2>
        <div className="bg-gray-100 p-6 rounded-lg text-center h-48 flex items-center justify-center border-dashed border-2 border-gray-300">
          [ChartPlaceholder]
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Detaylı Tablo</h2>
        <div className="bg-gray-100 p-6 rounded-lg text-center border-dashed border-2 border-gray-300">
          [TablePlaceholder]
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sıkça Sorulan Sorular (FAQ)</h2>
        <div className="bg-gray-100 p-6 rounded-lg text-center border-dashed border-2 border-gray-300">
          [FAQPlaceholder]
        </div>
      </section>
    </main>
  );
}
`;

    fs.writeFileSync(pagePath, pageContent, 'utf8');
});

console.log(`Successfully generated ${db.length} page skeletons in the /app directory.`);
