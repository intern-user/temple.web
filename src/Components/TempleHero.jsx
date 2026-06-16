const TempleHero = ({ temple, currentLang }) => {
    return (
        <section
            className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(rgba(43, 17, 8, 0.62), rgba(43, 17, 8, 0.52)), url("${temple.image || 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1600&q=80'}")`
            }}
        >
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {currentLang === "hi" ? `${temple.name} में आपका स्वागत है` : `Welcome to ${temple.name}`}
                </h1>
                <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                    {currentLang === "hi"
                        ? "भक्ति, शांति, सेवा, त्योहारों और विश्वभर के भक्तों के आध्यात्मिक जुड़ाव का पवित्र स्थान।"
                        : "A sacred place for devotion, peace, seva, festivals, and spiritual connection for devotees across the world."}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <a href="#donation" className="px-6 py-3 bg-linear-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition">
                        {currentLang === "hi" ? "अभी दान करें" : "Donate Now"}
                    </a>
                 
                </div>
            </div>
        </section>
    );
};

export default TempleHero;