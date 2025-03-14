const COORDS_CACHEABLE_KEYS = ['coords-field-true', 'coords-ball-true'];
const ALL_SCORE_POINT_DOT = 'all-score-point-dot';

// Single cache manager with one shared Map
const CacheManager = (function() {
    const cache = new Map();
    
    // Single resize listener for cache invalidation
    window.addEventListener('resize', () => {
        cache.clear();
    });

    return {
        get(key) {
            return cache.get(key);
        },
        
        set(key, value) {
            cache.set(key, value);
        },
        
        has(key) {
            return cache.has(key);
        },
        
        clear() {
            cache.clear();
        },

        invalidate(key) {
            cache.delete(key);
        },
    };
})();

// Make it available globally
window.CacheManager = CacheManager;
