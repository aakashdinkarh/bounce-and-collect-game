function getWinText({ score1 = 0, score2 = 0 }) {
	const winTextMapping = {
		one: `Congratulations, ${playerNameLabelMapping.one} Won!!`,
		two: `Congratulations, ${playerNameLabelMapping.two} Won!!`,
		cpu: 'Such a Loser, Try again!',
		tie: "It's a tie! Play again and make a win..."
	}

	if (score1 > score2) {
		return winTextMapping.one;
	}

	if (score1 < score2) {
		if(playMode === '1_vs_1'){
			return winTextMapping.two;
		}

		if(playMode === '1_vs_cpu'){
			return winTextMapping.cpu;
		}
	}
	return winTextMapping.tie;
}

function cpuTurn(){
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
		if(currentScore === maximumPossibleScore){
			perfectScoreTextDiv.classList.toggle('show');
			setTimeout(() => {
				perfectScoreTextDiv.classList.toggle('show');
				resolve();
			}, 3000)
		} else {
			resolve();
		}
	})

	
	if (playMode === 'free_play') {
		makePlaygroundEnable();
		return;
	}

	if (currentScores.length >= 1) {
		scoresArray.push([...currentScores, currentScore]);
		numberOfRoundsPassed += 1;
		currentScores = [];
	} else {
		currentScores.push(currentScore);
	}

	updateScoresTable();

	if (numberOfRoundsPassed >= totalNumberOfRounds) { // game-finished
		const { score1, score2 } = scoresArray.reduce(
			({ score1, score2 }, [player1, player2]) => ({
				score1: player1 + score1,
				score2: player2 + score2,
			}),
			{ score1: 0, score2: 0 }
		);

		const overlayDiv = document.createElement('div');
		overlayDiv.className = 'overlay game-finished';
		overlayDiv.innerHTML = `<div class="celebrating-text">${getWinText({ score1, score2 })}</div>
                <div class="score-details">${playerNameLabelMapping.one} : ${score1}</div>
                <div class="score-details">${playMode === '1_vs_1' ? playerNameLabelMapping.two : playerNameLabelMapping.cpu} : ${score2}</div>
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
