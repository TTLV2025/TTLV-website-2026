"use client";

import { motion } from "framer-motion";
import { FileText, Users, Shield } from "lucide-react";

const stats = [
  {
    icon: FileText,
    value: "100,000+",
    label: "Abstracts on File",
    description:
      "The most complete local title records in northeastern New Mexico",
  },
  {
    icon: Users,
    value: "125+ Years",
    label: "Combined Staff Experience",
    description: "Deep regional expertise across every facet of title and escrow",
  },
  {
    icon: Shield,
    value: "5",
    label: "Predecessor Companies",
    description:
      "Successor to Las Vegas Title Guaranty, Mora Title, Mills Abstract, and more",
  },
];

export function Credentials() {
  return (
    <section id="about" className="bg-cream py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-gold" />
              </div>
              <div className="font-heading text-4xl font-bold text-navy mb-1">
                {stat.value}
              </div>
              <div className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* About text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-6">
            When Local Expertise Matters Most
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Our highly trained staff, which includes four licensed title
            insurance professionals, regularly train through continuing education
            to ensure our policies and procedures remain at the forefront of
            industry best practices.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            With over 100,000 abstracts and title insurance files covering
            almost every property in the tri-county area, we possess the
            regional depth to facilitate virtually any transaction you bring
            to us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
