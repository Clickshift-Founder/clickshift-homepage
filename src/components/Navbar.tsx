"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { Shield, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Centralized menu items - easy to update from one place
  const menuItems = [
    { href: "/products", label: "Products" },           // ← Changed from # to /products
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "API Documentation" },
    { href: "https://t.me/ClickShiftAlerts", label: "Community", external: true }, // ← Direct Telegram link
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="relative">
            <Shield className="h-8 w-8 text-blue-400" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse"></div>
          </div>
          <span className="text-xl font-bold">ClickShift</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            item.external ? (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={index} 
                href={item.href} 
                className="hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            )
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
            {menuItems.map((item, index) => (
              item.external ? (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={index} 
                  href={item.href} 
                  className="block hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.label}
                </Link>
              )
            ))}
            
            <button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Launch App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;