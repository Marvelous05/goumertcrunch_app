"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  }

  return (
    <main className="page-container">
      <section className="hero-card" style={{ marginBottom: "2.5rem" }}>
        <div className="hero-copy">
          <span className="overline">Contact</span>
          <h1>Send your message to Goumert Crunch.</h1>
          <p className="subtitle">Need product help, order support, or business details? Our team is ready to respond fast.</p>
        </div>
        <div className="hero-panel">
          <span className="hero-badge">Support ready</span>
          <p style={{ margin: 0, color: "#ccc", lineHeight: 1.75 }}>
            Reach out with your order questions or partnership ideas and we’ll reply as soon as possible.
          </p>
        </div>
      </section>

      <div className="feature-grid" style={{ marginBottom: "2rem" }}>
        <div className="feature-card">
          <h3>Office location</h3>
          <p>123 Breakfast Avenue, Harare</p>
          <p style={{ margin: "0.75rem 0 0" }}>
            <strong>Phone:</strong>
            <br />
            <a href="tel:+263123456789" style={{ color: "#ff6a00", textDecoration: "none" }}>
              +263 (0)1 234 5678
            </a>
          </p>
          <p style={{ margin: "0.75rem 0 0" }}>
            <strong>Email:</strong>
            <br />
            <a href="mailto:info@goumert.co.zw" style={{ color: "#ff6a00", textDecoration: "none" }}>
              info@goumert.co.zw
            </a>
          </p>
        </div>
        <div className="feature-card">
          <h3>Business hours</h3>
          <p>Monday – Friday · 7:00 AM – 6:00 PM</p>
          <p>Saturday · 8:00 AM – 4:00 PM</p>
          <p>Sunday · Closed</p>
          <p className="small-note" style={{ marginTop: "1rem" }}>
            Online orders accepted 24/7. Same-day delivery available for orders placed before noon.
          </p>
        </div>
      </div>

      <div className="grid-cards">
        <div className="card">
          <h2>Send a message</h2>
          {submitted ? (
            <div className="feature-card" style={{ padding: "1.5rem", borderRadius: "24px", border: "1px solid rgba(255, 106, 0, 0.25)", background: "rgba(255, 106, 0, 0.06)" }}>
              <h3 style={{ color: "#ff6a00", margin: "0 0 0.5rem" }}>Thank you!</h3>
              <p style={{ margin: 0, color: "#ccc" }}>We've received your message and will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
              <label>
                Full name *
                <input className="input-field" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </label>
              <label>
                Email address *
                <input className="input-field" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              </label>
              <label>
                Phone number
                <input className="input-field" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+263 (0)1 234 5678" />
              </label>
              <label>
                Subject
                <select className="select-field" name="subject" value={formData.subject} onChange={handleChange}>
                  <option value="">Select a subject</option>
                  <option value="inquiry">General inquiry</option>
                  <option value="business">Business partnership</option>
                  <option value="support">Customer support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Message *
                <textarea className="textarea-field" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us what's on your mind..." rows={6} />
              </label>
              <button type="submit" className="button-primary">
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="card">
          <h2>Need assistance?</h2>
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ padding: "1rem", borderRadius: "22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,106,0,0.12)" }}>
              <h3 style={{ margin: "0 0 0.5rem" }}>Quick response</h3>
              <p style={{ margin: 0, color: "#d1d1d1" }}>We typically reply within 2 hours during business hours.</p>
            </div>
            <div style={{ padding: "1rem", borderRadius: "22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,106,0,0.12)" }}>
              <h3 style={{ margin: "0 0 0.5rem" }}>Follow us</h3>
              <div style={{ display: "flex", gap: "0.85rem" }}>
                <a className="nav-button" href="#">f</a>
                <a className="nav-button" href="#">𝕏</a>
                <a className="nav-button" href="#">in</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ marginTop: "3rem" }}>
        <p>We're here to help. Contact us anytime for questions about our products or services.</p>
      </footer>
    </main>
  );
}
