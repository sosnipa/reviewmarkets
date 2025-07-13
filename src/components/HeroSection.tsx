import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-16 text-center bg-background">
      <h1 className="text-5xl font-bold mb-4">Compare the Best Prop Firms</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Discover, compare, and engage with top proprietary trading firms.
      </p>
      <button className="px-8 py-3 bg-neon text-dark font-bold rounded-lg shadow-lg hover:bg-neon/80 transition">
        Join Community
      </button>
      {/* Social links and Why Us highlight will go here */}
    </section>
  );
};

export default HeroSection;
