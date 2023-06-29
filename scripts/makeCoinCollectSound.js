let coinTimeoutId;

function makeCoinCollectSound(){
    const audio = document.getElementById('coin-collect-sound');

    audio.currentTime = 0;
    audio.play();
    
    coinTimeoutId = setTimeout(() => {
        if(!audio.paused){
            audio.pause();
        }
    }, 200)
}
