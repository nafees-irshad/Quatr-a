const CtaSection = () => {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[radial-gradient(ellipse_55%_80%_at_50%_50%,rgba(176,135,67,0.16),transparent_72%),linear-gradient(180deg,#090909_0%,#0b0b0a_100%)] py-28 text-center text-[#f5f2ec] max-[760px]:py-20"
      aria-labelledby="cta-title"
    >
      <div className="mx-auto w-[min(760px,calc(100%-48px))]">
        <p className="mb-5 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
          Four Seasons. One Signature.
        </p>

        <h2
          id="cta-title"
          className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(44px,6vw,84px)] font-normal leading-none tracking-[-0.03em] text-[#f7f5f0]"
        >
          Quatréa
        </h2>

        {/* Gold line with a small diamond, like the design */}
        <div
          className="mx-auto mt-6 flex w-[min(320px,80%)] items-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-[#d7c49c]/60" />
          <span className="h-2 w-2 rotate-45 border border-[#d7c49c]" />
          <span className="h-px flex-1 bg-[#d7c49c]/60" />
        </div>

        <p className="mx-auto mb-10 mt-7 max-w-[600px] text-[16px] leading-[1.8] text-[rgba(245,242,236,0.78)] max-[760px]:text-[15px]">
          Botanical fragrances inspired by the beauty of every season, crafted
          to express who you are and to stay with you long after the moment
          has passed. Find the scent that becomes your signature.
        </p>

        <a
          href="#collection"
          className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#e6cf94_0%,#c9a84c_100%)] px-9 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0d0c0a] shadow-[0_0_30px_rgba(201,168,76,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Shop the Collection <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
