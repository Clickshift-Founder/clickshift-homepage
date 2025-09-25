"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Globe, 
  UserCheck,
  AlertCircle,
  Mail,
  Calendar,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const PrivacyPolicyPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 'information-collection',
      title: '1. Information We Collect',
      icon: <Database className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Information You Provide to Us:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Account Information:</strong> Email address, username, and password when you create an account</li>
            <li>• <strong>Profile Information:</strong> Optional display name, trading preferences, and communication settings</li>
            <li>• <strong>Payment Information:</strong> Payment details processed securely through our payment providers (we do not store credit card numbers)</li>
            <li>• <strong>Communication Data:</strong> Messages you send to our support team, feedback, and survey responses</li>
          </ul>
          
          <h4 className="font-semibold mt-6">Information We Collect Automatically:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Usage Data:</strong> How you interact with our platform, features used, time spent, and analysis patterns</li>
            <li>• <strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li>• <strong>Performance Data:</strong> API response times, error logs, and system performance metrics</li>
            <li>• <strong>Analytics Data:</strong> Aggregated usage statistics to improve our services</li>
          </ul>

          <h4 className="font-semibold mt-6">Information From Third Parties:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Blockchain Data:</strong> Public blockchain information for token analysis (no personal data)</li>
            <li>• <strong>Market Data:</strong> Trading data from exchanges and data providers for analysis purposes</li>
            <li>• <strong>Authentication Providers:</strong> If you sign in through Google or other OAuth providers</li>
          </ul>
        </div>
      )
    },
    {
      id: 'information-use',
      title: '2. How We Use Your Information',
      icon: <Eye className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">We use your information for the following purposes:</p>
          
          <h4 className="font-semibold">Service Provision:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Provide trading intelligence analysis and predictions</li>
            <li>• Deliver whale alerts and market notifications</li>
            <li>• Process API requests and maintain service availability</li>
            <li>• Customize your trading dashboard and preferences</li>
          </ul>

          <h4 className="font-semibold mt-4">Communication:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Send important service updates and security notifications</li>
            <li>• Provide customer support and respond to inquiries</li>
            <li>• Send marketing communications (with your consent)</li>
            <li>• Deliver educational content about trading and market analysis</li>
          </ul>

          <h4 className="font-semibold mt-4">Platform Improvement:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Analyze usage patterns to improve our AI algorithms</li>
            <li>• Monitor platform performance and fix technical issues</li>
            <li>• Develop new features based on user feedback</li>
            <li>• Conduct research to enhance prediction accuracy</li>
          </ul>

          <h4 className="font-semibold mt-4">Legal and Security:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Comply with legal obligations and regulatory requirements</li>
            <li>• Detect and prevent fraud, abuse, and security threats</li>
            <li>• Enforce our Terms of Service and other policies</li>
            <li>• Protect the rights and safety of our users and the public</li>
          </ul>
        </div>
      )
    },
    {
      id: 'information-sharing',
      title: '3. Information Sharing and Disclosure',
      icon: <UserCheck className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">We do not sell your personal information.</p>
            <p className="text-slate-300 text-sm">Your trading data and personal information remain private and are never sold to third parties.</p>
          </div>

          <h4 className="font-semibold">We may share your information in these limited circumstances:</h4>
          
          <h5 className="font-semibold mt-4">Service Providers:</h5>
          <ul className="space-y-2 text-slate-300">
            <li>• Cloud hosting providers (Vercel, AWS) for platform infrastructure</li>
            <li>• Payment processors (Stripe) for subscription billing</li>
            <li>• Email service providers for communications</li>
            <li>• Analytics providers for platform improvement</li>
          </ul>

          <h5 className="font-semibold mt-4">Legal Requirements:</h5>
          <ul className="space-y-2 text-slate-300">
            <li>• When required by law, court order, or legal process</li>
            <li>• To comply with regulatory requirements in our operating jurisdictions</li>
            <li>• To protect our rights, property, or safety, or that of our users</li>
            <li>• In connection with the investigation of suspected illegal activities</li>
          </ul>

          <h5 className="font-semibold mt-4">Business Transfers:</h5>
          <ul className="space-y-2 text-slate-300">
            <li>• In the event of a merger, acquisition, or sale of assets</li>
            <li>• During due diligence processes (with appropriate safeguards)</li>
            <li>• As part of bankruptcy or similar proceedings</li>
          </ul>

          <h5 className="font-semibold mt-4">Aggregated Data:</h5>
          <ul className="space-y-2 text-slate-300">
            <li>• Anonymized and aggregated statistics about platform usage</li>
            <li>• Market research and industry reports (no personal identification)</li>
            <li>• Public dashboards showing general platform metrics</li>
          </ul>
        </div>
      )
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">We implement industry-standard security measures to protect your information:</p>
          
          <h4 className="font-semibold">Technical Safeguards:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Encryption:</strong> AES-256 encryption for data at rest and TLS 1.3 for data in transit</li>
            <li>• <strong>Access Controls:</strong> Multi-factor authentication and role-based access controls</li>
            <li>• <strong>Infrastructure:</strong> SOC2 Type II compliant hosting with enterprise security</li>
            <li>• <strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection systems</li>
          </ul>

          <h4 className="font-semibold mt-4">Operational Safeguards:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Regular security audits and penetration testing</li>
            <li>• Employee training on data protection and privacy practices</li>
            <li>• Incident response procedures for security breaches</li>
            <li>• Regular backup and disaster recovery testing</li>
          </ul>

          <h4 className="font-semibold mt-4">Data Minimization:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We collect only the minimum data necessary for our services</li>
            <li>• API keys and sensitive data are hashed and encrypted</li>
            <li>• Regular purging of unnecessary logs and temporary data</li>
            <li>• No storage of wallet private keys or sensitive financial information</li>
          </ul>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <p className="text-yellow-400 font-semibold mb-2">Important Note:</p>
            <p className="text-slate-300 text-sm">While we implement strong security measures, no system is 100% secure. Please use strong passwords and keep your account credentials confidential.</p>
          </div>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: '5. Your Rights and Choices',
      icon: <CheckCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">You have the following rights regarding your personal information:</p>
          
          <h4 className="font-semibold">Access and Portability:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Right to Access:</strong> Request a copy of your personal data we hold</li>
            <li>• <strong>Data Portability:</strong> Export your data in a machine-readable format</li>
            <li>• <strong>Account Dashboard:</strong> View and manage your data through your account settings</li>
          </ul>

          <h4 className="font-semibold mt-4">Correction and Updates:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal data</li>
            <li>• <strong>Profile Updates:</strong> Update your account information and preferences anytime</li>
            <li>• <strong>Contact Preferences:</strong> Manage your communication settings and subscriptions</li>
          </ul>

          <h4 className="font-semibold mt-4">Deletion and Restrictions:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
            <li>• <strong>Account Deletion:</strong> Permanently delete your account and associated data</li>
            <li>• <strong>Processing Restrictions:</strong> Limit how we process your personal data</li>
          </ul>

          <h4 className="font-semibold mt-4">Objection and Consent:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
            <li>• <strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
            <li>• <strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
          </ul>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
            <h5 className="text-blue-400 font-semibold mb-2">How to Exercise Your Rights:</h5>
            <p className="text-slate-300 text-sm mb-2">To exercise any of these rights, contact us at:</p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Email: privacy@clickshift.io</li>
              <li>• Response time: Within 30 days (as required by GDPR)</li>
              <li>• Verification: We may request identity verification for security</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      icon: <Calendar className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">We retain your information only as long as necessary for the purposes outlined in this policy:</p>
          
          <h4 className="font-semibold">Account Data:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Active Accounts:</strong> Retained while your account is active and for 90 days after deactivation</li>
            <li>• <strong>Payment Data:</strong> Billing information retained for 7 years for tax and accounting purposes</li>
            <li>• <strong>Support Communications:</strong> Retained for 3 years to improve our services</li>
          </ul>

          <h4 className="font-semibold mt-4">Usage and Analytics Data:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Platform Analytics:</strong> Aggregated data retained indefinitely (anonymized)</li>
            <li>• <strong>API Logs:</strong> Retained for 12 months for debugging and security</li>
            <li>• <strong>Performance Metrics:</strong> Retained for 24 months for service improvement</li>
          </ul>

          <h4 className="font-semibold mt-4">Legal and Compliance:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Regulatory Requirements:</strong> Some data may be retained longer to comply with applicable laws</li>
            <li>• <strong>Legal Disputes:</strong> Data may be retained during active legal proceedings</li>
            <li>• <strong>Security Incidents:</strong> Security logs retained as needed for investigations</li>
          </ul>

          <h4 className="font-semibold mt-4">Automated Deletion:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Temporary files and cached data are automatically deleted</li>
            <li>• Expired session tokens and temporary authentication data</li>
            <li>• Old backup files beyond retention periods</li>
          </ul>
        </div>
      )
    },
    {
      id: 'international-transfers',
      title: '7. International Data Transfers',
      icon: <Globe className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">ClickShift operates globally and may transfer your data across borders:</p>
          
          <h4 className="font-semibold">Transfer Safeguards:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Adequacy Decisions:</strong> We prioritize transfers to countries with GDPR adequacy decisions</li>
            <li>• <strong>Standard Contractual Clauses:</strong> Use EU-approved contractual protections for other transfers</li>
            <li>• <strong>Privacy Shield:</strong> Work with US companies certified under successor frameworks</li>
            <li>• <strong>Binding Corporate Rules:</strong> Internal policies ensuring consistent protection globally</li>
          </ul>

          <h4 className="font-semibold mt-4">Data Locations:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Primary Hosting:</strong> United States (Vercel/AWS) with GDPR compliance measures</li>
            <li>• <strong>Backup Storage:</strong> European Union for EU user data</li>
            <li>• <strong>CDN:</strong> Global content delivery network for performance</li>
            <li>• <strong>Support Services:</strong> May involve staff in various global locations</li>
          </ul>

          <h4 className="font-semibold mt-4">Your Control:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• You can request information about where your data is processed</li>
            <li>• Object to transfers that don't meet your privacy expectations</li>
            <li>• Request data be processed only in specific jurisdictions (Enterprise plans)</li>
          </ul>
        </div>
      )
    },
    {
      id: 'cookies-tracking',
      title: '8. Cookies and Tracking',
      icon: <Database className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">We use cookies and similar technologies to improve your experience:</p>
          
          <h4 className="font-semibold">Types of Cookies:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Essential Cookies:</strong> Required for platform functionality (login, security, preferences)</li>
            <li>• <strong>Performance Cookies:</strong> Help us understand how you use our platform</li>
            <li>• <strong>Analytics Cookies:</strong> Google Analytics and similar tools (anonymized)</li>
            <li>• <strong>Marketing Cookies:</strong> For advertising and remarketing (with consent)</li>
          </ul>

          <h4 className="font-semibold mt-4">Managing Cookies:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Cookie Settings:</strong> Manage preferences in your account settings</li>
            <li>• <strong>Browser Controls:</strong> Most browsers allow you to control cookies</li>
            <li>• <strong>Opt-out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
            <li>• <strong>Do Not Track:</strong> We respect browser Do Not Track signals</li>
          </ul>

          <h4 className="font-semibold mt-4">Other Tracking Technologies:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Local Storage:</strong> For user preferences and performance optimization</li>
            <li>• <strong>Web Beacons:</strong> In emails to track delivery and engagement</li>
            <li>• <strong>Session Replay:</strong> To understand user experience and fix bugs (anonymized)</li>
          </ul>
        </div>
      )
    },
    {
      id: 'children-privacy',
      title: '9. Children\'s Privacy',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 font-semibold mb-2">Age Restriction:</p>
            <p className="text-slate-300 text-sm">ClickShift is not intended for use by individuals under the age of 18. Trading and financial services require adult supervision and understanding of financial risks.</p>
          </div>
          
          <h4 className="font-semibold">Our Commitment:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We do not knowingly collect personal information from children under 18</li>
            <li>• We do not target our marketing to children or minors</li>
            <li>• Our platform includes age verification measures</li>
            <li>• We comply with COPPA and similar children's privacy laws globally</li>
          </ul>

          <h4 className="font-semibold mt-4">If We Discover Underage Users:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• We will immediately delete any personal information collected</li>
            <li>• The account will be permanently suspended</li>
            <li>• We will notify parents/guardians if contact information is available</li>
            <li>• We will review our verification processes to prevent future occurrences</li>
          </ul>

          <h4 className="font-semibold mt-4">Parental Rights:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• Parents can contact us to inquire about their child's data</li>
            <li>• Request deletion of any information we may have collected</li>
            <li>• Report suspected underage use of our platform</li>
          </ul>
        </div>
      )
    },
    {
      id: 'policy-changes',
      title: '10. Changes to This Policy',
      icon: <AlertCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">How We Handle Updates:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Notification:</strong> We'll email you about material changes to this policy</li>
            <li>• <strong>Website Notice:</strong> Prominent notice on our platform for 30 days</li>
            <li>• <strong>Version History:</strong> Previous versions available upon request</li>
            <li>• <strong>Effective Date:</strong> Changes take effect 30 days after notification</li>
          </ul>

          <h4 className="font-semibold mt-4">Types of Changes:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Legal Updates:</strong> Changes due to new laws or regulations</li>
            <li>• <strong>Service Changes:</strong> Updates reflecting new platform features</li>
            <li>• <strong>Clarifications:</strong> Making our practices clearer without changing them</li>
            <li>• <strong>Contact Updates:</strong> Changes to contact information or procedures</li>
          </ul>

          <h4 className="font-semibold mt-4">Your Options:</h4>
          <ul className="space-y-2 text-slate-300">
            <li>• <strong>Continued Use:</strong> Using our services after changes means you accept the updated policy</li>
            <li>• <strong>Objection:</strong> Contact us if you disagree with material changes</li>
            <li>• <strong>Account Closure:</strong> You can close your account if you don't accept changes</li>
            <li>• <strong>Data Deletion:</strong> Request deletion of your data before new policy takes effect</li>
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
            <Lock className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Your privacy is fundamental to everything we do. This policy explains how we collect, 
            use, and protect your personal information with full GDPR compliance.
          </p>

          {/* Key Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="font-bold">Last Updated</div>
              <div className="text-sm text-slate-400">January 22, 2025</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="font-bold">GDPR Compliant</div>
              <div className="text-sm text-slate-400">EU Data Protection</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <Mail className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="font-bold">Contact DPO</div>
              <div className="text-sm text-slate-400">privacy@clickshift.io</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Quick Summary */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-blue-400" />
              <span>Privacy At A Glance</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-blue-400">What We Collect:</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Email and account preferences</li>
                  <li>• Trading analytics (anonymized)</li>
                  <li>• Platform usage patterns</li>
                  <li>• Payment information (encrypted)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-400">What We Don't Collect:</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Wallet private keys</li>
                  <li>• Personal trading strategies</li>
                  <li>• Identifiable trading positions</li>
                  <li>• Unnecessary personal data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
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
              <Mail className="h-6 w-6 text-blue-400" />
              <span>Contact Us About Privacy</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Data Protection Officer</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span>privacy@clickshift.io</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Response time: Within 30 days (GDPR requirement)
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">General Inquiries</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-400" />
                    <span>trust@clickshift.io</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    For general privacy questions and support
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">Supervisory Authority</h4>
              <p className="text-slate-300 text-sm">
                If you're located in the EU and have concerns about our data practices, 
                you have the right to contact your local data protection authority.
              </p>
            </div>
          </div>

          {/* Company Information */}
          <div className="mt-8 text-center space-y-2 text-sm text-slate-400 border-t border-slate-700 pt-8">
            <p>ClickShift Intelligence Inc.</p>
            <p>This Privacy Policy is effective as of January 22, 2025</p>
            <p>For the most current version, visit clickshift.io/privacy</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;