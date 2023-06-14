let groundHits = 0;

function updateGroundHits(hits = 0){
    groundHitsCount.innerHTML = 'Ground Hits : ' + hits;
}

function moveTheBallHorizontally({ dx = 1, vx = 0 }){
    const { left } = getCoords('ball', true);
    const { right: fieldRight } = getCoords('field', true);

    let newLeft = left + (dx * vx);

    if(vx > 0.1){
        if(dx === 1){
            if(newLeft >= fieldRight - ball.clientWidth){
                newLeft = fieldRight - ball.clientWidth;
                dx = -dx;
                vx = vx * e;
                makeBallHitSound();
            }
        } else {
            if(newLeft <= 0){
                newLeft = 0;
                dx = -dx;
                vx = vx * e;
                makeBallHitSound();
            }
        }
        ball.style.left = newLeft + 'px';
    } else {
        vx = 0;
    }

    return [vx, dx];
}

function moveTheBallVertically({vy = 0, vx = 2, dy = 1, dx = 1} = {}){
    const { bottom: fieldBottom } = getCoords('field', true);
    const { top, bottom } = getCoords('ball', true);

    vy += dy * g;

    if(dy === 1){ //free fall
        const diffY = Math.abs(bottom - fieldBottom);
        if(diffY <= vy){
            ball.style.top = fieldBottom - ball.clientHeight + 'px';
            vx = vx * e;
            vy = vy * e;
            dy = -dy;
            makeBallHitSound();
            updateGroundHits(++groundHits);

            return [vx, vy, dx, dy];
        }
    } else { // jump back
        if(vy < g){
            vy = 0;
            dy = -dy;
        }
    }
    ball.style.top = top + (dy * vy) + 'px';

    return [vx, vy, dx, dy];
}

function freeFall({vy = 0, vx = 2, dy = 1, dx = 1} = {}) {
    clearInterval(intervalId);
    groundHits = 0;
    updateGroundHits(groundHits);

    intervalId = setInterval(() => {
        [vx, vy, dx, dy] = moveTheBallVertically({ vy, dy, vx, dx });
        [vx, dx] = moveTheBallHorizontally({ vx, dx });

        const {bottom: fieldBottom } = getCoords('field', true);
        const {bottom: ballBottom} = getCoords('ball', true);

        if(vy === 0 && ballBottom === fieldBottom || vx === 0){
            clearInterval(intervalId);
        }
    }, 10)
}


function moveTheBall(e){
    const { left: fieldLeft, top: fieldTop } = getCoords('field');
    const { left: ballInitialLeft } = getCoords('ball', true);

    let ballX = e.clientX - fieldLeft;
    let ballY = e.clientY - fieldTop;

    ballX = Math.max(ballX - ballWidth/2, 0); //left edge case handle
    ballY = Math.max(ballY - ballHeight/2, 0); //top edge case handle

    ballX = Math.min(ballX, field.clientWidth - ballWidth); //right edge case handle
    ballY = Math.min(ballY, field.clientHeight - ballHeight); //bottom edge case handle

    const initialHorizontalSpeed = Math.min(Math.abs(ballInitialLeft - ballX) / 15);
    const initialHorizontalDirection = ballX - ballInitialLeft >= 0 ? 1 : -1;

    ball.style.transition = 'all 0.4s';
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';

    groundHits = 0;
    updateGroundHits(groundHits);

    clearTimeout(timeoutId);
    clearInterval(intervalId);
    timeoutId = setTimeout(() => {
        ball.style.transition = '';
        freeFall({ vx: initialHorizontalSpeed, dx: initialHorizontalDirection });
    }, 400);
}