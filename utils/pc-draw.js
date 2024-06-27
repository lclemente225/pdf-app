let isDrawing = false;

let mouseLocation = {x:0, y:0}

function mousePosition(e, canvas){
    mouseLocation.x = e.clientX - canvas.offsetLeft + window.scrollX;
    mouseLocation.y = e.clientY - canvas.offsetTop + window.scrollY;
}

function fingerPosition(e, canvas){
    mouseLocation.x = e.touches[0].clientX - canvas.offsetLeft + window.scrollX;
    mouseLocation.y = e.touches[0].clientY - canvas.offsetTop + window.scrollY;
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
    ctx.lineWidth = 3;
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


function clearSig(canvas){
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0,0 , canvas.width, canvas.height)
}

function startDrawingTouch(e, canvas,) {
    isDrawing = true;
    canvas.classList.add("signature")
    fingerPosition(e, canvas)
}

function stopDrawingTouch(e, canvas) {
    isDrawing = false;
    canvas.classList.remove("signature");
}


function drawTouch(e, canvas) {
    if(!isDrawing){
        return
    }
    let ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.moveTo(mouseLocation.x, mouseLocation.y);
    fingerPosition(e, canvas)
    //give coordinates for line
    ctx.lineTo(mouseLocation.x, mouseLocation.y);
    //actually draw line
    ctx.stroke();
}



export {startDrawingPC, stopDrawingPC, drawPC, deleteDrawing, clearSig, startDrawingTouch, stopDrawingTouch, drawTouch}