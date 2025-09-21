"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Target,
  Brain,
  Globe,
  Heart,
  Award,
  ArrowRight,
  Star,
  Quote,
  TrendingUp,
} from "lucide-react";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [currentMetric, setCurrentMetric] = useState(0);

  const metrics = [
    { number: "525+", label: "Daily Active Traders", color: "text-blue-400" },
    { number: "73.2%", label: "Prediction Accuracy", color: "text-green-400" },
    { number: "91", label: "NPS Score", color: "text-purple-400" },
    { number: "47", label: "Countries Served", color: "text-orange-400" },
    { number: "$2.4M", label: "Losses Prevented", color: "text-pink-400" },
    { number: "76%", label: "Day-7 Retention", color: "text-cyan-400" },
  ];

  const founderStory = {
    image: "🧑‍💻",
    quote:
      "I lost 9 months of my salary trading crypto because tools like ClickShift didn't exist. I was making decisions based on hope, not intelligence.",
    details:
      "That devastating loss in 2023 became my mission. I realized that 95% of traders lose money not because opportunities don't exist, but because they lack the intelligence tools that institutions use. ClickShift was born from personal pain and the determination to democratize trading intelligence.",
  };

  const teamValues = [
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Protection First",
      description:
        "We believe in shielding traders from costly mistakes before focusing on profits. Safety is the foundation of sustainable trading.",
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      title: "Intelligence Over Intuition",
      description:
        "Data-driven decisions beat emotional trading every time. We build AI that thinks faster and more accurately than human emotions.",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-400" />,
      title: "Global Accessibility",
      description:
        "From Lagos to London, from students to institutions - intelligent trading should be accessible to everyone, everywhere.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-400" />,
      title: "Community First",
      description:
        "We grow together. Every trader's success makes our platform smarter and our community stronger.",
    },
  ];

  const milestones = [
    { year: "2023", title: "The Genesis", description: "Founder loses life savings to DeFi trading. Realizes the need for predictive intelligence.", status: "completed" },
    { year: "Early 2024", title: "Alpha Development", description: "First MVP of ClickShift Alpha. Initial algorithms for whale tracking and exit prediction.", status: "completed" },
    { year: "Mid 2024", title: "Leverage Launch", description: "ClickShift Leverage goes live. Patent-pending MACD+OBV fusion algorithm.", status: "completed" },
    { year: "Late 2024", title: "Explosive Growth", description: "525+ daily users. 91 NPS score. $0 customer acquisition cost.", status: "completed" },
    { year: "Q1 2025", title: "Launch Detector", description: "Real-time token launch detection with legitimacy scoring.", status: "progress" },
    { year: "Q2 2025", title: "ClickBot Auto-Trade", description: "Intelligent auto-trading with trailing stops and risk management.", status: "upcoming" },
    { year: "Q3 2025", title: "Global Expansion", description: "Multi-chain support. Institutional partnerships. Series A funding.", status: "upcoming" },
  ];

  const achievements = [
    { icon: "🏆", title: "World's First Predictive DeFi Intelligence", desc: "Patent-pending exit cluster detection" },
    { icon: "🚀", title: "Fastest Growing DeFi Tool", desc: "22% WoW growth, purely organic" },
    { icon: "🎯", title: "Industry-Leading Accuracy", desc: "73%+ prediction accuracy vs 45% industry average" },
    { icon: "🌍", title: "Global Reach", desc: "Trusted in 47+ countries worldwide" },
    { icon: "💎", title: "Best-in-Class Retention", desc: "76% Day-7 retention vs 23% industry" },
    { icon: "🛡️", title: "Zero Security Incidents", desc: "Enterprise-grade security from day one" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [metrics.length]);

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
            <Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link>
            <Link href="/community" className="hover:text-blue-400 transition-colors">Community</Link>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Launch App
            </button>
          </div>
        </div>
      </nav>

        {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Building the Bloomberg Terminal
              <br />
              of Web3
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              ClickShift exists to make Web3 trading <strong>smarter, safer, and simpler</strong>. 
              Most traders lose money not because opportunities don't exist — but because of bad timing, 
              blind risks, and overwhelming complexity. We're here to change that.
            </p>
          </div>

          {/* Rotating Metrics */}
          <div className="mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 max-w-md mx-auto">
              <div className={`text-4xl font-bold mb-2 transition-all duration-500 ${metrics[currentMetric].color}`}>
                {metrics[currentMetric].number}
              </div>
              <div className="text-slate-300">{metrics[currentMetric].label}</div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className={`bg-slate-800/30 rounded-lg p-4 border transition-all duration-300 ${
                  index === currentMetric ? 'border-blue-500 scale-105' : 'border-slate-700'
                }`}
              >
                <div className={`text-xl font-bold ${metric.color}`}>{metric.number}</div>
                <div className="text-xs text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4 border-y border-slate-700">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'mission', label: '🚀 Our Mission', icon: <Target className="h-4 w-4" /> },
              { id: 'story', label: '👨‍💻 Founder Story', icon: <Heart className="h-4 w-4" /> },
              { id: 'values', label: '💎 Our Values', icon: <Award className="h-4 w-4" /> },
              { id: 'journey', label: '📈 The Journey', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'achievements', label: '🏆 Achievements', icon: <Star className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">🚀 Our Mission</h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
                  With ClickShift, you don't just trade — you trade with <strong>intelligence</strong>.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
                    <h3 className="text-2xl font-bold mb-6">🧠 What We Do</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      We build the <strong>world's first intelligent terminal for DeFi</strong>. Our platform combines 
                      cutting-edge AI with real-time market data to provide traders with unprecedented insights.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">🔮</div>
                        <div>
                          <h4 className="font-semibold mb-1">Alpha Intelligence</h4>
                          <p className="text-sm text-slate-400">Predictive signals that spot whale moves, exit clusters, and pump probabilities before they happen.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">⚡</div>
                        <div>
                          <h4 className="font-semibold mb-1">Leverage Mastery</h4>
                          <p className="text-sm text-slate-400">Risk-aware futures insights that map liquidation zones and recommend safe position sizes.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">📊</div>
                        <div>
                          <h4 className="font-semibold mb-1">Launch Detection</h4>
                          <p className="text-sm text-slate-400">Catch high-potential tokens within minutes of going live with legitimacy scoring.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
                    <h4 className="font-bold mb-3">🌍 Why It Matters</h4>
                    <p className="text-sm text-slate-300">
                      DeFi should not be gambling. For too long, traders have been exposed to scams, rug pulls, and market traps. 
                      ClickShift bridges that gap with AI-powered analytics and real-time intelligence.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="font-bold mb-3">💡 Our Beliefs</h4>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>• Your <strong>ignorance shouldn't cost you</strong></li>
                      <li>• Safety is the first layer of trading success</li>
                      <li>• Collective intelligence makes every trader stronger</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Founder Story Tab */}
          {activeTab === 'story' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">👨‍💻 The Founder's Journey</h2>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="text-6xl">{founderStory.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start space-x-3 mb-6">
                        <Quote className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-lg text-slate-300 italic">
                          "{founderStory.quote}"
                        </p>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {founderStory.details}
                      </p>
                      <div className="mt-6">
                        <div className="text-sm text-slate-400">Emmanuel. O</div>
                        <div className="text-xs text-slate-500">Founder & Senior PM, ClickShift</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-3xl mb-3">💡</div>
                    <h4 className="font-bold mb-2">The Problem</h4>
                    <p className="text-sm text-slate-400">95% of crypto traders lose money due to lack of intelligent tools</p>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-3xl mb-3">🔬</div>
                    <h4 className="font-bold mb-2">The Research</h4>
                    <p className="text-sm text-slate-400">Months of studying whale patterns, exit clusters, and market psychology</p>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-3xl mb-3">🚀</div>
                    <h4 className="font-bold mb-2">The Solution</h4>
                    <p className="text-sm text-slate-400">AI-powered predictive intelligence accessible to everyone</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">💎 Our Core Values</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  These principles guide every decision we make and every line of code we write.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {teamValues.map((value, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2">
                    <div className="flex items-center space-x-4 mb-4">
                      {value.icon}
                      <h3 className="text-xl font-bold">{value.title}</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 text-center">
                <h3 className="text-2xl font-bold mb-4">👥 Our Community Promise</h3>
                <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  We are more than a platform — we are a movement. Over 1,200+ traders worldwide are already 
                  shaping the next era of DeFi trading with us. From New York to Lagos, London to Dubai, 
                  we're proving that <strong>intelligence wins over speculation</strong>.
                </p>
                <div className="mt-6">
                  <button onClick={() => window.open('https://t.me/ClickShiftAlerts', '_blank')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                    Join Our Community →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Journey Tab */}
          {activeTab === 'journey' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">📈 Our Journey</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  From personal loss to global platform - the ClickShift evolution
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                          <div className="text-blue-400 font-bold text-sm mb-2">{milestone.year}</div>
                          <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                          <p className="text-slate-300 text-sm">{milestone.description}</p>
                          <div className={`inline-block px-2 py-1 rounded text-xs mt-3 ${
                            milestone.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            milestone.status === 'progress' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {milestone.status === 'completed' ? '✅ Completed' :
                             milestone.status === 'progress' ? '🚧 In Progress' :
                             '🔮 Upcoming'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className={`w-4 h-4 rounded-full border-4 ${
                          milestone.status === 'completed' ? 'bg-green-500 border-green-400' :
                          milestone.status === 'progress' ? 'bg-yellow-500 border-yellow-400' :
                          'bg-blue-500 border-blue-400'
                        }`}></div>
                      </div>
                      
                      <div className="w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">🏆 Our Achievements</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Recognition and milestones that validate our mission
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-gold-500/50 transition-all transform hover:scale-105">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-slate-400 text-sm">{achievement.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-gold-500/10 to-yellow-500/10 rounded-2xl p-8 border border-gold-500/20 text-center">
                <h3 className="text-2xl font-bold mb-4">🎯 What's Next?</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  We're just getting started. Our vision is to become the Bloomberg Terminal of Web3 — 
                  the essential tool that every serious trader relies on for market intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                    Join Our Mission →
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all">
                    Read Our Roadmap
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to Trade with Intelligence?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join 525+ traders who've discovered the power of predictive DeFi intelligence. 
            Where profit meets protection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/alpha"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>🔮 Try Alpha Intelligence</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/leverage"
              className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>⚡ Try Leverage Mastery</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold mb-6">📬 Get in Touch</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Business Inquiries</h4>
              <p className="text-slate-300">trust@clickshift.io</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <p className="text-slate-300">clickndshift@gmail.com</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
            <a href="https://t.me/ClickShiftAlerts" className="text-slate-400 hover:text-white transition-colors">Telegram</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Medium</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;