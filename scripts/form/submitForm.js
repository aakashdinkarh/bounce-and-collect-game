function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    e = +form.elasticity.value || e;
    g = +form.gravity.value || g;
    maximumPossiblePoints = +form['max-points'].value || maximumPossiblePoints;

    resetGame();
}
