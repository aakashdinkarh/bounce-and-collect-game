function handleTurnChangeEffects({ turnToggle = false } = {}) {
	// move this mapping outside
	const popoverTextMapping = {
		one: [playerOneName],
		two: [playerTwoName, 'orange'],
		cpu: ['CPU', 'orange'],
		none: ['Free Play'],
	};

	if (turnToggle) {
		currentPlayerSelected = turnToggleMapping[playMode][currentPlayerSelected];
	}

	ball.className = classNameMapping[currentPlayerSelected] || '';

	toast(...popoverTextMapping[currentPlayerSelected]);
}
