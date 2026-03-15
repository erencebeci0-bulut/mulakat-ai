import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PracticeCta({ role, company, style }) {
    const navigate = useNavigate();

    const handleClick = () => {
        const params = new URLSearchParams();
        if (role) params.append('role', role);
        if (company) params.append('company', company);

        navigate(`/interview-practice?${params.toString()}`);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(108,99,255,0.02))',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            ...style
        }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Pratik Yaparak Hazırlan
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                Yapay zeka asistanımızla gerçekçi {company ? `${company} ` : ''}{role && `${role} `}mülakat senaryolarını test et ve anında geri bildirim al.
            </p>
            <button
                className="btn btn-primary"
                onClick={handleClick}
                style={{ padding: '16px 32px', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
                Yapay Zeka ile Pratik Yap <Play size={18} />
            </button>
        </div>
    );
}
