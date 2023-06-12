function getCoords(id, relativeToField = false) {
    const elem =  document.getElementById(id);
    const { left, right, top, bottom } = elem.getBoundingClientRect();

    const elemCoords = {
        left: left + elem.clientLeft, //elemX + elemBorderLeftWidth
        right: left + elem.clientLeft + elem.clientWidth,
        top: top + elem.clientTop, //elemY + elemBorderTopWidth
        bottom: top + elem.clientTop + elem.clientHeight,
    };

    if(relativeToField) {
        const fieldCoords = getCoords('field');
        return {
            left: elemCoords.left - fieldCoords.left,
            right: elemCoords.right - fieldCoords.left,
            top: elemCoords.top - fieldCoords.top,
            bottom: elemCoords.bottom - fieldCoords.top,
        }
    }
    return elemCoords;
}