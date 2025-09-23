"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { 
  Shield, 
  Rocket, 
  Brain, 
  Users,
  Globe,
  Code,
  Target,
  Heart,
  TrendingUp,
  Zap,
  Award,
  MapPin,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Coffee,
  Laptop,
  Plane,
  GraduationCap
} from 'lucide-react';

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const departments = [
    { id: 'all', name: 'All Positions', count: 8, icon: <Users className="h-4 w-4" /> },
    { id: 'engineering', name: 'Engineering', count: 4, icon: <Code className="h-4 w-4" /> },
    { id: 'ai-ml', name: 'AI & Machine Learning', count: 2, icon: <Brain className="h-4 w-4" /> },
    { id: 'product', name: 'Product', count: 1, icon: <Target className="h-4 w-4" /> },
    { id: 'growth', name: 'Growth & Marketing', count: 1, icon: <TrendingUp className="h-4 w-4" /> }
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-400" />,
      title: 'Competitive Equity',
      description: 'Meaningful equity packages with high upside potential as we scale from 525 users to millions'
    },
    {
      icon: <Laptop className="h-8 w-8 text-blue-400" />,
      title: 'Remote-First Culture',
      description: '$3,000 home office setup budget and flexible work-from-anywhere policy'
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-purple-400" />,
      title: 'Learning & Development',
      description: '$5,000 annual learning budget for courses, conferences, and certifications'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-400" />,
      title: 'Comprehensive Healthcare',
      description: 'Top-tier health, dental, and vision insurance with 100% premium coverage'
    },
    {
      icon: <Plane className="h-8 w-8 text-orange-400" />,
      title: 'Unlimited PTO',
      description: 'Take the time you need to recharge. We trust you to manage your own schedule'
    },
    {
      icon: <Coffee className="h-8 w-8 text-yellow-400" />,
      title: 'Team Gatherings',
      description: 'Quarterly team offsites and annual company retreats in amazing locations'
    }
  ];

  const positions = [
    {
      id: 'senior-fullstack',
      department: 'engineering',
      title: 'Senior Full-Stack Engineer',
      type: 'Full-time',
      location: 'Remote (US/EU)',
      salary: '$140K - $180K + equity',
      experience: '5+ years',
      featured: true,
      description: 'Build the intelligent trading platform that processes millions of analyses daily. Work on both our React frontends and Node.js/Python backends.',
      requirements: [
        'Expert in React, TypeScript, and modern JavaScript',
        'Strong backend experience with Node.js or Python',
        'Experience with real-time systems and WebSocket connections',
        'Knowledge of financial markets or trading platforms preferred',
        'Database design experience (PostgreSQL, Redis)',
        'AWS/Vercel deployment and scaling experience'
      ],
      responsibilities: [
        'Design and implement new features for our trading intelligence platform',
        'Optimize performance for real-time data processing and analysis',
        'Collaborate with AI team to integrate machine learning models',
        'Build robust APIs that serve millions of requests daily',
        'Mentor junior engineers and lead technical decisions'
      ]
    },
    {
      id: 'blockchain-engineer',
      department: 'engineering',
      title: 'Blockchain Engineer',
      type: 'Full-time',
      location: 'Remote (Global)',
      salary: '$130K - $170K + equity',
      experience: '4+ years',
      featured: true,
      description: 'Expand our intelligence platform across multiple blockchains. Build the infrastructure that analyzes Ethereum, Solana, and other DeFi ecosystems.',
      requirements: [
        'Deep understanding of blockchain technology and DeFi protocols',
        'Experience with Ethereum, Solana, or other major blockchains',
        'Proficiency in Solidity, Rust, or similar blockchain languages',
        'Web3 integration experience (wagmi, ethers.js, @solana/web3.js)',
        'Smart contract security and audit experience',
        'Understanding of DEX protocols and liquidity mechanics'
      ],
      responsibilities: [
        'Build cross-chain analysis capabilities for multiple blockchains',
        'Integrate with DEX protocols and smart contracts',
        'Develop real-time blockchain data processing pipelines',
        'Implement security best practices for Web3 integrations',
        'Research and integrate new DeFi protocols and tokens'
      ]
    },
    {
      id: 'ai-engineer',
      department: 'ai-ml',
      title: 'AI/ML Engineer',
      type: 'Full-time',
      location: 'Remote (US/EU)',
      salary: '$150K - $190K + equity',
      experience: '4+ years',
      featured: true,
      description: 'Enhance our prediction algorithms that achieve 73%+ accuracy. Build the next generation of AI models for financial market analysis.',
      requirements: [
        'PhD or Masters in ML, Computer Science, or related field',
        'Experience with TensorFlow, PyTorch, or similar ML frameworks',
        'Strong background in time series analysis and prediction',
        'Knowledge of financial markets and trading strategies',
        'Experience with real-time ML model deployment',
        'Python expertise with data science libraries (pandas, numpy, scikit-learn)'
      ],
      responsibilities: [
        'Improve prediction accuracy from 73% to 85%+',
        'Develop new models for pattern recognition and sentiment analysis',
        'Build real-time ML inference pipelines',
        'Research state-of-the-art techniques in financial ML',
        'Collaborate with engineering team on model deployment'
      ]
    },
    {
      id: 'data-scientist',
      department: 'ai-ml',
      title: 'Senior Data Scientist',
      type: 'Full-time',
      location: 'Remote (Global)',
      salary: '$120K - $160K + equity',
      experience: '4+ years',
      featured: false,
      description: 'Analyze massive datasets to uncover trading patterns and improve our intelligence platform. Turn data into actionable insights for millions of traders.',
      requirements: [
        'Advanced degree in Statistics, Mathematics, or Data Science',
        'Expert-level Python and SQL skills',
        'Experience with big data tools (Spark, Airflow, dbt)',
        'Strong statistical analysis and hypothesis testing skills',
        'Financial data analysis experience preferred',
        'Data visualization skills (Plotly, D3.js, Tableau)'
      ],
      responsibilities: [
        'Analyze trading patterns and market behavior across DeFi',
        'Design experiments to validate prediction model improvements',
        'Build dashboards and analytics for internal teams',
        'Research new data sources and integration opportunities',
        'Collaborate with AI team on feature engineering'
      ]
    },
    {
      id: 'frontend-engineer',
      department: 'engineering',
      title: 'Frontend Engineer',
      type: 'Full-time',
      location: 'Remote (Global)',
      salary: '$110K - $150K + equity',
      experience: '3+ years',
      featured: false,
      description: 'Create beautiful, intuitive interfaces for our trading intelligence platform. Build the UX that makes complex financial analysis accessible to everyone.',
      requirements: [
        'Expert React and TypeScript skills',
        'Strong CSS and modern styling frameworks (Tailwind)',
        'Experience with real-time data visualization',
        'Knowledge of financial charts and trading interfaces',
        'Mobile-first responsive design experience',
        'Performance optimization for data-heavy applications'
      ],
      responsibilities: [
        'Build responsive, beautiful interfaces for our platform',
        'Implement real-time data visualization and charts',
        'Optimize performance for mobile and desktop users',
        'Collaborate with design team on user experience',
        'Develop reusable component libraries'
      ]
    },
    {
      id: 'mobile-engineer',
      department: 'engineering',
      title: 'Mobile Engineer (React Native)',
      type: 'Full-time',
      location: 'Remote (US/EU)',
      salary: '$120K - $160K + equity',
      experience: '4+ years',
      featured: false,
      description: 'Build our mobile apps that will serve millions of traders. Create the best mobile trading intelligence experience in Web3.',
      requirements: [
        'Expert React Native development experience',
        'iOS and Android deployment and optimization',
        'Real-time data handling and push notifications',
        'Mobile security and authentication best practices',
        'App Store and Play Store publishing experience',
        'Performance optimization for resource-constrained devices'
      ],
      responsibilities: [
        'Build native iOS and Android apps from the ground up',
        'Implement real-time alerts and push notifications',
        'Optimize for performance and battery life',
        'Integrate with biometric authentication',
        'Collaborate with backend team on mobile-specific APIs'
      ]
    },
    {
      id: 'product-manager',
      department: 'product',
      title: 'Senior Product Manager',
      type: 'Full-time',
      location: 'Remote (US/EU)',
      salary: '$130K - $170K + equity',
      experience: '5+ years',
      featured: true,
      description: 'Drive product strategy for the future of intelligent trading. Own the roadmap that will serve millions of traders worldwide.',
      requirements: [
        '5+ years of product management experience',
        'Experience with fintech or trading platforms',
        'Strong analytical and data-driven decision making',
        'Understanding of user research and product discovery',
        'Experience with AI/ML product development',
        'Excellent communication and stakeholder management'
      ],
      responsibilities: [
        'Define product strategy and roadmap for intelligent trading features',
        'Conduct user research and validate product hypotheses',
        'Work closely with engineering and AI teams on feature development',
        'Analyze user behavior and optimize conversion funnels',
        'Lead go-to-market strategies for new features'
      ]
    },
    {
      id: 'growth-manager',
      department: 'growth',
      title: 'Growth Marketing Manager',
      type: 'Full-time',
      location: 'Remote (Global)',
      salary: '$90K - $130K + equity',
      experience: '3+ years',
      featured: false,
      description: 'Scale our growth from 525 to 25,000+ daily users. Build the marketing engine that makes ClickShift a household name in Web3.',
      requirements: [
        '3+ years of growth marketing experience',
        'Experience with B2B SaaS or fintech marketing',
        'Strong analytical skills and growth experimentation',
        'Content marketing and SEO expertise',
        'Social media and community building experience',
        'Understanding of cryptocurrency and DeFi markets'
      ],
      responsibilities: [
        'Develop and execute growth strategies to scale user acquisition',
        'Build content marketing and SEO programs',
        'Manage social media presence and community engagement',
        'Design and run growth experiments and A/B tests',
        'Collaborate with product team on conversion optimization'
      ]
    }
  ];

  const filteredPositions = selectedDepartment === 'all' 
    ? positions 
    : positions.filter(pos => pos.department === selectedDepartment);

  const companyValues = [
    {
      icon: <Brain className="h-8 w-8 text-blue-400" />,
      title: 'Intelligence First',
      description: 'We believe in data-driven decisions and continuous learning. Every feature we build makes traders smarter.'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: 'Protection Mindset',
      description: 'We protect traders from losses first, profits second. Safety and risk management are core to everything we do.'
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-400" />,
      title: 'Global Impact',
      description: 'From Lagos to London, we\'re democratizing access to institutional-grade trading intelligence worldwide.'
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-400" />,
      title: 'Move Fast, Stay Safe',
      description: 'We ship quickly but never compromise on security or user safety. Speed with responsibility.'
    }
  ];

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
            <Link href="/roadmap" className="hover:text-blue-400 transition-colors">Roadmap</Link>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Apply Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Join the Intelligence
              <br />
              Revolution
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Help us build the Bloomberg Terminal of Web3. We're scaling from 525 daily users to millions, 
              democratizing institutional-grade trading intelligence for traders worldwide.
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-blue-400">525+</div>
              <div className="text-sm text-slate-400">Daily Active Users</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-green-400">73%</div>
              <div className="text-sm text-slate-400">AI Accuracy</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-purple-400">91</div>
              <div className="text-sm text-slate-400">NPS Score</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-orange-400">47</div>
              <div className="text-sm text-slate-400">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ClickShift */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Build the Future with ClickShift?</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">🚀 Explosive Growth Opportunity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>22% week-over-week growth with $0 marketing spend</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Product-market fit proven across 47 countries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Patent-pending technology with significant moats</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>$28B+ market opportunity in trading intelligence</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">💡 Technical Innovation</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span>First-ever predictive exit cluster detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span>Real-time AI processing millions of data points</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span>Multi-chain expansion across Ethereum, Solana, BSC</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span>Cutting-edge ML models with continuous learning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2">
                <div className="mb-4">{value.icon}</div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-slate-300 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">🎁 Why You'll Love Working Here</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">🚀 Open Positions</h2>
          
          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  selectedDepartment === dept.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {dept.icon}
                <span>{dept.name}</span>
                <span className="bg-slate-600 px-2 py-1 rounded text-xs">{dept.count}</span>
              </button>
            ))}
          </div>

          {/* Position Cards */}
          <div className="space-y-6">
            {filteredPositions.map((position) => (
              <div key={position.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 mb-4 md:mb-0">
                      {position.featured && (
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          FEATURED
                        </span>
                      )}
                      <h3 className="text-xl font-bold">{position.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedRole(selectedRole === position.id ? null : position.id)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold transition-all flex items-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight className={`h-4 w-4 transition-transform ${selectedRole === position.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span>{position.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <DollarSign className="h-4 w-4 text-purple-400" />
                      <span>{position.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <Award className="h-4 w-4 text-orange-400" />
                      <span>{position.experience}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{position.description}</p>

                  {selectedRole === position.id && (
                    <div className="border-t border-slate-700 pt-6 mt-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold mb-3">Requirements:</h4>
                          <ul className="space-y-2">
                            {position.requirements.map((req, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold mb-3">Responsibilities:</h4>
                          <ul className="space-y-2">
                            {position.responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                                <Target className="h-4 w-4 text-blue-400 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 flex space-x-4">
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all">
                          Apply Now
                        </button>
                        <button className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all">
                          Share Role
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">📋 Our Hiring Process</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="font-bold mb-2">1. Application</h3>
              <p className="text-slate-300 text-sm">Submit your application with resume and cover letter. We review all applications within 48 hours.</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-bold mb-2">2. Phone Screen</h3>
              <p className="text-slate-300 text-sm">30-minute call with our team to discuss your background and interest in ClickShift.</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="font-bold mb-2">3. Technical Round</h3>
              <p className="text-slate-300 text-sm">Technical interview or take-home project relevant to the role you're applying for.</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold mb-2">4. Final Round</h3>
              <p className="text-slate-300 text-sm">Meet the team, discuss culture fit, and make sure we're the right match for each other.</p>
            </div>
          </div>

          <div className="mt-12 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="font-bold mb-4">⏱️ Timeline Commitment</h3>
            <p className="text-slate-300">
              We respect your time and complete our entire hiring process within 1-2 weeks. 
              You'll always know where you stand and what the next steps are.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join us in democratizing intelligent trading. Whether you're passionate about AI, 
            blockchain, or building beautiful products, there's a place for you at ClickShift.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>View All Positions</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <a 
              href="mailto:careers@clickshift.io"
              className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <span>Send Us Your Resume</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-8 text-slate-400">
            <p>Don't see a role that fits? We're always looking for exceptional talent.</p>
            <p>Email us at <a href="mailto:careers@clickshift.io" className="text-blue-400 hover:text-blue-300">careers@clickshift.io</a></p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">ClickShift</span>
          </div>
          <p className="text-slate-400 mb-4">Building DeFi's Intelligence Infrastructure</p>
          <div className="flex justify-center space-x-6 text-sm text-slate-400">
            <a href="mailto:careers@clickshift.io" className="hover:text-white transition-colors">careers@clickshift.io</a>
            <a href="https://t.me/ClickShiftAlerts" className="hover:text-white transition-colors">Join Our Community</a>
            <a href="/about" className="hover:text-white transition-colors">Learn More About Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;