"use client";

import Image from "next/image";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      {/* Logo + Title */}
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
        <h1 className="text-xl font-bold">ReviewMarkets</h1>
      </div>

      {/* Search + Nav */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full bg-zinc-900 text-sm text-zinc-200 placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        </div>

        <nav className="flex space-x-6">
          <Link href="#" className="hover:text-primary">
            About
          </Link>
          <Link href="#" className="hover:text-primary">
            Pricing
          </Link>
          <Link href="#" className="hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
