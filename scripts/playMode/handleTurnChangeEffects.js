function handleTurnChangeEffects({ turnToggle = false } = {}) {
	const popoverTextMapping = {
		one: [playerOneName],
		two: [playerTwoName, 'yellow'],
		cpu: ['CPU', 'yellow'],
		none: ['Free Play'],
	};

	if (turnToggle) {
		currentPlayerSelected = turnToogleMapping[playMode][currentPlayerSelected];
	}

	ball.className = classNameMapping[currentPlayerSelected] || '';

	toast(...popoverTextMapping[currentPlayerSelected]);
}
