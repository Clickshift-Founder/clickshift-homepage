"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  Target, 
  Bot,
  Radar,
  TrendingUp,
  Shield,
  Eye,
  Users,
  Layers,
  Palette,
  CheckCircle,
  ExternalLink,
  Clock,
  Sparkles,
  ChevronRight,
  Star
} from 'lucide-react';

    export const metadata = {
      title: "Our Products | ClickShift",
      description: "Professional-grade AI tools that transform crypto trading from guesswork to intelligence. Built for traders who demand precision, speed, and consistent profits.",
      openGraph: {
        title: "Crypto Tools that gives you a competitive advantage | ClickShift",
        description: "Professional-grade AI tools that transform crypto trading from guesswork to intelligence. Built for traders who demand precision, speed, and consistent profits.",
        images: ["/og-image.png"],
      }
    }

// Animated Background Particles Component (reused from home)
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
        
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 800})`;
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

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('live');

  const liveProducts = [
    {
      id: 'alpha',
      name: 'ClickShift Alpha',
      tagline: 'Spot Trading of Solana tokens',
      icon: '🔮',
      status: 'LIVE',
      statusColor: 'bg-green-500',
      description: 'AI-powered spot trading intelligence with whale tracking, exit prediction, and RSI signals. Achieve 73%+ accuracy with patent-pending algorithms.',
      url: 'https://alpha.clickshift.io',
      features: [
        'Real-time whale movement tracking',
        'Patent-pending exit cluster detection',
        'RSI + ATR multi-timeframe analysis',
        'AI learning engine with 73%+ accuracy',
        'Multi-DEX legitimacy validation',
        'Smart entry/exit recommendations'
      ],
      metrics: {
        accuracy: '73%',
        users: '525+',
        saved: '$2.7M'
      },
      gradient: 'from-blue-500 to-purple-600',
      borderGradient: 'from-blue-500/50 to-purple-600/50'
    },
    {
      id: 'leverage',
      name: 'ClickShift Leverage',
      tagline: 'Futures Trading Intelligence',
      icon: '⚡',
      status: 'LIVE',
      statusColor: 'bg-green-500',
      description: 'Advanced futures trading calculator with MACD+OBV fusion algorithms and liquidation protection. Never lose your portfolio to margin calls again.',
      url: 'https://leverage.clickshift.io',
      features: [
        'MACD + OBV fusion algorithm (Patent Pending)',
        'Real-time liquidation risk calculator',
        'RSI + Stochastic precision timing',
        'Multi-exchange data validation',
        'Position sizing assistant',
        'Risk/reward optimization'
      ],
      metrics: {
        accuracy: '87%',
        speed: '2.3s',
        prevented: '95%'
      },
      gradient: 'from-orange-500 to-red-600',
      borderGradient: 'from-orange-500/50 to-red-600/50'
    }
  ];

  const comingSoonProducts = [
    {
      id: 'launch-detector',
      name: 'Launch Detector Pro',
      tagline: 'Early Token Discovery',
      icon: '🚨',
      status: 'BETA ACCESS',
      statusColor: 'bg-purple-500',
      description: 'Catch the next 100x before it moons. AI-powered token launch detection with legitimacy scoring and pump probability analysis.',
      url: 'https://t.me/ClickShiftAlerts',
      features: [
        'Identifies high-potential tokens within 15 minutes',
        'Cross-validates legitimacy across 7+ sources',
        'Pump probability scores with confidence levels',
        'Instant alerts via Telegram/Discord/SMS',
        'Smart contract audit integration',
        'Whale wallet tracking on new launches'
      ],
      eta: 'Q1 2026',
      gradient: 'from-purple-500 to-pink-600',
      borderGradient: 'from-purple-500/50 to-pink-600/50'
    },
    {
      id: 'clickbot',
      name: 'ClickBot Assistant',
      tagline: 'AI Trading Companion',
      icon: '🤖',
      status: 'IN DEVELOPMENT',
      statusColor: 'bg-blue-500',
      description: 'Your personal AI trading assistant. Executes strategies, manages risk, and learns your preferences to trade smarter on your behalf.',
      url: '#waitlist',
      features: [
        'Personalized AI trading strategies',
        'Automated risk management',
        'Natural language trading commands',
        'Portfolio optimization suggestions',
        'Market sentiment integration',
        'Cross-platform execution'
      ],
      eta: 'Q2 2026',
      gradient: 'from-cyan-500 to-blue-600',
      borderGradient: 'from-cyan-500/50 to-blue-600/50'
    }
  ];

  const futureProducts = [
    {
      id: 'portfolio',
      name: 'Portfolio Intelligence',
      icon: '📊',
      description: 'AI-powered portfolio optimization with rebalancing suggestions and risk analysis.',
      eta: 'Q3 2025'
    },
    {
      id: 'cross-chain',
      name: 'Cross-Chain Intelligence',
      icon: '🌐',
      description: 'Unified intelligence across 12+ blockchains with arbitrage opportunity detection.',
      eta: 'Q3 2025'
    },
    {
      id: 'whale',
      name: 'Whale Intelligence Pro',
      icon: '🐋',
      description: 'Advanced whale tracking with behavioral analysis and move prediction.',
      eta: 'Q4 2025'
    },
    {
      id: 'defi',
      name: 'DeFi Intelligence',
      icon: '🏦',
      description: 'Yield farming optimization and protocol risk assessment with APY predictions.',
      eta: 'Q4 2025'
    },
    {
      id: 'social',
      name: 'Social Intelligence',
      icon: '👥',
      description: 'Real-time sentiment analysis from Twitter, Reddit, and Discord for market prediction.',
      eta: '2026'
    },
    {
      id: 'nft',
      name: 'NFT Intelligence',
      icon: '🎨',
      description: 'NFT market analysis with rarity scoring and trend prediction algorithms.',
      eta: '2026'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: 'none'}}>
        <AnimatedBackground />
      </div>

      {/* Content Container */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center max-w-6xl">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Intelligence Suite.
                <br />
                <span className="italic text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Built for traders, Ready for markets.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Professional-grade AI tools that transform crypto trading from guesswork to intelligence.
                Built for traders who demand precision, speed, and consistent profits.
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-blue-400 mb-1">525+</div>
                <div className="text-sm text-slate-400">Daily Active Users</div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-green-400 mb-1">73%</div>
                <div className="text-sm text-slate-400">Prediction Accuracy</div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-purple-400 mb-1">$2.7M</div>
                <div className="text-sm text-slate-400">Losses Prevented</div>
              </div>
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-orange-400 mb-1">91</div>
                <div className="text-sm text-slate-400">Net Promoter Score</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-slate-800/50 rounded-lg p-1 backdrop-blur-sm border border-slate-700">
                <button
                  onClick={() => setActiveTab('live')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'live'
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Live Products (2)
                </button>
                <button
                  onClick={() => setActiveTab('coming')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'coming'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Coming Soon (2)
                </button>
                <button
                  onClick={() => setActiveTab('future')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'future'
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Future Vision (6)
                </button>
              </div>
            </div>

            {/* Live Products */}
            {activeTab === 'live' && (
              <div className="space-y-8">
                {liveProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700 hover:border-opacity-0 hover:bg-gradient-to-br hover:${product.borderGradient} transition-all transform hover:scale-[1.02]`}
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-4xl">{product.icon}</div>
                          <div>
                            <h3 className="text-2xl font-bold">{product.name}</h3>
                            <p className="text-slate-400">{product.tagline}</p>
                          </div>
                          <div className={`${product.statusColor} text-xs px-3 py-1 rounded-full font-semibold`}>
                            {product.status}
                          </div>
                        </div>
                        
                        <p className="text-lg text-slate-300 mb-6">{product.description}</p>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-3 mb-6">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 bg-gradient-to-r ${product.gradient} px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105`}
                        >
                          <span>Launch {product.name.split(' ')[1]}</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Metrics Panel */}
                      <div className="lg:w-80">
                        <div className="bg-slate-900/70 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                          <h4 className="font-semibold mb-4 text-center">Performance Metrics</h4>
                          <div className="space-y-4">
                            {Object.entries(product.metrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-slate-400 capitalize">{key}:</span>
                                <span className="font-bold text-xl text-blue-400">{value}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Live Indicator */}
                          <div className="mt-6 flex items-center justify-center space-x-2 text-green-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">Live & Processing Data</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coming Soon Products */}
            {activeTab === 'coming' && (
              <div className="space-y-8">
                {comingSoonProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700 hover:border-opacity-0 hover:bg-gradient-to-br hover:${product.borderGradient} transition-all transform hover:scale-[1.02]`}
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="text-4xl">{product.icon}</div>
                          <div>
                            <h3 className="text-2xl font-bold">{product.name}</h3>
                            <p className="text-slate-400">{product.tagline}</p>
                          </div>
                          <div className={`${product.statusColor} text-xs px-3 py-1 rounded-full font-semibold`}>
                            {product.status}
                          </div>
                        </div>
                        
                        <p className="text-lg text-slate-300 mb-6">{product.description}</p>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-3 mb-6">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Clock className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 bg-gradient-to-r ${product.gradient} px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105`}
                        >
                          <span>
                            {product.id === 'launch-detector' ? 'Secure Early Access' : 'Join Waitlist'}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* ETA Panel */}
                      <div className="lg:w-80">
                        <div className="bg-slate-900/70 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                          <h4 className="font-semibold mb-4 text-center">Launch Timeline</h4>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">{product.eta}</div>
                            <div className="text-slate-400 mb-4">Expected Launch</div>
                            
                            {/* Progress Indicator */}
                            <div className="bg-slate-700 rounded-full h-2 mb-4">
                              <div 
                                className={`bg-gradient-to-r ${product.gradient} h-2 rounded-full transition-all duration-1000`}
                                style={{ width: product.id === 'launch-detector' ? '85%' : '60%' }}
                              ></div>
                            </div>
                            
                            <div className="text-sm text-slate-400">
                              {product.id === 'launch-detector' ? 'Beta Testing Phase' : 'Development Phase'}
                            </div>
                          </div>
                          
                          {/* Status Indicator */}
                          <div className="mt-6 flex items-center justify-center space-x-2 text-purple-400">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            <span className="text-sm">In Active Development</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Future Vision Products */}
            {activeTab === 'future' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    The Future of DeFi Intelligence
                  </h2>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                    Our roadmap to becoming the Bloomberg Terminal of Web3. Each product solves real problems 
                    that cost traders millions daily.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {futureProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all transform hover:scale-105"
                    >
                      <div className="text-3xl mb-4">{product.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                      <p className="text-slate-300 mb-4 text-sm leading-relaxed">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                          {product.eta}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vision Statement */}
                <div className="mt-16 text-center bg-gradient-to-br from-slate-800/20 to-blue-900/20 rounded-2xl p-12 border border-slate-700">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Building the Infrastructure for Intelligent Trading
                  </h3>
                  <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
                    By 2026, ClickShift will be the essential intelligence layer that every serious DeFi trader, 
                    fund, and institution relies on. We're not just building tools—we're creating the future 
                    of how humans and AI collaborate to navigate financial markets.
                  </p>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/about"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      <span>Learn Our Story</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="https://t.me/ClickShiftAlerts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 border border-slate-600 px-6 py-3 rounded-lg font-semibold hover:border-slate-500 transition-all"
                    >
                      <span>Join Our Community</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-slate-800/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Trade with Intelligence?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join 525+ traders who've already discovered the power of predictive AI. 
              Start with our free tools and experience the difference intelligence makes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://alpha.clickshift.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>🔮 Try Alpha Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://leverage.clickshift.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>⚡ Try Leverage Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;