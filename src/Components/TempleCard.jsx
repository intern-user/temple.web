// src/components/TempleCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TempleCard = ({ temple, isFavorite, onToggleFavorite, onAddToRecent, isFestivalHighlight, currentLang }) => {
    const locationStr = [temple.city, temple.state].filter(Boolean).join(", ") || "India";
    const isLive = Boolean(temple.isLive);
    const primaryHref = `/temple?id=${temple.id}`;
    const imagePosition = temple.id === "nagdevta-temple" ? "center 58%" : "center";

    // Calculate popularity dynamically based on rating and views
    const calculatePopularity = () => {
        const rating = Math.min(5, Math.max(0, Number(temple.rating) || 0));
        const views = Math.max(0, Number(temple.views) || 0);
        const ratingScore = (rating / 5) * 40;
        const viewsScore = Math.min(1, views / 100000) * 30;
        const baseScore = 30;
        return Math.round(ratingScore + viewsScore + baseScore);
    };

    const renderStars = () => {
        const rating = Math.min(5, Math.max(0, Number(temple.rating) || 0));
        const full = Math.floor(rating);
        const hasHalf = rating - full >= 0.5;
        const empty = 5 - full - (hasHalf ? 1 : 0);
        return (
            <span className="flex gap-0.5 text-yellow-500 text-sm">
                {"★".repeat(full)}
                {hasHalf && "⯨"}
                {"☆".repeat(empty)}
            </span>
        );
    };

    const handleOpen = () => {
        onAddToRecent(temple.id);
    };

    const popularity = calculatePopularity();

    return (
        <div className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isFestivalHighlight
            ? "border-2 border-orange-500 ring-2 ring-orange-300 ring-offset-2"
            : "border border-gray-200"
            }`}>
            <div className="relative">
                <Link to={primaryHref} onClick={handleOpen} className="block">
                    <img
                        src={temple.image || "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80"}
                        alt={temple.name}
                        className="w-full h-48 object-cover"
                        style={{ objectPosition: imagePosition }}
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80";
                        }}
                    />
                </Link>

                {isLive && (
                    <div className="absolute top-3 left-3">
                        <span className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-md">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            LIVE
                        </span>
                    </div>
                )}

                {temple.isNew && (
                    <div className="absolute top-3 left-3">
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-md">
                            🆕 NEW
                        </span>
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleFavorite(temple.id);
                    }}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${isFavorite
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    aria-label={isFavorite ? "Bookmarked" : "Bookmark"}
                >
                    <span className="text-xl">{isFavorite ? "★" : "☆"}</span>
                </button>
            </div>

            <div className="p-5">
                {/* Temple Name and Deity */}
                <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="font-bold text-xl text-gray-900 line-clamp-1">
                        {temple.name}
                    </h3>
                    <span className="px-3 py-1 bg-orange-100 rounded-full text-xs font-bold text-orange-700 whitespace-nowrap border border-orange-200">
                        {temple.deity || "Temple"}
                    </span>
                </div>

                {/* Location */}
                <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                    <span className="text-base">📍</span>
                    <span>{locationStr}</span>
                </p>

                {/* Rating and Popularity */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                        {renderStars()}
                    </div>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                            <strong className="text-orange-600 text-base">{popularity}%</strong>
                            <span className="ml-1">{currentLang === "hi" ? "लोकप्रिय" : "popular"}</span>
                        </span>
                    </div>
                </div>

                {/* Views Count */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        👁️ {temple.views?.toLocaleString() || 0} views
                    </span>
                    {temple.ratingCount > 0 && (
                        <span className="flex items-center gap-1">
                            ⭐ {temple.ratingCount} ratings
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {temple.description || "A sacred spiritual center with daily aarti, festivals, and seva for devotees."}
                </p>

                {/* Single Explore Button */}
                <Link
                    to={primaryHref}
                    onClick={handleOpen}
                    className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg text-center hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg block"
                >
                    🔍 {currentLang === "hi" ? "मंदिर देखें" : "View Temple"}
                </Link>
            </div>
        </div>
    );
};

export default TempleCard;
