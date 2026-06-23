// hooks/useTemples.js
import { useState, useEffect } from 'react';

const useTemples = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTemples = async () => {
        try {
            setLoading(true);
            const response = await fetch('/temples.json?t=' + Date.now());
            if (!response.ok) throw new Error('Failed to load temples');
            const data = await response.json();
            setTemples(data.temples || []);
            setError(null);
        } catch (err) {
            console.error('Error loading temples:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTemples();
    }, []);

    return {
        temples,
        loading,
        error,
    };
};

export default useTemples;