"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function LocationSection() {
  return (
    <section id="contact" className="bg-cream py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
            Find Us
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Google Map */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=35.593276,-105.21953&z=17&output=embed"
              width="100%"
              height="420"
              className="border-0 w-full block"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Territorial Title of Las Vegas — 919 Douglas Ave"
            />
          </div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-7"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-semibold text-navy mb-1">Office Address</div>
                <p className="text-gray-600">
                  919 Douglas Avenue
                  <br />
                  Las Vegas, NM 87701
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-semibold text-navy mb-1">Phone</div>
                <a
                  href="tel:5054253563"
                  className="text-gray-600 hover:text-navy transition-colors text-lg font-medium"
                >
                  (505) 425-3563
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-semibold text-navy mb-1">Email</div>
                <a
                  href="mailto:questions@territorialtitle.com"
                  className="text-gray-600 hover:text-navy block transition-colors"
                >
                  questions@territorialtitle.com
                </a>
                <a
                  href="mailto:order@territorialtitle.com"
                  className="text-gray-600 hover:text-navy block transition-colors"
                >
                  order@territorialtitle.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-semibold text-navy mb-1">Business Hours</div>
                <p className="text-gray-600">
                  Monday – Friday
                  <br />
                  8:00 AM – 12:00 PM &amp; 1:00 PM – 5:00 PM
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Closed for lunch hour &amp; federal holidays
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
