const ball = document.getElementById('ball');
const field = document.getElementById('field');

const [perfectScoreTextDiv] = document.getElementsByClassName('perfect-score-animate');
const statusTextContainer = document.getElementById('status-text');

const currentScoreCount = document.getElementById('score-earned');
const highestScoreCount = document.getElementById('highest-score-earned');

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

const accordions = document.querySelectorAll(".accordion");
