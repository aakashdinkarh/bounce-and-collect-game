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
    const { left, top } = elem.getBoundingClientRect();

    let elemCoords = {
        left: left + elem.clientLeft, //elemX + elemBorderLeftWidth
        right: left + elem.clientLeft + elem.clientWidth,
        top: top + elem.clientTop, //elemY + elemBorderTopWidth
        bottom: top + elem.clientTop + elem.clientHeight,
    };

    if(relativeToField) {
        elemCoords = getRelativeToField(elemCoords);
    }
    return elemCoords;
}
