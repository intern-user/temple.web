const TransparencySection = ({ currentLang }) => {
    const allocations = [
        { labelEn: "Annadanam and Prasad", labelHi: "अन्नदान और प्रसाद", percentage: 35 },
        { labelEn: "Temple Maintenance", labelHi: "मंदिर रखरखाव", percentage: 25 },
        { labelEn: "Festivals and Rituals", labelHi: "त्योहार और अनुष्ठान", percentage: 25 },
        { labelEn: "Education and Community Seva", labelHi: "शिक्षा और सामुदायिक सेवा", percentage: 15 }
    ];

    return (
        <section id="transparency" className="py-16 px-4 bg-white/5">
            <div className="container mx-auto max-w-5xl">
                <div className="rounded-2xl bg-stone-950/45 p-6 md:p-8 border border-amber-700/40 shadow-xl shadow-black/20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-4">
                        {currentLang === "hi" ? "पारदर्शिता: दान का उपयोग कैसे होता है" : "Transparency: How Donations Are Used"}
                    </h2>
                    <p className="text-center text-amber-400 mb-8">
                        {currentLang === "hi"
                            ? "हम भक्तों के साथ विश्वास बनाने में विश्वास रखते हैं। पारदर्शिता के लिए दान उपयोग नियमित रूप से साझा किया जाता है।"
                            : "We believe in building trust with devotees. Donation usage is shared regularly for transparency."}
                    </p>

                    {allocations.map((item, idx) => (
                        <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-amber-200">
                                    {currentLang === "hi" ? item.labelHi : item.labelEn}
                                </span>
                                <span className="text-amber-400 font-bold">{item.percentage}%</span>
                            </div>
                            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-500"
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TransparencySection;
