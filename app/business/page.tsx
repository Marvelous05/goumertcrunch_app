"use client";

import { FormEvent, useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  category: string;
};
type Order = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  client: { name: string };
  orderItems: { product: { name: string }; quantity: number; price: number }[];
};
type Analytics = { revenue: number; orders: number; stockValue: number; expenses: number; profit: number; };
type User = { id: string; name: string; email: string; role: string };

type NewProductForm = {
  name: string;
  description: string;
  category: string;
  price: string;
  stock: string;
};

const emptyProductForm: NewProductForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  stock: "",
};

export default function BusinessDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<NewProductForm>(emptyProductForm);

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

  const totalUnits = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockItems = products.filter((product) => product.stock <= 8).length;
  const totalInventoryValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);

  function handleDownload(type: "orders" | "stock") {
    window.open(`/api/reports?type=${type}`, "_blank");
  }

  function handleLogout() {
    window.localStorage.removeItem("goumert_user");
    window.localStorage.removeItem("goumert_token");
    setUser(null);
  }

  async function handleAddProduct(event: FormEvent) {
    event.preventDefault();
    const token = window.localStorage.getItem("goumert_token");

    if (!token) {
      setMessage("Please sign in again before adding a product.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (!payload.name || !payload.category || Number.isNaN(payload.price) || Number.isNaN(payload.stock)) {
      setMessage("Please complete all required product fields.");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to create product.");
      }

      setProducts((current) => [data.product, ...current]);
      setForm(emptyProductForm);
      setMessage(`${data.product.name} was added to the stock list.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create product.");
    } finally {
      setSubmitting(false);
    }
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

      <div className="card header-card">
        <div>
          <p style={{ margin: 0, fontWeight: 700 }}>Signed in as {user.name}</p>
          <p className="small-note" style={{ margin: 0 }}>{user.email}</p>
        </div>
        <div className="header-actions">
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
        <div className="card success-card" style={{ marginTop: "1.5rem" }}>
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
        <h2>Inventory overview</h2>
      </section>

      <div className="grid-cards" style={{ marginBottom: "1.5rem" }}>
        <div className="section-card">
          <p className="small-note" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.2em" }}>Products</p>
          <p style={{ fontSize: "1.8rem", margin: "0.35rem 0 0" }}>{products.length}</p>
        </div>
        <div className="section-card">
          <p className="small-note" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.2em" }}>Units in stock</p>
          <p style={{ fontSize: "1.8rem", margin: "0.35rem 0 0" }}>{totalUnits}</p>
        </div>
        <div className="section-card">
          <p className="small-note" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.2em" }}>Low stock alerts</p>
          <p style={{ fontSize: "1.8rem", margin: "0.35rem 0 0" }}>{lowStockItems}</p>
        </div>
        <div className="section-card">
          <p className="small-note" style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.2em" }}>Inventory value</p>
          <p style={{ fontSize: "1.8rem", margin: "0.35rem 0 0" }}>${totalInventoryValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="inventory-layout">
        <section className="card">
          <div className="stacked-title">
            <div>
              <h3 style={{ margin: 0 }}>Stock table</h3>
              <p className="small-note" style={{ margin: "0.25rem 0 0" }}>Track every product, availability, and unit count from one view.</p>
            </div>
          </div>

          <div className="table-shell">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const status = product.stock === 0 ? "Out of stock" : product.stock <= 8 ? "Low stock" : "In stock";
                  return (
                    <tr key={product.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{product.name}</div>
                        <div className="small-note" style={{ fontSize: "0.9rem" }}>{product.description}</div>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>
                        <span className={`status-pill ${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>
                      </td>
                      <td>${product.price.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card">
          <div className="stacked-title">
            <div>
              <h3 style={{ margin: 0 }}>Add a new product</h3>
              <p className="small-note" style={{ margin: "0.25rem 0 0" }}>Keep the catalog current with a quick product entry form.</p>
            </div>
          </div>

          <form className="product-form" onSubmit={handleAddProduct}>
            <label>
              Product name
              <input className="input-field" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Crunch Box" required />
            </label>
            <label>
              Category
              <input className="input-field" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} placeholder="e.g. Snacks" required />
            </label>
            <label>
              Price
              <input className="input-field" type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} placeholder="0.00" required />
            </label>
            <label>
              Stock level
              <input className="input-field" type="number" min="0" step="1" value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))} placeholder="0" required />
            </label>
            <label>
              Description
              <textarea className="textarea-field" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Describe the product" rows={4} />
            </label>
            <button className="button-primary" type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Add product"}
            </button>
          </form>
        </section>
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
    </main>
  );
}
