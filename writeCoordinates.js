
function writeMouseCoords(e){
    const mouseCoords = document.querySelectorAll('.mouse-coords .coordinates');
    mouseCoords[0].innerHTML = 'X : ' + e.clientX;
    mouseCoords[1].innerHTML = 'Y : ' + e.clientY;
}

function writeFieldCoords() {
    const {width, height, top, left} = field.getBoundingClientRect();

    const fieldOuterCoords = document.querySelectorAll('.field-coords .outer-coords .coordinates');
    fieldOuterCoords[0].innerHTML = 'X : ' + left;
    fieldOuterCoords[1].innerHTML = 'Y : ' + top;

    const fieldInnerCoords = document.querySelectorAll('.field-coords .inner-coords .coordinates');
    fieldInnerCoords[0].innerHTML = 'X : ' + (left + field.clientLeft);
    fieldInnerCoords[1].innerHTML = 'Y : ' + (top + field.clientTop);

    const fieldWidth = document.querySelector('.field-width');
    const fieldHeight = document.querySelector('.field-height');

    fieldWidth.innerHTML = 'Width : ' + width;
    fieldHeight.innerHTML = 'Height : ' + height;
}
