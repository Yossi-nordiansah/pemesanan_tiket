import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Mic, Building, Globe } from 'lucide-react';

const StatsPage = () => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [mascotPositions, setMascotPositions] = useState({
    attendees: { x: 0, y: 0 },
    speakers: { x: 0, y: 0 },
    companies: { x: 0, y: 0 },
    countries: { x: 0, y: 0 }
  });

  const statsCards = [
    {
      id: 'attendees',
      number: '2000',
      label: 'Attendees',
      icon: <Users size={24} />,
      mascotColor: '#3b82f6',
      mascotSecondaryColor: '#93c5fd'
    },
    {
      id: 'speakers',
      number: '300+',
      label: 'Speakers',
      icon: <Mic size={24} />,
      mascotColor: '#f97316',
      mascotSecondaryColor: '#fdba74'
    },
    {
      id: 'companies',
      number: '5000+',
      label: 'Companies',
      icon: <Building size={24} />,
      mascotColor: '#ec4899',
      mascotSecondaryColor: '#f9a8d4'
    },
    {
      id: 'countries',
      number: '90+',
      label: 'Countries',
      icon: <Globe size={24} />,
      mascotColor: '#06b6d4',
      mascotSecondaryColor: '#67e8f9'
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Dive into Emerging Markets',
      description: 'Get connected in Southeast Asia, the fastest-growing Web3 region in the world!',
      image: '/api/placeholder/320/180'
    },
    {
      id: 2,
      title: 'Jump Straight to Adoption',
      description: 'Foster collaborations directly in Indonesia where there are 22 million users',
      image: '/api/placeholder/320/180'
    },
    {
      id: 3,
      title: 'Unconventionally Engaging',
      description: 'Our immersive programming, setting, and sessions leave you with more memory markers than any other event',
      image: '/api/placeholder/320/180'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNewsIndex(prev => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  useEffect(() => {
    const animateMascots = () => {
      setMascotPositions({
        attendees: { 
          x: Math.sin(Date.now() / 2000) * 5, 
          y: Math.cos(Date.now() / 1500) * 5 
        },
        speakers: { 
          x: Math.sin(Date.now() / 1800) * 5, 
          y: Math.cos(Date.now() / 2200) * 5 
        },
        companies: { 
          x: Math.sin(Date.now() / 2400) * 5, 
          y: Math.cos(Date.now() / 1700) * 5 
        },
        countries: { 
          x: Math.sin(Date.now() / 2100) * 5, 
          y: Math.cos(Date.now() / 1900) * 5 
        }
      });
    };

    const animationFrame = requestAnimationFrame(function animate() {
      animateMascots();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const Mascot = ({ color, secondaryColor, position }) => (
    <div 
      className="absolute top-2 right-2 transition-transform duration-300 ease-in-out"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))',
      }}
    >
      <div className="relative">
        <div 
          className="w-16 h-16 rounded-full relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute top-3 left-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <div className="absolute top-3 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          
          <div 
            className="absolute bottom-4 left-1/2 w-10 h-4 rounded-b-full -ml-5"
            style={{ backgroundColor: secondaryColor }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/55 to-blue-950/55 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {statsCards.map(card => (
            <div 
              key={card.id}
              className="bg-blue-700/40 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 relative overflow-hidden"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-600/50 rounded-lg">
                  {card.icon}
                </div>
                <h3 className="text-gray-300 font-medium text-lg">{card.label}</h3>
              </div>
              <p className="text-5xl font-bold text-white mt-2">{card.number}</p>
            
              <Mascot 
                color={card.mascotColor} 
                secondaryColor={card.mascotSecondaryColor}
                position={mascotPositions[card.id]}
              />
              
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full"></div>
              <div className="absolute top-4 right-20 w-4 h-4 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-12 right-8 w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 relative">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Latest Updates</h2>
          
          <div className="relative h-80 overflow-hidden rounded-xl">
            {newsItems.map((item, index) => (
              <div 
                key={item.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col ${
                  index === activeNewsIndex 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
                
                <div className="flex-1 bg-blue-900/80 backdrop-blur-sm p-4 rounded-b-xl border-t border-blue-700">
                  <p className="text-blue-100">{item.description}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-1 text-blue-300 text-sm">
                      <span>Learn more</span>
                      <ArrowRight size={16} />
                    </div>
                    
                    <div className="flex space-x-2">
                      {newsItems.map((_, dotIndex) => (
                        <div 
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full ${
                            dotIndex === activeNewsIndex ? 'bg-blue-300' : 'bg-blue-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;