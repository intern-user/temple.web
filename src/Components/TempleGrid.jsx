// src/components/TempleGrid.jsx
import React from 'react';
import TempleCard from './TempleCard';

const TempleGrid = ({
    temples,
    favorites,
    onToggleFavorite,
    onAddToRecent,
    festivalMatchedIds,
    currentLang,
    emptyMessage
}) => {
    if (!temples.length) {
        return (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                <div className="text-5xl mb-4">🕊️</div>
                <p className="text-gray-500 font-medium">
                    {emptyMessage || (currentLang === "hi"
                        ? "मौजूदा फिल्टर में कोई मंदिर नहीं मिला।"
                        : "No temples found for the current filters.")}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                    {currentLang === "hi"
                        ? "कृपया अपने खोज मापदंड समायोजित करें"
                        : "Please adjust your search criteria"}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.map(temple => (
                <TempleCard
                    key={temple.id}
                    temple={temple}
                    isFavorite={favorites.has(temple.id)}
                    onToggleFavorite={onToggleFavorite}
                    onAddToRecent={onAddToRecent}
                    isFestivalHighlight={festivalMatchedIds.has(temple.id)}
                    currentLang={currentLang}
                />
            ))}
        </div>
    );
};

export default TempleGrid;