function getWinText(){
    const winTextMapping = {
        one: `Congratulations, ${playerOneName} Won!!`,
        two: `Congratulations, ${playerTwoName} Won!!`,
        cpu: 'Such a Loser, Try again!',
        tie: "It's a tie! Play again and make a win..."
    }

    const { score1, score2 } = scoresArray.reduce(
        ({ score1, score2 }, [player1, player2]) => ({
            score1: player1 + score1,
            score2: player2 + score2,
        }),
        { score1: 0, score2: 0 }
    );

    if (playMode === '1_vs_1') {
        if (score1 > score2) return winTextMapping.one;
        if (score1 < score2) return winTextMapping.two;
        return winTextMapping.tie;
    } else if (playMode === '1_vs_cpu') {
        if (score1 > score2) return winTextMapping.one;
        if (score1 < score2) return winTextMapping.cpu;
        return winTextMapping.tie;
    }
    return '';
}

function handleTurnEnd(){
    highestScore = Math.max(currentScore, highestScore);
    updateHighestScore(highestScore);

    if(isPlaygroundDisabled){
        isPlaygroundDisabled = false;
        makePlaygroundEnable();
    }

    if (playMode !== 'free_play') {
        if(currentScores.length >= 1) {
            scoresArray.push([...currentScores, currentScore]);
            numberOfRoundsPassed += 1;
            currentScores = [];
        } else {
            currentScores.push(currentScore);
        }

        updateScoresTable();

        if (numberOfRoundsPassed >= totalNumberOfRounds) { //game-finished
            const overlayDiv = document.createElement('div');
            overlayDiv.className = 'overlay game-finished';
            overlayDiv.innerHTML = `<div class="celebrating-text">${getWinText()}</div>
                <button class="restart-button" onclick="resetGame()">Replay</button>`;

            overlayDiv.addEventListener('click', () => overlayDiv.remove());
            document.body.append(overlayDiv);
        } else {
            handleModeChangeEffects({ togglePlayer : true });
        }
    }
}
