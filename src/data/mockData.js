// Mock data for SHA24 PWA

export const ISSUE_TYPES = [
    { id: 'engine', label: 'Engine Issue', icon: '⚙️', color: '#FF6B00' },
    { id: 'tyre', label: 'Tyre Puncture', icon: '🔧', color: '#3B82F6' },
    { id: 'battery', label: 'Battery Problem', icon: '🔋', color: '#22C55E' },
    { id: 'brake', label: 'Brake Failure', icon: '🛑', color: '#EF4444' },
    { id: 'chain', label: 'Chain Issue', icon: '⛓️', color: '#FBBF24' },
    { id: 'electrical', label: 'Electrical Problem', icon: '💡', color: '#8B5CF6' },
    { id: 'service', label: 'Regular Service', icon: '🛢️', color: '#00D4AA' },
    { id: 'accident', label: 'Accident / Towed', icon: '🚨', color: '#F43F5E' },
    { id: 'other', label: 'Other Issue', icon: '📝', color: '#64748B' },
];

export const SERVICE_TYPES = [
    { id: 'onspot', label: 'On-spot Repair', description: 'Mechanic comes to your location', icon: '📍', price: 'From ₹149' },
    { id: 'tow', label: 'Tow to Workshop', description: 'Vehicle towed to nearest workshop', icon: '🚛', price: 'From ₹299' },
    { id: 'pickup', label: 'Pickup & Drop', description: 'We pick up, repair & deliver', icon: '🏠', price: 'From ₹399' },
];

export const SPARE_PARTS = [
    { id: 'sp1', name: 'Engine Oil (1L)', category: 'Engine', price: 320, stock: 150, fastMoving: true, image: '🛢️' },
    { id: 'sp2', name: 'Brake Cable', category: 'Brake', price: 180, stock: 85, fastMoving: true, image: '🔗' },
    { id: 'sp3', name: 'Brake Pad Set', category: 'Brake', price: 450, stock: 60, fastMoving: true, image: '🛑' },
    { id: 'sp4', name: 'Chain Sprocket Kit', category: 'Chain', price: 850, stock: 40, fastMoving: true, image: '⛓️' },
    { id: 'sp5', name: 'Indicator Assembly', category: 'Electrical', price: 280, stock: 70, fastMoving: true, image: '💡' },
    { id: 'sp6', name: 'Spark Plug', category: 'Engine', price: 120, stock: 200, fastMoving: true, image: '⚡' },
    { id: 'sp7', name: 'Air Filter', category: 'Engine', price: 250, stock: 90, fastMoving: false, image: '🌬️' },
    { id: 'sp8', name: 'Battery (12V)', category: 'Electrical', price: 1200, stock: 30, fastMoving: false, image: '🔋' },
    { id: 'sp9', name: 'Clutch Cable', category: 'Transmission', price: 200, stock: 55, fastMoving: false, image: '🔗' },
    { id: 'sp10', name: 'Headlight Bulb', category: 'Electrical', price: 150, stock: 120, fastMoving: true, image: '💡' },
    { id: 'sp11', name: 'Tyre Tube', category: 'Tyre', price: 350, stock: 80, fastMoving: true, image: '⭕' },
    { id: 'sp12', name: 'Side Mirror', category: 'Body', price: 380, stock: 45, fastMoving: false, image: '🪞' },
];

export const BIKE_BRANDS = [
    'Hero', 'Honda', 'Bajaj', 'TVS', 'Royal Enfield', 'Yamaha', 'Suzuki', 'KTM', 'Kawasaki', 'Mahindra'
];

export const MOCK_BOOKINGS = [
    {
        id: 'BK001',
        issueType: 'tyre',
        serviceType: 'onspot',
        status: 'in_progress',
        mechanic: { name: 'Ravi Kumar', phone: '+91 98765 43210', rating: 4.8 },
        bike: { model: 'Honda Activa 6G', year: 2023, reg: 'WB 12 AB 1234' },
        location: 'Salt Lake, Kolkata',
        scheduledAt: '2026-02-12T10:00:00',
        createdAt: '2026-02-12T09:30:00',
        amount: 249,
    },
    {
        id: 'BK002',
        issueType: 'service',
        serviceType: 'pickup',
        status: 'completed',
        mechanic: { name: 'Amit Sharma', phone: '+91 87654 32109', rating: 4.5 },
        bike: { model: 'Royal Enfield Classic 350', year: 2022, reg: 'WB 14 CD 5678' },
        location: 'Park Street, Kolkata',
        scheduledAt: '2026-02-10T14:00:00',
        createdAt: '2026-02-10T12:00:00',
        amount: 899,
    },
    {
        id: 'BK003',
        issueType: 'battery',
        serviceType: 'onspot',
        status: 'pending',
        mechanic: null,
        bike: { model: 'Bajaj Pulsar 150', year: 2021, reg: 'WB 09 EF 9012' },
        location: 'New Town, Kolkata',
        scheduledAt: '2026-02-13T09:00:00',
        createdAt: '2026-02-12T08:00:00',
        amount: 0,
    },
];

export const MOCK_AGENT_TASKS = [
    { id: 'T001', type: 'complaint', title: 'Service delay complaint', customer: 'Rahul Das', location: 'Howrah', priority: 'high', status: 'pending' },
    { id: 'T002', type: 'onboarding', title: 'New mechanic verification', mechanic: 'Suresh Pal', location: 'Dum Dum', priority: 'medium', status: 'in_progress' },
    { id: 'T003', type: 'support', title: 'Mechanic tool assistance', mechanic: 'Kamal Roy', location: 'Baguiati', priority: 'low', status: 'pending' },
    { id: 'T004', type: 'delivery', title: 'Spare parts delivery follow-up', mechanic: 'Raj Mondal', location: 'Rajarhat', priority: 'medium', status: 'completed' },
    { id: 'T005', type: 'complaint', title: 'Refund request - incomplete service', customer: 'Priya Sen', location: 'Salt Lake', priority: 'high', status: 'pending' },
];

export const STATUS_CONFIG = {
    pending: { label: 'Pending', color: '#FBBF24', bg: 'rgba(251,191,36,0.15)' },
    confirmed: { label: 'Confirmed', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
    in_progress: { label: 'In Progress', color: '#FF6B00', bg: 'rgba(255,107,0,0.15)' },
    completed: { label: 'Completed', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
    cancelled: { label: 'Cancelled', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
};
