"use client";
import Link from "next/link";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";

const menuItems = [
  { name: "Products", href: "#products" },
  { name: "Pricing", href: "/pricing" },
  { name: "API Documentation", href: "/docs" },
  { name: "Community", href: "#community" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <Shield className="h-8 w-8 text-blue-400" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse"></div>
          </div>
          <span className="text-xl font-bold">ClickShift</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-blue-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105">
            Launch App
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Launch App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
