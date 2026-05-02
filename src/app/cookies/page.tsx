import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CookiesPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Cookie Policy</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, color: 'var(--text-secondary)' }}>
          <p>We use cookies to enhance your browsing experience and provide personalized content. By continuing to use our site, you consent to our use of cookies.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
