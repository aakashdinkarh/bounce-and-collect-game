function getTableData(score) {
	return `<td>${score ?? '-'}${
		score === maximumPossibleScore ? '<span class="perfect-score-star">&#9733;</span>' : ''
	}</td>`;
}

function updateScoresTable() {
	const mergedArray = [...scoresArray, currentScores, ...[...Array(totalNumberOfRounds - 1).keys()].map(() => [])];

	const tRows = mergedArray.slice(0, totalNumberOfRounds).reduce((prev, curr) => {
		prev += `<tr>${[...Array(numberOfPlayers).keys()].map((index) => getTableData(curr[index])).join('')}</tr>`;
		return prev;
	}, '');

	scoreTableBody.innerHTML = tRows;
}
