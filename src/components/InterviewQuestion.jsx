import React from 'react';

export default function InterviewQuestion({ question, currentIdx, total }) {
    if (!question) return null;
    return (
        <div className="card glass-card animate-in" style={{ padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '14px' }}>
                    Soru {currentIdx + 1} / {total}
                </span>
                <span className="badge badge-accent" style={{ fontSize: '12px' }}>
                    {question.difficulty_level ? `Zorluk: ${question.difficulty_level}/5` : 'Davranışsal'}
                </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {question.question_text}
            </h3>
        </div>
    );
}
