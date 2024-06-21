function isMouseInSig (x, y, sigCanvas){
    let left = sigCanvas.x;
    let right = sigCanvas.x + sigCanvas.width;
    let top = sigCanvas.y - sigCanvas.height;
    let bottom = sigCanvas.y;
    if(x > left && x < right && y > top && y < bottom ){
        return true
    }
    return false
}

export {isMouseInSig}