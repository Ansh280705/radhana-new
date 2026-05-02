import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ReturnsPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Returns & Exchanges</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>7-Day Return Policy</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We offer a hassle-free 7-day return policy. If you are not satisfied with your purchase, you can initiate a return within 7 days of delivery.</p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Conditions for Return</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Items must be unused, unwashed, and in their original packaging with all tags intact. Items on clearance or special sales may not be eligible for returns.</p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Refund Process</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Once we receive and inspect the returned item, the refund will be processed to your original payment method within 5-7 business days.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
