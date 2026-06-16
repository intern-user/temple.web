import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DonationSection = ({ temple, currentLang }) => {
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('General Donation');
    const [message, setMessage] = useState('');
    const [showPublicName, setShowPublicName] = useState(false);
    const [recentDonations, setRecentDonations] = useState([]);
    const [status, setStatus] = useState('');

    const templeUPI = temple?.donationInfo?.upiId || "temple@upi";
    const purposes = temple?.donationInfo?.purposes || [
        "General Donation", "Annadanam", "Temple Maintenance", "Festival Seva", "Education and Community Seva"
    ];

    const triggerTempleRefresh = () => {
        window.dispatchEvent(new Event('temples-updated'));
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

    const makeUPILink = (amt, note) => {
        return `upi://pay?pa=${templeUPI}&pn=${encodeURIComponent(temple.name)}&am=${amt || ""}&cu=INR&tn=${encodeURIComponent(note || "Temple Donation")}`;
    };

    const makeQR = (upiLink) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}`;
    };

    const [qrUrl, setQrUrl] = useState(makeQR(makeUPILink('', 'Temple Donation')));

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(`donations:${temple.id}`) || "[]");
        setRecentDonations(Array.isArray(stored) ? stored.slice(-5).reverse() : []);
    }, [temple.id]);

    useEffect(() => {
        const upiLink = makeUPILink(amount, purpose);
        setQrUrl(makeQR(upiLink));
    }, [amount, purpose]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!donorName || !amount || parseRupees(amount) <= 0) {
            setStatus(currentLang === "hi" ? "कृपया नाम और मान्य राशि भरें" : "Please enter name and valid amount");
            return;
        }

        const donation = {
            name: donorName,
            amount: parseRupees(amount),
            purpose,
            message,
            showPublicName,
            date: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };

        const stored = JSON.parse(localStorage.getItem(`donations:${temple.id}`) || "[]");
        stored.push(donation);
        localStorage.setItem(`donations:${temple.id}`, JSON.stringify(stored));

        // Also store in global donations
        const globalDonations = JSON.parse(localStorage.getItem("donations") || "[]");
        globalDonations.push({ ...donation, templeId: temple.id });
        localStorage.setItem("donations", JSON.stringify(globalDonations));

        setRecentDonations([donation, ...recentDonations.slice(0, 4)]);
        setDonorName('');
        setAmount('');
        setMessage('');
        setStatus(currentLang === "hi" ? "दान सफलतापूर्वक दर्ज हो गया!" : "Donation recorded successfully!");

        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section id="donation" className="py-16 px-4 bg-white/5">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-4">
                    {currentLang === "hi" ? "UPI QR द्वारा दान" : "Donation via UPI QR"}
                </h2>
                <p className="text-center text-amber-400 mb-8">
                    {temple?.donationInfo?.note || "Devotees can donate using UPI QR. NRI devotees with supported UPI-enabled NRE/NRO accounts may also use UPI."}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Donation Form */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-amber-800/30">
                        <h3 className="text-xl font-bold text-amber-200 mb-4">
                            {currentLang === "hi" ? "दान दर्ज करें" : "Log Donation"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                placeholder={currentLang === "hi" ? "दाता का नाम" : "Donor Name"}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={currentLang === "hi" ? "राशि रुपये" : "Amount INR"}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                min="1"
                                required
                            />
                            <select
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            >
                                {purposes.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={currentLang === "hi" ? "संदेश" : "Message"}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                rows="3"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showPublicName}
                                    onChange={(e) => setShowPublicName(e.target.checked)}
                                    className="w-4 h-4 accent-orange-600"
                                />
                                <span className="text-amber-300">
                                    {currentLang === "hi" ? "मेरा नाम सार्वजनिक दिखाएं" : "Show my name publicly"}
                                </span>
                            </label>
                            <button
                                type="submit"
                                className="w-full py-3 bg-linear-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition"
                            >
                                {currentLang === "hi" ? "अभी भुगतान करें" : "Pay Now"}
                            </button>
                            {status && (
                                <p className={`text-center ${status.includes("सफल") || status.includes("successful") ? 'text-green-400' : 'text-red-400'}`}>
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-amber-800/30 text-center">
                        <h3 className="text-xl font-bold text-amber-200 mb-4">
                            {currentLang === "hi" ? "स्कैन करें और भुगतान करें" : "Scan and Pay"}
                        </h3>
                        <img src={qrUrl} alt="UPI QR Code" className="w-48 h-48 mx-auto bg-white p-2 rounded-xl mb-4" />
                        <p className="text-amber-400 mb-2">
                            UPI ID: <strong className="text-amber-200">{templeUPI}</strong>
                        </p>
                        <a
                            href={makeUPILink(amount, purpose)}
                            className="inline-block px-6 py-2 bg-white/20 rounded-xl text-amber-300 font-bold hover:bg-white/30 transition"
                        >
                            {currentLang === "hi" ? "UPI ऐप से भुगतान करें" : "Pay with UPI App"}
                        </a>
                    </div>
                </div>

                {/* Recent Donations */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-amber-200">
                            {currentLang === "hi" ? "हाल के दान" : "Recent Donations"}
                        </h3>
                        <Link to="/donation-history" className="px-4 py-2 bg-white/10 rounded-xl text-amber-300 text-sm font-bold hover:bg-white/20 transition">
                            {currentLang === "hi" ? "सभी देखें" : "View All"}
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentDonations.length === 0 ? (
                            <div className="p-4 text-center text-amber-500 bg-white/5 rounded-xl">
                                {currentLang === "hi" ? "योगदान देने वाले पहले भक्त बनें 🙏" : "Be the first to contribute 🙏"}
                            </div>
                        ) : (
                            recentDonations.map((donation, idx) => {
                                const name = donation.showPublicName ? donation.name : "Anonymous Donor";
                                return (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                                        <div>
                                            <div className="font-bold text-amber-200">{name}</div>
                                            <div className="text-amber-400 text-sm">{donation.purpose}</div>
                                            {donation.message && <div className="text-amber-500 text-xs mt-1">{donation.message}</div>}
                                            <div className="text-amber-600 text-xs mt-1">{formatDate(donation.date)}</div>
                                        </div>
                                        <div className="text-amber-300 font-bold">₹{Math.floor(donation.amount).toLocaleString()}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationSection;