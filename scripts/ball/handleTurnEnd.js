function getWinText(cumulativeScoresArray = []) {
	const winTextMapping = {
		one: `Congratulations &#127881; ${PLAYER_NAME_LABEL_MAPPING.one} Won!!`,
		cpu: 'Such a Loser, Try again!',
		tie: "It's a tie! Play again and make a win...",
	};

	const maxScore = Math.max(...cumulativeScoresArray);
	const maxScoreIndices = [];

	for (let i = 0; i < numberOfPlayers; i++) {
		if (cumulativeScoresArray[i] === maxScore) {
			maxScoreIndices.push(i);
		}
	}

	const clearWin = maxScoreIndices.length === 1;
	const isCpuWin = clearWin && maxScoreIndices[0] === cumulativeScoresArray.length - 1;
	const isTie = !clearWin;

	if (playMode === '1_vs_cpu') {
		if (isCpuWin) {
			return winTextMapping.cpu;
		}
		if (isTie) {
			return winTextMapping.tie;
		}
		return `Congratulations &#127881; ${
			PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[maxScoreIndices[0] + 1]]
		} Won!!`;
	}
	// Multiplayer
	if (clearWin) {
		return `Congratulations &#127881; ${
			PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[maxScoreIndices[0] + 1]]
		} Won!!`;
	}
	if (numberOfPlayers <= 2) {
		return winTextMapping.tie;
	}
	return `Congratulations &#127881; ${maxScoreIndices
		.map((playerIndex) => PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[playerIndex + 1]])
		.join(', ')} are Winners!!`;
}

function cpuTurn() {
	const clientX = generateRandomCoordinates(0, field.clientWidth);
	const clientY = generateRandomCoordinates(0, field.clientHeight);

	moveTheBall({ clientX, clientY });
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
		// game-finished
		const cumulativeScoresArray = scoresArray.reduce(
			(cumulativeScores, perRoundScoresArray) =>
				perRoundScoresArray.map((score, index) => score + cumulativeScores[index]),
			Array(numberOfPlayers).fill(0)
		);

		const overlayDiv = document.createElement('div');
		overlayDiv.className = 'overlay game-finished';
		overlayDiv.innerHTML = `<div class="celebrating-text"><div class="winning-text">${getWinText(
			cumulativeScoresArray
		)}</div></div>
				${cumulativeScoresArray
					.slice(0, -1)
					.map(
						(score, index) =>
							`<div class="score-details">${
								PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[index + 1]]
							} : ${score}</div>`
					)
					.join('')}
                <div class="score-details">${
					playMode === '1_vs_cpu'
						? PLAYER_NAME_LABEL_MAPPING.cpu
						: PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[cumulativeScoresArray.length]]
				} : ${cumulativeScoresArray[cumulativeScoresArray.length - 1]}</div>
            <button class="restart-button">Click anywhere to restart</button>`;

		overlayDiv.addEventListener('click', () => {
			overlayDiv.remove();
			resetGame(true);
		});
		document.body.append(overlayDiv);

		document.activeElement.blur();
		return;
	}

	handleTurnChangeEffects({ turnToggle: true });
	makePlaygroundEnable();

	if (playMode === '1_vs_cpu' && currentSelectedPlayer === 'cpu') {
		cpuTurn();
	}
}
