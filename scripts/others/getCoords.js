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

/**
 * @description Get the coordinates of the element
 * @param {string} id - The id of the element
 * @param {boolean} relativeToField - Whether to get the coordinates relative to the field
 * @param {boolean} getFromCache - Whether to get the coordinates from the cache
 * @returns {Object} The coordinates of the element
 */
function getCoords(id, relativeToField = false, getFromCache = false) {
    const cacheKey = `coords-${id}-${relativeToField}`;

    if (getFromCache && window.CacheManager.has(cacheKey)) {
        return window.CacheManager.get(cacheKey);
    }

    const { elem, elemBorderWidth } = getElemAndBorderWidth(id);

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

    if(COORDS_CACHEABLE_KEYS.includes(cacheKey)) {
        window.CacheManager.set(cacheKey, elemCoords);
    }
    return elemCoords;
}

function getElemAndBorderWidth(id) {
    const cacheKey = `${id}-elem-and-border-width`;

    if(window.CacheManager.has(cacheKey)) {
        return window.CacheManager.get(cacheKey);
    }

    const elem = document.getElementById(id);
    const elemBorderWidth = parseFloat(getComputedStyle(elem).borderWidth);

    window.CacheManager.set(cacheKey, { elem, elemBorderWidth });

    return { elem, elemBorderWidth };
}
