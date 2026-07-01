"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("goumert_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isClient = pathname?.startsWith("/client");
  const isBusiness = pathname?.startsWith("/business");
  const isHome = pathname === "/";

  return (
    <nav className="site-header">
      <div className="site-brand">
        <Link href="/" className="brand-mark" />
        <div className="brand-title">
          <strong>Goumert Crunch</strong>
          <span className="brand-tag">Breakfast Made Easy</span>
        </div>
      </div>

      <div className="nav-links">
        <Link href="/" className={pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
        <Link href="/about" className={pathname === "/about" ? "nav-link active" : "nav-link"}>
          About
        </Link>
        <Link href="/contact" className={pathname === "/contact" ? "nav-link active" : "nav-link"}>
          Contact
        </Link>
        {isClient && (
          <Link href="/client" className={pathname === "/client" ? "nav-link active" : "nav-link"}>
            Shop
          </Link>
        )}
        {isBusiness && (
          <Link href="/business" className={pathname === "/business" ? "nav-link active" : "nav-link"}>
            Dashboard
          </Link>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <span style={{ color: "#ccc", fontSize: "0.95rem" }}>
            {user.name} • {user.role === "CLIENT" ? "Client" : "Business"}
          </span>
        ) : (
          <>
            {!isHome && (
              <>
                <Link href="/client/login" className="nav-button">
                  Client
                </Link>
                <Link href="/business/login" className="nav-button primary">
                  Business
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
