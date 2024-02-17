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

	return WIN_TEXT_MAPPING.playersWin(
		maxScoreIndices.map((playerIndex) => getPlayerName(playerIndex + 1))
	);
}

function cpuTurn() {
	const clientX = generateRandomCoordinates(0, field.clientWidth);
	const clientY = generateRandomCoordinates(0, field.clientHeight);

	moveTheBall({ clientX, clientY });
}

function getScoreDetailDivElement({ playerName = '', playerScore = 0 }) {
	return `<div class='score-details'>${playerName} : ${playerScore}</div>`;
}

function handleGameFinish() {
	const cumulativeScoresArray = scoresArray.reduce(
		(cumulativeScores, perRoundScoresArray) =>
			perRoundScoresArray.map((score, index) => score + cumulativeScores[index]),
		Array(numberOfPlayers).fill(0)
	);

	const overlayDiv = document.createElement('div');
	overlayDiv.className = 'overlay game-finished';

	let overlayDivHtmlContent = `<div class="celebrating-text">
		<div class="winning-text">${getWinText(cumulativeScoresArray)}</div>
	</div>`;

	overlayDivHtmlContent += `${cumulativeScoresArray
		.slice(0, -1)
		.map(
			playerNameWrapper((playerName, score) =>
				getScoreDetailDivElement({
					playerName: playerName,
					playerScore: score,
				})
			)
		)
		.join('')}`;

	overlayDivHtmlContent += `<button class="restart-button">Click anywhere to restart</button>`;

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

	if (playMode === 'free_play') {
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

	if (playMode === '1_vs_cpu' && currentSelectedPlayer === 'cpu') {
		cpuTurn();
	}
}
