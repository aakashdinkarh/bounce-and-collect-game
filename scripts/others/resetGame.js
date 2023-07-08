function resetGame({ top, left } = {}){

    ball.style.top = top ?? (field.clientHeight - ball.clientHeight) + 'px';
    ball.style.left = left ?? 0 + 'px';

    resetCurrentScore();
    resetHighestScore();

    clearTrajectory();

    clearInterval(intervalId);
}
