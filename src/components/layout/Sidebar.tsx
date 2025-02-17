'use client';

import { useState } from "react";
import { type SidebarProps } from "@/types/layout";

export default function Sidebar({ initialOpen = true }: Readonly<SidebarProps>) {
  // This will be used for mobile responsiveness
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <aside 
      className={`
        w-64 border-r border-black/[.1] dark:border-white/[.1]
        bg-background h-[calc(100vh-4rem)] 
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <nav className="p-4">
        <div className="mb-4 pb-4 border-b border-black/[.1] dark:border-white/[.1]">
          <h2 className="font-semibold text-sm uppercase text-foreground/70">
            Projects
          </h2>
        </div>
        
        {/* Placeholder navigation items */}
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors">
            Dashboard
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors">
            Project One
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors">
            Project Two
          </button>
        </div>
      </nav>

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 p-2 rounded-full bg-background border border-black/[.1] dark:border-white/[.1] shadow-lg"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          {isOpen ? (
            <path d="M15 18l-6-6 6-6" />
          ) : (
            <path d="M9 18l6-6-6-6" />
          )}
        </svg>
      </button>
    </aside>
  );
}
