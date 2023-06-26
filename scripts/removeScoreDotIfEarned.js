function removeScoreDotIfEarned(){
    const ballCoords = ball.getBoundingClientRect();

    const scoreDots = document.querySelectorAll('.score-point-dot');

    scoreDots.forEach((scoreDot) => {
        const coords =  scoreDot.getBoundingClientRect();

        if(checkIfScoreDotTouchBall(coords, ballCoords)){
            scoreDot.remove();
        }
    })
}
