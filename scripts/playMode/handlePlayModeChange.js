const classNameMapping = {
    one: 'ball one',
    two: 'ball cpu',
    cpu: 'ball two',
    none: 'ball free-play',
}

const popoverTextMapping = {
    one: ['Player 1'],
    two: ['Player 2', 'yellow'],
    cpu: ['CPU', 'yellow'],
    none: ['Free Play'],
}

const turnToogleMapping = {
    '1_vs_1': {
        one: 'two',
        two: 'one',
    },
    '1_vs_cpu': {
        one: 'cpu',
        cpu: 'one',
    },
    'free_play': {
        none: 'none',
    }
}

function handlePlayModeChange(togglePlayer = false){

    if (togglePlayer) {
        currentPlayerSelected = turnToogleMapping[playMode][currentPlayerSelected];
    }

    ball.className = classNameMapping[currentPlayerSelected] || '';

    alertPopover(...popoverTextMapping[currentPlayerSelected]);
}
