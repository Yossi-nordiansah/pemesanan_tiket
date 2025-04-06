import React from 'react';

const Guests = () => {
    return (
        <div 
            className="w-[95%] mx-auto pb-16 lg:pt-5 pt-4 mt-8" 
            style={{
                backgroundImage: `url("/images/bg4.png")`,
                backgroundSize: '100% 100%',
                backgroundPosition: "center",
                backgroundRepeat: 'no-repeat'
            }}
        >
            <section className="py-12 text-center">
                <div className="max-w-[1200px] mx-auto px-8">
                    {/* Judul */}
                    <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-8">
                        Our Guests
                    </h2>

                    {/* Tombol Kontak */}
                    <div className="flex justify-center">
                        <a 
                            href="https://wa.me/6289615722845" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
                        >
                            Contact Meta Team
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Guests;