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

function clearScoreDots(){
    const scoreDots = document.querySelectorAll('.score-point-dot');

    scoreDots.forEach((scoreDot) => scoreDot.remove());
}

function getTotalsTillNow(arrayOfScores = []) {
	return arrayOfScores.reduce(
		(acc, curr) => acc.map((prevScore, index) => prevScore + (curr[index] ?? 0)),
		Array(NUMBER_OF_PLAYERS).fill(0)
	);
}
