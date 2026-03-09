import React from 'react';
import { Trophy, Zap, Target, Crown, Sprout } from 'lucide-react';

export const RANKS = [
    { min: 0, max: 3, label: 'Mülakat Çaylağı', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.3)', icon: <Sprout size={20} /> },
    { min: 3, max: 5, label: 'Mülakat Adayı', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: <Zap size={20} /> },
    { min: 5, max: 7, label: 'Mülakat Ustası', color: '#6D5DFC', bg: 'rgba(109,93,252,0.1)', border: 'rgba(109,93,252,0.3)', icon: <Target size={20} /> },
    { min: 7, max: 8.5, label: 'Mülakat Lideri', color: '#00d4aa', bg: 'rgba(0,212,170,0.1)', border: 'rgba(0,212,170,0.3)', icon: <Trophy size={20} /> },
    { min: 8.5, max: 10, label: 'Mülakat Şampiyonu', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', icon: <Crown size={20} /> },
];

export function getRank(score) {
    return RANKS.find(r => score >= r.min && score < r.max) || RANKS[RANKS.length - 1];
}

export default function RankBadge({ score, size = 'md' }) {
    const rank = getRank(score);
    const padding = size === 'lg' ? '16px 24px' : '10px 16px';
    const fontSize = size === 'lg' ? '18px' : '14px';
    const iconSize = size === 'lg' ? 28 : 20;

    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding, borderRadius: '12px', fontWeight: 700, fontSize,
            background: rank.bg, color: rank.color, border: `2px solid ${rank.border}`,
        }}>
            {Object.cloneElement(rank.icon, { size: iconSize })}
            {rank.label}
        </div>
    );
}
