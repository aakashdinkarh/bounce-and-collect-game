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

    moveBallTo(ballX, ballY, 300);

    resetCurrentScore();

    clearTrajectory();

    clearTimeout(timeoutId);
    clearInterval(intervalId);

    if(playMode !== 'free_play'){
        isPlaygroundDisabled = true;
        makePlaygroundDisable();
    }

    timeoutId = setTimeout(() => {
        projectileMotion({
            vx: initialHorizontalSpeed,
            dx: initialHorizontalDirection,
            vy: initialVerticalSpeed,
            dy: initialVerticalDirection,
        });
    }, 400);
}
