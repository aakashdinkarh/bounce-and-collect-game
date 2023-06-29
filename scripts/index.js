let g = 0.08; //default gravity
let e = 0.8; //default elasticty
let e_x = Math.min(e * 1.2, 0.99); //e effect on horizontal velocity when ball touch on vertical edges

const minimumHorizontalSpeedToMove = 0.01;
const rotateFactor = 0.2;
const frameRate = 10;
let currentScore = 0;
let highestScore = 0;

let isMouseDown = false;
let intervalId;
let timeoutId;
let isLongClick = false;

const ball = document.getElementById('ball');
const field = document.getElementById('field');
const currentScoreCount = document.getElementById('score-earned');
const highestScoreCount = document.getElementById('highest-score-earned');

const fieldOuterCoords = document.querySelectorAll('.field-coords .outer-coords .coordinates');
const fieldInnerCoords = document.querySelectorAll('.field-coords .inner-coords .coordinates');
const mouseCoords = document.querySelectorAll('.mouse-coords .coordinates');
const directionLine = document.querySelector('.direction-line');
const frameRateText = document.querySelector('#frame-rate');

const developerModeButton = document.querySelector('.developer-mode-secret-button');
const developerModeDiv = document.querySelector('.developer-mode');
const developerModeCloseButton = developerModeDiv.querySelector('.close-button');
const editableStyleTag = developerModeDiv.querySelector('style');

const theme = document.getElementById('theme');
const overlay = document.querySelector('.overlay');

const fieldWidth = document.querySelector('.field-width');
const fieldHeight = document.querySelector('.field-height');

const storedMouseCoordinates = {
    x: 0,
    y: 0,
}

overlay.addEventListener('click', function() {
    overlay.remove()
    projectileMotion()
})

// writeFieldCoords();

frameRateText.innerHTML = frameRate;

field.addEventListener('click', moveTheBall);

// document.addEventListener('mousemove', writeMouseCoords);

field.addEventListener('mousemove', showDirectionOfThrow);
field.addEventListener('mousemove', updateStoredMouseCoordinates);

field.addEventListener('mousedown', handleMouseDown);
field.addEventListener('mousedown', updateStoredMouseCoordinates);

field.addEventListener('mouseup', handleMouseUp);
field.addEventListener('mouseup', updateStoredMouseCoordinates);

theme.addEventListener('change', handleThemeChange);

developerModeButton.addEventListener('mousedown', onMouseDown);
developerModeButton.addEventListener('mouseup', onMouseUp);
developerModeCloseButton.addEventListener('click', closeDeveloperModeDiv)
editableStyleTag.addEventListener('keydown', handleKeyDown);
