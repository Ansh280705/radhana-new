'use client';
import { useState, useEffect } from 'react';
import { Users, Mail, Shield, Clock, Search } from 'lucide-react';
import { adminAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.users();
      setUsers(res.data || []);
    } catch { toast.error('Failed to load users'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700 }}>Users</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your customer base</p>
      </div>

      <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 700, borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--cream)' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>USER</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>EMAIL</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ROLE</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ORDERS</th>
                <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>JOINED</th>
              </tr>
            </thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={5} style={{ padding: 20 }}><div className="skeleton" style={{ height: 40 }} /></td></tr>) : 
                users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'var(--dark)' }}>
                        {user.name[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '0.88rem' }}>{user.email}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ background: user.role === 'ADMIN' ? '#dbeafe' : '#f1f5f9', color: user.role === 'ADMIN' ? '#1e40af' : '#475569', padding: '4px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700 }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '0.88rem' }}>{user._count?.orders || 0} Orders</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
