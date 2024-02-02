function getRelativeToField(elemCoords){
    const fieldCoords = getCoords('field');

    return {
        left: elemCoords.left - fieldCoords.left,
        right: elemCoords.right - fieldCoords.left,
        top: elemCoords.top - fieldCoords.top,
        bottom: elemCoords.bottom - fieldCoords.top,
    }
}

function getCoords(id, relativeToField = false) {
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
    return elemCoords;
}
