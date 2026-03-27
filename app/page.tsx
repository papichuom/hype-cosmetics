"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "All" | "Perfumes" | "Machines" | "Wigs";

interface Product {
  id: number;
  name: string;
  price: number;
  category: Exclude<Category, "All">;
  sizes: string[];
  description: string;
  image: string;
  badge?: string;
  rating: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Velvet Noir",
    price: 4500,
    category: "Perfumes",
    sizes: ["30ml", "50ml", "100ml"],
    badge: "Bestseller",
    description:
      "A rich oriental fragrance with dark oud, vanilla musk and sandalwood base notes.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Rose Oud",
    price: 6200,
    category: "Perfumes",
    sizes: ["50ml", "100ml"],
    badge: "New",
    description:
      "Delicate Bulgarian rose layered over smoky oud and warm amber for a timeless signature.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    rating: 4.9,
  },

  {
    id: 5,
    name: "Glow Facial Steamer",
    price: 3800,
    category: "Machines",
    sizes: ["Standard"],
    badge: "Bestseller",
    description:
      "Nano-ionic steam opens pores, deeply hydrates and preps skin for serums and masks.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
    rating: 4.6,
  },

  {
    id: 9,
    name: "Silky Straight Lace",
    price: 12500,
    category: "Wigs",
    sizes: ['12"', '16"', '18"', '22"'],
    badge: "New",
    description:
      "100% human hair silky straight wig with invisible HD lace front for a natural hairline.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    rating: 4.9,
  },
];

const CATEGORIES: Category[] = ["All", "Perfumes", "Machines", "Wigs"];

const SLIDES = [
  {
    tag: "Limited Offer",
    headline: "Up to 50% Off",
    sub: "on Selected Perfumes",
    cta: "Browse Perfumes",
    category: "Perfumes" as Category,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=80",
    accent: "#c17f47",
  },
  {
    tag: "New Arrivals",
    headline: "Glow Up Devices",
    sub: "Professional Beauty Machines",
    cta: "Browse Machines",
    category: "Machines" as Category,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
    accent: "#b05d8e",
  },
  {
    tag: "Just Dropped",
    headline: "Premium Wigs",
    sub: "HD Lace · 100% Human Hair, semi-human & syntentic",
    cta: "Browse Wigs",
    category: "Wigs" as Category,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
    accent: "#4a7fa5",
  },
];

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            fontSize: 11,
            color: s <= Math.round(rating) ? "#f59e0b" : "#d1d5db",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #f3f4f6",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.12)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 220,
          overflow: "hidden",
          background: "#f9fafb",
          flexShrink: 0,
        }}
      >
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 2,
              background:
                product.badge === "Luxury"
                  ? "#1a1a1a"
                  : product.badge === "New"
                    ? "#16a34a"
                    : product.badge === "Premium"
                      ? "#7c3aed"
                      : "#dc2626",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              padding: "3px 9px",
              borderRadius: 4,
              textTransform: "uppercase" as const,
            }}
          >
            {product.badge}
          </span>
        )}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
              transform: hovered ? "scale(1.07)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              background: "#f3f4f6",
            }}
          >
            {product.category === "Perfumes"
              ? "🫙"
              : product.category === "Machines"
                ? "⚙️"
                : "👑"}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "16px 18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: "#9ca3af",
            }}
          >
            {product.category}
          </span>
          <Stars rating={product.rating} />
        </div>

        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#111827",
            lineHeight: 1.35,
            fontFamily: "'Playfair Display', Georgia, serif",
            margin: 0,
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: 12,
            color: "#6b7280",
            lineHeight: 1.6,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        <div style={{ marginTop: 2 }}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                style={{
                  padding: "4px 9px",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 0.3,
                  border: `1.5px solid ${selectedSize === sz ? "#111827" : "#e5e7eb"}`,
                  borderRadius: 5,
                  background: selectedSize === sz ? "#111827" : "#fff",
                  color: selectedSize === sz ? "#fff" : "#6b7280",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 10,
            borderTop: "1px solid #f3f4f6",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#111827",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Ksh {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [slide, setSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const nextSlide = useCallback(
    () => setSlide((s) => (s + 1) % SLIDES.length),
    [],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [nextSlide]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const filtered = PRODUCTS.filter((p) => {
    const catOk = activeCategory === "All" || p.category === activeCategory;
    const searchOk =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return catOk && searchOk;
  });

  const current = SLIDES[slide];
  if (!mounted) return null;

  const scrollToCatalogue = (cat?: Category) => {
    if (cat) setActiveCategory(cat);
    setMenuOpen(false);
    setTimeout(
      () =>
        document
          .getElementById("catalogue")
          ?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Poppins:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f9fafb; font-family: 'DM Sans', sans-serif; }
        button { cursor: pointer; font-family: inherit; }
        a { text-decoration: none; color: inherit; }
        ::placeholder { color: #9ca3af; }
        input:focus { outline: none; }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-content { animation: fadeSlide 0.6s ease both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .product-card { animation: fadeUp 0.5s ease both; }
        ${filtered.map((_, i) => `.product-card:nth-child(${i + 1}){animation-delay:${i * 0.06}s}`).join("")}

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: slideDown 0.2s ease both; }

        /* ── Responsive grid ── */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
          gap: 22px;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .footer-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
        }

        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .category-grid { grid-template-columns: 1fr; gap: 10px; }
          .features-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .desktop-search { display: none !important; }
          .mobile-icons { display: flex !important; }
          .desktop-spacer { display: none !important; }
          .catalogue-header { flex-direction: column !important; align-items: flex-start !important; }
          .footer-grid { flex-direction: column; gap: 28px; }
        }

        @media (max-width: 480px) {
          .product-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .category-grid { grid-template-columns: 1fr; }
        }

        /* Category tab scroll on mobile */
        .cat-tabs {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .cat-tabs::-webkit-scrollbar { display: none; }
        .cat-tab { white-space: nowrap; flex-shrink: 0; }
      `}</style>

      {/* ── Announcement ──────────────────────────────────────────────── */}
      <div
        style={{
          background: "#111827",
          color: "#f3f4f6",
          textAlign: "center",
          padding: "9px 16px",
          fontSize: 11,
          letterSpacing: 1.5,
          fontWeight: 500,
        }}
      >
        📍 &nbsp; Baroda, Mombasa Kenya &nbsp;·&nbsp; +25419382075 &nbsp; ✦
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <header
        style={{
          background: "#000",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 20px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo.png" // change path if needed
              alt="Hype Cosmetics"
              className="hidden lg:block"
              width={100}
              height={100}
              style={{ height: 100, objectFit: "contain" }}
            />
          </Link>

          {/* Desktop search */}
          <div
            className="desktop-search"
            style={{
              display: "flex",
              marginLeft: "auto", // 🔥 pushes to far right on large screens
              alignItems: "right",
              background: "#f9fafb",
              border: "1.5px solid #e5e7eb",
              borderRadius: 32,
              padding: "0 18px",
              width: "min(460px,50%)",
              height: 42,
              gap: 10,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#111827";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
            }}
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perfumes, machines, wigs…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                fontSize: 13,
                color: "#111827",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  fontSize: 18,
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Mobile icons */}
          <div
            className="mobile-icons"
            style={{ display: "none", alignItems: "center", gap: 8 }}
          >
            <button
              onClick={() => {
                setSearchOpen((v) => !v);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "8px",
                color: "#374151",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              onClick={() => {
                setMenuOpen((v) => !v);
                setSearchOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "8px",
                color: "#374151",
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: menuOpen ? "transparent" : "#374151",
                  transition: "all 0.2s",
                  transform: menuOpen
                    ? "rotate(45deg) translate(5px,5px)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#374151",
                  transition: "all 0.2s",
                  transform: menuOpen ? "rotate(-45deg)" : "none",
                }}
              />
              {!menuOpen && (
                <span
                  style={{
                    display: "block",
                    width: 14,
                    height: 2,
                    background: "#374151",
                  }}
                />
              )}
            </button>
          </div>

          <div className="desktop-spacer" style={{ width: 80 }} />
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div
            style={{
              padding: "10px 16px",
              borderTop: "1px solid #f3f4f6",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f9fafb",
                border: "1.5px solid #e5e7eb",
                borderRadius: 32,
                padding: "0 16px",
                height: 40,
                gap: 8,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  fontSize: 14,
                  color: "#111827",
                  outline: "none",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    fontSize: 18,
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div
            className="mobile-menu"
            style={{
              background: "#fff",
              borderTop: "1px solid #f3f4f6",
              padding: "8px 0 12px",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCatalogue(cat)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 20px",
                  background: "none",
                  border: "none",
                  fontSize: 14,
                  fontWeight: activeCategory === cat ? 700 : 400,
                  color: activeCategory === cat ? "#111827" : "#6b7280",
                  borderLeft:
                    activeCategory === cat
                      ? "3px solid #111827"
                      : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero Banner ───────────────────────────────────────────────── */}
      <section
        style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 16px" }}>
          <div
            style={{
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              height: "clamp(240px, 45vw, 480px)",
              background: "#111827",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={slide}
              src={current.image}
              alt={current.headline}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.35,
                transition: "opacity 0.6s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(110deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 100%)",
              }}
            />

            <div
              key={`c-${slide}`}
              className="slide-content"
              style={{
                position: "relative",
                zIndex: 2,
                padding: "clamp(20px,5vw,72px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                maxWidth: 540,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginBottom: 10,
                  background: current.accent,
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  borderRadius: 4,
                  width: "fit-content",
                }}
              >
                {current.tag}
              </span>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(26px,5vw,60px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 8,
                  letterSpacing: -0.5,
                }}
              >
                {current.headline}
              </h1>
              <p
                style={{
                  fontSize: "clamp(13px,2vw,16px)",
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: 24,
                  fontWeight: 300,
                }}
              >
                {current.sub}
              </p>
              <button
                onClick={() => scrollToCatalogue(current.category)}
                style={{
                  width: "fit-content",
                  padding: "11px 28px",
                  background: "#fff",
                  color: "#111827",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 0.5,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    current.accent;
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#fff";
                  (e.currentTarget as HTMLElement).style.color = "#111827";
                }}
              >
                {current.cta} →
              </button>
            </div>

            {/* Dots */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 7,
                zIndex: 3,
              }}
            >
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{
                    width: i === slide ? 26 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: "none",
                    background: i === slide ? "#fff" : "rgba(255,255,255,0.35)",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Arrows — hidden on small screens */}
            {[
              { label: "‹", dir: -1, side: { left: 12 } },
              { label: "›", dir: 1, side: { right: 12 } },
            ].map(({ label, dir, side }) => (
              <button
                key={label}
                onClick={() =>
                  setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length)
                }
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  ...side,
                  zIndex: 3,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.15)";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Categories ────────────────────────────────────────── 
      <section
        style={{
          background: "#fff",
          padding: "32px 0",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 20,
              fontWeight: 600,
              color: "#111827",
              marginBottom: 20,
            }}
          >
            Popular Categories
          </h2>
          <div className="category-grid">
            {[
              {
                cat: "Perfumes" as Category,
                emoji: "🫙",
                desc: "12 Fragrances",
                color: "#fdf2e9",
                border: "#f4d5b0",
              },
              {
                cat: "Machines" as Category,
                emoji: "⚙️",
                desc: "8 Devices",
                color: "#f0fdf4",
                border: "#bbf7d0",
              },
              {
                cat: "Wigs" as Category,
                emoji: "👑",
                desc: "16 Styles",
                color: "#fdf4ff",
                border: "#e9d5ff",
              },
            ].map(({ cat, emoji, desc, color, border }) => (
              <button
                key={cat}
                onClick={() => scrollToCatalogue(cat)}
                style={{
                  background: color,
                  border: `1.5px solid ${border}`,
                  borderRadius: 12,
                  padding: "20px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize: 32, flexShrink: 0 }}>{emoji}</span>
                <div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#111827",
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {cat}
                  </p>
                  <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                    {desc} Available
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ── Catalogue ─────────────────────────────────────────────────── */}
      <section
        id="catalogue"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 16px 72px" }}
      >
        <div
          className="catalogue-header"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 24,
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 14,
                color: "#9ca3af",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 5,
              }}
            >
              Our Collection
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(20px,3vw,28px)",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {activeCategory === "All" ? "All Products" : activeCategory}
            </h2>
          </div>

          {/* Scrollable tabs */}
          <div
            style={{
              background: "#fff",
              padding: 4,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <div className="cat-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className="cat-tab"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 7,
                    border: "none",
                    background:
                      activeCategory === cat ? "#111827" : "transparent",
                    color: activeCategory === cat ? "#fff" : "#6b7280",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "#e5e7eb", marginBottom: 28 }} />

        {searchQuery && (
          <p style={{ marginBottom: 18, fontSize: 13, color: "#6b7280" }}>
            Showing results for{" "}
            <strong style={{ color: "#111827" }}>"{searchQuery}"</strong> —{" "}
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found.
          </p>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 44, marginBottom: 14 }}>🔍</p>
            <p
              style={{
                fontSize: 20,
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#374151",
                marginBottom: 8,
              }}
            >
              No products found
            </p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              Try a different search term or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              style={{
                marginTop: 18,
                padding: "10px 24px",
                background: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          padding: "32px 16px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="features-grid">
            {[
              {
                icon: "🚚",
                title: "Delivery Countrywide",
              },
              {
                icon: "↩️",
                title: "Free Returns",
              },
              {
                icon: "💬",
                title: "24/7 Support",
              },
              { icon: "🛡️", title: "Guaranteed Quality" },
            ].map(({ icon, title }) => (
              <div
                key={title}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}
                  >
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer style={{ background: "#0f172a", padding: "48px 16px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              borderTop: "1px solid #1e293b",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <p style={{ fontSize: 11, color: "#4b5563" }}>
              © 2026 Hype Cosmetics. All rights reserved.
            </p>
            <p style={{ fontSize: 11, color: "#4b5563" }}>thinkDigital.ke</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
