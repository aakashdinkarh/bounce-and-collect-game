function resetGame(initialCall = false) {
	if(!initialCall) {
		ball.style.top = field.clientHeight - ball.clientHeight + 'px';
		ball.style.left = 0 + 'px';
	}

	currentSelectedPlayer = INITIAL_TURN_MAPPING[PLAY_MODE];

	resetCurrentScore();
	resetHighestScore();
	clearTrajectory();
	clearScoreDots();

	currentScoresArray = [];
	overallScoresArray = [];
	numberOfRoundsPassed = 0;

	clearInterval(projectileMotionIntervalId);

	if (PLAY_MODE === FREE_PLAY) {
		scoreBoard.classList.remove('show');
	} else {
		scoreBoard.classList.add('show');
		updateScoresTable();

		const tableColgroup = scoreTable.querySelector('colgroup');
		const tableHeadRow = scoreTable.querySelector('thead tr');
		const tableHeadHtmlContent = ARRAY_FOR_ITERATION(NUMBER_OF_PLAYERS)
			.map(playerNameKeyWrapper(getPlayerNameThElem))
			.join('');

		tableHeadRow.innerHTML = tableHeadHtmlContent;
		tableColgroup.outerHTML = getTableColGroup();
	}

	handleTurnChangeEffects();

	field.scrollIntoView({ behavior: 'smooth' });

	showScoreDots();
	makePlaygroundEnable();
}
