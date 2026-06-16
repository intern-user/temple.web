import { useState } from 'react';

const CertificateSection = ({ temple, currentLang }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        purpose: ''
    });
    const [certificateData, setCertificateData] = useState(null);

    const parseRupees = (value) => {
        const num = Number(value);
        return Number.isFinite(num) ? num : 0;
    };

    const getDonorTotalDonations = (donations, donorName) => {
        const target = donorName.trim().toLowerCase();
        if (!target) return 0;
        return donations.reduce((sum, donation) => {
            if ((donation.name || "").trim().toLowerCase() !== target) return sum;
            const amount = parseRupees(donation.amount);
            return Number.isFinite(amount) && amount > 0 ? sum + amount : sum;
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const donations = JSON.parse(localStorage.getItem(`donations:${temple.id}`) || "[]");
        const amount = parseRupees(formData.amount);

        if (!donations.length) {
            alert(currentLang === "hi"
                ? "प्रमाणपत्र बनाने से पहले कृपया दान अनुभाग में दान दर्ज करें।"
                : "Please log a donation in the Donation section before generating a certificate.");
            return;
        }

        if (amount <= 0) {
            alert(currentLang === "hi" ? "कृपया मान्य दान राशि दर्ज करें।" : "Please enter a valid donation amount.");
            return;
        }

        const totalByDonor = getDonorTotalDonations(donations, formData.name);
        if (totalByDonor < amount) {
            alert(currentLang === "hi"
                ? `इस नाम से कुल दान ₹${Math.floor(totalByDonor)} है। प्रमाणपत्र के लिए दान राशि मेल नहीं खा रही।`
                : `Total donations found for this name are ₹${Math.floor(totalByDonor)}. Certificate can only be generated for donated amount.`);
            return;
        }

        setCertificateData({
            ...formData,
            amount,
            certificateId: "SDT-" + Date.now(),
            date: new Date().toLocaleDateString(currentLang === "hi" ? "hi-IN" : "en-IN")
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const purposeLabels = {
        Annadanam: { en: "Annadanam", hi: "अन्नदान" },
        "Temple Maintenance": { en: "Temple Maintenance", hi: "मंदिर रखरखाव" },
        "Festival Seva": { en: "Festival Seva", hi: "त्योहार सेवा" },
        "General Donation": { en: "General Donation", hi: "सामान्य दान" }
    };

    return (
        <section id="certificate" className="py-16 px-4 bg-stone-950/35">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-200">
                        {currentLang === "hi" ? "दाता के लिए डिजिटल प्रसाद प्रमाणपत्र" : "Digital Prashad Certificate for Donor"}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    <div className="rounded-2xl border-2 border-amber-500/60 bg-amber-50 p-4 md:p-6 shadow-xl shadow-black/20">
                        {certificateData ? (
                            <>
                                <div id="certificateBox" className="min-h-[420px] rounded-xl bg-white p-8 text-center border-8 border-double border-orange-600">
                                    <h2 className="text-2xl font-bold text-orange-800 mb-2">
                                        {currentLang === "hi" ? "डिजिटल प्रसाद प्रमाणपत्र" : "Digital Prashad Certificate"}
                                    </h2>
                                    <p className="text-stone-600">
                                        {currentLang === "hi" ? "यह प्रमाणपत्र आशीर्वाद सहित प्रदान किया जाता है" : "This certificate is presented with blessings to"}
                                    </p>
                                    <div className="text-3xl font-bold text-orange-600 my-4">
                                        {certificateData.name}
                                    </div>
                                    <p className="text-stone-600">
                                        {currentLang === "hi" ? "पवित्र दान राशि" : "For a sacred donation of"} ₹{Math.floor(certificateData.amount).toLocaleString()}
                                    </p>
                                    <p className="text-stone-600 mt-2">
                                        {currentLang === "hi" ? "उद्देश्य:" : "Purpose:"} {purposeLabels[certificateData.purpose]?.[currentLang] || certificateData.purpose}
                                    </p>
                                    <p className="text-stone-600">
                                        {currentLang === "hi" ? "प्रमाणपत्र आईडी:" : "Certificate ID:"} {certificateData.certificateId}
                                    </p>
                                    <p className="text-stone-600">
                                        {currentLang === "hi" ? "दिनांक:" : "Date:"} {certificateData.date}
                                    </p>
                                    <p className="text-stone-600 italic mt-4">
                                        {currentLang === "hi"
                                            ? "ईश्वर का आशीर्वाद शांति, समृद्धि और सुख प्रदान करे।"
                                            : "May the divine blessings bring peace, prosperity and happiness."}
                                    </p>
                                    <h3 className="text-xl font-bold text-orange-800 mt-4">{temple.name}</h3>
                                </div>
                                <button
                                    onClick={handlePrint}
                                    className="mt-4 w-full py-3 bg-linear-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition"
                                >
                                    {currentLang === "hi" ? "प्रमाणपत्र डाउनलोड / प्रिंट करें" : "Download / Print Certificate"}
                                </button>
                            </>
                        ) : (
                            <div
                                className="min-h-[420px] rounded-xl border-8 border-double border-orange-500/70 bg-white p-8 text-center flex flex-col items-center justify-center"
                                style={{
                                    backgroundImage: "radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.18) 0 10px, transparent 11px), radial-gradient(circle at 80% 80%, rgba(234, 88, 12, 0.16) 0 12px, transparent 13px), repeating-linear-gradient(45deg, rgba(245, 158, 11, 0.08) 0 8px, transparent 8px 18px)"
                                }}
                            >
                                <div className="text-sm font-bold uppercase tracking-[0.25em] text-orange-700">
                                    Certificate Preview
                                </div>
                                <div className="my-6 h-px w-36 bg-orange-300" />
                                <div className="text-3xl font-bold text-orange-800">
                                    {temple.name}
                                </div>
                                <p className="mt-4 max-w-xs text-stone-600">
                                    Generated donor certificate will appear here with name, amount, purpose, date, and certificate ID.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl bg-white/10 p-6 border-2 border-amber-500/50 shadow-xl shadow-black/20">
                        <h3 className="text-xl font-bold text-amber-200 mb-4">
                            {currentLang === "hi" ? "दाता प्रमाणपत्र बनाएं" : "Generate Donor Certificate"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={currentLang === "hi" ? "दाता का नाम" : "Donor Name"}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder={currentLang === "hi" ? "दान राशि" : "Donation Amount"}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                min="1"
                                required
                            />
                            <select
                                value={formData.purpose}
                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                className="w-full p-3 rounded-xl bg-white/90 text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            >
                                <option value="">{currentLang === "hi" ? "उद्देश्य चुनें" : "Select Purpose"}</option>
                                <option value="Annadanam">{currentLang === "hi" ? "अन्नदान" : "Annadanam"}</option>
                                <option value="Temple Maintenance">{currentLang === "hi" ? "मंदिर रखरखाव" : "Temple Maintenance"}</option>
                                <option value="Festival Seva">{currentLang === "hi" ? "त्योहार सेवा" : "Festival Seva"}</option>
                                <option value="General Donation">{currentLang === "hi" ? "सामान्य दान" : "General Donation"}</option>
                            </select>
                            <button
                                type="submit"
                                className="w-full py-3 bg-linear-to-r from-orange-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition"
                            >
                                {currentLang === "hi" ? "प्रमाणपत्र बनाएं" : "Generate Certificate"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;
