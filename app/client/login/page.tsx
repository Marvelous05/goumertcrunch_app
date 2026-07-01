"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientLoginPage() {
  const [email, setEmail] = useState("client@goumert.co.zw");
  const [password, setPassword] = useState("client123");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "CLIENT" }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Unable to sign in.");
      return;
    }

    window.localStorage.setItem("goumert_user", JSON.stringify(data.user));
    window.localStorage.setItem("goumert_token", data.token);
    router.push("/client");
  }

  return (
    <main className="page-container">
      <div className="card" style={{ maxWidth: 680, margin: "0 auto" }}>
        <div className="section-heading">
          <div style={{ width: "4px", height: "40px", background: "var(--brand-orange)" }} />
          <div>
            <h2>Client login</h2>
            <p className="small-note">Sign in to browse products, place orders, and track your breakfast deliveries.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <label>
            Email
            <input className="input-field" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p style={{ color: "#ff8a7b" }}>{error}</p> : null}
          <button type="submit" className="button-primary">
            Continue to shopping
          </button>
        </form>
      </div>
    </main>
  );
}
