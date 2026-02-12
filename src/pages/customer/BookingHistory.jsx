import { useState } from 'react';
import { MOCK_BOOKINGS, ISSUE_TYPES, STATUS_CONFIG, SERVICE_TYPES } from '../../data/mockData';
import { Calendar, MapPin, Star } from 'lucide-react';

export default function BookingHistory() {
    const [filter, setFilter] = useState('all');
    const stored = JSON.parse(localStorage.getItem('sha24_bookings') || '[]');
    const allBookings = [...stored, ...MOCK_BOOKINGS];

    const filtered = filter === 'all' ? allBookings
        : allBookings.filter(b => b.status === filter);

    return (
        <div className="container" style={{ paddingTop: 'var(--space-md)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)' }}>My Bookings</h2>

            <div className="filter-tabs">
                {['all', 'pending', 'in_progress', 'completed', 'cancelled'].map(f => (
                    <button
                        key={f}
                        className={`filter-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f === 'all' ? 'All' : STATUS_CONFIG[f]?.label || f}
                    </button>
                ))}
            </div>

            <div className="booking-list stagger-children">
                {filtered.length === 0 ? (
                    <div className="empty-state">
                        <span style={{ fontSize: '3rem' }}>📋</span>
                        <p>No bookings found</p>
                    </div>
                ) : (
                    filtered.map((booking, idx) => {
                        const issue = ISSUE_TYPES.find(i => i.id === booking.issueType);
                        const status = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
                        const svc = SERVICE_TYPES.find(s => s.id === booking.serviceType);

                        return (
                            <div key={booking.id || idx} className="booking-card animate-fade-in-up" style={{ animationDelay: `${idx * 60}ms` }}>
                                <div className="booking-card-header">
                                    <span className="booking-card-id">#{booking.id}</span>
                                    <span className="status-chip" style={{ background: status.bg, color: status.color }}>
                                        {status.label}
                                    </span>
                                </div>
                                <div className="booking-card-body">
                                    <span style={{ fontSize: '1.8rem' }}>{issue?.icon || '🔧'}</span>
                                    <div className="booking-card-details">
                                        <strong>{issue?.label || 'Service'}</strong>
                                        <p>{booking.bike?.model || svc?.label || '-'}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--space-lg)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={12} /> {booking.location?.address || booking.location || '-'}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} /> {new Date(booking.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {booking.mechanic && (
                                    <div className="booking-card-footer">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                            <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>{booking.mechanic.name[0]}</div>
                                            <span style={{ fontSize: '0.85rem' }}>{booking.mechanic.name}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-warning)', fontSize: '0.75rem' }}>
                                                <Star size={10} fill="currentColor" /> {booking.mechanic.rating}
                                            </span>
                                        </div>
                                        {booking.amount > 0 && (
                                            <span className="booking-amount">₹{booking.amount}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
