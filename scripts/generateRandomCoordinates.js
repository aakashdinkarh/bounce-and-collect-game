function generateRandomCoordinates(min, max){
    const range = max - min + 1;

    const randomCoordinate = Math.floor(Math.random() * range) + min;

    return randomCoordinate;
}
