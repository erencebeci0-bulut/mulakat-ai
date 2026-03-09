import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../data/questions';
import { Code, Box, Megaphone, Handshake, BarChart, Target } from 'lucide-react';

const ICON_MAP = {
    Code: <Code size={40} />,
    Box: <Box size={40} />,
    Megaphone: <Megaphone size={40} />,
    Handshake: <Handshake size={40} />,
    BarChart: <BarChart size={40} />,
    Target: <Target size={40} />,
};

export default function RoleSelectionPage({ sessionData, updateSession }) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const handleContinue = () => {
        if (!selected) return;
        updateSession({ role: selected });
        navigate('/mulakat');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '20px 40px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '18px' }}>
                    mülakat<span style={{ color: 'var(--accent)' }}>.com</span>
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['CV', 'Rol', 'Mülakat', 'Sonuç'].map((s, i) => (
                        <div key={s} style={{
                            padding: '4px 14px', borderRadius: '999px', fontSize: '13px',
                            background: i === 1 ? 'var(--accent-glow)' : 'transparent',
                            color: i === 1 ? 'var(--accent)' : i < 1 ? 'var(--success)' : 'var(--text-muted)',
                            border: i === 1 ? '1px solid rgba(108,99,255,0.3)' : 'none',
                        }}>{s}</div>
                    ))}
                </div>
            </div>

            <div className="progress-bar" style={{ borderRadius: 0 }}>
                <div className="progress-fill" style={{ width: '50%' }} />
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
                <div style={{ width: '100%', maxWidth: '720px' }}>
                    <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                        <div className="badge badge-accent" style={{ marginBottom: '16px' }}>Adım 2 / 4</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>
                            Hangi pozisyon için mülakata hazırlanıyorsunuz?
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                            Seçtiğiniz role göre özelleştirilmiş 6 soru ve kişisel rapor hazırlanır.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px',
                        marginBottom: '40px',
                    }}>
                        {ROLES.map(role => (
                            <button
                                key={role.id}
                                onClick={() => setSelected(role.id)}
                                style={{
                                    background: selected === role.id ? 'rgba(108,99,255,0.12)' : 'var(--bg-card)',
                                    border: selected === role.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                                    borderRadius: '14px', padding: '24px 20px', textAlign: 'center',
                                    cursor: 'pointer', transition: 'all 0.2s ease',
                                    boxShadow: selected === role.id ? '0 0 24px var(--accent-glow)' : 'none',
                                }}
                                onMouseEnter={e => { if (selected !== role.id) e.currentTarget.style.borderColor = 'var(--border-light)'; }}
                                onMouseLeave={e => { if (selected !== role.id) e.currentTarget.style.borderColor = 'var(--border)'; }}
                            >
                                <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center', color: selected === role.id ? 'var(--accent)' : 'var(--text-muted)' }}>
                                    {ICON_MAP[role.icon]}
                                </div>
                                <div style={{
                                    fontWeight: 600, fontSize: '15px', marginBottom: '6px',
                                    color: selected === role.id ? 'var(--accent)' : 'var(--text-primary)',
                                }}>{role.label}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{role.description}</div>
                                {selected === role.id && (
                                    <div style={{
                                        marginTop: '12px', fontSize: '12px', color: 'var(--accent)',
                                        fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                                    }}>✓ Seçildi</div>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', fontSize: '16px', padding: '16px', opacity: selected ? 1 : 0.4, cursor: selected ? 'pointer' : 'default' }}
                        onClick={handleContinue}
                    >
                        Mülakata Başla →
                    </button>
                </div>
            </div>
        </div>
    );
}
