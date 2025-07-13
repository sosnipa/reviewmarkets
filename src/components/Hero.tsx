"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="w-full max-w-3xl text-center space-y-8">
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

        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex -space-x-2">
            <Image
              src="/Logo.png"
              width={40}
              height={40}
              alt="User avatar"
              className="rounded-full ring-2 ring-background"
            />
            <Image
              src="/Logo.png"
              width={40}
              height={40}
              alt="User avatar"
              className="rounded-full ring-2 ring-background"
            />
            <Image
              src="/Logo.png"
              width={40}
              height={40}
              alt="User avatar"
              className="rounded-full ring-2 ring-background"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold text-base">+12k Traders</p>
            <p className="text-sm text-muted-foreground">
              Using our platform worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
