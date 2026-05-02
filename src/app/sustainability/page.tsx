import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SustainabilityPage() {
  return (
    <main style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ padding: '100px 20px', maxWidth: 800 }}>
        <h1 className="font-serif" style={{ marginBottom: 40, borderBottom: '2px solid var(--gold)', paddingBottom: 20 }}>Sustainability</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, color: 'var(--text-secondary)' }}>
          <p>We are committed to ethical fashion and sustainable practices. Our goal is to minimize our environmental footprint while supporting local artisans.</p>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--dark)' }}>Eco-Friendly Materials</h2>
            <p>We prioritize organic cotton, recycled fabrics, and natural dyes in our collections whenever possible.</p>
          </section>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--dark)' }}>Ethical Manufacturing</h2>
            <p>Our workshops follow strict ethical guidelines, ensuring fair wages and safe working conditions for all our team members.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
