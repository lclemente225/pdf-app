const pcDraw = {
    canvas: null,
    selectedCanvas: null,
    isDrawing: false,
    ctx: null
}
let { canvas, isDrawing, ctx } = pcDraw

//ONCLICK GET CANVAS AND MATCH

if( canvas != null ){
    //ctx = canvas.getContext('2d')
     //canvas.addEventListener('mousedown', (e) => startDrawingPC(e, canvas, e.target.class));
     canvas.addEventListener('mousemove', (e) => drawPC(e, canvas));
     canvas.addEventListener('mouseup', stopDrawingPC);
     canvas.addEventListener('mouseout', stopDrawingPC);
     console.log("drawing!! ", pcDraw, canvas)
}


function startDrawingPC(e, canvas, classname) {
  console.log("start drwaing yaeae", classname, pcDraw)
  console.log("CHECK CANVAS: ", canvas)
  //CANVAS.FOReACH X=> x === classname then selectedcanvas = x
        //console.log("value + canvas : ", value, canvas)
      ctx = canvas.getContext('2d')
      console.log("we got it boyx", canvas.classList)
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      ctx.beginPath();
      isDrawing = true;
    /*  const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;*/
      ctx.moveTo(x, y);
}

function stopDrawingPC() {
  console.log("stop drawing oh no")
  isDrawing = false;
  //ctx.beginPath(); // Start a new path
}

function drawPC(e, canvas) {
  console.log("ooo im drawing messy")
  if (!isDrawing) return;
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  
  ctx.lineTo(x, y);//give coordinates for line
  ctx.stroke(); //actually draw line
  ctx.beginPath(); // Start a new path fo r next segment
  ctx.moveTo(x, y);
}


export {startDrawingPC, stopDrawingPC, drawPC, pcDraw}

/* context.beginPath();
context.moveTo(150,25);      // starting point at the top of the triangle
context.lineTo(250,100);     // line to right bottom corner
context.lineTo(50,100);      // line to left bottom corner
context.stroke();  */