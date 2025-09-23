"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { 
  Book, 
  Code, 
  Play, 
  Copy, 
  Check,
  ExternalLink,
  Shield,
  Zap,
  Globe,
  Lock,
  ArrowRight,
  Terminal,
  Smartphone,
  Database,
  Settings,
  Key,
  BarChart3
} from 'lucide-react';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const sections = [
    {
      id: 'getting-started',
      title: '🚀 Getting Started',
      icon: <Play className="h-4 w-4" />,
      subsections: [
        { id: 'overview', title: 'Platform Overview' },
        { id: 'quick-start', title: 'Quick Start Guide' },
        { id: 'first-analysis', title: 'Your First Analysis' }
      ]
    },
    {
      id: 'api-reference',
      title: '🔧 API Reference',
      icon: <Code className="h-4 w-4" />,
      subsections: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'endpoints', title: 'Endpoints' },
        { id: 'rate-limits', title: 'Rate Limits' },
        { id: 'errors', title: 'Error Handling' }
      ]
    },
    {
      id: 'tutorials',
      title: '📚 Tutorials',
      icon: <Book className="h-4 w-4" />,
      subsections: [
        { id: 'trading-bot', title: 'Building a Trading Bot' },
        { id: 'portfolio-tracker', title: 'Portfolio Tracker' },
        { id: 'alert-system', title: 'Alert Systems' }
      ]
    },
    {
      id: 'integrations',
      title: '🔗 Integrations',
      icon: <Settings className="h-4 w-4" />,
      subsections: [
        { id: 'webhooks', title: 'Webhooks' },
        { id: 'third-party', title: 'Third-party Tools' },
        { id: 'mobile-sdk', title: 'Mobile SDKs' }
      ]
    },
    {
      id: 'security',
      title: '🔒 Security',
      icon: <Lock className="h-4 w-4" />,
      subsections: [
        { id: 'best-practices', title: 'Best Practices' },
        { id: 'api-security', title: 'API Security' },
        { id: 'compliance', title: 'Compliance' }
      ]
    }
  ];

  const codeExamples = {
    curl: "curl -X GET \"https://api.clickshift.io/v1/analyze/token\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"address\": \"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263\",\n    \"include_predictions\": true,\n    \"include_whale_alerts\": true\n  }'",
    
    javascript: "const response = await fetch('https://api.clickshift.io/v1/analyze/token', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',\n    include_predictions: true,\n    include_whale_alerts: true\n  })\n});\n\nconst data = await response.json();\nconsole.log(data);",

    python: "import requests\n\nurl = \"https://api.clickshift.io/v1/analyze/token\"\nheaders = {\n    \"Authorization\": \"Bearer YOUR_API_KEY\",\n    \"Content-Type\": \"application/json\"\n}\ndata = {\n    \"address\": \"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263\",\n    \"include_predictions\": True,\n    \"include_whale_alerts\": True\n}\n\nresponse = requests.post(url, headers=headers, json=data)\nresult = response.json()\nprint(result)",

    response: "{\n  \"success\": true,\n  \"data\": {\n    \"token\": {\n      \"address\": \"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263\",\n      \"symbol\": \"BONK\",\n      \"name\": \"Bonk\",\n      \"price\": 0.000019,\n      \"market_cap\": 1247832100\n    },\n    \"analysis\": {\n      \"signal\": \"BUY\",\n      \"confidence\": 87,\n      \"entry_price\": 0.000019,\n      \"stop_loss\": 0.000016,\n      \"take_profit\": 0.000034,\n      \"risk_level\": \"MODERATE\",\n      \"prediction_expires\": \"2025-01-22T15:30:00Z\"\n    },\n    \"whale_activity\": {\n      \"detected\": true,\n      \"accumulation\": true,\n      \"large_holders\": 12,\n      \"exit_clusters\": [0.000023, 0.000028]\n    },\n    \"technical_indicators\": {\n      \"rsi\": 32,\n      \"rsi_signal\": \"OVERSOLD\",\n      \"atr\": 0.000003,\n      \"pump_probability\": 75\n    }\n  },\n  \"timestamp\": \"2025-01-22T14:25:13Z\",\n  \"execution_time\": 1.847\n}"
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-12">
            {/* Platform Overview */}
            <div id="overview">
              <h2 className="text-3xl font-bold mb-6">🌟 Platform Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  ClickShift is the world's first predictive trading intelligence platform for DeFi. Our AI analyzes 
                  market patterns, whale movements, and exit clusters to predict token price movements with 73%+ accuracy.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <Zap className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-3">ClickShift Alpha</h3>
                    <p className="text-slate-300">
                      Predictive intelligence for Solana tokens. Exit cluster detection, whale tracking, 
                      and RSI-based pump predictions.
                    </p>
                    <a href="/alpha" className="text-blue-400 hover:text-blue-300 text-sm font-semibold mt-3 inline-block">
                      Try Alpha →
                    </a>
                  </div>
                  
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                    <BarChart3 className="h-8 w-8 text-orange-400 mb-4" />
                    <h3 className="text-xl font-bold mb-3">ClickShift Leverage</h3>
                    <p className="text-slate-300">
                      Advanced futures trading intelligence. Liquidation risk calculation, MACD+OBV fusion, 
                      and position sizing assistance.
                    </p>
                    <a href="/leverage" className="text-orange-400 hover:text-orange-300 text-sm font-semibold mt-3 inline-block">
                      Try Leverage →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start */}
            <div id="quick-start">
              <h2 className="text-3xl font-bold mb-6">⚡ Quick Start Guide</h2>
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Step 1: Choose Your Plan</h3>
                  <p className="text-slate-300 mb-4">
                    Start with our free Explorer plan (10 analyses/month) or upgrade to Professional for unlimited access.
                  </p>
                  <a href="/pricing" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold transition-all inline-block">
                    View Pricing
                  </a>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Step 2: Get Your API Key</h3>
                  <p className="text-slate-300 mb-4">
                    Generate your API key from the dashboard to start integrating with our intelligence platform.
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm mb-4">
                    <span className="text-green-400">GET</span> /auth/api-key
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Step 3: Make Your First Request</h3>
                  <p className="text-slate-300 mb-4">
                    Analyze any Solana token with a simple API call. Get predictions, whale alerts, and risk assessments.
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                    <span className="text-green-400">POST</span> /v1/analyze/token
                  </div>
                </div>
              </div>
            </div>

            {/* First Analysis */}
            <div id="first-analysis">
              <h2 className="text-3xl font-bold mb-6">🎯 Your First Analysis</h2>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-300 mb-6">
                  Let's analyze BONK token to see ClickShift's intelligence in action:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">JavaScript Example</span>
                      <button
                        onClick={() => copyToClipboard(codeExamples.javascript, 'js-example')}
                        className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedCode === 'js-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="text-sm">{copiedCode === 'js-example' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-slate-300">{codeExamples.javascript}</code>
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Expected Response</span>
                      <button
                        onClick={() => copyToClipboard(codeExamples.response, 'response-example')}
                        className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedCode === 'response-example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="text-sm">{copiedCode === 'response-example' ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-slate-300">{codeExamples.response}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api-reference':
        return (
          <div className="space-y-12">
            {/* Authentication */}
            <div id="authentication">
              <h2 className="text-3xl font-bold mb-6">🔐 Authentication</h2>
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">API Key Authentication</h3>
                  <p className="text-slate-300 mb-4">
                    All API requests require authentication using your API key in the Authorization header:
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                  <h4 className="font-bold text-yellow-400 mb-2">⚠️ Security Best Practices</h4>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li>• Never expose your API key in client-side code</li>
                    <li>• Use environment variables to store API keys</li>
                    <li>• Rotate your API keys regularly</li>
                    <li>• Monitor your API usage for unusual activity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Endpoints */}
            <div id="endpoints">
              <h2 className="text-3xl font-bold mb-6">📡 API Endpoints</h2>
              <div className="space-y-6">
                
                {/* Token Analysis Endpoint */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-mono">POST</span>
                    <code className="font-mono">/v1/analyze/token</code>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Analyze any Solana token for trading intelligence, whale activity, and price predictions.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                        <code className="text-slate-300">{`{
  "address": "string (required)",
  "include_predictions": boolean,
  "include_whale_alerts": boolean,
  "include_technical": boolean
}`}</code>
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Response Schema:</h4>
                      <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                        <code className="text-slate-300">{`{
  "success": boolean,
  "data": {
    "token": { ... },
    "analysis": { ... },
    "whale_activity": { ... },
    "technical_indicators": { ... }
  },
  "timestamp": "ISO 8601",
  "execution_time": number
}`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Whale Alerts Endpoint */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-mono">GET</span>
                    <code className="font-mono">/v1/whale-alerts</code>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Get real-time whale movement alerts and large transaction notifications.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Query Parameters:</h4>
                      <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                        <code className="text-slate-300">{`?limit=50&offset=0&min_value=10000&token_address=optional`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Leverage Analysis Endpoint */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-mono">POST</span>
                    <code className="font-mono">/v1/analyze/futures</code>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Analyze futures trading pairs for liquidation risk, position sizing, and trend intelligence.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                        <code className="text-slate-300">{`{
  "symbol": "BTCUSDT",
  "timeframe": "4h",
  "position_size": 1000,
  "leverage": 10
}`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Limits */}
            <div id="rate-limits">
              <h2 className="text-3xl font-bold mb-6">⏱️ Rate Limits</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <h3 className="font-bold text-lg mb-2">Developer Plan</h3>
                    <div className="text-2xl font-bold text-blue-400 mb-2">5,000</div>
                    <div className="text-sm text-slate-400">calls per month</div>
                    <div className="text-sm text-slate-400 mt-2">~7 calls per hour</div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <h3 className="font-bold text-lg mb-2">Scale Plan</h3>
                    <div className="text-2xl font-bold text-orange-400 mb-2">25,000</div>
                    <div className="text-sm text-slate-400">calls per month</div>
                    <div className="text-sm text-slate-400 mt-2">~35 calls per hour</div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <h3 className="font-bold text-lg mb-2">Enterprise</h3>
                    <div className="text-2xl font-bold text-green-400 mb-2">Custom</div>
                    <div className="text-sm text-slate-400">calls per month</div>
                    <div className="text-sm text-slate-400 mt-2">Negotiated limits</div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                  <h4 className="font-bold text-yellow-400 mb-2">⚡ Rate Limit Headers</h4>
                  <p className="text-slate-300 mb-3">Every API response includes rate limit information:</p>
                  <pre className="bg-slate-900 rounded-lg p-4 text-sm">
                    <code className="text-slate-300">{`X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4987
X-RateLimit-Reset: 1673875200`}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Error Handling */}
            <div id="errors">
              <h2 className="text-3xl font-bold mb-6">🚨 Error Handling</h2>
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">HTTP Status Codes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-mono">200</span>
                      <span>Success - Request completed successfully</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-mono">400</span>
                      <span>Bad Request - Invalid parameters or request format</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-mono">401</span>
                      <span>Unauthorized - Invalid or missing API key</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-mono">429</span>
                      <span>Rate Limited - Too many requests</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-mono">500</span>
                      <span>Server Error - Internal server error</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Error Response Format</h3>
                  <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto">
                    <code className="text-slate-300">{`{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN_ADDRESS",
    "message": "The provided token address is not valid",
    "details": "Address must be a valid Solana token address"
  },
  "timestamp": "2025-01-22T14:25:13Z"
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tutorials':
        return (
          <div className="space-y-12">
            {/* Trading Bot Tutorial */}
            <div id="trading-bot">
              <h2 className="text-3xl font-bold mb-6">🤖 Building a Trading Bot</h2>
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Overview</h3>
                  <p className="text-slate-300 mb-4">
                    Learn how to build an automated trading bot that uses ClickShift's intelligence to make 
                    profitable trades while managing risk effectively.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                      <ul className="text-slate-300 space-y-1 text-sm">
                        <li>• Setting up automated token analysis</li>
                        <li>• Implementing whale alert notifications</li>
                        <li>• Creating buy/sell signal triggers</li>
                        <li>• Risk management and position sizing</li>
                        <li>• Backtesting your strategy</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Prerequisites:</h4>
                      <ul className="text-slate-300 space-y-1 text-sm">
                        <li>• ClickShift Professional plan or higher</li>
                        <li>• Basic JavaScript/Python knowledge</li>
                        <li>• Wallet with trading funds</li>
                        <li>• Understanding of DeFi trading</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Step 1: Bot Architecture</h3>
                  <p className="text-slate-300 mb-4">
                    Here's a basic trading bot structure that monitors tokens and executes trades based on ClickShift signals:
                  </p>
                  
                  <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                    <code className="text-slate-300">{`class ClickShiftTradingBot {
  constructor(apiKey, walletPrivateKey) {
    this.apiKey = apiKey;
    this.wallet = new Wallet(walletPrivateKey);
    this.watchedTokens = [];
    this.positions = new Map();
  }

  async monitorTokens() {
    for (const token of this.watchedTokens) {
      const analysis = await this.analyzeToken(token);
      await this.processSignal(token, analysis);
    }
  }

  async analyzeToken(tokenAddress) {
    const response = await fetch('https://api.clickshift.io/v1/analyze/token', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: tokenAddress,
        include_predictions: true,
        include_whale_alerts: true
      })
    });
    
    return response.json();
  }

  async processSignal(token, analysis) {
    const { signal, confidence } = analysis.data.analysis;
    
    if (signal === 'BUY' && confidence > 80) {
      await this.executeBuy(token, analysis);
    } else if (signal === 'SELL' && this.positions.has(token)) {
      await this.executeSell(token, analysis);
    }
  }
}`}</code>
                  </pre>
                  
                  <a href="/docs/bot-complete" className="text-blue-400 hover:text-blue-300 font-semibold">
                    View Complete Tutorial →
                  </a>
                </div>
              </div>
            </div>

            {/* Portfolio Tracker */}
            <div id="portfolio-tracker">
              <h2 className="text-3xl font-bold mb-6">📊 Portfolio Tracker</h2>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4">Real-time Portfolio Intelligence</h3>
                <p className="text-slate-300 mb-4">
                  Build a comprehensive portfolio tracker that monitors your holdings and provides 
                  intelligent insights for each position.
                </p>
                
                <div className="bg-slate-900 rounded-lg p-4 text-sm mb-4">
                  <span className="text-green-400">Features:</span> Real-time P&L, whale alerts for your holdings, exit recommendations
                </div>
                
                <a href="/docs/portfolio-tutorial" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Start Building →
                </a>
              </div>
            </div>

            {/* Alert System */}
            <div id="alert-system">
              <h2 className="text-3xl font-bold mb-6">🔔 Alert Systems</h2>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4">Custom Alert Implementation</h3>
                <p className="text-slate-300 mb-4">
                  Create sophisticated alert systems that notify you of trading opportunities 
                  via email, SMS, Discord, or Telegram.
                </p>
                
                <div className="bg-slate-900 rounded-lg p-4 text-sm mb-4">
                  <span className="text-orange-400">Alerts:</span> Whale movements, pump signals, exit clusters, risk warnings
                </div>
                
                <a href="/docs/alerts-tutorial" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Build Alert System →
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Documentation Section</h3>
            <p className="text-slate-400">Select a topic from the sidebar to get started.</p>
          </div>
        );
    }
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
              Get API Key
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Developer
            <br />
            Documentation
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Integrate ClickShift's trading intelligence into your applications. 
            Build smarter trading bots, portfolio trackers, and alert systems.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Terminal className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold">REST API</div>
              <div className="text-sm text-slate-400">RESTful endpoints</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Zap className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold">&lt 2s</div>
              <div className="text-sm text-slate-400">Response time</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold">99.9%</div>
              <div className="text-sm text-slate-400">Uptime SLA</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Code className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-lg font-bold">7+</div>
              <div className="text-sm text-slate-400">Data sources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Documentation */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Documentation</h3>
                
                <div className="space-y-2">
                  {sections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-all text-left ${
                          activeSection === section.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {section.icon}
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                      
                      {activeSection === section.id && section.subsections && (
                        <div className="mt-2 ml-4 space-y-1">
                          {section.subsections.map((subsection) => (
                            <a
                              key={subsection.id}
                              href={`#${subsection.id}`}
                              className="block p-2 text-sm text-slate-400 hover:text-white transition-colors"
                            >
                              {subsection.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* API Status */}
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-semibold">API Status</span>
                  </div>
                  <div className="text-xs text-slate-400">All systems operational</div>
                  <a href="/status" className="text-green-400 text-xs hover:text-green-300">
                    View Details →
                  </a>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-invert max-w-none">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Downloads */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-8">🛠️ SDKs & Tools</h2>
          <p className="text-slate-300 mb-12">
            Official SDKs and tools to accelerate your development
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <Code className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">JavaScript SDK</h3>
              <p className="text-slate-300 text-sm mb-4">
                Official Node.js and browser SDK with TypeScript support
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold transition-all">
                npm install clickshift
              </button>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <Terminal className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Python SDK</h3>
              <p className="text-slate-300 text-sm mb-4">
                Python library for data scientists and trading bot developers
              </p>
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold transition-all">
                pip install clickshift
              </button>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <Smartphone className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Mobile SDKs</h3>
              <p className="text-slate-300 text-sm mb-4">
                React Native and Flutter SDKs for mobile applications
              </p>
              <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-sm font-semibold transition-all">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Need Help?</h2>
          <p className="text-slate-300 mb-12">
            Our developer support team is here to help you build amazing applications
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold text-lg mb-2">💬 Discord Community</h3>
              <p className="text-slate-300 text-sm mb-4">
                Join our developer community for real-time support and discussions
              </p>
              <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded text-sm font-semibold transition-all">
                Join Discord
              </button>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold text-lg mb-2">📧 Developer Support</h3>
              <p className="text-slate-300 text-sm mb-4">
                Get technical support from our engineering team
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocumentationPage;