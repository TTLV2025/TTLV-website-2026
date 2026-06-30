"use client";

import { motion } from "framer-motion";
import { Shield, Building } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Title Insurance",
    description:
      "We are authorized and licensed to issue all title insurance products and endorsements promulgated by the New Mexico Department of Insurance, relating to real property in San Miguel, Mora, and Guadalupe Counties. Protecting your investment with the most comprehensive local records available.",
  },
  {
    icon: Building,
    title: "Real Estate & Escrow Closings",
    description:
      "In conjunction with issuing title insurance, we offer comprehensive document preparation, funds handling, and full transaction coordination. We can assist you in virtually all facets of your real estate sale or loan transaction — from order through closing.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-cream rounded-xl p-8 border border-gray-100"
            >
              <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mb-6">
                <service.icon className="h-7 w-7 text-gold-light" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-navy mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
