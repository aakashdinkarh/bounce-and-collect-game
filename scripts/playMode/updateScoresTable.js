function updateScoresTable() {
	const mergedScoresArray = [
		...overallScoresArray,
		currentScoresArray,
		...ARRAY_FOR_ITERATION(TOTAL_NUMBER_OF_ROUNDS).map(() => []),
	];

	const tRows = mergedScoresArray
		.slice(0, TOTAL_NUMBER_OF_ROUNDS)
		.reduce((prevTrElem, currScoreRow) => prevTrElem + getTrElem(currScoreRow), '');

	const tableHeadRowThs = scoreTable.querySelectorAll('thead tr th');
	const totals = getTotalsTillNow([...overallScoresArray, currentScoresArray]);
	Array.from(tableHeadRowThs).forEach((th, index) => th.setAttribute('title', totals[index]));

	scoreTableBody.innerHTML = tRows;
}
