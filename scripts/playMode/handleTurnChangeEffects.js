function handleTurnChangeEffects({ turnToggle = false } = {}) {
	const popoverTextMapping = {
		one: [playerOneName],
		two: [playerTwoName, 'orange'],
		cpu: ['CPU', 'orange'],
		none: ['Free Play'],
	};

	if (turnToggle) {
		currentPlayerSelected = turnToogleMapping[playMode][currentPlayerSelected];
	}

	ball.className = classNameMapping[currentPlayerSelected] || '';

	toast(...popoverTextMapping[currentPlayerSelected]);
}
