'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Star, ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { productsAPI, reviewsAPI } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const { user } = useAuthStore();

  useEffect(() => {
    productsAPI.getOne(id as string).then(r => { setProduct(r.data); setSelectedSize(r.data.sizes?.[0] || ''); setSelectedColor(r.data.colors?.[0] || ''); }).catch(() => setProduct(null)).finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({ id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`, productId: product.id, name: product.name, price: product.price, image: product.images?.[0] || '', size: selectedSize, color: selectedColor, quantity, stock: product.stock });
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => { handleAddToCart(); router.push('/cart'); };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Login to write a review'); return; }
    setSubmittingReview(true);
    try {
      await reviewsAPI.create({ productId: product.id, ...reviewForm });
      toast.success('Review submitted!');
      const updated = await productsAPI.getOne(id as string);
      setProduct(updated.data);
    } catch { toast.error('Failed to submit review'); }
    finally { setSubmittingReview(false); }
  };

  const discount = product?.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;
  const placeholder = (name: string) => `https://placehold.co/600x700/faf8f4/c9a84c?text=${encodeURIComponent(name?.slice(0, 10) || 'Product')}`;

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ width: 44, height: 44, borderColor: 'rgba(201,168,76,0.3)', borderTopColor: 'var(--gold)' }} />
      </div>
      <Footer />
    </>
  );

  if (!product) return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: '4rem' }}>😕</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Product Not Found</h2>
        <Link href="/products"><button className="btn-gold">Browse Products</button></Link>
      </div>
      <Footer />
    </>
  );

  const images = product.images?.length ? product.images : [placeholder(product.name)];

  return (
    <>
      <Navbar />
      <main style={{ padding: '32px 0 60px' }}>
        <div className="container">
          <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 24, fontSize: '0.9rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <ChevronLeft size={18} /> Back to Products
          </Link>

          <div className="product-detail-grid" style={{ display: 'grid', gap: 'clamp(24px, 5vw, 48px)', marginBottom: 60 }}>
            {/* Image Gallery */}
            <div className="product-gallery">
              <div style={{ borderRadius: 12, overflow: 'hidden', background: '#f6f8fa', border: '1px solid #d0d7de', marginBottom: 12, aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={imgErrors[selectedImage] ? placeholder(product.name) : images[selectedImage]} alt={product.name} onError={() => setImgErrors(prev => ({ ...prev, [selectedImage]: true }))} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }} />
              </div>
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
                  {images.map((img: string, i: number) => (
                    <div key={i} onClick={() => setSelectedImage(i)} style={{ width: 72, height: 90, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${selectedImage === i ? 'var(--gold)' : 'var(--border)'}`, flexShrink: 0, transition: 'border-color 0.2s' }}>
                      <img src={imgErrors[i] ? placeholder(product.name) : img} onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.category && <p style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>{product.category.name}</p>}
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 12 }}>{product.name}</h1>
              {product.brand && <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>by <strong>{product.brand}</strong></p>}

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'} color={s <= Math.round(product.rating) ? '#f59e0b' : '#d1d5db'} />)}
                </div>
                <span style={{ fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>({product.numReviews} reviews)</span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{product.price.toLocaleString()}</span>
                {product.comparePrice && <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>₹{product.comparePrice.toLocaleString()}</span>}
                {discount > 0 && <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: 50, fontSize: '0.85rem', fontWeight: 700 }}>{discount}% OFF</span>}
              </div>

              {/* Size */}
              {product.sizes?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontWeight: 700, marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                    Size: <span style={{ color: 'var(--gold)' }}>{selectedSize}</span>
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {product.sizes.map((s: string) => (
                      <button key={s} onClick={() => setSelectedSize(s)} style={{ padding: '8px 20px', borderRadius: 10, border: `2px solid ${selectedSize === s ? 'var(--gold)' : 'var(--border)'}`, background: selectedSize === s ? 'var(--gold)' : 'white', color: selectedSize === s ? 'var(--dark)' : 'inherit', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', position: 'relative' }}>
                        {s}
                        {selectedSize === s && <Check size={12} style={{ position: 'absolute', top: -6, right: -6, background: 'var(--green)', color: 'white', borderRadius: '50%', padding: 1 }} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              {product.colors?.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontWeight: 700, marginBottom: 10 }}>Color: <span style={{ color: 'var(--gold)' }}>{selectedColor}</span></p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {product.colors.map((c: string) => (
                      <button key={c} onClick={() => setSelectedColor(c)} title={c} style={{ width: 32, height: 32, borderRadius: '50%', background: c.toLowerCase(), border: `3px solid ${selectedColor === c ? 'var(--gold)' : 'transparent'}`, cursor: 'pointer', outline: '1px solid rgba(0,0,0,0.15)', transition: 'all 0.2s' }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <p style={{ fontWeight: 700 }}>Quantity:</p>
                <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Minus size={16} /></button>
                  <span style={{ padding: '10px 20px', fontWeight: 700, minWidth: 40, textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Plus size={16} /></button>
                </div>
                <span style={{ color: product.stock > 10 ? 'var(--green)' : product.stock > 0 ? '#f59e0b' : 'var(--red)', fontWeight: 600, fontSize: '0.88rem' }}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of Stock'}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                <button className="btn-gold" onClick={handleAddToCart} disabled={product.stock === 0} style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.95rem', borderRadius: 6 }}>
                  <ShoppingBag size={18} /> Add to Cart
                </button>
                <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                  <button className="btn-dark" onClick={handleBuyNow} disabled={product.stock === 0} style={{ flex: 1, fontSize: '0.95rem', borderRadius: 6 }}>Buy Now</button>
                  <button 
                    onClick={() => { if (!user) { toast.error('Login to wishlist'); return; } toggle(product.id); toast.success(isWishlisted(product.id) ? 'Removed' : 'Added to wishlist!'); }} 
                    style={{ 
                      padding: '12px', 
                      borderRadius: 6, 
                      border: '1px solid #d0d7de', 
                      background: '#f6f8fa', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 48,
                      boxShadow: '0 1px 0 rgba(27,31,35,0.04)'
                    }}
                  >
                    <Heart size={20} fill={isWishlisted(product.id) ? '#ef4444' : 'none'} color={isWishlisted(product.id) ? '#ef4444' : '#57606a'} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div style={{ padding: 20, background: '#f6f8fa', border: '1px solid #d0d7de', borderRadius: 6 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 8, color: '#24292f' }}>Description</p>
                <p style={{ color: '#57606a', lineHeight: 1.6, fontSize: '0.9rem', margin: 0 }}>{product.description}</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', padding: 32, marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: 24 }}>Customer Reviews</h2>
            {product.reviews?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {product.reviews.map((rev: any) => (
                  <div key={rev.id} style={{ padding: 20, border: '1px solid var(--border)', borderRadius: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--dark)' }}>{rev.user?.name?.[0]?.toUpperCase()}</div>
                        <div>
                          <p style={{ fontWeight: 600 }}>{rev.user?.name}</p>
                          <div style={{ display: 'flex', gap: 2 }}>
                            {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= rev.rating ? '#f59e0b' : 'none'} color={s <= rev.rating ? '#f59e0b' : '#d1d5db'} />)}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(rev.createdAt).toLocaleDateString()}</span>
                    </div>
                    {rev.title && <p style={{ fontWeight: 600, marginBottom: 4 }}>{rev.title}</p>}
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '32px 0' }}>No reviews yet. Be the first to review!</p>}

            {/* Review Form */}
            {user && (
              <form onSubmit={handleReview} style={{ marginTop: 32, padding: 24, background: 'var(--beige)', borderRadius: 16 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Write a Review</h3>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 600, marginBottom: 8 }}>Rating</p>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onClick={() => setReviewForm(f => ({ ...f, rating: s }))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <Star size={28} fill={s <= reviewForm.rating ? '#f59e0b' : 'none'} color={s <= reviewForm.rating ? '#f59e0b' : '#d1d5db'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <input className="input-field" placeholder="Review title (optional)" value={reviewForm.title} onChange={e => setReviewForm(f => ({ ...f, title: e.target.value }))} style={{ marginBottom: 12 }} />
                  <textarea className="input-field" placeholder="Share your experience..." value={reviewForm.comment} onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} required rows={4} style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-gold" disabled={submittingReview}>{submittingReview ? 'Submitting...' : 'Submit Review'}</button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .product-detail-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 991px) {
          .product-detail-grid { grid-template-columns: 1fr; }
          .product-gallery { max-width: 600px; margin: 0 auto 32px; width: 100%; }
        }
      `}</style>
    </>
  );
}
