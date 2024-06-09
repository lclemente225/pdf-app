const pcDraw = {
    canvas: null,
    selectedCanvas: null,
    isDrawing: false,
    ctx: null
}
let { canvas, isDrawing, ctx } = pcDraw

const pdfContainer = document.getElementById("pdfContent");
const canvasElements = pdfContainer.children;

//ONCLICK GET CANVAS AND MATCH

document.body.addEventListener('change', () => {
  console.log("ccccchanges")
    if( canvas != null ){
        //ctx = canvas.getContext('2d')
        //canvas.addEventListener('mousedown', (e) => startDrawingPC(e, canvas, e.target.class));
        canvas.addEventListener('mousedown', (e) => drawPC(e, canvas));
        canvas.addEventListener('mouseup', stopDrawingPC);
        canvas.addEventListener('mouseout', stopDrawingPC);
        console.log("drawing!! ", pcDraw, canvas)
    }
})
 


function startDrawingPC(e, canvas, classname, x, y) {
  console.log("start drwaing yaeae", classname, pcDraw)
  console.log("CHECK CANVAS: ", canvas, pdfjsLib.text)
  let drawOnThisCanvas;
  for (let i = 0; i < canvasElements.length; i++) {
      const canvas = canvasElements[i];
      const rect = canvas.getBoundingClientRect();

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        //canvasIndex = e.target.classList[1];
        drawOnThisCanvas = canvas
          break; // Break out of the loop once the correct canvas is found
      }
  }
  //CANVAS.FOReACH X=> x === classname then selectedcanvas = x
        //console.log("value + canvas : ", value, canvas)
      ctx = canvas.getContext('2d')
      console.log("we got it boyx", canvas.classList, x, y)
      const rect = canvas.getBoundingClientRect()
      // const x = e.clientX - rect.left
      // const y = e.clientY - rect.top
      ctx.beginPath();
      
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      
      ctx.beginPath(); // Start a new path fo r next segment
      ctx.lineTo(x, y);//give coordinates for line
      ctx.stroke(); //actually draw line
      ctx.moveTo(x, y);
      isDrawing = true;
    /*  const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;*/
}

function stopDrawingPC() {
  console.log("stop drawing oh no")
  isDrawing = false;
  //ctx.beginPath(); // Start a new path
}

function drawPC(e, canvas,x, y) {
  console.log("ooo im drawing messy, drawPC")
}


export {startDrawingPC, stopDrawingPC, drawPC, pcDraw}

/* context.beginPath();
context.moveTo(150,25);      // starting point at the top of the triangle
context.lineTo(250,100);     // line to right bottom corner
context.lineTo(50,100);      // line to left bottom corner
context.stroke();  */