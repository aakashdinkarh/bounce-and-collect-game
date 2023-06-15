let groundHits = 0;

function verticallyEdgeTouch({ vx, vy, dy, top = 0 }){
    ball.style.top = top + 'px';
    vx = vx * e;
    vy = vy * e;
    dy = -dy;

    makeBallHitSound();
    return [vx, vy, dy];
}

function horizontallyEdgeTouch({ vx, dx, left }){
    ball.style.left = left + 'px';
    dx = -dx;
    vx = vx * e;

    makeBallHitSound();
    return [vx, dx];
}

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
        [vx, dx] = horizontallyEdgeTouch({ vx, dx, left: movingToRight ? fieldRight - ball.clientWidth : 0 });
        
        return [vx, dx];
    }

    ball.style.left = left + (dx * vx) + 'px';

    return [vx, dx];
}

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
        [vx, vy, dy] = verticallyEdgeTouch({ vx, vy, dy, top: freeFall ? fieldBottom - ball.clientHeight : 0 });

        freeFall && updateGroundHits(++groundHits);

        return [vx, vy, dx, dy];
    }

    ball.style.top = top + (dy * vy) + 'px';

    return [vx, vy, dx, dy];
}

function freeFall({vy = 0, vx = 1, dy = 1, dx = 1} = {}) {
    clearInterval(intervalId);

    resetGroundHits();

    intervalId = setInterval(() => {
        const { bottom: fieldBottom } = getCoords('field', true);
        const { bottom: ballBottom} = getCoords('ball', true);

        if(vy === 0 && ballBottom === fieldBottom && vx === 0){
            clearInterval(intervalId);
            return;
        }

        [vx, vy, dx, dy] = moveTheBallVertically({ vy, dy, vx, dx });
        [vx, dx] = moveTheBallHorizontally({ vx, dx });
    }, 10)
}


function moveTheBall(e){
    const { width: ballWidth, height: ballHeight } = ball.getBoundingClientRect();

    const { left: fieldLeft, top: fieldTop } = getCoords('field');
    const { left: ballInitialLeft, top: ballInitialTop } = getCoords('ball', true);

    let mouseX = e.clientX - fieldLeft;
    let mouseY = e.clientY - fieldTop;

    let ballX = Math.max(mouseX - ballWidth/2, 0); //left edge case handle
    let ballY = Math.max(mouseY - ballHeight/2, 0); //top edge case handle

    ballX = Math.min(ballX, field.clientWidth - ballWidth); //right edge case handle
    ballY = Math.min(ballY, field.clientHeight - ballHeight); //bottom edge case handle

    const initialHorizontalSpeed = Math.abs(ballInitialLeft - ballX) / 40;
    const initialHorizontalDirection = ballX - ballInitialLeft >= 0 ? 1 : -1;
    const initialVerticalSpeed = Math.abs(ballInitialTop - ballY) / 40;
    const initialVerticalDirection = ballY - ballInitialTop >= 0 ? 1 : -1;

    ball.style.transition = 'all 0.4s linear';
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';

    resetGroundHits();

    clearTimeout(timeoutId);
    clearInterval(intervalId);

    timeoutId = setTimeout(() => {
        ball.style.transition = '';

        freeFall({
            vx: initialHorizontalSpeed,
            dx: initialHorizontalDirection,
            vy: initialVerticalSpeed,
            dy: initialVerticalDirection,
        });
    }, 400);
}