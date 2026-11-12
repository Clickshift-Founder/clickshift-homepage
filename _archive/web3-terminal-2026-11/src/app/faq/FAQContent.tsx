"use client";
import React, { useState, useMemo } from 'react';
import Link from "next/link";
import { 
  Search, 
  Shield, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Code,
  Smartphone,
  Lock,
  TrendingUp,
  Users,
  Bot,
  Zap,
  Copy,
  BarChart2,
  Banknote,
  Wallet,
  Repeat2,
} from 'lucide-react';



const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set<number>());

  const categories = useMemo(() => [
    { id: 'all',           name: 'All Questions',     icon: <HelpCircle className="h-4 w-4" />,  count: 0, group: 'main' },
    // ── ClickShift Platform ──────────────────────────────────────
    { id: 'general',       name: 'General',            icon: <Shield className="h-4 w-4" />,      count: 0, group: 'platform' },
    { id: 'pricing',       name: 'Pricing & Plans',    icon: <DollarSign className="h-4 w-4" />,  count: 0, group: 'platform' },
    { id: 'technical',     name: 'Technical',          icon: <Code className="h-4 w-4" />,        count: 0, group: 'platform' },
    { id: 'trading',       name: 'Trading & Accuracy', icon: <TrendingUp className="h-4 w-4" />,  count: 0, group: 'platform' },
    { id: 'security',      name: 'Security & Privacy', icon: <Lock className="h-4 w-4" />,        count: 0, group: 'platform' },
    { id: 'mobile',        name: 'Mobile & Apps',      icon: <Smartphone className="h-4 w-4" />,  count: 0, group: 'platform' },
    { id: 'api',           name: 'API & Developers',   icon: <Code className="h-4 w-4" />,        count: 0, group: 'platform' },
    // ── ClickBot ─────────────────────────────────────────────────
    { id: 'clickbot',      name: 'ClickBot General',   icon: <Bot className="h-4 w-4" />,         count: 0, group: 'clickbot' },
    { id: 'cb_trading',    name: 'Spot Trading',       icon: <Wallet className="h-4 w-4" />,      count: 0, group: 'clickbot' },
    { id: 'cb_sniper',     name: 'Sniper',             icon: <Zap className="h-4 w-4" />,         count: 0, group: 'clickbot' },
    { id: 'cb_copytrading',name: 'Copy Trading',       icon: <Copy className="h-4 w-4" />,        count: 0, group: 'clickbot' },
    { id: 'cb_perps',      name: 'Perps Trading',      icon: <BarChart2 className="h-4 w-4" />,   count: 0, group: 'clickbot' },
    { id: 'cb_fiat',       name: 'NGN Fiat Bridge',    icon: <Banknote className="h-4 w-4" />,    count: 0, group: 'clickbot' },
    { id: 'cb_wallet',     name: 'Wallet & Security',  icon: <Repeat2 className="h-4 w-4" />,     count: 0, group: 'clickbot' },
  ], []);

  const faqs = useMemo(() => [

    // ── CLICKSHIFT GENERAL ────────────────────────────────────────
    {
      id: 1,
      category: 'general',
      question: 'What is ClickShift and how does it work?',
      answer: 'ClickShift is the world\'s first predictive Web3 terminal that powers agents and humans with 6 intelligencies to remain profitable on-chain. From trading, to lending, to stablecoin capital efficiency. We use AI to analyze market patterns, whale movements, and exit clusters to predict where token prices will move before they happen. Our algorithms have 73%+ accuracy in predicting market movements.',
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
      answer: 'Currently, ClickShift Alpha supports all Solana tokens, while ClickShift Leverage supports major crypto futures pairs (BTC, ETH, SOL, etc.). We\'re expanding to Sui, Base, and BSC in Q1 2026.',
      tags: ['blockchain', 'solana', 'ethereum', 'tokens', 'support']
    },
    {
      id: 4,
      category: 'general',
      question: 'Do I need trading experience to use ClickShift?',
      answer: 'No! ClickShift is designed for both beginners and experts. Our interface provides clear BUY/SELL/AVOID recommendations with specific entry and exit points. We also include educational explanations to help you learn as you trade.',
      tags: ['beginner', 'education', 'experience', 'learning']
    },

    // ── CLICKSHIFT PRICING ────────────────────────────────────────
    {
      id: 5,
      category: 'pricing',
      question: 'Is there a free plan available?',
      answer: "Yes! Our Explorer plan is completely free and includes 10 token analyses per month, basic whale alerts, and community access. It's perfect for getting started with intelligent trading. You can 'click' to visit our product page",
      tags: ['free', 'plan', 'explorer', 'trial'],
      hasLink: true, 
      linkText: 'click',
      linkUrl: '/products'
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

    // ── CLICKSHIFT TECHNICAL ──────────────────────────────────────
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

    // ── CLICKSHIFT TRADING ────────────────────────────────────────
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

    // ── CLICKSHIFT SECURITY ───────────────────────────────────────
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

    // ── CLICKSHIFT MOBILE ─────────────────────────────────────────
    {
      id: 22,
      category: 'mobile',
      question: 'Do you have a mobile app?',
      answer: 'We have a progressive web app (PWA) that works perfectly on mobile devices. A dedicated mobile app for iOS and Android is launching in Q2 2026 with push notifications and offline analysis.',
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

    // ── CLICKSHIFT API ────────────────────────────────────────────
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
    },

    // ══════════════════════════════════════════════════════════════
    // ── CLICKBOT GENERAL ─────────────────────────────────────────
    // ══════════════════════════════════════════════════════════════
    {
      id: 29,
      category: 'clickbot',
      question: 'What is ClickBot and how is it different from ClickShift?',
      answer: 'ClickBot is ClickShift\'s Telegram-based trading assistant — it brings the intelligence of the ClickShift platform directly into your Telegram app. Where ClickShift is your analysis terminal, ClickBot is your execution layer. Paste a contract address, get a full AI analysis, and execute a trade in one tap — all without leaving Telegram.',
      tags: ['clickbot', 'overview', 'telegram', 'clickshift']
    },
    {
      id: 30,
      category: 'clickbot',
      question: 'Do I need a Phantom wallet or exchange account to use ClickBot?',
      answer: 'No. ClickBot creates a non-custodial Solana wallet for you automatically when you first start the bot. No Phantom, no Binance, no exchange account required. Just open Telegram and you\'re trading within minutes.',
      tags: ['wallet', 'setup', 'phantom', 'no-kyc', 'beginner']
    },
    {
      id: 31,
      category: 'clickbot',
      question: 'What can I do with ClickBot?',
      answer: 'ClickBot gives you five trading modules in one place: Spot Trading (buy and sell any Solana token with AI analysis), Sniper (instant and limit-order sniping on new launches), Copy Trading (mirror proven alpha wallets automatically), Perps Trading (leveraged long/short on BTC, ETH, and Solana tokens via Drift Protocol), and a full NGN Fiat Bridge to cash out directly to any Nigerian bank account.',
      tags: ['features', 'modules', 'overview', 'trading']
    },
    {
      id: 32,
      category: 'clickbot',
      question: 'How do I get started with ClickBot?',
      answer: 'Open Telegram and search for @clicksolbot or visit t.me/clicksolbot. Type /start — a non-custodial Solana wallet is created instantly. Fund it by depositing SOL from any source, or buy USDC directly with Naira via your Nigerian bank. Then paste any Solana contract address to get your first AI analysis.',
      tags: ['getting-started', 'setup', 'onboarding', 'telegram'],
      hasLink: true,
      linkText: 'click',
      linkUrl: 'https://t.me/clicksolbot'
    },
    {
      id: 33,
      category: 'clickbot',
      question: 'Is ClickBot live on Solana mainnet?',
      answer: 'Yes. ClickBot runs on Solana mainnet. Real wallets, real trades, real money. All five modules — spot trading, sniper, copy trading, perps, and the NGN fiat bridge — are fully operational.',
      tags: ['mainnet', 'live', 'solana', 'production']
    },
    {
      id: 34,
      category: 'clickbot',
      question: 'What are ClickBot\'s trading fees?',
      answer: 'Free users pay a 1% fee on spot trades. The NGN fiat bridge (withdraw to bank) has a 1% withdrawal fee. The Sniper module charges a 3% fee on executed snipes. Copy Trading charges a 1% fee per copied trade. Pro subscribers ($20/month) get zero sniper-level fees and MEV-protected Ultra Speed routing on all trades.',
      tags: ['fees', 'pricing', 'cost', 'subscription']
    },
    {
      id: 35,
      category: 'clickbot',
      question: 'Does ClickBot work outside Nigeria?',
      answer: 'Yes. The trading modules — spot, sniper, copy trading, and perps — are fully global. Anyone with Telegram and a Solana wallet can use them. The NGN fiat bridge (bank withdrawal and Naira top-up) is currently Nigeria-specific. We are expanding fiat rails to Ghana, Kenya, and South Africa next.',
      tags: ['global', 'nigeria', 'international', 'availability']
    },
    {
      id: 36,
      category: 'clickbot',
      question: 'Can I use ClickBot on my phone?',
      answer: 'Yes — that is the whole point. ClickBot lives inside Telegram, which runs perfectly on iOS and Android. There is no separate app to install. Your entire trading terminal is your Telegram app.',
      tags: ['mobile', 'phone', 'telegram', 'ios', 'android']
    },
    {
      id: 37,
      category: 'clickbot',
      question: 'Does ClickBot have a referral program?',
      answer: 'Yes. You earn 20% commission on every trade fee paid by users you refer — forever, with no cap and no expiry. Share your unique link from the Referral Hub inside the bot or run /refer.',
      tags: ['referral', 'commission', 'earn', 'affiliate']
    },

    // ── CLICKBOT SPOT TRADING ─────────────────────────────────────
    {
      id: 38,
      category: 'cb_trading',
      question: 'How do I buy a token with ClickBot?',
      answer: 'Paste any Solana token contract address into the chat. ClickBot runs a full AI analysis — RSI, momentum score, holder risk, liquidity, buy pressure, and volume trend — then shows you a scored recommendation. Tap the Buy button to execute. The full process from paste to trade confirmation takes under 10 seconds.',
      tags: ['buy', 'trade', 'contract', 'how-to']
    },
    {
      id: 39,
      category: 'cb_trading',
      question: 'What is the AI token analysis and what does it show me?',
      answer: 'Every token analysis runs six independent signals: real 14-period RSI calculated from live candle data; a momentum score (0-100) combining price action across 5m, 1h, 6h, and 24h timeframes; buy/sell pressure ratio from the last hour of trades; holder concentration risk (top wallet %); liquidity depth; and volume trend (Surging / Elevated / Normal / Declining). These combine into a BUY / SELL / AVOID recommendation with a confidence score and the specific signals that drove the decision.',
      tags: ['analysis', 'rsi', 'ai', 'signals', 'recommendation']
    },
    {
      id: 40,
      category: 'cb_trading',
      question: 'What is "Explain Simply" — the plain English button?',
      answer: 'After every analysis, there is an "Explain Simply" button. Tapping it rewrites the technical analysis in plain English — explaining what RSI actually means for this token right now, whether the momentum is picking up or fading, how risky the top holders are, and what the overall verdict means in everyday language. Designed for traders who are still learning what the numbers mean.',
      tags: ['explain', 'beginner', 'plain-english', 'education']
    },
    {
      id: 41,
      category: 'cb_trading',
      question: 'What is Ultra Buy and when should I use it?',
      answer: 'Ultra Buy routes your trade through Jito bundle infrastructure, bypassing the public Solana mempool entirely. This eliminates sandwich attacks and frontrunning — two silent ways retail traders lose money. Use Ultra Buy when you\'re trading a high-momentum token during a surge, when volume is spiking, or when you want guaranteed fill without slippage manipulation. Pro subscribers get Ultra routing on all trades with no extra fee.',
      tags: ['ultra-buy', 'mev', 'jito', 'frontrun', 'sandwich']
    },
    {
      id: 42,
      category: 'cb_trading',
      question: 'What is the Trailing Profit Engine?',
      answer: 'After every buy, you can activate trailing profit. You set a trigger (e.g. 2x) and a trail percentage (e.g. 15%). ClickBot monitors your position 24/7. Once the token hits your trigger, the trailing stop arms. If price then drops by your trail percentage from the peak, ClickBot automatically sells your position. It follows the pump all the way to the top and exits on the way down — without you watching a screen.',
      tags: ['trailing-profit', 'auto-sell', 'tp', 'sl', 'automation']
    },
    {
      id: 43,
      category: 'cb_trading',
      question: 'How does ClickBot protect me from rug pulls?',
      answer: 'The AI analysis flags tokens under 1 hour old as AVOID automatically — new launches are high-risk by default. It also checks holder concentration (if one wallet holds more than 25-40% of supply, risk is flagged as MEDIUM or HIGH), liquidity depth, and token age. These signals appear prominently in every analysis before you decide to trade.',
      tags: ['rug-pull', 'safety', 'holder-risk', 'protection']
    },

    // ── CLICKBOT SNIPER ───────────────────────────────────────────
    {
      id: 44,
      category: 'cb_sniper',
      question: 'What is the ClickBot Sniper?',
      answer: 'The Sniper lets you buy new Solana token launches at the earliest possible moment — either instantly when a token is detected, or via a limit order at a target price you set. Once your snipe executes, take-profit, stop-loss, and trailing profit buttons appear automatically so you can manage the trade without re-entering the contract.',
      tags: ['sniper', 'launch', 'new-token', 'early-entry']
    },
    {
      id: 45,
      category: 'cb_sniper',
      question: 'What is the difference between Instant Snipe and Limit Snipe?',
      answer: 'Instant Snipe executes the moment the token is detected — you get in at the earliest available price, prioritising speed over entry precision. Limit Snipe queues a pending buy at your specified target price — the bot waits and executes only when the market price touches your entry. Limit is useful when you\'ve spotted a token but want to wait for a dip before entering.',
      tags: ['instant-snipe', 'limit-snipe', 'entry', 'pending']
    },
    {
      id: 46,
      category: 'cb_sniper',
      question: 'How fast is ClickBot\'s sniper execution?',
      answer: 'Sniper trades route through Jito bundles, which means they are submitted directly to Solana validators rather than the public mempool. This gives sub-second execution that lands in the same block as the token pool creation. New launches are millisecond races — our routing is built for that.',
      tags: ['speed', 'jito', 'fast', 'execution', 'block']
    },
    {
      id: 47,
      category: 'cb_sniper',
      question: 'Can I manage my pending snipes?',
      answer: 'Yes. The Sniper menu shows all your pending limit snipes with the target price, amount, and status. You can cancel a pending snipe at any time before it executes. Once a snipe fires, your position appears with the full trade management interface including trailing profit.',
      tags: ['pending', 'manage', 'cancel', 'snipe-list']
    },
    {
      id: 48,
      category: 'cb_sniper',
      question: 'What fee does the Sniper charge?',
      answer: 'The Sniper charges a 3% fee on executed trades for free users. Pro subscribers ($20/month) pay 0% at the sniper level — only the standard 3% Ultra fee if they choose Ultra routing. Free users who execute with Ultra Buy pay 3% sniper + 3% Ultra = 6% total.',
      tags: ['sniper-fee', 'cost', 'pro', 'pricing']
    },
    {
      id: 49,
      category: 'cb_sniper',
      question: 'Does the Sniper work with any Solana token?',
      answer: 'The Sniper works with any token tradeable on Solana DEXs including Pump.fun launches, Raydium pools, and Orca. It uses DexScreener\'s data pipeline for token detection with fallback resilience so it continues working even if one data source goes down.',
      tags: ['tokens', 'dex', 'raydium', 'pump-fun', 'compatibility']
    },

    // ── CLICKBOT COPY TRADING ─────────────────────────────────────
    {
      id: 50,
      category: 'cb_copytrading',
      question: 'How does ClickBot\'s Copy Trading work?',
      answer: 'You provide a wallet address of a trader you want to copy. ClickBot monitors that wallet\'s on-chain activity in real time. Every time that wallet buys a token, your wallet automatically buys the same token proportionally to the amount you configured. When they sell, you get position management buttons to decide your own exit.',
      tags: ['copy-trading', 'how-it-works', 'wallet', 'mirror']
    },
    {
      id: 51,
      category: 'cb_copytrading',
      question: 'How do I find good wallets to copy?',
      answer: 'ClickBot\'s wallet scanner lets you analyse any Solana wallet address for its historical performance — win rate, average profit, trade frequency, and token types. Look for wallets with consistent win rates above 60%, reasonable trade frequency (not too rapid), and a track record across multiple token types rather than one lucky trade.',
      tags: ['wallet-scanner', 'analysis', 'performance', 'find-wallets']
    },
    {
      id: 52,
      category: 'cb_copytrading',
      question: 'Can I copy multiple wallets at the same time?',
      answer: 'Yes. You can activate copy trading on multiple wallet addresses simultaneously. Each tracked wallet fires independently — when any of them makes a trade, your configured copy amount executes automatically.',
      tags: ['multiple-wallets', 'simultaneous', 'copy-list']
    },
    {
      id: 53,
      category: 'cb_copytrading',
      question: 'How much do I invest per copied trade?',
      answer: 'You set your copy amount when activating a wallet to copy — for example, 0.05 SOL per trade. This is fixed per wallet. When the copied wallet buys 1 SOL worth, you buy 0.05 SOL worth of the same token. You control how much exposure each copy trade gives you.',
      tags: ['copy-amount', 'exposure', 'settings', 'configuration']
    },
    {
      id: 54,
      category: 'cb_copytrading',
      question: 'What fee does Copy Trading charge?',
      answer: 'Copy Trading charges a 1% fee on each copied trade that executes. This is lower than the standard spot trading fee because the system is automated — you are not paying for manual analysis on each individual trade.',
      tags: ['copy-trading-fee', 'cost', 'pricing']
    },
    {
      id: 55,
      category: 'cb_copytrading',
      question: 'Can I stop copying a wallet at any time?',
      answer: 'Yes. You can deactivate a wallet from your copy list at any time via the Copy Trading menu. Existing positions that were opened via copy trades remain open and are managed by you — only future trades from that wallet stop copying.',
      tags: ['stop-copying', 'deactivate', 'control']
    },

    // ── CLICKBOT PERPS ────────────────────────────────────────────
    {
      id: 56,
      category: 'cb_perps',
      question: 'What is Perps Trading on ClickBot?',
      answer: 'Perps (perpetual futures) let you trade with leverage — going long (betting price goes up) or short (betting price goes down) on BTC, ETH, SOL, and other assets, without owning the underlying token. ClickBot\'s perps module is integrated with Drift Protocol on Solana, giving you up to 5x leverage with TP/SL and trailing stops.',
      tags: ['perps', 'leverage', 'futures', 'drift', 'long-short']
    },
    {
      id: 57,
      category: 'cb_perps',
      question: 'Which assets can I trade on perps?',
      answer: 'ClickBot\'s perps module currently supports BTC, ETH, and SOL perpetuals via Drift Protocol. These are the highest-liquidity perps on Solana. More pairs are being added as Drift expands its markets.',
      tags: ['perps-assets', 'btc', 'eth', 'sol', 'drift']
    },
    {
      id: 58,
      category: 'cb_perps',
      question: 'What is the maximum leverage on ClickBot perps?',
      answer: 'ClickBot currently supports up to 5x leverage on perps positions. This is intentionally conservative — high leverage is the fastest way to lose a wallet. We recommend 1-2x for most traders and only scaling up if you actively manage the position.',
      tags: ['leverage', 'max', '5x', 'risk']
    },
    {
      id: 59,
      category: 'cb_perps',
      question: 'Can I set stop-loss and take-profit on perps?',
      answer: 'Yes. Every perps position opened through ClickBot supports take-profit (TP), stop-loss (SL), and trailing stop buttons immediately after opening. You can also update these levels on existing positions from the position management screen.',
      tags: ['stop-loss', 'take-profit', 'trailing', 'position-management']
    },
    {
      id: 60,
      category: 'cb_perps',
      question: 'What is funding rate and how does it affect my perps trade?',
      answer: 'Funding rate is a periodic payment between long and short traders that keeps the perpetual price close to the spot price. If you hold a long position when funding is positive, you pay a small fee to shorts. If funding is negative, you receive payment. ClickBot displays the current funding rate from Hyperliquid data before and during your position so you can factor it into your holding decision.',
      tags: ['funding-rate', 'perps', 'long', 'short', 'hyperliquid']
    },
    {
      id: 61,
      category: 'cb_perps',
      question: 'Is Drift Protocol safe to use?',
      answer: 'Drift is one of the largest and most audited decentralised perpetuals protocols on Solana, with over $1B in cumulative volume. It is non-custodial — Drift never holds your funds, all positions are on-chain. ClickBot interacts with Drift using your bot wallet, meaning you have full on-chain transparency of every position.',
      tags: ['drift', 'safety', 'decentralised', 'audited', 'on-chain']
    },

    // ── CLICKBOT NGN FIAT BRIDGE ──────────────────────────────────
    {
      id: 62,
      category: 'cb_fiat',
      question: 'How do I withdraw my crypto profits to my Nigerian bank account?',
      answer: 'From the Move Money menu in ClickBot, select Withdraw to Bank. Enter your bank account number — ClickBot verifies it instantly. Enter the USDC amount you want to withdraw. Confirm the live NGN rate and fee. Tap confirm. Naira arrives in your bank account typically within 3-5 minutes. No P2P, no third-party exchange required.',
      tags: ['withdrawal', 'bank', 'naira', 'ngn', 'how-to']
    },
    {
      id: 63,
      category: 'cb_fiat',
      question: 'How do I buy USDC with Naira (on-ramp)?',
      answer: 'From Move Money, select Buy USDC with NGN. You receive a dedicated virtual bank account number. Transfer any Naira amount to that account from your Nigerian bank app — same as a normal bank transfer. Within minutes, the equivalent USDC amount lands in your ClickBot wallet at the live exchange rate, ready to trade.',
      tags: ['buy-usdc', 'on-ramp', 'naira', 'virtual-account', 'deposit']
    },
    {
      id: 64,
      category: 'cb_fiat',
      question: 'Which Nigerian banks are supported for withdrawal?',
      answer: 'All Nigerian banks are supported — GTBank, Access, Zenith, First Bank, UBA, Kuda, Opay, Moniepoint, Palmpay, and 200+ others. ClickBot uses Flutterwave\'s payment infrastructure which covers essentially the entire Nigerian banking system.',
      tags: ['banks', 'gtbank', 'access', 'zenith', 'kuda', 'opay', 'flutterwave']
    },
    {
      id: 65,
      category: 'cb_fiat',
      question: 'What is the NGN/USDC exchange rate ClickBot uses?',
      answer: 'ClickBot uses a live market rate sourced in real time. The rate is displayed clearly on the confirmation screen before you confirm any withdrawal or deposit — what you see is exactly what you get. There are no hidden markups on the rate beyond the disclosed 1% service fee.',
      tags: ['exchange-rate', 'live-rate', 'ngn', 'usdc', 'transparent']
    },
    {
      id: 66,
      category: 'cb_fiat',
      question: 'What are the minimum and maximum amounts for NGN transactions?',
      answer: 'The minimum withdrawal to a Nigerian bank is 5 USDC. There is no hard maximum, though very large withdrawals may require additional verification. The minimum on-ramp (buying USDC with Naira) is ₦5,000. Limits may be adjusted based on your verification level.',
      tags: ['minimum', 'maximum', 'limits', 'withdrawal', 'deposit']
    },
    {
      id: 67,
      category: 'cb_fiat',
      question: 'Is BVN verification required for fiat transactions?',
      answer: 'Yes, a one-time BVN verification is required before your first NGN withdrawal or deposit. This is a CBN compliance requirement and takes about 30 seconds. It is a one-time process — once verified, all future transactions require no additional steps.',
      tags: ['bvn', 'kyc', 'verification', 'cbn', 'compliance']
    },
    {
      id: 68,
      category: 'cb_fiat',
      question: 'What is the fee for NGN withdrawals?',
      answer: 'A flat 1% fee is charged on the USDC amount being withdrawn. For example, withdrawing 100 USDC costs 1 USDC — you receive the Naira equivalent of 99 USDC. No other hidden fees. The fee and final Naira amount are shown on the confirmation screen before you tap confirm.',
      tags: ['fee', 'withdrawal-fee', 'transparent', '1-percent']
    },
    {
      id: 69,
      category: 'cb_fiat',
      question: 'What if my bank withdrawal is delayed or fails?',
      answer: 'Most withdrawals complete within 3-5 minutes. If your withdrawal is delayed beyond 15 minutes, contact ClickShift support at support@clickshift.io or message the Telegram support channel. All transactions have a unique reference ID shown in ClickBot — include this in your support message for fastest resolution.',
      tags: ['delayed', 'failed', 'support', 'troubleshoot', 'reference-id']
    },

    // ── CLICKBOT WALLET & SECURITY ────────────────────────────────
    {
      id: 70,
      category: 'cb_wallet',
      question: 'Who controls my ClickBot wallet?',
      answer: 'You do — entirely. ClickBot creates a non-custodial Solana wallet. You receive a 12-word seed phrase that only you have access to. ClickShift cannot access, freeze, or move your funds. Your seed phrase is the only key that controls the wallet — store it somewhere safe and never share it with anyone.',
      tags: ['non-custodial', 'seed-phrase', 'self-custody', 'keys', 'control']
    },
    {
      id: 71,
      category: 'cb_wallet',
      question: 'Can I import my ClickBot wallet into Phantom or another wallet?',
      answer: 'Yes. Your 12-word seed phrase is a standard BIP-39 Solana mnemonic. You can import it into Phantom, Solflare, Backpack, or any Solana-compatible wallet. Your funds are fully portable and not locked into ClickBot.',
      tags: ['phantom', 'import', 'seed-phrase', 'portable', 'bip39']
    },
    {
      id: 72,
      category: 'cb_wallet',
      question: 'Can I use my existing Solana wallet with ClickBot?',
      answer: 'Currently ClickBot works with the wallet it creates for you. You can transfer SOL or USDC from your existing wallet (Phantom, Binance, etc.) into your ClickBot wallet address at any time. Reverse importing an existing private key is on the roadmap.',
      tags: ['existing-wallet', 'import', 'transfer', 'roadmap']
    },
    {
      id: 73,
      category: 'cb_wallet',
      question: 'What happens if I lose access to my Telegram account?',
      answer: 'Your funds are tied to your wallet\'s seed phrase, not your Telegram account. As long as you have your 12-word seed phrase, you can recover your wallet in any Solana-compatible app and access your funds. This is why saving your seed phrase securely at setup is critical.',
      tags: ['telegram-loss', 'recovery', 'seed-phrase', 'access', 'backup']
    },
    {
      id: 74,
      category: 'cb_wallet',
      question: 'Is it safe to hold large amounts in my ClickBot wallet?',
      answer: 'ClickBot wallets are non-custodial — no one but you can access them. However, hot wallets (internet-connected wallets) carry inherent risk compared to hardware wallets. We recommend keeping only your active trading capital in ClickBot and moving larger holdings to a hardware wallet (Ledger) for long-term storage.',
      tags: ['security', 'hot-wallet', 'hardware-wallet', 'large-amounts', 'risk']
    },
    {
      id: 75,
      category: 'cb_wallet',
      question: 'Can I transfer SOL or tokens to another wallet from ClickBot?',
      answer: 'Yes. From the Move Money menu, select Transfer. Enter the destination wallet address and the amount of SOL or token you want to send. ClickBot will show you the estimated network fee before you confirm. Standard Solana network transfer fees apply (typically less than $0.01).',
      tags: ['transfer', 'send', 'move-money', 'withdraw', 'network-fee']
    },

  ], []);

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
  }, [faqs, categories]);

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

  // Group categories for sidebar rendering
  const platformCategories = categoriesWithCounts.filter(c => c.group === 'platform' || c.id === 'all');
  const clickbotCategories  = categoriesWithCounts.filter(c => c.group === 'clickbot');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked
            <br />
            Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to know about ClickShift's intelligent terminal and ClickBot, our Telegram trading assistant. 
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

                {/* ── ClickShift Platform ── */}
                <h3 className="font-bold text-lg mb-1">Categories</h3>
                <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider">ClickShift Platform</p>
                <div className="space-y-2 mb-6">
                  {platformCategories.map((category) => (
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

                {/* ── ClickBot ── */}
                <div className="border-t border-slate-700 pt-4 mb-2">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">ClickBot</p>
                    <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                  <div className="space-y-2">
                    {clickbotCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-green-600 text-white'
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
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
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
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
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

                {/* ClickBot CTA */}
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold mb-1 text-green-400">Try ClickBot Free</h4>
                  <p className="text-sm text-slate-300 mb-3">
                    Trade Solana tokens directly from Telegram.
                  </p>
                  <a 
                    href="https://t.me/clicksolbot"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold transition-all"
                  >
                    Open ClickBot →
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {/* Section heading when a ClickBot category is active */}
              {selectedCategory.startsWith('cb_') && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                  <Bot className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-400">ClickBot — Telegram Trading Assistant</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Questions about our Telegram bot for Solana trading. 
                      <a href="https://t.me/clicksolbot" target="_blank" rel="noreferrer" className="text-green-400 ml-1 hover:underline">
                        Open ClickBot →
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {selectedCategory === 'clickbot' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                  <Bot className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-400">ClickBot — Telegram Trading Assistant</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      General questions about ClickBot. 
                      <a href="https://t.me/clicksolbot" target="_blank" rel="noreferrer" className="text-green-400 ml-1 hover:underline">
                        Open ClickBot →
                      </a>
                    </p>
                  </div>
                </div>
              )}

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
                      className={`rounded-xl border overflow-hidden transition-all ${
                        faq.category.startsWith('cb_') || faq.category === 'clickbot'
                          ? 'bg-slate-800/50 border-slate-700 hover:border-green-500/50'
                          : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'
                      }`}
                    >
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all"
                      >
                        <div className="flex items-start gap-3 pr-4">
                          {(faq.category.startsWith('cb_') || faq.category === 'clickbot') && (
                            <Bot className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
                          )}
                          <h3 className="font-semibold text-lg">{faq.question}</h3>
                        </div>
                        {expandedItems.has(faq.id) ? (
                          <ChevronDown className={`h-5 w-5 flex-shrink-0 ${
                            faq.category.startsWith('cb_') || faq.category === 'clickbot'
                              ? 'text-green-400' : 'text-blue-400'
                          }`} />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedItems.has(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-slate-700 pt-4">
                            {faq.hasLink ? (
                              <p className="text-slate-300 leading-relaxed mb-4">
                                {faq.answer.split(`'${faq.linkText}'`).map((part, index, array) => (
                                  <span key={index}>
                                    {part}
                                    {index < array.length - 1 && (
                                      <Link href={faq.linkUrl!} className="text-blue-400 hover:text-blue-300 underline hover:no-underline font-semibold transition-all">
                                        '{faq.linkText}'
                                      </Link>
                                    )}
                                  </span>
                                ))}
                              </p>
                            ) : (
                              <p className="text-slate-300 leading-relaxed mb-4">
                                {faq.answer}
                              </p>
                            )}
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 text-slate-300 text-xs rounded cursor-pointer transition-all ${
                                    faq.category.startsWith('cb_') || faq.category === 'clickbot'
                                      ? 'bg-slate-700 hover:bg-green-600'
                                      : 'bg-slate-700 hover:bg-blue-500'
                                  }`}
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
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-all">
              <Bot className="h-8 w-8 text-green-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">ClickBot on Telegram</h3>
              <p className="text-slate-300 text-sm mb-4">
                Trade Solana tokens, snipe launches, copy alpha wallets, and cash out to your Nigerian bank — all from Telegram.
              </p>
              <a href="https://t.me/clicksolbot" target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 text-sm font-semibold">
                Open ClickBot →
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