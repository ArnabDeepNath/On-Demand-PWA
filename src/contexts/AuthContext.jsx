import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('sha24_user');
        if (stored) {
            try { setUser(JSON.parse(stored)); } catch { }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        const u = { ...userData, loggedInAt: new Date().toISOString() };
        setUser(u);
        localStorage.setItem('sha24_user', JSON.stringify(u));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sha24_user');
    };

    const updateProfile = (updates) => {
        const u = { ...user, ...updates };
        setUser(u);
        localStorage.setItem('sha24_user', JSON.stringify(u));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
