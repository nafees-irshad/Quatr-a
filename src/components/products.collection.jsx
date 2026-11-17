import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: "reactive-oud",
    name: "Reactive Oud Perfume Mist",
    price: 49,
    badge: "New",
    image:
      "https://ik.imagekit.io/jk9e7l2uo/pixlr-image-6afad1336854e4e7fff4fd61.png?updatedAt=1794829912602",
  },
  {
    id: "premium-fire",
    name: "Premium Fire Elegance",
    price: 59,
    badge: "Bestseller",
    image:
      "https://ik.imagekit.io/jk9e7l2uo/pixlr-image-6afacef4cc8c0bcb15d439d8.webp?updatedAt=1794829912499",
  },
  {
    id: "premium-essence",
    name: "Premium Essence Mist",
    price: 39,
    badge: "Popular",
    image:
      "https://ik.imagekit.io/jk9e7l2uo/pixlr-image-6aface97cc8c0bcb15d426c3.webp?updatedAt=1794829912641",
  },
  {
    id: "winter-veil",
    name: "Winter Veil Noir",
    price: 92,
    badge: "New",
    image:
      "https://ik.imagekit.io/jk9e7l2uo/pixlr-image-6afad16bd14fce09818ece11.png?updatedAt=1794829912386",
  },
];

const badgeColors = {
  New: "bg-[#b8975a] text-[#0d0c0a]",
  Bestseller: "bg-[#c9a84c] text-[#0d0c0a]",
  Popular: "bg-[#a07840] text-[#0d0c0a]",
};

const total = products.length;

// Render each product twice so there are always enough cards to slide
// smoothly in and out on both sides (with only 4 products, a card would
// otherwise have to jump across the screen).
const slides = [...products, ...products];
const slideCount = slides.length;

const ProductsCollection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [wishlisted, setWishlisted] = useState({});
  const { addToCart } = useCart();

  const prev = () => setActiveIndex((i) => (i - 1 + slideCount) % slideCount);
  const next = () => setActiveIndex((i) => (i + 1) % slideCount);

  // Dots: move by the shortest distance to the chosen product
  const goToProduct = (target) =>
    setActiveIndex((i) => {
      let delta = (target - (i % total) + total) % total;
      if (delta > total / 2) delta -= total;
      return (i + delta + slideCount) % slideCount;
    });

  const toggleWishlist = (id) => setWishlisted((w) => ({ ...w, [id]: !w[id] }));

  // Circular offset: -1 = left, 0 = center, 1 = right, others = waiting off-screen
  const getOffset = (i) => {
    let d = (i - activeIndex + slideCount) % slideCount;
    if (d >= slideCount / 2) d -= slideCount;
    return d;
  };

  return (
    <section
      id="collection"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[radial-gradient(ellipse_55%_75%_at_50%_0%,rgba(176,135,67,0.12),transparent_72%),linear-gradient(180deg,#10100f_0%,#090909_100%)] py-12 text-[#f5f2ec] max-[760px]:py-10"
      aria-labelledby="collection-title"
    >
      {/* Heading */}
      <div className="mx-auto mb-8 w-[min(1320px,calc(100%-64px))] text-center max-[760px]:mb-6">
        <h2
          id="collection-title"
          className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(28px,3.5vw,46px)] font-normal leading-tight tracking-[-0.03em] text-[#f7f5f0]"
        >
          Product Collection
        </h2>
        <div className="mx-auto mt-3 h-px w-14 bg-[#d7c49c]" />
      </div>

      {/* Carousel */}
      <div className="relative mx-auto w-[min(1200px,calc(100%-40px))]">
        {/* Left arrow */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-0 top-1/2 z-30 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/20 bg-[#1a1916]/80 text-[#f5f2ec] backdrop-blur-sm transition-colors hover:border-[#d7c49c] hover:text-[#d7c49c] max-[600px]:left-1 max-[600px]:translate-x-0"
          aria-label="Previous product"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        {/* Stage: fixed height. Cards are absolutely positioned and slide with transform */}
        <div className="relative mx-auto h-[520px] [--step:370px] max-[1024px]:[--step:320px] max-[760px]:h-[460px] max-[760px]:[--step:270px]">
          {slides.map((product, i) => {
            const offset = getOffset(i);
            const isCenter = offset === 0;
            const isSide = Math.abs(offset) === 1;

            return (
              <article
                key={`${product.id}-${i}`}
                onClick={() => isSide && setActiveIndex(i)}
                style={{
                  transform: `translate(calc(-50% + ${offset} * var(--step)), calc(-50% + ${!isCenter && isSide ? "-40px" : "0px"})) scale(${isCenter ? 1 : 0.88})`,
                  transitionProperty: "transform, opacity",
                }}
                className={[
                  "group absolute left-1/2 top-1/2 flex w-[340px] flex-col overflow-hidden rounded-2xl duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] max-[760px]:w-[260px]",
                  isCenter
                    ? "z-10 border-2 border-[#c9a84c] bg-[#161410] opacity-100 shadow-[0_0_60px_rgba(201,168,76,0.22)]"
                    : isSide
                      ? "z-0 cursor-pointer border border-white/10 bg-[#131210] opacity-80 max-[600px]:pointer-events-none max-[600px]:opacity-0"
                      : "pointer-events-none z-0 border border-white/10 bg-[#131210] opacity-0",
                ].join(" ")}
                aria-hidden={!isCenter ? "true" : undefined}
              >
                {/* Image container */}
                <div className="relative h-[450px] overflow-hidden bg-[#1c1a16] max-[760px]:h-[390px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                  />

                  {/* Bottom scrim for name/price legibility */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Center card warm glow */}
                  {isCenter && (
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_85%,rgba(201,168,76,0.15),transparent_70%)]" />
                  )}

                  {/* Badge, top-right */}
                  {product.badge && (
                    <span
                      className={`absolute right-3 top-3 z-10 rounded-sm px-2.5 py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em] ${badgeColors[product.badge] ?? "bg-white/20 text-white"}`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist icon, top-left, slides down on hover */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute left-3 top-3 z-20 grid h-9 w-9 -translate-y-2 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/55 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:border-[#d7c49c] hover:text-[#d7c49c]"
                    aria-label={`${wishlisted[product.id] ? "Remove from" : "Add to"} wishlist`}
                  >
                    <Heart
                      size={15}
                      aria-hidden="true"
                      className={
                        wishlisted[product.id]
                          ? "fill-[#d7c49c] text-[#d7c49c]"
                          : ""
                      }
                    />
                  </button>

                  {/* Cart icon, below badge, slides down on hover */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        ...product,
                        size: "50ml",
                        image: product.image,
                      });
                    }}
                    className="absolute right-3 top-14 z-20 grid h-9 w-9 -translate-y-2 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/55 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:border-[#d7c49c] hover:text-[#d7c49c]"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag size={15} aria-hidden="true" />
                  </button>

                  {/* Name + price overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-10">
                    <h3 className="font-[Georgia,Times_New_Roman,serif] text-lg font-normal leading-snug text-[#f7f5f0] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-base font-semibold tracking-wide text-[#d7c49c] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={next}
          className="absolute right-0 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 translate-x-1/2 cursor-pointer place-items-center rounded-full border border-white/20 bg-[#1a1916]/80 text-[#f5f2ec] backdrop-blur-sm transition-colors hover:border-[#d7c49c] hover:text-[#d7c49c] max-[600px]:right-1 max-[600px]:translate-x-0"
          aria-label="Next product"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Dot indicators */}
      <div
        className="mt-7 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Product slides"
      >
        {products.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex % total}
            aria-label={`Go to product ${i + 1}`}
            onClick={() => goToProduct(i)}
            className={`cursor-pointer rounded-full border-0 transition-all duration-300 ${
              i === activeIndex % total
                ? "h-2.5 w-2.5 bg-[#d7c49c]"
                : "h-2 w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsCollection;
