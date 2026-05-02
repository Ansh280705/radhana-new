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
            borderRadius: '6px', 
            overflow: 'hidden', 
            border: '1px solid #d0d7de', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: hovered ? '0 8px 24px rgba(149,157,165,0.2)' : 'none'
          }}
        >
          {/* Image Wrapper */}
          <div className="image-wrapper" style={{ position: 'relative', aspectRatio: '1.2/1', overflow: 'hidden', background: '#f6f8fa', borderBottom: '1px solid #d0d7de' }}>
            <img
              src={imgError ? placeholder : (product.images[0] || placeholder)}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, transition: 'opacity 0.3s' }}
            />
            
            {/* Quick Actions (Floating) */}
            <div className="product-actions" style={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 10 }}>
              <button 
                onClick={handleWishlist} 
                type="button"
                style={{ width: 32, height: 32, borderRadius: '6px', background: 'white', border: '1px solid #d0d7de', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 0 rgba(27,31,35,0.04)' }}
              >
                <Heart size={14} fill={isWishlisted(product.id) ? '#ef4444' : 'none'} color={isWishlisted(product.id) ? '#ef4444' : '#57606a'} />
              </button>
            </div>

            {/* Badges */}
            <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {discount > 0 && <span style={{ background: '#cf222e', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.65rem', fontWeight: 600 }}>{discount}% OFF</span>}
            </div>
          </div>

          {/* Info Section */}
          <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0969da', lineHeight: 1.4, margin: 0, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', cursor: 'pointer' }}>
                <span style={{ textDecoration: hovered ? 'underline' : 'none' }}>{product.name}</span>
              </h3>
              
              {product.category && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', border: '1px solid rgba(0,0,0,0.1)' }}></span>
                  <p style={{ fontSize: '0.75rem', color: '#57606a', margin: 0 }}>{product.category.name}</p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#24292f' }}>₹{product.price.toLocaleString()}</span>
              {product.comparePrice && <span style={{ textDecoration: 'line-through', color: '#57606a', fontSize: '0.8rem', opacity: 0.7 }}>₹{product.comparePrice.toLocaleString()}</span>}
            </div>

            {/* Action Button (GitHub "Star" style) */}
            <button 
              onClick={handleAddToCart} 
              style={{ 
                width: '100%', 
                fontSize: '0.75rem', 
                padding: '6px 12px', 
                background: '#f6f8fa', 
                border: '1px solid #d0d7de', 
                borderRadius: '6px', 
                color: '#24292f',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 1px 0 rgba(27,31,35,0.04)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f6f8fa'}
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
