import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TempleHeader from '../Components/TempleHeader';

const DonationHistory = () => {
    const [searchParams] = useSearchParams();
    const [donations, setDonations] = useState([]);
    const [currentLang, setCurrentLang] = useState("en");

   

    const purposeLabels = {
        Annadanam: "Annadanam",
        "Temple Maintenance": "Temple Maintenance",
        "Festival Seva": "Festival Seva",
        "General Donation": "General Donation",
        "Education and Community Seva": "Education and Community Seva"
    };

    const parseRupees = (value) => {
        const num = Number(value);
        return Number.isFinite(num) ? num : 0;
    };

    const formatDate = (value) => {
        const date = value ? new Date(value) : new Date();
        if (isNaN(date.getTime())) return String(value || "");
        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("donations") || "[]");
        setDonations(Array.isArray(stored) ? stored : []);
        const savedLang = localStorage.getItem("preferredTempleLanguage");
        if (savedLang === "hi" || savedLang === "en") {
            setCurrentLang(savedLang);
        }
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-stone-900 via-stone-800 to-stone-900">
            <TempleHeader currentLang={currentLang} setCurrentLang={setCurrentLang} isHistoryPage />

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-amber-200">
                        {currentLang === "hi" ? "दान इतिहास" : "Donation History"}
                    </h1>
                    <Link to="/" className="px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition">
                        {currentLang === "hi" ? "वापस दान पर" : "Back to Donation"}
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto space-y-3">
                    {donations.length === 0 ? (
                        <div className="p-8 text-center text-amber-300 bg-white/5 rounded-xl border border-amber-800/30">
                            {currentLang === "hi" ? "योगदान देने वाले पहले भक्त बनें 🙏" : "Be the first to contribute 🙏"}
                        </div>
                    ) : (
                        [...donations].reverse().map((donation, idx) => {
                            const name = donation.showPublicName ? (donation.name || "Anonymous Donor") : "Anonymous Donor";
                            const purpose = purposeLabels[donation.purpose] || donation.purpose || "General Donation";
                            const amount = parseRupees(donation.amount);

                            return (
                                <div key={idx} className="flex justify-between items-start gap-4 p-4 bg-white/5 rounded-xl border border-amber-800/30">
                                    <div>
                                        <h4 className="font-bold text-amber-200">{name}</h4>
                                        <p className="text-amber-400 text-sm font-bold">{purpose}</p>
                                        {donation.message && (
                                            <p className="text-amber-300/70 text-sm mt-2">{donation.message}</p>
                                        )}
                                        <p className="text-amber-500 text-xs mt-1">{formatDate(donation.date || donation.createdAt)}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-amber-600/20 rounded-full border border-amber-500/30 text-amber-300 font-bold">
                                        ₹{Math.floor(amount).toLocaleString("en-IN")}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
        </div>
    );
};

export default DonationHistory;