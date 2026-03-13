import { useAnalytics } from '../hooks/useAnalytics';

/**
 * Invisible component placed inside BrowserRouter
 * Automatically tracks page views on location change.
 */
export default function AnalyticsTracker() {
    useAnalytics(); // Triggers page_view internally on mount/location change
    return null;
}
