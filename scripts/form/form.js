function removePlayerFields() {
	const playerInputFields = form.querySelectorAll('input[name^="player-"]');
	const persistedPlayerNameValues = Array.from(playerInputFields).map((playerInput) => playerInput.value);

	const playerFields = Array.from(playerInputFields).map((elem) => elem.closest('label'));
	Array.from(playerFields).forEach((field) => field.remove());

	return persistedPlayerNameValues;
}

function handleNumberOfPlayersChange(event) {
	const value = +event.target.value;

	const persistedPlayerNames = removePlayerFields();

	const newPlayerFields = ARRAY_FOR_ITERATION(value)
		.map((index) =>
			playerNameField(
				`player-${index + 1}`,
				`Player ${index + 1} Name`,
				persistedPlayerNames[index] ?? getPlayerName(index + 1)
			)
		)
		.reduce((prev, curr) => prev + curr, '');

	playerDetailsContainer.insertAdjacentHTML('afterend', newPlayerFields);
}

function handlePlayModeChange(event) {
	const value = event.target.value;

	const roundsField = form.querySelector('[name=number-of-rounds]')?.closest('label');
	const numberOfPlayersField = form.querySelector('[name=number-of-players]')?.closest('label');

	const persistedPlayerNames = removePlayerFields();
	roundsField && roundsField.remove();
	numberOfPlayersField && numberOfPlayersField.remove();
	playerDetailsContainer.classList.remove('have-children');

	if (value === FREE_PLAY) return;

	if (value === ONE_VS_CPU) {
		const addToAfterElement = playerDetailsContainer;

		const player1Field = playerNameField(
			'player-1',
			'Player 1 Name',
			persistedPlayerNames[0] ?? PLAYER_NAME_KEY_LABEL_MAPPING.one
		);

		let additionalFields = player1Field;
		additionalFields += numberOfRoundsField();

		addToAfterElement.insertAdjacentHTML('afterend', additionalFields);
		return;
	}
	// Multiplayer
	playerDetailsContainer.classList.add('have-children');
	const addToAfterElement = form.querySelector('[name=play-mode]').closest('label');

	const newNumberOfPlayersField = getNumberOfPlayersElem();

	const playerFields = ARRAY_FOR_ITERATION(2) // 2 = min count for multiplayer
		.map((index) =>
			playerNameField(
				`player-${index + 1}`,
				`Player ${index + 1} Name`,
				persistedPlayerNames[index] ?? getPlayerName(index + 1)
			)
		)
		.reduce((prev, curr) => prev + curr, '');

	addToAfterElement.insertAdjacentHTML('afterend', newNumberOfPlayersField);
	playerDetailsContainer.insertAdjacentHTML('afterend', playerFields + numberOfRoundsField());
}

function handleSubmit(event) {
	event.preventDefault();
	const form = event.target;

	document.activeElement.blur();

	E = +form.elasticity.value || E;
	G = +form.gravity.value || G;

	MAXIMUM_POSSIBLE_SCORE = +form['max-score'].value || MAXIMUM_POSSIBLE_SCORE;
	PLAY_MODE = form['play-mode'].value || FREE_PLAY;
	NUMBER_OF_PLAYERS = +(form['number-of-players'] || {}).value || NUMBER_OF_PLAYERS;
	TOTAL_NUMBER_OF_ROUNDS = +(form['number-of-rounds'] || {}).value || TOTAL_NUMBER_OF_ROUNDS;

	ARRAY_FOR_ITERATION(MAX_NUMBER_OF_MULTIPLAYER).forEach((index) => {
		PLAYER_NAME_KEY_LABEL_MAPPING[NUM_TO_WORD_MAPPING[`${index + 1}`]] =
			(form[`player-${index + 1}`] || {}).value || getPlayerName(index + 1);
	});

	currentSelectedPlayer = INITIAL_TURN_MAPPING[PLAY_MODE];
	E_X = Math.min(E * 1.1, 0.99);

	if (PLAY_MODE === ONE_VS_CPU) {
		NUMBER_OF_PLAYERS = 2;
	}

	resetGame();
}

function playerNameKeyWrapper(callback) {
	return function (_, index, array) {
		let playerNameKey;
		if (PLAY_MODE === ONE_VS_CPU && index === array.length - 1) {
			playerNameKey = PLAYER_NAME_KEY.cpu;
		} else {
			playerNameKey = NUM_TO_WORD_MAPPING[index + 1];
		}
		return callback.call(this, playerNameKey, ...arguments);
	};
}
