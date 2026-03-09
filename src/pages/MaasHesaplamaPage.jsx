import { useState } from 'react';
import { DollarSign, Calculator, Info, Wallet, PieChart } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function MaasHesaplamaPage() {
    const [gross, setGross] = useState('');
    const [result, setResult] = useState(null);

    const calculateSalary = () => {
        const amount = parseFloat(gross);
        if (isNaN(amount) || amount <= 0) return;

        // Simplified Turkish Salary Calculation logic (approximate for MVP)
        // 2024 approximation: %14 SGK, %1 İşsizlik, %15-20 Income Tax (simplified)
        const sgk = amount * 0.14;
        const issizlik = amount * 0.01;
        const taxBase = amount - sgk - issizlik;
        const incomeTax = taxBase * 0.15; // Simplified flat 15% for MVP
        const stampTax = amount * 0.00759;

        // Minimum wage tax exception (simplified)
        const totalDeduction = sgk + issizlik + incomeTax + stampTax;
        const net = amount - totalDeduction;

        setResult({
            gross: amount,
            net: net,
            sgk: sgk,
            issizlik: issizlik,
            incomeTax: incomeTax,
            stampTax: stampTax,
            totalDeduction: totalDeduction
        });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <Calculator size={14} style={{ marginRight: '6px' }} /> Araçlar
                    </div>
                    <h1 className="section-title">Maaş Hesaplama</h1>
                    <p className="section-sub">Brüt maaşınızı nete çevirin, vergi kesintilerini görün.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {/* Input Section */}
                    <div className="card animate-in">
                        <h3 style={{ marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Wallet size={20} color="var(--accent)" /> Maaş Bilgileri
                        </h3>

                        <div style={{ marginBottom: '24px' }}>
                            <label className="input-label">Aylık Brüt Maaş (TL)</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="Örn: 50000"
                                    value={gross}
                                    onChange={(e) => setGross(e.target.value)}
                                    style={{ paddingLeft: '44px' }}
                                />
                                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                    ₺
                                </span>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={calculateSalary}>
                            Hesapla
                        </button>

                        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', gap: '12px' }}>
                            <Info size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                Bu hesaplama 2024 vergi dilimleri ve parametreleri baz alınarak yaklaşık olarak yapılmıştır. Kesin sonuçlar için muhasebe departmanınıza danışın.
                            </p>
                        </div>
                    </div>

                    {/* Result Section */}
                    {result ? (
                        <div className="card animate-in" style={{ border: '1px solid var(--accent)' }}>
                            <h3 style={{ marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <PieChart size={20} color="var(--success)" /> Hesaplama Sonucu
                            </h3>

                            <div style={{ textAlign: 'center', marginBottom: '32px', padding: '24px', backgroundColor: 'var(--accent-glow)', borderRadius: '16px' }}>
                                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Tahmini Net Maaş</span>
                                <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--success)' }}>
                                    ₺{result.net.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Brüt Maaş</span>
                                    <span style={{ fontWeight: 600 }}>₺{result.gross.toLocaleString('tr-TR')}</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>SGK İşçi Payı (%14)</span>
                                    <span style={{ color: 'var(--danger)' }}>-₺{result.sgk.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>İşsizlik Sigortası (%1)</span>
                                    <span style={{ color: 'var(--danger)' }}>-₺{result.issizlik.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Gelir Vergisi (%15)</span>
                                    <span style={{ color: 'var(--danger)' }}>-₺{result.incomeTax.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Damga Vergisi</span>
                                    <span style={{ color: 'var(--danger)' }}>-₺{result.stampTax.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '8px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700 }}>
                                    <span>Toplam Kesinti</span>
                                    <span style={{ color: 'var(--danger)' }}>₺{result.totalDeduction.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card animate-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', color: 'var(--text-muted)', textAlign: 'center' }}>
                            <div>
                                <DollarSign size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                                <p>Hesaplama detayları burada görünecek</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Maaş Hesaplama Aracı</p>
            </footer>
        </div>
    );
}
