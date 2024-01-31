function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    e = +form.elasticity.value || e;
    g = +form.gravity.value || g;
    maximumPossiblePoints = +form['max-points'].value || maximumPossiblePoints;
    playMode = form['play-mode'].value || 'free_play';
    totalNumberOfRounds = (form['number-of-rounds'] || {}).value || totalNumberOfRounds;
    playerOneName = (form['player-1'] || {}).value || playerOneName;
    playerTwoName = (form['player-2'] || {}).value || playerTwoName;

    currentPlayerSelected = Object.keys(turnToggleMapping[playMode])[0];

    resetGame();
}
