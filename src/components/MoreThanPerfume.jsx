import { useState } from "react";

const videoSrc = "https://ik.imagekit.io/jk9e7l2uo/watermark-removed%20(1).mp4";

const MoreThanPerfume = () => {
  // Real width/height of the video, read once it loads, so it is never stretched or cropped
  const [ratio, setRatio] = useState("16 / 9");

  return (
    <section
      id="more-than-perfume"
      className="relative px-2 isolate h-[620px] overflow-hidden border-t border-white/10 bg-[radial-gradient(ellipse_50%_70%_at_50%_55%,rgba(176,135,67,0.14),transparent_72%),linear-gradient(180deg,#0b0b0a_0%,#060606_100%)] text-[#f5f2ec] max-[900px]:h-auto max-[900px]:min-h-0"
      aria-labelledby="more-title"
    >
      {/* Video: centered, natural shape, edges fade into the dark background */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={(e) => {
          const { videoWidth: w, videoHeight: h } = e.currentTarget;
          if (w && h) setRatio(`${w} / ${h}`);
        }}
        style={{ aspectRatio: ratio }}
        className="absolute inset-y-0 left-1/2 -z-20 h-full w-auto max-w-none -translate-x-1/2 object-cover [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_22%,#000_78%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0%,#000_22%,#000_78%,transparent_100%)] max-[900px]:inset-x-0 max-[900px]:bottom-auto max-[900px]:left-0 max-[900px]:h-[380px] max-[900px]:w-full max-[900px]:translate-x-0 max-[900px]:[-webkit-mask-image:linear-gradient(180deg,#000_55%,transparent_100%)] max-[900px]:[mask-image:linear-gradient(180deg,#000_55%,transparent_100%)]"
      />

      {/* Shading behind the text */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-[#090909] via-[#090909]/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#060606] via-[#060606]/60 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[780px] w-[min(1320px,calc(100%-64px))] items-center py-24 max-[900px]:min-h-0 max-[900px]:w-[calc(100%-48px)] max-[900px]:items-end max-[900px]:pb-16 max-[900px]:pt-[300px]">
        <div className="max-w-[440px]">
          <p className="mb-4 flex items-center gap-3 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#d7c49c]">
            Exquisite Fragrance
            <span className="h-px w-16 bg-[#d7c49c]/70" aria-hidden="true" />
          </p>

          <h2
            id="more-title"
            className="mb-5 mt-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(40px,4.6vw,64px)] font-normal leading-[1.05] tracking-[-0.03em] text-[#f7f5f0] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]"
          >
            More Than
            <br />a Perfume
          </h2>

          <p className="mb-8 text-[16px] leading-[1.75] text-[rgba(245,242,236,0.85)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            A Quatréa fragrance is a presence, not just a scent. Crafted from
            rare botanical essences, it defines your elegance, lifts your
            confidence, and leaves a lasting impression long after you have left
            the room.
          </p>

          <a
            href="#collection"
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#e6cf94_0%,#c9a84c_100%)] px-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0d0c0a] shadow-[0_0_30px_rgba(201,168,76,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Discover More <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MoreThanPerfume;
