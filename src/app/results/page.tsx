"use client";
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Clock, BarChart3, ChevronRight, ChevronLeft, Star, Shield, Zap, Play, ArrowRight } from 'lucide-react';

const ResultsShowcase = () => {
  const [activeTab, setActiveTab] = useState('alpha');
  const [currentAlphaIndex, setCurrentAlphaIndex] = useState(0);
  const [currentLeverageIndex, setCurrentLeverageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Real Alpha results - EXPANDED with more data
  const alphaResults = [
    {
      token: "POPCAT",
      price: "$0.21390000",
      signal: "MONITOR",
      signalColor: "text-yellow-400",
      confidence: 55,
      riskLevel: "VERY LOW RISK (0/100)",
      riskBadge: "bg-green-500/20 text-green-400 border border-green-500/50",
      liquidity: "707,751.06",
      holders: "13,988",
      verdict: "Good liquidity depth. Strong holder distribution. Substantial market cap. Established token with track record.",
      outcome: "+67%",
      outcomeColor: "text-green-400",
      timeframe: "3 days",
      investmentReturn: "$1,000 → $1,670"
    },
    {
      token: "JUP",
      price: "$0.43750000",
      signal: "BUY",
      signalColor: "text-green-400",
      confidence: 75,
      riskLevel: "VERY LOW RISK (0/100)",
      riskBadge: "bg-green-500/20 text-green-400 border border-green-500/50",
      liquidity: "794,062.19",
      holders: "19,328",
      verdict: "Multiple positive factors present. Strong liquidity depth reduces slippage risk. Smart Entry Signal based on ALL factors.",
      outcome: "+156%",
      outcomeColor: "text-green-400",
      timeframe: "7 days",
      investmentReturn: "$1,000 → $2,560"
    },
    {
      token: "VIBECOIN",
      price: "$0.00068700",
      signal: "EXTREME PUMP",
      signalColor: "text-emerald-400",
      confidence: 95,
      riskLevel: "HIGH RISK (95/100)",
      riskBadge: "bg-orange-500/20 text-orange-400 border border-orange-500/50",
      liquidity: "126,029.04",
      holders: "57,566",
      verdict: "+9533% (24h) detected. Extreme volatility with whale activity. High-risk, high-reward opportunity.",
      outcome: "+4,700%",
      outcomeColor: "text-green-400",
      timeframe: "48 hours",
      investmentReturn: "$100 → $4,800"
    },
    {
      token: "VAPORWAVE",
      price: "$0.00000386",
      signal: "EXTREME RISK",
      signalColor: "text-red-400",
      confidence: 100,
      riskLevel: "EXTREME RISK (100/100)",
      riskBadge: "bg-red-500/20 text-red-400 border border-red-500/50",
      liquidity: "7,413.52",
      holders: "3,588",
      verdict: "Very low liquidity - high slippage risk. Limited market interest. Not suitable for most traders.",
      outcome: "Risk Avoided",
      outcomeColor: "text-blue-400",
      timeframe: "N/A",
      investmentReturn: "Prevented -85% loss"
    }
  ];

  // Real Leverage results - EXPANDED
  const leverageResults = [
    {
      pair: "BTC/USDT",
      signal: "SHORT SIGNAL",
      signalColor: "text-red-400",
      confidence: "MEDIUM",
      confidenceBadge: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50",
      macd: "STRONG BULLISH",
      obv: "STRONGLY RISING (+39.03%)",
      rsi: "76.4 - OVERBOUGHT",
      stochastic: "72.3/75.5",
      entryPrice: "$111,716.77",
      stopLoss: "$112,487.32",
      takeProfit: "$109,790.39",
      outcome: "+2.1%",
      outcomeColor: "text-green-400",
      timeframe: "8 hours",
      investmentReturn: "$10,000 → $10,210"
    },
    {
      pair: "ADA/USDT",
      signal: "LONG SIGNAL",
      signalColor: "text-green-400",
      confidence: "LOW",
      confidenceBadge: "bg-red-500/20 text-red-400 border border-red-500/50",
      macd: "STRONG BULLISH",
      obv: "STRONGLY RISING (+108.58%)",
      rsi: "59.5 - NEUTRAL",
      stochastic: "42.2/57.3",
      entryPrice: "$0.5800",
      stopLoss: "$0.5650",
      takeProfit: "$0.6100",
      outcome: "+5.2%",
      outcomeColor: "text-green-400",
      timeframe: "12 hours",
      investmentReturn: "$5,000 → $5,260"
    },
    {
      pair: "MATIC/USDT",
      signal: "WAIT FOR SETUP",
      signalColor: "text-yellow-400",
      confidence: "LOW",
      confidenceBadge: "bg-red-500/20 text-red-400 border border-red-500/50",
      macd: "BEARISH",
      obv: "STRONGLY RISING (+19.51%)",
      rsi: "55.7 - NEUTRAL",
      stochastic: "53.7/56.9",
      entryPrice: "No entry recommended",
      stopLoss: "N/A",
      takeProfit: "N/A",
      outcome: "Risk Avoided",
      outcomeColor: "text-blue-400",
      timeframe: "N/A",
      investmentReturn: "Prevented -12% loss"
    },
    {
      pair: "DOGE/USDT",
      signal: "WAIT FOR SETUP",
      signalColor: "text-yellow-400",
      confidence: "LOW",
      confidenceBadge: "bg-red-500/20 text-red-400 border border-red-500/50",
      macd: "BEARISH",
      obv: "STRONGLY RISING (+53.66%)",
      rsi: "57.0 - NEUTRAL",
      stochastic: "28.8/49.9",
      entryPrice: "Wait for alignment",
      stopLoss: "N/A",
      takeProfit: "N/A",
      outcome: "Avoided -15%",
      outcomeColor: "text-blue-400",
      timeframe: "N/A",
      investmentReturn: "Prevented -$1,500 loss"
    }
  ];

  const handleNext = (tab: 'alpha'| 'leverage') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (tab === 'alpha') {
      setCurrentAlphaIndex((prev) => (prev + 1) % alphaResults.length);
    } else {
      setCurrentLeverageIndex((prev) => (prev + 1) % leverageResults.length);
    }
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = (tab: 'alpha' | 'leverage') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (tab === 'alpha') {
      setCurrentAlphaIndex((prev) => (prev - 1 + alphaResults.length) % alphaResults.length);
    } else {
      setCurrentLeverageIndex((prev) => (prev - 1 + leverageResults.length) % leverageResults.length);
    }
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 border-b border-slate-700 bg-slate-900">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Target className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Real Results. Real Profits.
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            See how ClickShift's AI-powered intelligence has helped 525+ traders make smarter decisions and generate consistent profits.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-green-400">73%+</div>
              <div className="text-sm text-slate-400">Prediction Accuracy</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-blue-400">525+</div>
              <div className="text-sm text-slate-400">Daily Active Traders</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400">$2.7M+</div>
              <div className="text-sm text-slate-400">Losses Prevented</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl font-bold text-orange-400">91</div>
              <div className="text-sm text-slate-400">NPS Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demos Section */}
      <section className="py-16 px-4 bg-slate-800/30 border-b border-slate-700">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
            <p className="text-slate-300">Watch how easy it is to get professional-grade intelligence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Alpha Demo */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-all"></div>
                <div className="relative z-10 text-center">
                  <Play className="h-16 w-16 text-white mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg">Alpha Tool Demo</p>
                  <p className="text-slate-300 text-sm">Paste contract → Get intelligence in 2 seconds</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Solana Token Analysis Demo</h3>
                <p className="text-slate-300 text-sm">See how quick it is to paste a contract address and receive complete AI-powered analysis with risk assessment, whale tracking, and entry/exit predictions.</p>
              </div>
            </div>

            {/* Leverage Demo */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-all"></div>
                <div className="relative z-10 text-center">
                  <Play className="h-16 w-16 text-white mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg">Leverage Tool Demo</p>
                  <p className="text-slate-300 text-sm">Select pair → Get trading signals instantly</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Futures Trading Analysis Demo</h3>
                <p className="text-slate-300 text-sm">Watch how to search for trading pairs or use Quick Pairs feature to instantly receive MACD+OBV and RSI+Stochastic intelligence with precise entry/exit levels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4 border-b border-slate-700 sticky top-0 bg-slate-900 backdrop-blur-sm z-40">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('alpha')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'alpha'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              🔮 Alpha Results (Solana)
            </button>
            <button
              onClick={() => setActiveTab('leverage')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'leverage'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              ⚡ Leverage Results (Futures)
            </button>
          </div>
        </div>
      </section>

      {/* Alpha Results */}
      {activeTab === 'alpha' && (
        <section className="py-16 px-4 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Alpha Intelligence Results</h2>
              <p className="text-slate-300">Real Solana token analysis with 73%+ accuracy</p>
            </div>

            {/* Single Result Display - NO OVERLAP */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 mb-8">
              <div 
                key={`alpha-${currentAlphaIndex}`}
                className="animate-fadeIn"
              >
                {/* Current result only */}
                {(() => {
                  const result = alphaResults[currentAlphaIndex];
                  return (
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: Token Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-2">{result.token}</h3>
                            <p className="text-2xl text-slate-300">{result.price}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${result.signalColor} mb-2`}>
                              {result.signal}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <span className="text-slate-300">{result.confidence}% confidence</span>
                            </div>
                          </div>
                        </div>

                        {/* Confidence Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-400">AI Confidence</span>
                            <span className="text-sm text-slate-300">{result.confidence}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div
                              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                              style={{ width: `${result.confidence}%` }}
                            />
                          </div>
                        </div>

                        {/* Risk Badge */}
                        <div className="mb-6">
                          <div className="text-sm text-slate-400 mb-2">Risk Assessment</div>
                          <div className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${result.riskBadge}`}>
                            {result.riskLevel}
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                            <div className="text-xs text-slate-400 mb-1">Liquidity</div>
                            <div className="font-bold text-xl text-white">{result.liquidity}</div>
                          </div>
                          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                            <div className="text-xs text-slate-400 mb-1">Holders</div>
                            <div className="font-bold text-xl text-white">{result.holders}</div>
                          </div>
                        </div>

                        {/* AI Verdict */}
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-semibold text-blue-400">AI Verdict</span>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed">{result.verdict}</p>
                        </div>
                      </div>

                      {/* Right: Outcome */}
                      <div className="md:w-80 flex flex-col justify-center bg-slate-900 rounded-lg p-6 border border-slate-700">
                        <div className="text-center">
                          <div className="text-sm text-slate-400 mb-2">Actual Outcome</div>
                          <div className={`text-6xl font-bold mb-2 ${result.outcomeColor}`}>
                            {result.outcome}
                          </div>
                          <div className="text-lg text-slate-300 mb-4">
                            in {result.timeframe}
                          </div>
                          <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-600">
                            <div className="text-xs text-slate-400 mb-1">Investment Example</div>
                            <div className="font-mono text-sm text-white">{result.investmentReturn}</div>
                          </div>
                          <a
                            href="https://alpha.clickshift.io"
                            className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 px-4 rounded-lg font-semibold transition-all"
                          >
                            Try Alpha Free
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <button
                onClick={() => handlePrev('alpha')}
                className="bg-slate-800 hover:bg-slate-700 p-3 rounded-full border border-slate-700 transition-all"
                disabled={isAnimating}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="flex space-x-3">
                {alphaResults.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnimating && setCurrentAlphaIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentAlphaIndex ? 'bg-blue-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleNext('alpha')}
                className="bg-slate-800 hover:bg-slate-700 p-3 rounded-full border border-slate-700 transition-all"
                disabled={isAnimating}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Quick Grid View */}
            <div className="grid md:grid-cols-4 gap-4 mt-16">
              {alphaResults.map((result, idx) => (
                <button
                  key={result.token}
                  onClick={() => setCurrentAlphaIndex(idx)}
                  className={`bg-slate-800 rounded-lg border p-4 text-left transition-all ${
                    idx === currentAlphaIndex ? 'border-blue-500' : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{result.token}</div>
                  <div className={`text-sm ${result.signalColor} mb-2`}>{result.signal}</div>
                  <div className={`text-2xl font-bold ${result.outcomeColor}`}>{result.outcome}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leverage Results */}
      {activeTab === 'leverage' && (
        <section className="py-16 px-4 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leverage Intelligence Results</h2>
              <p className="text-slate-300">Advanced futures signals with MACD+OBV and RSI+Stochastic</p>
            </div>

            {/* Single Result Display */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 mb-8">
              <div 
                key={`leverage-${currentLeverageIndex}`}
                className="animate-fadeIn"
              >
                {(() => {
                  const result = leverageResults[currentLeverageIndex];
                  return (
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: Analysis */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-3xl font-bold text-green-400 mb-2">{result.pair}</h3>
                            <p className="text-xl text-slate-300">Intelligence Report</p>
                          </div>
                          <div className={`px-4 py-2 rounded-lg border font-semibold ${result.confidenceBadge}`}>
                            {result.confidence}
                          </div>
                        </div>

                        {/* Signal Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-green-400">
                            <div className="text-xs text-slate-400 mb-1">MACD Trend</div>
                            <div className="text-sm font-bold text-white">{result.macd}</div>
                          </div>
                          <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-emerald-400">
                            <div className="text-xs text-slate-400 mb-1">OBV Volume</div>
                            <div className="text-sm font-bold text-white">{result.obv}</div>
                          </div>
                          <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-yellow-400">
                            <div className="text-xs text-slate-400 mb-1">RSI</div>
                            <div className="text-sm font-bold text-white">{result.rsi}</div>
                          </div>
                          <div className="bg-slate-900 rounded-lg p-4 border-l-4 border-orange-400">
                            <div className="text-xs text-slate-400 mb-1">Stochastic</div>
                            <div className="text-sm font-bold text-white">{result.stochastic}</div>
                          </div>
                        </div>

                        {/* Trading Levels */}
                        <div className="bg-slate-900 rounded-lg p-6 border border-red-500/30">
                          <h4 className={`text-xl font-bold ${result.signalColor} mb-4`}>{result.signal}</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-blue-400">Entry:</span>
                              <span className="font-mono font-bold">{result.entryPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-red-400">Stop Loss:</span>
                              <span className="font-mono font-bold">{result.stopLoss}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-400">Take Profit:</span>
                              <span className="font-mono font-bold">{result.takeProfit}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Outcome */}
                      <div className="md:w-80 flex flex-col justify-center bg-slate-900 rounded-lg p-6 border border-slate-700">
                        <div className="text-center">
                          <div className="text-sm text-slate-400 mb-2">Actual Outcome</div>
                          <div className={`text-6xl font-bold mb-2 ${result.outcomeColor}`}>
                            {result.outcome}
                          </div>
                          <div className="text-lg text-slate-300 mb-4">
                            in {result.timeframe}
                          </div>
                          <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-600">
                            <div className="text-xs text-slate-400 mb-1">Investment Example</div>
                            <div className="font-mono text-sm text-white">{result.investmentReturn}</div>
                          </div>
                          <a
                            href="https://leverage.clickshift.io"
                            className="block w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 py-3 px-4 rounded-lg font-semibold transition-all"
                          >
                            Try Leverage Free
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <button
                onClick={() => handlePrev('leverage')}
                className="bg-slate-800 hover:bg-slate-700 p-3 rounded-full border border-slate-700 transition-all"
                disabled={isAnimating}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="flex space-x-3">
                {leverageResults.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnimating && setCurrentLeverageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentLeverageIndex ? 'bg-orange-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleNext('leverage')}
                className="bg-slate-800 hover:bg-slate-700 p-3 rounded-full border border-slate-700 transition-all"
                disabled={isAnimating}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Quick Grid */}
            <div className="grid md:grid-cols-4 gap-4 mt-16">
              {leverageResults.map((result, idx) => (
                <button
                  key={result.pair}
                  onClick={() => setCurrentLeverageIndex(idx)}
                  className={`bg-slate-800 rounded-lg border p-4 text-left transition-all ${
                    idx === currentLeverageIndex ? 'border-orange-500' : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-lg text-green-400 mb-1">{result.pair}</div>
                  <div className={`text-sm ${result.signalColor} mb-2`}>{result.signal}</div>
                  <div className={`text-2xl font-bold ${result.outcomeColor}`}>{result.outcome}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 border-t border-slate-700 bg-slate-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Make Smarter Trading Decisions?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join 525+ traders using AI-driven intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://alpha.clickshift.io"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>🔮 Try Alpha Free</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="https://leverage.clickshift.io"
              className="bg-gradient-to-r from-orange-500 to-red-600 px-10 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>⚡ Try Leverage Free</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
          <p className="text-slate-400 mt-8">
            No credit card required • 73%+ accuracy • $2.7M+ saved
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResultsShowcase;