import React from 'react';
import { Target, MessageSquare, Zap, Cpu } from 'lucide-react';

export default function ScoreCard({ results }) {
    if (!results || results.length === 0) return null;

    // Calculate averages
    const averages = results.reduce((acc, curr) => {
        acc.clarity += curr.score.clarity || 0;
        acc.structure += curr.score.structure || 0;
        acc.technical += curr.score.technical || 0;
        acc.communication += curr.score.communication || 0;
        return acc;
    }, { clarity: 0, structure: 0, technical: 0, communication: 0 });

    const count = results.length;
    const finalScore = (
        (averages.clarity / count) +
        (averages.structure / count) +
        (averages.technical / count) +
        (averages.communication / count)
    ) / 4;

    return (
        <div className="card glass-card animate-in" style={{ padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Mülakat Skorunuz</h2>
                <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--accent)' }}>
                    {finalScore.toFixed(1)} <span style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>/ 10</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <Target size={16} /> Netlik & Odak
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{(averages.clarity / count).toFixed(1)}/10</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <Zap size={16} /> Yapı & Mantık
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{(averages.structure / count).toFixed(1)}/10</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <Cpu size={16} /> Teknik Yeterlilik
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{(averages.technical / count).toFixed(1)}/10</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <MessageSquare size={16} /> İletişim Becerisi
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{(averages.communication / count).toFixed(1)}/10</div>
                </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Öne Çıkan Geri Bildirimler</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {results.map((res, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--accent-glow)', borderRadius: '8px', border: '1px solid rgba(108,99,255,0.2)' }}>
                        <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--accent)', fontSize: '13px' }}>Soru {i + 1}: {res.question?.question_text}</strong>
                        <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text-primary)' }}>{res.score?.feedback}</p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <button className="btn btn-primary" style={{ padding: '16px 32px', width: '100%' }}>Tüm Detaylı Raporu Kilidini Aç</button>
            </div>
        </div>
    );
}
