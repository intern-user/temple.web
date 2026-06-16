// pages/HomePage.jsx - Complete updated version
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import FestivalBanner from '../Components/FestivalBanner';
import TempleGrid from '../Components/TempleGrid';
import useTemples from '../hooks/useTemples';

const PAGE_SIZE = 9;
const FAVORITES_KEY = "templeExplorerFavorites";
const RECENT_KEY = "templeExplorerRecent";

const HomePage = () => {
    const { temples, loading } = useTemples();

    const [filteredTemples, setFilteredTemples] = useState([]);
    const [viewLimit, setViewLimit] = useState(PAGE_SIZE);
    const [favorites, setFavorites] = useState(new Set());
    const [recentIds, setRecentIds] = useState([]);
    const [currentLang, setCurrentLang] = useState("en");
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [deityFilter, setDeityFilter] = useState("");
    const [sortBy, setSortBy] = useState("az");
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const [nearbyCenter, setNearbyCenter] = useState(null);
    const [locations, setLocations] = useState([]);
    const [deities, setDeities] = useState([]);
    const [festivalMatchedIds, setFestivalMatchedIds] = useState(new Set());

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        setFavorites(new Set(Array.isArray(favs) ? favs : []));

        const recent = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
        setRecentIds(Array.isArray(recent) ? recent : []);

        const savedLang = localStorage.getItem("preferredTempleLanguage");
        if (savedLang === "hi" || savedLang === "en") {
            setCurrentLang(savedLang);
        }
    }, []);

    const locationKey = useCallback((temple) => {
        const city = temple.city || "";
        const state = temple.state || "";
        if (!city && !state) return "";
        return [city, state].filter(Boolean).join(", ");
    }, []);

    const normalize = useCallback((value) => String(value || "").toLowerCase(), []);
    const getUniqueSorted = useCallback((list) => {
        return Array.from(new Set(list.filter(Boolean))).sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
        );
    }, []);

    const haversineKm = useCallback((a, b) => {
        const R = 6371;
        const toRad = (d) => (d * Math.PI) / 180;
        const dLat = toRad(b.lat - a.lat);
        const dLng = toRad(b.lng - a.lng);
        const lat1 = toRad(a.lat);
        const lat2 = toRad(b.lat);
        const s = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
        return R * c;
    }, []);

    const saveFavorites = useCallback((favSet) => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favSet)));
        setFavorites(favSet);
    }, []);

    const toggleFavorite = useCallback((id) => {
        const newFavs = new Set(favorites);
        if (newFavs.has(id)) {
            newFavs.delete(id);
        } else {
            newFavs.add(id);
        }
        saveFavorites(newFavs);
    }, [favorites, saveFavorites]);

    const addToRecent = useCallback((templeId) => {
        const existing = recentIds;
        const next = [templeId, ...existing.filter(id => id !== templeId)].slice(0, 9);
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
        setRecentIds(next);
    }, [recentIds]);

    const computeFiltered = useCallback(() => {
        let list = [...temples];

        if (onlyFavorites) {
            list = list.filter(t => favorites.has(t.id));
        }

        if (searchQuery) {
            const q = normalize(searchQuery);
            list = list.filter(t => {
                const haystack = [
                    t.name, t.city, t.state, t.deity,
                    ...(Array.isArray(t.tags) ? t.tags : [])
                ].map(normalize).join(" ");
                return haystack.includes(q);
            });
        }

        if (locationFilter) {
            list = list.filter(t => locationKey(t) === locationFilter);
        }

        if (deityFilter) {
            list = list.filter(t => (t.deity || "") === deityFilter);
        }

        if (nearbyCenter) {
            list = list.map(t => {
                const geo = t.geo;
                if (!geo || !Number.isFinite(geo.lat) || !Number.isFinite(geo.lng)) {
                    return { t, distance: Infinity };
                }
                return { t, distance: haversineKm(nearbyCenter, geo) };
            }).sort((a, b) => a.distance - b.distance).map(x => x.t);
        } else if (sortBy === "az") {
            list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        } else if (sortBy === "popular") {
            list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        } else if (sortBy === "latest") {
            list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        }

        return list;
    }, [temples, onlyFavorites, favorites, searchQuery, normalize, locationFilter,
        deityFilter, locationKey, nearbyCenter, haversineKm, sortBy]);

    useEffect(() => {
        if (temples.length) {
            const locs = getUniqueSorted(temples.map(locationKey));
            const deits = getUniqueSorted(temples.map(t => t.deity || ""));
            setLocations(locs);
            setDeities(deits);
        }
    }, [temples, locationKey, getUniqueSorted]);

    useEffect(() => {
        const filtered = computeFiltered();
        setFilteredTemples(filtered);
    }, [computeFiltered]);

    useEffect(() => {
        setViewLimit(PAGE_SIZE);
    }, [searchQuery, locationFilter, deityFilter, sortBy, onlyFavorites, nearbyCenter]);

    const handleNearby = () => {
        if (!navigator.geolocation) {
            alert(currentLang === "hi" ? "जियोलोकेशन समर्थित नहीं है" : "Geolocation not supported");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setNearbyCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            },
            () => {
                alert(currentLang === "hi" ? "लोकेशन अनुमति अस्वीकृत" : "Location permission denied");
            }
        );
    };

    const resetSearch = () => {
        setSearchQuery("");
        setNearbyCenter(null);
    };

    const loadMore = () => {
        setViewLimit(prev => prev + PAGE_SIZE);
    };

    const displayedTemples = filteredTemples.slice(0, viewLimit);
    const hasMore = filteredTemples.length > viewLimit;
    const featuredTemples = [...temples]
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 6);
    const favoriteTemples = temples.filter(t => favorites.has(t.id));
    const recentTemples = recentIds.map(id => temples.find(t => t.id === id)).filter(Boolean);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">🕉️</div>
                    <div className="text-xl text-orange-600">Loading temples...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />

            <Hero
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                resetSearch={resetSearch}
                handleNearby={handleNearby}
                templeCount={temples.length}
                favoriteCount={favorites.size}
                currentLang={currentLang}
            />

            <FestivalBanner
                temples={temples}
                setFestivalMatchedIds={setFestivalMatchedIds}
                currentLang={currentLang}
            />

            <main className="container mx-auto px-4 py-8">
                <section id="explore" className="mb-12">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {currentLang === "hi" ? "मंदिर खोजें" : "Explore Temples"}
                        </h2>
                        <p className="text-gray-600">
                            {currentLang === "hi"
                                ? "मंदिर खोजें, फिल्टर करें और विवरण पेज खोलें।"
                                : "Search, filter and open your existing temple detail pages."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                {currentLang === "hi" ? "स्थान" : "Location"}
                            </label>
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            >
                                <option value="">{currentLang === "hi" ? "सभी स्थान" : "All locations"}</option>
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                {currentLang === "hi" ? "देवता" : "Deity"}
                            </label>
                            <select
                                value={deityFilter}
                                onChange={(e) => setDeityFilter(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            >
                                <option value="">{currentLang === "hi" ? "सभी देवता" : "All deities"}</option>
                                {deities.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                {currentLang === "hi" ? "क्रम" : "Sort"}
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            >
                                <option value="az">A–Z</option>
                                <option value="popular">{currentLang === "hi" ? "लोकप्रिय" : "Popular"}</option>
                                <option value="latest">{currentLang === "hi" ? "नवीनतम" : "Latest"}</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <label className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition">
                                <input
                                    type="checkbox"
                                    checked={onlyFavorites}
                                    onChange={(e) => setOnlyFavorites(e.target.checked)}
                                    className="w-4 h-4 accent-orange-600"
                                />
                                <span className="font-bold text-gray-700">
                                    {currentLang === "hi" ? "केवल बुकमार्क" : "Only bookmarks"}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="text-gray-600 font-bold mb-4">
                        {currentLang === "hi" ? "दिखाए जा रहे हैं" : "Showing"} {displayedTemples.length} {currentLang === "hi" ? "में से" : "of"} {filteredTemples.length}
                        {nearbyCenter && ` • ${currentLang === "hi" ? "पास के सुझाव चालू" : "Nearby suggestions enabled"}`}
                    </div>

                    <TempleGrid
                        temples={displayedTemples}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onAddToRecent={addToRecent}
                        festivalMatchedIds={festivalMatchedIds}
                        currentLang={currentLang}
                    />

                    {hasMore && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={loadMore}
                                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition shadow-md hover:shadow-lg"
                            >
                                {currentLang === "hi" ? "और दिखाएं" : "Load More"}
                            </button>
                        </div>
                    )}
                </section>

                <section id="featured" className="mb-12 py-8 px-4 rounded-2xl bg-white shadow-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {currentLang === "hi" ? "विशेष / लोकप्रिय मंदिर" : "Featured / Popular Temples"}
                        </h2>
                        <p className="text-gray-600">
                            {currentLang === "hi"
                                ? "अपनी आध्यात्मिक यात्रा शुरू करने के लिए कुछ लोकप्रिय मंदिर।"
                                : "A few trending temples to start your spiritual journey."}
                        </p>
                    </div>
                    <TempleGrid
                        temples={featuredTemples}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onAddToRecent={addToRecent}
                        festivalMatchedIds={festivalMatchedIds}
                        currentLang={currentLang}
                    />
                </section>

                <section id="favorites" className="mb-12">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {currentLang === "hi" ? "बुकमार्क किए गए मंदिर" : "Bookmarked Temples"}
                        </h2>
                        <p className="text-gray-600">
                            {currentLang === "hi"
                                ? "मंदिर सेव करें और कभी भी वापस आएं।"
                                : "Save temples and come back anytime."}
                        </p>
                    </div>
                    <TempleGrid
                        temples={favoriteTemples}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onAddToRecent={addToRecent}
                        festivalMatchedIds={festivalMatchedIds}
                        currentLang={currentLang}
                        emptyMessage={currentLang === "hi"
                            ? "अभी कोई बुकमार्क नहीं है। मंदिर सेव करने के लिए बुकमार्क आइकन दबाएं।"
                            : "No bookmarks yet. Click the bookmark icon on a temple card to save it."}
                    />
                </section>

                <section id="recent" className="mb-12">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {currentLang === "hi" ? "हाल में देखे गए" : "Recently Viewed"}
                        </h2>
                        <p className="text-gray-600">
                            {currentLang === "hi"
                                ? "आपके खोले गए मंदिरों तक तुरंत पहुंच।"
                                : "Quick access to temples you opened."}
                        </p>
                    </div>
                    <TempleGrid
                        temples={recentTemples}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onAddToRecent={addToRecent}
                        festivalMatchedIds={festivalMatchedIds}
                        currentLang={currentLang}
                        emptyMessage={currentLang === "hi"
                            ? "अभी कोई मंदिर नहीं देखा गया। मंदिर खोलने के बाद यहां दिखेगा।"
                            : "No temples viewed yet. Open a temple to see it here."}
                    />
                </section>
            </main>

            <Footer currentLang={currentLang} templeName="Shree Dharma Temple" />
        </div>
    );
};

export default HomePage;