function showTrajectory(){
    const { top, left } = getCoords('ball', true);

    const ballCenter = {
        left: left + ball.clientWidth / 2,
        top: top + ball.clientHeight / 2,
    };

    const trajecotryPoint = document.createElement('span');

    trajecotryPoint.style.top = ballCenter.top + 'px';
    trajecotryPoint.style.left = ballCenter.left + 'px';
    trajecotryPoint.className = 'trajectory-point';

    field.append(trajecotryPoint);
}
