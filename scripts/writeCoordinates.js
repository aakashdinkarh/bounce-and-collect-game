function writeFieldCoords() {
    const { top, left } = getCoords('field');

    fieldOuterCoords[0].innerHTML = 'X : ' + left;
    fieldOuterCoords[1].innerHTML = 'Y : ' + top;

    fieldInnerCoords[0].innerHTML = 'X : ' + (left + field.clientLeft);
    fieldInnerCoords[1].innerHTML = 'Y : ' + (top + field.clientTop);

    fieldWidth.innerHTML = 'Field width : ' + field.clientWidth;
    fieldHeight.innerHTML = 'Field height : ' + field.clientHeight;
}
