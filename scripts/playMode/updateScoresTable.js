function getTableData(score) {
	return `<td>${score ?? '-'}${
		score === maximumPossibleScore ? '<span class="perfect-score-star">&#9733;</span>' : ''
	}</td>`;
}

function updateScoresTable() {
	const mergedArray = [...scoresArray, currentScores, ...ARRAY_FOR_ITERATION(totalNumberOfRounds).map(() => [])];

	const tRows = mergedArray.slice(0, totalNumberOfRounds).reduce((prev, curr) => {
		prev += `<tr>${ARRAY_FOR_ITERATION(numberOfPlayers).map((index) => getTableData(curr[index])).join('')}</tr>`;
		return prev;
	}, '');

	scoreTableBody.innerHTML = tRows;
}
