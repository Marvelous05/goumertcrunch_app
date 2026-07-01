"use client";

export default function AboutPage() {
  return (
    <main className="page-container">
      <div className="section-heading">
        <div style={{ width: "4px", height: "40px", background: "var(--brand-orange)" }} />
        <div>
          <h1 style={{ margin: 0 }}>About Goumert Crunch</h1>
          <p className="small-note">Breakfast Made Easy — local and international breakfast solutions in Harare.</p>
        </div>
      </div>

      <section style={{ display: "grid", gap: "2rem", marginTop: "2rem" }}>
        <div className="card">
          <h2>Our story</h2>
          <p>
            Goumert Crunch is a Harare-based cereal and breakfast products retailer with a physical location and an online store. We curate the best local and international breakfast brands in one place, making morning meal solutions convenient, affordable, and enjoyable.
          </p>
          <p>
            Our core philosophy is <span style={{ fontWeight: 700, color: "#ff6a00" }}>"Breakfast Made Easy."</span> We believe that every morning should start with quality products and a seamless shopping experience, whether you prefer to visit us in person or order online.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div className="card">
            <h3 style={{ color: "#ff6a00", marginTop: 0 }}>Our mission</h3>
            <p style={{ marginBottom: 0 }}>
              To provide Harare residents with a diverse range of premium breakfast products, combining convenience, quality, and affordability in both physical and digital spaces.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "#ff6a00", marginTop: 0 }}>Our vision</h3>
            <p style={{ marginBottom: 0 }}>
              To be Harare's most trusted breakfast destination, recognized for curating exceptional products and delivering outstanding customer experiences.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "#ff6a00", marginTop: 0 }}>Our values</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>Quality and authenticity in every product</li>
              <li>Customer-centric service and support</li>
              <li>Convenience and accessibility</li>
              <li>Community and local partnership</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h2>Why choose Goumert Crunch?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <div>
              <h4 style={{ color: "#ff6a00", margin: "0 0 0.5rem" }}>Curated selection</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                We handpick local and international breakfast brands to ensure quality and variety for all tastes and dietary preferences.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#ff6a00", margin: "0 0 0.5rem" }}>Dual access</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                Shop at our Harare physical location or order online with convenient delivery to your doorstep.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#ff6a00", margin: "0 0 0.5rem" }}>Affordable pricing</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                Competitive prices and regular promotions make quality breakfast solutions accessible to everyone.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#ff6a00", margin: "0 0 0.5rem" }}>Customer support</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                Our dedicated team is ready to assist with product recommendations, orders, and any questions.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ background: "linear-gradient(135deg, rgba(255,106,0,0.1), rgba(255,255,255,0.02))", borderColor: "rgba(255,106,0,0.3)" }}>
          <h2 style={{ marginTop: 0 }}>Get in touch</h2>
          <p>Have questions or want to learn more about Goumert Crunch?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ margin: 0 }}>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@goumert.co.zw" style={{ color: "#ff6a00" }}>
                info@goumert.co.zw
              </a>
            </p>
            <p style={{ margin: 0 }}>
              <strong>Phone:</strong> <span>+263 (0)1 234 5678</span>
            </p>
            <p style={{ margin: 0 }}>
              <strong>Location:</strong> Harare, Zimbabwe
            </p>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ marginTop: "3rem" }}>
        <p>Breakfast Made Easy — Goumert Crunch, Harare's premier breakfast destination.</p>
      </footer>
    </main>
  );
}
