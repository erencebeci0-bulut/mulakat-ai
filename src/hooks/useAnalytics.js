import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useAnalytics hook
 * Lightweight hook to track page views and specific custom events.
 * Ready for implementation with Google Analytics, Mixpanel, or custom backend.
 */
export function useAnalytics() {
    const location = useLocation();

    // Track Page Views automatically
    useEffect(() => {
        // Example: Log page view to console or send to n8n webhook
        trackEvent('page_view', { path: location.pathname });
    }, [location.pathname]);

    /**
     * Send tracking event payload
     * @param {string} eventName 
     * @param {Object} properties 
     */
    const trackEvent = (eventName, properties = {}) => {
        const payload = {
            event: eventName,
            timestamp: new Date().toISOString(),
            ...properties
        };

        // In production: send to backend / analytics provider
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[Analytics] ${eventName}`, payload);
        }

        // Mock saving to localStorage for Admin Dashboard
        try {
            const raw = localStorage.getItem('mulakat_analytics_events');
            const events = raw ? JSON.parse(raw) : [];
            events.push(payload);
            // keep last 100 for memory safety
            localStorage.setItem('mulakat_analytics_events', JSON.stringify(events.slice(-100)));
        } catch (e) { /* ignore */ }
    };

    return { trackEvent };
}
