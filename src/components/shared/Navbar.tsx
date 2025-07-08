"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButton } from "@/components/auth/AuthButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <Image
            src="/campuslogics.webp"
            alt="campus bloc"
            width={150}
            height={150}
            className="w-full h-full"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition-colors ${
                pathname === link.href ? "text-primary font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <AuthButton />
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="flex flex-col gap-2 px-4 py-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 hover:text-primary transition-colors ${
                  pathname === link.href ? "text-primary font-semibold" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <AuthButton />
          </div>
        </div>
      )}
    </nav>
  );
}
