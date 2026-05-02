'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tag, X } from 'lucide-react';
import { categoriesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', image: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await categoriesAPI.getAll();
      setCategories(res.data || []);
    } catch { toast.error('Failed to load categories'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoriesAPI.create(form);
      toast.success('Category created');
      setIsModalOpen(false);
      setForm({ name: '', image: '' });
      fetchData();
    } catch { toast.error('Creation failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will not delete products in this category.')) return;
    try {
      await categoriesAPI.delete(id);
      toast.success('Deleted');
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>Categories</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Organize your collections</p>
        </div>
        <button className="btn-gold" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 180, borderRadius: 20 }} />) : 
          categories.map(cat => (
          <div key={cat.id} style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
             <div style={{ height: 140, background: 'var(--beige)' }}>
               {cat.image ? <img src={cat.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}><Tag size={40} /></div>}
             </div>
             <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{cat.name}</h3>
                 <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{cat._count?.products || 0} Products</p>
               </div>
               <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', padding: 8 }}>
                 <Trash2 size={18} />
               </button>
             </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 450, padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>Add Category</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Name</label>
                <input className="input-field" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Ethnic Wear" />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Image URL</label>
                <input className="input-field" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
              </div>
              <button type="submit" className="btn-gold" style={{ marginTop: 10, padding: 14 }}>Create Category</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
