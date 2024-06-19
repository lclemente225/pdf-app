
/*
idea
1. use a modal
2. create a canvas on that modal
3. write on that modal canvas
4. append to canvas
5. delete will remove that canvas => maybe need to refresh page?

*/

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

function deleteDrawing(canvas){
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,canvas.width, canvas.height)
}

export {startDrawingPC, stopDrawingPC, drawPC, deleteDrawing}

/* context.beginPath();
context.moveTo(150,25);      // starting point at the top of the triangle
context.lineTo(250,100);     // line to right bottom corner
context.lineTo(50,100);      // line to left bottom corner
context.stroke();  */