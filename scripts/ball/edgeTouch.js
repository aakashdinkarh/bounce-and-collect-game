function isEdgeTouch(edge = ''){
    const fieldCoords = getCoords('field', true, true);
    const ballCoords = getCoords('ball', true, true);

    return +(fieldCoords[edge].toFixed(2)) === +(ballCoords[edge].toFixed(2));
}

function verticallyEdgeTouchEffect({ vx, vy, dy }){
    vx = vx * E_X;
    vy = vy * E;
    dy = -dy;

    return [vx, vy, dy];
}

function horizontallyEdgeTouchEffect({ vx, dx }){
    dx = -dx;
    vx = vx * E;

    return [vx, dx];
}
