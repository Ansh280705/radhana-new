'use client';
import { useState, useEffect } from 'react';
import { Search, Eye, ChevronDown, Package, User, Clock, ShoppingCart, X } from 'lucide-react';
import { ordersAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await ordersAPI.getAll();
      setOrders(res.data.orders || []);
    } catch { toast.error('Failed to load orders'); }
    finally { setLoading(false); }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await ordersAPI.updateStatus(id, { status });
      toast.success('Status updated');
      fetchOrders();
      if (selectedOrder?.id === id) setSelectedOrder({...selectedOrder, status});
    } catch { toast.error('Update failed'); }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>Orders</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage customer orders and shipments</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedOrder ? '1fr 400px' : '1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 800, borderCollapse: 'collapse' }}>
              <thead style={{ background: 'var(--cream)' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ORDER</th>
                  <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CUSTOMER</th>
                  <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>TOTAL</th>
                  <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>STATUS</th>
                  <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>VIEW</th>
                </tr>
              </thead>
              <tbody>
                {loading ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={5} style={{ padding: 20 }}><div className="skeleton" style={{ height: 40 }} /></td></tr>) : 
                  orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)', background: selectedOrder?.id === order.id ? 'var(--beige)' : 'none' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.88rem' }}>#{order.id.slice(-8).toUpperCase()}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>{order.user?.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{order.user?.email}</p>
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--gold)' }}>₹{order.totalAmount}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <select 
                        value={order.status} 
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        style={{ padding: '6px 12px', borderRadius: 50, border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', background: 'white' }}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button onClick={() => setSelectedOrder(order)} style={{ background: 'none', border: 'none', color: 'var(--dark)', cursor: 'pointer' }}><Eye size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 28, position: 'sticky', top: 90 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
               <h2 style={{ fontWeight: 800 }}>Order Details</h2>
               <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
             </div>

             <div style={{ marginBottom: 24 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                 <User size={16} style={{ color: 'var(--gold)' }} />
                 <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Customer Info</span>
               </div>
               <div style={{ padding: 16, background: 'var(--beige)', borderRadius: 12 }}>
                 <p style={{ fontWeight: 700, fontSize: '0.88rem' }}>{selectedOrder.user?.name}</p>
                 <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedOrder.user?.email}</p>
               </div>
             </div>

             <div style={{ marginBottom: 24 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                 <Package size={16} style={{ color: 'var(--gold)' }} />
                 <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Items</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                 {selectedOrder.items?.map((item: any) => (
                   <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                     <span>{item.product?.name} <strong>×{item.quantity}</strong></span>
                     <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                   </div>
                 ))}
               </div>
             </div>

             <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                 <span>Subtotal</span>
                 <span>₹{selectedOrder.totalAmount + selectedOrder.discountAmount}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, color: 'var(--red)', fontSize: '0.9rem' }}>
                 <span>Discount</span>
                 <span>-₹{selectedOrder.discountAmount}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--border)', paddingTop: 12, fontWeight: 800, fontSize: '1.1rem' }}>
                 <span>Total</span>
                 <span style={{ color: 'var(--gold)' }}>₹{selectedOrder.totalAmount}</span>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
