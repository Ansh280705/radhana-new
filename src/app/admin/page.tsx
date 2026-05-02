'use client';
import { useEffect, useState } from 'react';
import { Users, ShoppingCart, Package, TrendingUp, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { adminAPI } from '@/lib/api';

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b', CONFIRMED: '#3b82f6', PROCESSING: '#8b5cf6',
  SHIPPED: '#06b6d4', DELIVERED: '#10b981', CANCELLED: '#ef4444',
};

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.analytics().then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Revenue', value: `₹${(data?.stats?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign size={22} />, color: '#10b981', bg: '#dcfce7' },
    { label: 'Total Orders', value: data?.stats?.totalOrders || 0, icon: <ShoppingCart size={22} />, color: '#3b82f6', bg: '#dbeafe' },
    { label: 'Total Users', value: data?.stats?.totalUsers || 0, icon: <Users size={22} />, color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Total Products', value: data?.stats?.totalProducts || 0, icon: <Package size={22} />, color: '#f59e0b', bg: '#fef3c7' },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>Overview of your store performance</p>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {stats.map(({ label, value, icon, color, bg }) => (
          <div key={label} style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border)', padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
              {loading ? <div className="skeleton" style={{ width: 22, height: 22, borderRadius: '50%' }} /> : icon}
            </div>
            <div>
              {loading ? <div className="skeleton" style={{ height: 28, width: 80, borderRadius: 6, marginBottom: 6 }} /> : <p style={{ fontWeight: 800, fontSize: '1.6rem', lineHeight: 1 }}>{value}</p>}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 4 }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 28 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>Recent Orders</h2>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 10 }} />)}</div>
        ) : data?.recentOrders?.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  {['Order ID', 'Customer', 'Items', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order: any) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--beige)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    <td style={{ padding: '14px 12px', fontWeight: 700, fontSize: '0.88rem' }}>#{order.id.slice(-8).toUpperCase()}</td>
                    <td style={{ padding: '14px 12px', fontSize: '0.88rem' }}>{order.user?.name}</td>
                    <td style={{ padding: '14px 12px', fontSize: '0.88rem' }}>{order.items?.length}</td>
                    <td style={{ padding: '14px 12px', fontWeight: 700, color: 'var(--gold)' }}>₹{order.totalAmount.toLocaleString()}</td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status], padding: '4px 12px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700 }}>{order.status}</span>
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
            <ShoppingCart size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
