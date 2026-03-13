import { useEffect } from 'react';

export default function SEOHead({ title, description, url = 'https://mülakat.com', type = 'website' }) {
    useEffect(() => {
        // Update Title
        if (title) {
            const finalTitle = title.includes('|') ? title : `${title} | mülakat.com`;
            document.title = finalTitle;
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', finalTitle);

            const twitterTitle = document.querySelector('meta[property="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute('content', finalTitle);
        }

        // Update Description
        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) metaDescription.setAttribute('content', description);

            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', description);

            const twitterDesc = document.querySelector('meta[property="twitter:description"]');
            if (twitterDesc) twitterDesc.setAttribute('content', description);
        }

        // Update Canonical URL
        if (url) {
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.setAttribute('href', url);

            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute('content', url);
        }

        // Add or Update OG elements dynamically
        let ogType = document.querySelector('meta[property="og:type"]');
        if (!ogType) {
            ogType = document.createElement('meta');
            ogType.setAttribute('property', 'og:type');
            document.head.appendChild(ogType);
        }
        ogType.setAttribute('content', type);

    }, [title, description, url, type]);

    return null; // This component handles side effects only
}
