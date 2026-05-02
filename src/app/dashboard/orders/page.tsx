'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ShoppingBag, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { ordersAPI } from '@/lib/api';

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b', CONFIRMED: '#3b82f6', PROCESSING: '#8b5cf6',
  SHIPPED: '#06b6d4', DELIVERED: '#10b981', CANCELLED: '#ef4444', RETURNED: '#6b7280',
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    ordersAPI.getAll({ limit: 50 }).then(r => setOrders(r.data.orders || [])).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  return (
    <>
      <Navbar />
      <main style={{ padding: '32px 0 60px', minHeight: '80vh', background: 'var(--beige)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
            <ChevronRight size={14} style={{ color: 'var(--text-secondary)' }} />
            <span style={{ fontWeight: 700 }}>My Orders</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}>My Orders</h1>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 16 }} />)}</div>
          ) : orders.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: selectedOrder ? '1fr 400px' : '1fr', gap: 20, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {orders.map(order => (
                  <div key={order.id} onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)} style={{ background: 'white', borderRadius: 16, border: `2px solid ${selectedOrder?.id === order.id ? 'var(--gold)' : 'var(--border)'}`, padding: 24, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { if (selectedOrder?.id !== order.id) e.currentTarget.style.borderColor = 'var(--gold)'; }}
                    onMouseLeave={e => { if (selectedOrder?.id !== order.id) e.currentTarget.style.borderColor = 'var(--border)'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--beige)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                          <Package size={22} />
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Order #{order.id.slice(-8).toUpperCase()}</p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{order.items?.length || 0} item(s)</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'inline-block', background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status], padding: '5px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>{order.status}</span>
                        <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gold)' }}>₹{order.totalAmount.toLocaleString()}</p>
                        <p style={{ fontSize: '0.75rem', color: order.paymentStatus === 'PAID' ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>{order.paymentStatus}</p>
                      </div>
                    </div>
                    {/* Items preview */}
                    {order.items?.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                        {order.items.slice(0, 3).map((item: any) => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--beige)', borderRadius: 8, padding: '4px 10px', fontSize: '0.8rem' }}>
                            <span>{item.product?.name?.slice(0, 20)}...</span>
                            <span style={{ color: 'var(--text-secondary)' }}>×{item.quantity}</span>
                          </div>
                        ))}
                        {order.items.length > 3 && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>+{order.items.length - 3} more</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Order Detail Panel */}
              {selectedOrder && (
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 24, position: 'sticky', top: 90 }}>
                  <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Order #{selectedOrder.id.slice(-8).toUpperCase()}</h3>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontWeight: 600, marginBottom: 8, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>DELIVERY ADDRESS</p>
                    {selectedOrder.address && (
                      <div style={{ padding: 14, background: 'var(--beige)', borderRadius: 12, fontSize: '0.88rem' }}>
                        <p style={{ fontWeight: 700 }}>{selectedOrder.address.name}</p>
                        <p style={{ color: 'var(--text-secondary)' }}>{selectedOrder.address.line1}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
                        <p style={{ color: 'var(--text-secondary)' }}>{selectedOrder.address.phone}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: 8, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>ITEMS</p>
                    {selectedOrder.items?.map((item: any) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.88rem' }}>
                        <div>
                          <p style={{ fontWeight: 600 }}>{item.product?.name}</p>
                          {item.size && <span className="tag" style={{ marginRight: 4 }}>Size: {item.size}</span>}
                          <p style={{ color: 'var(--text-secondary)', marginTop: 2 }}>Qty: {item.quantity}</p>
                        </div>
                        <p style={{ fontWeight: 700 }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--gold)' }}>₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>📦</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>No orders yet</h3>
              <Link href="/products"><button className="btn-gold" style={{ marginTop: 16 }}>Start Shopping</button></Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
