// Components/GallerySection.jsx
import { useRef } from 'react';

const GallerySection = ({ temple, currentLang }) => {
    const carouselRef = useRef(null);
    const videoCarouselRef = useRef(null);

    const scrollGallery = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth * 0.9;
            carouselRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollVideos = (direction) => {
        if (videoCarouselRef.current) {
            const scrollAmount = videoCarouselRef.current.clientWidth * 0.9;
            videoCarouselRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Get images directly from temple data (these are public URLs)
    const images = temple?.images || [temple?.image];
    const videos = temple?.videos || [];

    if (!images || images.length === 0) {
        return (
            <section id="gallery" className="py-12 md:py-16 px-4 bg-white/5">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-amber-200 mb-2">
                        {currentLang === "hi" ? "मंदिर फोटो गैलरी" : "Temple Photo Gallery"}
                    </h2>
                    <p className="text-amber-400">No images available</p>
                </div>
            </section>
        );
    }

    return (
        <section id="gallery" className="py-12 md:py-16 px-4 bg-white/5">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-amber-200 mb-2">
                    {currentLang === "hi" ? "मंदिर फोटो गैलरी" : "Temple Photo Gallery"}
                </h2>
                <p className="text-center text-amber-400 text-sm md:text-base mb-6 md:mb-8">
                    {currentLang === "hi" 
                        ? "मंदिर के दिव्य दर्शन और सुंदर क्षण"
                        : "Divine glimpses and beautiful moments of the temple"}
                </p>

                <div className="relative px-4 sm:px-8 md:px-16">
                    <button
                        onClick={() => scrollGallery(-1)}
                        className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-11 md:h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg text-sm md:text-base"
                        aria-label="Scroll gallery left"
                    >
                        &lsaquo;
                    </button>

                    <div
                        ref={carouselRef}
                        className="flex gap-3 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {images.map((image, idx) => (
                            <div
                                key={idx}
                                className="shrink-0 snap-start"
                                style={{
                                    flex: '0 0 calc((100% - 0.75rem) / 1)',
                                    maxWidth: 'calc((100% - 0.75rem) / 1)'
                                }}
                            >
                                <div className="bg-white/10 rounded-2xl overflow-hidden border border-amber-800/30 hover:-translate-y-1 transition duration-300 h-full flex flex-col">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={image}
                                            alt={`${temple.name} - ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80";
                                            }}
                                        />
                                    </div>
                                    <div className="p-3 md:p-4">
                                        <h3 className="font-bold text-amber-200 text-sm md:text-base mb-1">
                                            {temple.name} {idx + 1}
                                        </h3>
                                        <p className="text-amber-400 text-xs md:text-sm line-clamp-2">
                                            {temple.description || "Sacred views from the temple"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollGallery(1)}
                        className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-11 md:h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg text-sm md:text-base"
                        aria-label="Scroll gallery right"
                    >
                        &rsaquo;
                    </button>
                </div>

                {videos.length > 0 && (
                    <>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-amber-200 mt-12 md:mt-16 mb-2">
                            {currentLang === "hi" ? "मंदिर वीडियो गैलरी" : "Temple Video Gallery"}
                        </h2>
                        <p className="text-center text-amber-400 text-sm md:text-base mb-6 md:mb-8">
                            {currentLang === "hi"
                                ? "मंदिर के दिव्य क्षण वीडियो में"
                                : "Divine moments of the temple in videos"}
                        </p>

                        <div className="relative px-4 sm:px-8 md:px-16">
                            <button
                                onClick={() => scrollVideos(-1)}
                                className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-11 md:h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg text-sm md:text-base"
                                aria-label="Scroll video gallery left"
                            >
                                &lsaquo;
                            </button>

                            <div
                                ref={videoCarouselRef}
                                className="flex gap-3 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1"
                                style={{ scrollbarWidth: 'none' }}
                            >
                                {videos.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="shrink-0 snap-start"
                                        style={{
                                            flex: '0 0 calc((100% - 0.75rem) / 1)',
                                            maxWidth: 'calc((100% - 0.75rem) / 1)'
                                        }}
                                    >
                                        <div className="bg-white/10 rounded-2xl overflow-hidden border border-amber-800/30 hover:-translate-y-1 transition duration-300">
                                            <video
                                                src={item.video}
                                                poster={item.poster || temple.image}
                                                controls
                                                playsInline
                                                preload="metadata"
                                                className="w-full h-48 md:h-56 object-cover bg-black"
                                            />
                                            <div className="p-3 md:p-4">
                                                <h3 className="font-bold text-amber-200 text-sm md:text-base mb-1">{item.title}</h3>
                                                <p className="text-amber-400 text-xs md:text-sm line-clamp-2">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollVideos(1)}
                                className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-11 md:h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg text-sm md:text-base"
                                aria-label="Scroll video gallery right"
                            >
                                &rsaquo;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default GallerySection;