import Navbar from "../components/layout/Navbar";
import ProductsCollection from "../components/products.collection";
import SeasonalShowcase from "../components/product-section/SeasonalShowcase";
import BrandStory from "../components/BrandStory";
import MoreThanPerfume from "../components/MoreThanPerfume";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import { useState } from "react";

const Home = () => {
  const [heroRatio, setHeroRatio] = useState("16 / 9");

  return (
    <main className="min-h-svh overflow-hidden bg-[#060606] text-left text-[#f5f2ec]">
      <Navbar />

      {/* Hero: video fills the whole section, text sits on top */}
      <section
        className="relative isolate min-h-svh overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Video: anchored to the right so the whole bottle stays visible,
            and faded into the dark background on its left edge */}
        <video
          src="https://ik.imagekit.io/jk9e7l2uo/Free%20AI%20Video%20Generator%20from%20Images_2.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-20 h-full w-[72%] object-cover object-[center_30%] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_38%)] [mask-image:linear-gradient(90deg,transparent_0%,#000_38%)] max-[900px]:w-full max-[900px]:[-webkit-mask-image:none] max-[900px]:[mask-image:none]"
        />

        {/* Light dark layer behind the text, keeps the bottle bright */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,6,6,0.55)_0%,rgba(6,6,6,0.25)_40%,transparent_65%)] max-[900px]:bg-[linear-gradient(180deg,rgba(6,6,6,0.55)_0%,rgba(6,6,6,0.7)_100%)]"
          aria-hidden="true"
        />

        {/* Soft fade at the bottom so the hero blends into the next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#10100f] to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto box-border flex min-h-svh w-[min(1320px,calc(100%_-_64px))] items-center pt-[88px] max-[760px]:w-[calc(100%_-_48px)]">
          <div className="max-w-[620px] py-12 max-[760px]:py-9">
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
          </div>
        </div>
      </section>

      <ProductsCollection />
      <SeasonalShowcase />
      <BrandStory />
      <MoreThanPerfume />
      <CtaSection />
      <Footer />
    </main>
  );
};

export default Home;
