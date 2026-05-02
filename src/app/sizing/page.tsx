import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SizingPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Sizing Guide</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, color: 'var(--text-secondary)' }}>
          <p>Find your perfect fit with our comprehensive sizing chart. If you are between sizes, we recommend choosing the larger size for a comfortable fit.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
            <thead>
              <tr style={{ background: 'var(--beige)', textAlign: 'left' }}>
                <th style={{ padding: 12, border: '1px solid var(--border)' }}>Size</th>
                <th style={{ padding: 12, border: '1px solid var(--border)' }}>Chest (in)</th>
                <th style={{ padding: 12, border: '1px solid var(--border)' }}>Waist (in)</th>
              </tr>
            </thead>
            <tbody>
              {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                <tr key={s}>
                  <td style={{ padding: 12, border: '1px solid var(--border)' }}>{s}</td>
                  <td style={{ padding: 12, border: '1px solid var(--border)' }}>{36 + (['S', 'M', 'L', 'XL', 'XXL'].indexOf(s) * 2)}</td>
                  <td style={{ padding: 12, border: '1px solid var(--border)' }}>{30 + (['S', 'M', 'L', 'XL', 'XXL'].indexOf(s) * 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
}
