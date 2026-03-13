import { X, Lock, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLogin, title = "Bu İşlem İçin Giriş Yapın", subtitle = "Verilerinizi güvenle saklamak ve premium özelliklerden yararlanmak için ücretsiz üye olun." }) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleMockLogin = (provider) => {
        setIsLoading(true);
        // Simulate network delay for realism
        setTimeout(() => {
            setIsLoading(false);
            onLogin(provider); // Pass provider if needed
            onClose();
        }, 1200);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '24px'
        }}>
            <div className="card animate-in" style={{
                background: 'var(--bg-card)',
                width: '100%', maxWidth: '440px',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Header pattern */}
                <div style={{
                    height: '6px', width: '100%',
                    background: 'linear-gradient(90deg, var(--accent), var(--success))'
                }} />

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '24px', right: '24px',
                        background: 'transparent', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', padding: '4px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    <X size={20} />
                </button>

                <div style={{ padding: '40px 32px 32px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(108, 99, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                        <Lock size={28} color="var(--accent)" />
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                        {title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
                        {subtitle}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            className="btn"
                            style={{
                                width: '100%', padding: '14px', background: '#fff', color: '#333',
                                border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', gap: '12px', fontSize: '15px', fontWeight: 600
                            }}
                            onClick={() => handleMockLogin('google')}
                            disabled={isLoading}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            {isLoading ? 'Bağlanıyor...' : 'Google ile Devam Et'}
                        </button>

                        <button
                            className="btn"
                            style={{
                                width: '100%', padding: '14px', background: '#000', color: '#fff',
                                border: 'none', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', gap: '12px', fontSize: '15px', fontWeight: 600
                            }}
                            onClick={() => handleMockLogin('apple')}
                            disabled={isLoading}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.59 13.93c.02 2.65 2.29 3.52 2.31 3.53-.01.03-.35 1.22-1.21 2.48-.74 1.09-1.53 2.18-2.73 2.2-1.18.02-1.56-.7-2.91-.7-1.35 0-1.77.68-2.9.72-1.16.04-2.06-1.18-2.81-2.27C4.77 17.65 3.54 14.2 4.3 11.89c.37-1.14 1.12-2.11 2.09-2.68.95-.56 2.01-.58 2.8-.58 1.16 0 1.55.7 2.88.7 1.35 0 1.63-.58 2.8-.64 1.25-.06 2.16.51 2.76 1.39-2.31 1.39-1.92 4.49.52 5.48-.15.46-.35.94-.56 1.37zM15.4 6.72c-.67.82-1.54 1.35-2.52 1.35h-.11c.09-.94.49-1.85 1.14-2.52.64-.67 1.54-1.18 2.44-1.22v.11c0 .9-.35 1.76-.95 2.28z" />
                            </svg>
                            {isLoading ? 'Bağlanıyor...' : 'Apple ile Devam Et'}
                        </button>

                        <button
                            className="btn"
                            style={{
                                width: '100%', padding: '14px', background: '#0A66C2', color: '#fff',
                                border: 'none', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', gap: '12px', fontSize: '15px', fontWeight: 600
                            }}
                            onClick={() => handleMockLogin('linkedin')}
                            disabled={isLoading}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            {isLoading ? 'Bağlanıyor...' : 'LinkedIn ile Devam Et'}
                        </button>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                        <ShieldCheck size={16} />
                        <span style={{ fontSize: '12px' }}>Verileriniz kvkk kapsamında şifrelenir.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
