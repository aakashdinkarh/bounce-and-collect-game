let audioTimeoutId;

function makeBallHitSound(){
    const audio = document.createElement('audio');
    audio.src = '../sound/ball-hits-sound.mp3';
    audio.autoplay = true;
    
    document.body.append(audio);
    
    audioTimeoutId = setTimeout(() => {
        audio.remove();
    }, 500)
}