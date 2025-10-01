"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Search,
  Target,
  Zap,
  Shield,
  Star,
  BookOpen,
  AlertTriangle
} from 'lucide-react';

// Blog posts data
const blogPosts = [
  {
    slug: 'how-to-avoid-liquidation-futures',
    title: 'How I Saved My Portfolio From Liquidation Using ClickShift Leverage',
    excerpt: 'After losing $12,000 to a single liquidation, I discovered a tool that changed everything. Here\'s how ClickShift\'s patent-pending algorithms helped me achieve 23 consecutive profitable futures trades.',
    category: 'Futures Trading',
    readTime: '8 min read',
    date: 'January 15, 2025',
    featured: true,
    author: 'Emmanuel Ohanwe',
    views: '12.4K',
    icon: <Shield className="h-6 w-6" />,
    gradient: 'from-orange-500 to-red-600',
    tags: ['Futures', 'Risk Management', 'Liquidation', 'Trading Strategy']
  },
  {
    slug: 'whale-tracking-guide-2025',
    title: 'The Whale Tracking Strategy That Predicted a 847% Pump',
    excerpt: 'When whales move, markets follow. Learn the exact signals that helped 525+ traders spot POPCAT at $80K market cap - 4 minutes before the pump that turned $1,000 into $8,470.',
    category: 'Trading Intelligence',
    readTime: '12 min read',
    date: 'January 12, 2025',
    featured: true,
    author: 'ClickShift Research Team',
    views: '18.2K',
    icon: <Target className="h-6 w-6" />,
    gradient: 'from-blue-500 to-purple-600',
    tags: ['Whale Tracking', 'Alpha', 'Market Analysis', 'DeFi']
  },
  {
    slug: 'best-defi-trading-tools',
    title: 'I Tested 27 DeFi Trading Tools. Only 3 Are Worth Your Money.',
    excerpt: 'Most trading tools show you what already happened. After spending $3,400 and 6 months testing every major platform, here\'s what actually works - and the one tool that beats them all.',
    category: 'Tool Reviews',
    readTime: '15 min read',
    date: 'January 10, 2025',
    featured: false,
    author: 'Sarah Chen, Professional Trader',
    views: '9.8K',
    icon: <Zap className="h-6 w-6" />,
    gradient: 'from-green-500 to-teal-600',
    tags: ['Tool Comparison', 'DeFi', 'Trading Platforms', 'Reviews']
  },
  {
    slug: 'rsi-signals-crypto-trading',
    title: 'The RSI Secret That Gave Me 76% Win Rate (Not What You Think)',
    excerpt: 'Everyone uses RSI wrong. After 1,000+ trades using ClickShift\'s AI-enhanced RSI system, I discovered why traditional RSI fails - and the simple modification that tripled my accuracy.',
    category: 'Technical Analysis',
    readTime: '10 min read',
    date: 'January 8, 2025',
    featured: false,
    author: 'Marcus Rodriguez',
    views: '15.7K',
    icon: <TrendingUp className="h-6 w-6" />,
    gradient: 'from-purple-500 to-pink-600',
    tags: ['RSI', 'Technical Analysis', 'Trading Signals', 'Strategy']
  },
  {
    slug: 'solana-meme-coins-intelligence',
    title: 'How AI Caught the Next 100x Solana Meme Coin in 15 Minutes',
    excerpt: 'The Solana meme coin market moves at lightspeed. Learn how ClickShift Alpha\'s exit cluster detection and legitimacy scoring helped traders capture BONK, WIF, and POPCAT before they exploded.',
    category: 'Solana Trading',
    readTime: '11 min read',
    date: 'January 5, 2025',
    featured: true,
    author: 'ClickShift Research Team',
    views: '21.3K',
    icon: <Star className="h-6 w-6" />,
    gradient: 'from-cyan-500 to-blue-600',
    tags: ['Solana', 'Meme Coins', 'Alpha', 'Early Detection']
  },
  {
  slug: 'analyzed-1000-solana-launches',
  title: 'I Analyzed 1,000 Solana Launches. Here\'s What Winners Have in Common',
  excerpt: '4 months analyzing every Solana launch. 1,000 tokens. 47 went 100x+. Here are the exact patterns that separated winners from rugs.',
  category: 'Market Research',
  readTime: '13 min read',
  date: 'February 8, 2025',
  featured: true,
  author: 'ClickShift Research',
  views: '11.8K',
  icon: <Star className="h-6 w-6" />,
  gradient: 'from-cyan-500 to-blue-600',
  tags: ['Solana', 'Research', 'Data Analysis', 'Token Launches']
},
{
  slug: 'futures-mistake-cost-47k',
  title: 'The Futures Trading Mistake That Cost Me $47K (And How to Avoid It)',
  excerpt: 'I watched $47,000 disappear in 8 minutes. Not from a bad trade—from a mistake I didn\'t even know I was making. This is that story.',
  category: 'Risk Management',
  readTime: '10 min read',
  date: 'February 12, 2025',
  featured: false,
  author: 'Marcus L.',
  views: '16.9K',
  icon: <AlertTriangle className="h-6 w-6" />,
  gradient: 'from-red-500 to-orange-600',
  tags: ['Futures Trading', 'Risk Management', 'Loss Prevention']
},
{
  slug: 'how-to-read-crypto-whales',
  title: 'How to Read Crypto Whales: Complete Guide to Understanding Smart Money',
  excerpt: 'Whale wallets move markets. Learning to read their behavior is like having insider information—except it\'s legal and publicly available. Complete tutorial.',
  category: 'Education',
  readTime: '14 min read',
  date: 'February 15, 2025',
  featured: true,
  author: 'ClickShift Research',
  views: '19.3K',
  icon: <Target className="h-6 w-6" />,
  gradient: 'from-indigo-500 to-purple-600',
  tags: ['Whale Tracking', 'Education', 'Smart Money', 'Tutorial']
},
{
  slug: 'top-defi-mistakes-beginners',
  title: 'Top 10 DeFi Mistakes Beginners Make (And How to Fix Them)',
  excerpt: 'I\'ve taught 500+ people DeFi trading. Everyone makes the same 10 mistakes. Here\'s how to avoid them and keep your money.',
  category: 'Beginner Guide',
  readTime: '12 min read',
  date: 'February 18, 2025',
  featured: false,
  author: 'Sarah Chen',
  views: '22.1K',
  icon: <Shield className="h-6 w-6" />,
  gradient: 'from-pink-500 to-rose-600',
  tags: ['Beginner Guide', 'DeFi', 'Common Mistakes', 'Education']
},
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Futures Trading', 'Trading Intelligence', 'Technical Analysis', 'Solana Trading', 'Tool Reviews'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Trading Intelligence
              <br />
              Insights & Strategies
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Real stories, proven strategies, and actionable intelligence from 525+ traders 
              who've mastered DeFi markets with ClickShift.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, strategies, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <h2 className="text-2xl md:text-3xl font-bold">Featured Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all overflow-hidden transform hover:scale-[1.02]"
              >
                <div className={`h-2 bg-gradient-to-r ${post.gradient}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className={`p-2 bg-gradient-to-r ${post.gradient} rounded-lg`}>
                      {post.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                      <span>{post.views} views</span>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold">All Articles</h2>
            <span className="text-slate-400">({filteredPosts.length})</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-slate-800/30 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className={`md:w-2 bg-gradient-to-b ${post.gradient}`}></div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 bg-gradient-to-r ${post.gradient} rounded-lg`}>
                            {post.icon}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-blue-300">
                              {post.category}
                            </span>
                            <div className="text-xs text-slate-500">{post.date}</div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="text-slate-400">{post.views} views</div>
                        <div className="text-slate-500">By {post.author}</div>
                        
                        <div className="ml-auto flex items-center space-x-2 text-blue-400 group-hover:text-blue-300">
                          <span className="font-semibold">Read More</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get Trading Intelligence Delivered Weekly
          </h2>
          <p className="text-slate-300 mb-8">
            Join 2,100+ traders receiving exclusive strategies, market insights, and early access to new features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
              Subscribe Free
            </button>
          </div>
          
          <p className="text-xs text-slate-500 mt-4">
            No spam. Unsubscribe anytime. Read by professional traders at Binance, Coinbase, and Jump Trading.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;