import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Bike, MapPin, CreditCard, Bell, HelpCircle, Shield, ChevronRight, Edit3, Plus } from 'lucide-react';

export default function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const toast = useToast();

    const bikes = user?.bikes || [];

    return (
        <div>
            {/* Profile Header */}
            <div className="profile-header">
                <div className="avatar avatar-xl" style={{ fontSize: '1.5rem' }}>
                    {user?.name?.[0] || 'U'}
                </div>
                <div className="profile-info">
                    <h2>{user?.name || 'User'}</h2>
                    <p>{user?.phone || '+91 XXXXX XXXXX'}</p>
                </div>
                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-value gradient-text">3</span>
                        <span className="profile-stat-label">Bookings</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-value gradient-text">1</span>
                        <span className="profile-stat-label">Bikes</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-value gradient-text">4.9</span>
                        <span className="profile-stat-label">Rating</span>
                    </div>
                </div>
            </div>

            {/* Saved Bikes */}
            <div className="profile-section">
                <div className="section-title">
                    <span>🏍️ My Bikes</span>
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-primary)' }}>
                        <Plus size={16} /> Add
                    </button>
                </div>
                {bikes.length > 0 ? bikes.map(bike => (
                    <div key={bike.id} className="bike-card">
                        <span className="bike-card-icon">🏍️</span>
                        <div className="bike-card-info">
                            <h4>{bike.model}</h4>
                            <p>{bike.year} • {bike.reg}</p>
                        </div>
                        <button className="btn btn-icon btn-ghost">
                            <Edit3 size={16} />
                        </button>
                    </div>
                )) : (
                    <div className="bike-card" style={{ justifyContent: 'center', color: 'var(--text-muted)' }}>
                        No bikes saved yet
                    </div>
                )}
            </div>

            {/* Menu */}
            <div className="profile-section">
                <div className="section-title"><span>Settings</span></div>
                <div className="menu-list">
                    <button className="menu-item">
                        <MapPin size={20} /> Saved Addresses <span><ChevronRight size={16} /></span>
                    </button>
                    <button className="menu-item">
                        <CreditCard size={20} /> Payment Methods <span><ChevronRight size={16} /></span>
                    </button>
                    <button className="menu-item">
                        <Bell size={20} /> Notifications <span><ChevronRight size={16} /></span>
                    </button>
                    <button className="menu-item">
                        <Shield size={20} /> Privacy & Security <span><ChevronRight size={16} /></span>
                    </button>
                    <button className="menu-item">
                        <HelpCircle size={20} /> Help & Support <span><ChevronRight size={16} /></span>
                    </button>
                </div>
            </div>

            <div style={{ textAlign: 'center', padding: 'var(--space-lg)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                SHA24 v1.0.0 • Made with 🧡
            </div>
        </div>
    );
}
