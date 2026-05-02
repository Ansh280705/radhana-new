'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Ticket, X, Calendar } from 'lucide-react';
import { couponsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ code: '', discountType: 'PERCENTAGE', discountValue: '', minOrderValue: '0', isActive: true });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await couponsAPI.getAll();
      setCoupons(res.data || []);
    } catch { toast.error('Failed to load coupons'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await couponsAPI.create({
        ...form,
        discountValue: parseFloat(form.discountValue),
        minOrderValue: parseFloat(form.minOrderValue)
      });
      toast.success('Coupon created');
      setIsModalOpen(false);
      setForm({ code: '', discountType: 'PERCENTAGE', discountValue: '', minOrderValue: '0', isActive: true });
      fetchCoupons();
    } catch { toast.error('Creation failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await couponsAPI.delete(id);
      toast.success('Deleted');
      fetchCoupons();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>Coupons</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage discounts and offers</p>
        </div>
        <button className="btn-gold" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={18} /> Create Coupon
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 140, borderRadius: 20 }} />) : 
          coupons.map(coupon => (
          <div key={coupon.id} style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 24, position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: 6, height: '100%', background: 'var(--gold)' }} />
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                   <Ticket size={16} style={{ color: 'var(--gold)' }} />
                   <h3 style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px' }}>{coupon.code}</h3>
                 </div>
                 <p style={{ fontWeight: 600, color: 'var(--green)', fontSize: '0.9rem' }}>
                   {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                 </p>
               </div>
               <button onClick={() => handleDelete(coupon.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer' }}>
                 <Trash2 size={18} />
               </button>
             </div>
             <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
               <span>Min Order: ₹{coupon.minOrderValue}</span>
               <span>Used: {coupon.usedCount} times</span>
             </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 450, padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>New Coupon</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Code</label>
                <input className="input-field" required value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="e.g. FESTIVAL20" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Type</label>
                  <select className="input-field" value={form.discountType} onChange={e => setForm({...form, discountType: e.target.value})}>
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="FLAT">Flat Amount</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Value</label>
                  <input className="input-field" type="number" required value={form.discountValue} onChange={e => setForm({...form, discountValue: e.target.value})} />
                </div>
              </div>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Min Order Value (₹)</label>
                <input className="input-field" type="number" value={form.minOrderValue} onChange={e => setForm({...form, minOrderValue: e.target.value})} />
              </div>
              <button type="submit" className="btn-gold" style={{ marginTop: 10, padding: 14 }}>Create Coupon</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
