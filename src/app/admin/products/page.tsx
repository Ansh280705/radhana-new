'use client';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Package, Filter, X } from 'lucide-react';
import { productsAPI, categoriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form, setForm] = useState({
    name: '', price: '', comparePrice: '', description: '', 
    categoryId: '', stock: '', images: [] as string[], 
    sizes: [] as string[], colors: [] as string[], brand: '',
    isFeatured: false, isNewArrival: false
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([productsAPI.getAll({ limit: 100 }), categoriesAPI.getAll()]);
      setProducts(pRes.data.products || []);
      setCategories(cRes.data || []);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name, price: product.price.toString(), 
        comparePrice: product.comparePrice?.toString() || '', 
        description: product.description, categoryId: product.categoryId, 
        stock: product.stock.toString(), images: product.images,
        sizes: product.sizes, colors: product.colors, brand: product.brand || '',
        isFeatured: product.isFeatured, isNewArrival: product.isNewArrival
      });
    } else {
      setEditingProduct(null);
      setForm({
        name: '', price: '', comparePrice: '', description: '', 
        categoryId: '', stock: '0', images: [], sizes: [], colors: [], 
        brand: '', isFeatured: false, isNewArrival: false
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (data.url) {
          setForm(prev => ({ ...prev, images: [...prev.images, data.url] }));
          toast.success('Image uploaded!');
        } else {
          toast.error('Upload failed');
        }
      } catch {
        toast.error('Upload failed');
      } finally {
        setUploading(false);
      }
    };
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      price: parseFloat(form.price),
      comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : null,
      stock: parseInt(form.stock)
    };

    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct.id, data);
        toast.success('Product updated');
      } else {
        await productsAPI.create(data);
        toast.success('Product created');
      }
      setIsModalOpen(false);
      fetchData();
    } catch { toast.error('Operation failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await productsAPI.delete(id);
      toast.success('Deleted');
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="spinner" style={{ width: 40, height: 40, borderColor: 'rgba(201,168,76,0.3)', borderTopColor: 'var(--gold)', marginBottom: 16 }} />
        <p style={{ color: 'var(--gold)', fontWeight: 600, letterSpacing: '1px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>Products</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your inventory</p>
        </div>
        <button className="btn-gold" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: 20, borderBottom: '1px solid var(--border)', display: 'flex', gap: 12 }}>
           <div style={{ position: 'relative', flex: 1 }}>
             <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
             <input className="input-field" placeholder="Search products..." style={{ paddingLeft: 36, fontSize: '0.9rem' }} />
           </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 800, borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--cream)' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PRODUCT</th>
                <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CATEGORY</th>
                <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>PRICE</th>
                <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>STOCK</th>
                <th style={{ textAlign: 'right', padding: '12px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, background: 'var(--beige)', borderRadius: 8, overflow: 'hidden' }}>
                        <img src={p.images[0] || 'https://placehold.co/40/faf8f4/c9a84c?text=P'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: '0.88rem' }}>{p.category?.name}</td>
                  <td style={{ padding: '12px 20px', fontSize: '0.88rem', fontWeight: 700 }}>₹{p.price}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: '0.85rem', color: p.stock < 10 ? 'var(--red)' : 'inherit' }}>{p.stock} units</span>
                  </td>
                  <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                    <button onClick={() => handleOpenModal(p)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', marginRight: 12 }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto', padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Name</label>
                  <input className="input-field" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Category</label>
                  <select className="input-field" required value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Price (₹)</label>
                  <input className="input-field" type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Compare Price (₹)</label>
                  <input className="input-field" type="number" value={form.comparePrice} onChange={e => setForm({...form, comparePrice: e.target.value})} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Stock</label>
                  <input className="input-field" type="number" required value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Brand</label>
                  <input className="input-field" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} placeholder="e.g. Sawariya" />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Sizes (Comma separated)</label>
                  <input className="input-field" value={form.sizes.join(', ')} onChange={e => setForm({...form, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} placeholder="e.g. S, M, L, XL" />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Colors (Comma separated)</label>
                  <input className="input-field" value={form.colors.join(', ')} onChange={e => setForm({...form, colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} placeholder="e.g. Red, Blue, Black" />
                </div>
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</label>
                <textarea className="input-field" rows={4} required value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 12 }}>Product Images</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12, marginBottom: 12 }}>
                  {form.images.map((url, i) => (
                    <div key={i} style={{ position: 'relative', height: 100, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removeImage(i)} style={{ position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <label style={{ height: 100, borderRadius: 12, border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: uploading ? 'not-allowed' : 'pointer', background: 'var(--cream)', transition: 'all 0.3s' }}>
                    {uploading ? (
                      <div className="animate-spin" style={{ width: 24, height: 24, border: '3px solid var(--gold)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                    ) : (
                      <>
                        <Plus size={24} style={{ color: 'var(--gold)' }} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: 4 }}>Add Image</span>
                      </>
                    )}
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Upload high-quality product images. Supported: JPG, PNG, WEBP.</p>
              </div>

              <div style={{ display: 'flex', gap: 20 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} /> Featured Product
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.isNewArrival} onChange={e => setForm({...form, isNewArrival: e.target.checked})} /> New Arrival
                </label>
              </div>

              <button type="submit" className="btn-gold" style={{ marginTop: 10, padding: 14 }}>{editingProduct ? 'Update Product' : 'Create Product'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
