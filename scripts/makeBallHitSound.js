let audioTimeoutId;

function makeBallHitSound(){
    const audio = document.getElementById('ball-hit-audio');

    audio.currentTime = 0;
    audio.play();
    
    audioTimeoutId = setTimeout(() => {
        audio.pause();
    }, 200)
}
