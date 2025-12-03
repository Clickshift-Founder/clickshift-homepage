"use client";
import React, { useState, useEffect, KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, AlertTriangle, Shield, Zap, Target, DollarSign, Lock, TrendingDown, CheckCircle, XCircle, ArrowRight, ExternalLink, Activity, Brain, Bot, LineChart } from 'lucide-react';

const ClickShiftCommunityPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = 11;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e:globalThis.KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isTransitioning]);

  interface SlideProps {
  children: React.ReactNode;
  className?: string;
}
  const Slide = ({ children, className = "" }:SlideProps) => (
    <div className={`w-full h-full overflow-y-auto px-8 md:px-16 py-12 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-50 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
          CS
        </div>
        <div>
          <div className="text-lg font-bold">ClickShift</div>
          <div className="text-xs text-slate-400">Community Demo</div>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-50 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
        <span className="text-sm font-semibold">{currentSlide + 1} / {totalSlides}</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Slides Container */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className={`h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            
            {/* Slide 1: Title - The Problem */}
            {currentSlide === 0 && (
              <Slide className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-8 animate-pulse">💸</div>
                  <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    95% of Traders Lose Money
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-8">
                    Are you part of the 95%?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                    <div className="bg-red-900/30 backdrop-blur rounded-xl p-6 border border-red-500/30">
                      <div className="text-4xl font-bold text-red-400 mb-2">$50B</div>
                      <div className="text-sm text-slate-300">Lost Annually</div>
                      <div className="text-xs text-slate-500 mt-1">To poor timing</div>
                    </div>
                    <div className="bg-orange-900/30 backdrop-blur rounded-xl p-6 border border-orange-500/30">
                      <div className="text-4xl font-bold text-orange-400 mb-2">73%</div>
                      <div className="text-sm text-slate-300">Buy at Peak</div>
                      <div className="text-xs text-slate-500 mt-1">Sell at bottom</div>
                    </div>
                    <div className="bg-yellow-900/30 backdrop-blur rounded-xl p-6 border border-yellow-500/30">
                      <div className="text-4xl font-bold text-yellow-400 mb-2">4min</div>
                      <div className="text-sm text-slate-300">Average Warning</div>
                      <div className="text-xs text-slate-500 mt-1">Before dump</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-purple-500/30 max-w-3xl mx-auto">
                    <p className="text-2xl font-bold text-purple-300 mb-4">
                      What if you could see the exit BEFORE the dump?
                    </p>
                    <p className="text-xl text-slate-300">
                      We built 3 tools that help you trade smarter, not harder
                    </p>
                  </div>
                </div>
              </Slide>
            )}

            {/* Slide 2: The Cost of Trading Blind */}
            {currentSlide === 1 && (
              <Slide>
                <h2 className="text-5xl font-bold mb-12 text-center text-red-400">The Cost of Trading Blind</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-red-900/40 to-red-600/20 rounded-2xl p-8 border border-red-500/30">
                    <div className="flex items-center space-x-3 mb-6">
                      <TrendingDown className="h-12 w-12 text-red-400" />
                      <h3 className="text-3xl font-bold text-red-400">Without ClickShift</h3>
                    </div>
                    <ul className="space-y-4 text-slate-300">
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">You buy at $0.002</p>
                          <p className="text-sm text-slate-400">Token pumps to $0.006 (3x)</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">You think "it'll go higher"</p>
                          <p className="text-sm text-slate-400">Greed kicks in, you hold</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Whales exit cluster detected</p>
                          <p className="text-sm text-slate-400">Too late - you didn't see it</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Price crashes to $0.0008</p>
                          <p className="text-sm text-slate-400">You panic sell at 60% LOSS</p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6 p-4 bg-red-500/20 rounded-lg border border-red-500/40">
                      <p className="text-center text-2xl font-bold text-red-300">
                        RESULT: -$600 on $1,000 investment
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-900/40 to-green-600/20 rounded-2xl p-8 border border-green-500/30">
                    <div className="flex items-center space-x-3 mb-6">
                      <TrendingUp className="h-12 w-12 text-green-400" />
                      <h3 className="text-3xl font-bold text-green-400">With ClickShift</h3>
                    </div>
                    <ul className="space-y-4 text-slate-300">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Alpha scans before you buy</p>
                          <p className="text-sm text-slate-400">73% accuracy legitimacy score</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">You buy at $0.002 confidently</p>
                          <p className="text-sm text-slate-400">Based on AI prediction</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Exit cluster alert at $0.0055</p>
                          <p className="text-sm text-slate-400">4 minutes before dump</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">You exit at 2.75x profit</p>
                          <p className="text-sm text-slate-400">Before the crash happens</p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/40">
                      <p className="text-center text-2xl font-bold text-green-300">
                        RESULT: +$1,750 on $1,000 investment
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl p-8 border border-orange-500/30 text-center">
                  <p className="text-3xl font-bold text-orange-300 mb-2">
                    Opportunity Cost: $2,350 per trade
                  </p>
                  <p className="text-xl text-slate-300">
                    This is just ONE trade. Imagine 10 trades per month...
                  </p>
                </div>
              </Slide>
            )}

            {/* Slide 3: Solution Overview */}
            {currentSlide === 2 && (
              <Slide>
                <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  3 Tools That Change Everything
                </h2>
                <p className="text-2xl text-center text-slate-300 mb-12">
                  Each solving a specific problem in your trading journey
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Alpha */}
                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-2xl p-8 border border-purple-500/30 hover:scale-105 transition-transform">
                    <div className="text-6xl mb-4 text-center">🧠</div>
                    <h3 className="text-3xl font-bold text-purple-400 mb-4 text-center">Alpha</h3>
                    <p className="text-slate-300 text-center mb-4">
                      Know WHAT to buy and WHEN to exit
                    </p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>73% accurate predictions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Exit cluster detection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Rug pull scoring</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Real-time alerts</span>
                      </div>
                    </div>
                  </div>

                  {/* Leverage */}
                  <div className="bg-gradient-to-br from-orange-900/40 to-orange-600/20 rounded-2xl p-8 border border-orange-500/30 hover:scale-105 transition-transform">
                    <div className="text-6xl mb-4 text-center">⚡</div>
                    <h3 className="text-3xl font-bold text-orange-400 mb-4 text-center">Leverage</h3>
                    <p className="text-slate-300 text-center mb-4">
                      Trade futures without getting liquidated
                    </p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Liquidation risk calculator</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Position sizing guide</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>MACD + OBV signals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Cross-exchange arbitrage</span>
                      </div>
                    </div>
                  </div>

                  {/* ClickBot */}
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-600/20 rounded-2xl p-8 border border-blue-500/30 hover:scale-105 transition-transform">
                    <div className="text-6xl mb-4 text-center">🤖</div>
                    <h3 className="text-3xl font-bold text-blue-400 mb-4 text-center">ClickBot</h3>
                    <p className="text-slate-300 text-center mb-4">
                      Auto-trade while you sleep
                    </p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Trailing profit (catch peaks)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Alpha AI brain built-in</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Non-custodial (your keys)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>DCA strategies included</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30 text-center">
                  <p className="text-2xl font-bold text-green-400 mb-2">
                    525 traders already use these tools daily
                  </p>
                  <p className="text-xl text-slate-300">
                    91 Net Promoter Score | $2.7M in losses prevented
                  </p>
                </div>
              </Slide>
            )}

            {/* Slide 4: Alpha Deep Dive */}
            {currentSlide === 3 && (
              <Slide>
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <Brain className="h-16 w-16 text-purple-400" />
                  <h2 className="text-5xl font-bold text-purple-400">Alpha: Your Trading Brain</h2>
                </div>
                <p className="text-2xl text-center text-slate-300 mb-12">
                  See the future before it happens
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-purple-300">What Alpha Does</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Exit Cluster Detection (Patent-Pending)</p>
                          <p className="text-slate-400 text-sm">Spots when whales are about to dump - gives you 4 minute warning</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Rug Pull Legitimacy Score</p>
                          <p className="text-slate-400 text-sm">0-100 score tells you if token is safe before you buy</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">AI Price Predictions</p>
                          <p className="text-slate-400 text-sm">73% accuracy on where price will go next</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 font-bold">4</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Real-Time Alerts</p>
                          <p className="text-slate-400 text-sm">Telegram notifications when critical events happen</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-900/40 to-orange-600/20 rounded-xl p-8 border border-red-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-red-300">Without Alpha (Real Story)</h3>
                    <div className="space-y-4 text-slate-300">
                      <p className="text-lg font-semibold text-red-400">User bought POPCAT at $200K mcap</p>
                      <p>Token went to $1.5M mcap (7.5x gain)</p>
                      <p>User got greedy, thought "it'll go to $10M"</p>
                      <p>Whale dump happened - no warning</p>
                      <p>Price crashed 80% in 10 minutes</p>
                      <p className="text-xl font-bold text-red-400">Lost $8,500 profit opportunity</p>
                    </div>
                    <div className="mt-6 p-4 bg-red-500/20 rounded-lg border border-red-500/40">
                      <p className="font-semibold text-red-300">COST: Turned 7.5x into 1.5x</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">73%</div>
                    <p className="text-slate-300">Prediction Accuracy</p>
                    <p className="text-xs text-slate-500 mt-1">Measured across 2,847 predictions</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">4min</div>
                    <p className="text-slate-300">Average Warning Time</p>
                    <p className="text-xs text-slate-500 mt-1">Before whale exits</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">$2.7M</div>
                    <p className="text-slate-300">User Losses Prevented</p>
                    <p className="text-xs text-slate-500 mt-1">Since launch</p>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
                  <p className="text-center text-xl font-semibold text-purple-300">
                    🎯 LIVE DEMO: Let's analyze a token together →
                  </p>
                </div>
              </Slide>
            )}

            {/* Slide 5: Leverage Deep Dive */}
            {currentSlide === 4 && (
              <Slide>
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <Zap className="h-16 w-16 text-orange-400" />
                  <h2 className="text-5xl font-bold text-orange-400">Leverage: Futures Made Safe</h2>
                </div>
                <p className="text-2xl text-center text-slate-300 mb-12">
                  Stop getting liquidated. Start making money.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-red-900/40 to-red-600/20 rounded-xl p-8 border border-red-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-red-300">The Liquidation Problem</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                        <p className="font-semibold text-red-400 mb-2">Scenario: SOL Futures Trade</p>
                        <ul className="space-y-2 text-slate-300 text-sm">
                          <li>• You open 10x long at $100</li>
                          <li>• Position: $1,000 (controlling $10,000)</li>
                          <li>• Liquidation price: $90 (10% drop)</li>
                          <li>• SOL drops to $91 overnight</li>
                          <li>• You wake up: <span className="text-red-400 font-bold">LIQUIDATED</span></li>
                        </ul>
                      </div>
                      <div className="p-4 bg-red-500/20 rounded-lg border border-red-500/40">
                        <p className="text-center text-xl font-bold text-red-300">
                          COST: Lost entire $1,000
                        </p>
                        <p className="text-center text-sm text-slate-400 mt-1">
                          Could have used 3x leverage instead of 10x
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/40 to-orange-600/20 rounded-xl p-8 border border-orange-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-orange-300">What Leverage Does</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-400 font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Liquidation Risk Calculator</p>
                          <p className="text-slate-400 text-sm">Shows EXACT price you'll get liquidated at - before you enter</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-400 font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Position Sizing Intelligence</p>
                          <p className="text-slate-400 text-sm">Tells you optimal leverage based on volatility</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-400 font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">MACD + OBV Fusion Signals</p>
                          <p className="text-slate-400 text-sm">Technical indicators for better entry/exit timing</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-400 font-bold">4</span>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Cross-Exchange Arbitrage</p>
                          <p className="text-slate-400 text-sm">Spots price differences across exchanges for guaranteed profit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/40 to-green-600/20 rounded-xl p-8 border border-green-500/30 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-green-300 text-center">With Leverage (Same Trade)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-slate-300">
                      <p>✅ Calculator suggests 3x leverage (safer)</p>
                      <p>✅ Liquidation price: $67 (33% buffer)</p>
                      <p>✅ SOL drops to $91 → Still safe</p>
                      <p>✅ SOL recovers to $110 next day</p>
                    </div>
                    <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/40">
                      <p className="text-center text-xl font-bold text-green-300">
                        RESULT: +$300 profit (30%)
                      </p>
                      <p className="text-center text-sm text-slate-400 mt-1">
                        Instead of losing $1,000
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl p-6 border border-orange-500/30">
                  <p className="text-center text-3xl font-bold text-orange-300 mb-2">
                    Opportunity Cost: $1,300 per liquidation
                  </p>
                  <p className="text-center text-xl text-slate-300">
                    Most traders get liquidated 3-5 times before learning. That's $3,900-$6,500.
                  </p>
                </div>

                <div className="mt-6 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-xl p-6 border border-orange-500/30">
                  <p className="text-center text-xl font-semibold text-orange-300">
                    🎯 LIVE DEMO: Let's calculate liquidation risk together →
                  </p>
                </div>
              </Slide>
            )}

            {/* Slide 6: ClickBot Deep Dive */}
            {currentSlide === 5 && (
              <Slide>
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <Bot className="h-16 w-16 text-blue-400" />
                  <h2 className="text-5xl font-bold text-blue-400">ClickBot: Your AI Trading Partner</h2>
                </div>
                <p className="text-2xl text-center text-slate-300 mb-12">
                  Trade 24/7 with Alpha intelligence built-in
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-600/20 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-blue-300">The Magic: Trailing Profit</h3>
                    <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                      <p className="text-lg font-semibold text-blue-400 mb-4">Real Scenario:</p>
                      <div className="space-y-3 text-slate-300">
                        <p>• You set target: <span className="text-green-400 font-bold">2x profit</span></p>
                        <p>• Token pumps to 3x... bot holds</p>
                        <p>• Token pumps to 5x... bot still holds</p>
                        <p>• Token pumps to <span className="text-yellow-400 font-bold">6x peak</span></p>
                        <p>• Token starts dropping...</p>
                        <p>• Bot exits at <span className="text-green-400 font-bold text-xl">5x</span> (not 2x!)</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/40">
                      <p className="text-center text-xl font-bold text-blue-300">
                        Captured 5x instead of 2x
                      </p>
                      <p className="text-center text-sm text-slate-400 mt-1">
                        150% more profit than your target
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-purple-300">How ClickBot Works</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Brain className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Alpha Intelligence Built-In</p>
                          <p className="text-slate-400 text-sm">Same 73% accurate predictions powering decisions</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Trailing Profit System</p>
                          <p className="text-slate-400 text-sm">Automatically captures peaks above your target</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Lock className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Non-Custodial Security</p>
                          <p className="text-slate-400 text-sm">You keep your keys, we never touch your funds</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Shield className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">AES-256 Encryption</p>
                          <p className="text-slate-400 text-sm">Bank-level security for your API keys</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Activity className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">DCA Strategies</p>
                          <p className="text-slate-400 text-sm">Dollar-cost averaging built-in</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Target className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Smart Stop-Loss</p>
                          <p className="text-slate-400 text-sm">Protects downside automatically</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-900/40 to-red-600/20 rounded-xl p-8 border border-red-500/30 mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-red-300 text-center">Without ClickBot</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-slate-300">
                      <p>😴 You're asleep when token pumps 6x</p>
                      <p>😰 You wake up, it's back to 1.5x</p>
                      <p>😭 Missed the entire opportunity</p>
                    </div>
                    <div className="p-4 bg-red-500/20 rounded-lg border border-red-500/40">
                      <p className="text-center text-xl font-bold text-red-300">
                        COST: Missed 6x peak
                      </p>
                      <p className="text-center text-sm text-slate-400 mt-1">
                        $5,000 opportunity lost
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
                    <p className="text-slate-300">Trading</p>
                    <p className="text-xs text-slate-500 mt-1">Never miss an opportunity</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">73%</div>
                    <p className="text-slate-300">AI Accuracy</p>
                    <p className="text-xs text-slate-500 mt-1">Alpha brain included</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
                    <p className="text-slate-300">Non-Custodial</p>
                    <p className="text-xs text-slate-500 mt-1">You control your funds</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
                  <p className="text-center text-xl font-semibold text-blue-300">
                    🎯 LIVE DEMO: Let's set up a bot together →
                  </p>
                </div>
              </Slide>
            )}

            {/* Slide 7: Real User Success Stories */}
            {currentSlide === 6 && (
              <Slide>
                <h2 className="text-5xl font-bold mb-12 text-center">Real Users, Real Results</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-green-900/40 to-green-600/20 rounded-xl p-8 border border-green-500/30">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div>
                        <p className="font-bold text-lg">Alex K.</p>
                        <p className="text-sm text-slate-400">DeFi Trader</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                      <p className="text-slate-300 italic">
                        "Their whale exit detection spotted the dump 4 minutes before it happened. I sold at +67% while others got destroyed at -40%."
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-400">+67%</p>
                        <p className="text-sm text-slate-400">His profit</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-400">-40%</p>
                        <p className="text-sm text-slate-400">Others' loss</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-xl p-8 border border-purple-500/30">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center">
                        <span className="text-2xl">💎</span>
                      </div>
                      <div>
                        <p className="font-bold text-lg">@CryptoWhale_100k</p>
                        <p className="text-sm text-slate-400">Twitter, 100K followers</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                      <p className="text-slate-300 italic">
                        "Found POPCAT at $80K market cap using Alpha's legitimacy scanner. Made 47x returns before the mainstream discovered it."
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-purple-400">47x</p>
                      <p className="text-sm text-slate-400">Return on investment</p>
                      <p className="text-xs text-slate-500 mt-1">$1,000 → $47,000</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">525</div>
                    <p className="text-slate-300">Daily Active Users</p>
                    <p className="text-xs text-slate-500 mt-1">Growing 22% weekly</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">91</div>
                    <p className="text-slate-300">Net Promoter Score</p>
                    <p className="text-xs text-slate-500 mt-1">World-class satisfaction</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">$2.7M</div>
                    <p className="text-slate-300">Losses Prevented</p>
                    <p className="text-xs text-slate-500 mt-1">Since October 2024</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-xl p-8 border border-orange-500/30">
                  <h3 className="text-2xl font-bold mb-4 text-orange-300 text-center">Most Common Feedback:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3 text-slate-300">
                      <p className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>"Finally stopped losing money"</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>"The exit alerts saved me multiple times"</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>"Best $0 I never spent" (free tier)</span>
                      </p>
                    </div>
                    <div className="space-y-3 text-slate-300">
                      <p className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>"Legitimacy score prevented rug pulls"</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>"The bot trades better than I do"</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>"Wish I found this sooner"</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Slide>
            )}

            {/* Slide 8: The Total Opportunity Cost */}
            {currentSlide === 7 && (
              <Slide>
                <h2 className="text-5xl font-bold mb-12 text-center text-red-400">
                  The TRUE Cost of Not Using ClickShift
                </h2>

                <div className="bg-gradient-to-br from-red-900/40 to-orange-600/20 rounded-2xl p-8 border border-red-500/30 mb-8">
                  <h3 className="text-3xl font-bold mb-6 text-orange-300 text-center">
                    Average Trader: 10 Trades Per Month
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="text-xl font-bold mb-4 text-red-300">WITHOUT ClickShift:</h4>
                      <div className="space-y-3 text-slate-300">
                        <p>❌ 7 losing trades (70% fail rate)</p>
                        <p>❌ Average loss per trade: -$350</p>
                        <p>❌ 2 break-even trades</p>
                        <p>❌ 1 winning trade: +$800</p>
                        <div className="h-px bg-red-500/30 my-3"></div>
                        <p className="text-2xl font-bold text-red-400">
                          Monthly Result: -$1,650
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold mb-4 text-green-300">WITH ClickShift:</h4>
                      <div className="space-y-3 text-slate-300">
                        <p>✅ 3 losing trades (Alpha prevented 4)</p>
                        <p>✅ Average loss per trade: -$180 (better exits)</p>
                        <p>✅ 2 break-even trades</p>
                        <p>✅ 5 winning trades: Average +$650 each</p>
                        <div className="h-px bg-green-500/30 my-3"></div>
                        <p className="text-2xl font-bold text-green-400">
                          Monthly Result: +$2,710
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/40">
                    <p className="text-center text-4xl font-bold text-orange-300 mb-2">
                      Monthly Opportunity Cost: $4,360
                    </p>
                    <p className="text-center text-xl text-slate-300">
                      That's $52,320 per year you're leaving on the table
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-xl p-6 border border-purple-500/30">
                    <h4 className="text-lg font-bold mb-3 text-purple-300">Prevented Rug Pulls</h4>
                    <p className="text-4xl font-bold text-purple-400 mb-2">$2,800</p>
                    <p className="text-sm text-slate-400">Average saved per user (lifetime)</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-600/20 rounded-xl p-6 border border-blue-500/30">
                    <h4 className="text-lg font-bold mb-3 text-blue-300">Better Exit Timing</h4>
                    <p className="text-4xl font-bold text-blue-400 mb-2">$1,560</p>
                    <p className="text-sm text-slate-400">Extra profit per user (monthly)</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/40 to-green-600/20 rounded-xl p-6 border border-green-500/30">
                    <h4 className="text-lg font-bold mb-3 text-green-300">Prevented Liquidations</h4>
                    <p className="text-4xl font-bold text-green-400 mb-2">$3,200</p>
                    <p className="text-sm text-slate-400">Average saved (3 liquidations)</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-8 border border-green-500/30 text-center">
                  <p className="text-3xl font-bold text-green-400 mb-4">
                    The Math is Simple:
                  </p>
                  <p className="text-2xl text-slate-300 mb-4">
                    If you make just ONE good trade because of our tools...
                  </p>
                  <p className="text-4xl font-bold text-green-300">
                    It pays for itself 10x over
                  </p>
                </div>
              </Slide>
            )}

            {/* Slide 9: Live Demo Time */}
            {currentSlide === 8 && (
              <Slide className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-8 animate-bounce">🎯</div>
                  <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Let's See It In Action
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                    <div className="bg-purple-900/30 backdrop-blur rounded-2xl p-8 border border-purple-500/30">
                      <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-purple-400 mb-3">Alpha Demo</h3>
                      <p className="text-slate-300">Analyze a live token together</p>
                    </div>
                    <div className="bg-orange-900/30 backdrop-blur rounded-2xl p-8 border border-orange-500/30">
                      <Zap className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-orange-400 mb-3">Leverage Demo</h3>
                      <p className="text-slate-300">Calculate liquidation risk</p>
                    </div>
                    <div className="bg-blue-900/30 backdrop-blur rounded-2xl p-8 border border-blue-500/30">
                      <Bot className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-blue-400 mb-3">ClickBot Demo</h3>
                      <p className="text-slate-300">Set up trailing profit bot</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-8 border border-green-500/30 max-w-3xl mx-auto">
                    <p className="text-2xl font-bold text-green-400 mb-4">
                      Pick a token from chat - any token!
                    </p>
                    <p className="text-xl text-slate-300">
                      Let's analyze it live and show you what you'd miss without these tools
                    </p>
                  </div>

                  <div className="mt-12 space-y-4">
                    <a 
                      href="https://alpha.clickshift.io" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all text-xl"
                    >
                      <span>Open Alpha Live</span>
                      <ExternalLink className="h-6 w-6" />
                    </a>
                    <br/>
                    <a 
                      href="https://leverage.clickshift.io" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all text-xl"
                    >
                      <span>Open Leverage Live</span>
                      <ExternalLink className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </Slide>
            )}

            {/* Slide 10: Community Integration Benefits */}
            {currentSlide === 9 && (
              <Slide>
                <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Why Your 20K Community Needs This
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-600/20 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-blue-300">What Your Members Get</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Stop Losing Money</p>
                          <p className="text-slate-400 text-sm">73% accurate predictions prevent bad trades</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Free Tier Available</p>
                          <p className="text-slate-400 text-sm">10 analyses/month at $0 - perfect for trying</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Community Support</p>
                          <p className="text-slate-400 text-sm">1,800+ traders sharing strategies in Telegram</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Education Included</p>
                          <p className="text-slate-400 text-sm">Learn while you trade (SolanaFirst onboarding)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold mb-6 text-purple-300">What You Get as Platform</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">More Engaged Users</p>
                          <p className="text-slate-400 text-sm">91 NPS = happy members who stay longer</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Reduced Member Churn</p>
                          <p className="text-slate-400 text-sm">Members who profit stick around</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Value-Add Service</p>
                          <p className="text-slate-400 text-sm">Stand out from other platforms</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-lg">Zero Integration Hassle</p>
                          <p className="text-slate-400 text-sm">Just add our links to your solution center</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-8 border border-green-500/30 mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-green-300 text-center">
                    Projected Impact on Your 20K Community
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-400 mb-2">30%</p>
                      <p className="text-slate-300 font-semibold">Adoption Rate</p>
                      <p className="text-sm text-slate-400">6,000 members using tools</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-400 mb-2">$2.7M</p>
                      <p className="text-slate-300 font-semibold">Potential Losses Prevented</p>
                      <p className="text-sm text-slate-400">Based on current user data</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-400 mb-2">91</p>
                      <p className="text-slate-300 font-semibold">NPS Score</p>
                      <p className="text-sm text-slate-400">Happy members = growth</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl p-6 border border-orange-500/30 text-center">
                  <p className="text-2xl font-bold text-orange-300 mb-2">
                    Bottom Line: Your members trade better. Your platform becomes stickier.
                  </p>
                  <p className="text-xl text-slate-300">
                    Everyone wins.
                  </p>
                </div>
              </Slide>
            )}

            {/* Slide 11: Call to Action */}
            {currentSlide === 10 && (
              <Slide className="flex items-center justify-center">
                <div className="text-center max-w-4xl">
                  <div className="text-8xl mb-8">⚡</div>
                  <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Let's Make Your Community Unstoppable
                  </h2>
                  
                  <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-purple-300">Next Steps:</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                      <div className="space-y-3">
                        <p className="flex items-center space-x-2">
                          <span className="text-2xl">1️⃣</span>
                          <span className="text-slate-300">Add ClickShift to solution center</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <span className="text-2xl">2️⃣</span>
                          <span className="text-slate-300">We provide onboarding materials</span>
                        </p>
                      </div>
                      <div className="space-y-3">
                        <p className="flex items-center space-x-2">
                          <span className="text-2xl">3️⃣</span>
                          <span className="text-slate-300">Host joint community session</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <span className="text-2xl">4️⃣</span>
                          <span className="text-slate-300">Watch your members profit</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <a 
                      href="https://alpha.clickshift.io" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-500 to-blue-600 px-6 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Try Alpha</span>
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://leverage.clickshift.io" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Try Leverage</span>
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://clickshift.io" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>

                  <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30 mb-8">
                    <p className="text-xl font-bold text-green-400 mb-2">
                      Special Offer for Your Community:
                    </p>
                    <p className="text-lg text-slate-300">
                      20% discount for all your members + Exclusive onboarding support
                    </p>
                  </div>

                  <div className="space-y-3 text-xl">
                    <p className="text-slate-400">📧 emmanuel@clickshift.io</p>
                    <p className="text-slate-400">💬 t.me/clickshift</p>
                    <p className="text-slate-400">🌐 clickshift.io</p>
                  </div>

                  <div className="mt-8">
                    <p className="text-2xl font-bold text-purple-400">
                      Let's help your 20K members trade smarter 🚀
                    </p>
                  </div>
                </div>
              </Slide>
            )}

          </div>
        </div>

        {/* Navigation Bar */}
        <div className="relative z-20 flex items-center justify-between px-8 py-6 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800">
          
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentSlide === 0
                ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800/80 hover:bg-slate-700 text-white'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden md:inline">Previous</span>
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center space-x-2 overflow-x-auto max-w-md">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-600' 
                    : 'w-3 h-3 bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentSlide === totalSlides - 1
                ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
            }`}
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-24 right-8 bg-slate-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">
        Use ← → arrow keys
      </div>
    </div>
  );
};

export default ClickShiftCommunityPresentation;