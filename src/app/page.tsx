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
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <AnimatedBackground />
      </div>

      {/* Content Container */}
      
      <div className="relative" style={{ zIndex: 2 }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold">ClickShift</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#products" className="hover:text-blue-400 transition-colors">Products</Link>
             <Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link> 
             <Link href="/docs" className="hover:text-blue-400 transition-colors">API Documentation</Link>
             <Link href="#community" className="hover:text-blue-400 transition-colors">Community</Link>
             <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
            
                       
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
              <Link href="#products" className="block hover:text-blue-400 transition-colors">Products</Link>
             <Link href="/pricing" className="block hover:text-blue-400 transition-colors">Pricing</Link> 
             <Link href="/docs" className="block hover:text-blue-400 transition-colors">API Documentation</Link>
             <Link href="#community" className="block hover:text-blue-400 transition-colors">Community</Link>
             <Link href="/about" className="block hover:text-blue-400 transition-colors">About</Link>
            <Link href="/faq" className="block hover:text-blue-400 transition-colors">FAQ</Link>
            
            
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                Launch App
              </button>
            </div>
          </div>
        )}
      </nav>

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
                Our algorithms analyze 847 data points in real-time across 12 blockchains. 
                From whale movements to sentiment shifts - we turn chaos into clarity.
              </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all transform hover:-translate-y-2">
              <Shield className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">🛡️ Protection First</h3>
              <p className="text-slate-300">
                Our AI identifies exit clusters before whales dump. 73% accuracy means you sell at peaks, not crashes.
              </p>
              <div className="text-sm text-red-400">
              🚨 Whale exit alerts • ⚡ 2-min early warning • 🎯 73% accuracy rate
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all transform hover:-translate-y-2">
              <Zap className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">⚡ Lightning-Fast Alert</h3>
              <p className="text-slate-300">
                While others analyze for 30 minutes, our algorithms deliver precise signals in 2.1 seconds before major price moves.
              </p>
               <div className="text-sm text-blue-400">
                  ⚡ Sub-second detection • 🎯 99.2% uptime • 🔔 Smart filtering
                </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all transform hover:-translate-y-2">
              <Target className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">🎯 Surgical Entry/Exit Precision</h3>
              <p className="text-slate-300">
                "RSI oversold at 28, ATR suggests 67% pump probability in next 4 hours." Turn market volatility into systematic profits with AI-powered RSI and volume analysis.
              </p>
              <div className="text-sm text-purple-400">
                  📊 Multi-timeframe analysis • 🎯 Smart position sizing • 📈 Risk management
                </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all transform hover:-translate-y-2">
              <Globe className="h-12 w-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">🌐 Global Intelligence</h3>
              <p className="text-slate-300">
                Every trade, every outcome, every pattern feeds our learning engine. 525+ traders make every prediction smarter.
              </p>
              <div className="text-sm text-blue-400">
            🧠 AI learning engine • 📈 525+ data contributors • 🔮 Predictive insights
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="products" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Trading Tools. One Mission:
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Maximize Your Edge
                </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Alpha */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">🔮</div>
                <div>
                  <h3 className="text-2xl font-bold">ClickShift Alpha</h3>
                  <p className="text-blue-400">Solana Intelligence</p>
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
                  <span>15-minute pump warnings with 73%+ accuracy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Whale movement tracking across all DEXs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Real-time holder distribution analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Smart entry/exit recommendations with expiry times</span>
                </li>
              </ul>

              <a 
                href='https://alpha.clickshift.io'
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Launch Alpha</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Leverage */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-orange-500/50 transition-all">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="text-2xl font-bold">ClickShift Leverage</h3>
                  <p className="text-orange-400">Milk Futures</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 mb-6">"Never lose your portfolio to Futures Trading again"</p>
              
              <div className="bg-slate-900/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <div className="text-green-400">BTC/USDT Analysis - Completed in 2.3s</div>
                <div className="text-blue-400">📈 LONG Signal | MODERATE Risk</div>
                <div>💰 Position Size: 3% of portfolio recommended</div>
                <div>🎯 Entry: $67,500 | Liquidation: $63,800 | Target: $72,100</div>
                <div className="text-purple-400">⚖️ Risk/Reward: 1:2.8 | Win Probability: 74%</div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Real-time liquidation risk calculator</span>
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
                  <span>Position sizing assistant with risk management</span>
                </li>
              </ul>

              <a 
                href='https://leverage.clickshift.io'
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Profit From Futures</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

           {/* Coming Soon - Updated with ClickBot */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {/* Launch Detector */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center">
                <div className="text-4xl mb-4">🚨</div>
                <h3 className="text-2xl font-bold mb-4">Launch Detector Pro</h3>
                <p className="text-lg text-slate-300 mb-6">"Catch the next 100x before it moons"</p>
                
                <ul className="space-y-2 mb-6 text-sm text-slate-300 text-left">
                  <li>• Identifies high-potential tokens within 15 minutes of launch</li>
                  <li>• Cross-validates legitimacy across 7+ data sources</li>
                  <li>• Provides pump probability scores and safe entry windows</li>
                  <li>• Sends instant alerts to your Telegram/Discord/SMS</li>
                </ul>

                <button onClick={() => window.location.href = "https://t.me/ClickShiftAlerts"}
                className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all">
                  Secure Early Access →
                </button>
              </div>

              {/* ClickBot Auto Trade */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-4">ClickBot Auto Trade</h3>
                <p className="text-lg text-slate-300 mb-6">"Never miss profits or hold through dumps"</p>
                
                <ul className="space-y-2 mb-6 text-sm text-slate-300 text-left">
                  <li>• Intelligent trailing stop-loss that moves with profits</li>
                  <li>• Automatic exit before major whale dumps</li>
                  <li>• Smart position scaling based on momentum</li>
                  <li>• 24/7 monitoring with instant execution</li>
                </ul>

                <button 
                onClick={() => window.location.href = "https://t.me/ClickShiftAlerts"}             
                className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all">
                  Join ClickBot Waitlist →
                </button>
              </div>
            </div>
          </div>
        </section>
        
      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            📊 Proven Results, Real Traders
          </h2>
          <p className="text-xl text-slate-300">
                Our users consistently outperform the market. Here's what they're saying:
              </p>

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