import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import ProductsCollection from "../components/products.collection";
import SeasonalShowcase from "../components/product-section/SeasonalShowcase";
import BrandStory from "../components/BrandStory";
import MoreThanPerfume from "../components/MoreThanPerfume";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const Home = () => {
  const [heroRatio, setHeroRatio] = useState("16 / 9");

  // Hero parallax: text drifts down and fades as you scroll past the hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-svh overflow-hidden bg-[#060606] text-left text-[#f5f2ec]">
      <Navbar />

      {/* Hero: video fills the whole section, text sits on top */}
      <section
        ref={heroRef}
        className="relative isolate min-h-svh overflow-hidden"
        aria-labelledby="hero-title"
      >
        <video
          src="https://ik.imagekit.io/jk9e7l2uo/Free%20AI%20Video%20Generator%20from%20Images_2.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 -z-30 h-full w-full scale-125 object-cover opacity-45 blur-3xl saturate-125"
        />

        <video
          src="https://ik.imagekit.io/jk9e7l2uo/Free%20AI%20Video%20Generator%20from%20Images_2.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          onLoadedMetadata={(e) => {
            const { videoWidth: w, videoHeight: h } = e.currentTarget;
            if (w && h) setHeroRatio(`${w} / ${h}`);
          }}
          style={{ aspectRatio: heroRatio }}
          className="absolute inset-y-0 left-1/2 -z-20 h-full max-w-none -translate-x-1/2 object-contain [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_24%,#000_76%,transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0%,#000_24%,#000_76%,transparent_100%)] max-[900px]:inset-x-0 max-[900px]:bottom-auto max-[900px]:left-0 max-[900px]:h-[420px] max-[900px]:w-full max-[900px]:translate-x-0 max-[900px]:object-cover max-[900px]:[-webkit-mask-image:linear-gradient(180deg,#000_55%,transparent_100%)] max-[900px]:[mask-image:linear-gradient(180deg,#000_55%,transparent_100%)]"
        />

        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,6,6,0.85)_0%,rgba(6,6,6,0.5)_30%,transparent_55%)] max-[900px]:bg-none"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#10100f] to-transparent"
          aria-hidden="true"
        />

        {/* Content (parallax on scroll) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative px-2 z-10 mx-auto box-border flex min-h-svh w-[min(1320px,calc(100%_-_64px))] items-center pt-[88px] max-[760px]:w-[calc(100%_-_48px)]"
        >
          {/* Fade-up on page load */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[620px] py-12 max-[760px]:py-9"
          >
            <h2 className="mb-5 font-sans text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.2em] text-[#d7c49c]">
              Premium collection
            </h2>
            <h1
              id="hero-title"
              className="mb-5 mt-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(48px,5.3vw,76px)] font-normal leading-[1.02] tracking-[-0.035em] text-[#f7f5f0] drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] max-[760px]:text-[clamp(44px,11vw,64px)]"
            >
              Move The Essence
              <br />
              of Luxury
            </h1>
            <p className="mb-[30px] max-w-[430px] text-base leading-[1.7] text-[rgba(245,242,236,0.82)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] max-[760px]:max-w-[370px] max-[760px]:text-[15px]">
              Experience timeless elegance with our premium fragrances, crafted
              for distinction.
            </p>
            <button
              className="inline-flex min-h-12 cursor-pointer items-center gap-[14px] border border-[rgba(215,196,156,0.85)] bg-black/20 px-5 text-[13px] text-[#f7f5f0] backdrop-blur-sm transition-colors duration-200 hover:bg-[#d7c49c] hover:text-[#090909]"
              type="button"
            >
              Shop Now <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      <Reveal>
        <ProductsCollection />
      </Reveal>
      <Reveal>
        <SeasonalShowcase />
      </Reveal>
      <Reveal>
        <BrandStory />
      </Reveal>
      <Reveal>
        <MoreThanPerfume />
      </Reveal>
      <Reveal>
        <CtaSection />
      </Reveal>
      <Footer />
    </main>
  );
};

export default Home;