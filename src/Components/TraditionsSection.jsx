const TraditionsSection = ({ currentLang }) => {
    const traditions = [
        {
            icon: "Om",
            titleEn: "Daily Aarti",
            titleHi: "दैनिक आरती",
            descEn: "Morning and evening aarti create a calm rhythm of devotion, prayer, and collective blessings.",
            descHi: "सुबह और शाम की आरती भक्ति, प्रार्थना और सामूहिक आशीर्वाद की शांत लय बनाती है।"
        },
        {
            icon: "Seva",
            titleEn: "Seva and Prasad",
            titleHi: "सेवा और प्रसाद",
            descEn: "Devotees participate in annadanam, prasad distribution, temple care, and community service.",
            descHi: "भक्त अन्नदान, प्रसाद वितरण, मंदिर सेवा और सामुदायिक सेवा में भाग लेते हैं।"
        },
        {
            icon: "Fest",
            titleEn: "Festival Culture",
            titleHi: "त्योहार संस्कृति",
            descEn: "Major festivals bring bhajan, decoration, special puja, and joyful gatherings for all generations.",
            descHi: "मुख्य त्योहार भजन, सजावट, विशेष पूजा और सभी पीढ़ियों के लिए आनंदमय सभाएं लाते हैं।"
        },
        {
            icon: "Dharma",
            titleEn: "Cultural Learning",
            titleHi: "सांस्कृतिक शिक्षा",
            descEn: "Stories, scriptures, music, and values are shared to keep spiritual heritage meaningful and alive.",
            descHi: "आध्यात्मिक विरासत को सार्थक और जीवंत रखने के लिए कथाएं, शास्त्र, संगीत और मूल्य साझा किए जाते हैं।"
        }
    ];

    return (
        <section id="traditions" className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-12">
                    {currentLang === "hi" ? "मंदिर परंपराएं और संस्कृति" : "Temple Traditions and Culture"}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {traditions.map((tradition, idx) => (
                        <div key={idx} className="bg-white/5 rounded-2xl p-6 border-t-4 border-orange-600 border hover:-translate-y-1 transition duration-300">
                            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-amber-300 font-bold mb-4">
                                {tradition.icon}
                            </div>
                            <h3 className="text-xl font-bold text-amber-200 mb-3">
                                {currentLang === "hi" ? tradition.titleHi : tradition.titleEn}
                            </h3>
                            <p className="text-amber-400">
                                {currentLang === "hi" ? tradition.descHi : tradition.descEn}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TraditionsSection;