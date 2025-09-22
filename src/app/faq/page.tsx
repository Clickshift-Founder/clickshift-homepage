"use client";
import React, { useState, useMemo } from 'react';
import Link from "next/link";
import { 
  Search, 
  Shield, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Star,
  DollarSign,
  Code,
  Smartphone,
  Lock,
  TrendingUp,
  Users,
} from 'lucide-react';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="h-4 w-4" />, count: 0 },
    { id: 'general', name: 'General', icon: <Shield className="h-4 w-4" />, count: 0 },
    { id: 'pricing', name: 'Pricing & Plans', icon: <DollarSign className="h-4 w-4" />, count: 0 },
    { id: 'technical', name: 'Technical', icon: <Code className="h-4 w-4" />, count: 0 },
    { id: 'trading', name: 'Trading & Accuracy', icon: <TrendingUp className="h-4 w-4" />, count: 0 },
    { id: 'security', name: 'Security & Privacy', icon: <Lock className="h-4 w-4" />, count: 0 },
    { id: 'mobile', name: 'Mobile & Apps', icon: <Smartphone className="h-4 w-4" />, count: 0 },
    { id: 'api', name: 'API & Developers', icon: <Code className="h-4 w-4" />, count: 0 }
  ];

  const faqs = [
    // General Questions
    {
      id: 1,
      category: 'general',
      question: 'What is ClickShift and how does it work?',
      answer: 'ClickShift is the world\'s first predictive trading intelligence platform for DeFi. We use AI to analyze market patterns, whale movements, and exit clusters to predict where token prices will move before they happen. Our algorithms have 73%+ accuracy in predicting market movements.',
      tags: ['basics', 'overview', 'ai', 'prediction']
    },
    {
      id: 2,
      category: 'general',
      question: 'What makes ClickShift different from other trading tools?',
      answer: 'Unlike other tools that show historical data, ClickShift predicts future market movements. We focus on WHERE traders will exit before they do, using patent-pending exit cluster detection and AI pattern recognition. Our 73% accuracy rate is 28% higher than industry average.',
      tags: ['comparison', 'unique', 'accuracy', 'competition']
    },
    {
      id: 3,
      category: 'general',
      question: 'Which blockchains and tokens do you support?',
      answer: 'Currently, ClickShift Alpha supports all Solana tokens, while ClickShift Leverage supports major crypto futures pairs (BTC, ETH, SOL, etc.). We\'re expanding to Ethereum, Base, and BSC in Q3 2025.',
      tags: ['blockchain', 'solana', 'ethereum', 'tokens', 'support']
    },
    {
      id: 4,
      category: 'general',
      question: 'Do I need trading experience to use ClickShift?',
      answer: 'No! ClickShift is designed for both beginners and experts. Our interface provides clear BUY/SELL/AVOID recommendations with specific entry and exit points. We also include educational explanations to help you learn as you trade.',
      tags: ['beginner', 'education', 'experience', 'learning']
    },

    // Pricing & Plans
    {
      id: 5,
      category: 'pricing',
      question: 'Is there a free plan available?',
      answer: 'Yes! Our Explorer plan is completely free and includes 10 token analyses per month, basic whale alerts, and community access. It\'s perfect for getting started with intelligent trading.',
      tags: ['free', 'plan', 'explorer', 'trial']
    },
    {
      id: 6,
      category: 'pricing',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you\'ll retain access until the end of your billing period.',
      tags: ['cancel', 'subscription', 'billing', 'refund']
    },
    {
      id: 7,
      category: 'pricing',
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied with ClickShift, contact us within 14 days for a full refund.',
      tags: ['refund', 'guarantee', 'money-back', 'satisfaction']
    },
    {
      id: 8,
      category: 'pricing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cryptocurrency payments including BTC, ETH, USDC, and SOL.',
      tags: ['payment', 'crypto', 'credit-card', 'paypal']
    },
    {
      id: 9,
      category: 'pricing',
      question: 'Is there a discount for annual billing?',
      answer: 'Yes! Annual billing saves you 20% compared to monthly billing. For example, our Professional plan costs $63/month when billed annually instead of $79/month.',
      tags: ['discount', 'annual', 'billing', 'savings']
    },

    // Technical Questions
    {
      id: 10,
      category: 'technical',
      question: 'How fast are your analyses?',
      answer: 'Our AI performs complete token analysis in under 2.1 seconds on average. This includes whale tracking, exit cluster detection, RSI analysis, and risk assessment across multiple data sources.',
      tags: ['speed', 'performance', 'analysis', 'fast']
    },
    {
      id: 11,
      category: 'technical',
      question: 'What data sources do you use?',
      answer: 'We integrate with 7+ premium data sources including Helius, DexScreener, Jupiter, CoinGecko, Moralis, Shyft, and HelloMoon. This ensures 99.9% uptime and cross-validated accuracy.',
      tags: ['data', 'sources', 'api', 'reliability']
    },
    {
      id: 12,
      category: 'technical',
      question: 'Do you have rate limits?',
      answer: 'Free users get 10 analyses per month. Professional users get unlimited analyses with 1,000 API calls/month. Elite users get 10,000 API calls/month. Enterprise has custom limits.',
      tags: ['rate-limits', 'api', 'limits', 'calls']
    },
    {
      id: 13,
      category: 'technical',
      question: 'Is your platform reliable during high market volatility?',
      answer: 'Yes! Our infrastructure is built for high-volume periods. We maintain 99.9% uptime even during major market events, with redundant systems and automatic failover capabilities.',
      tags: ['reliability', 'uptime', 'volatility', 'infrastructure']
    },

    // Trading & Accuracy
    {
      id: 14,
      category: 'trading',
      question: 'How accurate are your predictions?',
      answer: 'Our overall prediction accuracy is 73.2%, with some patterns achieving 85%+ accuracy. BUY signals have 76.8% accuracy, AVOID signals have 82.1% accuracy. We track and display real-time accuracy metrics.',
      tags: ['accuracy', 'predictions', 'success-rate', 'performance']
    },
    {
      id: 15,
      category: 'trading',
      question: 'What is exit cluster detection?',
      answer: 'Exit cluster detection is our patent-pending technology that identifies WHERE whales plan to sell before they execute. It analyzes order books, transaction patterns, and holder behavior to predict major sell-offs.',
      tags: ['exit-cluster', 'whale', 'prediction', 'patent']
    },
    {
      id: 16,
      category: 'trading',
      question: 'How do you detect whale movements?',
      answer: 'We monitor large wallet addresses, transaction patterns, and order flow across multiple DEXs. Our AI identifies when whales are accumulating or preparing to dump, giving you early warning signals.',
      tags: ['whale', 'detection', 'monitoring', 'alerts']
    },
    {
      id: 17,
      category: 'trading',
      question: 'Can ClickShift help prevent losses?',
      answer: 'Yes! We\'ve helped users prevent over $2.4M in losses by providing early exit warnings. Our risk assessment identifies potential rug pulls, whale dumps, and market manipulation before they happen.',
      tags: ['loss-prevention', 'risk', 'protection', 'safety']
    },
    {
      id: 18,
      category: 'trading',
      question: 'Do you provide specific entry and exit points?',
      answer: 'Absolutely! Every analysis includes specific entry prices, stop-loss levels, take-profit targets, and recommended position sizes. Our recommendations come with expiry times for optimal timing.',
      tags: ['entry', 'exit', 'targets', 'specific']
    },

    // Security & Privacy
    {
      id: 19,
      category: 'security',
      question: 'Is my data safe with ClickShift?',
      answer: 'Yes! We use enterprise-grade security with AES-256 encryption, SOC2 compliance, and never store sensitive information like private keys. We\'re GDPR compliant and respect user privacy.',
      tags: ['security', 'privacy', 'encryption', 'gdpr']
    },
    {
      id: 20,
      category: 'security',
      question: 'Do you require KYC verification?',
      answer: 'No KYC required for basic usage. You can start using ClickShift immediately with just an email. We only collect necessary information and never share personal data.',
      tags: ['kyc', 'verification', 'privacy', 'requirements']
    },
    {
      id: 21,
      category: 'security',
      question: 'Can you access my wallet or funds?',
      answer: 'No! ClickShift is analysis-only and never has access to your wallets or funds. We don\'t require wallet connections for basic analysis. Any future wallet integration is read-only for portfolio tracking.',
      tags: ['wallet', 'access', 'funds', 'safety']
    },

    // Mobile & Apps
    {
      id: 22,
      category: 'mobile',
      question: 'Do you have a mobile app?',
      answer: 'We have a progressive web app (PWA) that works perfectly on mobile devices. A dedicated mobile app for iOS and Android is launching in Q2 2025 with push notifications and offline analysis.',
      tags: ['mobile', 'app', 'pwa', 'notifications']
    },
    {
      id: 23,
      category: 'mobile',
      question: 'Can I get real-time alerts on my phone?',
      answer: 'Yes! Professional and Elite users receive real-time alerts via email, Telegram, and push notifications (coming soon). You can customize alert settings for specific tokens or risk levels.',
      tags: ['alerts', 'notifications', 'real-time', 'mobile']
    },
    {
      id: 24,
      category: 'mobile',
      question: 'Does the mobile version have all features?',
      answer: 'Yes! Our mobile web app has 100% feature parity with desktop. All analysis tools, alerts, and settings are available on mobile with an optimized touch interface.',
      tags: ['mobile', 'features', 'parity', 'responsive']
    },

    // API & Developers
    {
      id: 25,
      category: 'api',
      question: 'Do you offer an API for developers?',
      answer: 'Yes! We offer comprehensive REST APIs starting at $49/month for 5,000 calls. Our API provides real-time analysis, whale alerts, and prediction data with detailed documentation.',
      tags: ['api', 'developers', 'rest', 'documentation']
    },
    {
      id: 26,
      category: 'api',
      question: 'What can I build with your API?',
      answer: 'Developers build trading bots, portfolio trackers, alert systems, and custom applications. Our API provides the same intelligence that powers our web platform.',
      tags: ['api', 'trading-bots', 'applications', 'integration']
    },
    {
      id: 27,
      category: 'api',
      question: 'Is there API documentation available?',
      answer: 'Yes! We provide comprehensive API documentation with code examples, SDKs for popular languages, and interactive testing tools. Documentation includes rate limits, authentication, and best practices.',
      tags: ['documentation', 'api', 'sdk', 'examples']
    },
    {
      id: 28,
      category: 'api',
      question: 'Do you have rate limiting protection?',
      answer: 'Yes! We implement intelligent rate limiting to prevent abuse while allowing legitimate usage. API plans include different rate limits, and we offer custom limits for enterprise users.',
      tags: ['rate-limiting', 'protection', 'abuse', 'enterprise']
    }
  ];

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
   const counts = faqs.reduce<Record<string, number>>((acc, faq) => {
  acc[faq.category] = (acc[faq.category] || 0) + 1;
  return acc;
}, {});

    counts.all = faqs.length;

    return categories.map(cat => ({
      ...cat,
      count: counts[cat.id] || 0
    }));
  }, [faqs]);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, faqs]);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">ClickShift</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked
            <br />
            Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to know about ClickShift's intelligent trading platform. 
            Can't find what you're looking for? Contact our support team.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-4 text-slate-400">
              Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                
                <div className="space-y-2">
                  {categoriesWithCounts.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {category.icon}
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-xs bg-slate-600 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={expandAll}
                    className="w-full bg-slate-700 hover:bg-slate-600 p-2 rounded text-sm transition-all"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="w-full bg-slate-700 hover:bg-slate-600 p-2 rounded text-sm transition-all"
                  >
                    Collapse All
                  </button>
                </div>

                {/* Contact Support */}
                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Need More Help?</h4>
                  <p className="text-sm text-slate-300 mb-3">
                    Can't find the answer you're looking for? Our support team is here to help.
                  </p>
                  <a 
                    href="mailto:trust@clickshift.io"
                    className="block text-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold transition-all"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">No results found</h3>
                    <p className="text-slate-400 mb-4">
                      Try adjusting your search terms or browse categories.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-all"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all"
                    >
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all"
                      >
                        <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                        {expandedItems.has(faq.id) ? (
                          <ChevronDown className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedItems.has(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-slate-700 pt-4">
                            <p className="text-slate-300 leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded cursor-pointer hover:bg-blue-500 transition-all"
                                  onClick={() => setSearchQuery(tag)}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
              <TrendingUp className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Getting Started Guide</h3>
              <p className="text-slate-300 text-sm mb-4">
                Learn how to use ClickShift's AI predictions to improve your trading performance.
              </p>
              <a href="/docs/getting-started" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                Read Guide →
              </a>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
              <Code className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">API Documentation</h3>
              <p className="text-slate-300 text-sm mb-4">
                Integrate ClickShift's intelligence into your applications with our comprehensive API.
              </p>
              <a href="/docs/api" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                View Docs →
              </a>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
              <Users className="h-8 w-8 text-green-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-slate-300 text-sm mb-4">
                Join 1,200+ traders sharing strategies and insights in our Telegram community.
              </p>
              <a href="https://t.me/ClickShiftAlerts" className="text-green-400 hover:text-green-300 text-sm font-semibold">
                Join Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Still Have Questions?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Our support team is here to help. Get answers from real humans who understand trading.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold text-lg mb-2">📧 Email Support</h3>
              <p className="text-slate-300 text-sm mb-4">
                Get detailed answers to complex questions. Response within 12-48 hours.
              </p>
              <a 
                href="mailto:trust@clickshift.io"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold transition-all inline-block"
              >
                Send Email
              </a>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold text-lg mb-2">💬 Live Chat</h3>
              <p className="text-slate-300 text-sm mb-4">
                Connect with our community and get instant help from fellow traders.
              </p>
              <a 
                href="https://t.me/ClickShiftAlerts"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold transition-all inline-block"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;