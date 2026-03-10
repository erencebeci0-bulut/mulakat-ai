import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const NAV_LINKS = [
    { to: '/#araclar', label: 'Araçlar' },
    { to: '/maas-hesaplama', label: 'Maaş Hesapla' },
    { to: '/cv-hazirla', label: 'CV Hazırla' },
    { to: '/istifa-dilekcesi', label: 'İstifa Dilekçesi' },
    { to: '/liderlik-tablosu', label: 'Liderlik' },
];

export default function NavBar() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="nav-fixed" style={{ padding: '0 32px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{
                        width: '34px', height: '34px', borderRadius: '9px',
                        background: 'linear-gradient(135deg, #6D5DFC, #00d4aa)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.9 2 2 0 012.1.9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '17px', color: 'var(--text-primary)' }}>
                        mülakat<span style={{ color: 'var(--accent)' }}>.com</span>
                    </span>
                </Link>

                {/* Desktop nav links */}
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desk-nav">
                    {NAV_LINKS.map(l => (
                        <Link key={l.to} to={l.to} style={{
                            color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500,
                            textDecoration: 'none', padding: '6px 12px', borderRadius: '8px',
                            transition: 'color 0.15s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >{l.label}</Link>
                    ))}
                </div>

                {/* Right actions */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            width: '36px', height: '36px', borderRadius: '9px', border: '1px solid var(--border)',
                            background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.2s',
                        }}
                        title={theme === 'dark' ? 'Açık tema' : 'Koyu tema'}
                    >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {/* CTA */}
                    <button className="btn btn-primary" onClick={() => navigate('/ai-interview')} style={{ padding: '8px 18px', fontSize: '14px' }}>
                        Mülakata Başla
                    </button>

                    {/* Mobile menu */}
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'none' }}
                        className="mobile-menu-btn" onClick={() => setMobileOpen(o => !o)}>
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div style={{ padding: '12px 32px 20px', borderTop: '1px solid var(--border)' }}>
                    {NAV_LINKS.map(l => (
                        <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} style={{
                            display: 'block', color: 'var(--text-secondary)', padding: '10px 0',
                            textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                            borderBottom: '1px solid var(--border)',
                        }}>{l.label}</Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}
