function resetGame(turnToggle = false){
    ball.style.top = (field.clientHeight - ball.clientHeight) + 'px';
    ball.style.left = 0 + 'px';

    resetCurrentScore();
    resetHighestScore();

    clearTrajectory();
    clearScoreDots();
    showScoreDots();

    scoresArray = [];
    numberOfRoundsPassed = 0;

    if(playMode === '1_vs_cpu'){
        // need refactoring here
        scoreBoard.classList.add('show');
        updateScoresTable();

        const tableHeadRow = scoreBoard.querySelector('table thead tr');

        const tableHeadData = `<th>${PLAYER_NAME_LABEL_MAPPING.one}</th>` + `<th>${PLAYER_NAME_LABEL_MAPPING.cpu}</th>`;
        tableHeadRow.innerHTML = tableHeadData;
    } else if (playMode === 'multiplayer') {
        // need refactoring here
        scoreBoard.classList.add('show');
        updateScoresTable();

        const tableHeadRow = scoreBoard.querySelector('table thead tr');

        const tableHeadData = ARRAY_FOR_ITERATION(numberOfPlayers).map((index) => `<th>${PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[`${index+1}`]]}</th>`).join('');
        tableHeadRow.innerHTML = tableHeadData;
    } else {
        scoreBoard.classList.remove('show');
    }

    handleTurnChangeEffects({ turnToggle });
    clearInterval(intervalId);
    
    field.scrollIntoView({ behavior: 'smooth' });
    makePlaygroundEnable();
}
