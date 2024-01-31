function handleModeChangeEffects({ togglePlayer = false } = {}){
    const popoverTextMapping = {
        one: [playerOneName],
        two: [playerTwoName, 'yellow'],
        cpu: ['CPU', 'yellow'],
        none: ['Free Play'],
    }

    if (togglePlayer) {
        currentPlayerSelected = turnToggleMapping[playMode][currentPlayerSelected];
    }

    ball.className = classNameMapping[currentPlayerSelected] || '';

    alertPopover(...popoverTextMapping[currentPlayerSelected]);
}
