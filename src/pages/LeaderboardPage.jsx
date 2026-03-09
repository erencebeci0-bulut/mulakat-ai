import { Trophy, Users, Star, Medal, Crown } from 'lucide-react';
import NavBar from '../components/NavBar';

const TOP_USERS = [
    { rank: 1, name: 'Mülakat Şampiyonu #42', score: 9.8, role: 'Yazılım', date: '2 saat önce' },
    { rank: 2, name: 'Mülakat Lideri #12', score: 9.5, role: 'Ürün Yönetimi', date: '5 saat önce' },
    { rank: 3, name: 'Mülakat Lideri #88', score: 9.2, role: 'Veri Analisti', date: 'Dün' },
    { rank: 4, name: 'Mülakat Lideri #05', score: 8.9, role: 'Pazarlama', date: 'Dün' },
    { rank: 5, name: 'Mülakat Lideri #19', score: 8.7, role: 'Satış', date: '2 gün önce' },
    { rank: 6, name: 'Mülakat Ustası #77', score: 8.4, role: 'Genel', date: '2 gün önce' },
    { rank: 7, name: 'Mülakat Ustası #21', score: 8.2, role: 'Yazılım', date: '3 gün önce' },
];

export default function LeaderboardPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <Trophy size={14} style={{ marginRight: '6px' }} /> Topluluk
                    </div>
                    <h1 className="section-title">Liderlik Tablosu</h1>
                    <p className="section-sub">Mülakatlarda en yüksek performans gösteren adaylar (Anonim).</p>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
                    {[
                        { icon: <Users size={18} />, val: '12.8k+', label: 'Katılımcı' },
                        { icon: <Star size={18} />, val: '6.4', label: 'Ort. Skor' },
                        { icon: <Medal size={18} />, val: 'top %5', label: 'Şampiyonluk' },
                    ].map(s => (
                        <div key={s.label} className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
                            <div style={{ color: 'var(--accent)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{s.val}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* List */}
                <div className="card animate-in" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '60px 1fr 100px 80px', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        <span>Sıra</span>
                        <span>Kullanıcı</span>
                        <span>Rol</span>
                        <span style={{ textAlign: 'right' }}>Puan</span>
                    </div>

                    {TOP_USERS.map((user, idx) => (
                        <div key={user.rank} style={{
                            padding: '18px 24px',
                            borderBottom: idx === TOP_USERS.length - 1 ? 'none' : '1px solid var(--border)',
                            display: 'grid',
                            gridTemplateColumns: '60px 1fr 100px 80px',
                            alignItems: 'center',
                            transition: 'background 0.2s'
                        }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{ fontWeight: 800, color: user.rank <= 3 ? 'var(--accent)' : 'var(--text-muted)' }}>
                                {user.rank === 1 ? <Crown size={18} color="#f59e0b" /> : `#${user.rank}`}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '14.5px' }}>{user.name}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.date}</div>
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{user.role}</div>
                            <div style={{ textAlign: 'right', fontWeight: 800, color: 'var(--accent-2)', fontSize: '15px' }}>
                                {user.score}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '40px', padding: '24px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>Kendi Sıranı Öğren!</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Bir mülakat provası yap, skorunu al ve rütbeni gör.</p>
                    <button className="btn btn-primary">Mülakata Başla</button>
                </div>
            </div>

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Topluluk Liderlik Tablosu</p>
            </footer>
        </div>
    );
}
