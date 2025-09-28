"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { 
  Shield, 
  Rocket, 
  Target, 
  Globe,
  Brain,
  Users,
  Crown,
  Building2,
  CheckCircle,
  DollarSign,
  Code
} from 'lucide-react';

const RoadmapPage = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('current');
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimationComplete(true), 500);
  }, []);

  const roadmapPhases: Phase[] = [
    {
      id: 'current',
      phase: 'Current State',
      period: 'Q2 2025 - Q3 2025',
      status: 'completed',
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'green',
      achievements: [
        { 
          title: 'ClickShift Alpha MVP', 
          description: 'World\'s first predictive Solana token intelligence',
          metrics: ['525+ Daily Active Users', '73% Prediction Accuracy', '91 NPS Score'],
          status: 'completed'
        },
        { 
          title: 'ClickShift Leverage Platform', 
          description: 'Advanced futures trading risk management',
          metrics: ['Patent-pending MACD+OBV fusion', 'Real-time liquidation calculator', 'Multi-exchange validation'],
          status: 'completed'
        },
        { 
          title: 'Explosive User Growth', 
          description: 'Organic growth with zero customer acquisition cost',
          metrics: ['22% WoW growth', '$0 CAC', '76% Day-7 retention'],
          status: 'completed'
        },
        { 
          title: 'Product-Market Fit Validation', 
          description: 'Proven demand across 47+ countries',
          metrics: ['$2.4M losses prevented', '1,200+ community members', 'Global user base'],
          status: 'completed'
        }
      ]
    },
    {
      id: 'q2-2025',
      phase: 'Intelligence Expansion',
      period: 'Q2 2026',
      status: 'in-progress',
      icon: <Brain className="h-8 w-8" />,
      color: 'blue',
      achievements: [
        { 
          title: 'Launch Detector Pro', 
          description: 'AI-powered early detection of high-potential token launches',
          metrics: ['15-minute launch alerts', '7+ data source validation', 'Legitimacy scoring'],
          status: 'in-progress'
        },
        { 
          title: 'ClickBot Auto-Trading', 
          description: 'Intelligent automation with trailing stops and risk management',
          metrics: ['Smart position scaling', 'Automatic whale dump exits', '24/7 monitoring'],
          status: 'planned'
        },
        { 
          title: 'Premium Monetization Launch', 
          description: 'Freemium model with advanced intelligence features',
          metrics: ['$79/mo Professional tier', 'API access integration', 'Advanced analytics'],
          status: 'in-progress'
        },
        { 
          title: 'Mobile App Beta', 
          description: 'Native iOS and Android apps with push notifications',
          metrics: ['Real-time alerts', 'Offline analysis', 'Biometric security'],
          status: 'planned'
        }
      ]
    },
    {
      id: 'q3-2025',
      phase: 'Multi-Chain Dominance',
      period: 'Q3 2026',
      status: 'planned',
      icon: <Globe className="h-8 w-8" />,
      color: 'purple',
      achievements: [
        { 
          title: 'Ethereum Integration', 
          description: 'Expand intelligence platform to Ethereum ecosystem',
          metrics: ['ERC-20 token analysis', 'DeFi protocol monitoring', 'MEV detection'],
          status: 'planned'
        },
        { 
          title: 'Base & BSC Support', 
          description: 'Complete Layer 2 and alternative chain coverage',
          metrics: ['Cross-chain arbitrage detection', 'Multi-chain portfolio tracking', 'Unified intelligence'],
          status: 'planned'
        },
        { 
          title: 'Institutional API Suite', 
          description: 'Enterprise-grade APIs for institutional adoption',
          metrics: ['White-label solutions', 'Custom SLA agreements', 'Dedicated infrastructure'],
          status: 'planned'
        },
        { 
          title: 'AI Model Enhancement', 
          description: 'Next-generation prediction algorithms',
          metrics: ['85%+ accuracy target', 'Pattern recognition upgrade', 'Sentiment analysis integration'],
          status: 'planned'
        }
      ]
    },
    {
      id: 'q4-2025',
      phase: 'Global Scale',
      period: 'Q4 2026',
      status: 'planned',
      icon: <Rocket className="h-8 w-8" />,
      color: 'orange',
      achievements: [
        { 
          title: 'Series A Funding Round', 
          description: 'Raise $8M to accelerate global expansion',
          metrics: ['$40M pre-money valuation', 'Tier 1 VC partnerships', 'International scaling'],
          status: 'planned'
        },
        { 
          title: 'European Market Entry', 
          description: 'Full localization and regulatory compliance for EU',
          metrics: ['GDPR compliance', 'Multi-language support', 'Local partnerships'],
          status: 'planned'
        },
        { 
          title: 'ClickShift Academy Launch', 
          description: 'Educational platform with certification programs',
          metrics: ['Trading courses', 'Expert certifications', 'Community education'],
          status: 'planned'
        },
        { 
          title: 'Advanced Portfolio Intelligence', 
          description: 'Comprehensive portfolio management with AI insights',
          metrics: ['Risk-adjusted returns', 'Automated rebalancing', 'Tax optimization'],
          status: 'planned'
        }
      ]
    },
    {
      id: '2026',
      phase: 'Market Leadership',
      period: '2027',
      status: 'vision',
      icon: <Crown className="h-8 w-8" />,
      color: 'gold',
      achievements: [
        { 
          title: 'Bloomberg Terminal Parity', 
          description: 'Feature-complete institutional-grade platform',
          metrics: ['Real-time news integration', 'Advanced charting', 'Institutional workflows'],
          status: 'vision'
        },
        { 
          title: 'Regulatory Partnerships', 
          description: 'Work with regulators to shape DeFi compliance standards',
          metrics: ['Regulatory sandboxes', 'Policy consultation', 'Compliance frameworks'],
          status: 'vision'
        },
        { 
          title: 'IPO Preparation', 
          description: 'Position for potential public listing',
          metrics: ['$100M+ ARR', 'SOX compliance', 'Public company readiness'],
          status: 'vision'
        },
        { 
          title: 'Global Market Expansion', 
          description: 'Presence in all major financial markets worldwide',
          metrics: ['Asia-Pacific expansion', 'LATAM presence', 'African markets'],
          status: 'vision'
        }
      ]
    }
  ];

  const milestones: Milestone[] = [
    { date: '2025 Q2', title: 'Product-Market Fit Achieved', status: 'completed' },
    { date: '2026 Q1', title: 'Launch Detector Beta', status: 'in-progress' },
    { date: '2026 Q2', title: 'Premium Monetization', status: 'planned' },
    { date: '2026 Q3', title: 'Multi-Chain Expansion', status: 'planned' },
    { date: '2026 Q4', title: 'Series A Funding', status: 'planned' },
    { date: '2027 Q4', title: 'Global Market Leader', status: 'vision' }
  ];

  const metrics = [
    { 
      current: '525+', 
      q2Target: '2,500+', 
      yearTarget: '25,000+', 
      label: 'Daily Active Users',
      icon: <Users className="h-5 w-5" />
    },
    { 
      current: '73%', 
      q2Target: '78%', 
      yearTarget: '85%+', 
      label: 'Prediction Accuracy',
      icon: <Target className="h-5 w-5" />
    },
    { 
      current: '$0', 
      q2Target: '$50K', 
      yearTarget: '$2M+', 
      label: 'Monthly Revenue',
      icon: <DollarSign className="h-5 w-5" />
    },
    { 
      current: '2', 
      q2Target: '5', 
      yearTarget: '10+', 
      label: 'Supported Chains',
      icon: <Globe className="h-5 w-5" />
    }
  ];

 type Status = 'completed' | 'in-progress' | 'planned' | 'vision';

interface Achievement {
  title: string;
  description: string;
  metrics: string[];
  status: Status;
}

interface Phase {
  id: string;
  phase: string;
  period: string;
  status: Status;
  icon: React.ReactNode;
  color: string;
  achievements: Achievement[];
}

interface Milestone {
  date: string;
  title: string;
  status: Status;
}


  const getStatusColor = (status:Status): string => {
    switch(status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'planned': return 'text-purple-400';
      case 'vision': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusBg = (status:Status): string => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 border-blue-500/30';
      case 'planned': return 'bg-purple-500/20 border-purple-500/30';
      case 'vision': return 'bg-yellow-500/20 border-yellow-500/30';
      default: return 'bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              The Future of
              <br />
              Intelligent Trading
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Our journey from 525 daily users to becoming the Bloomberg Terminal of Web3. 
              Here's how we're building the intelligence infrastructure for the next generation of finance.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 mb-12">
            <h2 className="text-2xl font-bold mb-4">🎯 Our North Star</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              "To democratize institutional-grade trading intelligence, making sophisticated market analysis 
              accessible to everyone from retail traders in Nairobi to hedge funds in NewYork."
            </p>
          </div>

          {/* Key Metrics Progress */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 transform hover:scale-105 transition-all">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {metric.icon}
                  <span className="text-lg font-bold text-blue-400">{metric.current}</span>
                </div>
                <div className="text-sm text-slate-400 mb-2">{metric.label}</div>
                <div className="text-xs text-green-400">Target: {metric.yearTarget}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Navigation */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {roadmapPhases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedQuarter(phase.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  selectedQuarter === phase.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <div className={getStatusColor(phase.status)}>{phase.icon}</div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{phase.phase}</div>
                  <div className="text-xs opacity-75">{phase.period}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Timeline Visualization */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className={`${getStatusBg(milestone.status)} rounded-lg p-4 border`}>
                      <div className="font-bold">{milestone.title}</div>
                      <div className="text-sm text-slate-400">{milestone.date}</div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-4 h-4 rounded-full border-4 ${
                      milestone.status === 'completed' ? 'bg-green-500 border-green-400' :
                      milestone.status === 'in-progress' ? 'bg-blue-500 border-blue-400' :
                      milestone.status === 'planned' ? 'bg-purple-500 border-purple-400' :
                      'bg-yellow-500 border-yellow-400'
                    }`}></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Phase View */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {roadmapPhases.map((phase) => (
            selectedQuarter === phase.id && (
              <div key={phase.id} className={`${animationComplete ? 'animate-fade-in' : 'opacity-0'} transition-all duration-500`}>
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center space-x-3 ${getStatusBg(phase.status)} rounded-xl px-6 py-3 border mb-4`}>
                    <div className={getStatusColor(phase.status)}>{phase.icon}</div>
                    <h2 className="text-3xl font-bold">{phase.phase}</h2>
                  </div>
                  <p className="text-xl text-slate-300">{phase.period}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {phase.achievements.map((achievement, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">{achievement.title}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          achievement.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          achievement.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          achievement.status === 'planned' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {achievement.status === 'completed' ? '✅ Done' :
                           achievement.status === 'in-progress' ? '🚧 Building' :
                           achievement.status === 'planned' ? '📋 Planned' :
                           '🔮 Vision'}
                        </div>
                      </div>
                      
                      <p className="text-slate-300 mb-4">{achievement.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-blue-400">Key Metrics & Features:</h4>
                        <ul className="space-y-1">
                          {achievement.metrics.map((metric, metricIndex) => (
                            <li key={metricIndex} className="flex items-center space-x-2 text-sm text-slate-300">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Investment & Growth Projections */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">📊 Growth Projections</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Revenue Growth */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-green-400" />
                <span>Revenue Growth</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>2026 Q2</span>
                  <span className="font-bold text-green-400">$50K MRR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>2026 Q4</span>
                  <span className="font-bold text-green-400">$200K MRR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>2027 EOY</span>
                  <span className="font-bold text-green-400">$1M+ MRR</span>
                </div>
              </div>
            </div>

            {/* User Growth */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-400" />
                <span>User Growth</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current</span>
                  <span className="font-bold text-blue-400">525 DAU</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>2026 Q4</span>
                  <span className="font-bold text-blue-400">25K DAU</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>2027 EOY</span>
                  <span className="font-bold text-blue-400">100K+ DAU</span>
                </div>
              </div>
            </div>

            {/* Market Expansion */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Globe className="h-6 w-6 text-purple-400" />
                <span>Market Expansion</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Solana</span>
                  <span className="font-bold text-purple-400">✅ Live</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ethereum</span>
                  <span className="font-bold text-purple-400">Q3 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Multi-Chain</span>
                  <span className="font-bold text-purple-400">Q4 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            We're building the future of intelligent trading. Whether you're an investor, 
            developer, or trader, there's a place for you in our journey.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
              <Building2 className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Investors</h3>
              <p className="text-slate-300 text-sm mb-4">
                Join our Series A round and help scale the Bloomberg Terminal of Web3
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold transition-all">
                Investor Deck
              </button>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all">
              <Code className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Developers</h3>
              <p className="text-slate-300 text-sm mb-4">
                Build the intelligence infrastructure that powers the future of finance
              </p>
              <Link href="/careers" className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-sm font-semibold transition-all inline-block">
                View Careers
              </Link>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-all">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-slate-300 text-sm mb-4">
                Shape our roadmap and get early access to new features
              </p>
              <a href="https://t.me/ClickShiftAlerts" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold transition-all inline-block">
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">ClickShift</span>
          </div>
          <p className="text-slate-400 mb-4">Building DeFi's Intelligence Infrastructure</p>
          <div className="text-sm text-slate-500">
            Last Updated: January 22, 2025 | This roadmap represents our current plans and may be subject to change based on market conditions and user feedback.
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage;