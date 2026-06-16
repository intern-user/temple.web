// src/components/FestivalBanner.jsx
import React, { useState, useEffect } from 'react';

const FestivalBanner = ({ temples, setFestivalMatchedIds, currentLang }) => {
  const [activeChips, setActiveChips] = useState([]);
  const [festivalChips, setFestivalChips] = useState([]);

  const computeMatchSet = (templeList, chips) => {
    if (!chips?.length) return new Set();

    const tags = new Set();
    chips.forEach(chip => {
      (chip.matchTags || []).forEach(t => tags.add(String(t).toLowerCase()));
      (chip.matchDeities || []).forEach(d => tags.add(String(d).toLowerCase()));
    });

    const matched = new Set();
    templeList.forEach(t => {
      const deity = (t.deity || "").toLowerCase();
      const templeTags = Array.isArray(t.tags) ? t.tags.map(x => String(x).toLowerCase()) : [];
      if (tags.has(deity) || templeTags.some(tg => tags.has(tg))) {
        matched.add(t.id);
      }
    });
    return matched;
  };

  const FESTIVALS = [
    { name: "Janmashtami", matchDeities: ["Krishna"], matchTags: ["krishna", "laddu", "bhakti", "festival"] },
    { name: "Navratri", matchDeities: ["Devi", "Sikh"], matchTags: ["festival", "architecture", "langar"] },
    { name: "Mahashivratri", matchDeities: ["Shiv"], matchTags: ["jyotirlinga", "himalaya", "darshan"] },
    { name: "Diwali", matchDeities: ["Lakshmi", "Ram"], matchTags: ["diwali", "lights", "festival"] },
    { name: "Ganesh Chaturthi", matchDeities: ["Ganesh"], matchTags: ["ganesh", "festival", "aarti"] }
  ];

  useEffect(() => {
    if (!temples.length) return;

    const scored = FESTIVALS.map(f => ({
      festival: f,
      count: computeMatchSet(temples, [f]).size
    })).sort((a, b) => b.count - a.count);

    const top = scored.filter(s => s.count > 0).slice(0, 4);
    const chips = top.map(x => x.festival);
    setActiveChips(chips);
    setFestivalChips(chips);

    setFestivalMatchedIds(computeMatchSet(temples, chips));
  }, [temples, setFestivalMatchedIds]);

  const handleChipClick = (chip) => {
    setFestivalMatchedIds(computeMatchSet(temples, [chip]));
  };

  if (!festivalChips.length) {
    return (
      <div className="container mx-auto px-4 py-3">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4 text-center border border-gray-300">
          <p className="text-gray-600 font-medium">
            {currentLang === "hi"
              ? "अभी कोई त्योहार मिलान नहीं मिला।"
              : "No festival matches found yet."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-3">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎉</span>
              <div className="text-white text-sm font-bold uppercase tracking-wider">
                {currentLang === "hi" ? "त्योहार विशेष" : "Festival Highlights"}
              </div>
            </div>
            <div className="text-orange-100 text-sm">
              {currentLang === "hi"
                ? "विशेष अवसर चल रहे हैं • हाइलाइट करने के लिए चिप दबाएं"
                : "Special moments happening now • Tap a chip to highlight"}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {festivalChips.map((chip, index) => (
              <button
                key={index}
                onClick={() => handleChipClick(chip)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-sm hover:bg-white/30 hover:scale-105 transition-all duration-200 shadow-md"
              >
                {chip.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalBanner;