import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ShippingPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Shipping Policy</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Delivery Timelines</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We strive to deliver your orders as quickly as possible. Standard shipping usually takes 3-5 business days within major cities and 5-7 business days for other locations.</p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Shipping Charges</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Free shipping is applicable on all orders above ₹999. For orders below this amount, a flat shipping fee of ₹99 will be charged.</p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Order Tracking</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Once your order is shipped, you will receive a tracking link via email and SMS to monitor your package's progress.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
