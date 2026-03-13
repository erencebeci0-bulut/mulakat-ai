import { useState } from 'react';
import { DollarSign, Calculator, Info, Wallet, PieChart, TrendingUp, MapPin, Briefcase, Award, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import NavBar from '../components/NavBar';
import Breadcrumbs from '../components/Breadcrumbs';
import SalarySubmissionForm from '../components/SalarySubmissionForm';
import SEOHead from '../components/SEOHead';

export default function MaasHesaplamaPage() {
    const [calcType, setCalcType] = useState('grossToNet'); // 'grossToNet' | 'netToGross'
    const [amount, setAmount] = useState('');
    const [role, setRole] = useState('Yazılım Geliştirici');
    const [city, setCity] = useState('İstanbul');
    const [experience, setExperience] = useState('1-3 Yıl');
    const [result, setResult] = useState(null);

    const roles = ['Yazılım Geliştirici', 'Veri Bilimi', 'Ürün Yöneticisi', 'Tasarımcı', 'Pazarlama Uzmanı', 'Diğer'];
    const cities = ['İstanbul', 'Ankara', 'İzmir', 'Uzaktan (Remote)', 'Diğer'];
    const experiences = ['0-1 Yıl', '1-3 Yıl', '3-5 Yıl', '5-10 Yıl', '10+ Yıl'];

    const calculateSalary = () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return;

        let grossAmount = 0;
        let netAmount = 0;

        // Simplified Turkish Salary Calculation logic (MVP Approximation)
        // General approximation: %14 SGK, %1 İşsizlik, %15 Income Tax, %0.759 Stamp Tax
        if (calcType === 'grossToNet') {
            grossAmount = val;
            const sgk = grossAmount * 0.14;
            const issizlik = grossAmount * 0.01;
            const taxBase = grossAmount - sgk - issizlik;
            const incomeTax = taxBase * 0.15;
            const stampTax = grossAmount * 0.00759;
            const totalDeduction = sgk + issizlik + incomeTax + stampTax;
            netAmount = grossAmount - totalDeduction;

            setResult({
                type: 'grossToNet',
                gross: grossAmount,
                net: netAmount,
                sgk, issizlik, incomeTax, stampTax, totalDeduction
            });
        } else {
            // Net to Gross approximation (71.49% net yield for this simplified MVP formula)
            netAmount = val;
            grossAmount = netAmount / 0.71491;

            const sgk = grossAmount * 0.14;
            const issizlik = grossAmount * 0.01;
            const taxBase = grossAmount - sgk - issizlik;
            const incomeTax = taxBase * 0.15;
            const stampTax = grossAmount * 0.00759;
            const totalDeduction = sgk + issizlik + incomeTax + stampTax;

            setResult({
                type: 'netToGross',
                gross: grossAmount,
                net: netAmount,
                sgk, issizlik, incomeTax, stampTax, totalDeduction
            });
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingBottom: '100px' }}>
            <SEOHead
                title="Maaş Hesaplama Aracı | Türkiye Maaş Analizi"
                description="Sektör ve tecrübeye göre net/brüt maaş hesaplama ve güncel piyasa analizleri."
                url="https://mülakat.com/maas-hesaplama"
            />
            <NavBar />
            <Breadcrumbs items={[{ label: 'Maaş Hesaplama', to: '/maas-hesaplama' }]} />

            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 24px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="badge badge-accent" style={{ marginBottom: '16px' }}>
                        <Calculator size={14} style={{ marginRight: '6px' }} /> Araçlar / Beta
                    </div>
                    <h1 className="section-title">Maaş Hesaplama ve Pazar Analizi</h1>
                    <p className="section-sub">Brütten nete veya netten brüte maaşınızı hesaplayın, rolünüze göre pazar ortalamalarını değerlendirin.</p>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 24px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>

                    {/* Input Section */}
                    <div className="card animate-in" style={{ padding: '32px' }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Wallet size={20} color="var(--accent)" /> Hesaplama Detayları
                        </h3>

                        {/* Type Toggle */}
                        <div style={{ display: 'flex', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', padding: '6px', marginBottom: '24px', border: '1px solid var(--border)' }}>
                            <button
                                className={`btn ${calcType === 'grossToNet' ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ flex: 1, padding: '10px', fontSize: '13px', border: 'none' }}
                                onClick={() => setCalcType('grossToNet')}>
                                Brütten Nete
                            </button>
                            <button
                                className={`btn ${calcType === 'netToGross' ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ flex: 1, padding: '10px', fontSize: '13px', border: 'none' }}
                                onClick={() => setCalcType('netToGross')}>
                                Netten Brüte
                            </button>
                        </div>

                        {/* Amount Input */}
                        <div style={{ marginBottom: '24px' }}>
                            <label className="input-label">Aylık {calcType === 'grossToNet' ? 'Brüt' : 'Net'} Maaş (TL)</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="Örn: 50000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    style={{ paddingLeft: '44px', fontSize: '16px', fontWeight: 600 }}
                                />
                                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }}>
                                    ₺
                                </span>
                            </div>
                        </div>

                        {/* Context Dropdowns */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                <Briefcase size={18} color="var(--text-muted)" />
                                <select className="input" style={{ border: 'none', background: 'transparent', padding: 0 }} value={role} onChange={(e) => setRole(e.target.value)}>
                                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    <MapPin size={18} color="var(--text-muted)" />
                                    <select className="input" style={{ border: 'none', background: 'transparent', padding: 0 }} value={city} onChange={(e) => setCity(e.target.value)}>
                                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    <Award size={18} color="var(--text-muted)" />
                                    <select className="input" style={{ border: 'none', background: 'transparent', padding: 0 }} value={experience} onChange={(e) => setExperience(e.target.value)}>
                                        {experiences.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '15px' }} onClick={calculateSalary}>
                            Hesapla ve Analiz Et
                        </button>

                    </div>

                    {/* Result Section */}
                    {result ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="card animate-in" style={{ border: '1px solid var(--accent)', padding: '32px' }}>
                                <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <PieChart size={20} color="var(--success)" /> Hesaplama Sonucu
                                </h3>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', padding: '24px', backgroundColor: 'var(--accent-glow)', borderRadius: '16px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Brüt Maaş</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                            ₺{result.gross.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                    <ArrowRightLeft size={24} color="var(--accent)" opacity={0.5} />
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--success)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>Net Maaş</span>
                                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>
                                            ₺{result.net.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>SGK İşçi Payı (%14)</span>
                                        <span style={{ color: 'var(--danger)', fontWeight: 500 }}>-₺{result.sgk.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>İşsizlik Sigortası (%1)</span>
                                        <span style={{ color: 'var(--danger)', fontWeight: 500 }}>-₺{result.issizlik.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Gelir Vergisi (%15*)</span>
                                        <span style={{ color: 'var(--danger)', fontWeight: 500 }}>-₺{result.incomeTax.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Damga Vergisi</span>
                                        <span style={{ color: 'var(--danger)', fontWeight: 500 }}>-₺{result.stampTax.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '8px 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800 }}>
                                        <span>Toplam Kesinti</span>
                                        <span style={{ color: 'var(--danger)' }}>₺{result.totalDeduction.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <Info size={16} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                        *Vergi dilimleri basitleştirilmiş MVP mantığıyla hesaplanmıştır. Kesin vergi matrahı aydan aya değişkenlik gösterebilir.
                                    </p>
                                </div>
                            </div>

                            {/* Context Analysis Card */}
                            <div className="card animate-in" style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)' }}>
                                <h3 style={{ marginBottom: '16px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <TrendingUp size={18} color="var(--accent)" /> Pazar Analizi (Önizleme)
                                </h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>{city}</strong> bölgesinde, <strong style={{ color: 'var(--text-primary)' }}>{experience}</strong> deneyime sahip bir <strong style={{ color: 'var(--text-primary)' }}>{role}</strong> için ₺{result.net.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} net maaş seviyesi sektörel standartlarda değerlendiriliyor.
                                </p>
                                <div className="badge badge-accent" style={{ opacity: 0.8, fontSize: '12px' }}>
                                    Yakında: Gelişmiş Şirket Bazlı Kıyaslama
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card animate-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', color: 'var(--text-muted)', textAlign: 'center', minHeight: '400px' }}>
                            <div>
                                <DollarSign size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                                <p style={{ fontSize: '15px', fontWeight: 500 }}>Hesaplama detayları ve bağlamsal analiz burada görünecek</p>
                                <p style={{ fontSize: '13px', marginTop: '8px', opacity: 0.6 }}>Hemen sol taraftan değerleri girin.</p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Anonymous Contribution Banner */}
                <div style={{ marginTop: '64px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <ShieldCheck size={36} color="var(--accent)" style={{ margin: '0 auto 16px' }} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>Piyasayı Şeffaflaştır: Anonim Maaş Katkısı</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            Maaş bilgini tamamen anonim olarak paylaşarak Türkiye'nin en şeffaf yetenek odaklı maaş endeksinin oluşturulmasına katkıda bulunabilirsin. Kişisel verilerin asla kaydedilmez.
                        </p>
                    </div>

                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <SalarySubmissionForm />
                    </div>
                </div>

            </div>

            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center', marginTop: '64px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 mülakat.com — Maaş Hesaplama Aracı | Tüm Yasal Kesintiler Yaklaşıktır</p>
            </footer>
        </div>
    );
}
