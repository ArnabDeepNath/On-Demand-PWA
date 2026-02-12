import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, Search, Clock, User, Wrench, Package, UserPlus, LayoutDashboard, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export function CustomerLayout() {
    return (
        <>
            <TopBar />
            <main className="page">
                <Outlet />
            </main>
            <nav className="bottom-nav">
                <NavLink to="/home" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-home">
                    <Home /> <span>Home</span>
                </NavLink>
                <NavLink to="/search" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-search">
                    <Search /> <span>Search</span>
                </NavLink>
                <NavLink to="/bookings" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-bookings">
                    <Clock /> <span>Bookings</span>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-profile">
                    <User /> <span>Profile</span>
                </NavLink>
            </nav>
        </>
    );
}

export function AgentLayout() {
    return (
        <>
            <TopBar />
            <main className="page">
                <Outlet />
            </main>
            <nav className="bottom-nav">
                <NavLink to="/agent" end className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-agent-dash">
                    <LayoutDashboard /> <span>Dashboard</span>
                </NavLink>
                <NavLink to="/agent/onboard" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-agent-onboard">
                    <UserPlus /> <span>Onboard</span>
                </NavLink>
                <NavLink to="/agent/parts" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-agent-parts">
                    <Package /> <span>Parts</span>
                </NavLink>
                <NavLink to="/agent/support" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} id="nav-agent-support">
                    <Wrench /> <span>Support</span>
                </NavLink>
            </nav>
        </>
    );
}

function TopBar() {
    const { user, logout } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.info('Logged out');
        navigate('/');
    };

    return (
        <header className="top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="top-bar-title gradient-text" style={{ fontFamily: 'var(--font-heading)', fontWeight: 900 }}>SHA24</span>
                {user?.role === 'agent' && (
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>AGENT</span>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button className="btn btn-icon btn-ghost" aria-label="Notifications" id="btn-notifications">
                    <Bell size={20} />
                </button>
                <button className="btn btn-icon btn-ghost" onClick={handleLogout} aria-label="Logout" id="btn-logout">
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
}
