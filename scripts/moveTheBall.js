let groundHits = 0;

function projectileMotion({vy = 0, vx = 1, dy = 1, dx = 1} = {}) {
    clearInterval(intervalId);

    resetGroundHits();

    intervalId = setInterval(() => {
        if(vy === 0 && isEdgeTouch('bottom') && vx === 0){
            clearInterval(intervalId);
            return;
        }
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
    }, 10)
}

function moveTheBall(e){
    const { width: ballWidth, height: ballHeight } = ball.getBoundingClientRect();

    const { left: fieldLeft, top: fieldTop } = getCoords('field');
    const { left: ballInitialLeft, top: ballInitialTop } = getCoords('ball', true);

    let mouseX = e.clientX - fieldLeft;
    let mouseY = e.clientY - fieldTop;

    let ballX = Math.max(mouseX - ballWidth/2, 0); //left edge case
    let ballY = Math.max(mouseY - ballHeight/2, 0); //top edge case

    ballX = Math.min(ballX, field.clientWidth - ballWidth); //right edge case
    ballY = Math.min(ballY, field.clientHeight - ballHeight); //bottom edge case

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

        projectileMotion({
            vx: initialHorizontalSpeed,
            dx: initialHorizontalDirection,
            vy: initialVerticalSpeed,
            dy: initialVerticalDirection,
        });
    }, 400);
}
