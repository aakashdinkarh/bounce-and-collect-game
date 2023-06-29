function checkIfScoreDotTouchBall(scoreDot, ball){
    const ballCenter = {
        x: ball.left + ball.width / 2,
        y: ball.top + ball.height / 2,
        r: ball.width / 2,
    }

    const scoreDotCenter = {
        x: scoreDot.left + scoreDot.width / 2,
        y: scoreDot.top + scoreDot.height / 2,
        r: scoreDot.width / 2,
    }

    const distance = Math.sqrt( (ballCenter.x - scoreDotCenter.x) ** 2 + (ballCenter.y - scoreDotCenter.y) ** 2 );

    if(distance <= ballCenter.r + scoreDotCenter.r){
        return true;
    }
    return false;
}
