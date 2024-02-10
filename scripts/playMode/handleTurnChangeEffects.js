function handleTurnChangeEffects({ turnToggle = false } = {}) {
	// move this mapping outside
	const popoverTextMapping = {
		one: [playerOneName],
		two: [playerTwoName, 'orange'],
		cpu: ['CPU', 'orange'],
		none: ['Free Play'],
	};

	if (turnToggle) {
		currentSelectedPlayer = turnToggleMapping[playMode][currentSelectedPlayer];
	}

	ball.className = classNameMapping[currentSelectedPlayer] || '';

	toast(...popoverTextMapping[currentSelectedPlayer]);
}
