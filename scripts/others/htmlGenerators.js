const restartButton = '<button class="restart-button">Click anywhere to restart</button>';

function getCelebratingDivElem({ cumulativeScoresArray = [] }) {
	return `<div class="celebrating-text">
		<div class="winning-text">${getWinText(cumulativeScoresArray)}</div>
	</div>`;
}

function getScoreDetailDivElement({ playerName = '', playerScore = 0 }) {
	return `<div class='score-details'>${playerName} : ${playerScore}</div>`;
}

function playerNameField(fieldName, fieldLabel, fieldValue) {
	return `<label>
        <div>${fieldLabel}</div>
        <input name="${fieldName}" type="text" value="${fieldValue}" placeholder="Enter Name" required />
    </label>`;
}

function numberOfRoundsField() {
	return `<label>
		<div>Number of Rounds</div>
		<input name="number-of-rounds" type="number" min="1" max="20" step="1" value="${totalNumberOfRounds}" required />
	</label>`;
}

function getOptionElem({ label, value }) {
	return `<option label='${label}' value='${value}'></option>`;
}

function getNumberOfPlayersElem() {
	return `<label>
		<div>Number of Players</div>
		<select name="number-of-players" required onChange="handleNumberOfPlayersChange(event)">
			${ARRAY_FOR_ITERATION(maxNumberOfMultiplayer)
				.slice(1)
				.map((index) => getOptionElem({ label: index + 1, value: index + 1 }))}
		</select>
	</label>`;
}

function getCurrentPlayerNameElem() {
	return `<strong style="color: initial" >(${PLAYER_NAME_LABEL_MAPPING[currentSelectedPlayer]})</strong>`;
}

function getPlayerNameThElem(playerName) {
	return `<th>${playerName}</th>`;
}

function getTdElem(score) {
	return `<td>${score ?? '-'}${
		score === maximumPossibleScore ? '<span class="perfect-score-star">&#9733;</span>' : ''
	}</td>`;
}

function getTrElem(scoreArray) {
	return `<tr>${ARRAY_FOR_ITERATION(numberOfPlayers)
		.map((index) => getTdElem(scoreArray[index]))
		.join('')}</tr>`;
}
