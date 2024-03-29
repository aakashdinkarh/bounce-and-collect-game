let moveBallToTimeoutId;
let projectileMotionStartTimeoutId;

function moveBallTo(x, y, duration){
    const { left, top } = getCoords('ball', true);
    
    const totalSteps = Math.ceil(duration / FRAME_RATE);

    let currentX = left;
    let currentY = top;

    const dx = (x - currentX) / totalSteps;
    const dy = (y - currentY) / totalSteps;

    let currentStep = 0;

    function updatePosition(){
        currentX += dx;
        currentY += dy;

        ball.style.left = currentX + 'px';
        ball.style.top = currentY + 'px';

        currentStep++;

        if(currentStep < totalSteps){
            moveBallToTimeoutId = setTimeout(updatePosition, FRAME_RATE);
        }
    }

    clearTimeout(moveBallToTimeoutId);
    updatePosition();
}

function moveTheBall(e){
    const { width: ballWidth, height: ballHeight } = ball.getBoundingClientRect();

    const { left: fieldLeft, top: fieldTop } = getCoords('field');
    const { left: ballInitialLeft, top: ballInitialTop } = getCoords('ball', true);

    const isMobileEvent = e.type?.includes('touch');

    let mouseX = (isMobileEvent ? e.changedTouches[0].clientX : e.clientX) - fieldLeft;
    let mouseY = (isMobileEvent ? e.changedTouches[0].clientY : e.clientY) - fieldTop;

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

    clearTimeout(projectileMotionStartTimeoutId);
    clearInterval(projectileMotionIntervalId);

    makePlaygroundDisable();

    projectileMotionStartTimeoutId = setTimeout(() => {
        projectileMotion({
            vx: initialHorizontalSpeed,
            dx: initialHorizontalDirection,
            vy: initialVerticalSpeed,
            dy: initialVerticalDirection,
        });
    }, 400);
}
