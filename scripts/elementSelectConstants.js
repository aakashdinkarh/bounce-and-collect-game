const ball = document.getElementById('ball');
const field = document.getElementById('field');

const [perfectScoreTextDiv] = document.getElementsByClassName('perfect-score-animate');

const currentScoreCount = document.getElementById('score-earned');
const highestScoreCount = document.getElementById('highest-score-earned');

const fieldOuterCoords = document.querySelectorAll('.field-coords .outer-coords .coordinates');
const fieldInnerCoords = document.querySelectorAll('.field-coords .inner-coords .coordinates');
const mouseCoords = document.querySelectorAll('.mouse-coords .coordinates');

const form = document.querySelector('form');
const directionLine = document.querySelector('.direction-line');
const frameRateText = document.querySelector('#frame-rate');
const scoreBoard = document.querySelector('.score-board');
const scoreTableBody = scoreBoard.querySelector('tbody');

const developerModeButton = document.querySelector('.developer-mode-secret-button');
const developerModeDiv = document.querySelector('.developer-mode');
const developerModeCloseButton = developerModeDiv.querySelector('.close-button');
const editableStyleTag = developerModeDiv.querySelector('style');

const theme = document.getElementById('theme');
const overlay = document.querySelector('.overlay.start');

const fieldWidth = document.querySelector('.field-width');
const fieldHeight = document.querySelector('.field-height');
const accordions = document.querySelectorAll(".accordion");