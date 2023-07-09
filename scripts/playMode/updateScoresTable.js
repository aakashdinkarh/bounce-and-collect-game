function updateScoresTable(){
    const mergedArray = [...scoresArray, currentScores, ...[...Array(totalNumberOfRounds - 1).keys()].map(() => [])];

    const tRows = mergedArray.slice(0,totalNumberOfRounds).reduce((prev, [score1, score2]) => {
        prev += `<tr>
            <td>${score1 ?? '-'}</td>
            <td>${score2 ?? '-'}</td>
        </tr>`;
        return prev;
    }, '');

    scoreTableBody.innerHTML = tRows;
}
