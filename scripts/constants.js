let g = 0.08; //default gravity
let e = 0.8; //default elasticty
let playMode = 'free_play' //default play mode
let maximumPossiblePoints = 15; //maximum points that can be earned
let e_x = Math.min(e * 1.2, 0.99); //e effect on horizontal velocity when ball touch on vertical edges

const minimumHorizontalSpeedToMove = 0.01;
const rotateFactor = 0.2;
const frameRate = 10;
let currentScore = 0;
let highestScore = 0;

let intervalId;
let timeoutId;
let isMouseDown = false;
let isLongClick = false;
let isPlaygroundDisabled = false;

let currentPlayerSelected = 'one';

const storedMouseCoordinates = {
    x: 0,
    y: 0,
}
