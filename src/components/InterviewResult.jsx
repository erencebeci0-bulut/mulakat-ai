import React from 'react';
import { Target, MessageSquare, Zap, Cpu, CheckCircle } from 'lucide-react';

export default function InterviewResult({ report }) {
    if (!report) return null;

    const { overall_score, score_breakdown, strengths, weaknesses, ai_summary } = report;

    return (
        <div className="card glass-card animate-in" style={{ padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'inline-flex', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,212,170,0.2), rgba(0,212,170,0))', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <CheckCircle size={40} color="var(--success)" />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Genel Değerlendirme</h2>
                <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--accent)' }}>
                    {overall_score?.toFixed(1) || '-'} <span style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>/ 10</span>
                </div>
            </div>

            {score_breakdown && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            <Target size={16} /> Netlik
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{score_breakdown.clarity?.toFixed(1)}/10</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            <Zap size={16} /> Yapı
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{score_breakdown.structure?.toFixed(1)}/10</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            <Cpu size={16} /> Teknik
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{score_breakdown.technical?.toFixed(1)}/10</div>
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            <MessageSquare size={16} /> İletişim
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{score_breakdown.communication?.toFixed(1)}/10</div>
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Yapay Zeka Özeti
                </h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                    {ai_summary}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                    <h4 style={{ color: 'var(--success)', fontWeight: 600, marginBottom: '12px' }}>Güçlü Yönleriniz</h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                        {strengths?.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: '#ef4444', fontWeight: 600, marginBottom: '12px' }}>Gelişim Alanları</h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                        {weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>
            </div>

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <button className="btn btn-primary" style={{ padding: '16px 32px', width: '100%' }} onClick={() => window.location.reload()}>
                    Yeni Bir Mülakat Başlat
                </button>
            </div>
        </div>
    );
}
