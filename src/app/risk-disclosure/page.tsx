"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { 
  AlertTriangle, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  Clock,
  Globe,
  Zap,
  Target,
  Brain,
  Lock,
  Users,
  BarChart3,
  Calendar,
  ArrowRight,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const RiskDisclosurePage = () => {
  const [acknowledgedSections, setAcknowledgedSections] = useState<Set<string>>(new Set());
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const toggleAcknowledgment = (sectionId: string) => {
    const newAcknowledged = new Set(acknowledgedSections);
    if (newAcknowledged.has(sectionId)) {
      newAcknowledged.delete(sectionId);
    } else {
      newAcknowledged.add(sectionId);
    }
    setAcknowledgedSections(newAcknowledged);
  };

  const riskCategories = [
    {
      id: 'market-risks',
      title: 'Market and Price Risks',
      icon: <TrendingDown className="h-5 w-5" />,
      severity: 'EXTREME',
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h5 className="text-red-400 font-semibold mb-2">⚠️ EXTREME VOLATILITY WARNING</h5>
            <p className="text-slate-300 text-sm">
              Cryptocurrency prices can fluctuate by 50% or more in a single day. 
              You may lose your entire investment in a matter of hours.
            </p>
          </div>

          <h4 className="font-semibold">Specific Market Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Price Volatility:</strong> Token prices can change rapidly and unpredictably</li>
            <li>• <strong>Market Manipulation:</strong> Pump and dump schemes, whale manipulation</li>
            <li>• <strong>Liquidity Risk:</strong> Inability to sell tokens when desired</li>
            <li>• <strong>Market Crashes:</strong> Entire market segments can collapse suddenly</li>
            <li>• <strong>Correlation Risk:</strong> Most crypto assets move together during crashes</li>
            <li>• <strong>Flash Crashes:</strong> Sudden price drops due to automated trading</li>
          </ul>

          <h4 className="font-semibold mt-4">DeFi-Specific Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Rug Pulls:</strong> Projects that drain funds and disappear</li>
            <li>• <strong>Exit Scams:</strong> Developers abandoning projects with investor funds</li>
            <li>• <strong>Token Devaluation:</strong> New token issuance diluting value</li>
            <li>• <strong>Protocol Failures:</strong> Smart contract failures affecting token value</li>
            <li>• <strong>Governance Attacks:</strong> Malicious changes to protocol rules</li>
          </ul>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-yellow-400 font-semibold mb-2">Historical Examples:</h5>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Terra Luna: 99.9% loss in value over 3 days (May 2022)</li>
              <li>• FTX Token: 95% loss in value over 1 week (November 2022)</li>
              <li>• Various altcoins: 90%+ losses during bear markets</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'leverage-risks',
      title: 'Leverage and Futures Trading Risks',
      icon: <Zap className="h-5 w-5" />,
      severity: 'EXTREME',
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h5 className="text-red-400 font-semibold mb-2">⚠️ LEVERAGE AMPLIFIES LOSSES</h5>
            <p className="text-slate-300 text-sm">
              Leverage trading can result in losses that exceed your initial investment. 
              A 10% adverse price movement with 10x leverage means a 100% loss of your position.
            </p>
          </div>

          <h4 className="font-semibold">Leverage-Specific Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Liquidation Risk:</strong> Automatic closure of positions at losses</li>
            <li>• <strong>Margin Calls:</strong> Requirements to add funds to maintain positions</li>
            <li>• <strong>Amplified Losses:</strong> Small price moves create large losses</li>
            <li>• <strong>Funding Costs:</strong> Ongoing fees that erode profits</li>
            <li>• <strong>Slippage Risk:</strong> Orders executed at worse prices than expected</li>
            <li>• <strong>Gap Risk:</strong> Prices jumping over stop-loss orders</li>
          </ul>

          <h4 className="font-semibold mt-4">Futures Trading Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Expiration Risk:</strong> Contracts expire worthless if out-of-the-money</li>
            <li>• <strong>Basis Risk:</strong> Difference between spot and futures prices</li>
            <li>• <strong>Rolling Risk:</strong> Costs and risks of extending positions</li>
            <li>• <strong>Counter-party Risk:</strong> Exchange or clearinghouse failure</li>
            <li>• <strong>Mark-to-Market:</strong> Daily settlement of gains and losses</li>
          </ul>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-red-400 font-semibold mb-2">Liquidation Examples:</h5>
            <div className="text-slate-300 text-sm space-y-2">
              <div>10x Leverage: 10% adverse move = 100% loss</div>
              <div>20x Leverage: 5% adverse move = 100% loss</div>
              <div>100x Leverage: 1% adverse move = 100% loss</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'technology-risks',
      title: 'Technology and Security Risks',
      icon: <Lock className="h-5 w-5" />,
      severity: 'HIGH',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Blockchain Technology Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Smart Contract Bugs:</strong> Code vulnerabilities leading to fund loss</li>
            <li>• <strong>Network Congestion:</strong> Delayed or failed transactions</li>
            <li>• <strong>Fork Risk:</strong> Blockchain splits affecting token value</li>
            <li>• <strong>Consensus Failures:</strong> Network disagreements causing instability</li>
            <li>• <strong>Quantum Computing:</strong> Future threat to cryptographic security</li>
          </ul>

          <h4 className="font-semibold mt-4">Platform and Exchange Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Exchange Hacks:</strong> Security breaches resulting in fund theft</li>
            <li>• <strong>Platform Outages:</strong> Inability to access funds or execute trades</li>
            <li>• <strong>API Failures:</strong> Data feeds becoming unavailable or incorrect</li>
            <li>• <strong>Custody Risk:</strong> Loss of funds held by third parties</li>
            <li>• <strong>Key Management:</strong> Loss of private keys means permanent fund loss</li>
          </ul>

          <h4 className="font-semibold mt-4">Data and Analysis Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Data Quality:</strong> Incorrect or delayed market data</li>
            <li>• <strong>Analysis Errors:</strong> Bugs in algorithms or calculations</li>
            <li>• <strong>Model Risk:</strong> AI predictions based on flawed assumptions</li>
            <li>• <strong>System Failures:</strong> Technical issues preventing service access</li>
          </ul>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-yellow-400 font-semibold mb-2">Notable Security Incidents:</h5>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Mt. Gox (2014): 850,000 BTC stolen</li>
              <li>• Coincheck (2018): $530 million stolen</li>
              <li>• FTX (2022): $8 billion in customer funds missing</li>
              <li>• Various DeFi hacks: Billions lost to smart contract exploits</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'regulatory-risks',
      title: 'Regulatory and Legal Risks',
      icon: <Globe className="h-5 w-5" />,
      severity: 'HIGH',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Regulatory Uncertainty:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Changing Laws:</strong> New regulations affecting cryptocurrency trading</li>
            <li>• <strong>Enforcement Actions:</strong> Government crackdowns on specific tokens</li>
            <li>• <strong>Tax Implications:</strong> Complex and evolving tax treatment</li>
            <li>• <strong>Compliance Costs:</strong> Increasing regulatory compliance requirements</li>
            <li>• <strong>Cross-border Issues:</strong> Conflicting regulations across jurisdictions</li>
          </ul>

          <h4 className="font-semibold mt-4">Jurisdictional Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Trading Bans:</strong> Jurisdictions prohibiting cryptocurrency trading</li>
            <li>• <strong>Exchange Restrictions:</strong> Limits on accessing certain platforms</li>
            <li>• <strong>Banking Restrictions:</strong> Banks refusing cryptocurrency-related transactions</li>
            <li>• <strong>Legal Status:</strong> Uncertain legal status of specific tokens</li>
          </ul>

          <h4 className="font-semibold mt-4">Compliance Obligations:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>KYC/AML:</strong> Identity verification and monitoring requirements</li>
            <li>• <strong>Reporting:</strong> Tax reporting and disclosure obligations</li>
            <li>• <strong>Professional Standards:</strong> Fiduciary duties for institutional users</li>
            <li>• <strong>Record Keeping:</strong> Requirements to maintain transaction records</li>
          </ul>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-blue-400 font-semibold mb-2">Your Responsibilities:</h5>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Understand and comply with laws in your jurisdiction</li>
              <li>• Consult with tax and legal professionals</li>
              <li>• Stay informed about regulatory developments</li>
              <li>• Maintain accurate records of all transactions</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'ai-prediction-risks',
      title: 'AI and Prediction Model Risks',
      icon: <Brain className="h-5 w-5" />,
      severity: 'MODERATE',
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <h5 className="text-yellow-400 font-semibold mb-2">⚠️ NO PREDICTION IS GUARANTEED</h5>
            <p className="text-slate-300 text-sm">
              Our AI achieves 73%+ accuracy, meaning 27%+ of predictions may be incorrect. 
              Past performance does not guarantee future results.
            </p>
          </div>

          <h4 className="font-semibold">Model Limitations:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Historical Bias:</strong> Models based on past data may not predict future events</li>
            <li>• <strong>Black Swan Events:</strong> Unpredictable events not in training data</li>
            <li>• <strong>Market Regime Changes:</strong> Fundamental shifts in market behavior</li>
            <li>• <strong>Overfitting:</strong> Models may work well on training data but fail in practice</li>
            <li>• <strong>Data Dependencies:</strong> Predictions only as good as underlying data</li>
          </ul>

          <h4 className="font-semibold mt-4">Algorithmic Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>False Signals:</strong> Algorithm generating incorrect buy/sell recommendations</li>
            <li>• <strong>Lag Time:</strong> Delays between market changes and signal updates</li>
            <li>• <strong>Correlation Breakdown:</strong> Historical relationships failing to hold</li>
            <li>• <strong>Model Drift:</strong> Accuracy degrading over time without retraining</li>
          </ul>

          <h4 className="font-semibold mt-4">Interpretation Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Misunderstanding Signals:</strong> Incorrect interpretation of recommendations</li>
            <li>• <strong>Over-reliance:</strong> Making decisions based solely on AI predictions</li>
            <li>• <strong>Context Ignorance:</strong> AI may miss important market context</li>
            <li>• <strong>Timing Issues:</strong> Acting too early or too late on signals</li>
          </ul>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-green-400 font-semibold mb-2">Best Practices:</h5>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Use AI signals as one factor among many in decision-making</li>
              <li>• Combine with fundamental analysis and market research</li>
              <li>• Never risk more than you can afford to lose</li>
              <li>• Diversify across multiple strategies and assets</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'psychological-risks',
      title: 'Psychological and Behavioral Risks',
      icon: <Users className="h-5 w-5" />,
      severity: 'MODERATE',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Emotional Trading Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>FOMO (Fear of Missing Out):</strong> Making impulsive decisions based on market hype</li>
            <li>• <strong>Panic Selling:</strong> Selling at losses during market downturns</li>
            <li>• <strong>Greed:</strong> Taking excessive risks to maximize gains</li>
            <li>• <strong>Confirmation Bias:</strong> Seeking information that confirms existing beliefs</li>
            <li>• <strong>Overconfidence:</strong> Taking larger risks after successful trades</li>
          </ul>

          <h4 className="font-semibold mt-4">Addiction and Behavioral Issues:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Trading Addiction:</strong> Compulsive trading behavior</li>
            <li>• <strong>Gambling Mentality:</strong> Treating trading as gambling rather than investing</li>
            <li>• <strong>Loss Chasing:</strong> Attempting to recover losses with larger bets</li>
            <li>• <strong>Sleep Deprivation:</strong> 24/7 global markets affecting health</li>
            <li>• <strong>Social Isolation:</strong> Excessive focus on trading affecting relationships</li>
          </ul>

          <h4 className="font-semibold mt-4">Cognitive Biases:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Anchoring:</strong> Over-relying on first piece of information</li>
            <li>• <strong>Recency Bias:</strong> Giving too much weight to recent events</li>
            <li>• <strong>Survivorship Bias:</strong> Focusing only on successful traders</li>
            <li>• <strong>Hindsight Bias:</strong> Believing past events were more predictable</li>
          </ul>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-purple-400 font-semibold mb-2">Warning Signs:</h5>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Trading with money you can't afford to lose</li>
              <li>• Neglecting work, family, or health due to trading</li>
              <li>• Lying about trading losses or activities</li>
              <li>• Borrowing money to fund trading</li>
              <li>• Feeling anxious or depressed about trading outcomes</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const totalSections = riskCategories.length;
  const acknowledgedCount = acknowledgedSections.size;
  const allAcknowledged = acknowledgedCount === totalSections;

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
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <AlertTriangle className="h-12 w-12 text-red-400" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Risk Disclosure
            </h1>
          </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Trading cryptocurrencies and using leverage involves substantial risk of loss. 
            Please read and understand these risks before using our platform.
          </p>

          {/* Risk Level Indicators */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="font-bold text-red-400">EXTREME RISK</div>
              <div className="text-sm text-slate-400">Total loss possible</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <TrendingDown className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="font-bold text-orange-400">HIGH RISK</div>
              <div className="text-sm text-slate-400">Significant losses likely</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <BarChart3 className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="font-bold text-yellow-400">MODERATE RISK</div>
              <div className="text-sm text-slate-400">Caution required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Warning */}
      <section className="py-12 px-4 bg-red-500/10 border-y border-red-500/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-400 mb-6">⚠️ CRITICAL WARNING ⚠️</h2>
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-bold text-red-400 mb-3">CRYPTOCURRENCY TRADING CAN RESULT IN:</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Complete loss of invested capital</li>
                    <li>• Losses exceeding initial investment (leverage)</li>
                    <li>• Rapid and extreme price movements</li>
                    <li>• Inability to access or sell positions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-red-400 mb-3">BEFORE TRADING:</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Only invest money you can afford to lose</li>
                    <li>• Understand all risks involved</li>
                    <li>• Seek independent financial advice</li>
                    <li>• Start with small amounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed Risk Analysis</h2>
          
          {/* Progress Indicator */}
          <div className="mb-8 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Risk Acknowledgment Progress</span>
              <span className="text-sm text-slate-400">{acknowledgedCount}/{totalSections}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(acknowledgedCount / totalSections) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Risk Sections */}
          <div className="space-y-4">
            {riskCategories.map((category) => (
              <div key={category.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-400">{category.icon}</div>
                      <h3 className="font-bold text-lg">{category.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        category.severity === 'EXTREME' ? 'bg-red-500 text-white' :
                        category.severity === 'HIGH' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-black'
                      }`}>
                        {category.severity} RISK
                      </span>
                    </div>
                    <button
                      onClick={() => toggleSection(category.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowRight className={`h-5 w-5 transition-transform ${expandedSection === category.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {expandedSection === category.id && (
                    <div className="border-t border-slate-700 pt-4 mb-4">
                      {category.content}
                    </div>
                  )}

                  {/* Acknowledgment Checkbox */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-slate-700">
                    <button
                      onClick={() => toggleAcknowledgment(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        acknowledgedSections.has(category.id)
                          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      }`}
                    >
                      <CheckCircle className={`h-4 w-4 ${acknowledgedSections.has(category.id) ? 'text-green-400' : 'text-slate-500'}`} />
                      <span className="text-sm">
                        {acknowledgedSections.has(category.id) ? 'Risks Acknowledged' : 'Acknowledge Risks'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Acknowledgment */}
          <div className="mt-12 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-center">Final Risk Acknowledgment</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className={`h-5 w-5 mt-1 ${allAcknowledged ? 'text-green-400' : 'text-slate-500'}`} />
                <p className="text-slate-300">
                  I acknowledge that I have read and understood all risk categories above.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className={`h-5 w-5 mt-1 ${allAcknowledged ? 'text-green-400' : 'text-slate-500'}`} />
                <p className="text-slate-300">
                  I understand that cryptocurrency trading involves substantial risk of loss.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className={`h-5 w-5 mt-1 ${allAcknowledged ? 'text-green-400' : 'text-slate-500'}`} />
                <p className="text-slate-300">
                  I confirm that I am only investing money I can afford to lose entirely.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className={`h-5 w-5 mt-1 ${allAcknowledged ? 'text-green-400' : 'text-slate-500'}`} />
                <p className="text-slate-300">
                  I understand that ClickShift provides analysis tools, not investment advice.
                </p>
              </div>
            </div>

            {allAcknowledged ? (
              <div className="text-center">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
                  <p className="text-green-400 font-semibold">
                    ✅ All risks acknowledged. You may proceed to use our platform.
                  </p>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all">
                  Continue to Platform
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                  <p className="text-yellow-400">
                    Please acknowledge all risk categories above to continue.
                  </p>
                </div>
                <button 
                  className="bg-slate-600 px-8 py-3 rounded-lg font-semibold cursor-not-allowed"
                  disabled
                >
                  Complete Risk Acknowledgment ({acknowledgedCount}/{totalSections})
                </button>
              </div>
            )}
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Additional Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Educational Materials:</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• <a href="/docs" className="text-blue-400 hover:text-blue-300">Trading Documentation</a></li>
                  <li>• <a href="/tutorials" className="text-blue-400 hover:text-blue-300">Risk Management Tutorials</a></li>
                  <li>• <a href="/blog" className="text-blue-400 hover:text-blue-300">Market Analysis Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support Resources:</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• <a href="https://t.me/ClickShiftAlerts" className="text-blue-400 hover:text-blue-300">Community Telegram</a></li>
                  <li>• <a href="mailto:support@clickshift.io" className="text-blue-400 hover:text-blue-300">Email Support</a></li>
                  <li>• <a href="/faq" className="text-blue-400 hover:text-blue-300">Frequently Asked Questions</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2 text-sm text-slate-400 border-t border-slate-700 pt-8">
            <p>ClickShift Intelligence Inc.</p>
            <p>This Risk Disclosure is effective as of January 22, 2025</p>
            <p>For the most current version, visit clickshift.io/risk-disclosure</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
              <a href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
              <a href="mailto:legal@clickshift.io" className="text-blue-400 hover:text-blue-300">Legal Contact</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiskDisclosurePage;