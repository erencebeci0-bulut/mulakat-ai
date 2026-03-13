import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, BarChart2, Shield, MessageSquare, DollarSign, Flag, Settings, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import NavBar from '../../components/NavBar';

export default function AdminDashboardPage() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const auth = localStorage.getItem('mulakat_admin_auth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        const EXPECTED_EMAIL = 'hello@mulakatim.com';
        const EXPECTED_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'Mlk2026!Admin';

        if (email === EXPECTED_EMAIL && password === EXPECTED_PASS) {
            setIsAuthenticated(true);
            localStorage.setItem('mulakat_admin_auth', 'true');
            setError('');
        } else {
            setError('Geçersiz e-posta veya şifre.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('mulakat_admin_auth');
    };

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                    <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px', textAlign: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Shield size={32} color="var(--danger)" />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Yönetim Merkezi</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Devam etmek için yönetici kimliğinizi doğrulayın.</p>

                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                type="email"
                                className="input"
                                placeholder="E-Posta Adresi"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                            />
                            <input
                                type="password"
                                className="input"
                                placeholder="Şifre"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <div style={{ color: 'var(--danger)', fontSize: '13px', fontWeight: 600 }}>{error}</div>}
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                <Lock size={18} /> Giriş Yap
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const PENDING_ITEMS = [
        { id: 1, type: 'salary', title: 'Frontend Developer Maaş', date: '10 Dk Önce', status: 'pending' },
        { id: 2, type: 'interview', title: 'Trendyol Mülakat Deneyimi', date: '1 Saat Önce', status: 'pending' },
        { id: 3, type: 'removal', title: 'İçerik Kaldırma Talebi #442', date: '3 Saat Önce', status: 'pending' },
    ];

    const STATS = [
        { label: 'Günlük Tekil Ziyaretçi', value: '1,204', icon: <BarChart2 size={24} color="var(--accent)" /> },
        { label: 'AI Mülakat Oturumu', value: '342', icon: <MessageSquare size={24} color="var(--success)" /> },
        { label: 'CV Oluşturma', value: '89', icon: <BarChart2 size={24} color="var(--warning)" /> },
        { label: 'Onay Bekleyen İçerik', value: '3', icon: <Flag size={24} color="var(--danger)" /> },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <NavBar />

            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', gap: '8px', padding: '16px 24px', overflowX: 'auto' }}>
                    <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BarChart2 size={16} /> Özet
                    </button>
                    <button className={`tab-btn ${activeTab === 'moderation' ? 'active' : ''}`} onClick={() => setActiveTab('moderation')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Flag size={16} /> Moderasyon Yolu
                        <span style={{ background: 'var(--danger)', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>3</span>
                    </button>
                    <button className={`tab-btn ${activeTab === 'salary' ? 'active' : ''}`} onClick={() => setActiveTab('salary')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={16} /> Maaş Verileri
                    </button>
                    <button className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MessageSquare size={16} /> Mülakatlar
                    </button>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button className="btn btn-ghost" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ArrowLeft size={16} /> Siteye Dön
                        </button>
                        <button className="btn btn-ghost" onClick={handleLogout} style={{ color: 'var(--danger)' }}>Çıkış</button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Yönetim Merkezi</h1>
                    <div className="badge badge-accent" style={{ background: 'rgba(0,212,170,0.1)', color: 'var(--success)', border: '1px solid rgba(0,212,170,0.3)' }}>Canlı Operasyon</div>
                </div>

                {activeTab === 'dashboard' && (
                    <div className="animate-in">
                        <div style={{ padding: '12px 16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', marginBottom: '24px', color: 'var(--warning)', fontSize: '13px', fontWeight: 600 }}>
                            Bilgi: Aşağıdaki özet veriler ve loglar <strong>demo (temsili)</strong> verilerdir. Lansman sonrasında n8n üzerinden gerçek verilere bağlanacaktır.
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                            {STATS.map(s => (
                                <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {s.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '13px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>{s.label}</p>
                                        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>Son Aktiviteler</h2>
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            {[
                                { text: 'Yeni maaş verisi eklendi: Product Manager (İstanbul)', time: '5 dk önce' },
                                { text: 'İçerik kaldırma talebi geldi (#442)', time: '3 saat önce' },
                                { text: 'AI Mülakat tamamlandı (Skor: 8.5/10)', time: '4 saat önce' },
                                { text: 'Yeni CV PDF olarak dışa aktarıldı', time: '5 saat önce' },
                            ].map((activity, idx) => (
                                <div key={idx} style={{
                                    padding: '16px 24px',
                                    borderBottom: idx === 3 ? 'none' : '1px solid var(--border)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{activity.text}</span>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'moderation' && (
                    <div className="animate-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Onay Bekleyen İşlemler</h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Oto-yayınlama kapalı. Tüm içerikler onayınızdan geçmelidir.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {PENDING_ITEMS.map(item => (
                                <div key={item.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.type === 'salary' && <DollarSign size={20} color="var(--success)" />}
                                            {item.type === 'interview' && <MessageSquare size={20} color="var(--accent)" />}
                                            {item.type === 'removal' && <Flag size={20} color="var(--danger)" />}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{item.title}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{item.date} • {item.type.toUpperCase()}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '13px', color: 'var(--success)', borderColor: 'var(--success)' }}>
                                            <CheckCircle size={16} /> Onayla
                                        </button>
                                        <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '13px', color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                                            <XCircle size={16} /> Reddet
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {(activeTab === 'salary' || activeTab === 'interview') && (
                    <div className="animate-in card" style={{ padding: '40px', textAlign: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Settings size={32} color="var(--text-muted)" />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Veritabanı Görünümü Hazırlanıyor</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Bu modül yakında n8n otomasyon panosuna bağlanacaktır.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
