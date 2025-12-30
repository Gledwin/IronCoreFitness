// app/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Carousel from "./components/ui/Carousel";
import CoreValue from "./components/ui/CoreValue";
import FeatureCard from "./components/ui/FeatureCard";

// Note: Using hardcoded paths for uploaded files. 
const HERO_SLIDES = [
  "/slide1.jpeg",
  "/slide2.jpeg",
  "/slide3.jpeg",
];

const COMMUNITY_SLIDES = [
 "/slide1.jpeg",
  "/slide2.jpeg",
  "/slide3.jpeg",
];


export default function Home() {
  // Keeping this state in the parent to control the Hero slideshow
  const [heroIndex, setHeroIndex] = useState(0); 

  return (
    <main className="min-h-screen bg-[#1F1F1F] text-[#E6E6E6] antialiased">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* background STATIC image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_SLIDES[0]} // Using only the first image statically
            alt={`Hero Background`}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL="/mnt/data/Screenshot (126).png"
          />
          <div className="absolute inset-0 bg-black/60" />
          {/* subtle radial spotlight (keep) */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[15%] w-[1200px] h-[1200px] rounded-full bg-gradient-to-t from-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 md:px-10 lg:px-20 py-28 lg:py-40 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero copy */}
            <div className="space-y-6">
              {/* Added Welcome Text */}
              <p className="text-xl text-[#F5E6B3] font-oswald uppercase tracking-widest">
                Welcome to IronCore Fitness
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold leading-tight uppercase">
                UNLEASH <span className="text-[#F5E6B3]">YOUR POWER</span>
              </h1>

              <p className="text-lg md:text-xl text-[#CFC4A7] max-w-xl font-roboto">
                IronCore Fitness is a next-generation gym designed around one powerful idea:{" "}
                fitness should adapt to your life, not the other way around.
                <br />
                Freeze anytime, with no penalties or hidden fees.
              </p>

              <div className="flex items-center gap-4 mt-6">
                <Link
                  href="/join"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-[#F5E6B3] text-[#1F1F1F] font-semibold font-oswald shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Join Now
                </Link>
              </div>

              <div className="mt-6 flex gap-6 text-sm text-[#8C8C8C]">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center text-[#F5E6B3] font-semibold font-oswald text-xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-oswald text-[#E6E6E6]">Freeze-Friendly Memberships</div>
                    <div className="text-sm font-roboto">Pause your membership without penalties.</div>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center text-[#F5E6B3] font-semibold font-oswald text-xl">
                    ⚙️
                  </div>
                  <div>
                    <div className="font-oswald text-[#E6E6E6]">24/7 Access & Expert Guidance</div>
                    <div className="text-sm font-roboto">High-quality equipment and tailored support.</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Slideshow Carousel */}
            <aside className="relative lg:justify-self-end w-full max-w-md">
                <Carousel images={HERO_SLIDES} index={heroIndex} setIndex={setHeroIndex} />
            </aside>
          </div>
        </div>
      </section>

      {/* --- Section Separator --- */}
      <hr className="border-t border-white/6 my-16" />

      {/* ABOUT / ORIGIN */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h2 className="text-4xl font-oswald mb-8 text-center">
            OUR STORY: BORN FROM REAL STRUGGLES
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-oswald text-[#F5E6B3] mb-4">The Spark and the Solution</h3>
              <p className="text-[#CFC4A7] font-roboto leading-relaxed mb-6">
                The idea for IronCore Fitness was born from a deeply personal experience.
                Our founder struggled with the financial and contractual limitations of traditional gyms, facing
                strict policies and mounting debt** when unexpected financial hardship hit.
                <br />
                <br />
                We realized that gyms, meant to help people, often make it harder when life gets tough.
                Our mission is to **break down common barriers**—lack of guidance and financial strain—by providing a space that is open, supportive, and results-driven.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={"/slide4.png"}
                alt="Modern, dark industrial gym interior"
                width={900}
                height={600}
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Section Separator --- */}
      <hr className="border-t border-white/6 my-16" />

      {/* CORE VALUES */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h3 className="text-3xl font-oswald text-center mb-8 text-[#F5E6B3]">Our Core Values</h3>
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            <CoreValue
              title="Empowerment"
              desc="Giving members full control over their journey, allowing choices that suit their individual goals, schedules, and lifestyles."
            />
            <CoreValue
              title="Flexibility"
              desc="Freedom through freeze-friendly memberships, transparent policies, and adaptable training options."
            />
            <CoreValue
              title="Strength"
              desc="Capturing the physical and mental resilience members build through consistent support, expert guidance, and a motivating community."
            />
          </div>
        </div>
      </section>

      {/* --- Section Separator --- */}
      <hr className="border-t border-white/6 my-16" />

      {/* FEATURES */}
      <section id="features" className="py-16 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h3 className="text-3xl font-oswald text-center mb-12">What Makes IronCore Stand Out</h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon="🛡️"
              title="No Lock-in Contracts"
              desc="Cancel or freeze your membership anytime, with no penalties or surprise fees."
            />
            <FeatureCard
              icon="⏰"
              title="24/7 Access"
              desc="Train on your own schedule. Access high-quality strength and cardio equipment any time of day."
            />
            <FeatureCard
              icon="🤝"
              title="Supportive Community"
              desc="Motivating atmosphere, small group classes, and community events that feel like home."
            />
          </div>
        </div>
      </section>

      {/* COMMUNITY SLIDESHOW */}
      <section id="community" className="py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <h3 className="text-3xl font-oswald text-center mb-8">Our Empowering Community</h3>
          <p className="text-center text-[#CFC4A7] font-roboto mb-8">
            More than just a place to work out, it's a place to grow stronger, healthier, and more confident on your own terms.
          </p>

          <div className="max-w-5xl mx-auto">
            <Carousel images={COMMUNITY_SLIDES} />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-[#0b0b0b]">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-oswald mb-4">Simple, Transparent Pricing</h3>
              <p className="text-[#CFC4A7] font-roboto mb-6">
                One flexible plan designed for value and freedom. We aim to eliminate the common obstacles to fitness by offering affordable, freeze-friendly memberships.
              </p>

              <ul className="space-y-3 text-[#E6E6E6] font-roboto">
                <li className="flex items-start gap-2">
                  <span className="text-[#F5E6B3] font-bold text-xl leading-none">•</span>
                  Monthly Fee: R500
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5E6B3] font-bold text-xl leading-none">•</span>
                  Joining Fee: R200 (one-time)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F5E6B3] font-bold text-xl leading-none">•</span>
                  Flexibility: Pause your membership anytime with no penalties.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-[#151515] to-[#0d0d0d] p-8 rounded-2xl border border-white/6 text-center shadow-lg">
              <div className="text-sm text-[#8C8C8C] font-roboto">All-Access Monthly Plan</div>
              <div className="text-5xl font-oswald text-[#F5E6B3] my-4">R500</div>
              <div className="text-[#CFC4A7] mb-6 font-roboto">Fitness on your terms.</div>

              <Link
                href="/join"
                className="inline-block px-6 py-3 bg-[#F5E6B3] text-[#1F1F1F] rounded-md font-semibold font-oswald hover:brightness-90 transition"
              >
                Join Now
              </Link>

              <div className="mt-4 text-xs text-[#8C8C8C] font-roboto">No long-term commitments.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="rounded-3xl p-10 bg-gradient-to-r from-[#0b0b0b] to-[#151515] border border-white/6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h4 className="text-2xl font-oswald">Ready to train on your terms?</h4>
              <p className="text-[#CFC4A7] font-roboto">
                Get started today and experience the future of flexible fitness.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/join"
                className="px-6 py-3 bg-[#F5E6B3] text-[#1F1F1F] rounded-md font-semibold font-oswald hover:brightness-90 transition"
              >
                Join IronCore Today
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white/10 rounded-md text-[#CFC4A7] font-roboto hover:bg-white/5 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}