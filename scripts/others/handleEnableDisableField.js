function makePlaygroundDisable (){
    field.removeEventListener('click', moveTheBall);

    field.removeEventListener('mousemove', showDirectionOfThrow);
    field.removeEventListener('mousemove', updateStoredMouseCoordinates);

    field.removeEventListener('mousedown', handleMouseDown);
    field.removeEventListener('mousedown', showDirectionOfThrow);
    field.removeEventListener('mousedown', updateStoredMouseCoordinates);

    field.removeEventListener('mouseup', handleMouseUp);
    field.removeEventListener('mouseup', updateStoredMouseCoordinates);

    field.style.cursor = 'not-allowed';

    isPlaygroundDisabled = true;
}

function makePlaygroundEnable(){
    if(!isPlaygroundDisabled){
        return;
    }

    field.addEventListener('click', moveTheBall);

    field.addEventListener('mousemove', showDirectionOfThrow);
    field.addEventListener('mousemove', updateStoredMouseCoordinates);

    field.addEventListener('mousedown', handleMouseDown);
    field.addEventListener('mousedown', showDirectionOfThrow);
    field.addEventListener('mousedown', updateStoredMouseCoordinates);

    field.addEventListener('mouseup', handleMouseUp);
    field.addEventListener('mouseup', updateStoredMouseCoordinates);

    field.style.cursor = '';

    isPlaygroundDisabled = false;
}
