let audioTimeoutId;

function makeBallHitSound(){
    clearTimeout(audioTimeoutId);
    const audio = document.getElementById('ball-hit-audio');

    audio.currentTime = 0;
    audio.play();
    
    audioTimeoutId = setTimeout(() => {
        if(!audio.paused){
            audio.pause();
        }
    }, 200)
}
