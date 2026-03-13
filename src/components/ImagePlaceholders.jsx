import React from 'react';

// Shared SVG placeholder definitions for SEO and static pages
// Designed to be SEO friendly with proper titles and descriptions

export const InterviewIllustration = ({ className = '', style = {} }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        className={className}
        style={style}
        aria-labelledby="interview-img-title interview-img-desc"
        role="img"
    >
        <title id="interview-img-title">Yapay Zeka Destekli Mülakat Simülasyonu</title>
        <desc id="interview-img-desc">Adayların yapay zeka ile mülakat provası yaptığı sistemi gösteren illüstrasyon</desc>
        <rect width="400" height="300" fill="var(--bg-secondary)" rx="16" />
        <circle cx="200" cy="120" r="40" fill="var(--accent)" opacity="0.2" />
        <circle cx="200" cy="120" r="20" fill="var(--accent)" />
        <rect x="150" y="180" width="100" height="12" rx="6" fill="var(--text-muted)" opacity="0.5" />
        <rect x="130" y="210" width="140" height="12" rx="6" fill="var(--text-muted)" opacity="0.3" />
    </svg>
);

export const SalaryChartIllustration = ({ className = '', style = {} }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        className={className}
        style={style}
        aria-labelledby="salary-img-title salary-img-desc"
        role="img"
    >
        <title id="salary-img-title">Sektörel Maaş Dağılım Grafiği</title>
        <desc id="salary-img-desc">Farklı uzmanlık seviyelerine göre maaş artışını gösteren analitik veri grafiği</desc>
        <rect width="400" height="300" fill="var(--bg-secondary)" rx="16" />
        <path d="M 50 250 L 350 250 M 50 50 L 50 250" stroke="var(--border)" strokeWidth="2" fill="none" />
        <path d="M 50 250 Q 150 200 200 150 T 350 50" stroke="var(--success)" strokeWidth="4" fill="none" />
        <circle cx="200" cy="150" r="6" fill="var(--success)" />
        <circle cx="350" cy="50" r="6" fill="var(--success)" />
        <rect x="230" y="80" width="80" height="30" rx="4" fill="var(--bg-card)" stroke="var(--border)" />
        <text x="270" y="99" fill="var(--text-primary)" fontSize="12" textAnchor="middle" fontWeight="bold">Tahmin</text>
    </svg>
);

export const CareerGrowthIllustration = ({ className = '', style = {} }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        className={className}
        style={style}
        aria-labelledby="career-img-title career-img-desc"
        role="img"
    >
        <title id="career-img-title">Kariyer Gelişim Basamakları</title>
        <desc id="career-img-desc">Adayların profesyonel yolculuğunu ve yükselişini temsil eden grafik</desc>
        <rect width="400" height="300" fill="var(--bg-secondary)" rx="16" />
        <rect x="80" y="200" width="60" height="50" rx="4" fill="var(--accent)" opacity="0.4" />
        <rect x="170" y="140" width="60" height="110" rx="4" fill="var(--accent)" opacity="0.7" />
        <rect x="260" y="60" width="60" height="190" rx="4" fill="var(--accent)" />
        <path d="M 110 180 L 200 120 L 290 40" stroke="var(--warning)" strokeWidth="4" fill="none" strokeDasharray="5,5" />
    </svg>
);
