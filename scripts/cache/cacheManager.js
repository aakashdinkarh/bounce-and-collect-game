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

        // Add method to get cache size
        size() {
            return cache.size;
        }
    };
})();

// Make it available globally
window.CacheManager = CacheManager;
