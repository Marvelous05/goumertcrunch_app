"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
};

type OrderItem = { productId: string; quantity: number };

type User = { id: string; name: string; email: string; role: string };

const categorySections = [
  {
    title: "Cereals",
    tagline: "Breakfast staples for every morning",
    subtitle: "From crunchy classics to family favorites",
    items: [
      { name: "Weetbix (Banana)", price: "$3.00", note: "Great for quick breakfasts" },
      { name: "Cerevita Wheat & Banana", price: "$3.00", note: "Balanced and satisfying" },
      { name: "Jungle Oats 1kg", price: "$3.00", note: "Warm, wholesome, and filling" },
      { name: "Cerevita Chocomalt", price: "$3.50", note: "A richer breakfast treat" },
      { name: "Everyday Milk", price: "$3.50", note: "Perfect with breakfast bowls" },
      { name: "Coco Pops", price: "$4.00", note: "Kid-friendly crunch" },
      { name: "Cerelac", price: "$4.50", note: "Comforting and nutritious" },
      { name: "Kellogg's Cornflakes 1kg", price: "$5.50", note: "Classic cereal choice" },
    ],
  },
  {
    title: "Glytime Foods",
    tagline: "Smart snacks and wholesome extras",
    subtitle: "A tasty selection for busy routines",
    items: [
      { name: "Oaties Oat Cookies", price: "$2.50", note: "Crunchy and light" },
      { name: "Granola 350g", price: "$3.00", note: "Sweet, nutty, and packed with texture" },
      { name: "Peanut Butter Granola 400g", price: "$3.00", note: "A richer breakfast option" },
      { name: "Rolled Oats 1kg", price: "$4.00", note: "Ideal for porridge and baking" },
    ],
  },
  {
    title: "Specials",
    tagline: "Limited-time favorites and pantry staples",
    subtitle: "Great value for everyday needs",
    items: [
      { name: "Cough Drops", price: "$1.00 each", note: "3 for $2.00" },
      { name: "Nando's Sauces 250g", price: "$3.00", note: "Bring flavor to every meal" },
      { name: "Ferrero Rocher T16", price: "$10.00", note: "A premium treat to share" },
    ],
  },
];

export default function ClientDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("goumert_user");
    const token = window.localStorage.getItem("goumert_token");
    if (!storedUser || !token) return;
    setUser(JSON.parse(storedUser));

    fetch("/api/products", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const selectedItems = useMemo(() => {
    return products
      .filter((product) => cart[product.id] > 0)
      .map((product) => ({
        ...product,
        quantity: cart[product.id],
      }));
  }, [cart, products]);

  function updateCart(productId: string, value: number) {
    const product = products.find((item) => item.id === productId);
    const maxAllowed = product ? product.stock : 99;
    setCart((current) => ({
      ...current,
      [productId]: Math.max(0, Math.min(value, maxAllowed)),
    }));
  }

  async function placeOrder() {
    const token = window.localStorage.getItem("goumert_token");
    if (!token) {
      setMessage("Please sign in first.");
      return;
    }

    const orderItems: OrderItem[] = selectedItems.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    if (!orderItems.length) {
      setMessage("Select at least one product.");
      return;
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items: orderItems }),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Could not place order.");
      return;
    }

    setMessage("Order placed successfully. Check your business dashboard for fulfillment.");
    setCart({});
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
          <h2>Client access required</h2>
          <p className="small-note">Please sign in from the client login page to view services and buy products.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="section-heading">
        <div style={{ width: "4px", height: "40px", background: "var(--brand-orange)" }} />
        <div>
          <h2>Welcome back, {user.name}</h2>
          <p className="small-note">Browse Goumert Crunch products and place your order from Harare.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <p style={{ margin: 0 }}>
          Use the default client credentials or your account details. When you place an order, the business team can manage it from the dashboard.
        </p>
        <button onClick={handleLogout} className="button-secondary" style={{ marginTop: "1rem" }}>
          Sign out
        </button>
      </div>

      {message ? (
        <div className="card" style={{ borderColor: "#ff6a00", marginBottom: "1.5rem" }}>
          <p style={{ margin: 0 }}>{message}</p>
        </div>
      ) : null}

      <section className="card" style={{ marginBottom: "1.5rem", background: "linear-gradient(135deg, rgba(255,106,0,0.12), rgba(255,255,255,0.03))", borderColor: "rgba(255,106,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h3 style={{ margin: 0, color: "#ff6a00" }}>Breakfast Made Easy</h3>
            <p style={{ margin: "0.35rem 0 0", color: "#f5f5f5" }}>Curated breakfast essentials in Harare, ready for pickup or order.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700 }}>Harare</div>
            <div className="small-note">Call: 0785 456 313</div>
          </div>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
        {categorySections.map((section) => (
          <div key={section.title} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "#ff6a00" }}>{section.title}</h3>
                <p className="small-note" style={{ margin: "0.3rem 0 0" }}>{section.tagline}</p>
              </div>
              <div className="small-note" style={{ maxWidth: "280px", textAlign: "right" }}>{section.subtitle}</div>
            </div>

            <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
              {section.items.map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "0.9rem 1rem", background: "#0f0f0f", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    <div className="small-note" style={{ marginTop: "0.2rem" }}>{item.note}</div>
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 700, color: "#ff6a00" }}>{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section-heading">
        <h2>Fresh stock & quick order</h2>
      </section>

      {loading ? (
        <p>Loading products…</p>
      ) : (
        <div className="grid-cards">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image ? <img src={product.image} alt={product.name} /> : null}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={{ margin: "0.5rem 0", fontWeight: 700 }}>${product.price.toFixed(2)}</p>
              <p className="small-note">Stock available: {product.stock}</p>
              <label style={{ display: "block", marginTop: "1rem" }}>
                Quantity
                <input
                  className="input-field"
                  type="number"
                  min={0}
                  max={product.stock}
                  value={cart[product.id] || 0}
                  onChange={(event) => updateCart(product.id, Number(event.target.value))}
                />
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h3>Order summary</h3>
        {selectedItems.length === 0 ? (
          <p className="small-note">Choose products and quantities to place an order.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {selectedItems.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <span>Total</span>
              <span>${selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
          </div>
        )}
        <button onClick={placeOrder} className="button-primary" style={{ marginTop: "1.25rem" }}>
          Place order
        </button>
      </div>
    </main>
  );
}
