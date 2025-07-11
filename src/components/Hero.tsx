"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-light dark:bg-dark px-6 py-12 text-dark dark:text-light">
      <div className="w-full max-w-3xl text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Compare the <span className="text-primary">Best Prop Firms</span>.
          <br />
          Get the <span className="text-secondary">Best Offers</span>.
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Join thousands of traders using our platform to choose the right prop
          firm and maximize their edge.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full sm:w-64 px-4 py-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition text-sm font-medium"
          >
            Get Started
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex -space-x-2">
            <Image
              src="/images/podCast.webp"
              width={40}
              height={40}
              alt="User avatar"
              className="rounded-full ring-2 ring-white dark:ring-zinc-900"
            />
            <Image
              src="/images/podCast.webp"
              width={40}
              height={40}
              alt="User avatar"
              className="rounded-full ring-2 ring-white dark:ring-zinc-900"
            />
            <Image
              src="/images/podCast.webp"
              width={40}
              height={40}
              alt="User avatar"
              className="rounded-full ring-2 ring-white dark:ring-zinc-900"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold text-base">+12k Traders</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Using our platform worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
