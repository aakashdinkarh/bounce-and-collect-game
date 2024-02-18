function showScoreDots(){
    const { width, height } = ball.getBoundingClientRect();

    const ballHalfWidth = width / 2;
    const ballHalfHeight = height / 2;

    const randomCoordinates = ARRAY_FOR_ITERATION(MAXIMUM_POSSIBLE_SCORE).map(() => {
        const randomX = generateRandomCoordinates(0 + ballHalfWidth, field.clientWidth - ballHalfWidth);
        const randomY = generateRandomCoordinates(0 + ballHalfHeight, field.clientHeight - ballHalfHeight);

        return { x: randomX, y: randomY };
    })
    
    const fragment = document.createDocumentFragment();

    randomCoordinates.forEach(({x ,y}) => {
        const scorePointDot = document.createElement('span');
        scorePointDot.className = 'score-point-dot';

        scorePointDot.style.left = x + 'px';
        scorePointDot.style.top = y + 'px';

        fragment.append(scorePointDot);
    });

    field.append(fragment);
}
