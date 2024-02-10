function handleTurnChangeEffects({ turnToggle = false } = {}) {
	const popoverTextMapping = {
		one: [playerOneName],
		two: [playerTwoName, 'orange'],
		cpu: ['CPU', 'orange'],
		none: ['Free Play'],
	};

	if (turnToggle) {
		currentSelectedPlayer = turnToogleMapping[playMode][currentSelectedPlayer];
	}

	ball.className = classNameMapping[currentSelectedPlayer] || '';

	toast(...popoverTextMapping[currentSelectedPlayer]);
}
