'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { productsAPI, categoriesAPI } from '@/lib/api';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '', maxPrice: '',
    sizes: [] as string[],
    sort: searchParams.get('sort') || 'createdAt_desc',
    search: searchParams.get('search') || '',
    page: 1,
    featured: searchParams.get('featured') || '',
    newArrival: searchParams.get('newArrival') || '',
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { categoriesAPI.getAll().then(r => setCategories(r.data)).catch(() => {}); }, []);

  // Update filters when URL parameters change (e.g. clicking Navbar)
  useEffect(() => {
    setFilters(f => ({
      ...f,
      category: searchParams.get('category') || '',
      featured: searchParams.get('featured') || '',
      newArrival: searchParams.get('newArrival') || '',
      search: searchParams.get('search') || '',
      page: 1
    }));
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params: any = { ...filters, sizes: filters.sizes.join(',') };
    productsAPI.getAll(params).then(r => {
      setProducts(r.data.products || []);
      setPagination(r.data.pagination || { page: 1, total: 0, pages: 1 });
    }).catch(() => {}).finally(() => setLoading(false));
  }, [filters]);

  const toggleSize = (s: string) => setFilters(f => ({ ...f, sizes: f.sizes.includes(s) ? f.sizes.filter(x => x !== s) : [...f.sizes, s], page: 1 }));

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '32px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>
                {filters.search ? `Results for "${filters.search}"` : filters.category ? filters.category.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'All Products'}
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{pagination.total} products</p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input className="input-field" value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value, page: 1 }))} placeholder="Search..." style={{ paddingLeft: 36, padding: '10px 16px 10px 36px', fontSize: '0.88rem' }} />
              </div>
              <select className="input-field" value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value, page: 1 }))} style={{ padding: '10px 16px', fontSize: '0.88rem', cursor: 'pointer' }}>
                <option value="createdAt_desc">Newest First</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="rating_desc">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="products-layout">
            {/* Mobile Filter Toggle */}
            <button 
              className="show-mobile btn-outline" 
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ width: '100%', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <SlidersHorizontal size={18} /> {menuOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Sidebar */}
            <div className={`${menuOpen ? 'show' : 'hidden-mobile'}`} style={{ 
              position: 'sticky', 
              top: 90, 
              height: 'fit-content', 
              background: 'white', 
              borderRadius: 16, 
              border: '1px solid var(--border)', 
              padding: 24,
              zIndex: 50,
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Filters</h3>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontWeight: 600, marginBottom: 10, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Category</p>
                <button onClick={() => setFilters(f => ({ ...f, category: '', page: 1 }))} style={{ display: 'block', width: '100%', textAlign: 'left', background: !filters.category ? 'var(--beige)' : 'none', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontWeight: !filters.category ? 700 : 400, marginBottom: 4 }}>All Categories</button>
                {categories.map((cat: any) => (
                  <button key={cat.slug} onClick={() => setFilters(f => ({ ...f, category: cat.slug, page: 1 }))} style={{ display: 'block', width: '100%', textAlign: 'left', background: filters.category === cat.slug ? 'var(--beige)' : 'none', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontWeight: filters.category === cat.slug ? 700 : 400, color: filters.category === cat.slug ? 'var(--gold)' : 'var(--text-primary)', marginBottom: 4, fontSize: '0.9rem' }}>{cat.name}</button>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontWeight: 600, marginBottom: 10, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Price Range</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="input-field" type="number" placeholder="Min" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value, page: 1 }))} style={{ flex: 1, minWidth: 0, padding: '8px 10px', fontSize: '0.82rem' }} />
                  <input className="input-field" type="number" placeholder="Max" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value, page: 1 }))} style={{ flex: 1, minWidth: 0, padding: '8px 10px', fontSize: '0.82rem' }} />
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 10, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Size</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {SIZES.map(s => (
                    <button key={s} onClick={() => toggleSize(s)} style={{ padding: '5px 12px', borderRadius: 8, border: `2px solid ${filters.sizes.includes(s) ? 'var(--gold)' : 'var(--border)'}`, background: filters.sizes.includes(s) ? 'var(--gold)' : 'white', color: filters.sizes.includes(s) ? 'var(--dark)' : 'inherit', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem' }}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', sizes: [], sort: 'createdAt_desc', search: '', page: 1, featured: '', newArrival: '' })} className="btn-outline" style={{ width: '100%', marginTop: 20, textAlign: 'center' }}>Clear All</button>
            </div>

            {/* Products Grid */}
            <div>
              {loading ? (
                <div className="products-grid">{[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 380, borderRadius: 16 }} />)}</div>
              ) : products.length > 0 ? (
                <>
                  <div className="products-grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
                  {pagination.pages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
                      {[...Array(pagination.pages)].map((_, i) => (
                        <button key={i} onClick={() => setFilters(f => ({ ...f, page: i + 1 }))} style={{ width: 40, height: 40, borderRadius: 10, border: `2px solid ${filters.page === i + 1 ? 'var(--gold)' : 'var(--border)'}`, background: filters.page === i + 1 ? 'var(--gold)' : 'white', fontWeight: 700, cursor: 'pointer' }}>{i + 1}</button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button className="btn-gold" style={{ marginTop: 20 }} onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', sizes: [], sort: 'createdAt_desc', search: '', page: 1, featured: '', newArrival: '' })}>Clear Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" style={{ width: 40, height: 40, borderColor: 'rgba(201,168,76,0.3)', borderTopColor: 'var(--gold)' }} /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
