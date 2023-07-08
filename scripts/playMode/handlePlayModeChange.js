function handlePlayModeChange(){
    switch(playMode){
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
            alertPopover('Free Play');
            break;
        }
        default : {
            break;
        }
    }
}
