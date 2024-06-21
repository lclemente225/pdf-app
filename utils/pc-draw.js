let isDrawing = false;

let mouseLocation = {x:0, y:0}

function mousePosition(e, canvas){
    mouseLocation.x = e.clientX - canvas.offsetLeft;
    mouseLocation.y = e.clientY - canvas.offsetTop;
}

function startDrawingPC(e, canvas,) {
    isDrawing = true;
    canvas.classList.add("signature")
    mousePosition(e, canvas)
}

function stopDrawingPC(e, canvas) {
    isDrawing = false;
    canvas.classList.remove("signature");
}

function drawPC(e, canvas) {
    if(!isDrawing){
        return
    }
    let ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.moveTo(mouseLocation.x, mouseLocation.y);
    mousePosition(e, canvas)
    //give coordinates for line
    ctx.lineTo(mouseLocation.x, mouseLocation.y);
    //actually draw line
    ctx.stroke();
}

function deleteDrawing(canvasElements){
    console.log("cleared")
    for(let i=0; i < canvasElements.length; i++){
        if(i%2 != 0){
            let canvas = canvasElements[i]
            console.log(canvas,canvas.width, canvas.height)
            let ctx = canvas.getContext("2d")
            let imgData = ctx.getImageData(0,0,canvas.width, canvas.height)
            ctx.putImageData(imgData, 0, 0)
        }
    }
}

export {startDrawingPC, stopDrawingPC, drawPC, deleteDrawing}