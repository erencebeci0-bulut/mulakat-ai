import React, { useState } from 'react';

export default function AnswerInput({ onSubmit, isSubmitting }) {
    const [answer, setAnswer] = useState('');

    const handleSubmit = () => {
        if (answer.trim().length > 10) {
            onSubmit(answer);
            setAnswer('');
        }
    };

    return (
        <div className="card glass-card animate-in" style={{ padding: '24px' }}>
            <textarea
                className="textarea"
                placeholder="Cevabınızı detaylı bir şekilde buraya yazın..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                    minHeight: '160px',
                    marginBottom: '16px',
                    fontSize: '15px',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                }}
                disabled={isSubmitting}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={answer.trim().length <= 10 || isSubmitting}
                    style={{ padding: '12px 24px' }}
                >
                    {isSubmitting ? 'Analiz Ediliyor...' : 'Cevabı Gönder'}
                </button>
            </div>
        </div>
    );
}
