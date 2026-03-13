// Security and Validation Utilities for Mülakat.com

const PROFANITY_LIST = [
    'küfür1', 'küfür2', 'aptal', 'salak', 'gerizekalı', 'amk', 'aq',
    'serefsiz', 'şerefsiz', 'pic', 'piç', 'orospu', 'oç'
];

const SPAM_PATTERNS = [
    /http(s)?:\/\/(?!mülakat\.com|xn--mlakat-3ya\.com)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/gi, // External links
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, // Emails
    /(\+90|0)?\s?[5]\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g, // Turkish Phone numbers
    /\b[1-9]{1}[0-9]{9}[02468]{1}\b/g // TC Kimlik Regex
];

/**
 * Validates text for profanity and spam.
 * @param {string} text - The input text from user (e.g. feedback, experience)
 * @returns {Object} { isValid: boolean, reason: string|null }
 */
export function validateContentSafety(text) {
    if (!text) return { isValid: true, reason: null };

    const lowerText = text.toLowerCase();

    // 1. Check Profanity
    for (const word of PROFANITY_LIST) {
        // Simple word boundary check
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(lowerText)) {
            return { isValid: false, reason: 'profanity_detected' };
        }
    }

    // 2. Check Spam / PII Patterns (Links, Emails, Numbers)
    for (const pattern of SPAM_PATTERNS) {
        if (pattern.test(text)) {
            return { isValid: false, reason: 'spam_or_pii_detected' };
        }
    }

    // 3. Length Abuse Check (too short / nonsense)
    if (text.length > 0 && text.length < 5) {
        return { isValid: false, reason: 'content_too_short' };
    }

    return { isValid: true, reason: null };
}

/**
 * Rate Limiter Stub (Client-side simulation)
 * In production, this logic belongs to the backend or Edge middleware.
 */
export function checkRateLimit(actionName, limitMs = 60000) {
    const key = `ratelimit_${actionName}`;
    const lastAction = localStorage.getItem(key);
    const now = Date.now();

    if (lastAction && (now - parseInt(lastAction)) < limitMs) {
        return false; // Rate limited
    }

    localStorage.setItem(key, now.toString());
    return true; // Allowed
}
