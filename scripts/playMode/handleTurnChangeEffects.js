function handleTurnChangeEffects({ turnToggle = false } = {}) {
	// move this mapping outside
	const popoverTextMapping = {
		one: [PLAYER_NAME_LABEL_MAPPING.one],
		two: [PLAYER_NAME_LABEL_MAPPING.two, 'orange'],
		cpu: ['CPU', 'orange'],
		none: ['Free Play'],
	};

	if (turnToggle) {
		currentSelectedPlayer = TURN_TOGGLE_MAPPING[playMode][currentSelectedPlayer];
	}

	ball.className = CLASS_NAME_MAPPING[currentSelectedPlayer] || '';

	toast(...popoverTextMapping[currentSelectedPlayer]);
}
