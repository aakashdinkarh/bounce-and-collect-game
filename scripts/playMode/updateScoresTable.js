function getTableData(score){
    return `<td>${score ?? '-'}${score === maximumPossibleScore ? '<span class="perfect-score-star">&#9733;</span>' : ''}</td>`;
}

function updateScoresTable(){
    const mergedArray = [...scoresArray, currentScores, ...[...Array(totalNumberOfRounds - 1).keys()].map(() => [])];

    const tRows = mergedArray.slice(0,totalNumberOfRounds).reduce((prev, [score1, score2]) => {
        prev += `<tr>${getTableData(score1)}${getTableData(score2)}</tr>`;
        return prev;
    }, '');

    scoreTableBody.innerHTML = tRows;
}
