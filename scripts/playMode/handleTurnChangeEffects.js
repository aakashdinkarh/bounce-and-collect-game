function handleTurnChangeEffects({ turnToggle = false } = {}) {
	// move this mapping outside
	const popoverTextMapping = {
		one: [PLAYER_NAME_LABEL_MAPPING.one],
		two: [PLAYER_NAME_LABEL_MAPPING.two, 'orange'],
		// change here mapping colors
		three: [PLAYER_NAME_LABEL_MAPPING.three],
		four: [PLAYER_NAME_LABEL_MAPPING.four],
		five: [PLAYER_NAME_LABEL_MAPPING.five],
		six: [PLAYER_NAME_LABEL_MAPPING.six],

		cpu: ['CPU', 'orange'],
		none: ['Free Play'],
	};

	if (turnToggle) {
		if (playMode === 'multiplayer') {
			if (WORD_TO_NUM_MAPPING[currentSelectedPlayer] >= numberOfPlayers) {
				currentSelectedPlayer = Object.keys(TURN_TOGGLE_MAPPING[playMode])[0];
			} else {
				currentSelectedPlayer = NUM_TO_WORD_MAPPING[WORD_TO_NUM_MAPPING[currentSelectedPlayer] + 1];
			}
		} else {
			currentSelectedPlayer = TURN_TOGGLE_MAPPING[playMode][currentSelectedPlayer];
		}
	}

	ball.className = CLASS_NAME_MAPPING[currentSelectedPlayer] || CLASS_NAME_MAPPING.one;

	toast(...popoverTextMapping[currentSelectedPlayer]);
}
