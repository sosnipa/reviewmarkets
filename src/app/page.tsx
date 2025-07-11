import Hero from "@/components/Hero";
import Navbar from "@/components/layout/Navbar";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Navbar />;
      <main className="w-full max-w-5xl text-center flex flex-col items-center gap-8">
        <Hero />
      </main>
    </div>
  );
}
