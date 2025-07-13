import React from "react";

const HeaderNav: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-xl text-primary">ReviewMarkets</span>
      </div>
      <nav className="flex items-center space-x-6">
        <a
          href="#start"
          className="text-foreground hover:text-primary font-medium transition-colors"
        >
          Start Now
        </a>
        <a
          href="#contact"
          className="text-foreground hover:text-primary font-medium transition-colors"
        >
          Contact Us
        </a>
      </nav>
    </header>
  );
};

export default HeaderNav;
