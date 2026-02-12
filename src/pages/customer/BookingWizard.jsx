import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Camera, MapPin, Calendar, Bike, Wrench, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { ISSUE_TYPES, SERVICE_TYPES, BIKE_BRANDS } from '../../data/mockData';

const STEPS = [
    { id: 1, title: 'Issue Type', subtitle: 'What problem are you facing?' },
    { id: 2, title: 'Upload Photos', subtitle: 'Help us understand better (optional)' },
    { id: 3, title: 'Your Location', subtitle: 'Where should the mechanic come?' },
    { id: 4, title: 'Schedule', subtitle: 'When do you need service?' },
    { id: 5, title: 'Bike Details', subtitle: 'Tell us about your vehicle' },
    { id: 6, title: 'Service Type', subtitle: 'How would you like to be served?' },
];

export default function BookingWizard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const toast = useToast();

    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState({
        issueType: location.state?.issueType || '',
        otherDescription: '',
        photos: [],
        location: { lat: 22.5726, lng: 88.3639, address: 'Detecting your location...', area: '' },
        schedule: 'immediate',
        scheduleDate: '',
        scheduleTime: '',
        bike: user?.bikes?.[0] || { model: '', year: '', reg: '', brand: '' },
        serviceType: '',
    });

    useEffect(() => {
        // Simulate geolocation
        setTimeout(() => {
            setBooking(prev => ({
                ...prev,
                location: {
                    lat: 22.5726,
                    lng: 88.3639,
                    address: 'Salt Lake, Sector V, Kolkata',
                    area: 'Near Webel More, Bidhannagar'
                }
            }));
        }, 1500);
    }, []);

    const updateBooking = (field, value) => {
        setBooking(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step === 1 && !booking.issueType) return toast.error('Please select an issue type');
        if (step === 5 && !booking.bike.model) return toast.error('Please enter bike model');
        if (step === 6 && !booking.serviceType) return toast.error('Please select a service type');
        if (step < 6) setStep(step + 1);
        else handleSubmit();
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        else navigate(-1);
    };

    const handleSubmit = () => {
        const newBooking = {
            id: 'BK' + Date.now().toString().slice(-6),
            ...booking,
            status: 'pending',
            createdAt: new Date().toISOString(),
            mechanic: null,
            amount: 0,
        };
        const existing = JSON.parse(localStorage.getItem('sha24_bookings') || '[]');
        localStorage.setItem('sha24_bookings', JSON.stringify([newBooking, ...existing]));
        toast.success('Booking placed successfully!');
        navigate('/booking-confirmed', { state: { booking: newBooking } });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (booking.photos.length < 3) {
                updateBooking('photos', [...booking.photos, ev.target.result]);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="wizard-page">
            {/* Header */}
            <div className="wizard-header">
                <button className="btn btn-icon btn-ghost" onClick={prevStep} id="wizard-back">
                    <ArrowLeft size={22} />
                </button>
                <div>
                    <div className="wizard-step-title">{STEPS[step - 1].title}</div>
                    <div className="wizard-step-subtitle">{STEPS[step - 1].subtitle}</div>
                </div>
            </div>

            {/* Stepper */}
            <div className="stepper">
                {STEPS.map((s, i) => (
                    <div key={s.id} className="stepper-step">
                        <div className={`stepper-dot ${i + 1 < step ? 'completed' : i + 1 === step ? 'active' : 'upcoming'}`}>
                            {i + 1 < step ? <Check size={14} /> : i + 1}
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`stepper-line ${i + 1 < step ? 'completed' : 'upcoming'}`}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Step content */}
            <div className="wizard-content">
                {step === 1 && (
                    <div className="issue-grid stagger-children">
                        {ISSUE_TYPES.map(issue => (
                            <button
                                key={issue.id}
                                className={`issue-card animate-fade-in-up ${booking.issueType === issue.id ? 'selected' : ''}`}
                                onClick={() => updateBooking('issueType', issue.id)}
                                style={booking.issueType === issue.id ? { borderColor: 'var(--color-primary)', boxShadow: 'var(--shadow-glow)' } : {}}
                                id={`wizard-issue-${issue.id}`}
                            >
                                <div className="issue-card-icon" style={{ background: `${issue.color}20` }}>
                                    <span>{issue.icon}</span>
                                </div>
                                <span className="issue-card-label">{issue.label}</span>
                            </button>
                        ))}
                        {booking.issueType === 'other' && (
                            <div style={{ gridColumn: '1 / -1' }}>
                                <textarea
                                    className="input-field"
                                    placeholder="Describe your issue..."
                                    value={booking.otherDescription}
                                    onChange={(e) => updateBooking('otherDescription', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="photo-upload-grid">
                            {[0, 1, 2].map(i => (
                                <label key={i} className={`photo-upload-slot ${booking.photos[i] ? 'has-photo' : ''}`}>
                                    {booking.photos[i] ? (
                                        <img src={booking.photos[i]} alt={`Upload ${i + 1}`} />
                                    ) : (
                                        <>
                                            <Camera size={24} color="var(--text-muted)" />
                                            <span className="photo-upload-label">Photo {i + 1}</span>
                                        </>
                                    )}
                                    <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} hidden />
                                </label>
                            ))}
                        </div>
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 'var(--space-md)' }}>
                            Upload up to 3 photos to help the mechanic prepare
                        </p>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div className="map-placeholder">
                            <span style={{ zIndex: 1 }}>📍 Map View</span>
                        </div>
                        <div className="location-display">
                            <div className="location-dot"></div>
                            <div className="location-text">
                                <strong>{booking.location.address || 'Detecting...'}</strong>
                                <p>{booking.location.area || 'Getting precise location...'}</p>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Edit address (optional)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Enter landmark or detailed address"
                                value={booking.location.area}
                                onChange={(e) => updateBooking('location', { ...booking.location, area: e.target.value })}
                                id="location-input"
                            />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="schedule-options">
                        <button
                            className={`schedule-option ${booking.schedule === 'immediate' ? 'selected' : ''}`}
                            onClick={() => updateBooking('schedule', 'immediate')}
                            id="schedule-immediate"
                        >
                            <span className="schedule-option-icon">⚡</span>
                            <div>
                                <h3>Immediate</h3>
                                <p>Get a mechanic ASAP (within 30 mins)</p>
                            </div>
                        </button>
                        <button
                            className={`schedule-option ${booking.schedule === 'today' ? 'selected' : ''}`}
                            onClick={() => { updateBooking('schedule', 'today'); updateBooking('scheduleTime', '16:00'); }}
                            id="schedule-today"
                        >
                            <span className="schedule-option-icon">🕓</span>
                            <div>
                                <h3>Today, 4:00 PM</h3>
                                <p>Schedule for later today</p>
                            </div>
                        </button>
                        <button
                            className={`schedule-option ${booking.schedule === 'tomorrow_am' ? 'selected' : ''}`}
                            onClick={() => { updateBooking('schedule', 'tomorrow_am'); updateBooking('scheduleTime', '10:00'); }}
                            id="schedule-tomorrow-am"
                        >
                            <span className="schedule-option-icon">🌅</span>
                            <div>
                                <h3>Tomorrow, 10:00 AM</h3>
                                <p>First thing tomorrow morning</p>
                            </div>
                        </button>
                        <button
                            className={`schedule-option ${booking.schedule === 'custom' ? 'selected' : ''}`}
                            onClick={() => updateBooking('schedule', 'custom')}
                            id="schedule-custom"
                        >
                            <span className="schedule-option-icon">📅</span>
                            <div>
                                <h3>Choose Date & Time</h3>
                                <p>Pick a specific date and time</p>
                            </div>
                        </button>
                        {booking.schedule === 'custom' && (
                            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>Date</label>
                                    <input type="date" className="input-field" value={booking.scheduleDate}
                                        onChange={(e) => updateBooking('scheduleDate', e.target.value)} />
                                </div>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>Time</label>
                                    <input type="time" className="input-field" value={booking.scheduleTime}
                                        onChange={(e) => updateBooking('scheduleTime', e.target.value)} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 5 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <div className="input-group">
                            <label>Brand</label>
                            <select className="input-field" value={booking.bike.brand}
                                onChange={(e) => updateBooking('bike', { ...booking.bike, brand: e.target.value })}
                                id="bike-brand"
                            >
                                <option value="">Select brand</option>
                                {BIKE_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Model</label>
                            <input type="text" className="input-field" placeholder="e.g. Activa 6G, Pulsar 150"
                                value={booking.bike.model}
                                onChange={(e) => updateBooking('bike', { ...booking.bike, model: e.target.value })}
                                id="bike-model"
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label>Year</label>
                                <input type="number" className="input-field" placeholder="2023"
                                    value={booking.bike.year}
                                    onChange={(e) => updateBooking('bike', { ...booking.bike, year: e.target.value })}
                                    id="bike-year"
                                />
                            </div>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label>Registration No.</label>
                                <input type="text" className="input-field" placeholder="WB 12 AB 1234"
                                    value={booking.bike.reg}
                                    onChange={(e) => updateBooking('bike', { ...booking.bike, reg: e.target.value })}
                                    id="bike-reg"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div>
                        {SERVICE_TYPES.map(svc => (
                            <button
                                key={svc.id}
                                className={`service-type-card ${booking.serviceType === svc.id ? 'selected' : ''}`}
                                onClick={() => updateBooking('serviceType', svc.id)}
                                id={`service-${svc.id}`}
                            >
                                <span className="service-type-icon">{svc.icon}</span>
                                <div className="service-type-info">
                                    <h3>{svc.label}</h3>
                                    <p>{svc.description}</p>
                                </div>
                                <span className="service-type-price">{svc.price}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="wizard-footer">
                {step > 1 && (
                    <button className="btn btn-secondary" onClick={prevStep} id="wizard-prev" style={{ flex: '0 0 auto' }}>
                        Back
                    </button>
                )}
                <button className="btn btn-primary btn-full" onClick={nextStep} id="wizard-next">
                    {step === 6 ? '✅ Confirm Booking' : `Next — ${STEPS[step]?.title || 'Submit'}`}
                    {step < 6 && <ChevronRight size={18} />}
                </button>
            </div>
        </div>
    );
}
