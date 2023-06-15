let g = 0.08; //default gravity
let e = 0.8; //default elasticty
const minimumHorizontalSpeedToMove = 0.01;

const ball = document.getElementById('ball');
const field = document.getElementById('field');
const groundHitsCount = document.getElementById('ground-hits');

const fieldOuterCoords = document.querySelectorAll('.field-coords .outer-coords .coordinates');
const fieldInnerCoords = document.querySelectorAll('.field-coords .inner-coords .coordinates');
const mouseCoords = document.querySelectorAll('.mouse-coords .coordinates');

const fieldWidth = document.querySelector('.field-width');
const fieldHeight = document.querySelector('.field-height');

let intervalId;
let timeoutId;

writeFieldCoords();

fillDots();

freeFall();

field.addEventListener('click', moveTheBall);

document.addEventListener('mousemove', writeMouseCoords);
