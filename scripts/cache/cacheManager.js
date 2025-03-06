const COORDS_CACHEABLE_KEYS = ['coords-field-false', 'coords-field-true'];

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
    };
})();

// Make it available globally
window.CacheManager = CacheManager;

// ------------------------------------- //

const ALL_SCORE_POINT_DOT = 'all-score-point-dot';

const StaticCacheManager = {
    cache: new Map(),
    
    set(key, value) {
        this.cache.set(key, value);
    },
    
    get(key) {
        return this.cache.get(key);
    },
    
    has(key) {
        return this.cache.has(key);
    },
    
    invalidate(key) {
        this.cache.delete(key);
    },
    
    clear() {
        this.cache.clear();
    }
};

window.StaticCacheManager = StaticCacheManager;
