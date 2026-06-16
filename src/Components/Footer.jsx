
import React from 'react';

const Footer = ({ currentLang, templeName }) => {
    return (
        <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-8">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-300">
                    © 2026 {templeName || "Shree Dharma Temple"}. All Rights Reserved.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                    {currentLang === "hi"
                        ? "संपर्क: temple@example.com | +91 98765 43210"
                        : "Contact: temple@example.com | +91 98765 43210"}
                </p>
            </div>
        </footer>
    );
};

export default Footer;