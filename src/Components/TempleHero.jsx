// Components/TempleHero.jsx
import React, { useState, useEffect } from 'react';

const TempleHero = ({ temple, currentLang }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Get images from temple data or use single image
    const images = temple?.images && temple.images.length > 0 
        ? temple.images 
        : [temple?.image ];

    const getHeroDescription = () => {
        if (currentLang === "hi") {
            return temple?.descriptionHi || temple?.description || "भक्ति, शांति, सेवा, त्योहारों और विश्वभर के भक्तों के आध्यात्मिक जुड़ाव का पवित्र स्थान।";
        }
        return temple?.description || "A sacred place for devotion, peace, seva, festivals, and spiritual connection for devotees across the world.";
    };

    // Auto-slide images every 4 seconds
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Images Container */}
            <div className="absolute inset-0">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={image}
                            alt={`${temple.name} - ${index + 1}`}
                            className="w-full h-full"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1600&q=80';
                            }}
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                ))}
            </div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {currentLang === "hi" ? `${temple.name} में आपका स्वागत है` : `Welcome to ${temple.name}`}
                </h1>
                <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto drop-shadow">
                    {getHeroDescription()}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <a href="#donation" className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition transform hover:scale-105">
                        {currentLang === "hi" ? "अभी दान करें" : "Donate Now"}
                    </a>
                    
                </div>
            </div>
        </div>
    );
};

export default TempleHero;