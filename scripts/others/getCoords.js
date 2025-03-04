const CACHEABLE_KEYS = ['coords-field-false', 'coords-field-true'];

function getRelativeToField(elemCoords){
    const cacheKey = 'coords-field-false';
    let fieldCoords;
    
    if (window.CacheManager.has(cacheKey)) {
        fieldCoords = window.CacheManager.get(cacheKey);
    } else {
        fieldCoords = getCoords('field');
    }

    return {
        left: elemCoords.left - fieldCoords.left,
        right: elemCoords.right - fieldCoords.left,
        top: elemCoords.top - fieldCoords.top,
        bottom: elemCoords.bottom - fieldCoords.top,
    }
}

function getCoords(id, relativeToField = false) {
    const cacheKey = `coords-${id}-${relativeToField}`;
    
    if (window.CacheManager.has(cacheKey)) {
        return window.CacheManager.get(cacheKey);
    }

    const elem = document.getElementById(id);
    const elemBorderWidth = parseFloat(getComputedStyle(elem).borderWidth);
    const { left, top } = elem.getBoundingClientRect();

    let elemCoords = {
        left: left + elemBorderWidth, //elemX + elemBorderLeftWidth
        right: left + elemBorderWidth + elem.clientWidth,
        top: top + elemBorderWidth, //elemY + elemBorderTopWidth
        bottom: top + elemBorderWidth + elem.clientHeight,
    };

    if(relativeToField) {
        elemCoords = getRelativeToField(elemCoords);
    }

    if(CACHEABLE_KEYS.includes(cacheKey)) {
        window.CacheManager.set(cacheKey, elemCoords);
    }
    return elemCoords;
}
