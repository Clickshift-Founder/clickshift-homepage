import React from 'react';
import Link from "next/link";
import { Shield } from 'lucide-react';

const Footer = () => {
  // Countries data for trust indicators
  const countries = [
    { flag: "🇺🇸", name: "USA" },
    { flag: "🇬🇧", name: "UK" },
    { flag: "🇨🇦", name: "Canada" },
    { flag: "🇦🇺", name: "Australia" },
    { flag: "🇩🇪", name: "Germany" },
    { flag: "🇫🇷", name: "France" },
    { flag: "🇯🇵", name: "Japan" },
    { flag: "🇰🇷", name: "S. Korea" },
    { flag: "🇸🇬", name: "Singapore" },
    { flag: "🇦🇪", name: "UAE" },
    { flag: "🇳🇱", name: "Netherlands" },
    { flag: "🇪🇸", name: "Spain" }
  ];

  return (
   <footer className="relative z-50 py-12 px-4 bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-4 hover:opacity-80 transition-opacity group">
            <div className="relative">
              <Shield className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse group-hover:bg-blue-400/30"></div>
            </div>
            <span className="text-2xl font-bold group-hover:text-blue-300 transition-colors">ClickShift</span>
          </Link>
          <p className="text-lg text-slate-300">Building DeFi's Intelligence Infrastructure</p>
        </div>

        {/* Global Trust Indicators */}
        <div className="text-center mb-8">
          <p className="text-slate-400 mb-4">Trusted by intelligent traders in:</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {countries.map((country, index) => (
              <span key={index} className="inline-flex items-center space-x-1 bg-slate-800 px-2 py-1 rounded">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </span>
            ))}
            <span className="text-slate-500">+ 41 more nations</span>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Products */}
          <div>
            <h4 className="font-semibold mb-3">Products</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div>
                <a 
                  href="https://alpha.clickshift.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  ClickShift Alpha
                </a>
              </div>
              <div>
                <a 
                  href="https://leverage.clickshift.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  ClickShift Leverage
                </a>
              </div>
              <div>
                <a 
                  href="https://t.me/ClickShiftAlerts" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  Launch Detector (Soon)
                </a>
              </div>
            </div>
          </div>
          
          {/* Community */}
          <div>
            <h4 className="font-semibold mb-3">Community</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div>
                <a 
                  href="https://t.me/ClickShiftAlerts" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors">Telegram</a></div>
              <div><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></div>
              <div><Link href="/results" className="hover:text-white transition-colors">Results from ClickShift</Link></div>
              <div><a href="https://x.com/ClickShiftHQ" className="hover:text-white transition-colors">Twitter</a></div>
              <div><a href="#" className="hover:text-white transition-colors">Discord</a></div>
              <div><a href="#" className="hover:text-white transition-colors">Medium</a></div>
            </div>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div><Link href="/about" className="hover:text-white transition-colors">About</Link></div>
              <div><Link href="/products" className="hover:text-white transition-colors">Products</Link></div>
              <div><Link href="/docs" className="hover:text-white transition-colors">API Documentation</Link></div>
              <div><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></div>
              <div><Link href="/roadmap" className="hover:text-white transition-colors">Road map</Link></div>
              <div><a href="#" className="hover:text-white transition-colors">Blog</a></div>
              <div><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></div>
              <div><a href="mailto:trust@clickshift.io" className="hover:text-white transition-colors">Contact</a></div>
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></div>
              <div><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></div>
              <div><Link href="/risk-disclosure" className="hover:text-white transition-colors">Risk Disclosure</Link></div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center space-y-2 text-sm text-slate-400 mb-8">
          <div>Business Inquiries: trust@clickshift.io</div>
          <div>Support: clickndshift@gmail.com</div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-slate-500 border-t border-slate-700 pt-8">
          <p>© 2025 ClickShift Intelligence Inc. All Rights Reserved</p>
          <p className="mt-1">Patent-pending algorithms. Regulatory compliant. Built for global scale.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;