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

    if (playMode !== 'free_play') {
        // need refactoring here
        scoreBoard.classList.add('show');
        updateScoresTable();
        const [firstPlayer, secondPlayer] = scoreBoard.querySelectorAll('table thead th');
        firstPlayer.innerText = PLAYER_NAME_LABEL_MAPPING.one;
        secondPlayer.innerText = playMode === '1_vs_1' ? PLAYER_NAME_LABEL_MAPPING.two : PLAYER_NAME_LABEL_MAPPING.cpu;
    } else {
        scoreBoard.classList.remove('show');
    }

    handleTurnChangeEffects({ turnToggle });
    clearInterval(intervalId);
    
    makePlaygroundEnable();
}
