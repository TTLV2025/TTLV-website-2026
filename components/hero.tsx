"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light">
      {/* Gold accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />

      {/* Subtle diagonal highlight */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gold-light text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-6">
            San Miguel · Mora · Guadalupe Counties, New Mexico
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            Rooted in the Region.
            <br />
            <em className="text-gold-light not-italic">
              Trusted for Generations.
            </em>
          </h1>

          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Territorial Title of Las Vegas has protected property rights across
            northeastern New Mexico for over a century — successor to five of
            the region&apos;s most trusted abstract companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#order"
              className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 rounded transition-all duration-200 text-base shadow-lg"
            >
              Place an Order
            </a>
            <a
              href="#contact"
              className="border-2 border-white/50 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded transition-all duration-200 text-base"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/25" />
      </motion.div>
    </section>
  );
}
