export function interpolateRightBoundary(radius){
    return 2 - 0.1*radius
}

export function interpolateSpeed(ballSpeed){
    if(ballSpeed<=3)
        return (4-ballSpeed);
    return 0.75
}

export function interpolateBallRadius(ballRadius){
    return ballRadius + 1
}

export function calculateBasketRadius(basketRadius){
    return(30 * (basketRadius+1))
}

export function calculateBasketHeight(basketRadius){
    switch(basketRadius){
        case 1: return 50
        case 2: return 65
        case 3: return 85
        case 4: return 105
        case 5: return 120
    }
    return 120
}

export function calculateMiddle(width){
    return width/2.2 + 7
}

export function result(currentX, middle, ballSpeed, basketRadius, threshold){
    value = Math.abs(currentX - middle)
    value = value * ballSpeed
    value = value / basketRadius

    if(value<threshold){
        return 'won'
    }
    return 'lost'
}