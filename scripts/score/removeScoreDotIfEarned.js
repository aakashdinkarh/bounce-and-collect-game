function checkIfScoreDotTouchBall(scoreDot, ball){
    const ballCenter = {
        x: ball.left + BALL_WIDTH / 2,
        y: ball.top + BALL_HEIGHT / 2,
        r: BALL_WIDTH / 2,
    }

    const scoreDotCenter = {
        x: scoreDot.left + SCORE_POINT_DOT_WIDTH / 2,
        y: scoreDot.top + SCORE_POINT_DOT_HEIGHT / 2,
        r: scoreDot.radius,
    }

    const distance = Math.sqrt(
        (ballCenter.x - scoreDotCenter.x) ** 2 +
        (ballCenter.y - scoreDotCenter.y) ** 2
    );

    if(distance <= ballCenter.r + scoreDotCenter.r){
        return true;
    }
    return false;
}

function removeScoreDotIfEarned() {
    const scorePointCoords = window.CacheManager.get(ALL_SCORE_POINT_DOT);
    if (!scorePointCoords) return;

    const ball = getCoords('ball', true);
    
    scorePointCoords.forEach((scorePoint) => {
        if (scorePoint.isCollected) return;

        if (checkIfScoreDotTouchBall(scorePoint, ball)) {
            scorePoint.element.remove();
            scorePoint.isCollected = true;
            playSound('coin-collect-sound');
            updateCurrentScore(++currentScore);
        }
    });
}
