'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  rating: number;
  numReviews: number;
  brand?: string;
  sizes?: string[];
  stock: number;
  category?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      size: product.sizes?.[0],
      quantity: 1,
      stock: product.stock,
    });
    toast.success('Added to cart!');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Login to add to wishlist'); return; }
    toggle(product.id);
    toast.success(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const placeholder = `https://placehold.co/400x500/faf8f4/c9a84c?text=${encodeURIComponent(product.name.slice(0, 10))}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/products/${product.slug || product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="product-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ 
            background: 'white', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '1px solid var(--border)', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Image Wrapper */}
          <div className="image-wrapper" style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--beige)' }}>
            <img
              src={imgError ? placeholder : (product.images[0] || placeholder)}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            />
            
            {/* Quick Actions (Floating) */}
            <div className="product-actions" style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 10 }}>
              <button 
                onClick={handleWishlist} 
                type="button"
                className="hover-glow"
                style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              >
                <Heart size={18} fill={isWishlisted(product.id) ? '#ef4444' : 'none'} color={isWishlisted(product.id) ? '#ef4444' : '#374151'} />
              </button>
            </div>

            {/* Badges */}
            <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {discount > 0 && <span style={{ background: 'var(--red)', color: 'white', padding: '4px 10px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 800 }}>{discount}% OFF</span>}
              {product.stock === 0 && <span style={{ background: '#1a1a2e', color: 'white', padding: '4px 10px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 800 }}>SOLD OUT</span>}
            </div>

            {/* Desktop Add to Cart Overlay */}
            <div className="hidden-mobile" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.95), transparent)', padding: '24px 12px 12px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <button onClick={handleAddToCart} className="btn-gold" style={{ width: '100%', fontSize: '0.8rem', padding: '10px' }}>
                <ShoppingBag size={14} style={{ marginRight: 8 }} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 8 }}>
              {product.category && <p style={{ fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>{product.category.name}</p>}
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.4, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</h3>
            </div>

            {/* Pricing & Rating */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--dark)' }}>₹{product.price.toLocaleString()}</span>
                {product.comparePrice && <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>₹{product.comparePrice.toLocaleString()}</span>}
              </div>
              
              {/* Mobile Add to Cart Button (Visible) */}
              <div className="show-mobile" style={{ marginTop: 12 }}>
                <button onClick={handleAddToCart} className="btn-gold" style={{ width: '100%', fontSize: '0.75rem', padding: '8px', minHeight: 44 }}>
                  <ShoppingBag size={14} style={{ marginRight: 6 }} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
