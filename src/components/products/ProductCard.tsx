'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
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
    toast.success('Added to cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Login to wishlist'); return; }
    toggle(product.id);
  };

  const placeholder = `https://placehold.co/600x800/fdfaf6/c9a84c?text=${encodeURIComponent(product.name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.slug || product.id}`} style={{ textDecoration: 'none' }}>
        <div
          className="luxury-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ 
            background: 'white', 
            borderRadius: '0px', 
            overflow: 'hidden', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: hovered ? '0 30px 60px -15px rgba(0,0,0,0.1)' : '0 10px 30px -15px rgba(0,0,0,0.05)'
          }}
        >
          {/* Image Wrapper */}
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--cream)' }}>
            <img
              src={imgError ? placeholder : (product.images[0] || placeholder)}
              alt={product.name}
              onError={() => setImgError(true)}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: hovered ? 'scale(1.08)' : 'scale(1)'
              }}
            />
            
            {/* Overlay Gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.6s' }} />

            {/* Wishlist Icon */}
            <button 
              onClick={handleWishlist} 
              style={{ 
                position: 'absolute', top: 16, right: 16, 
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
                border: 'none', borderRadius: '50%', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.3s',
                opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              <Heart size={18} fill={isWishlisted(product.id) ? 'var(--red)' : 'none'} color={isWishlisted(product.id) ? 'var(--red)' : 'var(--dark)'} />
            </button>
          </div>

          {/* Info Section */}
          <div style={{ padding: '20px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 2 }}>
              {product.category?.name || 'New Arrival'}
            </p>
            <h3 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              color: 'var(--dark)',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.name}
            </h3>
            <p style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
              ₹{product.price.toLocaleString()}
            </p>

            {/* Subtle Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="font-sans"
              style={{ 
                marginTop: '12px',
                background: 'transparent',
                border: '1px solid var(--dark)',
                color: 'var(--dark)',
                padding: '10px 0',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s',
                opacity: hovered ? 1 : 0.7
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--dark)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dark)'; }}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
