const audioTimeout = {};

function playSound(id){
    clearTimeout(audioTimeout[id]);
    const audio = document.getElementById(id);

    audio.currentTime = 0;
    audio.play();
    
    audioTimeout[id] = setTimeout(() => {
        if(!audio.paused){
            audio.pause();
        }
    }, 200)
}
