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
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <span className="text-3xl group-hover:scale-105 transition">🛕</span>
                        <div>
                            <h1 className="text-xl font-bold text-orange-600 group-hover:text-orange-700 transition">
                                {currentLang === "hi" ? "मंदिर एक्सप्लोरर" : "Temple Explorer"}
                            </h1>
                            <p className="text-xs text-gray-500">Dharma & Devotion</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/donation-history"
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 transition"
                        >
                            {currentLang === "hi" ? "दान इतिहास" : "Donation History"}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-bold hover:bg-gray-200 transition"
                        >
                            {currentLang === "hi" ? "English" : "हिन्दी"}
                        </button>
                    </div>
                </div>

                <nav className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
                    <a href="#explore" className="px-3 py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition">
                        {currentLang === "hi" ? "खोजें" : "Explore"}
                    </a>
                    <a href="#featured" className="px-3 py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition">
                        {currentLang === "hi" ? "विशेष" : "Featured"}
                    </a>
                    <a href="#favorites" className="px-3 py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition">
                        {currentLang === "hi" ? "बुकमार्क" : "Bookmarks"}
                    </a>
                    <a href="#recent" className="px-3 py-2 text-gray-600 hover:text-orange-600 font-bold whitespace-nowrap transition">
                        {currentLang === "hi" ? "हाल में देखे गए" : "Recently Viewed"}
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;