function clearTrajectory(){

    const previousTrajectoryPoints = field.querySelectorAll('.trajectory-point');

    (previousTrajectoryPoints || []).forEach((trajectoryPoint) => trajectoryPoint.remove());
}
