// Components/PradhanSection.jsx
import React from 'react';
import gramPradhanImage from '../../Assets/naagdevta/GP.avif';

const PradhanSection = ({ temple, currentLang }) => {
    const pradhan = temple?.pradhanProfile;
    const profileImage = temple.id === "nagdevta-temple" ? gramPradhanImage : temple.pradhanImage;

    // Check if pradhan profile has any data
    const hasPradhanData = () => {
        if (!pradhan) return false;
        return pradhan.name || pradhan.designation || pradhan.gramPanchayat ||
            pradhan.district || pradhan.phoneNo || pradhan.desc1 ||
            pradhan.desc2 || pradhan.desc3;
    };

    if (!hasPradhanData()) {
        return null;
    }

    return (
        <section id="pradhan" className="py-16 px-4 bg-linear-to-br from-stone-800 to-stone-900">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-8">
                    {currentLang === "hi" ? "ग्राम प्रधान" : "Gram Pradhan"}
                </h2>

                <div className="bg-linear-to-br from-amber-900/30 to-orange-900/30 rounded-2xl p-6 md:p-8 border border-amber-700/30 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-start">

                        <div className="flex-shrink-0 self-center md:self-start">
                            <div className="w-36 h-36 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={pradhan.name || "Gram Pradhan"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl text-amber-100">
                                        GP
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pradhan Details */}
                        <div className="flex-1">
                            {pradhan.name && (
                                <h3 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 text-center md:text-left">
                                    {pradhan.name}
                                </h3>
                            )}

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {pradhan.designation && (
                                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                                        <span className="text-2xl">📌</span>
                                        <div>
                                            <p className="text-amber-400 text-xs uppercase tracking-wider">
                                                {currentLang === "hi" ? "पद" : "Designation"}
                                            </p>
                                            <p className="text-amber-200 font-semibold">{pradhan.designation}</p>
                                        </div>
                                    </div>
                                )}

                                {pradhan.gramPanchayat && (
                                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                                        <span className="text-2xl">🏘️</span>
                                        <div>
                                            <p className="text-amber-400 text-xs uppercase tracking-wider">
                                                {currentLang === "hi" ? "ग्राम पंचायत" : "Gram Panchayat"}
                                            </p>
                                            <p className="text-amber-200 font-semibold">{pradhan.gramPanchayat}</p>
                                        </div>
                                    </div>
                                )}

                                {pradhan.district && (
                                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                                        <span className="text-2xl">🗺️</span>
                                        <div>
                                            <p className="text-amber-400 text-xs uppercase tracking-wider">
                                                {currentLang === "hi" ? "जिला" : "District"}
                                            </p>
                                            <p className="text-amber-200 font-semibold">{pradhan.district}</p>
                                        </div>
                                    </div>
                                )}

                                {pradhan.phoneNo && (
                                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                                        <span className="text-2xl">📞</span>
                                        <div>
                                            <p className="text-amber-400 text-xs uppercase tracking-wider">
                                                {currentLang === "hi" ? "फोन नंबर" : "Phone No"}
                                            </p>
                                            <p className="text-amber-200 font-semibold">
                                                <a href={`tel:${pradhan.phoneNo}`} className="hover:text-amber-300 transition">
                                                    {pradhan.phoneNo}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Descriptions */}
                            <div className="space-y-4 mt-4">
                                {pradhan.desc1 && (
                                    <div className="bg-amber-900/20 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="text-amber-300 leading-relaxed">
                                            <span className="text-amber-400 text-xl mr-2">✨</span>
                                            {pradhan.desc1}
                                        </p>
                                    </div>
                                )}

                                {pradhan.desc2 && (
                                    <div className="bg-amber-900/20 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="text-amber-300 leading-relaxed">
                                            <span className="text-amber-400 text-xl mr-2">🌟</span>
                                            {pradhan.desc2}
                                        </p>
                                    </div>
                                )}

                                {pradhan.desc3 && (
                                    <div className="bg-amber-900/30 rounded-lg p-5 italic border border-amber-600/50">
                                        <p className="text-amber-200 leading-relaxed text-center">
                                            <span className="text-amber-400 text-2xl mr-2">💬</span>
                                            "{pradhan.desc3}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PradhanSection;
