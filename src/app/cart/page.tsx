'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { couponsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState<any>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    try {
      const res = await couponsAPI.validate(couponCode.trim());
      setCoupon(res.data);
      toast.success(`Coupon applied! ${res.data.discountType === 'PERCENTAGE' ? res.data.discountValue + '% off' : '₹' + res.data.discountValue + ' off'}`);
    } catch { toast.error('Invalid or expired coupon'); setCoupon(null); }
    finally { setApplyingCoupon(false); }
  };

  const subtotal = totalPrice();
  const discount = coupon
    ? coupon.discountType === 'PERCENTAGE'
      ? Math.round((subtotal * coupon.discountValue) / 100)
      : Math.min(coupon.discountValue, subtotal)
    : 0;
  const shipping = subtotal - discount >= 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  if (totalItems() === 0) return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40 }}>
        <div style={{ fontSize: '5rem' }}>🛍️</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 400 }}>Looks like you haven't added anything yet. Explore our collections!</p>
        <Link href="/products"><button className="btn-gold" style={{ padding: '14px 32px', fontSize: '1rem' }}>Start Shopping</button></Link>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main style={{ padding: '32px 0 60px' }}>
        <div className="container">
          <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700, marginBottom: 32 }}>Shopping Cart <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 400 }}>({totalItems()} items)</span></h1>
          <div className="cart-layout">
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map(item => (
                <div key={item.id} className="cart-item" style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border)', padding: 20, display: 'flex', gap: 16, alignItems: 'center', position: 'relative' }}>
                  <div style={{ width: 90, height: 110, borderRadius: 12, overflow: 'hidden', background: 'var(--beige)', flexShrink: 0 }}>
                    <img src={imgErrors[item.id] ? `https://placehold.co/90x110/faf8f4/c9a84c?text=Item` : (item.image || `https://placehold.co/90x110/faf8f4/c9a84c?text=Item`)} onError={() => setImgErrors(p => ({ ...p, [item.id]: true }))} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: 4, fontSize: '0.95rem' }}>{item.name}</h3>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                      {item.size && <span className="tag">Size: {item.size}</span>}
                      {item.color && <span className="tag">Color: {item.color}</span>}
                    </div>
                    <p style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>₹{item.price.toLocaleString()} each</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4, borderRadius: 8, transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                      <Trash2 size={18} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                      <span style={{ padding: '6px 12px', fontWeight: 700, minWidth: 32, textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))} style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 28, position: 'sticky', top: 90 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>Order Summary</h2>

              {/* Coupon */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 600, marginBottom: 8, display: 'block', fontSize: '0.9rem' }}><Tag size={14} style={{ display: 'inline', marginRight: 6, color: 'var(--gold)' }} />Apply Coupon</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="input-field" value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter code" style={{ flex: 1, padding: '10px 14px', fontSize: '0.88rem' }} />
                  <button onClick={handleApplyCoupon} disabled={applyingCoupon} className="btn-gold" style={{ padding: '10px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Apply</button>
                </div>
                {coupon && <p style={{ color: 'var(--green)', fontSize: '0.82rem', marginTop: 6, fontWeight: 600 }}>✓ Coupon applied!</p>}
              </div>

              {/* Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Subtotal', value: `₹${subtotal.toLocaleString()}` },
                  ...(discount > 0 ? [{ label: `Discount (${coupon?.code})`, value: `-₹${discount.toLocaleString()}`, green: true }] : []),
                  { label: 'Shipping', value: shipping === 0 ? 'FREE' : `₹${shipping}`, green: shipping === 0 },
                ].map(({ label, value, green }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{label}</span>
                    <span style={{ fontWeight: 600, color: green ? 'var(--green)' : 'var(--text-primary)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid var(--border)', paddingTop: 16, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--gold)' }}>₹{total.toLocaleString()}</span>
              </div>

              {shipping > 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center' }}>Add ₹{(999 - (subtotal - discount)).toLocaleString()} more for free shipping</p>}

              <Link href={`/checkout?coupon=${couponCode}`} style={{ textDecoration: 'none' }}>
                <button className="btn-gold" style={{ width: '100%', fontSize: '1rem', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/products" style={{ textDecoration: 'none', display: 'block', marginTop: 12 }}>
                <button className="btn-outline" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <ShoppingBag size={16} /> Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
