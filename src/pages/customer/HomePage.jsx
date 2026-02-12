import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ISSUE_TYPES, MOCK_BOOKINGS, STATUS_CONFIG } from '../../data/mockData';
import { MapPin, ArrowRight, Star, Shield, Clock, Zap } from 'lucide-react';
import './customer.css';

export default function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const activeBookings = MOCK_BOOKINGS.filter(b => b.status !== 'completed' && b.status !== 'cancelled');

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-greeting animate-fade-in-up">
                        <span>Hey, {user?.name?.split(' ')[0] || 'Rider'} 👋</span>
                    </div>
                    <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '80ms' }}>
                        Bike trouble?<br />
                        <span className="gradient-text">We've got you covered.</span>
                    </h1>
                    <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '160ms' }}>
                        Book a mechanic in seconds. On-spot repair, towing, or pickup — your choice.
                    </p>
                    <button
                        className="btn btn-primary btn-lg animate-fade-in-up"
                        style={{ animationDelay: '240ms' }}
                        onClick={() => navigate('/book')}
                        id="hero-book-btn"
                    >
                        <Zap size={20} /> Book a Mechanic Now
                    </button>
                </div>
            </section>

            {/* Active Booking Card */}
            {activeBookings.length > 0 && (
                <section className="container section">
                    <div className="section-title">
                        <span>🔴 Active Booking</span>
                    </div>
                    {activeBookings.slice(0, 1).map(booking => {
                        const issue = ISSUE_TYPES.find(i => i.id === booking.issueType);
                        const status = STATUS_CONFIG[booking.status];
                        return (
                            <div key={booking.id} className="active-booking-card animate-fade-in-up">
                                <div className="active-booking-header">
                                    <div className="active-booking-issue">
                                        <span className="active-booking-icon">{issue?.icon}</span>
                                        <div>
                                            <strong>{issue?.label}</strong>
                                            <p>{booking.bike.model}</p>
                                        </div>
                                    </div>
                                    <span className="status-chip" style={{ background: status.bg, color: status.color }}>
                                        {status.label}
                                    </span>
                                </div>
                                {booking.mechanic && (
                                    <div className="active-booking-mechanic">
                                        <div className="avatar">{booking.mechanic.name[0]}</div>
                                        <div>
                                            <strong>{booking.mechanic.name}</strong>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-warning)', fontSize: '0.8rem' }}>
                                                <Star size={12} fill="currentColor" /> {booking.mechanic.rating}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className="active-booking-location">
                                    <MapPin size={14} /> <span>{booking.location}</span>
                                </div>
                                <div className="active-booking-actions">
                                    <button className="btn btn-secondary btn-sm">Track</button>
                                    <button className="btn btn-primary btn-sm">Call Mechanic</button>
                                </div>
                            </div>
                        );
                    })}
                </section>
            )}

            {/* Quick Issue Select */}
            <section className="container section">
                <div className="section-title">
                    <span>What's the issue?</span>
                    <a onClick={() => navigate('/book')}>See all <ArrowRight size={14} /></a>
                </div>
                <div className="issue-grid stagger-children">
                    {ISSUE_TYPES.map(issue => (
                        <button
                            key={issue.id}
                            className="issue-card animate-fade-in-up"
                            onClick={() => navigate('/book', { state: { issueType: issue.id } })}
                            id={`issue-${issue.id}`}
                        >
                            <div className="issue-card-icon" style={{ background: `${issue.color}20` }}>
                                <span>{issue.icon}</span>
                            </div>
                            <span className="issue-card-label">{issue.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="container section">
                <div className="section-title"><span>Why SHA24?</span></div>
                <div className="features-grid stagger-children">
                    <div className="feature-card animate-fade-in-up">
                        <div className="feature-icon" style={{ background: 'rgba(255,107,0,0.15)', color: 'var(--color-primary)' }}>
                            <Clock size={24} />
                        </div>
                        <h4>24/7 Available</h4>
                        <p>Mechanics available round the clock, even on holidays</p>
                    </div>
                    <div className="feature-card animate-fade-in-up">
                        <div className="feature-icon" style={{ background: 'rgba(0,212,170,0.15)', color: 'var(--color-accent)' }}>
                            <Shield size={24} />
                        </div>
                        <h4>Verified Mechanics</h4>
                        <p>All technicians are background-checked and certified</p>
                    </div>
                    <div className="feature-card animate-fade-in-up">
                        <div className="feature-icon" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--color-info)' }}>
                            <MapPin size={24} />
                        </div>
                        <h4>Doorstep Service</h4>
                        <p>Get your bike fixed at your location — no trips needed</p>
                    </div>
                    <div className="feature-card animate-fade-in-up">
                        <div className="feature-icon" style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}>
                            <Star size={24} />
                        </div>
                        <h4>Genuine Parts</h4>
                        <p>Only authentic spare parts used for every repair</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
