function moveTheBallHorizontally({ dx = 1, vx = 0 }){
    const { left } = getCoords('ball', true);
    const { right: fieldRight } = getCoords('field', true);

    let newLeft = left + (dx * vx);

    if(vx > 0.1){
        if(dx === 1){
            if(newLeft >= fieldRight - ball.clientWidth){
                newLeft = fieldRight - ball.clientWidth;
                dx = -dx;
            }
            ball.style.left = newLeft + 'px';
        } else {
            if(newLeft <= 0){
                newLeft = 0;
                dx = -dx;
            }
            ball.style.left = newLeft + 'px';
        }
    } else {
        vx = 0;
    }

    return [dx, vx];
}

function freeFall({vy = 0, vx = 2, dy = 1, dx = 1} = {}) {
    clearInterval(intervalId);
    const {bottom: fieldBottom } = getCoords('field', true);

    intervalId = setInterval(() => {
        vy += dy * g;
        const { top, bottom } = getCoords('ball', true);
        const diffY = Math.abs(bottom - fieldBottom);

        [dx, vx] = moveTheBallHorizontally({ dx, vx });

        if(diffY > vy){
            ball.style.top = top + vy + 'px';
        } else {
            ball.style.top = fieldBottom - ball.clientHeight + 'px';
            clearInterval(intervalId);

            if(vy > 0.25){
                jumpTheBall({ vy: vy * e, vx, dx });
            }
        }
    }, 10)
}

function jumpTheBall({ vy = 0, vx = 0, dx = 1, dy = -1 }) {
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        const { top } = getCoords('ball', true);
        const { right: fieldRight } = getCoords('field', true);

        vy += dy * g;

        [dx, vx] = moveTheBallHorizontally({ dx, vx });

        ball.style.top = top - vy + 'px';

        if(vy < g){
            vy = 0;
            clearInterval(intervalId);
            freeFall({ vx, dx });
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

    const initialHorizontalSpeed = Math.min(Math.abs(ballInitialLeft - ballX) / 15, 3);
    const initialHorizontalDirection = ballX - ballInitialLeft >= 0 ? 1 : -1;

    ball.style.transition = 'all 0.4s';
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';

    clearTimeout(timeoutId);
    clearInterval(intervalId);
    timeoutId = setTimeout(() => {
        ball.style.transition = '';
        freeFall({ vx: initialHorizontalSpeed, dx: initialHorizontalDirection });
    }, 400);
}