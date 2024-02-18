function cpuTurn() {
	const clientX = generateRandomCoordinates(0, field.clientWidth);
	const clientY = generateRandomCoordinates(0, field.clientHeight);

	moveTheBall({ clientX, clientY });
}

function getWinText(cumulativeScoresArray = []) {
	const maxScore = Math.max(...cumulativeScoresArray);
	const maxScoreIndices = [];

	for (let i = 0; i < numberOfPlayers; i++) {
		if (cumulativeScoresArray[i] === maxScore) {
			maxScoreIndices.push(i);
		}
	}

	const cpuScore = playMode === ONE_VS_CPU ? cumulativeScoresArray[cumulativeScoresArray.length - 1] : null;

	const isClearWin = maxScoreIndices.length === 1;
	const isCpuWin = isClearWin && maxScore === cpuScore;

	if (isCpuWin) {
		return WIN_TEXT_MAPPING.cpu;
	}

	if (isClearWin && !isCpuWin) {
		return WIN_TEXT_MAPPING.playerWin(getPlayerName(maxScoreIndices[0] + 1));
	}

	if (numberOfPlayers <= 2) {
		return WIN_TEXT_MAPPING.tie;
	}

	return WIN_TEXT_MAPPING.playersWin(maxScoreIndices.map((playerIndex) => getPlayerName(playerIndex + 1)));
}

function handleGameFinish() {
	const cumulativeScoresArray = scoresArray.reduce(
		(cumulativeScores, perRoundScoresArray) =>
			perRoundScoresArray.map((score, index) => score + cumulativeScores[index]),
		Array(numberOfPlayers).fill(0)
	);

	const overlayDiv = document.createElement('div');
	overlayDiv.className = 'overlay game-finished';

	let overlayDivHtmlContent = getCelebratingDivElem({ cumulativeScoresArray });

	overlayDivHtmlContent += `${cumulativeScoresArray
		.map(
			playerNameKeyWrapper((playerNameKey, score) =>
				getScoreDetailDivElement({
					playerName: PLAYER_NAME_LABEL_MAPPING[playerNameKey],
					playerScore: score,
				})
			)
		)
		.join('')}`;

	overlayDivHtmlContent += restartButton;

	overlayDiv.innerHTML = overlayDivHtmlContent;

	overlayDiv.addEventListener('click', function () {
		this.remove();
		resetGame(true);
	});
	document.body.append(overlayDiv);

	document.activeElement.blur();
}

async function handleTurnEnd() {
	highestScore = Math.max(currentScore, highestScore);
	updateHighestScore(highestScore);

	clearTrajectory();
	clearScoreDots();
	showScoreDots();

	await new Promise((resolve) => {
		if (currentScore === maximumPossibleScore) {
			perfectScoreTextDiv.classList.toggle('show');
			setTimeout(() => {
				perfectScoreTextDiv.classList.toggle('show');
				resolve();
			}, 3000);
		} else {
			resolve();
		}
	});

	if (playMode === FREE_PLAY) {
		makePlaygroundEnable();
		return;
	}

	if (currentScores.length >= numberOfPlayers - 1) {
		scoresArray.push([...currentScores, currentScore]);
		numberOfRoundsPassed += 1;
		currentScores = [];
	} else {
		currentScores.push(currentScore);
	}

	updateScoresTable();

	if (numberOfRoundsPassed >= totalNumberOfRounds) {
		handleGameFinish();
		return;
	}

	handleTurnChangeEffects({ turnToggle: true });
	makePlaygroundEnable();

	if (playMode === ONE_VS_CPU && currentSelectedPlayer === PLAYER_NAME_KEY.cpu) {
		cpuTurn();
	}
}
