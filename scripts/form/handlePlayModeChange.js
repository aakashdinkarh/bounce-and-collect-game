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

    const player1Field = playerNameField('player-1', 'Player 1 Name', playerOneName);
    const player2Field = playerNameField('player-2', 'Player 2 Name', playerTwoName);

    let additionalFields = player1Field;

    if(value === '1_vs_1'){
        additionalFields += player2Field;
    }
    additionalFields += numberOfRoundsField;

    playModeField.insertAdjacentHTML('afterend', additionalFields);
}
