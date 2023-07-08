function handleMouseDown(){
    isMouseDown = true;
    directionLine.style.display = 'block';
}

function handleMouseUp(){
    isMouseDown = false;
    directionLine.style.display = '';
}

function updateStoredMouseCoordinates(e){
    storedMouseCoordinates.x = e.clientX;
    storedMouseCoordinates.y = e.clientY;
}

function writeMouseCoords(e){
    mouseCoords[0].innerHTML = 'X : ' + e.clientX;
    mouseCoords[1].innerHTML = 'Y : ' + e.clientY;
}
