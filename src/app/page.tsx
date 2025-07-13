import Hero from "@/components/Hero";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-4">
        <Hero />
      </main>
    </div>
  );
}
