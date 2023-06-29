let moveBallToTimeoutId;

function moveBallTo(x, y, duration){
    const { left, top } = getCoords('ball', true);
    
    const totalSteps = Math.ceil(duration / frameRate);

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
            moveBallToTimeoutId = setTimeout(updatePosition, frameRate);
        }
    }

    clearTimeout(moveBallToTimeoutId);
    updatePosition();
}
