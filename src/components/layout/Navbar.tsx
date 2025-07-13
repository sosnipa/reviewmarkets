"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <Image src="/Logo.png" alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-bold text-foreground">ReviewMarkets</h1>
          </div>

          {/* Search + Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search prop firms..."
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-muted text-sm text-foreground placeholder-muted-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <nav className="flex items-center space-x-8">
              <Link
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden relative">
            <Input
              type="text"
              placeholder="Search..."
              className="w-48 pl-10 pr-4 py-2 rounded-full bg-muted text-sm text-foreground placeholder-muted-foreground border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
