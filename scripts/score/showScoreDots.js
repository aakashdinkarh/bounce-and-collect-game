function showScoreDots(){
    window.CacheManager.invalidate(ALL_SCORE_POINT_DOT);

    const ballHalfWidth = BALL_WIDTH / 2;
    const ballHalfHeight = BALL_HEIGHT / 2;

    // Generate and cache score point coordinates
    const scorePointCoords = ARRAY_FOR_ITERATION(MAXIMUM_POSSIBLE_SCORE).map((index) => {
        const x = generateRandomCoordinates(0 + ballHalfWidth, field.clientWidth - ballHalfWidth);
        const y = generateRandomCoordinates(0 + ballHalfHeight, field.clientHeight - ballHalfHeight);

        const scorePointDot = document.createElement('span');
        scorePointDot.className = 'score-point-dot';

        scorePointDot.style.left = x + 'px';
        scorePointDot.style.top = y + 'px';

        return {
            left: x, 
            top: y,
            radius: 8, // Width of score-point-dot is 0.5rem = 8px
            isCollected: false,
            element: scorePointDot
        };
    });
    
    // Cache the coordinates
    window.CacheManager.set(ALL_SCORE_POINT_DOT, scorePointCoords);
    
    const fragment = document.createDocumentFragment();
    scorePointCoords.forEach(({element}) => fragment.append(element));
    field.append(fragment);
}
