// Add throttle utility
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Throttled version of trajectory creation
const throttledShowTrajectory = throttle(function() {
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
}, 20);

// Original function now uses the throttled version
function showTrajectory() {
    throttledShowTrajectory();
}

function clearTrajectory(){
    const previousTrajectoryPoints = field.querySelectorAll('.trajectory-point');

    (previousTrajectoryPoints || []).forEach((trajectoryPoint) => trajectoryPoint.remove());
}
