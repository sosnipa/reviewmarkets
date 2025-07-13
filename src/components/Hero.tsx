"use client";
import { Instagram, Twitter, Send, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="mt-24 bg-background px-6 pt-4 pb-2 text-foreground">
      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Compare the <span className="text-primary">Best Prop Firms</span>.
          <br />
          Get the <span className="text-secondary-foreground">Best Offers</span>
          .
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Join thousands of traders using our platform to choose the right prop
          firm and maximize their edge.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full sm:w-64 px-4 py-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition text-sm font-medium"
          >
            Get Started
          </button>
        </form>

        <div className="flex flex-col items-center justify-center gap-2 mt-6">
          <div className="flex items-center justify-center gap-4 text-primary text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <Send />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle />
            </a>
          </div>
          <div className="text-center">
            <p className="font-semibold text-base uppercase tracking-wide">
              JOIN 12K+ TRADERS USING OUR PLATFORM WORLDWIDE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
