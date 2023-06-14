let audioTimeoutId;

function makeBallHitSound(){
    audio.currentTime = 0;
    audio.play();    
    audioTimeoutId = setTimeout(() => {
        audio.pause();
    }, 500)
}