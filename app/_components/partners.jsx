"use client"
import React from 'react';
import Marquee from "react-fast-marquee";

const Partners = () => {
    const getRandomOffset = () => {
        return Math.random() * 20 - 10; // Offset antara -10px sampai +10px
    };
    const partners = [
        { name: 'Polkadot', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
        { name: 'APTOS', logo: 'https://cryptologos.cc/logos/aptos-apt-logo.png' },
        { name: 'Binance', logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png' },
        { name: 'Internet Computer', logo: 'https://cryptologos.cc/logos/internet-computer-icp-logo.png' },
        { name: 'Circle', logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' },
        { name: 'Wallet', logo: 'https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png' },
        { name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
        { name: 'Tezos', logo: 'https://cryptologos.cc/logos/tezos-xtz-logo.png' },
        { name: 'Algorand', logo: 'https://cryptologos.cc/logos/algorand-algo-logo.png' },
        { name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
        { name: 'Tezos', logo: 'https://cryptologos.cc/logos/tezos-xtz-logo.png' },
        { name: 'Algorand', logo: 'https://cryptologos.cc/logos/algorand-algo-logo.png' },
        { name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
        { name: 'Tezos', logo: 'https://cryptologos.cc/logos/tezos-xtz-logo.png' },
        { name: 'Algorand', logo: 'https://cryptologos.cc/logos/algorand-algo-logo.png' },
        { name: 'Algorand', logo: 'https://cryptologos.cc/logos/algorand-algo-logo.png' },
    ];

    return (
        <div className="">
          <h2 className="sm:text-4xl text-xl font-bold text-slate-800 lg:mb-16 mb-7 text-center">Partners</h2>
          <Marquee  speed={50}>
            <div className="flex sm:space-x-14 space-x-2">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center p-4 space-y-1 ml-16 ${
                    index % 2 === 0 ? "sm:mt-44 mt-40" : "mb-44"
                  }`} // Efek tidak sejajar
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="w-24 h-24 object-contain" 
                  />
                  <span className="text-gray-700 font-semibold">{partner.name}</span>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      );
};

export default Partners;

