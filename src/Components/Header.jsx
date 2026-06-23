import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentLang, setCurrentLang }) => {
    const toggleLanguage = () => {
        const newLang = currentLang === "en" ? "hi" : "en";
        setCurrentLang(newLang);
        localStorage.setItem("preferredTempleLanguage", newLang);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
            <div className="container mx-auto px-2 sm:px-3 md:px-4 py-2 md:py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 md:gap-3 group min-w-0 flex-1">
                        <span className="text-2xl md:text-3xl group-hover:scale-105 transition shrink-0">🛕</span>
                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-base md:text-xl font-bold text-orange-600 group-hover:text-orange-700 transition truncate">
                                {currentLang === "hi" ? "देवभूमि मंदिर" : "DevBhoomi Temple"}
                            </h1>
                            <p className="hidden sm:block text-[10px] md:text-xs text-gray-500">Dharma & Devotion</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
                       
                        <button
                            onClick={toggleLanguage}
                            className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gray-100 rounded-lg text-gray-700 font-bold text-[10px] sm:text-xs md:text-sm hover:bg-gray-200 transition whitespace-nowrap"
                        >
                            {currentLang === "hi" ? "EN" : "हिं"}
                        </button>
                    </div>
                </div>

                <nav className="flex gap-1 sm:gap-2 md:gap-3 mt-2 md:mt-3 overflow-x-auto pb-1 md:pb-2 scrollbar-hide">
                    <a href="#explore" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "खोजें" : "Explore"}
                    </a>
                    <a href="#featured" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "विशेष" : "Featured"}
                    </a>
                    <a href="#favorites" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "बुकमार्क" : "Bookmarks"}
                    </a>
                    <a href="#recent" className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition text-[10px] sm:text-xs md:text-sm">
                        {currentLang === "hi" ? "हाल के" : "Recent"}
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;