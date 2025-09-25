"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { 
  Shield, 
  Scale, 
  AlertTriangle, 
  FileText, 
  Users,
  CreditCard,
  Code,
  Globe,
  Lock,
  Gavel,
  Calendar,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

const TermsOfServicePage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: <CheckCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            By accessing or using ClickShift's platform, services, or APIs (collectively, the "Services"), 
            you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
            do not use our Services.
          </p>
          
          <h4 className="font-semibold">Binding Agreement:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• These Terms constitute a legally binding agreement between you and ClickShift Intelligence Inc.</li>
            <li>• By creating an account, you acknowledge reading and understanding these Terms</li>
            <li>• Continued use of our Services constitutes ongoing acceptance of any Terms updates</li>
            <li>• If you use our Services on behalf of an organization, you represent that you have authority to bind that organization</li>
          </ul>

          <h4 className="font-semibold mt-4">Eligibility Requirements:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• You must be at least 18 years old to use our Services</li>
            <li>• You must have the legal capacity to enter into binding agreements</li>
            <li>• Your use must comply with all applicable laws in your jurisdiction</li>
            <li>• You must not be prohibited from using our Services under any applicable law</li>
          </ul>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-red-400 font-semibold mb-2">Important:</h5>
            <p className="text-slate-300 text-sm">
              Trading and financial services involve significant risk. These Terms include important 
              limitations on our liability and your rights. Please read them carefully.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'services-description',
      title: '2. Description of Services',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            ClickShift provides AI-powered trading intelligence and analysis tools for 
            decentralized finance (DeFi) and cryptocurrency markets.
          </p>
          
          <h4 className="font-semibold">Core Services:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>ClickShift Alpha:</strong> Predictive intelligence for Solana token analysis</li>
            <li>• <strong>ClickShift Leverage:</strong> Advanced futures trading risk analysis</li>
            <li>• <strong>Whale Detection:</strong> Large transaction monitoring and alerts</li>
            <li>• <strong>Exit Cluster Prediction:</strong> AI-powered sell pressure analysis</li>
            <li>• <strong>API Services:</strong> Programmatic access to our intelligence platform</li>
            <li>• <strong>Educational Content:</strong> Trading education and market analysis</li>
          </ul>

          <h4 className="font-semibold mt-4">Service Limitations:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Our Services provide analysis and information, not investment advice</li>
            <li>• We do not provide custody, wallet, or fund management services</li>
            <li>• We do not execute trades or have access to your funds</li>
            <li>• All trading decisions remain solely your responsibility</li>
            <li>• Service availability may vary by geographic location</li>
          </ul>

          <h4 className="font-semibold mt-4">Beta and Experimental Features:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Some features may be offered in beta or experimental status</li>
            <li>• Beta features may have reduced reliability or different terms</li>
            <li>• We may discontinue or modify beta features without notice</li>
            <li>• Your feedback helps us improve these experimental offerings</li>
          </ul>
        </div>
      )
    },
    {
      id: 'user-accounts',
      title: '3. User Accounts and Registration',
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Account Creation:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• You must provide accurate and complete information during registration</li>
            <li>• You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>• You must promptly update your information if it changes</li>
            <li>• One person or entity may only maintain one account unless explicitly permitted</li>
          </ul>

          <h4 className="font-semibold mt-4">Account Security:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Use strong, unique passwords and enable two-factor authentication when available</li>
            <li>• Notify us immediately of any unauthorized access or security breaches</li>
            <li>• You are liable for all activities that occur under your account</li>
            <li>• We may require additional verification for security purposes</li>
          </ul>

          <h4 className="font-semibold mt-4">Account Suspension and Termination:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We may suspend or terminate accounts that violate these Terms</li>
            <li>• You may close your account at any time through your account settings</li>
            <li>• Upon termination, your right to use the Services ceases immediately</li>
            <li>• We will retain some information as required by law or for legitimate business purposes</li>
          </ul>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-yellow-400 font-semibold mb-2">Account Responsibility:</h5>
            <p className="text-slate-300 text-sm">
              You are fully responsible for all activity under your account. Keep your 
              login credentials secure and notify us immediately of any unauthorized access.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'acceptable-use',
      title: '4. Acceptable Use Policy',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            You agree to use our Services only for lawful purposes and in accordance with these Terms.
          </p>
          
          <h4 className="font-semibold">Permitted Uses:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Personal or commercial analysis of cryptocurrency markets</li>
            <li>• Integration of our APIs into legitimate trading applications</li>
            <li>• Educational use of our platform for learning about DeFi markets</li>
            <li>• Sharing non-proprietary insights derived from our analysis</li>
          </ul>

          <h4 className="font-semibold mt-4">Prohibited Activities:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Market Manipulation:</strong> Using our Services to manipulate token prices or markets</li>
            <li>• <strong>Illegal Activities:</strong> Money laundering, fraud, or other criminal activities</li>
            <li>• <strong>System Abuse:</strong> Attempting to hack, disrupt, or overload our systems</li>
            <li>• <strong>Data Scraping:</strong> Automated data extraction beyond permitted API usage</li>
            <li>• <strong>Reverse Engineering:</strong> Attempting to reverse engineer our algorithms</li>
            <li>• <strong>Competitive Use:</strong> Using our Services to build competing products</li>
            <li>• <strong>False Information:</strong> Providing false or misleading account information</li>
            <li>• <strong>Third-party Rights:</strong> Violating intellectual property or privacy rights</li>
          </ul>

          <h4 className="font-semibold mt-4">API-Specific Rules:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Respect rate limits and don't attempt to circumvent them</li>
            <li>• Don't share API keys or use another user's API access</li>
            <li>• Comply with all documentation and integration guidelines</li>
            <li>• Report bugs and vulnerabilities responsibly</li>
          </ul>

          <h4 className="font-semibold mt-4">Consequences of Violation:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Immediate suspension or termination of your account</li>
            <li>• Legal action for damages or injunctive relief</li>
            <li>• Cooperation with law enforcement investigations</li>
            <li>• Permanent ban from using our Services</li>
          </ul>
        </div>
      )
    },
    {
      id: 'payment-terms',
      title: '5. Payment Terms and Billing',
      icon: <CreditCard className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Subscription Plans:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Free Tier:</strong> Limited analysis with basic features</li>
            <li>• <strong>Professional:</strong> Monthly or annual subscription with full features</li>
            <li>• <strong>Elite:</strong> Advanced features with priority support</li>
            <li>• <strong>Enterprise:</strong> Custom pricing with dedicated support</li>
          </ul>

          <h4 className="font-semibold mt-4">Billing and Payment:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Subscriptions are billed in advance on a monthly or annual basis</li>
            <li>• All fees are non-refundable except as expressly stated in our refund policy</li>
            <li>• We accept major credit cards, PayPal, and approved cryptocurrency payments</li>
            <li>• You authorize us to charge your chosen payment method for all fees</li>
            <li>• Failed payments may result in service suspension after a grace period</li>
          </ul>

          <h4 className="font-semibold mt-4">Taxes:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• You are responsible for all applicable taxes on your subscription</li>
            <li>• We may collect and remit taxes as required by law</li>
            <li>• Enterprise customers may be subject to different tax arrangements</li>
          </ul>

          <h4 className="font-semibold mt-4">Price Changes:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We may change subscription prices with 30 days' advance notice</li>
            <li>• Current subscribers will maintain their pricing until the next billing cycle</li>
            <li>• Annual subscribers are protected from price increases during their term</li>
            <li>• You may cancel before price changes take effect</li>
          </ul>

          <h4 className="font-semibold mt-4">Refund Policy:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• 14-day money-back guarantee for new subscribers to paid plans</li>
            <li>• Refunds processed within 5-10 business days to original payment method</li>
            <li>• API overage fees and enterprise contracts may have different refund terms</li>
            <li>• Abuse of refund policy may result in account termination</li>
          </ul>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: '6. Intellectual Property Rights',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Our Intellectual Property:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• ClickShift owns all rights to our platform, algorithms, and proprietary technology</li>
            <li>• Our trademarks, logos, and brand materials are protected intellectual property</li>
            <li>• Patent-pending algorithms for exit cluster detection and predictive analysis</li>
            <li>• Copyrighted content including documentation, educational materials, and user interfaces</li>
          </ul>

          <h4 className="font-semibold mt-4">License to Use:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We grant you a limited, non-exclusive license to use our Services</li>
            <li>• This license is personal to you and cannot be transferred or sublicensed</li>
            <li>• The license terminates when your account is closed or these Terms end</li>
            <li>• You may not modify, adapt, or create derivative works from our Services</li>
          </ul>

          <h4 className="font-semibold mt-4">Your Content and Data:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• You retain ownership of any content you submit to our Services</li>
            <li>• You grant us a license to use your content to provide and improve our Services</li>
            <li>• We do not claim ownership of your trading strategies or investment decisions</li>
            <li>• You warrant that your content does not violate third-party rights</li>
          </ul>

          <h4 className="font-semibold mt-4">Feedback and Suggestions:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Any feedback or suggestions you provide may be used freely by ClickShift</li>
            <li>• You waive any rights to compensation for feedback that we implement</li>
            <li>• Feedback helps us improve our Services for all users</li>
          </ul>

          <h4 className="font-semibold mt-4">Copyright Protection:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We respect intellectual property rights and expect users to do the same</li>
            <li>• Report copyright infringement to legal@clickshift.io</li>
            <li>• We will respond to valid DMCA takedown notices</li>
            <li>• Repeat infringers may have their accounts terminated</li>
          </ul>
        </div>
      )
    },
    {
      id: 'disclaimers',
      title: '7. Disclaimers and Risk Warnings',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="text-red-400 font-semibold mb-2">⚠️ Important Risk Warning:</h5>
            <p className="text-slate-300 text-sm">
              Trading cryptocurrencies and DeFi tokens involves substantial risk of loss. 
              You may lose some or all of your investment. Never invest more than you can afford to lose.
            </p>
          </div>

          <h4 className="font-semibold">Service Disclaimers:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Not Investment Advice:</strong> Our Services provide information and analysis, not personalized investment advice</li>
            <li>• <strong>No Guarantees:</strong> Past performance does not guarantee future results</li>
            <li>• <strong>Accuracy Limitations:</strong> While we strive for accuracy, predictions may be incorrect</li>
            <li>• <strong>Market Volatility:</strong> Cryptocurrency markets are highly volatile and unpredictable</li>
            <li>• <strong>Technical Risks:</strong> Blockchain technology and smart contracts carry inherent risks</li>
          </ul>

          <h4 className="font-semibold mt-4">Platform Availability:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Services are provided "as is" without warranties of any kind</li>
            <li>• We do not guarantee uninterrupted or error-free service</li>
            <li>• Planned and unplanned maintenance may cause temporary outages</li>
            <li>• Third-party integrations may affect service availability</li>
          </ul>

          <h4 className="font-semibold mt-4">Regulatory Considerations:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Cryptocurrency regulations vary by jurisdiction and may change</li>
            <li>• You are responsible for compliance with applicable laws</li>
            <li>• Some features may not be available in certain jurisdictions</li>
            <li>• Tax implications of trading vary by location and circumstances</li>
          </ul>

          <h4 className="font-semibold mt-4">Third-party Risks:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We integrate with third-party services that have their own risks</li>
            <li>• Exchange outages or issues may affect our data quality</li>
            <li>• Blockchain network congestion may impact analysis accuracy</li>
            <li>• Smart contract vulnerabilities are beyond our control</li>
          </ul>
        </div>
      )
    },
    {
      id: 'limitation-liability',
      title: '8. Limitation of Liability',
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h5 className="text-yellow-400 font-semibold mb-2">Liability Limitation:</h5>
            <p className="text-slate-300 text-sm">
              To the maximum extent permitted by law, ClickShift's total liability for any claims 
              related to our Services shall not exceed the amount you paid us in the 12 months 
              preceding the claim.
            </p>
          </div>

          <h4 className="font-semibold">Exclusion of Damages:</h4>
          <p className="text-slate-300 mb-2">ClickShift shall not be liable for:</p>
          <ul className="space-y-2 text-slate-300">
            <li>• Trading losses or investment losses of any kind</li>
            <li>• Lost profits, revenue, or business opportunities</li>
            <li>• Indirect, consequential, or punitive damages</li>
            <li>• Damages resulting from third-party actions or services</li>
            <li>• Loss of data or information (except as required by law)</li>
            <li>• Business interruption or system downtime</li>
          </ul>

          <h4 className="font-semibold mt-4">Trading-Specific Limitations:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We are not liable for market movements contrary to our predictions</li>
            <li>• Technical analysis and predictions are subject to market risks</li>
            <li>• You acknowledge that all trading involves risk of loss</li>
            <li>• Our tools are aids to decision-making, not guarantees of outcomes</li>
          </ul>

          <h4 className="font-semibold mt-4">Force Majeure:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We are not liable for delays or failures due to circumstances beyond our control</li>
            <li>• This includes natural disasters, government actions, or network failures</li>
            <li>• Blockchain network issues or cryptocurrency exchange problems</li>
            <li>• Cyberattacks, system intrusions, or other security incidents</li>
          </ul>

          <h4 className="font-semibold mt-4">Jurisdictional Variations:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Some jurisdictions do not allow limitation of liability</li>
            <li>• In such cases, our liability is limited to the minimum extent permitted</li>
            <li>• Consumer protection laws may provide additional rights</li>
            <li>• Enterprise customers may negotiate different liability terms</li>
          </ul>
        </div>
      )
    },
    {
      id: 'indemnification',
      title: '9. Indemnification',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Your Indemnification Obligations:</h4>
          <p className="text-slate-300 mb-2">
            You agree to indemnify, defend, and hold harmless ClickShift, its officers, directors, 
            employees, and agents from any claims, damages, or expenses arising from:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li>• Your use or misuse of our Services</li>
            <li>• Your violation of these Terms or applicable laws</li>
            <li>• Your trading activities and investment decisions</li>
            <li>• Content you submit that violates third-party rights</li>
            <li>• Your breach of representations or warranties</li>
            <li>• Negligent or wrongful conduct by you or your agents</li>
          </ul>

          <h4 className="font-semibold mt-4">Scope of Indemnification:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Includes reasonable attorney fees and court costs</li>
            <li>• Covers both direct claims and third-party claims</li>
            <li>• Applies to claims arising during or after your use of our Services</li>
            <li>• We will notify you promptly of any claims requiring indemnification</li>
          </ul>

          <h4 className="font-semibold mt-4">Defense and Settlement:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We may assume defense of any claim at our discretion</li>
            <li>• You may not settle claims without our written consent</li>
            <li>• We will cooperate in the defense of legitimate claims</li>
            <li>• Indemnification survives termination of your account</li>
          </ul>
        </div>
      )
    },
    {
      id: 'termination',
      title: '10. Termination',
      icon: <XCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Termination by You:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• You may close your account at any time through account settings</li>
            <li>• Cancellation stops future billing but doesn't refund current period</li>
            <li>• You remain liable for any outstanding fees or obligations</li>
            <li>• API access terminates immediately upon account closure</li>
          </ul>

          <h4 className="font-semibold mt-4">Termination by ClickShift:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We may terminate your account for violation of these Terms</li>
            <li>• Immediate termination for serious violations (fraud, illegal activity)</li>
            <li>• 30 days' notice for non-material breaches that remain uncured</li>
            <li>• We may terminate or discontinue Services with reasonable notice</li>
          </ul>

          <h4 className="font-semibold mt-4">Effects of Termination:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Immediate loss of access to paid features and services</li>
            <li>• API keys become invalid and all integrations stop working</li>
            <li>• Your data may be deleted after a reasonable retention period</li>
            <li>• Outstanding obligations and liability limitations survive termination</li>
          </ul>

          <h4 className="font-semibold mt-4">Data Retention After Termination:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Account data retained for 90 days to allow account recovery</li>
            <li>• Some data retained longer for legal compliance or security</li>
            <li>• You may request immediate data deletion (subject to legal requirements)</li>
            <li>• Aggregated and anonymized data may be retained indefinitely</li>
          </ul>
        </div>
      )
    },
    {
      id: 'governing-law',
      title: '11. Governing Law and Disputes',
      icon: <Gavel className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Governing Law:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• These Terms are governed by the laws of Delaware, United States</li>
            <li>• Federal law applies where applicable</li>
            <li>• Consumer protection laws of your jurisdiction may also apply</li>
            <li>• International users may have additional rights under local law</li>
          </ul>

          <h4 className="font-semibold mt-4">Dispute Resolution:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Informal Resolution:</strong> Contact trust@clickshift.io to attempt resolution</li>
            <li>• <strong>Arbitration:</strong> Most disputes must be resolved through binding arbitration</li>
            <li>• <strong>Small Claims:</strong> Claims under $10,000 may be filed in small claims court</li>
            <li>• <strong>Injunctive Relief:</strong> We may seek court orders for intellectual property violations</li>
          </ul>

          <h4 className="font-semibold mt-4">Arbitration Rules:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Arbitration conducted under American Arbitration Association rules</li>
            <li>• Single arbitrator chosen through AAA procedures</li>
            <li>• Arbitration held in Delaware or your home state</li>
            <li>• Each party bears their own attorney fees unless law requires otherwise</li>
          </ul>

          <h4 className="font-semibold mt-4">Class Action Waiver:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• You waive the right to participate in class action lawsuits</li>
            <li>• Claims must be brought individually, not as part of a group</li>
            <li>• This waiver may not apply where prohibited by law</li>
            <li>• Jury trial rights are waived for arbitrable disputes</li>
          </ul>

          <h4 className="font-semibold mt-4">International Users:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• EU users may have additional rights under European law</li>
            <li>• Some jurisdictions may not enforce arbitration clauses</li>
            <li>• Local consumer protection laws may provide additional remedies</li>
            <li>• Contact us for information about rights in your jurisdiction</li>
          </ul>
        </div>
      )
    },
    {
      id: 'miscellaneous',
      title: '12. Miscellaneous Provisions',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Changes to Terms:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We may update these Terms from time to time</li>
            <li>• Material changes will be communicated via email or platform notice</li>
            <li>• Changes take effect 30 days after notification</li>
            <li>• Continued use constitutes acceptance of updated Terms</li>
          </ul>

          <h4 className="font-semibold mt-4">Severability:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• If any provision is found unenforceable, the rest remains in effect</li>
            <li>• Unenforceable provisions will be modified to be enforceable while preserving intent</li>
            <li>• The overall agreement remains valid despite individual provision issues</li>
          </ul>

          <h4 className="font-semibold mt-4">Assignment:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We may assign these Terms in connection with business transfers</li>
            <li>• You may not assign your rights without our written consent</li>
            <li>• Terms bind successors and permitted assigns</li>
          </ul>

          <h4 className="font-semibold mt-4">Entire Agreement:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• These Terms constitute the complete agreement between parties</li>
            <li>• Supersedes all prior agreements and understandings</li>
            <li>• Can only be modified in writing signed by ClickShift</li>
            <li>• Incorporated documents (Privacy Policy, etc.) are part of the agreement</li>
          </ul>

          <h4 className="font-semibold mt-4">Survival:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Certain provisions survive termination of your account</li>
            <li>• Includes intellectual property, liability limitation, and indemnification</li>
            <li>• Payment obligations and dispute resolution also survive</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Scale className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            These Terms govern your use of ClickShift's trading intelligence platform. 
            Please read them carefully as they contain important information about your rights and obligations.
          </p>

          {/* Key Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="font-bold">Effective Date</div>
              <div className="text-sm text-slate-400">January 22, 2025</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="font-bold">Governing Law</div>
              <div className="text-sm text-slate-400">Delaware, USA</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Gavel className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="font-bold">Dispute Resolution</div>
              <div className="text-sm text-slate-400">Binding Arbitration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Important Notice */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <span>Important Legal Notice</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-red-400">Trading Risks:</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Cryptocurrency trading involves substantial risk</li>
                  <li>• You may lose some or all of your investment</li>
                  <li>• Our Services provide analysis, not investment advice</li>
                  <li>• Past performance doesn't guarantee future results</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-red-400">Legal Requirements:</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• You must be 18+ years old to use our Services</li>
                  <li>• Comply with all applicable laws in your jurisdiction</li>
                  <li>• Report suspicious or illegal activity</li>
                  <li>• Understand your tax obligations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-400">{section.icon}</div>
                    <h3 className="font-bold text-lg">{section.title}</h3>
                  </div>
                  <ArrowRight className={`h-5 w-5 text-slate-400 transition-transform ${expandedSection === section.id ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedSection === section.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-slate-700 pt-4">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-400" />
              <span>Legal Contact Information</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">General Legal Inquiries</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span>legal@clickshift.io</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    For terms questions, licensing, and compliance
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Disputes and Claims</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Gavel className="h-4 w-4 text-orange-400" />
                    <span>disputes@clickshift.io</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    For formal disputes requiring legal resolution
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Company Information</h4>
              <div className="text-slate-300 text-sm space-y-1">
                <p>ClickShift Intelligence Inc.</p>
                <p>Incorporated in Delaware, United States</p>
                <p>Registered Address: [Corporate Address]</p>
                <p>For service of legal process: legal@clickshift.io</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2 text-sm text-slate-400 border-t border-slate-700 pt-8">
            <p>ClickShift Intelligence Inc. © 2025</p>
            <p>These Terms of Service are effective as of January 22, 2025</p>
            <p>For the most current version, visit clickshift.io/terms</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
              <a href="/risk-disclosure" className="text-blue-400 hover:text-blue-300">Risk Disclosure</a>
              <a href="/contact" className="text-blue-400 hover:text-blue-300">Contact Legal</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;