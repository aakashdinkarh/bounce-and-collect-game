function updateScoresTable() {
	const mergedScoresArray = [...scoresArray, currentScores, ...ARRAY_FOR_ITERATION(totalNumberOfRounds).map(() => [])];

	const tRows = mergedScoresArray.slice(0, totalNumberOfRounds).reduce((prevTrElem, currScoreRow) => prevTrElem + getTrElem(currScoreRow), '');

	scoreTableBody.innerHTML = tRows;
}
