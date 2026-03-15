// server/middleware/auth.js

/**
 * Owner-only Admin Middleware for Backend Routes
 * Protects sensitive /api/admin endpoints by requiring a Bearer token
 * that matches the server's VITE_ADMIN_PASSWORD environment secret.
 * Also checks the user email against OWNER_EMAIL.
 */

function requireAdmin(req, res, next) {
    const expectedSecret = process.env.VITE_ADMIN_PASSWORD;
    const ownerEmail = process.env.OWNER_EMAIL;

    if (!expectedSecret || !ownerEmail) {
        console.error("CRITICAL: Admin route accessed but VITE_ADMIN_PASSWORD or OWNER_EMAIL missing.");
        return res.status(500).json({ error: "Server misconfiguration. Admin disabled." });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized. Missing token." });
    }

    const token = authHeader.split(' ')[1];

    if (token !== expectedSecret) {
        return res.status(403).json({ error: "Forbidden. Invalid admin credentials." });
    }

    const requestedEmail = req.headers['x-admin-email'];
    if (requestedEmail && requestedEmail.toLowerCase() !== ownerEmail.toLowerCase()) {
        return res.status(403).json({ error: "Forbidden. Account not allowlisted." });
    }

    next();
}

module.exports = { requireAdmin };
