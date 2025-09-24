"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  Target, 
  Globe, 
  Star,
  Play,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Particle system
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

// Animated Background Particles Component
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // early exit if null
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 150;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
        
        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1000})`;
            ctx.stroke();
          }
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

// Partners carousel component
const PartnersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const partners = [
    { name: 'Helius', desc: 'Solana RPC Infrastructure' },
    { name: 'Shyft', desc: 'Blockchain Data' },
    { name: 'DexScreener', desc: 'DEX Analytics' },
    { name: 'Jupiter', desc: 'Solana Aggregator' },
    { name: 'CoinGecko', desc: 'Market Data' },
    { name: 'Moralis', desc: 'Cross-Chain API' },
    { name: 'HelloMoon', desc: 'On-Chain Analytics' },
    { name: 'Chainlink', desc: 'Oracle Network' }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % partners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, partners.length]);

  const nextPartner = () => {
    setCurrentIndex(prev => (prev + 1) % partners.length);
  };

  const prevPartner = () => {
    setCurrentIndex(prev => (prev - 1 + partners.length) % partners.length);
  };

  const getVisiblePartners = () => {
    const visible = [];
    for (let i = 0; i < 6; i++) {
      visible.push(partners[(currentIndex + i) % partners.length]);
    }
    return visible;
  };

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex transition-transform duration-500 ease-in-out">
        {getVisiblePartners().map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 w-1/6 px-2"
          >
            <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700 hover:border-slate-600 transition-all transform hover:scale-105">
              <div className="font-semibold mb-1 text-sm">{partner.name}</div>
              <div className="text-xs text-slate-400">{partner.desc}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={prevPartner}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 rounded-full p-2 hover:bg-slate-700 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={nextPartner}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 rounded-full p-2 hover:bg-slate-700 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

const ClickShiftHomepage = () => {
  // Countries data for global trust section
  const countries = [
    { flag: "🇺🇸", name: "USA", traders: "127", volume: "$2.4M" },
    { flag: "🇬🇧", name: "UK", traders: "89", volume: "$1.8M" },
    { flag: "🇨🇦", name: "Canada", traders: "67", volume: "$1.2M" },
    { flag: "🇦🇺", name: "Australia", traders: "54", volume: "$987K" },
    { flag: "🇩🇪", name: "Germany", traders: "43", volume: "$756K" },
    { flag: "🇫🇷", name: "France", traders: "38", volume: "$692K" },
    { flag: "🇯🇵", name: "Japan", traders: "31", volume: "$543K" },
    { flag: "🇰🇷", name: "S. Korea", traders: "29", volume: "$512K" },
    { flag: "🇸🇬", name: "Singapore", traders: "25", volume: "$478K" },
    { flag: "🇦🇪", name: "UAE", traders: "22", volume: "$401K" }
  ];

  const testimonials = [
    {
      quote: "Their whale exit detection spotted the dump 4 minutes before it happened. Sold at +67% while others got destroyed.",
      author: "Alex K., Professional Trader",
      location: "🇺🇸 New York"
    },
    {
      quote: "Found POPCAT at $80K market cap using Alpha's RSI signals. Made 47x returns in 2 weeks. This platform is unfair advantage.",
      author: "@CryptoWhale_100k",
      location: "🇬🇧 London"
    },
    {
      quote: "The futures liquidation calculator is game-changing. Haven't blown an account in 6 months since using Leverage. 23 consecutive profitable trades.",
      author: "Sarah M., Swing Trader",
      location: "🇦🇪 Dubai"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <AnimatedBackground />
      </div>

      {/* Content Container */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="container mx-auto text-center max-w-6xl">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Trade Smarter. Trade Safer.
                <br />
                DeFi Simplified.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                ClickShift makes Web3 trading accessible. 
                Our AI shields you from costly mistakes and empowers you to capture opportunities with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href='https://alpha.clickshift.io'
                className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>🔮 Explore Alpha Intelligence</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href='https://leverage.clickshift.io'
                className="group bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>⚡ Profit From Futures</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <button className="flex items-center space-x-2 mx-auto text-slate-300 hover:text-white transition-colors group">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Watch 60s Demo</span>
            </button>
          </div>
        </section>

        {/* Global Trust Indicator */}
        <section className="py-12 border-y border-slate-700">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-lg md:text-xl text-slate-300 mb-4">
                Trusted by 525+ intelligent traders across 47 nations
              </h3>
            </div>
            
            {/* Scrolling Countries */}
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4 min-w-max">
                {countries.map((country, index) => (
                  <div key={index} className="flex-shrink-0 bg-slate-800/50 rounded-lg p-4 min-w-[200px] border border-slate-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-semibold">{country.name}</span>
                    </div>
                    <div className="text-sm text-slate-400">
                      <div>{country.traders} traders</div>
                      <div>{country.volume} analyzed today</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Value Proposition */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                We Don't Predict Markets.
                <br />
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  We Read Them.
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Our algorithms analyze 847 data points in real-time across 12 blockchains. 
                From whale movements to sentiment shifts - we turn chaos into clarity.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl font-bold text-blue-400 mb-2">73%</div>
                <div className="text-sm text-slate-400">Prediction Accuracy</div>
                <div className="text-xs text-green-400 mt-1">↑12% vs Q3 2024</div>
              </div>
              <div className="text-center bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl font-bold text-purple-400 mb-2">$2.7M</div>
                <div className="text-sm text-slate-400">Total Losses Prevented</div>
                <div className="text-xs text-green-400 mt-1">Since Nov 2024</div>
              </div>
              <div className="text-center bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl font-bold text-green-400 mb-2">91</div>
                <div className="text-sm text-slate-400">Net Promoter Score</div>
                <div className="text-xs text-blue-400 mt-1">"World-Class"</div>
              </div>
              <div className="text-center bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl font-bold text-orange-400 mb-2">525+</div>
                <div className="text-sm text-slate-400">Daily Active Users</div>
                <div className="text-xs text-green-400 mt-1">Growing 23%/month</div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 rounded-xl p-8 border border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105">
                <Zap className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-4">Lightning-Fast Alerts</h3>
                <p className="text-slate-300 mb-4">
                  Get whale movement alerts 4-7 minutes before major price moves. 
                  Our real-time monitoring beats traditional analytics by hours.
                </p>
                <div className="text-sm text-blue-400">
                  ⚡ Sub-second detection • 🎯 99.2% uptime • 🔔 Smart filtering
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-8 border border-slate-700 hover:border-purple-500 transition-all transform hover:scale-105">
                <Target className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-4">Precision Entry/Exit</h3>
                <p className="text-slate-300 mb-4">
                  AI-powered RSI and volume analysis identifies optimal entry points. 
                  Turn market volatility into systematic profits.
                </p>
                <div className="text-sm text-purple-400">
                  📊 Multi-timeframe analysis • 🎯 Smart position sizing • 📈 Risk management
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800/50 to-green-900/30 rounded-xl p-8 border border-slate-700 hover:border-green-500 transition-all transform hover:scale-105">
                <Globe className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-4">Cross-Chain Intelligence</h3>
                <p className="text-slate-300 mb-4">
                  Track opportunities across Solana, Ethereum, BSC, and 9 more chains. 
                  Never miss a gem, regardless of where it launches.
                </p>
                <div className="text-sm text-green-400">
                  🌐 12 blockchains • 🔄 Real-time sync • 🎨 Unified interface
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Showcase */}
        <section className="py-20 px-4 bg-slate-800/20" id="products">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Two Tools. One Mission:
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Maximize Your Edge
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Alpha Product */}
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-8 border border-blue-500/50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-3xl">🔮</div>
                  <h3 className="text-2xl font-bold">ClickShift Alpha</h3>
                  <div className="bg-blue-500 text-xs px-2 py-1 rounded-full">LIVE</div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Spot market intelligence for early-stage gems. Our RSI-based system identifies 
                  breakout patterns before they happen, giving you first-mover advantage.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Real-time whale movement tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Advanced RSI + Volume pattern recognition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Smart contract audit integration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Multi-chain gem discovery</span>
                  </div>
                </div>

                <a 
                  href="https://alpha.clickshift.io"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <span>Launch Alpha</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Leverage Product */}
              <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl p-8 border border-orange-500/50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-3xl">⚡</div>
                  <h3 className="text-2xl font-bold">ClickShift Leverage</h3>
                  <div className="bg-orange-500 text-xs px-2 py-1 rounded-full">LIVE</div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Futures trading calculator and risk management suite. Calculate optimal position 
                  sizes, predict liquidation points, and trade with mathematical precision.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Liquidation price calculator</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Position size optimization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Risk/reward ratio analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Real-time P&L tracking</span>
                  </div>
                </div>

                <a 
                  href="https://leverage.clickshift.io"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all"
                >
                  <span>Launch Leverage</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Proven Results, Real Traders
              </h2>
              <p className="text-xl text-slate-300">
                Our users consistently outperform the market. Here's what they're saying:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Partners */}
        <section className="py-20 px-4 bg-slate-800/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built on Best-in-Class Infrastructure
              </h2>
              <p className="text-xl text-slate-300">
                Partnered with leading Web3 data providers for maximum reliability
              </p>
            </div>

            <PartnersCarousel />
          </div>
        </section>

        {/* Community CTA */}
        <section className="py-20 px-4" id="community">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join the Smart Money
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Get exclusive alpha, connect with profitable traders, and stay ahead of market moves.
            </p>
            
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
              <span>Join Our Telegram</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClickShiftHomepage;