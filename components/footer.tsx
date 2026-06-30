import { ExternalLink } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-gold-light mb-3">
              Territorial Title of Las Vegas
            </h3>
            <p className="text-white/55 text-sm leading-relaxed">
              Serving San Miguel, Mora &amp; Guadalupe Counties with
              professional title insurance and real estate escrow services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white/70 mb-3 uppercase text-xs tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#about", label: "About Us" },
                { href: "#services", label: "Services" },
                { href: "#order", label: "Place an Order" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-semibold text-white/70 mb-3 uppercase text-xs tracking-widest">
              Documents
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/pdf/rates.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                >
                  Rate Sheet
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.srca.nm.gov/nmac-home/nmac-titles/title-13-insurance/chapter-14-title-insurance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                >
                  NM Title Insurance Rules
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="/pdf/privacy-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                >
                  Privacy Policy
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-xs">
            &copy; {year} Territorial Title of Las Vegas. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-white/35 text-xs">
            <span>ALTA Member</span>
            <span className="mx-2">·</span>
            <a
              href="https://www.alta.org/best-practices/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors flex items-center gap-1"
            >
              Best Practices Certified
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
