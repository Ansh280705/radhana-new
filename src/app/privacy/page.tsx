import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Privacy Policy</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, color: 'var(--text-secondary)' }}>
          <p>At Radhana Fashion, we value your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.</p>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--dark)' }}>Data Collection</h2>
            <p>We collect information such as your name, email, shipping address, and payment details when you place an order or create an account.</p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--dark)' }}>Data Usage</h2>
            <p>Your data is used to process orders, improve our services, and send you relevant updates and offers.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
