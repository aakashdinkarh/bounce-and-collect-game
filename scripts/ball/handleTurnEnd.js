function cpuTurn() {
	const clientX = generateRandomCoordinates(0, field.clientWidth);
	const clientY = generateRandomCoordinates(0, field.clientHeight);

	moveTheBall({ clientX, clientY });
}

function getWinText(cumulativeScoresArray = []) {
	const maxScore = Math.max(...cumulativeScoresArray);
	const maxScoreIndices = [];

	for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
		if (cumulativeScoresArray[i] === maxScore) {
			maxScoreIndices.push(i);
		}
	}

	const cpuScore = PLAY_MODE === ONE_VS_CPU ? cumulativeScoresArray[cumulativeScoresArray.length - 1] : null;

	const isClearWin = maxScoreIndices.length === 1;
	const isCpuWin = isClearWin && maxScore === cpuScore;

	if (isCpuWin) {
		return WIN_TEXT_MAPPING.cpu;
	}

	if (isClearWin && !isCpuWin) {
		return WIN_TEXT_MAPPING.playerWin(getPlayerName(maxScoreIndices[0] + 1));
	}

	if (NUMBER_OF_PLAYERS <= 2) {
		return WIN_TEXT_MAPPING.tie;
	}

	return WIN_TEXT_MAPPING.playersWin(maxScoreIndices.map((playerIndex) => getPlayerName(playerIndex + 1)));
}

function handleGameFinish() {
	const cumulativeScoresArray = overallScoresArray.reduce(
		(cumulativeScores, perRoundScoresArray) =>
			perRoundScoresArray.map((score, index) => score + cumulativeScores[index]),
		Array(NUMBER_OF_PLAYERS).fill(0)
	);

	const overlayDiv = document.createElement('div');
	overlayDiv.className = 'overlay game-finished';

	let overlayDivHtmlContent = getCelebratingDivElem({ cumulativeScoresArray });

	overlayDivHtmlContent += `${cumulativeScoresArray
		.map(
			playerNameKeyWrapper((playerNameKey, score) =>
				getScoreDetailDivElement({
					playerName: PLAYER_NAME_KEY_LABEL_MAPPING[playerNameKey],
					playerScore: score,
				})
			)
		)
		.join('')}`;

	overlayDivHtmlContent += restartButton;

	overlayDiv.innerHTML = overlayDivHtmlContent;

	overlayDiv.addEventListener('click', function () {
		this.remove();
		resetGame();
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
		if (currentScore === MAXIMUM_POSSIBLE_SCORE) {
			perfectScoreTextDiv.classList.toggle('show');
			setTimeout(() => {
				perfectScoreTextDiv.classList.toggle('show');
				resolve();
			}, 3000);
		} else {
			resolve();
		}
	});

	if (PLAY_MODE === FREE_PLAY) {
		makePlaygroundEnable();
		return;
	}

	if (currentScoresArray.length >= NUMBER_OF_PLAYERS - 1) {
		overallScoresArray.push([...currentScoresArray, currentScore]);
		numberOfRoundsPassed += 1;
		currentScoresArray = [];
	} else {
		currentScoresArray.push(currentScore);
	}

	updateScoresTable();

	if (numberOfRoundsPassed >= TOTAL_NUMBER_OF_ROUNDS) {
		handleGameFinish();
		return;
	}

	handleTurnChangeEffects({ isTurnChange: true });
	makePlaygroundEnable();

	if (PLAY_MODE === ONE_VS_CPU && currentSelectedPlayer === PLAYER_NAME_KEY.cpu) {
		cpuTurn();
	}
}
