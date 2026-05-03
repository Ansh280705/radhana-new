import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CareersPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Careers</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, color: 'var(--text-secondary)' }}>
          <p>Join the Sawariya Fashion team! We are always looking for passionate individuals who share our love for elegance and style.</p>
          <p>Currently, we don't have any open positions, but feel free to send your resume to careers@Sawariyafashion.com</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
