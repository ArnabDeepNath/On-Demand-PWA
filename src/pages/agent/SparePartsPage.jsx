import { useState } from 'react';
import { Search, ShoppingCart, Plus, Minus, Filter } from 'lucide-react';
import { SPARE_PARTS } from '../../data/mockData';
import { useToast } from '../../contexts/ToastContext';

export default function SparePartsPage() {
    const toast = useToast();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [cart, setCart] = useState({});

    const categories = ['all', 'fast-moving', ...new Set(SPARE_PARTS.map(p => p.category))];

    const filtered = SPARE_PARTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' ? true
            : filter === 'fast-moving' ? p.fastMoving
                : p.category === filter;
        return matchesSearch && matchesFilter;
    });

    const updateQty = (id, delta) => {
        setCart(prev => {
            const qty = (prev[id] || 0) + delta;
            if (qty <= 0) { const next = { ...prev }; delete next[id]; return next; }
            return { ...prev, [id]: qty };
        });
    };

    const cartItems = Object.entries(cart);
    const cartTotal = cartItems.reduce((sum, [id, qty]) => {
        const part = SPARE_PARTS.find(p => p.id === id);
        return sum + (part?.price || 0) * qty;
    }, 0);
    const cartCount = cartItems.reduce((sum, [_, qty]) => sum + qty, 0);

    const placeOrder = () => {
        if (cartCount === 0) return toast.error('Cart is empty');
        const order = {
            id: 'PO' + Date.now().toString().slice(-6),
            items: cartItems.map(([id, qty]) => ({ ...SPARE_PARTS.find(p => p.id === id), qty })),
            total: cartTotal,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        const orders = JSON.parse(localStorage.getItem('sha24_part_orders') || '[]');
        orders.push(order);
        localStorage.setItem('sha24_part_orders', JSON.stringify(orders));
        setCart({});
        toast.success(`Order #${order.id} placed! Total: ₹${cartTotal}`);
    };

    return (
        <div>
            {/* Search & Filter */}
            <div className="parts-header">
                <div className="parts-search">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search spare parts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ paddingLeft: '40px', width: '100%' }}
                        id="parts-search"
                    />
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
            </div>

            {/* Category filter */}
            <div className="filter-tabs" style={{ paddingLeft: 'var(--space-md)' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-tab ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat === 'fast-moving' ? '🔥 Fast Moving' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Parts Grid */}
            <div className="parts-grid stagger-children" style={{ paddingBottom: cartCount > 0 ? '120px' : 'var(--space-lg)' }}>
                {filtered.map((part, idx) => (
                    <div key={part.id} className="part-card animate-fade-in-up" style={{ animationDelay: `${idx * 40}ms` }}>
                        <div className="part-icon">{part.image}</div>
                        <div className="part-name">{part.name}</div>
                        <div className="part-category">{part.category}</div>
                        <div className="part-price">₹{part.price}</div>
                        <div className={`part-stock ${part.stock > 50 ? 'in-stock' : 'low-stock'}`}>
                            {part.stock > 50 ? `In Stock (${part.stock})` : `Low Stock (${part.stock})`}
                        </div>
                        <div className="part-actions">
                            {cart[part.id] ? (
                                <div className="qty-control">
                                    <button type="button" className="qty-btn" onClick={() => updateQty(part.id, -1)}>
                                        <Minus size={14} />
                                    </button>
                                    <span className="qty-value">{cart[part.id]}</span>
                                    <button type="button" className="qty-btn" onClick={() => updateQty(part.id, 1)}>
                                        <Plus size={14} />
                                    </button>
                                </div>
                            ) : (
                                <button className="btn btn-primary btn-sm" onClick={() => updateQty(part.id, 1)}>
                                    <Plus size={14} /> Add
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart bar */}
            {cartCount > 0 && (
                <div className="cart-bar">
                    <div className="cart-bar-info">
                        <span className="cart-bar-items">{cartCount} item{cartCount > 1 ? 's' : ''}</span>
                        <span className="cart-bar-total">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <button className="btn btn-lg" style={{ background: 'white', color: 'var(--color-primary)', fontWeight: 700 }}
                        onClick={placeOrder} id="place-order-btn">
                        <ShoppingCart size={18} /> Place Order
                    </button>
                </div>
            )}
        </div>
    );
}
