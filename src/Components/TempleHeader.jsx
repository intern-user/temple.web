import React from 'react';
import { Link } from 'react-router-dom';

const TempleHeader = ({ temple, currentLang, setCurrentLang }) => {
    const toggleLanguage = () => {
        const newLang = currentLang === "en" ? "hi" : "en";
        setCurrentLang(newLang);
        localStorage.setItem("preferredTempleLanguage", newLang);
    };

    return (
        <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-800/30">
            <div className="container mx-auto px-2 sm:px-3 md:px-4 py-2 md:py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 md:gap-3 group min-w-0 flex-1">
                        <span className="text-2xl md:text-3xl group-hover:scale-105 transition flex-shrink-0">🛕</span>
                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-base md:text-xl font-bold text-amber-200 group-hover:text-amber-100 transition truncate">
                                {temple?.name}
                            </h1>
                            <p className="hidden sm:block text-[10px] md:text-xs text-amber-500">Dharma & Devotion</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
                        <Link
                            to={`/donation-history/${temple?.id}`}
                            className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-orange-500 text-white rounded-lg font-bold text-[10px] sm:text-xs md:text-sm hover:bg-orange-600 transition whitespace-nowrap"
                        >
                            {currentLang === "hi" ? "दान इतिहास" : "History"}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 rounded-lg text-amber-300 font-bold text-[10px] sm:text-xs md:text-sm hover:bg-white/20 transition whitespace-nowrap"
                        >
                            {currentLang === "hi" ? "EN" : "हिं"}
                        </button>
                    </div>
                </div>

                <nav className="flex gap-1 sm:gap-2 md:gap-3 mt-2 md:mt-3 overflow-x-auto pb-1 md:pb-2 scrollbar-hide">
                    <a href="#home" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "मुख्य" : "Home"}
                    </a>
                    <a href="#about" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "परिचय" : "About"}
                    </a>
                    <a href="#gallery" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "गैलरी" : "Gallery"}
                    </a>
                    <a href="#traditions" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "परंपराएं" : "Traditions"}
                    </a>
                    <a href="#festivals" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "त्योहार" : "Festivals"}
                    </a>
                    <a href="#pradhan" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "प्रधान" : "Pradhan"}
                    </a>
                    <a href="#donation" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "दान" : "Donation"}
                    </a>
                    <a href="#seva" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "सेवा" : "Seva"}
                    </a>
                    <a href="#transparency" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "पारदर्शिता" : "Transparency"}
                    </a>
                  
                    <a href="#certificate" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "प्रमाणपत्र" : "Certificate"}
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default TempleHeader;