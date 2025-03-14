// Throttle utility
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

function createTrajectoryPoint() {
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

// Throttled version
const throttledCreateTrajectoryPoint = throttle(createTrajectoryPoint, 20);

// Initialize with unthrottled version by default
let showTrajectoryImpl = createTrajectoryPoint;

// Use the already started performance check
window.performancePromise.then(isLowPerformance => {
    showTrajectoryImpl = isLowPerformance ? throttledCreateTrajectoryPoint : createTrajectoryPoint;
});

function showTrajectory() {
    showTrajectoryImpl();
}

function clearTrajectory() {
    const previousTrajectoryPoints = field.querySelectorAll('.trajectory-point');
    (previousTrajectoryPoints || []).forEach((trajectoryPoint) => trajectoryPoint.remove());
}
