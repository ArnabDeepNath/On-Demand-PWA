import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { ISSUE_TYPES, SERVICE_TYPES } from '../../data/mockData';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const allItems = [
        ...ISSUE_TYPES.map(i => ({ ...i, type: 'issue' })),
        ...SERVICE_TYPES.map(s => ({ ...s, type: 'service' })),
    ];

    const filtered = query
        ? allItems.filter(item =>
            (item.label || item.name || '').toLowerCase().includes(query.toLowerCase()) ||
            (item.description || '').toLowerCase().includes(query.toLowerCase())
        )
        : allItems;

    return (
        <div>
            <div className="search-input-wrapper">
                <Search size={18} className="search-input-icon" />
                <input
                    type="text"
                    className="input-field search-input"
                    placeholder="Search services, issues..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    id="search-input"
                />
            </div>

            <div className="container">
                {!query && (
                    <div className="section-title" style={{ marginTop: 'var(--space-md)' }}>
                        <span>Popular Services</span>
                    </div>
                )}
                <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    {filtered.map((item, idx) => (
                        <button
                            key={item.id}
                            className="card card-clickable animate-fade-in-up"
                            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-md) var(--space-lg)', animationDelay: `${idx * 40}ms` }}
                            onClick={() => navigate('/book', { state: { issueType: item.id } })}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                            <div style={{ flex: 1, textAlign: 'left' }}>
                                <strong style={{ fontSize: '0.9rem' }}>{item.label}</strong>
                                {item.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.description}</p>}
                            </div>
                            {item.price && <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{item.price}</span>}
                            <ArrowRight size={16} color="var(--text-muted)" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
