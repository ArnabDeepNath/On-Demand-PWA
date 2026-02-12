import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { Camera, Upload, Check, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TOOLKIT_ITEMS = [
    'Screwdriver Set', 'Wrench Set', 'Pliers', 'Tyre Repair Kit',
    'Multimeter', 'Spark Plug Wrench', 'Chain Breaker', 'Air Pump',
    'Puncture Kit', 'Basic Spare Parts', 'First Aid Kit'
];

export default function MechanicOnboarding() {
    const navigate = useNavigate();
    const toast = useToast();
    const [form, setForm] = useState({
        name: '', phone: '', aadhaar: '', license: '',
        photo: null, livePhoto: null,
        toolkit: {},
        location: { lat: 22.5726, lng: 88.3639 }
    });

    const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
    const toggleTool = (tool) => setForm(prev => ({
        ...prev,
        toolkit: { ...prev.toolkit, [tool]: !prev.toolkit[tool] }
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.phone) return toast.error('Name and phone are required');
        const mechanics = JSON.parse(localStorage.getItem('sha24_mechanics') || '[]');
        mechanics.push({ ...form, id: 'M' + Date.now(), createdAt: new Date().toISOString(), status: 'pending_verification' });
        localStorage.setItem('sha24_mechanics', JSON.stringify(mechanics));
        toast.success('Mechanic submitted for verification!');
        navigate('/agent');
    };

    return (
        <div>
            <div className="wizard-header" style={{ padding: 'var(--space-md)' }}>
                <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
                    <ArrowLeft size={22} />
                </button>
                <div>
                    <div className="wizard-step-title">New Mechanic Onboarding</div>
                    <div className="wizard-step-subtitle">Collect details for verification</div>
                </div>
            </div>

            <form className="onboard-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Full Name *</label>
                    <input type="text" className="input-field" placeholder="Mechanic's full name"
                        value={form.name} onChange={(e) => updateField('name', e.target.value)} id="mech-name" />
                </div>
                <div className="input-group">
                    <label>Phone Number *</label>
                    <input type="tel" className="input-field" placeholder="+91 XXXXX XXXXX"
                        value={form.phone} onChange={(e) => updateField('phone', e.target.value)} id="mech-phone" />
                </div>

                {/* Document Upload */}
                <div className="section-title" style={{ marginTop: 'var(--space-md)' }}>
                    <span>📄 Documents</span>
                </div>

                <label className={`doc-upload-card ${form.aadhaar ? 'uploaded' : ''}`}>
                    <div className="doc-icon" style={{ background: 'rgba(255,107,0,0.15)' }}>🪪</div>
                    <div className="doc-info">
                        <h4>Aadhaar Card</h4>
                        <p>{form.aadhaar ? '✅ Uploaded' : 'Tap to upload front & back'}</p>
                    </div>
                    <input type="file" accept="image/*" hidden onChange={() => updateField('aadhaar', 'uploaded')} />
                </label>

                <label className={`doc-upload-card ${form.license ? 'uploaded' : ''}`}>
                    <div className="doc-icon" style={{ background: 'rgba(0,212,170,0.15)' }}>🪪</div>
                    <div className="doc-info">
                        <h4>Driving License</h4>
                        <p>{form.license ? '✅ Uploaded' : 'Tap to upload'}</p>
                    </div>
                    <input type="file" accept="image/*" hidden onChange={() => updateField('license', 'uploaded')} />
                </label>

                <label className={`doc-upload-card ${form.livePhoto ? 'uploaded' : ''}`}>
                    <div className="doc-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>📸</div>
                    <div className="doc-info">
                        <h4>Live Photo (GPS Tagged)</h4>
                        <p>{form.livePhoto ? '✅ Captured' : 'Capture mechanic\'s live photo'}</p>
                    </div>
                    <input type="file" accept="image/*" capture="user" hidden onChange={() => updateField('livePhoto', 'captured')} />
                </label>

                {/* GPS Location */}
                <div className="location-display" style={{ marginTop: 'var(--space-sm)' }}>
                    <div className="location-dot"></div>
                    <div className="location-text">
                        <strong>GPS Location Captured</strong>
                        <p>Lat: {form.location.lat.toFixed(4)}, Lng: {form.location.lng.toFixed(4)}</p>
                    </div>
                    <span className="live-indicator">Live</span>
                </div>

                {/* Toolkit Checklist */}
                <div className="section-title" style={{ marginTop: 'var(--space-md)' }}>
                    <span>🧰 Basic Toolkit Check</span>
                </div>
                <div className="toolkit-checklist">
                    {TOOLKIT_ITEMS.map(tool => (
                        <button
                            key={tool}
                            type="button"
                            className={`toolkit-item ${form.toolkit[tool] ? 'checked' : ''}`}
                            onClick={() => toggleTool(tool)}
                        >
                            <div className="toolkit-checkbox">
                                {form.toolkit[tool] && <Check size={14} color="white" />}
                            </div>
                            <span className="toolkit-label">{tool}</span>
                        </button>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-full" id="submit-mechanic"
                    style={{ marginTop: 'var(--space-lg)' }}>
                    <Upload size={18} /> Submit for Verification
                </button>
            </form>
        </div>
    );
}
