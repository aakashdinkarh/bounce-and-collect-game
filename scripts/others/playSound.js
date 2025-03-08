const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioCache = {};

async function loadSound(id, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioCache[id] = audioBuffer;
}

async function playSound(id) {
    if (!audioCache[id]) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioCache[id];
    source.connect(audioContext.destination);
    
    // Ensure the audio context is resumed in case it is suspended due to user interaction restrictions
    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }

    source.start(0);
}

// Preload all sounds
loadSound('ball-hit-audio', 'https://aakashdinkarh.github.io/static_assets/sounds/ball-hits-sound.mp3');
loadSound('coin-collect-sound', 'https://aakashdinkarh.github.io/static_assets/sounds/coin-collect-sound.mp3');

