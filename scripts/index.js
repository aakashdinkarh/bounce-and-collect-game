let g = 0.08; //default gravity
let e = 0.8; //default elasticty
const minimumHorizontalSpeedToMove = 0.01;
const rotateFactor = 0.2;
let groundHits = 0;
const frameRate = 10;

let isMouseDown = false;
let intervalId;
let timeoutId;

const ball = document.getElementById('ball');
const field = document.getElementById('field');
const groundHitsCount = document.getElementById('ground-hits');

const fieldOuterCoords = document.querySelectorAll('.field-coords .outer-coords .coordinates');
const fieldInnerCoords = document.querySelectorAll('.field-coords .inner-coords .coordinates');
const mouseCoords = document.querySelectorAll('.mouse-coords .coordinates');
const directionLine = document.querySelector('.direction-line');
const frameRateText = document.querySelector('#frame-rate');

const fieldWidth = document.querySelector('.field-width');
const fieldHeight = document.querySelector('.field-height');

const storedMouseCoordinates = {
    x: 0,
    y: 0,
}

// fillDots();

writeFieldCoords();

frameRateText.innerHTML = frameRate;

projectileMotion();

field.addEventListener('click', moveTheBall);

document.addEventListener('mousemove', writeMouseCoords);

field.addEventListener('mousemove', showDirectionOfThrow);
field.addEventListener('mousemove', updateStoredMouseCoordinates);

field.addEventListener('mousedown', handleMouseDown);
field.addEventListener('mousedown', updateStoredMouseCoordinates);

field.addEventListener('mouseup', handleMouseUp);
field.addEventListener('mouseup', updateStoredMouseCoordinates);
