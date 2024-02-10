function moveTheBallHorizontally({ dx = 1, vx = 0 }){
    if(vx < minimumHorizontalSpeedToMove) {
        vx = 0;
        return [vx, dx];
    }

    const movingToRight = dx >= 0;

    const { left, right } = getCoords('ball', true);
    const { right: fieldRight, left: fieldLeft } = getCoords('field', true);

    const diffX = Math.abs(movingToRight ? fieldRight - right : left - fieldLeft);

    if (diffX <= vx) { //horizontally touch condition
        ball.style.left = (movingToRight ? fieldRight - ball.clientWidth : 0) + 'px';

        playSound('ball-hit-audio');
    } else {
        ball.style.left = left + (dx * vx) + 'px';
    }

    return [vx, dx];
}
