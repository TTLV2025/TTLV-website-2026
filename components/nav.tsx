"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Nav() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#order", label: "Place an Order" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
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
          <div className="hidden sm:block text-navy leading-tight">
            <div className="font-heading font-bold text-base leading-none">
              Territorial Title
            </div>
            <div className="font-heading text-sm leading-tight text-navy/80">
              of Las Vegas
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                link.href === "#order"
                  ? "px-4 py-2 rounded font-semibold text-sm bg-navy text-white hover:bg-navy-light transition-colors"
                  : "text-sm font-medium text-gray-700 hover:text-navy transition-colors"
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:5054253563"
            className="flex items-center gap-1.5 text-sm font-medium text-navy hover:text-navy-light transition-colors"
          >
            <Phone className="h-4 w-4" />
            (505) 425-3563
          </a>
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 rounded text-navy"
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
