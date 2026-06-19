import { Link } from 'react-router-dom';

const TempleHeader = ({ temple, currentLang, setCurrentLang, isHistoryPage }) => {
    const toggleLanguage = () => {
        const newLang = currentLang === "en" ? "hi" : "en";
        setCurrentLang(newLang);
        localStorage.setItem("preferredTempleLanguage", newLang);
    };

    const templeName = temple?.name || "Shree Dharma Temple";
    console.log(temple)

    return (
        <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-800/30">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <span className="text-3xl group-hover:scale-105 transition">🛕</span>
                        <div>
                            <h1 className="text-xl font-bold text-amber-200 group-hover:text-amber-100 transition">
                                {isHistoryPage ? "Donation History" : templeName}
                            </h1>
                            {!isHistoryPage && (
                                <p className="text-xs text-amber-500">Dharma & Devotion</p>
                            )}
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLanguage}
                            className="px-4 py-2 bg-white/10 rounded-full text-amber-300 font-bold hover:bg-white/20 transition"
                        >
                            {currentLang === "hi" ? "English" : "हिन्दी"}
                        </button>

                        {!isHistoryPage && (
                            <Link
                                to="/donation-history"
                                className="px-4 py-2 bg-linear-to-r from-orange-600 to-amber-500 rounded-full text-white font-bold text-sm hover:shadow-lg transition"
                            >
                                {currentLang === "hi" ? "दान इतिहास" : "Donation History"}
                            </Link>
                        )}
                    </div>
                </div>

                {!isHistoryPage && temple && (
                    // Components/TempleHeader.jsx - Add pradhan link to navigation
                    <nav className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
                        <a href="#home" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "मुख्य पृष्ठ" : "Home"}
                        </a>
                        <a href="#about" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "परिचय" : "About"}
                        </a>
                        <a href="#gallery" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "गैलरी" : "Gallery"}
                        </a>
                        <a href="#traditions" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "परंपराएं" : "Traditions"}
                        </a>
                        <a href="#festivals" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "त्योहार" : "Festivals"}
                        </a>
                        {temple?.pradhanProfile.name && (
                            <a href="#pradhan" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                                {currentLang === "hi" ? "ग्राम प्रधान" : "Gram Pradhan"}
                            </a>
                        )}
                        <a href="#donation" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "दान" : "Donation"}
                        </a>
                        <a href="#seva" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "सेवा बुकिंग" : "Seva Booking"}
                        </a>
                        <a href="#transparency" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "पारदर्शिता" : "Transparency"}
                        </a>

                        <a href="#certificate" className="px-3 py-2 text-amber-400 hover:text-amber-200 font-bold whitespace-nowrap transition">
                            {currentLang === "hi" ? "प्रमाणपत्र" : "Certificate"}
                        </a>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default TempleHeader;