"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Gamepad2, Coins, Trophy, Users } from 'lucide-react';
import WarTicket from './warTicket';
import RegularTicket from './regularTicket';

const MetaVFestFAQPage = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqContent = {
    faq: [
      {
        id: 'faq1',
        question: 'When and where is MetaVFest 2025 taking place?',
        answer: 'MetaVFest 2025 will be held on May 10, 2025 at the Surabaya Convention Center, Indonesia. Doors open at 9:00 AM.'
      },
      {
        id: 'faq2',
        question: 'What types of activities will be available?',
        answer: 'MetaVFest features anime showcases, gaming tournaments, crypto panels, VR experiences, cosplay competitions, and exclusive NFT drops for attendees.'
      },
      {
        id: 'faq3',
        question: 'Are there age restrictions for the event?',
        answer: 'Most areas are open to all ages, but some crypto trading workshops and competitive gaming tournaments require participants to be 18+. All areas will be clearly marked.'
      },
      {
        id: 'faq4',
        question: 'Will there be special guests?',
        answer: 'Yes! We\'ll host anime voice actors, professional gamers, crypto influencers, and NFT artists. The full lineup will be announced one month before the event.'
      },
      {
        id: 'faq5',
        question: 'Can I pay with cryptocurrency?',
        answer: 'Absolutely! We accept Bitcoin, Ethereum, and selected altcoins. We\'ll also have a special MetaVFest token with exclusive perks for holders.'
      }
    ],
    terms: [
      {
        id: 'term1',
        question: 'Ticket Refund Policy',
        answer: 'Tickets are non-refundable but transferable up to 7 days before the event. NFT ticket holders have special transfer options through our platform.'
      },
      {
        id: 'term2',
        question: 'Content Creation Policy',
        answer: 'Personal photography and social media content is encouraged! However, commercial photography/videography requires press credentials. Tag us with #MetaVFest2025 for a chance to be featured!'
      },
      {
        id: 'term3',
        question: 'Digital Asset Ownership',
        answer: 'All MetaVFest digital collectibles, NFTs, and virtual items issued at the event are governed by our smart contract terms. These assets may have utility at future events.'
      }
    ],
    rules: [
      {
        id: 'rule1',
        question: 'Cosplay Guidelines',
        answer: 'Props must be peace-bonded at security. No realistic weapons, functioning projectiles, or props exceeding 2 meters in any dimension. Mecha suits must maintain visibility for safe navigation.'
      },
      {
        id: 'rule2',
        question: 'Gaming Tournament Rules',
        answer: 'Participants must use official tournament equipment. Bringing personal peripherals requires pre-approval and inspection. Anti-cheat software will be active on all competition systems.'
      },
      {
        id: 'rule3',
        question: 'NFT Trading Guidelines',
        answer: 'The NFT trading zone requires KYC verification. All transactions should use our secure escrow system. Peer-to-peer transactions are at your own risk and not supported by event staff.'
      }
    ],
    booths: [
      {
        id: 'booth1',
        question: 'Anime & Manga Zone (Floors 1-2)',
        answer: 'Features publisher booths, artist alley, and signing areas. Premium booths are located near the main stage and cosplay photo zones.'
      },
      {
        id: 'booth2',
        question: 'Gaming Arena (Floor 3)',
        answer: 'Houses competitive stages, free-play zones, and indie game showcases. VR experiences are located in the center with surrounding vendor booths.'
      },
      {
        id: 'booth3',
        question: 'Crypto & NFT Pavilion (Floor 4)',
        answer: 'Includes exchange booths, NFT galleries, and blockchain startups. The Web3 education center is positioned centrally with demo stations surrounding it.'
      }
    ]
  };

  const categories = [
    { id: 'faq', label: 'FAQ', icon: <Users size={20} /> },
    { id: 'terms', label: 'Terms & Conditions', icon: <Coins size={20} /> },
    { id: 'rules', label: 'Event Rules', icon: <Trophy size={20} /> },
    { id: 'booths', label: 'Booth Map', icon: <Gamepad2 size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-950/35 text-white">
      <div className="relative inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/65 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/65 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-500/65 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-gradient-to-r backdrop-blur-sm from-indigo-900/50 via-purple-900/50 to-indigo-900/50 border-b-4 border-cyan-500">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-japanese md:text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            METAVFEST 2025
          </h1>
          <p className="text-xl font-semibold mt-4 max-w-2xl text-cyan-100">
            Your ultimate guide to the anime, gaming & crypto community event
          </p>
        </div>
      </div>

      <WarTicket/>
      <RegularTicket/>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${
                activeTab === category.id 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105 border-2 border-cyan-400'
                  : 'bg-gray-800/60 backdrop-blur-sm text-gray-300 hover:bg-gray-700/80 border-2 border-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-indigo-900/50 shadow-2xl shadow-purple-900/20 p-8 max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <h2 className="text-3xl font-bold relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {categories.find(c => c.id === activeTab)?.label}
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
            </h2>
          </div>

          <div className="space-y-4">
            {faqContent[activeTab]?.map((item) => (
              <div 
                key={item.id} 
                className="border border-gray-700/50 rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-sm hover:border-indigo-900/70 transition-all"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-indigo-900/10 transition-colors"
                >
                  <span className="font-medium text-lg text-cyan-100">{item.question}</span>
                  {expandedItems[item.id] ? (
                    <ChevronUp className="text-cyan-400" />
                  ) : (
                    <ChevronDown className="text-cyan-400" />
                  )}
                </button>
                
                {expandedItems[item.id] && (
                  <div className="px-6 py-4 border-t border-gray-700/50 bg-gray-900/50 text-gray-300">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Still have questions?
          </h3>
          <p className="mb-8 text-gray-300">
            Our team of digital adventurers is ready to assist you!
          </p>
          <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/30 border-2 border-purple-400/30 transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetaVFestFAQPage;