'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Link as LinkIcon, Tag } from 'lucide-react';
import { bannersAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', link: '', discount: '', position: '0' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await bannersAPI.getAll();
      setBanners(res.data || []);
    } catch { toast.error('Failed to load banners'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bannersAPI.create({
        ...form,
        discount: form.discount ? parseInt(form.discount) : null,
        position: parseInt(form.position)
      });
      toast.success('Banner created');
      setIsModalOpen(false);
      setForm({ title: '', subtitle: '', image: '', link: '', discount: '', position: '0' });
      fetchData();
    } catch { toast.error('Creation failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await bannersAPI.delete(id);
      toast.success('Deleted');
      fetchData();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>Promotional Banners</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage home page sliders and offers</p>
        </div>
        <button className="btn-gold" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={18} /> Add Banner
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {loading ? [...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 200, borderRadius: 20 }} />) : 
          banners.map(banner => (
          <div key={banner.id} style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden' }}>
             <div style={{ height: 160, background: 'var(--beige)', position: 'relative' }}>
               <img src={banner.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                 <button onClick={() => handleDelete(banner.id)} style={{ background: 'white', border: 'none', color: 'var(--red)', cursor: 'pointer', padding: 8, borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                   <Trash2 size={16} />
                 </button>
               </div>
               {banner.discount && (
                 <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'var(--red)', color: 'white', padding: '4px 10px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700 }}>
                   {banner.discount}% OFF
                 </div>
               )}
             </div>
             <div style={{ padding: 20 }}>
               <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{banner.title}</h3>
               <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{banner.subtitle}</p>
               <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600 }}>
                 <LinkIcon size={14} /> {banner.link || 'No link attached'}
               </div>
             </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 500, padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>Add Banner</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Title</label>
                <input className="input-field" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Summer Collection" />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Subtitle</label>
                <input className="input-field" value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} placeholder="e.g. Fresh styles for the sun" />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Image URL</label>
                <input className="input-field" required value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Link URL</label>
                  <input className="input-field" value={form.link} onChange={e => setForm({...form, link: e.target.value})} placeholder="/products?..." />
                </div>
                <div>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Discount %</label>
                  <input className="input-field" type="number" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} placeholder="20" />
                </div>
              </div>
              <button type="submit" className="btn-gold" style={{ marginTop: 10, padding: 14 }}>Add Banner</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
