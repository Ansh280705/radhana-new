import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Terms & Conditions</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, color: 'var(--text-secondary)' }}>
          <p>By using our website, you agree to comply with our terms of service. Please read them carefully.</p>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--dark)' }}>Use of Site</h2>
            <p>You may use our site for personal, non-commercial purposes only.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
