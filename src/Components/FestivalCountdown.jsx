import { useEffect, useState } from 'react';

const FestivalCountdown = ({ currentLang }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date("August 15, 2026 06:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="festivals" className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-200 mb-8">
                    {currentLang === "hi" ? "आगामी त्योहार और उलटी गिनती" : "Upcoming Festival and Countdown"}
                </h2>

                <div className="bg-white/10 rounded-2xl p-8 text-center border border-amber-800/30 backdrop-blur-sm">
                    <span className="inline-block px-4 py-1 bg-amber-600/30 rounded-full text-amber-300 text-sm font-bold mb-4">
                        {currentLang === "hi" ? "अगला प्रमुख त्योहार" : "Next Major Festival"}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-200 mb-3">
                        {currentLang === "hi" ? "जन्माष्टमी महोत्सव 2026" : "Janmashtami Mahotsav 2026"}
                    </h3>
                    <p className="text-amber-400 mb-6">
                        {currentLang === "hi"
                            ? "तिथि: 15 अगस्त 2026 | विशेष अभिषेक, भजन संध्या, महा आरती और प्रसाद वितरण।"
                            : "Date: 15 August 2026 | Special Abhishek, Bhajan Sandhya, Maha Aarti and Prasad distribution."}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-linear-to-br from-orange-800 to-orange-900 rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.days}</div>
                            <div className="text-amber-300 text-sm uppercase tracking-wider">
                                {currentLang === "hi" ? "दिन" : "Days"}
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-orange-800 to-orange-900 rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.hours}</div>
                            <div className="text-amber-300 text-sm uppercase tracking-wider">
                                {currentLang === "hi" ? "घंटे" : "Hours"}
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-orange-800 to-orange-900 rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.minutes}</div>
                            <div className="text-amber-300 text-sm uppercase tracking-wider">
                                {currentLang === "hi" ? "मिनट" : "Minutes"}
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-orange-800 to-orange-900 rounded-xl p-4">
                            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.seconds}</div>
                            <div className="text-amber-300 text-sm uppercase tracking-wider">
                                {currentLang === "hi" ? "सेकंड" : "Seconds"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FestivalCountdown;