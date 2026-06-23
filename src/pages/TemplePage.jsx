import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AboutSection from '../Components/AboutSection';
import CertificateSection from '../Components/CertificateSection';
import DonationSection from '../Components/DonationSection';
import FestivalCountdown from '../Components/FestivalCountdown';
import Footer from '../Components/Footer';
import GallerySection from '../Components/GallerySection';
import SevaBooking from '../Components/SevaBooking';
import TempleHeader from '../Components/TempleHeader';
import TempleHero from '../Components/TempleHero';
import TraditionsSection from '../Components/TraditionsSection';
import TransparencySection from '../Components/TransparencySection';
import PradhanSection from '../Components/PradhanSection';

const TemplePage = () => {
    const [searchParams] = useSearchParams();
    const templeId = searchParams.get("id");
    const [temple, setTemple] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLang, setCurrentLang] = useState("en");

    useEffect(() => {
        if (!templeId) {
            window.location.replace("/");
            return;
        }

        const loadTemple = async () => {
            try {
                const response = await fetch("/temples.json?t=" + Date.now());
                if (!response.ok) throw new Error('Failed to load temples');
                const data = await response.json();
                const temples = data?.temples || [];
                const found = temples.find(t => String(t.id) === templeId);

                if (!found) {
                    setError("Temple not found");
                } else {
                    setTemple(found);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTemple();
        const savedLang = localStorage.getItem("preferredTempleLanguage");
        if (savedLang === "hi" || savedLang === "en") {
            setCurrentLang(savedLang);
        }
    }, [templeId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                <div className="text-2xl text-amber-800">Loading...</div>
            </div>
        );
    }

    if (error || !temple) {
        return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-red-600 mb-4">Temple not found</h1>
                    <a href="/" className="px-6 py-3 bg-orange-600 text-white rounded-xl">Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-stone-900 via-stone-800 to-stone-900">
            <TempleHeader temple={temple} currentLang={currentLang} setCurrentLang={setCurrentLang} />
            <TempleHero temple={temple} currentLang={currentLang} />
            <AboutSection temple={temple} currentLang={currentLang} />
            <GallerySection temple={temple} currentLang={currentLang} />
            <TraditionsSection currentLang={currentLang} />
            <FestivalCountdown currentLang={currentLang} />
            <PradhanSection temple={temple} currentLang={currentLang} />
            <DonationSection temple={temple} currentLang={currentLang} />
            <SevaBooking temple={temple} currentLang={currentLang} />
            <TransparencySection currentLang={currentLang} />
            <CertificateSection temple={temple} currentLang={currentLang} />
            <Footer currentLang={currentLang} templeName={temple.name} />
        </div>
    );
};

export default TemplePage;