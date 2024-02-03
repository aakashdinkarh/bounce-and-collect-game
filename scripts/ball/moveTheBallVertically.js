function moveTheBallVertically({vy = 0, vx = 2, dy = 1, dx = 1} = {}){
    vy += dy * g;
    const freeFall = dy >= 0;

    if(vy < 0 && !freeFall){
        vy = 0;
        dy = -dy;

        return [vx, vy, dx, dy];
    }

    const { bottom: fieldBottom, top: fieldTop } = getCoords('field', true);
    const { top, bottom } = getCoords('ball', true);

    const diffY = Math.abs(freeFall ? bottom - fieldBottom : top - fieldTop);
    
    if (diffY <= vy) { //vertically touch condition
        ball.style.top = (freeFall ? fieldBottom - ball.clientHeight : 0) + 'px';
        playSound('ball-hit-audio');
    } else {
        ball.style.top = top + (dy * vy) + 'px';
    }

    return [vx, vy, dx, dy];
}
