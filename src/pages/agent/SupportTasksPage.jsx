import { useState } from 'react';
import { MOCK_AGENT_TASKS, STATUS_CONFIG } from '../../data/mockData';
import { MapPin, Phone, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function SupportTasksPage() {
    const toast = useToast();
    const [filter, setFilter] = useState('all');
    const [tasks, setTasks] = useState(MOCK_AGENT_TASKS);

    const filtered = filter === 'all' ? tasks : tasks.filter(t => t.type === filter);
    const priorityIcon = { high: '🔴', medium: '🟡', low: '🟢' };

    const markComplete = (taskId) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
        toast.success('Task marked as completed');
    };

    return (
        <div className="container" style={{ paddingTop: 'var(--space-md)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)' }}>Support Tasks</h2>

            <div className="filter-tabs">
                {['all', 'complaint', 'support', 'onboarding', 'delivery'].map(f => (
                    <button
                        key={f}
                        className={`filter-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {filtered.length === 0 ? (
                    <div className="empty-state">
                        <span style={{ fontSize: '3rem' }}>✅</span>
                        <p>No tasks in this category</p>
                    </div>
                ) : (
                    filtered.map((task, idx) => {
                        const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending;
                        return (
                            <div key={task.id} className="support-card animate-fade-in-up" style={{ animationDelay: `${idx * 60}ms` }}>
                                <div className="support-card-header">
                                    <div>
                                        <h4>{task.title}</h4>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {priorityIcon[task.priority]} {task.priority} priority
                                            <span>•</span>
                                            <MapPin size={12} /> {task.location}
                                        </p>
                                    </div>
                                    <span className="status-chip" style={{ background: status.bg, color: status.color }}>
                                        {status.label}
                                    </span>
                                </div>

                                {(task.customer || task.mechanic) && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 'var(--space-md)',
                                        padding: 'var(--space-md)', background: 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)'
                                    }}>
                                        <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.7rem' }}>
                                            {(task.customer || task.mechanic)[0]}
                                        </div>
                                        <div>
                                            <strong style={{ fontSize: '0.85rem' }}>{task.customer || task.mechanic}</strong>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                {task.customer ? 'Customer' : 'Mechanic'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {task.status !== 'completed' && (
                                    <div className="support-card-actions">
                                        <button className="btn btn-secondary btn-sm">
                                            <Phone size={14} /> Call
                                        </button>
                                        <button className="btn btn-secondary btn-sm">
                                            <MessageSquare size={14} /> Message
                                        </button>
                                        <button className="btn btn-primary btn-sm" onClick={() => markComplete(task.id)}>
                                            <CheckCircle size={14} /> Complete
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Live Status Indicator */}
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
                <span className="live-indicator">📡 Live reporting to HQ</span>
            </div>
        </div>
    );
}
