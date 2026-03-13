import NavBar from '../components/NavBar';

export default function GenericLegalPage({ title, description, contentBlocks }) {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <NavBar />
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', lineHeight: 1.8 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>{title}</h1>
                {description && <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem' }}>{description}</p>}

                <div className="card" style={{ marginBottom: '32px' }}>
                    {contentBlocks.map((block, i) => (
                        <p key={i} style={{ marginBottom: i === contentBlocks.length - 1 ? 0 : '16px' }}>
                            <strong>{block.subtitle && `${block.subtitle}: `}</strong>
                            {block.text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
