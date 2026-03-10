import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
    return (
        <div style={{ padding: '24px 32px 0', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '16px', transition: 'color 0.2s', fontWeight: 500 }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    <ArrowLeft size={16} /> Ana Sayfa
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Ana Sayfa</Link>
                    {items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ChevronRight size={14} />
                            {item.to ? (
                                <Link to={item.to} style={{ color: idx === items.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: idx === items.length - 1 ? 600 : 400 }}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span style={{ color: idx === items.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: idx === items.length - 1 ? 600 : 400 }}>
                                    {item.label}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
