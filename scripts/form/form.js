function assignDefaultValues() {
	form.elasticity.value = e;
	form.gravity.value = g;
	form['max-score'].value = maximumPossibleScore;
	form['play-mode'].value = PLAY_MODE_OPTIONS[0].value;
}

const playerNameField = (fieldName, fieldLabel, fieldValue) => `<label>
        <div>${fieldLabel}</div>
        <input name="${fieldName}" type="text" value="${fieldValue}" placeholder="Enter Name" required />
    </label>`;

function removePlayerFields() {
	const playerFields = form.querySelectorAll('label:has([name^="player-"])');
	playerFields.forEach((field) => field.remove());
}

function handleNumberOfPlayersChange(event) {
	const value = +event.target.value;

	removePlayerFields();

	const newPlayerFields = [...Array(value).keys()]
		.map((index) =>
			playerNameField(
				`player-${index + 1}`,
				`Player ${index + 1} Name`,
				PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[`${index + 1}`]]
			)
		)
		.reduce((prev, curr) => prev + curr, '');

	playerDetailsContainer.insertAdjacentHTML('afterend', newPlayerFields);
}

function handlePlayModeChange(event) {
	const numberOfRoundsField = `<label>
        <div>Number of Rounds</div>
        <input name="number-of-rounds" type="number" min="1" max="20" step="1" value="${totalNumberOfRounds}" required />
    </label>`;

	const value = event.target.value;

	const roundsField = form.querySelector('label:has([name=number-of-rounds])');
	const numberOfPlayersField = form.querySelector('label:has([name=number-of-players])');

	removePlayerFields();
	roundsField && roundsField.remove();
	numberOfPlayersField && numberOfPlayersField.remove();
	playerDetailsContainer.classList.remove('have-children');

	if (value === 'free_play') return;

	if (value === '1_vs_cpu') {
		const addToAfterElement = playerDetailsContainer;

		const player1Field = playerNameField('player-1', 'Player 1 Name', PLAYER_NAME_LABEL_MAPPING.one);

		let additionalFields = player1Field;
		additionalFields += numberOfRoundsField;

		addToAfterElement.insertAdjacentHTML('afterend', additionalFields);
		return;
	} else {
		// Multiplayer
		playerDetailsContainer.classList.add('have-children');
		const addToAfterElement = form.querySelector('label:has([name=play-mode])');

		// todo: refactor wrt maxNumberOfMultiplayer
		const newNumberOfPlayersField = `<label>
            <div>Number of Players</div>
            <select name="number-of-players" required onChange="handleNumberOfPlayersChange(event)">
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
                <option value="6" label="6"></option>
            </select>
        </label>`;

		const playerFields = [...Array(2).keys()]
			.map((index) =>
				playerNameField(
					`player-${index + 1}`,
					`Player ${index + 1} Name`,
					PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[`${index + 1}`]]
				)
			)
			.reduce((prev, curr) => prev + curr, '');

		addToAfterElement.insertAdjacentHTML('afterend', newNumberOfPlayersField);
		playerDetailsContainer.insertAdjacentHTML('afterend', playerFields + numberOfRoundsField);
	}
}

function handleSubmit(event) {
	event.preventDefault();
	const form = event.target;

	document.activeElement.blur();

	e = +form.elasticity.value || e;
	g = +form.gravity.value || g;
	maximumPossibleScore = +form['max-score'].value || maximumPossibleScore;
	playMode = form['play-mode'].value || 'free_play';
	numberOfPlayers = +(form['number-of-players'] || {}).value || numberOfPlayers;
	totalNumberOfRounds = +(form['number-of-rounds'] || {}).value || totalNumberOfRounds;
	[...Array(maxNumberOfMultiplayer).keys()].forEach((index) => {
		PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[`${index + 1}`]] =
			(form[`player-${index + 1}`] || {}).value || PLAYER_NAME_LABEL_MAPPING[NUM_TO_WORD_MAPPING[`${index + 1}`]];
	});

	currentSelectedPlayer = Object.keys(TURN_TOGGLE_MAPPING[playMode])[0];
	e_x = Math.min(e * 1.1, 0.99);

	if(playMode === '1_vs_cpu'){
		numberOfPlayers = 2;
	}

	resetGame();
}
