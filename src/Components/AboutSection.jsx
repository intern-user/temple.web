import { useEffect, useRef } from 'react';

const AboutSection = ({ temple, currentLang }) => {
    const trackRef = useRef(null);

    useEffect(() => {
        if (trackRef.current) {
            trackRef.current.style.animation = 'aboutTempleSlideUp 18s linear infinite';
        }
    }, []);

    const images = temple?.images?.length ? temple.images : [temple?.image];
    const galleryImages = [...images, ...images, ...images];

    return (
        <section id="about" className="py-16 px-4 relative overflow-hidden">
            {/* Fixed: Use dangerouslySetInnerHTML instead of <style jsx> */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes aboutTempleSlideUp {
                        from { transform: translateY(0); }
                        to { transform: translateY(calc(-50% - 9px)); }
                    }
                `
            }} />

            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-12">
                    {currentLang === "hi" ? "हमारे बारे में" : "About Us"}
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Image Gallery */}
                    <div className="relative h-[500px] overflow-hidden rounded-2xl bg-stone-800/50 p-4 border border-amber-800/30">
                        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900/40" />
                        <div ref={trackRef} className="flex flex-col gap-4">
                            {galleryImages.slice(0, 9).map((img, idx) => (
                                <div key={idx} className="flex-shrink-0 rounded-xl overflow-hidden">
                                    <img
                                        src={img}
                                        alt={`${temple?.name || 'Temple'} ${idx + 1}`}
                                        className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-amber-800/30 backdrop-blur-sm">
                        <span className="inline-block px-3 py-1 bg-amber-600/30 rounded-full text-amber-300 text-sm font-bold mb-4">
                            {currentLang === "hi" ? "भक्ति का जीवंत केंद्र" : "A living center of devotion"}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-amber-200 mb-4">
                            {currentLang === "hi"
                                ? "हर भक्त के लिए पूजा, सेवा और पवित्र संस्कृति का संरक्षण।"
                                : "Preserving worship, service, and sacred culture for every devotee."}
                        </h3>
                        <p className="text-amber-300/80 mb-4">
                            {temple?.description || `${temple?.name || 'Temple'} is a peaceful spiritual home dedicated to daily worship, seva, festival celebrations, and the preservation of timeless cultural values.`}
                        </p>
                        <p className="text-amber-300/80 mb-6">
                            {currentLang === "hi"
                                ? "यह मंदिर आरती, भजन, प्रसाद, सामुदायिक सेवा और शिक्षा के माध्यम से भक्तों को जोड़ता है। इसका आध्यात्मिक वातावरण प्रार्थना, चिंतन और पीढ़ियों के जुड़ाव को प्रोत्साहित करता है।"
                                : "The temple brings devotees together through aarti, bhajan, prasad, community service, and learning. Its spiritual environment supports prayer, reflection, and connection across generations."}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-amber-800/30">
                                <strong className="block text-amber-200 font-bold">
                                    {currentLang === "hi" ? "दैनिक दर्शन" : "Daily Darshan"}
                                </strong>
                                <span className="text-amber-400 text-sm">
                                    {currentLang === "hi" ? "सुबह और शाम की पूजा" : "Morning and evening worship"}
                                </span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-amber-800/30">
                                <strong className="block text-amber-200 font-bold">
                                    {currentLang === "hi" ? "सामुदायिक सेवा" : "Community Seva"}
                                </strong>
                                <span className="text-amber-400 text-sm">
                                    {currentLang === "hi" ? "भोजन, शिक्षा और सहयोग" : "Food, learning, and care"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;