function resetGame(turnToggle = false) {
	ball.style.top = field.clientHeight - ball.clientHeight + 'px';
	ball.style.left = 0 + 'px';

	resetCurrentScore();
	resetHighestScore();

	clearTrajectory();
	clearScoreDots();
	showScoreDots();

	overallScoresArray = [];
	numberOfRoundsPassed = 0;

	if (PLAY_MODE === FREE_PLAY) {
		scoreBoard.classList.remove('show');
	} else {
		// todo : what if already added
		scoreBoard.classList.add('show');
		updateScoresTable();

		const scoreTable = scoreBoard.querySelector('table');

		const tableColgroup = scoreTable.querySelector('colgroup');
		const tableHeadRow = scoreTable.querySelector('thead tr');
		const tableHeadHtmlContent = ARRAY_FOR_ITERATION(NUMBER_OF_PLAYERS)
			.map(playerNameKeyWrapper(getPlayerNameThElem))
			.join('');

		tableHeadRow.innerHTML = tableHeadHtmlContent;
		tableColgroup.outerHTML = getTableColGroup();
	}

	handleTurnChangeEffects({ turnToggle });
	clearInterval(projectileMotionIntervalId);

	field.scrollIntoView({ behavior: 'smooth' });
	makePlaygroundEnable();
}
