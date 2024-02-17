function handleTurnChangeEffects({ turnToggle = false } = {}) {
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

	ball.style.color = PLAYER_COLOR_MAPPING[currentSelectedPlayer] || '';

	toast(...getToastProps());
}
