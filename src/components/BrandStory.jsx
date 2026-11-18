const storyImage =
  "https://ik.imagekit.io/jk9e7l2uo/Gemini_Generated_Image_o0sr07o0sr07o0sr.jpg";

const paragraphs = [
  "At Quatréa, fragrance is more than a scent — it's an expression of identity, emotion, and unforgettable moments.",
  "Inspired by nature's four seasons, each fragrance captures the feeling of a season in a bottle.",
];

const BrandStory = () => {
  return (
    <section
      id="story"
      className="relative isolate px-2 overflow-hidden border-t border-white/10 bg-[#060606] text-[#f5f2ec]"
      aria-labelledby="story-title"
    >
      {/* Image keeps its real shape (no zoom/crop). It is vertically centered on the right,
          and every edge fades into the dark background. */}
      <div className="absolute right-0 top-1/2 -z-20 w-[62%] -translate-y-1/2 max-[900px]:inset-x-0 max-[900px]:top-0 max-[900px]:w-full max-[900px]:translate-y-0">
        <img
          src={storyImage}
          alt="Quatréa perfume bottle"
          loading="lazy"
          className="block h-auto max-h-[820px] w-full object-contain object-right max-[900px]:max-h-[380px] max-[900px]:object-cover max-[900px]:object-center"
        />
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#060606] to-transparent max-[900px]:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#060606] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#060606] to-transparent" />
      </div>

      {/* Soft shading behind the text */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,6,6,0.85)_0%,rgba(6,6,6,0.45)_38%,transparent_62%)] max-[900px]:bg-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-[#090909] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#060606] to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-svh w-[min(1320px,calc(100%-64px))] items-center pb-16 pt-32 max-[900px]:min-h-0 max-[900px]:w-[calc(100%-48px)] max-[900px]:items-end max-[900px]:pb-16 max-[900px]:pt-[300px]">
        <div className="max-w-[560px]">
          <p className="mb-4 flex items-center gap-3 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
            Our Story
            <span className="h-px w-12 bg-[#d7c49c]/70" aria-hidden="true" />
          </p>

          <h2
            id="story-title"
            className="mb-3 mt-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(32px,3.6vw,48px)] font-normal leading-[1.08] tracking-[-0.03em] text-[#f7f5f0] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]"
          >
            The Story Behind Quatréa
          </h2>

          <p className="mb-6 font-[Georgia,Times_New_Roman,serif] text-[clamp(18px,1.6vw,22px)] italic leading-snug text-[#d7c49c]">
            Four Seasons. One Timeless Expression of Elegance.
          </p>

          <div className="flex flex-col gap-4">
            {paragraphs.map((text) => (
              <p
                key={text.slice(0, 24)}
                className="m-0 text-[15px] leading-[1.75] text-[rgba(245,242,236,0.82)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]"
              >
                {text}
              </p>
            ))}
          </div>

          <p className="mb-7 mt-6 border-l-2 border-[#d7c49c]/70 pl-4 font-[Georgia,Times_New_Roman,serif] text-[17px] italic leading-relaxed text-[#f7f5f0]">
            Quatréa isn't just a fragrance. It's a feeling, a memory, and a
            signature that stays with you.
          </p>

          <a
            href="#collection"
            className="inline-flex min-h-12 items-center gap-[14px] border border-[rgba(215,196,156,0.85)] bg-black/25 px-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#f7f5f0] backdrop-blur-sm transition-colors duration-200 hover:bg-[#d7c49c] hover:text-[#090909]"
          >
            Explore Collection <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
