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

		const scoreTable = scoreBoard.querySelector('table');

		const tableColgroup = scoreTable.querySelector('colgroup');
		const tableHeadRow = scoreTable.querySelector('thead tr');
		const tableHeadHtmlContent = ARRAY_FOR_ITERATION(numberOfPlayers)
			.map(playerNameKeyWrapper(getPlayerNameThElem))
			.join('');

		tableHeadRow.innerHTML = tableHeadHtmlContent;
		tableColgroup.outerHTML = getTableColGroup();
	}

	handleTurnChangeEffects({ turnToggle });
	clearInterval(intervalId);

	field.scrollIntoView({ behavior: 'smooth' });
	makePlaygroundEnable();
}
