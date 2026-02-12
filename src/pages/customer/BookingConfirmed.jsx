import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home, Clock } from 'lucide-react';
import { ISSUE_TYPES, SERVICE_TYPES } from '../../data/mockData';

export default function BookingConfirmed() {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state?.booking;

    const issue = ISSUE_TYPES.find(i => i.id === booking?.issueType);
    const service = SERVICE_TYPES.find(s => s.id === booking?.serviceType);

    return (
        <div className="confirmation-page page">
            <div className="confirmation-icon">✅</div>
            <h1>Booking Confirmed!</h1>
            <p>Your booking has been placed successfully. A mechanic will be assigned shortly.</p>

            {booking && (
                <div className="summary-card">
                    <div className="summary-row">
                        <span className="label">Booking ID</span>
                        <span className="value" style={{ fontFamily: 'monospace' }}>#{booking.id}</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Issue</span>
                        <span className="value">{issue?.icon} {issue?.label}</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Service</span>
                        <span className="value">{service?.label}</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Vehicle</span>
                        <span className="value">{booking.bike?.model || '-'}</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Location</span>
                        <span className="value">{booking.location?.address || '-'}</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Schedule</span>
                        <span className="value">{booking.schedule === 'immediate' ? '⚡ ASAP' : booking.schedule}</span>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', gap: 'var(--space-md)', width: '100%', maxWidth: '400px' }}>
                <button className="btn btn-secondary btn-full" onClick={() => navigate('/bookings')} id="view-bookings-btn">
                    <Clock size={18} /> My Bookings
                </button>
                <button className="btn btn-primary btn-full" onClick={() => navigate('/home')} id="go-home-btn">
                    <Home size={18} /> Home
                </button>
            </div>
        </div>
    );
}
