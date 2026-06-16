import { useState } from 'react';

const SevaBooking = ({ temple, currentLang }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        sevaType: '',
        date: '',
        amount: ''
    });
    const [qrUrl, setQrUrl] = useState('');
    const [status, setStatus] = useState('');

    const sevaOptions = [
        { value: "Archana", price: 251, labelEn: "Archana", labelHi: "अर्चना" },
        { value: "Abhishekam", price: 1100, labelEn: "Abhishekam", labelHi: "अभिषेक" },
        { value: "Satyanarayan Puja", price: 2100, labelEn: "Satyanarayan Puja", labelHi: "सत्यनारायण पूजा" },
        { value: "Havan", price: 5100, labelEn: "Havan", labelHi: "हवन" }
    ];

    const templeUPI = temple?.donationInfo?.upiId || "temple@upi";

    const makeUPILink = (amount, note) => {
        return `upi://pay?pa=${templeUPI}&pn=${encodeURIComponent(temple.name)}&am=${amount || ""}&cu=INR&tn=${encodeURIComponent(note || "Seva Booking")}`;
    };

    const makeQR = (upiLink) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiLink)}`;
    };

    const handleSevaChange = (e) => {
        const selected = sevaOptions.find(opt => opt.value === e.target.value);
        if (selected) {
            setFormData({
                ...formData,
                sevaType: e.target.value,
                amount: selected.price.toString()
            });
        } else {
            setFormData({ ...formData, sevaType: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.sevaType || !formData.date) {
            setStatus(currentLang === "hi" ? "कृपया सभी फ़ील्ड भरें" : "Please fill all fields");
            return;
        }

        const booking = {
            ...formData,
            createdAt: new Date().toISOString()
        };

        const bookings = JSON.parse(localStorage.getItem(`sevaBookings:${temple.id}`) || "[]");
        bookings.push(booking);
        localStorage.setItem(`sevaBookings:${temple.id}`, JSON.stringify(bookings));

        const upiLink = makeUPILink(formData.amount, `${formData.sevaType} Seva Booking`);
        setQrUrl(makeQR(upiLink));
        setStatus(currentLang === "hi" ? "सेवा बुकिंग दर्ज हो गई। कृपया QR स्कैन कर भुगतान करें。" : "Seva booking logged. Please scan QR to complete payment.");
    };

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    return (
        <section id="seva" className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-8">
                    {currentLang === "hi" ? "सेवा बुकिंग" : "Seva Booking"}
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Booking Form */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-amber-800/30">
                        <h3 className="text-xl font-bold text-amber-200 mb-4">
                            {currentLang === "hi" ? "तिथि और भुगतान के साथ पूजा बुक करें" : "Book Puja with Date and Payment"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={currentLang === "hi" ? "पूरा नाम" : "Full Name"}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email"
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder={currentLang === "hi" ? "फोन" : "Phone"}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <select
                                value={formData.sevaType}
                                onChange={handleSevaChange}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            >
                                <option value="">{currentLang === "hi" ? "सेवा चुनें" : "Select Seva"}</option>
                                {sevaOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {currentLang === "hi" ? `${opt.labelHi} - ₹${opt.price}` : `${opt.labelEn} - ₹${opt.price}`}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                min={getTodayDate()}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <input
                                type="text"
                                value={formData.amount}
                                readOnly
                                placeholder={currentLang === "hi" ? "राशि" : "Amount"}
                                className="w-full p-3 rounded-xl bg-white/20 text-amber-300 font-bold"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-linear-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition"
                            >
                                {currentLang === "hi" ? "सेवा बुक करें और भुगतान QR बनाएं" : "Book Seva and Generate Payment QR"}
                            </button>
                            {status && (
                                <p className={`text-center ${status.includes("दर्ज") || status.includes("logged") ? 'text-green-400' : 'text-red-400'} text-sm`}>
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-amber-800/30 text-center">
                        <h3 className="text-xl font-bold text-amber-200 mb-4">
                            {currentLang === "hi" ? "सेवा भुगतान QR" : "Seva Payment QR"}
                        </h3>
                        {qrUrl ? (
                            <>
                                <img src={qrUrl} alt="Seva Payment QR" className="w-48 h-48 mx-auto bg-white p-2 rounded-xl mb-4" />
                                <a
                                    href={makeUPILink(formData.amount, `${formData.sevaType} Seva Booking`)}
                                    className="inline-block px-6 py-2 bg-linear-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition"
                                >
                                    {currentLang === "hi" ? "सेवा राशि का भुगतान करें" : "Pay Seva Amount"}
                                </a>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-64">
                                <p className="text-amber-400">
                                    {currentLang === "hi" ? "सेवा बुक करने के बाद QR यहाँ दिखेगा" : "QR will appear after booking seva"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SevaBooking;