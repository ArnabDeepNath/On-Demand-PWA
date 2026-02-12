import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import './auth.css';

export default function LoginPage() {
    const { login } = useAuth();
    const toast = useToast();
    const [step, setStep] = useState('phone'); // phone | otp | role
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [role, setRole] = useState('');

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (phone.length < 10) return toast.error('Enter a valid phone number');
        toast.success('OTP sent to +91 ' + phone);
        setStep('otp');
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length < 4) return toast.error('Enter 4-digit OTP');
        setStep('role');
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        login({
            id: 'u_' + Date.now(),
            name: selectedRole === 'customer' ? 'Customer' : 'Field Executive',
            phone: '+91 ' + phone,
            role: selectedRole,
            avatar: selectedRole === 'customer' ? 'C' : 'FE',
            bikes: selectedRole === 'customer' ? [
                { id: 'b1', model: 'Honda Activa 6G', year: 2023, reg: 'WB 12 AB 1234' }
            ] : [],
        });
        toast.success('Welcome to SHA24!');
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="auth-bg-circle auth-bg-circle-1"></div>
                <div className="auth-bg-circle auth-bg-circle-2"></div>
                <div className="auth-bg-circle auth-bg-circle-3"></div>
            </div>

            <div className="auth-container">
                <div className="auth-logo animate-fade-in-up">
                    <div className="auth-logo-icon">
                        <span className="gradient-text">SHA</span>
                        <span className="gradient-text" style={{ fontSize: '2rem' }}>24</span>
                    </div>
                    <p className="auth-tagline">Bike Mechanic On Demand</p>
                </div>

                {step === 'phone' && (
                    <form className="auth-form animate-fade-in-up" onSubmit={handleSendOTP} style={{ animationDelay: '100ms' }}>
                        <h2>Welcome Back</h2>
                        <p className="auth-subtitle">Enter your phone number to continue</p>

                        <div className="phone-input-wrapper">
                            <span className="phone-prefix">🇮🇳 +91</span>
                            <input
                                type="tel"
                                className="input-field phone-input"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                autoFocus
                                id="phone-input"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg btn-full" id="send-otp-btn">
                            Send OTP
                        </button>

                        <p className="auth-terms">
                            By continuing, you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>
                        </p>
                    </form>
                )}

                {step === 'otp' && (
                    <form className="auth-form animate-fade-in-up" onSubmit={handleVerifyOTP}>
                        <h2>Verify OTP</h2>
                        <p className="auth-subtitle">Enter the 4-digit code sent to +91 {phone}</p>

                        <div className="otp-inputs">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="tel"
                                    className="otp-input"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    autoFocus={i === 0}
                                />
                            ))}
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg btn-full" id="verify-otp-btn">
                            Verify & Continue
                        </button>

                        <button type="button" className="btn btn-ghost btn-full" onClick={() => setStep('phone')}>
                            Change Number
                        </button>
                    </form>
                )}

                {step === 'role' && (
                    <div className="auth-form animate-fade-in-up">
                        <h2>Choose Your Role</h2>
                        <p className="auth-subtitle">How would you like to use SHA24?</p>

                        <div className="role-cards">
                            <button className="role-card" onClick={() => handleRoleSelect('customer')} id="role-customer">
                                <div className="role-icon">🏍️</div>
                                <h3>Customer</h3>
                                <p>Book mechanics, track repairs, manage your bikes</p>
                            </button>

                            <button className="role-card" onClick={() => handleRoleSelect('agent')} id="role-agent">
                                <div className="role-icon">🛠️</div>
                                <h3>Field Executive</h3>
                                <p>Manage tasks, onboard mechanics, order spare parts</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
