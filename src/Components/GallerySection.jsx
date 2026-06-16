import { useRef } from 'react';
import nd1 from '../../Assets/naagdevta/nd1.jpeg';
import nd2 from '../../Assets/naagdevta/nd2.jpeg';
import nd3 from '../../Assets/naagdevta/nd3.jpeg';
import nd4 from '../../Assets/naagdevta/nd4.jpeg';
import nd5 from '../../Assets/naagdevta/nd5.jpeg';
import nd6 from '../../Assets/naagdevta/nd6.jpeg';
import nd7 from '../../Assets/naagdevta/nd7.jpeg';
import nd8 from '../../Assets/naagdevta/nd8.jpeg';
import nd9 from '../../Assets/naagdevta/nd9.jpeg';
import ndVideo1 from '../../Assets/naagdevta/nd.video1.mp4';

const nagdevtaGallery = [nd1, nd2, nd3, nd4, nd5, nd6, nd7, nd8, nd9].map((image, index) => ({
    title: `Nagdevta Temple ${index + 1}`,
    image,
    description: "Sacred views from Nagdevta Temple and its surrounding devotional spaces."
}));

const nagdevtaVideos = [
    {
        title: "Nagdevta Temple 1",
        video: ndVideo1,
        description: "Temple moments captured in motion with devotion, atmosphere, and live darshan feel."
    }
];

const GallerySection = ({ temple, currentLang }) => {
    const carouselRef = useRef(null);
    const videoCarouselRef = useRef(null);
    const isNagdevta = temple.id === "nagdevta-temple";

    const scrollGallery = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth * 0.92;
            carouselRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollVideos = (direction) => {
        if (videoCarouselRef.current) {
            const scrollAmount = videoCarouselRef.current.clientWidth * 0.8;
            videoCarouselRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const gallery = isNagdevta ? nagdevtaGallery : (temple.gallery || [
        { title: "Main Darshan", image: temple.image, description: temple.description },
        { title: "Temple Architecture", image: "/Assets/n2.jpeg", description: "Sacred architecture and peaceful temple surroundings." },
        { title: "Festival Moments", image: "/Assets/n3.jpeg", description: "Devotee gatherings, aarti, and celebration moments." }
    ]);

    const videoGallery = isNagdevta ? nagdevtaVideos : (temple.videoGallery || []);

    return (
        <section id="gallery" className="py-16 px-4 bg-white/5">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-4">
                    {currentLang === "hi" ? "मंदिर फोटो गैलरी" : "Temple Photo Gallery"}
                </h2>

                <div className="relative px-12 md:px-16">
                    <button
                        onClick={() => scrollGallery(-1)}
                        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg"
                        aria-label="Scroll gallery left"
                    >
                        &lsaquo;
                    </button>

                    <div
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {gallery.map((item, idx) => (
                            <div
                                key={idx}
                                className="shrink-0 snap-start"
                                style={{
                                    flex: '0 0 calc((100% - 3rem) / 3)',
                                    maxWidth: 'calc((100% - 3rem) / 3)'
                                }}
                            >
                                <div className="bg-white/10 rounded-2xl overflow-hidden border border-amber-800/30 hover:-translate-y-1 transition duration-300 h-full flex flex-col">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={item.image || temple.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            style={{ objectPosition: isNagdevta ? "center 58%" : "center" }}
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80";
                                            }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-amber-200 mb-2">{item.title}</h3>
                                        <p className="text-amber-400 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollGallery(1)}
                        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg"
                        aria-label="Scroll gallery right"
                    >
                        &rsaquo;
                    </button>
                </div>

                {videoGallery.length > 0 && (
                    <>
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mt-16 mb-4">
                            {currentLang === "hi" ? "मंदिर वीडियो गैलरी" : "Temple Video Gallery"}
                        </h2>

                        <div className="relative px-12 md:px-16">
                            <button
                                onClick={() => scrollVideos(-1)}
                                className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg"
                                aria-label="Scroll video gallery left"
                            >
                                &lsaquo;
                            </button>

                            <div
                                ref={videoCarouselRef}
                                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1"
                                style={{ scrollbarWidth: 'none' }}
                            >
                                {videoGallery.map((item, idx) => (
                                    <div key={idx} className="shrink-0 w-75 md:w-87.5 snap-start">
                                        <div className="bg-white/10 rounded-2xl overflow-hidden border border-amber-800/30 hover:-translate-y-1 transition duration-300">
                                            <video
                                                src={item.video}
                                                poster={item.poster || temple.image}
                                                controls
                                                playsInline
                                                preload="metadata"
                                                className="w-full h-56 object-cover bg-black"
                                                style={{ objectPosition: isNagdevta ? "center 58%" : "center" }}
                                            />
                                            <div className="p-4">
                                                <h3 className="font-bold text-amber-200 mb-2">{item.title}</h3>
                                                <p className="text-amber-400 text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollVideos(1)}
                                className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-stone-950/80 text-amber-300 hover:bg-amber-600 hover:text-white transition flex items-center justify-center border border-amber-500/50 shadow-lg"
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
