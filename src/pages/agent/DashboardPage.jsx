import { MOCK_AGENT_TASKS, STATUS_CONFIG } from '../../data/mockData';
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, MapPin, Target, ChevronRight } from 'lucide-react';
import './agent.css';

export default function DashboardPage() {
    const tasks = MOCK_AGENT_TASKS;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;

    const priorityIcon = { high: '🔴', medium: '🟡', low: '🟢' };
    const typeIcon = { complaint: '📋', onboarding: '👤', support: '🛠️', delivery: '📦' };

    return (
        <div className="container" style={{ paddingTop: 'var(--space-md)' }}>
            {/* Greeting */}
            <div className="agent-greeting animate-fade-in-up">
                <h2>Good Morning 👋</h2>
                <p>Here's your daily overview</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid stagger-children">
                <div className="stat-card animate-fade-in-up" style={{ '--accent': 'var(--color-primary)' }}>
                    <div className="stat-icon"><Target size={20} /></div>
                    <div className="stat-value">{tasks.length}</div>
                    <div className="stat-label">Total Tasks</div>
                </div>
                <div className="stat-card animate-fade-in-up" style={{ '--accent': 'var(--color-warning)' }}>
                    <div className="stat-icon"><Clock size={20} /></div>
                    <div className="stat-value">{pending}</div>
                    <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card animate-fade-in-up" style={{ '--accent': 'var(--color-info)' }}>
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-value">{inProgress}</div>
                    <div className="stat-label">In Progress</div>
                </div>
                <div className="stat-card animate-fade-in-up" style={{ '--accent': 'var(--color-success)' }}>
                    <div className="stat-icon"><CheckCircle2 size={20} /></div>
                    <div className="stat-value">{completed}</div>
                    <div className="stat-label">Completed</div>
                </div>
            </div>

            {/* Marketing Targets */}
            <div className="section">
                <div className="section-title"><span>📊 Marketing Targets</span></div>
                <div className="target-card animate-fade-in-up">
                    <div className="target-header">
                        <span>Mechanic Onboarding</span>
                        <strong>7 / 10</strong>
                    </div>
                    <div className="target-bar">
                        <div className="target-bar-fill" style={{ width: '70%' }}></div>
                    </div>
                </div>
                <div className="target-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="target-header">
                        <span>Customer Registrations</span>
                        <strong>23 / 50</strong>
                    </div>
                    <div className="target-bar">
                        <div className="target-bar-fill" style={{ width: '46%', background: 'var(--color-accent)' }}></div>
                    </div>
                </div>
                <div className="target-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="target-header">
                        <span>Parts Orders Placed</span>
                        <strong>15 / 20</strong>
                    </div>
                    <div className="target-bar">
                        <div className="target-bar-fill" style={{ width: '75%', background: 'var(--color-info)' }}></div>
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="section">
                <div className="section-title">
                    <span>📋 Today's Tasks</span>
                    <a href="#">View all <ChevronRight size={14} style={{ display: 'inline' }} /></a>
                </div>
                <div className="task-list stagger-children">
                    {tasks.map((task, idx) => {
                        const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending;
                        return (
                            <div key={task.id} className="task-card animate-fade-in-up" style={{ animationDelay: `${idx * 60}ms` }}>
                                <div className="task-card-left">
                                    <span className="task-type-icon">{typeIcon[task.type]}</span>
                                    <div>
                                        <strong>{task.title}</strong>
                                        <div className="task-meta">
                                            <span>{priorityIcon[task.priority]} {task.priority}</span>
                                            <span><MapPin size={10} /> {task.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="status-chip" style={{ background: status.bg, color: status.color, fontSize: '0.7rem' }}>
                                    {status.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
