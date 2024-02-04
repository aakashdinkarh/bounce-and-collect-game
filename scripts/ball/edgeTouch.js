function isEdgeTouch(edge = ''){
    const fieldCoords = getCoords('field', true);
    const ballCoords = getCoords('ball', true);

    return +(fieldCoords[edge].toFixed(2)) === +(ballCoords[edge].toFixed(2));
}

function verticallyEdgeTouchEffect({ vx, vy, dy }){
    vx = vx * e_x;
    vy = vy * e;
    dy = -dy;

    return [vx, vy, dy];
}

function horizontallyEdgeTouchEffect({ vx, dx }){
    dx = -dx;
    vx = vx * e;

    return [vx, dx];
}
