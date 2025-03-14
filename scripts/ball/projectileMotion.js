function moveTheBallVertically({vy = 0, vx = 2, dy = 1, dx = 1} = {}){
    vy += dy * G;
    const freeFall = dy >= 0;

    if(vy < 0 && !freeFall){
        vy = 0;
        dy = -dy;

        return [vx, vy, dx, dy];
    }

    const { bottom: fieldBottom, top: fieldTop } = getCoords('field', true, true);
    const { top, bottom } = getCoords('ball', true, true);

    const diffY = Math.abs(freeFall ? bottom - fieldBottom : top - fieldTop);
    
    if (diffY <= vy) { //vertically touch condition
        ball.style.top = (freeFall ? fieldBottom - ball.clientHeight : 0) + 'px';
        playSound('ball-hit-audio');
    } else {
        ball.style.top = top + (dy * vy) + 'px';
    }
    // to update the cache after ball position is updated
    getCoords('ball', true, false);

    return [vx, vy, dx, dy];
}

function moveTheBallHorizontally({ dx = 1, vx = 0 }){
    if(vx < MINIMUM_HORIZONTAL_SPEED_TO_MOVE) {
        vx = 0;
        return [vx, dx];
    }

    const movingToRight = dx >= 0;

    const { left, right } = getCoords('ball', true, true);
    const { right: fieldRight, left: fieldLeft } = getCoords('field', true, true);

    const diffX = Math.abs(movingToRight ? fieldRight - right : left - fieldLeft);

    if (diffX <= vx) { //horizontally touch condition
        ball.style.left = (movingToRight ? fieldRight - ball.clientWidth : 0) + 'px';

        playSound('ball-hit-audio');
    } else {
        ball.style.left = left + (dx * vx) + 'px';
    }
    // to update the cache after ball position is updated
    getCoords('ball', true, false);

    return [vx, dx];
}

function projectileMotion({vy = 0, vx = 0.2, dy = 1, dx = 1} = {}) {
    clearInterval(projectileMotionIntervalId);

    projectileMotionIntervalId = setInterval(() => {
        if(vy === 0 && isEdgeTouch('bottom') && vx === 0){
            clearInterval(projectileMotionIntervalId);
            handleTurnEnd();
            return;
        }

        removeScoreDotIfEarned();

        showTrajectory();

        if(!isEdgeTouch('bottom') || vy !== 0){
            [vx, vy, dx, dy] = moveTheBallVertically({ vy, dy, vx, dx });
        }
        if(vx !== 0){
            [vx, dx] = moveTheBallHorizontally({ vx, dx });
        }
        if(isEdgeTouch('bottom') || isEdgeTouch('top')){
            [vx, vy, dy] = verticallyEdgeTouchEffect({ vx, vy, dy });
        }
        if(isEdgeTouch('left') || isEdgeTouch('right')){
            [vx, dx] = horizontallyEdgeTouchEffect({ vx, dx });
        }
    }, FRAME_RATE)
}
