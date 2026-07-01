import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-container">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="overline">Breakfast made easy</span>
          <h1>Goumert Crunch makes cereal shopping stylish, simple, and fast.</h1>
          <p className="subtitle">
            Harare’s modern breakfast destination blends a physical storefront and an online shop, bringing local and international cereal favorites together in one premium experience.
          </p>
          <div className="hero-buttons">
            <Link href="/client/login" className="button-primary">
              Start shopping
            </Link>
            <Link href="/business/login" className="button-secondary">
              Business portal
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <span className="hero-badge">Trusted Breakfast Retail</span>
          <div className="stat-grid">
            <div className="stat-card">
              <div>
                <strong>120+</strong>
                <span>Unique breakfast products</span>
              </div>
            </div>
            <div className="stat-card">
              <div>
                <strong>24/7</strong>
                <span>Online ordering anytime</span>
              </div>
            </div>
            <div className="stat-card">
              <div>
                <strong>Fast</strong>
                <span>Same-day delivery in Harare</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <p style={{ margin: 0, color: "#d6d6d6", lineHeight: 1.75 }}>
              From grab-and-go favorites to full breakfast bundles, Goumert Crunch transforms the morning routine into a premium daily ritual.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "3rem" }}>
        <div className="section-heading">
          <div style={{ width: "4px", height: "32px", background: "var(--brand-orange)" }} />
          <h2>Experience the new breakfast routine</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Graphical retail experience</h3>
            <p>Navigate our breakfast selection with clear visuals, refined product cards, and smooth interactions.</p>
          </div>
          <div className="feature-card">
            <h3>Client and business workflows</h3>
            <p>Shop, track, and order from the client side while managing stock, analytics, and exports on the business side.</p>
          </div>
          <div className="feature-card">
            <h3>Fresh design system</h3>
            <p>A bold palette, soft gradients, and polished components make the platform feel premium and easy to use.</p>
          </div>
        </div>
      </section>

      <footer className="footer site-footer">
        <div className="page-container">
          <div className="footer-grid">
            <div>
              <h4>Goumert Crunch</h4>
              <p>Modern cereal retail with a premium Harare flavor.</p>
            </div>
            <div>
              <h4>Quick links</h4>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <p>info@goumert.co.zw</p>
              <p>+263 (0)1 234 5678</p>
            </div>
          </div>
          <p style={{ margin: 0, color: "#777", fontSize: "0.9rem", textAlign: "center" }}>
            Built for premium breakfast retail in Harare.
          </p>
        </div>
      </footer>
    </main>
  );
}
