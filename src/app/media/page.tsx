import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MediaPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Media & Press</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, color: 'var(--text-secondary)' }}>
          <p>For press inquiries, brand assets, and media collaborations, please reach out to our PR team at media@savariafashion.com</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
