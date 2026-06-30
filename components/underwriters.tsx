"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const underwriters = [
  { src: "/first-am.png", alt: "First American Title", width: 184, height: 120 },
  { src: "/fntic.png", alt: "Fidelity National Title Insurance Company", width: 525, height: 125 },
  { src: "/chicago.png", alt: "Chicago Title", width: 184, height: 120 },
  { src: "/commonwealth.png", alt: "Commonwealth Land Title", width: 450, height: 112 },
];

export function Underwriters() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
            Our Underwriters
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
            Representing the Industry&apos;s Leading Title Companies
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          {underwriters.map((uw, i) => (
            <motion.div
              key={uw.alt}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <Image
                src={uw.src}
                alt={uw.alt}
                width={uw.width}
                height={uw.height}
                className="max-h-14 w-auto object-contain"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
