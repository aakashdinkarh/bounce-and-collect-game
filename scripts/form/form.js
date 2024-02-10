function assignDefaultValues(){
    form.elasticity.value = e;
    form.gravity.value = g;
    form['max-score'].value = maximumPossibleScore;
    form['play-mode'].value = (((form['play-mode'] || {}).options || [])[0] || {}).value;
}

const playerNameField = (fieldName, fieldLabel, fieldValue) => `<label>
        <div>${fieldLabel}</div>
        <input name="${fieldName}" type="text" value="${fieldValue}" placeholder="Enter Name" required />
    </label>`;

function handlePlayModeChange(event) {
    const numberOfRoundsField = `<label>
        <div>Number of Rounds</div>
        <input name="number-of-rounds" type="number" min="1" max="20" step="1" value="${totalNumberOfRounds}" required />
    </label>`;

    const value = event.target.value;

    const roundsField = form.querySelector('label:has([name=number-of-rounds])');
    const playerFields = form.querySelectorAll('label:has([name^="player-"])');
    roundsField && roundsField.remove();
    playerFields.forEach((field) => field.remove());

    if(value === 'free_play') return;

    const playModeField = form.querySelector('label:has([name=play-mode])');

    const player1Field = playerNameField('player-1', 'Player 1 Name', playerNameLabelMapping.one);
    const player2Field = playerNameField('player-2', 'Player 2 Name', playerNameLabelMapping.two);

    let additionalFields = player1Field;

    if(value === '1_vs_1'){
        additionalFields += player2Field;
    }
    additionalFields += numberOfRoundsField;

    playModeField.insertAdjacentHTML('afterend', additionalFields);
}

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    field.scrollIntoView({ behavior: 'smooth' });

    e = +form.elasticity.value || e;
    g = +form.gravity.value || g;
    maximumPossibleScore = +form['max-score'].value || maximumPossibleScore;
    playMode = form['play-mode'].value || 'free_play';
    totalNumberOfRounds = (form['number-of-rounds'] || {}).value || totalNumberOfRounds;
    playerNameLabelMapping.one = (form['player-1'] || {}).value || playerNameLabelMapping.one;
    playerNameLabelMapping.two = (form['player-2'] || {}).value || playerNameLabelMapping.two;

    currentSelectedPlayer = Object.keys(turnToggleMapping[playMode])[0];

    resetGame();
}
