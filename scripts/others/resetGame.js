function resetGame(turnToggle = false) {
	ball.style.top = field.clientHeight - ball.clientHeight + 'px';
	ball.style.left = 0 + 'px';

	resetCurrentScore();
	resetHighestScore();

	clearTrajectory();
	clearScoreDots();
	showScoreDots();

	scoresArray = [];
	numberOfRoundsPassed = 0;

	if (playMode === FREE_PLAY) {
		scoreBoard.classList.remove('show');
	} else {
        // todo : what if already added
		scoreBoard.classList.add('show');
		updateScoresTable();

		const tableHeadRow = scoreBoard.querySelector('table thead tr');
		const tableHeadData = ARRAY_FOR_ITERATION(numberOfPlayers)
			.map(playerNameWrapper(getPlayerNameThElem))
			.join('');

		tableHeadRow.innerHTML = tableHeadData;
	}

	handleTurnChangeEffects({ turnToggle });
	clearInterval(intervalId);

	field.scrollIntoView({ behavior: 'smooth' });
	makePlaygroundEnable();
}
