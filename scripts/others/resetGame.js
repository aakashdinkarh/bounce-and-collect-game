function resetGame(turnToggle = false){
    ball.style.top = (field.clientHeight - ball.clientHeight) + 'px';
    ball.style.left = 0 + 'px';

    resetCurrentScore();
    resetHighestScore();

    clearTrajectory();
    clearScoreDots();
    showScoreDots();
    makePlaygroundEnable();

    scoresArray = [];
    numberOfRoundsPassed = 0;

    if (playMode !== 'free_play') {
        scoreBoard.classList.add('show');
        updateScoresTable();
        const [firstPlayer, secondPlayer] = scoreBoard.querySelectorAll('table thead th');
        firstPlayer.innerText = playerNameLabelMapping.one;
        secondPlayer.innerText = playMode === '1_vs_1' ? playerNameLabelMapping.two : playerNameLabelMapping.cpu;
    } else {
        scoreBoard.classList.remove('show');
    }

    handleTurnChangeEffects({ turnToggle });

    clearInterval(intervalId);
}
