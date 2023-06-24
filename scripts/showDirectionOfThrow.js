function showDirectionOfThrow(e){
    const { left, top } = getCoords('ball', true);

    const ballCenter = {
        left: left + ball.clientWidth / 2,
        top: top + ball.clientHeight / 2,
    };

    const newLocation = getRelativeToField({
        left: e.clientX,
        top: e.clientY,
    })

    const lengthX = newLocation.left - ballCenter.left;
    const lengthY = newLocation.top - ballCenter.top;

    const lengthOfDirectionLine = Math.sqrt(lengthX ** 2 + lengthY ** 2);
    const angleOfDirectionLine = Math.atan2(lengthY, lengthX);

    directionLine.style.left = ballCenter.left + 'px';
    directionLine.style.top = ballCenter.top + 'px';
    directionLine.style.width = lengthOfDirectionLine + 'px';
    directionLine.style.transform = `rotate(${angleOfDirectionLine}rad)`;
}
