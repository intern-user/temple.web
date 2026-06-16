import { useEffect, useState } from 'react';

const NotificationBell = ({ temples, currentLang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const getNotifState = () => {
        const seenNew = new Set(JSON.parse(localStorage.getItem("templeExplorerNotifiedNew") || "[]"));
        const seenLive = new Set(JSON.parse(localStorage.getItem("templeExplorerNotifiedLive") || "[]"));
        return { seenNew, seenLive };
    };

    const setNotifState = (seenNew, seenLive) => {
        localStorage.setItem("templeExplorerNotifiedNew", JSON.stringify(Array.from(seenNew)));
        localStorage.setItem("templeExplorerNotifiedLive", JSON.stringify(Array.from(seenLive)));
    };

    const computeNotifications = () => {
        const { seenNew, seenLive } = getNotifState();
        const newTemples = temples.filter(t => t.isNew && !seenNew.has(t.id));
        const liveTemples = temples.filter(t => t.isLive && !seenLive.has(t.id));

        const notifs = [];
        if (newTemples.length) {
            notifs.push({
                key: "new",
                title: `${currentLang === "hi" ? "नए मंदिर जोड़े गए" : "New temples added"} (${newTemples.length})`,
                meta: newTemples.slice(0, 3).map(t => t.name).join(" • "),
                ids: newTemples.map(t => t.id)
            });
        }
        if (liveTemples.length) {
            notifs.push({
                key: "live",
                title: `${currentLang === "hi" ? "लाइव दर्शन अभी" : "Live Darshan started"} (${liveTemples.length})`,
                meta: liveTemples.slice(0, 2).map(t => t.name).join(" • "),
                ids: liveTemples.map(t => t.id)
            });
        }
        return notifs;
    };

    useEffect(() => {
        const notifs = computeNotifications();
        setNotifications(notifs);
        const totalUnread = notifs.reduce((sum, n) => sum + (n.ids?.length || 1), 0);
        setUnreadCount(totalUnread);
    }, [temples, currentLang]);

    const markRead = (key) => {
        const { seenNew, seenLive } = getNotifState();
        if (key === "new") {
            temples.filter(t => t.isNew).forEach(t => seenNew.add(t.id));
        }
        if (key === "live") {
            temples.filter(t => t.isLive).forEach(t => seenLive.add(t.id));
        }
        setNotifState(seenNew, seenLive);
        setNotifications(computeNotifications());
        setUnreadCount(0);
    };

    const markAllRead = () => {
        const { seenNew, seenLive } = getNotifState();
        temples.filter(t => t.isNew).forEach(t => seenNew.add(t.id));
        temples.filter(t => t.isLive).forEach(t => seenLive.add(t.id));
        setNotifState(seenNew, seenLive);
        setNotifications([]);
        setUnreadCount(0);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-full bg-white/10 text-amber-300 hover:bg-white/20 transition flex items-center justify-center"
            >
                🔔
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-stone-800 rounded-xl border border-amber-800/30 shadow-xl z-50">
                    <div className="flex justify-between items-center p-3 border-b border-amber-800/30">
                        <span className="font-bold text-amber-200">
                            {currentLang === "hi" ? "अपडेट" : "Updates"}
                        </span>
                        <button
                            onClick={markAllRead}
                            className="px-3 py-1 bg-white/10 rounded-lg text-amber-400 text-sm hover:bg-white/20 transition"
                        >
                            {currentLang === "hi" ? "पढ़ा हुआ" : "Mark read"}
                        </button>
                    </div>
                    <div className="max-h-80 overflow-auto p-2">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-amber-500">
                                {currentLang === "hi" ? "अभी कोई नया अपडेट नहीं है।" : "No new updates right now."}
                            </div>
                        ) : (
                            notifications.map(n => (
                                <div key={n.key} className="p-3 bg-white/5 rounded-lg mb-2">
                                    <div className="font-bold text-amber-200">{n.title}</div>
                                    <div className="text-amber-400 text-sm">{n.meta}</div>
                                    <button
                                        onClick={() => markRead(n.key)}
                                        className="mt-2 px-3 py-1 bg-white/10 rounded-lg text-amber-400 text-xs hover:bg-white/20 transition"
                                    >
                                        {currentLang === "hi" ? "पढ़ा हुआ" : "Mark read"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;