function showTrajectory(){
    const { top, left } = getCoords('ball', true);

    const ballCenter = {
        left: left + ball.clientWidth / 2,
        top: top + ball.clientHeight / 2,
    };

    const trajectoryPoint = document.createElement('span');

    trajectoryPoint.style.top = ballCenter.top + 'px';
    trajectoryPoint.style.left = ballCenter.left + 'px';
    trajectoryPoint.className = 'trajectory-point';

    field.append(trajectoryPoint);
}
