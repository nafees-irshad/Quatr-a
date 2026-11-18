import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import seasonalPerfumes from "./seasonalPerfumes";

const total = seasonalPerfumes.length;

// Label + the field it reads from, shown on the right side
const detailRows = [
  { label: "Character", field: "characteristics" },
  { label: "Mood", field: "mood" },
  { label: "Best For", field: "bestFor" },
  { label: "Scent Profile", field: "scentProfile" },
];

const SeasonalShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  // Each video's real width/height ratio, read once it loads
  const [ratios, setRatios] = useState({});

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const active = seasonalPerfumes[activeIndex];

  // Play only the visible video; pause the others after the fade finishes
  useEffect(() => {
    const current = videoRefs.current[activeIndex];
    if (current) {
      const p = current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
    const timer = setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (v && i !== activeIndex) v.pause();
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section
      id="seasons"
      className="relative isolate h-[620px] overflow-hidden border-t border-white/10 bg-[radial-gradient(ellipse_50%_70%_at_50%_50%,rgba(176,135,67,0.14),transparent_72%),linear-gradient(180deg,#0b0b0a_0%,#060606_100%)] text-[#f5f2ec] max-[900px]:h-auto max-[900px]:min-h-[900px]"
      aria-label="Seasonal fragrances"
    >
      {/* Local keyframes for the text fade */}
      <style>{`
        @keyframes seasonFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Videos keep their real shape (no zoom/crop). They are centered,
          as tall as the section, and their left/right edges fade into the
          dark background, so the text sits on the dark sides. */}
      {seasonalPerfumes.map((perfume, i) => (
        <video
          key={perfume.id}
          ref={(el) => (videoRefs.current[i] = el)}
          src={perfume.video}
          muted
          loop
          playsInline
          autoPlay={i === 0}
          preload={i === 0 ? "auto" : "metadata"}
          aria-hidden="true"
          onLoadedMetadata={(e) => {
            const { videoWidth: w, videoHeight: h } = e.currentTarget;
            if (w && h) setRatios((r) => ({ ...r, [i]: w / h }));
          }}
          style={{ aspectRatio: ratios[i] || 16 / 9 }}
          className={`absolute inset-y-0 left-1/2 -z-20 h-full w-auto max-w-none -translate-x-1/2 object-cover transition-opacity duration-700 ease-in-out [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_22%,#000_78%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0%,#000_22%,#000_78%,transparent_100%)] max-[900px]:inset-x-0 max-[900px]:bottom-auto max-[900px]:left-0 max-[900px]:h-[400px] max-[900px]:w-full max-[900px]:translate-x-0 max-[900px]:[-webkit-mask-image:linear-gradient(180deg,#000_55%,transparent_100%)] max-[900px]:[mask-image:linear-gradient(180deg,#000_55%,transparent_100%)] ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark sides so text is readable, clear middle so the bottle shows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,6,6,0.6)_0%,rgba(6,6,6,0.3)_28%,transparent_45%,transparent_55%,rgba(6,6,6,0.3)_72%,rgba(6,6,6,0.6)_100%)] max-[900px]:bg-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#10100f] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#090909] to-transparent"
        aria-hidden="true"
      />

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/20 bg-[#1a1916]/70 text-[#f5f2ec] backdrop-blur-sm transition-colors hover:border-[#d7c49c] hover:text-[#d7c49c] max-[900px]:top-[24%] max-[900px]:left-3"
        aria-label="Previous season"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/20 bg-[#1a1916]/70 text-[#f5f2ec] backdrop-blur-sm transition-colors hover:border-[#d7c49c] hover:text-[#d7c49c] max-[900px]:top-[24%] max-[900px]:right-3"
        aria-label="Next season"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-[780px] w-[min(1280px,calc(100%-170px))] grid-cols-[minmax(0,360px)_minmax(0,1fr)_minmax(0,360px)] items-center gap-8 py-20 max-[900px]:min-h-[860px] max-[900px]:w-[calc(100%-48px)] max-[900px]:grid-cols-1 max-[900px]:content-end max-[900px]:gap-8 max-[900px]:pb-24 max-[900px]:pt-[300px]">
        {/* Left: name + description */}
        <div
          key={`left-${active.id}`}
          className="animate-[seasonFadeUp_700ms_ease_both]"
        >
          <p className="mb-4 flex items-center gap-3 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
            Seasonal Collection
            <span className="h-px w-12 bg-[#d7c49c]/70" aria-hidden="true" />
          </p>
          <h2 className="mb-2 mt-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(40px,4.6vw,64px)] font-normal leading-[1.05] tracking-[-0.03em] text-[#f7f5f0] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            {active.name}
          </h2>
          <p className="mb-4 font-[Georgia,Times_New_Roman,serif] text-xl italic text-[#d7c49c]">
            {active.tagline}
          </p>
          <p className="mb-7 max-w-[360px] text-[15px] leading-[1.7] text-[rgba(245,242,236,0.82)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            {active.description}
          </p>
          <button
            type="button"
            className="inline-flex min-h-12 cursor-pointer items-center gap-[14px] rounded-full border border-[rgba(215,196,156,0.85)] bg-black/25 px-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#f7f5f0] backdrop-blur-sm transition-colors duration-200 hover:bg-[#d7c49c] hover:text-[#090909]"
          >
            Shop Now <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Middle: empty, the bottle in the video shows here */}
        <div className="max-[900px]:hidden" aria-hidden="true" />

        {/* Right: name + 4 details (label and value on the same line) */}
        <div
          key={`right-${active.id}`}
          className="animate-[seasonFadeUp_700ms_ease_both] border-l border-[#d7c49c]/40 pl-7 max-[900px]:pl-5"
        >
          <p className="mb-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
            Timeless Luxury
          </p>
          <h3 className="mb-6 mt-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(26px,2.6vw,34px)] font-normal leading-tight text-[#f7f5f0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
            {active.name} Essence
          </h3>

          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {detailRows.map(({ label, field }) => (
              <li
                key={label}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <h4 className="m-0 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-[#d7c49c]">
                  {label}
                </h4>
                <p className="m-0 text-[15px] leading-snug text-[rgba(245,242,236,0.88)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
                  {active[field].join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dots */}
      <div
        className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-3"
        role="tablist"
        aria-label="Seasons"
      >
        {seasonalPerfumes.map((perfume, i) => (
          <button
            key={perfume.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Show ${perfume.name}`}
            onClick={() => setActiveIndex(i)}
            className={`cursor-pointer rounded-full border-0 transition-all duration-300 ${
              i === activeIndex
                ? "h-2.5 w-7 bg-[#d7c49c]"
                : "h-2 w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SeasonalShowcase;
