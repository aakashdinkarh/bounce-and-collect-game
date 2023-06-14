let g = 0.08; //gravity
let e = 0.8; //elasticty

const ball = document.getElementById('ball');
const field = document.getElementById('field');
const groundHitsCount = document.getElementById('ground-hits');
const audio = document.getElementById('ball-hit-audio');

let intervalId;
let timeoutId;

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    e = form.elasticity.value;
    g = form.gravity.value;

    ball.style.top = 0 + 'px';
    ball.style.left = 0 + 'px';

    freeFall();
}

writeFieldCoords();

fillDots();

freeFall();

field.addEventListener('click', moveTheBall);
document.addEventListener('mousemove', writeMouseCoords);
