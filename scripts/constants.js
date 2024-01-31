let g = 0.08; //default gravity
let e = 0.8; //default elasticty
let playMode = 'free_play' //default play mode
let maximumPossibleScore = 15; //maximum points that can be earned
let totalNumberOfRounds = 3; //number of rounds to decide who wins in case of multiplayer
let e_x = Math.min(e * 1.2, 0.99); //e effect on horizontal velocity when ball touch on vertical edges

const minimumHorizontalSpeedToMove = 0.01;
const rotateFactor = 0.2;
const frameRate = 10; // 1 frame / (frameRate) ms
let currentScore = 0;
let highestScore = 0;
let numberOfRoundsPassed = 0;

let intervalId;
let timeoutId;
let isMouseDown = false;
let isLongClick = false;
let isPlaygroundDisabled = false;

let currentPlayerSelected = 'none';
let scoresArray = [];
let currentScores = [];

let playerOneName = '';
let playerTwoName = '';

const storedMouseCoordinates = {
    x: 0,
    y: 0,
}

const classNameMapping = {
    one: 'ball one',
    two: 'ball cpu',
    cpu: 'ball two',
    none: 'ball free-play',
}

const turnToogleMapping = {
    'free_play': {
        none: 'none',
    },
    '1_vs_1': {
        one: 'two',
        two: 'one',
    },
    '1_vs_cpu': {
        one: 'cpu',
        cpu: 'one',
    },
}
