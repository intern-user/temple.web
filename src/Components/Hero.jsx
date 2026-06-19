// src/Components/Hero.jsx
import React from 'react';

const Hero = ({ searchQuery, setSearchQuery, resetSearch, handleNearby, templeCount, favoriteCount, currentLang }) => {
    return (
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-700">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-bold mb-4 backdrop-blur-sm">
                    {currentLang === "hi" ? "मंदिर एक्सप्लोरर प्लेटफॉर्म" : "Temple Explorer Platform"}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {currentLang === "hi" ? "भारत के मंदिरों को खोजें" : "Explore Temples Across India"}
                </h1>
                <p className="text-xl text-orange-100 mb-6 drop-shadow">
                    {currentLang === "hi" ? "पवित्र स्थान खोजें और आध्यात्मिक रूप से जुड़ें" : "Discover divine places and connect spiritually"}
                </p>

                <div className="flex flex-wrap gap-2 max-w-xl mx-auto mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={currentLang === "hi" ? "मंदिर, शहर या राज्य से खोजें..." : "Search by temple name, city or state..."}
                        className="flex-1 p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                        onClick={resetSearch}
                        className="px-4 py-3 bg-white/20 rounded-lg text-white font-bold hover:bg-white/30 transition"
                    >
                        {currentLang === "hi" ? "साफ करें" : "Clear"}
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white font-bold">{currentLang === "hi" ? "मंदिर" : "Temples"}</span>
                        <span className="text-white font-bold bg-white/30 px-2 py-0.5 rounded-full">{templeCount}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white font-bold">{currentLang === "hi" ? "बुकमार्क" : "Bookmarks"}</span>
                        <span className="text-white font-bold bg-white/30 px-2 py-0.5 rounded-full">{favoriteCount}</span>
                    </div>
                    <button
                        onClick={handleNearby}
                        className="px-6 py-2 bg-white text-orange-600 font-bold rounded-full hover:shadow-lg transition"
                    >
                        📍 {currentLang === "hi" ? "पास के मंदिर सुझाएं" : "Suggest Nearby"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
