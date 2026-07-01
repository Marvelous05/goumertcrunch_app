export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-grid">
          <div>
            <h4>Goumert Crunch</h4>
            <p style={{ margin: 0, color: "#c7c7c7", lineHeight: 1.8 }}>
              Breakfast Made Easy
            </p>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="mailto:info@goumert.co.zw">goumertcrunch@gmail.com</a>
              </li>
              <li>
                <span>+263785456313</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,106,0,0.14)", paddingTop: "1.5rem", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#777", fontSize: "0.92rem" }}>
            © {currentYear} Goumert Crunch. All rights reserved. Harare, Zimbabwe.
          </p>
        </div>
      </div>
    </footer>
  );
}
