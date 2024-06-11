import { canvasElementsFiltered } from "../index.js";
const pdfContainer = document.getElementById("pdfContent");
const canvasElements = pdfContainer.children;
//ONCLICK GET CANVAS AND MATCH
 
/*
idea
1. use a modal
2. create a canvas on that modal
3. write on that modal canvas
4. append to canvas
5. delete will remove that canvas => maybe need to refresh page?

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let painting = false;

function startDraw(e) {
    painting = true;
    document.getElementById("canvas");
    draw(e);
}

function endDraw() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);

*/

function openModalHandler(){
    
}

function startDrawingPC(e, canvas, classname) {
    let newCanvas = document.createElement("canvas")
    let ctx = newCanvas.getContext('2d')
    //console.log("startDrawingPC: we got it boyx ", canvas, canvas.classList, x, y)
    
    newCanvas.classList.add("signature")
    const rect = canvas.getBoundingClientRect()
    const x = rect.width;
    const y = rect.height;
      console.log("location of drawing", x, y, rect)
      ctx.beginPath();
      drawPC(e, ctx, x, y)
    
      newCanvas.width = x;
      newCanvas.height = y;
      newCanvas.backgroundColor = "white";
  /*  const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;*/
      document.body.appendChild(newCanvas)
}

function stopDrawingPC(e, canvas) {
    console.log("stopDrwaingPC isDrawing")
    //ctx.beginPath(); // Start a new path
}

function drawPC(e, ctx, x, y) {
    console.log("drawPC: ooo im drawing messy, drawPC", x, y)
    
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.moveTo(x+50, y+50);
    ctx.lineTo(x+110, y+110);//give coordinates for line
    ctx.stroke();//actually draw line
    ctx.beginPath();// Start a new path for next segment
}

function deleteDrawing(){

}

export {startDrawingPC, stopDrawingPC, drawPC, openModalHandler}

/* context.beginPath();
context.moveTo(150,25);      // starting point at the top of the triangle
context.lineTo(250,100);     // line to right bottom corner
context.lineTo(50,100);      // line to left bottom corner
context.stroke();  */