"use client"
import React from 'react';

const Partners = () => {
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
    ];

    return (
        <section className="mt-10 py-4" id="partner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Our Partners</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                            <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
                            <p className="text-sm font-medium text-gray-700">{partner.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
