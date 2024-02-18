function handleTurnChangeEffects({ turnToggle = false } = {}) {
	if (turnToggle) {
		const isCPU = currentSelectedPlayer === PLAYER_NAME_KEY.cpu;
		const playerNum = isCPU ? 2 : WORD_TO_NUM_MAPPING[currentSelectedPlayer];

		if (playerNum >= NUMBER_OF_PLAYERS) {
			currentSelectedPlayer = INITIAL_TURN_MAPPING[PLAY_MODE];
		} else {
			currentSelectedPlayer = PLAY_MODE === ONE_VS_CPU ? PLAYER_NAME_KEY.cpu : NUM_TO_WORD_MAPPING[playerNum + 1];
		}
	}

	ball.style.color = PLAYER_COLOR_MAPPING[currentSelectedPlayer] || '';

	toast(...getToastProps());
}
