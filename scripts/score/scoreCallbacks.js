function updateCurrentScore(score = 0){
    currentScoreCount.innerHTML = 'Current Score : ' + score;
}

function updateHighestScore(score = 0){
    highestScoreCount.innerHTML = 'Highest Score : ' + score;
}

function resetCurrentScore() {
    currentScore = 0;
    updateCurrentScore(currentScore);
}

function resetHighestScore() {
    highestScore = 0;
    updateHighestScore(highestScore);
}
