let g = 0.08; //default gravity
let e = 0.8; //default elasticty
const minimumHorizontalSpeedToMove = 0.01;
const rotateFactor = 0.2;

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

const fieldWidth = document.querySelector('.field-width');
const fieldHeight = document.querySelector('.field-height');

writeFieldCoords();

// fillDots();

projectileMotion();

field.addEventListener('click', moveTheBall);

document.addEventListener('mousemove', writeMouseCoords);
field.addEventListener('mousemove', showDirectionOfThrow);

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
