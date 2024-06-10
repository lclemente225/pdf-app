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

*/

function startDrawingPC(e, canvas, classname, x, y) {
      let newCanvas = document.createElement("canvas")
      let ctx = newCanvas.getContext('2d')
      //console.log("startDrawingPC: we got it boyx ", canvas, canvas.classList, x, y)
     
      const rect = canvas.getBoundingClientRect()
      // const x = e.clientX - rect.left
      // const y = e.clientY - rect.top
       console.log("location of drawing", x,y, rect)
      ctx.beginPath();
      
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';
      
      ctx.beginPath(); // Start a new path fo r next segment
      ctx.lineTo(x, y);//give coordinates for line
      ctx.stroke(); //actually draw line
      ctx.moveTo(x, y);
    /*  const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;*/
      canvas.appendChild(newCanvas)
}

function stopDrawingPC(e, canvas) {
  console.log("stopDrwaingPC isDrawing")
  //ctx.beginPath(); // Start a new path
}

function drawPC(e, canvas,x, y) {
  console.log("drawPC: ooo im drawing messy, drawPC")
}

function deleteDrawing(){

}

export {startDrawingPC, stopDrawingPC, drawPC}

/* context.beginPath();
context.moveTo(150,25);      // starting point at the top of the triangle
context.lineTo(250,100);     // line to right bottom corner
context.lineTo(50,100);      // line to left bottom corner
context.stroke();  */