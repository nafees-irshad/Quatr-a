import "@fontsource/syncopate";
import "@fontsource/syncopate/700.css";
import "@fontsource-variable/syne";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { getLenis } from "../lib/lenis";

// id = the section's id on the home page (null = top of page)
const navLinks = [
  { key: "home", id: null, label: "Home" },
  { key: "collection", id: "collection", label: "Collection" },
  { key: "atelier", id: "seasons", label: "Atelier" },
  { key: "story", id: "story", label: "Story" },
  { key: "essence", id: "more-than-perfume", label: "Essence" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("home");
  const lockUntil = useRef(0); // pause auto-highlight right after a click
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const isHome = pathname === "/";

  const scrollToId = useCallback((id) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(id ? `#${id}` : 0, { duration: 1.4 });
      return;
    }
    // fallback (e.g. reduced-motion users)
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNavClick = (e, key, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveKey(key);
    lockUntil.current = Date.now() + 1200;

    if (isHome) {
      scrollToId(id);
    } else {
      // From /cart or /checkout: go home first, then scroll
      navigate("/", { state: { scrollTo: id ?? "top" } });
    }
  };

  // After arriving on home from another page, scroll to the chosen section
  useEffect(() => {
    if (!isHome || !state?.scrollTo) return;
    const id = state.scrollTo === "top" ? null : state.scrollTo;
    const t = setTimeout(() => {
      scrollToId(id);
      window.history.replaceState({}, "");
    }, 100);
    return () => clearTimeout(t);
  }, [isHome, state, scrollToId]);

  // Navbar background on scroll + "Home" highlight near the top
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);

      if (!isHome || Date.now() < lockUntil.current) return;
      const first = document.getElementById("collection");
      if (
        first &&
        first.getBoundingClientRect().top > window.innerHeight * 0.55
      ) {
        setActiveKey("home");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Highlight the section that crosses the middle of the screen
  useEffect(() => {
    if (!isHome) {
      setActiveKey(null);
      return;
    }

    const sections = navLinks
      .filter((l) => l.id)
      .map((l) => ({ key: l.key, el: document.getElementById(l.id) }))
      .filter((s) => s.el);

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = sections.find((s) => s.el === entry.target);
          if (match) setActiveKey(match.key);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-3 max-[760px]:px-6 max-[760px]:pt-2">
      {/* Floating pill */}
      <div
        className={`
          flex w-full max-w-[1160px] items-center justify-between
          rounded-lg border px-6 py-2 transition-all duration-300
          max-[760px]:px-4 max-[760px]:py-1
          ${
            isScrolled
              ? "border-white/10 bg-[rgba(10,10,10,0.82)] shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-[18px]"
              : "border-white/10 bg-[rgba(14,14,13,0.72)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-[14px]"
          }
        `}
      >
        {/* ── Left: logo ── */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "home", null)}
          className="flex shrink-0 items-center gap-3 no-underline"
          aria-label="Quatréa home"
        >
          <span className="font-['Syncopate',sans-serif] text-[20px] font-bold leading-none tracking-[0.18em] text-[#f7f5f0] max-[760px]:text-[16px]">
            QUATRÉA
          </span>
        </a>

        {/* ── Center: nav links ── */}
        <nav
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[clamp(18px,2.6vw,42px)] max-[760px]:hidden"
          aria-label="Main navigation"
        >
          {navLinks.map(({ key, id, label }) => (
            <a
              key={key}
              href={id ? `/#${id}` : "/"}
              onClick={(e) => handleNavClick(e, key, id)}
              className={`relative cursor-pointer py-0 text-[13px] font-['Syne_variable'] font-bold tracking-[0.14em] no-underline transition-colors duration-200
                ${
                  activeKey === key
                    ? "text-[#d7c49c] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[#d7c49c] after:content-['']"
                    : "text-white/65 hover:text-[#f7f5f0]"
                }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Right: search + cart ── */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-white/65 transition-colors hover:bg-white/8 hover:text-[#d7c49c]"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-white/65 transition-colors hover:bg-white/8 hover:text-[#d7c49c]"
            aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
          >
            <ShoppingBag size={16} />
            {totalItems > 0 && (
              <span className="absolute right-0 top-0 grid h-[16px] w-[16px] place-items-center rounded-full bg-[#d7c49c] text-[9px] font-bold leading-none text-[#090909]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="ml-1 hidden h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-[#f5f2ec] transition-colors hover:bg-white/8 max-[760px]:inline-flex"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-4 top-[calc(100%+6px)] flex flex-col gap-1 rounded-xl border border-white/10 bg-[rgba(10,10,10,0.95)] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-[18px] max-[760px]:flex"
        >
          {navLinks.map(({ key, id, label }) => (
            <a
              key={key}
              href={id ? `/#${id}` : "/"}
              onClick={(e) => handleNavClick(e, key, id)}
              className={`rounded-lg px-4 py-3 text-[13px] font-medium uppercase tracking-[0.14em] no-underline transition-colors hover:bg-white/6 hover:text-[#d7c49c] ${
                activeKey === key ? "text-[#d7c49c]" : "text-white/75"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
