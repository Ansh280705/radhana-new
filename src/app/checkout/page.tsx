'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MapPin, CreditCard, CheckCircle, Plus } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { ordersAPI, paymentAPI, userAPI } from '@/lib/api';
import toast from 'react-hot-toast';

declare global { interface Window { Razorpay: any; } }

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponCode = searchParams.get('coupon') || '';
  const { items, totalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', isDefault: false });

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    userAPI.getAddresses().then(r => { setAddresses(r.data); if (r.data.length > 0) setSelectedAddress(r.data.find((a: any) => a.isDefault)?.id || r.data[0].id); }).catch(() => {});
  }, [user]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await userAPI.addAddress(newAddr);
      setAddresses(prev => [...prev, res.data]);
      setSelectedAddress(res.data.id);
      setShowAddForm(false);
      toast.success('Address added!');
    } catch { toast.error('Failed to add address'); }
  };

  const loadRazorpay = () => new Promise<boolean>(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePlaceOrder = async () => {
    if (!selectedAddress) { toast.error('Please select a delivery address'); return; }
    if (items.length === 0) { toast.error('Your cart is empty'); return; }
    setLoading(true);
    try {
      const total = totalPrice();
      const loaded = await loadRazorpay();
      if (!loaded) { toast.error('Payment gateway failed to load'); setLoading(false); return; }
      const rzpOrder = await paymentAPI.createOrder(total);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: rzpOrder.data.amount,
        currency: 'INR',
        name: 'Savaria Fashion',
        description: `Order for ${items.length} item(s)`,
        order_id: rzpOrder.data.id,
        handler: async (response: any) => {
          try {
            const order = await ordersAPI.create({
              items: items.map(i => ({ productId: i.productId, quantity: i.quantity, size: i.size, color: i.color, price: i.price })),
              addressId: selectedAddress,
              couponCode,
              razorpayOrderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            });
            await paymentAPI.verify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, orderId: order.data.id });
            clearCart();
            toast.success('Order placed successfully! 🎉');
            router.push(`/dashboard/orders`);
          } catch { toast.error('Order confirmation failed. Contact support.'); }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: '#c9a84c' },
      };
      new window.Razorpay(options).open();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to initiate payment');
    } finally { setLoading(false); }
  };

  const subtotal = totalPrice();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main style={{ padding: '32px 0 60px' }}>
        <div className="container">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, marginBottom: 32 }}>Checkout</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>
            {/* Left: Delivery Address */}
            <div>
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 28, marginBottom: 20 }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={20} style={{ color: 'var(--gold)' }} /> Delivery Address
                </h2>
                {addresses.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {addresses.map((addr: any) => (
                      <label key={addr.id} style={{ display: 'flex', gap: 12, padding: 16, border: `2px solid ${selectedAddress === addr.id ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 12, cursor: 'pointer', transition: 'border-color 0.2s', background: selectedAddress === addr.id ? 'rgba(201,168,76,0.05)' : 'white' }}>
                        <input type="radio" name="address" value={addr.id} checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} style={{ marginTop: 2 }} />
                        <div>
                          <p style={{ fontWeight: 700 }}>{addr.name} <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>— {addr.phone}</span></p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{addr.line1}{addr.line2 ? ', ' + addr.line2 : ''}, {addr.city}, {addr.state} - {addr.pincode}</p>
                          {addr.isDefault && <span className="badge badge-gold" style={{ marginTop: 6 }}>Default</span>}
                        </div>
                      </label>
                    ))}
                  </div>
                ) : <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No addresses saved. Add one below.</p>}
                <button onClick={() => setShowAddForm(!showAddForm)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '2px dashed var(--border)', borderRadius: 12, padding: '12px 20px', cursor: 'pointer', color: 'var(--gold)', fontWeight: 600, marginTop: 12, width: '100%', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <Plus size={16} /> Add New Address
                </button>
                {showAddForm && (
                  <form onSubmit={handleAddAddress} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12, padding: 20, background: 'var(--beige)', borderRadius: 16 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 4 }}>New Address</h3>
                    {[['name', 'Full Name'], ['phone', 'Phone'], ['line1', 'Address Line 1'], ['line2', 'Address Line 2 (optional)'], ['city', 'City'], ['state', 'State'], ['pincode', 'Pincode']].map(([key, label]) => (
                      <input key={key} className="input-field" placeholder={label} required={key !== 'line2'} value={(newAddr as any)[key]} onChange={e => setNewAddr(n => ({ ...n, [key]: e.target.value }))} style={{ padding: '10px 14px', fontSize: '0.88rem' }} />
                    ))}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input type="checkbox" checked={newAddr.isDefault} onChange={e => setNewAddr(n => ({ ...n, isDefault: e.target.checked }))} /> Set as default address
                    </label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button type="submit" className="btn-gold" style={{ flex: 1, padding: '10px' }}>Save Address</button>
                      <button type="button" className="btn-outline" onClick={() => setShowAddForm(false)} style={{ flex: 1, padding: '10px' }}>Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 28, position: 'sticky', top: 90 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CreditCard size={20} style={{ color: 'var(--gold)' }} /> Order Summary
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--text-secondary)', maxWidth: 200 }}>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ fontWeight: 600, color: shipping === 0 ? 'var(--green)' : 'inherit' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
              </div>
              <div style={{ borderTop: '2px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--gold)' }}>₹{total.toLocaleString()}</span>
              </div>
              <button onClick={handlePlaceOrder} disabled={loading} className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {loading ? <><span className="spinner" /> Processing...</> : <><CheckCircle size={20} /> Pay ₹{total.toLocaleString()}</>}
              </button>
              <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>🔒 Secured by Razorpay. Your payment info is encrypted.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" style={{ width: 40, height: 40, borderColor: 'rgba(201,168,76,0.3)', borderTopColor: 'var(--gold)' }} /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
