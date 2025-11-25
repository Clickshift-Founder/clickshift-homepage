

"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Target, 
  Globe, 
  Star,
  Play,
  CheckCircle,
  ExternalLink,
  Menu,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import Image from 'next/image';

// Define the type for a single chip feature
interface ChipFeature {
    icon: React.ElementType; // Represents the Lucide icon component
    name: string;
    description: string;
}

const ChipShowcase = () => {
    // Moved the array definition inside the component
    const chipFeatures: ChipFeature[] = [
        { icon: Zap, name: 'Speed of Execution', description: 'Real-time execution ensures lightning-fast market entry and exit.' },
        { icon: Target, name: 'Profit Optimization', description: 'Intelligently follows momentum, exiting near the peak (e.g., 5x on a 6x run).' },
        { icon: Shield, name: 'Safety & Rug Detection', description: 'Actively avoids scam tokens and malicious smart contracts.' },
        { icon: ExternalLink, name: 'Autonomous Exits', description: 'Machine agents execute strategic, automated profit-taking.' },
        { icon: Globe, name: 'Dual Functionality', description: 'Acts as both a trigger for agents and a compass for humans.' },
        { icon: Star, name: 'Smart Risk Management', description: 'Dynamically manages exposure based on real-time volatility.' },
    ];

    // This is the component's *own* required return statement
    return (
        <section className="py-24 px-4 bg-slate-800/50 border-y border-blue-500/20">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                        The Core Technology
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            The ClickShift Chip
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                        An advanced <strong>on-chain chip</strong> powering autonomous DeFi agents. It is the intelligence layer that transforms trading from a gamble into <strong>intelligent decision-making**.</strong>
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Chip Image and Callout */}
                    <div className="relative text-center p-8 bg-slate-900/50 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-900/40">
                        <div className="mx-auto w-full max-w-sm mb-6">
                            {/* NOTE: Ensure 'clickshift-chip-logo.png' is in your public folder */}
                            <Image 
                                src="/clickshift-chip-logo.png" 
                                alt="ClickShift On-Chain Intelligence Chip" 
                                width={350} 
                                height={350} 
                                className="mx-auto pulse-animation" 
                            />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-purple-400">The Autonomous Engine</h3>
                        <p className="text-slate-300 mb-6 italic">
                            The Chip is the trigger for machine agents and the compass for human traders—maximizing profit with precision.
                        </p>

                        <a 
                            href="https://airtable.com/appc8rY70dTBksxSc/shr4qXKObo3cFDP5j"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-[1.02]"
                        >
                            <span>Integrate Our Chip</span>
                            <ArrowRight className="h-5 w-5" />
                        </a>
                        <p className="text-sm text-slate-400 mt-3">Intended for Stablecoin Management, Company Trading Desks, and Bot Integration.</p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-left mb-6">Engineered for DeFi Profit.</h3>
                        {chipFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-4 bg-slate-800/80 p-4 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all">
                                <feature.icon className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-xl font-bold mb-1 text-white">{feature.name}</h4>
                                    <p className="text-slate-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Use Cases */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-6 text-purple-400">Primary Use Cases</h3>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                        {['Personal Trading', 'Company Trading Desk', 'Client Portfolio Management', 'Stablecoin Management', 'Bot Integration', 'Research & Analytics'].map((useCase, index) => (
                            <span key={index} className="bg-slate-700/50 text-white px-4 py-2 rounded-full border border-slate-600">
                                {useCase}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ChipShowcase;