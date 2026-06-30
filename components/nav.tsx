"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#order", label: "Place an Order" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo + Name */}
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Territorial Title"
            width={46}
            height={38}
            className="object-contain"
            unoptimized
          />
          <div
            className={cn(
              "hidden sm:block transition-colors",
              scrolled ? "text-navy" : "text-white"
            )}
          >
            <div className="font-heading font-bold text-base leading-tight">
              Territorial Title of Las Vegas
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-200",
                link.href === "#order"
                  ? cn(
                      "px-4 py-2 rounded font-semibold",
                      scrolled
                        ? "bg-navy text-white hover:bg-navy-light"
                        : "bg-gold text-white hover:bg-gold-light"
                    )
                  : scrolled
                  ? "text-gray-700 hover:text-navy"
                  : "text-white/90 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:5054253563"
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              scrolled ? "text-navy" : "text-white/90 hover:text-white"
            )}
          >
            <Phone className="h-4 w-4" />
            (505) 425-3563
          </a>
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "md:hidden p-2 rounded",
                scrolled ? "text-navy" : "text-white"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left font-heading text-navy">
                Territorial Title
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 mt-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-3 px-2 rounded hover:bg-gray-100 text-gray-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:5054253563"
                className="flex items-center gap-2 text-base font-medium py-3 px-2 text-navy"
              >
                <Phone className="h-5 w-5" />
                (505) 425-3563
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
