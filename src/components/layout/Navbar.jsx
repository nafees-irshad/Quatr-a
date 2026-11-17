import "@fontsource/syncopate";
import "@fontsource/syncopate/700.css";
import "@fontsource-variable/syne";
import "@fontsource-variable/gabarito";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/atelier", label: "Atelier" },
    { to: "/story", label: "Story" },
  ];

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
        {/* ── Left: logo + tagline ── */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 no-underline"
          aria-label="Quatréa home"
        >
          <span className="font-['Syncopate',sans-serif] text-[20px] font-bold leading-none tracking-[0.18em] text-[#f7f5f0] max-[760px]:text-[16px]">
            QUATRÉA
          </span>
          {/* divider */}
          {/* <span
            className="hidden h-5 w-px bg-white/25 max-[900px]:hidden sm:block"
            aria-hidden="true"
          /> */}
          {/* <span className="hidden text-[10px] font-['Syncopate',sans-serif] uppercase tracking-[0.22em] text-white/60 max-[900px]:hidden sm:block">
            Botanical Fragrances
          </span> */}
        </Link>

        {/* ── Center: nav links ── */}
        <nav
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[clamp(18px,2.6vw,42px)] max-[760px]:hidden"
          aria-label="Main navigation"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative py-0 text-[13px] font-['Syne_variable'] font-bold tracking-[0.14em] no-underline transition-colors duration-200
                ${
                  isActive
                    ? "text-[#d7c49c] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[#d7c49c] after:content-['']"
                    : "text-white/65 hover:text-[#f7f5f0]"
                }`
              }
            >
              {label}
            </NavLink>
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
            onClick={() => setIsCartOpen(true)}
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
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white/75 no-underline transition-colors hover:bg-white/6 hover:text-[#d7c49c]"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
