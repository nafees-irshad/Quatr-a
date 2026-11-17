import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Edit the links here. Each column has 2-3 links.
const linkColumns = [
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "#story" },
      { label: "Seasonal Collection", href: "#seasons" },
      { label: "Craftsmanship", href: "#more-than-perfume" },
    ],
  },
  {
    title: "Help & Info",
    links: [
      { label: "Shipping & Returns", href: "#" },
      { label: "Fragrance Guide", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#" },
      { label: "Collection", href: "#collection" },
      { label: "Story", href: "#story" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Sitemap", href: "#" },
];

// Inline icons (stroke style) so no extra icon package is needed
const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your newsletter service
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-white/10 bg-[#070707] text-[#f5f2ec]">
      <div className="mx-auto w-[min(1200px,calc(100%-64px))] pb-8 pt-16 max-[760px]:w-[calc(100%-48px)] max-[760px]:pt-12">
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.3fr)] gap-10 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {/* Link columns */}
          {linkColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-5 mt-0 font-[Georgia,Times_New_Roman,serif] text-[19px] font-normal text-[#f7f5f0]">
                {column.title}
              </h3>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-[rgba(245,242,236,0.62)] no-underline transition-colors duration-200 hover:text-[#d7c49c]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact + newsletter + socials */}
          <div>
            <h3 className="mb-5 mt-0 font-[Georgia,Times_New_Roman,serif] text-[19px] font-normal text-[#f7f5f0]">
              Contact Us
            </h3>

            <a
              href="mailto:hello@quatrea.com"
              className="text-[14px] text-[rgba(245,242,236,0.62)] no-underline transition-colors duration-200 hover:text-[#d7c49c]"
            >
              hello@quatrea.com
            </a>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 flex items-center rounded-md border border-white/20 bg-white/[0.03] pl-3 transition-colors focus-within:border-[#d7c49c]"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribed) setSubscribed(false);
                }}
                placeholder="Enter your email"
                className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[14px] text-[#f5f2ec] outline-none placeholder:text-[rgba(245,242,236,0.4)]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-11 w-11 cursor-pointer place-items-center border-0 bg-transparent text-[#d7c49c] transition-colors hover:text-[#f7f5f0]"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>

            <p
              className="mt-2 min-h-[18px] text-[12px] text-[#d7c49c]"
              role="status"
              aria-live="polite"
            >
              {subscribed ? "Thank you for subscribing." : ""}
            </p>

            <div className="mt-3 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-[rgba(245,242,236,0.8)] transition-colors duration-200 hover:border-[#d7c49c] hover:text-[#d7c49c]"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-[rgba(245,242,236,0.5)]">
          <p className="m-0">
            © {new Date().getFullYear()} Quatréa. All rights reserved.
          </p>
          <ul className="m-0 flex list-none gap-6 p-0">
            {bottomLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[rgba(245,242,236,0.6)] no-underline transition-colors duration-200 hover:text-[#d7c49c]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
