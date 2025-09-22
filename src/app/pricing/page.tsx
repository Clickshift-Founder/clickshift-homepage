"use client";
import React, { useState, ReactNode } from 'react';
import { 
  Shield, 
  Zap, 
  Crown, 
  Building2,
  Check, 
  X,
  ArrowRight,
  Star,
  Users,
  Smartphone,
  Globe,
  TrendingUp,
  Bell,
  Code,
  BarChart3,
  Lock,
  Headphones
} from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  type BillingCycle = "monthly" | "annually";

type PlanPrice = {
  monthly: number | string;
  annually: number | string;
};

interface Plan {
  id: string;
  name: string;
  icon: ReactNode;
  price: PlanPrice;
  description: string;
  badge?: string;
  badgeColor?: string;
  features: { name: string; included: boolean }[];
  cta: string;
  ctaLink: string;
}


  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Explorer',
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      price: { monthly: 0, annually: 0 },
      description: 'Perfect for getting started with intelligent trading',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-500',
      features: [
        { name: '10 token analyses per month', included: true },
        { name: 'Basic whale alerts', included: true },
        { name: 'Community Telegram access', included: true },
        { name: 'Mobile web app', included: true },
        { name: 'Basic risk scoring', included: true },
        { name: 'Email support', included: true },
        { name: 'Real-time RSI signals', included: false },
        { name: 'Advanced pattern recognition', included: false },
        { name: 'API access', included: false },
        { name: 'Custom alerts', included: false }
      ],
      cta: 'Start Free',
      ctaLink: '/alpha'
    },
    {
      id: 'pro',
      name: 'Professional',
      icon: <Zap className="h-8 w-8 text-orange-400" />,
      price: { monthly: 79, annually: 63 },
      description: 'For serious traders who want consistent profits',
      badge: 'Best Value',
      badgeColor: 'bg-orange-500',
      features: [
        { name: 'Unlimited token analyses', included: true },
        { name: 'Advanced whale tracking', included: true },
        { name: 'Real-time RSI + ATR signals', included: true },
        { name: 'Exit cluster predictions', included: true },
        { name: 'Mobile app with notifications', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom alert settings', included: true },
        { name: 'Portfolio tracking', included: true },
        { name: 'API access (1000 calls/month)', included: true },
        { name: 'Advanced risk management', included: true }
      ],
      cta: 'Go Professional',
      ctaLink: '/signup?plan=pro'
    },
    {
      id: 'elite',
      name: 'Elite Trader',
      icon: <Crown className="h-8 w-8 text-purple-400" />,
      price: { monthly: 199, annually: 159 },
      description: 'Maximum intelligence for elite performance',
      badge: 'Premium',
      badgeColor: 'bg-purple-500',
      features: [
        { name: 'Everything in Professional', included: true },
        { name: 'AI pattern recognition', included: true },
        { name: 'Launch detector access', included: true },
        { name: 'ClickBot auto-trading (beta)', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Private Discord channel', included: true },
        { name: 'API access (10,000 calls/month)', included: true },
        { name: 'Advanced backtesting', included: true },
        { name: 'White-label options', included: true },
        { name: '24/7 phone support', included: true }
      ],
      cta: 'Join Elite',
      ctaLink: '/signup?plan=elite'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: <Building2 className="h-8 w-8 text-green-400" />,
      price: { monthly: 'Custom', annually: 'Custom' },
      description: 'For institutions and trading firms',
      badge: 'Custom',
      badgeColor: 'bg-green-500',
      features: [
        { name: 'Everything in Elite Trader', included: true },
        { name: 'Unlimited API calls', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Multi-chain support', included: true },
        { name: 'Dedicated infrastructure', included: true },
        { name: 'Custom SLA agreements', included: true },
        { name: 'On-premise deployment', included: true },
        { name: 'Custom training sessions', included: true },
        { name: 'Legal compliance review', included: true },
        { name: 'Revenue sharing models', included: true }
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact'
    }
  ];

  const apiPlans = [
    {
      name: 'Developer',
      price: { monthly: 49, annually: 39 },
      calls: '5,000',
      features: ['Basic endpoints', 'Community support', 'Rate limiting', 'Documentation access']
    },
    {
      name: 'Scale',
      price: { monthly: 149, annually: 119 },
      calls: '25,000',
      features: ['All endpoints', 'Priority support', 'Custom rate limits', 'SLA guarantee']
    },
    {
      name: 'Enterprise API',
      price: { monthly: 'Custom', annually: 'Custom' },
      calls: 'Unlimited',
      features: ['White-label API', 'Dedicated support', 'Custom endpoints', 'Revenue sharing']
    }
  ];

  const faqs = [
    {
      q: 'Can I switch plans anytime?',
      a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing accordingly.'
    },
    {
      q: 'Do you offer refunds?',
      a: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied, we\'ll refund your payment in full.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, PayPal, and cryptocurrency payments (BTC, ETH, USDC, SOL).'
    },
    {
      q: 'Is there a free trial for paid plans?',
      a: 'Yes! All paid plans come with a 7-day free trial. No credit card required to start.'
    },
    {
      q: 'How accurate are your predictions?',
      a: 'Our AI maintains 73%+ accuracy across all signal types, with some patterns achieving 85%+ accuracy. Past performance doesn\'t guarantee future results.'
    }
  ];

  const stats = [
    { number: '525+', label: 'Active Traders', icon: <Users className="h-5 w-5" /> },
    { number: '73%', label: 'Prediction Accuracy', icon: <TrendingUp className="h-5 w-5" /> },
    { number: '91', label: 'NPS Score', icon: <Star className="h-5 w-5" /> },
    { number: '$2.4M', label: 'Losses Prevented', icon: <Shield className="h-5 w-5" /> }
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
            <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="/community" className="hover:text-blue-400 transition-colors">Community</a>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Simple Pricing.
            <br />
            Powerful Intelligence.
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free and scale as you grow. From hobbyist traders to institutional firms, 
            we have the perfect plan for your trading intelligence needs.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {stat.icon}
                  <span className="text-2xl font-bold text-blue-400">{stat.number}</span>
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
              className="relative w-14 h-7 bg-slate-700 rounded-full p-1 transition-colors duration-200 focus:outline-none"
            >
              <div className={`w-5 h-5 bg-blue-500 rounded-full transition-transform duration-200 ${billingCycle === 'annually' ? 'translate-x-7' : ''}`}></div>
            </button>
            <span className={`${billingCycle === 'annually' ? 'text-white' : 'text-slate-400'}`}>
              Annually 
              <span className="text-green-400 text-sm ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.badge === 'Best Value' 
                    ? 'border-orange-500/50 scale-105' 
                    : 'border-slate-700 hover:border-blue-500/50'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {plan.badge}
                  </div>
                )}

                <div className="mb-4">
  {typeof plan.price[billingCycle] === "number" ? (
    <>
      <span className="text-4xl font-bold">
        ${plan.price[billingCycle] as number}
      </span>
      <span className="text-slate-400">
        /{billingCycle === "monthly" ? "mo" : "yr"}
      </span>
      {billingCycle === "annually" 
        && typeof plan.price.monthly === "number" 
        && typeof plan.price.annually === "number" 
        && plan.price.monthly > 0 && (
          <div className="text-sm text-green-400 mt-1">
            Save ${(plan.price.monthly * 12 - plan.price.annually * 12).toFixed(0)}/year
          </div>
      )}
    </>
  ) : (
    <span className="text-3xl font-bold">
      {plan.price[billingCycle]}
    </span>
  )}
</div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-500'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.ctaLink}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                    plan.id === 'free'
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : plan.id === 'enterprise'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                {plan.id === 'pro' && (
                  <div className="text-center mt-3">
                    <span className="text-sm text-slate-400">7-day free trial</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Pricing Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              🔧 API Pricing
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Build on top of our intelligence. Perfect for developers, trading bots, and custom applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {apiPlans.map((plan, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  {typeof plan.price[billingCycle] === 'number' ? (
                    <>
                      <span className="text-3xl font-bold">${plan.price[billingCycle]}</span>
                      <span className="text-slate-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{plan.price[billingCycle]}</span>
                  )}
                </div>
                <div className="text-lg text-blue-400 mb-4">{plan.calls} API calls/month</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-2 px-4 rounded-lg font-semibold transition-all">
                  Get API Access
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Need higher limits or custom endpoints?</p>
            <button className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all">
              Contact Our API Team
            </button>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            📊 Compare Plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-slate-800/50 rounded-xl border border-slate-700">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-6 text-slate-300">Features</th>
                  <th className="text-center p-6">Explorer</th>
                  <th className="text-center p-6">Professional</th>
                  <th className="text-center p-6">Elite</th>
                  <th className="text-center p-6">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-700/50">
                  <td className="p-4 font-semibold">Token Analyses</td>
                  <td className="text-center p-4">10/month</td>
                  <td className="text-center p-4">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="p-4 font-semibold">Prediction Accuracy</td>
                  <td className="text-center p-4">Basic (65%+)</td>
                  <td className="text-center p-4">Advanced (73%+)</td>
                  <td className="text-center p-4">Elite (80%+)</td>
                  <td className="text-center p-4">Custom Models</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="p-4 font-semibold">API Calls</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">1,000/month</td>
                  <td className="text-center p-4">10,000/month</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="p-4 font-semibold">Support Response</td>
                  <td className="text-center p-4">48 hours</td>
                  <td className="text-center p-4">12 hours</td>
                  <td className="text-center p-4">4 hours</td>
                  <td className="text-center p-4">1 hour SLA</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Custom Features</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">Limited</td>
                  <td className="text-center p-4">Full Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            🤔 Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-lg mb-3">{faq.q}</h3>
                <p className="text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Still have questions?</p>
            <a 
              href="mailto:trust@clickshift.io"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center space-x-2"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to Trade with Intelligence?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join 525+ traders who've discovered the power of predictive intelligence. 
            Start free, upgrade when ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/alpha"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>🔮 Start Free Today</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="https://t.me/ClickShiftAlerts"
              className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <span>💬 Join Community</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;