function makePlaygroundDisable (){
    // desktop
    field.removeEventListener('click', moveTheBall);
    
    field.removeEventListener('mousemove', showDirectionOfThrow);

    field.removeEventListener('mousedown', handleMouseDown);
    field.removeEventListener('mousedown', showDirectionOfThrow);

    field.removeEventListener('mouseup', handleMouseUp);

    // mobile
    field.removeEventListener('touchend', moveTheBall);

    field.removeEventListener('touchmove', showDirectionOfThrow);

    field.removeEventListener('touchstart', handleMouseDown);
    field.removeEventListener('touchstart', showDirectionOfThrow);

    field.removeEventListener('touchend', handleMouseUp);
    
    field.style.cursor = 'not-allowed';

    isPlaygroundDisabled = true;

    statusTextContainer.innerText = 'Please wait...';
    statusTextContainer.className = 'wait';
}

function makePlaygroundEnable(){
    if(!isPlaygroundDisabled){
        return;
    }

    // desktop
    field.addEventListener('click', moveTheBall);

    field.addEventListener('mousemove', showDirectionOfThrow);

    field.addEventListener('mousedown', handleMouseDown);
    field.addEventListener('mousedown', showDirectionOfThrow);

    field.addEventListener('mouseup', handleMouseUp);

    // mobile
    field.addEventListener('touchend', moveTheBall, { passive: true });

    field.addEventListener('touchmove', showDirectionOfThrow, { passive: false });

    field.addEventListener('touchstart', handleMouseDown, { passive: true });
    field.addEventListener('touchstart', showDirectionOfThrow, { passive: true });

    field.addEventListener('touchend', handleMouseUp, { passive: true });

    field.style.cursor = '';

    isPlaygroundDisabled = false;

    statusTextContainer.innerText = 'Throw...';
    statusTextContainer.className = 'throw';
}
