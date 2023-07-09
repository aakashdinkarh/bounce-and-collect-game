function cpuTurn(){
    const clientX = generateRandomCoordinates(0, field.clientWidth);
    const clientY = generateRandomCoordinates(0, field.clientHeight);

    moveTheBall({ clientX, clientY });
}