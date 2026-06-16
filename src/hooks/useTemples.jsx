// hooks/useTemples.js
import { useState, useEffect } from 'react';
import nagdevtaHeroImage from '../../Assets/naagdevta/nd8.jpeg';

const templeImageOverrides = {
    "nagdevta-temple": nagdevtaHeroImage
};

const useTemples = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load temples from JSON file
    const loadTemples = async () => {
        try {
            setLoading(true);
            const response = await fetch('/temples.json');
            if (!response.ok) throw new Error('Failed to load temples');
            const data = await response.json();
            const temples = (data.temples || []).map((temple) => {
                const overrideImage = templeImageOverrides[temple.id];
                if (!overrideImage) return temple;

                return {
                    ...temple,
                    image: overrideImage,
                    images: [overrideImage, ...(temple.images || []).filter((image) => image !== overrideImage)]
                };
            });
            setTemples(temples);
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
        error
    };
};

export default useTemples;
