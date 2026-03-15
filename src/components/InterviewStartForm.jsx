import React, { useState } from 'react';

export default function InterviewStartForm({ onStart, initialRole = '', initialCompany = '' }) {
    const [role, setRole] = useState(initialRole);
    const [company, setCompany] = useState(initialCompany);

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({ role, company });
    };

    return (
        <form onSubmit={handleSubmit} className="card glass-card animate-in" style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '24px' }}>Mülakat Bağlamı</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                Mülakatı özelleştirmek için hedef rolünüzü ve (opsiyonel) şirketi belirleyin.
            </p>
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                    Hedef Rol / Meslek <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <input
                    type="text"
                    required
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="Örn: Yazılım Mühendisi, Veri Analisti"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
            </div>
            <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                    Hedef Şirket <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Opsiyonel)</span>
                </label>
                <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Örn: Google, Amazon, Trendyol"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!role.trim()} style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                Simülasyonu Başlat
            </button>
        </form>
    );
}
