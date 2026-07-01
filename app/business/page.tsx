"use client";

import { useEffect, useState } from "react";

type Product = { id: string; name: string; stock: number; price: number; };
type Order = { id: string; status: string; total: number; createdAt: string; client: { name: string }; orderItems: { product: { name: string }; quantity: number; price: number }[] };
type Analytics = { revenue: number; orders: number; stockValue: number; expenses: number; profit: number; };
type User = { id: string; name: string; email: string; role: string };

export default function BusinessDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("goumert_user");
    const token = window.localStorage.getItem("goumert_token");
    if (!storedUser || !token) return;
    setUser(JSON.parse(storedUser));

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("/api/products", { headers }).then((res) => res.json()),
      fetch("/api/orders?for=business", { headers }).then((res) => res.json()),
      fetch("/api/analytics", { headers }).then((res) => res.json()),
    ])
      .then(([productsData, ordersData, analyticsData]) => {
        setProducts(productsData.products || []);
        setOrders(ordersData.orders || []);
        setAnalytics(analyticsData.analytics || null);
      })
      .catch(() => setMessage("Unable to load business data."))
      .finally(() => setLoading(false));
  }, []);

  function handleDownload(type: "orders" | "stock") {
    window.open(`/api/reports?type=${type}`, "_blank");
  }

  function handleLogout() {
    window.localStorage.removeItem("goumert_user");
    window.localStorage.removeItem("goumert_token");
    setUser(null);
  }

  if (!user) {
    return (
      <main className="page-container">
        <div className="card" style={{ textAlign: "center" }}>
          <h2>Business access required</h2>
          <p className="small-note">Please sign in from the business login page to manage orders, stock and analytics.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="section-heading">
        <div style={{ width: "4px", height: "40px", background: "var(--brand-orange)" }} />
        <div>
          <h2>Business dashboard</h2>
          <p className="small-note">Orders, stock levels, analytics, accounting and downloads for Goumert Crunch.</p>
        </div>
      </div>

      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700 }}>Signed in as {user.name}</p>
          <p className="small-note" style={{ margin: 0 }}>{user.email}</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button className="button-secondary" onClick={() => handleDownload("orders")}>
            Download orders report
          </button>
          <button className="button-secondary" onClick={() => handleDownload("stock")}>
            Download stock report
          </button>
          <button className="button-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>

      {message ? (
        <div className="card" style={{ borderColor: "#ff6a00", marginTop: "1.5rem" }}>
          <p style={{ margin: 0 }}>{message}</p>
        </div>
      ) : null}

      <section className="section-heading" style={{ marginTop: "1.5rem" }}>
        <h2>Quick analytics</h2>
      </section>

      <div className="grid-cards">
        <div className="metric-card">
          <h3>Revenue</h3>
          <p style={{ fontSize: "1.5rem", margin: 0 }}>${analytics?.revenue.toFixed(2) ?? "0.00"}</p>
        </div>
        <div className="metric-card">
          <h3>Orders</h3>
          <p style={{ fontSize: "1.5rem", margin: 0 }}>{analytics?.orders ?? 0}</p>
        </div>
        <div className="metric-card">
          <h3>Stock value</h3>
          <p style={{ fontSize: "1.5rem", margin: 0 }}>${analytics?.stockValue.toFixed(2) ?? "0.00"}</p>
        </div>
        <div className="metric-card">
          <h3>Estimated profit</h3>
          <p style={{ fontSize: "1.5rem", margin: 0 }}>${analytics?.profit.toFixed(2) ?? "0.00"}</p>
        </div>
      </div>

      <section className="section-heading" style={{ marginTop: "1.5rem" }}>
        <h2>Open orders</h2>
      </section>

      <div className="grid-cards">
        {loading ? (
          <p>Loading orders…</p>
        ) : orders.length === 0 ? (
          <p className="small-note">No orders yet. Client purchases will appear here.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>{order.client.name}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p className="small-note">Created: {new Date(order.createdAt).toLocaleString()}</p>
              <div style={{ marginTop: "1rem" }}>
                {order.orderItems.map((item, index) => (
                  <p key={index} style={{ margin: "0.3rem 0" }}>
                    {item.quantity} x {item.product.name} @ ${item.price.toFixed(2)}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <section className="section-heading" style={{ marginTop: "1.5rem" }}>
        <h2>Stock levels</h2>
      </section>

      <div className="grid-cards">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Stock: {product.stock}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
