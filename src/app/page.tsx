"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Target, 
  Globe, 
  Star,
  Play,
  CheckCircle,
  ExternalLink,
  Menu,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import Image from 'next/image';

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
        
        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
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
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// Smooth Scrolling Partners Component
interface Partner {
  name: string;
  desc: string;
}
const SmoothScrollingPartners: React.FC<{ partners: Partner[] }> = ({ partners }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-700/80 hover:bg-slate-600/80 rounded-full p-2 transition-all"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={nextPartner}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-700/80 hover:bg-slate-600/80 rounded-full p-2 transition-all"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// Define the type for a single chip feature
interface ChipFeature {
    icon: React.ElementType; // Represents the Lucide icon component
    name: string;
    description: string;
}

const ChipShowcase = () => {
    // Moved the array definition inside the component
    const chipFeatures: ChipFeature[] = [
        { icon: Zap, name: 'Speed of Execution', description: 'Real-time execution ensures lightning-fast market entry and exit.' },
        { icon: Target, name: 'Profit Optimization', description: 'Intelligently follows momentum, exiting near the peak (e.g., 5x on a 6x run).' },
        { icon: Shield, name: 'Safety & Rug Detection', description: 'Actively avoids scam tokens and malicious smart contracts.' },
        { icon: ExternalLink, name: 'Autonomous Exits', description: 'Machine agents execute strategic, automated profit-taking.' },
        { icon: Globe, name: 'Dual Functionality', description: 'Acts as both a trigger for agents and a compass for humans.' },
        { icon: Star, name: 'Smart Risk Management', description: 'Dynamically manages exposure based on real-time volatility.' },
    ];

    // This is the component's *own* required return statement
    return (
        <section className="py-24 px-4 bg-slate-800/50 border-y border-blue-500/20">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                        The Core Technology
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            The ClickShift Chip
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                        An advanced **on-chain chip** powering autonomous DeFi agents. It is the intelligence layer that transforms trading from a gamble into **intelligent decision-making**.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Chip Image and Callout */}
                    <div className="relative text-center p-8 bg-slate-900/50 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-900/40">
                        <div className="mx-auto w-full max-w-sm mb-6">
                            {/* NOTE: Ensure 'clickshift-chip-logo.png' is in your public folder */}
                            <Image 
                                src="/clickshift-chip-logo.png" 
                                alt="ClickShift On-Chain Intelligence Chip" 
                                width={350} 
                                height={350} 
                                className="mx-auto pulse-animation" 
                            />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-purple-400">The Autonomous Engine</h3>
                        <p className="text-slate-300 mb-6 italic">
                            The Chip is the trigger for machine agents and the compass for human traders—maximizing profit with precision.
                        </p>

                        <a 
                            href="https://airtable.com/appc8rY70dTBksxSc/shr4qXKObo3cFDP5j"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
                        >
                            <span>Integrate Our Chip</span>
                            <ArrowRight className="h-5 w-5" />
                        </a>
                        <p className="text-sm text-slate-400 mt-3">Intended for Fund Management, Company Trading Desks, and Bot Integration.</p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-left mb-6">Engineered for DeFi Profit.</h3>
                        {chipFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-4 bg-slate-800/80 p-4 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all">
                                <feature.icon className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xl font-bold mb-1 text-white">{feature.name}</h4>
                                    <p className="text-slate-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Use Cases */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-6 text-purple-400">Primary Use Cases</h3>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                        {['Personal Trading', 'Company Trading Desk', 'Client Portfolio Management', 'Fund Management', 'Bot Integration', 'Research & Analytics'].map((useCase, index) => (
                            <span key={index} className="bg-slate-700/50 text-white px-4 py-2 rounded-full border border-slate-600">
                                {useCase}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ClickShiftHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStats, setCurrentStats] = useState({
    tradersOnline: 573,
    accuracy: 73.2,
    lossesPrevented: 2.4,
    analysisSpeed: 2.1
  });
  
  // Animate stats counters
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        ...prev,
        tradersOnline: prev.tradersOnline + Math.floor(Math.random() * 3 - 1),
        accuracy: Math.max(70, Math.min(80, prev.accuracy + (Math.random() * 0.2 - 0.1))),
        lossesPrevented: prev.lossesPrevented + Math.random() * 0.1
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const countries = [
    { flag: '🇺🇸', name: 'USA', traders: 121, volume: '$847K' },
    { flag: '🇬🇧', name: 'UK', traders: 89, volume: '£623K' },
    { flag: '🇦🇪', name: 'UAE', traders: 72, volume: 'AED 1.2M' },
     { flag: "🇨🇦", name: "Canada", traders: "67", volume: "$1.2M" },
    { flag: "🇦🇺", name: "Australia", traders: "54", volume: "$987K" },
    { flag: '🇳🇬', name: 'Nigeria', traders: 67, volume: '₦145M' },
    { flag: '🇸🇬', name: 'Singapore', traders: 55, volume: 'S$389K' },
    { flag: '🇮🇳', name: 'India', traders: 43, volume: '₹2.8M' },
     { flag: "🇩🇪", name: "Germany", traders: "43", volume: "$756K" },
    { flag: "🇫🇷", name: "France", traders: "38", volume: "$692K" },
    { flag: "🇯🇵", name: "Japan", traders: "31", volume: "$543K" },
    { flag: "🇰🇷", name: "S. Korea", traders: "29", volume: "$512K" },
  ];

  const testimonials = [
    {
      quote: "ClickShift saved me from a -89% rug pull. Their whale exit detection spotted the dump 4 minutes before it happened. Sold at +67% while others got destroyed.",
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

  
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
       {/* Animated Background */}
      <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: 'none' }}>
        <AnimatedBackground />
      </div>

      {/* Content Container */}
      
      <div className="relative" style={{ zIndex: 2 }}>
    
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              The Bloomberg Terminal
              <br />
              Powering Agents On-Chain.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              ClickShift powers AI agents with real-time trading intelligence. 
             Our Chip tell AI agents when to enter, where whales will exit, and 
            how to position. Humans can access the same intelligence through 
            our interface.
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">{currentStats.tradersOnline}</div>
              <div className="text-sm text-slate-400">Traders Online</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl md:text-3xl font-bold text-green-400">{currentStats.accuracy.toFixed(1)}%</div>
              <div className="text-sm text-slate-400">Prediction Accuracy</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">${currentStats.lossesPrevented.toFixed(1)}M</div>
              <div className="text-sm text-slate-400">Losses Prevented</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl md:text-3xl font-bold text-orange-400">{currentStats.analysisSpeed}s</div>
              <div className="text-sm text-slate-400">Analysis Speed</div>
            </div>
          </div>

          {/* Primary CTAs */}
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
              Trusted by 525+ focused traders across 47 nations
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                We Predict Traders.
              </span>
            </h2>            
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Our algorithms analyze 847 data points in real-time across 3 leading blockchains.
                From whale movements to sentiment shifts - we turn chaos into clarity.
              </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all transform hover:-translate-y-2">
              <Shield className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Protection First</h3>
              <p className="text-slate-300">
                Our AI identifies exit clusters before whales dump. 73% accuracy means you sell at peaks, not crashes.
              </p>            
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all transform hover:-translate-y-2">
              <Zap className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Lightning-Fast Alert</h3>
              <p className="text-slate-300">
                While others analyze for 30 minutes, our algorithms deliver precise signals in 2.1 seconds before major price moves.
              </p>              
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all transform hover:-translate-y-2">
              <Target className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Surgical Precision</h3>
              <p className="text-slate-300">
                "RSI oversold at 28, ATR suggests 67% pump probability in next 4 hours." Turn market volatility into huge profits.
              </p>             
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all transform hover:-translate-y-2">
              <Globe className="h-12 w-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Cross-Chain IQ</h3>
              <p className="text-slate-300">
                Every trade, every outcome, every pattern feeds our learning engine. 525+ traders across Solana, Ethereum, BSC, etc make every prediction smarter.
              </p>              
            </div>
          </div>
        </div>
      </section>

    {/* CHIP Showcase Component (New Section) */}
      <ChipShowcase />

      {/* Product Showcase */}
      <section id="products" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Three Tools. One Chip:
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  The ClickShift Product Suite
                </span>
          </h2>

<div className="grid lg:grid-cols-3 gap-12">
            
            {/* 1. CLICKBOT: The Automated Agent (New Focus) */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-green-500/50 transition-all">
              <div className="flex items-center space-x-3 mb-6">
                {/* Use the new logo file here */}
                <div className="w-8 h-8 relative">
                  <Image src="/clickbot-logo.png" alt="ClickBot Logo" fill className="rounded-full" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">ClickBot</h3>
                  <p className="text-green-400">Autonomous Trading Agent</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 mb-6">"Powered by the ClickShift Chip. Maximize profit, minimize risk."</p>
              
              <div className="bg-slate-900/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <div className="text-green-400">Agent Status: ACTIVE</div>
                <div className="text-blue-400">🤖 Last Action: $BONK Exit Optimization</div>
                <div>📈 Result: Set 2x target, took 5.2x profit.</div>
                <div className="text-orange-400">🔒 Security: AES-256 (Bank-Level)</div>
                <div className="text-purple-400">👥 Used by 525+ traders daily</div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>**Trailing Profit:** Intelligently exits near the peak (e.g., 5x on a 6x run).</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>**Rug Detection:** Active monitoring to avoid malicious contracts.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>**Non-Custodial:** Bank-level security (AES-256). You control your keys.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>**One-Tap Trading:** Best price execution via Jupiter integration.</span>
                </li>
              </ul>

              <a 
                href='https://t.me/clicksolbot'
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start ClickBot on Telegram</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* 2. Alpha */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">🔮</div>
                <div>
                  <h3 className="text-2xl font-bold">ClickShift Alpha</h3>
                  <p className="text-blue-400">Solana Signals</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 mb-6">"See the future before it happens"</p>
              
              <div className="bg-slate-900/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <div className="text-green-400">BONK Analysis - Completed in 1.9s</div>
                <div className="text-blue-400">🎯 BUY Signal | HIGH Confidence (87%)</div>
                <div>📊 Entry: $0.000019 | Stop: $0.000016 | Target: $0.000034</div>
                <div className="text-orange-400">⏰ Prediction expires in 43 minutes</div>
                <div className="text-purple-400">💡 Pattern Match: Similar to WIF 3 days before 340% run</div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>15-minute pump warnings with **73%+ accuracy**</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>**Whale exit detection** across all DEXs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Real-time holder distribution and **rug risk assessment**</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Smart entry/exit recommendations with **confidence scores**</span>
                </li>
              </ul>

              <a 
                href='https://alpha.clickshift.io'
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Launch Alpha</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* 3. Leverage (Kept the structure from original code) */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-orange-500/50 transition-all">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="text-2xl font-bold">ClickShift Leverage</h3>
                  <p className="text-orange-400">Capital Multiplier</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 mb-6">"Never lose your portfolio to Futures Trading again"</p>
              
              <div className="bg-slate-900/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <div className="text-green-400">BTC/USDT Analysis - Completed in 2.3s</div>
                <div className="text-blue-400">📈 LONG Signal | MODERATE Risk</div>
                <div>💰 Position Size: 3% of portfolio recommended</div>
                <div>🎯 Entry: $95,500 | Liquidation: $91,800 | Target: $105,100</div>
                <div className="text-purple-400">⚖️ Risk/Reward: 1:2.8 | Win Probability: 74%</div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Real-time **liquidation risk calculator**</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>MACD + OBV fusion algorithm (Patent Pending)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Multi-exchange data validation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Position sizing assistant with **smart risk management**</span>
                </li>
              </ul>

              <a 
                href='https://leverage.clickshift.io'
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Launch Futures</span>
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
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            📊 Proven Results, Real Traders
           </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">    
                Our users consistently outperform the market. Here's what they're saying:
              </p>
              </div>
             
            <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="mb-4">
                  <div className="flex space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 italic">"{testimonial.quote}"</p>
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-slate-400">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners with smooth scrolling */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">🤝 Powered by the Best</h2>
          <p className="text-slate-300 text-center mb-12">Strategic Partners</p>
          
                      <SmoothScrollingPartners partners={partners} />

          <p className="text-center text-slate-400 mt-8 italic">
            "The infrastructure powering the world's most accurate trading intelligence"
          </p>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            📱 Join 1,200+ Traders Building Alpha Together
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">📱 Telegram Community</h3>
              <p className="text-slate-300 mb-4">Live alerts, market discussions, early access</p>
              <div className="text-sm text-slate-400 space-y-1">
                <div>🔥 47 successful 10x+ calls tracked</div>
                <div>💎 Weekly "Diamond Hands" challenges</div>
                <div>🧠 Monthly strategy competitions</div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">💬 Discord</h3>
              <p className="text-slate-300 mb-4">Strategy sharing, peer learning, founder AMAs</p>
              <div className="text-sm text-slate-400 space-y-1">
                <div>📚 Daily educational content</div>
                <div>🏆 Best performers get premium free</div>
                <div>👨‍💼 Direct founder access</div>
              </div>
            </div>
          </div>

          <button onClick={() => window.open('https://t.me/ClickShiftAlerts', '_blank')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
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