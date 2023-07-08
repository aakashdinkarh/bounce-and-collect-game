function makePlaygroundDisable (){
    field.removeEventListener('click', moveTheBall);

    field.removeEventListener('mousemove', showDirectionOfThrow);
    field.removeEventListener('mousemove', updateStoredMouseCoordinates);

    field.removeEventListener('mousedown', handleMouseDown);
    field.removeEventListener('mousedown', updateStoredMouseCoordinates);

    field.removeEventListener('mouseup', handleMouseUp);
    field.removeEventListener('mouseup', updateStoredMouseCoordinates);
}

function makePlaygroundEnable(){
    field.addEventListener('click', moveTheBall);

    field.addEventListener('mousemove', showDirectionOfThrow);
    field.addEventListener('mousemove', updateStoredMouseCoordinates);

    field.addEventListener('mousedown', handleMouseDown);
    field.addEventListener('mousedown', updateStoredMouseCoordinates);

    field.addEventListener('mouseup', handleMouseUp);
    field.addEventListener('mouseup', updateStoredMouseCoordinates);
}

function onPlayModeChange(e){
    const value = e.target.value;

    console.log(value);

    switch(value){
        case '1_vs_1' : {
            ball.className = 'ball one-vs-one';
            currentPlayerSelected = 1;
            alertPopover('Player 1');
            break;
        }
        case '1_vs_cpu' : {
            ball.className = 'ball one-vs-cpu';
            currentPlayerSelected = 1;
            alertPopover('Player 1');
            break;
        }
        case 'free_play' : {
            ball.className = 'ball free-play';
            currentPlayerSelected = 0;
            break;
        }
        default : {
            break;
        }
    }

    playMode = value;
    resetGame();
}