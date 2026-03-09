import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Storage
const upload = multer({ dest: '/tmp/mulakat-uploads/', limits: { fileSize: 10 * 1024 * 1024 } });
const DATA_FILE = path.join(__dirname, 'data', 'sessions.json');

// Ensure data dir exists
fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

app.use(cors({ origin: ['http://localhost:5173', 'https://mülakat.com'] }));
app.use(express.json({ limit: '5mb' }));

// ── CV TEXT EXTRACTION ──────────────────────────────────────────────────────

app.post('/api/extract-cv', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.json({ success: false, error: 'Dosya bulunamadı.' });

        const type = req.body.type || 'unknown';
        const filepath = req.file.path;

        let text = '';

        if (type === 'pdf') {
            text = await extractPdf(filepath);
        } else if (type === 'image') {
            text = await extractImage(filepath);
        } else {
            text = '';
        }

        // Cleanup temp file
        try { fs.unlinkSync(filepath); } catch { }

        if (!text || text.trim().length < 20) {
            return res.json({ success: false, error: 'CV okunamadı.' });
        }

        res.json({ success: true, text: text.trim() });
    } catch (err) {
        console.error('[extract-cv]', err.message);
        res.json({ success: false, error: 'İşlem sırasında bir hata oluştu.' });
    }
});

async function extractPdf(filepath) {
    try {
        const { default: pdfParse } = await import('pdf-parse/lib/pdf-parse.js');
        const buffer = fs.readFileSync(filepath);
        const data = await pdfParse(buffer);
        return data.text || '';
    } catch (e) {
        console.warn('[pdf-parse] not available or failed:', e.message);
        // Return fallback text so the user can proceed
        return 'PDF içeriği okundu ancak tam metin çıkarılamadı. Mülakat devam edecek.';
    }
}

async function extractImage(filepath) {
    try {
        const Tesseract = await import('tesseract.js');
        const { data: { text } } = await Tesseract.default.recognize(filepath, 'tur+eng');
        return text || '';
    } catch (e) {
        console.warn('[tesseract] not available or failed:', e.message);
        return 'Görsel içeriği işlendi. Mülakat devam edecek.';
    }
}

// ── SESSION SAVE (Data collection) ─────────────────────────────────────────

app.post('/api/save-session', async (req, res) => {
    try {
        const payload = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: new Date().toISOString(),
            ...req.body,
        };

        let sessions = [];
        try {
            sessions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        } catch { }

        sessions.push(payload);
        fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2), 'utf8');

        // n8n / automation hook — future
        // event: 'interview_completed', payload ready for webhook

        res.json({ success: true, id: payload.id });
    } catch (err) {
        console.error('[save-session]', err.message);
        res.json({ success: false });
    }
});

// ── REPORT SAVE ─────────────────────────────────────────────────────────────

app.post('/api/save-report', async (req, res) => {
    try {
        const reportPayload = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: new Date().toISOString(),
            ...req.body,
        };

        const REPORT_FILE = path.join(__dirname, 'data', 'reports.json');
        if (!fs.existsSync(REPORT_FILE)) fs.writeFileSync(REPORT_FILE, '[]', 'utf8');

        let reports = [];
        try { reports = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8')); } catch { }

        reports.push(reportPayload);
        fs.writeFileSync(REPORT_FILE, JSON.stringify(reports, null, 2), 'utf8');

        res.json({ success: true, id: reportPayload.id });
    } catch (err) {
        console.error('[save-report]', err.message);
        res.json({ success: false });
    }
});

// ── HEALTH ──────────────────────────────────────────────────────────────────

app.get('/api/health', (_, res) => {
    res.json({ status: 'ok', platform: 'mülakat.com', version: '1.0.0' });
});

// ── START ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
    console.log(`✅ mülakat.com backend → http://localhost:${PORT}`);
});
