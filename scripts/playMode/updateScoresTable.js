function updateScoresTable() {
	const mergedScoresArray = [...overallScoresArray, currentScoresArray, ...ARRAY_FOR_ITERATION(TOTAL_NUMBER_OF_ROUNDS).map(() => [])];

	const tRows = mergedScoresArray.slice(0, TOTAL_NUMBER_OF_ROUNDS).reduce((prevTrElem, currScoreRow) => prevTrElem + getTrElem(currScoreRow), '');

	scoreTableBody.innerHTML = tRows;
}
