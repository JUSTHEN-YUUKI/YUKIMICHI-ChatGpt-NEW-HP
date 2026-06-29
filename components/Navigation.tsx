"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "@/components/NewTabLink"
import { usePathname } from "next/navigation"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { multilingualUiEnabled } from "@/lib/i18n"
import { translations } from "@/lib/translations"

const navLinks = [
  { href: "/", labelKey: "top", en: "Home" },
  { href: "/about", labelKey: "about", en: "About" },
  { href: "/services", labelKey: "services", en: "Services" },
  { href: "/pricing", labelKey: "pricing", en: "Pricing" },
  { href: "/flow", labelKey: "flow", en: "Flow" },
  { href: "/quote", labelKey: "quote", en: "Quote" },
  { href: "/faq", labelKey: "faq", en: "FAQ" },
] as const

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const japaneseNavigation = translations.ja.navigation

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--nav-h)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--gutter)",
          background: scrolled ? "rgba(7,17,31,0.94)" : "rgba(7,17,31,0.2)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(6px)",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(6px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.16)"
            : "1px solid rgba(201,168,76,0.06)",
          transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        <Link
          href="/"
          aria-label="YUKIMICHI top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            minWidth: 0,
          }}
        >
          <Image
            src="/yukimichi-logo-favicon.png"
            alt="YUKIMICHI"
            width={76}
            height={76}
            priority
            style={{ objectFit: "contain", flexShrink: 0 }}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              lineHeight: 1,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(20px, 2.6vw, 36px)",
                fontWeight: 400,
                letterSpacing: "0.24em",
                color: "var(--gold)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              YUKIMICHI
            </span>
          </span>
        </Link>

        <ul
          className="nav-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            listStyle: "none",
          }}
        >
          {navLinks.map(({ href, labelKey, en }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
            const label = japaneseNavigation[labelKey]

            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    padding: "7px 10px",
                    fontWeight: 300,
                    color: active ? "var(--gold)" : "var(--washi-dim)",
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    lang="ja"
                    style={{
                      fontSize: "10.5px",
                      letterSpacing: "0.15em",
                      lineHeight: 1.15,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    lang="en"
                    style={{
                      color: active ? "rgba(201,168,76,0.78)" : "rgba(248,245,239,0.5)",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      lineHeight: 1.1,
                      textTransform: "uppercase",
                    }}
                  >
                    {en}
                  </span>
                </Link>
              </li>
            )
          })}
          {multilingualUiEnabled && (
            <li style={{ marginLeft: "10px" }}>
              <LanguageSwitcher />
            </li>
          )}
          <li style={{ marginLeft: "14px" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                minHeight: "38px",
                padding: "8px 18px",
                border: "1px solid rgba(201,168,76,0.32)",
                background: "rgba(139,30,47,0.34)",
                color: "var(--washi)",
                textDecoration: "none",
                fontWeight: 300,
                borderRadius: "1px",
                whiteSpace: "nowrap",
              }}
            >
              <span lang="ja" style={{ fontSize: "10.5px", letterSpacing: "0.15em", lineHeight: 1.15 }}>
                {japaneseNavigation.contact}
              </span>
              <span
                lang="en"
                style={{
                  color: "rgba(248,245,239,0.58)",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                }}
              >
                Contact
              </span>
            </Link>
          </li>
        </ul>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "6px",
            cursor: "pointer",
            padding: "10px",
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.16)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--washi)",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                transform:
                  menuOpen && i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : menuOpen && i === 2
                      ? "translateY(-7px) rotate(-45deg)"
                      : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "linear-gradient(180deg, rgba(7,17,31,0.98) 0%, rgba(13,28,53,0.98) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 40px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              display: "grid",
              gap: "18px",
              textAlign: "center",
            }}
          >
            {multilingualUiEnabled && <LanguageSwitcher variant="full" />}

            {navLinks.map(({ href, labelKey, en }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
              const label = japaneseNavigation[labelKey]

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "grid",
                    gap: "5px",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    color: active ? "var(--gold)" : "var(--washi-dim)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(201,168,76,0.1)",
                    paddingBottom: "16px",
                  }}
                >
                  <span
                    lang="ja"
                    style={{
                      fontFamily: "'Noto Sans JP', sans-serif",
                      fontSize: "21px",
                      letterSpacing: "0.16em",
                      lineHeight: 1.25,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    lang="en"
                    style={{
                      color: active ? "rgba(201,168,76,0.72)" : "rgba(248,245,239,0.5)",
                      fontSize: "20px",
                      letterSpacing: "0.13em",
                      lineHeight: 1.1,
                      textTransform: "uppercase",
                    }}
                  >
                    {en}
                  </span>
                </Link>
              )
            })}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
              style={{ display: "grid", gap: "3px", justifyContent: "center", marginTop: "12px" }}
            >
              <span lang="ja">{japaneseNavigation.contact}</span>
              <span lang="en" style={{ fontSize: "10px", opacity: 0.72 }}>Contact</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1120px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }

        @media (max-width: 520px) {
          .nav-subtitle { display: none !important; }
        }
      `}</style>
    </>
  )
}
